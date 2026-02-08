"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'

export default function LiveVideo() {
  // This URL will be updated by the GitHub Actions workflow
  const baseVideoUrl = "https://www.youtube.com/embed/Mi4x7BZbXxg?si=4o0cL6UmrvIApmrY"
  const [showVideo, setShowVideo] = useState(false)
  const [shouldAutoplay, setShouldAutoplay] = useState(false)

  // Create autoplay URL when video should start playing
  const videoUrl = shouldAutoplay
    ? `${baseVideoUrl}&autoplay=1&mute=0&rel=0&modestbranding=1&showinfo=0`
    : baseVideoUrl

  return (
    <div className="w-full aspect-video relative bg-gray-100 rounded-2xl overflow-hidden">
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
              src="/images/watch/thumbnail.webp"
              alt="Great Redemption Ministries Live Stream"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              quality={92}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-grm-primary/20 group-hover:bg-grm-primary/10 transition-colors duration-300 mix-blend-multiply" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-white/30 rounded-full animate-ping" />
                <div className="bg-white/90 hover:bg-white rounded-full p-4 md:p-6 transition-all duration-300 group-hover:scale-110 shadow-lg backdrop-blur-md relative z-10">
                  <Play className="h-8 w-8 md:h-12 md:w-12 text-grm-primary ml-1" fill="currentColor" />
                </div>
              </div>
            </div>

            {/* Text overlay - Updated to Blue gradient instead of black */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-grm-primary/90 to-transparent">
              <h3 className="text-white text-lg md:text-3xl font-bold mb-1 md:mb-2 max-w-[70%] md:max-w-full">
                Join Our Live Service
              </h3>
              <p className="text-blue-100 text-sm md:text-lg font-medium max-w-[70%] md:max-w-full">
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
  )
}
