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

export interface EventConfig {
  slug: string
  title: string
  description: string
  path: string // The route path to the event page (e.g., '/summer-camp' or '/events/winter-retreat')
  isRegistrationOpen: boolean // ⚠️ SOURCE OF TRUTH - control registration status here
  display: boolean // Control whether event appears on the public events listing page
  imageUrl?: string
}

export const events: EventConfig[] = [
  {
    slug: 'summer-camp',
    title: 'Summer Camp 2026',
    description: 'Join us for an exciting week of fun, learning, and fellowship at our annual Youth & Children\'s Summer Camp.',
    path: '/events/summer-camp',
    isRegistrationOpen: false,
    display: false,
    imageUrl: '/images/events/flyers/summer-camp-2025.webp',
  },
  {
    slug: 'heart-to-heart-prayer-breakfast',
    title: 'Heart to Heart Prayer Breakfast',
    description: 'Join us for a special prayer breakfast on Valentine\'s Day.\n\n📅 Saturday, February 14th, 2026\n🕐 10am - 1pm\n👔 Formal Attire - Red & Pink',
    path: '/events/heart-to-heart-prayer-breakfast',
    isRegistrationOpen: false,
    display: true,
    imageUrl: '/images/events/flyers/heart-to-heart-2026.webp',
  },
  {
    slug: 'fire-friday',
    title: 'Fire Friday',
    description: 'Join us for our monthly Watch Night Service on the last Friday of each month.\n\n🔥 Monthly Event - Last Friday\n🕐 9pm - 1am\n📍 GRM Main Auditorium',
    path: '/events/fire-friday',
    isRegistrationOpen: false, // No registration required
    display: true,
    imageUrl: '/images/events/flyers/fire-friday.webp',
  },
  {
    slug: 'baptism',
    title: 'Baptism Service',
    description: 'Interested in baptism? Register and we\'ll contact you with details about upcoming classes.\n\n📅 Date TBA\n🕐 Time TBA\n📍 GRM Main Auditorium',
    path: '/events/baptism',
    isRegistrationOpen: true, // Registration required
    display: true,
    imageUrl: '/images/events/flyers/baptism.webp',
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
export function getDisplayedEvents(): EventConfig[] {
  return events.filter(event => event.display)
}

// Helper function to get events with open registration (for backwards compatibility)
export function getOpenEvents(): EventConfig[] {
  return events.filter(event => event.isRegistrationOpen && event.display)
}

// Helper function to get event by slug
export function getEventBySlug(slug: string): EventConfig | undefined {
  return events.find(event => event.slug === slug)
}
