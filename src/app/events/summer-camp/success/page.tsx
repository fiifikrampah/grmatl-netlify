"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SummerCampSuccessPage() {
  const date = "July 14th to 18th";

  return (
    <div className="min-h-screen bg-white">
      {/* Success Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        {/* Subtle background patterns */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-88 h-88 opacity-[0.04] transform rotate-12">
            <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" className="w-full h-full">
              <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="absolute bottom-32 right-32 w-64 h-64 opacity-[0.03] transform rotate-[-8deg]">
            <svg viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="1.5" className="w-full h-full">
              <circle cx="12" cy="12" r="10" strokeLinecap="round"/>
              <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="absolute top-1/2 right-1/3 w-56 h-56 opacity-[0.025] transform rotate-15">
            <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" className="w-full h-full">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/40 via-transparent to-yellow-50/30"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-12">
            {/* Success Icon */}
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>

            {/* Success Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-yellow-500 text-white rounded-full text-sm font-semibold mb-8 shadow-lg">
              <CheckCircle className="h-4 w-4 mr-2" />
              Registration Submitted Successfully
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6 leading-tight">
              Thank You for Registering!
            </h1>
            <p className="text-xl md:text-2xl text-blue-800/90 max-w-3xl mx-auto leading-relaxed">
              We&apos;re excited to have you join us for an unforgettable week of fun, friendship, and faith from{" "}
              <span className="font-semibold text-yellow-600 text-[20px]">{date}</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/events/summer-camp"
              className="inline-flex items-center justify-center px-8 py-4 bg-yellow-500 text-white font-semibold rounded-xl hover:bg-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
            >
              Back to Registration
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-900 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-yellow-400 text-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
