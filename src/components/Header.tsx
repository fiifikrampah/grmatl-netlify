"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, LogOut, Shield } from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Events', href: '/events' },
  { name: 'Blogs', href: 'https://medium.com/grmblogs', external: true },
  { name: 'Contact', href: '/contact' },
  { name: 'Watch', href: '/live' },
  { name: 'Give', href: '/give' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    checkAdminStatus()
  }, [pathname])

  const checkAdminStatus = async () => {
    try {
      const response = await fetch('/api/auth/me')
      const data = await response.json()
      setIsAdmin(!!data.user)
    } catch {
      setIsAdmin(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setIsAdmin(false)
      if (pathname?.startsWith('/admin')) {
        router.push('/admin/login')
      } else {
        router.refresh()
      }
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-grm-blue-100 fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Great Redemption Ministries"
              width={75}
              height={75}
              className="h-16 w-auto filter brightness-0 saturate-100"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              item.external ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-grm-secondary font-medium transition-colors duration-200"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-grm-secondary font-medium transition-colors duration-200"
                >
                  {item.name}
                </Link>
              )
            ))}
            {isAdmin ? (
              <>
                <Link
                  href="/admin"
                  className="text-gray-700 hover:text-grm-secondary font-medium transition-colors duration-200 flex items-center gap-1"
                >
                  <Shield className="h-4 w-4" />
                  Admin
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-grm-secondary flex items-center gap-1"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <Link
                href="/admin/login"
                className="text-gray-700 hover:text-grm-secondary font-medium transition-colors duration-200"
              >
                Login
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <nav className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  item.external ? (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-grm-secondary font-medium py-2 px-4 rounded-md hover:bg-grm-blue-50 transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-gray-700 hover:text-grm-secondary font-medium py-2 px-4 rounded-md hover:bg-grm-blue-50 transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
                ))}
                <div className="border-t border-gray-200 pt-4 mt-4">
                  {isAdmin ? (
                    <>
                      <Link
                        href="/admin"
                        className="text-gray-700 hover:text-grm-secondary font-medium py-2 px-4 rounded-md hover:bg-grm-blue-50 transition-colors duration-200 flex items-center gap-2"
                        onClick={() => setIsOpen(false)}
                      >
                        <Shield className="h-4 w-4" />
                        Admin Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout()
                          setIsOpen(false)
                        }}
                        className="w-full text-left text-gray-700 hover:text-grm-secondary font-medium py-2 px-4 rounded-md hover:bg-grm-blue-50 transition-colors duration-200 flex items-center gap-2"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/admin/login"
                      className="text-gray-700 hover:text-grm-secondary font-medium py-2 px-4 rounded-md hover:bg-grm-blue-50 transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
