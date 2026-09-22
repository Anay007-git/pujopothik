"use client";

import React, { useState } from "react";
import { useCompanion, ExpenseItem } from "@/context/CompanionContext";
import { useRoute } from "@/context/RouteContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  Wallet,
  Plus,
  Trash2,
  AlertCircle,
  TrendingDown,
  Sparkles,
  Utensils,
  Train,
  ShoppingBag,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

export default function BudgetTracker() {
  const { language } = useLanguage();
  const {
    targetBudget,
    setTargetBudget,
    expenses,
    addExpense,
    removeExpense,
    clearExpenses,
    totalSpent,
    remainingBudget,
  } = useCompanion();

  const { estimatedTransitCost, transportMode, routePandals } = useRoute();

  const [customTitle, setCustomTitle] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [customCategory, setCustomCategory] = useState<ExpenseItem["category"]>("food");
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [budgetInput, setBudgetInput] = useState(String(targetBudget));

  // Percentage of budget used
  const percentSpent = targetBudget > 0 ? Math.min(100, Math.round((totalSpent / targetBudget) * 100)) : 0;
  const isOverBudget = remainingBudget < 0;

  // Preset quick expenses
  const quickItems = [
    { title: "Phuchka & Snacks", bengaliTitle: "ফুচকা ও চাট", amount: 40, category: "food" as const, icon: "🥟" },
    { title: "Kathi Roll", bengaliTitle: "কাঠি রোল", amount: 70, category: "food" as const, icon: "🌯" },
    { title: "Kolkata Biryani", bengaliTitle: "কলকাতা বিরিয়ানি", amount: 220, category: "food" as const, icon: "🍛" },
    { title: "Tea & Sweets", bengaliTitle: "চা ও মিষ্টি", amount: 35, category: "food" as const, icon: "☕" },
    { title: "Metro / Bus Ticket", bengaliTitle: "মেট্রো বা বাস টিকিট", amount: 20, category: "transit" as const, icon: "🚇" },
    { title: "Shared Auto / Cab", bengaliTitle: "অটো বা ট্যাক্সি", amount: 60, category: "transit" as const, icon: "🚕" },
    { title: "Pujo Fair / Souvenirs", bengaliTitle: "মেলার কেনাকাটা", amount: 150, category: "shopping" as const, icon: "🎈" },
  ];

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(customAmount);
    if (!customTitle.trim() || isNaN(amt) || amt <= 0) return;

    addExpense({
      title: customTitle.trim(),
      bengaliTitle: customTitle.trim(),
      amount: amt,
      category: customCategory,
    });

    setCustomTitle("");
    setCustomAmount("");
  };

  const handleSaveBudget = () => {
    const val = parseFloat(budgetInput);
    if (!isNaN(val) && val > 0) {
      setTargetBudget(val);
    }
    setIsEditingBudget(false);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Budget Progress Meter */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-[#faf7ee] to-[#f4ede0] border border-[#c05621]/25 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#9b1b1b] text-white flex items-center justify-center shadow-md">
              <Wallet className="w-5 h-5 text-[#d4af37]" />
            </div>
            <div>
              <h3 className="font-bengali-title text-lg font-bold text-stone-900 leading-tight">
                {language === "bn" ? "পুজোর বাজেট ও খরচ হিসাব" : "Pujo Budget & Expense Meter"}
              </h3>
              <p className="text-xs text-stone-500 font-medium">
                {language === "bn" ? "প্রতিদিনের খরচে লাগাম রাখুন" : "Track real-time festive spending"}
              </p>
            </div>
          </div>

          {/* Budget Setting Pill */}
          {isEditingBudget ? (
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={budgetInput}
                onChange={(e) => setBudgetInput(e.target.value)}
                className="w-20 px-2 py-1 text-xs font-bold rounded-lg border border-[#9b1b1b] outline-none"
                autoFocus
              />
              <button
                onClick={handleSaveBudget}
                className="px-2.5 py-1 rounded-lg bg-[#9b1b1b] text-white text-xs font-bold"
              >
                Save
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setBudgetInput(String(targetBudget));
                setIsEditingBudget(true);
              }}
              className="px-3 py-1.5 rounded-full bg-white border border-[#c05621]/30 hover:border-[#9b1b1b] text-xs font-bold text-[#9b1b1b] shadow-sm transition-all"
            >
              ₹{targetBudget} {language === "bn" ? "(বাজেট বদলান)" : "(Edit)"}
            </button>
          )}
        </div>

        {/* Spend Status Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 text-center">
          <div className="p-2.5 rounded-2xl bg-white/80 border border-stone-200">
            <div className="text-[10px] text-stone-500 font-bold uppercase">{language === "bn" ? "মোট বাজেট" : "Total Budget"}</div>
            <div className="text-base sm:text-xl font-black text-stone-900 font-bengali-sans">₹{targetBudget}</div>
          </div>
          <div className="p-2.5 rounded-2xl bg-white/80 border border-stone-200">
            <div className="text-[10px] text-stone-500 font-bold uppercase">{language === "bn" ? "মোট খরচ" : "Total Spent"}</div>
            <div className="text-base sm:text-xl font-black text-[#9b1b1b] font-bengali-sans">₹{totalSpent}</div>
          </div>
          <div className={`p-2.5 rounded-2xl border ${isOverBudget ? "bg-red-50 border-red-300" : "bg-emerald-50 border-emerald-300"}`}>
            <div className="text-[10px] font-bold uppercase text-stone-500">{language === "bn" ? "অবশিষ্ট ব্যালেন্স" : "Remaining"}</div>
            <div className={`text-base sm:text-xl font-black font-bengali-sans ${isOverBudget ? "text-red-600" : "text-emerald-700"}`}>
              ₹{remainingBudget}
            </div>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-stone-600 font-medium">
              {percentSpent}% {language === "bn" ? "ব্যবহৃত" : "utilized"}
            </span>
            {isOverBudget ? (
              <span className="text-red-600 inline-flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5 mr-0.5" />
                {language === "bn" ? "বাজেট পার হয়ে গেছে!" : "Budget Exceeded!"}
              </span>
            ) : (
              <span className="text-emerald-700">
                {language === "bn" ? "বাজেট নিয়ন্ত্রণে আছে" : "Within Budget"}
              </span>
            )}
          </div>
          <div className="w-full h-3 rounded-full bg-stone-200 overflow-hidden relative">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isOverBudget
                  ? "bg-red-600"
                  : percentSpent > 80
                  ? "bg-amber-500"
                  : "bg-gradient-to-r from-emerald-500 to-[#9b1b1b]"
              }`}
              style={{ width: `${percentSpent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. Live Route Transit Cost Estimator Callout */}
      {routePandals.length > 0 && (
        <div className="p-4 rounded-2xl bg-[#9b1b1b]/5 border border-[#9b1b1b]/20 flex items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-[#9b1b1b] text-white flex items-center justify-center flex-shrink-0">
              <Train className="w-4 h-4 text-[#d4af37]" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900 font-bengali-title">
                {language === "bn"
                  ? `আপনার বর্তমান রুটের আনুমানিক যাতায়াত খরচ (${transportMode}):`
                  : `Estimated Route Transit Cost (${transportMode}):`}
              </div>
              <div className="text-[11px] text-stone-500">
                {routePandals.length} {language === "bn" ? "টি মণ্ডপের দূরত্ব ভিত্তিক ভাড়া" : "stops estimated fare"}
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              addExpense({
                title: `Route Transit (${transportMode})`,
                bengaliTitle: `রুটের যাতায়াত খরচ (${transportMode})`,
                amount: estimatedTransitCost,
                category: "transit",
              });
            }}
            className="px-3 py-1.5 rounded-xl bg-[#9b1b1b] hover:bg-[#771d1d] text-white text-xs font-bold shadow transition-all whitespace-nowrap active:scale-95"
          >
            +₹{estimatedTransitCost} {language === "bn" ? "যোগ করুন" : "Add"}
          </button>
        </div>
      )}

      {/* 3. 1-Tap Quick Expense Logger */}
      <div>
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>{language === "bn" ? "১-ট্যাপে দ্রুত খরচ যোগ করুন" : "1-Tap Quick Log"}</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {quickItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                addExpense({
                  title: item.title,
                  bengaliTitle: item.bengaliTitle,
                  amount: item.amount,
                  category: item.category,
                });
              }}
              className="flex items-center justify-between p-2.5 rounded-2xl bg-white border border-stone-200/80 hover:border-[#c05621] hover:bg-[#faf7ee] transition-all text-left shadow-sm group active:scale-95"
            >
              <div className="flex items-center space-x-2 truncate">
                <span className="text-base">{item.icon}</span>
                <div className="truncate">
                  <div className="text-xs font-bold text-stone-800 truncate font-bengali-title">
                    {language === "bn" ? item.bengaliTitle : item.title}
                  </div>
                  <div className="text-[10px] text-stone-400 capitalize">{item.category}</div>
                </div>
              </div>
              <span className="text-xs font-black text-[#9b1b1b] ml-1 flex-shrink-0 font-bengali-sans">
                +₹{item.amount}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Custom Expense Input */}
      <form onSubmit={handleAddCustom} className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3">
        <div className="text-xs font-bold text-stone-700 font-bengali-title">
          {language === "bn" ? "অন্য কোনো নিজস্ব খরচ যোগ করুন:" : "Add Custom Expense:"}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
          <input
            type="text"
            placeholder={language === "bn" ? "যেমন: নতুন জামা, বেলুন, পার্কিং..." : "Item title (e.g. Parking, Toys)..."}
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
            className="sm:col-span-5 px-3 py-2 rounded-xl bg-[#faf7ee] border border-stone-200 text-xs text-stone-800 outline-none focus:border-[#9b1b1b]"
          />
          <input
            type="number"
            placeholder="Amount (₹)"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            className="sm:col-span-3 px-3 py-2 rounded-xl bg-[#faf7ee] border border-stone-200 text-xs text-stone-800 outline-none focus:border-[#9b1b1b]"
          />
          <select
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value as ExpenseItem["category"])}
            className="sm:col-span-2 px-2.5 py-2 rounded-xl bg-[#faf7ee] border border-stone-200 text-xs text-stone-700 outline-none"
          >
            <option value="food">{language === "bn" ? "খাবার" : "Food"}</option>
            <option value="transit">{language === "bn" ? "যাতায়াত" : "Transit"}</option>
            <option value="shopping">{language === "bn" ? "কেনাকাটা" : "Shopping"}</option>
            <option value="other">{language === "bn" ? "অন্যান্য" : "Other"}</option>
          </select>
          <button
            type="submit"
            className="sm:col-span-2 py-2 px-3 rounded-xl bg-[#9b1b1b] hover:bg-[#771d1d] text-white text-xs font-bold transition-all flex items-center justify-center space-x-1 shadow active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>{language === "bn" ? "যোগ" : "Add"}</span>
          </button>
        </div>
      </form>

      {/* 5. Expense History Table */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
            {language === "bn" ? "সাম্প্রতিক খরচের তালিকা" : "Recent Logged Expenses"} ({expenses.length})
          </span>
          {expenses.length > 0 && (
            <button
              onClick={clearExpenses}
              className="text-[11px] font-bold text-red-600 hover:text-red-700 flex items-center space-x-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{language === "bn" ? "সব মুছুন" : "Clear All"}</span>
            </button>
          )}
        </div>

        {expenses.length === 0 ? (
          <div className="p-6 text-center rounded-2xl bg-stone-50 border border-dashed border-stone-300 text-stone-400 text-xs">
            {language === "bn"
              ? "এখনো কোনো খরচ যোগ করা হয়নি। উপরের বাটনগুলি ট্যাপ করে খরচ যোগ করুন।"
              : "No expenses logged yet. Tap the quick buttons above to log food or travel."}
          </div>
        ) : (
          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
            {expenses.map((exp) => (
              <div
                key={exp.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-stone-200/80 shadow-xs"
              >
                <div className="flex items-center space-x-2.5">
                  <span className="text-sm">
                    {exp.category === "food" ? "🍛" : exp.category === "transit" ? "🚇" : "🛍️"}
                  </span>
                  <div>
                    <div className="text-xs font-bold text-stone-800 font-bengali-title">
                      {language === "bn" ? exp.bengaliTitle : exp.title}
                    </div>
                    <div className="text-[10px] text-stone-400">{exp.timestamp}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-black text-[#9b1b1b] font-bengali-sans">₹{exp.amount}</span>
                  <button
                    onClick={() => removeExpense(exp.id)}
                    className="p-1 rounded-lg text-stone-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

