"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface ExpenseItem {
  id: string;
  title: string;
  bengaliTitle: string;
  amount: number;
  category: "food" | "transit" | "shopping" | "other";
  timestamp: string;
}

export type CompanionTab = "budget" | "steps" | "diary" | "ai";

interface CompanionContextType {
  // Companion Hub State
  isCompanionOpen: boolean;
  setIsCompanionOpen: (open: boolean) => void;
  activeTab: CompanionTab;
  setActiveTab: (tab: CompanionTab) => void;
  openCompanionWithTab: (tab: CompanionTab) => void;

  // 1. Budget & Expense Planner
  targetBudget: number;
  setTargetBudget: (amount: number) => void;
  expenses: ExpenseItem[];
  addExpense: (expense: Omit<ExpenseItem, "id" | "timestamp">) => void;
  removeExpense: (id: string) => void;
  clearExpenses: () => void;
  totalSpent: number;
  remainingBudget: number;

  // 2. Step & Calorie Counter
  steps: number;
  distanceKm: number;
  caloriesBurned: number;
  foodBurner: {
    phuchkas: number; // 25 kcal each
    biryaniPlates: number; // 650 kcal each
    rolls: number; // 350 kcal each
    daabSherbet: number; // 120 kcal each
  };
  incrementSteps: (count?: number) => void;
  resetSteps: () => void;
  isPedometerActive: boolean;
  togglePedometer: () => void;

  // 3. Pujo Diary & Bucket List
  visitedPandals: string[];
  toggleVisited: (pandalId: string) => void;
  isVisited: (pandalId: string) => boolean;
  pandalRatings: Record<string, number>;
  setPandalRating: (pandalId: string, rating: number) => void;
  pandalNotes: Record<string, string>;
  setPandalNote: (pandalId: string, note: string) => void;
}

const CompanionContext = createContext<CompanionContextType | undefined>(undefined);

export function CompanionProvider({ children }: { children: React.ReactNode }) {
  // Hub Modal Navigation
  const [isCompanionOpen, setIsCompanionOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<CompanionTab>("budget");

  // Budget State
  const [targetBudget, setTargetBudgetState] = useState<number>(1000);
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);

  // Step Tracker State
  const [steps, setSteps] = useState<number>(3420); // Initial festive hop starting count
  const [isPedometerActive, setIsPedometerActive] = useState<boolean>(false);

  // Diary State
  const [visitedPandals, setVisitedPandals] = useState<string[]>([]);
  const [pandalRatings, setPandalRatings] = useState<Record<string, number>>({});
  const [pandalNotes, setPandalNotes] = useState<Record<string, string>>({});

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const savedBudget = localStorage.getItem("pujo_target_budget");
      if (savedBudget) setTargetBudgetState(Number(savedBudget));

      const savedExpenses = localStorage.getItem("pujo_expenses");
      if (savedExpenses) setExpenses(JSON.parse(savedExpenses));

      const savedSteps = localStorage.getItem("pujo_steps");
      if (savedSteps) setSteps(Number(savedSteps));

      const savedVisited = localStorage.getItem("pujo_visited_pandals");
      if (savedVisited) setVisitedPandals(JSON.parse(savedVisited));

      const savedRatings = localStorage.getItem("pujo_pandal_ratings");
      if (savedRatings) setPandalRatings(JSON.parse(savedRatings));

      const savedNotes = localStorage.getItem("pujo_pandal_notes");
      if (savedNotes) setPandalNotes(JSON.parse(savedNotes));
    } catch {
      // Ignore localStorage parsing errors in SSR/incognito
    }
  }, []);

  // Web Sensors API for Device Motion Pedometer
  useEffect(() => {
    if (!isPedometerActive || typeof window === "undefined" || !("DeviceMotionEvent" in window)) {
      return;
    }

    let lastAccel = 0;
    const threshold = 11.5; // Acceleration threshold for step detection

    const handleMotion = (event: DeviceMotionEvent) => {
      const acc = event.accelerationIncludingGravity;
      if (!acc || acc.x === null || acc.y === null || acc.z === null) return;

      const magnitude = Math.sqrt(acc.x * acc.x + acc.y * acc.y + acc.z * acc.z);
      const delta = Math.abs(magnitude - lastAccel);

      if (delta > threshold) {
        setSteps((prev) => {
          const next = prev + 1;
          try {
            localStorage.setItem("pujo_steps", String(next));
          } catch {}
          return next;
        });
      }
      lastAccel = magnitude;
    };

    window.addEventListener("devicemotion", handleMotion);
    return () => window.removeEventListener("devicemotion", handleMotion);
  }, [isPedometerActive]);

  // Open helper
  const openCompanionWithTab = (tab: CompanionTab) => {
    setActiveTab(tab);
    setIsCompanionOpen(true);
  };

  // Budget Handlers
  const setTargetBudget = (amount: number) => {
    setTargetBudgetState(amount);
    try {
      localStorage.setItem("pujo_target_budget", String(amount));
    } catch {}
  };

  const addExpense = (expense: Omit<ExpenseItem, "id" | "timestamp">) => {
    const newItem: ExpenseItem = {
      ...expense,
      id: "exp_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...expenses];
    setExpenses(updated);
    try {
      localStorage.setItem("pujo_expenses", JSON.stringify(updated));
    } catch {}
  };

  const removeExpense = (id: string) => {
    const updated = expenses.filter((e) => e.id !== id);
    setExpenses(updated);
    try {
      localStorage.setItem("pujo_expenses", JSON.stringify(updated));
    } catch {}
  };

  const clearExpenses = () => {
    setExpenses([]);
    try {
      localStorage.removeItem("pujo_expenses");
    } catch {}
  };

  const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
  const remainingBudget = targetBudget - totalSpent;

  // Step Tracker Handlers
  const incrementSteps = (count = 100) => {
    setSteps((prev) => {
      const next = prev + count;
      try {
        localStorage.setItem("pujo_steps", String(next));
      } catch {}
      return next;
    });
  };

  const resetSteps = () => {
    setSteps(0);
    try {
      localStorage.setItem("pujo_steps", "0");
    } catch {}
  };

  const togglePedometer = () => {
    setIsPedometerActive((prev) => !prev);
  };

  // Step metrics (1 step ≈ 0.75m = 0.00075 km, 1 step ≈ 0.04 kcal)
  const distanceKm = Math.round(steps * 0.00075 * 10) / 10;
  const caloriesBurned = Math.round(steps * 0.04);

  const foodBurner = {
    phuchkas: Math.floor(caloriesBurned / 25),
    biryaniPlates: Math.round((caloriesBurned / 650) * 10) / 10,
    rolls: Math.round((caloriesBurned / 350) * 10) / 10,
    daabSherbet: Math.round((caloriesBurned / 120) * 10) / 10,
  };

  // Diary Handlers
  const toggleVisited = (pandalId: string) => {
    setVisitedPandals((prev) => {
      const exists = prev.includes(pandalId);
      const updated = exists ? prev.filter((id) => id !== pandalId) : [...prev, pandalId];
      try {
        localStorage.setItem("pujo_visited_pandals", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const isVisited = (pandalId: string) => visitedPandals.includes(pandalId);

  const setPandalRating = (pandalId: string, rating: number) => {
    setPandalRatings((prev) => {
      const updated = { ...prev, [pandalId]: rating };
      try {
        localStorage.setItem("pujo_pandal_ratings", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const setPandalNote = (pandalId: string, note: string) => {
    setPandalNotes((prev) => {
      const updated = { ...prev, [pandalId]: note };
      try {
        localStorage.setItem("pujo_pandal_notes", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  return (
    <CompanionContext.Provider
      value={{
        isCompanionOpen,
        setIsCompanionOpen,
        activeTab,
        setActiveTab,
        openCompanionWithTab,
        targetBudget,
        setTargetBudget,
        expenses,
        addExpense,
        removeExpense,
        clearExpenses,
        totalSpent,
        remainingBudget,
        steps,
        distanceKm,
        caloriesBurned,
        foodBurner,
        incrementSteps,
        resetSteps,
        isPedometerActive,
        togglePedometer,
        visitedPandals,
        toggleVisited,
        isVisited,
        pandalRatings,
        setPandalRating,
        pandalNotes,
        setPandalNote,
      }}
    >
      {children}
    </CompanionContext.Provider>
  );
}

export function useCompanion() {
  const context = useContext(CompanionContext);
  if (!context) {
    throw new Error("useCompanion must be used within a CompanionProvider");
  }
  return context;
}

