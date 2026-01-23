"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, MapPin, Users, DollarSign, BookOpen, Trophy, Tent, Mountain } from "lucide-react";
import { getEventBySlug } from "@/lib/events.config";

export default function SummerCampPage() {
  const [isFormValid, setIsFormValid] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Camp Configuration
  const currentYear = new Date().getFullYear();
  const eventConfig = getEventBySlug('summer-camp');
  const isRegistrationOpen = eventConfig?.isRegistrationOpen ?? false; // Read from config (source of truth)
  const date = "July 14th to 18th"; // Date of the camp
  const eventSlug = `summer-camp-${currentYear}`;

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
        window.location.href = '/events/summer-camp/success';
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
        {/* Subtle background patterns - large decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large tent icon */}
          <div className="absolute top-20 right-10 w-88 h-88 opacity-[0.04] transform rotate-12">
            <Tent className="w-full h-full text-blue-600" strokeWidth="1.5" />
          </div>
          {/* Mountain icon */}
          <div className="absolute bottom-40 left-20 w-96 h-96 opacity-[0.03] transform -rotate-6">
            <Mountain className="w-full h-full text-blue-600" strokeWidth="1.5" />
          </div>
          {/* Another tent */}
          <div className="absolute top-1/2 right-1/4 w-64 h-64 opacity-[0.025] transform rotate-[-15deg]">
            <Tent className="w-full h-full text-blue-500" strokeWidth="1.5" />
          </div>
          {/* Calendar icon */}
          <div className="absolute top-32 left-1/4 w-80 h-80 opacity-[0.03] transform rotate-3">
            <Calendar className="w-full h-full text-blue-600" strokeWidth="1.5" />
          </div>
          {/* Trophy icon */}
          <div className="absolute bottom-32 right-1/3 w-72 h-72 opacity-[0.025] transform rotate-[-8deg]">
            <Trophy className="w-full h-full text-yellow-500" strokeWidth="1.5" />
          </div>
          {/* Subtle gradient overlays */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/30 via-transparent to-yellow-50/20"></div>
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-100/15 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-yellow-100/15 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-12">
            {/* Badge */}
            <div className={`inline-flex items-center px-6 py-3 text-white rounded-full text-sm font-semibold mb-8 shadow-lg ${
              isRegistrationOpen ? 'bg-yellow-500' : 'bg-red-600'
            }`}>
              <Calendar className="h-4 w-4 mr-2" />
              {isRegistrationOpen ? 'Registration Now Open' : 'Registration Closed'}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-blue-900 mb-8 leading-tight">
              Youth &amp; Children&apos;s{" "}
              <span className="text-yellow-600">
                Summer Camp {currentYear}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-800/90 max-w-4xl mx-auto leading-relaxed">
              Join us for an unforgettable week of fun, friendship, and faith from{" "}
              <span className="font-semibold text-yellow-600 text-[20px]">{date}</span>
            </p>
          </div>

          {/* Enhanced Camp Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-blue-100">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">5 Days of Fun</h3>
                  <p className="text-blue-800/70 text-sm">Monday through Friday adventure</p>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-blue-100">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">Great Redemption Ministries</h3>
                  <p className="text-blue-800/70 text-sm">Safe, welcoming environment</p>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-blue-100">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">All Ages Welcome</h3>
                  <p className="text-blue-800/70 text-sm">Youth & children programs</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50/80 rounded-3xl shadow-2xl p-10 max-w-4xl mx-auto border-2 border-yellow-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-100/50 rounded-full -translate-y-16 translate-x-16"></div>
            <p className="text-lg text-blue-900 leading-relaxed relative z-10 font-medium">
              Whether you&apos;re a parent signing up your kids or a youth investing in your own growth,
              this camp offers exciting activities and meaningful experiences. Make new friends,
              deepen your faith, and build confidence in a safe, nurturing environment!
            </p>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section id="register" className="py-16 px-4 sm:px-6 lg:px-8 bg-white relative">
        {/* Subtle background pattern - large decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 opacity-[0.03] transform rotate-[-12deg]">
            <Tent className="w-full h-full text-blue-600" strokeWidth="1.5" />
          </div>
          <div className="absolute bottom-20 right-20 w-88 h-88 opacity-[0.025] transform rotate-8">
            <Mountain className="w-full h-full text-blue-500" strokeWidth="1.5" />
          </div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 opacity-[0.02] transform rotate-[-5deg]">
            <BookOpen className="w-full h-full text-yellow-500" strokeWidth="1.5" />
          </div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          {isRegistrationOpen ? (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                  Summer Camp Registration
                </h2>
                <p className="text-lg text-blue-800/80 max-w-2xl mx-auto">
                  Fill out the form below to register for the {currentYear} Youth &amp; Children&apos;s Summer Camp.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-yellow-200 p-8">
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
                    <h3 className="text-2xl font-bold text-blue-900">Registration Information</h3>
                    <p className="text-gray-700 mt-2">Please fill out all required fields below</p>
                  </div>

                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-semibold text-blue-900 mb-2">
                        First Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="first_name"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200"
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-semibold text-blue-900 mb-2">
                        Last Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="last_name"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200"
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-blue-900 mb-2">
                      Email Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200"
                      placeholder="Enter your email address"
                    />
                  </div>

                  {/* Age Field */}
                  <div>
                    <label htmlFor="age" className="block text-sm font-semibold text-blue-900 mb-2">
                      Age <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      required
                      min="1"
                      max="25"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200"
                      placeholder="Enter age"
                    />
                  </div>

                  {/* Emergency Contact Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div>
                      <label htmlFor="emergencyContactName" className="block text-sm font-semibold text-blue-900 mb-2">
                        Emergency Contact Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="emergencyContactName"
                        name="emergency_contact_name"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200"
                        placeholder="Enter emergency contact name"
                      />
                    </div>
                    <div>
                      <label htmlFor="emergencyContactPhone" className="block text-sm font-semibold text-blue-900 mb-2">
                        Emergency Contact Phone # <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="tel"
                        id="emergencyContactPhone"
                        name="emergency_contact_phone"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200"
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>

                  {/* Field Separator */}
                  <hr className="my-8 border-gray-200" />

                  {/* City Field */}
                  <div>
                    <label htmlFor="city" className="block text-sm font-semibold text-blue-900 mb-2">
                      City you&apos;re located in <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200"
                      placeholder="Enter your city"
                    />
                  </div>

                  {/* Transportation Field */}
                  <div>
                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                      Transportation needed? <span className="text-red-600">*</span>
                    </label>
                    <div className="flex space-x-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="transportation"
                          value="Yes"
                          required
                          className="mr-2 text-yellow-500 focus:ring-yellow-500"
                        />
                        <span className="text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="transportation"
                          value="No"
                          required
                          className="mr-2 text-yellow-500 focus:ring-yellow-500"
                        />
                        <span className="text-gray-700">No</span>
                      </label>
                    </div>
                  </div>

                  {/* Food Allergies Field */}
                  <div className="mb-8">
                    <label htmlFor="foodAllergies" className="block text-sm font-semibold text-blue-900 mb-2">
                      Any food allergies?
                    </label>
                    <textarea
                      id="foodAllergies"
                      name="food_allergies"
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200 resize-none"
                      placeholder="Please list any food allergies or dietary restrictions (optional)"
                    />
                  </div>

                  {/* Field Separator */}
                  <hr className="my-8 border-gray-200" />

                  {/* Payment Method Selection */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-blue-900">Payment Method</h3>
                    <p className="text-gray-700 mt-2">Select how you would like to pay for the camp</p>
                  </div>

                  {/* Payment Methods */}
                  <div className="space-y-4">
                    {/* Cash Payment */}
                    <label className="block cursor-pointer">
                      <input
                        type="radio"
                        name="payment_method"
                        value="Cash"
                        checked={selectedPaymentMethod === "Cash"}
                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                        className="sr-only"
                        required
                      />
                      <div className={`p-4 border-2 rounded-lg transition-all duration-200 relative ${
                        selectedPaymentMethod === "Cash"
                          ? "border-yellow-500 bg-yellow-50"
                          : "border-gray-200 hover:border-yellow-300"
                      }`}>
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                            <DollarSign className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-blue-900">Cash</h4>
                            <p className="text-gray-600 text-sm">Pay on arrival at the camp</p>
                          </div>
                        </div>
                        {selectedPaymentMethod === "Cash" && (
                          <div className="absolute top-1/3 right-3 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </label>

                    {/* Zelle Payment */}
                    <label className="block cursor-pointer">
                      <input
                        type="radio"
                        name="payment_method"
                        value="Zelle"
                        checked={selectedPaymentMethod === "Zelle"}
                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                        className="sr-only"
                        required
                      />
                      <div className={`p-4 border-2 rounded-lg transition-all duration-200 relative ${
                        selectedPaymentMethod === "Zelle"
                          ? "border-yellow-500 bg-yellow-50"
                          : "border-gray-200 hover:border-yellow-300"
                      }`}>
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                            <div className="text-xl font-bold text-white">Z</div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-blue-900">Zelle</h4>
                            <p className="text-gray-600 text-sm">Send to 404-940-8162 (label as &quot;camp&quot;)</p>
                          </div>
                        </div>
                        {selectedPaymentMethod === "Zelle" && (
                          <div className="absolute top-1/3 right-3 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </label>

                    {/* CashApp Payment */}
                    <label className="block cursor-pointer">
                      <input
                        type="radio"
                        name="payment_method"
                        value="CashApp"
                        checked={selectedPaymentMethod === "CashApp"}
                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                        className="sr-only"
                        required
                      />
                      <div className={`p-4 border-2 rounded-lg transition-all duration-200 relative ${
                        selectedPaymentMethod === "CashApp"
                          ? "border-yellow-500 bg-yellow-50"
                          : "border-gray-200 hover:border-yellow-300"
                      }`}>
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                            <div className="text-xl font-bold text-white">$</div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-blue-900">CashApp</h4>
                            <p className="text-gray-600 text-sm">Send to $grmatl (label as &quot;camp&quot;)</p>
                          </div>
                        </div>
                        {selectedPaymentMethod === "CashApp" && (
                          <div className="absolute top-1/3 right-3 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={!isFormValid || isSubmitting}
                      className="w-full bg-yellow-500 text-white font-semibold py-4 px-8 rounded-xl hover:bg-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl text-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-yellow-500"
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
                  Registration for the {currentYear} Youth &amp; Children&apos;s Summer Camp is closed.
                </p>
                <p className="text-gray-500 mb-6">
                  Please check back later for information about next year&apos;s camp registration.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors duration-200 shadow-lg hover:shadow-xl"
                  >
                    Contact Us for More Info
                  </a>
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200 shadow-lg hover:shadow-xl border-2 border-yellow-400"
                  >
                    Return to Home
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        {/* Subtle background patterns */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 opacity-[0.03] transform rotate-12">
            <Tent className="w-full h-full text-blue-600" strokeWidth="1.5" />
          </div>
          <div className="absolute bottom-32 right-32 w-64 h-64 opacity-[0.025] transform rotate-[-8deg]">
            <Trophy className="w-full h-full text-yellow-500" strokeWidth="1.5" />
          </div>
          <div className="absolute top-1/2 right-1/3 w-56 h-56 opacity-[0.02] transform rotate-15">
            <BookOpen className="w-full h-full text-blue-500" strokeWidth="1.5" />
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/30 via-transparent to-yellow-50/20"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-12">
            What to Expect
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-blue-100">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-6">Daily Activities</h3>
              <ul className="text-blue-800/80 space-y-3 text-left">
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <span>Bible study and devotionals</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <span>Fun games and team building</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <span>Creative arts and crafts</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <span>Outdoor activities and sports</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <span>Worship and prayer time</span>
                </li>
              </ul>
            </div>

            <div className="group bg-gradient-to-br from-yellow-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-yellow-100">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-6">Camp Benefits</h3>
              <ul className="text-blue-800/80 space-y-3 text-left">
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <span>Build lasting friendships</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <span>Strengthen faith and character</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <span>Develop leadership skills</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <span>Create unforgettable memories</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <span>Safe, supervised environment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white relative">
        {/* Subtle background patterns */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-16 right-16 w-80 h-80 opacity-[0.03] transform rotate-10">
            <Tent className="w-full h-full text-blue-600" strokeWidth="1.5" />
          </div>
          <div className="absolute bottom-24 left-24 w-60 h-60 opacity-[0.025] transform rotate-[-18deg]">
            <Mountain className="w-full h-full text-blue-500" strokeWidth="1.5" />
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/30 via-transparent to-yellow-50/20"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">
            Questions About the Camp?
          </h2>
          <p className="text-lg text-blue-800/80 mb-8">
            If you have any questions about registration, payment, or camp details,
            please don&apos;t hesitate to reach out to us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Contact Us
            </a>
            <a
              href="tel:404-940-8162"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200 shadow-lg hover:shadow-xl border-2 border-yellow-400"
            >
              Call: 404-940-8162
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
