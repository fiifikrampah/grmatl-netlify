import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

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

    const supabase = await createClient()

    // Insert response (no validation needed - you control the pages)
    const { data: response, error: insertError } = await supabase
      .from('event_responses')
      .insert({
        event_slug,
        response_data,
      })
      .select()
      .single()

    if (insertError) {
      console.error('Error creating response:', insertError)
      return NextResponse.json(
        { error: 'Failed to submit response' },
        { status: 500 }
      )
    }

    return NextResponse.json({ response }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/event-responses:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
