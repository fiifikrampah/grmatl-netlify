"use client"

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { RefreshCw, Home } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="fixed inset-0 z-[9999] min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center space-y-8 max-w-lg">
        <div className="w-16 h-16 mx-auto rounded-full bg-red-50 flex items-center justify-center">
          <RefreshCw className="h-8 w-8 text-red-500" aria-hidden />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Something went wrong
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          A temporary glitch occurred while loading this page. Try again or head back home.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={reset}
            className="bg-grm-primary hover:bg-grm-secondary text-white px-8 py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Try again
          </Button>
          <Link href="/">
            <Button
              size="lg"
              variant="outline"
              className="border-gray-200 hover:bg-gray-50 text-gray-900 px-8 py-6 rounded-full text-lg transition-all duration-300 w-full sm:w-auto"
            >
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
