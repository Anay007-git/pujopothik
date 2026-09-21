export interface EditorialRoute {
  id: string;
  title: string;
  bengaliTitle: string;
  tagline: string;
  bengaliTagline: string;
  description: string;
  bengaliDescription: string;
  estimatedDuration: string;
  estimatedDistance: string;
  walkingDistance: string;
  recommendedTransport: string;
  recommendedTime: string;
  difficulty: "Easy" | "Moderate" | "Challenging";
  pandalIds: string[];
  stops: Array<{
    pandalId: string;
    sequence: number;
    recommendedStayMin: number;
    transitToNext: string;
  }>;
  highlightNotes: string[];
}

export const PREBUILT_ROUTES: EditorialRoute[] = [
  {
    id: "north-kolkata-heritage",
    title: "North Kolkata Heritage Trail",
    bengaliTitle: "উত্তর কলকাতার বনেদি ও ঐতিহ্য পথ",
    tagline: "Old Kolkata, river breeze, traditional idols and narrow lanes.",
    bengaliTagline: "পুরনো কলকাতা, গঙ্গার বাতাস, সাবেকি প্রতিমা ও অলিগলির রূপকথা।",
    description: "An unforgettable immersion into the soul of ancestral Kolkata: centuries-old royal courtyards, the sacred potter colony of Kumartuli, riverfront ghats, and grand historic community carnivals.",
    bengaliDescription: "শোভাবাজার রাজবাড়ির ঠাকুরদালান থেকে বাগবাজারের শতবর্ষের সাবেকি ডাকের সাজ—গঙ্গার ঠান্ডা হাওয়া মেখে উত্তর কলকাতার ঐতিহ্যের সন্ধান।",
    estimatedDuration: "4.5 – 5.5 Hours",
    estimatedDistance: "4.2 km",
    walkingDistance: "3.8 km",
    recommendedTransport: "Metro (Sovabazar Sutanuti / Shyambazar) + Heritage Walk",
    recommendedTime: "Late afternoon (3:30 PM) to late night",
    difficulty: "Moderate",
    pandalIds: [
      "shobhabazar-rajbari",
      "kumartuli-park",
      "bagbazar-sarbojanin",
      "ahiritola-sarbojanin",
      "jagat-mukherjee-park",
      "chorebagan-sarbojanin"
    ],
    stops: [
      {
        pandalId: "shobhabazar-rajbari",
        sequence: 1,
        recommendedStayMin: 35,
        transitToNext: "6 min walk west through historic Raja Nabakrishna Street to Kumartuli",
      },
      {
        pandalId: "kumartuli-park",
        sequence: 2,
        recommendedStayMin: 30,
        transitToNext: "8 min walk along riverfront towards Bagbazar Ghat",
      },
      {
        pandalId: "bagbazar-sarbojanin",
        sequence: 3,
        recommendedStayMin: 45,
        transitToNext: "10 min walk or rickshaw south towards Ahiritola Ghat",
      },
      {
        pandalId: "ahiritola-sarbojanin",
        sequence: 4,
        recommendedStayMin: 25,
        transitToNext: "12 min walk east towards Shyambazar Five-Point crossing",
      },
      {
        pandalId: "jagat-mukherjee-park",
        sequence: 5,
        recommendedStayMin: 30,
        transitToNext: "Take Blue Line Metro from Shyambazar to Girish Park (2 stations, 5 mins)",
      },
      {
        pandalId: "chorebagan-sarbojanin",
        sequence: 6,
        recommendedStayMin: 35,
        transitToNext: "Finish with warm sweets at Girish Park Mouchak or Central Boi Para",
      },
    ],
    highlightNotes: [
      "Admire the 236-year-old royal courtyard at Sovabazar Rajbari",
      "Walk past the Kumartuli artisan studios where Durga idols are sculpted",
      "Taste authentic Chitranjan Sandesh and Bagbazar ghat kochuri along the route",
    ],
  },
  {
    id: "south-kolkata-classics",
    title: "South Kolkata Classics",
    bengaliTitle: "দক্ষিণ কলকাতার ক্লাসিক সার্কিট",
    tagline: "Gariahat, art installations, lighting marvels and legendary street food.",
    bengaliTagline: "গড়িয়াহাট, বিশ্বমানের থিম, আলোকসজ্জা এবং সেরা স্ট্রিট ফুড।",
    description: "The glamour and architectural wizardry of South Kolkata. Experience cutting-edge conceptual themes, majestic temple replicas, vibrant night crowds, and the endless adda of Southern Avenue.",
    bengaliDescription: "একডালিয়ার সোমনাথ মন্দির থেকে সুরুচি সংঘের উৎস—দক্ষিণ কলকাতার সেরা মণ্ডপ ও শিল্পকলার জমকালো মেলবন্ধন।",
    estimatedDuration: "5 – 6 Hours",
    estimatedDistance: "5.5 km",
    walkingDistance: "3.5 km",
    recommendedTransport: "Metro (Kalighat / Rabindra Sarobar) + Auto",
    recommendedTime: "Evening 6:00 PM onwards or midnight hopping",
    difficulty: "Moderate",
    pandalIds: [
      "ekdalia-evergreen",
      "hindusthan-park",
      "samaj-sebi-sangha",
      "deshapriya-park",
      "tridhara-sammilani",
      "suruchi-sangha"
    ],
    stops: [
      {
        pandalId: "ekdalia-evergreen",
        sequence: 1,
        recommendedStayMin: 40,
        transitToNext: "5 min walk through Gariahat crossing into Hindusthan Park",
      },
      {
        pandalId: "hindusthan-park",
        sequence: 2,
        recommendedStayMin: 30,
        transitToNext: "4 min walk along leafy Lake View Road",
      },
      {
        pandalId: "samaj-sebi-sangha",
        sequence: 3,
        recommendedStayMin: 30,
        transitToNext: "6 min stroll towards Deshapriya Park grounds",
      },
      {
        pandalId: "deshapriya-park",
        sequence: 4,
        recommendedStayMin: 40,
        transitToNext: "3 min cross into Manoharpukur Road",
      },
      {
        pandalId: "tridhara-sammilani",
        sequence: 5,
        recommendedStayMin: 35,
        transitToNext: "Take Kalighat Metro to Rabindra Sarobar, then 5 min auto to New Alipore",
      },
      {
        pandalId: "suruchi-sangha",
        sequence: 6,
        recommendedStayMin: 45,
        transitToNext: "Grand culmination at New Alipore",
      },
    ],
    highlightNotes: [
      "Experience Somnath Temple replica with German crystal chandelier at Ekdalia",
      "Watch the stunning kinetic wave lighting at Tridhara Sammilani",
      "Savor Vivekananda Park Dahi Phuchka and Campari Fish Roll on the go",
    ],
  },
  {
    id: "central-kolkata-night-route",
    title: "Central Kolkata Night Circuit",
    bengaliTitle: "মধ্য কলকাতার নিশাচর রুট",
    tagline: "Water reflections, boi-para nostalgia, laser shows and grand palaces.",
    bengaliTagline: "জলের ওপর মন্দিরের প্রতিচ্ছবি, বইপাড়ার গন্ধ, লেজার শো এবং রাজপ্রাসাদ।",
    description: "Centering around historic College Street, Bowbazar, and Chittaranjan Avenue. Perfect for walking under the dazzling Chandannagar illumination late into the festive night.",
    bengaliDescription: "কলেজ স্কয়ারের লেকের উপর আলোর জাদু, সন্তোষ মিত্র স্কোয়ারের থ্রিডি প্রজেকশন আর মহম্মদ আলী পার্কের ভেনিসীয় স্থাপত্য।",
    estimatedDuration: "3 – 4 Hours",
    estimatedDistance: "2.8 km",
    walkingDistance: "2.5 km",
    recommendedTransport: "Metro (MG Road / Central) + Entirely Walkable",
    recommendedTime: "Post-midnight (11:30 PM – 3:30 AM) for magical reflection views",
    difficulty: "Easy",
    pandalIds: [
      "college-square",
      "muhammad-ali-park",
      "santosh-mitra-square",
      "chorebagan-sarbojanin"
    ],
    stops: [
      {
        pandalId: "college-square",
        sequence: 1,
        recommendedStayMin: 40,
        transitToNext: "4 min walk west down College Street to Central Avenue",
      },
      {
        pandalId: "muhammad-ali-park",
        sequence: 2,
        recommendedStayMin: 35,
        transitToNext: "8 min walk south towards Bowbazar Lebutala Park",
      },
      {
        pandalId: "santosh-mitra-square",
        sequence: 3,
        recommendedStayMin: 45,
        transitToNext: "10 min walk north or 1 stop Metro from Central to Girish Park",
      },
      {
        pandalId: "chorebagan-sarbojanin",
        sequence: 4,
        recommendedStayMin: 30,
        transitToNext: "Midnight tea and kachori at Girish Park crossing",
      },
    ],
    highlightNotes: [
      "The world-famous golden reflection of the College Square temple on the water",
      "Mesmerizing 3D projection mapping at Santosh Mitra Square",
      "Midnight adda at Indian Coffee House or Paramount Sherbets",
    ],
  },
  {
    id: "salt-lake-new-town",
    title: "Salt Lake & New Town Modern Trail",
    bengaliTitle: "সল্টলেক ও নিউটাউন আধুনিক পথ",
    tagline: "Spacious avenues, mega monumental structures and easy Green Line access.",
    bengaliTagline: "খোলামেলা চওড়া রাস্তা, সুবিশাল প্যাভিলিয়ন ও গ্রিন লাইন মেট্রো।",
    description: "Designed for visitors who prefer open avenues, less claustrophobic crowds, modern suburban ease, and massive thematic pavilions connected by the East-West Green Line Metro.",
    bengaliDescription: "সল্টলেকের চওড়া সবুজ রাস্তা ধরে এফ ডি ও বি জে ব্লকের সুবিশাল মণ্ডপ পরিক্রমা। শিশু ও প্রবীণদের জন্য আদর্শ।",
    estimatedDuration: "3.5 – 4.5 Hours",
    estimatedDistance: "6.0 km",
    walkingDistance: "2.2 km",
    recommendedTransport: "Green Line Metro (Karunamoyee / Central Park) + E-Rickshaw",
    recommendedTime: "Early evening 5:00 PM – 9:00 PM",
    difficulty: "Easy",
    pandalIds: [
      "fd-block-salt-lake",
      "bj-block-salt-lake",
      "sreebhumi-sporting-club"
    ],
    stops: [
      {
        pandalId: "fd-block-salt-lake",
        sequence: 1,
        recommendedStayMin: 45,
        transitToNext: "10 min walk across Karunamoyee junction to BJ Block ground",
      },
      {
        pandalId: "bj-block-salt-lake",
        sequence: 2,
        recommendedStayMin: 40,
        transitToNext: "12 min cab/e-rickshaw via Ultadanga to Lake Town Clock Tower",
      },
      {
        pandalId: "sreebhumi-sporting-club",
        sequence: 3,
        recommendedStayMin: 55,
        transitToNext: "Savor royal Rajasthani architecture and dinner at VIP Road eateries",
      },
    ],
    highlightNotes: [
      "The gargantuan Swarna Mandir architecture at FD Block",
      "Purulia Dokra and Bankura folk heritage at BJ Block",
      "The jaw-dropping Hawa Mahal recreation at Sreebhumi VIP Road",
    ],
  },
  {
    id: "first-timers-kolkata-pujo",
    title: "First-Timer's Kolkata Pujo",
    bengaliTitle: "প্রথমবার পুজো ভ্রমণকারীদের রুট",
    tagline: "The essential 4-pandal journey capturing the full spectrum of Durga Puja.",
    bengaliTagline: "প্রথমবার আসা দর্শনার্থীদের জন্য কলকাতার শ্রেষ্ঠ ৪টি মণ্ডপ।",
    description: "If you have only one evening to experience the magic of Kolkata Durga Puja, this perfectly paced route covers the traditional Daker Saaj idol, royal Bonedi heritage, river breeze, and architectural wonder.",
    bengaliDescription: "একই যাত্রায় সাবেকি ডাকের সাজ, রাজবাড়ির ঐতিহ্য, নদীর হাওয়া আর চোখ ধাঁধানো থিম—সেরা ভারসাম্যযুক্ত রুট।",
    estimatedDuration: "4 Hours",
    estimatedDistance: "3.5 km",
    walkingDistance: "2.5 km",
    recommendedTransport: "Blue Line Metro + Short Walks",
    recommendedTime: "4:00 PM – 9:00 PM",
    difficulty: "Easy",
    pandalIds: [
      "shobhabazar-rajbari",
      "bagbazar-sarbojanin",
      "college-square",
      "ekdalia-evergreen"
    ],
    stops: [
      {
        pandalId: "shobhabazar-rajbari",
        sequence: 1,
        recommendedStayMin: 35,
        transitToNext: "Walk 10 mins down Bagbazar Street to the riverfront",
      },
      {
        pandalId: "bagbazar-sarbojanin",
        sequence: 2,
        recommendedStayMin: 40,
        transitToNext: "Metro from Shyambazar to MG Road (3 stations, 7 mins)",
      },
      {
        pandalId: "college-square",
        sequence: 3,
        recommendedStayMin: 40,
        transitToNext: "Direct Blue Line Metro from MG Road to Kalighat (8 stations, 16 mins)",
      },
      {
        pandalId: "ekdalia-evergreen",
        sequence: 4,
        recommendedStayMin: 45,
        transitToNext: "Complete with Gariahat kathi roll and Kolkata street vibes",
      },
    ],
    highlightNotes: [
      "100% stress-free transit via direct Blue Line Metro connections",
      "Witness both 236-year-old aristocratic Bonedi ritual and world-famous public mela",
      "Tasting legendary street food at every single stop",
    ],
  },
];

