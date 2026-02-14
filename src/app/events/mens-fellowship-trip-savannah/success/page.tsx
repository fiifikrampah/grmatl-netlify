"use client";

import Link from "next/link";
import { CheckCircle, Calendar, MapPin, Anchor } from "lucide-react";

const NAVY = "#0f3a70";
const CREAM = "#faf8f5";

export default function MensFellowshipTripSuccessPage() {
  const date = "Saturday, June 20th, 2026";

  return (
    <div className="min-h-screen" style={{ backgroundColor: CREAM }}>
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 80% 50% at 50% 0%, rgba(15, 58, 112, 0.04) 0%, transparent 50%)`,
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-8">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: "rgba(34, 197, 94, 0.15)" }}
            >
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: NAVY }}>
              Registration Successful!
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Thank you for registering for the Men&apos;s Fellowship Trip to Savannah.
            </p>
          </div>

          <div
            className="rounded-2xl shadow-lg p-8 mb-8"
            style={{
              background: "rgba(255,255,255,0.8)",
              border: `1px solid ${NAVY}15`,
              boxShadow: `0 4px 24px -4px ${NAVY}10`,
            }}
          >
            <div className="flex flex-col items-center gap-4 text-lg text-gray-800">
              <div className="flex items-center gap-2">
                <Anchor className="h-5 w-5" style={{ color: NAVY }} />
                <span className="font-semibold">Men&apos;s Fellowship Trip to Savannah</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" style={{ color: NAVY }} />
                <span className="font-semibold">{date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" style={{ color: NAVY }} />
                <span>Forsyth Park, Riverboat Cruise, Tybee Island Beach</span>
              </div>
            </div>
          </div>

          <div
            className="rounded-2xl p-8 mb-8"
            style={{
              background: "rgba(255,255,255,0.6)",
              border: `1px solid ${NAVY}10`,
            }}
          >
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              We&apos;ve received your registration! You will be contacted with further details as the date approaches. For questions in the meantime, please see Nana Eyin or Bra Moses.
            </p>
            <p className="text-base text-gray-600">
              If you have any questions, please don&apos;t hesitate to contact us.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/events"
              className="inline-flex items-center justify-center px-8 py-4 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              style={{ backgroundColor: NAVY }}
            >
              View Other Events
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 font-semibold rounded-xl transition-colors duration-200 border-2 hover:-translate-y-0.5"
              style={{ borderColor: NAVY, color: NAVY }}
            >
              Return to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
