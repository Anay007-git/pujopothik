"use client";

import React from "react";

interface DurgaEyeIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export default function DurgaEyeIcon({
  className = "",
  size = 32,
  color = "#9b1b1b",
}: DurgaEyeIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Durga Eye Icon"
    >
      {/* Outer Eye Contour with Traditional Almond Wing */}
      <path
        d="M5 30C18 10 40 4 50 4C60 4 82 10 95 30C82 50 60 56 50 56C40 56 18 50 5 30Z"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Upper Eyelid Grace Line */}
      <path
        d="M2 30C15 8 38 1 50 1C62 1 85 8 98 30"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Pupil Iris Outer */}
      <circle cx="50" cy="30" r="14" fill={color} />
      {/* Pupil Iris Center Shimmer */}
      <circle cx="48" cy="27" r="4.5" fill="#faf7ee" />
      <circle cx="53" cy="33" r="2" fill="#d4af37" />
      {/* Third Eye Bindi Symbol above */}
      <path
        d="M50 -12C46 -5 46 0 50 4C54 0 54 -5 50 -12Z"
        fill={color}
      />
    </svg>
  );
}

