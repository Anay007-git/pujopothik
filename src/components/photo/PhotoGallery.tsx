"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import AlpanaDivider from "@/components/animations/AlpanaDivider";
import { Camera, X, ChevronLeft, ChevronRight, Sparkles, Maximize2 } from "lucide-react";

interface PujoPhoto {
  id: string;
  title: string;
  bengaliTitle: string;
  caption: string;
  bengaliCaption: string;
  pandal: string;
  credit: string;
  url: string;
}

export const PUJO_FRAMES: PujoPhoto[] = [
  {
    id: "f1",
    title: "Chokkhudaan at Dawn",
    bengaliTitle: "ভোরের আলোয় চক্ষুদান",
    caption: "Kumartuli's master artist painting the third eye of Maa Durga.",
    bengaliCaption: "কুমারটুলির প্রবীণ শিল্পীর তুলির আলতো টানে মায়ের তৃতীয় নয়নের প্রকাশ।",
    pandal: "Kumartuli Studio",
    credit: "Kumartuli, North Kolkata",
    url: "/images/kumartuli-idol.jpg",
  },
  {
    id: "f2",
    title: "The Golden Lake Reflection",
    bengaliTitle: "জলের বুকে সোনার প্রতিচ্ছবি",
    caption: "College Square illumination shimmering on the calm waters.",
    bengaliCaption: "কলেজ স্কয়ারের সরোবরে শত আলোকবাতির রূপকথার মায়াজাল।",
    pandal: "College Square",
    credit: "College Street, Central Kolkata",
    url: "/images/college-square-light.jpg",
  },
  {
    id: "f3",
    title: "Ecstasy of Dhunuchi",
    bengaliTitle: "ধুনুচির অগ্নিশিখা ও ভক্তিনৃত্য",
    caption: "Smoke and fire twirling to the thunderous beats of the dhaak.",
    bengaliCaption: "ঢাকের তুমুল ছন্দে অগ্নিকুণ্ড হাতে মায়ের চরণে আত্মনিবেদন।",
    pandal: "Maddox Square",
    credit: "Ballygunge, South Kolkata",
    url: "/images/dhunuchi-dance.jpg",
  },
  {
    id: "f4",
    title: "Royal Courtyard of Sovabazar",
    bengaliTitle: "শোভাবাজারের শতাব্দীপ্রাচীন দালান",
    caption: "236 years of unbroken Sabeki devotion inside the palace.",
    bengaliCaption: "পাথরের থাম ও ঝাড়বাতির আলোয় একচালা প্রতিমার স্নিগ্ধ রূপ।",
    pandal: "Sovabazar Rajbari",
    credit: "Sovabazar, North Kolkata",
    url: "/images/sovabazar-rajbari.jpg",
  },
  {
    id: "f5",
    title: "The Traditional Daker Saaj",
    bengaliTitle: "বাগবাজারের চিরায়ত ডাকের সাজ",
    caption: "Pratima adorned in pristine shola and silver foil at Bagbazar.",
    bengaliCaption: "এক শতাব্দীর শ্রেষ্ঠ ঐতিহ্যবাহী সাবেকী দুর্গাপ্রতিমা।",
    pandal: "Bagbazar Sarbojanin",
    credit: "Bagbazar, North Kolkata",
    url: "/images/bagbazar-sabeki.jpg",
  },
  {
    id: "f6",
    title: "Scarlet Blessings of Sindoor Khela",
    bengaliTitle: "বিজয়ার সিঁদুর খেলা",
    caption: "Devotees celebrate the sacred farewell on Vijaya Dashami.",
    bengaliCaption: "মায়ের বিদায়বেলায় সিঁদুরের লাল রঙে রাঙিয়ে দেওয়া ভালোবাসা।",
    pandal: "Kolkata Pandal",
    credit: "Vijaya Dashami, Kolkata",
    url: "/images/sindoor-khela.jpg",
  },
  {
    id: "f7",
    title: "Kolkata Tram along Pandal Streets",
    bengaliTitle: "পুজোর শহরে ট্রামের ছন্দ",
    caption: "Vintage wooden tram gliding along illuminated Puja avenues.",
    bengaliCaption: "তারে তারে আলো আর নস্টালজিয়ার ট্রাম—কলকাতার চিরন্তন রূপ।",
    pandal: "College Street & Esplanade",
    credit: "Street Heritage, Kolkata",
    url: "/images/kolkata-tram.jpg",
  },
  {
    id: "f8",
    title: "City of Joy Festive Nights",
    bengaliTitle: "পুজোয় প্রাণবন্ত রাতের কলকাতা",
    caption: "Yellow ambassador taxis and bustling crowds under festive fairy lights.",
    bengaliCaption: "হলুদ ট্যাক্সি আর উৎসবমুখর রাজপথ—জেগে থাকে গোটা শহর।",
    pandal: "Howrah & Central Streets",
    credit: "Kolkata Streets",
    url: "/images/kolkata-street-night.jpg",
  },
  {
    id: "f9",
    title: "Maddox Square Open Adda",
    bengaliTitle: "ম্যাডক্স স্কয়ারের উন্মুক্ত আড্ডা",
    caption: "The ultimate green park gathering spot for songs, adda, and joy.",
    bengaliCaption: "ঘাসের গালিচায় বসে ঘণ্টার পর ঘণ্টা বন্ধুদের জমজমাট আড্ডা।",
    pandal: "Maddox Square Durgotsav",
    credit: "Ritchie Road, South Kolkata",
    url: "/images/maddox-square.jpg",
  },
];

export default function PhotoGallery() {
  const { language } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const activePhoto = selectedIndex !== null ? PUJO_FRAMES[selectedIndex] : null;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % PUJO_FRAMES.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + PUJO_FRAMES.length) % PUJO_FRAMES.length);
    }
  };

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#9b1b1b] mb-1">
            <Camera className="w-4 h-4 text-[#d4af37]" />
            <span>Kolkata Pujo Frames</span>
          </div>
          <h2 className="font-bengali-title text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
            {language === "bn" ? "ফটোগ্রাফারের চোখে কলকাতা" : "Frames of Autumn Joy"}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2 font-medium">
            {language === "bn"
              ? "মণ্ডপের আলো, মাটির গন্ধ আর শারদীয় মুহূর্তের দৃষ্টিনন্দন চিত্রমালা।"
              : "Cinematic moments capturing the lights, devotion, and colors of Kolkata Durga Puja."}
          </p>
          <AlpanaDivider variant="red" className="my-5 max-w-sm" />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
          {PUJO_FRAMES.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => setSelectedIndex(idx)}
              className="group relative h-64 sm:h-80 rounded-3xl overflow-hidden shadow-lg border border-[#c05621]/20 cursor-pointer bg-stone-950"
            >
              <Image
                src={photo.url}
                alt={photo.title}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Top View Icon */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Bottom Bengali Typography Callout */}
              <div className="absolute bottom-3 left-3 right-3 z-10 text-white">
                <span className="text-[10px] font-bold text-[#d4af37] tracking-wider uppercase block">
                  {photo.pandal}
                </span>
                <h4 className="font-bengali-title text-base sm:text-lg font-bold drop-shadow leading-snug">
                  {language === "bn" ? photo.bengaliTitle : photo.title}
                </h4>
                <p className="text-[11px] text-stone-300 line-clamp-1 mt-0.5">
                  {language === "bn" ? photo.bengaliCaption : photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fadeIn"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Image Container with Calligraphy Overlay */}
          <div
            className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[65vh] rounded-2xl overflow-hidden shadow-2xl bg-black">
              <Image
                src={activePhoto.url}
                alt={activePhoto.title}
                fill
                className="object-contain"
              />
            </div>

            {/* Lightbox Caption Card */}
            <div className="w-full text-center mt-4 text-white">
              <h3 className="font-bengali-title text-2xl font-bold text-[#d4af37]">
                {language === "bn" ? activePhoto.bengaliTitle : activePhoto.title}
              </h3>
              <p className="text-sm text-stone-300 mt-1 max-w-xl mx-auto">
                {language === "bn" ? activePhoto.bengaliCaption : activePhoto.caption}
              </p>
              <div className="text-xs text-stone-400 mt-1">
                {activePhoto.pandal} • {activePhoto.credit}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

