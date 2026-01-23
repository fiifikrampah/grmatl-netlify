import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Youth & Children's Summer Camp | Great Redemption Ministries",
  description: "Join us at the Youth & Children's Summer Camp! Fun activities, meaningful experiences, and spiritual growth.",
  keywords: "Summer Camp, Youth Camp, Children's Camp, Church Camp, Atlanta, Great Redemption Ministries",
};

export default function SummerCampLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
