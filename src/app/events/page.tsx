"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Calendar, ArrowRight, Clock, MapPin, Shirt } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getDisplayedEvents } from '@/lib/events.config'
import PageHeader from '@/components/PageHeader'
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

export default function EventsPage() {
  const router = useRouter()
  const events = getDisplayedEvents()
  const lastFriday = getLastFridayOfMonth()

  // Prefetch event detail pages so "View Details" / "Register" open instantly
  useEffect(() => {
    getDisplayedEvents().forEach((event) => {
      router.prefetch(event.path)
    })
  }, [router])

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
      <PageHeader
        title="Upcoming Events"
        subtitle="Join us for worship, fellowship, and community events."
        imageSrc="/images/site-photos/events/1.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Events Grid */}
        {sortedEvents.length === 0 ? (
          <div className="text-center py-24 bg-gray-50 rounded-3xl border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No events currently scheduled</h3>
            <p className="text-gray-500">Check back soon for upcoming gatherings!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedEvents.map((event, index) => (
              <Reveal key={event.slug} delay={index * 50}>
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full border-gray-100 group">
                  {/* Image Section */}
                  <div className="relative w-full h-64 overflow-hidden bg-gray-100">
                    {event.imageUrl ? (
                      <Image
                        src={event.imageUrl}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-grm-primary to-blue-600 flex items-center justify-center">
                        <Calendar className="h-16 w-16 text-white/50" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-grm-primary shadow-sm">
                      {event.isRegistrationOpen ? 'Registration Open' : 'Details Only'}
                    </div>
                  </div>

                  <CardHeader className="pb-4 pt-6 px-6 flex-shrink-0 min-h-[80px] flex items-center">
                    <CardTitle className={`font-bold text-gray-900 group-hover:text-grm-primary transition-colors leading-tight ${
                      event.title.length > 25
                        ? 'text-lg md:text-xl'
                        : 'text-xl md:text-2xl'
                    }`}>
                      {event.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="px-6 pb-8 flex-grow flex flex-col min-h-[280px]">
                    <div className="space-y-3 mb-6 text-gray-600 flex-grow">
                      {event.description && event.description.split('\n').map((line, idx) => {
                        if (!line.trim()) return null;

                        // Handle Fire Friday date replacement
                        if (event.slug === 'fire-friday' && line.includes('🔥') && line.includes('Monthly Event - Last Friday')) {
                          return (
                            <div key={idx} className="flex items-start gap-3">
                              <Calendar className="h-5 w-5 text-grm-primary shrink-0 mt-0.5" />
                              <span className="font-medium text-gray-900">{fireFridayDate}</span>
                            </div>
                          );
                        }

                        // Icon mapping
                        let Icon = null;
                        let text = line.trim();

                        // Handle emojis and map to icons
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

                        // Clean up any remaining special characters or encoding issues
                        text = text.replace(/[\uDC00-\uDFFF]/g, '').trim(); // Remove surrogate pairs
                        text = text.replace(/�/g, '').trim(); // Remove replacement characters

                        if (Icon) {
                          return (
                            <div key={idx} className="flex items-start gap-3">
                              <Icon className="h-5 w-5 text-grm-primary shrink-0 mt-0.5" />
                              <span className="font-medium text-gray-900">{text}</span>
                            </div>
                          )
                        }
                        return <p key={idx} className="text-sm leading-relaxed">{text}</p>
                      })}
                    </div>

                    <Link
                      href={event.path}
                      className="w-full mt-auto group/btn inline-flex items-center justify-center gap-2 bg-gray-900 text-white hover:bg-grm-primary px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      {event.isRegistrationOpen ? 'Register Now' : 'View Details'}
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
