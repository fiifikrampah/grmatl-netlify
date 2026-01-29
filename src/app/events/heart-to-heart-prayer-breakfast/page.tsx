"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Users, Heart, Clock, Shirt } from "lucide-react";
import { getEventBySlug } from "@/lib/events.config";


export default function HeartToHeartPrayerBreakfastPage() {
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [willingToServe, setWillingToServe] = useState("");

  // Event Configuration
  const eventConfig = getEventBySlug('heart-to-heart-prayer-breakfast');
  const isRegistrationOpen = eventConfig?.isRegistrationOpen ?? false;
  const date = "Saturday, February 14th, 2026";
  const time = "10am - 1pm";
  const location = "24 Geneva St. Hapeville GA 30354";
  const eventSlug = `heart-to-heart-prayer-breakfast-2026`;

  // Check if form is valid
  const checkFormValidity = (form: HTMLFormElement) => {
    const isValid = form.checkValidity();
    setIsFormValid(isValid);
  };

  // Handle form submission to Supabase
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Convert FormData to object
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = typeof value === 'string' ? value : value.name;
    });

    try {
      const response = await fetch('/api/event-responses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_slug: eventSlug,
          response_data: data,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Redirect to success page
        window.location.href = '/events/heart-to-heart-prayer-breakfast/success';
      } else {
        setSubmitError(result.error || 'Failed to submit registration. Please try again.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('An error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white pt-24">
      {/* Event Details Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle background patterns - large decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large heart patterns - varied sizes and rotations */}
          <div className="absolute top-20 right-10 w-72 h-72 opacity-[0.04] transform rotate-12">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path d="M100 50c-10-20-40-30-50-20s-10 30 0 50c10 20 50 70 50 70s40-50 50-70c10-20 10-40 0-50s-40 0-50 20z" fill="#dc2626"/>
            </svg>
          </div>
          <div className="absolute bottom-40 left-20 w-96 h-96 opacity-[0.03] transform -rotate-6">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path d="M100 50c-10-20-40-30-50-20s-10 30 0 50c10 20 50 70 50 70s40-50 50-70c10-20 10-40 0-50s-40 0-50 20z" fill="#dc2626"/>
            </svg>
          </div>
          <div className="absolute top-1/2 right-1/4 w-56 h-56 opacity-[0.025] transform rotate-[-15deg]">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path d="M100 50c-10-20-40-30-50-20s-10 30 0 50c10 20 50 70 50 70s40-50 50-70c10-20 10-40 0-50s-40 0-50 20z" fill="#dc2626"/>
            </svg>
          </div>
          {/* Prayer hands icon */}
          <div className="absolute top-32 left-1/4 w-80 h-80 opacity-[0.03] transform rotate-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="1.5" className="w-full h-full">
              <path d="M11 12h2M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3M9 7H8a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-1M9 7v3m6-3v3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          {/* Cross icon */}
          <div className="absolute bottom-32 right-1/3 w-64 h-64 opacity-[0.025] transform rotate-[-8deg]">
            <svg viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" className="w-full h-full">
              <path d="M12 2v20M2 12h20" strokeLinecap="round"/>
            </svg>
          </div>
          {/* Subtle gradient overlays */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-50/30 via-transparent to-amber-50/20"></div>
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-red-100/15 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-100/15 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-12">
            {/* Badge */}
            <div className={`inline-flex items-center px-6 py-3 text-white rounded-full text-sm font-semibold mb-8 shadow-lg ${
              isRegistrationOpen ? 'bg-amber-600' : 'bg-red-700'
            }`}>
              <Calendar className="h-4 w-4 mr-2" />
              {isRegistrationOpen ? 'Registration Now Open' : 'Registration Closed'}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-red-900 mb-8 leading-tight">
              Heart to Heart{" "}
              <span className="text-amber-700">
                Prayer Breakfast
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-red-800/90 max-w-4xl mx-auto leading-relaxed mb-8">
              Join us for a special morning of prayer, fellowship, and breakfast
            </p>

            {/* Event Flyer */}
            <div className="mb-12 max-w-2xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-200">
                <Image
                  src="/images/events/heart-to-heart-2026.JPG"
                  alt="Heart to Heart Prayer Breakfast Flyer"
                  width={800}
                  height={1200}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </div>

            {/* Event Details */}
            <div className="flex flex-col items-center justify-center gap-4 text-lg text-red-900 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-amber-600" />
                <span className="font-semibold">{date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-600" />
                <span className="font-semibold">{time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-amber-600" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Shirt className="h-5 w-5 text-amber-600" />
                <span className="font-semibold text-amber-700">Formal Attire - Red & Pink</span>
              </div>
            </div>
          </div>

          {/* Event Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-red-100">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-900 mb-2">Prayer & Fellowship</h3>
                  <p className="text-red-800/70 text-sm">Connect with God and community</p>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-red-100">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-900 mb-2">Breakfast Included</h3>
                  <p className="text-red-800/70 text-sm">Delicious meal together</p>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-red-100">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-900 mb-2">Valentine&apos;s Day</h3>
                  <p className="text-red-800/70 text-sm">Special celebration</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50/80 rounded-3xl shadow-2xl p-10 max-w-4xl mx-auto border-2 border-amber-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/50 rounded-full -translate-y-16 translate-x-16"></div>
            <p className="text-lg text-red-900 leading-relaxed relative z-10 font-medium">
              Come together for a meaningful morning of prayer, connection, and community.
              Whether you&apos;re coming alone or bringing guests, all are welcome to join us
              for this special Heart to Heart Prayer Breakfast.
            </p>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section id="register" className="py-16 px-4 sm:px-6 lg:px-8 bg-white relative">
        {/* Subtle background pattern - large decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 opacity-[0.03] transform rotate-[-12deg]">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path d="M100 50c-10-20-40-30-50-20s-10 30 0 50c10 20 50 70 50 70s40-50 50-70c10-20 10-40 0-50s-40 0-50 20z" fill="#dc2626"/>
            </svg>
          </div>
          <div className="absolute bottom-20 right-20 w-88 h-88 opacity-[0.025] transform rotate-8">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path d="M100 50c-10-20-40-30-50-20s-10 30 0 50c10 20 50 70 50 70s40-50 50-70c10-20 10-40 0-50s-40 0-50 20z" fill="#dc2626"/>
            </svg>
          </div>
          {/* Dove icon */}
          <div className="absolute top-1/3 right-1/4 w-72 h-72 opacity-[0.02] transform rotate-[-5deg]">
            <svg viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="1.5" className="w-full h-full">
              <path d="M12 2C8 6 4 8 4 12c0 4 4 6 8 6s8-2 8-6c0-4-4-6-8-10z" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 12l2 2 6-6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className="max-w-6xl mx-auto">
          {isRegistrationOpen ? (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Registration
                </h2>
                <p className="text-lg text-white/85 max-w-2xl mx-auto">
                  Fill out the form below to register for the Heart to Heart Prayer Breakfast.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-amber-200 p-8 relative z-10">
                <form
                  ref={(form) => {
                    if (form) {
                      checkFormValidity(form);
                      form.addEventListener('input', () => checkFormValidity(form));
                      form.addEventListener('change', () => checkFormValidity(form));
                    }
                  }}
                  onSubmit={handleSubmit}
                  className="max-w-2xl mx-auto space-y-6"
                >
                  {submitError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800 text-sm">
                      {submitError}
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-red-900">Registration Information</h3>
                    <p className="text-gray-700 mt-2">Please fill out all required fields below</p>
                  </div>

                  {/* Full Name Field */}
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-semibold text-red-900 mb-2">
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="full_name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors duration-200"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Phone Number Field */}
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-semibold text-red-900 mb-2">
                      Phone Number <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phone_number"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors duration-200"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  {/* Number of Additional Guests Field */}
                  <div>
                    <label htmlFor="additionalGuests" className="block text-sm font-semibold text-red-900 mb-2">
                      Number of Additional Guests <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      id="additionalGuests"
                      name="additional_guests"
                      required
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors duration-200"
                      placeholder="Enter number of guests (0 if none)"
                    />
                    <p className="text-sm text-gray-600 mt-1">Include yourself in the total count</p>
                  </div>

                  {/* Willingness to Serve Field */}
                  <div>
                    <label className="block text-sm font-semibold text-red-900 mb-2">
                      Are you willing to serve on the day? <span className="text-red-600">*</span>
                    </label>
                    <p className="text-sm text-gray-700 mb-3">We need help with setup, serving, cleanup, etc.</p>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="willing_to_serve"
                          value="Yes"
                          checked={willingToServe === "Yes"}
                          onChange={(e) => setWillingToServe(e.target.value)}
                          required
                          className="mr-2 text-amber-600 focus:ring-amber-500"
                        />
                        <span className="text-gray-700">Yes, I&apos;m willing to help</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="willing_to_serve"
                          value="No"
                          checked={willingToServe === "No"}
                          onChange={(e) => setWillingToServe(e.target.value)}
                          required
                          className="mr-2 text-amber-600 focus:ring-amber-500"
                        />
                        <span className="text-gray-700">No, I won&apos;t be able to help</span>
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={!isFormValid || isSubmitting}
                      className="w-full bg-amber-600 text-white font-semibold py-4 px-8 rounded-xl hover:bg-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-amber-600"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                    </button>
                  </div>

                  <p className="text-sm text-gray-500 text-center">
                    <span className="text-red-500">*</span> Required fields.
                  </p>
                </form>
              </div>
            </>
          ) : (
            <div className="text-center mb-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-red-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Registration Closed
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Registration for the Heart to Heart Prayer Breakfast is closed.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 bg-grm-primary text-white font-semibold rounded-lg hover:bg-grm-secondary transition-colors duration-200 shadow-lg hover:shadow-xl"
                  >
                    Contact Us for More Info
                  </a>
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center px-6 py-3 bg-white text-grm-primary font-semibold rounded-lg hover:bg-grm-blue-50 transition-colors duration-200 shadow-lg hover:shadow-xl border-2 border-grm-primary"
                  >
                    Return to Home
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white relative">
        {/* Subtle background pattern - large decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-16 right-16 w-80 h-80 opacity-[0.03] transform rotate-10">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path d="M100 50c-10-20-40-30-50-20s-10 30 0 50c10 20 50 70 50 70s40-50 50-70c10-20 10-40 0-50s-40 0-50 20z" fill="#dc2626"/>
            </svg>
          </div>
          <div className="absolute bottom-24 left-24 w-60 h-60 opacity-[0.025] transform rotate-[-18deg]">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path d="M100 50c-10-20-40-30-50-20s-10 30 0 50c10 20 50 70 50 70s40-50 50-70c10-20 10-40 0-50s-40 0-50 20z" fill="#dc2626"/>
            </svg>
          </div>
          {/* Prayer icon */}
          <div className="absolute top-1/2 left-1/3 w-68 h-68 opacity-[0.02] transform rotate-6">
            <svg viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="1.5" className="w-full h-full">
              <path d="M12 2v4M12 18v4M4 12h4M16 12h4" strokeLinecap="round"/>
              <circle cx="12" cy="12" r="3" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-50/30 via-transparent to-amber-50/20"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold text-red-900 mb-6">
            Questions About the Event?
          </h2>
          <p className="text-lg text-red-800/80 mb-8">
            If you have any questions about registration or event details,
            please don&apos;t hesitate to reach out to us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Contact Us
            </a>
            <a
              href="tel:404-210-1136"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-red-900 font-semibold rounded-lg hover:bg-white/90 transition-colors duration-200 shadow-lg hover:shadow-xl border-2 border-amber-400"
            >
              Call: 404-210-1136
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
