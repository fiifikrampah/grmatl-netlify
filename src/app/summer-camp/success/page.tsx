"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SummerCampSuccessPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-br from-grm-blue-50 via-white to-grm-blue-50">
      {/* Success Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">

        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            {/* Success Icon */}
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>

            {/* Success Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-grm-primary text-white rounded-full text-sm font-semibold mb-8 shadow-lg">
              <CheckCircle className="h-4 w-4 mr-2" />
              Registration Submitted Successfully
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-grm-primary mb-6 leading-tight">
              Thank You for Registering!
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We&apos;re excited to have you join us for an unforgettable week of fun, friendship, and faith from{" "}
              <span className="font-semibold text-grm-secondary text-[20px]">July 14th to 18th</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/summer-camp"
              className="inline-flex items-center justify-center px-8 py-4 bg-grm-primary text-white font-semibold rounded-xl hover:bg-grm-secondary transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
            >
              Back to Registration
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-grm-primary font-semibold rounded-xl hover:bg-grm-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-grm-primary text-lg"
            >
              Contact Us
            </Link>
          </div>


        </div>
      </section>
    </div>
  );
}
