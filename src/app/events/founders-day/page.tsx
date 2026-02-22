"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Clock, ArrowLeft, Heart } from "lucide-react";
import Reveal from "@/components/Reveal";

export default function FoundersDayPage() {
  const date = "Sunday, March 8, 2026";
  const time = "12 Noon";
  const location = "24 Geneva Street, Hapeville GA 30354";

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Top section - subtle white-to-blue gradient for header visibility */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-gradient-to-b from-blue-50/90 via-blue-50/40 to-white">
        <div className="container mx-auto px-4">
          <Reveal>
            <Link
              href="/events"
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-grm-primary transition-colors mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </Link>
          </Reveal>

          <div className="max-w-4xl mx-auto text-center">
            <Reveal delay={50}>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-grm-primary bg-grm-blue-50 mb-6">
                <Heart className="inline h-3.5 w-3.5 mr-1.5 -mt-0.5" />
                No Registration Required
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight mb-6 leading-tight">
                Founder&apos;s Day Celebration
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Remembering and celebrating the life and legacy of our late Head Pastor and Founder
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Main content - flyer + event details */}
      <section className="py-12 md:py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Flyer */}
            <Reveal className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full bg-grm-blue-50 rounded-2xl -z-10 hidden sm:block" />
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/events/flyers/founders-day.webp"
                  alt="Founder's Day Celebration Flyer"
                  width={800}
                  height={1200}
                  className="w-full h-auto object-contain"
                  priority
                  quality={92}
                />
              </div>
            </Reveal>

            {/* Event details */}
            <Reveal delay={100}>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Event Details</h2>
                <div className="grid gap-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="w-12 h-12 rounded-lg bg-grm-blue-50 flex items-center justify-center shrink-0">
                      <Calendar className="h-6 w-6 text-grm-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-0.5">Date</p>
                      <p className="font-semibold text-gray-900">{date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="w-12 h-12 rounded-lg bg-grm-blue-50 flex items-center justify-center shrink-0">
                      <Clock className="h-6 w-6 text-grm-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-0.5">Time</p>
                      <p className="font-semibold text-gray-900">{time}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="w-12 h-12 rounded-lg bg-grm-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="h-6 w-6 text-grm-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-0.5">Location</p>
                      <p className="font-medium text-gray-900">{location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Legacy */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Honoring a Life of Faith & Service
            </h2>
          </Reveal>
          <Reveal delay={50}>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                Pastor Andrews Frimpong was a true vessel of The Lord and was endowed with the Gift of Healing.
                He founded Great Redemption Ministries Inc., dedicating his life to spreading the word of God
                and serving the community.
              </p>
              <p>
                As the General Overseer, his unwavering faith and compassionate leadership guided our
                congregation through many years of spiritual growth. His legacy lives on through the lives
                he touched and the ministry he built.
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
      </section>

      {/* CTA - GRM blue band */}
      <section className="py-16 md:py-20 bg-grm-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about/believes-bg.webp"
            alt=""
            fill
            quality={92}
            className="object-cover opacity-[0.05]"
          />
        </div>
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10 z-[1]" />
        <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Join Us in Celebration
            </h2>
            <p className="text-blue-100 mb-8">
              All are welcome. No registration required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-grm-primary font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
              >
                Learn More About Our Founder
              </Link>
              <a
                href="tel:404-210-1136"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/30"
              >
                Call: 404-210-1136
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
