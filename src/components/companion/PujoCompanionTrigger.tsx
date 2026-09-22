"use client";

import React from "react";
import { useCompanion } from "@/context/CompanionContext";
import { useLanguage } from "@/context/LanguageContext";
import { Wallet, Footprints, Sparkles, BookOpen } from "lucide-react";

export default function PujoCompanionTrigger() {
  const { language } = useLanguage();
  const { openCompanionWithTab, totalSpent, targetBudget, steps, visitedPandals } = useCompanion();

  return (
    <div className="fixed bottom-20 left-4 z-40">
      <button
        onClick={() => openCompanionWithTab("budget")}
        className="flex items-center space-x-2 px-3.5 py-2 rounded-full bg-gradient-to-r from-[#9b1b1b] to-[#771d1d] text-white shadow-xl hover:from-[#771d1d] hover:to-[#9b1b1b] active:scale-95 transition-all border border-[#d4af37]/40 backdrop-blur-md group"
        aria-label="Open Pujo Companion Hub"
      >
        <div className="flex items-center space-x-1.5 border-r border-white/20 pr-2">
          <Wallet className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="text-[11px] font-bold font-bengali-sans">₹{totalSpent}</span>
        </div>

        <div className="flex items-center space-x-1 border-r border-white/20 pr-2">
          <Footprints className="w-3.5 h-3.5 text-amber-300" />
          <span className="text-[11px] font-bold font-bengali-sans">{steps.toLocaleString()}</span>
        </div>

        <div className="flex items-center space-x-1 pl-0.5 text-[#d4af37]">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span className="text-[11px] font-bold hidden sm:inline font-bengali-title">
            {language === "bn" ? "পুজো সঙ্গী" : "Companion"}
          </span>
        </div>
      </button>
    </div>
  );
}

