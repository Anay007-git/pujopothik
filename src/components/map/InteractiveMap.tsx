"use client";

import React, { useEffect, useRef, useState } from "react";
import { PANDALS_DATA, Pandal } from "@/data/pandalsData";
import { useLanguage } from "@/context/LanguageContext";
import { useRoute } from "@/context/RouteContext";
import { getDistanceKm } from "@/services/aiRouteDetector";
import "leaflet/dist/leaflet.css";
import {
  MapPin,
  Train,
  Sparkles,
  Plus,
  Check,
  Eye,
  Layers,
  Filter,
  Navigation,
  Compass,
  LocateFixed,
  Maximize2,
  Radio,
} from "lucide-react";

interface InteractiveMapProps {
  onViewDetails?: (pandal: Pandal) => void;
  selectedPandalId?: string | null;
}

export default function InteractiveMap({
  onViewDetails,
  selectedPandalId,
}: InteractiveMapProps) {
  const { language, t } = useLanguage();
  const { addToRoute, removeFromRoute, isInRoute } = useRoute();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});
  const tileLayerRef = useRef<any>(null);
  const userLocationMarkerRef = useRef<any>(null);
  const userCircleRef = useRef<any>(null);

  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [activeZone, setActiveZone] = useState<string>("ALL");
  const [selectedPandal, setSelectedPandal] = useState<Pandal | null>(null);
  const [tileStyle, setTileStyle] = useState<"osm_hot" | "dark" | "osm">("osm_hot");
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [is10KmFilterActive, setIs10KmFilterActive] = useState<boolean>(false);

  const TILE_CONFIGS = {
    osm_hot: {
      url: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors | Powered by <a href="https://leafletjs.com/" target="_blank">Leaflet.js</a>',
      subdomains: ["a", "b", "c"],
      maxZoom: 19,
    },
    dark: {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
      attribution:
        'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ | Powered by <a href="https://leafletjs.com/" target="_blank">Leaflet.js</a>',
      subdomains: [],
      maxZoom: 16,
    },
    osm: {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors | Powered by <a href="https://leafletjs.com/" target="_blank">Leaflet.js</a>',
      subdomains: ["a", "b", "c"],
      maxZoom: 19,
    },
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    let isMounted = true;
    import("leaflet").then((leafletModule) => {
      if (!isMounted || !mapContainerRef.current || mapInstanceRef.current) return;
      const L = leafletModule.default;

      const map = L.map(mapContainerRef.current, {
        center: [22.555, 88.365],
        zoom: 12.5,
        zoomControl: true,
        attributionControl: true,
      });

      mapInstanceRef.current = map;

      const cfg = TILE_CONFIGS[tileStyle];
      const tiles = L.tileLayer(cfg.url, {
        maxZoom: 19,
        attribution: cfg.attribution,
        subdomains: cfg.subdomains,
      }).addTo(map);

      tileLayerRef.current = tiles;

      // Geolocation listener
      map.on("locationfound", (e: any) => {
        setIsLocating(false);
        setUserCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
        setIs10KmFilterActive(true);

        if (userLocationMarkerRef.current) {
          userLocationMarkerRef.current.remove();
        }
        if (userCircleRef.current) {
          userCircleRef.current.remove();
        }

        const userIcon = L.divIcon({
          className: "custom-user-marker",
          html: `
            <div style="
              width: 24px;
              height: 24px;
              background: #2563eb;
              border: 3px solid #ffffff;
              border-radius: 50%;
              box-shadow: 0 0 14px rgba(37, 99, 235, 0.8), 0 0 0 6px rgba(37, 99, 235, 0.25);
            "></div>
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });

        const userMarker = L.marker(e.latlng, { icon: userIcon }).addTo(map);
        userMarker.bindTooltip(
          language === "bn" ? "📍 আপনার অবস্থান (১০ কিমি রেডিয়াস)" : "📍 You Are Here (10 km Radius)",
          { permanent: true, direction: "top", offset: [0, -12] }
        );
        userLocationMarkerRef.current = userMarker;

        // Draw 10 km Radius Circle
        const radarCircle = L.circle(e.latlng, {
          radius: 10000,
          color: "#2563eb",
          weight: 2,
          dashArray: "6, 6",
          fillColor: "#3b82f6",
          fillOpacity: 0.08,
        }).addTo(map);
        userCircleRef.current = radarCircle;
      });

      map.on("locationerror", () => {
        setIsLocating(false);
      });

      renderMarkers(L, map);
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update tile layer when style changes
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    import("leaflet").then((leafletModule) => {
      const L = leafletModule.default;
      const map = mapInstanceRef.current;
      if (!map) return;

      map.removeLayer(tileLayerRef.current);
      const cfg = TILE_CONFIGS[tileStyle];
      const newTiles = L.tileLayer(cfg.url, {
        maxZoom: 19,
        attribution: cfg.attribution,
        subdomains: cfg.subdomains,
      }).addTo(map);

      tileLayerRef.current = newTiles;
    });
  }, [tileStyle]);

  // Update markers when filters change
  const renderMarkers = (L: any, map: any) => {
    Object.values(markersRef.current).forEach((marker: any) => marker.remove());
    markersRef.current = {};

    let filtered = PANDALS_DATA.filter((p) => {
      const matchCat = activeCategory === "ALL" || p.category === activeCategory;
      const matchZone = activeZone === "ALL" || p.zone === activeZone;
      return matchCat && matchZone;
    });

    // If 10km filter is active, filter and sort ascending
    if (is10KmFilterActive && userCoords) {
      filtered = filtered
        .filter((p) => getDistanceKm(userCoords.lat, userCoords.lng, p.latitude, p.longitude) <= 10.0)
        .sort((a, b) => {
          const distA = getDistanceKm(userCoords.lat, userCoords.lng, a.latitude, a.longitude);
          const distB = getDistanceKm(userCoords.lat, userCoords.lng, b.latitude, b.longitude);
          return distA - distB;
        });
    }

    filtered.forEach((pandal) => {
      const isMustVisit = pandal.category === "must_visit";
      const isTheme = pandal.category === "theme";
      const isHeritage = pandal.category === "heritage";
      const bg = isMustVisit ? "#9b1b1b" : isTheme ? "#c05621" : isHeritage ? "#1b1212" : "#865434";
      const border = "#d4af37";

      const customIcon = L.divIcon({
        className: "custom-pandal-marker",
        html: `
          <div style="
            position: relative;
            width: 32px;
            height: 32px;
            background: ${bg};
            border: 2px solid ${border};
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 10px rgba(0,0,0,0.35);
            cursor: pointer;
          ">
            <span style="
              transform: rotate(45deg);
              color: #ffffff;
              font-size: 14px;
              line-height: 1;
            ">🪔</span>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      const marker = L.marker([pandal.latitude, pandal.longitude], {
        icon: customIcon,
      }).addTo(map);

      let distanceTooltip = "";
      if (userCoords) {
        const d = getDistanceKm(userCoords.lat, userCoords.lng, pandal.latitude, pandal.longitude);
        distanceTooltip = `<br/><span style="color:#2563eb;font-weight:bold;">📍 ${d < 1 ? Math.round(d * 1000) + ' m' : d.toFixed(1) + ' km'} away</span>`;
      }

      marker.bindTooltip(
        `<b>${language === "bn" ? pandal.bengaliName : pandal.name}</b><br/>${pandal.nearestMetro.station} Metro${distanceTooltip}`,
        { direction: "top", offset: [0, -32] }
      );

      marker.on("click", () => {
        setSelectedPandal(pandal);
        map.panTo([pandal.latitude, pandal.longitude], { animate: true });
      });

      markersRef.current[pandal.id] = marker;
    });
  };

  // Re-run marker render when filters change
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    import("leaflet").then((leafletModule) => {
      renderMarkers(leafletModule.default, mapInstanceRef.current);
    });
  }, [activeCategory, activeZone, is10KmFilterActive, userCoords]);

  // Handle selectedPandalId external prop
  useEffect(() => {
    if (!selectedPandalId || !mapInstanceRef.current) return;
    const p = PANDALS_DATA.find((item) => item.id === selectedPandalId);
    if (p) {
      setSelectedPandal(p);
      mapInstanceRef.current.setView([p.latitude, p.longitude], 15, { animate: true });
    }
  }, [selectedPandalId]);

  // Handle Geolocation Click
  const handleLocateMe = () => {
    if (!mapInstanceRef.current) return;
    setIsLocating(true);
    mapInstanceRef.current.locate({ setView: true, maxZoom: 13 });
  };

  // Reset Center
  const handleResetCenter = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.setView([22.555, 88.365], 12.5, { animate: true });
  };

  const categories = [
    { key: "ALL", label: language === "bn" ? "সব মণ্ডপ" : "All Pandals" },
    { key: "must_visit", label: language === "bn" ? "🌟 অবশ্য দ্রষ্টব্য" : "🌟 Must Visit" },
    { key: "theme", label: language === "bn" ? "🎨 সেরা থিম" : "🎨 Theme Art" },
    { key: "traditional", label: language === "bn" ? "🌸 ঐতিহ্যবাহী সাবেকি" : "🌸 Sabeki" },
    { key: "heritage", label: language === "bn" ? "🏛️ শতাব্দীপ্রাচীন বনেদি" : "🏛️ Bonedi Bari" },
  ];

  const zones = [
    { key: "ALL", label: language === "bn" ? "সমগ্র কলকাতা" : "All Zones" },
    { key: "North Kolkata", label: language === "bn" ? "উত্তর কলকাতা" : "North Kolkata" },
    { key: "Central Kolkata", label: language === "bn" ? "মধ্য কলকাতা" : "Central Kolkata" },
    { key: "South Kolkata", label: language === "bn" ? "দক্ষিণ কলকাতা" : "South Kolkata" },
    { key: "Salt Lake & New Town", label: language === "bn" ? "সল্টলেক ও নিউ টাউন" : "Salt Lake & New Town" },
    { key: "Behala & West", label: language === "bn" ? "বেহালা ও পশ্চিম" : "Behala & West" },
  ];

  return (
    <div className="relative w-full h-[600px] sm:h-[680px] rounded-3xl overflow-hidden shadow-2xl border border-[#c05621]/30 bg-stone-900">
      {/* Leaflet Canvas */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Top Floating Controls Bar */}
      <div className="absolute top-4 left-4 right-4 z-[400] flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Left: Filters Pill Group */}
        <div className="flex flex-wrap items-center gap-1.5 pointer-events-auto bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-stone-200 shadow-lg">
          {/* Category Dropdown */}
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="text-xs font-bold bg-transparent text-stone-800 px-2.5 py-1 rounded-xl outline-none cursor-pointer"
          >
            {categories.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>

          <span className="text-stone-300">|</span>

          {/* Zone Dropdown */}
          <select
            value={activeZone}
            onChange={(e) => setActiveZone(e.target.value)}
            className="text-xs font-bold bg-transparent text-stone-800 px-2.5 py-1 rounded-xl outline-none cursor-pointer"
          >
            {zones.map((z) => (
              <option key={z.key} value={z.key}>
                {z.label}
              </option>
            ))}
          </select>

          {/* 10 km Radar Toggle */}
          {userCoords && (
            <>
              <span className="text-stone-300">|</span>
              <button
                onClick={() => setIs10KmFilterActive(!is10KmFilterActive)}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 ${
                  is10KmFilterActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-blue-50 text-blue-800 hover:bg-blue-100"
                }`}
              >
                <Radio className="w-3 h-3 animate-pulse" />
                <span>{language === "bn" ? "১০ কিমি রাডার" : "10 km Radar"}</span>
              </button>
            </>
          )}
        </div>

        {/* Right: Map Style & Location Actions */}
        <div className="flex items-center space-x-2 pointer-events-auto">
          {/* Tile Mode Toggle */}
          <div className="p-1 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200 shadow-lg flex items-center space-x-1 text-[11px] font-bold">
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

          {/* GPS Location Button */}
          <button
            onClick={handleLocateMe}
            disabled={isLocating}
            className={`p-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200 text-stone-800 hover:text-[#9b1b1b] shadow-lg transition-all active:scale-95 ${
              userCoords ? "border-blue-500 text-blue-600" : ""
            }`}
            title={language === "bn" ? "আমার অবস্থান খুঁজুন" : "Locate Me"}
          >
            <LocateFixed className={`w-4 h-4 ${isLocating ? "animate-spin text-blue-600" : ""}`} />
          </button>

          {/* Reset Map Center */}
          <button
            onClick={handleResetCenter}
            className="p-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200 text-stone-800 hover:text-[#9b1b1b] shadow-lg transition-all active:scale-95"
            title={language === "bn" ? "মানচিত্র রিসেট করুন" : "Reset View"}
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Selected Pandal Floating Card */}
      {selectedPandal && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:max-w-md z-[400] bg-white/95 backdrop-blur-lg rounded-2xl p-4 shadow-2xl border border-[#c05621]/30 animate-slideUp">
          <div className="flex items-start justify-between">
            <div className="pr-2">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#9b1b1b] block">
                  {selectedPandal.zone}
                </span>
                {userCoords && (
                  <span className="text-[10px] font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                    📍 {getDistanceKm(userCoords.lat, userCoords.lng, selectedPandal.latitude, selectedPandal.longitude).toFixed(1)} km away
                  </span>
                )}
              </div>
              <h4 className="font-bengali-title text-base sm:text-lg font-bold text-stone-900 mt-0.5">
                {language === "bn"
                  ? selectedPandal.bengaliName
                  : selectedPandal.name}
              </h4>
              <p className="text-xs text-[#c05621] font-semibold mt-0.5">
                Theme: {selectedPandal.theme}
              </p>
              <div className="flex items-center space-x-2 mt-2 text-xs text-stone-600">
                <Train className="w-3.5 h-3.5 text-blue-700" />
                <span>Metro: {selectedPandal.nearestMetro.station} ({selectedPandal.nearestMetro.walkMinutes} min walk)</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedPandal(null)}
              className="text-stone-400 hover:text-stone-700 text-xs p-1"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-stone-200">
            {onViewDetails && (
              <button
                onClick={() => onViewDetails(selectedPandal)}
                className="py-1.5 px-3 rounded-xl border border-stone-300 hover:border-[#9b1b1b] text-xs font-semibold text-stone-800 text-center"
              >
                {t.viewDetails}
              </button>
            )}

            <button
              onClick={() => {
                if (isInRoute(selectedPandal.id)) {
                  removeFromRoute(selectedPandal.id);
                } else {
                  addToRoute(selectedPandal);
                }
              }}
              className={`py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1 ${
                isInRoute(selectedPandal.id)
                  ? "bg-stone-200 text-stone-800"
                  : "bg-[#9b1b1b] hover:bg-[#771d1d] text-white shadow-sm"
              }`}
            >
              {isInRoute(selectedPandal.id) ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{t.inRoute}</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>{t.addToRoute}</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
