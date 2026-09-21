"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import AlpanaDivider from "@/components/animations/AlpanaDivider";
import {
  Train,
  Bus,
  Car,
  Footprints,
  Compass,
  AlertCircle,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function PublicTransportGuide() {
  const { language, t } = useLanguage();

  const modes = [
    {
      title: "Kolkata Metro",
      bengaliTitle: "কলকাতা মেট্রো",
      icon: Train,
      color: "text-blue-600 bg-blue-50 border-blue-200",
      speed: "Fastest / Reliable",
      bengaliSpeed: "সবচেয়ে দ্রুত ও জ্যামমুক্ত",
      summary: "The undisputed lifeline for cross-city pandal hopping during Durga Puja.",
      bengaliSummary: "উত্তর থেকে দক্ষিণ কলকাতার মধ্যে নির্বিঘ্ন যাতায়াতের সেরা মাধ্যম।",
      details: [
        "Blue Line (Dakshineswar to Kavi Subhash) connects Shyambazar, Sovabazar, MG Road, and Kalighat.",
        "Green Line connects Sealdah railway hub to Salt Lake FD and BJ blocks directly.",
        "Runs special all-night services with trains every 6-8 mins on Saptami, Ashtami & Navami.",
        "Smart Cards and Kolkata Metro app QR tickets are recommended to skip ticket counter queues.",
      ],
      tip: "Avoid surface taxis during peak evening 7 PM – 11 PM; stick to the Metro underground.",
    },
    {
      title: "Public Buses (CSTC & Private)",
      bengaliTitle: "সরকারি ও বেসরকারি বাস",
      icon: Bus,
      color: "text-amber-600 bg-amber-50 border-amber-200",
      speed: "Widespread Reach",
      bengaliSpeed: "শহরের সর্বত্র সংযোগ",
      summary: "Crucial for destinations not directly on metro corridors like VIP Road (Sreebhumi).",
      bengaliSummary: "ভিআইপি রোড, সল্টলেক বাইপাস ও বেহালার বিস্তীর্ণ অঞ্চলে যাতায়াতের অন্যতম ভরসা।",
      details: [
        "Special all-night Pujo Parikrama buses operated by WBTC from Howrah, Esplanade, and Gariahat.",
        "VIP Road airport routes (46B, 217, AC 37) drop right at Lake Town foot overbridge for Sreebhumi.",
        "Expect diversions near major pandal gates designated by Kolkata Traffic Police.",
      ],
      tip: "Board buses from designated major terminal stops rather than mid-route barricaded signals.",
    },
    {
      title: "Suburban Local Trains",
      bengaliTitle: "লোকাল ট্রেন ও সার্কুলার রেল",
      icon: Train,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
      speed: "Ideal for Regional Visitors",
      bengaliSpeed: "মফস্বল ও শহরতলীর জন্য",
      summary: "High-capacity transit connecting suburban districts, Howrah, and Sealdah.",
      bengaliSummary: "শহরতলী থেকে আগত লাখো মানুষের শহরের কেন্দ্রস্থলে পৌঁছানোর প্রধান বাহন।",
      details: [
        "Sealdah Main and South sections run round-the-clock EMU suburban locals.",
        "Circular Railway stations (Bagbazar, Sovabazar Ghat) drop directly onto the riverfront pandal trail.",
        "Ballygunge Junction is the best rail gateway for Gariahat and South Kolkata.",
      ],
      tip: "Circular Railway at Bagbazar provides an unforgettable riverfront entrance to North Kolkata.",
    },
    {
      title: "Yellow Taxis & App Cabs",
      bengaliTitle: "হলুদ ট্যাক্সি ও অ্যাপ ক্যাব",
      icon: Car,
      color: "text-amber-500 bg-amber-50 border-amber-200",
      speed: "Comfort / Point-to-Point",
      bengaliSpeed: "পারিবারিক সুবিধা",
      summary: "Best for late-night journeys when returning home after 2 AM.",
      bengaliSummary: "মাঝরাতে দূরপাল্লার বাড়ি ফেরার জন্য অথবা প্রবীণদের সাথে ভ্রমণের জন্য উপযুক্ত।",
      details: [
        "Private vehicles and cabs face strict one-way diversions around major corridors like Rashbehari.",
        "Designated app cab pickup/drop zones set up along EM Bypass, Southern Avenue, and Central Avenue.",
        "Surge pricing is common during peak hours (8 PM – 1 AM); consider Metro first.",
      ],
      tip: "Set your drop-off 300 meters away on arterial roads rather than attempting to enter pandal lanes.",
    },
    {
      title: "Shared Auto-Rickshaws & Totos",
      bengaliTitle: "শেয়ার্ড অটো ও টোটো",
      icon: Zap,
      color: "text-orange-600 bg-orange-50 border-orange-200",
      speed: "Last-Mile Agility",
      bengaliSpeed: "লাস্ট-মাইল সংযোগ",
      summary: "The quintessential Kolkata connector navigating narrow inner alleys.",
      bengaliSummary: "মেট্রো স্টেশন থেকে গলির ভেতরের মণ্ডপ পৌঁছানোর সবচেয়ে কার্যকর মাধ্যম।",
      details: [
        "Fixed-route shared autos connect stations: Dum Dum to Lake Town, Kalighat to Gariahat.",
        "Battery-operated Totos are widespread in Salt Lake, New Town, and North suburban zones.",
        "Drivers are intimately familiar with local police barricades and open bypass routes.",
      ],
      tip: "Keep small cash notes and coins handy for swift auto hopping.",
    },
    {
      title: "Heritage Walking",
      bengaliTitle: "পায়ে হেঁটে পরিক্রমা",
      icon: Footprints,
      color: "text-red-700 bg-red-50 border-red-200",
      speed: "The True Soul of Pujo",
      bengaliSpeed: "পুজোর খাঁটি আনন্দ",
      summary: "Durga Puja is fundamentally experienced on foot amidst streetlights and melodies.",
      bengaliSummary: "কলকাতার পুজো মানেই বন্ধুদের সঙ্গে পায়ে হেঁটে মণ্ডপ থেকে মণ্ডপে আড্ডা।",
      details: [
        "Between adjacent pandals (e.g. Ekdalia to Hindusthan Park to Deshapriya), walking is 3x faster than cars.",
        "Pedestrian barricades protect walking corridors from all vehicular traffic.",
        "Wear broken-in comfortable walking sneakers; Kolkata roads can demand 10,000+ steps per night.",
      ],
      tip: "Carry a reusable water bottle and wet wipes; stay hydrated in the autumn humidity.",
    },
  ];

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#9b1b1b] mb-1">
            <Compass className="w-4 h-4 text-[#c05621]" />
            <span>{language === "bn" ? "কলকাতা উৎসব পরিবহন নির্দেশিকা" : "Public Transit & City Mobility"}</span>
          </div>
          <h2 className="font-bengali-title text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
            {language === "bn" ? "কীভাবে যাবেন?" : "How to Navigate Kolkata?"}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2 font-medium">
            {language === "bn"
              ? "উৎসবের দিনগুলোতে কলকাতার পথঘাট, মেট্রো ও বিশেষ যাতায়াত নির্দেশিকা।"
              : "Verified transport intelligence to bypass gridlock and hop effortlessly across the city."}
          </p>
          <AlpanaDivider variant="red" className="my-5 max-w-sm" />
        </div>

        {/* 6 Modes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modes.map((mode, idx) => {
            const Icon = mode.icon;

            return (
              <div
                key={idx}
                className="festive-card rounded-3xl p-6 border border-[#c05621]/20 shadow-md flex flex-col justify-between"
              >
                <div>
                  {/* Mode Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${mode.color}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#9b1b1b] bg-[#9b1b1b]/10 px-2.5 py-1 rounded-full">
                      {language === "bn" ? mode.bengaliSpeed : mode.speed}
                    </span>
                  </div>

                  <h3 className="font-bengali-title text-xl sm:text-2xl font-bold text-stone-900 mb-1">
                    {language === "bn" ? mode.bengaliTitle : mode.title}
                  </h3>
                  <p className="text-xs text-stone-600 font-medium mb-4 leading-relaxed">
                    {language === "bn" ? mode.bengaliSummary : mode.summary}
                  </p>

                  {/* Bullet points */}
                  <ul className="space-y-2 text-xs text-stone-700 mb-4">
                    {mode.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9b1b1b] mt-1.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Insider Transit Tip */}
                <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 text-[11px] text-amber-900 mt-2">
                  <strong>Insider Advice: </strong>
                  {mode.tip}
                </div>
              </div>
            );
          })}
        </div>

        {/* Official Police Advisory Box */}
        <div className="mt-12 p-6 rounded-3xl bg-white border border-[#9b1b1b]/30 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-3">
            <ShieldCheck className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bengali-title text-base font-bold text-stone-900">
                {language === "bn" ? "কলকাতা ট্র্যাফিক পুলিশ পরামর্শ ২০২৬" : "Official Traffic Police Guidelines"}
              </h4>
              <p className="text-xs text-stone-600 mt-0.5">
                Special pedestrian-only corridors come into effect from 4:00 PM to 4:00 AM daily from Panchami to Dashami.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs text-stone-500 flex-shrink-0">
            <span>Emergency Police Helpline: <strong>100 / 1070</strong></span>
          </div>
        </div>
      </div>
    </section>
  );
}

