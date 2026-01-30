"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Lock } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      // Redirect to admin dashboard
      router.push('/admin')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-white to-grm-blue-100 relative overflow-hidden">
      {/* Decorative ambient blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-grm-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-grm-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 px-4 animate-fade-in-up">
        {/* Logo/Branding */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
            <Image
              src="/images/branding/logo.png"
              alt="Great Redemption Ministries"
              width={100}
              height={100}
              className="h-24 w-auto mx-auto drop-shadow-sm filter brightness-0 saturate-100"
            />
          </Link>
          <h1 className="mt-6 text-3xl font-bold text-gray-900 tracking-tight">Welcome Back</h1>
          <p className="mt-2 text-gray-500">Sign in to manage your account</p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-md overflow-hidden rounded-2xl ring-1 ring-gray-100">
          <CardHeader className="text-center pb-2 pt-8">
            <div className="mx-auto w-12 h-12 bg-grm-blue-50 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-grm-primary" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Partner Login</CardTitle>
          </CardHeader>
          <CardContent className="px-8 pb-8 pt-4">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-red-600 text-sm font-medium flex items-center gap-2 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700 ml-1">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  autoComplete="email"
                  className="h-12 rounded-xl border-gray-200 focus:border-grm-primary focus:ring-grm-primary/20 bg-white"
                  placeholder="name@example.com"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-sm font-semibold text-gray-700 ml-1">
                    Password
                  </Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  autoComplete="current-password"
                  className="h-12 rounded-xl border-gray-200 focus:border-grm-primary focus:ring-grm-primary/20 bg-white"
                  placeholder="••••••••"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-grm-primary hover:bg-grm-secondary h-12 rounded-xl text-base font-bold shadow-lg shadow-blue-900/10 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 mt-2 text-white"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <Link
                href="/"
                className="text-sm text-gray-500 hover:text-grm-primary transition-colors font-medium flex items-center justify-center gap-1 group"
              >
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to website
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <p className="text-center text-gray-400 text-xs mt-8 font-medium tracking-wide uppercase">
          Protected by Great Redemption Ministries
        </p>
      </div>
    </div>
  )
}
