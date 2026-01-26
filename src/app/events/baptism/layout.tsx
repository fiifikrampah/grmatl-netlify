import type { Metadata } from 'next'
import { getEventBySlug } from '@/lib/events.config'

export async function generateMetadata(): Promise<Metadata> {
  const event = getEventBySlug('baptism')
  
  return {
    title: event ? `${event.title} | Great Redemption Ministries` : 'Baptism Service | Great Redemption Ministries',
    description: event?.description || 'Join us for a special baptism service at Great Redemption Ministries.',
  }
}

export default function BaptismLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
