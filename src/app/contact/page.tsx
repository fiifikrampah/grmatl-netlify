"use client"

import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import Reveal from '@/components/Reveal'
import Image from 'next/image'

export default function Contact() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      content: "24 Geneva St, Hapeville, GA 30354",
      action: "Get Directions",
      href: "https://maps.google.com/?q=24+Geneva+St,+Hapeville,+GA+30354"
    },
    {
      icon: Phone,
      title: "Phone",
      content: "(404) 210 1136",
      action: "Call Us",
      href: "tel:+14042101136"
    },
    {
      icon: Mail,
      title: "Email",
      content: "grmmedia16@gmail.com",
      action: "Email Us",
      href: "mailto:grmmedia16@gmail.com"
    },
  ]

  const serviceTimes = [
    { day: "Sunday Service", time: "10:00 AM - 12:45 PM", note: "In-Person" },
    { day: "Wednesday Bible Study", time: "7:30 PM - 8:30 PM", note: "Virtual" },
    { day: "Friday Prayer", time: "7:30 PM - 9:00 PM", note: "In-Person" },
  ]

  return (
      <div className="bg-white">
        <PageHeader
          title="Contact Us"
          subtitle="We'd love to hear from you. Reach out with any questions or to learn more."
          imageSrc="/images/site-photos/contact/1.jpg"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

          {/* Contact Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <Reveal key={index} delay={index * 50}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-gray-100 group text-center">
                    <CardContent className="p-8 flex flex-col items-center h-full">
                      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-8 w-8 text-grm-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{info.title}</h3>
                      <p className="text-gray-600 mb-6 font-medium">{info.content}</p>
                      <a
                        href={info.href}
                        target={info.title === "Address" ? "_blank" : undefined}
                        className="mt-auto text-grm-primary font-semibold hover:text-grm-secondary transition-colors"
                      >
                        {info.action} &rarr;
                      </a>
                    </CardContent>
                  </Card>
                </Reveal>
              )
            })}
          </div>

          {/* Service Times */}
          <Reveal className="mb-16">
            <div className="bg-grm-primary rounded-3xl p-8 md:p-12 text-white shadow-2xl overflow-hidden relative">
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/site-photos/about/3.jpg"
                  alt="Service times background"
                  fill
                  className="object-cover opacity-[0.05]"
                />
              </div>
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

              <div className="text-center mb-10 relative z-10">
                <Clock className="h-12 w-12 mx-auto mb-4 text-blue-200" />
                <h3 className="text-3xl font-bold">Service Times</h3>
                <p className="text-blue-100 mt-2">Join us for worship and fellowship</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                {serviceTimes.map((service, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10 hover:bg-white/20 transition-colors">
                    <h4 className="font-bold text-white text-xl mb-2">{service.day}</h4>
                    <p className="text-blue-100 font-medium text-lg">{service.time}</p>
                    {service.note && (
                      <span className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-full text-xs uppercase tracking-wider font-semibold">
                        {service.note}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Map */}
          <Reveal className="h-[500px] bg-gray-100 rounded-3xl overflow-hidden shadow-lg">
            <iframe
              src="//maps.google.com/maps?output=embed&q=24%20Geneva%20St%2C%20Atlanta%20GA%2030354&t=m"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
            />
          </Reveal>
        </div>
      </div>
  )
}
