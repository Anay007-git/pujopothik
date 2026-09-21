export interface CultureStory {
  id: string;
  title: string;
  bengaliTitle: string;
  category: string;
  bengaliCategory: string;
  summary: string;
  bengaliSummary: string;
  body: string;
  bengaliBody: string;
  quote: string;
  bengaliQuote: string;
  image: string;
  culturalTips: string[];
}

export const CULTURE_STORIES: CultureStory[] = [
  {
    id: "dhaak-and-rhythm",
    title: "The Call of the Dhaak",
    bengaliTitle: "ঢাকের আওয়াজ ও শারদীয় ছন্দ",
    category: "Sacred Rhythms",
    bengaliCategory: "শারদীয় বাদ্য",
    summary: "The booming, thunderous beat of the wild deer-skin drum that awakens autumn across Bengal.",
    bengaliSummary: "কাশফুলের দোলায় কাশীবাসী ঢাকির কাঠির টোকা—বাঙালির শ্রেষ্ঠ উৎসবের চিরন্তন সুর।",
    body: "No sound evokes Durga Puja more profoundly than the raw, hypnotic rhythm of the Dhaak. Carried across rivers from rural Murshidabad, Birbhum, and Bankura by generational families of dhakis, the instrument is played with fine cane sticks (*kathi*) and crowned with white feather plumes or colored tinsel. From the slow, solemn beat of Bodhon to the frenzied double-time tempo during Aarti and Sandhi Puja, the dhaak is the heartbeat of Kolkata.",
    bengaliBody: "মহালয়ার ভোর পেরোতেই বাংলার বাতাসে মিশে যায় ঢাকের শব্দ। লাল পাড় শাড়ি আর সাদা ধুতি-পাঞ্জাবির মাঝে কাঁসর-ঘণ্টার সংগত নিয়ে যখন কাঠি পড়ে, তখন কলকাতা ভুলে যায় সব ক্লান্তি। সন্ধিপূজার ১০৮ প্রদীপের সামনে যখন দ্রুতলয়ে ঢাক বাজে, মনে হয় স্বয়ং মা দুর্গা রণবেশে উপস্থিত হয়েছেন।",
    quote: "“Dhaaker taley komor dole, Pujo elo boley…”",
    bengaliQuote: "“ঢাকের তালে কোমর দোলে, পুজো এলো বলে…”",
    image: "/images/dhunuchi-dance.jpg",
    culturalTips: [
      "Visit Maddox Square or Bagbazar Sarbojanin on Maha Ashtami evening to see dhaki jugalbandi duels.",
      "Stand respectfully around the Dhaki ring; it is customary to show appreciation with folded hands or small tips.",
    ],
  },
  {
    id: "dhunuchi-naach",
    title: "Dhunuchi Naach — Dancing with Fire",
    bengaliTitle: "ধুনুচি নাচ — অঙ্গারের মহিমা",
    category: "Festive Ecstasy",
    bengaliCategory: "উৎসবের উন্মাদনা",
    summary: "The hypnotic, smoke-filled dance of devotion with burning coconut husks and pure dhuno resin.",
    bengaliSummary: "ধুনো-কর্পূরের সুবাস, কাঁসর-ঘণ্টার নিনাদ এবং অগ্নিকুণ্ড হাতে আত্মহারা নৃত্য।",
    body: "As the priest initiates the evening Aarti, the intoxicating fragrance of burning sal-tree resin (*dhuno*) fills the air. Devotees grip earthen chalices piled high with glowing coconut coir and incense in their palms, sometimes balancing two in hands and one between their teeth, twirling fearlessly to the frenetic beat of the dhaak. Originating as a martial war dance of shakti, Dhunuchi Naach is Kolkata's most electrifying ritual.",
    bengaliBody: "মাটির পাত্রে জ্বলন্ত নারকেলের ছোবড়া আর কর্পূরের তীব্র সুবাস—ধুনুচি নাচ কেবল এক নৈবেদ্য নয়, এ হলো অনন্ত ভক্তির স্পর্ধা। অষ্টমী ও নবমীর সন্ধ্যায় প্রতিটি মণ্ডপে এই নাচের মোহময় দৃশ্য দেখলে চোখ ফেরানো যায় না।",
    quote: "“In the swirl of fragrant white smoke, fear burns away into devotion.”",
    bengaliQuote: "“ধুনোর ধোঁয়ায় বিলীন হয় অহংকার, জেগে ওঠে সনাতনী ভক্তি।”",
    image: "/images/dhunuchi-dance.jpg",
    culturalTips: [
      "Witness the finest open-air Dhunuchi dance competitions at Maddox Square, Ekdalia, and Bagbazar on Navami evening.",
      "Stay a safe distance from flying sparks when dancers perform the teeth-balancing stunts.",
    ],
  },
  {
    id: "sindoor-khela",
    title: "Sindoor Khela & The Tears of Dashami",
    bengaliTitle: "সিঁদুর খেলা ও বিজয়ার বিদায়সুর",
    category: "Sacred Sisterhood",
    bengaliCategory: "বিজয়ার বিদায়",
    summary: "The scarlet farewell celebration where married women smear vermilion and wish each other eternal auspiciousness before the immersion.",
    bengaliSummary: "মায়ের বিদায়বেলায় সিঁদুরের লাল রঙে রাঙিয়ে দেওয়া হয় একে অপরকে—অশ্রু ও আশ্বাসের অনন্য উৎসব।",
    body: "On Vijaya Dashami, the joy of four days gives way to a bittersweet melancholy. Before Devi Durga departs for Mount Kailash, women gather before the idol in pristine white and red Garad sarees to feed her betel leaf (*paan*) and sweets. Then, amidst laughter and quiet tears, they smear glowing Sindoor on Devi's forehead and across each other's cheeks—celebrating womanhood, sisterhood, and the eternal bond of protection.",
    bengaliBody: "দশমীর সকালে মন খারাপের আবহাওয়া। মাকে বিদায় জানাতে মণ্ডপে মণ্ডপে ভিড় জমে লাল-পাড় সাদা শাড়ির। মাকে মিষ্টিমুখ করিয়ে মহিলারা মেতে ওঠেন সিঁদুর খেলায়। তারপর শুরু হয় 'শুভ বিজয়া'—ছোটদের প্রণাম আর মিষ্টিমুখ।",
    quote: "“Asche bochhor abar hobe! (Mother will return again next year!)”",
    bengaliQuote: "“আসছে বছর আবার হবে!”",
    image: "/images/sindoor-khela.jpg",
    culturalTips: [
      "Sovabazar Rajbari, Bagbazar Sarbojanin, and Maddox Square host some of Bengal's most photogenic Sindoor Khela ceremonies on Dashami morning (10:00 AM – 1:00 PM).",
      "Always seek gentle permission before photographing close portraits of participants.",
    ],
  },
  {
    id: "pushpanjali-sandhi-puja",
    title: "Pushpanjali & Sandhi Puja (108 Lotuses)",
    bengaliTitle: "পুষ্পাঞ্জলি ও সন্ধিপূজা (১০৮ পদ্ম ও প্রদীপ)",
    category: "Divine Awakening",
    bengaliCategory: "আধ্যাত্মিক বোধন",
    summary: "The pivotal 48-minute astronomical conjunction where Chamunda vanquishes Chanda and Munda.",
    bengaliSummary: "অষ্টমী ও নবমীর সন্ধিক্ষণে মা চামুণ্ডার আবির্ভাব—১০৮টি নীলপদ্ম ও ১০৮টি মাটির প্রদীপের মহাযজ্ঞ।",
    body: "The absolute spiritual zenith of Durga Puja occurs during Sandhi Puja: the exact 48-minute transition when Maha Ashtami yields to Maha Navami. The sanctum is illuminated solely by 108 earthen ghee lamps, and 108 fresh blue-tinged lotus flowers are offered by priests reciting the Devi Mahatmya in ringing Sanskrit. In ancestral Bonedi Baris like Sovabazar, a ceremonial cannon is still fired at this exact minute.",
    bengaliBody: "সারা শহরের চোখ তখন স্তব্ধ হয়ে তাকিয়ে থাকে মায়ের মুখের দিকে। ১০৮টি প্রদীপের শিখা কাঁপে মন্ত্রোচ্চারণের অনুরণনে। শাঁখের আওয়াজ আর ঘণ্টাধ্বনিতে জেগে ওঠে বিশ্বচরাচর। ভক্তদের কণ্ঠে ধ্বনিত হয়—'যা দেবী সর্বভূতেষু শক্তিরূপেণ সংস্থিতা'।",
    quote: "“Ya Devi Sarva-Bhuteshu Shakti-Rupena Samsthita…”",
    bengaliQuote: "“যা দেবী সর্বভূতেষু শক্তিরূপেণ সংস্থিতা, নমস্তস্যৈ নমস্তস্যৈ নমস্তস্যৈ নমো নমঃ।”",
    image: "/images/bagbazar-sabeki.jpg",
    culturalTips: [
      "To offer Ashtami Pushpanjali, reach your chosen neighbourhood pandal or temple by 8:30 AM in fresh traditional attire.",
      "Fasting until Pushpanjali completion is standard traditional practice.",
    ],
  },
  {
    id: "kumartuli-clay-artisans",
    title: "Kumartuli — Where the Divine takes Shape",
    bengaliTitle: "কুমারটুলি — মাটির শরীরে দেবীর রূপদান",
    category: "Living Heritage",
    bengaliCategory: "মৃৎশিল্পের মহাকাব্য",
    summary: "The labyrinthine alleys by the Hooghly where generational clay sculptors breathe life into straw and Ganga silt.",
    bengaliSummary: "গঙ্গার পলিমাটি, খড় আর বাঁশের কাঠামোয় তিনশো বছর ধরে জীবন্ত হয়ে ওঠেন দশভুজা।",
    body: "For more than three centuries, the narrow cobbled bylanes of Kumartuli have been the birthplace of Bengal's Durga idols. Using silt harvested from the Hooghly river (*Ganga maati*), blended with cow dung and husk, master potters shape straw armatures into lifelike muscular forms. The sacred rite of *Chokkhudaan*—painting the third eye of the Goddess in total solitude on the dawn of Mahalaya—marks the exact instant she transforms from clay into divinity.",
    bengaliBody: "কুমারটুলির প্রতিটি স্টুডিও একেকটি জীবন্ত পাঠশালা। বংশপরম্পরায় শিল্পীরা খড় বাঁধেন, মাটির প্রলেপ দেন, তারপর তুলির আলতো টানে এঁকে দেন মহামায়ার ত্রিনয়ন। এখানে না এলে কলকাতার দুর্গাপূজার জন্মবৃত্তান্ত অধরা থেকে যায়।",
    quote: "“We do not merely sculpt clay; we await the Goddess to dwell within it.”",
    bengaliQuote: "“আমরা কেবল মূর্তি গড়ি না, মায়ের প্রাণ প্রতিষ্ঠার প্রতীক্ষা করি।”",
    image: "/images/kumartuli-idol.jpg",
    culturalTips: [
      "Visit Kumartuli in the week leading up to Mahalaya to witness Chokkhudaan and final Daker Saaj ornament fitting.",
      "Always tread carefully on the studio floor planks and avoid touching unbaked wet clay.",
    ],
  },
  {
    id: "bonedi-bari-pujas",
    title: "Bonedi Bari — Aristocratic Courtyards",
    bengaliTitle: "বনেদি বাড়ির পুজো — জমিদারী আমলের স্মৃতি",
    category: "Historical Aristocracy",
    bengaliCategory: "রাজকীয় ইতিহাস",
    summary: "Centuries-old family celebrations inside ancestral mansions that predate modern public pandals.",
    bengaliSummary: "শোভাবাজার রাজবাড়ি, সাবর্ণ রায় চৌধুরী ও জোড়াসাঁকোর ঠাকুরদালানের ঐতিহ্যে আজও জীবন্ত বনেদি বাংলার ইতিহাস।",
    body: "Long before public Sarbojanin clubs appeared in the 20th century, Durga Puja was hosted exclusively inside aristocratic family estates (*Bonedi Baris*). Grand mansions like Sovabazar Rajbari (1757), Sabarna Roy Choudhury (1610), Pathuriaghata Ghosh Bari, and Jorasanko Daw Bari still uphold rituals unchanged for centuries. Idols are sculpted directly on the family *Thakur Dalan*, adorned with real gold filigree (*Daker Saaj*), and offered pure homemade sweet delicacies like Chandrapuli and Motichoor.",
    bengaliBody: "পাথরের থামওয়ালা ঠাকুরদালান, ঝাড়বাতির মৃদু আলো আর রুপোর সিংহাসনে একচালা প্রতিমা। এখানে কোনো মাইকের তারস্বরে চিৎকার নেই—আছে বংশপরম্পরার নিস্তব্ধ নিষ্ঠা আর পারিবারিক আন্তরিকতা।",
    quote: "“Step into a Bonedi Bari courtyard and you step two hundred years back into time.”",
    bengaliQuote: "“বনেদি বাড়ির আঙিনায় পা রাখা মানে দুই শতাব্দী আগের বাংলায় ফিরে যাওয়া।”",
    image: "/images/sovabazar-rajbari.jpg",
    culturalTips: [
      "Bonedi Bari Pujos are open to respectful visitors during daytime hours (9:00 AM – 2:00 PM and 5:00 PM – 8:30 PM).",
      "Maintain respectful silence inside the sacred Thakur Dalan courtyard.",
    ],
  },
];

