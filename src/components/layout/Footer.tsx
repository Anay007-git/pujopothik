"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import DurgaEyeIcon from "@/components/animations/DurgaEyeIcon";
import AlpanaDivider from "@/components/animations/AlpanaDivider";
import { Heart, MapPin, Sparkles, Train, Route, ShieldCheck, Compass, Github } from "lucide-react";

export default function Footer() {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-[#121215] text-[#faf7ee] pt-16 pb-24 md:pb-12 border-t-2 border-[#9b1b1b] relative overflow-hidden">
      {/* Background subtle glowing radial gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-[#9b1b1b]/15 to-transparent pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Magazine Masthead Style Top Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-14 h-14 rounded-full bg-[#9b1b1b] flex items-center justify-center mb-4 shadow-lg border border-[#d4af37]/40">
            <DurgaEyeIcon size={38} color="#faf7ee" />
          </div>
          <h3 className="font-bengali-title text-3xl sm:text-4xl font-bold tracking-tight text-[#faf7ee] mb-2">
            {language === "bn" ? "পুজো পথিক ২০২৬" : "Pujo Pathik 2026"}
          </h3>
          <p className="font-bengali-sans text-sm sm:text-base text-[#d4af37] max-w-xl italic">
            “{t.tagline}”
          </p>
          <AlpanaDivider variant="gold" className="my-6 max-w-lg" />
        </div>

        {/* Multi-column Magazine Directory */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-stone-800 text-sm">
          {/* Column 1: Explore */}
          <div>
            <h4 className="font-semibold text-xs tracking-wider uppercase text-[#d4af37] mb-4 flex items-center space-x-1.5">
              <Compass className="w-4 h-4 text-[#d4af37]" />
              <span>{language === "bn" ? "মণ্ডপ পরিক্রমা" : "Explore"}</span>
            </h4>
            <ul className="space-y-2.5 text-stone-300">
              <li>
                <Link href="/pandals" className="hover:text-[#faf7ee] transition-colors">
                  {language === "bn" ? "সব মণ্ডপ তালিকা (২২৭+)" : "All Pandals Directory"}
                </Link>
              </li>
              <li>
                <Link href="/themes" className="hover:text-[#faf7ee] transition-colors">
                  {language === "bn" ? "এবারের থিম ও ভাবমূর্তি" : "2026 Themes & Stories"}
                </Link>
              </li>
              <li>
                <Link href="/map" className="hover:text-[#faf7ee] transition-colors">
                  {language === "bn" ? "কলকাতার ইন্টারেক্টিভ মানচিত্র" : "Interactive City Map"}
                </Link>
              </li>
              <li>
                <Link href="/pandals?zone=North+Kolkata" className="hover:text-[#faf7ee] transition-colors">
                  {language === "bn" ? "উত্তর কলকাতার বনেদি পুজো" : "North Kolkata Heritage"}
                </Link>
              </li>
              <li>
                <Link href="/pandals?zone=South+Kolkata" className="hover:text-[#faf7ee] transition-colors">
                  {language === "bn" ? "দক্ষিণ কলকাতার মেগা মণ্ডপ" : "South Kolkata Icons"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Routes & Transport */}
          <div>
            <h4 className="font-semibold text-xs tracking-wider uppercase text-[#d4af37] mb-4 flex items-center space-x-1.5">
              <Route className="w-4 h-4 text-[#d4af37]" />
              <span>{language === "bn" ? "রুট ও যাতায়াত" : "Routes & Transit"}</span>
            </h4>
            <ul className="space-y-2.5 text-stone-300">
              <li>
                <Link href="/routes" className="hover:text-[#faf7ee] transition-colors">
                  {language === "bn" ? "আমার পুজোর রুট বিল্ডার" : "My Pujo Route Builder"}
                </Link>
              </li>
              <li>
                <Link href="/metro" className="hover:text-[#faf7ee] transition-colors">
                  {language === "bn" ? "মেট্রো স্টেশন গাইড" : "Pujo by Metro Guide"}
                </Link>
              </li>
              <li>
                <Link href="/guide" className="hover:text-[#faf7ee] transition-colors">
                  {language === "bn" ? "নাইট ট্র্যাফিক ও বাস রুট" : "Night Traffic & Public Bus"}
                </Link>
              </li>
              <li>
                <Link href="/routes#prebuilt" className="hover:text-[#faf7ee] transition-colors">
                  {language === "bn" ? "তৈরি করা বিশেষ রুট" : "Curated Editorial Routes"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Culture & Food */}
          <div>
            <h4 className="font-semibold text-xs tracking-wider uppercase text-[#d4af37] mb-4 flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span>{language === "bn" ? "সংস্কৃতি ও আড্ডা" : "Culture & Food"}</span>
            </h4>
            <ul className="space-y-2.5 text-stone-300">
              <li>
                <Link href="/culture" className="hover:text-[#faf7ee] transition-colors">
                  {language === "bn" ? "শুধু প্যান্ডেল নয় (সংস্কৃতি)" : "Beyond Just Pandals"}
                </Link>
              </li>
              <li>
                <Link href="/food" className="hover:text-[#faf7ee] transition-colors">
                  {language === "bn" ? "পুজোর খাওয়া-দাওয়া" : "Pujo Food & Adda Trail"}
                </Link>
              </li>
              <li>
                <Link href="/culture#kumartuli" className="hover:text-[#faf7ee] transition-colors">
                  {language === "bn" ? "কুমারটুলির মৃৎশিল্পীরা" : "Kumartuli Clay Studios"}
                </Link>
              </li>
              <li>
                <Link href="/culture#dhunuchi" className="hover:text-[#faf7ee] transition-colors">
                  {language === "bn" ? "ধুনুচি নাচ ও ঢাকের বোল" : "Dhunuchi Dance & Dhaak"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Verified Data Sources & Official Contact */}
          <div>
            <h4 className="font-semibold text-xs tracking-wider uppercase text-[#d4af37] mb-4 flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
              <span>{language === "bn" ? "যোগাযোগ ও তথ্যসূত্র" : "Contact & Verified Info"}</span>
            </h4>
            
            {/* Contact Details Card */}
            <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-3 mb-3 text-xs space-y-2 shadow-inner">
              <div className="flex items-center space-x-2 text-stone-200">
                <span className="text-[#d4af37] font-semibold">{language === "bn" ? "যোগাযোগকারী:" : "Contact:"}</span>
                <span className="font-medium text-white">Anay Biswas</span>
              </div>
              <div className="text-stone-300">
                <a
                  href="mailto:biswasanay07@gmail.com"
                  className="text-[#d4af37] hover:underline break-all"
                >
                  biswasanay07@gmail.com
                </a>
              </div>
              <div className="text-stone-400 text-[11px] leading-relaxed">
                Acharya Prafulla Pally, Rammalir Math, Kolkata - 700111
              </div>
              <div className="pt-1.5 border-t border-stone-800 flex flex-wrap gap-2">
                <a
                  href="https://wa.me/919804239301"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-600 hover:text-white transition-all text-[11px] font-semibold"
                >
                  <span>💬 WhatsApp: 9804239301</span>
                </a>
                <a
                  href="https://github.com/Anay007-git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-stone-800 text-stone-200 border border-stone-700 hover:bg-stone-700 hover:text-white transition-all text-[11px] font-semibold"
                >
                  <Github className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>GitHub: Anay007-git</span>
                </a>
              </div>
            </div>

            <div className="space-y-1 text-[11px] text-stone-400">
              <p>• Kolkata Police Puja Advisory 2026</p>
              <p>• Metro Railway Kolkata Night Schedule</p>
              <p>• Verified Club Committees & Press Releases</p>
            </div>
          </div>
        </div>

        {/* Bottom Bengali Magazine Closing */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="font-bengali-title text-[#d4af37] font-semibold text-sm">
              {t.footerWish}
            </span>
          </div>
          <div className="text-stone-400 text-center sm:text-right text-xs space-y-1">
            <p>© 2026 পুজো পথিক — Pujo Pathik. Crafting authentic Bengali cultural journeys with pride.</p>
            <p className="text-stone-300">
              Contributor: <a href="https://github.com/Anay007-git" target="_blank" rel="noopener noreferrer" className="text-[#d4af37] font-semibold hover:underline">Anay007-git (Anay Biswas)</a> | <a href="mailto:biswasanay07@gmail.com" className="hover:text-[#d4af37]">biswasanay07@gmail.com</a> | Kol - 700111 | WhatsApp: <a href="https://wa.me/919804239301" className="text-emerald-400 hover:underline">9804239301</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

