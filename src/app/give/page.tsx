"use client"

import { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Reveal from '@/components/Reveal'
import { Dialog, DialogContent, DialogTitle, DialogClose } from '@/components/ui/dialog'

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

// Tithe.ly iframe height
const TITHELY_IFRAME_MIN_HEIGHT_PX = 820

export default function Give() {
  const [copied, setCopied] = useState(false)
  const [tithelyOpen, setTithelyOpen] = useState(false)
  const [tithelyIframeLoaded, setTithelyIframeLoaded] = useState(false)
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const tithelyRevealRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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
      if (tithelyRevealRef.current) clearTimeout(tithelyRevealRef.current)
    }
  }, [])

  // Reset iframe loaded state when modal closes so we show loading again next time
  useEffect(() => {
    if (!tithelyOpen) {
      setTithelyIframeLoaded(false)
      if (tithelyRevealRef.current) {
        clearTimeout(tithelyRevealRef.current)
        tithelyRevealRef.current = null
      }
    }
  }, [tithelyOpen])

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

        <GiveCards copied={copied} onCopy={copyToClipboard} onGiveOnlineClick={() => setTithelyOpen(true)} />

        {/* Tithe.ly modal — same width (720px desktop) and height as before */}
        <Dialog open={tithelyOpen} onOpenChange={setTithelyOpen}>
          <DialogContent
            overlayClassName="bg-black/90 backdrop-blur-sm"
            className="max-w-[95vw] md:max-w-[720px] w-full max-h-[90vh] overflow-hidden p-0 gap-0 rounded-2xl border-gray-200 shadow-2xl ring-1 ring-black/10 [&>button]:hidden"
          >
            <div className="flex flex-col h-[85vh] md:h-[min(90vh,800px)]">
              <div className="relative z-[100] flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-white shrink-0">
                <div className="flex flex-col gap-0.5">
                  <DialogTitle className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">
                    Give Online
                  </DialogTitle>
                  <p className="text-sm text-gray-500 font-medium">Secure giving with Tithe.ly</p>
                </div>
                <DialogClose
                  className="relative z-[101] rounded-xl p-2.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors focus:outline-none cursor-pointer touch-manipulation pointer-events-auto select-none"
                  asChild
                >
                  <button type="button" aria-label="Close">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M18 6 6 18M6 6l12 12" /></svg>
                  </button>
                </DialogClose>
              </div>
              <div className="relative z-0 flex-1 min-h-0 overflow-hidden bg-white">
                {/* Loading overlay: our white + spinner until Tithe.ly iframe loads */}
                <div
                  className={`absolute inset-0 z-10 flex flex-col items-center justify-center bg-white transition-opacity duration-300 ${tithelyIframeLoaded ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
                  aria-hidden={tithelyIframeLoaded}
                >
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-gray-600" aria-hidden />
                  <p className="mt-3 text-sm font-medium text-gray-500">Loading giving form…</p>
                </div>
                <div className="h-full w-full overflow-hidden md:w-[125%] md:-ml-[12.5%]">
                  <iframe
                    title="Give to Great Redemption Ministries"
                    src="https://tithe.ly/give_new/www/#/tithely/give-one-time/307704"
                    className="w-full h-full min-h-[600px] border-0 bg-white"
                    style={{ minHeight: `${TITHELY_IFRAME_MIN_HEIGHT_PX}px` }}
                    onLoad={() => {
                    // Delay revealing so Tithe.ly has time to paint the form (avoids brief gray flash)
                    if (tithelyRevealRef.current) clearTimeout(tithelyRevealRef.current)
                    tithelyRevealRef.current = setTimeout(() => setTithelyIframeLoaded(true), 500)
                  }}
                  />
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
