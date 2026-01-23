import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Heart to Heart Prayer Breakfast | Great Redemption Ministries",
  description: "Join us for a special morning of prayer, fellowship, and breakfast on Valentine's Day at Great Redemption Ministries.",
  keywords: "Prayer Breakfast, Valentine's Day, Prayer, Fellowship, Breakfast, Great Redemption Ministries, Hapeville",
};

export default function HeartToHeartPrayerBreakfastLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
