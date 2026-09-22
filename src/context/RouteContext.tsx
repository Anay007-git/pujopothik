"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Pandal, PANDALS_DATA } from "@/data/pandalsData";

export type TransportMode = "METRO" | "BUS" | "TRAIN" | "CAR" | "WALK" | "AUTO";

interface RouteContextType {
  routePandals: Pandal[];
  addToRoute: (pandal: Pandal) => void;
  removeFromRoute: (pandalId: string) => void;
  isInRoute: (pandalId: string) => boolean;
  clearRoute: () => void;
  loadPrebuiltRoute: (pandalIds: string[]) => void;
  movePandal: (fromIndex: number, toIndex: number) => void;
  transportMode: TransportMode;
  setTransportMode: (mode: TransportMode) => void;
  totalDistanceKm: number;
  totalWalkKm: number;
  totalEstimatedMinutes: number;
  estimatedTransitCost: number;
  googleMapsUrl: string;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  optimizeRouteAI: () => { savedKm: number; count: number };
  savedDistanceKm: number;
  isOptimizing: boolean;
}

const RouteContext = createContext<RouteContextType | undefined>(undefined);

// Haversine formula to compute distance between two lat/lng points in km
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function computePathDistance(path: Pandal[]): number {
  let dist = 0;
  for (let i = 0; i < path.length - 1; i++) {
    dist += calculateDistance(path[i].latitude, path[i].longitude, path[i + 1].latitude, path[i + 1].longitude) * 1.3;
  }
  return dist;
}

export function RouteProvider({ children }: { children: React.ReactNode }) {
  const [routePandals, setRoutePandals] = useState<Pandal[]>([]);
  const [transportMode, setTransportMode] = useState<TransportMode>("METRO");
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [savedDistanceKm, setSavedDistanceKm] = useState<number>(0);
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("pujo_pathik_route");
      if (saved) {
        const ids: string[] = JSON.parse(saved);
        const pandals = ids
          .map((id) => PANDALS_DATA.find((p) => p.id === id))
          .filter((p): p is Pandal => Boolean(p));
        setRoutePandals(pandals);
      } else {
        // Initial default route with 3 iconic spots
        const initial = PANDALS_DATA.filter((p) =>
          ["shobhabazar-rajbari", "bagbazar-sarbojanin", "college-square"].includes(p.id)
        );
        setRoutePandals(initial);
      }
    } catch {
      // Fallback
    }
  }, []);

  const saveToStorage = (updated: Pandal[]) => {
    setRoutePandals(updated);
    try {
      localStorage.setItem("pujo_pathik_route", JSON.stringify(updated.map((p) => p.id)));
    } catch {
      // ignore
    }
  };

  const addToRoute = (pandal: Pandal) => {
    if (routePandals.some((p) => p.id === pandal.id)) return;
    const updated = [...routePandals, pandal];
    saveToStorage(updated);
    setIsDrawerOpen(true);
  };

  const removeFromRoute = (pandalId: string) => {
    const updated = routePandals.filter((p) => p.id !== pandalId);
    saveToStorage(updated);
  };

  const isInRoute = (pandalId: string) => {
    return routePandals.some((p) => p.id === pandalId);
  };

  const clearRoute = () => {
    saveToStorage([]);
    setSavedDistanceKm(0);
  };

  const loadPrebuiltRoute = (pandalIds: string[]) => {
    const pandals = pandalIds
      .map((id) => PANDALS_DATA.find((p) => p.id === id))
      .filter((p): p is Pandal => Boolean(p));
    saveToStorage(pandals);
    setIsDrawerOpen(true);
  };

  const movePandal = (fromIndex: number, toIndex: number) => {
    if (fromIndex < 0 || fromIndex >= routePandals.length || toIndex < 0 || toIndex >= routePandals.length) return;
    const updated = [...routePandals];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    saveToStorage(updated);
  };

  // AI Route Sequence Optimizer (Traveling Salesperson / Nearest-Neighbor + 2-Opt)
  const optimizeRouteAI = () => {
    if (routePandals.length <= 2) {
      return { savedKm: 0, count: routePandals.length };
    }

    setIsOptimizing(true);
    const initialDistance = computePathDistance(routePandals);

    // 1. Nearest neighbor starting from origin
    const unvisited = [...routePandals];
    const optimized: Pandal[] = [unvisited.shift()!];

    while (unvisited.length > 0) {
      const current = optimized[optimized.length - 1];
      let nearestIdx = 0;
      let minD = Infinity;

      for (let i = 0; i < unvisited.length; i++) {
        const d = calculateDistance(
          current.latitude,
          current.longitude,
          unvisited[i].latitude,
          unvisited[i].longitude
        );
        if (d < minD) {
          minD = d;
          nearestIdx = i;
        }
      }
      optimized.push(unvisited.splice(nearestIdx, 1)[0]);
    }

    // 2. 2-opt pairwise refinement pass
    let improved = true;
    let bestDist = computePathDistance(optimized);
    let iterations = 0;

    while (improved && iterations < 25) {
      improved = false;
      iterations++;
      for (let i = 1; i < optimized.length - 1; i++) {
        for (let k = i + 1; k < optimized.length; k++) {
          // Reversing sequence from i to k
          const newRoute = [
            ...optimized.slice(0, i),
            ...optimized.slice(i, k + 1).reverse(),
            ...optimized.slice(k + 1),
          ];
          const newDist = computePathDistance(newRoute);
          if (newDist < bestDist - 0.05) {
            optimized.splice(0, optimized.length, ...newRoute);
            bestDist = newDist;
            improved = true;
            break;
          }
        }
        if (improved) break;
      }
    }

    const saved = Math.max(0, Math.round((initialDistance - bestDist) * 10) / 10);
    setSavedDistanceKm(saved);
    saveToStorage(optimized);
    setIsOptimizing(false);

    return { savedKm: saved, count: optimized.length };
  };

  // Compute total travel stats
  let totalDistanceKm = 0;
  for (let i = 0; i < routePandals.length - 1; i++) {
    const p1 = routePandals[i];
    const p2 = routePandals[i + 1];
    // Road factor is roughly 1.3x straight-line in Kolkata
    totalDistanceKm += calculateDistance(p1.latitude, p1.longitude, p2.latitude, p2.longitude) * 1.3;
  }
  totalDistanceKm = Math.round(totalDistanceKm * 10) / 10;

  // Walking proportion depends on transport mode
  const walkRatio = transportMode === "WALK" ? 1.0 : transportMode === "METRO" ? 0.45 : 0.25;
  const totalWalkKm = Math.round(totalDistanceKm * walkRatio * 10) / 10;

  // Estimated minutes: pandal viewing (35 mins avg per pandal) + travel time
  const viewingTime = routePandals.length * 35;
  const transitSpeedKmph = transportMode === "WALK" ? 4 : transportMode === "METRO" ? 22 : 14;
  const transitMinutes = totalDistanceKm > 0 ? Math.round((totalDistanceKm / transitSpeedKmph) * 60) : 0;
  const totalEstimatedMinutes = viewingTime + transitMinutes;

  // Estimated Kolkata transit fare calculation
  const legs = Math.max(1, routePandals.length - 1);
  let estimatedTransitCost = 0;
  if (transportMode === "METRO") {
    estimatedTransitCost = legs * 15; // Average ₹15 per metro hop
  } else if (transportMode === "BUS") {
    estimatedTransitCost = legs * 10; // ₹10 per ordinary bus
  } else if (transportMode === "AUTO") {
    estimatedTransitCost = legs * 25; // ₹25 per shared auto route leg
  } else if (transportMode === "CAR") {
    estimatedTransitCost = Math.round(50 + totalDistanceKm * 18); // Base ₹50 + ₹18/km
  } else if (transportMode === "WALK") {
    estimatedTransitCost = 0; // Free!
  }

  // Build Google Maps Multi-stop URL
  let googleMapsUrl = "https://www.google.com/maps";
  if (routePandals.length === 1) {
    const p = routePandals[0];
    googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${p.name}, Kolkata`
    )}`;
  } else if (routePandals.length > 1) {
    const origin = `${routePandals[0].latitude},${routePandals[0].longitude}`;
    const destination = `${routePandals[routePandals.length - 1].latitude},${
      routePandals[routePandals.length - 1].longitude
    }`;
    const waypoints = routePandals
      .slice(1, -1)
      .map((p) => `${p.latitude},${p.longitude}`)
      .join("|");

    let gmMode = "transit";
    if (transportMode === "WALK") gmMode = "walking";
    if (transportMode === "CAR") gmMode = "driving";

    googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}${
      waypoints ? `&waypoints=${waypoints}` : ""
    }&travelmode=${gmMode}`;
  }

  return (
    <RouteContext.Provider
      value={{
        routePandals,
        addToRoute,
        removeFromRoute,
        isInRoute,
        clearRoute,
        loadPrebuiltRoute,
        movePandal,
        transportMode,
        setTransportMode,
        totalDistanceKm,
        totalWalkKm,
        totalEstimatedMinutes,
        estimatedTransitCost,
        googleMapsUrl,
        isDrawerOpen,
        setIsDrawerOpen,
        optimizeRouteAI,
        savedDistanceKm,
        isOptimizing,
      }}
    >
      {children}
    </RouteContext.Provider>
  );
}

export function useRoute() {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error("useRoute must be used within a RouteProvider");
  }
  return context;
}
