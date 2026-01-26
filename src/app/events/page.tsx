"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getDisplayedEvents } from '@/lib/events.config'

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
    // Try to parse common date formats
    // "Saturday, February 14th, 2026" -> "February 14, 2026"
    const cleanedDate = dateStr.replace(/(\d+)(st|nd|rd|th)/g, '$1');
    const parsedDate = new Date(cleanedDate);
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate;
    }
  }
  
  return null;
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
    
    // Events without dates go to the end
    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;
    
    return dateA.getTime() - dateB.getTime();
  })

  return (
    <div className="min-h-screen bg-white pt-20 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-grm-primary mb-2">
            Upcoming Events
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Join us for worship, fellowship, and community events.
          </p>
        </div>

        {/* Events Grid */}
        {sortedEvents.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-700 text-lg font-semibold mb-1">No events available at this time.</p>
            <p className="text-gray-500 text-sm">Check back soon for upcoming events!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
            {sortedEvents.map((event) => (
              <Card
                key={event.slug}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group border border-gray-200 hover:border-grm-primary/50 h-full"
              >
                {event.imageUrl ? (
                  <div className="relative w-full h-64 sm:h-80 overflow-hidden bg-gray-50 flex-shrink-0">
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="w-full h-64 sm:h-80 bg-gradient-to-br from-grm-primary to-grm-secondary flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-12 w-12 text-white/70" />
                  </div>
                )}
                <CardHeader className="pb-3 pt-4 flex-grow flex flex-col">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <CardTitle className="text-xl sm:text-2xl text-grm-primary font-bold leading-tight group-hover:text-grm-secondary transition-colors">
                      {event.title}
                    </CardTitle>
                    {!event.isRegistrationOpen && (
                      <span className="px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-full whitespace-nowrap flex-shrink-0">
                        No Registration
                      </span>
                    )}
                  </div>
                  {event.description && (
                    <CardDescription className="text-sm sm:text-base text-gray-600 leading-relaxed flex-grow">
                      {event.description.split('\n').map((line, index) => {
                        if (!line.trim()) {
                          return <br key={index} />;
                        }
                        // Replace "Monthly Event - Last Friday" with actual date for Fire Friday
                        if (event.slug === 'fire-friday' && line.includes('🔥') && line.includes('Monthly Event - Last Friday')) {
                          return (
                            <div key={index} className={index > 0 ? 'mt-1' : ''}>
                              <span>🔥 </span>
                              <span className="font-semibold text-gray-700">{fireFridayDate}</span>
                            </div>
                          );
                        }
                        // Format lines with emojis - bold the text after emoji
                        if (line.includes('📅') || line.includes('🕐') || line.includes('👔') || line.includes('🔥') || line.includes('📍')) {
                          const emojiMatch = line.match(/^(📅|🕐|👔|🔥|📍)\s*(.+)$/);
                          if (emojiMatch) {
                            const [, emoji, text] = emojiMatch;
                            return (
                              <div key={index} className={index > 0 ? 'mt-1' : ''}>
                                <span>{emoji} </span>
                                <span className="font-semibold text-gray-700">{text}</span>
                              </div>
                            );
                          }
                        }
                        return <div key={index} className={index > 0 ? 'mt-1' : ''}>{line}</div>;
                      })}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="pt-2 pb-4 flex-shrink-0">
                  <Link 
                    href={event.path} 
                    className="w-full bg-gradient-to-r from-[#1B5299] to-[#2d6bc7] hover:from-[#2d6bc7] hover:to-[#1B5299] text-white font-semibold py-3 px-5 text-base shadow-md hover:shadow-lg transition-all duration-300 rounded-md flex items-center justify-center gap-2 group cursor-pointer border-0 outline-none focus-visible:ring-2 focus-visible:ring-[#1B5299] focus-visible:ring-offset-2 block text-center no-underline"
                    style={{ color: 'white' }}
                  >
                    <span className="text-white">
                      {event.isRegistrationOpen ? 'View Details & Register' : 'View Details'}
                    </span>
                    <ArrowRight className="h-4 w-4 text-white group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
