"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, BookOpen, Sparkles, Users, Leaf } from "lucide-react"
import Reveal from "@/components/Reveal"

const GIVE_URL =
  "https://give.tithe.ly/?formId=1f6a8698-6865-11ee-90fc-1260ab546d11&locationId=6585e9e0-8a8a-4a42-99ec-f845bac152c1&fundId=186bc47d-f984-45b9-88e8-be2fb9627f20&frequency=one-time"

// Warm, nurturing palette
const GREEN = "#2d6a4f"
const GOLD = "#b8860b"
const CREAM = "#fdfaf5"

export default function RoomToGrowPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: CREAM }}>
      {/* Hero Section */}
      <section className="relative pt-0 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Warm gradient mesh */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 120% 80% at 20% 0%, rgba(45, 106, 79, 0.07) 0%, transparent 50%),
              radial-gradient(ellipse 100% 60% at 80% 20%, rgba(184, 134, 11, 0.06) 0%, transparent 45%),
              radial-gradient(ellipse 80% 50% at 50% 100%, rgba(45, 106, 79, 0.04) 0%, transparent 50%),
              linear-gradient(180deg, ${CREAM} 0%, rgba(253, 250, 245, 0.95) 100%)
            `,
          }}
        />

        {/* Decorative silhouettes — building / construction */}
        <div className="absolute top-28 right-10 w-40 h-40 opacity-[0.04] transform rotate-6 hidden md:block">
          <svg viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="1.2" className="w-full h-full">
            <path d="M2 22h20" strokeLinecap="round" />
            <rect x="3" y="10" width="7" height="12" rx="0.5" />
            <rect x="14" y="6" width="7" height="16" rx="0.5" />
            <path d="M5 13h3M5 16h3M5 19h3" strokeLinecap="round" />
            <path d="M16 9h3M16 12h3M16 15h3M16 18h3" strokeLinecap="round" />
            <path d="M6.5 10V7L3 7M17.5 6V3l-3.5 0" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="absolute bottom-40 left-8 w-32 h-32 opacity-[0.03] transform -rotate-6 hidden md:block">
          <svg viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="1.3" className="w-full h-full">
            <path d="M3 22h18" strokeLinecap="round" />
            <path d="M5 22V10l7-5 7 5v12" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="9" y="16" width="6" height="6" rx="0.5" />
            <path d="M12 16v-3" strokeLinecap="round" />
            <path d="M8 12h2M14 12h2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Soft orbs */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-40" style={{ backgroundColor: `${GREEN}12` }} />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-30" style={{ backgroundColor: `${GOLD}15` }} />

        <div className="max-w-7xl mx-auto relative z-10 pt-40">
          <Reveal delay={50}>
            <div className="flex justify-center mb-10">
              <div
                className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg text-white"
                style={{ backgroundColor: GREEN, boxShadow: `0 4px 14px ${GREEN}40` }}
              >
                <Leaf className="h-4 w-4 mr-2" />
                Children&apos;s Ministry Campaign
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#080A0C] mb-6 leading-tight tracking-tight">
                Room to{" "}
                <span style={{ color: GREEN, textShadow: `0 1px 2px ${GREEN}15` }}>
                  Grow
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-[#080A0C]/70 max-w-3xl mx-auto leading-relaxed italic">
                Creating space for the next generation to learn, grow, and encounter God.
              </p>
            </div>
          </Reveal>

          {/* Hero Give Button */}
          <Reveal delay={150}>
            <div className="flex justify-center mb-16">
              <a
                href={GIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-10 py-5 text-white font-bold rounded-full text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                style={{ backgroundColor: GREEN, boxShadow: `0 8px 30px ${GREEN}35` }}
              >
                <Heart className="mr-3 h-5 w-5 fill-current" />
                Give to This Campaign
              </a>
            </div>
          </Reveal>

          {/* Architectural Renderings */}
          <div className="mb-16 max-w-5xl mx-auto">
            <Reveal>
              <p
                className="text-center text-[10px] sm:text-xs font-semibold tracking-[0.35em] uppercase mb-8"
                style={{ color: `${GREEN}99` }}
              >
                The Vision
              </p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Main rendering — isometric 3D view */}
              <Reveal delay={50} className="md:col-span-2">
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    border: `1px solid ${GREEN}15`,
                    boxShadow: `0 8px 30px -8px ${GREEN}10`,
                  }}
                >
                  <Image
                    src="/images/events/room-to-grow/2.webp"
                    alt="3D rendering of the expanded children's ministry building"
                    width={1295}
                    height={771}
                    className="w-full h-auto object-contain bg-white"
                    quality={92}
                  />
                </div>
              </Reveal>
              {/* Floor plan + exterior — side by side */}
              <Reveal delay={100}>
                <div
                  className="rounded-2xl overflow-hidden h-full"
                  style={{
                    border: `1px solid ${GREEN}15`,
                    boxShadow: `0 8px 30px -8px ${GREEN}10`,
                  }}
                >
                  <Image
                    src="/images/events/room-to-grow/1.webp"
                    alt="Floor plan showing dedicated classrooms for different age groups"
                    width={1303}
                    height={1391}
                    className="w-full h-full object-cover bg-white"
                    quality={92}
                  />
                </div>
              </Reveal>
              <Reveal delay={150}>
                <div
                  className="rounded-2xl overflow-hidden h-full"
                  style={{
                    border: `1px solid ${GREEN}15`,
                    boxShadow: `0 8px 30px -8px ${GREEN}10`,
                  }}
                >
                  <Image
                    src="/images/events/room-to-grow/3.webp"
                    alt="Exterior view of the new classroom building"
                    width={1319}
                    height={771}
                    className="w-full h-full object-cover bg-white"
                    quality={92}
                  />
                </div>
              </Reveal>
            </div>
          </div>

          {/* Scripture */}
          <Reveal delay={250}>
            <div
              className="mb-16 max-w-2xl mx-auto text-center py-8 px-6 sm:py-10 sm:px-10 rounded-2xl relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${GREEN}06 0%, transparent 50%, ${GOLD}05 100%)`,
                border: `1px solid ${GREEN}12`,
                boxShadow: `inset 0 1px 0 ${GREEN}06`,
              }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-[#2d6a4f] to-transparent opacity-40" />
              <p className="text-xl md:text-2xl italic text-[#080A0C]/90 leading-relaxed font-medium">
                &ldquo;Train up a child in the way he should go: and when he is old, he will not depart from it.&rdquo;
              </p>
              <cite className="block mt-3 text-base font-semibold not-italic" style={{ color: GREEN }}>
                — Proverbs 22:6
              </cite>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-[#b8860b] to-transparent opacity-50" />
            </div>
          </Reveal>

          {/* The Story */}
          <Reveal delay={300}>
            <div className="mb-16 max-w-3xl mx-auto">
              <div
                className="relative overflow-hidden text-center"
                style={{
                  padding: "clamp(2rem, 4vw, 3rem) clamp(1.5rem, 5vw, 3rem)",
                  background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(253,250,245,0.9) 100%)",
                  border: `1px solid ${GREEN}15`,
                  boxShadow: `
                    0 0 0 1px ${GREEN}06,
                    0 25px 50px -12px ${GREEN}10,
                    inset 0 1px 0 rgba(255,255,255,0.8)
                  `,
                }}
              >
                <div
                  className="absolute top-0 right-0 w-24 h-24 opacity-[0.05]"
                  style={{
                    background: `radial-gradient(circle at 100% 0%, ${GREEN} 0%, transparent 70%)`,
                  }}
                />

                <p
                  className="text-[10px] sm:text-xs font-semibold tracking-[0.35em] uppercase mb-8"
                  style={{ color: `${GREEN}99`, letterSpacing: "0.35em" }}
                >
                  Making Room for Our Children
                </p>

                <div className="space-y-5 text-lg text-[#080A0C]/80 leading-relaxed text-left max-w-2xl mx-auto">
                  <p>
                    Our children are the future of the church, and they deserve a space
                    where they can learn about God in an environment designed just for them.
                  </p>
                  <p>
                    Right now, children ages 3 to 12 gather in{" "}
                    <strong className="text-[#080A0C]">one shared room</strong>. While their enthusiasm
                    fills the space with joy, it also limits our ability to teach each age group in ways
                    that best serve their stage of development.
                  </p>
                  <p>
                    Through the <strong className="text-[#080A0C]">Room to Grow Campaign</strong>, we are
                    expanding our children&apos;s ministry space to create dedicated classrooms for different
                    age groups. These new classrooms will allow us to teach more effectively, create engaging
                    environments, and help every child feel seen, known, and nurtured in their faith.
                  </p>
                </div>

                <div
                  className="h-px my-8"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, ${GREEN}25 20%, ${GOLD}30 50%, ${GREEN}25 80%, transparent 100%)`,
                  }}
                />

                <p className="text-xl md:text-2xl font-bold text-[#080A0C] leading-snug">
                  Your generosity will help us build spaces where young hearts can grow in wisdom,
                  confidence, and love for God.
                </p>
                <p className="mt-4 text-lg font-medium" style={{ color: GREEN }}>
                  Together, we are making room to grow.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Impact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto mb-20">
            {[
              { icon: BookOpen, title: "Age-Appropriate Teaching", desc: "Dedicated classrooms allow us to teach more effectively at every developmental stage.", color: `${GREEN}12`, borderColor: `${GREEN}20`, delay: 350 },
              { icon: Sparkles, title: "Engaging Environments", desc: "Spaces designed to spark curiosity, creativity, and a love for God's word.", color: `${GOLD}12`, borderColor: `${GOLD}20`, delay: 400 },
              { icon: Users, title: "Every Child Seen & Known", desc: "Smaller groups mean every child can feel nurtured and valued in their faith.", color: `${GREEN}12`, borderColor: `${GREEN}20`, delay: 450 },
            ].map(({ icon: Icon, title, desc, color, borderColor, delay }) => (
              <Reveal key={title} delay={delay}>
                <div
                  className="group h-full rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl text-center"
                  style={{
                    background: "rgba(255,255,255,0.8)",
                    border: `2px solid ${borderColor}`,
                    boxShadow: `0 4px 20px -4px ${GREEN}08`,
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 mx-auto transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: color, border: `1px solid ${borderColor}` }}
                  >
                    <Icon className="h-8 w-8" style={{ color: GREEN }} />
                  </div>
                  <h3 className="text-xl font-bold text-[#080A0C] mb-2">{title}</h3>
                  <p className="text-[#080A0C]/70 text-sm leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Info callout */}
          <Reveal delay={500}>
            <div
              className="rounded-2xl p-8 sm:p-10 max-w-4xl mx-auto relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${GREEN}06 0%, ${GOLD}04 100%)`,
                border: `1px solid ${GREEN}12`,
                boxShadow: `0 4px 24px -4px ${GREEN}08`,
              }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-30" style={{ backgroundColor: `${GOLD}25` }} />
              <p className="text-lg text-[#080A0C]/80 leading-relaxed relative z-10 font-medium text-center">
                Every gift, no matter the size, brings us closer to giving our children the spaces they
                need to grow in faith. If you have any questions about this campaign, please don&apos;t
                hesitate to reach out.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        style={{
          backgroundColor: GREEN,
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-20" style={{ backgroundColor: GOLD }} />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ backgroundColor: "#fff" }} />
        </div>
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Partner With Us Today
            </h2>
            <p className="text-white/80 mb-10 text-lg md:text-xl leading-relaxed">
              Help us build dedicated spaces where the next generation can encounter God.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={GIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-10 py-5 bg-white font-bold rounded-full text-lg transition-all duration-300 shadow-2xl hover:shadow-xl hover:-translate-y-1"
                style={{ color: GREEN }}
              >
                <Heart className="mr-2 h-5 w-5 fill-current" />
                Give Now
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 font-semibold rounded-full transition-colors duration-200 border-2 border-white/40 text-white hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sticky bottom Give bar (mobile) */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden">
        <div className="bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3 safe-area-pb">
          <a
            href={GIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full py-3.5 text-white font-bold rounded-xl text-base transition-colors"
            style={{ backgroundColor: GREEN }}
          >
            <Heart className="mr-2 h-4 w-4 fill-current" />
            Give to Room to Grow
          </a>
        </div>
      </div>
    </div>
  )
}
