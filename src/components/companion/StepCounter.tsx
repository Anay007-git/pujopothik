"use client";

import React, { useState } from "react";
import { useCompanion } from "@/context/CompanionContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  Footprints,
  Flame,
  Award,
  Share2,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Copy,
} from "lucide-react";

export default function StepCounter() {
  const { language } = useLanguage();
  const {
    steps,
    distanceKm,
    caloriesBurned,
    foodBurner,
    incrementSteps,
    resetSteps,
    isPedometerActive,
    togglePedometer,
  } = useCompanion();

  const [copied, setCopied] = useState(false);

  // Milestones
  const badges = [
    { name: "First Hop", bengaliName: "শুভ পরিক্রমা", minSteps: 2000, icon: "🌸", desc: "Started the festive walk" },
    { name: "Pandal Hopper", bengaliName: "পদব্রজে পরিক্রমা", minSteps: 5000, icon: "🥉", desc: "Walked 5,000+ steps" },
    { name: "Night Walker", bengaliName: "শারদ নাইট ওয়াকার", minSteps: 10000, icon: "🥈", desc: "Walked 10,000+ steps" },
    { name: "Mahamaya Marathoner", bengaliName: "মহামায়া ম্যারাথনার", minSteps: 20000, icon: "🥇", desc: "Walked 20,000+ steps" },
    { name: "City Legend", bengaliName: "শহুরে পথিক মহাবীর", minSteps: 30000, icon: "🏆", desc: "Grand master of Kolkata streets" },
  ];

  // Biryani next plate progress (650 kcal)
  const biryaniProgress = Math.min(100, Math.round(((caloriesBurned % 650) / 650) * 100));

  const handleShare = () => {
    const text =
      language === "bn"
        ? `🌸 পুজো পথিক ২০২৬ পরিক্রমা আপডেট!\nআজ হেঁটেছি ${steps.toLocaleString()} ধাপ (${distanceKm} কিমি)।\nপুড়লো ${caloriesBurned} ক্যালোরি = ${foodBurner.phuchkas}টি ফুচকা 🥟 বা ${foodBurner.biryaniPlates} প্লেট কলকাতা বিরিয়ানি 🍛!\nআপনার পুজো রুট ট্র্যাক করুন: http://localhost:3000`
        : `🌸 Pujo Pathik 2026 Pandal Hopping!\nWalked ${steps.toLocaleString()} steps (${distanceKm} km) tonight.\nBurned ${caloriesBurned} kcal = ${foodBurner.phuchkas} Phuchkas 🥟 or ${foodBurner.biryaniPlates} plates of Kolkata Biryani 🍛!\nPlan your smart route: http://localhost:3000`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Main Step Gauge Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-[#9b1b1b] via-[#771d1d] to-[#1e1414] text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-radial-gradient from-[#d4af37]/20 to-transparent pointer-events-none" />

        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-[#d4af37] font-bold">
            <Footprints className="w-3.5 h-3.5" />
            <span>{language === "bn" ? "লাইভ পেডোমিটার ও দূরত্ব" : "Live Pedometer & Distance"}</span>
          </div>

          <button
            onClick={togglePedometer}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow ${
              isPedometerActive
                ? "bg-emerald-500 text-white animate-pulse"
                : "bg-white/15 text-white hover:bg-white/25"
            }`}
          >
            {isPedometerActive ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{isPedometerActive ? (language === "bn" ? "ট্র্যাকিং চলছে" : "Tracking Active") : (language === "bn" ? "স্টার্ট করুন" : "Start Sensor")}</span>
          </button>
        </div>

        {/* Big Step Number Display */}
        <div className="text-center py-2 relative z-10">
          <div className="text-5xl sm:text-6xl font-black font-bengali-sans tracking-tight text-white drop-shadow-md">
            {steps.toLocaleString()}
          </div>
          <div className="text-xs sm:text-sm font-semibold text-stone-300 mt-1 uppercase tracking-widest">
            {language === "bn" ? "পদক্ষেপ সম্পন্ন" : "Total Steps Walked"}
          </div>
        </div>

        {/* Sub Metrics: Distance, Calories, Active Time */}
        <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-white/15 text-center relative z-10">
          <div className="p-2 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-[10px] text-stone-300 uppercase font-bold">{language === "bn" ? "দূরত্ব" : "Distance"}</div>
            <div className="text-lg font-black text-[#d4af37] font-bengali-sans">{distanceKm} km</div>
          </div>
          <div className="p-2 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-[10px] text-stone-300 uppercase font-bold">{language === "bn" ? "ক্যালোরি" : "Calories"}</div>
            <div className="text-lg font-black text-amber-400 font-bengali-sans">{caloriesBurned} kcal</div>
          </div>
          <div className="p-2 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-[10px] text-stone-300 uppercase font-bold">{language === "bn" ? "হাঁটার সময়" : "Walk Time"}</div>
            <div className="text-lg font-black text-stone-200 font-bengali-sans">
              {Math.round(steps / 100)} {language === "bn" ? "মিনিট" : "mins"}
            </div>
          </div>
        </div>

        {/* Step Simulator & Reset Action Bar */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10 relative z-10">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => incrementSteps(500)}
              className="px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-[11px] font-bold text-white transition-all active:scale-95"
            >
              +500 {language === "bn" ? "ধাপ" : "Steps"}
            </button>
            <button
              onClick={() => incrementSteps(2000)}
              className="px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-[11px] font-bold text-white transition-all active:scale-95"
            >
              +2,000 {language === "bn" ? "ধাপ" : "Steps"}
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg bg-[#d4af37] hover:bg-amber-400 text-stone-950 font-bold transition-all flex items-center space-x-1 text-xs px-2.5 active:scale-95"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-stone-900" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (language === "bn" ? "কপি হয়েছে!" : "Copied!") : (language === "bn" ? "শেয়ার কার্ড" : "Share")}</span>
            </button>
            <button
              onClick={resetSteps}
              title="Reset Steps"
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-stone-300 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Fun Kolkata Food Calorie Burner */}
      <div className="p-5 rounded-3xl bg-[#faf7ee] border border-[#c05621]/25 shadow-sm space-y-4">
        <div className="flex items-center space-x-2">
          <Flame className="w-5 h-5 text-orange-600" />
          <h4 className="font-bengali-title text-base font-bold text-stone-900 leading-tight">
            {language === "bn" ? "কলকাতা ফুড ক্যালোরি বার্নার" : "Kolkata Food Calorie Burner"}
          </h4>
        </div>
        <p className="text-xs text-stone-600 font-medium">
          {language === "bn"
            ? "আপনার হাঁটার পরিক্রমায় পুড়লো কলকাতার সেরা খাওয়ার ক্যালোরি!"
            : "Convert your pedestrian endurance into delicious street delicacies!"}
        </p>

        {/* Food Conversion Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="p-3 rounded-2xl bg-white border border-stone-200 text-center shadow-xs">
            <span className="text-2xl">🥟</span>
            <div className="text-lg font-black text-[#9b1b1b] mt-1 font-bengali-sans">
              {foodBurner.phuchkas}
            </div>
            <div className="text-[10px] text-stone-500 font-bold font-bengali-title">
              {language === "bn" ? "টি ফুচকা" : "Phuchkas"}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white border border-stone-200 text-center shadow-xs">
            <span className="text-2xl">🍛</span>
            <div className="text-lg font-black text-[#9b1b1b] mt-1 font-bengali-sans">
              {foodBurner.biryaniPlates}
            </div>
            <div className="text-[10px] text-stone-500 font-bold font-bengali-title">
              {language === "bn" ? "প্লেট বিরিয়ানি" : "Biryani Plates"}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white border border-stone-200 text-center shadow-xs">
            <span className="text-2xl">🌯</span>
            <div className="text-lg font-black text-[#9b1b1b] mt-1 font-bengali-sans">
              {foodBurner.rolls}
            </div>
            <div className="text-[10px] text-stone-500 font-bold font-bengali-title">
              {language === "bn" ? "টি কাঠি রোল" : "Kathi Rolls"}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white border border-stone-200 text-center shadow-xs">
            <span className="text-2xl">🥥</span>
            <div className="text-lg font-black text-[#9b1b1b] mt-1 font-bengali-sans">
              {foodBurner.daabSherbet}
            </div>
            <div className="text-[10px] text-stone-500 font-bold font-bengali-title">
              {language === "bn" ? "গ্লাস ডাব শরবত" : "Daab Sherbets"}
            </div>
          </div>
        </div>

        {/* Progress Towards Next Biryani */}
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-1.5">
          <div className="flex justify-between text-xs font-bold text-stone-800">
            <span>
              {language === "bn"
                ? `পরবর্তী ১ প্লেট বিরিয়ানি পুড়তে আর ${650 - (caloriesBurned % 650)} kcal বাকি!`
                : `${650 - (caloriesBurned % 650)} kcal to burn your next Plate of Biryani!`}
            </span>
            <span className="text-[#9b1b1b]">{biryaniProgress}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-amber-200 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-[#9b1b1b] rounded-full transition-all duration-500"
              style={{ width: `${biryaniProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3. Sharod Milestone Achievement Badges */}
      <div>
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
          <Award className="w-4 h-4 text-[#d4af37]" />
          <span>{language === "bn" ? "শারদ মাইলস্টোন ব্যাজ" : "Festival Milestone Badges"}</span>
        </div>

        <div className="space-y-2">
          {badges.map((badge, idx) => {
            const unlocked = steps >= badge.minSteps;
            return (
              <div
                key={idx}
                className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                  unlocked
                    ? "bg-white border-[#d4af37]/60 shadow-sm"
                    : "bg-stone-100/60 border-stone-200 opacity-60"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-xs ${
                      unlocked ? "bg-amber-100 border border-amber-300" : "bg-stone-200"
                    }`}
                  >
                    {badge.icon}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900 font-bengali-title flex items-center space-x-1.5">
                      <span>{language === "bn" ? badge.bengaliName : badge.name}</span>
                      {unlocked && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold">
                          {language === "bn" ? "আনলকড" : "Unlocked"}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-stone-500">{badge.desc} ({badge.minSteps.toLocaleString()} steps)</div>
                  </div>
                </div>

                <div className="text-xs font-bold text-stone-400 font-bengali-sans">
                  {unlocked ? "✓" : `${Math.round((steps / badge.minSteps) * 100)}%`}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

