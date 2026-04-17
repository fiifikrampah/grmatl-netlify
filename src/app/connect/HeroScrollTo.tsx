"use client";

import { ChevronDown } from "lucide-react";
import { useEffect } from "react";

/**
 * A clickable scroll hint that smoothly scrolls the user to the section
 * identified by `targetId`, using a custom eased animation (cubic-out).
 * Also installs a light parallax + fade on the hero image as the user scrolls.
 */
export default function HeroScrollTo({ targetId }: { targetId: string }) {
  // Parallax: nudge the hero image up and slightly fade as user scrolls.
  useEffect(() => {
    const img = document.querySelector<HTMLElement>(
      `[data-hero-parallax="true"]`
    );
    if (!img) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = Math.min(window.scrollY, 600);
        const translate = y * 0.25; // gentle drift
        const opacity = 1 - Math.min(y / 700, 0.4);
        img.style.transform = `translate3d(0, -${translate}px, 0) scale(1.02)`;
        img.style.opacity = String(opacity);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const handleClick = () => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const start = window.scrollY;
    const end = target.getBoundingClientRect().top + start;
    const distance = end - start;
    const duration = 1100;
    const startTime = performance.now();

    // easeInOutCubic — smooth acceleration + deceleration
    const ease = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      window.scrollTo(0, start + distance * ease(t));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroll to next section"
      className="group flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors"
    >
      <span className="text-[11px] uppercase tracking-[0.2em] opacity-0 sm:opacity-100 transition-opacity">
        Scroll
      </span>
      <ChevronDown
        className="h-5 w-5 animate-bounce group-hover:animate-none"
        strokeWidth={1.5}
      />
    </button>
  );
}
