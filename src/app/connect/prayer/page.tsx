"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, HandHeart, Lock, CheckCircle2 } from "lucide-react";

export default function PrayerRequestPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [urgency, setUrgency] = useState("Standard");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = typeof value === "string" ? value : value.name;
    });

    if (isAnonymous) {
      data.full_name = "Anonymous";
      data.email = data.email || "";
      data.phone_number = data.phone_number || "";
    }
    data.is_anonymous = isAnonymous ? "Yes" : "No";

    try {
      const response = await fetch("/api/connect-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form_type: "prayer",
          submission_data: data,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        window.location.href = "/connect/success?type=prayer";
      } else {
        setSubmitError(result.error || "Failed to submit. Please try again.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError("An error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  const urgencyOptions = ["Standard", "Urgent"];

  return (
    <div className="bg-white min-h-screen">
      <section className="relative pt-0 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#F5F1FA] via-white to-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-[#6b4fa3]/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] bg-[#8b6dc3]/15 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-3xl mx-auto relative z-10 pt-10 sm:pt-12">
          <div className="pb-4">
            <Link
              href="/connect"
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#6b4fa3] transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Connect
            </Link>
          </div>

          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#6b4fa3] rounded-2xl mb-5 shadow-lg">
              <HandHeart className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0D2B45] mb-4 leading-tight">
              Submit a Prayer Request
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
              &ldquo;Cast all your anxiety on Him because He cares for you.&rdquo; <span className="text-[#6b4fa3] font-semibold">— 1 Peter 5:7</span>
            </p>
            <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto mt-4 leading-relaxed">
              Our prayer team would be honored to stand with you. Every request is received with care.
            </p>
          </div>

          {/* Privacy banner */}
          <div className="mb-6 flex items-start gap-3 bg-[#6b4fa3]/5 border border-[#6b4fa3]/20 rounded-xl p-4">
            <Lock className="h-5 w-5 text-[#6b4fa3] flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700">
              <span className="font-semibold text-[#6b4fa3]">Your privacy matters.</span>{" "}
              Prayer requests are only shared with our pastoral prayer team. You can submit anonymously below if you prefer.
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800 text-sm">
                  {submitError}
                </div>
              )}

              {/* Anonymous toggle */}
              <label className="flex items-center gap-3 cursor-pointer select-none p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="h-5 w-5 rounded border-gray-300 text-[#6b4fa3] focus:ring-[#6b4fa3]"
                />
                <span className="text-sm text-gray-800">
                  <span className="font-semibold">Submit anonymously</span> — I prefer not to share my name or contact info
                </span>
              </label>

              {!isAnonymous && (
                <>
                  <div>
                    <label htmlFor="full_name" className="block text-sm font-semibold text-[#0D2B45] mb-2">
                      Your Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="full_name"
                      name="full_name"
                      required={!isAnonymous}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6b4fa3] focus:border-[#6b4fa3] transition-colors"
                      placeholder="First and last name"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-[#0D2B45] mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6b4fa3] focus:border-[#6b4fa3] transition-colors"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone_number" className="block text-sm font-semibold text-[#0D2B45] mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone_number"
                        name="phone_number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6b4fa3] focus:border-[#6b4fa3] transition-colors"
                        placeholder="(Optional)"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Urgency */}
              <div>
                <label className="block text-sm font-semibold text-[#0D2B45] mb-2">
                  How urgent is this request? <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {urgencyOptions.map((opt) => (
                    <label
                      key={opt}
                      className={`flex items-center justify-center px-4 py-3 border rounded-lg cursor-pointer transition-all text-sm font-medium ${
                        urgency === opt
                          ? "bg-[#6b4fa3] text-white border-[#6b4fa3] shadow-sm"
                          : "bg-white text-gray-700 border-gray-300 hover:border-[#6b4fa3] hover:bg-[#6b4fa3]/5"
                      }`}
                    >
                      <input
                        type="radio"
                        name="urgency"
                        value={opt}
                        checked={urgency === opt}
                        onChange={(e) => setUrgency(e.target.value)}
                        required
                        className="sr-only"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Prayer Request */}
              <div>
                <label htmlFor="prayer_request" className="block text-sm font-semibold text-[#0D2B45] mb-2">
                  Your Prayer Request <span className="text-red-600">*</span>
                </label>
                <p className="text-sm text-gray-600 mb-2">Share as much or as little as you&apos;re comfortable with.</p>
                <textarea
                  id="prayer_request"
                  name="prayer_request"
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6b4fa3] focus:border-[#6b4fa3] transition-colors resize-y"
                  placeholder="Tell us what's on your heart..."
                />
              </div>

              {/* Follow up — only when not anonymous, since we need contact info to reach out */}
              {!isAnonymous && (
                <div>
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="request_followup"
                      value="Yes"
                      className="mt-1 h-5 w-5 rounded border-gray-300 text-[#6b4fa3] focus:ring-[#6b4fa3]"
                    />
                    <span className="text-sm text-gray-700">
                      I&apos;d like a pastor or prayer team member to reach out to me personally.
                    </span>
                  </label>
                </div>
              )}

              {/* Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#6b4fa3] text-white font-semibold py-4 px-8 rounded-xl hover:bg-[#593c8f] transition-all shadow-lg hover:shadow-xl text-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      <CheckCircle2 className="h-5 w-5" />
                      Submit Prayer Request
                    </>
                  )}
                </button>
                <p className="text-xs text-gray-500 text-center mt-3">
                  <span className="text-red-500">*</span> Required fields
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
