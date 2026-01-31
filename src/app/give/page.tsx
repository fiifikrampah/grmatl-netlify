"use client"

import { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Reveal from '@/components/Reveal'

// throw new Error('Test error for error boundary')

const GiveCards = dynamic(
  () =>
    import('@/components/GiveCards').catch(() => ({
      default: () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 max-w-6xl mx-auto text-center text-gray-500 py-12">
          <p>Unable to load giving options. Please refresh the page or try again later.</p>
        </div>
      ),
    })),
  {
    ssr: true,
    loading: () => (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 max-w-6xl mx-auto">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 bg-gray-50 rounded-2xl animate-pulse" aria-hidden />
        ))}
      </div>
    ),
  }
)

export default function Give() {
  const [copied, setCopied] = useState(false)
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current)
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current)
    }
  }, [])

  return (
    <div className="bg-white min-h-screen">
      {/* Modern Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0 [mask-image:linear-gradient(to_bottom,black_30%,transparent_100%)]">
          <Image
            src="/images/give/hero.webp"
            alt="Giving"
            fill
            sizes="100vw"
            className="object-cover object-[center_35%]"
            priority
            fetchPriority="high"
            quality={92}
          />
          {/* Menu visibility only */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent" />
          {/* Subtle Dark Overlay for Premium Feel & Contrast - Darker center for readability */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.5)_0%,_rgba(15,58,112,0.6)_60%,_rgba(15,58,112,0.9)_100%)] z-10" />
        </div>

        <div className="container mx-auto px-4 relative z-10">

          <div className="max-w-4xl mx-auto text-center drop-shadow-lg">
            <Reveal>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
                <span className="text-white">Generous</span> <span className="text-white">Giving</span>
              </h1>
              <p className="text-xl text-white font-medium max-w-2xl mx-auto leading-relaxed">
                Your generosity helps us continue our mission to spread God&apos;s word and serve our community.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-white">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">Ways To Give</h2>
          <p className="text-lg text-gray-600/90 max-w-2xl mx-auto leading-relaxed">
            Choose the method that works best for you. All transactions are secure.
          </p>
        </div>

        <GiveCards copied={copied} onCopy={copyToClipboard} />

      </div>
    </div>
  )
}
