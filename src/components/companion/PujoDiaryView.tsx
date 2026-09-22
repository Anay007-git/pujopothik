"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCompanion } from "@/context/CompanionContext";
import { useLanguage } from "@/context/LanguageContext";
import { PANDALS_DATA, Pandal } from "@/data/pandalsData";
import {
  BookOpen,
  CheckCircle2,
  Star,
  Sparkles,
  MapPin,
  Train,
  Share2,
  Copy,
  ArrowRight,
} from "lucide-react";

export default function PujoDiaryView() {
  const { language } = useLanguage();
  const {
    visitedPandals,
    toggleVisited,
    pandalRatings,
    setPandalRating,
    pandalNotes,
    setPandalNote,
  } = useCompanion();

  const [activeFilter, setActiveFilter] = useState<"visited" | "unvisited">("visited");
  const [copied, setCopied] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [tempNote, setTempNote] = useState("");

  const totalPandals = PANDALS_DATA.length;
  const visitedCount = visitedPandals.length;
  const percentComplete = totalPandals > 0 ? Math.round((visitedCount / totalPandals) * 100) : 0;

  // Filtered lists
  const visitedList = PANDALS_DATA.filter((p) => visitedPandals.includes(p.id));
  const unvisitedList = PANDALS_DATA.filter((p) => !visitedPandals.includes(p.id)).slice(0, 15);

  const displayedList = activeFilter === "visited" ? visitedList : unvisitedList;

  const handleShareScorecard = () => {
    const text =
      language === "bn"
        ? `🌸 আমার দুর্গোৎসব ২০২৬ ডায়েরি স্কোরকার্ড!\nআমি এখনো পর্যন্ত ${visitedCount}/${totalPandals} টি মণ্ডপ পরিক্রমা করেছি (${percentComplete}%)!\nআপনিও আপনার পুজো ডায়েরি তৈরি করুন: http://localhost:3000`
        : `🌸 My Durga Puja 2026 Diary Scorecard!\nI have visited ${visitedCount}/${totalPandals} pandals so far (${percentComplete}%)!\nTrack your personal pandal visits on Pujo Pathik: http://localhost:3000`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSaveNote = (pandalId: string) => {
    setPandalNote(pandalId, tempNote);
    setEditingNoteId(null);
  };

  return (
    <div className="space-y-6">
      {/* 1. Scorecard Hero Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-[#faf7ee] to-[#f4ede0] border border-[#c05621]/25 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#9b1b1b] text-white flex items-center justify-center shadow-md">
              <BookOpen className="w-5 h-5 text-[#d4af37]" />
            </div>
            <div>
              <h3 className="font-bengali-title text-lg font-bold text-stone-900 leading-tight">
                {language === "bn" ? "আমার শারদ ডায়েরি ও চেকলিস্ট" : "My Pujo Diary & Visited Bucket"}
              </h3>
              <p className="text-xs text-stone-500 font-medium">
                {language === "bn" ? "মণ্ডপ দর্শনের হিসাব ও নিজস্ব স্মৃতিকথা" : "Keep track of visited pandals & memories"}
              </p>
            </div>
          </div>

          <button
            onClick={handleShareScorecard}
            className="px-3 py-1.5 rounded-full bg-[#9b1b1b] hover:bg-[#771d1d] text-white text-xs font-bold shadow transition-all flex items-center space-x-1.5 active:scale-95"
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 text-[#d4af37]" />}
            <span>{copied ? (language === "bn" ? "কপি হয়েছে!" : "Copied!") : (language === "bn" ? "স্কোরকার্ড শেয়ার" : "Share")}</span>
          </button>
        </div>

        {/* Progress Bar & Big Counter */}
        <div className="grid grid-cols-3 gap-2 text-center mb-4">
          <div className="p-2.5 rounded-2xl bg-white/80 border border-stone-200">
            <div className="text-[10px] text-stone-500 font-bold uppercase">{language === "bn" ? "পরিদর্শিত মণ্ডপ" : "Visited"}</div>
            <div className="text-xl sm:text-2xl font-black text-[#9b1b1b] font-bengali-sans">
              {visitedCount} <span className="text-xs text-stone-400">/ {totalPandals}</span>
            </div>
          </div>
          <div className="p-2.5 rounded-2xl bg-white/80 border border-stone-200">
            <div className="text-[10px] text-stone-500 font-bold uppercase">{language === "bn" ? "পরিক্রমা সম্পন্ন" : "Completed"}</div>
            <div className="text-xl sm:text-2xl font-black text-stone-900 font-bengali-sans">{percentComplete}%</div>
          </div>
          <div className="p-2.5 rounded-2xl bg-white/80 border border-stone-200">
            <div className="text-[10px] text-stone-500 font-bold uppercase">{language === "bn" ? "বাকি আছে" : "Remaining"}</div>
            <div className="text-xl sm:text-2xl font-black text-stone-700 font-bengali-sans">{totalPandals - visitedCount}</div>
          </div>
        </div>

        <div className="w-full h-3 rounded-full bg-stone-200 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#9b1b1b] via-[#c05621] to-[#d4af37] rounded-full transition-all duration-500"
            style={{ width: `${percentComplete}%` }}
          />
        </div>
      </div>

      {/* 2. Filter Tabs (Visited vs Next Suggestions) */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveFilter("visited")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeFilter === "visited"
                ? "bg-[#9b1b1b] text-white shadow-sm"
                : "bg-white text-stone-700 border border-stone-300 hover:bg-stone-50"
            }`}
          >
            {language === "bn" ? `দর্শন করা মণ্ডপ (${visitedCount})` : `Visited Pandals (${visitedCount})`}
          </button>
          <button
            onClick={() => setActiveFilter("unvisited")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeFilter === "unvisited"
                ? "bg-[#9b1b1b] text-white shadow-sm"
                : "bg-white text-stone-700 border border-stone-300 hover:bg-stone-50"
            }`}
          >
            {language === "bn" ? "বাকি তালিকা" : "Bucket List"}
          </button>
        </div>

        <Link
          href="/pandals"
          className="text-xs font-bold text-[#9b1b1b] hover:underline flex items-center space-x-1"
        >
          <span>{language === "bn" ? "সব মণ্ডপ" : "Explore All"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 3. Pandals Diary List */}
      {displayedList.length === 0 ? (
        <div className="p-8 text-center rounded-3xl bg-white border border-dashed border-stone-300 space-y-2">
          <Sparkles className="w-8 h-8 text-[#d4af37] mx-auto" />
          <h4 className="font-bengali-title text-base font-bold text-stone-800">
            {language === "bn" ? "এখনো কোনো মণ্ডপ ডায়েরিতে যোগ করা হয়নি" : "No pandals added to your diary yet"}
          </h4>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            {language === "bn"
              ? "মণ্ডপ কার্ডের 'দর্শন সম্পন্ন' টিকচিহ্ন ট্যাপ করে আপনার পরিক্রমার স্মৃতি লিপিবদ্ধ করুন।"
              : "Tap the checkmark on any pandal card to mark it as visited and rate your experience."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayedList.map((pandal) => {
            const isDone = visitedPandals.includes(pandal.id);
            const rating = pandalRatings[pandal.id] || 0;
            const note = pandalNotes[pandal.id] || "";

            return (
              <div
                key={pandal.id}
                className="p-3.5 sm:p-4 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-2.5 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start space-x-3">
                    <button
                      onClick={() => toggleVisited(pandal.id)}
                      className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all mt-0.5 ${
                        isDone
                          ? "bg-emerald-600 border-emerald-600 text-white"
                          : "border-stone-300 hover:border-emerald-500 text-transparent"
                      }`}
                      title={isDone ? "Uncheck visited" : "Mark as visited"}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                    <div>
                      <h4 className="font-bengali-title text-sm sm:text-base font-bold text-stone-900 leading-tight">
                        {language === "bn" ? pandal.bengaliName : pandal.name}
                      </h4>
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-stone-500 mt-0.5">
                        <span className="font-semibold text-stone-700">{pandal.zone}</span>
                        <span>•</span>
                        <span>{language === "bn" ? pandal.bengaliTheme : pandal.theme}</span>
                        <span>•</span>
                        <span className="flex items-center text-stone-600">
                          <Train className="w-3 h-3 mr-0.5 text-[#9b1b1b]" />
                          {language === "bn" ? pandal.nearestMetro.bengaliStation : pandal.nearestMetro.station}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 1-5 Star Rating */}
                  <div className="flex items-center space-x-0.5 flex-shrink-0">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setPandalRating(pandal.id, star)}
                        className="p-0.5"
                        title={`Rate ${star} star`}
                      >
                        <Star
                          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                            star <= rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-stone-300 hover:text-amber-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Personal Memory Note */}
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                  {editingNoteId === pandal.id ? (
                    <div className="flex items-center space-x-2 w-full">
                      <input
                        type="text"
                        value={tempNote}
                        onChange={(e) => setTempNote(e.target.value)}
                        placeholder={language === "bn" ? "আপনার নিজস্ব অভিজ্ঞতা লিখুন..." : "Your memory note..."}
                        className="flex-1 px-2.5 py-1 rounded-lg bg-[#faf7ee] border border-stone-300 text-xs outline-none focus:border-[#9b1b1b]"
                        autoFocus
                      />
                      <button
                        onClick={() => handleSaveNote(pandal.id)}
                        className="px-2.5 py-1 rounded-lg bg-[#9b1b1b] text-white text-[11px] font-bold"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        setEditingNoteId(pandal.id);
                        setTempNote(note);
                      }}
                      className="cursor-pointer text-stone-500 hover:text-stone-800 text-[11px] flex items-center space-x-1.5 italic"
                    >
                      <span>📝</span>
                      <span>
                        {note
                          ? `“${note}”`
                          : language === "bn"
                          ? "+ একটি নিজস্ব স্মৃতি নোট যোগ করুন (ট্যাপ করুন)"
                          : "+ Add a personal memory note (Tap here)"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

