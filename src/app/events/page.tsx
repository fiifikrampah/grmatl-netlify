"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getDisplayedEvents } from '@/lib/events.config'

export default function EventsPage() {
  const events = getDisplayedEvents()

  return (
    <div className="min-h-screen bg-gradient-to-b from-grm-blue-50 to-white pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center py-8 sm:py-12 mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-grm-primary mb-4">
            Upcoming Events
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Join us for these exciting events.
          </p>
        </div>

        {/* Events Grid */}
        {events.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">No events available at this time.</p>
            <p className="text-gray-500 mt-2">Check back soon for upcoming events!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {events.map((event) => (
              <Card
                key={event.slug}
                className="overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                {event.imageUrl ? (
                  <div className="relative w-full h-64 sm:h-80">
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 sm:h-56 bg-gradient-to-br from-grm-primary to-grm-secondary flex items-center justify-center">
                    <Calendar className="h-16 w-16 text-white opacity-50" />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl text-grm-primary">
                    {event.title}
                  </CardTitle>
                  {event.description && (
                    <CardDescription className="text-sm sm:text-base text-gray-600">
                      {event.description.split('\n').map((line, index) => {
                        if (!line.trim()) {
                          return <br key={index} />;
                        }
                        // Format lines with emojis - bold the text after emoji
                        if (line.includes('📅') || line.includes('🕐') || line.includes('👔')) {
                          const emojiMatch = line.match(/^(📅|🕐|👔)\s*(.+)$/);
                          if (emojiMatch) {
                            const [, emoji, text] = emojiMatch;
                            return (
                              <div key={index} className={index > 0 ? 'mt-1.5' : ''}>
                                <span>{emoji} </span>
                                <span className="font-semibold text-gray-800">{text}</span>
                              </div>
                            );
                          }
                        }
                        return <div key={index} className={index > 0 ? 'mt-1.5' : ''}>{line}</div>;
                      })}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-end">
                  <Link href={event.path} className="w-full">
                    <Button className="w-full bg-grm-primary hover:bg-grm-secondary text-white">
                      View Details & Register
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
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
