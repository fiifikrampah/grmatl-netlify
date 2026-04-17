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
  const firedRef = useRef(false);

  const fireHaptic = () => {
    // Debounce so touchstart + click don't both fire on the same tap.
    if (firedRef.current) return;
    firedRef.current = true;
    setTimeout(() => {
      firedRef.current = false;
    }, 300);

    // Call navigator.vibrate directly and synchronously so the OS gets the
    // request while user activation is still fresh.
    if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
      navigator.vibrate(30);
    }
    trigger(30);

    setTapped(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setTapped(false), 450);
  };

  return (
    <Link
      href={href}
      className={className}
      onClick={fireHaptic}
      onTouchStart={fireHaptic}
      data-tapped={tapped ? "true" : "false"}
    >
      {children}
    </Link>
  );
}
