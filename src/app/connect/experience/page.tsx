"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MessageSquareHeart, CheckCircle2 } from "lucide-react";

type ScaleField = {
  name: string;
  label: string;
  options: string[];
};

const SCALES: ScaleField[] = [
  {
    name: "welcomed_entering",
    label: "I was welcomed as I entered the worship center.",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"],
  },
  {
    name: "likelihood_to_return",
    label: "How likely are you to attend our church service again in the future?",
    options: ["Very Likely", "Likely", "Neutral", "Unlikely", "Very Unlikely"],
  },
  {
    name: "friendliness",
    label:
      "How did you find the friendliness and approachability of our church members and hospitality team?",
    options: ["Very Friendly", "Friendly", "Average", "Unfriendly", "Very Unfriendly"],
  },
];

export default function ExperienceFormPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});

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

    try {
      const response = await fetch("/api/connect-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form_type: "experience",
          submission_data: data,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        window.location.href = "/connect/success?type=experience";
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

  return (
    <div className="bg-white min-h-screen">
      <section className="relative pt-0 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#ECFDF5] via-white to-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-[#0f766e]/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] bg-[#14b8a6]/15 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-3xl mx-auto relative z-10 pt-10 sm:pt-12">
          <div className="pb-4">
            <Link
              href="/connect"
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#0f766e] transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Connect
            </Link>
          </div>

          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0f766e] rounded-2xl mb-5 shadow-lg">
              <MessageSquareHeart className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0D2B45] mb-4 leading-tight">
              Share Your Experience
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
              Thank you for taking our Hospitality Survey! Your honest feedback helps us enhance our welcoming environment so every member and visitor feels cherished and at home.
            </p>
            <p className="text-sm text-gray-500 mt-3">
              Takes about 2 minutes • Responses are confidential
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800 text-sm">
                  {submitError}
                </div>
              )}

              {SCALES.map((field, idx) => (
                <div key={field.name}>
                  <label className="block text-sm font-semibold text-[#0D2B45] mb-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-[#0f766e] text-white rounded-full text-xs font-bold mr-2">
                      {idx + 1}
                    </span>
                    {field.label} <span className="text-red-600">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                    {field.options.map((opt) => (
                      <label
                        key={opt}
                        className={`flex items-center justify-center px-2 py-3 border rounded-lg cursor-pointer transition-all text-xs sm:text-sm text-center ${
                          answers[field.name] === opt
                            ? "bg-[#0f766e] text-white border-[#0f766e] shadow-sm"
                            : "bg-white text-gray-700 border-gray-300 hover:border-[#0f766e] hover:bg-[#0f766e]/5"
                        }`}
                      >
                        <input
                          type="radio"
                          name={field.name}
                          value={opt}
                          checked={answers[field.name] === opt}
                          onChange={(e) =>
                            setAnswers((prev) => ({ ...prev, [field.name]: e.target.value }))
                          }
                          required
                          className="sr-only"
                        />
                        <span className="leading-tight">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              {/* Issues / questions */}
              <div>
                <label
                  htmlFor="issues_or_questions"
                  className="block text-sm font-semibold text-[#0D2B45] mb-3"
                >
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-[#0f766e] text-white rounded-full text-xs font-bold mr-2">
                    4
                  </span>
                  Did you experience any issues or have any questions during your visit that
                  weren&apos;t addressed? Kindly specify.
                </label>
                <textarea
                  id="issues_or_questions"
                  name="issues_or_questions"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-[#0f766e] transition-colors resize-y"
                  placeholder="Optional — let us know how we can do better"
                />
              </div>

              {/* Enhance experience */}
              <div>
                <label
                  htmlFor="enhance_experience"
                  className="block text-sm font-semibold text-[#0D2B45] mb-3"
                >
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-[#0f766e] text-white rounded-full text-xs font-bold mr-2">
                    5
                  </span>
                  How could we enhance our worship service or your experience when you first entered
                  the church?
                </label>
                <textarea
                  id="enhance_experience"
                  name="enhance_experience"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-[#0f766e] transition-colors resize-y"
                  placeholder="Optional — any suggestions are welcome"
                />
              </div>

              {/* Optional name */}
              <div>
                <label htmlFor="full_name" className="block text-sm font-semibold text-[#0D2B45] mb-2">
                  Your Name{" "}
                  <span className="text-gray-400 font-normal text-xs">
                    (optional)
                  </span>
                </label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-[#0f766e] transition-colors"
                  placeholder="Optional — only if you&rsquo;d like us to follow up"
                />
              </div>

              {/* Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0f766e] text-white font-semibold py-4 px-8 rounded-xl hover:bg-[#0c5d56] transition-all shadow-lg hover:shadow-xl text-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      <CheckCircle2 className="h-5 w-5" />
                      Submit Feedback
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
