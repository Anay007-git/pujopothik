"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import DurgaEyeIcon from "@/components/animations/DurgaEyeIcon";
import AlpanaDivider from "@/components/animations/AlpanaDivider";
import { Compass, Route, Train, Sparkles, MapPin, ArrowRight } from "lucide-react";

export default function HeroSection() {
  const { language, t } = useLanguage();
  const [headlineIndex, setHeadlineIndex] = useState(0);

  // Animate headline: “মা আসছেন…” -> “কলকাতা আবার সাজছে।”
  useEffect(() => {
    const interval = setInterval(() => {
      setHeadlineIndex((prev) => (prev === 0 ? 1 : 0));
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const heroStories = [
    {
      title: language === "bn" ? "কুমারটুলির মৃৎশিল্প" : "Kumartuli Clay Art",
      subtitle: language === "bn" ? "গঙ্গার পলিমাটিতে দেবীর রূপদান" : "Sacred idol sculpting",
      image: "/images/kumartuli-idol.jpg",
      href: "/culture#kumartuli",
    },
    {
      title: language === "bn" ? "শোভাবাজার রাজবাড়ি" : "Sovabazar Rajbari",
      subtitle: language === "bn" ? "২৩৬ বছরের বনেদি ঐতিহ্য" : "236-yr aristocratic heritage",
      image: "/images/sovabazar-rajbari.jpg",
      href: "/pandals",
    },
    {
      title: language === "bn" ? "বাগবাজার সার্বজনীন" : "Bagbazar Sarbojanin",
      subtitle: language === "bn" ? "চিরন্তনী সাবেকি ডাকের সাজ" : "Centuries-old Sabeki pratima",
      image: "/images/bagbazar-sabeki.jpg",
      href: "/pandals",
    },
    {
      title: language === "bn" ? "কলেজ স্কোয়ার সরোবর" : "College Square Lake",
      subtitle: language === "bn" ? "জলের বুকে আলোক রূপকথা" : "Golden lake reflections",
      image: "/images/college-square-light.jpg",
      href: "/pandals",
    },
  ];

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden bg-[#0e0e12] text-[#faf7ee]">
      {/* Real Photographic Background with Rich Atmospheric Treatment */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/durga-puja-kolkata-main.jpg"
          alt="Kolkata Durga Puja Festival Atmosphere"
          fill
          priority
          className="object-cover object-center scale-105 opacity-40"
        />
        {/* Deep Editorial Bengali Night Vignette & Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e12] via-[#0e0e12]/70 to-[#0e0e12]/50" />
        <div className="absolute inset-0 bg-radial-gradient from-[#9b1b1b]/20 via-transparent to-[#0e0e12]/80" />
      </div>

      {/* Top Traditional Lal-Par Border Accent */}
      <div className="relative z-10 w-full h-[4px] bg-gradient-to-r from-[#9b1b1b] via-[#d4af37] to-[#9b1b1b]" />

      {/* Main Central Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 text-center flex flex-col items-center">
        {/* Refined Cultural Masthead Emblem */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#d4af37]/40 text-[#d4af37] text-xs font-semibold tracking-wider uppercase mb-6 shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="font-bengali-sans">
            {language === "bn" ? "কলকাতা দুর্গাপূজা ২০২৬ — মহোৎসব নির্দেশিকা" : "Kolkata Durga Puja 2026 — Official Cultural Guide"}
          </span>
        </div>

        {/* Dynamic Bengali Headline Transition */}
        <div className="min-h-[70px] sm:min-h-[90px] flex items-center justify-center">
          <h1 className="font-bengali-title text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] transition-all duration-700">
            {headlineIndex === 0 ? "মা আসছেন…" : "কলকাতা আবার সাজছে।"}
          </h1>
        </div>

        {/* Authentic Bengali Tagline */}
        <p className="font-bengali-title text-xl sm:text-2xl md:text-3xl text-[#d4af37] font-semibold mt-3 italic drop-shadow-md">
          “{t.tagline}”
        </p>

        {/* Editorial Subtitle */}
        <p className="text-xs sm:text-sm md:text-base text-stone-300 max-w-2xl mt-2 font-medium leading-relaxed drop-shadow">
          {language === "bn"
            ? "২২৭+ মণ্ডপ, থিমের গল্প, কুমারটুলির প্রতিমা, মেট্রো সংযোগ ও আপনার নিজস্ব রুট।"
            : "227+ Pandals, Theme Stories, Kumartuli Sculptors, Metro Connections & Custom Routes."}
        </p>

        {/* Delicate Bengali Alpana Divider */}
        <AlpanaDivider variant="gold" className="my-6 max-w-md" />

        {/* Hero CTA Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full max-w-md">
          {/* Primary CTA: Explore Pandals */}
          <Link
            href="/pandals"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3.5 rounded-full bg-[#9b1b1b] hover:bg-[#771d1d] text-[#faf7ee] text-sm sm:text-base font-bold shadow-xl hover:scale-105 active:scale-95 transition-all border border-[#d4af37]/60"
          >
            <Compass className="w-4 h-4 text-[#d4af37]" />
            <span className="font-bengali-title">{t.explorePandals}</span>
          </Link>

          {/* Route Builder CTA */}
          <Link
            href="/routes"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-7 py-3.5 rounded-full bg-stone-900/80 hover:bg-stone-800 backdrop-blur-md text-[#faf7ee] text-sm sm:text-base font-semibold border border-stone-600 hover:border-[#d4af37] active:scale-95 transition-all"
          >
            <Route className="w-4 h-4 text-[#d4af37]" />
            <span className="font-bengali-title">{t.buildMyRoute}</span>
          </Link>
        </div>

        {/* Metro Quick Action */}
        <div className="mt-4">
          <Link
            href="/metro"
            className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-semibold text-[#d4af37] hover:text-white transition-colors"
          >
            <Train className="w-4 h-4 text-blue-400" />
            <span className="border-b border-[#d4af37]/40 hover:border-white">
              {t.exploreByMetro} →
            </span>
          </Link>
        </div>
      </div>

      {/* Real Kolkata Street & Pandal Photography Highlights Strip */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {heroStories.map((story, idx) => (
            <Link
              key={idx}
              href={story.href}
              className="group relative h-28 sm:h-32 rounded-2xl overflow-hidden border border-white/10 hover:border-[#d4af37]/60 shadow-lg transition-all"
            >
              <Image
                src={story.image}
                alt={story.title}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 text-left">
                <span className="font-bengali-title text-xs sm:text-sm font-bold text-white block group-hover:text-[#d4af37] transition-colors leading-tight">
                  {story.title}
                </span>
                <span className="text-[10px] sm:text-[11px] text-stone-300 block truncate font-medium mt-0.5">
                  {story.subtitle}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
