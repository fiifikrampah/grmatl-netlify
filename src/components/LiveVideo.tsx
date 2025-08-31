import { Card, CardContent } from '@/components/ui/card'
import { Clock, Users, Heart } from 'lucide-react'

export default function LiveVideo() {
  // This URL will be updated by the GitHub Actions workflow
  const liveVideoUrl = "https://www.youtube.com/embed/HB2yeJqMHnM?si=4o0cL6UmrvIApmrY"

  const features = [
    {
      icon: Clock,
      text: "Every Sunday at 9:30 AM",
    },
    {
      icon: Users,
      text: "Join our online community",
    },
    {
      icon: Heart,
      text: "Prayer requests welcome",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-grm-blue-600 to-grm-blue-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-[48px] font-bold mb-6 text-black">
            Watch Us Live
          </h1>
          <p className="text-[18px] max-w-3xl mx-auto text-black">
            Experience the presence of God through our live streams. Join us every Sunday
            for worship, prayer, and powerful messages that will inspire and transform your life.
          </p>
        </div>
      </section>

      {/* Video Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="aspect-video w-full max-w-4xl mx-auto">
          <iframe
            src={liveVideoUrl}
            title="YouTube video player"
            className="w-full h-full rounded-lg shadow-2xl"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        {/* Stream Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <Icon className="h-8 w-8 mx-auto mb-4 text-grm-primary" />
                  <p className="font-medium">{feature.text}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>
    </div>
  )
}
