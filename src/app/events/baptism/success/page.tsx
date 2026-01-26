"use client";

import Link from "next/link";
import { CheckCircle, Droplet, Calendar, MapPin } from "lucide-react";

export default function BaptismSuccessPage() {
  const location = "24 Geneva St. Hapeville GA 30354";

  return (
    <div className="min-h-screen bg-white">
      {/* Success Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        {/* Subtle background patterns */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 opacity-[0.04] transform rotate-12">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path d="M100 20c-20 0-40 20-40 40 0 20 20 40 40 60 20-20 40-40 40-60 0-20-20-40-40-40z" fill="#1B5299"/>
            </svg>
          </div>
          <div className="absolute bottom-40 left-20 w-96 h-96 opacity-[0.03] transform -rotate-6">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path d="M100 20c-20 0-40 20-40 40 0 20 20 40 40 60 20-20 40-40 40-60 0-20-20-40-40-40z" fill="#1B5299"/>
            </svg>
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-grm-primary mb-4">
              Registration Successful!
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Thank you for registering for the Baptism Service.
            </p>
          </div>

          <div className="bg-blue-50/80 rounded-2xl shadow-lg p-8 mb-8 border-2 border-blue-200">
            <div className="flex flex-col items-center gap-4 text-lg text-gray-800">
              <div className="flex items-center gap-2">
                <Droplet className="h-5 w-5 text-grm-primary" />
                <span className="font-semibold">Baptism Service</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-grm-primary" />
                <span className="font-semibold">Date: To Be Announced</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-grm-primary" />
                <span>{location}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              We&apos;ve received your registration! You will be contacted with further details about the baptism service, including the date and time, once they are finalized.
            </p>
            <p className="text-base text-gray-600">
              If you have any questions, please don&apos;t hesitate to contact us.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/events"
              className="inline-flex items-center justify-center px-8 py-4 bg-grm-primary text-white font-semibold rounded-lg hover:bg-grm-secondary transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              View Other Events
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-grm-primary font-semibold rounded-lg hover:bg-grm-blue-50 transition-colors duration-200 shadow-lg hover:shadow-xl border-2 border-grm-primary"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
