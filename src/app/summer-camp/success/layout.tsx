import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registration Successful | Summer Camp | Great Redemption Ministries",
  description: "Your summer camp registration has been submitted successfully. Thank you for registering!",
  keywords: "Summer Camp Registration Success, Youth Camp, Children's Camp, Great Redemption Ministries",
};

export default function SummerCampSuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
