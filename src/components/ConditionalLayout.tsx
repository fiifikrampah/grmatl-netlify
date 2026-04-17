"use client"

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')
  const isThankYou = pathname === '/thank-you'
  const isConnectRoute = pathname?.startsWith('/connect')

  if (isAdminRoute || isThankYou || isConnectRoute) {
    // Admin, thank-you, and connect (QR landing) pages have no header/footer
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
