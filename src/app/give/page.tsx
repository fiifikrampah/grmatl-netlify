"use client"

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, CreditCard, Building, DollarSign, X, Copy, Check } from 'lucide-react'

export default function Give() {
  const [showZelleModal, setShowZelleModal] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('404-940-8162')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000) // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }
  const givingOptions = [
    {
      icon: CreditCard,
      title: "Tithely",
      description: "Give securely online through our Tithely portal",
      action: "Give via Tithely",
      link: "https://tithe.ly/give_new/www/#/tithely/give-one-time/307704",
    },
    {
      icon: Building,
      title: "Zelle",
      description: "Direct bank transfer using your banking app",
      action: "Show Zelle Number",
      zelleNumber: "404-940-8162",
    },
    {
      icon: DollarSign,
      title: "Cash App",
      description: "Send donations quickly and securely via Cash App",
      action: "Open Cash App",
      link: "https://cash.app/$grmatl",
    },

  ]

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
            {givingOptions.map((option, index) => {
              const Icon = option.icon
              return (
                <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <Icon className="h-12 w-12 mx-auto mb-4 text-grm-primary" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{option.title}</h3>
                    <p className="text-gray-600 mb-4">{option.description}</p>
                    {option.link ? (
                      <a href={option.link} target="_blank" rel="noopener noreferrer">
                        <Button className="w-full cursor-pointer hover:scale-105 transition-all duration-200 bg-green-600 hover:bg-green-700">
                          {option.action}
                        </Button>
                      </a>
                    ) : option.zelleNumber ? (
                      <Button
                        className="w-full cursor-pointer hover:scale-105 transition-all duration-200 bg-grm-primary hover:bg-grm-secondary text-white"
                        onClick={() => setShowZelleModal(true)}
                      >
                        {option.action}
                      </Button>
                    ) : (
                      <Button className="w-full cursor-pointer hover:scale-105 transition-all duration-200">{option.action}</Button>
                    )}
                  </CardContent>
                </Card>
              )
            })}
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

        {/* Zelle Modal */}
      {showZelleModal && (
        <div className="fixed inset-0 backdrop-blur-md bg-black/20 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 text-center">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowZelleModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-6">
              <Building className="h-16 w-16 mx-auto mb-4 text-grm-primary" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Zelle Phone Number</h3>
              <p className="text-gray-600 mb-4">Use this phone number to send donations via Zelle</p>
            </div>

            <div className="bg-grm-blue-50 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-center space-x-4">
                <p className="text-3xl font-bold text-grm-primary font-mono">
                  404-940-8162
                </p>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center space-x-2 bg-white hover:bg-gray-50 text-grm-primary px-4 py-2 rounded-lg border border-grm-blue-200 transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-green-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-5 w-5" />
                      <span className="text-sm font-medium">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <Button
              onClick={() => setShowZelleModal(false)}
              className="w-full bg-grm-primary hover:bg-grm-secondary"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
