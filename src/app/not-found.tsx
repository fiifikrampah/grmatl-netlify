import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center space-y-8 max-w-lg">
        <div className="relative">
          <h1 className="text-[150px] font-bold text-gray-100 leading-none select-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-3xl font-bold text-gray-900">Page Not Found</h2>
          </div>
        </div>

        <p className="text-gray-600 text-lg leading-relaxed">
          We couldn't find the page you were looking for. It might have been removed, renamed, or doesn't exist.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg" className="bg-grm-primary hover:bg-grm-secondary text-white px-8 py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto">
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="border-gray-200 hover:bg-gray-50 text-gray-900 px-8 py-6 rounded-full text-lg transition-all duration-300 w-full sm:w-auto">
              Contact Support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
