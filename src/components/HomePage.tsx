"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar, ChevronLeft, ChevronRight, Clock, MapPin, Play, Heart } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'
import Reveal from '@/components/Reveal'
// Carousel images: public/images/home/worship-carousel/carousel-1.jpg … carousel-13.jpg
const WORSHIP_IMAGES = Array.from({ length: 13 }, (_, i) => ({
  src: `/images/home/worship-carousel/carousel-${i + 1}.jpg`,
  alt: 'Worship at GRM',
}))

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroBgRef = useRef<HTMLDivElement>(null)
  const [worshipPage, setWorshipPage] = useState(0)

  const [showBottomGradient, setShowBottomGradient] = useState(false)

  useEffect(() => {
    // Auto-cycle worship images
    const interval = setInterval(() => {
      setWorshipPage((prev) => (prev === WORSHIP_IMAGES.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setShowBottomGradient(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={containerRef} className="bg-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-screen min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <div ref={heroBgRef} className="absolute inset-0 z-0 will-change-transform h-[120%] -top-[10%]">
          <div className="absolute inset-0 animate-ken-burns will-change-transform">
            <Image
              src="/images/home/hero.jpg"
              alt="Worship at Great Redemption Ministries"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Subtle Dark Overlay for Premium Feel & Contrast - Center Burnt Orange Glow & Blue */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(234,88,12,0.25)_0%,_rgba(15,58,112,0.5)_60%,_rgba(15,58,112,0.9)_100%)] z-10" />
        </div>

        {/* Static Top Gradient for Menu Visibility */}
        <div className="absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />

        {/* Static Bottom Gradient Overlay - Outside Parallax Container - Shows only on scroll */}
        <div
          className={`absolute inset-x-0 bottom-0 z-10 h-64 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none transition-opacity duration-700 ease-in-out ${
            showBottomGradient ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div className="relative z-20 container mx-auto px-4 sm:px-6 text-center">
          <div className="mb-8 md:mb-10 flex justify-center animate-fade-in-up">
            <div className="animate-float">
             <Image
                src="/images/branding/church-name.png"
                alt="GRM Logo"
                width={1000}
                height={750}
                className="w-full max-w-[450px] sm:max-w-[500px] md:max-w-4xl h-auto drop-shadow-2xl"
              />
            </div>
          </div>

          <h1
            className="text-white text-lg sm:text-xl md:text-2xl font-serif italic tracking-wide mb-8 md:mb-12 max-w-3xl mx-auto px-2 animate-fade-in-up-delay"
            style={{
              animationDelay: '0.3s',
              textShadow: '0 4px 12px rgba(0,0,0,0.4)'
            }}
          >
            &ldquo;So if the son sets you free, you shall be free indeed&rdquo;
          </h1>

          <div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4 animate-fade-in-up"
            style={{ animationDelay: '0.5s', opacity: 0, animationFillMode: 'forwards' }}
          >
            <Link href="/live" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-white text-grm-primary hover:bg-gray-50 text-base sm:text-lg px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.3)] border-none">
                <Play className="mr-2 h-5 w-5 fill-current" />
                Watch Live
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/50 text-white backdrop-blur-md text-base sm:text-lg px-8 py-6 rounded-full transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:shadow-[0_0_30px_rgba(0,0,0,0.2)]">
                Plan Your Visit
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator - Premium Mouse Style */}
        <div
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-2 transition-all duration-700 ease-out hidden md:flex ${
            showBottomGradient ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
          }`}
        >
          {/* Mouse Body */}
          <div className="w-[26px] h-[42px] rounded-full border border-white/60 flex justify-center p-1 shadow-[0_0_15px_rgba(0,0,0,0.15)] backdrop-blur-[2px]">
            {/* Scroll Wheel */}
            <div className="w-1 h-2 bg-white rounded-full animate-scroll-wheel mt-1.5" />
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
                    src="/images/home/welcome-section.jpg"
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
            src="/images/home/verse-section.jpg"
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

      {/* Worship at GRM - Creative Center-Focused Carousel */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background gradient - White and GRM Blue */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-blue-50/50 to-blue-100/30" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <Reveal className="text-center mb-16">
            <p className="text-grm-primary font-semibold uppercase tracking-[0.3em] text-xs mb-3">Experience The Lord&apos;s Presence</p>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight mb-6">
              Worship at GRM
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              We were created to worship. Join us as we pursue God&apos;s heart through passionate praise and intimate worship.
            </p>
          </Reveal>

          <div className="relative max-w-[1400px] mx-auto h-[550px] md:h-[800px] flex items-center justify-center perspective-1000">
            {/* Carousel Controls */}
            <button
              onClick={() => {
                setWorshipPage((prev) => (prev === 0 ? WORSHIP_IMAGES.length - 1 : prev - 1))
              }}
              className="absolute left-4 md:left-12 z-40 p-3 md:p-4 rounded-full bg-white text-gray-900 shadow-xl border border-gray-100 hover:scale-110 transition-all duration-300 group hidden md:block"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6 text-gray-900 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={() => {
                setWorshipPage((prev) => (prev === WORSHIP_IMAGES.length - 1 ? 0 : prev + 1))
              }}
              className="absolute right-4 md:right-12 z-40 p-3 md:p-4 rounded-full bg-white text-gray-900 shadow-xl border border-gray-100 hover:scale-110 transition-all duration-300 group hidden md:block"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6 text-gray-900 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Mobile Controls (Closer to edge) */}
            <button
              onClick={() => {
                setWorshipPage((prev) => (prev === 0 ? WORSHIP_IMAGES.length - 1 : prev - 1))
              }}
              className="absolute left-2 z-40 p-2 rounded-full bg-white/90 text-gray-900 shadow-lg border border-gray-100 md:hidden"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => {
                setWorshipPage((prev) => (prev === WORSHIP_IMAGES.length - 1 ? 0 : prev + 1))
              }}
              className="absolute right-2 z-40 p-2 rounded-full bg-white/90 text-gray-900 shadow-lg border border-gray-100 md:hidden"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Carousel Items */}
            <div className="relative w-full md:w-full h-full flex items-center justify-center overflow-visible md:overflow-hidden">
               {[-2, -1, 0, 1, 2].map((offset) => {
                  // Calculate index with wrapping
                  let idx = worshipPage + offset;
                  if (idx < 0) idx = WORSHIP_IMAGES.length + idx;
                  if (idx >= WORSHIP_IMAGES.length) idx = idx - WORSHIP_IMAGES.length;

                  const img = WORSHIP_IMAGES[idx];

                  // Styles with precise centering using left-1/2 -translate-x-1/2
                  let transform = "-translate-x-1/2 scale-100 opacity-100 z-30"; // Center
                  let extraClasses = "grayscale-0"; // No border, no shadow

                  if (offset === -1) {
                     transform = "-translate-x-[115%] scale-[0.85] opacity-100 z-20"; // Left
                     extraClasses = "grayscale-0 brightness-110";
                  } else if (offset === 1) {
                     transform = "translate-x-[15%] scale-[0.85] opacity-100 z-20"; // Right
                     extraClasses = "grayscale-0 brightness-110";
                  } else if (offset === -2) {
                     transform = "-translate-x-[180%] scale-[0.7] opacity-0 z-10"; // Far left
                  } else if (offset === 2) {
                     transform = "translate-x-[80%] scale-[0.7] opacity-0 z-10"; // Far right
                  }

                  return (
                    <div
                      key={`${idx}-${offset}`}
                      className={`absolute top-1/2 left-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] lg:w-[500px] aspect-[3/4] transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] will-change-transform rounded-3xl overflow-hidden bg-gray-100 ${transform} ${extraClasses}`}
                    >
                       <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          sizes="(max-width: 768px) 600px, (max-width: 1024px) 800px, 1000px"
                          className="object-cover"
                          priority={offset === 0}
                          loading={offset === 0 ? undefined : 'lazy'}
                          quality={90}
                       />
                       {offset === 0 && (
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8" />
                       )}
                    </div>
                  );
               })}
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {WORSHIP_IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setWorshipPage(i)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === worshipPage ? 'w-8 bg-grm-primary' : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
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
