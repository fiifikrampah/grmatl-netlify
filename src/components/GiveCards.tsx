"use client"

import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, Building, DollarSign, Copy, Check, CreditCard, Shield, RefreshCw, Smartphone } from 'lucide-react'
import Reveal from '@/components/Reveal'

interface GiveCardsProps {
  copied: boolean
  onCopy: (text: string) => void
  onGiveOnlineClick?: () => void
}

export default function GiveCards({ copied, onCopy, onGiveOnlineClick }: GiveCardsProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-24 max-w-6xl mx-auto">
        <Reveal delay={50}>
          <Card className="h-full rounded-2xl border-gray-100/80 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 ease-out group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-green-500 rounded-t-2xl" />
            <CardContent className="p-6 md:p-8 text-center flex flex-col h-full">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <CreditCard className="h-7 w-7 md:h-8 md:w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 md:mb-3">Give Online</h3>
              <p className="text-gray-600 mb-4 text-sm md:text-base">Secure online giving via Tithe.ly.</p>
              <div className="w-full flex-grow min-h-[100px] md:min-h-[140px] flex flex-col justify-center">
                <ul className="flex flex-wrap justify-center gap-2 md:gap-3 list-none p-0 m-0" role="list">
                  <li className="inline-flex items-center gap-2 rounded-lg bg-green-50/90 px-3 py-2 text-sm font-medium text-gray-700 ring-1 ring-green-100/80">
                    <RefreshCw className="h-4 w-4 text-green-600 shrink-0" aria-hidden />
                    One-time or recurring
                  </li>
                  <li className="inline-flex items-center gap-2 rounded-lg bg-green-50/90 px-3 py-2 text-sm font-medium text-gray-700 ring-1 ring-green-100/80">
                    <Shield className="h-4 w-4 text-green-600 shrink-0" aria-hidden />
                    Secure
                  </li>
                  <li className="inline-flex items-center gap-2 rounded-lg bg-green-50/90 px-3 py-2 text-sm font-medium text-gray-700 ring-1 ring-green-100/80">
                    <Smartphone className="h-4 w-4 text-green-600 shrink-0" aria-hidden />
                    No app required
                  </li>
                </ul>
              </div>
              <Button
                onClick={onGiveOnlineClick}
                className="w-full bg-gray-900 text-white hover:bg-green-600 py-6 text-lg rounded-xl shadow-sm hover:shadow-md active:scale-[0.99] transition-all duration-200 mt-4"
              >
                Give Online
              </Button>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={100}>
          <Card className="h-full rounded-2xl border-gray-100/80 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 ease-out group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-purple-500 rounded-t-2xl" />
            <CardContent className="p-6 md:p-8 text-center flex flex-col h-full">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Building className="h-7 w-7 md:h-8 md:w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 md:mb-3">Zelle</h3>
              <p className="text-gray-600 mb-2 md:mb-3 text-sm md:text-base">Direct bank transfer with no fees.</p>
              <div className="w-full flex-grow flex flex-col justify-end min-h-[100px] md:min-h-[140px]">
                <div className="space-y-3">
                  <p className={`text-sm font-medium px-3 py-2 rounded-lg border-l-2 transition-colors -mt-1 ${copied ? 'text-green-600 bg-green-50/80 border-green-300' : 'text-gray-500 bg-gray-50/80 border-gray-200'}`}>
                    {copied ? 'Open your Zelle or bank app and send to this number.' : 'Copy the number, then send in your bank or Zelle app.'}
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <p className="text-2xl font-mono font-bold text-gray-900 tracking-wider">404-940-8162</p>
                  </div>
                  <Button
                    onClick={() => !copied && onCopy('404-940-8162')}
                    className={`w-full py-6 text-lg rounded-xl shadow-sm hover:shadow-md active:scale-[0.99] transition-all duration-200 ${
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
              </div>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={150}>
          <Card className="h-full rounded-2xl border-gray-100/80 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 ease-out group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-green-400 rounded-t-2xl" />
            <CardContent className="p-6 md:p-8 text-center flex flex-col h-full">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="h-7 w-7 md:h-8 md:w-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 md:mb-3">Cash App</h3>
              <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base md:hidden">Tap below to open Cash App and give.</p>
              <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base hidden md:block">Peer-to-peer giving to $grmatl.</p>
              <div className="w-full flex-grow flex flex-col justify-end min-h-[100px] md:min-h-[140px]">
                <div className="space-y-4">
                  <div className="md:hidden flex justify-center">
                    <div className="bg-gray-50 rounded-xl px-6 py-4 border border-gray-100 w-full max-w-[200px]">
                      <p className="text-2xl font-bold text-gray-900 tracking-tight">$grmatl</p>
                    </div>
                  </div>
                  <div className="hidden md:flex justify-center">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent('https://cash.app/$grmatl')}`}
                      alt="Scan to pay with Cash App"
                      width={160}
                      height={160}
                      className="rounded-xl border border-gray-200 bg-white p-2"
                    />
                  </div>
                  <p className="text-sm text-gray-500 hidden md:block">Scan with your phone camera or Cash App</p>
                  <a href="https://cash.app/$grmatl" target="_blank" rel="noopener noreferrer" className="block w-full">
                    <Button className="w-full bg-gray-900 text-white hover:bg-green-500 py-6 text-lg rounded-xl shadow-md transition-colors">
                      Open Cash App
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </div>

      <Reveal className="relative bg-grm-primary rounded-3xl p-12 md:p-20 text-center text-white overflow-hidden shadow-xl">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/give/quote-section-bg.webp"
            alt=""
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover opacity-[0.05]"
            aria-hidden
            quality={92}
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
    </>
  )
}
