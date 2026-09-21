export interface MetroStationInfo {
  id: string;
  name: string;
  bengaliName: string;
  line: "Blue Line (North-South)" | "Green Line (East-West)" | "Purple Line";
  lineColor: string;
  interchange?: string;
  nearbyPandals: Array<{
    pandalId: string;
    pandalName: string;
    bengaliName: string;
    distanceMeters: number;
    walkMinutes: number;
    exitGate: string;
    theme: string;
  }>;
  insiderTip: string;
  pujoNightFrequency: string;
}

export const METRO_STATIONS_DATA: MetroStationInfo[] = [
  {
    id: "shyambazar",
    name: "Shyambazar",
    bengaliName: "শ্যামবাজার",
    line: "Blue Line (North-South)",
    lineColor: "#2563eb",
    nearbyPandals: [
      {
        pandalId: "bagbazar-sarbojanin",
        pandalName: "Bagbazar Sarbojanin",
        bengaliName: "বাগবাজার সার্বজনীন",
        distanceMeters: 700,
        walkMinutes: 8,
        exitGate: "Gate 1 (Bagbazar Street)",
        theme: "Chirantoni Sabeki Pratima",
      },
      {
        pandalId: "jagat-mukherjee-park",
        pandalName: "Jagat Mukherjee Park",
        bengaliName: "জগৎ মুখার্জী পার্ক",
        distanceMeters: 450,
        walkMinutes: 5,
        exitGate: "Gate 3 (J.M. Avenue)",
        theme: "Pandulipi",
      },
    ],
    insiderTip: "Gate 1 exits directly onto Bagbazar Street. The walk towards the river passes historic sweet shops like Chittaranjan.",
    pujoNightFrequency: "Trains every 6-8 minutes until 4:00 AM on Saptami, Ashtami, and Navami.",
  },
  {
    id: "sovabazar-sutanuti",
    name: "Sovabazar Sutanuti",
    bengaliName: "শোভাবাজার সুতানুটি",
    line: "Blue Line (North-South)",
    lineColor: "#2563eb",
    nearbyPandals: [
      {
        pandalId: "shobhabazar-rajbari",
        pandalName: "Sovabazar Rajbari",
        bengaliName: "শোভাবাজার রাজবাড়ি",
        distanceMeters: 250,
        walkMinutes: 3,
        exitGate: "Gate 2 (Raja Nabakrishna St)",
        theme: "236-Year Bonedi Bari",
      },
      {
        pandalId: "kumartuli-park",
        pandalName: "Kumartuli Park",
        bengaliName: "কুমারটুলি পার্ক",
        distanceMeters: 600,
        walkMinutes: 7,
        exitGate: "Gate 1 (Grey Street / Rabindra Sarani)",
        theme: "O Ganga Tumi Boichho Keno",
      },
      {
        pandalId: "ahiritola-sarbojanin",
        pandalName: "Ahiritola Sarbojanin",
        bengaliName: "আহিরীটোলা সার্বজনীন",
        distanceMeters: 750,
        walkMinutes: 9,
        exitGate: "Gate 1 (Rabindra Sarani)",
        theme: "Nodir Buke Ma",
      },
    ],
    insiderTip: "Heart of old North Kolkata heritage. Perfect starting point for walking the Bonedi Bari and Kumartuli artisan trails.",
    pujoNightFrequency: "All-night service. Very crowded on Ashtami afternoon for Sandhi Puja cannon ritual.",
  },
  {
    id: "girish-park",
    name: "Girish Park",
    bengaliName: "গিরিশ পার্ক",
    line: "Blue Line (North-South)",
    lineColor: "#2563eb",
    nearbyPandals: [
      {
        pandalId: "chorebagan-sarbojanin",
        pandalName: "Chorebagan Sarbojanin",
        bengaliName: "চোরবাগান সার্বজনীন",
        distanceMeters: 350,
        walkMinutes: 4,
        exitGate: "Gate 1 (Muktaram Babu Street)",
        theme: "Beyond Sound",
      },
    ],
    insiderTip: "Muktaram Babu Street exit leads directly into quiet artistic lanes. Jorasanko Thakurbari is 8 mins away.",
    pujoNightFrequency: "Frequent service throughout the night.",
  },
  {
    id: "mg-road",
    name: "Mahatma Gandhi Road",
    bengaliName: "মহাত্মা গান্ধী রোড (এম জি রোড)",
    line: "Blue Line (North-South)",
    lineColor: "#2563eb",
    nearbyPandals: [
      {
        pandalId: "muhammad-ali-park",
        pandalName: "Muhammad Ali Park",
        bengaliName: "মহম্মদ আলী পার্ক",
        distanceMeters: 250,
        walkMinutes: 3,
        exitGate: "Gate 1 (Central Avenue South)",
        theme: "Venetian Palace",
      },
      {
        pandalId: "college-square",
        pandalName: "College Square",
        bengaliName: "কলেজ স্কোয়ার",
        distanceMeters: 450,
        walkMinutes: 5,
        exitGate: "Gate 2 (College Street Boi Para)",
        theme: "Heritage Temple & Water Illumination",
      },
    ],
    insiderTip: "Central Kolkata's premier transit hub. Combine College Square with coffee at Indian Coffee House.",
    pujoNightFrequency: "High density service. Gates have designated one-way passenger flow during Puja.",
  },
  {
    id: "central",
    name: "Central",
    bengaliName: "সেন্ট্রাল",
    line: "Blue Line (North-South)",
    lineColor: "#2563eb",
    nearbyPandals: [
      {
        pandalId: "santosh-mitra-square",
        pandalName: "Santosh Mitra Square",
        bengaliName: "সন্তোষ মিত্র স্কোয়ার",
        distanceMeters: 650,
        walkMinutes: 8,
        exitGate: "Gate 2 (BB Ganguly St / Lebutala)",
        theme: "Sanatani Chetanay Vande Mataram",
      },
    ],
    insiderTip: "Shortest route to Bowbazar & Santosh Mitra Square. Avoid taking autos here; walking is faster due to road barricades.",
    pujoNightFrequency: "Night services with crowd regulation at concourse level.",
  },
  {
    id: "kalighat",
    name: "Kalighat",
    bengaliName: "কালীঘাট",
    line: "Blue Line (North-South)",
    lineColor: "#2563eb",
    nearbyPandals: [
      {
        pandalId: "deshapriya-park",
        pandalName: "Deshapriya Park",
        bengaliName: "দেশপ্রিয় পার্ক",
        distanceMeters: 400,
        walkMinutes: 5,
        exitGate: "Gate 1 (Rashbehari Avenue East)",
        theme: "Chitrakoot & Forest Hermitage",
      },
      {
        pandalId: "tridhara-sammilani",
        pandalName: "Tridhara Sammilani",
        bengaliName: "ত্রিধারা সম্মিলনী",
        distanceMeters: 450,
        walkMinutes: 6,
        exitGate: "Gate 1 (Manoherpukur Road)",
        theme: "Sroter Bibartan",
      },
      {
        pandalId: "hindusthan-park",
        pandalName: "Hindusthan Park",
        bengaliName: "হিন্দুস্তান পার্ক",
        distanceMeters: 900,
        walkMinutes: 11,
        exitGate: "Gate 1 (towards Gariahat)",
        theme: "Kheyal Khushi",
      },
      {
        pandalId: "ekdalia-evergreen",
        pandalName: "Ekdalia Evergreen",
        bengaliName: "একডালিয়া এভারগ্রীন",
        distanceMeters: 1300,
        walkMinutes: 16,
        exitGate: "Gate 2 (Gariahat corridor)",
        theme: "Somnath Temple",
      },
      {
        pandalId: "chetla-agrani",
        pandalName: "Chetla Agrani",
        bengaliName: "চেতলা অগ্রণী",
        distanceMeters: 1100,
        walkMinutes: 14,
        exitGate: "Gate 3 (Kalighat Temple / Chetla Bridge)",
        theme: "Gramin Shringar & Patachitra",
      },
    ],
    insiderTip: "The busiest Puja station in South Kolkata. Unlocks the entire Rashbehari, Gariahat, and Southern Avenue belt.",
    pujoNightFrequency: "Continuous trains running all night through Vijaya Dashami.",
  },
  {
    id: "rabindra-sarobar",
    name: "Rabindra Sarobar",
    bengaliName: "রবীন্দ্র সরোবর",
    line: "Blue Line (North-South)",
    lineColor: "#2563eb",
    nearbyPandals: [
      {
        pandalId: "suruchi-sangha",
        pandalName: "Suruchi Sangha",
        bengaliName: "সুরুচি সংঘ",
        distanceMeters: 1700,
        walkMinutes: 20,
        exitGate: "Gate 1 (New Alipore feeder auto stand)",
        theme: "Utsho",
      },
    ],
    insiderTip: "Take an auto directly from the station gate to New Alipore Petrol Pump for Suruchi Sangha.",
    pujoNightFrequency: "Frequent services with quick passenger interchange.",
  },
  {
    id: "gitanjali",
    name: "Gitanjali (Naktala)",
    bengaliName: "গীতাঞ্জলি (নাকতলা)",
    line: "Blue Line (North-South)",
    lineColor: "#2563eb",
    nearbyPandals: [
      {
        pandalId: "naktala-udayan-sangha",
        pandalName: "Naktala Udayan Sangha",
        bengaliName: "নাকতলা উদয়ন সংঘ",
        distanceMeters: 300,
        walkMinutes: 4,
        exitGate: "Gate 1 (NSC Bose Road)",
        theme: "Anahata Dhwani",
      },
    ],
    insiderTip: "Easiest mega-pandal access: exit the gate and the queue begins right on NSC Bose Road.",
    pujoNightFrequency: "Runs late nights with dedicated exit corridors.",
  },
  {
    id: "karunamoyee",
    name: "Karunamoyee",
    bengaliName: "করুণাময়ী",
    line: "Green Line (East-West)",
    lineColor: "#059669",
    nearbyPandals: [
      {
        pandalId: "fd-block-salt-lake",
        pandalName: "FD Block Salt Lake",
        bengaliName: "এফ ডি ব্লক",
        distanceMeters: 800,
        walkMinutes: 10,
        exitGate: "Gate 2 (towards FD Block Ground)",
        theme: "Swarna Mandir",
      },
      {
        pandalId: "bj-block-salt-lake",
        pandalName: "BJ Block Salt Lake",
        bengaliName: "বি জে ব্লক",
        distanceMeters: 650,
        walkMinutes: 8,
        exitGate: "Gate 1 (Sector II)",
        theme: "Sonar Bangla Dokra",
      },
    ],
    insiderTip: "Broad, breezy sidewalks. Very convenient for families with elderly members or baby strollers.",
    pujoNightFrequency: "Green Line runs special extended services between Howrah Maidan and Salt Lake Sector V.",
  },
  {
    id: "belgachia",
    name: "Belgachia",
    bengaliName: "বেলগাছিয়া",
    line: "Blue Line (North-South)",
    lineColor: "#2563eb",
    nearbyPandals: [
      {
        pandalId: "tala-prattoy",
        pandalName: "Tala Prattoy",
        bengaliName: "টালা প্রত্যয়",
        distanceMeters: 750,
        walkMinutes: 9,
        exitGate: "Gate 3 (Tala Park / Milk Colony)",
        theme: "Biyojon",
      },
    ],
    insiderTip: "Direct access to Tala Park. Beautiful illuminated pedestrian pathways organized by civic police.",
    pujoNightFrequency: "Full night trains connecting to Shyambazar and Dum Dum.",
  },
];

