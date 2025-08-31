"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Clock, Users, Heart, Play } from 'lucide-react'

export default function LiveVideo() {
  // This URL will be updated by the GitHub Actions workflow
  const liveVideoUrl = "https://www.youtube.com/embed/HB2yeJqMHnM?si=4o0cL6UmrvIApmrY"
  const [showVideo, setShowVideo] = useState(false)

  const features = [
    {
      icon: Clock,
      text: "Every Sunday at 9:30 AM",
    },
    {
      icon: Users,
      text: "Join our online community",
    },
    {
      icon: Heart,
      text: "Prayer requests welcome",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-grm-blue-600 to-grm-blue-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-[48px] font-bold mb-6 text-black">
            Watch Us Live
          </h1>
          <p className="text-[18px] max-w-3xl mx-auto text-black">
            Experience the presence of God through our live streams. Join us every Sunday
            for worship, prayer, and powerful messages that will inspire and transform your life.
          </p>
        </div>
      </section>

      {/* Video Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="aspect-video w-full max-w-4xl mx-auto relative">
          {!showVideo ? (
            // Cover Image with Play Button
            <div
              className="w-full h-full rounded-lg shadow-2xl cursor-pointer overflow-hidden relative group"
              onClick={() => setShowVideo(true)}
            >
              <Image
                src="/images/We Are Live 1920x1080.jpg"
                alt="Great Redemption Ministries Live Stream"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 hover:bg-white rounded-full p-6 transition-all duration-300 group-hover:scale-110 shadow-lg">
                  <Play className="h-12 w-12 text-grm-primary ml-1" fill="currentColor" />
                </div>
              </div>
              {/* Text overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white text-2xl font-bold mb-2 drop-shadow-lg">
                  Join Our Live Service
                </h3>
                <p className="text-white/90 text-lg drop-shadow-lg">
                  Click to start watching
                </p>
              </div>
            </div>
          ) : (
            // YouTube Video
            <iframe
              src={liveVideoUrl}
              title="YouTube video player"
              className="w-full h-full rounded-lg shadow-2xl"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          )}
        </div>

        {/* Stream Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <Icon className="h-8 w-8 mx-auto mb-4 text-grm-primary" />
                  <p className="font-medium">{feature.text}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>
    </div>
  )
}
