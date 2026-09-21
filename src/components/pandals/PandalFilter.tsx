"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Search, Filter, X, RotateCcw } from "lucide-react";

export interface FilterState {
  search: string;
  zone: string;
  category: string;
  crowd: string;
}

interface PandalFilterProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  totalCount: number;
  filteredCount: number;
}

export default function PandalFilter({
  filters,
  onChange,
  totalCount,
  filteredCount,
}: PandalFilterProps) {
  const { language, t } = useLanguage();

  const zones = [
    { key: "ALL", label: t.allZones },
    { key: "North Kolkata", label: t.northKolkata },
    { key: "South Kolkata", label: t.southKolkata },
    { key: "Central Kolkata", label: t.centralKolkata },
    { key: "Salt Lake & New Town", label: t.saltLakeNewTown },
    { key: "Behala & West", label: t.behalaWest },
  ];

  const categories = [
    { key: "ALL", label: language === "bn" ? "সব ধরন" : "All Types" },
    { key: "must_visit", label: t.mustVisit },
    { key: "theme", label: t.theme },
    { key: "traditional", label: t.traditional },
    { key: "heritage", label: t.heritage },
  ];

  const crowdLevels = [
    { key: "ALL", label: language === "bn" ? "সব ভিড়" : "Any Crowd" },
    { key: "Low", label: t.crowdLow },
    { key: "Moderate", label: t.crowdModerate },
    { key: "High", label: t.crowdHigh },
    { key: "Very High", label: t.crowdVeryHigh },
  ];

  const isFiltered =
    filters.search !== "" ||
    filters.zone !== "ALL" ||
    filters.category !== "ALL" ||
    filters.crowd !== "ALL";

  const handleReset = () => {
    onChange({
      search: "",
      zone: "ALL",
      category: "ALL",
      crowd: "ALL",
    });
  };

  return (
    <div className="bg-[#faf7ee] p-4 sm:p-6 rounded-3xl border border-[#c05621]/20 shadow-sm space-y-4 mb-8">
      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-5 h-5 text-[#9b1b1b] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          placeholder={t.searchPlaceholder}
          className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white border border-stone-300 focus:border-[#9b1b1b] focus:ring-2 focus:ring-[#9b1b1b]/20 text-sm font-medium placeholder-stone-400 transition-all outline-none"
        />
        {filters.search && (
          <button
            onClick={() => onChange({ ...filters, search: "" })}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Zone Tabs */}
      <div>
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 no-scrollbar">
          {zones.map((zone) => {
            const isActive = filters.zone === zone.key;
            return (
              <button
                key={zone.key}
                onClick={() => onChange({ ...filters, zone: zone.key })}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-[#9b1b1b] text-white shadow-sm"
                    : "bg-white/80 text-stone-700 hover:bg-[#c05621]/15 border border-stone-200"
                }`}
              >
                {zone.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Filters: Category & Crowd */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-200/80">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
            {language === "bn" ? "ধরন:" : "Type:"}
          </span>
          {categories.map((cat) => {
            const isActive = filters.category === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => onChange({ ...filters, category: cat.key })}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                  isActive
                    ? "bg-[#d4af37] text-stone-900 font-bold"
                    : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <span className="text-stone-500">
            {language === "bn"
              ? `প্রদর্শিত: ${filteredCount} / ${totalCount}`
              : `Showing: ${filteredCount} of ${totalCount}`}
          </span>

          {isFiltered && (
            <button
              onClick={handleReset}
              className="flex items-center space-x-1 text-xs font-semibold text-[#9b1b1b] hover:underline"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{language === "bn" ? "রিসেট" : "Reset"}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

