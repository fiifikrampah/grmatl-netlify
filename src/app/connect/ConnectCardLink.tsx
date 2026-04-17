"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useWebHaptics } from "web-haptics/react";

type Props = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

export default function ConnectCardLink({ href, className, children }: Props) {
  const { trigger } = useWebHaptics();
  const [tapped, setTapped] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTap = () => {
    // Fire the native vibrate directly and synchronously so it's queued with
    // the OS before Next.js starts the navigation teardown. Longer patterns
    // (like "nudge") get cancelled by the page transition on mobile.
    if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
      navigator.vibrate(30);
    }
    // Also call the library so it respects the user's haptics toggle if enabled.
    trigger(30);

    setTapped(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setTapped(false), 450);
  };

  return (
    <Link
      href={href}
      className={className}
      onPointerDown={handleTap}
      data-tapped={tapped ? "true" : "false"}
    >
      {children}
    </Link>
  );
}
