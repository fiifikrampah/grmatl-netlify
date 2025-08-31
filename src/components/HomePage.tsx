"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
// import { Card, CardContent } from '@/components/ui/card' // Not used in this component
// import { MapPin, Users, BookOpen, Heart } from 'lucide-react' // Not used in this component

export default function HomePage() {
  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden py-20">
        {/* Background Image - No Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/cover-art.jpg"
            alt="Great Redemption Ministries"
            fill
            className="object-cover"
          />
        </div>

        {/* Animated Overlay Image - Enhanced with Dynamic Entrance */}
        <motion.div
          className="flex items-center justify-center mb-12"
          initial={{ x: -100, scale: 0.3, opacity: 0, rotate: -10 }}
          animate={{
            x: 0,
            scale: 1,
            opacity: 1,
            rotate: 0
          }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.3 }
          }}
          whileInView={{
            y: [-5, 5, -5],
            transition: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          viewport={{ once: false }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            mass: 0.8,
            delay: 0.3
          }}
        >
          <Image
            src="/images/grm2.png"
            alt="GRM Logo"
            width={2800}
            height={2100}
            className="object-contain drop-shadow-2xl w-full max-w-6xl h-auto"
          />
        </motion.div>

        {/* Content - Below the Image */}
        <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <motion.h6
            className="text-lg md:text-xl mb-8 font-light"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            &ldquo;So if the son sets you free, you shall be free indeed&rdquo;
          </motion.h6>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <Link href="/live">
              <Button size="lg" className="bg-grm-primary text-white hover:bg-grm-secondary hover:shadow-xl hover:scale-105 text-lg px-8 py-4 shadow-lg cursor-pointer transition-all duration-200">
                WATCH US LIVE
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              A Home Where All Are Welcome
            </h2>
            <p className="text-xl text-gray-600">Plan a visit</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Great Redemption Ministries is a diverse congregation of people who love Jesus.
                Come and witness how active we are in each other&apos;s lives and our community.
                We&apos;re committed to using our God-given gifts and talents to minister to others.
                At Great Redemption Ministries, we know that inspiration opens hearts.
                An open heart is an open mind and an open mind is one that can practice tolerance,
                experience gratitude and feel the glory of God.
              </p>
            </div>
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                We believe God&apos;s presence lives within everyone, but it is through genuine faith
                and connection with Him that His power is truly experienced. Our mission is to serve
                God and His people, offering worship and ministries that uplift and inspire. We invite
                you to be part of our growing spiritual family, where faith and fellowship come alive
                and where lives are transformed through God&apos;s love and grace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Times Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Service Times & Schedules
            </h2>
            <blockquote className="text-lg md:text-xl font-semibold text-gray-700 border-l-4 border-grm-primary pl-6 italic max-w-2xl mx-auto">
              &ldquo;Not giving up meeting together, as some are in the habit of doing, but encouraging
              one another—and all the more as you see the Day approaching.&rdquo;
              <br />
              <span className="text-sm font-normal text-gray-600">Hebrews 10:25</span>
            </blockquote>
          </div>

          <div className="text-center mb-12">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
              <div className="space-y-3">
                <div className="text-xl font-semibold text-gray-900">
                  <span className="text-grm-primary font-bold">Sunday:</span> 9:30 AM - 12:00 PM
                </div>
                <div className="text-xl font-semibold text-gray-900">
                  <span className="text-grm-primary font-bold">Wednesday:</span> 7:30 PM - 9:00 PM
                </div>
                <div className="text-xl font-semibold text-gray-900">
                  <span className="text-grm-primary font-bold">Friday:</span> 7:30 PM - 9:00 PM
                </div>
              </div>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Image
              src="/images/highlight-1.jpg"
              alt="Church highlight"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-80"
            />
            <Image
              src="/images/highlight-2.jpg"
              alt="Church highlight"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-80"
            />
            <Image
              src="/images/highlight-3.jpg"
              alt="Church highlight"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-80"
            />
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Are you new here?</h3>
              <p className="text-gray-700 mb-6">
                Here at Great Redemption Ministries,<br className="sm:hidden" />
                we are family. We love each and everyone the same, just as God first loved us.
              </p>
              <Link href="/contact">
                <Button size="lg" className="bg-grm-primary text-white hover:bg-grm-secondary hover:shadow-lg hover:scale-105 cursor-pointer transition-all duration-200">
                  WORSHIP WITH US
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Online Worship Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <Image
              src="/images/eventfeatured1bg.jpg"
              alt="Online worship background"
              width={1200}
              height={600}
              className="w-full h-96 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/50 rounded-lg"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white text-center p-8">
              <div>
                <p className="text-2xl font-bold mb-4">WATCH ONLINE</p>
                <h3 className="text-3xl md:text-4xl font-bold mb-6">
                  Join us for Church Online every Sunday
                </h3>
                <Link href="/live">
                  <Button size="lg" className="bg-grm-primary text-white hover:bg-grm-secondary hover:shadow-xl hover:scale-105 shadow-lg cursor-pointer transition-all duration-200">
                    WATCH NOW
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map */}
            <div className="h-96 bg-gray-200 rounded-lg overflow-hidden">
              <iframe
                src="//maps.google.com/maps?output=embed&q=24%20Geneva%20St%2C%20Atlanta%20GA%2030354&t=m"
                className="w-full h-full border-0"
                allowFullScreen
              />
            </div>

            {/* Location Info */}
            <div className="flex items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Where can you find us?
                </h2>
                <p className="text-xl font-semibold text-grm-primary mb-4">
                  24 GENEVA ST, HAPEVILLE GA, 30354
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Located in the southern part of Atlanta, Great Redemption Ministries is more than
                  ready to embrace newcomers. We maintain an open door policy and are every ready to hug you in and make you
                  feel comfortable. Whether you&apos;re in search of a new church home, or looking to try something new, or not
                  even sure, we have a place right here for you! Why don&apos;t you pay us a visit soon? We await you!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
