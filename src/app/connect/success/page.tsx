import Link from "next/link";
import { CheckCircle2, Heart, Home } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You | Great Redemption Ministries",
};

const MESSAGES: Record<
  string,
  { title: string; message: string; accent: string; iconBg: string }
> = {
  visitor: {
    title: "Welcome to the family!",
    message:
      "Thanks for submitting your contact info! Someone from our welcome team will reach out to you soon. We're so glad you visited us.",
    accent: "text-[#1B5299]",
    iconBg: "bg-[#1B5299]",
  },
  prayer: {
    title: "Your request has been received",
    message:
      "Our prayer team will be lifting you up in prayer. Remember — nothing you share with God is ever too small or too big. You are loved.",
    accent: "text-[#6b4fa3]",
    iconBg: "bg-[#6b4fa3]",
  },
  experience: {
    title: "Thank you for your feedback!",
    message:
      "Your response helps us serve our church family and guests better. We appreciate you taking the time to share your experience with us.",
    accent: "text-[#0f766e]",
    iconBg: "bg-[#0f766e]",
  },
  default: {
    title: "Thank you!",
    message: "Your submission has been received. We appreciate you reaching out.",
    accent: "text-[#1B5299]",
    iconBg: "bg-[#1B5299]",
  },
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const config = MESSAGES[type || "default"] || MESSAGES.default;

  return (
    <div className="bg-white min-h-screen">
      <section className="relative pt-0 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#F4F7FB] via-white to-white min-h-screen flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-[#1B5299]/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] bg-[#86BEE2]/15 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-2xl mx-auto relative z-10 pt-16 pb-12 text-center">
          <div
            className={`inline-flex items-center justify-center w-20 h-20 ${config.iconBg} rounded-full mb-6 shadow-xl animate-fade-in-up`}
          >
            <CheckCircle2 className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#0D2B45] mb-4 leading-tight animate-fade-in-up">
            {config.title}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto mb-10 animate-fade-in-up-delay">
            {config.message}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in-up-delay">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1B5299] text-white font-semibold rounded-xl hover:bg-[#154a87] transition-colors shadow-lg hover:shadow-xl"
            >
              <Home className="h-5 w-5" />
              Back to Home
            </Link>
            <Link
              href="/connect"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#1B5299] font-semibold rounded-xl hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl border-2 border-[#1B5299]"
            >
              <Heart className="h-5 w-5" />
              Back to Connect
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
