"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import LiveVideo from './LiveVideo'
import { Calendar, Search, Share } from 'lucide-react'
import { FaFacebook, FaYoutube } from 'react-icons/fa6'
import PageHeader from '@/components/PageHeader'
import Reveal from '@/components/Reveal'

export default function LivePage() {
  const features = [
    {
      icon: Calendar,
      title: "Weekly Messages",
      description: "Access our latest sermons and teachings every week.",
    },
    {
      icon: Search,
      title: "Search Archive",
      description: "Find specific topics or messages from our extensive collection.",
    },
    {
      icon: Share,
      title: "Share & Discuss",
      description: "Share your favorite messages and engage with our community.",
    },
  ]

  return (
    <div className="bg-white">
      <PageHeader
        title="Watch Live"
        subtitle="Join our online congregation for worship and the Word."
        imageSrc="/images/site-photos/live/1.jpg"
      />

      {/* Live Video Section - Online Experience */}
      <section className="py-16 md:py-24 bg-gray-50 text-gray-900 relative">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.5)]" aria-hidden />
            <span className="font-bold tracking-widest uppercase text-sm text-gray-600">Online Experience</span>
          </div>

          <div className="max-w-5xl mx-auto mb-12 shadow-xl rounded-2xl overflow-hidden border border-gray-200 bg-white">
             <LiveVideo />
          </div>
        </div>
      </section>

      {/* Sermon Archive Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Sermon Archive
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Did you miss last week's message? Catch up on past sermons and teachings on our social channels.
              We'd love to see you in person, but if you're unable to make it, our online campus is always open.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <a
              href="https://www.facebook.com/greatredemptionministies"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              <Button size="lg" className="w-full bg-[#1877F2] hover:bg-[#166fe5] text-white h-14 px-8 rounded-xl text-lg shadow-lg">
                <FaFacebook className="mr-3 h-6 w-6" />
                Watch on Facebook
              </Button>
            </a>
            <a
              href="https://www.youtube.com/channel/UCaWvM15oR08RL5DYKxQ4TzA"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              <Button size="lg" className="w-full bg-[#FF0000] hover:bg-[#cc0000] text-white h-14 px-8 rounded-xl text-lg shadow-lg">
                <FaYoutube className="mr-3 h-6 w-6" />
                Watch on YouTube
              </Button>
            </a>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Reveal key={index} delay={index * 50}>
                  <Card className="text-center h-full hover:shadow-xl transition-shadow duration-300 border-none shadow-md">
                    <CardContent className="p-10">
                      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-grm-primary">
                        <Icon className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
