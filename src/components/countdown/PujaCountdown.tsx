"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Calendar, Sparkles, Clock, ChevronRight, Info, CheckCircle2, Moon, Sun, Flame } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface DetailedFestivalDay {
  id: string;
  title: string;
  bengaliTitle: string;
  date: string;
  bengaliDate: string;
  tag: string;
  bengaliTag: string;
  rituals: string[];
  bengaliRituals: string[];
  timings: string;
  bengaliTimings: string;
  significance: string;
  bengaliSignificance: string;
  bgClass: string;
  badgeClass: string;
}

export const FESTIVAL_SCHEDULE: DetailedFestivalDay[] = [
  {
    id: "mahalaya",
    title: "Mahalaya",
    bengaliTitle: "মহালয়া",
    date: "10 October 2026",
    bengaliDate: "১০ অক্টোবর ২০২৬, শনিবার",
    tag: "Chokkhudaan & Tarpan",
    bengaliTag: "চক্ষুদান ও পিতৃ তর্পণ",
    rituals: [
      "Tarpan at Ganga Ghats (Babu Ghat, Bagbazar, Ahiritola)",
      "Iconic 4:00 AM Birendra Krishna Bhadra Chandi Path on All India Radio",
      "Chokkhudaan: Sculptors painting the third eye of Maa Durga in Kumartuli",
    ],
    bengaliRituals: [
      "গঙ্গার বিভিন্ন ঘাটে (বাবুঘাট, বাগবাজার, আহিরীটোলা) পিতৃপুরুষের উদ্দেশে তর্পণ",
      "ভোর ৪:০০ টায় আকাশবাণীতে বীরেন্দ্রকৃষ্ণ ভদ্রের উদাত্ত কণ্ঠে মহিষাসুরমর্দিনী",
      "কুমারটুলিতে শিল্পীদের হাতে দেবীর ত্রিনয়নে পবিত্র চক্ষুদান পর্ব",
    ],
    timings: "Dawn 04:00 AM – 09:30 AM (Tarpan & Chandi Path)",
    bengaliTimings: "ভোর ৪:০০ – সকাল ৯:৩০ (তর্পণ ও চণ্ডীপাঠ)",
    significance:
      "The herald of the divine homecoming. Pitru Paksha concludes and Devi Paksha begins, awakening the goddess to descend to earth.",
    bengaliSignificance:
      "পিতৃপক্ষের অবসান ও দেবীপক্ষের শুভ সূচনা। স্বর্গ থেকে মর্তে মা দুর্গার আগমনের বার্তা নিয়ে আসে মহালয়ার পুণ্য প্রভাত।",
    bgClass: "border-[#9b1b1b]/40 bg-gradient-to-br from-[#9b1b1b]/10 to-[#9b1b1b]/5 text-[#9b1b1b]",
    badgeClass: "bg-[#9b1b1b] text-white",
  },
  {
    id: "shashthi",
    title: "Maha Shashthi",
    bengaliTitle: "মহা ষষ্ঠী",
    date: "16 October 2026",
    bengaliDate: "১৬ অক্টোবর ২০২৬, শুক্রবার",
    tag: "Bodhon & Adhibas",
    bengaliTag: "বোধন, আমন্ত্রণ ও অধিবাস",
    rituals: [
      "Kalparambha (Formal commencement of Puja vows)",
      "Bodhon under the sacred Bilva (Bel) tree",
      "Amantran & Adhibas rituals invoking the divine presence",
    ],
    bengaliRituals: [
      "কল্পারম্ভ ও সংকল্প গ্রহণ",
      "বেলতলায় শ্রীশ্রীদেবী দুর্গার শুভারম্ভ ও বোধন",
      "দেবীর আমন্ত্রণ ও মঙ্গল অধিবাস পর্ব",
    ],
    timings: "Evening 06:15 PM – 08:30 PM (Bodhon & Aarti)",
    bengaliTimings: "সন্ধ্যা ৬:১৫ – রাত ৮:৩০ (বোধন ও অধিবাস)",
    significance:
      "The ceremonial awakening of the Goddess. Faces of the idols are unveiled across Kolkata's grand pandals as festivities officially begin.",
    bengaliSignificance:
      "দেবীর প্রাণপ্রতিষ্ঠা ও মণ্ডপে মণ্ডপে প্রতিমার আবরণ উন্মোচন। ঢাকের আওয়াজে আনুষ্ঠানিকভাবে উৎসবের উন্মাদনা শুরু হয়।",
    bgClass: "border-stone-200 bg-white/90 text-stone-800",
    badgeClass: "bg-stone-800 text-stone-100",
  },
  {
    id: "saptami",
    title: "Maha Saptami",
    bengaliTitle: "মহা সপ্তমী",
    date: "17 October 2026",
    bengaliDate: "১৭ অক্টোবর ২০২৬, শনিবার",
    tag: "Nabapatrika Snan",
    bengaliTag: "নবপত্রিকা প্রবেশ ও স্নান",
    rituals: [
      "Nabapatrika (Kola Bou) sacred bathing at the Hooghly river at dawn",
      "Draping in red-bordered white sari & consecration beside Lord Ganesha",
      "Saptami Vihita Puja, 16 Upacharas, and grand Pushpanjali",
    ],
    bengaliRituals: [
      "ভোরে গঙ্গার ঘাটে পবিত্র নবপত্রিকা (কলাবউ) স্নান ও অভিষেক",
      "লালপেড়ে শাড়ি পরিয়ে গণেশের পাশে শুভ নবপত্রিকা স্থাপন",
      "মহাসপ্তমী বিহিত পূজা ও ভক্তদের পুষ্পাঞ্জলি নিবেদন",
    ],
    timings: "Morning 06:00 AM – 10:30 AM (Snan & Pushpanjali)",
    bengaliTimings: "সকাল ৬:০০ – ১০:৩০ (নবপত্রিকা স্নান ও অঞ্জলি)",
    significance:
      "Celebration of nature and the agrarian cosmic mother represented by nine sacred plants, uniting flora and divinity.",
    bengaliSignificance:
      "প্রকৃতি ও দেবীর একাত্মতা—নয়টি বিশেষ উদ্ভিদের মাধ্যমে শক্তির অধিষ্ঠান ও পূজা। শহরের রাজপথে জনস্রোতের সূচনা।",
    bgClass: "border-stone-200 bg-white/90 text-stone-800",
    badgeClass: "bg-amber-700 text-white",
  },
  {
    id: "ashtami",
    title: "Maha Ashtami",
    bengaliTitle: "মহা অষ্টমী",
    date: "19 October 2026",
    bengaliDate: "১৯ অক্টোবর ২০২৬, সোমবার",
    tag: "Sandhi Puja (108 Lotuses)",
    bengaliTag: "মহা সন্ধিপূজা ও ১০৮ পদ্ম",
    rituals: [
      "Maha Ashtami morning Pushpanjali in traditional new attire",
      "Kumari Puja: Worshipping young prepubescent girls as living incarnations of Maa",
      "Sandhi Puja: Sacred junction of Ashtami & Navami with 108 lotuses & 108 earthen lamps",
    ],
    bengaliRituals: [
      "নতুন পোশাকে মহাষ্টমীর পরম পবিত্র অঞ্জলি অর্পণ",
      "কুমারী পূজা: কুমারী কন্যার মধ্যে জগজ্জননীর জীবন্ত রূপ আরাধনা",
      "সন্ধিপূজার মাহেন্দ্রক্ষণে ১০৮টি নীলপদ্ম ও ১০৮টি মাটির প্রদীপ প্রজ্বলন",
    ],
    timings: "Sandhi Puja Mahurata: Night 08:14 PM – 09:02 PM",
    bengaliTimings: "সন্ধিপূজার মাহেন্দ্রক্ষণ: রাত ৮:১৪ – ৯:০২",
    significance:
      "The pinnacle of Durga Puja. Maa Chamunda slayed Chanda and Munda during the mystical 48-minute transition between Ashtami and Navami.",
    bengaliSignificance:
      "দুর্গাপূজার পরম লগ্ন। দেবী চামুণ্ডার চণ্ড-মুণ্ড বধের স্মারক সন্ধিক্ষণ। ১০৮ পদ্ম ও প্রদীপের আভায় সমগ্র শহর প্রার্থনায় মগ্ন হয়।",
    bgClass: "border-[#d4af37] bg-gradient-to-br from-[#d4af37]/20 to-[#faf7ee] text-[#865434] shadow-md",
    badgeClass: "bg-[#d4af37] text-stone-900 font-bold",
  },
  {
    id: "navami",
    title: "Maha Navami",
    bengaliTitle: "মহা নবমী",
    date: "20 October 2026",
    bengaliDate: "২০ অক্টোবর ২০২৬, মঙ্গলবার",
    tag: "Dhunuchi Naach & Aarti",
    bengaliTag: "ধুনুচি নাচ ও মহানবমী হোম",
    rituals: [
      "Navami Vihita Puja followed by grand Navami Maha Yajna (Homa)",
      "Traditional Dhunuchi Naach competition with hypnotic beats of Kaashor & Dhaak",
      "Evening Sandhya Aarti across historic bonedi baris and community pandals",
    ],
    bengaliRituals: [
      "মহানবমী বিহিত পূজা ও চণ্ডীপাঠান্তে পবিত্র হোম-যজ্ঞ সমাপন",
      "ধূপ-ধুনোর সুবাসে কাঁসর ও ঢাকের তালে আত্মহারা ধুনুচি নৃত্য প্রতিযোগিতা",
      "বনেদি বাড়ি ও বারোয়ারি মণ্ডপগুলিতে অবিস্মরণীয় মহা সন্ধ্যারতি",
    ],
    timings: "Evening 06:30 PM – 11:00 PM (Dhunuchi Naach & Melas)",
    bengaliTimings: "সন্ধ্যা ৬:৩০ – রাত ১১:০০ (ধুনুচি নাচ ও মেলা)",
    significance:
      "Celebration of the triumphant victory over Mahishasura. The final evening of unbridled pandal-hopping before the emotional farewell.",
    bengaliSignificance:
      "মহিষাসুরমর্দিনীর চূড়ান্ত বিজয়োল্লাস। শেষ রাতের আবেগঘন ঠাকুর দেখা, আড্ডা ও রাতভর উৎসবের মহামিলন।",
    bgClass: "border-stone-200 bg-white/90 text-stone-800",
    badgeClass: "bg-[#c05621] text-white",
  },
  {
    id: "dashami",
    title: "Vijaya Dashami",
    bengaliTitle: "বিজয়া দশমী",
    date: "21 October 2026",
    bengaliDate: "২১ অক্টোবর ২০২৬, বুধবার",
    tag: "Sindoor Khela & Bisarjan",
    bengaliTag: "সিঁদুর খেলা ও বিসর্জন",
    rituals: [
      "Aparajita Puja, Darpan Visarjan (seeing the Goddess in the mirror water)",
      "Sindoor Khela: Married women smearing vermilion and offering sweets to Maa",
      "Immersion procession (Bisarjan) along Hooghly river ghats with chants of 'Aschhe bochor abar hobe!'",
    ],
    bengaliRituals: [
      "অপরাজিতা পূজা ও জলপাত্রের দর্পণে দেবীর প্রতিবিম্ব বিসর্জন",
      "সিঁদুর খেলা: উলুধ্বনি ও মিষ্টিমুখে দেবীবরণ এবং পারস্পরিক সৌহার্দ্য",
      "গঙ্গার ঘাটে বর্ণাঢ্য শোভাযাত্রা ও দেবীর ভাসান: 'আসছে বছর আবার হবে!'",
    ],
    timings: "Afternoon 02:00 PM – Night 10:00 PM (Sindoor Khela & Immersion)",
    bengaliTimings: "দুপুর ২:০০ – রাত ১০:০০ (সিঁদুর খেলা ও বিসর্জন)",
    significance:
      "An emotional farewell as Maa Durga returns to Mount Kailash. The festival concludes with touching elders' feet, warm embraces (Kula-kuli), and sharing sweets.",
    bengaliSignificance:
      "কৈলাসে উমার পতিগৃহে প্রত্যাবর্তন। চোখের জলে বিদায় ও বিজয়ার মিষ্টিমুখ, শুভকামনা এবং বড়দের প্রণাম জানানোর ঐতিহ্য।",
    bgClass: "border-[#9b1b1b] bg-gradient-to-br from-[#9b1b1b]/15 to-[#faf7ee] text-[#9b1b1b]",
    badgeClass: "bg-[#9b1b1b] text-white",
  },
];

export default function PujaCountdown() {
  const { language, t } = useLanguage();

  // Target: Mahalaya, October 10, 2026 00:00:00 IST
  const targetDate = new Date("2026-10-10T00:00:00+05:30").getTime();

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [selectedDay, setSelectedDay] = useState<DetailedFestivalDay>(FESTIVAL_SCHEDULE[0]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section className="relative z-20 -mt-6 sm:-mt-10 max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 w-full">
      {/* Main Countdown Card */}
      <div className="bg-[#faf7ee] rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-[#9b1b1b]/20 p-4 sm:p-7 md:p-8 backdrop-blur-xl">
        {/* Header with Title & Clock */}
        <div className="text-center mb-5 sm:mb-7">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#9b1b1b]/10 text-[#9b1b1b] text-xs font-bold uppercase tracking-widest mb-1.5 border border-[#9b1b1b]/20 shadow-sm">
            <Clock className="w-3.5 h-3.5 text-[#c05621] animate-spin" style={{ animationDuration: "12s" }} />
            <span>{t.countdownTitle}</span>
          </div>
          <h2 className="font-bengali-title text-xl sm:text-3xl md:text-4xl font-bold text-stone-900 leading-tight">
            {language === "bn" ? "শরতের আগমন বার্তা ২০২৬" : "Autumn Calling: Durga Puja 2026"}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-lg mx-auto">
            {language === "bn"
              ? "মহালয়া থেকে বিজয়া দশমী—উৎসবের দিনক্ষণ ও আচার-অনুষ্ঠানের পুঙ্খানুপুঙ্খ বিবরণ"
              : "Live countdown and comprehensive sacred ritual schedule from Mahalaya to Vijaya Dashami"}
          </p>
        </div>

        {/* 4-Box Bengali & English Counter Grid (Optimized for Mobile) */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md sm:max-w-xl mx-auto mb-7 sm:mb-9">
          {[
            { value: timeLeft.days, label: t.days, altLabel: "Days" },
            { value: timeLeft.hours, label: t.hours, altLabel: "Hours" },
            { value: timeLeft.minutes, label: t.minutes, altLabel: "Mins" },
            { value: timeLeft.seconds, label: t.seconds, altLabel: "Secs" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-2 sm:p-3.5 md:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-b from-white via-[#fcfbfa] to-[#f7f1e6] border border-[#c05621]/25 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="font-bengali-title text-xl sm:text-3xl md:text-5xl font-extrabold text-[#9b1b1b] tracking-tight leading-none">
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase text-stone-700 mt-1 sm:mt-1.5 truncate">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Festival Schedule Section with Rich Detailed Day Cards */}
        <div className="pt-5 sm:pt-6 border-t border-[#c05621]/20">
          <div className="flex items-center justify-between mb-3.5 text-xs font-bold tracking-wider uppercase text-stone-700">
            <span className="flex items-center space-x-1.5">
              <Calendar className="w-4 h-4 text-[#9b1b1b]" />
              <span className="text-stone-900 font-semibold">
                {language === "bn" ? "শারদোৎসব নির্ঘণ্ট ২০২৬ (পুঙ্খানুপুঙ্খ সূচি)" : "Official Festival Schedule 2026"}
              </span>
            </span>
            <span className="text-stone-500 text-[11px] hidden sm:inline">
              {language === "bn" ? "যেকোনো দিনে ট্যাপ করে সম্পূর্ণ তিথি ও আচার দেখুন →" : "Tap any day to inspect full rituals →"}
            </span>
          </div>

          {/* Swipeable / Touch Day Cards Row */}
          <div className="flex items-stretch gap-2.5 sm:gap-3.5 overflow-x-auto pb-3 pt-1 scroll-smooth no-scrollbar">
            {FESTIVAL_SCHEDULE.map((day) => {
              const isSelected = selectedDay.id === day.id;
              return (
                <button
                  key={day.id}
                  onClick={() => {
                    setSelectedDay(day);
                    setIsDetailModalOpen(true);
                  }}
                  className={`flex-shrink-0 w-44 sm:w-52 p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all duration-200 active:scale-95 ${
                    day.bgClass
                  } ${
                    isSelected
                      ? "ring-2 ring-[#9b1b1b] shadow-md scale-[1.02]"
                      : "hover:shadow-md hover:-translate-y-0.5"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider opacity-80">
                      {language === "bn" ? day.bengaliDate.split(",")[0] : day.date}
                    </span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${day.badgeClass}`}>
                      {language === "bn" ? "তিথি" : "Tithi"}
                    </span>
                  </div>

                  <h4 className="font-bengali-title text-base sm:text-lg font-bold leading-tight mt-0.5">
                    {language === "bn" ? day.bengaliTitle : day.title}
                  </h4>

                  <div className="mt-2 text-[11px] font-medium flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 flex-shrink-0 text-[#c05621]" />
                    <span className="truncate font-semibold">
                      {language === "bn" ? day.bengaliTag : day.tag}
                    </span>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-black/10 flex items-center justify-between text-[10px] font-bold text-[#9b1b1b]">
                    <span>{language === "bn" ? "পূর্ণ বিবরণ" : "View Details"}</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Day Quick Insight Banner (Visible inline on Mobile) */}
          <div className="mt-3.5 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 text-xs text-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 shadow-sm">
            <div className="flex items-start space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-[#9b1b1b] text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow">
                <Flame className="w-4 h-4 text-[#d4af37]" />
              </div>
              <div>
                <div className="font-bengali-title font-bold text-sm text-[#9b1b1b] flex items-center space-x-1.5">
                  <span>{language === "bn" ? selectedDay.bengaliTitle : selectedDay.title}</span>
                  <span className="text-stone-400 font-normal text-xs">•</span>
                  <span className="text-stone-600 font-medium text-xs">
                    {language === "bn" ? selectedDay.bengaliTimings : selectedDay.timings}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-stone-600 mt-0.5 font-medium leading-relaxed">
                  {language === "bn" ? selectedDay.bengaliSignificance : selectedDay.significance}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsDetailModalOpen(true)}
              className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-[#9b1b1b] hover:bg-[#771d1d] text-white text-xs font-bold self-end sm:self-center shadow transition-transform active:scale-95 whitespace-nowrap"
            >
              <span>{language === "bn" ? "আচার ও নির্ঘণ্ট দেখুন" : "Detailed Rituals"}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Detailed Festival Day Modal */}
      {isDetailModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#faf7ee] rounded-2xl sm:rounded-3xl border-2 border-[#9b1b1b]/30 max-w-lg w-full p-5 sm:p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#c05621]/20 pb-3 mb-4">
              <div>
                <span className="text-[11px] uppercase font-bold tracking-wider text-[#9b1b1b] block">
                  {language === "bn" ? selectedDay.bengaliDate : selectedDay.date}
                </span>
                <h3 className="font-bengali-title text-2xl font-bold text-stone-900 mt-0.5">
                  {language === "bn" ? selectedDay.bengaliTitle : selectedDay.title}
                </h3>
                <span className="inline-block mt-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#d4af37]/20 text-[#865434]">
                  {language === "bn" ? selectedDay.bengaliTag : selectedDay.tag}
                </span>
              </div>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-700 flex items-center justify-center text-sm font-bold transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Timings Badge */}
            <div className="mb-4 p-3 rounded-xl bg-amber-100/60 border border-amber-300 text-stone-800 text-xs font-medium flex items-center space-x-2">
              <Clock className="w-4 h-4 text-[#9b1b1b] flex-shrink-0" />
              <div>
                <span className="font-bold text-[#9b1b1b]">
                  {language === "bn" ? "পূজার মাহেন্দ্রক্ষণ ও সময়সূচি: " : "Sacred Muhurat & Timing: "}
                </span>
                <span>{language === "bn" ? selectedDay.bengaliTimings : selectedDay.timings}</span>
              </div>
            </div>

            {/* Sacred Rituals Checklist */}
            <div className="mb-4">
              <h4 className="font-bengali-title text-sm font-bold text-stone-900 mb-2 flex items-center space-x-1.5">
                <Flame className="w-4 h-4 text-[#c05621]" />
                <span>{language === "bn" ? "প্রধান আচার ও আনুষ্ঠানিকতা:" : "Key Rituals & Formalities:"}</span>
              </h4>
              <ul className="space-y-2">
                {(language === "bn" ? selectedDay.bengaliRituals : selectedDay.rituals).map((ritual, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs text-stone-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{ritual}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cultural Significance */}
            <div className="p-3.5 rounded-xl bg-white border border-stone-200 text-xs text-stone-600 leading-relaxed">
              <h5 className="font-bold text-stone-900 mb-1">
                {language === "bn" ? "ধর্মীয় ও সামাজিক গুরুত্ব:" : "Cultural Significance:"}
              </h5>
              <p>{language === "bn" ? selectedDay.bengaliSignificance : selectedDay.significance}</p>
            </div>

            {/* Modal Close Button */}
            <div className="mt-5 pt-3 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="px-5 py-2 rounded-full bg-[#9b1b1b] text-white text-xs font-bold hover:bg-[#771d1d] shadow transition-transform active:scale-95"
              >
                {language === "bn" ? "বন্ধ করুন" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
