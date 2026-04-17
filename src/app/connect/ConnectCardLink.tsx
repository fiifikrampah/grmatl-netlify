"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { WebHaptics } from "web-haptics";

type Props = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

export default function ConnectCardLink({ href, className, children }: Props) {
  const hapticsRef = useRef<WebHaptics | null>(null);
  const [tapped, setTapped] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTap = () => {
    if (!hapticsRef.current) {
      hapticsRef.current = new WebHaptics();
    }
    hapticsRef.current.trigger();

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
