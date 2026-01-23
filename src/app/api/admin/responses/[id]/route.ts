import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

async function checkAdmin(supabase: any) {
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    return { authorized: false, error: 'Unauthorized' }
  }

  const { data: adminUser, error: adminError } = await supabase
    .from('admin_users')
    .select('*')
    .ilike('email', user.email?.toLowerCase().trim() || '')
    .single()

  if (adminError || !adminUser) {
    return { authorized: false, error: 'Forbidden' }
  }

  return { authorized: true }
}

// Delete a response (admin only)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()
    
    const adminCheck = await checkAdmin(supabase)
    if (!adminCheck.authorized) {
      return NextResponse.json(
        { error: adminCheck.error },
        { status: adminCheck.error === 'Unauthorized' ? 401 : 403 }
      )
    }

    const { error } = await supabase
      .from('event_responses')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting response:', error)
      return NextResponse.json({ error: 'Failed to delete response' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/admin/responses/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
