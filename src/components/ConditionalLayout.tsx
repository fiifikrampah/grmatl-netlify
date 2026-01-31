"use client"

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')
  const isThankYou = pathname === '/thank-you'

  if (isAdminRoute || isThankYou) {
    // Admin routes and thank-you page have no header
    return <>{children}</>
  }

  // Public routes - show header and footer
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-0">
        {children}
      </main>
      <Footer />
    </div>
  )
}
