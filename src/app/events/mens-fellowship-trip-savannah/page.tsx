"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Anchor, Sun, DollarSign, ArrowLeft } from "lucide-react";
import { getEventBySlug } from "@/lib/events.config";
import Reveal from "@/components/Reveal";

// Savannah palette: navy, warm amber/gold accent, cream
const NAVY = "#0f3a70";
const AMBER = "#b8860b"; // dark goldenrod - Savannah warmth
const CREAM = "#faf8f5";

type RegistrationType = "adult" | "youth";

export default function MensFellowshipTripPage() {
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [registrationType, setRegistrationType] = useState<RegistrationType>("adult");

  const eventConfig = getEventBySlug("mens-fellowship-trip-savannah");
  const isRegistrationOpen = eventConfig?.isRegistrationOpen ?? false;
  const date = "Saturday, June 20th, 2026";
  const eventSlug = "mens-fellowship-trip-savannah";

  const checkFormValidity = (form: HTMLFormElement) => {
    const isValid = form.checkValidity();
    setIsFormValid(isValid);
  };

  // Reset form validity when switching registration type (fields change)
  const handleRegistrationTypeChange = (type: RegistrationType) => {
    setRegistrationType(type);
    setIsFormValid(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data: Record<string, string> = {
      registration_type: registrationType,
    };
    formData.forEach((value, key) => {
      data[key] = typeof value === "string" ? value : value.name;
    });

    try {
      const response = await fetch("/api/event-responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_slug: eventSlug,
          response_data: data,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        const shortPath = eventConfig?.shortPath;
        const isShortUrl = typeof window !== "undefined" && shortPath && window.location.pathname === shortPath;
        window.location.href = isShortUrl ? `${shortPath}/success` : `${eventConfig?.path ?? "/events/mens-fellowship-trip-savannah"}/success`;
      } else {
        setSubmitError(result.error || "Failed to submit registration. Please try again.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError("An error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: CREAM }}>
      {/* Hero / Main Content Section */}
      <section className="relative pt-0 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Savannah sunset gradient mesh - warm amber + navy */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 120% 80% at 20% 0%, rgba(184, 134, 11, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse 100% 60% at 80% 20%, rgba(15, 58, 112, 0.06) 0%, transparent 45%),
              radial-gradient(ellipse 80% 50% at 50% 100%, rgba(184, 134, 11, 0.05) 0%, transparent 50%),
              linear-gradient(180deg, ${CREAM} 0%, rgba(250, 248, 245, 0.95) 100%)
            `,
          }}
        />

        {/* Nautical decorative elements - anchor silhouette */}
        <div className="absolute top-24 right-8 w-40 h-40 opacity-[0.03] transform rotate-12 hidden md:block">
          <svg viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="1.5" className="w-full h-full">
            <path d="M12 2v6M12 16v6M5 12H2a10 10 0 0 1 20 0h-3M5 12a4 4 0 0 1 7-2h0a4 4 0 0 1 7 2M5 12a4 4 0 0 0 7 2h0a4 4 0 0 0 7-2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="absolute bottom-48 left-12 w-32 h-32 opacity-[0.025] transform -rotate-6 hidden md:block">
          <svg viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="1.5" className="w-full h-full">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
          </svg>
        </div>

        {/* Soft orbs for depth */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-40" style={{ backgroundColor: `${AMBER}15` }} />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-30" style={{ backgroundColor: `${NAVY}12` }} />

        <div className="max-w-7xl mx-auto relative z-10 pt-40">
          <Reveal>
            <div className="pb-4">
              <Link
                href="/events"
                className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-grm-primary transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Events
              </Link>
            </div>
          </Reveal>

          <Reveal delay={50}>
            <div className="flex justify-center mb-10">
              <div
                className={`inline-flex items-center px-4 py-2.5 sm:px-6 sm:py-3 text-white rounded-full text-sm font-semibold shadow-lg w-fit max-w-full sm:max-w-none justify-center text-center transition-all duration-300 ${
                  isRegistrationOpen ? "bg-[#0f3a70]" : "bg-gray-500"
                }`}
                style={isRegistrationOpen ? { boxShadow: `0 4px 14px ${NAVY}40` } : {}}
              >
                <Calendar className="h-4 w-4 mr-2 shrink-0" />
                <span>{isRegistrationOpen ? "Registration Now Open" : "Details Coming Soon"}</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-6xl font-bold text-[#080A0C] mb-6 leading-tight tracking-tight">
                Men&apos;s Fellowship{" "}
                <span className="text-[#0f3a70]" style={{ textShadow: "0 1px 2px rgba(15,58,112,0.1)" }}>
                  Trip to Savannah
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-[#0D2B45]/90 max-w-3xl mx-auto leading-relaxed">
                A day of fellowship, bonding, and fun as we visit Forsyth Park, enjoy a Riverboat Cruise, and spend time at Tybee Island Beach
              </p>
            </div>
          </Reveal>

          {/* Flyer with decorative frame */}
          <Reveal delay={150}>
            <div className="mb-14 max-w-2xl mx-auto">
              <div
                className="relative rounded-2xl overflow-hidden shadow-2xl p-2 sm:p-3"
                style={{
                  background: `linear-gradient(135deg, ${NAVY}20 0%, ${AMBER}15 50%, ${NAVY}15 100%)`,
                  border: `2px solid ${NAVY}25`,
                  boxShadow: `0 25px 50px -12px rgba(15, 58, 112, 0.15), 0 0 0 1px ${NAVY}10`,
                }}
              >
                <div className="rounded-xl overflow-hidden bg-white">
                  <Image
                    src="/images/events/flyers/men-trip.jpg"
                    alt="Men's Fellowship Trip to Savannah Flyer"
                    width={800}
                    height={1200}
                    className="w-full h-auto object-contain"
                    priority
                    quality={92}
                  />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Scripture - focal design element with decorative treatment */}
          <Reveal delay={200}>
            <div
              className="mb-14 max-w-2xl mx-auto text-center py-8 px-6 sm:py-10 sm:px-10 rounded-2xl relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${NAVY}08 0%, transparent 50%, ${AMBER}06 100%)`,
                border: `1px solid ${NAVY}15`,
                boxShadow: `inset 0 1px 0 ${NAVY}08`,
              }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-[#0f3a70] to-transparent opacity-40" />
              <p className="text-xl md:text-2xl italic text-[#0D2B45] leading-relaxed font-medium">
                &ldquo;As iron sharpens iron, so one man sharpens another.&rdquo;
              </p>
              <cite className="block mt-3 text-base font-semibold not-italic" style={{ color: NAVY }}>
                — Proverbs 27:17
              </cite>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-[#b8860b] to-transparent opacity-50" />
            </div>
          </Reveal>

          {/* Event details - Editorial "The Itinerary" treatment */}
          <Reveal delay={250}>
            <div className="mb-16 max-w-3xl mx-auto">
              {/* Framed block - invitation aesthetic */}
              <div
                className="relative overflow-hidden text-center"
                style={{
                  padding: "clamp(1.5rem, 4vw, 2.5rem) clamp(1.5rem, 5vw, 3rem)",
                  background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(250,248,245,0.9) 100%)",
                  border: `1px solid ${NAVY}18`,
                  boxShadow: `
                    0 0 0 1px ${NAVY}08,
                    0 25px 50px -12px rgba(15, 58, 112, 0.12),
                    inset 0 1px 0 rgba(255,255,255,0.8)
                  `,
                }}
              >
                {/* Corner accent - subtle nautical flourish */}
                <div
                  className="absolute top-0 right-0 w-24 h-24 opacity-[0.06]"
                  style={{
                    background: `radial-gradient(circle at 100% 0%, ${NAVY} 0%, transparent 70%)`,
                  }}
                />

                {/* Label */}
                <p
                  className="text-[10px] sm:text-xs font-semibold tracking-[0.35em] uppercase mb-6"
                  style={{ color: `${NAVY}99`, letterSpacing: "0.35em" }}
                >
                  The Itinerary
                </p>

                {/* Date - display typography */}
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#080A0C] mb-1">
                  {date}
                </p>
                <p className="text-sm text-gray-500 mb-8">Save the date</p>

                {/* Decorative rule */}
                <div
                  className="h-px mb-8"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, ${NAVY}30 20%, ${AMBER}40 50%, ${NAVY}30 80%, transparent 100%)`,
                  }}
                />

                {/* Location - stacked on mobile (each on own line), inline with dots on desktop */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-center gap-0.5 sm:gap-0 text-lg sm:text-xl text-[#0D2B45] font-medium mb-6 leading-relaxed">
                  <span>Forsyth Park</span>
                  <span className="hidden sm:inline mx-2 opacity-40" aria-hidden>·</span>
                  <span>Riverboat Cruise</span>
                  <span className="hidden sm:inline mx-2 opacity-40" aria-hidden>·</span>
                  <span>Tybee Island Beach</span>
                </div>

                {/* Cost - contained callout */}
                <div
                  className="inline-block py-3 px-5 sm:py-4 sm:px-6 rounded-lg mb-6 text-center"
                  style={{
                    background: `linear-gradient(135deg, ${NAVY}08 0%, ${NAVY}04 100%)`,
                    border: `1px solid ${NAVY}15`,
                  }}
                >
                  <p className="text-xl sm:text-2xl font-bold text-[#080A0C]">
                    $150 <span className="font-normal text-gray-600 text-base sm:text-lg">adults</span>
                    <span className="mx-2 text-gray-300">/</span>
                    $120 <span className="font-normal text-gray-600 text-base sm:text-lg">youth</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-1.5">Payment plan: March, April, May</p>
                </div>

                {/* Registration note - fine print */}
                <div
                  className="pt-6 border-t"
                  style={{ borderColor: `${NAVY}12` }}
                >
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Registration ends in March. We need an accurate head count, including the number of children attending.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Activity cards - nautical accent, asymmetric feel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto mb-20">
            {[
              { icon: MapPin, title: "Forsyth Park", desc: "Explore historic Savannah's iconic park", delay: 300 },
              { icon: Anchor, title: "Riverboat Cruise", desc: "Scenic cruise on the Savannah River", delay: 350 },
              { icon: Sun, title: "Tybee Island Beach", desc: "Relax and fellowship by the ocean", delay: 400 },
            ].map(({ icon: Icon, title, desc, delay }) => (
              <Reveal key={title} delay={delay}>
                <div
                  className="group h-full rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl text-center"
                  style={{
                    background: "rgba(255,255,255,0.8)",
                    border: `2px solid ${NAVY}15`,
                    boxShadow: `0 4px 20px -4px ${NAVY}08`,
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 mx-auto transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${NAVY}12`, border: `1px solid ${NAVY}20` }}
                  >
                    <Icon className="h-8 w-8" style={{ color: NAVY }} />
                  </div>
                  <h3 className="text-xl font-bold text-[#080A0C] mb-2">{title}</h3>
                  <p className="text-[#0D2B45]/80 text-sm leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Info callout */}
          <Reveal delay={450}>
            <div
              className="rounded-2xl p-8 sm:p-10 max-w-4xl mx-auto relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${NAVY}06 0%, ${AMBER}04 100%)`,
                border: `1px solid ${NAVY}15`,
                boxShadow: `0 4px 24px -4px ${NAVY}08`,
              }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-30" style={{ backgroundColor: `${AMBER}30` }} />
              <p className="text-lg text-[#0D2B45] leading-relaxed relative z-10 font-medium text-center">
                Join us for a wonderful time of fellowship, bonding, and fun as we visit historic Savannah. More details will be provided in the coming weeks. For more information, please see Nana Eyin or Bra Moses.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Registration Section */}
      <section
        id="register"
        className="py-20 px-4 sm:px-6 lg:px-8 relative"
        style={{
          background: `linear-gradient(180deg, rgba(255,255,255,0.5) 0%, ${CREAM} 100%)`,
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-0 w-64 h-64 opacity-[0.03] transform rotate-12">
            <svg viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="1.5" className="w-full h-full">
              <path d="M12 2v6M12 16v6M5 12H2a10 10 0 0 1 20 0h-3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          {isRegistrationOpen ? (
            <>
              <Reveal>
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#080A0C] mb-4">Registration</h2>
                  <p className="text-lg text-[#0D2B45]/90 max-w-2xl mx-auto">
                    Register for the Men&apos;s Fellowship Trip to Savannah. We&apos;ll contact you with more details as the date approaches.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={50}>
                <div
                  className="rounded-2xl overflow-hidden p-8 sm:p-10 max-w-2xl mx-auto"
                  style={{
                    background: "rgba(255,255,255,0.9)",
                    border: `2px solid ${NAVY}15`,
                    boxShadow: `0 25px 50px -12px rgba(15, 58, 112, 0.15)`,
                  }}
                >
                  <form
                    ref={(form) => {
                      if (form) {
                        checkFormValidity(form);
                        form.addEventListener("input", () => checkFormValidity(form));
                        form.addEventListener("change", () => checkFormValidity(form));
                      }
                    }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {submitError && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800 text-sm">
                        {submitError}
                      </div>
                    )}

                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-[#080A0C]">Register Now</h3>
                      <p className="text-[#0D2B45]/80 mt-2">Choose your registration type and fill out the form</p>
                    </div>

                    {/* Adult / Youth toggle */}
                    <div className="flex rounded-xl p-1" style={{ background: `${NAVY}10`, border: `1px solid ${NAVY}15` }}>
                      <button
                        type="button"
                        onClick={() => handleRegistrationTypeChange("adult")}
                        className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                          registrationType === "adult"
                            ? "text-white shadow-sm"
                            : "text-[#0D2B45]/70 hover:text-[#0D2B45]"
                        }`}
                        style={registrationType === "adult" ? { backgroundColor: NAVY } : {}}
                      >
                        Adult Registration
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRegistrationTypeChange("youth")}
                        className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                          registrationType === "youth"
                            ? "text-white shadow-sm"
                            : "text-[#0D2B45]/70 hover:text-[#0D2B45]"
                        }`}
                        style={registrationType === "youth" ? { backgroundColor: NAVY } : {}}
                      >
                        Youth Registration
                      </button>
                    </div>

                    {/* Common fields */}
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-semibold text-[#080A0C] mb-2">
                        Full Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="full_name"
                        required
                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#0f3a70] focus:border-[#0f3a70] transition-all duration-200"
                        style={{ borderColor: `${NAVY}25` }}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="phoneNumber" className="block text-sm font-semibold text-[#080A0C] mb-2">
                        Phone Number <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phone_number"
                        required
                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#0f3a70] focus:border-[#0f3a70] transition-all duration-200"
                        style={{ borderColor: `${NAVY}25` }}
                        placeholder="Enter your phone number"
                      />
                    </div>

                    {/* Adult-only: No. of Kids */}
                    {registrationType === "adult" && (
                      <div>
                        <label htmlFor="numKids" className="block text-sm font-semibold text-[#080A0C] mb-2">
                          No. of Kids Going With Adult <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="number"
                          id="numKids"
                          name="num_kids"
                          required
                          min={0}
                          max={20}
                          className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#0f3a70] focus:border-[#0f3a70] transition-all duration-200"
                          style={{ borderColor: `${NAVY}25` }}
                          placeholder="0"
                        />
                        <p className="text-xs text-gray-500 mt-1">Enter 0 if none</p>
                      </div>
                    )}

                    {/* Youth-only: Parent Name, Emergency Contact */}
                    {registrationType === "youth" && (
                      <>
                        <div>
                          <label htmlFor="parentName" className="block text-sm font-semibold text-[#080A0C] mb-2">
                            Parent Name
                          </label>
                          <input
                            type="text"
                            id="parentName"
                            name="parent_name"
                            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#0f3a70] focus:border-[#0f3a70] transition-all duration-200"
                            style={{ borderColor: `${NAVY}25` }}
                            placeholder="If parents are GRM members"
                          />
                          <p className="text-xs text-gray-500 mt-1">If parents are GRM members</p>
                        </div>
                        <div>
                          <label htmlFor="emergencyContact" className="block text-sm font-semibold text-[#080A0C] mb-2">
                            Emergency Contact <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            id="emergencyContact"
                            name="emergency_contact"
                            required
                            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#0f3a70] focus:border-[#0f3a70] transition-all duration-200"
                            style={{ borderColor: `${NAVY}25` }}
                            placeholder="Name and phone number"
                          />
                        </div>
                      </>
                    )}

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={!isFormValid || isSubmitting}
                        className="w-full bg-[#0f3a70] hover:bg-[#0a2d52] text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 text-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 disabled:hover:translate-y-0 disabled:hover:bg-[#0f3a70] shadow-lg"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Registration"}
                      </button>
                    </div>

                    <p className="text-sm text-[#0D2B45]/70 text-center">
                      <span className="text-red-500">*</span> Required fields.
                    </p>
                  </form>
                </div>
              </Reveal>
            </>
          ) : (
            <div className="text-center mb-12">
              <div
                className="rounded-2xl p-8 max-w-2xl mx-auto"
                style={{
                  background: "rgba(255,255,255,0.8)",
                  border: `1px solid ${NAVY}15`,
                }}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${NAVY}15` }}>
                  <Calendar className="h-8 w-8" style={{ color: NAVY }} />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Registration Coming Soon</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Registration for the Men&apos;s Fellowship Trip will open soon. Please check back for updates.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 text-white font-semibold rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: NAVY }}
                >
                  Contact Us for More Info
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative" style={{ backgroundColor: CREAM }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#0f3a70]/[0.02] to-transparent" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold text-[#080A0C] mb-6">Questions About the Trip?</h2>
          <p className="text-lg text-[#0D2B45]/90 mb-8">
            For more information, please see Nana Eyin or Bra Moses. More details will be provided in the coming weeks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              style={{ backgroundColor: NAVY, boxShadow: `0 4px 14px ${NAVY}40` }}
            >
              Contact Us
            </a>
            <a
              href="tel:404-210-1136"
              className="inline-flex items-center justify-center px-8 py-4 font-semibold rounded-xl transition-colors duration-200 border-2"
              style={{ borderColor: NAVY, color: NAVY }}
            >
              Call: 404-210-1136
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
