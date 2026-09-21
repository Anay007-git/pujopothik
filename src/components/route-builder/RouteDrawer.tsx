"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useRoute, TransportMode } from "@/context/RouteContext";
import {
  X,
  Route,
  Trash2,
  Navigation,
  ChevronUp,
  ChevronDown,
  Train,
  Bus,
  Car,
  Footprints,
  Clock,
  Compass,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default function RouteDrawer() {
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
    isDrawerOpen,
    setIsDrawerOpen,
  } = useRoute();

  if (!isDrawerOpen) return null;

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
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={() => setIsDrawerOpen(false)}
    >
      <div
        className="w-full max-w-md bg-[#faf7ee] h-full shadow-2xl flex flex-col justify-between border-l border-[#c05621]/30 overflow-hidden animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#c05621]/20 bg-white/70 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#9b1b1b] text-white flex items-center justify-center shadow">
              <Route className="w-5 h-5 text-[#d4af37]" />
            </div>
            <div>
              <h3 className="font-bengali-title text-lg font-bold text-stone-900 leading-tight">
                {t.routeBuilderTitle}
              </h3>
              <p className="text-[11px] text-stone-500 font-medium">
                {routePandals.length} {language === "bn" ? "টি মণ্ডপ নির্বাচিত" : "pandals selected"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            {routePandals.length > 0 && (
              <button
                onClick={clearRoute}
                className="p-2 text-stone-400 hover:text-red-700 transition-colors"
                title={t.clearRoute}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-2 text-stone-500 hover:text-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Transport Mode Switcher */}
        <div className="px-4 py-2.5 bg-[#f5efe1] border-b border-[#c05621]/15 flex items-center justify-between">
          <span className="text-xs font-semibold text-stone-600">
            {language === "bn" ? "যানবাহন:" : "Mode:"}
          </span>
          <div className="flex items-center space-x-1">
            {modes.map((m) => {
              const Icon = m.icon;
              const isActive = transportMode === m.key;
              return (
                <button
                  key={m.key}
                  onClick={() => setTransportMode(m.key)}
                  className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[#9b1b1b] text-white shadow-sm"
                      : "bg-white text-stone-600 hover:bg-stone-100"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Route Stops List (Reorderable) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {routePandals.length === 0 ? (
            <div className="text-center py-16 px-4 text-stone-500">
              <Compass className="w-10 h-10 text-[#c05621]/40 mx-auto mb-3 animate-spin-slow" />
              <p className="font-bengali-title text-base text-stone-800 mb-1">
                {t.emptyRouteMessage}
              </p>
              <p className="text-xs text-stone-500">
                {language === "bn"
                  ? "যে কোনো মণ্ডপে 'রুটে যোগ করুন' চাপলেই এখানে ক্রমানুসারে জমা হবে।"
                  : "Click 'Add to Route' on any pandal to start curating your journey."}
              </p>
            </div>
          ) : (
            routePandals.map((pandal, idx) => (
              <div
                key={pandal.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-white border border-stone-200/80 shadow-sm hover:border-[#9b1b1b]/40 transition-colors"
              >
                {/* Index badge & Pandal info */}
                <div className="flex items-center space-x-3 min-w-0">
                  <span className="w-6 h-6 rounded-full bg-[#9b1b1b] text-[#faf7ee] text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <div className="truncate">
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900 truncate">
                      {language === "bn" ? pandal.bengaliName : pandal.name}
                    </h4>
                    <p className="text-[11px] text-[#c05621] font-medium truncate">
                      {pandal.area} • Metro: {pandal.nearestMetro.station}
                    </p>
                  </div>
                </div>

                {/* Reorder & Remove Actions */}
                <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
                  <div className="flex flex-col">
                    <button
                      disabled={idx === 0}
                      onClick={() => movePandal(idx, idx - 1)}
                      className="p-0.5 text-stone-400 hover:text-stone-700 disabled:opacity-20"
                      title="Move Up"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      disabled={idx === routePandals.length - 1}
                      onClick={() => movePandal(idx, idx + 1)}
                      className="p-0.5 text-stone-400 hover:text-stone-700 disabled:opacity-20"
                      title="Move Down"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromRoute(pandal.id)}
                    className="p-1.5 text-stone-400 hover:text-red-700 transition-colors"
                    title={t.removeFromRoute}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Dynamic Route Metrics & Summary Footer */}
        {routePandals.length > 0 && (
          <div className="p-4 bg-[#fbf8f0] border-t border-[#c05621]/20 space-y-3.5">
            {/* Quick Metrics 3-Grid */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-xl bg-white border border-stone-200">
                <span className="text-[10px] uppercase font-bold text-stone-500 block">
                  {t.estimatedDistance}
                </span>
                <span className="text-sm sm:text-base font-bold text-stone-900">
                  {totalDistanceKm} km
                </span>
              </div>

              <div className="p-2 rounded-xl bg-white border border-stone-200">
                <span className="text-[10px] uppercase font-bold text-stone-500 block">
                  {t.estimatedWalking}
                </span>
                <span className="text-sm sm:text-base font-bold text-stone-900">
                  {totalWalkKm} km
                </span>
              </div>

              <div className="p-2 rounded-xl bg-white border border-stone-200">
                <span className="text-[10px] uppercase font-bold text-stone-500 block">
                  {t.estimatedJourneyTime}
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#9b1b1b]">
                  {formatMinutes(totalEstimatedMinutes)}
                </span>
              </div>
            </div>

            {/* Google Maps Multi-Stop Link */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-[#9b1b1b] hover:bg-[#771d1d] text-white text-xs sm:text-sm font-bold shadow-md active:scale-95 transition-all text-center"
            >
              <Navigation className="w-4 h-4 text-[#d4af37]" />
              <span>{t.openInGoogleMaps}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            {/* Dedicated Route Page Link */}
            <div className="text-center">
              <Link
                href="/routes"
                onClick={() => setIsDrawerOpen(false)}
                className="text-xs font-semibold text-[#8c6246] hover:text-[#9b1b1b] inline-flex items-center space-x-1"
              >
                <span>{language === "bn" ? "বিস্তারিত রুট পেজে দেখুন" : "View Full Route Page"}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

