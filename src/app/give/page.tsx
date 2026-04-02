"use client"

import { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ArrowRight, Leaf } from 'lucide-react'
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

        <GiveCards copied={copied} onCopy={copyToClipboard} />

      </div>

      {/* Room to Grow Campaign Banner */}
      <section className="py-16 md:py-20 relative overflow-hidden" style={{ backgroundColor: '#2d6a4f' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-20" style={{ backgroundColor: '#b8860b' }} />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full blur-3xl opacity-10" style={{ backgroundColor: '#fff' }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/15 text-white/90 mb-4">
                <Leaf className="h-3.5 w-3.5 mr-1.5" />
                Campaign
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 tracking-tight">
                Room to Grow
              </h2>
              <p className="text-white/80 max-w-lg text-base md:text-lg leading-relaxed">
                Help us create dedicated spaces for our children&apos;s ministry — where every child can learn, grow, and encounter God.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="https://give.tithe.ly/?formId=1f6a8698-6865-11ee-90fc-1260ab546d11&locationId=6585e9e0-8a8a-4a42-99ec-f845bac152c1&fundId=186bc47d-f984-45b9-88e8-be2fb9627f20&frequency=one-time"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-white font-bold rounded-full text-base transition-all duration-300 hover:scale-105 shadow-lg"
                style={{ color: '#2d6a4f' }}
              >
                <Heart className="mr-2 h-4 w-4 fill-current" />
                Give Now
              </a>
              <Link href="/room-to-grow" className="inline-flex items-center justify-center px-6 py-4 font-semibold rounded-full text-white border-2 border-white/30 hover:bg-white/10 transition-colors text-base">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
