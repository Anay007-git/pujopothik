"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useRoute } from "@/context/RouteContext";
import AlpanaDivider from "@/components/animations/AlpanaDivider";
import LeafletRouteMap from "@/components/map/LeafletRouteMap";
import {
  HUBS,
  HubLocation,
  AiRoutePlan,
  EnrichedRouteStop,
  NearbyRadiusItem,
  generateAiRoute,
  parseNaturalLanguagePrompt,
} from "@/services/aiRouteDetector";
import { FoodSpot } from "@/data/foodData";
import { useUserLocation, KOLKATA_CENTER_COORDS } from "@/hooks/useUserLocation";
import {
  Sparkles,
  Compass,
  MapPin,
  Clock,
  Footprints,
  Train,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  ExternalLink,
  Share2,
  AlertTriangle,
  Utensils,
  ChevronRight,
  Flame,
  Search,
  Check,
  Send,
  Sliders,
  Layers,
  Star,
  LocateFixed,
  Radio,
  Navigation,
} from "lucide-react";

export default function AiRouteDetector() {
  const { language } = useLanguage();
  const { loadPrebuiltRoute, setIsDrawerOpen } = useRoute();
  const { userCoords, isLocating, locationError, requestLocation } = useUserLocation();

  // Mode: "prompt" (natural language) vs "matrix" (structured filters)
  const [activeTab, setActiveTab] = useState<"prompt" | "matrix">("prompt");
  const [promptInput, setPromptInput] = useState<string>("");

  // Structured matrix state
  const [selectedHub, setSelectedHub] = useState<string>("shyambazar");
  const [durationHours, setDurationHours] = useState<number>(4);
  const [timeOfDay, setTimeOfDay] = useState<"morning" | "afternoon" | "evening" | "midnight">("evening");
  const [primaryVibe, setPrimaryVibe] = useState<
    "all" | "theme" | "traditional" | "heritage" | "family" | "food" | "less_crowd"
  >("all");

  // Output route plan
  const [routePlan, setRoutePlan] = useState<AiRoutePlan | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [loadedSuccessfully, setLoadedSuccessfully] = useState<boolean>(false);

  // Selected item coordinates to fly/pan to on map
  const [selectedCoordinates, setSelectedCoordinates] = useState<{ lat: number; lng: number } | null>(null);

  // Near-Me Radius Listing Sub-filter: "all" | "pandal" | "food"
  const [nearbyFilter, setNearbyFilter] = useState<"all" | "pandal" | "food">("all");

  // Quick preset prompt chips
  const promptPresets = [
    {
      label: language === "bn" ? "📍 আমার ১০ কিমি রেডিয়াসের মণ্ডপ ও ফুড স্টল" : "📍 Near Me: 10km pandals & food stalls",
      query: "Show pandals and food stalls near me within 10km",
    },
    {
      label: language === "bn" ? "বাগবাজারের সেরা ফুড স্টল ও সাবেকি পুজো" : "Bagbazar food stalls & Sabeki pujo",
      query: "Best Food stalls near Bagbazar Sarbojanin with famous sweets and rolls",
    },
    {
      label: language === "bn" ? "পার্ক স্ট্রিট মোকাম্বো, কন্টিনেন্টাল ও ঐতিহাসিক পাব" : "Park Street Mocambo, Continental & pubs",
      query: "Park Street Continental dining at Mocambo, Chelo Kebab at Peter Cat, and historic pubs after South pandals",
    },
    {
      label: language === "bn" ? "ট্যাংরা চায়নাটাউনের খাঁটি চাইনিজ ভোজ" : "Tangra Chinatown & Chinese feast",
      query: "Central Kolkata pandals with authentic Chinese food at Tung Naam and Big Boss Tangra",
    },
    {
      label: language === "bn" ? "ম্যাডক্স স্কোয়ার আড্ডা, ফুড স্টল ও দক্ষিণ কলকাতা" : "Maddox Square adda, stalls & South Kolkata",
      query: "Maddox Square evening adda, street chowmein stalls, phuchka and famous South Kolkata pandals",
    },
    {
      label: language === "bn" ? "হাওড়া স্টেশন থেকে ঐতিহ্যবাহী বনেদি বাড়ি" : "Howrah Station heritage & Bonedi Bari",
      query: "Starting from Howrah station with family, want traditional Sabeki pandals and Bonedi Baris with minimum walking",
    },
    {
      label: language === "bn" ? "সল্টলেক ও শ্রীভূমি মেগা ফুড প্লাজা" : "Sreebhumi & Salt Lake mega food plaza",
      query: "Sreebhumi Lake Town mega lighting, food plaza stalls, biryani and Salt Lake pandals",
    },
  ];

  // Generate route based on prompt
  const handlePromptGenerate = async (customQuery?: string) => {
    const q = customQuery || promptInput;
    if (!q.trim()) return;

    setIsGenerating(true);
    const parsed = parseNaturalLanguagePrompt(q);

    if (parsed.isNearMeQuery) {
      let coords = userCoords;
      if (!coords) {
        coords = await requestLocation();
      }
      const activeCoords = coords || KOLKATA_CENTER_COORDS;

      const generated = generateAiRoute({
        ...parsed,
        userCoords: activeCoords,
        isNearMeQuery: true,
        maxRadiusKm: 10,
        freePrompt: q,
      });
      setRoutePlan(generated);
      setIsGenerating(false);
      setLoadedSuccessfully(false);
      return;
    }

    setTimeout(() => {
      const generated = generateAiRoute({
        ...parsed,
        freePrompt: q,
      });
      setRoutePlan(generated);
      setIsGenerating(false);
      setLoadedSuccessfully(false);
    }, 450);
  };

  // Direct Locate and Near-Me trigger
  const handleLocateAndFindNearby = async () => {
    setPromptInput(language === "bn" ? "আমার ১০ কিমি রেডিয়াসের মণ্ডপ ও ফুড স্টল" : "Show pandals and food stalls near me within 10km");
    setIsGenerating(true);
    let coords = userCoords;
    if (!coords) {
      coords = await requestLocation();
    }
    const activeCoords = coords || KOLKATA_CENTER_COORDS;
    const generated = generateAiRoute({
      userCoords: activeCoords,
      isNearMeQuery: true,
      maxRadiusKm: 10,
      primaryVibe: "all",
      durationHours: 4,
      freePrompt: "Show pandals and food stalls near me within 10km",
    });
    setRoutePlan(generated);
    setIsGenerating(false);
    setLoadedSuccessfully(false);
  };

  // Generate route based on matrix filters
  const handleMatrixGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const generated = generateAiRoute({
        startingHubId: selectedHub,
        durationHours,
        timeOfDay,
        primaryVibe,
      });
      setRoutePlan(generated);
      setIsGenerating(false);
      setLoadedSuccessfully(false);
    }, 400);
  };

  // Initial generation on first mount
  useEffect(() => {
    const initial = generateAiRoute({
      startingHubId: "shyambazar",
      durationHours: 4,
      timeOfDay: "evening",
      primaryVibe: "all",
    });
    setRoutePlan(initial);
  }, []);

  // Load into global route context
  const handleLoadToMyRoute = () => {
    if (!routePlan) return;
    const pandalIds = routePlan.stops.map((s) => s.pandal.id);
    loadPrebuiltRoute(pandalIds);
    setLoadedSuccessfully(true);
    setTimeout(() => {
      setIsDrawerOpen(true);
    }, 300);
  };

  // Share route
  const handleShare = async () => {
    if (!routePlan) return;
    const shareText = `${routePlan.title} (${routePlan.stops.length} stops, ${routePlan.totalDistanceKm}km) on Pujo Pathik 2026!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: routePlan.title,
          text: shareText,
          url: window.location.href,
        });
      } catch {
        // Fallback to clipboard
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Pan to map for a specific item
  const handleViewOnMap = (lat: number, lng: number) => {
    setSelectedCoordinates({ lat, lng });
    const mapEl = document.getElementById("leaflet-route-map-section");
    if (mapEl) {
      mapEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Filter nearby items
  const filteredNearby = (routePlan?.nearbyItemsAscending || []).filter((item) => {
    if (nearbyFilter === "all") return true;
    if (nearbyFilter === "pandal") return item.type === "pandal";
    if (nearbyFilter === "food") return item.type === "food";
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Top Header Card with Bengali Aesthetics */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#faf7ee] border border-[#c05621]/30 shadow-sm text-xs font-bold uppercase tracking-widest text-[#9b1b1b] mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#c05621]" />
          <span>{language === "bn" ? "এআই রুট ও জিপিএস ডিটেক্টর ২০২৬" : "AI Route & GPS Detector 2026"}</span>
        </div>
        <h2 className="font-bengali-title text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
          {language === "bn" ? "স্মার্ট এআই পুজো রুট পরিকল্পক" : "AI Pandal & Culinary Route Detector"}
        </h2>
        <p className="text-sm sm:text-base text-stone-600 mt-2 font-medium">
          {language === "bn"
            ? "আপনার লাইভ অবস্থান (১০ কিমি রেডিয়াসের নিকটতম থেকে দূরতম তালিকা), সময় ও পছন্দের খাবার (ফুড স্টল, রোল, চাইনিজ, কন্টিনেন্টাল ও পাব) অনুযায়ী নিখুঁত পরিক্রমা তৈরি করুন।"
            : "Generate personalized festival routes factoring in your live location (10 km radius ascending nearest-to-farthest listing), crowd surges, transit links, food stalls, Chinese, Continental, and legendary pubs."}
        </p>
        <AlpanaDivider variant="red" className="my-5 max-w-xs mx-auto" />
      </div>

      {/* Control Module Card (Tabs: Natural Prompt vs Matrix) */}
      <div className="festive-card rounded-3xl p-5 sm:p-7 border border-[#c05621]/20 shadow-lg bg-white">
        {/* Tab Headers */}
        <div className="flex items-center p-1 rounded-2xl bg-stone-100 max-w-md mx-auto mb-6">
          <button
            onClick={() => setActiveTab("prompt")}
            className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "prompt"
                ? "bg-white text-[#9b1b1b] shadow-sm"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#c05621]" />
            <span>{language === "bn" ? "এআই কে বলুন (Prompt)" : "Ask AI (Free Prompt)"}</span>
          </button>

          <button
            onClick={() => setActiveTab("matrix")}
            className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "matrix"
                ? "bg-white text-[#9b1b1b] shadow-sm"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <Sliders className="w-4 h-4 text-[#c05621]" />
            <span>{language === "bn" ? "ফিল্টার বেছে নিন (Filters)" : "Smart Matrix Filters"}</span>
          </button>
        </div>

        {/* TAB 1: Natural Language Prompt Input */}
        {activeTab === "prompt" && (
          <div className="space-y-4">
            {/* Quick Live Location GPS Action Banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
                  <LocateFixed className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-blue-950">
                    {language === "bn" ? "আমার আশেপাশের মণ্ডপ ও খাবার (১০ কিমি)" : "Find Pandals & Food Stalls Near Me (10 km)"}
                  </h4>
                  <p className="text-[11px] text-blue-700 font-medium">
                    {userCoords
                      ? language === "bn"
                        ? `জিপিএস অবস্থান সক্রিয় (${userCoords.lat.toFixed(3)}, ${userCoords.lng.toFixed(3)})`
                        : `Live GPS location active (${userCoords.lat.toFixed(3)}, ${userCoords.lng.toFixed(3)})`
                      : language === "bn"
                      ? "১ ক্লিকে ব্রাউজার থেকে অবস্থান জেনে নিকটতম তালিকা তৈরি করুন"
                      : "One-tap GPS scan sorted from nearest (500m) to farthest (10km)"}
                  </p>
                </div>
              </div>

              <button
                onClick={handleLocateAndFindNearby}
                disabled={isLocating || isGenerating}
                className="w-full sm:w-auto flex items-center justify-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold shadow-md transition-all whitespace-nowrap"
              >
                {isLocating ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{language === "bn" ? "অবস্থান খোঁজা হচ্ছে…" : "Detecting GPS…"}</span>
                  </>
                ) : (
                  <>
                    <Radio className="w-3.5 h-3.5" />
                    <span>{language === "bn" ? "১০ কিমি রেডিয়াস স্ক্যান" : "Scan 10 km Radius"}</span>
                  </>
                )}
              </button>
            </div>

            {locationError && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>{locationError}</span>
              </div>
            )}

            <div className="relative">
              <textarea
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handlePromptGenerate();
                  }
                }}
                rows={3}
                placeholder={
                  language === "bn"
                    ? "উদাহরণ: 'show pandals and food stalls near me', 'বাগবাজারের সেরা ফুড স্টল ও সাবেকি পুজো', 'পার্ক স্ট্রিট মোকাম্বো ও অলি পাবের আড্ডা'..."
                    : "e.g. 'show pandals and food stalls near me', 'Best food stalls near Bagbazar', 'Park Street Continental dining at Mocambo and pubs'..."
                }
                className="w-full p-4 pr-12 rounded-2xl border border-stone-200 focus:border-[#9b1b1b] focus:ring-2 focus:ring-[#9b1b1b]/20 outline-none text-sm text-stone-800 placeholder:text-stone-400 font-medium resize-none shadow-inner"
              />

              <button
                onClick={() => handlePromptGenerate()}
                disabled={isGenerating || !promptInput.trim()}
                className="absolute bottom-3.5 right-3.5 p-2.5 rounded-xl bg-[#9b1b1b] hover:bg-[#771d1d] disabled:opacity-40 text-white shadow-md transition-all active:scale-95"
                title="Generate Route"
              >
                {isGenerating ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Prompt Suggestion Chips */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600 block mb-2">
                {language === "bn" ? "জনপ্রিয় কিছু পুজো ও খাবারের রুট:" : "Popular Festival & Food Scenarios:"}
              </span>
              <div className="flex flex-wrap gap-2">
                {promptPresets.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setPromptInput(preset.query);
                      handlePromptGenerate(preset.query);
                    }}
                    className={`text-left px-3 py-1.5 rounded-full border text-[11px] font-semibold transition-all hover:scale-[1.02] active:scale-95 ${
                      idx === 0
                        ? "bg-blue-50 hover:bg-blue-100 text-blue-800 border-blue-200 shadow-sm"
                        : "bg-[#faf7ee] hover:bg-[#c05621]/15 text-stone-700 border-[#c05621]/20"
                    }`}
                  >
                    {idx === 0 ? "🎯 " : "✨ "}
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Structured Matrix Filters */}
        {activeTab === "matrix" && (
          <div className="space-y-6">
            {/* Step 1: Starting Anchor Hub */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#9b1b1b] mb-2">
                {language === "bn" ? "১. কোথা থেকে যাত্রা শুরু করবেন? (Starting Point)" : "1. Where are you starting from?"}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                {HUBS.map((hub) => (
                  <button
                    key={hub.id}
                    onClick={() => setSelectedHub(hub.id)}
                    className={`p-2.5 rounded-2xl border text-left transition-all ${
                      selectedHub === hub.id
                        ? "bg-[#9b1b1b] text-white border-[#9b1b1b] shadow-md font-bold"
                        : "bg-[#faf7ee] text-stone-700 border-stone-200 hover:bg-stone-100 font-medium"
                    }`}
                  >
                    <div className="flex items-center space-x-1.5 mb-0.5">
                      <MapPin className={`w-3.5 h-3.5 ${selectedHub === hub.id ? "text-[#d4af37]" : "text-[#c05621]"}`} />
                      <span className="text-xs truncate">{language === "bn" ? hub.bengaliName.split("(")[0] : hub.name.split("(")[0]}</span>
                    </div>
                    <span className={`text-[10px] block truncate ${selectedHub === hub.id ? "text-stone-200" : "text-stone-400"}`}>
                      {hub.nearestMetro.split("(")[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Time Budget & Time of Day */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-100">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#9b1b1b] mb-2">
                  {language === "bn" ? "২. কত সময় হাতে আছে? (Time Budget)" : "2. How much time do you have?"}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { hrs: 2, label: language === "bn" ? "২ ঘণ্টা" : "2 hrs" },
                    { hrs: 4, label: language === "bn" ? "৪ ঘণ্টা" : "4 hrs" },
                    { hrs: 6, label: language === "bn" ? "৬ ঘণ্টা" : "6 hrs" },
                    { hrs: 8, label: language === "bn" ? "সারারাত" : "All Night" },
                  ].map((d) => (
                    <button
                      key={d.hrs}
                      onClick={() => setDurationHours(d.hrs)}
                      className={`py-2 px-1 rounded-xl border text-center text-xs transition-all ${
                        durationHours === d.hrs
                          ? "bg-[#9b1b1b] text-white border-[#9b1b1b] font-bold shadow-sm"
                          : "bg-[#faf7ee] text-stone-700 border-stone-200 hover:bg-stone-100 font-medium"
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#9b1b1b] mb-2">
                  {language === "bn" ? "৩. দিনের কোন সময় বেরোবেন? (Time of Day)" : "3. When will you head out?"}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { key: "morning" as const, label: language === "bn" ? "সকাল" : "Morning" },
                    { key: "afternoon" as const, label: language === "bn" ? "দুপুর" : "Afternoon" },
                    { key: "evening" as const, label: language === "bn" ? "সন্ধ্যা" : "Evening" },
                    { key: "midnight" as const, label: language === "bn" ? "মাঝরাত" : "Midnight" },
                  ].map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setTimeOfDay(t.key)}
                      className={`py-2 px-1 rounded-xl border text-center text-xs transition-all ${
                        timeOfDay === t.key
                          ? "bg-[#9b1b1b] text-white border-[#9b1b1b] font-bold shadow-sm"
                          : "bg-[#faf7ee] text-stone-700 border-stone-200 hover:bg-stone-100 font-medium"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3: Vibe Selection */}
            <div className="pt-4 border-t border-stone-100">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#9b1b1b] mb-2">
                {language === "bn" ? "৪. কী ধরনের মণ্ডপ ও অভিজ্ঞতা পছন্দ? (Preferred Vibe)" : "4. What's your preferred vibe?"}
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "all" as const, label: language === "bn" ? "সব ধরনের সেরা মিশ্রণ" : "Balanced Best-Of" },
                  { key: "food" as const, label: language === "bn" ? "🍽️ খাবার, স্টল ও জমজমাট আড্ডা" : "🍽️ Food Stalls & Night Adda" },
                  { key: "theme" as const, label: language === "bn" ? "🎨 শিল্পকলা ও আধুনিক থিম" : "🎨 Theme Art & Design" },
                  { key: "traditional" as const, label: language === "bn" ? "🌸 সাবেকি প্রতিমা ও ডাকের সাজ" : "🌸 Traditional Sabeki" },
                  { key: "heritage" as const, label: language === "bn" ? "🏛️ শতাব্দীপ্রাচীন বনেদি বাড়ি" : "🏛️ Heritage Bonedi Bari" },
                  { key: "less_crowd" as const, label: language === "bn" ? "🕊️ কম ভিড় ও পরিবারবান্ধব" : "🕊️ Low Crowd & Peaceful" },
                ].map((v) => (
                  <button
                    key={v.key}
                    onClick={() => setPrimaryVibe(v.key)}
                    className={`px-3.5 py-1.5 rounded-full border text-xs transition-all ${
                      primaryVibe === v.key
                        ? "bg-[#9b1b1b] text-white border-[#9b1b1b] font-bold shadow-sm"
                        : "bg-[#faf7ee] text-stone-700 border-stone-200 hover:bg-stone-100 font-medium"
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Trigger Button */}
            <div className="pt-4 border-t border-stone-100 flex justify-end">
              <button
                onClick={handleMatrixGenerate}
                disabled={isGenerating}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3 rounded-full bg-[#9b1b1b] hover:bg-[#771d1d] text-white text-sm font-bold shadow-lg active:scale-95 transition-all border border-[#d4af37]/60"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{language === "bn" ? "রুট প্রস্তুত হচ্ছে…" : "Analyzing Route…"}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#d4af37]" />
                    <span className="font-bengali-title">
                      {language === "bn" ? "স্মার্ট রুট তৈরি করুন" : "Generate Optimized Route"}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Generated Route Display Section */}
      {routePlan && (
        <div className="space-y-8 animate-fadeIn">
          {/* Plan Header Card */}
          <div className="festive-card rounded-3xl p-6 sm:p-8 border border-[#c05621]/20 shadow-xl bg-gradient-to-br from-white to-[#faf7ee]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-stone-200">
              <div>
                <div className="flex items-center space-x-2 text-xs font-bold text-[#9b1b1b] uppercase tracking-wider mb-1">
                  {routePlan.isNearMePlan ? (
                    <Radio className="w-4 h-4 text-blue-600 animate-pulse" />
                  ) : (
                    <Compass className="w-4 h-4 text-[#d4af37]" />
                  )}
                  <span>
                    {language === "bn" ? routePlan.startingHub.bengaliName : routePlan.startingHub.name}
                  </span>
                </div>
                <h3 className="font-bengali-title text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                  {language === "bn" ? routePlan.bengaliTitle : routePlan.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#8c6246] font-medium italic mt-1">
                  “{language === "bn" ? routePlan.bengaliTagline : routePlan.tagline}”
                </p>
              </div>

              {/* Quick Metrics Bar */}
              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                {routePlan.nearbyItemsAscending && (
                  <div className="px-3.5 py-2 rounded-2xl bg-blue-50 border border-blue-200 text-center shadow-sm">
                    <span className="text-[10px] text-blue-600 block font-bold uppercase tracking-wider">
                      {language === "bn" ? "১০ কিমি মোট স্পট" : "10km Radius"}
                    </span>
                    <span className="text-base font-bold text-blue-900">{routePlan.nearbyItemsAscending.length}</span>
                  </div>
                )}

                <div className="px-3.5 py-2 rounded-2xl bg-white border border-stone-200 text-center shadow-sm">
                  <span className="text-[10px] text-stone-400 block font-bold uppercase tracking-wider">
                    {language === "bn" ? "পরিক্রমার মণ্ডপ" : "Stops"}
                  </span>
                  <span className="text-base font-bold text-stone-900">{routePlan.stops.length}</span>
                </div>

                <div className="px-3.5 py-2 rounded-2xl bg-white border border-stone-200 text-center shadow-sm">
                  <span className="text-[10px] text-stone-400 block font-bold uppercase tracking-wider">
                    {language === "bn" ? "খাবারের স্পট" : "Eateries"}
                  </span>
                  <span className="text-base font-bold text-amber-600">{routePlan.allFoodSpots.length}</span>
                </div>

                <div className="px-3.5 py-2 rounded-2xl bg-white border border-stone-200 text-center shadow-sm">
                  <span className="text-[10px] text-stone-400 block font-bold uppercase tracking-wider">
                    {language === "bn" ? "আনুমানিক সময়" : "Time"}
                  </span>
                  <span className="text-base font-bold text-[#9b1b1b]">{routePlan.totalDurationHours} hrs</span>
                </div>
              </div>
            </div>

            {/* AI Summary Prose */}
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium mt-4">
              {language === "bn" ? routePlan.bengaliSummary : routePlan.summary}
            </p>

            {/* AI Strategic Advice Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-stone-200">
              {routePlan.aiInsights.map((insight, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white border border-stone-200 shadow-sm text-xs">
                  <span className="font-bold text-[#9b1b1b] block mb-1">
                    💡 {language === "bn" ? insight.bengaliTitle : insight.title}
                  </span>
                  <span className="text-stone-600 leading-relaxed block">
                    {language === "bn" ? insight.bengaliDetail : insight.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Leaflet Interactive Route & Food Map Visualizer */}
          <div id="leaflet-route-map-section" className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Compass className="w-4 h-4 text-[#9b1b1b]" />
                <h4 className="font-bengali-title text-lg sm:text-xl font-bold text-stone-900">
                  {language === "bn" ? "লিফলেট ইন্টারেক্টিভ রুট ও ফুড ম্যাপ:" : "Interactive Leaflet Route & Food Map:"}
                </h4>
              </div>
              <span className="text-xs font-semibold text-stone-500">
                {language === "bn" ? "মার্কারে স্পর্শ করে বিবরণ দেখুন" : "Tap markers for details"}
              </span>
            </div>

            <LeafletRouteMap
              stops={routePlan.stops}
              startingHub={{
                name: routePlan.startingHub.name,
                bengaliName: routePlan.startingHub.bengaliName,
                lat: routePlan.startingHub.lat,
                lng: routePlan.startingHub.lng,
              }}
              foodSpots={routePlan.allFoodSpots}
              userCoords={routePlan.userCoords}
              radiusKm={routePlan.radiusKm || 10}
              selectedCoordinates={selectedCoordinates}
              height="h-[380px] sm:h-[460px]"
            />
          </div>

          {/* 10 KM RADIUS ASCENDING LISTING SECTION */}
          {routePlan.nearbyItemsAscending && routePlan.nearbyItemsAscending.length > 0 && (
            <div className="festive-card rounded-3xl p-5 sm:p-7 border border-blue-200/90 shadow-xl bg-gradient-to-b from-blue-50/60 via-white to-white space-y-6 animate-fadeIn">
              {/* Header & Sub-filter Tabs */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-blue-100">
                <div>
                  <div className="flex items-center space-x-2 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
                    <Radio className="w-4 h-4 animate-pulse" />
                    <span>{language === "bn" ? "১০ কিমি লাইভ রেডিয়াস তালিকা" : "10 km Live Radius Radar"}</span>
                  </div>
                  <h4 className="font-bengali-title text-xl sm:text-2xl font-bold text-stone-900">
                    {language === "bn"
                      ? "📍 আপনার কাছাকাছি মণ্ডপ ও ফুড স্টল (নিকটতম থেকে দূরতম ক্রমানুসারে):"
                      : "📍 Pandals & Food Stalls Near You (Sorted Nearest to Farthest):"}
                  </h4>
                  <p className="text-xs text-stone-500 mt-1">
                    {language === "bn"
                      ? "নিকটতম থেকে শুরু করে ১০ কিমি দূরত্বের সমস্ত প্রধান মণ্ডপ ও বিখ্যাত খাবারের তালিকা"
                      : "Ascending listing from nearest (~500m) to farthest (~10km) within your 10km zone."}
                  </p>
                </div>

                {/* Sub-Filter Tabs */}
                <div className="flex items-center p-1 rounded-2xl bg-stone-100 text-xs font-bold self-start md:self-auto">
                  <button
                    onClick={() => setNearbyFilter("all")}
                    className={`px-3 py-1.5 rounded-xl transition-all ${
                      nearbyFilter === "all" ? "bg-blue-600 text-white shadow-sm" : "text-stone-600 hover:text-stone-900"
                    }`}
                  >
                    {language === "bn" ? "সব" : "All"} ({routePlan.nearbyItemsAscending.length})
                  </button>
                  <button
                    onClick={() => setNearbyFilter("pandal")}
                    className={`px-3 py-1.5 rounded-xl transition-all ${
                      nearbyFilter === "pandal" ? "bg-blue-600 text-white shadow-sm" : "text-stone-600 hover:text-stone-900"
                    }`}
                  >
                    {language === "bn" ? "মণ্ডপ" : "Pandals"} ({routePlan.nearbyItemsAscending.filter((i) => i.type === "pandal").length})
                  </button>
                  <button
                    onClick={() => setNearbyFilter("food")}
                    className={`px-3 py-1.5 rounded-xl transition-all ${
                      nearbyFilter === "food" ? "bg-blue-600 text-white shadow-sm" : "text-stone-600 hover:text-stone-900"
                    }`}
                  >
                    {language === "bn" ? "খাবার ও পাব" : "Food & Pubs"} ({routePlan.nearbyItemsAscending.filter((i) => i.type === "food").length})
                  </button>
                </div>
              </div>

              {/* Ascending Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredNearby.map((item, idx) => {
                  const isPandal = item.type === "pandal";
                  const isClose = item.distanceKm < 1.0;
                  const isModerate = item.distanceKm >= 1.0 && item.distanceKm < 5.0;

                  const distanceBadgeColor = isClose
                    ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                    : isModerate
                    ? "bg-blue-100 text-blue-900 border-blue-300"
                    : "bg-amber-100 text-amber-900 border-amber-300";

                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-blue-400 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-3.5 sm:items-center justify-between"
                    >
                      {/* Left: Thumbnail & Rank */}
                      <div className="flex items-center space-x-3 min-w-0">
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-stone-900 border border-stone-200">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                          <div className="absolute top-1 left-1 w-5 h-5 rounded-full bg-black/70 text-white text-[10px] font-bold flex items-center justify-center">
                            #{idx + 1}
                          </div>
                        </div>

                        {/* Middle Text Details */}
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-1.5 mb-1">
                            {/* Distance Badge */}
                            <span
                              className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border ${distanceBadgeColor}`}
                            >
                              <MapPin className="w-3 h-3 flex-shrink-0" />
                              <span>
                                {language === "bn" ? item.bengaliDistanceFormatted : item.distanceFormatted}
                              </span>
                              <span className="text-[10px] font-medium opacity-80">
                                ({isClose ? `~${item.walkMinutes} min walk` : `~${item.driveMinutes} min drive`})
                              </span>
                            </span>

                            {/* Type Pill */}
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-600">
                              {isPandal ? (language === "bn" ? "মণ্ডপ" : "Pandal") : (language === "bn" ? "ফুড স্টল / রেস্তোরাঁ" : "Food / Eatery")}
                            </span>
                          </div>

                          <h5 className="font-bengali-title text-base font-bold text-stone-900 truncate">
                            {language === "bn" ? item.bengaliName : item.name}
                          </h5>

                          <p className="text-[11px] text-stone-500 truncate">
                            {item.area} {item.nearestMetro ? `• ${item.nearestMetro}` : ""}
                          </p>

                          <p className="text-xs font-semibold text-[#9b1b1b] truncate mt-0.5">
                            {language === "bn" ? item.bengaliHighlightText : item.highlightText}
                          </p>
                        </div>
                      </div>

                      {/* Right Action Buttons */}
                      <div className="flex sm:flex-col items-center justify-end gap-1.5 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                        <button
                          onClick={() => handleViewOnMap(item.latitude, item.longitude)}
                          className="flex-1 sm:flex-none flex items-center justify-center space-x-1 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors"
                          title="View marker on map"
                        >
                          <Compass className="w-3.5 h-3.5" />
                          <span>{language === "bn" ? "ম্যাপে দেখুন" : "View Map"}</span>
                        </button>

                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${item.latitude},${item.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 sm:flex-none flex items-center justify-center space-x-1 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors"
                          title="Open navigation in Google Maps"
                        >
                          <Navigation className="w-3.5 h-3.5 text-[#9b1b1b]" />
                          <span>{language === "bn" ? "দিকনির্দেশ" : "Navigate"}</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* DEDICATED FOOD STALLS & EATERIES SHOWCASE SECTION */}
          {routePlan.allFoodSpots && routePlan.allFoodSpots.length > 0 && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <div className="flex items-center space-x-2 text-xs font-bold text-[#c05621] uppercase tracking-wider mb-0.5">
                    <Utensils className="w-3.5 h-3.5" />
                    <span>{language === "bn" ? "রুটের সেরা খাওয়া-দাওয়া" : "Culinary Highlights on Route"}</span>
                  </div>
                  <h4 className="font-bengali-title text-xl sm:text-2xl font-bold text-stone-900">
                    {language === "bn"
                      ? "পুজোর বিখ্যাত ফুড স্টল, ক্যাফে ও ঐতিহ্যের রসনাতৃপ্তি:"
                      : "Famous Food Stalls, Chinese, Continental & Legendary Eateries:"}
                  </h4>
                </div>
                <span className="text-xs font-bold text-stone-500">
                  {routePlan.allFoodSpots.length} {language === "bn" ? "টি খাবারের ঠিকানা" : "places found"}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {routePlan.allFoodSpots.map((food) => {
                  const isChinese = food.category === "Tangra Chinese";
                  const isPub = food.category === "Historic Pubs & Bars";
                  const isContinental = food.category === "Continental Heritage";

                  const badgeColor = isChinese
                    ? "bg-red-900/80 text-amber-200 border-red-700/50"
                    : isPub
                    ? "bg-slate-900/90 text-amber-300 border-slate-700"
                    : isContinental
                    ? "bg-amber-950/80 text-amber-200 border-amber-800"
                    : "bg-black/60 text-amber-300 border-amber-400/30";

                  return (
                    <div
                      key={food.id}
                      className="festive-card rounded-3xl overflow-hidden border border-stone-200/80 hover:border-amber-500/50 shadow-md hover:shadow-xl transition-all duration-300 bg-white flex flex-col justify-between group"
                    >
                      <div>
                        {/* Thumbnail Image */}
                        <div className="relative h-44 w-full bg-stone-900 overflow-hidden">
                          <Image
                            src={food.image}
                            alt={food.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                          <span
                            className={`absolute top-3 left-3 px-2.5 py-1 rounded-full backdrop-blur-md text-[10px] font-bold uppercase tracking-wider border ${badgeColor}`}
                          >
                            {food.category}
                          </span>

                          <div className="absolute top-3 right-3 flex items-center px-2 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-400 text-xs font-bold border border-amber-400/30">
                            <Star className="w-3.5 h-3.5 fill-amber-400 mr-1 text-amber-400" />
                            <span>{food.rating}</span>
                          </div>

                          <span className="absolute bottom-2.5 right-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[11px] font-bold">
                            {food.priceRange}
                          </span>
                        </div>

                        {/* Content Body */}
                        <div className="p-4 sm:p-5">
                          <h5 className="font-bengali-title text-lg font-bold text-stone-900 group-hover:text-[#9b1b1b] transition-colors leading-tight mb-1">
                            {language === "bn" ? food.bengaliName : food.name}
                          </h5>

                          <p className="text-xs text-stone-500 font-medium mb-3 flex items-center">
                            <MapPin className="w-3.5 h-3.5 text-[#c05621] mr-1 flex-shrink-0" />
                            <span>{food.area}</span>
                            <span className="mx-1">•</span>
                            <span>Metro: {food.nearestMetro}</span>
                          </p>

                          {/* Must Try Dish Callout */}
                          <div className="p-3 rounded-2xl bg-amber-50/90 border border-amber-200/80 mb-3 text-xs">
                            <span className="font-bold text-[#9b1b1b] block mb-0.5">
                              {language === "bn" ? "অবশ্যই চেখে দেখুন:" : "Must Try Specialty:"}
                            </span>
                            <span className="font-semibold text-stone-800">
                              {language === "bn" ? food.bengaliMustTry : food.mustTry}
                            </span>
                          </div>

                          <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                            {language === "bn" ? food.bengaliDescription : food.description}
                          </p>
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="px-5 pb-4 pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                        <span className="flex items-center text-stone-500 text-[11px]">
                          <Clock className="w-3.5 h-3.5 mr-1 text-stone-400" />
                          <span className="truncate max-w-[150px]">{food.timingsDuringPuja}</span>
                        </span>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewOnMap(food.latitude, food.longitude)}
                            className="text-xs font-bold text-blue-600 hover:text-blue-800"
                          >
                            {language === "bn" ? "ম্যাপে" : "Map"}
                          </button>
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                              food.name + " " + food.address
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 text-[#9b1b1b] hover:text-[#771d1d] font-bold text-xs"
                          >
                            <span>{language === "bn" ? "ডিরেকশন" : "Directions"}</span>
                            <ExternalLink className="w-3 h-3 ml-0.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Stop-by-Stop Interactive Timeline */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bengali-title text-xl font-bold text-stone-900">
                {language === "bn" ? "পরিক্রমার সময়সূচি ও পথনির্দেশ:" : "Chronological Itinerary & Transit Legs:"}
              </h4>
              <span className="text-xs font-semibold text-stone-500">
                {routePlan.stops.length} {language === "bn" ? "টি পর্যায়" : "Stages"}
              </span>
            </div>

            <div className="space-y-4">
              {routePlan.stops.map((stop, idx) => (
                <div key={stop.pandal.id} className="relative">
                  {/* Connecting Leg Badge (shown between stops) */}
                  {idx > 0 && (
                    <div className="my-3 ml-6 sm:ml-8 pl-6 border-l-2 border-dashed border-[#c05621]/40 py-2">
                      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-[11px] font-semibold">
                        <Footprints className="w-3.5 h-3.5 text-[#c05621]" />
                        <span>
                          {language === "bn"
                            ? `${stop.distanceFromPrevKm.toFixed(1)} কিমি হাঁটা (${stop.walkMinutesFromPrev} মিনিট)`
                            : `Walk ${stop.distanceFromPrevKm.toFixed(1)} km (~${stop.walkMinutesFromPrev} mins)`}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Stop Card */}
                  <div className="festive-card rounded-3xl overflow-hidden border border-[#c05621]/20 shadow-md bg-white hover:shadow-lg transition-all p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:items-center">
                    {/* Left: Stop Number & Image */}
                    <div className="relative w-full sm:w-44 h-36 sm:h-32 rounded-2xl overflow-hidden flex-shrink-0 bg-stone-900">
                      <Image
                        src={stop.pandal.images[0] || "/images/durga-puja-kolkata-main.jpg"}
                        alt={stop.pandal.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 180px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                      <div className="absolute top-2.5 left-2.5 w-7 h-7 rounded-full bg-[#9b1b1b] text-white text-xs font-bold flex items-center justify-center shadow-lg border border-[#d4af37]/60">
                        {stop.sequence}
                      </div>

                      <span className="absolute bottom-2 left-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-amber-300 text-[10px] font-bold uppercase">
                        {stop.pandal.category}
                      </span>
                    </div>

                    {/* Middle: Stop Details & Timings */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                          <Clock className="w-3 h-3 text-emerald-600" />
                          <span>{stop.arrivalEstimate}</span>
                        </span>

                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            stop.crowdAtArrival === "Low"
                              ? "bg-green-100 text-green-800"
                              : stop.crowdAtArrival === "Moderate"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {stop.crowdAtArrival} Crowd
                        </span>
                      </div>

                      <h5 className="font-bengali-title text-lg sm:text-xl font-bold text-stone-900 truncate">
                        {language === "bn" ? stop.pandal.bengaliName : stop.pandal.name}
                      </h5>

                      <p className="text-xs text-stone-500 font-medium truncate mb-2">
                        {stop.pandal.area} • Metro: {stop.pandal.nearestMetro.station} ({stop.pandal.nearestMetro.line})
                      </p>

                      <div className="text-xs text-stone-700 font-medium line-clamp-1 mb-2">
                        <span className="text-[#9b1b1b] font-bold">Theme: </span>
                        <span>{language === "bn" ? stop.pandal.bengaliTheme : stop.pandal.theme}</span>
                      </div>

                      {stop.crowdWarning && (
                        <div className="p-2 rounded-xl bg-amber-50/90 border border-amber-200/80 text-[11px] text-amber-900 flex items-start space-x-1.5 mb-2">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                          <span>{language === "bn" ? stop.bengaliCrowdWarning : stop.crowdWarning}</span>
                        </div>
                      )}

                      {/* Nearby Authentic Food Stalls */}
                      {stop.nearbyFoods && stop.nearbyFoods.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-stone-100">
                          {stop.nearbyFoods.slice(0, 3).map((food) => (
                            <button
                              key={food.id}
                              onClick={() => handleViewOnMap(food.latitude, food.longitude)}
                              className="inline-flex items-center space-x-1.5 text-[11px] text-[#8c6246] bg-[#faf7ee] hover:bg-amber-100/60 px-2.5 py-1 rounded-xl border border-stone-200 transition-colors"
                              title={food.mustTry}
                            >
                              <Utensils className="w-3 h-3 text-[#c05621] flex-shrink-0" />
                              <span className="font-bold text-stone-900">{language === "bn" ? food.bengaliName : food.name}:</span>
                              <span className="truncate max-w-[140px] text-amber-800 font-medium">{food.mustTry}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sticky / Mobile-Friendly Action Bar */}
          <div className="sticky bottom-4 z-30 p-3 sm:p-4 rounded-3xl bg-[#1b1212]/95 backdrop-blur-md border border-[#d4af37]/40 shadow-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-start">
              <div className="text-left">
                <span className="text-[10px] font-bold text-[#d4af37] uppercase tracking-wider block">
                  {language === "bn" ? "তৈরি রুট" : "Ready to hopple"}
                </span>
                <span className="font-bengali-title text-sm font-bold text-white">
                  {routePlan.stops.length} {language === "bn" ? "টি মণ্ডপ ও " : "Pandals & "}
                  {routePlan.allFoodSpots.length} {language === "bn" ? "টি খাবারের স্পট" : "Food Spots"}
                </span>
              </div>

              {loadedSuccessfully && (
                <span className="inline-flex items-center space-x-1 text-xs text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-600/50">
                  <Check className="w-3.5 h-3.5" />
                  <span>{language === "bn" ? "রুটে যুক্ত হয়েছে!" : "Loaded to Itinerary!"}</span>
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <button
                onClick={handleLoadToMyRoute}
                className="flex-1 sm:flex-none flex items-center justify-center space-x-1.5 px-5 py-2.5 rounded-full bg-[#9b1b1b] hover:bg-[#771d1d] text-white text-xs sm:text-sm font-bold shadow-lg transition-all active:scale-95 border border-[#d4af37]/60 whitespace-nowrap"
              >
                <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                <span className="font-bengali-title">
                  {language === "bn" ? "আমার রুটে লোড করুন" : "Load Into My Route"}
                </span>
              </button>

              <a
                href={routePlan.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/20 transition-all active:scale-95 whitespace-nowrap"
              >
                <MapPin className="w-4 h-4 text-[#d4af37]" />
                <span>Google Maps</span>
              </a>

              <button
                onClick={handleShare}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all active:scale-95"
                title="Share Route"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
