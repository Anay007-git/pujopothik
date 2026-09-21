import { PANDALS_DATA, Pandal } from "@/data/pandalsData";
import { FOOD_SPOTS, FoodSpot, FoodCategory } from "@/data/foodData";

export interface HubLocation {
  id: string;
  name: string;
  bengaliName: string;
  lat: number;
  lng: number;
  zone: string;
  nearestMetro: string;
}

export const HUBS: HubLocation[] = [
  {
    id: "shyambazar",
    name: "Shyambazar (North Kolkata)",
    bengaliName: "শ্যামবাজার (উত্তর কলকাতা)",
    lat: 22.6012,
    lng: 88.3712,
    zone: "North Kolkata",
    nearestMetro: "Shyambazar (Blue Line)",
  },
  {
    id: "sovabazar",
    name: "Sovabazar / Kumartuli (Riverfront)",
    bengaliName: "শোভাবাজার / কুমারটুলি (গঙ্গার তীর)",
    lat: 22.5997,
    lng: 88.3653,
    zone: "North Kolkata",
    nearestMetro: "Sovabazar Sutanuti (Blue Line)",
  },
  {
    id: "college-street",
    name: "College Street / MG Road (Central)",
    bengaliName: "কলেজ স্ট্রিট / এম জি রোড (মধ্য কলকাতা)",
    lat: 22.5768,
    lng: 88.3638,
    zone: "Central Kolkata",
    nearestMetro: "MG Road / Central (Blue Line)",
  },
  {
    id: "howrah",
    name: "Howrah Station / Ganga Ghats",
    bengaliName: "হাওড়া স্টেশন / গঙ্গার ঘাট",
    lat: 22.5851,
    lng: 88.3426,
    zone: "Central Kolkata",
    nearestMetro: "Howrah (Green Line underwater metro)",
  },
  {
    id: "sealdah",
    name: "Sealdah Station Corridor",
    bengaliName: "শিয়ালদহ স্টেশন চত্বর",
    lat: 22.5668,
    lng: 88.3716,
    zone: "Central Kolkata",
    nearestMetro: "Sealdah (Green Line)",
  },
  {
    id: "kalighat",
    name: "Kalighat / Rashbehari (South)",
    bengaliName: "কালীঘাট / রাসবিহারী (দক্ষিণ কলকাতা)",
    lat: 22.5186,
    lng: 88.3496,
    zone: "South Kolkata",
    nearestMetro: "Kalighat (Blue Line)",
  },
  {
    id: "gariahat",
    name: "Gariahat / Ballygunge (South)",
    bengaliName: "গড়িয়াহাট / বালিগঞ্জ (দক্ষিণ কলকাতা)",
    lat: 22.5186,
    lng: 88.3644,
    zone: "South Kolkata",
    nearestMetro: "Kalighat / Ballygunge",
  },
  {
    id: "saltlake",
    name: "Salt Lake Karunamoyee / Lake Town",
    bengaliName: "সল্টলেক করুণাময়ী / লেক টাউন",
    lat: 22.5867,
    lng: 88.4190,
    zone: "Salt Lake & New Town",
    nearestMetro: "Karunamoyee (Green Line)",
  },
  {
    id: "behala",
    name: "Behala Chowrasta / Taratala",
    bengaliName: "বেহালা চৌরাস্তা / তারাতলা",
    lat: 22.4988,
    lng: 88.3182,
    zone: "Behala & West",
    nearestMetro: "Taratala (Purple Line)",
  },
];

export interface NearbyRadiusItem {
  id: string;
  type: "pandal" | "food";
  pandal?: Pandal;
  food?: FoodSpot;
  name: string;
  bengaliName: string;
  category: string;
  area: string;
  bengaliArea: string;
  latitude: number;
  longitude: number;
  distanceKm: number;
  distanceFormatted: string;
  bengaliDistanceFormatted: string;
  walkMinutes: number;
  driveMinutes: number;
  image: string;
  highlightText: string;
  bengaliHighlightText: string;
  nearestMetro?: string;
  address: string;
}

export interface AiRouteOptions {
  startingHubId?: string;
  durationHours?: number; // 2, 4, 6, or 8 (all night)
  timeOfDay?: "morning" | "afternoon" | "evening" | "midnight";
  primaryVibe?: "all" | "theme" | "traditional" | "heritage" | "family" | "food" | "less_crowd";
  transportMode?: "METRO" | "WALK" | "CAR" | "MIXED";
  freePrompt?: string;
  userCoords?: { lat: number; lng: number };
  isNearMeQuery?: boolean;
  maxRadiusKm?: number;
}

export interface EnrichedRouteStop {
  pandal: Pandal;
  sequence: number;
  arrivalEstimate: string;
  stayMinutes: number;
  distanceFromPrevKm: number;
  walkMinutesFromPrev: number;
  transitNote: string;
  bengaliTransitNote: string;
  crowdAtArrival: "Low" | "Moderate" | "High" | "Very High";
  crowdWarning?: string;
  bengaliCrowdWarning?: string;
  nearbyFood?: FoodSpot;
  nearbyFoods: FoodSpot[];
}

export interface AiRoutePlan {
  id: string;
  title: string;
  bengaliTitle: string;
  tagline: string;
  bengaliTagline: string;
  summary: string;
  bengaliSummary: string;
  startingHub: HubLocation;
  totalDistanceKm: number;
  totalWalkMinutes: number;
  totalDurationHours: number;
  stops: EnrichedRouteStop[];
  allFoodSpots: FoodSpot[];
  nearbyItemsAscending?: NearbyRadiusItem[];
  isNearMePlan?: boolean;
  userCoords?: { lat: number; lng: number };
  radiusKm?: number;
  aiInsights: Array<{ title: string; bengaliTitle: string; detail: string; bengaliDetail: string }>;
  matchedKeywords: string[];
  googleMapsUrl: string;
}

// Geographic distance helper (Haversine formula in km with 2 decimal precision)
export function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
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
  return Math.round(R * c * 100) / 100;
}

// Extract and sort all pandals & food spots strictly within radius in ascending order
export function getNearbyItemsWithinRadius(
  coords: { lat: number; lng: number },
  maxRadiusKm = 10
): NearbyRadiusItem[] {
  const items: NearbyRadiusItem[] = [];

  // 1. Process Pandals
  PANDALS_DATA.forEach((pandal) => {
    const dist = getDistanceKm(coords.lat, coords.lng, pandal.latitude, pandal.longitude);
    if (dist <= maxRadiusKm) {
      const walkMins = Math.round(dist * 13);
      const driveMins = Math.max(3, Math.round(dist * 3.5));
      items.push({
        id: `pandal-${pandal.id}`,
        type: "pandal",
        pandal,
        name: pandal.name,
        bengaliName: pandal.bengaliName,
        category: pandal.category,
        area: pandal.area,
        bengaliArea: pandal.area,
        latitude: pandal.latitude,
        longitude: pandal.longitude,
        distanceKm: dist,
        distanceFormatted: dist < 1 ? `${Math.round(dist * 1000)} m` : `${dist.toFixed(1)} km`,
        bengaliDistanceFormatted: dist < 1 ? `${Math.round(dist * 1000)} মিটার` : `${dist.toFixed(1)} কিমি`,
        walkMinutes: walkMins,
        driveMinutes: driveMins,
        image: pandal.images[0] || "/images/durga-puja-kolkata-main.jpg",
        highlightText: `Theme: ${pandal.theme}`,
        bengaliHighlightText: `থিম: ${pandal.bengaliTheme}`,
        nearestMetro: `${pandal.nearestMetro.station} Metro`,
        address: pandal.address,
      });
    }
  });

  // 2. Process Food Spots & Pubs
  FOOD_SPOTS.forEach((food) => {
    const dist = getDistanceKm(coords.lat, coords.lng, food.latitude, food.longitude);
    if (dist <= maxRadiusKm) {
      const walkMins = Math.round(dist * 13);
      const driveMins = Math.max(3, Math.round(dist * 3.5));
      items.push({
        id: `food-${food.id}`,
        type: "food",
        food,
        name: food.name,
        bengaliName: food.bengaliName,
        category: food.category,
        area: food.area,
        bengaliArea: food.bengaliArea,
        latitude: food.latitude,
        longitude: food.longitude,
        distanceKm: dist,
        distanceFormatted: dist < 1 ? `${Math.round(dist * 1000)} m` : `${dist.toFixed(1)} km`,
        bengaliDistanceFormatted: dist < 1 ? `${Math.round(dist * 1000)} মিটার` : `${dist.toFixed(1)} কিমি`,
        walkMinutes: walkMins,
        driveMinutes: driveMins,
        image: food.image,
        highlightText: `Must Try: ${food.mustTry}`,
        bengaliHighlightText: `চেখে দেখুন: ${food.bengaliMustTry}`,
        nearestMetro: `${food.nearestMetro} Metro`,
        address: food.address,
      });
    }
  });

  // 3. Sort strictly in ascending order from nearest (0.3km) to farthest (up to 10km)
  items.sort((a, b) => a.distanceKm - b.distanceKm);

  return items;
}

// Natural language intent extractor for prompt queries
export function parseNaturalLanguagePrompt(query: string): Partial<AiRouteOptions> {
  const q = query.toLowerCase();
  const options: Partial<AiRouteOptions> = {};

  // Check for "Near Me" / "Location" query intent
  if (
    q.includes("near me") ||
    q.includes("nearby") ||
    q.includes("around me") ||
    q.includes("close to me") ||
    q.includes("my location") ||
    q.includes("current location") ||
    q.includes("কাছে") ||
    q.includes("কাছাকাছি") ||
    q.includes("আমার অবস্থান") ||
    q.includes("পাশে") ||
    q.includes("10km") ||
    q.includes("১০ কিমি")
  ) {
    options.isNearMeQuery = true;
    options.maxRadiusKm = 10;
  }

  // 1. Detect Starting Hub & Locality (if not strictly a near-me query)
  if (
    q.includes("bagbazar") ||
    q.includes("বাগবাজার") ||
    q.includes("shyambazar") ||
    q.includes("শ্যামবাজার") ||
    q.includes("hatibagan") ||
    q.includes("হাতিবাগান") ||
    q.includes("hedua") ||
    q.includes("north") ||
    q.includes("উত্তর")
  ) {
    options.startingHubId = "shyambazar";
  } else if (
    q.includes("sovabazar") ||
    q.includes("শোভাবাজার") ||
    q.includes("kumartuli") ||
    q.includes("কুমারটুলি") ||
    q.includes("ahiritola")
  ) {
    options.startingHubId = "sovabazar";
  } else if (q.includes("howrah") || q.includes("হাওড়া")) {
    options.startingHubId = "howrah";
  } else if (
    q.includes("maddox") ||
    q.includes("ম্যাডক্স") ||
    q.includes("gariahat") ||
    q.includes("গড়িয়াহাট") ||
    q.includes("ballygunge") ||
    q.includes("বালিগঞ্জ") ||
    q.includes("ekdalia") ||
    q.includes("south") ||
    q.includes("দক্ষিণ")
  ) {
    options.startingHubId = "gariahat";
  } else if (
    q.includes("kalighat") ||
    q.includes("কালীঘাট") ||
    q.includes("rashbehari") ||
    q.includes("southern") ||
    q.includes("সাউদার্ন") ||
    q.includes("chetla")
  ) {
    options.startingHubId = "kalighat";
  } else if (
    q.includes("salt lake") ||
    q.includes("সল্টলেক") ||
    q.includes("new town") ||
    q.includes("lake town") ||
    q.includes("sreebhumi") ||
    q.includes("শ্রীভূমি")
  ) {
    options.startingHubId = "saltlake";
  } else if (
    q.includes("park street") ||
    q.includes("পার্ক স্ট্রিট") ||
    q.includes("college") ||
    q.includes("কলেজ") ||
    q.includes("bowbazar") ||
    q.includes("central") ||
    q.includes("মধ্য") ||
    q.includes("esplanade") ||
    q.includes("ধর্মতলা") ||
    q.includes("new market")
  ) {
    options.startingHubId = "college-street";
  } else if (q.includes("sealdah") || q.includes("শিয়ালদহ") || q.includes("tangra") || q.includes("ট্যাংরা")) {
    options.startingHubId = "sealdah";
  } else if (
    q.includes("behala") ||
    q.includes("বেহালা") ||
    q.includes("alipore") ||
    q.includes("আলিপুর") ||
    q.includes("taratala")
  ) {
    options.startingHubId = "behala";
  }

  // 2. Detect Duration
  if (q.includes("2 hour") || q.includes("2h") || q.includes("২ ঘণ্টা") || q.includes("quick") || q.includes("তাড়াতাড়ি"))
    options.durationHours = 2;
  else if (q.includes("4 hour") || q.includes("4h") || q.includes("৪ ঘণ্টা"))
    options.durationHours = 4;
  else if (q.includes("6 hour") || q.includes("6h") || q.includes("৬ ঘণ্টা"))
    options.durationHours = 6;
  else if (
    q.includes("all night") ||
    q.includes("full night") ||
    q.includes("সারারাত") ||
    q.includes("midnight") ||
    q.includes("মাঝরাত") ||
    q.includes("রাতভর")
  ) {
    options.durationHours = 8;
    options.timeOfDay = "midnight";
  }

  // 3. Detect Time of day
  if (q.includes("morning") || q.includes("সকাল") || q.includes("ভোর")) options.timeOfDay = "morning";
  else if (q.includes("afternoon") || q.includes("দুপুর") || q.includes("বিকাল")) options.timeOfDay = "afternoon";
  else if (q.includes("evening") || q.includes("সন্ধ্যা")) options.timeOfDay = "evening";
  else if (q.includes("midnight") || q.includes("রাত") || q.includes("মাঝরাত")) options.timeOfDay = "midnight";

  // 4. Detect Vibe (including Food, Chinese, Continental, Pubs, Traditional, Theme)
  if (
    q.includes("food") ||
    q.includes("stall") ||
    q.includes("stalls") ||
    q.includes("street food") ||
    q.includes("eatery") ||
    q.includes("restaurant") ||
    q.includes("biryani") ||
    q.includes("roll") ||
    q.includes("phuchka") ||
    q.includes("fuchka") ||
    q.includes("sweet") ||
    q.includes("mishti") ||
    q.includes("rosogolla") ||
    q.includes("kabiraji") ||
    q.includes("cutlet") ||
    q.includes("chop") ||
    q.includes("mela") ||
    q.includes("chinese") ||
    q.includes("tangra") ||
    q.includes("wonton") ||
    q.includes("chowmein") ||
    q.includes("dim sum") ||
    q.includes("tung naam") ||
    q.includes("big boss") ||
    q.includes("tung fong") ||
    q.includes("eau chew") ||
    q.includes("continental") ||
    q.includes("steak") ||
    q.includes("sizzler") ||
    q.includes("crab") ||
    q.includes("mocambo") ||
    q.includes("peter cat") ||
    q.includes("chelo") ||
    q.includes("flurys") ||
    q.includes("pub") ||
    q.includes("pubs") ||
    q.includes("bar") ||
    q.includes("bars") ||
    q.includes("beer") ||
    q.includes("drink") ||
    q.includes("drinks") ||
    q.includes("cocktail") ||
    q.includes("nightlife") ||
    q.includes("olypub") ||
    q.includes("trincas") ||
    q.includes("someplace else") ||
    q.includes("the grid") ||
    q.includes("lord of the drinks") ||
    q.includes("খাবার") ||
    q.includes("স্টল") ||
    q.includes("ফুড স্টল") ||
    q.includes("বিরিয়ানি") ||
    q.includes("রোল") ||
    q.includes("ফুচকা") ||
    q.includes("মিষ্টি") ||
    q.includes("রসগোল্লা") ||
    q.includes("চপ") ||
    q.includes("কাটলেট") ||
    q.includes("চাইনিজ") ||
    q.includes("কন্টিনেন্টাল") ||
    q.includes("পাব") ||
    q.includes("বার")
  ) {
    options.primaryVibe = "food";
  } else if (q.includes("traditional") || q.includes("সাবেকি") || q.includes("ডাকের সাজ") || q.includes("daker saaj")) {
    options.primaryVibe = "traditional";
  } else if (q.includes("heritage") || q.includes("বনেদি") || q.includes("রাজবাড়ি") || q.includes("rajbari")) {
    options.primaryVibe = "heritage";
  } else if (q.includes("theme") || q.includes("থিম") || q.includes("art") || q.includes("স্থাপত্য") || q.includes("আলো")) {
    options.primaryVibe = "theme";
  } else if (q.includes("family") || q.includes("পরিবার") || q.includes("parents") || q.includes("senior") || q.includes("বয়স্ক")) {
    options.primaryVibe = "family";
  } else if (q.includes("less crowd") || q.includes("কম ভিড়") || q.includes("peaceful") || q.includes("শান্তি")) {
    options.primaryVibe = "less_crowd";
  }

  // 5. Detect Transport Mode
  if (q.includes("metro") || q.includes("মেট্রো")) options.transportMode = "METRO";
  else if (q.includes("walk") || q.includes("হাঁটা") || q.includes("পায়ে হেঁটে")) options.transportMode = "WALK";
  else if (q.includes("car") || q.includes("ক্যাব") || q.includes("গাড়ি")) options.transportMode = "CAR";

  return options;
}

// Main AI Route Detection & Generation Function
export function generateAiRoute(options: AiRouteOptions): AiRoutePlan {
  const maxRadiusKm = options.maxRadiusKm || 10;
  const promptLower = (options.freePrompt || "").toLowerCase();
  const isNearMe = Boolean(options.isNearMeQuery || options.userCoords || promptLower.includes("near me") || promptLower.includes("কাছে"));

  // 1. Resolve starting anchor hub or user coordinates
  let hub: HubLocation;
  if (options.userCoords) {
    // Find closest hub to user
    let closestHub = HUBS[0];
    let minD = Infinity;
    HUBS.forEach((h) => {
      const d = getDistanceKm(options.userCoords!.lat, options.userCoords!.lng, h.lat, h.lng);
      if (d < minD) {
        minD = d;
        closestHub = h;
      }
    });

    hub = {
      id: "my-location",
      name: `My Live Location (near ${closestHub.name.split("(")[0].trim()})`,
      bengaliName: `আমার বর্তমান অবস্থান (${closestHub.bengaliName.split("(")[0].trim()} চত্বর)`,
      lat: options.userCoords.lat,
      lng: options.userCoords.lng,
      zone: closestHub.zone,
      nearestMetro: closestHub.nearestMetro,
    };
  } else {
    const hubId = options.startingHubId || "shyambazar";
    hub = HUBS.find((h) => h.id === hubId) || HUBS[0];
  }

  const durationHours = options.durationHours || 4;
  const timeOfDay = options.timeOfDay || "evening";
  const vibe = options.primaryVibe || "all";
  const mode = options.transportMode || "METRO";

  // Determine stop limit based on hours
  const maxStops = durationHours <= 2 ? 3 : durationHours <= 4 ? 5 : durationHours <= 6 ? 7 : 9;

  // 2. Generate Ascending 10km Radius Items if user location or near-me query is active
  const anchorLat = options.userCoords ? options.userCoords.lat : hub.lat;
  const anchorLng = options.userCoords ? options.userCoords.lng : hub.lng;
  const nearbyItemsAscending = getNearbyItemsWithinRadius({ lat: anchorLat, lng: anchorLng }, maxRadiusKm);

  // 3. Filter & Score candidate pandals
  const scored = PANDALS_DATA.map((pandal) => {
    let score = 100 - getDistanceKm(anchorLat, anchorLng, pandal.latitude, pandal.longitude) * 5;

    // If near-me query is on, heavily boost pandals within radius
    if (isNearMe) {
      const dist = getDistanceKm(anchorLat, anchorLng, pandal.latitude, pandal.longitude);
      if (dist <= 3.0) score += 100;
      else if (dist <= 6.0) score += 60;
      else if (dist <= 10.0) score += 30;
      else score -= 100; // Deprioritize items outside 10km radius
    }

    // Explicit Prompt Entity Priority Matching
    if (
      (promptLower.includes("bagbazar") || promptLower.includes("বাগবাজার")) &&
      pandal.id === "bagbazar-sarbojanin"
    ) {
      score += 250;
    }
    if (
      (promptLower.includes("sreebhumi") || promptLower.includes("শ্রীভূমি")) &&
      pandal.id === "sreebhumi-sporting-club"
    ) {
      score += 250;
    }
    if (
      (promptLower.includes("maddox") || promptLower.includes("ম্যাডক্স")) &&
      pandal.id === "maddox-square"
    ) {
      score += 250;
    }
    if (
      (promptLower.includes("kumartuli") || promptLower.includes("কুমারটুলি")) &&
      pandal.id === "kumartuli-park"
    ) {
      score += 200;
    }
    if (
      (promptLower.includes("ekdalia") || promptLower.includes("একডালিয়া")) &&
      pandal.id === "ekdalia-evergreen"
    ) {
      score += 200;
    }
    if (
      (promptLower.includes("college square") || promptLower.includes("কলেজ স্কোয়ার")) &&
      pandal.id === "college-square"
    ) {
      score += 200;
    }
    if (
      (promptLower.includes("suruchi") || promptLower.includes("সুরুচি")) &&
      pandal.id === "suruchi-sangha"
    ) {
      score += 200;
    }
    if (
      (promptLower.includes("santosh mitra") || promptLower.includes("সন্তোষ মিত্র")) &&
      pandal.id === "santosh-mitra-square"
    ) {
      score += 200;
    }

    // General Vibe Matching
    if (vibe === "traditional" && pandal.category === "traditional") score += 40;
    if (vibe === "heritage" && (pandal.category === "heritage" || pandal.id.includes("rajbari"))) score += 50;
    if (vibe === "theme" && pandal.category === "theme") score += 40;
    if (vibe === "family" && pandal.crowdLevel !== "Very High") score += 30;
    if (vibe === "less_crowd" && (pandal.crowdLevel === "Low" || pandal.crowdLevel === "Moderate")) score += 45;
    if (vibe === "food" && pandal.foodNearby && pandal.foodNearby.length > 0) score += 35;

    // Time of day matching
    if (timeOfDay === "morning" && pandal.bestTime.toLowerCase().includes("morning")) score += 25;
    if (timeOfDay === "midnight" && (pandal.bestTime.toLowerCase().includes("night") || pandal.bestTime.toLowerCase().includes("midnight")))
      score += 30;
    if (timeOfDay === "evening" && pandal.avoidTime.toLowerCase().includes("peak") && pandal.crowdLevel === "Very High")
      score -= 10;

    return { pandal, score };
  });

  scored.sort((a, b) => b.score - a.score);

  // Take the top pool of candidates
  const candidatePool = scored.slice(0, Math.min(maxStops + 4, scored.length)).map((s) => s.pandal);

  // 4. Optimize path (Traveling Salesperson greedy ordering from anchor)
  const orderedStops: Pandal[] = [];
  const remaining = [...candidatePool];
  let currentLat = anchorLat;
  let currentLng = anchorLng;

  // If specific pandal was explicitly requested in prompt, place it as stop #1
  const explicitFirst = remaining.find((p) => {
    if (promptLower.includes("bagbazar") || promptLower.includes("বাগবাজার")) return p.id === "bagbazar-sarbojanin";
    if (promptLower.includes("sreebhumi") || promptLower.includes("শ্রীভূমি")) return p.id === "sreebhumi-sporting-club";
    if (promptLower.includes("maddox") || promptLower.includes("ম্যাডক্স")) return p.id === "maddox-square";
    if (promptLower.includes("college") || promptLower.includes("কলেজ")) return p.id === "college-square";
    return false;
  });

  if (explicitFirst) {
    const idx = remaining.indexOf(explicitFirst);
    if (idx !== -1) {
      remaining.splice(idx, 1);
      orderedStops.push(explicitFirst);
      currentLat = explicitFirst.latitude;
      currentLng = explicitFirst.longitude;
    }
  }

  while (orderedStops.length < maxStops && remaining.length > 0) {
    let bestIdx = 0;
    let minDistance = Infinity;

    for (let i = 0; i < remaining.length; i++) {
      const d = getDistanceKm(currentLat, currentLng, remaining[i].latitude, remaining[i].longitude);
      if (d < minDistance) {
        minDistance = d;
        bestIdx = i;
      }
    }

    const nextPandal = remaining.splice(bestIdx, 1)[0];
    orderedStops.push(nextPandal);
    currentLat = nextPandal.latitude;
    currentLng = nextPandal.longitude;
  }

  // 5. Calculate timing, transit segments, and food matching
  let startMinutes =
    timeOfDay === "morning"
      ? 8 * 60 // 8:00 AM
      : timeOfDay === "afternoon"
      ? 15 * 60 // 3:00 PM
      : timeOfDay === "midnight"
      ? 23 * 60 // 11:00 PM
      : 18 * 60; // 6:00 PM default evening

  const formatClock = (totalMins: number): string => {
    let normalized = totalMins % (24 * 60);
    const hrs24 = Math.floor(normalized / 60);
    const mins = normalized % 60;
    const period = hrs24 >= 12 ? "PM" : "AM";
    const hrs12 = hrs24 % 12 === 0 ? 12 : hrs24 % 12;
    const minStr = mins < 10 ? `0${mins}` : mins;
    return `${hrs12}:${minStr} ${period}`;
  };

  let cumulativeDistanceKm = 0;
  let cumulativeWalkMinutes = 0;
  let currentClockMinutes = startMinutes;

  const enrichedStops: EnrichedRouteStop[] = orderedStops.map((pandal, idx) => {
    const prevLat = idx === 0 ? anchorLat : orderedStops[idx - 1].latitude;
    const prevLng = idx === 0 ? anchorLng : orderedStops[idx - 1].longitude;
    const legDist = getDistanceKm(prevLat, prevLng, pandal.latitude, pandal.longitude);
    const walkMins = Math.round(legDist * 13);

    cumulativeDistanceKm += legDist;
    cumulativeWalkMinutes += walkMins;

    currentClockMinutes += walkMins;
    const arrivalEstimate = formatClock(currentClockMinutes);

    const stayMinutes = pandal.category === "must_visit" ? 40 : pandal.category === "theme" ? 35 : 25;
    currentClockMinutes += stayMinutes;

    const arrivalHour24 = Math.floor((currentClockMinutes / 60) % 24);
    let crowdAtArrival: "Low" | "Moderate" | "High" | "Very High" = pandal.crowdLevel;
    let crowdWarning: string | undefined;
    let bengaliCrowdWarning: string | undefined;

    if (arrivalHour24 >= 19 && arrivalHour24 <= 23) {
      if (pandal.crowdLevel === "Very High") {
        crowdWarning = "Peak hour surge expected. Keep 20-30 min queue buffer.";
        bengaliCrowdWarning = "সন্ধ্যা ৭টা–১১টা সর্বোচ্চ ভিড়। লাইনে সময় হাতে রাখুন।";
      }
    } else if (arrivalHour24 >= 6 && arrivalHour24 <= 11) {
      crowdAtArrival = "Low";
      crowdWarning = "Morning calm: pristine lighting & minimal queue.";
      bengaliCrowdWarning = "ভোরের নির্মল আলো ও শূন্য ভিড়—আরামদায়ক দর্শন।";
    } else if (arrivalHour24 >= 1 && arrivalHour24 <= 4) {
      crowdAtArrival = "Moderate";
      crowdWarning = "Midnight crowd: lively adda and illuminated avenues.";
      bengaliCrowdWarning = "মাঝরাতের প্রাণবন্ত আড্ডা ও আলোকসজ্জা।";
    }

    const transitNote =
      idx === 0
        ? `Start from ${hub.name} (${legDist} km, ~${walkMins} mins walk).`
        : `Walk ${legDist} km (${walkMins} mins) or take auto along ${pandal.area}.`;
    const bengaliTransitNote =
      idx === 0
        ? `${hub.bengaliName} থেকে যাত্রা শুরু (${legDist} কিমি, ~${walkMins} মিনিট হাঁটা)।`
        : `${legDist} কিমি পথ (${walkMins} মিনিট) হেঁটে বা অটো ধরে পৌঁছান।`;

    // Match all nearby authentic food spots within ~1.8 km
    const matchedFoods = FOOD_SPOTS.filter((f) => {
      if (f.nearestPandalId === pandal.id) return true;
      const d = getDistanceKm(f.latitude, f.longitude, pandal.latitude, pandal.longitude);
      if (d <= 1.8) return true;
      const cleanPandalArea = pandal.area.toLowerCase().split(",")[0].trim();
      const cleanFoodArea = f.area.toLowerCase().split(",")[0].trim();
      if (cleanPandalArea.includes(cleanFoodArea) || cleanFoodArea.includes(cleanPandalArea)) return true;
      return false;
    });

    matchedFoods.sort((a, b) => {
      const distA = getDistanceKm(a.latitude, a.longitude, pandal.latitude, pandal.longitude);
      const distB = getDistanceKm(b.latitude, b.longitude, pandal.latitude, pandal.longitude);
      return distA - distB;
    });

    const nearbyFood = matchedFoods[0];

    return {
      pandal,
      sequence: idx + 1,
      arrivalEstimate,
      stayMinutes,
      distanceFromPrevKm: legDist,
      walkMinutesFromPrev: walkMins,
      transitNote,
      bengaliTransitNote,
      crowdAtArrival,
      crowdWarning,
      bengaliCrowdWarning,
      nearbyFood,
      nearbyFoods: matchedFoods,
    };
  });

  // 6. Aggregate all unique food spots along this route
  const foodMap = new Map<string, FoodSpot>();
  enrichedStops.forEach((stop) => {
    stop.nearbyFoods.forEach((f) => {
      if (!foodMap.has(f.id)) {
        foodMap.set(f.id, f);
      }
    });
  });

  // If prompt explicitly queried for Chinese, ensure top Chinese spots are available
  if (promptLower.includes("chinese") || promptLower.includes("tangra") || promptLower.includes("চাইনিজ")) {
    FOOD_SPOTS.filter((f) => f.category === "Tangra Chinese").forEach((f) => foodMap.set(f.id, f));
  }

  // If prompt explicitly queried for Continental, ensure top Continental spots are available
  if (
    promptLower.includes("continental") ||
    promptLower.includes("mocambo") ||
    promptLower.includes("peter cat") ||
    promptLower.includes("কন্টিনেন্টাল")
  ) {
    FOOD_SPOTS.filter((f) => f.category === "Continental Heritage").forEach((f) => foodMap.set(f.id, f));
  }

  // If prompt explicitly queried for Pubs/Bars, ensure top Pubs are available
  if (
    promptLower.includes("pub") ||
    promptLower.includes("beer") ||
    promptLower.includes("bar") ||
    promptLower.includes("olypub") ||
    promptLower.includes("trincas") ||
    promptLower.includes("পাব")
  ) {
    FOOD_SPOTS.filter((f) => f.category === "Historic Pubs & Bars").forEach((f) => foodMap.set(f.id, f));
  }

  const allFoodSpots = Array.from(foodMap.values());

  // 7. Build intelligent titles, taglines, and AI commentary
  let title = "";
  let bengaliTitle = "";
  let tagline = "";
  let bengaliTagline = "";

  const isChineseQuery =
    promptLower.includes("chinese") || promptLower.includes("tangra") || promptLower.includes("চাইনিজ");
  const isContinentalQuery =
    promptLower.includes("continental") ||
    promptLower.includes("mocambo") ||
    promptLower.includes("peter cat") ||
    promptLower.includes("কন্টিনেন্টাল");
  const isPubQuery =
    promptLower.includes("pub") ||
    promptLower.includes("bar") ||
    promptLower.includes("beer") ||
    promptLower.includes("olypub") ||
    promptLower.includes("পাব");
  const isBagbazarQuery = promptLower.includes("bagbazar") || promptLower.includes("বাগবাজার");

  if (isNearMe) {
    title = `Nearby Pandals & Food Stalls (10 km Radius)`;
    bengaliTitle = `আমার কাছাকাছি মণ্ডপ ও ফুড স্টল (১০ কিমি রেডিয়াস)`;
    tagline = `Sorted in ascending order from nearest (${nearbyItemsAscending[0]?.distanceFormatted || '0.5 km'}) to farthest within 10 km.`;
    bengaliTagline = `নিকটতম (${nearbyItemsAscending[0]?.bengaliDistanceFormatted || '৫০০ মিটার'}) থেকে ১০ কিমি দূরত্বের ক্রমানুসারে সাজানো তালিকা।`;
  } else if (isChineseQuery) {
    title = `${hub.name.split("(")[0].trim()} Tangra Chinese & Pandal Trail`;
    bengaliTitle = `${hub.bengaliName.split("(")[0].trim()} ট্যাংরা চায়নাটাউন ও মণ্ডপ পরিক্রমা`;
    tagline = `Authentic Cantonese wontons, Tangra chilli chicken, and top pandals.`;
    bengaliTagline = `ঐতিহাসিক চিনা খাবার, সুস্বাদু ওনটন ও ট্যাংরার খাঁটি স্বাদের সঙ্গে পুজো পরিক্রমা।`;
  } else if (isContinentalQuery) {
    title = `${hub.name.split("(")[0].trim()} Continental Heritage & Pandal Circuit`;
    bengaliTitle = `${hub.bengaliName.split("(")[0].trim()} হেরিটেজ কন্টিনেন্টাল ও মণ্ডপ পরিক্রমা`;
    tagline = `Iconic pandals paired with Mocambo devilled crab, Peter Cat chelo kebab, and Flurys pastries.`;
    bengaliTagline = `পার্ক স্ট্রিটের মোকাম্বো, পিটার ক্যাট ও বিখ্যাত সাবেকি মণ্ডপের যুগলবন্দি।`;
  } else if (isPubQuery) {
    title = `${hub.name.split("(")[0].trim()} Historic Pubs & Late Night Adda Trail`;
    bengaliTitle = `${hub.bengaliName.split("(")[0].trim()} ঐতিহ্যের পাব, বিয়ার ও মাঝরাতের আড্ডা`;
    tagline = `Sizzling steaks at Olypub, live jazz at Trincas, and illuminated night pandals.`;
    bengaliTagline = `অলি পাবের স্টেক ও ড্রাফট বিয়ার এবং কলকাতার মোহময়ী আলোকসজ্জা।`;
  } else if (isBagbazarQuery && vibe === "food") {
    title = `Bagbazar Food Mela & Sabeki Pandal Circuit`;
    bengaliTitle = `বাগবাজার ফুড মেলা ও সাবেকি মণ্ডপ পরিক্রমা`;
    tagline = `106-year-old traditional idol, Golbari kosha mangsho, Nobin Das rosogolla, and street stalls.`;
    bengaliTagline = `বাগবাজারের শতবর্ষের সাবেকি প্রতিমা, গোলবাড়ির কষা মাংস আর নবীন দাসের আদি রসগোল্লা।`;
  } else if (vibe === "food") {
    title = `${hub.name.split("(")[0].trim()} Culinary & Pandal Adda Circuit`;
    bengaliTitle = `${hub.bengaliName.split("(")[0].trim()} পুজোর খাওয়া-দাওয়া ও মণ্ডপ পরিক্রমা`;
    tagline = `Iconic pandals paired with Kolkata's legendary rolls, biryani, street stalls, and sweets.`;
    bengaliTagline = `সেরা মণ্ডপ দর্শনের পাশাপাশি কলকাতার বিখ্যাত খাবার, ফুড স্টল ও আড্ডা।`;
  } else if (vibe === "traditional" || vibe === "heritage") {
    title = `${hub.name.split("(")[0].trim()} Heritage & Sabeki Trail`;
    bengaliTitle = `${hub.bengaliName.split("(")[0].trim()} বনেদি ও সাবেকি পরিক্রমা`;
    tagline = `Pure traditional devotion, Daker Saaj, and historic aristocratic courtyards.`;
    bengaliTagline = `চিরায়ত সাবেকি ডাকের সাজ ও শতাব্দীপ্রাচীন বনেদি বাড়ির ঐতিহ্য।`;
  } else if (vibe === "theme") {
    title = `${hub.name.split("(")[0].trim()} Conceptual Theme Expedition`;
    bengaliTitle = `${hub.bengaliName.split("(")[0].trim()} আধুনিক থিম ও স্থাপত্য পরিক্রমা`;
    tagline = `Avant-garde installations, lighting wizardry, and artistic mastery.`;
    bengaliTagline = `চোখ ধাঁধানো আধুনিক থিম, অভিনব আলোকসজ্জা ও শিল্পকলার মহাকাব্য।`;
  } else {
    title = `${hub.name.split("(")[0].trim()} Smart AI Pandal Itinerary`;
    bengaliTitle = `${hub.bengaliName.split("(")[0].trim()} স্মার্ট এআই পুজো রুট`;
    tagline = `Optimized route minimizing backtracking and crowd choke points.`;
    bengaliTagline = `কম হাঁটা ও সহজে ভ্রমণের জন্য এআই নির্দেশিত সেরা রুট।`;
  }

  const summary = isNearMe
    ? `Located ${nearbyItemsAscending.length} destinations (${nearbyItemsAscending.filter((i) => i.type === "pandal").length} pandals & ${nearbyItemsAscending.filter((i) => i.type === "food").length} food stalls) within 10 km of your position, sequenced in ascending order starting from ${nearbyItemsAscending[0]?.name || 'closest stop'} (${nearbyItemsAscending[0]?.distanceFormatted || '500m'}).`
    : `AI detected ${enrichedStops.length} stops covering ${cumulativeDistanceKm.toFixed(1)} km with an estimated ${durationHours}-hour budget starting from ${hub.name}. Synchronized with ${allFoodSpots.length} legendary Kolkata eateries, street food stalls, and heritage cafes along the way.`;

  const bengaliSummary = isNearMe
    ? `আপনার বর্তমান অবস্থান থেকে ১০ কিমি রেডিয়াসের মধ্যে মোট ${nearbyItemsAscending.length}টি স্থান (${nearbyItemsAscending.filter((i) => i.type === "pandal").length}টি মণ্ডপ ও ${nearbyItemsAscending.filter((i) => i.type === "food").length}টি ফুড স্টল) চিহ্নিত করা হয়েছে, যা নিকটতম (${nearbyItemsAscending[0]?.bengaliDistanceFormatted || '৫০০ মিটার'}) থেকে ক্রমানুসারে সাজানো।`
    : `এআই অ্যালগরিদম ${hub.bengaliName} থেকে শুরু করে মোট ${enrichedStops.length}টি প্রধান মণ্ডপ (${cumulativeDistanceKm.toFixed(1)} কিমি) এবং রাস্তার পাশে অবস্থিত ${allFoodSpots.length}টি বিখ্যাত ফুড স্টল ও ঐতিহাসিক রেস্তোরাঁ নির্বাচন করেছে।`;

  // AI Insights
  const aiInsights = [
    {
      title: isNearMe ? "Live Radius Strategy" : "Metro & Transit Efficiency",
      bengaliTitle: isNearMe ? "১০ কিমি রেডিয়াস কৌশল" : "মেট্রো ব্যবহারের সুবিধা",
      detail: isNearMe
        ? `Found ${nearbyItemsAscending.length} pandals & food spots within 10 km. Start with stops under 1.5 km to minimize travel time.`
        : `Your starting anchor ${hub.nearestMetro} gives rapid access without sitting in road barricade jams.`,
      bengaliDetail: isNearMe
        ? `১০ কিমি এলাকার মধ্যে ${nearbyItemsAscending.length}টি স্পট রয়েছে। দেড় কিলোমিটারের ভেতরের মণ্ডপগুলো আগে দেখে সময় বাঁচান।`
        : `${hub.nearestMetro} ব্যবহার করে যানজট এড়িয়ে সরাসরি প্রথম মণ্ডপে পৌঁছাতে পারবেন।`,
    },
    {
      title: "Culinary & Adda Strategy",
      bengaliTitle: "খাবার ও আড্ডার পরামর্শ",
      detail: `${allFoodSpots.length} authentic food joints (street stalls, cabins, biryani & cafes) are mapped along your route for mid-walk recharge.`,
      bengaliDetail: `পরিক্রমার ক্লান্তিতে শক্তি ফিরে পেতে রুটের মাঝেই ${allFoodSpots.length}টি বিখ্যাত খাবারের ঠিকানা সাজানো হয়েছে।`,
    },
    {
      title: "Crowd Rhythm",
      bengaliTitle: "ভিড় নিয়ন্ত্রণের কৌশল",
      detail:
        timeOfDay === "morning"
          ? "Morning slots enjoy shortest queue times, calm riverfront breeze, and soft daylight photography."
          : "Avoid peak bottleneck gates between 8:30 PM–10:30 PM by utilizing VIP pedestrian channels or timing snacks.",
      bengaliDetail:
        timeOfDay === "morning"
          ? "সকালের দিকে লাইন একেবারেই কম থাকবে এবং ছবি তোলার জন্য দারুণ আলো পাবেন।"
          : "রাত ৮:৩০–১০:৩০ টার চরম ভিড়ের সময় মূল গেট এড়িয়ে পাশে ফুড স্টলে একটু বিশ্রাম নিন।",
    },
  ];

  // Google Maps Waypoint Chain
  const coordsChain = enrichedStops.map((s) => `${s.pandal.latitude},${s.pandal.longitude}`).join("/");
  const googleMapsUrl = `https://www.google.com/maps/dir/${anchorLat},${anchorLng}/${coordsChain}`;

  return {
    id: `ai-route-${Date.now()}`,
    title,
    bengaliTitle,
    tagline,
    bengaliTagline,
    summary,
    bengaliSummary,
    startingHub: hub,
    totalDistanceKm: cumulativeDistanceKm,
    totalWalkMinutes: cumulativeWalkMinutes,
    totalDurationHours: durationHours,
    stops: enrichedStops,
    allFoodSpots,
    nearbyItemsAscending,
    isNearMePlan: isNearMe,
    userCoords: options.userCoords,
    radiusKm: maxRadiusKm,
    aiInsights,
    matchedKeywords: [isNearMe ? "Near Me 10km" : hub.name, `${durationHours}h`, vibe, mode],
    googleMapsUrl,
  };
}
