"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import HeroSection from "@/components/hero/HeroSection";
import PujaCountdown from "@/components/countdown/PujaCountdown";
import PandalCard from "@/components/pandals/PandalCard";
import { SectionSkeleton, MapSkeleton } from "@/components/common/SkeletonLoader";
import AlpanaDivider from "@/components/animations/AlpanaDivider";
import PandalModal from "@/components/pandals/PandalModal";
import { PANDALS_DATA, Pandal } from "@/data/pandalsData";
import { useLanguage } from "@/context/LanguageContext";
import { Compass, MapPin, Sparkles, Route, Train, Map, ArrowRight } from "lucide-react";
// Dynamically import below-the-fold components with shimmering skeletons for instant initial load
const PlanMyPujoWizard = dynamic(() => import("@/components/wizard/PlanMyPujoWizard"), {
  loading: () => <SectionSkeleton count={2} hasHeader={false} />,
});

const ThemeExplorer = dynamic(() => import("@/components/themes/ThemeExplorer"), {
  loading: () => <SectionSkeleton count={3} />,
});

const PrebuiltRoutes = dynamic(() => import("@/components/route-builder/PrebuiltRoutes"), {
  loading: () => <SectionSkeleton count={2} hasHeader={false} />,
});

const MetroMapGuide = dynamic(() => import("@/components/metro/MetroMapGuide"), {
  loading: () => <SectionSkeleton count={2} hasHeader={false} />,
});

const InteractiveMap = dynamic(() => import("@/components/map/InteractiveMap"), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

const CultureStories = dynamic(() => import("@/components/culture/CultureStories"), {
  loading: () => <SectionSkeleton count={3} />,
});

const FoodFinder = dynamic(() => import("@/components/food/FoodFinder"), {
  loading: () => <SectionSkeleton count={3} />,
});

const PhotoGallery = dynamic(() => import("@/components/photo/PhotoGallery"), {
  loading: () => <SectionSkeleton count={4} />,
});

export default function HomePage() {
  const { language, t } = useLanguage();
  const [modalPandal, setModalPandal] = useState<Pandal | null>(null);

  const [activeFilter, setActiveFilter] = useState<string>("ALL");

  const filterOptions = [
    { key: "ALL", label: language === "bn" ? "সব মণ্ডপ (২২৭+)" : "All Pandals" },
    { key: "North Kolkata", label: language === "bn" ? "উত্তর কলকাতা" : "North Kolkata" },
    { key: "South Kolkata", label: language === "bn" ? "দক্ষিণ কলকাতা" : "South Kolkata" },
    { key: "Central Kolkata", label: language === "bn" ? "মধ্য কলকাতা" : "Central Kolkata" },
    { key: "must_visit", label: language === "bn" ? "🌟 অবশ্য দর্শনীয়" : "🌟 Must Visit" },
    { key: "theme", label: language === "bn" ? "🎨 সেরা থিম" : "🎨 Best Themes" },
  ];

  const displayedPandals = PANDALS_DATA.filter((p) => {
    if (activeFilter === "ALL") return true;
    if (activeFilter === "North Kolkata" || activeFilter === "South Kolkata" || activeFilter === "Central Kolkata") {
      return p.zone === activeFilter;
    }
    return p.category === activeFilter;
  }).slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Immersive Full-Screen Hero */}
      <HeroSection />

      {/* 2. Live Puja Countdown & Horizontal Festival Timeline */}
      <PujaCountdown />

      {/* 3. Featured Iconic Pandals Showcase */}
      <section className="py-10 sm:py-20 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 pb-4 border-b border-[#c05621]/20 gap-3">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#9b1b1b] mb-1">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span>{language === "bn" ? "কলকাতার সেরা মণ্ডপসমূহ" : "Iconic Celebrations"}</span>
            </div>
            <h2 className="font-bengali-title text-2xl sm:text-4xl font-bold text-stone-900 tracking-tight leading-tight">
              {t.pandalsHeading}
            </h2>
            <p className="text-xs sm:text-base text-stone-600 mt-1 font-medium">
              “{t.pandalsSubtitle}”
            </p>
          </div>

          <Link
            href="/pandals"
            className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-[#9b1b1b] hover:text-[#771d1d] group self-start md:self-auto bg-[#9b1b1b]/5 hover:bg-[#9b1b1b]/10 px-3.5 py-1.5 rounded-full border border-[#9b1b1b]/20 transition-colors"
          >
            <span>{language === "bn" ? "২২৭+ সব মণ্ডপ দেখুন" : "View All 227+ Pandals"}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile Quick Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 sm:mb-8 scroll-smooth no-scrollbar">
          {filterOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setActiveFilter(opt.key)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 active:scale-95 ${
                activeFilter === opt.key
                  ? "bg-[#9b1b1b] text-white shadow-md border border-[#9b1b1b]"
                  : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-300/80 shadow-sm"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {displayedPandals.map((pandal) => (
            <PandalCard
              key={pandal.id}
              pandal={pandal}
              onViewDetails={(p) => setModalPandal(p)}
            />
          ))}
        </div>
      </section>

      {/* 4. Plan My Pujo Interactive Wizard */}
      <section className="py-12 sm:py-16 bg-[#f7f1e6]/60 border-y border-[#c05621]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PlanMyPujoWizard />
        </div>
      </section>

      {/* 5. Theme Explorer Section */}
      <ThemeExplorer onViewDetails={(p) => setModalPandal(p)} />

      {/* 6. Pre-built Curated Routes */}
      <section className="py-16 sm:py-20 bg-stone-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-[#9b1b1b]/15 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#d4af37] mb-1">
              <Route className="w-4 h-4 text-[#d4af37]" />
              <span>{language === "bn" ? "বিশেষজ্ঞদের প্রস্তুতকৃত রুট" : "Curated Editorial Journeys"}</span>
            </div>
            <h2 className="font-bengali-title text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              {language === "bn" ? "জনপ্রিয় পুজোর পরিক্রমা" : "Pre-Built Pujo Routes"}
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-2 font-medium max-w-xl mx-auto">
              {language === "bn"
                ? "উত্তর কলকাতার অলিগলি থেকে দক্ষিণ কলকাতার আলো—আপনার জন্য সাজানো শ্রেষ্ঠ রুট।"
                : "Hand-picked itineraries designed to minimize crowd fatigue and maximize celebration."}
            </p>
            <AlpanaDivider variant="gold" className="my-5 max-w-sm" />
          </div>

          {/* AI Route Detector Callout Banner */}
          <div className="mb-10 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#9b1b1b]/40 via-[#1e1414] to-[#c05621]/30 border border-[#d4af37]/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-[#9b1b1b] border border-[#d4af37]/60 flex items-center justify-center flex-shrink-0 shadow-md">
                <Sparkles className="w-6 h-6 text-[#d4af37]" />
              </div>
              <div className="text-left">
                <h3 className="font-bengali-title text-base sm:text-xl font-bold text-white">
                  {language === "bn" ? "নিজস্ব কাস্টম এআই রুট তৈরি করতে চান?" : "Want a Personalized AI Route?"}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300">
                  {language === "bn"
                    ? "আপনার সময়, স্টার্টিং হাব ও পছন্দের মণ্ডপ অনুযায়ী ভিড়-মুক্ত স্মার্ট রুট বানিয়ে নিন।"
                    : "Generate an optimized crowd-aware itinerary from any Kolkata hub in 1 tap."}
                </p>
              </div>
            </div>
            <Link
              href="/routes"
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-[#9b1b1b] hover:bg-[#771d1d] text-white text-xs sm:text-sm font-bold shadow-lg transition-all border border-[#d4af37]/60 whitespace-nowrap active:scale-95 flex-shrink-0"
            >
              <span>{language === "bn" ? "এআই রুট ডিটেক্টর ট্রাই করুন" : "Launch AI Route Detector"}</span>
              <ArrowRight className="w-4 h-4 text-[#d4af37]" />
            </Link>
          </div>

          <PrebuiltRoutes />
        </div>
      </section>

      {/* 7. Metro Navigator Guide */}
      <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <MetroMapGuide onViewDetails={(p) => setModalPandal(p)} />
      </div>

      {/* 8. Full-Width Interactive City Map */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#9b1b1b] mb-1">
            <Map className="w-4 h-4 text-[#c05621]" />
            <span>{language === "bn" ? "ইন্টারেক্টিভ ভৌগোলিক মানচিত্র" : "Interactive Pandal Map"}</span>
          </div>
          <h2 className="font-bengali-title text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            {language === "bn" ? "মানচিত্রে খুঁজুন আপনার মণ্ডপ" : "Explore the City on Map"}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 font-medium">
            {language === "bn"
              ? "লাল = অবশ্য দর্শনীয় | সোনালী = থিম | সাদা = সাবেকি | কালো = বনেদি বাড়ি"
              : "Red = Must Visit | Gold = Theme | White = Traditional | Black = Heritage"}
          </p>
        </div>

        <InteractiveMap onViewDetails={(p) => setModalPandal(p)} />
      </section>

      {/* 9. Bengali Culture Storytelling */}
      <CultureStories />

      {/* 10. Kolkata Pujo Food Finder */}
      <FoodFinder />

      {/* 11. Instagram-Style Photo Mode */}
      <PhotoGallery />

      {/* Details Modal */}
      <PandalModal
        pandal={modalPandal}
        onClose={() => setModalPandal(null)}
      />
    </div>
  );
}

