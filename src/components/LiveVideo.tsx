"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'

export default function LiveVideo() {
  const [showVideo, setShowVideo] = useState(false)
  const [shouldAutoplay, setShouldAutoplay] = useState(false)
  const [liveVideoId, setLiveVideoId] = useState<string | null>(null)
  const [broadcastState, setBroadcastState] = useState<'live' | 'archive' | null>(null)
  const [isLoadingLiveVideo, setIsLoadingLiveVideo] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function loadLiveVideo() {
      try {
        const response = await fetch('/api/live-video', {
          cache: 'no-store',
          signal: controller.signal,
        })

        if (!response.ok) {
          setLiveVideoId(null)
          setBroadcastState(null)
          return
        }

        const data = (await response.json()) as {
          broadcastState?: 'live' | 'archive' | null
          videoId?: string | null
        }
        setLiveVideoId(data.videoId ?? null)
        setBroadcastState(data.broadcastState ?? null)
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          setLiveVideoId(null)
          setBroadcastState(null)
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingLiveVideo(false)
        }
      }
    }

    loadLiveVideo()

    return () => {
      controller.abort()
    }
  }, [])

  // Create autoplay URL when video should start playing
  const baseVideoUrl = liveVideoId ? `https://www.youtube.com/embed/${liveVideoId}` : null
  const videoUrl = baseVideoUrl && shouldAutoplay
    ? `${baseVideoUrl}?autoplay=1&mute=0&rel=0&modestbranding=1&showinfo=0`
    : baseVideoUrl
  const videoSrc = videoUrl ?? undefined
  const playerSrc = showVideo ? videoSrc : undefined
  const canPlayVideo = Boolean(videoUrl)
  const statusTitle = isLoadingLiveVideo
    ? 'Checking live status'
    : broadcastState === 'live'
      ? 'Join Our Live Service'
      : broadcastState === 'archive'
        ? 'Watch the Most Recent Livestream'
        : 'Watch the Most Recent Livestream'
  const statusDescription = isLoadingLiveVideo
    ? 'Looking for the current broadcast'
    : broadcastState === 'live'
      ? 'Click to start watching'
      : broadcastState === 'archive'
        ? 'Latest service recording'
      : 'Latest service recording'
  const coverImageSrc = broadcastState === 'live'
    ? '/images/watch/thumbnail.webp'
    : '/images/watch/archive-cover.webp'
  const coverImageAlt = broadcastState === 'live'
    ? 'Great Redemption Ministries Live Stream'
    : 'Most recent service recording'

  return (
    <div className="w-full aspect-video relative bg-gray-100 rounded-2xl overflow-hidden">
        {!playerSrc ? (
          // Cover Image with Play Button
          <div
            className={`w-full h-full overflow-hidden relative group ${canPlayVideo ? 'cursor-pointer' : 'cursor-default'}`}
            onClick={() => {
              if (!canPlayVideo) {
                return
              }

              setShouldAutoplay(true)
              setShowVideo(true)
            }}
          >
            <Image
              src={coverImageSrc}
              alt={coverImageAlt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              quality={92}
            />
            {/* Overlay */}
            <div
              className={`absolute inset-0 transition-colors duration-300 ${
                broadcastState === 'live'
                  ? 'bg-grm-primary/20 group-hover:bg-grm-primary/10 mix-blend-multiply'
                  : 'bg-slate-950/45 group-hover:bg-slate-950/35'
              }`}
            />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className={`absolute inset-0 bg-white/30 rounded-full ${canPlayVideo ? 'animate-ping' : ''}`} />
                <div className={`rounded-full p-4 md:p-6 transition-all duration-300 shadow-lg backdrop-blur-md relative z-10 ${canPlayVideo ? 'bg-white/90 hover:bg-white group-hover:scale-110' : 'bg-white/70'}`}>
                  <Play className="h-8 w-8 md:h-12 md:w-12 text-grm-primary ml-1" fill="currentColor" />
                </div>
              </div>
            </div>

            {/* Text overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-grm-primary/90 to-transparent">
              <h3 className="text-white text-lg md:text-3xl font-bold mb-1 md:mb-2 max-w-[70%] md:max-w-full">
                {statusTitle}
              </h3>
              <p className="text-blue-100 text-sm md:text-lg font-medium max-w-[70%] md:max-w-full">
                {statusDescription}
              </p>
            </div>
          </div>
        ) : (
          // YouTube Video
          <iframe
            src={playerSrc}
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
