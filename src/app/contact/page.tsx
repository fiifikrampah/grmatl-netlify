import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function Contact() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      content: "24 Geneva St, Hapeville, GA 30354",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "(404) 555-0123",
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@grmatl.org",
    },
  ]

  const serviceTimes = [
    { day: "Sunday", time: "9:30 AM" },
    { day: "Wednesday", time: "7:30 PM" },
    { day: "Friday", time: "7:30 PM" },
  ]

  return (
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We&apos;d love to hear from you! Reach out to us with any questions or to learn more about our community.
            </p>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-8 text-center">
                    <Icon className="h-10 w-10 mx-auto mb-4 text-grm-primary" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{info.title}</h3>
                    <p className="text-gray-600 text-lg">{info.content}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Service Times */}
          <Card className="mb-12 hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <Clock className="h-10 w-10 mx-auto mb-4 text-grm-primary" />
                <h3 className="text-2xl font-semibold text-gray-900">Service Times</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {serviceTimes.map((service, index) => (
                  <div key={index} className="text-center p-6 bg-grm-blue-50 rounded-lg">
                    <h4 className="font-bold text-grm-primary text-xl mb-3">{service.day}</h4>
                    <p className="text-gray-700 font-semibold text-lg">{service.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Map */}
          <div className="h-96 bg-gray-200 rounded-lg overflow-hidden">
            <iframe
              src="//maps.google.com/maps?output=embed&q=24%20Geneva%20St%2C%20Atlanta%20GA%2030354&t=m"
              className="w-full h-full border-0"
              allowFullScreen
            />
          </div>
        </div>
      </div>
  )
}
