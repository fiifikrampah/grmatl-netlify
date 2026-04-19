import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { NextResponse, after } from 'next/server'

const NOTIFICATION_EMAIL = 'grmmedia16@gmail.com'

// Module-scope clients: created once per warm invocation instead of per request.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

const resendApiKey = process.env.RESEND_API_KEY
const resend = resendApiKey ? new Resend(resendApiKey) : null

// Format field key for display (e.g. "firstName" -> "First Name")
function formatFieldLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (s) => s.toUpperCase())
    .replace(/[-_]/g, ' ')
    .trim()
}

// Build email HTML from form response
function buildEmailHtml(eventSlug: string, responseData: Record<string, unknown>): string {
  const rows = Object.entries(responseData)
    .map(([key, value]) => {
      const label = formatFieldLabel(key)
      const val = value == null ? '' : String(value)
      return `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600;color:#333;">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#555;">${val}</td></tr>`
    })
    .join('')

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:sans-serif;line-height:1.5;color:#333;">
  <h2 style="color:#2070B4;">New Event Registration</h2>
  <p><strong>Event:</strong> ${eventSlug}</p>
  <table style="border-collapse:collapse;width:100%;max-width:500px;">
    ${rows}
  </table>
  <p style="margin-top:20px;font-size:12px;color:#888;">Submitted via GRM website</p>
</body>
</html>
  `.trim()
}

// Submit a form response for any event
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { event_slug, response_data } = body

    if (!event_slug || !response_data) {
      return NextResponse.json(
        { error: 'Event slug and response data are required' },
        { status: 400 }
      )
    }

    // Insert only — no .select().single() because the client doesn't need the row back.
    const { error: insertError } = await supabase
      .from('event_responses')
      .insert({ event_slug, response_data })

    if (insertError) {
      // Log full error details for debugging
      console.error('Error creating response:', {
        message: insertError.message,
        code: insertError.code,
        details: insertError.details,
        hint: insertError.hint,
        fullError: JSON.stringify(insertError, null, 2)
      })

      return NextResponse.json(
        {
          error: 'Failed to submit response',
          message: insertError.message || 'Database error occurred',
          code: insertError.code
        },
        { status: 500 }
      )
    }

    // Send notification email *after* the response is returned to the client.
    // Next.js `after()` keeps the runtime alive so the promise completes — unlike
    // plain fire-and-forget which Netlify terminates the instant the response
    // is sent. This removes 1-3s of Resend latency from the user-facing path.
    if (resend) {
      const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
      const fromName = process.env.RESEND_FROM_NAME || 'GRM Events'
      const html = buildEmailHtml(event_slug, response_data as Record<string, unknown>)

      after(async () => {
        try {
          const result = await resend.emails.send({
            from: `${fromName} <${fromEmail}>`,
            to: NOTIFICATION_EMAIL,
            subject: `New registration: ${event_slug}`,
            html,
          })
          if (result.error) {
            console.error('Resend email error:', result.error)
          }
        } catch (err) {
          console.error('Failed to send registration email:', err)
        }
      })
    }

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/event-responses:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : String(error)) : undefined
      },
      { status: 500 }
    )
  }
}
