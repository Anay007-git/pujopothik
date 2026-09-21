"use client";

import React from "react";

interface AlpanaDividerProps {
  className?: string;
  variant?: "light" | "dark" | "gold" | "red";
}

export default function AlpanaDivider({
  className = "",
  variant = "red",
}: AlpanaDividerProps) {
  let strokeColor = "#9b1b1b";
  if (variant === "light") strokeColor = "rgba(250, 247, 238, 0.7)";
  if (variant === "dark") strokeColor = "rgba(18, 18, 21, 0.4)";
  if (variant === "gold") strokeColor = "#d4af37";

  return (
    <div className={`flex items-center justify-center my-6 overflow-hidden ${className}`}>
      <div
        className="h-[1px] flex-1 max-w-[120px] sm:max-w-[200px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${strokeColor})`,
        }}
      />
      <svg
        width="160"
        height="32"
        viewBox="0 0 160 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-3 alpana-svg-draw flex-shrink-0"
      >
        {/* Center Lotus Motif */}
        <path
          d="M80 6C74 12 70 20 80 26C90 20 86 12 80 6Z"
          stroke={strokeColor}
          strokeWidth="1.5"
          fill="none"
        />
        {/* Center Petal Accents */}
        <path
          d="M80 12C78 16 77 21 80 24C83 21 82 16 80 12Z"
          fill={strokeColor}
          fillOpacity="0.4"
        />
        {/* Left Paisley Wing */}
        <path
          d="M72 18C64 12 56 16 48 20C40 24 32 20 25 16C20 13 14 15 10 16"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="56" cy="16" r="2.5" fill={strokeColor} />
        <circle cx="40" cy="22" r="2" fill={strokeColor} />
        <circle cx="25" cy="16" r="1.5" fill={strokeColor} />

        {/* Right Paisley Wing */}
        <path
          d="M88 18C96 12 104 16 112 20C120 24 128 20 135 16C140 13 146 15 150 16"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="104" cy="16" r="2.5" fill={strokeColor} />
        <circle cx="120" cy="22" r="2" fill={strokeColor} />
        <circle cx="135" cy="16" r="1.5" fill={strokeColor} />
      </svg>
      <div
        className="h-[1px] flex-1 max-w-[120px] sm:max-w-[200px]"
        style={{
          background: `linear-gradient(90deg, ${strokeColor}, transparent)`,
        }}
      />
    </div>
  );
}

