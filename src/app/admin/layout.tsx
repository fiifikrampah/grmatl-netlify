import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { Shield } from 'lucide-react'

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

  // Admin layout with separate header
  return (
    <div className="min-h-screen bg-gradient-to-br from-grm-blue-50 via-white to-grm-blue-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-grm-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-grm-primary rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-grm-primary">Admin Dashboard</h1>
                <p className="text-xs text-gray-500">Event Management</p>
              </div>
            </Link>
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-grm-primary transition-colors"
            >
              View Public Site →
            </Link>
          </div>
        </div>
      </header>
      <main className="pt-0">
        {children}
      </main>
    </div>
  )
}
