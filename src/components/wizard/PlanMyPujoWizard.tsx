"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useRoute } from "@/context/RouteContext";
import { PANDALS_DATA, Pandal } from "@/data/pandalsData";
import AlpanaDivider from "@/components/animations/AlpanaDivider";
import {
  Clock,
  Sparkles,
  Train,
  MapPin,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Navigation,
  Compass,
} from "lucide-react";

interface WizardAnswers {
  hours: "2h" | "4h" | "6h" | "full_night";
  preference: "themes" | "traditional" | "heritage" | "family" | "food" | "less_crowded";
  transport: "metro" | "car" | "public" | "walk";
  startingHub: string;
}

export default function PlanMyPujoWizard() {
  const { language, t } = useLanguage();
  const { loadPrebuiltRoute } = useRoute();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [answers, setAnswers] = useState<WizardAnswers>({
    hours: "4h",
    preference: "themes",
    transport: "metro",
    startingHub: "Shyambazar",
  });
  const [generatedResult, setGeneratedResult] = useState<{
    title: string;
    bengaliTitle: string;
    duration: string;
    description: string;
    pandals: Pandal[];
  } | null>(null);

  // Question 1: Hours
  const hourOptions = [
    { key: "2h" as const, label: language === "bn" ? "২ ঘণ্টা (দ্রুত দর্শন)" : "2 Hours (Quick Hop)", desc: "2-3 pandals in one cluster" },
    { key: "4h" as const, label: language === "bn" ? "৪ ঘণ্টা (সন্ধ্যার ভ্রমণ)" : "4 Hours (Evening Stroll)", desc: "4-5 iconic pandals" },
    { key: "6h" as const, label: language === "bn" ? "৬ ঘণ্টা (বিশাল সার্কিট)" : "6 Hours (Grand Circuit)", desc: "5-6 premier pandals" },
    { key: "full_night" as const, label: language === "bn" ? "সারা রাত (নিশাচর আড্ডা)" : "Full Night (All-Night Adda)", desc: "Complete cross-city experience" },
  ];

  // Question 2: Preferences
  const prefOptions = [
    { key: "themes" as const, label: language === "bn" ? "স্থাপত্য ও থিম মণ্ডপ" : "Theme Wonders", desc: "Avant-garde installations & lights" },
    { key: "traditional" as const, label: language === "bn" ? "সাবেকি প্রতিমা ও ডাকের সাজ" : "Traditional Sabeki", desc: "Classic Daker Saaj & serenity" },
    { key: "heritage" as const, label: language === "bn" ? "বনেদি বাড়ির ঐতিহ্য" : "Heritage Bonedi Bari", desc: "200+ year aristocratic rituals" },
    { key: "food" as const, label: language === "bn" ? "খাওয়া-দাওয়া ও আড্ডা" : "Food & Street Adda", desc: "Kathi rolls, biryani & tea stalls" },
    { key: "family" as const, label: language === "bn" ? "পরিবার ও শিশুদের জন্য" : "Family Friendly", desc: "Spacious grounds, easier queues" },
    { key: "less_crowded" as const, label: language === "bn" ? "কম ভিড় ও শান্তিপূর্ণ" : "Less Crowded", desc: "Soulful art without massive lines" },
  ];

  // Question 3: Transport
  const transportOptions = [
    { key: "metro" as const, label: language === "bn" ? "মেট্রো ও অল্প হাঁটা" : "Metro & Walking", desc: "Fastest, avoids road blockades" },
    { key: "car" as const, label: language === "bn" ? "ব্যক্তিগত গাড়ি / ক্যাব" : "Car / Cab", desc: "Comfortable for long distances" },
    { key: "public" as const, label: language === "bn" ? "বাস ও অটো রিকশা" : "Public Transit & Auto", desc: "Authentic local Kolkata hopping" },
    { key: "walk" as const, label: language === "bn" ? "পায়ে হেঁটে পরিক্রমা" : "Pure Heritage Walk", desc: "Discover alleys & street life" },
  ];

  // Question 4: Starting Point
  const hubOptions = [
    { key: "Shyambazar", label: language === "bn" ? "শ্যামবাজার (উত্তর কলকাতা)" : "Shyambazar (North Kolkata)" },
    { key: "Kalighat", label: language === "bn" ? "কালীঘাট / রাসবিহারী (দক্ষিণ)" : "Kalighat / Gariahat (South)" },
    { key: "Central", label: language === "bn" ? "এম জি রোড / কলেজ স্ট্রিট (মধ্য)" : "MG Road / College St (Central)" },
    { key: "SaltLake", label: language === "bn" ? "সল্টলেক করুণাময়ী (পূর্ব কলকাতা)" : "Salt Lake (East Kolkata)" },
    { key: "Howrah", label: language === "bn" ? "হাওড়া স্টেশন / গঙ্গার ঘাট" : "Howrah Station / River Ghats" },
  ];

  // Smart route generator algorithm
  const handleGenerate = () => {
    let candidateIds: string[] = [];
    let title = "";
    let bengaliTitle = "";

    if (answers.startingHub === "Shyambazar" || answers.startingHub === "Howrah") {
      if (answers.preference === "heritage" || answers.preference === "traditional") {
        candidateIds = ["shobhabazar-rajbari", "bagbazar-sarbojanin", "kumartuli-park", "jagat-mukherjee-park"];
        title = "North Kolkata Heritage & Riverfront Circuit";
        bengaliTitle = "উত্তর কলকাতার বনেদি ও গঙ্গার ঘাট সার্কিট";
      } else {
        candidateIds = ["tala-prattoy", "jagat-mukherjee-park", "kumartuli-park", "sreebhumi-sporting-club"];
        title = "North Kolkata Conceptual & Theme Trail";
        bengaliTitle = "উত্তর কলকাতার থিম ও স্থাপত্য পরিক্রমা";
      }
    } else if (answers.startingHub === "SaltLake") {
      candidateIds = ["fd-block-salt-lake", "bj-block-salt-lake", "sreebhumi-sporting-club"];
      title = "Salt Lake & VIP Road Mega Pavilion Route";
      bengaliTitle = "সল্টলেক ও ভিআইপি রোড মেগা প্যাভিলিয়ন রুট";
    } else if (answers.startingHub === "Central") {
      candidateIds = ["college-square", "muhammad-ali-park", "santosh-mitra-square", "chorebagan-sarbojanin"];
      title = "Central Kolkata Heritage & Light Trail";
      bengaliTitle = "মধ্য কলকাতার ঐতিহ্য ও আলোকমাঙ্গল্য রুট";
    } else {
      // South Kolkata default
      if (answers.preference === "family" || answers.preference === "less_crowded") {
        candidateIds = ["alipore-sarbojanin", "samaj-sebi-sangha", "hindusthan-park"];
        title = "South Kolkata Relaxed Family Route";
        bengaliTitle = "দক্ষিণ কলকাতার শান্ত পারিবারিক রুট";
      } else {
        candidateIds = ["ekdalia-evergreen", "hindusthan-park", "deshapriya-park", "suruchi-sangha"];
        title = "South Kolkata Premier Pujo Trail";
        bengaliTitle = "দক্ষিণ কলকাতার জমকালো পুজো রুট";
      }
    }

    // Limit based on hours
    if (answers.hours === "2h") {
      candidateIds = candidateIds.slice(0, 2);
    } else if (answers.hours === "4h") {
      candidateIds = candidateIds.slice(0, 4);
    }

    const selectedPandals = candidateIds
      .map((id) => PANDALS_DATA.find((p) => p.id === id))
      .filter((p): p is Pandal => Boolean(p));

    setGeneratedResult({
      title,
      bengaliTitle,
      duration: answers.hours === "2h" ? "2 Hours" : answers.hours === "4h" ? "4 Hours" : "6+ Hours",
      description: "Optimized for minimal transit delay and seamless Metro transitions.",
      pandals: selectedPandals,
    });
  };

  const handleReset = () => {
    setCurrentStep(1);
    setGeneratedResult(null);
  };

  return (
    <div className="bg-[#faf7ee] rounded-3xl border border-[#c05621]/20 shadow-xl p-6 sm:p-8 max-w-4xl mx-auto">
      {/* Wizard Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#9b1b1b] mb-1">
          <Sparkles className="w-4 h-4 text-[#d4af37]" />
          <span>{language === "bn" ? "ইন্টারেক্টিভ রুট সহকারী" : "Smart Itinerary Assistant"}</span>
        </div>
        <h3 className="font-bengali-title text-2xl sm:text-3xl font-bold text-stone-900">
          {t.planMyPujoTitle}
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-md mx-auto">
          {t.planMyPujoSubtitle}
        </p>
      </div>

      {!generatedResult ? (
        <div>
          {/* Step Progress Indicators */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentStep === step
                    ? "w-10 bg-[#9b1b1b]"
                    : currentStep > step
                    ? "w-6 bg-emerald-700"
                    : "w-6 bg-stone-200"
                }`}
              />
            ))}
          </div>

          {/* Step 1: Hours */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <h4 className="font-bengali-title text-lg font-bold text-stone-900 text-center mb-4">
                {language === "bn"
                  ? "১. পুজো দেখার জন্য আপনার হাতে কত সময় আছে?"
                  : "Step 1: How many hours do you have?"}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {hourOptions.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setAnswers({ ...answers, hours: opt.key })}
                    className={`p-4 rounded-2xl text-left border transition-all ${
                      answers.hours === opt.key
                        ? "border-[#9b1b1b] bg-[#9b1b1b]/10 text-stone-900 shadow-sm"
                        : "border-stone-200 bg-white hover:bg-stone-50 text-stone-700"
                    }`}
                  >
                    <span className="font-bold block text-sm sm:text-base">
                      {opt.label}
                    </span>
                    <span className="text-xs text-stone-500 mt-0.5 block">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Preference */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <h4 className="font-bengali-title text-lg font-bold text-stone-900 text-center mb-4">
                {language === "bn"
                  ? "২. আপনার পছন্দের দর্শনীয় অভিজ্ঞতা কেমন?"
                  : "Step 2: What is your preferred festival vibe?"}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {prefOptions.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setAnswers({ ...answers, preference: opt.key })}
                    className={`p-4 rounded-2xl text-left border transition-all ${
                      answers.preference === opt.key
                        ? "border-[#9b1b1b] bg-[#9b1b1b]/10 text-stone-900 shadow-sm"
                        : "border-stone-200 bg-white hover:bg-stone-50 text-stone-700"
                    }`}
                  >
                    <span className="font-bold block text-sm sm:text-base">
                      {opt.label}
                    </span>
                    <span className="text-xs text-stone-500 mt-0.5 block">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Transport */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <h4 className="font-bengali-title text-lg font-bold text-stone-900 text-center mb-4">
                {language === "bn"
                  ? "৩. কীভাবে যাতায়াত করতে পছন্দ করবেন?"
                  : "Step 3: What is your primary mode of transit?"}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {transportOptions.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setAnswers({ ...answers, transport: opt.key })}
                    className={`p-4 rounded-2xl text-left border transition-all ${
                      answers.transport === opt.key
                        ? "border-[#9b1b1b] bg-[#9b1b1b]/10 text-stone-900 shadow-sm"
                        : "border-stone-200 bg-white hover:bg-stone-50 text-stone-700"
                    }`}
                  >
                    <span className="font-bold block text-sm sm:text-base">
                      {opt.label}
                    </span>
                    <span className="text-xs text-stone-500 mt-0.5 block">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Starting Hub */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-fadeIn">
              <h4 className="font-bengali-title text-lg font-bold text-stone-900 text-center mb-4">
                {language === "bn"
                  ? "৪. কোথা থেকে পুজো পরিক্রমা শুরু করবেন?"
                  : "Step 4: Where will you start your journey?"}
              </h4>
              <div className="grid grid-cols-1 gap-2.5 max-w-lg mx-auto">
                {hubOptions.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setAnswers({ ...answers, startingHub: opt.key })}
                    className={`p-3.5 rounded-2xl text-left border transition-all flex items-center justify-between ${
                      answers.startingHub === opt.key
                        ? "border-[#9b1b1b] bg-[#9b1b1b]/10 text-stone-900 shadow-sm"
                        : "border-stone-200 bg-white hover:bg-stone-50 text-stone-700"
                    }`}
                  >
                    <span className="font-bold text-sm">{opt.label}</span>
                    <MapPin className="w-4 h-4 text-[#c05621]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step Navigation Buttons */}
          <div className="flex items-center justify-between pt-8 border-t border-stone-200 mt-8">
            <button
              disabled={currentStep === 1}
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:text-stone-900 disabled:opacity-30"
            >
              ← {language === "bn" ? "আগের প্রশ্ন" : "Previous"}
            </button>

            {currentStep < 4 ? (
              <button
                onClick={() => setCurrentStep((prev) => prev + 1)}
                className="flex items-center space-x-1.5 px-6 py-2.5 rounded-xl bg-[#9b1b1b] text-white text-xs sm:text-sm font-bold shadow-md hover:bg-[#771d1d]"
              >
                <span>{language === "bn" ? "পরবর্তী" : "Next"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleGenerate}
                className="flex items-center space-x-2 px-7 py-3 rounded-xl bg-gradient-to-r from-[#9b1b1b] to-[#c05621] text-white text-xs sm:text-sm font-bold shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                <span>{language === "bn" ? "আমার রুট তৈরি করুন" : "Generate My Route"}</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Generated Result Card */
        <div className="space-y-6 animate-fadeIn">
          <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50 to-[#faf7ee] border-2 border-[#9b1b1b]/30">
            <div className="flex items-center justify-between mb-2">
              <span className="px-3 py-1 rounded-full bg-[#9b1b1b] text-white text-xs font-bold">
                {generatedResult.duration} Curated Itinerary
              </span>
              <button
                onClick={handleReset}
                className="flex items-center space-x-1 text-xs font-semibold text-stone-500 hover:text-[#9b1b1b]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{language === "bn" ? "পুনরায় তৈরি করুন" : "Re-plan"}</span>
              </button>
            </div>

            <h4 className="font-bengali-title text-2xl font-bold text-stone-900 mb-1">
              {language === "bn" ? generatedResult.bengaliTitle : generatedResult.title}
            </h4>
            <p className="text-xs text-stone-600 mb-4">{generatedResult.description}</p>

            {/* Sequence of stops */}
            <div className="space-y-3 pt-2 border-t border-stone-200">
              {generatedResult.pandals.map((pandal, idx) => (
                <div
                  key={pandal.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-stone-200 shadow-sm"
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-7 h-7 rounded-full bg-[#9b1b1b] text-white text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <div>
                      <h5 className="font-bold text-sm text-stone-900">
                        {language === "bn" ? pandal.bengaliName : pandal.name}
                      </h5>
                      <p className="text-xs text-[#c05621] font-medium">
                        Theme: {pandal.theme} • {pandal.area}
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-lg">
                    {pandal.nearestMetro.station}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTA */}
          <button
            onClick={() => loadPrebuiltRoute(generatedResult.pandals.map((p) => p.id))}
            className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 rounded-2xl bg-[#9b1b1b] hover:bg-[#771d1d] text-white text-sm font-bold shadow-xl transition-all"
          >
            <Compass className="w-4 h-4 text-[#d4af37]" />
            <span>
              {language === "bn"
                ? "এই রুটটি আমার রুটে লোড করুন ও ম্যাপে দেখুন"
                : "Load Into Route Builder & Open Maps"}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

