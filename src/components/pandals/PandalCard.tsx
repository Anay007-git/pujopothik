"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Pandal } from "@/data/pandalsData";
import { useLanguage } from "@/context/LanguageContext";
import { useRoute } from "@/context/RouteContext";
import {
  MapPin,
  Train,
  Clock,
  Sparkles,
  Plus,
  Check,
  Navigation,
  Eye,
  Flame,
  ChevronDown,
  ChevronUp,
  Utensils,
  AlertCircle,
  Award,
  Bus,
} from "lucide-react";

interface PandalCardProps {
  pandal: Pandal;
  onViewDetails: (pandal: Pandal) => void;
}

export default function PandalCard({ pandal, onViewDetails }: PandalCardProps) {
  const { language, t } = useLanguage();
  const { addToRoute, removeFromRoute, isInRoute } = useRoute();
  const [isExpanded, setIsExpanded] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const inRoute = isInRoute(pandal.id);

  // Category labels and colors
  const categoryConfig = {
    must_visit: {
      label: language === "bn" ? "অবশ্য দর্শনীয়" : "MUST VISIT",
      bg: "bg-[#9b1b1b] text-white",
    },
    theme: {
      label: language === "bn" ? "থিম মণ্ডপ" : "THEME ART",
      bg: "bg-[#d4af37] text-stone-900 font-bold",
    },
    traditional: {
      label: language === "bn" ? "সাবেকি প্রতিমা" : "TRADITIONAL",
      bg: "bg-[#faf7ee] text-[#9b1b1b] border border-[#9b1b1b]/40 font-semibold",
    },
    heritage: {
      label: language === "bn" ? "বনেদি ঐতিহ্য" : "HERITAGE",
      bg: "bg-stone-900 text-[#d4af37] font-semibold",
    },
  };

  // Crowd level colors
  const crowdColor = {
    Low: "bg-emerald-500",
    Moderate: "bg-amber-500",
    High: "bg-orange-500",
    "Very High": "bg-red-600",
  }[pandal.crowdLevel];

  const crowdText = {
    Low: t.crowdLow,
    Moderate: t.crowdModerate,
    High: t.crowdHigh,
    "Very High": t.crowdVeryHigh,
  }[pandal.crowdLevel];

  return (
    <article className="festive-card rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col h-full bg-[#faf7ee] border border-[#c05621]/20 shadow-md hover:shadow-xl transition-all duration-300 group">
      {/* 1. Image Container with Badges */}
      <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-stone-900">
        {/* Shimmer skeleton before image loads */}
        {!imgLoaded && (
          <div className="absolute inset-0 bg-stone-700/60 animate-pulse before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.8s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent z-0" />
        )}
        <Image
          src={pandal.images[0] || "/images/durga-puja-kolkata-main.jpg"}
          alt={pandal.name}
          fill
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover group-hover:scale-105 transition-all duration-500 z-[1] ${
            imgLoaded ? "opacity-90 group-hover:opacity-100" : "opacity-0 scale-95"
          }`}
        />
        {/* Subtle Scrim Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-[2]" />

        {/* Top Badges (Category + Zone) */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span
            className={`text-[10px] tracking-wider uppercase font-bold px-2.5 py-1 rounded-full shadow-md ${
              categoryConfig[pandal.category].bg
            }`}
          >
            {categoryConfig[pandal.category].label}
          </span>
          <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-black/60 backdrop-blur-md text-stone-200 border border-white/10 shadow">
            {pandal.zone}
          </span>
        </div>

        {/* Top Right Crowd Indicator Badge */}
        <div className="absolute top-3 right-3 z-10 flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-white text-[10px] font-medium shadow">
          <span className={`w-2 h-2 rounded-full ${crowdColor} animate-pulse`} />
          <span className="font-semibold">{crowdText}</span>
        </div>

        {/* Bottom Theme Highlight Banner on Image */}
        <div className="absolute bottom-3 left-3 right-3 z-10">
          <div className="flex items-center space-x-1.5 text-[#d4af37] text-xs sm:text-sm font-bold drop-shadow-md">
            <Sparkles className="w-3.5 h-3.5 flex-shrink-0 text-[#d4af37]" />
            <span className="truncate">
              {language === "bn" ? `থিম: ${pandal.bengaliTheme}` : `Theme: ${pandal.theme}`}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title Header */}
          <div className="mb-2.5">
            <h3 className="font-bengali-title text-lg sm:text-xl font-bold text-stone-900 group-hover:text-[#9b1b1b] transition-colors leading-snug">
              {language === "bn" ? pandal.bengaliName : pandal.name}
            </h3>
            <p className="text-xs text-stone-500 font-medium mt-0.5">
              {language === "bn" ? pandal.name : pandal.bengaliName}
            </p>
          </div>

          {/* Area & Neighborhood with MapPin */}
          <div className="flex items-center text-xs text-stone-600 mb-3">
            <MapPin className="w-3.5 h-3.5 mr-1 text-[#c05621] flex-shrink-0" />
            <span className="font-semibold text-stone-700">{pandal.area}</span>
            <span className="mx-1.5 text-stone-300">•</span>
            <span className="text-stone-500 text-[11px] truncate">{pandal.address}</span>
          </div>

          {/* Theme Description */}
          <p className="text-xs text-stone-700 leading-relaxed mb-3">
            {pandal.themeDescription}
          </p>

          {/* Transit Quick Pill */}
          <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-stone-800 mb-3">
            <div className="flex items-center space-x-1.5 min-w-0">
              <Train className="w-3.5 h-3.5 text-blue-700 flex-shrink-0" />
              <span className="font-semibold truncate">
                {language === "bn"
                  ? pandal.nearestMetro.bengaliStation
                  : pandal.nearestMetro.station}{" "}
                Metro
              </span>
            </div>
            <div className="flex items-center space-x-1 text-stone-600 text-[11px] font-medium flex-shrink-0 ml-2">
              <Clock className="w-3 h-3 text-[#c05621]" />
              <span>{pandal.nearestMetro.walkMinutes} min walk</span>
            </div>
          </div>

          {/* Best Visiting Hours Pill */}
          <div className="flex items-center space-x-1.5 text-[11px] text-stone-600 mb-3 px-2.5 py-1.5 rounded-lg bg-white border border-stone-200">
            <Flame className="w-3 h-3 text-amber-600 flex-shrink-0" />
            <span className="font-bold text-stone-800">
              {language === "bn" ? "সেরা সময়:" : "Best Time:"}
            </span>
            <span className="truncate text-stone-700 font-medium">
              {pandal.bestTime}
            </span>
          </div>

          {/* 3. Deep Detailed Intel Accordion */}
          {isExpanded && (
            <div className="mt-3 pt-3 border-t border-stone-200 space-y-3 animate-fadeIn text-xs">
              {/* Theme Meaning Context */}
              {pandal.themeMeaning && (
                <div className="p-2.5 rounded-xl bg-white border border-stone-200">
                  <div className="font-bold text-stone-900 mb-1 flex items-center space-x-1 text-[11px]">
                    <Sparkles className="w-3 h-3 text-[#d4af37]" />
                    <span>{language === "bn" ? "থিম ভাবনা ও দর্শন:" : "Theme Philosophy:"}</span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-relaxed">
                    {pandal.themeMeaning}
                  </p>
                </div>
              )}

              {/* Why Visit Highlights */}
              {pandal.whyVisit && pandal.whyVisit.length > 0 && (
                <div className="p-2.5 rounded-xl bg-white border border-stone-200">
                  <div className="font-bold text-[#9b1b1b] mb-1.5 flex items-center space-x-1 text-[11px]">
                    <Award className="w-3 h-3 text-[#9b1b1b]" />
                    <span>{language === "bn" ? "কেন অবশ্যই যাবেন (সেরা আকর্ষণ):" : "Why Visit (Key Highlights):"}</span>
                  </div>
                  <ul className="space-y-1">
                    {pandal.whyVisit.map((reason, idx) => (
                      <li key={idx} className="flex items-start space-x-1.5 text-[11px] text-stone-700">
                        <span className="text-[#d4af37] font-bold">•</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Transit & Gate Information */}
              <div className="p-2.5 rounded-xl bg-white border border-stone-200 space-y-1 text-[11px]">
                <div className="font-bold text-blue-900 mb-1 flex items-center space-x-1">
                  <Train className="w-3 h-3 text-blue-700" />
                  <span>{language === "bn" ? "মেট্রো ও ট্র্যাফিক গাইড:" : "Metro & Transit Details:"}</span>
                </div>
                {pandal.nearestMetro.exitGate && (
                  <p className="text-stone-700">
                    <span className="font-semibold text-stone-900">Exit Gate:</span> {pandal.nearestMetro.exitGate}
                  </p>
                )}
                <p className="text-stone-600">
                  <span className="font-semibold text-stone-900">Bus Stop:</span> {pandal.busInfo}
                </p>
              </div>

              {/* Curated Food Nearby */}
              {pandal.foodNearby && pandal.foodNearby.length > 0 && (
                <div className="p-2.5 rounded-xl bg-orange-50/70 border border-orange-200">
                  <div className="font-bold text-orange-950 mb-1 flex items-center space-x-1 text-[11px]">
                    <Utensils className="w-3 h-3 text-orange-600" />
                    <span>{language === "bn" ? "কাছের বিখ্যাত খাওয়া-দাওয়া:" : "Iconic Food Nearby:"}</span>
                  </div>
                  <div className="space-y-1">
                    {pandal.foodNearby.map((f, idx) => (
                      <div key={idx} className="flex items-center justify-between text-[11px] text-stone-700">
                        <span className="font-semibold text-stone-900">{f.name}</span>
                        <span className="text-stone-500">{f.item} ({f.distance})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Crowd Advisory Note */}
              {pandal.expectedCrowdNote && (
                <div className="p-2.5 rounded-xl bg-red-50/60 border border-red-200 text-[11px] text-red-950 flex items-start space-x-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>{pandal.expectedCrowdNote}</span>
                </div>
              )}
            </div>
          )}

          {/* Toggle Expand Details Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full mt-2 py-1.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-bold flex items-center justify-center space-x-1 transition-colors"
          >
            <span>
              {isExpanded
                ? language === "bn"
                  ? "সংক্ষেপ করুন ▲"
                  : "Show Less ▲"
                : language === "bn"
                ? "পুঙ্খানুপুঙ্খ তথ্য ও খাদ্যতালিকা দেখুন ▼"
                : "Show Deep Details & Food ▼"}
            </span>
          </button>
        </div>

        {/* 4. Action Buttons Footer */}
        <div className="grid grid-cols-2 gap-2 pt-3 mt-3 border-t border-stone-200">
          <button
            onClick={() => onViewDetails(pandal)}
            className="flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl border border-stone-300 hover:border-[#9b1b1b] hover:bg-[#9b1b1b]/5 text-xs font-bold text-stone-800 transition-colors active:scale-95"
          >
            <Eye className="w-3.5 h-3.5 text-[#9b1b1b]" />
            <span>{t.viewDetails}</span>
          </button>

          <button
            onClick={() => (inRoute ? removeFromRoute(pandal.id) : addToRoute(pandal))}
            className={`flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 ${
              inRoute
                ? "bg-emerald-700 text-white hover:bg-emerald-800"
                : "bg-[#9b1b1b] text-white hover:bg-[#771d1d]"
            }`}
          >
            {inRoute ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>{t.inRoute}</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>{t.addToRoute}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
