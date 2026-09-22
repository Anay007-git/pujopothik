"use client";

import React, { useEffect } from "react";
import { useCompanion, CompanionTab } from "@/context/CompanionContext";
import { useLanguage } from "@/context/LanguageContext";
import BudgetTracker from "./BudgetTracker";
import StepCounter from "./StepCounter";
import PujoDiaryView from "./PujoDiaryView";
import PujoMitraChat from "@/components/ai/PujoMitraChat";
import {
  X,
  Wallet,
  Footprints,
  BookOpen,
  Sparkles,
  Bot,
} from "lucide-react";

export default function PujoCompanionModal() {
  const { language } = useLanguage();
  const {
    isCompanionOpen,
    setIsCompanionOpen,
    activeTab,
    setActiveTab,
    visitedPandals,
    steps,
    totalSpent,
    targetBudget,
  } = useCompanion();

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsCompanionOpen(false);
    };
    if (isCompanionOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCompanionOpen, setIsCompanionOpen]);

  if (!isCompanionOpen) return null;

  const tabs: Array<{ key: CompanionTab; label: string; icon: React.ElementType; badge?: string | number }> = [
    {
      key: "budget",
      label: language === "bn" ? "বাজেট ও খরচ" : "Budget & Spend",
      icon: Wallet,
      badge: `₹${totalSpent}`,
    },
    {
      key: "steps",
      label: language === "bn" ? "স্টেপ ট্র্যাকার" : "Step Counter",
      icon: Footprints,
      badge: steps > 0 ? steps.toLocaleString() : undefined,
    },
    {
      key: "diary",
      label: language === "bn" ? "আমার ডায়েরি" : "Pujo Diary",
      icon: BookOpen,
      badge: visitedPandals.length > 0 ? visitedPandals.length : undefined,
    },
    {
      key: "ai",
      label: language === "bn" ? "পুজো মিত্র AI" : "Pujo Mitra AI",
      icon: Sparkles,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-2 sm:p-4 bg-black/65 backdrop-blur-sm animate-fadeIn"
      onClick={() => setIsCompanionOpen(false)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-2xl bg-[#faf7ee] rounded-3xl shadow-2xl border border-[#c05621]/30 flex flex-col max-h-[92vh] sm:max-h-[88vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="px-5 py-4 border-b border-[#c05621]/20 bg-[#f4ede0]/90 flex items-center justify-between flex-shrink-0">
          <div>
            <div className="text-[10px] font-bold text-[#8c6246] uppercase tracking-widest font-bengali-sans">
              {language === "bn" ? "শারদ সঙ্গী ২০২৬" : "Pujo Pathik Companion Hub"}
            </div>
            <h2 className="font-bengali-title text-lg sm:text-xl font-bold text-stone-900 leading-tight">
              {activeTab === "budget"
                ? language === "bn" ? "পুজোর বাজেট ও খরচ হিসাব" : "Pujo Budget & Expense Planner"
                : activeTab === "steps"
                ? language === "bn" ? "স্টেপ কাউন্টার ও ফুড বার্নার" : "Step Counter & Food Calorie Burner"
                : activeTab === "diary"
                ? language === "bn" ? "আমার শারদ ডায়েরি ও চেকলিস্ট" : "Personal Pujo Diary & Visited Bucket"
                : language === "bn" ? "পুজো মিত্র — শারদ এআই গাইড" : "Pujo Mitra — Smart Festive AI Concierge"}
            </h2>
          </div>

          <button
            onClick={() => setIsCompanionOpen(false)}
            className="p-2 rounded-full text-stone-600 hover:text-[#9b1b1b] hover:bg-stone-200/60 transition-colors"
            aria-label="Close companion modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Interactive Hub Tabs Bar */}
        <div className="grid grid-cols-4 bg-stone-100/90 border-b border-stone-200 p-1.5 gap-1 flex-shrink-0">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex flex-col sm:flex-row items-center justify-center py-2 px-1.5 sm:px-3 rounded-2xl text-xs font-bold transition-all relative ${
                  isActive
                    ? "bg-[#9b1b1b] text-white shadow-md"
                    : "text-stone-700 hover:text-[#9b1b1b] hover:bg-white/60"
                }`}
              >
                <Icon className={`w-4 h-4 mb-0.5 sm:mb-0 sm:mr-1.5 ${isActive ? "text-[#d4af37]" : ""}`} />
                <span className="font-bengali-title text-[11px] sm:text-xs truncate">{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`hidden sm:inline-block ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                      isActive ? "bg-white/20 text-white" : "bg-[#9b1b1b]/10 text-[#9b1b1b]"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Panel */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {activeTab === "budget" && <BudgetTracker />}
          {activeTab === "steps" && <StepCounter />}
          {activeTab === "diary" && <PujoDiaryView />}
          {activeTab === "ai" && <PujoMitraChat />}
        </div>
      </div>
    </div>
  );
}

