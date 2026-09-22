"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Search, Filter, X, RotateCcw, Check, Sparkles, MapPin } from "lucide-react";

export interface FilterState {
  search: string;
  zones: string[]; // multi-select zones, e.g. ["North Kolkata", "Central Kolkata"]
  neighborhoods: string[]; // multi-select sub-areas, e.g. ["Kumartuli", "Bagbazar"]
  category: string;
  crowd: string;
  accessibilityOnly: boolean;
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
    { key: "North Kolkata", label: t.northKolkata },
    { key: "South Kolkata", label: t.southKolkata },
    { key: "Central Kolkata", label: t.centralKolkata },
    { key: "Salt Lake & New Town", label: t.saltLakeNewTown },
    { key: "Behala & West", label: t.behalaWest },
  ];

  const neighborhoods = [
    { key: "Kumartuli", label: language === "bn" ? "কুমারটুলি" : "Kumartuli" },
    { key: "Bagbazar", label: language === "bn" ? "বাগবাজার" : "Bagbazar" },
    { key: "Sovabazar", label: language === "bn" ? "শোভাবাজার" : "Sovabazar" },
    { key: "College Street", label: language === "bn" ? "কলেজ স্ট্রিট" : "College Street" },
    { key: "Gariahat", label: language === "bn" ? "গড়িয়াহাট" : "Gariahat" },
    { key: "Ballygunge", label: language === "bn" ? "বালিগঞ্জ" : "Ballygunge" },
    { key: "Chetla", label: language === "bn" ? "চেতলা" : "Chetla" },
    { key: "Salt Lake", label: language === "bn" ? "সল্টলেক" : "Salt Lake" },
    { key: "Behala", label: language === "bn" ? "বেহালা" : "Behala" },
    { key: "Bowbazar", label: language === "bn" ? "বউবাজার" : "Bowbazar" },
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
    filters.zones.length > 0 ||
    filters.neighborhoods.length > 0 ||
    filters.category !== "ALL" ||
    filters.crowd !== "ALL" ||
    filters.accessibilityOnly;

  const handleReset = () => {
    onChange({
      search: "",
      zones: [],
      neighborhoods: [],
      category: "ALL",
      crowd: "ALL",
      accessibilityOnly: false,
    });
  };

  // Toggle Zone (multi-select)
  const toggleZone = (zoneKey: string) => {
    const exists = filters.zones.includes(zoneKey);
    const updated = exists
      ? filters.zones.filter((z) => z !== zoneKey)
      : [...filters.zones, zoneKey];
    onChange({ ...filters, zones: updated });
  };

  // Toggle Neighborhood (multi-select)
  const toggleNeighborhood = (nKey: string) => {
    const exists = filters.neighborhoods.includes(nKey);
    const updated = exists
      ? filters.neighborhoods.filter((n) => n !== nKey)
      : [...filters.neighborhoods, nKey];
    onChange({ ...filters, neighborhoods: updated });
  };

  return (
    <div className="bg-[#faf7ee] p-4 sm:p-6 rounded-3xl border border-[#c05621]/20 shadow-sm space-y-4 mb-8">
      {/* 1. Search Input Bar */}
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

      {/* 2. Multi-Select Zones */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-stone-700 font-bengali-title flex items-center space-x-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#9b1b1b]" />
            <span>{language === "bn" ? "অঞ্চল নির্বাচন করুন (একাধিক বাছতে পারেন):" : "Select Zones (Multi-Select):"}</span>
          </span>
          {filters.zones.length > 0 && (
            <span className="text-[11px] font-bold text-[#9b1b1b]">
              {filters.zones.length} {language === "bn" ? "টি অঞ্চল নির্বাচিত" : "zones active"}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 no-scrollbar">
          {/* All Zones Button */}
          <button
            onClick={() => onChange({ ...filters, zones: [] })}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              filters.zones.length === 0
                ? "bg-[#9b1b1b] text-[#faf7ee] shadow-sm"
                : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-300/80"
            }`}
          >
            {language === "bn" ? "সব অঞ্চল" : "All Zones"}
          </button>

          {zones.map((zone) => {
            const isActive = filters.zones.includes(zone.key);
            return (
              <button
                key={zone.key}
                onClick={() => toggleZone(zone.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1 ${
                  isActive
                    ? "bg-[#9b1b1b] text-[#faf7ee] shadow-sm ring-2 ring-[#9b1b1b]/30"
                    : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-300/80"
                }`}
              >
                {isActive && <Check className="w-3 h-3 text-[#d4af37]" />}
                <span>{zone.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Micro-Neighborhood Pockets (Multi-Select) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-stone-700 font-bengali-title flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{language === "bn" ? "নির্দিষ্ট পাড়া বা লোকালিটি:" : "Specific Neighborhoods:"}</span>
          </span>
          {filters.neighborhoods.length > 0 && (
            <button
              onClick={() => onChange({ ...filters, neighborhoods: [] })}
              className="text-[11px] text-[#9b1b1b] hover:underline font-semibold"
            >
              {language === "bn" ? "মুছুন" : "Clear"}
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {neighborhoods.map((n) => {
            const isActive = filters.neighborhoods.includes(n.key);
            return (
              <button
                key={n.key}
                onClick={() => toggleNeighborhood(n.key)}
                className={`px-3 py-1 rounded-xl text-xs font-medium transition-all flex items-center space-x-1 ${
                  isActive
                    ? "bg-[#c05621] text-white shadow-xs font-bold ring-1 ring-[#c05621]"
                    : "bg-white/80 text-stone-700 hover:bg-white border border-stone-200"
                }`}
              >
                {isActive && <Check className="w-3 h-3 text-[#faf7ee]" />}
                <span>{n.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Category, Crowd & Accessibility Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#c05621]/15">
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Dropdown */}
          <div className="flex items-center space-x-1.5">
            <span className="text-xs font-medium text-stone-600">
              {language === "bn" ? "ধরণ:" : "Type:"}
            </span>
            <select
              value={filters.category}
              onChange={(e) => onChange({ ...filters, category: e.target.value })}
              className="px-2.5 py-1.5 rounded-xl bg-white border border-stone-300 text-xs font-semibold text-stone-800 outline-none focus:border-[#9b1b1b]"
            >
              {categories.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Crowd Level Dropdown */}
          <div className="flex items-center space-x-1.5">
            <span className="text-xs font-medium text-stone-600">
              {language === "bn" ? "ভিড়:" : "Crowd:"}
            </span>
            <select
              value={filters.crowd}
              onChange={(e) => onChange({ ...filters, crowd: e.target.value })}
              className="px-2.5 py-1.5 rounded-xl bg-white border border-stone-300 text-xs font-semibold text-stone-800 outline-none focus:border-[#9b1b1b]"
            >
              {crowdLevels.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Wheelchair Accessibility Toggle */}
          <label className="flex items-center space-x-1.5 cursor-pointer text-xs font-semibold text-stone-700 select-none">
            <input
              type="checkbox"
              checked={filters.accessibilityOnly}
              onChange={(e) => onChange({ ...filters, accessibilityOnly: e.target.checked })}
              className="w-3.5 h-3.5 rounded text-[#9b1b1b] focus:ring-[#9b1b1b]"
            />
            <span>♿ {language === "bn" ? "হুইলচেয়ার সুবিধা" : "Wheelchair Accessible"}</span>
          </label>
        </div>

        {/* Results count & Clear button */}
        <div className="flex items-center space-x-3">
          <span className="text-xs font-bold text-stone-600">
            {language === "bn"
              ? `মোট ${filteredCount} টি মণ্ডপ প্রদর্শিত (${totalCount} টির মধ্যে)`
              : `Showing ${filteredCount} of ${totalCount} pandals`}
          </span>

          {isFiltered && (
            <button
              onClick={handleReset}
              className="inline-flex items-center space-x-1 text-xs font-bold text-[#9b1b1b] hover:text-[#771d1d] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{language === "bn" ? "ফিল্টার মুছুন" : "Reset Filters"}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
