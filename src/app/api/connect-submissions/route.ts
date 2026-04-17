import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const NOTIFICATION_EMAIL = 'grmmedia16@gmail.com'

const FORM_LABELS: Record<string, string> = {
  visitor: 'Visitor Contact',
  prayer: 'Prayer Request',
  experience: 'Share Your Experience',
}

// Format field key for display (e.g. "firstName" / "first_name" -> "First Name")
function formatFieldLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (s) => s.toUpperCase())
}

function buildEmailHtml(formType: string, submissionData: Record<string, unknown>): string {
  const rows = Object.entries(submissionData)
    .map(([key, value]) => {
      const label = formatFieldLabel(key)
      const val = value == null ? '' : String(value)
      return `<tr><td style="padding:10px 14px;border-bottom:1px solid #eee;font-weight:600;color:#1B5299;vertical-align:top;">${label}</td><td style="padding:10px 14px;border-bottom:1px solid #eee;color:#333;white-space:pre-wrap;">${val.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</td></tr>`
    })
    .join('')

  const formLabel = FORM_LABELS[formType] || formType

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:'Helvetica Neue',Arial,sans-serif;line-height:1.5;color:#333;background:#f7f9fc;padding:24px;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.05);">
    <div style="background:#1B5299;padding:24px;">
      <h2 style="margin:0;color:#fff;font-size:20px;">New ${formLabel} Submission</h2>
      <p style="margin:6px 0 0;color:#cfe0f5;font-size:14px;">From the /connect page</p>
    </div>
    <table style="border-collapse:collapse;width:100%;">
      ${rows}
    </table>
    <div style="padding:16px 20px;background:#f7f9fc;font-size:12px;color:#888;text-align:center;">
      Submitted via GRM website &middot; Reply to this email only for internal follow-up
    </div>
  </div>
</body>
</html>
  `.trim()
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { form_type, submission_data } = body

    if (!form_type || !submission_data) {
      return NextResponse.json(
        { error: 'form_type and submission_data are required' },
        { status: 400 }
      )
    }

    if (!['visitor', 'prayer', 'experience'].includes(form_type)) {
      return NextResponse.json(
        { error: 'Invalid form_type' },
        { status: 400 }
      )
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    const { data: submission, error: insertError } = await supabase
      .from('connect_submissions')
      .insert({
        form_type,
        submission_data,
      })
      .select()
      .single()

    if (insertError) {
      console.error('Error creating connect submission:', {
        message: insertError.message,
        code: insertError.code,
        details: insertError.details,
        hint: insertError.hint,
      })
      return NextResponse.json(
        {
          error: 'Failed to submit',
          message: insertError.message || 'Database error occurred',
          code: insertError.code,
        },
        { status: 500 }
      )
    }

    // Send notification email (non-blocking)
    const apiKey = process.env.RESEND_API_KEY
    if (apiKey) {
      const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
      const fromName = process.env.RESEND_FROM_NAME || 'GRM Connect'
      const formLabel = FORM_LABELS[form_type] || form_type

      const resend = new Resend(apiKey)
      resend.emails
        .send({
          from: `${fromName} <${fromEmail}>`,
          to: NOTIFICATION_EMAIL,
          subject: `New ${formLabel} submission`,
          html: buildEmailHtml(form_type, submission_data as Record<string, unknown>),
        })
        .then((result) => {
          if (result.error) {
            console.error('Resend email error:', result.error)
          }
        })
        .catch((err) => {
          console.error('Failed to send connect submission email:', err)
        })
    }

    return NextResponse.json({ submission }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/connect-submissions:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        details:
          process.env.NODE_ENV === 'development'
            ? error instanceof Error
              ? error.message
              : String(error)
            : undefined,
      },
      { status: 500 }
    )
  }
}
