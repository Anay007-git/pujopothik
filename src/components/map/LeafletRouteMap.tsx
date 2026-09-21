"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pandal } from "@/data/pandalsData";
import { FoodSpot } from "@/data/foodData";
import { useLanguage } from "@/context/LanguageContext";
import "leaflet/dist/leaflet.css";
import {
  MapPin,
  Train,
  Compass,
  Layers,
  Maximize2,
  Navigation,
  Sparkles,
  LocateFixed,
  Utensils,
  ExternalLink,
  Clock,
  Star,
  Radio,
} from "lucide-react";

export interface RouteMapStop {
  pandal: Pandal;
  sequence?: number;
  arrivalEstimate?: string;
  crowdAtArrival?: string;
}

export interface LeafletRouteMapProps {
  stops: RouteMapStop[];
  startingHub?: {
    name: string;
    bengaliName: string;
    lat: number;
    lng: number;
  };
  foodSpots?: FoodSpot[];
  userCoords?: {
    lat: number;
    lng: number;
  };
  radiusKm?: number;
  height?: string;
  onPandalClick?: (pandal: Pandal) => void;
  selectedCoordinates?: { lat: number; lng: number } | null;
}

export default function LeafletRouteMap({
  stops,
  startingHub,
  foodSpots = [],
  userCoords,
  radiusKm = 10,
  height = "h-[380px] sm:h-[450px]",
  onPandalClick,
  selectedCoordinates,
}: LeafletRouteMapProps) {
  const { language } = useLanguage();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersGroupRef = useRef<any>(null);
  const polylineRef = useRef<any>(null);
  const circleRef = useRef<any>(null);

  // Map Tile Style: "osm_hot" | "dark" | "osm"
  const [tileStyle, setTileStyle] = useState<"osm_hot" | "dark" | "osm">("osm_hot");
  const tileLayerRef = useRef<any>(null);

  // Selected stop or food spot for popup preview card
  const [activeStop, setActiveStop] = useState<RouteMapStop | null>(null);
  const [activeFoodSpot, setActiveFoodSpot] = useState<FoodSpot | null>(null);

  // Tile URL configs (100% Free & Open-Source, No API Key Required, No Watermark)
  const TILE_CONFIGS = {
    osm_hot: {
      url: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | <a href="https://leafletjs.com/">Leaflet</a>',
      subdomains: ["a", "b", "c"],
      maxZoom: 19,
    },
    dark: {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
      attribution:
        'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ | <a href="https://leafletjs.com/">Leaflet</a>',
      subdomains: [],
      maxZoom: 16,
    },
    osm: {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | <a href="https://leafletjs.com/">Leaflet</a>',
      subdomains: ["a", "b", "c"],
      maxZoom: 19,
    },
  };

  // 1. Initialize Leaflet Map Instance
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    let isMounted = true;
    import("leaflet").then((L) => {
      if (!isMounted || !mapContainerRef.current || mapInstanceRef.current) return;

      const initialCenter: [number, number] = userCoords
        ? [userCoords.lat, userCoords.lng]
        : [22.5726, 88.3639];

      const map = L.map(mapContainerRef.current, {
        center: initialCenter,
        zoom: userCoords ? 13 : 13,
        zoomControl: true,
        attributionControl: true,
      });

      const cfg = TILE_CONFIGS[tileStyle];
      const tiles = L.tileLayer(cfg.url, {
        maxZoom: 19,
        attribution: cfg.attribution,
        subdomains: cfg.subdomains,
      }).addTo(map);

      tileLayerRef.current = tiles;
      mapInstanceRef.current = map;

      markersGroupRef.current = L.layerGroup().addTo(map);

      updateMapGeometry(L, map);
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // 2. Change Tile Layer Style dynamically
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    import("leaflet").then((L) => {
      const map = mapInstanceRef.current;
      if (!map) return;

      map.removeLayer(tileLayerRef.current);
      const cfg = TILE_CONFIGS[tileStyle];
      const newLayer = L.tileLayer(cfg.url, {
        maxZoom: 19,
        attribution: cfg.attribution,
        subdomains: cfg.subdomains,
      }).addTo(map);

      tileLayerRef.current = newLayer;
    });
  }, [tileStyle]);

  // 3. Pan to selectedCoordinates when triggered
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedCoordinates) return;
    mapInstanceRef.current.setView([selectedCoordinates.lat, selectedCoordinates.lng], 15, {
      animate: true,
    });
  }, [selectedCoordinates]);

  // 4. Update Markers, Radius Circle & Polyline
  const updateMapGeometry = (L: any, map: any) => {
    if (!markersGroupRef.current) return;
    markersGroupRef.current.clearLayers();

    if (polylineRef.current) {
      polylineRef.current.remove();
      polylineRef.current = null;
    }

    const latlngs: Array<[number, number]> = [];

    // Draw User Location Marker & 10 km Radius Circle
    if (userCoords) {
      latlngs.push([userCoords.lat, userCoords.lng]);

      const userIcon = L.divIcon({
        className: "custom-user-live-marker",
        html: `
          <div style="
            position: relative;
            width: 28px;
            height: 28px;
            background: #2563eb;
            border: 3px solid #ffffff;
            border-radius: 50%;
            box-shadow: 0 0 16px rgba(37, 99, 235, 0.8), 0 0 0 8px rgba(37, 99, 235, 0.25);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 13px;
          ">
            🎯
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const userMarker = L.marker([userCoords.lat, userCoords.lng], { icon: userIcon });
      userMarker.bindTooltip(
        `<b>${language === "bn" ? "📍 আপনার বর্তমান অবস্থান" : "📍 You Are Here"}</b><br/>${
          language === "bn" ? `১০ কিমি রেডিয়াস সার্কেল` : `10 km Radius Range`
        }`,
        { permanent: false, direction: "top", offset: [0, -14] }
      );
      markersGroupRef.current.addLayer(userMarker);

      // Draw 10 km Radius Circle
      const radarCircle = L.circle([userCoords.lat, userCoords.lng], {
        radius: (radiusKm || 10) * 1000,
        color: "#2563eb",
        weight: 2,
        dashArray: "6, 6",
        fillColor: "#3b82f6",
        fillOpacity: 0.08,
      });
      markersGroupRef.current.addLayer(radarCircle);
      circleRef.current = radarCircle;
    } else if (startingHub) {
      latlngs.push([startingHub.lat, startingHub.lng]);

      const hubIcon = L.divIcon({
        className: "custom-hub-marker",
        html: `
          <div style="
            width: 32px;
            height: 32px;
            background: #1b1212;
            border: 2px solid #d4af37;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #d4af37;
            font-size: 16px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.5);
          ">
            ⚓
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const hubMarker = L.marker([startingHub.lat, startingHub.lng], { icon: hubIcon });
      hubMarker.bindTooltip(
        `<b>${language === "bn" ? "যাত্রা শুরু:" : "Starting Hub:"}</b> ${
          language === "bn" ? startingHub.bengaliName : startingHub.name
        }`,
        { direction: "top", offset: [0, -16] }
      );
      markersGroupRef.current.addLayer(hubMarker);
    }

    // Pandal Stop Markers
    if (stops && stops.length > 0) {
      stops.forEach((stop, idx) => {
        const seq = stop.sequence || idx + 1;
        const pandal = stop.pandal;
        latlngs.push([pandal.latitude, pandal.longitude]);

        const isMustVisit = pandal.category === "must_visit";
        const isTheme = pandal.category === "theme";
        const isHeritage = pandal.category === "heritage";
        const bg = isMustVisit ? "#9b1b1b" : isTheme ? "#c05621" : isHeritage ? "#1b1212" : "#865434";
        const border = "#d4af37";

        const stopIcon = L.divIcon({
          className: "custom-route-stop-marker",
          html: `
            <div style="
              position: relative;
              width: 34px;
              height: 34px;
              background: ${bg};
              border: 2.5px solid ${border};
              border-radius: 50% 50% 50% 0;
              transform: rotate(-45deg);
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
              cursor: pointer;
            ">
              <span style="
                transform: rotate(45deg);
                color: #ffffff;
                font-weight: 800;
                font-size: 12px;
                font-family: sans-serif;
              ">${seq}</span>
            </div>
          `,
          iconSize: [34, 34],
          iconAnchor: [17, 34],
          popupAnchor: [0, -34],
        });

        const marker = L.marker([pandal.latitude, pandal.longitude], { icon: stopIcon });

        marker.on("click", () => {
          setActiveFoodSpot(null);
          setActiveStop(stop);
          map.panTo([pandal.latitude, pandal.longitude], { animate: true });
          if (onPandalClick) onPandalClick(pandal);
        });

        marker.bindTooltip(
          `<b>#${seq}: ${language === "bn" ? pandal.bengaliName : pandal.name}</b><br/>${
            pandal.nearestMetro.station
          } Metro`,
          { direction: "top", offset: [0, -34] }
        );

        markersGroupRef.current.addLayer(marker);
      });

      // Draw route polyline connecting the points
      if (latlngs.length > 1) {
        const polyline = L.polyline(latlngs, {
          color: "#9b1b1b",
          weight: 4,
          opacity: 0.85,
          dashArray: "8, 8",
          lineCap: "round",
          lineJoin: "round",
        }).addTo(map);

        polylineRef.current = polyline;

        map.fitBounds(polyline.getBounds(), {
          padding: [45, 45],
          maxZoom: 15,
        });
      }
    }

    // Food Spots & Pubs Markers
    if (foodSpots && foodSpots.length > 0) {
      foodSpots.forEach((food) => {
        const isChinese = food.category === "Tangra Chinese";
        const isPub = food.category === "Historic Pubs & Bars";
        const isContinental = food.category === "Continental Heritage";

        const emoji = isChinese ? "🥢" : isPub ? "🍺" : isContinental ? "🍽️" : "🍴";
        const bgColor = isChinese ? "#b91c1c" : isPub ? "#1e293b" : isContinental ? "#7c2d12" : "#c2410c";

        const foodIcon = L.divIcon({
          className: "custom-food-spot-marker",
          html: `
            <div style="
              width: 28px;
              height: 28px;
              background: ${bgColor};
              border: 2px solid #f59e0b;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #ffffff;
              font-size: 13px;
              box-shadow: 0 3px 8px rgba(0,0,0,0.45);
              cursor: pointer;
            ">
              ${emoji}
            </div>
          `,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });

        const foodMarker = L.marker([food.latitude, food.longitude], { icon: foodIcon });

        foodMarker.on("click", () => {
          setActiveStop(null);
          setActiveFoodSpot(food);
          map.panTo([food.latitude, food.longitude], { animate: true });
        });

        foodMarker.bindTooltip(
          `<b>${emoji} ${language === "bn" ? food.bengaliName : food.name}</b><br/><span style="color:#d97706;font-weight:bold;">${
            language === "bn" ? food.bengaliMustTry : food.mustTry
          }</span>`,
          { direction: "top", offset: [0, -14] }
        );

        markersGroupRef.current.addLayer(foodMarker);
      });
    }

    // Auto-fit to user location and circle if in userCoords mode and no stops polyline
    if (userCoords && (!stops || stops.length === 0)) {
      map.setView([userCoords.lat, userCoords.lng], 13);
    }
  };

  useEffect(() => {
    if (!mapInstanceRef.current) return;
    import("leaflet").then((L) => {
      updateMapGeometry(L, mapInstanceRef.current);
    });
  }, [stops, startingHub, foodSpots, userCoords, radiusKm]);

  // Recenter / Fit Bounds
  const handleRecenter = () => {
    if (!mapInstanceRef.current) return;
    if (userCoords) {
      mapInstanceRef.current.setView([userCoords.lat, userCoords.lng], 13, { animate: true });
    } else if (polylineRef.current) {
      mapInstanceRef.current.fitBounds(polylineRef.current.getBounds(), {
        padding: [45, 45],
        maxZoom: 15,
      });
    }
  };

  return (
    <div className={`relative w-full ${height} rounded-3xl overflow-hidden shadow-xl border border-[#c05621]/30 bg-stone-900`}>
      {/* Leaflet Map DOM Canvas */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Top Floating Controls Bar */}
      <div className="absolute top-3 left-3 right-3 z-[400] flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Route & Food Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200 text-stone-900 text-xs font-bold shadow-md pointer-events-auto">
          {userCoords ? (
            <>
              <Radio className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              <span className="text-blue-700">
                {language === "bn" ? "১০ কিমি রেডিয়াস রাডার" : "10 km Radius Radar"}
              </span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-[#9b1b1b]" />
              <span>
                {language === "bn" ? "ইন্টারেক্টিভ রুট ও ফুড ম্যাপ" : "Interactive Route Map"}
              </span>
            </>
          )}

          <span className="px-1.5 py-0.5 rounded-full bg-[#9b1b1b] text-white text-[10px]">
            {stops.length} {language === "bn" ? "টি মণ্ডপ" : "stops"}
          </span>
          {foodSpots && foodSpots.length > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px]">
              {foodSpots.length} {language === "bn" ? "খাবার" : "food"}
            </span>
          )}
        </div>

        {/* Tile Layer Selector & Recenter Button */}
        <div className="flex items-center space-x-1.5 pointer-events-auto">
          <div className="p-1 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200 shadow-md flex items-center space-x-1 text-[11px] font-bold">
            <button
              onClick={() => setTileStyle("osm_hot")}
              className={`px-2.5 py-1 rounded-xl transition-all ${
                tileStyle === "osm_hot"
                  ? "bg-[#9b1b1b] text-white shadow-sm"
                  : "text-stone-700 hover:bg-stone-100"
              }`}
            >
              {language === "bn" ? "ওএসএম ম্যাপ" : "OSM Color"}
            </button>
            <button
              onClick={() => setTileStyle("dark")}
              className={`px-2.5 py-1 rounded-xl transition-all ${
                tileStyle === "dark"
                  ? "bg-[#1b1212] text-[#d4af37] shadow-sm"
                  : "text-stone-700 hover:bg-stone-100"
              }`}
            >
              {language === "bn" ? "নাইট মোড" : "Night Mode"}
            </button>
            <button
              onClick={() => setTileStyle("osm")}
              className={`px-2.5 py-1 rounded-xl transition-all ${
                tileStyle === "osm"
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "text-stone-700 hover:bg-stone-100"
              }`}
            >
              {language === "bn" ? "স্ট্যান্ডার্ড" : "Standard"}
            </button>
          </div>

          {/* Recenter Button */}
          <button
            onClick={handleRecenter}
            className="p-2 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200 text-stone-800 hover:text-[#9b1b1b] shadow-md transition-all active:scale-95"
            title={userCoords ? "Center on My Location" : "Recenter Route"}
          >
            {userCoords ? <LocateFixed className="w-4 h-4 text-blue-600" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Selected Pandal Stop Bottom Card */}
      {activeStop && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 z-[400] festive-card rounded-3xl p-4 bg-white/95 backdrop-blur-md border border-[#c05621]/30 shadow-2xl animate-fadeIn">
          <div className="flex items-start space-x-3">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-stone-900 border border-stone-200">
              <Image
                src={activeStop.pandal.images[0] || "/images/durga-puja-kolkata-main.jpg"}
                alt={activeStop.pandal.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-1 left-1 w-5 h-5 rounded-full bg-[#9b1b1b] text-white text-[10px] font-bold flex items-center justify-center">
                {activeStop.sequence}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#9b1b1b]">
                  {activeStop.pandal.category}
                </span>
                <button
                  onClick={() => setActiveStop(null)}
                  className="text-stone-400 hover:text-stone-700 text-xs font-bold p-1"
                >
                  ✕
                </button>
              </div>

              <h4 className="font-bengali-title text-sm font-bold text-stone-900 truncate">
                {language === "bn" ? activeStop.pandal.bengaliName : activeStop.pandal.name}
              </h4>

              <p className="text-[11px] text-stone-500 truncate mt-0.5">
                {activeStop.pandal.area} • Metro: {activeStop.pandal.nearestMetro.station}
              </p>

              {activeStop.arrivalEstimate && (
                <div className="mt-1 flex items-center space-x-2 text-[10px] font-semibold text-emerald-700">
                  <span>🕒 {activeStop.arrivalEstimate}</span>
                  {activeStop.crowdAtArrival && <span>• {activeStop.crowdAtArrival} Crowd</span>}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Selected Food Spot Bottom Card */}
      {activeFoodSpot && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 z-[400] festive-card rounded-3xl p-4 bg-white/95 backdrop-blur-md border border-amber-500/40 shadow-2xl animate-fadeIn">
          <div className="flex items-start space-x-3">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-stone-900 border border-amber-300">
              <Image
                src={activeFoodSpot.image}
                alt={activeFoodSpot.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-1 left-1 w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">
                ★
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                  {activeFoodSpot.category}
                </span>
                <button
                  onClick={() => setActiveFoodSpot(null)}
                  className="text-stone-400 hover:text-stone-700 text-xs font-bold p-1"
                >
                  ✕
                </button>
              </div>

              <h4 className="font-bengali-title text-sm font-bold text-stone-900 truncate mt-1">
                {language === "bn" ? activeFoodSpot.bengaliName : activeFoodSpot.name}
              </h4>

              <p className="text-[11px] text-amber-900 font-semibold truncate">
                {language === "bn" ? activeFoodSpot.bengaliMustTry : activeFoodSpot.mustTry}
              </p>

              <div className="mt-1 flex items-center justify-between text-[10px] text-stone-500">
                <span className="flex items-center">
                  <Clock className="w-3 h-3 mr-1 text-stone-400" />
                  {activeFoodSpot.timingsDuringPuja}
                </span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    activeFoodSpot.name + " " + activeFoodSpot.address
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-0.5 text-amber-700 font-bold hover:underline"
                >
                  <span>{language === "bn" ? "ম্যাপ দেখুন" : "Directions"}</span>
                  <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
