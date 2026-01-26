"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, MapPin, Droplet, Users } from "lucide-react";
import { getEventBySlug } from "@/lib/events.config";

export default function BaptismPage() {
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const eventConfig = getEventBySlug('baptism');
  const isRegistrationOpen = eventConfig?.isRegistrationOpen ?? false;
  const location = "24 Geneva St. Hapeville GA 30354";
  const eventSlug = 'baptism';

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
        window.location.href = '/events/baptism/success';
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Creative water/baptism themed background patterns */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Wave patterns - multiple layers */}
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]">
            <svg viewBox="0 0 1200 400" className="w-full h-full" preserveAspectRatio="none">
              <path d="M0,200 Q300,150 600,200 T1200,200 L1200,400 L0,400 Z" fill="#2070B4"/>
              <path d="M0,250 Q300,200 600,250 T1200,250 L1200,400 L0,400 Z" fill="#86BEE2"/>
            </svg>
          </div>
          
          {/* Water droplet patterns - varied sizes and rotations */}
          <div className="absolute top-20 right-10 w-72 h-72 opacity-[0.05] transform rotate-12">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path d="M100 20c-20 0-40 20-40 40 0 20 20 40 40 60 20-20 40-40 40-60 0-20-20-40-40-40z" fill="#86BEE2"/>
            </svg>
          </div>
          <div className="absolute bottom-40 left-20 w-96 h-96 opacity-[0.04] transform -rotate-6">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path d="M100 20c-20 0-40 20-40 40 0 20 20 40 40 60 20-20 40-40 40-60 0-20-20-40-40-40z" fill="#86BEE2"/>
            </svg>
          </div>
          <div className="absolute top-1/3 left-1/4 w-56 h-56 opacity-[0.03] transform rotate-45">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path d="M100 20c-20 0-40 20-40 40 0 20 20 40 40 60 20-20 40-40 40-60 0-20-20-40-40-40z" fill="#2070B4"/>
            </svg>
          </div>
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 opacity-[0.035] transform -rotate-12">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path d="M100 20c-20 0-40 20-40 40 0 20 20 40 40 60 20-20 40-40 40-60 0-20-20-40-40-40z" fill="#86BEE2"/>
            </svg>
          </div>
          
          {/* Ripple patterns */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.02]">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <circle cx="100" cy="100" r="30" fill="none" stroke="#2070B4" strokeWidth="2"/>
              <circle cx="100" cy="100" r="50" fill="none" stroke="#86BEE2" strokeWidth="2"/>
              <circle cx="100" cy="100" r="70" fill="none" stroke="#2070B4" strokeWidth="2"/>
            </svg>
          </div>
          
          {/* Layered gradient overlays */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#E2E8EB]/25 via-transparent to-[#86BEE2]/25"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#2070B4]/8 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#0D2B45]/10 via-transparent to-transparent"></div>
          
          {/* Glowing orbs */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#2070B4]/6 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#080A0C]/6 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#86BEE2]/4 rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-[#2070B4]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-12">
            {/* Badge */}
            <div className={`inline-flex items-center px-6 py-3 text-white rounded-full text-sm font-semibold mb-8 shadow-lg ${
              isRegistrationOpen ? 'bg-[#2070B4]' : 'bg-gray-500'
            }`}>
              <Calendar className="h-4 w-4 mr-2" />
              {isRegistrationOpen ? 'Registration Now Open' : 'Details Coming Soon'}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-[#080A0C] mb-8 leading-tight">
              Baptism{" "}
              <span className="text-[#2070B4]">
                Service
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-[#0D2B45] max-w-4xl mx-auto leading-relaxed mb-8">
              A sacred moment of commitment and new beginning in your faith journey
            </p>

            {/* Event Flyer */}
            <div className="mb-12 max-w-2xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-[#2070B4]/30">
                <Image
                  src="/images/events/temp-baptism.jpg"
                  alt="Baptism Service Flyer"
                  width={800}
                  height={1200}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </div>

            {/* Event Details */}
            <div className="flex flex-col items-center justify-center gap-4 text-lg text-[#0D2B45] mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#2070B4]" />
                <span className="font-semibold">Date: To Be Announced</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[#2070B4]" />
                <span>{location}</span>
              </div>
            </div>
          </div>

          {/* Event Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-[#86BEE2]">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-[#2070B4] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Droplet className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#080A0C] mb-2">Sacred Moment</h3>
                  <p className="text-[#0D2B45] text-sm">Public declaration of faith</p>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-[#86BEE2]">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-[#2070B4] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#080A0C] mb-2">Community Support</h3>
                  <p className="text-[#0D2B45] text-sm">Celebrate with your church family</p>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-[#86BEE2]">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-[#2070B4] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#080A0C] mb-2">New Beginning</h3>
                  <p className="text-[#0D2B45] text-sm">Step into your faith journey</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#E2E8EB]/80 rounded-3xl shadow-2xl p-10 max-w-4xl mx-auto border-2 border-[#86BEE2] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#86BEE2]/50 rounded-full -translate-y-16 translate-x-16"></div>
            <p className="text-lg text-[#0D2B45] leading-relaxed relative z-10 font-medium">
              Baptism is a beautiful expression of your commitment to follow Christ. 
              If you&apos;re interested in being baptized, please register below. We&apos;ll begin classes soon and will contact you with further details.
            </p>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section id="register" className="py-16 px-4 sm:px-6 lg:px-8 bg-white relative">
        {/* Creative water-themed background pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Water droplets - varied positions */}
          <div className="absolute top-10 left-10 w-64 h-64 opacity-[0.04] transform rotate-[-12deg]">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path d="M100 20c-20 0-40 20-40 40 0 20 20 40 40 60 20-20 40-40 40-60 0-20-20-40-40-40z" fill="#2070B4"/>
            </svg>
          </div>
          <div className="absolute bottom-20 right-20 w-88 h-88 opacity-[0.035] transform rotate-8">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path d="M100 20c-20 0-40 20-40 40 0 20 20 40 40 60 20-20 40-40 40-60 0-20-20-40-40-40z" fill="#2070B4"/>
            </svg>
          </div>
          <div className="absolute top-1/3 right-1/4 w-56 h-56 opacity-[0.03] transform rotate-45">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path d="M100 20c-20 0-40 20-40 40 0 20 20 40 40 60 20-20 40-40 40-60 0-20-20-40-40-40z" fill="#86BEE2"/>
            </svg>
          </div>
          
          {/* Subtle wave pattern at bottom */}
          <div className="absolute bottom-0 left-0 w-full h-32 opacity-[0.02]">
            <svg viewBox="0 0 1200 200" className="w-full h-full" preserveAspectRatio="none">
              <path d="M0,150 Q300,100 600,150 T1200,150 L1200,200 L0,200 Z" fill="#86BEE2"/>
            </svg>
          </div>
          
          {/* Gradient overlays */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#E2E8EB]/15 via-transparent to-[#86BEE2]/15"></div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#2070B4]/5 via-transparent to-transparent"></div>
        </div>
        <div className="max-w-6xl mx-auto">
          {isRegistrationOpen ? (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#080A0C] mb-4">
                  Registration
                </h2>
                <p className="text-lg text-[#0D2B45] max-w-2xl mx-auto">
                  If you&apos;re interested in being baptized, please fill out the form below. We&apos;ll contact you with details about upcoming baptism classes.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-[#86BEE2] p-8 relative z-10">
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
                    <h3 className="text-2xl font-bold text-[#080A0C]">Express Your Interest</h3>
                    <p className="text-[#0D2B45] mt-2">Please fill out all required fields below</p>
                  </div>

                  {/* Full Name Field */}
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-semibold text-[#080A0C] mb-2">
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="full_name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2070B4] focus:border-[#2070B4] transition-colors duration-200"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Phone Number Field */}
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-semibold text-[#080A0C] mb-2">
                      Phone Number <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phone_number"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2070B4] focus:border-[#2070B4] transition-colors duration-200"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  {/* Age Field */}
                  <div>
                    <label htmlFor="age" className="block text-sm font-semibold text-[#080A0C] mb-2">
                      Age <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      required
                      min="1"
                      max="120"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2070B4] focus:border-[#2070B4] transition-colors duration-200"
                      placeholder="Enter your age"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={!isFormValid || isSubmitting}
                      className="w-full bg-[#2070B4] text-white font-semibold py-4 px-8 rounded-xl hover:bg-[#1a5a8f] transition-all duration-300 shadow-lg hover:shadow-xl text-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#2070B4]"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                    </button>
                  </div>

                  <p className="text-sm text-[#0D2B45] text-center">
                    <span className="text-red-500">*</span> Required fields.
                  </p>
                </form>
              </div>
            </>
          ) : (
            <div className="text-center mb-12">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-gray-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Registration Coming Soon
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Registration for the Baptism Service will open soon. Please check back for updates.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 bg-grm-primary text-white font-semibold rounded-lg hover:bg-grm-secondary transition-colors duration-200 shadow-lg hover:shadow-xl"
                  >
                    Contact Us for More Info
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white relative">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-16 right-16 w-80 h-80 opacity-[0.03] transform rotate-10">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path d="M100 20c-20 0-40 20-40 40 0 20 20 40 40 60 20-20 40-40 40-60 0-20-20-40-40-40z" fill="#2070B4"/>
            </svg>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#86BEE2]/30 via-transparent to-[#86BEE2]/20"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold text-[#080A0C] mb-6">
            Questions About Baptism?
          </h2>
          <p className="text-lg text-[#0D2B45] mb-8">
            If you have questions about baptism or would like to express interest in participating,
            please don&apos;t hesitate to reach out to us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#2070B4] text-white font-semibold rounded-lg hover:bg-[#1a5a8f] transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Contact Us
            </a>
            <a
              href="tel:404-940-8162"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#2070B4] font-semibold rounded-lg hover:bg-[#86BEE2]/20 transition-colors duration-200 shadow-lg hover:shadow-xl border-2 border-[#2070B4]"
            >
              Call: 404-940-8162
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
