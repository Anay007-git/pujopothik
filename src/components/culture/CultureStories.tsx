"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CULTURE_STORIES, CultureStory } from "@/data/cultureData";
import { useLanguage } from "@/context/LanguageContext";
import AlpanaDivider from "@/components/animations/AlpanaDivider";
import { Sparkles, Quote, CheckCircle2, BookOpen } from "lucide-react";

export default function CultureStories() {
  const { language, t } = useLanguage();
  const [selectedStory, setSelectedStory] = useState<CultureStory | null>(null);

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#9b1b1b] mb-1">
            <BookOpen className="w-4 h-4 text-[#c05621]" />
            <span>{language === "bn" ? "বাঙালির প্রাণের শারদোৎসব" : "Essence of Bengal's Heritage"}</span>
          </div>
          <h2 className="font-bengali-title text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
            {t.cultureTitle}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2 font-medium">
            “{t.cultureSubtitle}”
          </p>
          <AlpanaDivider variant="red" className="my-5 max-w-sm" />
        </div>

        {/* Storytelling Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CULTURE_STORIES.map((story) => (
            <article
              key={story.id}
              className="festive-card rounded-3xl overflow-hidden flex flex-col justify-between border border-[#c05621]/20 shadow-md group hover:border-[#9b1b1b]/50 transition-all cursor-pointer"
              onClick={() => setSelectedStory(story)}
            >
              <div>
                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden bg-stone-900">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-3 py-1 rounded-full bg-[#9b1b1b] text-[#faf7ee] text-xs font-bold shadow">
                      {language === "bn" ? story.bengaliCategory : story.category}
                    </span>
                  </div>

                  {/* Title on Hero */}
                  <div className="absolute bottom-3 left-4 right-4 z-10">
                    <h3 className="font-bengali-title text-xl sm:text-2xl font-bold text-white leading-snug drop-shadow">
                      {language === "bn" ? story.bengaliTitle : story.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 space-y-3">
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium line-clamp-3">
                    {language === "bn" ? story.bengaliBody : story.body}
                  </p>

                  {/* Quote */}
                  <div className="p-3 rounded-xl bg-amber-50/80 border-l-2 border-[#d4af37] text-xs text-[#8c6246] italic">
                    <Quote className="w-3.5 h-3.5 text-[#d4af37] inline mr-1" />
                    {language === "bn" ? story.bengaliQuote : story.quote}
                  </div>
                </div>
              </div>

              {/* Cultural Tip Footer */}
              <div className="p-4 sm:p-5 pt-0">
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-[#9b1b1b] font-bold">
                  <span>{language === "bn" ? "সম্পূর্ণ প্রবন্ধ পড়ুন" : "Read Full Story"}</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Story Detail Lightbox Modal */}
      {selectedStory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedStory(null)}
        >
          <div
            className="w-full max-w-2xl bg-[#faf7ee] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#c05621]/30 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-[#9b1b1b] text-white text-xs font-bold">
                {language === "bn" ? selectedStory.bengaliCategory : selectedStory.category}
              </span>
              <button
                onClick={() => setSelectedStory(null)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold"
              >
                ✕ Close
              </button>
            </div>

            <h3 className="font-bengali-title text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
              {language === "bn" ? selectedStory.bengaliTitle : selectedStory.title}
            </h3>

            <p className="text-sm font-semibold text-[#8c6246] italic mb-4">
              {language === "bn" ? selectedStory.bengaliSummary : selectedStory.summary}
            </p>

            <div className="relative h-60 w-full rounded-2xl overflow-hidden mb-6 bg-stone-900">
              <Image
                src={selectedStory.image}
                alt={selectedStory.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="text-sm text-stone-800 leading-relaxed space-y-3">
              <p>{language === "bn" ? selectedStory.bengaliBody : selectedStory.body}</p>
            </div>

            <div className="my-6 p-4 rounded-2xl bg-[#d4af37]/15 border-l-4 border-[#d4af37] text-stone-900 font-medium italic text-sm">
              {language === "bn" ? selectedStory.bengaliQuote : selectedStory.quote}
            </div>

            {/* Cultural Tips Box */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200">
              <h5 className="font-bold text-xs uppercase tracking-wider text-[#9b1b1b] mb-2">
                {language === "bn" ? "দর্শনার্থীদের জন্য আচার ও পরামর্শ:" : "Visitor Tips & Etiquette:"}
              </h5>
              <ul className="space-y-1.5 text-xs text-stone-700">
                {selectedStory.culturalTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

