"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PandalCard from "@/components/pandals/PandalCard";
import PandalFilter, { FilterState } from "@/components/pandals/PandalFilter";
import PandalModal from "@/components/pandals/PandalModal";
import AlpanaDivider from "@/components/animations/AlpanaDivider";
import { PANDALS_DATA, Pandal } from "@/data/pandalsData";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, Sparkles } from "lucide-react";

function PandalsDirectoryContent() {
  const searchParams = useSearchParams();
  const initialZone = searchParams?.get("zone") || "ALL";

  const { language, t } = useLanguage();
  const [modalPandal, setModalPandal] = useState<Pandal | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    zone: initialZone,
    category: "ALL",
    crowd: "ALL",
  });

  const filteredPandals = useMemo(() => {
    return PANDALS_DATA.filter((pandal) => {
      // Search
      const q = filters.search.toLowerCase().trim();
      const matchSearch =
        !q ||
        pandal.name.toLowerCase().includes(q) ||
        pandal.bengaliName.includes(filters.search.trim()) ||
        pandal.area.toLowerCase().includes(q) ||
        pandal.theme.toLowerCase().includes(q) ||
        pandal.bengaliTheme.includes(filters.search.trim()) ||
        pandal.nearestMetro.station.toLowerCase().includes(q) ||
        pandal.nearestMetro.bengaliStation.includes(filters.search.trim());

      // Zone
      const matchZone = filters.zone === "ALL" || pandal.zone === filters.zone;

      // Category
      const matchCat =
        filters.category === "ALL" || pandal.category === filters.category;

      // Crowd
      const matchCrowd =
        filters.crowd === "ALL" || pandal.crowdLevel === filters.crowd;

      return matchSearch && matchZone && matchCat && matchCrowd;
    });
  }, [filters]);

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Directory Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#9b1b1b] mb-1">
          <MapPin className="w-4 h-4 text-[#c05621]" />
          <span>{language === "bn" ? "কলকাতার মণ্ডপ নির্দেশিকা ২০২৬" : "Kolkata Pandal Directory 2026"}</span>
        </div>
        <h1 className="font-bengali-title text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
          {t.pandalsHeading}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 mt-2 font-medium">
          “{t.pandalsSubtitle}”
        </p>
        <AlpanaDivider variant="red" className="my-5 max-w-sm" />
      </div>

      {/* Filter & Search Bar */}
      <PandalFilter
        filters={filters}
        onChange={setFilters}
        totalCount={PANDALS_DATA.length}
        filteredCount={filteredPandals.length}
      />

      {/* Pandals Grid */}
      {filteredPandals.length === 0 ? (
        <div className="text-center py-20 bg-white/70 rounded-3xl border border-stone-200">
          <Sparkles className="w-10 h-10 text-[#c05621] mx-auto mb-3" />
          <h3 className="font-bengali-title text-xl font-bold text-stone-800 mb-1">
            {language === "bn" ? "কোনো মণ্ডপ মেলেনি" : "No pandals matched your search"}
          </h3>
          <p className="text-xs text-stone-500">
            {language === "bn"
              ? "ফিল্টার পরিবর্তন করুন বা অন্য কোনো মেট্রো স্টেশন দিয়ে সন্ধান করুন।"
              : "Try clearing filters or searching for another locality or Metro line."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPandals.map((pandal) => (
            <PandalCard
              key={pandal.id}
              pandal={pandal}
              onViewDetails={(p) => setModalPandal(p)}
            />
          ))}
        </div>
      )}

      {/* Pandal Details Modal */}
      <PandalModal
        pandal={modalPandal}
        onClose={() => setModalPandal(null)}
      />
    </div>
  );
}

export default function PandalsDirectoryPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-stone-500 font-bengali-title text-lg">
          মণ্ডপ নির্দেশিকা লোড হচ্ছে…
        </div>
      }
    >
      <PandalsDirectoryContent />
    </Suspense>
  );
}

