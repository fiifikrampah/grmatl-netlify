import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  // Allow access to login page without auth
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-grm-blue-50 via-white to-grm-blue-50">
        {children}
      </div>
    )
  }

  // Check if user is admin
  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('*')
    .ilike('email', user.email?.toLowerCase().trim() || '')
    .single()

  // If not on login page and not admin, redirect to login
  if (!adminUser) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-grm-blue-50 via-white to-grm-blue-50">
      {children}
    </div>
  )
}
