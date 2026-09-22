"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useRoute } from "@/context/RouteContext";
import { PANDALS_DATA, Pandal } from "@/data/pandalsData";
import {
  Sparkles,
  Send,
  Bot,
  User,
  Plus,
  Check,
  Compass,
  Train,
  MapPin,
  Utensils,
  Wallet,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  recommendedPandals?: Pandal[];
  budgetEstimate?: number;
  timestamp: string;
}

export default function PujoMitraChat() {
  const { language } = useLanguage();
  const { addToRoute, isInRoute } = useRoute();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputQuery, setInputQuery] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Suggested prompt chips
  const promptChips = [
    {
      label: language === "bn" ? "💰 বাজেট ₹৫০০ এর মধ্যে সেরা রুট" : "💰 Budget Route under ₹500",
      query: "বাজেট ৫০০ টাকার মধ্যে উত্তর কলকাতার সেরা পুজো রুট বলুন",
    },
    {
      label: language === "bn" ? "♿ বয়স্কদের জন্য কম ভিড় ও হুইলচেয়ার" : "♿ Senior & Wheelchair Friendly",
      query: "বয়স্কদের নিয়ে যাব, কম ভিড় ও হুইলচেয়ার সুবিধা আছে এমন মণ্ডপ",
    },
    {
      label: language === "bn" ? "🍛 ফুড ট্রেইলের পাশে সেরা সাবেকি পুজো" : "🍛 Traditional Pujas near Food",
      query: "কলকাতার সেরা বিরিয়ানি ও রোলের কাছে বিখ্যাত সাবেকি পুজো কোনগুলো?",
    },
    {
      label: language === "bn" ? "🌙 মাঝরাতের সেরা থিম মণ্ডপ" : "🌙 Best Midnight Theme Pandals",
      query: "রাত ১২টার পর দেখার মতো সেরা আলো ও থিম মণ্ডপ",
    },
  ];

  // Initial welcome message
  useEffect(() => {
    setMessages([
      {
        id: "msg_welcome",
        sender: "bot",
        text:
          language === "bn"
            ? "নমস্কার! আমি 'পুজো মিত্র'—আপনার ব্যক্তিগত শারদ এআই গাইড। আপনার বাজেট, সময়, পছন্দ বা বয়স্কদের সুবিধার কথা জানান, আমি কলকাতার ২২৭+ মণ্ডপ থেকে আপনার জন্য সবচেয়ে নিখুঁত পরিকল্পনা সাজিয়ে দেব।"
            : "Namaskar! I am 'Pujo Mitra'—your personal Durga Puja AI Concierge. Tell me your budget, preferred zone, accessibility needs, or food cravings, and I will craft the perfect Kolkata pandal hopping journey for you.",
        timestamp: "Just now",
      },
    ]);
  }, [language]);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  // AI Response Generator
  const generateResponse = (userQuery: string) => {
    setIsThinking(true);

    setTimeout(() => {
      const q = userQuery.toLowerCase();
      let matchedPandals: Pandal[] = [];
      let replyText = "";
      let estBudget = 150;

      if (q.includes("বাজেট") || q.includes("budget") || q.includes("500") || q.includes("৫০০")) {
        // Budget-friendly north route
        matchedPandals = PANDALS_DATA.filter((p) =>
          ["shobhabazar-rajbari", "bagbazar-sarbojanin", "kumartuli-park", "college-square"].includes(p.id)
        );
        estBudget = 180;
        replyText =
          language === "bn"
            ? "আপনার ₹৫০০ বাজেটের জন্য মেট্রো-ভিত্তিক উত্তর কলকাতার এই ৪টি সেরা মণ্ডপের রুট বেছে দেওয়া হলো। শ্যামবাজার ও শোভাবাজার মেট্রো ব্যবহার করলে যাতায়াত খরচ মাত্র ₹৪০ হবে, আর বাকি ₹৪০০ দিয়ে কলেজ স্ট্রিটের ক্যাবিনে খাওয়া ও ফুচকা উপভোগ করতে পারবেন!"
            : "Here is an optimized Metro-centric North Kolkata trail under ₹500! Metro transit between Shyambazar and Shobhabazar will cost around ₹40, leaving plenty of budget for historic College Street snacks & phuchka.";
      } else if (
        q.includes("বয়স্ক") ||
        q.includes("wheelchair") ||
        q.includes("হুইলচেয়ার") ||
        q.includes("ভিড়") ||
        q.includes("crowd")
      ) {
        // Senior & wheelchair friendly with low/moderate crowd
        matchedPandals = PANDALS_DATA.filter(
          (p) => Boolean(p.wheelchairAccessible ?? (p.category === "traditional" || p.category === "heritage")) && (p.crowdLevel === "Moderate" || p.crowdLevel === "Low")
        ).slice(0, 4);
        estBudget = 250;
        replyText =
          language === "bn"
            ? "বয়স্কদের সাথে ঘুরে দেখার জন্য প্রশস্ত প্রবেশপথ, হুইলচেয়ার র‍্যাম্প ও প্রাথমিক চিকিৎসা বুথ যুক্ত এই মণ্ডপগুলি সবচেয়ে আরামদায়ক। বিশেষ করে দুপুর ২টা থেকে বিকেল ৫টার মধ্যে গেলে ভিড় ছাড়াই দর্শন করা যাবে।"
            : "For a comfortable trip with elders, these pandals offer dedicated wheelchair ramps, spacious entry gates, and on-site medical booths. We recommend visiting between 2 PM and 5 PM for minimal queues.";
      } else if (
        q.includes("বিরিয়ানি") ||
        q.includes("food") ||
        q.includes("খাবার") ||
        q.includes("রোল") ||
        q.includes("সাবেকি")
      ) {
        // Traditional near iconic food
        matchedPandals = PANDALS_DATA.filter((p) =>
          ["college-square", "bagbazar-sarbojanin", "mohammad-ali-park", "thakur-bari-dutta"].includes(p.id)
        );
        estBudget = 380;
        replyText =
          language === "bn"
            ? "রসনা তৃপ্তি ও ঐতিহ্যবাহী সাবেকি প্রতিমার এক অসাধারণ মেলবন্ধন! বাগবাজারের কাছে মিত্র ক্যাফের ফিশ ফ্রাই এবং কলেজ স্কয়ারের কাছে দিলখুশা কেবিনের কবিরাজি চেখে দেখার আদর্শ সুযোগ।"
            : "The ultimate culinary-heritage trail! These historic pandals place you right next to iconic legends: Mitra Cafe's diamond fish fry near Bagbazar, and Dilkhusha Cabin near College Square.";
      } else if (q.includes("রাত") || q.includes("night") || q.includes("midnight") || q.includes("আলো")) {
        // Midnight theme trail
        matchedPandals = PANDALS_DATA.filter((p) =>
          ["sreebhumi-sporting-club", "santosh-mitra-square", "suruchi-sangha", "chetla-agrani"].includes(p.id)
        );
        estBudget = 320;
        replyText =
          language === "bn"
            ? "রাত ১২টার পর কলকাতার আলো দেখার মতো দৃশ্য! শ্রীভূমি, সন্তোষ মিত্র স্কোয়ার ও সুরুচি সংঘে গভীর রাতে যানজট কমে আসে এবং আলোকসজ্জা অপূর্ব রূপ নেয়।"
            : "Kolkata's midnight illumination trail is world-renowned! After midnight, vehicular gridlock clears and these architectural theme wonders glow in their full grandeur.";
      } else {
        // Default top recommendations
        matchedPandals = PANDALS_DATA.slice(0, 3);
        replyText =
          language === "bn"
            ? "আপনার আগ্রহের ভিত্তিতে কলকাতার সবচেয়ে জনপ্রিয় ৩টি মণ্ডপ নিচে দেওয়া হলো। আপনার রুট তালিকায় যোগ করতে '+' বাটনে ট্যাপ করুন।"
            : "Based on Kolkata's current festive buzz, here are 3 iconic pandals recommended for you. Tap '+' to add them directly to your active route!";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: "bot_" + Date.now(),
          sender: "bot",
          text: replyText,
          recommendedPandals: matchedPandals,
          budgetEstimate: estBudget,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);

      setIsThinking(false);
    }, 700);
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputQuery).trim();
    if (!text) return;

    setMessages((prev) => [
      ...prev,
      {
        id: "user_" + Date.now(),
        sender: "user",
        text: text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);

    setInputQuery("");
    generateResponse(text);
  };

  return (
    <div className="flex flex-col h-[520px] sm:h-[580px] bg-[#faf7ee] rounded-3xl overflow-hidden border border-[#c05621]/20 shadow-md">
      {/* 1. Chat Header */}
      <div className="px-5 py-3.5 bg-gradient-to-r from-[#9b1b1b] to-[#771d1d] text-white flex items-center justify-between shadow-sm flex-shrink-0">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-2xl bg-white/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bengali-title text-base font-bold text-white flex items-center space-x-1.5">
              <span>{language === "bn" ? "পুজো মিত্র — শারদ এআই গাইড" : "Pujo Mitra — AI Concierge"}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-[10px] text-stone-300 font-medium">
              {language === "bn" ? "২২৭+ মণ্ডপ, মেট্রো ও বাজেট সংক্রান্ত তাৎক্ষণিক উত্তর" : "227+ Pandals & Budget Advice"}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Chat Message Thread */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === "user";
          return (
            <div key={msg.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
              <div className={`flex items-start space-x-2.5 max-w-[88%] sm:max-w-[80%]`}>
                {!isUser && (
                  <div className="w-7 h-7 rounded-xl bg-[#9b1b1b] text-white flex items-center justify-center flex-shrink-0 mt-1 shadow-xs">
                    <Bot className="w-4 h-4 text-[#d4af37]" />
                  </div>
                )}
                <div
                  className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                    isUser
                      ? "bg-[#9b1b1b] text-white rounded-tr-xs"
                      : "bg-white text-stone-800 border border-stone-200/90 rounded-tl-xs"
                  }`}
                >
                  <p className="font-medium whitespace-pre-line">{msg.text}</p>

                  {/* Recommended Pandals Attachment Cards */}
                  {msg.recommendedPandals && msg.recommendedPandals.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-stone-100 space-y-2">
                      <div className="text-[11px] font-bold text-[#9b1b1b] uppercase tracking-wider flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{language === "bn" ? "সুপারিশকৃত মণ্ডপসমূহ:" : "Recommended Stops:"}</span>
                      </div>
                      <div className="grid grid-cols-1 gap-1.5">
                        {msg.recommendedPandals.map((p) => {
                          const inRoute = isInRoute(p.id);
                          return (
                            <div
                              key={p.id}
                              className="p-2.5 rounded-xl bg-[#faf7ee] border border-stone-200/80 flex items-center justify-between gap-2"
                            >
                              <div className="truncate">
                                <div className="font-bengali-title text-xs font-bold text-stone-900 truncate">
                                  {language === "bn" ? p.bengaliName : p.name}
                                </div>
                                <div className="text-[10px] text-stone-500 flex items-center space-x-1 mt-0.5">
                                  <Train className="w-3 h-3 text-[#9b1b1b]" />
                                  <span>{language === "bn" ? p.nearestMetro.bengaliStation : p.nearestMetro.station}</span>
                                  <span>•</span>
                                  <span>{p.crowdLevel} crowd</span>
                                </div>
                              </div>
                              <button
                                onClick={() => addToRoute(p)}
                                disabled={inRoute}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center space-x-1 flex-shrink-0 ${
                                  inRoute
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "bg-[#9b1b1b] text-white hover:bg-[#771d1d] active:scale-95 shadow-xs"
                                }`}
                              >
                                {inRoute ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                                <span>{inRoute ? (language === "bn" ? "যুক্ত" : "Added") : (language === "bn" ? "রুটে যোগ" : "Add")}</span>
                              </button>
                            </div>
                          );
                        })}
                      </div>

                      {/* Estimated Budget Footnote */}
                      {msg.budgetEstimate && (
                        <div className="flex items-center space-x-1.5 text-[11px] text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                          <Wallet className="w-3 h-3 text-emerald-600" />
                          <span>
                            {language === "bn"
                              ? `আনুমানিক যাতায়াত ও স্ন্যাক্স বাজেট: ~₹${msg.budgetEstimate}`
                              : `Estimated Transit & Snack Budget: ~₹${msg.budgetEstimate}`}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className={`text-[10px] mt-1 text-right ${isUser ? "text-stone-300" : "text-stone-400"}`}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {isThinking && (
          <div className="flex items-center space-x-2 text-stone-400 text-xs italic pl-9">
            <span className="w-2 h-2 rounded-full bg-[#9b1b1b] animate-bounce" />
            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-bounce delay-100" />
            <span className="w-2 h-2 rounded-full bg-[#c05621] animate-bounce delay-200" />
            <span>{language === "bn" ? "পুজো মিত্র চিন্তা করছে..." : "Pujo Mitra is finding best spots..."}</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* 3. Quick Prompt Chips */}
      <div className="px-4 py-2 border-t border-stone-200/80 bg-white/60 overflow-x-auto flex items-center space-x-2 no-scrollbar flex-shrink-0">
        {promptChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(chip.query)}
            className="px-3 py-1.5 rounded-full bg-white border border-[#c05621]/30 hover:border-[#9b1b1b] hover:bg-[#faf7ee] text-xs font-semibold text-stone-700 whitespace-nowrap shadow-2xs transition-all active:scale-95 flex-shrink-0"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* 4. Chat Input Bar */}
      <div className="p-3 bg-white border-t border-stone-200 flex items-center space-x-2 flex-shrink-0">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
          placeholder={
            language === "bn"
              ? "যেমন: বাজেট ৫০০ টাকায় উত্তর কলকাতার রুট বলুন..."
              : "Ask e.g. Best wheelchair friendly pandals under ₹500..."
          }
          className="flex-1 px-4 py-2.5 rounded-2xl bg-[#faf7ee] border border-stone-200 text-xs sm:text-sm text-stone-900 outline-none focus:border-[#9b1b1b] font-medium"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={!inputQuery.trim()}
          className="w-10 h-10 rounded-2xl bg-[#9b1b1b] hover:bg-[#771d1d] disabled:opacity-40 text-white flex items-center justify-center shadow-md transition-all active:scale-95 flex-shrink-0"
          aria-label="Send message"
        >
          <Send className="w-4 h-4 text-[#d4af37]" />
        </button>
      </div>
    </div>
  );
}
