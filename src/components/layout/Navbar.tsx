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
    <header className="sticky top-0 z-40 bg-[#faf7ee]/95 backdrop-blur-md border-b border-[#c05621]/20 shadow-sm transition-all">
      {/* Top traditional micro border */}
      <div className="h-[3px] bg-gradient-to-r from-[#9b1b1b] via-[#d4af37] to-[#9b1b1b]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-2 sm:gap-4">
          
          {/* Logo & Bengali Typography */}
          <Link
            href="/"
            className="flex items-center space-x-2.5 sm:space-x-3 group focus:outline-none flex-shrink-0 py-1"
            aria-label="Pujo Pathik Home"
          >
            <div className="w-10 h-10 rounded-full bg-[#9b1b1b] flex items-center justify-center shadow-md group-hover:bg-[#c05621] transition-colors flex-shrink-0">
              <DurgaEyeIcon size={26} color="#faf7ee" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-bengali-title text-xl sm:text-2xl font-bold tracking-tight text-[#9b1b1b] group-hover:text-[#c05621] transition-colors leading-tight whitespace-nowrap">
                {language === "bn" ? "পুজো পথিক" : "Pujo Pathik"}
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-[#8c6246] uppercase leading-none whitespace-nowrap mt-0.5">
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
          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-full text-stone-700 hover:text-[#9b1b1b] hover:bg-[#c05621]/10 transition-colors"
              title={language === "bn" ? "অনুসন্ধান করুন" : "Search pandals and stations"}
              aria-label="Search"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full border border-[#9b1b1b]/30 bg-white/80 hover:bg-[#9b1b1b]/10 text-xs font-bold text-[#9b1b1b] transition-all shadow-sm whitespace-nowrap active:scale-95"
              title="Switch language"
            >
              <Languages className="w-3.5 h-3.5 text-[#9b1b1b]" />
              <span>{language === "bn" ? "English" : "বাংলা"}</span>
            </button>

            {/* My Route Pill */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative flex items-center space-x-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#9b1b1b] hover:bg-[#771d1d] text-[#faf7ee] text-xs font-bold shadow-md transition-all active:scale-95 whitespace-nowrap"
              aria-label="Open my route"
            >
              <RouteIcon className="w-4 h-4 text-[#d4af37]" />
              <span className="hidden sm:inline font-bengali-title">{t.myRoute}</span>
              {routePandals.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-[#d4af37] text-stone-900 text-[10px] font-bold leading-none animate-bounce">
                  {routePandals.length}
                </span>
              )}
            </button>

            {/* Mobile / Tablet Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-700 hover:text-[#9b1b1b] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#c05621]/20 bg-[#faf7ee] px-4 pt-3 pb-6 space-y-1 shadow-2xl animate-fadeIn max-h-[80vh] overflow-y-auto">
          <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-3 py-1">
            {language === "bn" ? "ন্যাভিগেশন মেনু" : "Navigation"}
          </div>
          {allMobileLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#9b1b1b] text-[#faf7ee] font-semibold"
                    : "text-stone-800 hover:bg-[#c05621]/15"
                }`}
              >
                <Icon className="w-4 h-4 text-[#d4af37]" />
                <span className="font-bengali-title">{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
