# 🌸 পুজো পথিক — Pujo Pathik 2026
### *The Ultimate Kolkata Durga Puja Discovery, Smart Route Planner & Cultural Companion*

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9-green?style=for-the-badge&logo=leaflet&logoColor=white)
![Sharp](https://img.shields.io/badge/Sharp-Optimized-99cc00?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**“মা আসছেন” — Celebrate the grandest festival on Earth with Kolkata's most comprehensive, crowd-aware, bilingual Durga Puja companion.**

[🌐 Explore Live Application](http://localhost:3000) • [🗺️ View Pandals](http://localhost:3000/pandals) • [🚇 Metro Guide](http://localhost:3000/metro) • [📍 Interactive Map](http://localhost:3000/map) • [🍛 Food Trails](http://localhost:3000/food)

</div>

---

## 📖 Table of Contents
- [🌟 Overview](#-overview)
- [✨ Key Features](#-key-features)
  - [1. 227+ Curated Pandals Directory](#1-227-curated-pandals-directory)
  - [2. Smart AI Route Detector & Builder](#2-smart-ai-route-detector--builder)
  - [3. Geolocation & 10km Proximity Radar](#3-geolocation--10km-proximity-radar)
  - [4. Kolkata Metro Puja Transit Guide](#4-kolkata-metro-puja-transit-guide)
  - [5. Pujo Food, Heritage Cabins & Night Trails](#5-pujo-food-heritage-cabins--night-trails)
  - [6. Cultural Heritage, Bonedi Bari & Stories](#6-cultural-heritage-bonedi-bari--stories)
  - [7. Bilingual Experience (বাংলা & English)](#7-bilingual-experience-বাংলা--english)
  - [8. Ultra-Fast Performance & Skeleton Loaders](#8-ultra-fast-performance--skeleton-loaders)
- [📱 Mobile First & Responsive Design](#-mobile-first--responsive-design)
- [🛠️ Tech Stack & Architecture](#️-tech-stack--architecture)
- [📂 Project Directory Structure](#-project-directory-structure)
- [⚡ Performance Benchmarks](#-performance-benchmarks)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
  - [Building for Production](#building-for-production)
- [🗺️ Data Schema Highlights](#️-data-schema-highlights)
- [👨‍💻 Creator & Contributor Attribution](#-creator--contributor-attribution)
- [📄 License](#-license)

---

## 🌟 Overview

**পুজো পথিক (Pujo Pathik)** is a modern, high-performance web platform built to navigate Kolkata's UNESCO Intangible Cultural Heritage extravaganza — **Durga Puja 2026**. 

Navigating Kolkata during the festival requires precision: millions throng the streets, traffic diversions change nightly, and hundreds of iconic pandals compete with breathtaking artistic themes. **Pujo Pathik** solves this by providing:
- Real-time crowd estimators and peak-hour heat indicators.
- Turn-by-turn route optimizations by Metro, walking, bus, or cab.
- Proximity-based radar for nearest pandals and midnight street food joints.
- Deep historical context for centuries-old aristocratic *Bonedi Bari* celebrations.
- Complete accessibility guides (wheelchair ramps, medical booths, VIP passes).

---

## ✨ Key Features

### 1. 227+ Curated Pandals Directory
- Comprehensive catalog covering **North Kolkata**, **South Kolkata**, **Central Kolkata**, **Salt Lake / East**, **Howrah**, **Behala**, and **Jadavpur**.
- Multi-dimensional filters: Zone, Category (*Must-Visit, Theme, Traditional Sabeki, Heritage Bonedi Bari, Eco-friendly*), Crowd Level (*Low, Moderate, High, Very High*), and Nearest Metro Station.
- Detailed modal dossiers for every pandal:
  - 🏛️ Establishing year & historical background
  - 🎨 2026 Theme, Concept & Chief Artist / Sculptor
  - 🏆 Notable awards (*Asian Paints Sharad Shamman, Biswa Bangla*)
  - 🚇 Nearest metro station with walking distance & exit gate
  - ♿ Wheelchair availability, medical aid booths, and parking status
  - 📸 High-definition photo carousels

### 2. Smart AI Route Detector & Builder
- **Personalized Itinerary Generator**: Select your starting hub (e.g., *Howrah Station, Dum Dum, Esplanade, Gariahat, Sealdah*), preferred pujo timing (Morning, Evening, Midnight Hopper), and transportation mode (*Metro, Walking, Cab/Auto*).
- **Custom Drag-and-Drop Route Drawer**: Add pandals with 1 tap, rearrange stops, and review live aggregated route stats:
  - Total distance in kilometers
  - Estimated walking distance
  - Total transit time
- **Direct Navigation Export**: 1-click **Google Maps Multi-Stop Itinerary** generator ready for live road navigation.

### 3. Geolocation & 10km Proximity Radar
- **One-Tap GPS Privilege**: Detects user's real-time geographical coordinates via the HTML5 Geolocation API.
- **Nearest-to-Farthest Sorting**: Calculates real-time distance using the **Haversine formula** and arranges all pandals and food joints within a **10 km radius in ascending order** (from 500m up to 10km).
- Interactive Leaflet map with custom colored thematic SVG markers:
  - 🔴 **Red**: Must-Visit Iconic Pandals
  - 🟡 **Gold**: Contemporary Art Themes
  - ⚪ **White**: Traditional Sabeki Heritage
  - ⚫ **Black**: 300-year-old Aristocratic Bonedi Bari

### 4. Kolkata Metro Puja Transit Guide
- Deep coverage of all active lines:
  - 🔵 **Blue Line (North-South)**: Dakshineswar to Kavi Subhash
  - 🟢 **Green Line (East-West)**: Howrah Maidan through the historic underwater Hooghly River tunnel to Salt Lake Sector V
  - 🟠 **Orange Line**: New Garia to Ruby / Beleghata
  - 🟣 **Purple Line**: Joka to Majerhat / Esplanade
- Special Puja night train timetables, midnight extension alerts, token vs. smart card guidelines, and pandal-station cross-references.

### 5. Pujo Food, Heritage Cabins & Night Trails
- **The Holy Trinity of Kolkata Street Food**: Phuchka spots, Kathi Roll pioneers (Nizam's, Kusum), and Kolkata Mutton Biryani legends (Arsalan, Shiraz, Royal India, Aminia).
- **Historic 19th-Century Cabins**: Mitra Cafe (*Brain Chop & Fish Diamond Fry*), Allen Kitchen (*Prawn Cutlet in Pure Ghee*), Dilkhusha Cabin, and the legendary Indian Coffee House on College Street.
- **Park Street Continental & Nightlife**: Mocambo, Peter Cat (*Chelo Kebab*), Olypub, and Moulin Rouge.
- **Tangra Chinatown Night Trail**: Authentic Indo-Chinese dining (Golden Joy, Beijing, Big Boss) for midnight food runs.
- **Iconic Bengali Sweets & Sherbets**: Paramount Cold Drinks (*Daab Sherbet*), K.C. Das, Balaram Mullick, and Chittaranjan Mistanna Bhandar.

### 6. 💰 Pujo Budget & Expense Planner
- **Target Budget Meter**: Set an outing or daily spending cap (₹500, ₹1000, ₹2500).
- **Route Transit Cost Estimator**: Calculates real-time estimated fares across Metro, Bus, or Cab/Auto legs.
- **1-Tap Quick Expense Logger**: Instant logging for Kolkata snacks (Phuchka ₹40, Roll ₹70, Biryani ₹220), transit tickets, and fair toys with visual progress bars.
- **Budget Alerts**: Visual warnings when spending approaches or exceeds the threshold.

### 7. 👣 Pujo Step & Calorie Counter
- **Real-Time Pedometer**: Step tracking via HTML5 DeviceMotion sensor and GPS distance deltas.
- **Kolkata Food Calorie Burner**: Converts walking endurance into delicious street delicacies:
  - 🥟 Phuchkas burned (25 kcal/phuchka)
  - 🍛 Plates of Kolkata Mutton Biryani burned (650 kcal/plate)
  - 🌯 Kathi Rolls burned (350 kcal/roll)
  - 🥥 Glasses of Daab Sherbet burned (120 kcal/glass)
- **Sharod Milestone Badges**: *শুভ পরিক্রমা*, *পদব্রজে পরিক্রমা*, *শারদ নাইট ওয়াকার*, *মহামায়া ম্যারাথনার*, and *শহুরে পথিক মহাবীর*.
- **1-Tap Shareable Walk Card**: Formats walk and calorie burn stats for WhatsApp Status and Instagram stories.

### 8. 📍 Multi-Select Area & Neighborhood Selector
- **Multi-Zone Selection**: Filter across multiple zones simultaneously (e.g. `[✓] North Kolkata` + `[✓] Central Kolkata`).
- **Granular Locality Pockets**: Multi-select neighborhood chips (*Kumartuli, Bagbazar, Sovabazar, College Street, Gariahat, Ballygunge, Chetla, Salt Lake, Behala, Bowbazar*).
- **Accessibility Filtering**: One-tap toggle for wheelchair-accessible pandals with medical aid booths.

### 9. 🤖 AI Enhancements
- **⚡ AI Route Sequence Optimizer (Traveling Salesperson / 2-Opt)**: Re-orders pandals in the route drawer to compute the mathematically shortest itinerary, eliminating backtrack walking and calculating distance saved.
- **🗣️ "পুজো মিত্র" (Pujo Mitra) AI Concierge**: Interactive bilingual assistant for budget routes, crowd predictions, wheelchair access, and food-pandal pairings tapping directly into the 227+ pandal database.

### 10. 🪪 Personal Pujo Diary & Bucket List
- **Visited Checklist**: 1-tap checkmark on pandal cards and modals to log visits (*e.g., 14 / 227 Pandals Visited*).
- **Personal 1–5 Star Ratings & Memory Notes**: Record personal ratings and reflections.
- **Sharod Scorecard**: Completion percentage meter with shareable festival summary.

### 11. Cultural Heritage, Bonedi Bari & Stories
- **Kumartuli Clay Artisans**: The sacred journey from holy Ganga clay and *Chokkhudan* (painting the divine eyes on Mahalaya) to finished idols.
- **Dhunuchi Naach & Dhak**: The percussion beats of *Kashi* and camphor incense rituals during Ashtami Sandhi Puja.
- **Aristocratic Bonedi Bari**: Deep historical archives on Sovabazar Rajbari (est. 1757), Sabarna Roy Choudhury (est. 1610), Hatkhola Dutta, and Thanthania Dutta Bari.
- **Sindoor Khela & Immersion**: Dashami farewell processions to Babughat, Nimtala Ghat, and Baje Kadamtala Ghat.

### 12. Bilingual Experience (বাংলা & English)
- Fluid real-time translation switch without reloading.
- Culturally authentic Bengali typography (`Noto Sans Bengali`, `Hind Siliguri`) combined with modern Latin typography.
- Authentic Bengali festival terminology: *সন্ধিপূজা*, *মহাসপ্তমী*, *ধুনুচি নাচ*, *কুমারটুলি*, *মহামায়া*, *পরিক্রমা*.

### 13. Ultra-Fast Performance & Skeleton Loaders
- **95.2% Asset Compression**: High-resolution image directory compressed from **128.96 MB down to 6.23 MB** using MozJPEG/WebP optimization via `sharp`.
- **Progressive Shimmer Skeletons**: Dynamic animated placeholder cards (`SkeletonLoader.tsx`) with hardware-accelerated CSS keyframe shimmer.
- **Zero CLS (Cumulative Layout Shift)**: Progressive image scale and fade-in transitions.
- **Dynamic Code-Splitting**: Below-the-fold modules imported dynamically on-demand with static bundle size kept to just **12.3 kB**.

---

## 📱 Mobile First & Responsive Design

Designed from the ground up for field use in crowded Kolkata streets:
- **Dedicated High-Z Slide-Over Drawer (`z-[100]`)**: Seamless navigation sheet with backdrop dimming (`z-[90]`) that never overlaps with fixed floating buttons or map tiles.
- **Body Scroll Locking**: Prevents background page bleeding while browsing the drawer.
- **Thumb-Friendly Bottom Navigation Bar**: Fixed bottom navigation with 5 essential tabs (Home, Pandals, Map, Routes with live counter badge, Guide) and a floating instant search trigger.
- **Horizontal Smooth Scroll Filters**: Quick-tap chips for zones and themes with active state feedback.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | Next.js 14 (App Router) | Server-side rendering, static page prerendering, and optimized route chunks |
| **Language** | TypeScript 5.6 | Strict type-safety across all pandals, metro, routes, and food models |
| **Styling** | Tailwind CSS 3.4 | Custom Bengali aesthetic palette (`#9b1b1b` Crimson, `#d4af37` Gold, `#faf7ee` Off-white) |
| **Mapping** | Leaflet 1.9 & React-Leaflet | Lightweight, interactive mobile mapping with custom thematic SVG markers |
| **Icons** | Lucide React | Clean, tree-shakable modern iconography |
| **Animation** | Framer Motion & CSS Shimmer | Fluid transitions, accordion animations, and micro-interactions |
| **Image Engine** | Sharp 0.35 | Server-side image optimization with AVIF/WebP next-gen format support |
| **Effects** | Canvas-Confetti | Festive celebratory animations on festival milestones |

---

## 📂 Project Directory Structure

```plaintext
DurgaPuja/
├── public/
│   └── images/              # 35+ Optimized photography assets (6.2 MB total)
├── scripts/
│   └── optimize-images.mjs  # Sharp batch compression & resizing engine
├── src/
│   ├── app/                 # Next.js App Router (12 Prerendered Static Pages)
│   │   ├── culture/         # Bengali Traditions, Artisans & History
│   │   ├── food/            # Kolkata Food Finder & Heritage Cabins
│   │   ├── guide/           # Transit, Night Bus & Safety Guide
│   │   ├── map/             # Fullscreen Interactive Leaflet Map & Radar
│   │   ├── metro/           # Kolkata Metro Puja Navigation Guide
│   │   ├── pandals/         # 227+ Pandals Exploration Directory
│   │   ├── routes/          # AI Route Detector & Custom Route Builder
│   │   ├── themes/          # 2026 Pandal Themes & Art Installations
│   │   ├── globals.css      # Theme styles, shimmer keyframes & fonts
│   │   ├── layout.tsx       # Root metadata, viewport & fonts
│   │   └── page.tsx         # Immersive Homepage
│   ├── components/
│   │   ├── animations/      # DurgaEyeIcon, AlpanaDivider, IntroScreen
│   │   ├── common/          # SkeletonLoader (Cards, Sections, Maps)
│   │   ├── countdown/       # Live Festive Timeline & Countdown Clock
│   │   ├── culture/         # CultureStories storytelling module
│   │   ├── food/            # FoodFinder & restaurant cards
│   │   ├── hero/            # Immersive Hero section with quick stats
│   │   ├── layout/          # Navbar, MobileBottomNav, ClientLayout, Footer, SearchModal
│   │   ├── map/             # InteractiveMap Leaflet component & filters
│   │   ├── metro/           # MetroMapGuide & line filters
│   │   ├── pandals/         # PandalCard, PandalModal & detailed dossiers
│   │   ├── photo/           # PhotoGallery Instagram-style mode
│   │   ├── route-builder/   # PrebuiltRoutes & RouteDrawer (Google Maps export)
│   │   ├── themes/          # ThemeExplorer cards
│   │   └── wizard/          # PlanMyPujoWizard interactive planner
│   ├── context/
│   │   ├── LanguageContext.tsx  # Global English / Bangla state management
│   │   └── RouteContext.tsx     # Custom itinerary cart, distance calculation & drawer
│   └── data/
│       ├── cultureData.ts   # Heritage traditions, rituals, and Bonedi Bari stories
│       ├── foodData.ts      # 60+ Restaurants, cabins, street food & pubs
│       ├── metroData.ts     # Station maps, lines, timings & pandal connections
│       ├── pandalsData.ts   # 227+ Pandals comprehensive dataset
│       ├── routesData.ts    # Curated editorial itineraries
│       └── translations.ts  # Full bilingual translation dictionary
├── next.config.mjs          # AVIF/WebP image formats, caching TTL, Brotli compression
├── package.json             # Dependencies & build scripts
├── tailwind.config.ts       # Custom color palette, shadows, Bengali typography
└── tsconfig.json            # Strict TypeScript configuration
```

---

## ⚡ Performance Benchmarks

- **Static Page Generation**: `12/12` pages prerendered statically at build time.
- **First Load JS**: Only **146 kB** on root homepage (shared JS: **87.9 kB**).
- **Asset Weight**: Cut by **95.2%** from **128.96 MB** to **6.23 MB**.
- **Initial Response Latency**: **~480ms** on local production server.
- **Cache Policy**: 30-day edge caching (`minimumCacheTTL: 2592000`) for media assets.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version `18.17` or later recommended)
- `npm` or `pnpm` or `yarn`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Anay007-git/pujopothik.git
   cd pujopothik
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Running Locally

Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

Create an optimized production bundle and start the server:
```bash
npm run build
npm start
```

---

## 🗺️ Data Schema Highlights

### Pandal Entity (`Pandal`)
```typescript
interface Pandal {
  id: string;
  name: string;
  bengaliName: string;
  zone: "North Kolkata" | "South Kolkata" | "Central Kolkata" | "Salt Lake & East" | "Howrah" | "Behala" | "Jadavpur";
  category: "must_visit" | "theme" | "sabeki" | "bonedi_bari" | "eco_friendly";
  area: string;
  bengaliArea: string;
  lat: number;
  lng: number;
  nearestMetro: {
    station: string;
    bengaliStation: string;
    line: "Blue" | "Green" | "Purple" | "Orange";
    distanceMeters: number;
    exitGate?: string;
  };
  crowdLevel: "Low" | "Moderate" | "High" | "Very High";
  bestTime: string;
  bengaliBestTime: string;
  theme: string;
  bengaliTheme: string;
  artist?: string;
  idolMaker?: string;
  establishedYear?: number;
  highlights: string[];
  bengaliHighlights: string[];
  images: string[];
  wheelchairAccessible: boolean;
  vipPassAvailable: boolean;
  medicalBoothNear: boolean;
}
```

---

## 👨‍💻 Creator & Contributor Attribution

<div align="center">

### **Created with ❤️ for Kolkata by [Anay Biswas](https://github.com/Anay007-git)**

| 👤 Name | 📧 Email | 💬 WhatsApp | 📍 Address | 🐙 GitHub |
| :--- | :--- | :--- | :--- | :--- |
| **Anay Biswas** | [biswasanay07@gmail.com](mailto:biswasanay07@gmail.com) | [+91 9804239301](https://wa.me/919804239301) | Acharya Prafulla Pally, Rammalir Math, Kol: 700111 | [@Anay007-git](https://github.com/Anay007-git) |

**Official Project Repository**: [https://github.com/Anay007-git/pujopothik](https://github.com/Anay007-git/pujopothik.git)

</div>

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, enhance, and celebrate the spirit of Kolkata Durga Puja! 

🌸 **শুভ শারদীয়া! (Subho Sharodiya)** 🌸

