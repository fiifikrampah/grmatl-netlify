"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ArrowRight, Clock, MapPin, Shirt } from 'lucide-react'
import { getDisplayedEvents } from '@/lib/events.config'
import Reveal from '@/components/Reveal'

// Helper function to get the last Friday of the current month
function getLastFridayOfMonth(): Date {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  // Get the last day of the month
  const lastDay = new Date(year, month + 1, 0);

  // Find the last Friday
  let lastFriday = lastDay;
  while (lastFriday.getDay() !== 5) { // 5 = Friday
    lastFriday = new Date(lastFriday.getTime() - 24 * 60 * 60 * 1000);
  }

  return lastFriday;
}

// Helper function to extract date from event description
function getEventDate(event: { slug: string; description: string }): Date | null {
  if (event.slug === 'fire-friday') {
    return getLastFridayOfMonth();
  }

  // Try to parse date from description (format: "📅 Saturday, February 14th, 2026")
  const dateMatch = event.description.match(/📅\s*([^🕐👔🔥📍\n]+)/);
  if (dateMatch) {
    const dateStr = dateMatch[1].trim();
    const cleanedDate = dateStr.replace(/(\d+)(st|nd|rd|th)/g, '$1');
    const parsedDate = new Date(cleanedDate);
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate;
    }
  }

  return null;
}

// Helper to get ambient color based on event slug
function getEventColor(slug: string) {
  if (slug === 'fire-friday') return 'bg-orange-200/60';
  if (slug === 'heart-to-heart-prayer-breakfast') return 'bg-red-200/60';
  if (slug.includes('summer-camp')) return 'bg-yellow-200/60';
  if (slug === 'baptism') return 'bg-cyan-200/60';
  return 'bg-blue-200/60';
}

export default function EventsPage() {
  const events = getDisplayedEvents()
  const lastFriday = getLastFridayOfMonth()

  // Format the date for Fire Friday
  const fireFridayDate = lastFriday.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = getEventDate(a);
    const dateB = getEventDate(b);

    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;

    return dateA.getTime() - dateB.getTime();
  })

  return (
    <div className="bg-white min-h-screen">
      {/* Modern Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background Image with Gradient Fade */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/events/listing-hero.jpg"
            alt="Events Hero"
            fill
            sizes="100vw"
            className="object-cover object-[center_30%]"
            priority
            fetchPriority="high"
          />
          {/* Gradient Overlay to fade into white content area */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white" />
          {/* Stronger bottom fade to ensure seamless blending */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent" />
          {/* Subtle blur on desktop only — avoid GPU load and crashes on mobile */}
          <div className="absolute inset-0 bg-white/10 md:backdrop-blur-[1px]" />
          {/* Menu Visibility Gradient */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent" />
        </div>

        {/* Ambient Background — hidden on mobile to prevent GPU memory pressure */}
        <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/20 rounded-full blur-[120px] -translate-y-1/4 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-50/20 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Text Visibility Spotlight — desktop only */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[900px] h-[500px] bg-white/20 blur-[100px] -z-10 rounded-full pointer-events-none hidden md:block" />

          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
                <span className="text-gray-900">Upcoming</span> <span className="text-grm-primary">Gatherings</span>
              </h1>
              <p className="text-xl text-gray-900 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
                Join us for worship, fellowship, and community events. There&apos;s always something happening at GRM.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Events Grid */}
        {sortedEvents.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="h-10 w-10 text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No events scheduled</h3>
            <p className="text-gray-500">Check back soon for upcoming gatherings!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {sortedEvents.map((event, index) => (
              <Reveal key={event.slug} delay={index * 100} className="h-full">
                <Link href={event.path} className="group block h-full">
                  <article className="h-full flex flex-col bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative">

                    {/* Hover Ambient Blur Effect */}
                    <div className={`absolute bottom-0 right-0 w-[300px] h-[300px] ${getEventColor(event.slug)} rounded-full blur-[60px] translate-y-1/3 translate-x-1/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0`} />

                    {/* Image Container */}
                    <div className="relative z-10 aspect-[4/3] overflow-hidden bg-gray-100">
                      {event.imageUrl ? (
                        <Image
                          src={event.imageUrl}
                          alt={event.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                          <Calendar className="h-12 w-12 text-gray-300" />
                        </div>
                      )}

                      {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide backdrop-blur-md shadow-sm ${
                          event.isRegistrationOpen
                            ? 'bg-white/90 text-grm-primary'
                            : 'bg-gray-900/90 text-white'
                        }`}>
                          {event.isRegistrationOpen ? 'Registration Open' : 'Details Only'}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col flex-grow p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-grm-primary transition-colors line-clamp-2">
                        {event.title}
                      </h3>

                      <div className="space-y-3 mb-8 text-gray-500 text-sm flex-grow">
                        {event.description && event.description.split('\n').map((line, idx) => {
                          if (!line.trim()) return null;

                          // Handle Fire Friday date
                          if (event.slug === 'fire-friday' && line.includes('🔥') && line.includes('Monthly Event - Last Friday')) {
                            return (
                              <div key={idx} className="flex items-start gap-3">
                                <Calendar className="h-4 w-4 text-grm-primary shrink-0 mt-0.5" />
                                <span className="font-medium text-gray-700">{fireFridayDate}</span>
                              </div>
                            );
                          }

                          // Icon mapping
                          let Icon = null;
                          let text = line.trim();

                          if (line.includes('📅')) {
                            Icon = Calendar;
                            text = line.replace(/📅\s*/g, '').trim();
                          } else if (line.includes('🕐')) {
                            Icon = Clock;
                            text = line.replace(/🕐\s*/g, '').trim();
                          } else if (line.includes('📍')) {
                            Icon = MapPin;
                            text = line.replace(/📍\s*/g, '').trim();
                          } else if (line.includes('👔')) {
                            Icon = Shirt;
                            text = line.replace(/👔\s*/g, '').trim();
                          } else if (line.includes('🔥')) {
                            text = line.replace(/🔥\s*/g, '').trim();
                          }

                          // Clean text
                          text = text.replace(/[\uDC00-\uDFFF]/g, '').trim();
                          text = text.replace(/\uFFFD/g, '').trim();

                          if (Icon) {
                            return (
                              <div key={idx} className="flex items-start gap-3">
                                <Icon className="h-4 w-4 text-grm-primary shrink-0 mt-0.5" />
                                <span className="font-medium text-gray-700">{text}</span>
                              </div>
                            )
                          }
                          // Only show plain text description lines if they are short enough or we want them
                          // For the listing, maybe skip long descriptions to keep cards uniform?
                          // Let's keep them but clamped if needed.
                          return <p key={idx} className="line-clamp-2 leading-relaxed">{text}</p>
                        })}
                      </div>

                      <div className="flex items-center text-sm font-bold text-gray-900 group-hover:text-grm-primary transition-colors pt-6 border-t border-gray-100">
                        {event.isRegistrationOpen ? 'Register Now' : 'View Details'}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
