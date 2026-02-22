import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Founder's Day Celebration | Great Redemption Ministries",
  description: "Join us as we remember and celebrate the life and legacy of our late Head Pastor and Founder, Pastor Andrews Frimpong. March 8, 2026 at 12 Noon.",
  keywords: "Founder's Day, Pastor Andrews Frimpong, Great Redemption Ministries, Celebration, Legacy, Hapeville",
};

export default function FoundersDayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
