"use client";

import React, { useState, useEffect } from "react";
import DurgaEyeIcon from "./DurgaEyeIcon";

export default function IntroScreen() {
  const [phase, setPhase] = useState<"step1" | "step2" | "done">("step1");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Check if user already saw the intro during this session
    const seen = sessionStorage.getItem("pujo_pathik_intro_seen");
    if (seen) {
      setVisible(false);
      setPhase("done");
      return;
    }

    // Step 1: "মা আসছেন…" for 800ms
    const timer1 = setTimeout(() => {
      setPhase("step2");
    }, 850);

    // Step 2: "কলকাতা প্রস্তুত।" for 750ms
    const timer2 = setTimeout(() => {
      setPhase("done");
      sessionStorage.setItem("pujo_pathik_intro_seen", "true");
      setTimeout(() => setVisible(false), 400);
    }, 1750);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0d0d10] text-[#faf7ee] transition-opacity duration-500 ${
        phase === "done" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      role="status"
      aria-label="Festive intro loading"
    >
      {/* Subtle Alpana background glow */}
      <div className="absolute inset-0 bg-radial-gradient from-[#9b1b1b]/15 via-transparent to-transparent pointer-events-none" />

      {/* Durga Eye with golden glow */}
      <div className="relative mb-6 transform transition-transform duration-700 hover:scale-105">
        <div className="absolute -inset-4 rounded-full bg-[#d4af37]/20 blur-xl animate-pulse" />
        <DurgaEyeIcon size={96} color="#faf7ee" className="relative z-10 drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]" />
      </div>

      {/* Bengali Animated Headlines */}
      <div className="h-14 flex items-center justify-center overflow-hidden">
        {phase === "step1" && (
          <h2 className="font-bengali-title text-2xl sm:text-3xl md:text-4xl text-[#faf7ee] tracking-wide animate-fadeIn">
            মা আসছেন…
          </h2>
        )}

        {phase === "step2" && (
          <h2 className="font-bengali-title text-2xl sm:text-3xl md:text-4xl text-[#d4af37] tracking-wide animate-fadeIn">
            কলকাতা প্রস্তুত।
          </h2>
        )}
      </div>

      <p className="mt-3 text-xs tracking-widest uppercase font-medium text-stone-400">
        Pujo Pathik 2026
      </p>

      {/* Fast skip button */}
      <button
        onClick={() => {
          setPhase("done");
          sessionStorage.setItem("pujo_pathik_intro_seen", "true");
          setTimeout(() => setVisible(false), 200);
        }}
        className="absolute bottom-8 text-xs text-stone-400 hover:text-stone-200 underline transition-colors px-4 py-2"
      >
        Skip intro
      </button>
    </div>
  );
}

