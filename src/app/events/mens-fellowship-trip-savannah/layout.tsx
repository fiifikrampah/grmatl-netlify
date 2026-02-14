import type { Metadata } from 'next'
import { getEventBySlug } from '@/lib/events.config'

export async function generateMetadata(): Promise<Metadata> {
  const event = getEventBySlug('mens-fellowship-trip-savannah')

  return {
    title: event ? `${event.title} | Great Redemption Ministries` : "Men's Fellowship Trip to Savannah | Great Redemption Ministries",
    description: event?.description || "Join us for a day of fellowship, bonding, and fun in historic Savannah. Forsyth Park, Riverboat Cruise, and Tybee Island Beach.",
  }
}

export default function MensFellowshipTripLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
