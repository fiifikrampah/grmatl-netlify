"use client"

import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Users, BookOpen, Home, Heart } from 'lucide-react'
import Reveal from '@/components/Reveal'

export default function AboutPage() {
  const ministries = [
    {
      icon: Home,
      title: "Place Of Haven",
      description: "Here at Great Redemption Ministries, we are family. We love each and everyone the same, just as God first loved us.",
    },
    {
      icon: Users,
      title: "Connect Groups",
      description: "Our various ministries include: Men and Women Fellowship, The Eagles Generation, Redemption in Motion, Children Ministry.",
    },
    {
      icon: BookOpen,
      title: "Study Bible",
      description: "We believe in the entirety of The Bible and abide by it. We regard The Word of God as the sole and whole truth.",
    },
    {
      icon: Heart,
      title: "House of Prayer",
      description: "Just as the Bible encourages believers to pray without ceasing, Great Redemption Ministries members act in one accord when it comes to prayer.",
    },
  ]

  return (
    <div className="space-y-0">
      {/* Modern Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-white">
        {/* Background Image with Gradient Fade */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about/hero.jpg"
            alt="About Us"
            fill
            className="object-cover object-[center_40%]"
            priority
          />
          {/* Gradient Overlay to fade into white content area */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-white" />
          {/* Stronger bottom fade to ensure seamless blending */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent" />
          {/* Subtle blur to keep text readable and modern */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />
          {/* Menu Visibility Gradient */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent" />
        </div>

        {/* Ambient Background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/20 rounded-full blur-[120px] -translate-y-1/4 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-50/20 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Text Visibility Spotlight */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[900px] h-[500px] bg-white/20 blur-[100px] -z-10 rounded-full pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
                <span className="text-gray-900">About</span> <span className="text-grm-primary">Us</span>
              </h1>
              <p className="text-xl text-gray-900 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
                Learn about our history, our founder, and our mission to serve.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <Reveal className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full bg-grm-blue-50 rounded-2xl -z-10"></div>
              <Image
                src="/images/branding/founder.jpg"
                alt="Pastor Andrews Frimpong"
                width={1400}
                height={1050}
                className="relative z-10 rounded-2xl shadow-2xl"
              />
            </Reveal>

            {/* Content */}
            <Reveal delay={100} className="space-y-8">
              <div>
                <h2 className="text-sm font-bold text-grm-primary uppercase tracking-widest mb-2">Our Founder</h2>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Pastor Andrews Frimpong
                </h1>
                <p className="text-xl text-gray-500 mt-2 font-light">1954 - 2024</p>
              </div>

              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Pastor Andrews Frimpong was a true vessel of The Lord and was endowed
                  with the Gift of Healing. He founded Great Redemption Ministries Inc., dedicating his
                  life to spreading the word of God and serving the community.
                </p>
                <p>
                  As the General Overseer, his unwavering faith and compassionate leadership guided our
                  congregation through many years of spiritual growth. His legacy lives on through the
                  lives he touched and the ministry he built.
                </p>
                <div className="pl-6 border-l-4 border-grm-primary">
                  <p className="text-gray-700 font-medium">
                    His presence remains strong in the hearts of all who knew him. We honor his memory
                    and strive to uphold the values and mission he instilled in our church.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Church Beliefs Section */}
      <section className="py-24 bg-grm-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about/believes-bg.jpg"
            alt="Church community"
            fill
            className="object-cover opacity-[0.05]"
          />
        </div>
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10 z-[1]"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
              We are a Church That Believes in Jesus
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed font-light">
              Therefore if the Son makes you free, you shall be free indeed. We believe in that
              freedom: freedom to love, to serve, and to live for the glory of God.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Ministries Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Ministries</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover the various ways we serve our community and grow in faith together.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ministries.map((ministry, index) => {
              const Icon = ministry.icon
              return (
                <Reveal key={index} delay={index * 50}>
                  <Card className="h-full hover:shadow-xl transition-shadow duration-300 border-none shadow-md">
                    <CardContent className="p-10 flex flex-col md:flex-row gap-6 items-start">
                      <div className="bg-blue-50 p-4 rounded-xl shrink-0">
                        <Icon className="h-8 w-8 text-grm-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{ministry.title}</h3>
                        <p className="text-gray-600 leading-relaxed text-lg">{ministry.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="space-y-8 order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Our History & Beliefs
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Established in 2006, Great Redemption Ministries was born from a divine calling
                  inspired by John 8:36: <span className="text-grm-primary font-semibold">&quot;Therefore if The Son makes you free, you shall be free indeed.&quot;</span>
                </p>
                <p>
                  We affirm the Holy Bible as the inspired Word of God and the basis for our belief.
                  We voluntarily band ourselves together as a body of baptized believers in Jesus Christ
                  personally committed to sharing the good news of salvation.
                </p>
              </div>
            </div>

             {/* Image */}
             <div className="relative order-1 lg:order-2">
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-gray-100 rounded-2xl -z-10"></div>
              <Image
                src="/images/about/content-section.jpg"
                alt="Church history"
                width={600}
                height={400}
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
