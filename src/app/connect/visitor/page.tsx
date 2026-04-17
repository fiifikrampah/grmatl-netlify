"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, UserPlus, CheckCircle2 } from "lucide-react";
import { useConnectHaptics } from "../useConnectHaptics";

type RadioField = {
  name: string;
  label: string;
  required?: boolean;
  options: string[];
  helperText?: string;
  allowOther?: boolean;
};

const AGE_RANGES = [
  "13-17",
  "18-23",
  "24-29",
  "30-34",
  "35-39",
  "40-44",
  "45-49",
  "50-54",
  "55-59",
  "60+",
];

const TITLES = ["Mr.", "Mrs.", "Miss", "Dr."];
const CONTACT_METHODS = ["Call", "Text"];
const CONTACT_TIMES = ["Morning", "Afternoon", "Evening"];
const HOME_CHURCH = ["Yes", "No"];

function todayIso(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function VisitorFormPage() {
  const { tapOption } = useConnectHaptics();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [titleOther, setTitleOther] = useState("");
  const [homeChurch, setHomeChurch] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [contactMethod, setContactMethod] = useState("");
  const [contactTime, setContactTime] = useState("");
  const [contactTimeOther, setContactTimeOther] = useState("");

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

    // Capture today's date automatically
    data.todays_date = todayIso();

    // Resolve "Other" values
    if (data.title === "Other" && titleOther.trim()) {
      data.title = titleOther.trim();
    }
    if (data.best_time_to_contact === "Other" && contactTimeOther.trim()) {
      data.best_time_to_contact = contactTimeOther.trim();
    }

    try {
      const response = await fetch("/api/connect-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form_type: "visitor",
          submission_data: data,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        window.location.href = "/connect/success?type=visitor";
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

  const renderRadioGroup = (
    field: RadioField,
    selected: string,
    setSelected: (v: string) => void,
    otherValue?: string,
    setOtherValue?: (v: string) => void
  ) => (
    <div>
      <label className="block text-sm font-semibold text-[#0D2B45] mb-2">
        {field.label} {field.required && <span className="text-red-600">*</span>}
      </label>
      {field.helperText && (
        <p className="text-sm text-gray-600 mb-3">{field.helperText}</p>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {field.options.map((opt) => (
          <label
            key={opt}
            className={`flex items-center justify-center px-3 py-2.5 border rounded-lg cursor-pointer transition-all text-sm ${
              selected === opt
                ? "bg-[#1B5299] text-white border-[#1B5299] shadow-sm"
                : "bg-white text-gray-700 border-gray-300 hover:border-[#1B5299] hover:bg-[#1B5299]/5"
            }`}
          >
            <input
              type="radio"
              name={field.name}
              value={opt}
              checked={selected === opt}
              onChange={(e) => {
                tapOption();
                setSelected(e.target.value);
              }}
              required={field.required}
              className="sr-only"
            />
            <span className="text-center">{opt}</span>
          </label>
        ))}
        {field.allowOther && (
          <label
            className={`flex items-center justify-center px-3 py-2.5 border rounded-lg cursor-pointer transition-all text-sm ${
              selected === "Other"
                ? "bg-[#1B5299] text-white border-[#1B5299] shadow-sm"
                : "bg-white text-gray-700 border-gray-300 hover:border-[#1B5299] hover:bg-[#1B5299]/5"
            }`}
          >
            <input
              type="radio"
              name={field.name}
              value="Other"
              checked={selected === "Other"}
              onChange={(e) => {
                tapOption();
                setSelected(e.target.value);
              }}
              required={field.required}
              className="sr-only"
            />
            <span>Other</span>
          </label>
        )}
      </div>
      {field.allowOther && selected === "Other" && setOtherValue && (
        <input
          type="text"
          value={otherValue || ""}
          onChange={(e) => setOtherValue(e.target.value)}
          placeholder="Please specify"
          required
          className="mt-3 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B5299] focus:border-[#1B5299] transition-colors"
        />
      )}
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      <section className="relative pt-0 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#F4F7FB] via-white to-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-[#1B5299]/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] bg-[#86BEE2]/15 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-3xl mx-auto relative z-10 pt-10 sm:pt-12">
          <div className="pb-4">
            <Link
              href="/connect"
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#1B5299] transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Connect
            </Link>
          </div>

          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1B5299] rounded-2xl mb-5 shadow-lg">
              <UserPlus className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0D2B45] mb-4 leading-tight">
              We&apos;re Glad You&apos;re Here
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
              Welcome to Great Redemption Ministries! We&apos;re delighted to have you with us and would love to keep in touch. Share a little about yourself below.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800 text-sm">
                  {submitError}
                </div>
              )}

              {/* Title */}
              {renderRadioGroup(
                {
                  name: "title",
                  label: "Title",
                  required: true,
                  options: TITLES,
                  allowOther: true,
                },
                title,
                setTitle,
                titleOther,
                setTitleOther
              )}

              {/* Full Name */}
              <div>
                <label htmlFor="full_name" className="block text-sm font-semibold text-[#0D2B45] mb-2">
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B5299] focus:border-[#1B5299] transition-colors"
                  placeholder="Your full name"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phone_number" className="block text-sm font-semibold text-[#0D2B45] mb-2">
                  Phone Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  id="phone_number"
                  name="phone_number"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B5299] focus:border-[#1B5299] transition-colors"
                  placeholder="(404) 555-0123"
                />
              </div>

              {/* Full Address */}
              <div>
                <label htmlFor="full_address" className="block text-sm font-semibold text-[#0D2B45] mb-2">
                  Full Address <span className="text-red-600">*</span>
                </label>
                <p className="text-sm text-gray-600 mb-2">Please include apartment # if applicable</p>
                <textarea
                  id="full_address"
                  name="full_address"
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B5299] focus:border-[#1B5299] transition-colors resize-y"
                  placeholder="Street address, apt #, city, state, zip"
                />
              </div>

              {/* Who invited you */}
              <div>
                <label htmlFor="invited_by" className="block text-sm font-semibold text-[#0D2B45] mb-2">
                  Who invited you to church today?
                </label>
                <input
                  type="text"
                  id="invited_by"
                  name="invited_by"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B5299] focus:border-[#1B5299] transition-colors"
                  placeholder="Optional — name of friend, family, or how you heard about us"
                />
              </div>

              {/* Home Church */}
              {renderRadioGroup(
                {
                  name: "home_church",
                  label: "Do you have a home church?",
                  required: true,
                  options: HOME_CHURCH,
                },
                homeChurch,
                setHomeChurch
              )}

              {/* Age Range */}
              {renderRadioGroup(
                {
                  name: "age_range",
                  label: "Please choose your age range",
                  required: true,
                  options: AGE_RANGES,
                },
                ageRange,
                setAgeRange
              )}

              {/* Contact Method */}
              {renderRadioGroup(
                {
                  name: "preferred_contact_method",
                  label: "What is your preferred form of contact?",
                  required: true,
                  options: CONTACT_METHODS,
                },
                contactMethod,
                setContactMethod
              )}

              {/* Best Time to Contact */}
              {renderRadioGroup(
                {
                  name: "best_time_to_contact",
                  label: "What is the best time to contact you?",
                  required: true,
                  options: CONTACT_TIMES,
                  allowOther: true,
                },
                contactTime,
                setContactTime,
                contactTimeOther,
                setContactTimeOther
              )}

              {/* Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#1B5299] text-white font-semibold py-4 px-8 rounded-xl hover:bg-[#154a87] transition-all shadow-lg hover:shadow-xl text-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      <CheckCircle2 className="h-5 w-5" />
                      Submit
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
