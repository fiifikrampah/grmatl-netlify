"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, MapPin, Users, DollarSign, BookOpen, Trophy, CheckCircle } from "lucide-react";

export default function SummerCampPage() {
  const [isFormValid, setIsFormValid] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  // Configuration - easy to change year and registration status
  const currentYear = new Date().getFullYear();
  const isRegistrationOpen = true; // Set to false to close registration

  // Check if form is valid
  const checkFormValidity = (form: HTMLFormElement) => {
    const isValid = form.checkValidity();
    setIsFormValid(isValid);
  };






  // Check if form was successfully submitted
  const [isFormSuccess] = useState(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search).get('success') === 'true'
    }
    return false
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-grm-blue-50 via-white to-grm-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-grm-blue-100 rounded-full opacity-10"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-grm-blue-100 rounded-full opacity-10"></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-grm-blue-100 rounded-full opacity-15"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-12">
            {/* Badge */}
            <div className={`inline-flex items-center px-6 py-3 text-white rounded-full text-sm font-semibold mb-8 shadow-lg ${
              isRegistrationOpen ? 'bg-grm-primary' : 'bg-red-600'
            }`}>
              <Calendar className="h-4 w-4 mr-2" />
              {isRegistrationOpen ? 'Registration Now Open' : 'Registration Closed'}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-grm-primary mb-8 leading-tight">
              Youth &amp; Children&apos;s{" "}
              <span className="text-grm-secondary">
                Summer Camp {currentYear}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Join us for an unforgettable week of fun, friendship, and faith from{" "}
              <span className="font-semibold text-grm-secondary text-[20px]">July 14th to 18th</span>
            </p>
          </div>

          {/* Enhanced Camp Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
                        <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-grm-blue-100">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-grm-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-grm-primary mb-2">5 Days of Fun</h3>
                  <p className="text-gray-600 text-sm">Monday through Friday adventure</p>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-grm-blue-100">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-grm-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-grm-primary mb-2">Great Redemption Ministries</h3>
                  <p className="text-gray-600 text-sm">Safe, welcoming environment</p>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-grm-blue-100">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-grm-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-grm-primary mb-2">All Ages Welcome</h3>
                  <p className="text-gray-600 text-sm">Youth & children programs</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-4xl mx-auto border border-grm-blue-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-grm-blue-50 rounded-full -translate-y-16 translate-x-16 opacity-30"></div>
            <p className="text-lg text-gray-700 leading-relaxed relative z-10 font-medium">
              Whether you&apos;re a parent signing up your kids or a youth investing in your own growth,
              this camp offers exciting activities and meaningful experiences. Make new friends,
              deepen your faith, and build confidence in a safe, nurturing environment!
            </p>
          </div>
        </div>
      </section>

      {/* Success Message */}
      {isFormSuccess && (
        <section id="registration-success" className="py-16 px-4 sm:px-6 lg:px-8 bg-green-50">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-200">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Registration Submitted Successfully!</h2>
              <p className="text-lg text-gray-700 mb-6">
                Thank you for registering for the {currentYear} Youth &amp; Children&apos;s Summer Camp.
              </p>
              <div className="bg-green-50 rounded-lg p-6 mb-6 border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">What happens next?</h4>
                <ul className="text-sm text-green-700 text-left space-y-2">
                  <li>• You will receive a confirmation email shortly</li>
                  <li>• Payment instructions will be sent to your email</li>
                  <li>• Contact us if you have any questions</li>
                  <li>• Save the camp dates: July 14th - 18th, {currentYear}</li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-6 py-3 bg-grm-primary text-white font-semibold rounded-lg hover:bg-grm-secondary transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  Return to Home
                </Link>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-grm-primary font-semibold rounded-lg hover:bg-grm-blue-50 transition-colors duration-200 shadow-lg hover:shadow-xl border-2 border-grm-primary"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Registration Form Section */}
      <section id="register" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          {isRegistrationOpen ? (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-grm-primary mb-4">
                  Summer Camp Registration
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Fill out the form below to register for the {currentYear} Youth &amp; Children&apos;s Summer Camp.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-8">
                <form
                  ref={(form) => {
                    if (form) {
                      // Check validity on mount
                      checkFormValidity(form);
                      // Add event listeners for real-time validation
                      form.addEventListener('input', () => checkFormValidity(form));
                      form.addEventListener('change', () => checkFormValidity(form));
                    }
                  }}
                  name="summer-camp-registration"
                  method="POST"
                  data-netlify="true"
                  action="/?success=true#registration-success"
                  className="max-w-2xl mx-auto space-y-6"
                >
              {/* Netlify form detection */}
              <input type="hidden" name="form-name" value="summer-camp-registration" />

              {/* Hidden field for email forwarding */}
              <input type="hidden" name="_to" value="swdev2202@gmail.com" />
              <input type="hidden" name="_subject" value="Summer Camp Registration - New Participant" />

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-grm-primary">Registration Information</h3>
                <p className="text-gray-600 mt-2">Please fill out all required fields below</p>
              </div>

                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-semibold text-grm-primary mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-grm-primary focus:border-transparent transition-colors duration-200"
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-semibold text-grm-primary mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-grm-primary focus:border-transparent transition-colors duration-200"
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-grm-primary mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-grm-primary focus:border-transparent transition-colors duration-200"
                      placeholder="Enter your email address"
                    />
                  </div>

                  {/* Age Field */}
                  <div>
                    <label htmlFor="age" className="block text-sm font-semibold text-grm-primary mb-2">
                      Age *
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      required
                      min="1"
                      max="25"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-grm-primary focus:border-transparent transition-colors duration-200"
                      placeholder="Enter age"
                    />
                  </div>

                  {/* Emergency Contact Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="emergencyContactName" className="block text-sm font-semibold text-grm-primary mb-2">
                        Emergency Contact Name *
                      </label>
                      <input
                        type="text"
                        id="emergencyContactName"
                        name="emergencyContactName"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-grm-primary focus:border-transparent transition-colors duration-200"
                        placeholder="Enter emergency contact name"
                      />
                    </div>
                    <div>
                      <label htmlFor="emergencyContactPhone" className="block text-sm font-semibold text-grm-primary mb-2">
                        Emergency Contact Phone # *
                      </label>
                      <input
                        type="tel"
                        id="emergencyContactPhone"
                        name="emergencyContactPhone"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-grm-primary focus:border-transparent transition-colors duration-200"
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>

                  {/* City Field */}
                  <div>
                    <label htmlFor="city" className="block text-sm font-semibold text-grm-primary mb-2">
                      City you&apos;re located in *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-grm-primary focus:border-transparent transition-colors duration-200"
                      placeholder="Enter your city"
                    />
                  </div>

                  {/* Transportation Field */}
                  <div>
                    <label className="block text-sm font-semibold text-grm-primary mb-2">
                      Transportation needed? *
                    </label>
                    <div className="flex space-x-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="transportation"
                          value="Yes"
                          required
                          className="mr-2 text-grm-primary focus:ring-grm-primary"
                        />
                        <span className="text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="transportation"
                          value="No"
                          required
                          className="mr-2 text-grm-primary focus:ring-grm-primary"
                        />
                        <span className="text-gray-700">No</span>
                      </label>
                    </div>
                  </div>

                  {/* Food Allergies Field */}
                  <div>
                    <label htmlFor="foodAllergies" className="block text-sm font-semibold text-grm-primary mb-2">
                      Any food allergies?
                    </label>
                    <textarea
                      id="foodAllergies"
                      name="foodAllergies"
                      rows={3}
                      className="w-full px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-grm-primary focus:border-transparent transition-colors duration-200 resize-none"
                      placeholder="Please list any food allergies or dietary restrictions (optional)"
                    />
                  </div>

                  {/* Payment Method Selection */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-grm-primary">Payment Method</h3>
                    <p className="text-gray-600 mt-2">Select how you would like to pay for the camp</p>
                  </div>

                  {/* Payment Methods */}
                  <div className="space-y-4">
                    {/* Cash Payment */}
                    <label className="block cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Cash"
                        checked={selectedPaymentMethod === "Cash"}
                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                        className="sr-only"
                        required
                      />
                      <div className={`p-4 border-2 rounded-lg transition-all duration-200 relative ${
                        selectedPaymentMethod === "Cash"
                          ? "border-grm-primary bg-grm-blue-50"
                          : "border-gray-200 hover:border-grm-blue-300"
                      }`}>
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-grm-primary rounded-full flex items-center justify-center">
                            <DollarSign className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-grm-primary">Cash</h4>
                            <p className="text-gray-600 text-sm">Pay on arrival at the camp</p>
                          </div>
                        </div>
                        {selectedPaymentMethod === "Cash" && (
                          <div className="absolute top-1/3 right-3 w-5 h-5 bg-grm-primary rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </label>

                    {/* Zelle Payment */}
                    <label className="block cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Zelle"
                        checked={selectedPaymentMethod === "Zelle"}
                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                        className="sr-only"
                        required
                      />
                      <div className={`p-4 border-2 rounded-lg transition-all duration-200 relative ${
                        selectedPaymentMethod === "Zelle"
                          ? "border-grm-primary bg-grm-blue-50"
                          : "border-gray-200 hover:border-grm-blue-300"
                      }`}>
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-grm-primary rounded-full flex items-center justify-center">
                            <div className="text-xl font-bold text-white">Z</div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-grm-primary">Zelle</h4>
                            <p className="text-gray-600 text-sm">Send to 404-940-8162 (label as &quot;camp&quot;)</p>
                          </div>
                        </div>
                        {selectedPaymentMethod === "Zelle" && (
                          <div className="absolute top-1/3 right-3 w-5 h-5 bg-grm-primary rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </label>

                    {/* CashApp Payment */}
                    <label className="block cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="CashApp"
                        checked={selectedPaymentMethod === "CashApp"}
                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                        className="sr-only"
                        required
                      />
                      <div className={`p-4 border-2 rounded-lg transition-all duration-200 relative ${
                        selectedPaymentMethod === "CashApp"
                          ? "border-grm-primary bg-grm-blue-50"
                          : "border-gray-200 hover:border-grm-blue-300"
                      }`}>
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-grm-primary rounded-full flex items-center justify-center">
                            <div className="text-xl font-bold text-white">$</div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-grm-primary">CashApp</h4>
                            <p className="text-gray-600 text-sm">Send to $grmatl (label as &quot;camp&quot;)</p>
                          </div>
                        </div>
                        {selectedPaymentMethod === "CashApp" && (
                          <div className="absolute top-1/3 right-3 w-5 h-5 bg-grm-primary rounded-full flex items-center justify-center">
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
                      disabled={!isFormValid}
                      className="w-full bg-grm-primary text-white font-semibold py-4 px-8 rounded-xl hover:bg-grm-secondary transition-all duration-300 shadow-lg hover:shadow-xl text-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-grm-primary"
                    >
                      Submit Registration
                    </button>
                  </div>

              <p className="text-sm text-gray-500 text-center">
                * Required fields.
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

      {/* Additional Information */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-grm-blue-50 rounded-full opacity-15"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-grm-blue-50 rounded-full opacity-15"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-grm-primary mb-12">
            What to Expect
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group bg-gradient-to-br from-grm-blue-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-grm-blue-100">
              <div className="w-16 h-16 bg-grm-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-grm-primary mb-6">Daily Activities</h3>
              <ul className="text-gray-600 space-y-3 text-left">
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-grm-secondary rounded-full"></span>
                  <span>Bible study and devotionals</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-grm-secondary rounded-full"></span>
                  <span>Fun games and team building</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-grm-secondary rounded-full"></span>
                  <span>Creative arts and crafts</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-grm-secondary rounded-full"></span>
                  <span>Outdoor activities and sports</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-grm-secondary rounded-full"></span>
                  <span>Worship and prayer time</span>
                </li>
              </ul>
            </div>

            <div className="group bg-gradient-to-br from-grm-blue-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-grm-blue-100">
              <div className="w-16 h-16 bg-grm-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-grm-primary mb-6">Camp Benefits</h3>
              <ul className="text-gray-600 space-y-3 text-left">
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-grm-secondary rounded-full"></span>
                  <span>Build lasting friendships</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-grm-secondary rounded-full"></span>
                  <span>Strengthen faith and character</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-grm-secondary rounded-full"></span>
                  <span>Develop leadership skills</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-grm-secondary rounded-full"></span>
                  <span>Create unforgettable memories</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-grm-secondary rounded-full"></span>
                  <span>Safe, supervised environment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-grm-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-grm-primary mb-6">
            Questions About the Camp?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            If you have any questions about registration, payment, or camp details,
            please don&apos;t hesitate to reach out to us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-grm-primary text-white font-semibold rounded-lg hover:bg-grm-secondary transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Contact Us
            </a>
            <a
              href="tel:404-940-8162"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-grm-primary font-semibold rounded-lg hover:bg-grm-blue-50 transition-colors duration-200 shadow-lg hover:shadow-xl border-2 border-grm-primary"
            >
              Call: 404-940-8162
            </a>
          </div>
        </div>
      </section>


    </div>
  );
}
