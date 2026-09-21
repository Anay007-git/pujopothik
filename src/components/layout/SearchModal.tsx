"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { PANDALS_DATA, Pandal } from "@/data/pandalsData";
import { Search, X, MapPin, Sparkles, Train, ArrowRight } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPandal: (pandal: Pandal) => void;
}

export default function SearchModal({
  isOpen,
  onClose,
  onSelectPandal,
}: SearchModalProps) {
  const { language, t } = useLanguage();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();
  const results = normalizedQuery
    ? PANDALS_DATA.filter((p) => {
        return (
          p.name.toLowerCase().includes(normalizedQuery) ||
          p.bengaliName.includes(query.trim()) ||
          p.area.toLowerCase().includes(normalizedQuery) ||
          p.theme.toLowerCase().includes(normalizedQuery) ||
          p.bengaliTheme.includes(query.trim()) ||
          p.nearestMetro.station.toLowerCase().includes(normalizedQuery) ||
          p.nearestMetro.bengaliStation.includes(query.trim()) ||
          p.zone.toLowerCase().includes(normalizedQuery)
        );
      })
    : PANDALS_DATA.slice(0, 5); // Default top 5 suggestions

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#faf7ee] rounded-2xl shadow-2xl border border-[#c05621]/30 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-[#c05621]/20 px-4 py-3 sm:py-4 bg-white/70">
          <Search className="w-5 h-5 text-[#9b1b1b] mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full bg-transparent text-stone-900 placeholder-stone-400 text-sm sm:text-base focus:outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-full text-stone-400 hover:text-stone-700 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 text-xs uppercase tracking-wider font-semibold"
          >
            Esc
          </button>
        </div>

        {/* Quick Filter Tag Suggestions */}
        <div className="flex items-center space-x-2 px-4 py-2.5 bg-[#f5efe1] border-b border-[#c05621]/10 overflow-x-auto text-xs text-stone-600">
          <span className="font-semibold text-stone-500 flex-shrink-0">
            {language === "bn" ? "জনপ্রিয় সন্ধান:" : "Popular:"}
          </span>
          {["Sreebhumi", "Ekdalia", "Kumartuli", "College Square", "Shyambazar"].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 rounded-full bg-white hover:bg-[#9b1b1b] hover:text-white border border-stone-200 transition-colors flex-shrink-0 font-medium"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto divide-y divide-stone-100 p-2">
          {results.length === 0 ? (
            <div className="text-center py-12 text-stone-500">
              <p className="font-bengali-title text-lg mb-1">
                {language === "bn" ? "কোনো মণ্ডপ খুঁজে পাওয়া যায়নি" : "No pandals found"}
              </p>
              <p className="text-xs">
                {language === "bn"
                  ? "অনুগ্রহ করে নাম বা মেট্রো স্টেশনের বানান যাচাই করুন।"
                  : "Try searching by Metro station, theme, or locality."}
              </p>
            </div>
          ) : (
            results.map((pandal) => (
              <div
                key={pandal.id}
                onClick={() => {
                  onSelectPandal(pandal);
                  onClose();
                }}
                className="group flex items-center justify-between p-3 rounded-xl hover:bg-[#9b1b1b]/10 transition-colors cursor-pointer"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-[#9b1b1b]/15 text-[#9b1b1b] flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#9b1b1b] group-hover:text-white transition-colors">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#9b1b1b] transition-colors">
                        {language === "bn" ? pandal.bengaliName : pandal.name}
                      </h4>
                      <span className="text-[11px] font-bengali-title text-[#8c6246]">
                        ({language === "bn" ? pandal.name : pandal.bengaliName})
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-stone-600">
                      <span className="flex items-center text-stone-500">
                        <MapPin className="w-3 h-3 mr-1 text-[#c05621]" />
                        {pandal.area}
                      </span>
                      <span className="flex items-center text-stone-500">
                        <Train className="w-3 h-3 mr-1 text-blue-600" />
                        {language === "bn"
                          ? pandal.nearestMetro.bengaliStation
                          : pandal.nearestMetro.station}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#d4af37]/20 text-[#865434] font-semibold text-[10px]">
                        {language === "bn" ? pandal.bengaliTheme : pandal.theme}
                      </span>
                    </div>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#9b1b1b] group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

