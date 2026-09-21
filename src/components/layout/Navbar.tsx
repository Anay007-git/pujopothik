"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useRoute } from "@/context/RouteContext";
import DurgaEyeIcon from "@/components/animations/DurgaEyeIcon";
import {
  Compass,
  MapPin,
  Sparkles,
  Route as RouteIcon,
  Train,
  Map,
  BookOpen,
  Utensils,
  Search,
  Languages,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Github,
} from "lucide-react";

export default function Navbar({ onOpenSearch }: { onOpenSearch?: () => void }) {
  const pathname = usePathname();
  const { language, toggleLanguage, t } = useLanguage();
  const { routePandals, setIsDrawerOpen } = useRoute();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open to prevent background bleed-through
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Primary desktop navigation links (essential tools)
  const primaryLinks = [
    {
      href: "/pandals",
      label: language === "bn" ? "মণ্ডপ" : "Pandals",
      fullLabel: language === "bn" ? "মণ্ডপ পরিক্রমা" : "Pandals",
      icon: MapPin,
    },
    {
      href: "/themes",
      label: language === "bn" ? "থিম" : "Themes",
      fullLabel: language === "bn" ? "এবারের থিম" : "Themes",
      icon: Sparkles,
    },
    {
      href: "/routes",
      label: language === "bn" ? "রুট" : "Routes",
      fullLabel: language === "bn" ? "পুজোর রুট" : "Routes",
      icon: RouteIcon,
    },
    {
      href: "/metro",
      label: language === "bn" ? "মেট্রো" : "Metro",
      fullLabel: language === "bn" ? "মেট্রো গাইড" : "Metro Guide",
      icon: Train,
    },
    {
      href: "/map",
      label: language === "bn" ? "মানচিত্র" : "Map",
      fullLabel: language === "bn" ? "মানচিত্র" : "Interactive Map",
      icon: Map,
    },
  ];

  // Secondary editorial items inside "More" dropdown
  const moreLinks = [
    {
      href: "/culture",
      label: language === "bn" ? "বাঙালির সংস্কৃতি" : "Bengali Culture",
      desc: language === "bn" ? "ঢাক, ধুনুচি, কুমারটুলি ও বনেদি বাড়ি" : "Rituals, stories, artisans & heritage",
      icon: BookOpen,
    },
    {
      href: "/food",
      label: language === "bn" ? "পুজোর খাওয়া-দাওয়া" : "Pujo Food & Adda",
      desc: language === "bn" ? "বিরিয়ানি, ফুচকা, মিষ্টি ও ঐতিহাসিক কেবিন" : "Iconic Kolkata delicacies & night trails",
      icon: Utensils,
    },
    {
      href: "/guide",
      label: language === "bn" ? "যাতায়াত নির্দেশিকা" : "Transit & Travel Guide",
      desc: language === "bn" ? "বাস, ট্রাম, ট্যাক্সি ও ভিড় নিয়ন্ত্রণ তথ্য" : "Metro, buses, trams, parking & safety",
      icon: Compass,
    },
  ];

  // Check if any "more" item is active
  const isMoreActive = moreLinks.some((item) => pathname === item.href);

  // All links for mobile menu
  const allMobileLinks = [
    { href: "/", label: language === "bn" ? "হোম পেজ" : "Home", icon: Compass },
    ...primaryLinks.map((l) => ({ href: l.href, label: l.fullLabel, icon: l.icon })),
    ...moreLinks.map((m) => ({ href: m.href, label: m.label, icon: m.icon })),
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#faf7ee]/95 backdrop-blur-md border-b border-[#c05621]/20 shadow-sm transition-all">
        {/* Top traditional micro border */}
        <div className="h-[3px] bg-gradient-to-r from-[#9b1b1b] via-[#d4af37] to-[#9b1b1b]" />

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 gap-2 sm:gap-4">
            
            {/* Logo & Bengali Typography */}
            <Link
              href="/"
              className="flex items-center space-x-2 sm:space-x-3 group focus:outline-none min-w-0 flex-shrink py-1"
              aria-label="Pujo Pathik Home"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#9b1b1b] flex items-center justify-center shadow-md group-hover:bg-[#c05621] transition-colors flex-shrink-0">
                <DurgaEyeIcon size={24} color="#faf7ee" />
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <span className="font-bengali-title text-lg sm:text-2xl font-bold tracking-tight text-[#9b1b1b] group-hover:text-[#c05621] transition-colors leading-tight whitespace-nowrap">
                  {language === "bn" ? "পুজো পথিক" : "Pujo Pathik"}
                </span>
                <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider text-[#8c6246] uppercase leading-none whitespace-nowrap mt-0.5">
                  {language === "bn" ? "কলকাতা ২০২৬" : "Kolkata 2026"}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5 flex-shrink">
              {primaryLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                      isActive
                        ? "bg-[#9b1b1b] text-[#faf7ee] shadow-sm"
                        : "text-stone-700 hover:text-[#9b1b1b] hover:bg-[#c05621]/10"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="xl:hidden">{link.label}</span>
                    <span className="hidden xl:inline">{link.fullLabel}</span>
                  </Link>
                );
              })}

              {/* "More" Dropdown Trigger */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    isMoreActive
                      ? "bg-[#9b1b1b] text-[#faf7ee] shadow-sm"
                      : "text-stone-700 hover:text-[#9b1b1b] hover:bg-[#c05621]/10"
                  }`}
                  aria-expanded={moreDropdownOpen}
                  aria-haspopup="true"
                >
                  <span className="font-bengali-sans">
                    {language === "bn" ? "আরও" : "More"}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      moreDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Panel */}
                {moreDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#faf7ee] border border-[#c05621]/20 shadow-2xl p-2 z-50 animate-fadeIn">
                    <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-3 py-1.5">
                      {language === "bn" ? "সাংস্কৃতিক গাইড" : "Cultural Trails"}
                    </div>
                    {moreLinks.map((item) => {
                      const isActive = pathname === item.href;
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMoreDropdownOpen(false)}
                          className={`flex items-start space-x-3 p-2.5 rounded-xl transition-colors ${
                            isActive
                              ? "bg-[#9b1b1b] text-white"
                              : "hover:bg-[#c05621]/10 text-stone-800"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                              isActive
                                ? "bg-white/20 text-white"
                                : "bg-[#9b1b1b]/10 text-[#9b1b1b]"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold leading-tight font-bengali-title">
                              {item.label}
                            </span>
                            <span
                              className={`text-[11px] leading-snug mt-0.5 ${
                                isActive ? "text-stone-200" : "text-stone-500"
                              }`}
                            >
                              {item.desc}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </nav>

            {/* Right Action Icons & Badges */}
            <div className="flex items-center space-x-1.5 sm:space-x-3 flex-shrink-0">
              {/* Search Trigger (Desktop / Tablet, mobile uses drawer or bottom nav) */}
              <button
                onClick={onOpenSearch}
                className="hidden sm:flex p-2 rounded-full text-stone-700 hover:text-[#9b1b1b] hover:bg-[#c05621]/10 transition-colors"
                title={language === "bn" ? "অনুসন্ধান করুন" : "Search pandals and stations"}
                aria-label="Search"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-1 sm:space-x-1.5 px-2 py-1.5 sm:px-3 sm:py-1.5 rounded-full border border-[#9b1b1b]/30 bg-white/90 hover:bg-[#9b1b1b]/10 text-xs font-bold text-[#9b1b1b] transition-all shadow-sm whitespace-nowrap active:scale-95"
                title="Switch language"
              >
                <Languages className="w-3.5 h-3.5 text-[#9b1b1b] flex-shrink-0" />
                <span className="hidden sm:inline">{language === "bn" ? "English" : "বাংলা"}</span>
                <span className="sm:hidden text-[11px] font-bold">{language === "bn" ? "EN" : "বাং"}</span>
              </button>

              {/* My Route Pill (Desktop / Tablet) */}
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="hidden sm:flex relative items-center space-x-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#9b1b1b] hover:bg-[#771d1d] text-[#faf7ee] text-xs font-bold shadow-md transition-all active:scale-95 whitespace-nowrap"
                aria-label="Open my route"
              >
                <RouteIcon className="w-4 h-4 text-[#d4af37]" />
                <span className="font-bengali-title">{t.myRoute}</span>
                {routePandals.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 rounded-full bg-[#d4af37] text-stone-900 text-[10px] font-bold leading-none animate-bounce">
                    {routePandals.length}
                  </span>
                )}
              </button>

              {/* Mobile / Tablet Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-stone-800 hover:text-[#9b1b1b] hover:bg-[#c05621]/10 focus:outline-none transition-colors"
                aria-label="Toggle Navigation Menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-[#9b1b1b]" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Semi-Transparent Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] lg:hidden animate-fadeIn"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile & Tablet Full Slide-Over Sheet (Strictly z-[100] above bottom nav, map & all content) */}
      <aside
        className={`fixed top-0 right-0 bottom-0 w-full max-w-[320px] sm:max-w-sm bg-[#faf7ee] z-[100] shadow-2xl flex flex-col lg:hidden border-l border-[#c05621]/20 transition-transform duration-300 ease-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
        aria-label="Mobile Navigation Drawer"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#c05621]/20 bg-[#f4ede0]/80 flex-shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-full bg-[#9b1b1b] flex items-center justify-center shadow-md">
              <DurgaEyeIcon size={22} color="#faf7ee" />
            </div>
            <div>
              <div className="font-bengali-title text-lg font-bold text-[#9b1b1b] leading-tight">
                {language === "bn" ? "পুজো পথিক" : "Pujo Pathik"}
              </div>
              <div className="text-[10px] font-semibold text-[#8c6246] uppercase tracking-wider">
                {language === "bn" ? "কলকাতা ২০২৬" : "Kolkata 2026"}
              </div>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-full text-stone-600 hover:text-[#9b1b1b] hover:bg-stone-200/60 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Action Bar inside Drawer */}
        <div className="p-3.5 border-b border-[#c05621]/15 bg-white/60 space-y-2 flex-shrink-0">
          {/* Quick Search Button */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSearch?.();
            }}
            className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl bg-white border border-[#c05621]/25 text-stone-500 hover:text-stone-800 text-xs font-medium shadow-sm transition-all text-left active:scale-[0.98]"
          >
            <Search className="w-4 h-4 text-[#9b1b1b] flex-shrink-0" />
            <span className="truncate">{t.searchPlaceholder}</span>
          </button>

          {/* Quick Route Status Pill */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setIsDrawerOpen(true);
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-[#9b1b1b]/10 border border-[#9b1b1b]/20 hover:bg-[#9b1b1b]/15 transition-colors text-left active:scale-[0.98]"
          >
            <div className="flex items-center space-x-2 text-xs font-bold text-[#9b1b1b]">
              <RouteIcon className="w-4 h-4 text-[#d4af37]" />
              <span className="font-bengali-title">
                {language === "bn" ? "আমার পছন্দের রুট" : "My Pujo Route"}
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#9b1b1b] text-white text-[10px] font-bold">
              {routePandals.length} {language === "bn" ? "মণ্ডপ" : "saved"}
            </span>
          </button>
        </div>

        {/* Scrollable Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3.5 py-3 space-y-4">
          {/* Primary Exploration Group */}
          <div>
            <div className="text-[10px] font-bold text-[#8c6246] uppercase tracking-wider px-2.5 mb-1.5 font-bengali-sans">
              {language === "bn" ? "মূল পরিক্রমা" : "Core Discovery"}
            </div>
            <div className="space-y-1">
              {allMobileLinks.slice(0, 6).map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#9b1b1b] text-[#faf7ee] font-semibold shadow-sm"
                        : "text-stone-800 hover:bg-[#c05621]/10"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-4 h-4 ${isActive ? "text-[#d4af37]" : "text-[#9b1b1b]"}`} />
                      <span className="font-bengali-title">{link.label}</span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 ${isActive ? "text-[#d4af37]" : "text-stone-400"}`} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Cultural & Food Guides Group */}
          <div>
            <div className="text-[10px] font-bold text-[#8c6246] uppercase tracking-wider px-2.5 mb-1.5 font-bengali-sans">
              {language === "bn" ? "সংস্কৃতি, রসনা ও গাইড" : "Culture, Food & Guide"}
            </div>
            <div className="space-y-1">
              {allMobileLinks.slice(6).map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#9b1b1b] text-[#faf7ee] font-semibold shadow-sm"
                        : "text-stone-800 hover:bg-[#c05621]/10"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-4 h-4 ${isActive ? "text-[#d4af37]" : "text-[#9b1b1b]"}`} />
                      <span className="font-bengali-title">{link.label}</span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 ${isActive ? "text-[#d4af37]" : "text-stone-400"}`} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Drawer Footer with Info & Contributor Credits */}
        <div className="p-3.5 border-t border-[#c05621]/20 bg-[#f4ede0]/90 space-y-1.5 flex-shrink-0">
          <div className="flex items-center justify-between text-xs text-stone-700">
            <span className="font-bold text-stone-800">
              {language === "bn" ? "যোগাযোগ ও নির্দেশক:" : "Curator & Contact:"}
            </span>
            <a
              href="https://github.com/Anay007-git"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-[#9b1b1b] font-bold hover:underline text-[11px]"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Anay007-git</span>
            </a>
          </div>
          <div className="text-[11px] text-stone-600 leading-snug space-y-0.5">
            <div>
              <strong className="text-stone-800">Anay Biswas</strong> •{" "}
              <a href="mailto:biswasanay07@gmail.com" className="text-[#9b1b1b] hover:underline">
                biswasanay07@gmail.com
              </a>
            </div>
            <div>
              WhatsApp:{" "}
              <a
                href="https://wa.me/919804239301"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9b1b1b] hover:underline font-semibold"
              >
                9804239301
              </a>
            </div>
            <div className="text-[10px] text-stone-500">Acharya Prafulla Pally, Rammalir Math, Kol: 700111</div>
          </div>
        </div>
      </aside>
    </>
  );
}
