"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useRoute, TransportMode } from "@/context/RouteContext";
import PrebuiltRoutes from "@/components/route-builder/PrebuiltRoutes";
import AiRouteDetector from "@/components/route-builder/AiRouteDetector";
import LeafletRouteMap from "@/components/map/LeafletRouteMap";
import AlpanaDivider from "@/components/animations/AlpanaDivider";
import {
  Route as RouteIcon,
  Navigation,
  Train,
  Bus,
  Car,
  Footprints,
  Clock,
  Trash2,
  ChevronUp,
  ChevronDown,
  Compass,
  ExternalLink,
  MapPin,
  Sparkles,
  Sliders,
  Layers,
} from "lucide-react";

export default function RoutesPage() {
  const { language, t } = useLanguage();
  const {
    routePandals,
    removeFromRoute,
    clearRoute,
    movePandal,
    transportMode,
    setTransportMode,
    totalDistanceKm,
    totalWalkKm,
    totalEstimatedMinutes,
    googleMapsUrl,
  } = useRoute();

  const [activeView, setActiveView] = useState<"ai_detector" | "custom_builder" | "prebuilt">("ai_detector");

  const modes: Array<{ key: TransportMode; label: string; icon: React.ElementType }> = [
    { key: "METRO", label: "Metro", icon: Train },
    { key: "WALK", label: "Walk", icon: Footprints },
    { key: "CAR", label: "Car/Cab", icon: Car },
    { key: "BUS", label: "Bus", icon: Bus },
  ];

  const formatMinutes = (mins: number) => {
    const hours = Math.floor(mins / 60);
    const m = mins % 60;
    if (hours === 0) return `${m} mins`;
    return `${hours}h ${m}m`;
  };

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#9b1b1b] mb-1">
          <RouteIcon className="w-4 h-4 text-[#c05621]" />
          <span>{language === "bn" ? "কলকাতা দুর্গাপূজা রুট প্ল্যানার" : "Kolkata Pujo Route Navigator"}</span>
        </div>
        <h1 className="font-bengali-title text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
          {t.routeBuilderTitle}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 mt-2 font-medium">
          “{t.routeBuilderSubtitle}”
        </p>
        <AlpanaDivider variant="red" className="my-5 max-w-sm" />

        {/* View Switcher Segmented Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 p-1.5 rounded-2xl bg-[#faf7ee] border border-[#c05621]/20 max-w-xl mx-auto shadow-sm">
          <button
            onClick={() => setActiveView("ai_detector")}
            className={`flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeView === "ai_detector"
                ? "bg-[#9b1b1b] text-white shadow-md border border-[#d4af37]/40"
                : "text-stone-700 hover:text-[#9b1b1b]"
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <span className="whitespace-nowrap">
              {language === "bn" ? "এআই রুট ডিটেক্টর" : "AI Route Detector"}
            </span>
          </button>

          <button
            onClick={() => setActiveView("custom_builder")}
            className={`flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all relative ${
              activeView === "custom_builder"
                ? "bg-[#9b1b1b] text-white shadow-md border border-[#d4af37]/40"
                : "text-stone-700 hover:text-[#9b1b1b]"
            }`}
          >
            <Layers className="w-4 h-4 text-[#d4af37]" />
            <span className="whitespace-nowrap">
              {language === "bn" ? "আমার কাস্টম রুট" : "Custom Planner"}
            </span>
            {routePandals.length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-[#d4af37] text-stone-900 text-[10px] font-black">
                {routePandals.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveView("prebuilt")}
            className={`flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeView === "prebuilt"
                ? "bg-[#9b1b1b] text-white shadow-md border border-[#d4af37]/40"
                : "text-stone-700 hover:text-[#9b1b1b]"
            }`}
          >
            <Compass className="w-4 h-4 text-[#d4af37]" />
            <span className="whitespace-nowrap">
              {language === "bn" ? "জনপ্রিয় সার্কিট" : "Curated Routes"}
            </span>
          </button>
        </div>
      </div>

      {/* VIEW 1: AI Route Detector */}
      {activeView === "ai_detector" && (
        <div className="animate-fadeIn">
          <AiRouteDetector />
        </div>
      )}

      {/* VIEW 2: Custom Itinerary Builder */}
      {activeView === "custom_builder" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 animate-fadeIn">
          {/* Left Column: Itinerary Stops List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#faf7ee] border border-[#c05621]/20">
              <div>
                <h3 className="font-bengali-title text-xl font-bold text-stone-900">
                  {language === "bn" ? "আপনার নির্বাচিত মণ্ডপক্রম" : "Your Custom Stop Order"}
                </h3>
                <p className="text-xs text-stone-500">
                  {routePandals.length} {language === "bn" ? "টি মণ্ডপ যুক্ত করা হয়েছে" : "stops planned"}
                </p>
              </div>

              {routePandals.length > 0 && (
                <button
                  onClick={clearRoute}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-xl border border-red-200 text-xs font-semibold text-red-700 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{t.clearRoute}</span>
                </button>
              )}
            </div>

            {routePandals.length === 0 ? (
              <div className="text-center py-20 bg-white/70 rounded-3xl border border-stone-200 p-6">
                <Compass className="w-12 h-12 text-[#c05621]/40 mx-auto mb-3" />
                <h4 className="font-bengali-title text-lg font-bold text-stone-800 mb-1">
                  {t.emptyRouteMessage}
                </h4>
                <p className="text-xs text-stone-500 max-w-md mx-auto mb-4">
                  {language === "bn"
                    ? "প্যান্ডেল ডিরেক্টরি থেকে পছন্দসই মণ্ডপ যোগ করুন অথবা এআই রুট ডিটেক্টর দিয়ে সরাসরি রুট তৈরি করুন।"
                    : "Browse the directory or use the AI Route Detector to instantly generate a full itinerary."}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => setActiveView("ai_detector")}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#9b1b1b] text-white text-xs font-bold shadow-md hover:bg-[#771d1d]"
                  >
                    <Sparkles className="w-4 h-4 text-[#d4af37]" />
                    <span>{language === "bn" ? "এআই রুট তৈরি করুন" : "Use AI Route Detector"}</span>
                  </button>

                  <Link
                    href="/pandals"
                    className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-700 text-xs font-bold shadow-sm hover:bg-stone-50"
                  >
                    <span>{t.explorePandals}</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Live Custom Leaflet Route Map */}
                <LeafletRouteMap
                  stops={routePandals.map((p, idx) => ({
                    pandal: p,
                    sequence: idx + 1,
                  }))}
                  height="h-[300px] sm:h-[360px]"
                />

                {routePandals.map((pandal, idx) => (
                  <div
                    key={pandal.id}
                    className="p-4 sm:p-5 rounded-3xl bg-white border border-[#c05621]/20 shadow-md flex items-center justify-between gap-3 group hover:border-[#9b1b1b]/50 transition-all"
                  >
                    <div className="flex items-center space-x-3.5 min-w-0">
                      <span className="w-8 h-8 rounded-2xl bg-[#9b1b1b] text-white text-sm font-bold flex items-center justify-center flex-shrink-0 shadow">
                        {idx + 1}
                      </span>
                      <div className="truncate">
                        <h4 className="font-bengali-title text-base sm:text-lg font-bold text-stone-900 truncate">
                          {language === "bn" ? pandal.bengaliName : pandal.name}
                        </h4>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mt-0.5">
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 text-[#c05621] mr-1" />
                            {pandal.area}
                          </span>
                          <span>•</span>
                          <span className="flex items-center">
                            <Train className="w-3 h-3 text-blue-600 mr-1" />
                            {pandal.nearestMetro.station}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1.5 flex-shrink-0">
                      <button
                        onClick={() => movePandal(idx, idx - 1)}
                        disabled={idx === 0}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800 disabled:opacity-30 transition-colors"
                        title="Move Up"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => movePandal(idx, idx + 1)}
                        disabled={idx === routePandals.length - 1}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800 disabled:opacity-30 transition-colors"
                        title="Move Down"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => removeFromRoute(pandal.id)}
                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors ml-1"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Route Statistics & Actions Card */}
          <div className="lg:col-span-4">
            <div className="festive-card rounded-3xl p-6 border border-[#c05621]/20 shadow-xl space-y-6 sticky top-24 bg-white">
              <h3 className="font-bengali-title text-xl font-bold text-stone-900 pb-3 border-b border-stone-200">
                {language === "bn" ? "পরিক্রমা পরিসংখ্যান" : "Route Insights"}
              </h3>

              {/* Transport Mode Toggle */}
              <div>
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-2">
                  {language === "bn" ? "যাতায়াত মাধ্যম" : "Transport Mode"}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {modes.map((m) => {
                    const Icon = m.icon;
                    const isActive = transportMode === m.key;

                    return (
                      <button
                        key={m.key}
                        onClick={() => setTransportMode(m.key)}
                        className={`flex items-center space-x-1.5 p-2.5 rounded-xl text-xs font-semibold transition-all ${
                          isActive
                            ? "bg-[#9b1b1b] text-white shadow"
                            : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{m.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Stat Cards */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#faf7ee] border border-stone-200 text-xs">
                  <span className="text-stone-500 font-medium">{t.totalPandals}</span>
                  <span className="font-bold text-stone-900">{routePandals.length}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#faf7ee] border border-stone-200 text-xs">
                  <span className="text-stone-500 font-medium">{t.estimatedDistance}</span>
                  <span className="font-bold text-stone-900">{totalDistanceKm} km</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#faf7ee] border border-stone-200 text-xs">
                  <span className="text-stone-500 font-medium">{t.estimatedWalking}</span>
                  <span className="font-bold text-stone-900">{totalWalkKm} km</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs">
                  <span className="text-amber-900 font-bold">{t.estimatedJourneyTime}</span>
                  <span className="font-bold text-[#9b1b1b] text-sm">
                    {formatMinutes(totalEstimatedMinutes)}
                  </span>
                </div>
              </div>

              {/* Google Maps Export CTA */}
              {routePandals.length > 0 && (
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center space-x-2 py-3.5 px-4 rounded-2xl bg-[#9b1b1b] hover:bg-[#771d1d] text-white text-sm font-bold shadow-xl active:scale-95 transition-all text-center"
                >
                  <Navigation className="w-4 h-4 text-[#d4af37]" />
                  <span>{t.openInGoogleMaps}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: Curated Classic Routes */}
      {activeView === "prebuilt" && (
        <div className="animate-fadeIn">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#9b1b1b] mb-1">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span>{language === "bn" ? "বিশেষজ্ঞদের প্রস্তুতকৃত সার্কিট" : "Curated Route Collections"}</span>
            </div>
            <h2 className="font-bengali-title text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              {language === "bn" ? "প্রস্তুতকৃত পুজোর রুটসমূহ" : "Pre-Built Editorial Routes"}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 font-medium">
              {language === "bn"
                ? "যেকোনো রুটে ক্লিক করে সরাসরি আপনার রুট বিল্ডারে লোড করুন।"
                : "Click 'Load This Route' to instantly import any curated journey into your planner."}
            </p>
          </div>

          <PrebuiltRoutes />
        </div>
      )}
    </div>
  );
}
