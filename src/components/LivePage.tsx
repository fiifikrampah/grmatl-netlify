"use client"

import LiveVideo from './LiveVideo'
import { Calendar, Search, Share, ArrowRight, Clock, Users, Heart } from 'lucide-react'
import { FaFacebook, FaYoutube } from 'react-icons/fa6'
import Reveal from '@/components/Reveal'
import Image from 'next/image'

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
    <div className="bg-white min-h-screen">
      {/* Cinematic Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background Image with Gradient Fade */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/watch/hero.jpg"
            alt="Church Online"
            fill
            className="object-cover object-[center_30%]"
            priority
          />
          {/* Gradient Overlay to fade into white content area */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/60 to-white" />
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

          <div className="text-center max-w-4xl mx-auto">
            <Reveal>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
                <span className="text-gray-900">Welcome to</span> <br />
                <span className="text-grm-primary">Church Online</span>
              </h1>
              <p className="text-xl text-gray-900 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
                Join our global community for worship and the Word.
                Wherever you are, you belong here.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 -mt-12 relative z-20">
        <Reveal delay={200} className="max-w-6xl mx-auto">
          {/* Player Container: small blue blur travels along the visible edge border */}
          <div className="relative rounded-[2rem] overflow-hidden bg-white shadow-xl" style={{ padding: '4px' }}>
            {/* Rotating gradient - clipped to ring by the inner white block */}
            <div
              className="absolute inset-0 rounded-[2rem] animate-[spin_6s_linear_infinite]"
              style={{
                background: 'conic-gradient(from 0deg, transparent 0deg, transparent 300deg, rgba(27,82,153,0.85) 330deg, transparent 360deg)',
              }}
            />
            {/* Blur layer: same gradient, blurred, so the "spot" is a soft blue blur */}
            <div
              className="absolute inset-0 rounded-[2rem] animate-[spin_6s_linear_infinite] pointer-events-none"
              style={{
                background: 'conic-gradient(from 0deg, transparent 0deg, transparent 300deg, rgba(27,82,153,0.6) 330deg, transparent 360deg)',
                filter: 'blur(8px)',
              }}
            />
            {/* Inner white: reveals only the 4px "edge" ring; same rounded shape */}
            <div className="absolute rounded-[calc(2rem-4px)] bg-white z-[1]" style={{ inset: '4px' }} aria-hidden />
            <div className="relative rounded-[calc(2rem-5px)] bg-white p-2 md:p-4 z-10">
              <LiveVideo />
            </div>
          </div>

          {/* Stream details - minimal, below player */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-8 text-gray-500 text-sm md:text-xl">
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-grm-primary shrink-0" />
              Every Sunday at 10:00 AM
            </span>
            <span className="hidden sm:inline text-gray-200" aria-hidden>·</span>
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4 text-grm-primary shrink-0" />
              Join our online community
            </span>
            <span className="hidden sm:inline text-gray-200" aria-hidden>·</span>
            <span className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-grm-primary shrink-0" />
              Prayer requests welcome
            </span>
          </div>
        </Reveal>
      </div>

      {/* Catch Up Section */}
      <section className="py-24 bg-gray-50/50 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Missed a Sermon?
              </h2>
              <p className="text-gray-500 mt-2 text-lg">
                Catch up on past sermons and teachings anytime.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <a
                href="https://www.youtube.com/channel/UCaWvM15oR08RL5DYKxQ4TzA"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center text-grm-primary font-semibold hover:text-blue-700 transition-colors"
              >
                View Full Archive
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </Reveal>
          </div>

          {/* Platform Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <Reveal delay={100} className="h-full">
              <a
                href="https://www.youtube.com/channel/UCaWvM15oR08RL5DYKxQ4TzA"
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full group"
              >
                <div className="bg-white rounded-3xl p-8 h-full border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                      <FaYoutube className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Watch on YouTube</h3>
                    <p className="text-gray-500 mb-8 flex-grow">
                      Subscribe to our channel for full sermons, worship highlights, and exclusive content.
                    </p>
                    <div className="flex items-center text-red-600 font-semibold group-hover:gap-2 transition-all">
                      Visit Channel <ArrowRight className="ml-2 h-5 w-5" />
                    </div>
                  </div>
                </div>
              </a>
            </Reveal>

            <Reveal delay={200} className="h-full">
              <a
                href="https://www.facebook.com/greatredemptionministies"
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full group"
              >
                <div className="bg-white rounded-3xl p-8 h-full border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-[#1877F2] mb-6 group-hover:scale-110 transition-transform duration-300">
                      <FaFacebook className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Join on Facebook</h3>
                    <p className="text-gray-500 mb-8 flex-grow">
                      Engage with our community, share messages, and watch live services with friends.
                    </p>
                    <div className="flex items-center text-[#1877F2] font-semibold group-hover:gap-2 transition-all">
                      Visit Page <ArrowRight className="ml-2 h-5 w-5" />
                    </div>
                  </div>
                </div>
              </a>
            </Reveal>
          </div>

          {/* Features Grid - Refined */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-200 pt-20">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Reveal key={index} delay={index * 100}>
                  <div className="flex gap-6 items-start group">
                    <div className="w-12 h-12 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center justify-center shrink-0 text-grm-primary group-hover:bg-blue-50 group-hover:scale-110 transition-all duration-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-500 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
