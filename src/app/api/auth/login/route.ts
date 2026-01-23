import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Sign in the user
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError || !authData.user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Check if user is admin - use authenticated user's email and make case-insensitive
    const authenticatedEmail = authData.user.email?.toLowerCase().trim()
    
    const { data: adminUser, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .ilike('email', authenticatedEmail || '')
      .single()

    if (adminError || !adminUser) {
      console.error('Admin check failed:', {
        email: authenticatedEmail,
        error: adminError,
        adminUser
      })
      // Sign out if not admin
      await supabase.auth.signOut()
      return NextResponse.json(
        { error: 'Access denied. Admin privileges required.' },
        { status: 403 }
      )
    }

    return NextResponse.json({ 
      user: {
        id: authData.user.id,
        email: authData.user.email,
      }
    })
  } catch (error) {
    console.error('Error in POST /api/auth/login:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
