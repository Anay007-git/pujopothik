"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import AlpanaDivider from "@/components/animations/AlpanaDivider";
import PandalModal from "@/components/pandals/PandalModal";
import { Pandal } from "@/data/pandalsData";
import { useLanguage } from "@/context/LanguageContext";
import { Map as MapIcon } from "lucide-react";

const InteractiveMap = dynamic(
  () => import("@/components/map/InteractiveMap"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[80vh] rounded-3xl bg-[#18181c] flex items-center justify-center text-stone-400">
        <div className="flex flex-col items-center space-y-3">
          <MapIcon className="w-8 h-8 text-[#d4af37] animate-pulse" />
          <span className="text-sm font-medium">কলকাতার ইন্টারেক্টিভ মানচিত্র প্রস্তুত হচ্ছে…</span>
        </div>
      </div>
    ),
  }
);

export default function MapPage() {
  const { language } = useLanguage();
  const [modalPandal, setModalPandal] = useState<Pandal | null>(null);

  return (
    <div className="py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-6">
        <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#9b1b1b] mb-1">
          <MapIcon className="w-4 h-4 text-[#c05621]" />
          <span>{language === "bn" ? "ভৌগোলিক মণ্ডপ নির্দেশিকা" : "Kolkata City Map"}</span>
        </div>
        <h1 className="font-bengali-title text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
          {language === "bn" ? "কলকাতার ইন্টারেক্টিভ পুজো মানচিত্র" : "Interactive Pandal Map 2026"}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 font-medium">
          {language === "bn"
            ? "যে কোনো মার্কার স্পর্শ করে মণ্ডপের বিবরণ দেখুন এবং সরাসরি নিজের রুটে যোগ করুন।"
            : "Click any custom Durga-eye marker to inspect pandal details, Metro distance, and add to your route."}
        </p>
        <AlpanaDivider variant="red" className="my-4 max-w-sm" />
      </div>

      <InteractiveMap onViewDetails={(p) => setModalPandal(p)} />

      <PandalModal
        pandal={modalPandal}
        onClose={() => setModalPandal(null)}
      />
    </div>
  );
}

