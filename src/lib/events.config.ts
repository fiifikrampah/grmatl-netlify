// Central configuration for all events
// Event pages should import and use getEventBySlug() to get their registration status

/** Returns the last Friday of a given month. */
function getLastFridayOfMonth(year: number, month: number): Date {
  const lastDay = new Date(year, month + 1, 0)
  let lastFriday = lastDay
  while (lastFriday.getDay() !== 5) {
    lastFriday = new Date(lastFriday.getTime() - 24 * 60 * 60 * 1000)
  }
  return lastFriday
}

/** Returns the next occurrence of Fire Friday (last Friday of each month). */
export function getNextFireFriday(): Date {
  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  let date = getLastFridayOfMonth(now.getFullYear(), now.getMonth())
  if (date.getTime() < startOfToday.getTime()) {
    const nextMonth = now.getMonth() === 11 ? 0 : now.getMonth() + 1
    const nextYear = now.getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear()
    date = getLastFridayOfMonth(nextYear, nextMonth)
  }
  return date
}

/** Number of days after an event's date before it is automatically hidden from the listing. */
const AUTO_HIDE_DAYS = 14

export interface EventConfig {
  slug: string
  title: string
  description: string
  path: string // The route path to the event page (e.g., '/events/summer-camp')
  shortPath?: string // Direct link for sharing (e.g., '/summer-camp' → grmatl.org/summer-camp)
  isRegistrationOpen: boolean // ⚠️ SOURCE OF TRUTH - control registration status here
  display: boolean // Control whether event appears on the public events listing page
  eventDate?: string // ISO date (e.g., '2026-03-08'). Events auto-hide 14 days after this date.
  imageUrl?: string
}

export const events: EventConfig[] = [
  {
    slug: 'summer-camp',
    title: 'Summer Camp 2026',
    description: 'Join us for an exciting week of fun, learning, and fellowship at our annual Youth & Children\'s Summer Camp.',
    path: '/events/summer-camp',
    shortPath: '/summer-camp',
    isRegistrationOpen: false,
    display: false,
    imageUrl: '/images/events/flyers/summer-camp-2025.webp',
  },
  {
    slug: 'heart-to-heart-prayer-breakfast',
    title: 'Heart to Heart Prayer Breakfast',
    description: 'Join us for a special prayer breakfast on Valentine\'s Day.\n\n📅 Saturday, February 14th, 2026\n🕐 10am - 1pm\n👔 Formal Attire - Red & Pink',
    path: '/events/heart-to-heart-prayer-breakfast',
    shortPath: '/heart-to-heart',
    isRegistrationOpen: false,
    display: false,
    eventDate: '2026-02-14',
    imageUrl: '/images/events/flyers/heart-to-heart-2026.webp',
  },
  {
    slug: 'fire-friday',
    title: 'Fire Friday',
    description: 'Join us for our monthly Watch Night Service on the last Friday of each month.\n\n🔥 Monthly Event - Last Friday\n🕐 9pm - 1am\n📍 24 Geneva Street, Hapeville GA 30354',
    path: '/events/fire-friday',
    isRegistrationOpen: false, // No registration required
    display: true,
    imageUrl: '/images/events/flyers/fire-friday.webp',
  },
  {
    slug: 'founders-day',
    title: "Founder's Day Celebration",
    description: "Remember and celebrate the life and legacy of our late Head Pastor and Founder, Pastor Andrews Frimpong.\n\n📅 Sunday, March 8th, 2026\n🕐 12 Noon\n📍 24 Geneva Street, Hapeville GA 30354",
    path: '/events/founders-day',
    shortPath: '/founders-day',
    isRegistrationOpen: false,
    display: true,
    eventDate: '2026-03-08',
    imageUrl: '/images/events/flyers/founders-day.webp',
  },
  {
    slug: 'baptism',
    title: 'Baptism Service',
    description: 'Interested in baptism? Register and we\'ll contact you with details about upcoming classes.\n\n📅 Date TBA\n🕐 Time TBA\n📍 GRM Main Auditorium',
    path: '/events/baptism',
    shortPath: '/baptism',
    isRegistrationOpen: true, // Registration required
    display: true,
    imageUrl: '/images/events/flyers/baptism.webp',
  },
  {
    slug: 'mens-fellowship-trip-savannah',
    title: "Men's Fellowship Trip to Savannah",
    description: 'A day of fellowship, bonding, and fun in historic Savannah.\n\n📅 Saturday, June 20th, 2026\n📍 Forsyth Park, Riverboat Cruise, Tybee Island Beach\n💰 $150 adults / $120 youth',
    path: '/events/mens-fellowship-trip-savannah',
    shortPath: '/savannah-trip',
    isRegistrationOpen: true,
    display: true,
    eventDate: '2026-06-20',
    imageUrl: '/images/events/flyers/men-trip.webp',
  },
  // Add more events here as you create them
  // Example:
  // {
  //   slug: 'winter-retreat',
  //   title: 'Winter Retreat 2025',
  //   description: 'A weekend of spiritual growth and community building.',
  //   path: '/events/winter-retreat', // or '/events/[slug]' if using dynamic routes
  //   isRegistrationOpen: true,
  // },
]

// Helper function to get events that should be displayed on the events listing page
// Events with an eventDate are automatically hidden AUTO_HIDE_DAYS after that date.
export function getDisplayedEvents(): EventConfig[] {
  const now = new Date()
  return events.filter(event => {
    if (!event.display) return false
    if (event.eventDate) {
      const cutoff = new Date(event.eventDate)
      cutoff.setDate(cutoff.getDate() + AUTO_HIDE_DAYS)
      if (now > cutoff) return false
    }
    return true
  })
}

// Helper function to get events with open registration (for backwards compatibility)
export function getOpenEvents(): EventConfig[] {
  return events.filter(event => event.isRegistrationOpen && event.display)
}

// Helper function to get event by slug
export function getEventBySlug(slug: string): EventConfig | undefined {
  return events.find(event => event.slug === slug)
}
