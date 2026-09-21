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
  googleMapsUrl: string;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
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

export function RouteProvider({ children }: { children: React.ReactNode }) {
  const [routePandals, setRoutePandals] = useState<Pandal[]>([]);
  const [transportMode, setTransportMode] = useState<TransportMode>("METRO");
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

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
        googleMapsUrl,
        isDrawerOpen,
        setIsDrawerOpen,
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

