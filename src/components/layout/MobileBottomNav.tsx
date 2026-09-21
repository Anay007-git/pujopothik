"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useRoute } from "@/context/RouteContext";
import {
  Compass,
  MapPin,
  Map,
  Route as RouteIcon,
  MoreHorizontal,
  Search,
} from "lucide-react";

export default function MobileBottomNav({ onOpenSearch }: { onOpenSearch?: () => void }) {
  const pathname = usePathname();
  const { t, language } = useLanguage();
  const { routePandals, setIsDrawerOpen } = useRoute();

  const tabs = [
    { href: "/", label: language === "bn" ? "হোম" : "Home", icon: Compass },
    { href: "/pandals", label: language === "bn" ? "মণ্ডপ" : "Explore", icon: MapPin },
    { href: "/map", label: language === "bn" ? "মানচিত্র" : "Map", icon: Map },
    {
      href: "/routes",
      label: language === "bn" ? "রুট" : "Route",
      icon: RouteIcon,
      badge: routePandals.length,
      onClick: (e: React.MouseEvent) => {
        // Optional quick toggle drawer or direct page navigation
      },
    },
    { href: "/guide", label: language === "bn" ? "গাইড" : "More", icon: MoreHorizontal },
  ];

  return (
    <>
      {/* Floating Search Pill on Mobile */}
      <div className="fixed bottom-20 right-4 z-40 md:hidden">
        <button
          onClick={onOpenSearch}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-full bg-[#9b1b1b] text-[#faf7ee] shadow-xl hover:bg-[#771d1d] active:scale-95 transition-all border border-[#d4af37]/40"
          aria-label="Search Pandals"
        >
          <Search className="w-4 h-4 text-[#d4af37]" />
          <span className="text-xs font-semibold">
            {language === "bn" ? "খুঁজুন" : "Search"}
          </span>
        </button>
      </div>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#faf7ee]/95 backdrop-blur-lg border-t border-[#c05621]/20 shadow-2xl px-2 py-1 safe-bottom"
        aria-label="Mobile Navigation"
      >
        <div className="grid grid-cols-5 items-center justify-around">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            const Icon = tab.icon;

            return (
              <Link
                key={tab.href}
                href={tab.href}
                onClick={tab.onClick}
                className={`relative flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
                  isActive
                    ? "text-[#9b1b1b] font-bold"
                    : "text-stone-600 hover:text-[#9b1b1b]"
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 transition-transform ${isActive ? "scale-110" : ""}`} />
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-[#d4af37] text-stone-900 text-[9px] font-black flex items-center justify-center shadow">
                      {tab.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] mt-1 tracking-tight leading-none">
                  {tab.label}
                </span>
                {isActive && (
                  <span className="absolute bottom-0.5 w-1.5 h-1.5 rounded-full bg-[#9b1b1b]" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

