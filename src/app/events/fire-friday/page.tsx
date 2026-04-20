"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Flame, MapPin } from "lucide-react";
import Reveal from "@/components/Reveal";

// Flyer palette: deep burgundy, warm gold, cream
const BURGUNDY = "#5b1b28";
const GOLD = "#d2a24a";
const CREAM = "#faf6f2";

const flyerImage = "/images/events/flyers/fire-friday.webp";
const eventSchedule = "Last Friday of Every Month";
const eventTime = "9PM - 1AM";
const eventLocation = "24 Geneva Street, Hapeville GA 30354";
const eventType = "Monthly Watch Night Service";
const tagline = "A late-night encounter with God.";

export default function FireFridayPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: CREAM }}>
      {/* Hero */}
      <section className="relative pt-0 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 120% 80% at 20% 0%, rgba(91, 27, 40, 0.07) 0%, transparent 50%),
              radial-gradient(ellipse 100% 60% at 80% 20%, rgba(210, 162, 74, 0.06) 0%, transparent 45%),
              radial-gradient(ellipse 80% 50% at 50% 100%, rgba(91, 27, 40, 0.04) 0%, transparent 50%),
              linear-gradient(180deg, ${CREAM} 0%, rgba(250, 246, 242, 0.95) 100%)
            `,
          }}
        />

        {/* Decorative orbs */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-40" style={{ backgroundColor: `${GOLD}15` }} />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-30" style={{ backgroundColor: `${BURGUNDY}10` }} />

        <div className="max-w-7xl mx-auto relative z-10 pt-40">
          <Reveal>
            <div className="pb-4">
              <Link
                href="/events"
                className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-grm-primary transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Events
              </Link>
            </div>
          </Reveal>

          <Reveal delay={50}>
            <div className="flex justify-center mb-10">
              <div
                className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg text-white"
                style={{ backgroundColor: BURGUNDY, boxShadow: `0 4px 14px ${BURGUNDY}40` }}
              >
                <Flame className="h-4 w-4 mr-2 shrink-0" style={{ color: GOLD }} />
                {eventType}
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#080A0C] mb-4 leading-tight tracking-tight">
                Fire{" "}
                <span style={{ color: BURGUNDY }}>Friday</span>
              </h1>
              <p className="text-xl md:text-2xl italic font-medium max-w-2xl mx-auto leading-relaxed" style={{ color: `${BURGUNDY}dd` }}>
                {tagline}
              </p>
              <p className="mt-2 text-sm uppercase tracking-[0.3em] text-gray-500">
                {eventSchedule}
              </p>
            </div>
          </Reveal>

          {/* Flyer */}
          <Reveal delay={150}>
            <div className="mb-14 max-w-2xl mx-auto">
              <div
                className="relative rounded-2xl overflow-hidden shadow-2xl p-2 sm:p-3"
                style={{
                  background: `linear-gradient(135deg, ${BURGUNDY}20 0%, ${GOLD}15 50%, ${BURGUNDY}15 100%)`,
                  border: `2px solid ${BURGUNDY}25`,
                  boxShadow: `0 25px 50px -12px rgba(91, 27, 40, 0.15), 0 0 0 1px ${BURGUNDY}10`,
                }}
              >
                <div className="rounded-xl overflow-hidden bg-white">
                  <Image
                    src={flyerImage}
                    alt="Fire Friday monthly watch night service flyer"
                    width={2048}
                    height={2048}
                    className="w-full h-auto object-contain"
                    priority
                    quality={92}
                  />
                </div>
              </div>
            </div>
          </Reveal>

          {/* About */}
          <Reveal delay={200}>
            <div
              className="mb-14 max-w-2xl mx-auto text-center py-8 px-6 sm:py-10 sm:px-10 rounded-2xl relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${BURGUNDY}08 0%, transparent 50%, ${GOLD}06 100%)`,
                border: `1px solid ${BURGUNDY}15`,
                boxShadow: `inset 0 1px 0 ${BURGUNDY}08`,
              }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent to-transparent opacity-40" style={{ background: `linear-gradient(90deg, transparent, ${BURGUNDY}, transparent)` }} />
              <p
                className="text-[10px] sm:text-xs font-semibold tracking-[0.35em] uppercase mb-4"
                style={{ color: `${BURGUNDY}99` }}
              >
                What is Fire Friday?
              </p>
              <p className="text-lg md:text-xl text-[#2a1116] leading-relaxed font-medium">
                Fire Friday is our monthly watch night service &mdash; a late-night gathering for
                worship, prayer, and the Word. We meet on the last Friday of every month to
                contend in faith together and welcome a fresh move of the Holy Spirit.
              </p>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-px opacity-50" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
            </div>
          </Reveal>

          {/* Event Details - editorial card */}
          <Reveal delay={250}>
            <div className="mb-16 max-w-3xl mx-auto">
              <div
                className="relative overflow-hidden text-center"
                style={{
                  padding: "clamp(1.5rem, 4vw, 2.5rem) clamp(1.5rem, 5vw, 3rem)",
                  background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(250,246,242,0.9) 100%)",
                  border: `1px solid ${BURGUNDY}18`,
                  boxShadow: `
                    0 0 0 1px ${BURGUNDY}08,
                    0 25px 50px -12px rgba(91, 27, 40, 0.12),
                    inset 0 1px 0 rgba(255,255,255,0.8)
                  `,
                }}
              >
                <div
                  className="absolute top-0 right-0 w-24 h-24 opacity-[0.06]"
                  style={{
                    background: `radial-gradient(circle at 100% 0%, ${BURGUNDY} 0%, transparent 70%)`,
                  }}
                />

                <p
                  className="text-[10px] sm:text-xs font-semibold tracking-[0.35em] uppercase mb-6"
                  style={{ color: `${BURGUNDY}99` }}
                >
                  Event Details
                </p>

                <p className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#080A0C] mb-1">
                  {eventSchedule}
                </p>
                <p className="text-sm text-gray-500 mb-8">Monthly Watch Night Service</p>

                <div
                  className="h-px mb-8"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, ${BURGUNDY}30 20%, ${GOLD}40 50%, ${BURGUNDY}30 80%, transparent 100%)`,
                  }}
                />

                <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1.5fr] gap-6 sm:gap-4 mb-6">
                  {[
                    { icon: Calendar, label: "When", value: eventSchedule },
                    { icon: Clock, label: "Time", value: eventTime },
                    { icon: MapPin, label: "Location", value: eventLocation },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex flex-col items-center gap-2">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${BURGUNDY}10`, border: `1px solid ${BURGUNDY}18` }}
                      >
                        <Icon className="h-5 w-5" style={{ color: BURGUNDY }} />
                      </div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: `${BURGUNDY}80` }}>
                        {label}
                      </p>
                      <p className="text-base font-semibold text-[#080A0C] leading-snug whitespace-normal sm:whitespace-nowrap">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t" style={{ borderColor: `${BURGUNDY}12` }}>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    No registration required &middot; All are welcome
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Description */}
          <Reveal delay={300}>
            <div
              className="rounded-2xl p-8 sm:p-10 max-w-4xl mx-auto relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${BURGUNDY}06 0%, ${GOLD}04 100%)`,
                border: `1px solid ${BURGUNDY}15`,
                boxShadow: `0 4px 24px -4px ${BURGUNDY}08`,
              }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-30" style={{ backgroundColor: `${GOLD}30` }} />
              <p className="text-lg text-[#2a1116] leading-relaxed relative z-10 font-medium text-center">
                Join us for Fire Friday and stand with us in faith as we gather for watch night service,
                worship, and prayer on the last Friday of the month. Come expecting a late-night encounter with God.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 md:py-20 text-white relative overflow-hidden"
        style={{ backgroundColor: BURGUNDY }}
      >
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 80% 20%, ${GOLD}25 0%, transparent 40%)`,
          }}
        />
        <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Questions about Fire Friday?
            </h2>
            <p className="text-white/75 mb-8">
              Reach out anytime and we&apos;ll point you to the right details.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 font-semibold rounded-xl transition-all shadow-lg hover:brightness-105"
                style={{ backgroundColor: GOLD, color: "#2a1116" }}
              >
                Contact Us
              </Link>
              <a
                href="tel:404-210-1136"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/30"
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
