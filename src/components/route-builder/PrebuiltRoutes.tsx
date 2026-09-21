"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useRoute } from "@/context/RouteContext";
import { PREBUILT_ROUTES, EditorialRoute } from "@/data/routesData";
import { PANDALS_DATA } from "@/data/pandalsData";
import {
  Compass,
  Clock,
  Footprints,
  Train,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function PrebuiltRoutes({ onSelectPandal }: { onSelectPandal?: (id: string) => void }) {
  const { language } = useLanguage();
  const { loadPrebuiltRoute } = useRoute();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {PREBUILT_ROUTES.map((route) => {
        // Collect pandal objects for this route
        const pandals = route.pandalIds
          .map((id) => PANDALS_DATA.find((p) => p.id === id))
          .filter((p): p is (typeof PANDALS_DATA)[0] => Boolean(p));

        return (
          <div
            key={route.id}
            className="festive-card rounded-3xl p-6 flex flex-col justify-between border border-[#c05621]/20 shadow-md hover:border-[#9b1b1b]/50 transition-all group"
          >
            <div>
              {/* Tag / Category Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full bg-[#9b1b1b]/10 text-[#9b1b1b] text-xs font-bold uppercase tracking-wider">
                  {route.difficulty} Route
                </span>
                <span className="text-xs font-semibold text-stone-500 flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1 text-[#c05621]" />
                  {route.estimatedDuration}
                </span>
              </div>

              {/* Title & Bengali Tagline */}
              <h3 className="font-bengali-title text-xl font-bold text-stone-900 group-hover:text-[#9b1b1b] transition-colors leading-snug mb-1">
                {language === "bn" ? route.bengaliTitle : route.title}
              </h3>
              <p className="text-xs text-[#8c6246] font-medium italic mb-3">
                “{language === "bn" ? route.bengaliTagline : route.tagline}”
              </p>

              {/* Description */}
              <p className="text-xs text-stone-600 leading-relaxed line-clamp-3 mb-4">
                {language === "bn" ? route.bengaliDescription : route.description}
              </p>

              {/* Quick Metrics */}
              <div className="grid grid-cols-2 gap-2 py-2 px-3 rounded-2xl bg-[#f7f2e7] text-[11px] text-stone-700 mb-4 font-medium">
                <div>
                  <span className="text-stone-400 block text-[10px]">Total Distance</span>
                  <span>{route.estimatedDistance}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">Walking Leg</span>
                  <span>{route.walkingDistance}</span>
                </div>
              </div>

              {/* Stops Preview Chips */}
              <div className="mb-4">
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-2">
                  {pandals.length} {language === "bn" ? "টি প্রধান দর্শনীয় স্থান:" : "Featured Stops:"}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {pandals.map((p, idx) => (
                    <span
                      key={p.id}
                      className="inline-flex items-center px-2 py-1 rounded-lg bg-white border border-stone-200 text-[11px] text-stone-800 font-medium"
                    >
                      <span className="w-4 h-4 rounded-full bg-[#9b1b1b]/10 text-[#9b1b1b] text-[9px] font-bold flex items-center justify-center mr-1">
                        {idx + 1}
                      </span>
                      {language === "bn" ? p.bengaliName : p.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Load Route CTA Button */}
            <button
              onClick={() => loadPrebuiltRoute(route.pandalIds)}
              className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-[#9b1b1b] hover:bg-[#771d1d] text-white text-xs sm:text-sm font-bold shadow-md active:scale-95 transition-all mt-2"
            >
              <Compass className="w-4 h-4 text-[#d4af37]" />
              <span>
                {language === "bn" ? "এই রুটটি লোড করুন" : "Load This Route"}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}

