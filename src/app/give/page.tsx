"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, CreditCard, Building, DollarSign, Copy, Check } from 'lucide-react'
import Reveal from '@/components/Reveal'

export default function Give() {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Modern Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background Image with Gradient Fade */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/give/hero.jpg"
            alt="Giving"
            fill
            sizes="100vw"
            className="object-cover object-[center_35%]"
            priority
            fetchPriority="high"
          />
          {/* Gradient Overlay to fade into white content area */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-white" />
          {/* Stronger bottom fade to ensure seamless blending */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent" />
          {/* Subtle blur to keep text readable and modern */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />
          {/* Menu Visibility Gradient */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent" />
        </div>

        {/* Ambient Background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/20 rounded-full blur-[120px] -translate-y-1/4 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-50/20 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Text Visibility Spotlight */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[900px] h-[500px] bg-white/20 blur-[100px] -z-10 rounded-full pointer-events-none" />

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 max-w-6xl mx-auto">
          {/* Tithely */}
          <Reveal delay={50}>
            <Card className="h-full hover:shadow-2xl transition-all duration-300 group border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
              <CardContent className="p-8 text-center flex flex-col h-full">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <CreditCard className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Tithely</h3>
                <p className="text-gray-600 mb-8 flex-grow">Secure online giving platform for one-time or recurring gifts.</p>
                <a href="https://tithe.ly/give_new/www/#/tithely/give-one-time/307704" target="_blank" rel="noopener noreferrer" className="mt-auto w-full">
                  <Button className="w-full bg-gray-900 text-white hover:bg-green-600 py-6 text-lg rounded-xl shadow-md transition-colors">
                    Give Online
                  </Button>
                </a>
              </CardContent>
            </Card>
          </Reveal>

          {/* Zelle */}
          <Reveal delay={100}>
            <Card className="h-full hover:shadow-2xl transition-all duration-300 group border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-purple-500"></div>
              <CardContent className="p-8 text-center flex flex-col h-full">
                <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Building className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Zelle</h3>
                <p className="text-gray-600 mb-8 flex-grow">Direct bank transfer with no fees.</p>
                <div className="mt-auto w-full space-y-4">
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <p className="text-2xl font-mono font-bold text-gray-900 tracking-wider">404-940-8162</p>
                  </div>
                  <Button
                    onClick={() => !copied && copyToClipboard('404-940-8162')}
                    className={`w-full py-6 text-lg rounded-xl shadow-md transition-all duration-200 ${
                      copied
                        ? 'bg-green-600 hover:bg-green-700 text-white cursor-default'
                        : 'bg-gray-900 hover:bg-purple-600 text-white'
                    }`}
                  >
                    {copied ? (
                      <span className="flex items-center gap-2"><Check className="h-5 w-5" /> Copied!</span>
                    ) : (
                      <span className="flex items-center gap-2"><Copy className="h-5 w-5" /> Copy Number</span>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Reveal>

          {/* Cash App */}
          <Reveal delay={150}>
            <Card className="h-full hover:shadow-2xl transition-all duration-300 group border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-green-400"></div>
              <CardContent className="p-8 text-center flex flex-col h-full">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <DollarSign className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Cash App</h3>
                <p className="text-gray-600 mb-8 flex-grow">Quick and easy mobile giving.</p>
                <a href="https://cash.app/$grmatl" target="_blank" rel="noopener noreferrer" className="mt-auto w-full">
                  <Button className="w-full bg-gray-900 text-white hover:bg-green-500 py-6 text-lg rounded-xl shadow-md transition-colors">
                    $grmatl
                  </Button>
                </a>
              </CardContent>
            </Card>
          </Reveal>
        </div>

        {/* Featured Giving Quote */}
        <Reveal className="relative bg-grm-primary rounded-3xl p-12 md:p-20 text-center text-white overflow-hidden shadow-2xl">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/give/quote-section-bg.jpg"
              alt=""
              fill
              className="object-cover opacity-[0.05]"
              aria-hidden
            />
          </div>
          <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10 z-[1]" aria-hidden />
          <div className="relative z-10 max-w-4xl mx-auto">
            <Heart className="h-12 w-12 md:h-14 md:w-14 mx-auto mb-6 text-blue-200 fill-current relative z-10" aria-hidden />
            <blockquote className="text-xl md:text-3xl font-serif italic mb-6 leading-relaxed text-white/95">
              Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.
            </blockquote>
            <cite className="text-base md:text-lg not-italic text-blue-200/90 font-medium">
              2 Corinthians 9:7 (NIV)
            </cite>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
