export type Language = "bn" | "en";

export interface Translations {
  appName: string;
  tagline: string;
  subTagline: string;
  heroHeadline1: string;
  heroHeadline2: string;
  heroSubtitle: string;
  explorePandals: string;
  buildMyRoute: string;
  exploreByMetro: string;
  countdownTitle: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  mahalaya: string;
  shashthi: string;
  saptami: string;
  ashtami: string;
  navami: string;
  dashami: string;
  navHome: string;
  navPandals: string;
  navThemes: string;
  navRoutes: string;
  navMetro: string;
  navMap: string;
  navCulture: string;
  navFood: string;
  navGuide: string;
  myRoute: string;
  searchPlaceholder: string;
  pandalsHeading: string;
  pandalsSubtitle: string;
  allZones: string;
  northKolkata: string;
  southKolkata: string;
  centralKolkata: string;
  saltLakeNewTown: string;
  behalaWest: string;
  crowdLevel: string;
  crowdLow: string;
  crowdModerate: string;
  crowdHigh: string;
  crowdVeryHigh: string;
  mustVisit: string;
  theme: string;
  traditional: string;
  heritage: string;
  viewDetails: string;
  addToRoute: string;
  removeFromRoute: string;
  inRoute: string;
  directions: string;
  nearestMetro: string;
  walkingTime: string;
  themesSectionTitle: string;
  themesSectionSubtitle: string;
  routeBuilderTitle: string;
  routeBuilderSubtitle: string;
  totalPandals: string;
  estimatedDistance: string;
  estimatedWalking: string;
  metroTransfers: string;
  estimatedJourneyTime: string;
  openInGoogleMaps: string;
  clearRoute: string;
  emptyRouteMessage: string;
  planMyPujoTitle: string;
  planMyPujoSubtitle: string;
  cultureTitle: string;
  cultureSubtitle: string;
  foodTitle: string;
  foodSubtitle: string;
  footerTagline: string;
  footerWish: string;
  bestTime: string;
  avoidTime: string;
  whyVisit: string;
  howToReach: string;
  nearbyFood: string;
  verifiedDataNote: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  bn: {
    appName: "পুজো পথিক ২০২৬",
    tagline: "শহর জুড়ে উৎসব, পথে পথে মা।",
    subTagline: "কলকাতা দুর্গাপূজা ২০২৬ পরিক্রমা ও রুট নির্দেশিকা",
    heroHeadline1: "মা আসছেন…",
    heroHeadline2: "কলকাতা আবার সাজছে।",
    heroSubtitle: "কলকাতা দুর্গাপূজা ২০২৬ — ২২৭+ মণ্ডপ, থিমের আখ্যান, মেট্রো সংযোগ ও আপনার নিজস্ব রুট।",
    explorePandals: "মণ্ডপ অন্বেষণ করুন",
    buildMyRoute: "আমার রুট তৈরি করুন",
    exploreByMetro: "মেট্রো দিয়ে পুজো পরিক্রমা",
    countdownTitle: "মহালয়া আসতে আর বাকি",
    days: "দিন",
    hours: "ঘণ্টা",
    minutes: "মিনিট",
    seconds: "সেকেন্ড",
    mahalaya: "মহালয়া — ১০ অক্টোবর ২০২৬",
    shashthi: "ষষ্ঠী — ১৬ অক্টোবর",
    saptami: "সপ্তমী — ১৭–১৮ অক্টোবর",
    ashtami: "অষ্টমী — ১৯ অক্টোবর",
    navami: "নবমী — ২০ অক্টোবর",
    dashami: "দশমী — ২১ অক্টোবর",
    navHome: "হোম",
    navPandals: "মণ্ডপ পরিক্রমা",
    navThemes: "এবারের থিম",
    navRoutes: "পুজোর রুট",
    navMetro: "মেট্রো গাইড",
    navMap: "মানচিত্র",
    navCulture: "বাঙালির সংস্কৃতি",
    navFood: "পুজোর খাওয়া-দাওয়া",
    navGuide: "যাতায়াত গাইড",
    myRoute: "আমার রুট",
    searchPlaceholder: "মণ্ডপ, এলাকা বা মেট্রো স্টেশন খুঁজুন…",
    pandalsHeading: "কলকাতার মণ্ডপ",
    pandalsSubtitle: "২২৭+ মণ্ডপ। একটি শহর। অজস্র গল্প।",
    allZones: "সব এলাকা",
    northKolkata: "উত্তর কলকাতা",
    southKolkata: "দক্ষিণ কলকাতা",
    centralKolkata: "মধ্য কলকাতা",
    saltLakeNewTown: "সল্টলেক ও নিউটাউন",
    behalaWest: "বেহালা ও পশ্চিম",
    crowdLevel: "ভিড়ের মাত্রা",
    crowdLow: "কম ভিড়",
    crowdModerate: "সহনীয় ভিড়",
    crowdHigh: "বেশি ভিড়",
    crowdVeryHigh: "অত্যধিক ভিড়",
    mustVisit: "অবশ্য দর্শনীয়",
    theme: "থিম মণ্ডপ",
    traditional: "সাবেকি প্রতিমা",
    heritage: "বনেদি বাড়ি",
    viewDetails: "বিস্তারিত দেখুন",
    addToRoute: "রুটে যোগ করুন",
    removeFromRoute: "বাদ দিন",
    inRoute: "রুটে আছে",
    directions: "পথনির্দেশ",
    nearestMetro: "নিকটবর্তী মেট্রো",
    walkingTime: "হাঁটার সময়",
    themesSectionTitle: "এবারের থিম কী?",
    themesSectionSubtitle: "এ বছর কলকাতা বলছে শত ভিন্ন রূপকথা।",
    routeBuilderTitle: "আমার পুজোর রুট",
    routeBuilderSubtitle: "আপনার পছন্দের মণ্ডপগুলো সাজিয়ে নিন সবচেয়ে সুবিধাজনক পথে।",
    totalPandals: "মোট মণ্ডপ",
    estimatedDistance: "আনুমানিক দূরত্ব",
    estimatedWalking: "হাঁটার পথ",
    metroTransfers: "মেট্রো বদল",
    estimatedJourneyTime: "মোট আনুমানিক সময়",
    openInGoogleMaps: "গুগল ম্যাপে পুরো রুট খুলুন",
    clearRoute: "রুট খালি করুন",
    emptyRouteMessage: "আপনার রুটে এখনও কোনো মণ্ডপ যোগ করা হয়নি। ডিরেক্টরি বা মানচিত্র থেকে 'রুটে যোগ করুন' চাপুন।",
    planMyPujoTitle: "পুজোর পরিকল্পনা করুন",
    planMyPujoSubtitle: "মাত্র ৪টি প্রশ্নের উত্তরে পান আপনার মনের মতো নিজস্ব পুজোর রুট।",
    cultureTitle: "শুধু প্যান্ডেল নয়",
    cultureSubtitle: "ঢাকের বোল, ধুনুচির ধোঁয়া আর শিউলির গন্ধে ভরা শারদোৎসবের হৃদস্পন্দন।",
    foodTitle: "পুজোর মাঝে কী খাবেন?",
    foodSubtitle: "মণ্ডপ পরিক্রমার ফাঁকে কলকাতার অবিস্মরণীয় মিষ্টি, রোল, ফুচকা ও বিরিয়ানির স্বাদ।",
    footerTagline: "শহর জুড়ে উৎসব, পথে পথে মা।",
    footerWish: "শুভ দুর্গাপূজা ২০২৬ — মা আসছেন আলো ছড়িয়ে।",
    bestTime: "দর্শনের শ্রেষ্ঠ সময়",
    avoidTime: "যে সময় এড়ানো ভালো",
    whyVisit: "কেন যাবেন?",
    howToReach: "কীভাবে যাবেন?",
    nearbyFood: "নিকটবর্তী খাবার",
    verifiedDataNote: "যাচাইকৃত তথ্য সূত্র এবং কলকাতার উৎসব ট্র্যাফিক নির্দেশিকা অনুসারে প্রস্তুত।",
  },
  en: {
    appName: "Pujo Pathik 2026",
    tagline: "Explore Kolkata. Discover the pandals. Find your route.",
    subTagline: "Kolkata Durga Puja 2026 Discovery & Smart Route Planner",
    heroHeadline1: "Maa Aaschen…",
    heroHeadline2: "Kolkata Prepares To Shine.",
    heroSubtitle: "Kolkata Durga Puja 2026 — 227+ Pandals, Theme Stories, Metro Connections & Your Custom Route.",
    explorePandals: "Explore Pandals",
    buildMyRoute: "Build My Route",
    exploreByMetro: "Explore by Metro",
    countdownTitle: "Countdown to Mahalaya",
    days: "Days",
    hours: "Hours",
    minutes: "Mins",
    seconds: "Secs",
    mahalaya: "Mahalaya — 10 October 2026",
    shashthi: "Shashthi — 16 October",
    saptami: "Saptami — 17–18 October",
    ashtami: "Ashtami — 19 October",
    navami: "Navami — 20 October",
    dashami: "Dashami — 21 October",
    navHome: "Home",
    navPandals: "Pandals",
    navThemes: "Themes",
    navRoutes: "Routes",
    navMetro: "Metro",
    navMap: "Interactive Map",
    navCulture: "Bengali Culture",
    navFood: "Pujo Food",
    navGuide: "Transit Guide",
    myRoute: "My Route",
    searchPlaceholder: "Search pandal, locality or Metro station…",
    pandalsHeading: "Kolkata Pandals",
    pandalsSubtitle: "227+ pandals. One city. Endless stories.",
    allZones: "All Zones",
    northKolkata: "North Kolkata",
    southKolkata: "South Kolkata",
    centralKolkata: "Central Kolkata",
    saltLakeNewTown: "Salt Lake & New Town",
    behalaWest: "Behala & West",
    crowdLevel: "Expected Crowd",
    crowdLow: "Low",
    crowdModerate: "Moderate",
    crowdHigh: "High",
    crowdVeryHigh: "Very High",
    mustVisit: "Must Visit",
    theme: "Theme",
    traditional: "Traditional",
    heritage: "Heritage",
    viewDetails: "View Details",
    addToRoute: "Add to Route",
    removeFromRoute: "Remove",
    inRoute: "In Route",
    directions: "Directions",
    nearestMetro: "Nearest Metro",
    walkingTime: "Walk Time",
    themesSectionTitle: "What are the Themes this Year?",
    themesSectionSubtitle: "This year, Kolkata tells hundreds of different stories.",
    routeBuilderTitle: "My Pujo Route",
    routeBuilderSubtitle: "Curate your favourite pandals into an optimized walking and transit itinerary.",
    totalPandals: "Total Pandals",
    estimatedDistance: "Est. Distance",
    estimatedWalking: "Est. Walking",
    metroTransfers: "Metro Hops",
    estimatedJourneyTime: "Est. Journey Time",
    openInGoogleMaps: "Open Route in Google Maps",
    clearRoute: "Clear Route",
    emptyRouteMessage: "No pandals added yet. Browse the directory or interactive map and click 'Add to Route'.",
    planMyPujoTitle: "Plan My Pujo",
    planMyPujoSubtitle: "Answer 4 quick questions to generate a tailored itinerary matching your time and taste.",
    cultureTitle: "Beyond Just Pandals",
    cultureSubtitle: "The resonance of Dhaak, sacred Dhunuchi smoke, and the autumn soul of Bengal.",
    foodTitle: "What to Eat Along the Route?",
    foodSubtitle: "From steaming kathi rolls and fragrant biryani to sweet curd and hot baked rosogolla.",
    footerTagline: "Explore Kolkata. Discover the pandals. Find your route.",
    footerWish: "Shubho Durga Puja 2026 — May the divine mother illuminate your path.",
    bestTime: "Best Time to Visit",
    avoidTime: "Times to Avoid",
    whyVisit: "Why Visit?",
    howToReach: "How to Reach?",
    nearbyFood: "Food Nearby",
    verifiedDataNote: "Data curated from verified public transit advisories and Durga Puja 2026 releases.",
  },
};

