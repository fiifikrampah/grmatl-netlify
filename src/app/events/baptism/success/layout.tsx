import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Registration Successful | Baptism Service | Great Redemption Ministries',
  description: 'Your baptism service registration has been received successfully.',
}

export default function BaptismSuccessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
