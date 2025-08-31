// import Link from 'next/link' // Not used in this component
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import LiveVideo from './LiveVideo'
import { Calendar, Search, Share } from 'lucide-react'
import { FaFacebook, FaYoutube } from 'react-icons/fa6'

export default function LivePage() {
  const features = [
    {
      icon: Calendar,
      title: "Weekly Messages",
      description: "Access our latest sermons and teachings every week",
    },
    {
      icon: Search,
      title: "Search Archive",
      description: "Find specific topics or messages from our extensive collection",
    },
    {
      icon: Share,
      title: "Share & Discuss",
      description: "Share your favorite messages and engage with our community",
    },
  ]

  return (
    <div className="space-y-0">
      {/* Live Video Section */}
      <LiveVideo />

      {/* Sermon Archive Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[48px] font-bold text-gray-900 mb-6">
              Sermon Archive
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Did you miss last week&apos;s message? Looking to share one of your favorite messages from years ago?
              Find them all on our Facebook Page. We&apos;d love to see you in person, but if you&apos;re unable to make
              it on Sunday, join us live at our online campus.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <a
              href="https://www.facebook.com/greatredemptionministies"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg hover:scale-105 cursor-pointer transition-all duration-200">
                <FaFacebook className="mr-2 h-5 w-5" />
                Browse All Sermons
              </Button>
            </a>
            <a
              href="https://www.youtube.com/channel/UCaWvM15oR08RL5DYKxQ4TzA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white hover:shadow-lg hover:scale-105 cursor-pointer transition-all duration-200">
                <FaYoutube className="mr-2 h-5 w-5" />
                YouTube Channel
              </Button>
            </a>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="text-center h-full">
                  <CardContent className="p-8">
                    <Icon className="h-12 w-12 mx-auto mb-6 text-grm-primary" />
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
