import { createClient } from '@supabase/supabase-js'
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

    // Use service role key for server-side inserts (bypasses RLS)
    // This is safe because it's server-side only and we control the data
    // If service role key is not set, fall back to anon key (for local dev)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

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
      // Log full error details for debugging
      console.error('Error creating response:', {
        message: insertError.message,
        code: insertError.code,
        details: insertError.details,
        hint: insertError.hint,
        fullError: JSON.stringify(insertError, null, 2)
      })
      
      // Return error with message in production for better debugging
      return NextResponse.json(
        { 
          error: 'Failed to submit response',
          message: insertError.message || 'Database error occurred',
          code: insertError.code
        },
        { status: 500 }
      )
    }

    return NextResponse.json({ response }, { status: 201 })
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
