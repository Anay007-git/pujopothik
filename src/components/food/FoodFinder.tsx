"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FOOD_SPOTS, FoodSpot } from "@/data/foodData";
import { useLanguage } from "@/context/LanguageContext";
import AlpanaDivider from "@/components/animations/AlpanaDivider";
import {
  Utensils,
  MapPin,
  Clock,
  Star,
  Moon,
  Sparkles,
  Check,
  Search,
  ExternalLink,
} from "lucide-react";

export default function FoodFinder() {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [activeZone, setActiveZone] = useState<string>("ALL");
  const [vegetarianOnly, setVegetarianOnly] = useState<boolean>(false);
  const [lateNightOnly, setLateNightOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    { key: "ALL", label: language === "bn" ? "সব খাবার" : "All Food" },
    { key: "Roll", label: language === "bn" ? "কাঠি রোল ও মেলা" : "Kathi Rolls & Melas" },
    { key: "Tangra Chinese", label: language === "bn" ? "ট্যাংরা চাইনিজ" : "Tangra Chinese" },
    { key: "Continental Heritage", label: language === "bn" ? "কন্টিনেন্টাল হেরিটেজ" : "Continental Heritage" },
    { key: "Historic Pubs & Bars", label: language === "bn" ? "ঐতিহাসিক পাব ও বার" : "Historic Pubs & Bars" },
    { key: "Biryani", label: language === "bn" ? "কলকাতা বিরিয়ানি" : "Biryani" },
    { key: "Fish & Chop", label: language === "bn" ? "ফিশ ফ্রাই ও চপ" : "Fish & Chops" },
    { key: "Cabin & Mughlai", label: language === "bn" ? "মোগলাই ও কেবিন" : "Mughlai & Cabin" },
    { key: "Phuchka", label: language === "bn" ? "ফুচকা ও চাট" : "Phuchka" },
    { key: "Misti & Dessert", label: language === "bn" ? "মিষ্টি ও রসগোল্লা" : "Misti & Sweets" },
    { key: "Late Night Chai", label: language === "bn" ? "মাটির ভাঁড়ের চা ও আড্ডা" : "Late Night Chai" },
  ];

  const zones = [
    { key: "ALL", label: language === "bn" ? "সমগ্র কলকাতা" : "All Kolkata" },
    { key: "North Kolkata", label: language === "bn" ? "উত্তর কলকাতা (বাগবাজার/শ্যামবাজার)" : "North Kolkata (Bagbazar)" },
    { key: "Central Kolkata", label: language === "bn" ? "মধ্য কলকাতা ও পার্ক স্ট্রিট" : "Central & Park Street" },
    { key: "South Kolkata", label: language === "bn" ? "দক্ষিণ কলকাতা (গড়িয়াহাট/ম্যাডক্স)" : "South Kolkata (Gariahat)" },
    { key: "Salt Lake & New Town", label: language === "bn" ? "সল্টলেক ও শ্রীভূমি" : "Salt Lake & Sreebhumi" },
    { key: "Behala & West", label: language === "bn" ? "বেহালা ও পশ্চিম" : "Behala & West" },
  ];

  const filtered = FOOD_SPOTS.filter((spot) => {
    const matchCat = activeCategory === "ALL" || spot.category === activeCategory;
    const matchZone = activeZone === "ALL" || spot.zone === activeZone;
    const matchVeg = !vegetarianOnly || spot.vegetarianFriendly;
    const matchLate = !lateNightOnly || spot.lateNight;

    const q = searchQuery.toLowerCase().trim();
    const matchQuery =
      !q ||
      spot.name.toLowerCase().includes(q) ||
      spot.bengaliName.toLowerCase().includes(q) ||
      spot.area.toLowerCase().includes(q) ||
      spot.bengaliArea.toLowerCase().includes(q) ||
      spot.mustTry.toLowerCase().includes(q) ||
      spot.bengaliMustTry.toLowerCase().includes(q);

    return matchCat && matchZone && matchVeg && matchLate && matchQuery;
  });

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#9b1b1b] mb-1">
            <Utensils className="w-4 h-4 text-[#c05621]" />
            <span>{language === "bn" ? "সমগ্র কলকাতার রসনাতৃপ্তি" : "Pan-Kolkata Culinary Directory"}</span>
          </div>
          <h2 className="font-bengali-title text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
            {t.foodTitle}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2 font-medium">
            “{t.foodSubtitle}”
          </p>
          <AlpanaDivider variant="red" className="my-5 max-w-sm mx-auto" />

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === "bn"
                  ? "খাবার, স্টল বা এলাকা খুঁজুন (যেমন: বাগবাজার, ট্যাংরা, মোকাম্বো)..."
                  : "Search dish, stall or locality (e.g. Bagbazar, Tangra, Mocambo)..."
              }
              className="w-full px-4 py-3 pl-11 rounded-2xl border border-stone-200 focus:border-[#9b1b1b] focus:ring-2 focus:ring-[#9b1b1b]/20 outline-none text-sm shadow-sm"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-3.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-3.5 text-xs text-stone-400 hover:text-stone-600 font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Zone Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mb-4">
            {zones.map((z) => (
              <button
                key={z.key}
                onClick={() => setActiveZone(z.key)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  activeZone === z.key
                    ? "bg-[#1b1212] text-[#d4af37] shadow-sm border border-[#d4af37]"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {z.label}
              </button>
            ))}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat.key
                    ? "bg-[#9b1b1b] text-white shadow-sm"
                    : "bg-white text-stone-700 hover:bg-[#c05621]/15 border border-stone-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick Toggles: Late Night & Veg */}
          <div className="flex items-center justify-center gap-3 mt-4 text-xs">
            <button
              onClick={() => setLateNightOnly(!lateNightOnly)}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-full border transition-colors ${
                lateNightOnly
                  ? "bg-purple-900 text-white border-purple-800"
                  : "bg-white text-stone-600 border-stone-200"
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>{language === "bn" ? "মাঝরাতেও খোলা" : "Open Late Night"}</span>
            </button>

            <button
              onClick={() => setVegetarianOnly(!vegetarianOnly)}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-full border transition-colors ${
                vegetarianOnly
                  ? "bg-emerald-800 text-white border-emerald-700"
                  : "bg-white text-stone-600 border-stone-200"
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>{language === "bn" ? "নিরামিষ অপশন" : "Veg Friendly"}</span>
            </button>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-stone-500 mb-4 px-1">
          <span>
            {language === "bn"
              ? `মোট ${filtered.length}টি বিখ্যাত খাবারের ঠিকানা পাওয়া গেছে`
              : `Showing ${filtered.length} iconic culinary destinations`}
          </span>
        </div>

        {/* Food Spots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((spot) => {
            const isChinese = spot.category === "Tangra Chinese";
            const isPub = spot.category === "Historic Pubs & Bars";
            const isContinental = spot.category === "Continental Heritage";

            const badgeColor = isChinese
              ? "bg-red-900/80 text-amber-200 border-red-700/50"
              : isPub
              ? "bg-slate-900/90 text-amber-300 border-slate-700"
              : isContinental
              ? "bg-amber-950/80 text-amber-200 border-amber-800"
              : "bg-black/60 text-amber-300 border-amber-400/30";

            return (
              <div
                key={spot.id}
                className="group festive-card rounded-3xl overflow-hidden border border-[#c05621]/20 shadow-md flex flex-col justify-between hover:shadow-xl transition-all duration-300 bg-white"
              >
                <div>
                  {/* Photo Thumbnail */}
                  <div className="relative h-48 w-full bg-stone-900 overflow-hidden">
                    <Image
                      src={spot.image}
                      alt={spot.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <span
                      className={`absolute top-3 left-3 px-2.5 py-1 rounded-full backdrop-blur-sm text-[11px] font-bold border ${badgeColor}`}
                    >
                      {spot.category}
                    </span>
                    <div className="absolute top-3 right-3 flex items-center px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm text-amber-400 text-xs font-bold border border-amber-400/30">
                      <Star className="w-3.5 h-3.5 fill-amber-400 mr-1 text-amber-400" />
                      <span>{spot.rating}</span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bengali-title text-xl font-bold text-stone-900 mb-1 group-hover:text-[#9b1b1b] transition-colors">
                      {language === "bn" ? spot.bengaliName : spot.name}
                    </h3>
                    <p className="text-xs text-stone-500 font-medium mb-3 flex items-center">
                      <MapPin className="w-3.5 h-3.5 text-[#c05621] mr-1 flex-shrink-0" />
                      {spot.area} • Metro: {spot.nearestMetro}
                    </p>

                    {/* Must Try Dish Banner */}
                    <div className="p-3 rounded-2xl bg-amber-50/90 border border-amber-200/80 mb-3 text-xs">
                      <span className="font-bold text-[#9b1b1b] block mb-0.5">
                        {language === "bn" ? "অবশ্যই চেখে দেখুন:" : "Must Try:"}
                      </span>
                      <span className="font-semibold text-stone-800">
                        {language === "bn" ? spot.bengaliMustTry : spot.mustTry}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                      {language === "bn" ? spot.bengaliDescription : spot.description}
                    </p>
                  </div>
                </div>

                {/* Timing, Price & Map Directions Footer */}
                <div className="px-5 pb-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span className="flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1 text-stone-400" />
                    <span className="truncate max-w-[150px]">{spot.timingsDuringPuja}</span>
                  </span>

                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded-md">
                      {spot.priceRange}
                    </span>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        spot.name + " " + spot.address
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-0.5 text-[#9b1b1b] hover:text-[#771d1d] font-bold"
                      title="Open in Google Maps"
                    >
                      <span>{language === "bn" ? "ম্যাপ" : "Directions"}</span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
