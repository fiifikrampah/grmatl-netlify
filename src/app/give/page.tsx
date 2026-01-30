"use client"

import { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Reveal from '@/components/Reveal'

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

  return (
    <div className="bg-white min-h-screen">
      {/* Modern Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
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
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-white" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent" />
          {/* Subtle blur on desktop only — avoid GPU load and crashes on mobile */}
          <div className="absolute inset-0 bg-white/10 md:backdrop-blur-[1px]" />
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent" />
        </div>

        {/* Ambient Background — hidden on mobile to prevent GPU memory pressure and tab crashes */}
        <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/20 rounded-full blur-[120px] -translate-y-1/4 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-50/20 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Text Visibility Spotlight — desktop only */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[900px] h-[500px] bg-white/20 blur-[100px] -z-10 rounded-full pointer-events-none hidden md:block" />

          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
                <span className="text-gray-900">Generous</span> <span className="text-grm-primary">Giving</span>
              </h1>
              <p className="text-xl text-gray-900 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
                Your generosity helps us continue our mission to spread God&apos;s word and serve our community.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ways To Give</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the method that works best for you. All transactions are secure.
          </p>
        </div>

        <GiveCards copied={copied} onCopy={copyToClipboard} />
      </div>
    </div>
  )
}
