"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Pandal } from "@/data/pandalsData";
import { useLanguage } from "@/context/LanguageContext";
import { useRoute } from "@/context/RouteContext";
import { useCompanion } from "@/context/CompanionContext";
import AlpanaDivider from "@/components/animations/AlpanaDivider";
import {
  X,
  MapPin,
  Train,
  Bus,
  Car,
  Footprints,
  Clock,
  Sparkles,
  Plus,
  Check,
  Navigation,
  Utensils,
  Share2,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Star,
} from "lucide-react";

interface PandalModalProps {
  pandal: Pandal | null;
  onClose: () => void;
  onSelectNearby?: (pandalId: string) => void;
}

export default function PandalModal({
  pandal,
  onClose,
  onSelectNearby,
}: PandalModalProps) {
  const { language, t } = useLanguage();
  const { addToRoute, removeFromRoute, isInRoute } = useRoute();
  const { toggleVisited, isVisited, pandalRatings, setPandalRating } = useCompanion();
  const [activeTransportTab, setActiveTransportTab] = useState<
    "metro" | "bus" | "train" | "car" | "walk"
  >("metro");

  if (!pandal) return null;

  const inRoute = isInRoute(pandal.id);
  const isDone = isVisited(pandal.id);
  const currentRating = pandalRatings[pandal.id] || 0;

  const transportTabs = [
    { key: "metro" as const, label: "Metro", icon: Train },
    { key: "bus" as const, label: "Bus", icon: Bus },
    { key: "train" as const, label: "Train", icon: Train },
    { key: "car" as const, label: "Car / Cab", icon: Car },
    { key: "walk" as const, label: "Walking", icon: Footprints },
  ];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${pandal.name} - Durga Puja 2026`,
          text: `Check out ${pandal.name} (${pandal.theme}) on Pujo Pathik 2026!`,
          url: window.location.href,
        });
      } catch {
        // ignore
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${pandal.latitude},${pandal.longitude}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#faf7ee] rounded-3xl shadow-2xl border border-[#c05621]/30 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/50 text-white hover:bg-black/80 flex items-center justify-center backdrop-blur-sm transition-colors shadow"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto flex-1">
          {/* Hero Image with Bengali Calligraphy Overlay */}
          <div className="relative h-64 sm:h-80 w-full bg-stone-900">
            <Image
              src={pandal.images[0]}
              alt={pandal.name}
              fill
              className="object-cover opacity-90"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-[#121215]/40 to-transparent" />

            {/* Top Tag Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-[#9b1b1b] text-white text-xs font-semibold shadow">
                {pandal.zone}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#d4af37] text-stone-900 text-xs font-bold shadow">
                {pandal.category.toUpperCase().replace("_", " ")}
              </span>
              <button
                onClick={() => toggleVisited(pandal.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold shadow flex items-center space-x-1.5 transition-all ${
                  isDone
                    ? "bg-emerald-600 text-white ring-2 ring-emerald-400"
                    : "bg-black/60 text-stone-200 hover:bg-black/80"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>
                  {isDone
                    ? language === "bn"
                      ? "দর্শন সম্পন্ন ✓"
                      : "Visited ✓"
                    : language === "bn"
                    ? "ডায়েরিতে দর্শন চিহ্নিত করুন"
                    : "Mark Visited"}
                </span>
              </button>
            </div>

            {/* Bottom Title on Hero */}
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <h2 className="font-bengali-title text-2xl sm:text-3xl font-bold text-white leading-tight drop-shadow-md">
                {language === "bn" ? pandal.bengaliName : pandal.name}
              </h2>
              <div className="flex flex-wrap items-center justify-between gap-2 mt-0.5">
                <p className="text-sm font-medium text-[#d4af37] drop-shadow">
                  {language === "bn" ? pandal.name : pandal.bengaliName} • {pandal.area}
                </p>
                {/* 1-5 Star Rating */}
                <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                  <span className="text-[10px] text-stone-300 font-bold mr-1">
                    {language === "bn" ? "রেটিং:" : "Rating:"}
                  </span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setPandalRating(pandal.id, star)}
                      title={`Rate ${star} stars`}
                      className="p-0.5"
                    >
                      <Star
                        className={`w-3.5 h-3.5 ${
                          star <= currentRating
                            ? "fill-amber-400 text-amber-400"
                            : "text-white/40 hover:text-amber-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Body Content Container */}
          <div className="p-5 sm:p-7 space-y-6">
            {/* Theme Card Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#9b1b1b]/10 via-[#c05621]/10 to-[#d4af37]/10 border border-[#9b1b1b]/20">
              <div className="flex items-center space-x-2 text-[#9b1b1b] text-xs font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                <span>{language === "bn" ? "এবারের থিম ও ভাবনা" : "2026 Theme & Story"}</span>
              </div>
              <h3 className="font-bengali-title text-xl sm:text-2xl font-bold text-stone-900 mb-2">
                {language === "bn" ? pandal.bengaliTheme : pandal.theme}
              </h3>
              <p className="text-sm text-stone-700 leading-relaxed font-medium mb-3">
                {pandal.themeDescription}
              </p>
              <div className="pt-2 border-t border-[#c05621]/20 text-xs text-[#8c6246] italic">
                <span className="font-semibold text-[#9b1b1b]">
                  {language === "bn" ? "দার্শনিক অর্থ: " : "Artistic Concept: "}
                </span>
                {pandal.themeMeaning}
              </div>
            </div>

            {/* Why Visit Section */}
            <div>
              <h4 className="font-bengali-title text-base font-bold text-stone-900 mb-3 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[#9b1b1b]" />
                <span>{t.whyVisit}</span>
              </h4>
              <ul className="space-y-2">
                {pandal.whyVisit.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start text-xs sm:text-sm text-stone-700 bg-white/60 p-3 rounded-xl border border-stone-200"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#9b1b1b] mt-1.5 mr-2.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Crowd Advisory & Best Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs">
              <div>
                <span className="font-bold text-amber-900 flex items-center mb-1">
                  <Clock className="w-3.5 h-3.5 mr-1 text-emerald-700" />
                  {t.bestTime}
                </span>
                <p className="text-stone-700">{pandal.bestTime}</p>
              </div>

              <div>
                <span className="font-bold text-red-900 flex items-center mb-1">
                  <AlertTriangle className="w-3.5 h-3.5 mr-1 text-red-600" />
                  {t.avoidTime}
                </span>
                <p className="text-stone-700">{pandal.avoidTime}</p>
              </div>

              <div className="sm:col-span-2 pt-2 border-t border-amber-200/60 text-[11px] text-amber-800 italic">
                <strong>{language === "bn" ? "ভিড়ের পূর্বাভাস: " : "Crowd Note: "}</strong>
                {pandal.expectedCrowdNote}
              </div>
            </div>

            {/* Transport Section with Tabs */}
            <div>
              <h4 className="font-bengali-title text-base font-bold text-stone-900 mb-3 flex items-center space-x-2">
                <Navigation className="w-4 h-4 text-[#9b1b1b]" />
                <span>{t.howToReach}</span>
              </h4>

              {/* Tabs */}
              <div className="flex border-b border-stone-200 overflow-x-auto gap-1">
                {transportTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTransportTab === tab.key;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTransportTab(tab.key)}
                      className={`flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-all flex-shrink-0 ${
                        isActive
                          ? "border-[#9b1b1b] text-[#9b1b1b]"
                          : "border-transparent text-stone-500 hover:text-stone-800"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Tab Content */}
              <div className="p-4 bg-white/80 rounded-b-2xl border border-t-0 border-stone-200 text-xs sm:text-sm text-stone-700 leading-relaxed">
                {activeTransportTab === "metro" && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between font-semibold text-stone-900 pb-2 border-b border-stone-100">
                      <span className="flex items-center text-blue-700">
                        <Train className="w-4 h-4 mr-1.5" />
                        {language === "bn"
                          ? pandal.nearestMetro.bengaliStation
                          : pandal.nearestMetro.station}{" "}
                        ({pandal.nearestMetro.line})
                      </span>
                      <span className="text-stone-500 font-normal">
                        {pandal.nearestMetro.walkMinutes} min walk ({pandal.nearestMetro.distanceMeters}m)
                      </span>
                    </div>
                    <p>{pandal.transportGuide.metro}</p>
                    {pandal.nearestMetro.exitGate && (
                      <p className="text-xs text-[#8c6246] font-medium">
                        💡 <strong>Exit Gate:</strong> {pandal.nearestMetro.exitGate}
                      </p>
                    )}
                  </div>
                )}

                {activeTransportTab === "bus" && (
                  <div className="space-y-2">
                    <p className="font-semibold text-stone-900 pb-2 border-b border-stone-100">
                      {pandal.busInfo}
                    </p>
                    <p>{pandal.transportGuide.bus}</p>
                  </div>
                )}

                {activeTransportTab === "train" && (
                  <div className="space-y-2">
                    <p className="font-semibold text-stone-900 pb-2 border-b border-stone-100">
                      Nearest Railway: {pandal.nearestRailway.station} (approx. {pandal.nearestRailway.distanceKm} km)
                    </p>
                    <p>{pandal.transportGuide.train}</p>
                  </div>
                )}

                {activeTransportTab === "car" && (
                  <div className="space-y-2">
                    <p className="text-amber-800 font-semibold text-xs">
                      ⚠️ Kolkata Police traffic advisories and barricades apply.
                    </p>
                    <p>{pandal.transportGuide.car}</p>
                  </div>
                )}

                {activeTransportTab === "walk" && (
                  <div className="space-y-2">
                    <p className="font-semibold text-stone-900">
                      Walking corridor: {pandal.walkingDistance}
                    </p>
                    <p>{pandal.transportGuide.walk}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Food Nearby */}
            {pandal.foodNearby && pandal.foodNearby.length > 0 && (
              <div>
                <h4 className="font-bengali-title text-base font-bold text-stone-900 mb-3 flex items-center space-x-2">
                  <Utensils className="w-4 h-4 text-[#c05621]" />
                  <span>{t.nearbyFood}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {pandal.foodNearby.map((food, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/70 border border-stone-200 text-xs"
                    >
                      <div>
                        <span className="font-bold text-stone-900 block">{food.name}</span>
                        <span className="text-stone-500">{food.item}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-[#c05621]/10 text-[#c05621] font-semibold flex-shrink-0">
                        {food.distance}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Verified Note & Source */}
            <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-400">
              <span className="flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                Verified: {pandal.lastVerified}
              </span>
              <a
                href={pandal.source}
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-stone-600"
              >
                Official/Directory Source
              </a>
            </div>
          </div>
        </div>

        {/* Modal Bottom Sticky Actions */}
        <div className="p-4 bg-[#faf7ee] border-t border-[#c05621]/20 flex items-center justify-between gap-3">
          <button
            onClick={handleShare}
            className="p-2.5 rounded-xl border border-stone-300 hover:bg-white text-stone-700 transition-colors"
            title="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <a
            href={googleMapsDirectionsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl border border-[#9b1b1b] text-[#9b1b1b] hover:bg-[#9b1b1b]/10 text-xs sm:text-sm font-semibold transition-colors text-center"
          >
            <Navigation className="w-4 h-4" />
            <span>{t.directions}</span>
          </a>

          <button
            onClick={() => (inRoute ? removeFromRoute(pandal.id) : addToRoute(pandal))}
            className={`flex-1 flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md active:scale-95 ${
              inRoute
                ? "bg-emerald-700 text-white hover:bg-emerald-800"
                : "bg-[#9b1b1b] text-white hover:bg-[#771d1d]"
            }`}
          >
            {inRoute ? (
              <>
                <Check className="w-4 h-4" />
                <span>{t.inRoute}</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>{t.addToRoute}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

