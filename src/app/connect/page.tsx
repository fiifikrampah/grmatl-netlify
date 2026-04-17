import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import ConnectCardLink from "./ConnectCardLink";
import {
  UserPlus,
  HandHeart,
  MessageSquareHeart,
  Gift,
  Globe,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Welcome | Great Redemption Ministries",
  description:
    "Welcome to Great Redemption Ministries. New to the church, need prayer, want to share your experience, or give? Start here.",
};

type ConnectCard = {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  iconBg: string;
  iconColor: string;
};

const cards: ConnectCard[] = [
  {
    title: "First Time Visitor",
    description:
      "Tell us a little about yourself so we can stay in touch and help you feel at home.",
    href: "/connect/visitor",
    icon: UserPlus,
    iconBg: "bg-[#1B5299]/10",
    iconColor: "text-[#1B5299]",
  },
  {
    title: "Prayer Request",
    description:
      "Share something on your heart. Our prayer team would be honored to pray with you.",
    href: "/connect/prayer",
    icon: HandHeart,
    iconBg: "bg-[#9a3b2c]/10",
    iconColor: "text-[#9a3b2c]",
  },
  {
    title: "Share Your Experience",
    description:
      "A short survey about your visit. Your feedback helps us welcome better.",
    href: "/connect/experience",
    icon: MessageSquareHeart,
    iconBg: "bg-[#0f766e]/10",
    iconColor: "text-[#0f766e]",
  },
  {
    title: "Give",
    description:
      "Partner with the ministry through tithes, offerings, and giving.",
    href: "/give",
    icon: Gift,
    iconBg: "bg-[#b45309]/10",
    iconColor: "text-[#b45309]",
  },
  {
    title: "Visit Our Website",
    description:
      "Explore our ministries, events, sermons, and everything happening at GRM.",
    href: "/",
    icon: Globe,
    iconBg: "bg-[#4c1d95]/10",
    iconColor: "text-[#4c1d95]",
  },
];

export default function ConnectPage() {
  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      {/* ===== HERO: Warm photo with soft overlay ===== */}
      <section className="relative h-[65vh] min-h-[440px] max-h-[640px] w-full overflow-hidden">
        {/* Background photo */}
        <Image
          src="/images/connect/hero.webp"
          alt="Welcome to Great Redemption Ministries"
          fill
          priority
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Warm reverent overlay — not pitch-dark, preserves the photo feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B5299]/30 via-transparent to-[#9a3b2c]/20 mix-blend-multiply"></div>

        {/* Top bar with logo */}
        <div className="absolute top-0 left-0 right-0 z-10 px-6 sm:px-10 pt-7 sm:pt-8">
          <Link href="/" className="inline-block">
            <Image
              src="/images/branding/logo.png"
              alt="Great Redemption Ministries"
              width={88}
              height={88}
              className="w-24 h-auto sm:w-28 filter brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
              priority
            />
          </Link>
        </div>

        {/* Hero content */}
        <div className="relative z-10 h-full flex flex-col justify-end px-6 sm:px-10 pb-12 sm:pb-16">
          <div className="max-w-5xl mx-auto w-full">
            <div className="w-10 h-px bg-[#C9A66B] mb-4"></div>
            <p className="text-sm sm:text-base text-white/80 font-medium mb-4 tracking-wide">
              Great Redemption Ministries
            </p>
            <h1 className="text-white text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-5 max-w-3xl">
              Welcome home.
            </h1>
            <p className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-2xl font-light">
              We&apos;re so glad you&apos;re here. However you found us, whatever brought you
              today — you matter to us, and you matter to God.
            </p>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 hidden sm:block pointer-events-none">
          <ChevronDown
            className="h-5 w-5 text-white/60 animate-bounce"
            strokeWidth={1.5}
          />
        </div>
      </section>

      {/* ===== POST-HERO: gradient backdrop ===== */}
      <div className="relative overflow-hidden">
        {/* Soft vertical gradient */}
        <div
          className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(27,82,153,0.10)_0%,rgba(250,247,242,0)_25%,rgba(201,166,107,0.10)_55%,rgba(250,247,242,0)_80%,rgba(154,59,44,0.08)_100%)]"
          aria-hidden="true"
        ></div>

      {/* ===== CARDS SECTION ===== */}
      <section className="relative px-6 sm:px-10 py-20 sm:py-24">
        <div className="max-w-5xl mx-auto">
          {/* Intro copy */}
          <div className="text-center mb-16 sm:mb-20">
            <p className="text-sm uppercase tracking-[0.2em] text-[#1B5299] font-semibold mb-3">
              Let&apos;s Connect
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0D2B45] max-w-2xl mx-auto leading-tight">
              How can we walk with you today?
            </h2>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <ConnectCardLink
                  key={card.title}
                  href={card.href}
                  className="group block"
                >
                  <div className="h-full bg-white rounded-2xl p-6 sm:p-7 border border-gray-200/70 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-[#1B5299]/30 hover:shadow-lg hover:ring-1 hover:ring-inset hover:ring-[#1B5299]/10 transition-all duration-300 flex items-start gap-5">
                    <div
                      className={`flex-shrink-0 w-14 h-14 rounded-2xl ${card.iconBg} flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-105 group-data-[tapped=true]:scale-110 group-data-[tapped=true]:-rotate-6 group-data-[tapped=true]:duration-150`}
                    >
                      <Icon
                        className={`h-7 w-7 ${card.iconColor} transition-transform duration-300 ease-out group-data-[tapped=true]:scale-125`}
                        strokeWidth={2}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-lg sm:text-xl font-bold text-[#0D2B45] leading-snug">
                          {card.title}
                        </h3>
                        <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-[#1B5299] group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
                      </div>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </ConnectCardLink>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CLOSING ===== */}
      <section className="relative px-6 sm:px-10 pb-20 sm:pb-28">
        <div className="max-w-3xl mx-auto text-center">
          <div className="h-px bg-gray-200 w-16 mx-auto mb-8"></div>
          <p className="font-serif text-lg sm:text-xl text-gray-700 leading-relaxed mb-3 italic">
            &ldquo;Accept one another, then, just as Christ accepted you.&rdquo;
            <span className="block not-italic font-sans text-sm text-gray-500 mt-3 tracking-wide">
              — Romans 15:7
            </span>
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Need help or have a question?{" "}
            <Link
              href="/contact"
              className="text-[#1B5299] font-semibold hover:underline"
            >
              Reach out
            </Link>
            .
          </p>
        </div>
      </section>
      </div>
    </div>
  );
}
