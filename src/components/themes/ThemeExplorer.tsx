"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PANDALS_DATA, Pandal } from "@/data/pandalsData";
import { useLanguage } from "@/context/LanguageContext";
import { useRoute } from "@/context/RouteContext";
import AlpanaDivider from "@/components/animations/AlpanaDivider";
import { Sparkles, MapPin, Train, Route, Plus, Check, Eye } from "lucide-react";

interface ThemeExplorerProps {
  onViewDetails: (pandal: Pandal) => void;
}

export const THEME_HIGHLIGHT_IDS = [
  "sreebhumi-sporting-club",
  "ekdalia-evergreen",
  "samaj-sebi-sangha",
  "tala-prattoy",
  "kumartuli-park",
  "jagat-mukherjee-park",
  "chorebagan-sarbojanin",
  "suruchi-sangha",
  "alipore-sarbojanin",
  "bosepukur-sitala-mandir",
  "santosh-mitra-square",
];

export default function ThemeExplorer({ onViewDetails }: ThemeExplorerProps) {
  const { language, t } = useLanguage();
  const { addToRoute, removeFromRoute, isInRoute } = useRoute();
  const [activeZone, setActiveZone] = useState<string>("ALL");

  const themePandals = PANDALS_DATA.filter((p) =>
    THEME_HIGHLIGHT_IDS.includes(p.id)
  );

  const filtered = activeZone === "ALL"
    ? themePandals
    : themePandals.filter((p) => p.zone === activeZone);

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#9b1b1b] mb-1">
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <span>{language === "bn" ? "শিল্পী ও ভাবনার মহাকাব্য" : "Artistry & Conceptual Vision"}</span>
          </div>
          <h2 className="font-bengali-title text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
            {t.themesSectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2 font-medium">
            “{t.themesSectionSubtitle}”
          </p>
          <AlpanaDivider variant="red" className="my-5 max-w-sm" />

          {/* Zone Quick Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            {[
              { key: "ALL", label: t.allZones },
              { key: "North Kolkata", label: t.northKolkata },
              { key: "South Kolkata", label: t.southKolkata },
              { key: "Central Kolkata", label: t.centralKolkata },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveZone(tab.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeZone === tab.key
                    ? "bg-[#9b1b1b] text-white shadow-sm"
                    : "bg-white text-stone-700 hover:bg-[#c05621]/15 border border-stone-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Themes Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((pandal) => {
            const inRoute = isInRoute(pandal.id);

            return (
              <div
                key={pandal.id}
                className="festive-card rounded-3xl overflow-hidden flex flex-col justify-between border border-[#c05621]/20 shadow-lg group hover:border-[#9b1b1b]/60 transition-all"
              >
                <div>
                  {/* Image with Theme Banner */}
                  <div className="relative h-52 w-full overflow-hidden bg-stone-900">
                    <Image
                      src={pandal.images[0]}
                      alt={pandal.theme}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                    {/* Area Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#faf7ee] text-[11px] font-medium border border-white/20">
                        {pandal.area}
                      </span>
                    </div>

                    {/* Large Theme Name Title on Image */}
                    <div className="absolute bottom-3 left-3 right-3 z-10">
                      <div className="text-[10px] text-[#d4af37] font-bold tracking-wider uppercase mb-0.5">
                        {language === "bn" ? "থিমের নাম" : "2026 THEME"}
                      </div>
                      <h3 className="font-bengali-title text-xl sm:text-2xl font-bold text-white drop-shadow leading-tight">
                        {language === "bn" ? pandal.bengaliTheme : pandal.theme}
                      </h3>
                    </div>
                  </div>

                  {/* Editorial Body */}
                  <div className="p-5 sm:p-6 space-y-4">
                    {/* Club / Pandal Name */}
                    <div>
                      <h4 className="font-bengali-title text-base sm:text-lg font-bold text-stone-900 group-hover:text-[#9b1b1b] transition-colors">
                        {language === "bn" ? pandal.bengaliName : pandal.name}
                      </h4>
                      <p className="text-xs text-stone-500 font-medium">
                        {language === "bn" ? pandal.name : pandal.bengaliName}
                      </p>
                    </div>

                    {/* Theme Description */}
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed line-clamp-3 font-medium">
                      {pandal.themeDescription}
                    </p>

                    {/* Meaning / Philosophy Quote Box */}
                    <div className="p-3 rounded-xl bg-[#f7f2e7] border-l-2 border-[#9b1b1b] text-xs text-stone-700 italic">
                      <span className="font-bold text-[#9b1b1b] not-italic block mb-0.5">
                        {language === "bn" ? "ভাবনার তাৎপর্য:" : "Artistic Concept:"}
                      </span>
                      {pandal.themeMeaning}
                    </div>

                    {/* Metro Connectivity pill */}
                    <div className="flex items-center space-x-2 text-xs text-stone-600 pt-1">
                      <Train className="w-3.5 h-3.5 text-blue-700 flex-shrink-0" />
                      <span className="truncate">
                        <strong>Metro:</strong> {pandal.nearestMetro.station} ({pandal.nearestMetro.walkMinutes} min walk)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-4 sm:p-5 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onViewDetails(pandal)}
                    className="flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl border border-stone-300 hover:border-[#9b1b1b] text-xs font-semibold text-stone-800 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#9b1b1b]" />
                    <span>{t.viewDetails}</span>
                  </button>

                  <button
                    onClick={() =>
                      inRoute ? removeFromRoute(pandal.id) : addToRoute(pandal)
                    }
                    className={`flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition-all shadow-sm active:scale-95 ${
                      inRoute
                        ? "bg-emerald-700 text-white"
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
            );
          })}
        </div>
      </div>
    </section>
  );
}

