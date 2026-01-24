"use client"

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, CreditCard, Building, DollarSign, Copy, Check } from 'lucide-react'

export default function Give() {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      // Reset after 2 seconds
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <div className="py-20 bg-gradient-to-br from-grm-blue-50 to-grm-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Support Our Ministry
            </h1>
            <p className="text-[18px] text-gray-600 max-w-3xl mx-auto">
              Your generous giving helps us continue our mission to spread God&apos;s word and serve our community.
              Every contribution makes a difference in touching lives and building His kingdom.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-5xl mx-auto">
            {/* Tithely */}
            <Card className="h-full hover:shadow-lg transition-shadow group">
              <CardContent className="p-6 text-center">
                <CreditCard className="h-12 w-12 mx-auto mb-4 text-grm-primary group-hover:scale-110 transition-transform duration-200" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Tithely</h3>
                <p className="text-gray-600 mb-4">Give securely online through our Tithely portal</p>
                <a href="https://tithe.ly/give_new/www/#/tithely/give-one-time/307704" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full cursor-pointer hover:scale-105 transition-all duration-200 bg-green-600 hover:bg-green-700">
                    Give via Tithely
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* Zelle */}
            <Card className="h-full hover:shadow-lg transition-shadow group">
              <CardContent className="p-6 text-center">
                <Building className="h-12 w-12 mx-auto mb-4 text-grm-primary group-hover:scale-110 transition-transform duration-200" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Zelle</h3>
                <p className="text-gray-600 mb-4">Direct bank transfer using your banking app</p>
                <div className="bg-grm-blue-50 rounded-lg p-4 mb-4 border border-grm-blue-200">
                  <p className="text-2xl font-bold text-grm-primary mb-3 font-mono">404-210-1136</p>
                  <Button
                    onClick={() => !copied && copyToClipboard('404-210-1136')}
                    size="sm"
                    className={`w-full transition-all duration-200 hover:scale-105 ${
                      copied
                        ? 'bg-green-600 hover:bg-green-700 shadow-lg font-semibold cursor-default'
                        : 'bg-grm-primary hover:bg-grm-secondary cursor-pointer'
                    } text-white`}
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Number
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Cash App */}
            <Card className="h-full hover:shadow-lg transition-shadow group">
              <CardContent className="p-6 text-center">
                <DollarSign className="h-12 w-12 mx-auto mb-4 text-grm-primary group-hover:scale-110 transition-transform duration-200" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Cash App</h3>
                <p className="text-gray-600 mb-4">Send donations quickly and securely via Cash App</p>
                <a href="https://cash.app/$grmatl" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full cursor-pointer hover:scale-105 transition-all duration-200 bg-green-600 hover:bg-green-700">
                    Open Cash App
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Featured Giving Section */}
          <div className="bg-white rounded-lg shadow-xl p-8 text-center relative overflow-hidden">
            {/* Decorative background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-4 left-4 text-6xl text-grm-primary">&ldquo;</div>
              <div className="absolute bottom-4 right-4 text-6xl text-grm-primary rotate-180">&rdquo;</div>
            </div>

            <Heart className="h-16 w-16 mx-auto mb-8 text-red-500 relative z-10" />

            <div className="relative z-10">
              <blockquote className="text-[24px] font-serif italic text-gray-800 mb-6 leading-relaxed px-4">
                &ldquo;Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.&rdquo;
              </blockquote>

              <div className="border-t border-grm-blue-200 pt-6">
                <cite className="text-lg font-semibold text-grm-primary not-italic">
                  2 Corinthians 9:7 (NIV)
                </cite>
              </div>
            </div>
          </div>
        </div>


    </div>
  )
}
