import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

// Get connect submissions grouped by form_type, or all rows for a specific form_type.
export async function GET(request: Request) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: adminUser, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .ilike('email', user.email?.toLowerCase().trim() || '')
      .single()

    if (adminError || !adminUser) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const formType = searchParams.get('form_type')

    // Bypass RLS for admin reads after the admin check above.
    const adminDb = createAdminClient()

    if (formType) {
      const { data: submissions, error } = await adminDb
        .from('connect_submissions')
        .select('*')
        .eq('form_type', formType)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching connect submissions:', error)
        return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 })
      }

      return NextResponse.json({ submissions: submissions || [] })
    } else {
      const { data: submissions, error } = await adminDb
        .from('connect_submissions')
        .select('form_type, created_at')

      if (error) {
        console.error('Error fetching connect submissions:', error)
        return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 })
      }

      const typeMap = new Map<string, { count: number; latest: string }>()
      submissions?.forEach((s: { form_type: string; created_at: string }) => {
        const t = s.form_type
        if (!typeMap.has(t)) {
          typeMap.set(t, { count: 0, latest: s.created_at })
        }
        const entry = typeMap.get(t)!
        entry.count++
        if (new Date(s.created_at) > new Date(entry.latest)) {
          entry.latest = s.created_at
        }
      })

      const forms = Array.from(typeMap.entries())
        .map(([form_type, data]) => ({
          form_type,
          submission_count: data.count,
          latest_submission: data.latest,
        }))
        .sort(
          (a, b) =>
            new Date(b.latest_submission).getTime() - new Date(a.latest_submission).getTime()
        )

      return NextResponse.json({ forms })
    }
  } catch (error) {
    console.error('Error in GET /api/admin/connect-submissions:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
