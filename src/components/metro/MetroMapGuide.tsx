"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useRoute } from "@/context/RouteContext";
import { METRO_STATIONS_DATA, MetroStationInfo } from "@/data/metroData";
import { PANDALS_DATA, Pandal } from "@/data/pandalsData";
import AlpanaDivider from "@/components/animations/AlpanaDivider";
import {
  Train,
  MapPin,
  Clock,
  Sparkles,
  ChevronRight,
  Info,
  Plus,
  Check,
  Navigation,
} from "lucide-react";

interface MetroMapGuideProps {
  onViewDetails?: (pandal: Pandal) => void;
}

export default function MetroMapGuide({ onViewDetails }: MetroMapGuideProps) {
  const { language } = useLanguage();
  const { addToRoute, removeFromRoute, isInRoute } = useRoute();
  const [selectedStationId, setSelectedStationId] = useState<string>("shyambazar");

  const selectedStation =
    METRO_STATIONS_DATA.find((s) => s.id === selectedStationId) ||
    METRO_STATIONS_DATA[0];

  return (
    <section className="py-12 sm:py-16 bg-[#121215] text-[#faf7ee] rounded-3xl p-6 sm:p-10 border border-[#d4af37]/30 shadow-2xl relative overflow-hidden">
      {/* Background glowing accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#9b1b1b]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header Styled like Traditional Kolkata Street Signage */}
      <div className="text-center max-w-3xl mx-auto mb-10 relative z-10">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] text-xs font-bold uppercase tracking-widest mb-3">
          <Train className="w-4 h-4 text-blue-400" />
          <span>{language === "bn" ? "কলকাতা মেট্রো শারদ নির্দেশিকা" : "Kolkata Metro Pujo Navigator"}</span>
        </div>
        <h2 className="font-bengali-title text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
          {language === "bn" ? "পুজো by Metro" : "Pujo by Metro 2026"}
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 mt-2 font-medium max-w-xl mx-auto">
          {language === "bn"
            ? "ট্র্যাফিক জ্যাম এড়িয়ে শহরের এক প্রান্ত থেকে অন্য প্রান্তে দ্রুত পৌঁছানোর সেরা মাধ্যম।"
            : "The quickest, jam-free way to hop between Kolkata's premier pandal corridors all night long."}
        </p>
        <AlpanaDivider variant="gold" className="my-5 max-w-sm" />
      </div>

      {/* 2-Column Layout: Stations Selector & Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Left Column: Traditional Kolkata Signboard Style Station Nodes */}
        <div className="lg:col-span-5 space-y-2.5">
          <h3 className="font-semibold text-xs tracking-wider uppercase text-[#d4af37] mb-3 flex items-center space-x-2">
            <span>{language === "bn" ? "মেট্রো স্টেশন নির্বাচন করুন:" : "Select Metro Station:"}</span>
          </h3>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {METRO_STATIONS_DATA.map((station) => {
              const isSelected = selectedStationId === station.id;

              return (
                <button
                  key={station.id}
                  onClick={() => setSelectedStationId(station.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all text-left group ${
                    isSelected
                      ? "bg-[#9b1b1b] border-[#d4af37] shadow-lg text-white font-bold"
                      : "bg-[#18181c] border-stone-800 hover:border-stone-600 text-stone-300"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        station.line.includes("Green") ? "bg-emerald-400" : "bg-blue-400"
                      }`}
                    />
                    <div>
                      <div className="font-bengali-title text-base sm:text-lg leading-tight">
                        {language === "bn" ? station.bengaliName : station.name}
                      </div>
                      <div className="text-[11px] text-stone-400">
                        {station.nearbyPandals.length}{" "}
                        {language === "bn" ? "টি নিকটবর্তী মণ্ডপ" : "nearby pandals"}
                      </div>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? "translate-x-1 text-[#d4af37]" : "text-stone-500"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Station Details & Connected Pandals */}
        <div className="lg:col-span-7 bg-[#1a1a1f] p-6 sm:p-8 rounded-3xl border border-stone-800 flex flex-col justify-between">
          <div>
            {/* Station Title Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-stone-800">
              <div>
                <span className="text-[11px] font-semibold tracking-wider uppercase text-blue-400 block mb-1">
                  {selectedStation.line}
                </span>
                <h3 className="font-bengali-title text-2xl sm:text-3xl font-bold text-white">
                  {language === "bn"
                    ? selectedStation.bengaliName
                    : selectedStation.name}
                </h3>
              </div>

              <div className="px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/40 text-blue-300 text-xs font-semibold">
                All-Night Puja Frequency
              </div>
            </div>

            {/* Insider Tip Box */}
            <div className="my-5 p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/30 flex items-start space-x-2.5 text-xs text-amber-200">
              <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300">Station Tip: </strong>
                {selectedStation.insiderTip}
              </div>
            </div>

            {/* Nearby Pandals Accordion/Cards */}
            <h4 className="text-xs font-bold tracking-wider uppercase text-[#d4af37] mb-3">
              {language === "bn"
                ? "এই স্টেশন থেকে হাঁটা পথের মণ্ডপসমূহ:"
                : "Nearby Walkable Pandals:"}
            </h4>

            <div className="space-y-3">
              {selectedStation.nearbyPandals.map((item) => {
                const fullPandal = PANDALS_DATA.find((p) => p.id === item.pandalId);
                const inRoute = isInRoute(item.pandalId);

                return (
                  <div
                    key={item.pandalId}
                    className="p-4 rounded-2xl bg-[#222228] border border-stone-700 hover:border-[#d4af37]/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <h5 className="font-bengali-title text-base font-bold text-white">
                          {language === "bn" ? item.bengaliName : item.pandalName}
                        </h5>
                        <span className="px-2 py-0.5 rounded-full bg-[#d4af37]/20 text-[#d4af37] text-[10px] font-semibold">
                          {item.theme}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-stone-400">
                        <span className="flex items-center text-stone-300">
                          <Clock className="w-3.5 h-3.5 mr-1 text-[#d4af37]" />
                          {item.walkMinutes} min walk ({item.distanceMeters}m)
                        </span>
                        <span>•</span>
                        <span className="text-emerald-400">{item.exitGate}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 flex-shrink-0">
                      {fullPandal && onViewDetails && (
                        <button
                          onClick={() => onViewDetails(fullPandal)}
                          className="px-3 py-1.5 rounded-xl border border-stone-600 hover:border-stone-400 text-xs text-stone-200 transition-colors"
                        >
                          Details
                        </button>
                      )}

                      {fullPandal && (
                        <button
                          onClick={() =>
                            inRoute
                              ? removeFromRoute(item.pandalId)
                              : addToRoute(fullPandal)
                          }
                          className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                            inRoute
                              ? "bg-emerald-700 text-white"
                              : "bg-[#9b1b1b] text-white hover:bg-[#771d1d]"
                          }`}
                        >
                          {inRoute ? (
                            <>
                              <Check className="w-3 h-3" />
                              <span>In Route</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3 h-3" />
                              <span>Add</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Night Timing Advisory */}
          <div className="pt-6 mt-6 border-t border-stone-800 text-xs text-stone-400 flex items-center justify-between">
            <span>Special 24-hr Pujo Smart Cards available at concourse gates</span>
            <span className="text-blue-400 font-semibold">{selectedStation.pujoNightFrequency}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

