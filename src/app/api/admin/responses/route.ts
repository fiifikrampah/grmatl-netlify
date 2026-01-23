import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// Get all unique event slugs and their response counts (admin only)
export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is admin
    const { data: adminUser, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .ilike('email', user.email?.toLowerCase().trim() || '')
      .single()

    if (adminError || !adminUser) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Get optional event_slug query parameter
    const { searchParams } = new URL(request.url)
    const eventSlug = searchParams.get('event_slug')

    if (eventSlug) {
      // Get responses for specific event
      const { data: responses, error } = await supabase
        .from('event_responses')
        .select('*')
        .eq('event_slug', eventSlug)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching responses:', error)
        return NextResponse.json({ error: 'Failed to fetch responses' }, { status: 500 })
      }

      return NextResponse.json({ responses: responses || [] })
    } else {
      // Get all unique event slugs with counts
      const { data: responses, error } = await supabase
        .from('event_responses')
        .select('event_slug, created_at')

      if (error) {
        console.error('Error fetching responses:', error)
        return NextResponse.json({ error: 'Failed to fetch responses' }, { status: 500 })
      }

      // Group by event_slug and count
      const eventMap = new Map<string, { count: number; latest: string }>()
      
      responses?.forEach((response: any) => {
        const slug = response.event_slug
        if (!eventMap.has(slug)) {
          eventMap.set(slug, { count: 0, latest: response.created_at })
        }
        const event = eventMap.get(slug)!
        event.count++
        if (new Date(response.created_at) > new Date(event.latest)) {
          event.latest = response.created_at
        }
      })

      const events = Array.from(eventMap.entries()).map(([slug, data]) => ({
        slug,
        response_count: data.count,
        latest_response: data.latest,
      })).sort((a, b) => new Date(b.latest_response).getTime() - new Date(a.latest_response).getTime())

      return NextResponse.json({ events })
    }
  } catch (error) {
    console.error('Error in GET /api/admin/responses:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
