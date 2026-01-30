"use client";

import Image from "next/image";
import { Calendar, MapPin, Clock, Flame } from "lucide-react";

// Helper function to get the last Friday of the current month
function getLastFridayOfMonth(): Date {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  // Get the last day of the month
  const lastDay = new Date(year, month + 1, 0);

  // Find the last Friday
  let lastFriday = lastDay;
  while (lastFriday.getDay() !== 5) { // 5 = Friday
    lastFriday = new Date(lastFriday.getTime() - 24 * 60 * 60 * 1000);
  }

  return lastFriday;
}

export default function FireFridayPage() {
  const lastFriday = getLastFridayOfMonth();
  const time = "9pm - 1am";
  const location = "GRM Main Auditorium";
  const address = "24 Geneva Street, Hapeville GA 30354";
  const theme = "THE LORD IS WITH US";
  const scripture = "Have I not commanded you? Be strong and of good courage; do not be afraid, nor be dismayed, for the Lord your God is with you wherever you go.";
  const scriptureRef = "Joshua 1:9 NKJV";

  // Format the date for badge (short format)
  const badgeDate = lastFriday.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Format the date for display (long format)
  const formattedDate = lastFriday.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-gradient-to-b from-gray-900 via-red-900 to-gray-900 min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle background patterns - fire/flame themed */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Flame patterns */}
          <div className="absolute top-20 right-10 w-72 h-72 opacity-[0.05] transform rotate-12">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path d="M100 180c-20-30-40-50-50-70s-10-40 0-50c10-10 30-20 50-10s40 20 50 10c10-10 10-30 0-50s-30-40-50-70" fill="#ff6b35" opacity="0.6"/>
              <path d="M100 180c-15-25-30-40-40-60s-5-30 0-40c5-10 20-15 40-5s30 15 40 5c10-10 5-25 0-40s-25-35-40-60" fill="#ff8c42" opacity="0.4"/>
            </svg>
          </div>
          <div className="absolute bottom-40 left-20 w-96 h-96 opacity-[0.04] transform -rotate-6">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path d="M100 180c-20-30-40-50-50-70s-10-40 0-50c10-10 30-20 50-10s40 20 50 10c10-10 10-30 0-50s-30-40-50-70" fill="#ff6b35" opacity="0.6"/>
            </svg>
          </div>
          {/* Gradient overlays */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-900/20 via-orange-900/10 to-purple-900/20"></div>
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-12">
            {/* Badge */}
            <div className="inline-flex items-center px-6 py-3 text-white rounded-full text-sm font-semibold mb-8 shadow-lg bg-red-600/80 backdrop-blur-sm">
              <Flame className="h-4 w-4 mr-2" />
              Next: {badgeDate} - No Registration Required
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight drop-shadow-2xl">
              FIRE{" "}
              <span className="text-orange-400">
                FRIDAY
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-orange-200 max-w-4xl mx-auto leading-relaxed mb-8 font-semibold">
              {theme}
            </p>

            {/* Scripture */}
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto mb-8 border border-orange-500/30">
              <p className="text-lg md:text-xl text-white/90 italic leading-relaxed mb-3">
                &quot;{scripture}&quot;
              </p>
              <p className="text-orange-300 font-semibold">{scriptureRef}</p>
            </div>

            {/* Event Details */}
            <div className="flex flex-col items-center justify-center gap-4 text-lg text-white mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-orange-400" />
                <span className="font-semibold">Last Friday of Each Month</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-orange-400" />
                <span className="font-semibold">Next: {formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-400" />
                <span className="font-semibold">{time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-orange-400" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-orange-400 opacity-0" />
                <span className="text-sm text-white/80">{address}</span>
              </div>
            </div>
          </div>

          {/* Event Flyer */}
          <div className="mb-12 max-w-2xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-orange-500/50">
              <Image
                src="/images/events/flyers/fire-friday.jpg"
                alt="Fire Friday Watch Night Service Flyer"
                width={800}
                height={1200}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* Event Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            <div className="group bg-black/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-orange-500/30">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Flame className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Watch Night Service</h3>
                  <p className="text-orange-200/70 text-sm">Monthly prayer and worship</p>
                </div>
              </div>
            </div>

            <div className="group bg-black/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-orange-500/30">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Late Night Service</h3>
                  <p className="text-orange-200/70 text-sm">9pm - 1am</p>
                </div>
              </div>
            </div>

            <div className="group bg-black/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-orange-500/30">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Monthly Event</h3>
                  <p className="text-orange-200/70 text-sm">Last Friday of each month</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm rounded-3xl shadow-2xl p-10 max-w-4xl mx-auto border-2 border-orange-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/20 rounded-full -translate-y-16 translate-x-16"></div>
            <p className="text-lg text-white leading-relaxed relative z-10 font-medium">
              Join us every last Friday of the month for Fire Friday, our Watch Night Service.
              Experience powerful prayer, worship, and fellowship as we seek the Lord together.
              No registration required - all are welcome!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20 backdrop-blur-sm relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-16 right-16 w-80 h-80 opacity-[0.03] transform rotate-10">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path d="M100 180c-20-30-40-50-50-70s-10-40 0-50c10-10 30-20 50-10s40 20 50 10c10-10 10-30 0-50s-30-40-50-70" fill="#ff6b35"/>
            </svg>
          </div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold text-white mb-6">
            Questions About Fire Friday?
          </h2>
          <p className="text-lg text-orange-200/80 mb-8">
            If you have any questions about the event, please don&apos;t hesitate to reach out to us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Contact Us
            </a>
            <a
              href="tel:404-210-1136"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-colors duration-200 shadow-lg hover:shadow-xl border-2 border-orange-400/50"
            >
              Call: 404-210-1136
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
