"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Clock, Flame, ArrowLeft } from "lucide-react";
import { getNextFireFriday } from "@/lib/events.config";
import Reveal from "@/components/Reveal";

export default function FireFridayPage() {
  const nextFireFriday = getNextFireFriday();
  const time = "9pm - 1am";
  const location = "GRM Main Auditorium";
  const address = "24 Geneva Street, Hapeville GA 30354";
  const theme = "GETTING HEAVEN'S ATTENTION";
  const scripture = "Present your case, says the LORD. Set forth your arguments, says the King of Jacob.";
  const scriptureRef = "Isaiah 41:21";
  const subtitle = "February Watch Night Service";

  const badgeDate = nextFireFriday.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const formattedDate = nextFireFriday.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen">
      {/* Top section - subtle pink, purple, white gradient */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-violet-50/80 via-purple-50/40 to-white">
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

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left: Title + details */}
              <div className="lg:col-span-5 order-2 lg:order-1">
                <Reveal delay={50}>
                  <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-grm-primary bg-grm-blue-50 mb-6">
                    <Flame className="inline h-3.5 w-3.5 mr-1.5 -mt-0.5" />
                    Next: {badgeDate} · No Registration
                  </span>
                </Reveal>
                <Reveal delay={100}>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 leading-[1.1] tracking-tight">
                    FIRE <span className="text-grm-primary">FRIDAY</span>
                  </h1>
                  <p className="text-gray-500 text-sm uppercase tracking-[0.2em] font-medium mb-4">
                    {subtitle}
                  </p>
                  <p className="text-xl md:text-2xl text-gray-800 font-semibold leading-snug mb-8">
                    {theme}
                  </p>
                </Reveal>
                <Reveal delay={150}>
                  <div className="space-y-3 text-gray-700">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-grm-primary shrink-0" />
                      <span className="font-medium">{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-grm-primary shrink-0" />
                      <span className="font-medium">{time}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-grm-primary shrink-0 mt-0.5" />
                      <span>{location}<br /><span className="text-sm text-gray-500">{address}</span></span>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Right: Flyer */}
              <div className="lg:col-span-7 order-1 lg:order-2">
                <Reveal delay={100}>
                  <div className="relative max-w-md mx-auto lg:max-w-none lg:ml-auto">
                    <div className="absolute -inset-4 bg-grm-blue-50 rounded-3xl -z-10" />
                    <div className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-gray-200">
                      <Image
                        src="/images/events/flyers/fire-friday-feb.webp"
                        alt="Fire Friday February Watch Night Service Flyer"
                        width={800}
                        height={1200}
                        className="w-full h-auto object-contain"
                        priority
                        quality={92}
                      />
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scripture */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-violet-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center">
              <blockquote className="text-xl md:text-2xl text-gray-700 italic leading-relaxed mb-4">
                &ldquo;{scripture}&rdquo;
              </blockquote>
              <cite className="text-grm-primary font-semibold not-italic">{scriptureRef}</cite>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-violet-50/30 via-purple-50/20 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Flame, title: "Watch Night Service", desc: "Monthly prayer and worship" },
              { icon: Clock, title: "Late Night Service", desc: "9pm – 1am" },
              { icon: Calendar, title: "Monthly Event", desc: "Last Friday of each month" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={i * 50}>
                  <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                    <div className="w-14 h-14 bg-grm-blue-50 rounded-xl flex items-center justify-center mb-6">
                      <Icon className="h-7 w-7 text-grm-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Join us - GRM blue band like About beliefs */}
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal>
            <p className="text-xl md:text-2xl leading-relaxed font-light">
              Join us every last Friday of the month for Fire Friday, our Watch Night Service.
              Experience powerful prayer, worship, and fellowship as we seek the Lord together.
              No registration required — all are welcome.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-pink-50/20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Questions about Fire Friday?
            </h2>
            <p className="text-gray-600 mb-8">
              Reach out anytime — we&apos;re here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-grm-primary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-lg"
              >
                Contact Us
              </Link>
              <a
                href="tel:404-210-1136"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg border-2 border-gray-200 hover:border-grm-primary hover:text-grm-primary transition-colors"
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
