"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Clock, Users, Heart, Play } from 'lucide-react'

export default function LiveVideo() {
  // This URL will be updated by the GitHub Actions workflow
  const baseVideoUrl = "https://www.youtube.com/embed/mjQizbnO4Zw?si=4o0cL6UmrvIApmrY"
  const [showVideo, setShowVideo] = useState(false)
  const [shouldAutoplay, setShouldAutoplay] = useState(false)

  // Create autoplay URL when video should start playing
  const videoUrl = shouldAutoplay
    ? `${baseVideoUrl}&autoplay=1&mute=0&rel=0&modestbranding=1&showinfo=0`
    : baseVideoUrl

  const features = [
    {
      icon: Clock,
      text: "Every Sunday at 10:00 AM",
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
    <div className="w-full">
      {/* Video Section */}
      <div className="aspect-video w-full relative bg-black">
        {!showVideo ? (
          // Cover Image with Play Button
          <div
            className="w-full h-full cursor-pointer overflow-hidden relative group"
            onClick={() => {
              setShouldAutoplay(true)
              setShowVideo(true)
            }}
          >
            <Image
              src="/images/thumbnail.jpg"
              alt="Great Redemption Ministries Live Stream"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-grm-primary/20 group-hover:bg-grm-primary/10 transition-colors duration-300" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 hover:bg-white rounded-full p-6 transition-all duration-300 group-hover:scale-110 shadow-lg group-hover:shadow-2xl">
                <Play className="h-12 w-12 text-grm-primary ml-1" fill="currentColor" />
              </div>
            </div>

            {/* Text overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">
                Join Our Live Service
              </h3>
              <p className="text-white/90 text-lg font-medium">
                Click to start watching
              </p>
            </div>
          </div>
        ) : (
          // YouTube Video
          <iframe
            src={videoUrl}
            title="YouTube video player"
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        )}
      </div>

      {/* Stream Info Bar */}
      <div className="bg-white p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 md:divide-x divide-gray-100">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="flex flex-col items-center text-center px-4">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3 text-grm-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="font-medium text-gray-900">{feature.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
