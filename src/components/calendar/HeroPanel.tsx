"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import type { CalendarTheme } from "@/types";
import { MONTH_NAMES } from "@/lib/constants";

interface HeroPanelProps {
  theme: CalendarTheme;
  month: number;
  year: number;
  onThemeChange: (theme: CalendarTheme) => void;
  allThemes: CalendarTheme[];
}

export function HeroPanel({ theme, month, year, onThemeChange, allThemes }: HeroPanelProps) {
  const [imgSrc, setImgSrc] = useState(theme.images[month]);
  const [fadeKey, setFadeKey] = useState(0);

  useEffect(() => {
    setFadeKey((k) => k + 1);
    setImgSrc(theme.images[month]);
  }, [theme, month]);

  return (
    <div className="relative overflow-hidden bg-gray-900" style={{ minHeight: 260 }}>
      {/* Hero image */}
      <div
        key={fadeKey}
        className="absolute inset-0 animate-fade-in"
        style={{ animationDuration: "0.5s" }}
      >
        <Image
          src={imgSrc}
          alt={`${MONTH_NAMES[month]} ${year}`}
          fill
          className="object-cover"
          priority
          onError={() => setImgSrc(theme.images[0])}
          sizes="(max-width: 768px) 100vw, 380px"
        />
      </div>

      {/* Diagonal chevron overlay — matches reference image */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full"
        style={{ height: 90 }}
        viewBox="0 0 600 90"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        {/* Lighter, larger chevron behind */}
        <polygon
          points="0,90 0,38 180,90"
          fill={theme.chevronSecondary}
          opacity="0.75"
        />
        {/* Primary chevron — larger, covers more */}
        <polygon
          points="0,90 0,18 310,90"
          fill={theme.chevronPrimary}
        />
        {/* Right fill block so the right side is clean white */}
        <rect x="310" y="0" width="290" height="90" fill="white" opacity="0.0" />
      </svg>

      {/* Month + Year badge */}
      <div className="absolute bottom-4 right-5 text-right z-10 pointer-events-none">
        <div
          className="font-mono text-xs tracking-[0.25em] mb-0.5"
          style={{ color: "rgba(255,255,255,0.85)", fontWeight: 300 }}
        >
          {year}
        </div>
        <div
          className="font-display text-4xl leading-none tracking-wide text-white"
          style={{ fontWeight: 900, textShadow: "0 2px 16px rgba(0,0,0,0.35)" }}
        >
          {MONTH_NAMES[month].toUpperCase()}
        </div>
      </div>

      {/* Theme picker dots */}
      <div className="absolute top-3 right-3 flex gap-[5px] z-20">
        {allThemes.map((t) => (
          <button
            key={t.id}
            title={`Switch to ${t.name} theme`}
            onClick={() => onThemeChange(t)}
            className="rounded-full transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-white/60"
            style={{
              width: 12,
              height: 12,
              background: t.accent,
              border: t.id === theme.id ? "2.5px solid white" : "2px solid rgba(255,255,255,0.5)",
              transform: t.id === theme.id ? "scale(1.25)" : "scale(1)",
            }}
            aria-label={`${t.name} theme`}
          />
        ))}
      </div>
    </div>
  );
}
