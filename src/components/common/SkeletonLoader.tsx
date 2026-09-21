"use client";

import React from "react";

// Base Shimmer Effect Class
const shimmerClass =
  "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.8s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent";

export function PandalCardSkeleton() {
  return (
    <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-[#faf7ee] border border-stone-200/80 shadow-sm flex flex-col h-full animate-pulse">
      {/* Image Skeleton */}
      <div className={`relative h-52 sm:h-60 w-full bg-stone-300/80 ${shimmerClass}`}>
        <div className="absolute top-3 left-3 flex gap-1.5">
          <div className="w-16 h-5 bg-stone-400/60 rounded-full" />
          <div className="w-20 h-5 bg-stone-400/50 rounded-full" />
        </div>
        <div className="absolute top-3 right-3 w-16 h-5 bg-stone-400/60 rounded-full" />
        <div className="absolute bottom-3 left-3 right-3 h-5 bg-stone-400/40 rounded-lg w-2/3" />
      </div>

      {/* Content Skeleton */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Title & Subtitle */}
          <div className={`h-6 bg-stone-300 rounded-md w-3/4 mb-2 ${shimmerClass}`} />
          <div className={`h-4 bg-stone-200 rounded-md w-1/2 mb-3 ${shimmerClass}`} />

          {/* Area Pin */}
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-3.5 h-3.5 rounded-full bg-stone-300" />
            <div className={`h-3.5 bg-stone-200 rounded w-1/3 ${shimmerClass}`} />
          </div>

          {/* Description Lines */}
          <div className="space-y-1.5 mb-3">
            <div className={`h-3 bg-stone-200 rounded w-full ${shimmerClass}`} />
            <div className={`h-3 bg-stone-200 rounded w-4/5 ${shimmerClass}`} />
          </div>

          {/* Transit Pill */}
          <div className={`h-10 bg-amber-50/80 border border-amber-200/50 rounded-xl mb-3 ${shimmerClass}`} />
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-stone-200">
          <div className="h-9 bg-stone-200 rounded-xl" />
          <div className="h-9 bg-[#9b1b1b]/30 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function SectionSkeleton({
  count = 3,
  hasHeader = true,
}: {
  count?: number;
  hasHeader?: boolean;
}) {
  return (
    <div className="w-full py-8">
      {hasHeader && (
        <div className="flex flex-col items-center text-center max-w-xl mx-auto mb-8 animate-pulse">
          <div className="w-24 h-4 bg-stone-200 rounded-full mb-2" />
          <div className="w-64 sm:w-80 h-8 bg-stone-300 rounded-lg mb-2" />
          <div className="w-48 sm:w-60 h-4 bg-stone-200 rounded" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
        {Array.from({ length: count }).map((_, idx) => (
          <PandalCardSkeleton key={idx} />
        ))}
      </div>
    </div>
  );
}

export function MapSkeleton() {
  return (
    <div className="relative w-full h-[550px] sm:h-[650px] rounded-3xl overflow-hidden bg-stone-900 border border-stone-800 shadow-2xl flex items-center justify-center animate-pulse">
      {/* Pulsing Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
      <div className="relative z-10 flex flex-col items-center text-center p-6 space-y-3">
        <div className="w-14 h-14 rounded-full bg-[#9b1b1b]/20 border border-[#d4af37]/40 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-[#d4af37] animate-ping opacity-75" />
        </div>
        <span className="font-bengali-title text-base text-stone-200 font-semibold">
          কলকাতার ইন্টারেক্টিভ মানচিত্র প্রস্তুত হচ্ছে…
        </span>
        <span className="text-xs text-stone-400">
          Loading OpenStreetMap Leaflet layers & live GPS markers…
        </span>
      </div>
    </div>
  );
}

