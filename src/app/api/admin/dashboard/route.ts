import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

/**
 * Unified dashboard endpoint: returns summary stats, per-group counts with
 * 7-day sparkline buckets, and a merged recent-activity feed across both
 * connect submissions and event registrations.
 */
export async function GET() {
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

    const [eventRes, connectRes] = await Promise.all([
      supabase
        .from('event_responses')
        .select('id, event_slug, response_data, created_at')
        .order('created_at', { ascending: false }),
      supabase
        .from('connect_submissions')
        .select('id, form_type, submission_data, created_at')
        .order('created_at', { ascending: false }),
    ])

    if (eventRes.error) {
      console.error('Error fetching events:', eventRes.error)
      return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
    }
    if (connectRes.error) {
      console.error('Error fetching connect submissions:', connectRes.error)
      return NextResponse.json({ error: 'Failed to fetch connect' }, { status: 500 })
    }

    const eventRows = eventRes.data || []
    const connectRows = connectRes.data || []

    // ---- helpers ----
    const now = new Date()
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(startOfToday.getTime() - 6 * 24 * 60 * 60 * 1000)

    // 7-day bucket (index 0 = 6 days ago, index 6 = today)
    const weekBuckets = (rows: { created_at: string }[]): number[] => {
      const buckets = [0, 0, 0, 0, 0, 0, 0]
      rows.forEach((r) => {
        const d = new Date(r.created_at)
        const diffDays = Math.floor(
          (d.getTime() - weekAgo.getTime()) / (24 * 60 * 60 * 1000)
        )
        if (diffDays >= 0 && diffDays <= 6) buckets[diffDays]++
      })
      return buckets
    }

    const pickName = (data: Record<string, unknown>): string | null => {
      const keys = [
        'full_name',
        'name',
        'Name',
        'Full Name',
        'your_name',
        'first_name',
        'email',
      ]
      for (const k of keys) {
        const v = data?.[k]
        if (typeof v === 'string' && v.trim()) return v.trim()
      }
      return null
    }

    // ---- per-group summaries ----
    type ConnectForm = {
      form_type: string
      submission_count: number
      latest_submission: string
      week_counts: number[]
    }
    const connectByType = new Map<string, { rows: typeof connectRows }>()
    connectRows.forEach((r) => {
      const bucket = connectByType.get(r.form_type) || { rows: [] }
      bucket.rows.push(r)
      connectByType.set(r.form_type, bucket)
    })
    const connectForms: ConnectForm[] = Array.from(connectByType.entries())
      .map(([form_type, { rows }]) => ({
        form_type,
        submission_count: rows.length,
        latest_submission: rows[0]?.created_at || '',
        week_counts: weekBuckets(rows),
      }))
      .sort(
        (a, b) =>
          new Date(b.latest_submission).getTime() -
          new Date(a.latest_submission).getTime()
      )

    type EventSummary = {
      slug: string
      response_count: number
      latest_response: string
      week_counts: number[]
    }
    const eventsBySlug = new Map<string, { rows: typeof eventRows }>()
    eventRows.forEach((r) => {
      const bucket = eventsBySlug.get(r.event_slug) || { rows: [] }
      bucket.rows.push(r)
      eventsBySlug.set(r.event_slug, bucket)
    })
    const events: EventSummary[] = Array.from(eventsBySlug.entries())
      .map(([slug, { rows }]) => ({
        slug,
        response_count: rows.length,
        latest_response: rows[0]?.created_at || '',
        week_counts: weekBuckets(rows),
      }))
      .sort(
        (a, b) =>
          new Date(b.latest_response).getTime() -
          new Date(a.latest_response).getTime()
      )

    // ---- recent activity feed (merged, top 15) ----
    type ActivityItem = {
      id: string
      source: 'connect' | 'event'
      group_key: string
      name: string | null
      created_at: string
    }
    const activity: ActivityItem[] = [
      ...connectRows.slice(0, 25).map((r) => ({
        id: r.id,
        source: 'connect' as const,
        group_key: r.form_type,
        name: pickName((r.submission_data as Record<string, unknown>) || {}),
        created_at: r.created_at,
      })),
      ...eventRows.slice(0, 25).map((r) => ({
        id: r.id,
        source: 'event' as const,
        group_key: r.event_slug,
        name: pickName((r.response_data as Record<string, unknown>) || {}),
        created_at: r.created_at,
      })),
    ]
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
      .slice(0, 15)

    // ---- overall stats ----
    const allTime = connectRows.length + eventRows.length
    const weekStart = weekAgo.toISOString()
    const weekCount =
      connectRows.filter((r) => r.created_at >= weekStart).length +
      eventRows.filter((r) => r.created_at >= weekStart).length
    const mostRecent = activity[0]?.created_at || null

    return NextResponse.json({
      stats: {
        allTime,
        weekCount,
        mostRecent,
      },
      connectForms,
      events,
      activity,
    })
  } catch (error) {
    console.error('Error in GET /api/admin/dashboard:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
