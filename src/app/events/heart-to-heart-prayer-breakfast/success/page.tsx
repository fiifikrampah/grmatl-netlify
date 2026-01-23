"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function HeartToHeartPrayerBreakfastSuccessPage() {
  const date = "Saturday, February 14th, 2026";
  const time = "10am - 1pm";
  const location = "24 Geneva St. Hapeville GA 30354";
  const dressCode = "Formal Attire - Red & Pink";

  return (
    <div className="min-h-screen bg-white">
      {/* Success Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        {/* Subtle background patterns - large decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-88 h-88 opacity-[0.04] transform rotate-12">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path d="M100 50c-10-20-40-30-50-20s-10 30 0 50c10 20 50 70 50 70s40-50 50-70c10-20 10-40 0-50s-40 0-50 20z" fill="#dc2626"/>
            </svg>
          </div>
          <div className="absolute bottom-32 right-32 w-64 h-64 opacity-[0.03] transform rotate-[-8deg]">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path d="M100 50c-10-20-40-30-50-20s-10 30 0 50c10 20 50 70 50 70s40-50 50-70c10-20 10-40 0-50s-40 0-50 20z" fill="#dc2626"/>
            </svg>
          </div>
          <div className="absolute top-1/2 right-1/3 w-52 h-52 opacity-[0.025] transform rotate-15">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path d="M100 50c-10-20-40-30-50-20s-10 30 0 50c10 20 50 70 50 70s40-50 50-70c10-20 10-40 0-50s-40 0-50 20z" fill="#dc2626"/>
            </svg>
          </div>
          {/* Cross icon */}
          <div className="absolute top-1/4 right-1/4 w-76 h-76 opacity-[0.02] transform rotate-[-5deg]">
            <svg viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" className="w-full h-full">
              <path d="M12 2v20M2 12h20" strokeLinecap="round"/>
            </svg>
          </div>
          {/* Heart hands icon */}
          <div className="absolute bottom-1/4 left-1/4 w-68 h-68 opacity-[0.025] transform rotate-6">
            <svg viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="1.5" className="w-full h-full">
              <path d="M11 12h2M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3M9 7H8a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-1M9 7v3m6-3v3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-50/40 via-transparent to-amber-50/30"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-12">
            {/* Success Icon */}
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>

            {/* Success Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-amber-600 text-white rounded-full text-sm font-semibold mb-8 shadow-lg">
              <CheckCircle className="h-4 w-4 mr-2" />
              Registration Submitted Successfully
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-red-900 mb-6 leading-tight">
              Thank You for Registering!
            </h1>
            <p className="text-xl md:text-2xl text-red-800/90 max-w-3xl mx-auto leading-relaxed">
              We&apos;re excited to have you join us for the Heart to Heart Prayer Breakfast on{" "}
              <span className="font-semibold text-amber-700 text-[20px]">{date}</span>
            </p>
            <div className="mt-6 space-y-2 text-lg text-red-900">
              <p><span className="font-semibold text-amber-600">Time:</span> {time}</p>
              <p><span className="font-semibold text-amber-600">Location:</span> {location}</p>
              <p className="mt-4"><span className="font-semibold text-amber-600">Dress Code:</span> <span className="text-amber-700 font-semibold">{dressCode}</span></p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/events/heart-to-heart-prayer-breakfast"
              className="inline-flex items-center justify-center px-8 py-4 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
            >
              Back to Registration
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-red-900 font-semibold rounded-xl hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-amber-400 text-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
