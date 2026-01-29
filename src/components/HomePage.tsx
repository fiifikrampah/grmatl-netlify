"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar, Clock, MapPin, Play, Heart } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'
import Reveal from '@/components/Reveal'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const WORSHIP_IMAGES = [
  { src: '/images/site-photos/home/4.jpg', alt: 'Worship at GRM' },
  { src: '/images/site-photos/home/5.jpg', alt: 'Community at GRM' },
  { src: '/images/site-photos/home/6.jpg', alt: 'Fellowship at GRM' },
  { src: '/images/site-photos/home/8.jpg', alt: 'Worship at GRM' },
  { src: '/images/site-photos/home/9.jpg', alt: 'Community at GRM' },
  { src: '/images/site-photos/home/10.jpg', alt: 'Fellowship at GRM' },
]
const IMAGES_PER_PAGE = 3

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroBgRef = useRef<HTMLDivElement>(null)
  const [worshipPage, setWorshipPage] = useState(0)
  const [worshipTransitioning, setWorshipTransitioning] = useState(false)
  const worshipPages = Math.ceil(WORSHIP_IMAGES.length / IMAGES_PER_PAGE)

  useEffect(() => {
    const container = containerRef.current
    const heroBg = heroBgRef.current
    if (!container || !heroBg) return
    let rafId: number | null = null
    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect()
        const height = rect.height
        if (rect.top > 0) {
          heroBg.style.transform = 'translateY(0px)'
        } else {
          const progress = Math.min(1, -rect.top / (height * 0.4))
          const y = progress * 150
          heroBg.style.transform = `translateY(${y}px) scale(${1 + progress * 0.05})`
        }
        rafId = null
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  useEffect(() => {
    if (worshipPages <= 1) return
    const id = setInterval(() => {
      setWorshipTransitioning(true)
      setTimeout(() => {
        setWorshipPage((p) => (p + 1) % worshipPages)
        setWorshipTransitioning(false)
      }, 400)
    }, 8000)
    return () => clearInterval(id)
  }, [worshipPages])

  return (
    <div ref={containerRef} className="bg-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-screen min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        <div ref={heroBgRef} className="absolute inset-0 z-0 will-change-transform">
          <Image
            src="/images/site-photos/home/1.jpg"
            alt="Worship at Great Redemption Ministries"
            fill
            className="object-cover"
            priority
          />
          {/* Premium gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 z-10" />
          <div
            className="absolute inset-0 z-10"
            style={{
              background: 'radial-gradient(circle at 50% 40%, transparent 0%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.6) 100%)'
            }}
          />
          <div className="absolute inset-0 backdrop-blur-[2px] z-10 opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
        </div>

        <div className="relative z-20 container mx-auto px-4 sm:px-6 text-center">
          <div className="mb-6 md:mb-8 flex justify-center animate-fade-in-up">
             <Image
                src="/images/grm2.png"
                alt="GRM Logo"
                width={1000}
                height={750}
                className="w-full max-w-[450px] sm:max-w-[500px] md:max-w-4xl h-auto drop-shadow-2xl"
              />
          </div>

          <h1
            className="text-white text-base sm:text-lg md:text-2xl font-light tracking-wide mb-10 md:mb-16 max-w-3xl mx-auto drop-shadow-md px-2 animate-fade-in-up-delay"
            style={{ animationDelay: '0.3s' }}
          >
            &ldquo;So if the son sets you free, you shall be free indeed&rdquo;
          </h1>

          <div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 animate-fade-in-up"
            style={{ animationDelay: '0.5s', opacity: 0, animationFillMode: 'forwards' }}
          >
            <Link href="/live" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-white text-grm-primary hover:bg-grm-blue-50 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-full transition-all duration-300 transform hover:scale-105 cursor-pointer">
                <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5 fill-current" />
                Watch Live
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#1B5299] text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-full backdrop-blur-sm transition-all duration-300 cursor-pointer">
                Plan Your Visit
              </Button>
            </Link>
          </div>
        </div>

        <div className="hidden sm:block absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 animate-fade-in" style={{ animationDelay: '1s', opacity: 0, animationFillMode: 'forwards' }}>
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex justify-center p-1.5 sm:p-2 animate-bounce-soft">
            <div className="w-1 h-1.5 sm:h-2 bg-white rounded-full" />
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="w-full lg:w-1/2 relative">
              <Reveal className="w-full">
                <div className="aspect-[4/5] relative rounded-2xl overflow-hidden shadow-2xl w-full">
                  <Image
                    src="/images/site-photos/home/2.jpg"
                    alt="Welcome to GRM"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                    <p className="text-white font-medium italic text-lg">
                      &quot;Come as you are, leave transformed.&quot;
                    </p>
                  </div>
                </div>
              </Reveal>
              <div className="hidden lg:block absolute -bottom-10 -right-10 w-40 h-40 bg-grm-blue-50 rounded-full -z-10 blur-3xl" />
              <div className="hidden lg:block absolute -top-10 -left-10 w-40 h-40 bg-purple-50 rounded-full -z-10 blur-3xl" />
            </div>

            <Reveal delay={100} className="lg:w-1/2 space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                A Home Where All <br />
                <span className="text-grm-primary">Are Welcome</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-light">
                <p>
                  Great Redemption Ministries is a diverse congregation of people who love Jesus.
                  We believe that if the Son makes you free, you shall be free indeed, and we invite
                  you to experience that freedom with us: to love, to grow, and to live for the glory of God.
                </p>
                <p>
                  Come join our spiritual family, where faith and fellowship come alive and lives
                  are transformed through God&apos;s love and grace.
                </p>
              </div>
              <div className="pt-4">
                <Link href="/about" className="group inline-flex items-center text-grm-primary font-semibold text-lg hover:text-grm-dark transition-colors">
                  Learn more about us
                  <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Service Times */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <Reveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Join Us in Worship</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We gather weekly to celebrate, learn, and grow together. There&apos;s a place for you here.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Sunday Service', time: '10:00 AM - 12:45 PM', icon: Calendar, color: 'bg-blue-100 text-blue-600', sub: 'In-Person' },
              { title: 'Wednesday Bible Study', time: '7:30 PM - 8:30 PM', icon: Clock, color: 'bg-purple-100 text-purple-600', sub: 'Virtual' },
              { title: 'Friday Prayer', time: '7:30 PM - 9:00 PM', icon: Heart, color: 'bg-red-100 text-red-600', sub: 'In-Person' },
            ].map((service, idx) => {
              const Icon = service.icon
              return (
              <Reveal key={idx} delay={idx * 50}>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full min-h-[220px] flex flex-col">
                  <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center mb-6 shrink-0`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 font-medium text-lg">{service.time}</p>
                  <div className="mt-auto min-h-[34px] flex items-end">
                    {service.sub ? (
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full uppercase tracking-wide">
                        {service.sub}
                      </span>
                    ) : (
                      <span className="inline-block" aria-hidden />
                    )}
                  </div>
                </div>
              </Reveal>
            )})}
          </div>
        </div>
      </section>

      {/* Experience Church Online */}
      <section className="relative py-32 bg-grm-primary overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/site-photos/home/3.jpg"
            alt="Background"
            fill
            className="object-cover object-[center_30%] opacity-20 mix-blend-overlay"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <Reveal className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Experience Church Online</h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 font-light">
              Can&apos;t make it in person? Join our global community every Sunday.
            </p>
            <Link href="/live">
              <Button size="lg" className="bg-white text-grm-primary hover:bg-blue-50 text-lg px-10 py-7 rounded-full shadow-2xl transition-transform hover:scale-105">
                Watch Live Stream
              </Button>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Worship at GRM - Gallery with pagination */}
      <section className="py-24 md:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-12 md:mb-16">
            <p className="text-grm-primary font-semibold uppercase tracking-[0.2em] text-sm mb-3">Community</p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">Worship at GRM</h2>
          </Reveal>

          <div className="max-w-6xl mx-auto">
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 transition-opacity duration-500 ease-in-out"
              style={{ opacity: worshipTransitioning ? 0 : 1 }}
            >
              {WORSHIP_IMAGES.slice(
                worshipPage * IMAGES_PER_PAGE,
                worshipPage * IMAGES_PER_PAGE + IMAGES_PER_PAGE
              ).map((img, idx) => (
                <div
                  key={`${worshipPage}-${idx}`}
                  className="relative w-full aspect-[3/4] min-h-[260px] md:min-h-0 rounded-2xl overflow-hidden group shadow-lg md:shadow-xl"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 400px"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              ))}
            </div>

            {worshipPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-10">
                <button
                  type="button"
                  onClick={() => setWorshipPage((p) => (p === 0 ? worshipPages - 1 : p - 1))}
                  className="p-2 rounded-full text-gray-400 hover:text-grm-primary hover:bg-gray-100 transition-colors cursor-pointer"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: worshipPages }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setWorshipPage(i)}
                      className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                        i === worshipPage
                          ? 'w-8 bg-grm-primary'
                          : 'w-2 bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Page ${i + 1}`}
                      aria-current={i === worshipPage ? 'true' : undefined}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setWorshipPage((p) => (p === worshipPages - 1 ? 0 : p + 1))}
                  className="p-2 rounded-full text-gray-400 hover:text-grm-primary hover:bg-gray-100 transition-colors cursor-pointer"
                  aria-label="Next"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Location / Visit CTA */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 lg:p-16 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-grm-primary font-bold tracking-wider uppercase text-sm mb-4">
                  <MapPin className="h-4 w-4 hidden sm:block" />
                  Visit Us
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">We&apos;re Saving a Seat for You</h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Located in the southern part of Atlanta, we maintain an open door policy.
                  Whether you&apos;re searching for a new church home or just visiting,
                  we&apos;re ready to welcome you with open arms.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-50 hidden sm:flex items-center justify-center text-grm-primary shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">24 Geneva St</p>
                      <p className="text-gray-500">Hapeville, GA 30354</p>
                    </div>
                  </div>
                  <div className="pt-6">
                    <Link href="/contact">
                      <Button className="w-full sm:w-auto bg-gray-900 text-white hover:bg-gray-800 rounded-full px-8 py-6 text-lg">
                        Contact & Directions
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="relative h-96 lg:h-auto bg-gray-200">
                <iframe
                  src="//maps.google.com/maps?output=embed&q=24%20Geneva%20St%2C%20Atlanta%20GA%2030354&t=m"
                  className="absolute inset-0 w-full h-full border-0 transition-all duration-500"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
