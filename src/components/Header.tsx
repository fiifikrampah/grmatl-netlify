"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
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

  // Pages that have white background from the top (no hero or light content): show dark header text immediately
  const isEventDetailPage = pathname?.startsWith('/events/') && pathname !== '/events'
  const isFireFriday = pathname === '/events/fire-friday'
  const isWhiteBackgroundPage =
    pathname === '/privacy' ||
    pathname === '/terms' ||
    (isEventDetailPage && !isFireFriday) ||
    (pathname && !['/', '/about', '/events', '/contact', '/live', '/give'].includes(pathname) && !pathname.startsWith('/admin'))
  const [scrolled, setScrolled] = useState(!!isWhiteBackgroundPage)

  useEffect(() => {
    const handleScroll = () => {
      const isEventDetailPage = pathname?.startsWith('/events/') && pathname !== '/events'
      const isFireFriday = pathname === '/events/fire-friday'
      const isWhitePage =
        pathname === '/privacy' ||
        pathname === '/terms' ||
        (isEventDetailPage && !isFireFriday) ||
        (pathname && !['/', '/about', '/events', '/contact', '/live', '/give'].includes(pathname) && !pathname.startsWith('/admin'))
      if (isWhitePage) {
        setScrolled(true)
      } else {
        setScrolled(window.scrollY > 20)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  useEffect(() => {
    checkAdminStatus()
  }, [pathname])

  useEffect(() => {
    const isEventDetailPage = pathname?.startsWith('/events/') && pathname !== '/events'
    const isFireFriday = pathname === '/events/fire-friday'
    const isWhitePage =
      pathname === '/privacy' ||
      pathname === '/terms' ||
      (isEventDetailPage && !isFireFriday) ||
      (pathname && !['/', '/about', '/events', '/contact', '/live', '/give'].includes(pathname) && !pathname.startsWith('/admin'))
    setScrolled(isWhitePage || window.scrollY > 20)
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

  // Check if we're on a page that starts with white background (event detail pages)
  // Fire Friday has a dark background, so it should keep white text
  const shouldShowDarkText = scrolled

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 animate-slide-down ${
        shouldShowDarkText
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 relative z-50">
            <Image
              src="/images/logo.png"
              alt="Great Redemption Ministries"
              width={75}
              height={75}
              className={`transition-all duration-300 ${
                !shouldShowDarkText ? 'filter brightness-0 invert' : 'filter brightness-0 saturate-100'
              } hover:opacity-80`}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              item.external ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2 text-sm font-medium tracking-wide transition-all duration-200 rounded-full hover:bg-white/10 ${
                    !shouldShowDarkText
                      ? 'text-white hover:text-white'
                      : 'text-gray-700 hover:text-grm-primary hover:bg-grm-blue-50'
                  }`}
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-medium tracking-wide transition-all duration-200 rounded-full hover:bg-white/10 ${
                    !scrolled
                      ? 'text-white hover:text-white'
                      : 'text-gray-700 hover:text-grm-primary hover:bg-grm-blue-50'
                  } ${pathname === item.href ? (!shouldShowDarkText ? 'bg-white/20' : 'bg-grm-blue-50 text-grm-primary') : ''}`}
                >
                  {item.name}
                </Link>
              )
            ))}
            {isAdmin ? (
              <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-200">
                <Link
                  href="/admin"
                  className={`flex items-center gap-1 text-sm font-medium ${
                    !shouldShowDarkText ? 'text-white' : 'text-gray-700'
                  }`}
                >
                  <Shield className="h-4 w-4" />
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className={`${!shouldShowDarkText ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Link
                href="/admin/login"
                className={`ml-4 px-6 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  !shouldShowDarkText
                    ? 'bg-white text-black hover:bg-gray-100'
                    : 'bg-grm-primary text-white hover:bg-grm-secondary shadow-sm hover:shadow-md'
                }`}
              >
                Login
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className={!shouldShowDarkText ? 'text-white hover:bg-white/10' : 'text-gray-900 hover:bg-gray-100'}
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[350px] p-0 border-l border-gray-100">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col h-full bg-white pt-6">
                <div className="flex-1 px-6 py-4 space-y-2">
                  {navigation.map((item) => (
                    <div key={item.name}>
                      {item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-2xl font-light text-gray-900 py-3 border-b border-gray-50 hover:text-grm-primary transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          className={`block text-2xl font-light py-3 border-b border-gray-50 hover:text-grm-primary transition-colors ${
                            pathname === item.href ? 'text-grm-primary font-medium' : 'text-gray-900'
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>

                <div className="p-6 bg-gray-50">
                  {isAdmin ? (
                    <div className="space-y-4">
                      <Link
                        href="/admin"
                        className="flex items-center gap-3 text-gray-700 font-medium p-3 rounded-lg hover:bg-white transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <Shield className="h-5 w-5" />
                        Admin Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout()
                          setIsOpen(false)
                        }}
                        className="w-full flex items-center gap-3 text-red-600 font-medium p-3 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-5 w-5" />
                        Logout
                      </button>
                    </div>
                  ) : (
                    <Link
                      href="/admin/login"
                      className="block w-full text-center bg-grm-primary text-white font-medium py-4 rounded-xl hover:bg-grm-secondary transition-colors shadow-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      Partner Login
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
