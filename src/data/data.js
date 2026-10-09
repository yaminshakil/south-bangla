/* South Bangla Group — all content lives here so it is easy to edit.
   Every fact below comes from the company profile PDFs supplied by the group. */

const IMG = (n) => `${import.meta.env.BASE_URL}assets/img/${n}.jpg`;
export { IMG };

/* Group-level contact. The phone number appears on the ARJS, South Bangla Agro,
   Lake View and Premio profiles; the address is the shared AH Tower office. */
export const GROUP_CONTACT = {
  address: "AH Tower, Level 6 & 7, Plot 56, Sector 3, Uttara, Dhaka-1230, Bangladesh",
  phone: "+88 01638-048971",
  email: "letterboxmahmud@gmail.com"
};

export const SECTORS = [
  { id: "agro",    label: "Agriculture & Food",   blurb: "Farms, storage, feed, spices, grains and fisheries that feed the nation.", icon: "wheat" },
  { id: "apparel", label: "Apparel & Textile",    blurb: "Knit, woven and denim garments made for global brands.",                  icon: "thread" },
  { id: "jute",    label: "Jute",                 blurb: "The golden fibre — yarn, hessian and jute products.",                      icon: "jute" },
  { id: "estate",  label: "Real Estate & Construction", blurb: "Land development, buildings, sand and stone supply.",               icon: "building" },
  { id: "resort",  label: "Resort & Leisure",     blurb: "A green getaway built inside a working farm.",                             icon: "palm" },
  { id: "trade",   label: "Trade",                blurb: "Connecting markets and creating opportunities worldwide.",                 icon: "globe" }
];

export const COMPANIES = [
  {
    id: "arjs",
    name: "ARJS Agro BD Ltd.",
    short: "ARJS Agro",
    sector: "agro",
    tag: "Agro farm · Contractor · Importer · Exporter · Supplier",
    summary: "A multi-purpose business company covering dairy, poultry, fisheries, dredging, heavy concrete work and real estate.",
    cover: IMG("arjs-dairy"),
    position: "center",
    about: [
      "ARJS Agro BD Ltd. is a growing, multi-purpose company that works as an agro farm, a first-class contractor, an importer, an exporter and a supplier.",
      "Its portfolio shows the range: modern dairy cattle sheds, large poultry farms, fish harvesting, river dredging, concrete block works and apartment buildings.",
      "The company has prepared detailed feasibility plans for new projects, including an integrated commercial layer farm with its own feed mill and organic-fertiliser plant, plus a dairy production and processing line."
    ],
    facts: [
      ["What it does", "Agro farming, contracting, import, export, supply"],
      ["Offices", "Dhaka and Chattogram"],
      ["Projects in planning", "Layer farm + feed mill, organic fertiliser, dairy processing"]
    ],
    highlights: ["Dairy farming", "Poultry", "Fish farming", "Dredging", "Concrete works", "Real estate"],
    gallery: ["arjs-dairy", "arjs-building", "arjs-poultry", "arjs-fish", "arjs-dredger", "arjs-block"].map(IMG),
    leaders: [
      { name: "SK. Benozir Ahmed Siddique", role: "Chairman", photo: IMG("p-arjs-chair") },
      { name: "Md Akhter Hossain", role: "Managing Director", photo: IMG("p-arjs-md") },
      { name: "Sayd Md Iddris Alam", role: "Deputy Managing Director", photo: IMG("p-arjs-dmd") }
    ],
    contacts: [
      ["Dhaka office", "Khan Sons Center (7th Floor), 37 Kawran Bazar, Dhaka-1215"],
      ["Chattogram office", "117 Laila Complex (4th Floor), Nandan Kanon, Jobili Road, Kotowali, Chattogram"],
      ["Phone", "+88 01638-048971, +88 01777-393779"],
      ["Email", "argagrobdltd@gmail.com"]
    ]
  },
  {
    id: "sbagro",
    name: "South Bangla Agro Food & Beverage Ltd.",
    short: "South Bangla Agro Food",
    sector: "agro",
    tag: "Feed & Mustard Oil Mills · Importer · Exporter · Supplier",
    summary: "Feed and mustard-oil mills, with large silos and warehouses for grains, pulses, onion and spices. “Purity, Quality & Trust in Every Product.”",
    cover: IMG("sb-silo"),
    position: "center",
    about: [
      "South Bangla Agro Food & Beverage Ltd. runs feed and mustard-oil mills and works as a first-class contractor, importer, exporter and supplier of food products.",
      "Its profile shows the full chain: steel grain silos, big dry warehouses, ventilated onion storage with drying fans, and careful handling of chilli, turmeric, coriander, pulses, oilseeds and spices.",
      "The factory is at Satenga, Bhaluka, Mymensingh, with a head office in Mirpur DOHS, Dhaka."
    ],
    facts: [
      ["What it does", "Feed mill, mustard-oil mill, food storage and supply"],
      ["Factory", "Satenga, Bhaluka, Mymensingh"],
      ["Promise", "Purity, Quality & Trust in Every Product"]
    ],
    highlights: ["Grain silos", "Onion storage", "Spices", "Pulses", "Oilseeds", "Feed mill"],
    gallery: ["sb-silo", "sb-silo2", "sb-onion1", "sb-onion2", "sb-warehouse", "sb-chili", "sb-turmeric", "sb-coriander", "sb-cardamom", "sb-clove", "sb-lentil", "sb-peanut", "sb-pepper", "sb-cinnamon", "sb-cumin"].map(IMG),
    leaders: [
      { name: "Md. Nur Alam", role: "Chairman", photo: IMG("p-sb-nur") },
      { name: "Miunudden Molla", role: "Managing Director", photo: IMG("p-sb-miunudden") },
      { name: "Mahmudul Hasan", role: "Director", photo: IMG("p-sb-mahmudul") },
      { name: "Syad Md Iddris", role: "Director", photo: IMG("p-sb-syad") },
      { name: "Shyad Hasan Ali", role: "Director", photo: IMG("p-sb-shyad") }
    ],
    contacts: [
      ["Head office", "House #1356 (Level 6), Avenue #11, Mirpur DOHS, Dhaka"],
      ["Gulshan office", "House #36, Road #25, Level #3, Gulshan-1, Dhaka-1212"],
      ["Uttara office", "AH Tower, Level #6 & 7, Plot #56, Section #3, Uttara, Dhaka-1230"],
      ["Factory", "Satenga, Bhaluka, Mymensingh"],
      ["Phone", "+88 01631-557474, +88 01566-053660, +88 01638-048971"],
      ["Email", "dalykasmir@gmail.com"]
    ]
  },
  {
    id: "lakeview",
    name: "Lake View Garden City Agro Resort Ltd.",
    short: "Lake View Garden City",
    sector: "resort",
    also: ["agro"],
    tag: "Integrated farm · Fish feed · Resort",
    summary: "An integrated farm and a peaceful nature resort in one place — pineapples, poultry, cattle, fish, and a pool among the trees.",
    cover: IMG("lake-cover"),
    position: "center 35%",
    about: [
      "Lake View Garden City joins modern agriculture with hospitality. Waste from one part of the farm becomes food or fertiliser for another, which saves money and protects the environment.",
      "Guests can enjoy fresh air, green views and quiet surroundings, stay in wooden cottages, swim in the pool and eat fresh, local farm food.",
      "The farm itself is large and varied: broiler, layer and native poultry, dairy cattle and goats, fish ponds and cages, pineapple gardens, and orchards of guava, pomegranate and strawberry.",
      "“Our agro projects, fish feed production, and integrated farms work together to ensure high standards and eco-friendly practices.” — Chairman & Managing Director"
    ],
    facts: [
      ["Idea", "Nature + modern farming + hospitality"],
      ["Project site", "Golapganj, Sylhet"],
      ["Motto (Bangla)", "প্রকৃতির মাঝে আধুনিকতার ছোঁয়া"]
    ],
    highlights: ["Resort & pool", "Pineapple garden", "Poultry", "Dairy & goats", "Fish ponds", "Orchards"],
    gallery: ["lake-cover", "lake-resort1", "lake-pool", "lake-pool2", "lake-resort2", "lake-pine1", "lake-pine3", "lake-poultry1", "lake-poultry2", "lake-layer", "lake-cattle2", "lake-goat", "lake-pond", "lake-fishcage", "lake-guava", "lake-straw"].map(IMG),
    leaders: [
      { name: "Shafiqul Islam", role: "Chairman", photo: IMG("p-lake-shafiqul") },
      { name: "Md. Sharif Uddin", role: "Managing Director", photo: IMG("p-lake-sharif") }
    ],
    contacts: [
      ["Office", "AH Tower, Level 7, Plot 56, Sector 3, Road 2, Uttara Model Town, Uttara, Dhaka-1230"],
      ["Phone", "+88 01716060616, 01638-048971"],
      ["Email", "letterboxmahmud@gmail.com"]
    ]
  },
  {
    id: "premio",
    name: "Premio Real Estate Ltd.",
    short: "Premio Real Estate",
    sector: "estate",
    tag: "Real estate · Construction · Sand & stone supply",
    summary: "Land development, building construction and supply of sand and stone from the company’s own sources.",
    cover: IMG("prem-b7"),
    position: "center",
    about: [
      "Premio Real Estate Ltd. develops land and builds apartment and commercial buildings, from the first foundation to the top floor.",
      "The company also supplies sand and stone from its own river and quarry sources, so the materials that go into a building are traceable from start to finish.",
      "Its profile includes land plots marked ‘ready for sale’, many projects under construction, and supply work orders from established construction firms."
    ],
    facts: [
      ["What it does", "Land, buildings, sand & stone"],
      ["Materials", "Own sand and stone sources"],
      ["Offices", "Gulshan-1 and Uttara, Dhaka"]
    ],
    highlights: ["Land development", "Building construction", "Sand supply", "Stone supply"],
    gallery: ["prem-b7", "prem-b3", "prem-b5", "prem-b6", "prem-b2", "prem-b1", "prem-b10", "prem-b8", "prem-b9", "prem-land1", "prem-land2", "prem-sand", "prem-barge", "prem-stone", "prem-stone2", "prem-dig"].map(IMG),
    leaders: [
      { name: "Afsana Rahman", role: "Chairman", photo: IMG("p-prem-afsana") },
      { name: "Mahmudul Hasan", role: "Managing Director", photo: IMG("p-prem-mahmudul") },
      { name: "Md. Nur Alam", role: "Director", photo: IMG("p-sb-nur") },
      { name: "Miunudden Molla", role: "Director", photo: IMG("p-sb-miunudden") },
      { name: "Syad Md Iddris", role: "Director", photo: IMG("p-sb-syad") },
      { name: "Shyad Hasan Ali", role: "Director", photo: IMG("p-sb-shyad") }
    ],
    contacts: [
      ["Gulshan office", "House #38, Road #25, Level #3, Gulshan-1, Dhaka-1212"],
      ["Uttara office", "AH Tower, Level #6, Plot #56, Sector #3, Uttara Model Town, Dhaka-1230"],
      ["Phone", "+88 01716060616, 01638-048971"],
      ["Email", "letterboxmahmud@gmail.com"]
    ]
  },
  {
    id: "sonali",
    name: "Sonali Jute Mills Ltd.",
    short: "Sonali Jute Mills",
    sector: "jute",
    tag: "Jute mill and all types of jute products",
    summary: "A jute mill started in 2018 that spins, weaves and finishes the golden fibre into yarn, hessian and more.",
    cover: IMG("son-hall"),
    position: "center",
    about: [
      "Sonali Jute Mills Ltd. (SJML) began its journey in 2018 and has grown into a full jute mill producing all types of jute products.",
      "The mill is organised in three production units, with its own lamination plant, finishing department, quality-control section, workshop and electrical department — all on one site.",
      "Its stated values are simple: quality locally sourced, delivery on time, and “make promises, keep promises.”"
    ],
    facts: [
      ["Founded", "2018"],
      ["Site", "Satenga, Bhaluka, Mymensingh"],
      ["Structure", "3 production units + lamination, finishing, QC"]
    ],
    highlights: ["Jute yarn", "Hessian rolls", "Lamination", "Quality control", "On-time delivery"],
    gallery: ["son-hall", "son-cover", "son-loom", "son-weave", "son-spin", "son-bundle", "son-yarn", "son-spool", "son-rolls", "son-blue", "son-fibre", "son-fibre2"].map(IMG),
    leaders: [
      { name: "Md. Nur Alam", role: "Chairman", photo: IMG("p-sb-nur") },
      { name: "Miunudden Molla", role: "Managing Director", photo: IMG("p-sb-miunudden") },
      { name: "Mahmudul Hasan", role: "Director", photo: IMG("p-sb-mahmudul") },
      { name: "Syad Md Iddris", role: "Director", photo: IMG("p-sb-syad") },
      { name: "Shyad Hasan Ali", role: "Director", photo: IMG("p-sb-shyad") }
    ],
    contacts: [
      ["Gulshan office", "House #36, Road #25, Level #3, Gulshan-1, Dhaka-1212"],
      ["Uttara office", "AH Tower, Level #6, Plot #56, Section #3, Uttara, Dhaka-1230"],
      ["Mill", "Satenga, Bhaluka, Mymensingh"],
      ["Phone", "+88 01629-850182, +88 01566-053660"],
      ["Email", "dalykasmir@gmail.com"]
    ]
  },
  {
    id: "khantex",
    name: "Khantex Fashions Ltd.",
    short: "Khantex Fashions",
    sector: "apparel",
    tag: "Flagship company of KFL Group · Knit & woven garments",
    summary: "A USGBC LEED-certified green garment factory in Gazipur, exporting knit and woven wear to leading European brands.",
    cover: IMG("kfl-sew"),
    position: "center",
    about: [
      "Khantex Fashions Ltd. is the flagship company of KFL Group — a world-class manufacturer and exporter of knit and woven garments, set up in 2018 at Sreepur, Gazipur, about 40 km from Dhaka.",
      "It is a USGBC LEED-certified green factory, surrounded by greenery, with solar power, rain-water harvesting and daylight-friendly design.",
      "Everything happens under one roof: knitting, printing, merchandising, auto-CAD and cutting, sewing, finishing, buyer quality checks and shipment. Exports are worth about US$ 30 million a year.",
      "The factory also looks after its people, with a dedicated HR & compliance team, a medical room, training and fire-safety drills."
    ],
    facts: [
      ["Founded", "2018"],
      ["Factory", "Barotopa, Mawna, Sreepur, Gazipur-1740"],
      ["Exports", "≈ US$ 30 million a year"],
      ["Sewing", "24 sewing lines"]
    ],
    highlights: ["LEED green factory", "Knit", "Woven & denim", "Printing", "Export"],
    gallery: ["kfl-hero", "kfl-factory", "kfl-green", "kfl-knit", "kfl-print", "kfl-sew", "kfl-merch", "kfl-ship", "kfl-woven", "kfl-knitwear", "kfl-stay"].map(IMG),
    extra: {
      title: "Trusted by global buyers",
      buyers: ["Next", "Primark", "Guess", "LPP", "KiK", "OVS", "Pepco", "Pep&Co", "Matalan", "Siplec"],
      certs: ["LEED (USGBC)", "WRAP", "amfori BSCI", "Accord", "OEKO-TEX Standard 100", "Sedex", "Organic 100 Content Standard"],
      siblingsTitle: "Sister concerns of KFL Group",
      siblings: ["BHB Packaging & Accessories Ltd.", "Khantex Sourcing Hub", "Khan Company", "Khan Fabrics", "M/S Khan Enterprise", "Khantex Outerwear Ltd.", "Fashion Garments Center", "Green by Khantex"]
    },
    leaders: [
      { name: "Humayun Kabir", role: "Leads Khantex Fashions", photo: null }
    ],
    contacts: [
      ["Head office", "Khan Tower, 7th Floor, House #27, Road #12, Block #H, Banani, Dhaka-1213"],
      ["Factory", "Barotopa, Mawna, Sreepur, Gazipur-1740"]
    ]
  },
  {
    id: "delta",
    name: "The Delta Group of Industries",
    short: "Delta Group of Industries",
    sector: "apparel",
    tag: "Vertically integrated knitwear & denim · 14 units",
    summary: "A large industrial park in Kashimpur, Gazipur — from yarn to finished garments — made up of 14 associated units.",
    cover: IMG("delta-bld"),
    position: "center",
    about: [
      "The Delta Group, founded in 2000, is one of Bangladesh’s leading industrial parks for knitted and denim garments. It sits at Kashimpur, Gazipur, about 25 km from Dhaka and close to the international airport.",
      "It is vertically integrated: spinning, yarn dyeing, knitting, dyeing & washing, printing & packing, accessories, cartons and garment making all sit on one campus of 105 bigha.",
      "Each unit runs imported, branded machinery from the USA, UK, Germany, Japan, Switzerland, Italy and Spain. The group generates its own power and has two biological effluent-treatment plants for a pollution-free environment.",
      "“Reliability, quality in the service, corporate culture of team work… customer satisfaction are our prime concerns.” — Engr. A.K.M. Faruque Ahamed, Chairman & Managing Director"
    ],
    facts: [
      ["Founded", "2000"],
      ["Campus", "105 bigha · 18.25 lakh sq ft built"],
      ["People", "≈ 9,000 (planned: 20,000)"],
      ["Turnover", "BDT 1,200+ crore a year"],
      ["Own power", "22.5 MW gas generation"],
      ["Treatment", "2 biological ETPs"]
    ],
    highlights: ["Spinning", "Knitting", "Denim", "Dyeing & washing", "Printing & packing", "Accessories"],
    gallery: ["delta-bld", "delta-office", "delta-showroom", "delta-model", "delta-knit", "delta-sew", "delta-spin", "delta-wash"].map(IMG),
    extra: {
      siblingsTitle: "The 14 units of The Delta Group",
      siblings: [
        "The Delta Composite Knitting Ind. Ltd.", "The Delta Apparels Ltd.", "The Delta Spinning Mills Ltd.",
        "The Delta Blended Yarn Mills Ltd.", "The Delta Quality Fashions Ltd.", "The Delta Quality Denims Ltd.",
        "The Delta Quality Garments Ltd.", "The Delta Quality Washing & Dyeing Industries Ltd.", "The Delta Accessories Ltd.",
        "The Delta Carton Industries Ltd.", "The Delta Quality Printing & Packing Industries Ltd.", "The Delta Yarn Dyeing Industries Ltd.",
        "Lily Cosmetics Ltd.", "The Delta Group of Industries Ltd. (C&F)"
      ]
    },
    leaders: [
      { name: "Engr. (BUET) A.K.M. Faruque Ahamed", role: "Chairman & Managing Director", photo: null }
    ],
    contacts: [
      ["Factories", "Zarun (South), Kashimpur & BSCIC Industrial Estate, Konabari, Gazipur"],
      ["Corporate office", "House #389, Road #6, DOHS Baridhara, Dhaka-1206"]
    ]
  },
  {
    id: "accessworld",
    name: "Access World Trading",
    short: "Access World Trading",
    sector: "trade",
    tag: "Connecting Markets, Creating Opportunities",
    summary: "The group’s trading arm, built on four ideas: global connections, trusted partnerships, smart solutions and lasting value.",
    cover: null,
    logo: IMG("logo-aw"),
    about: [
      "Access World Trading is the trading company of South Bangla Group. Its promise is to connect markets and create opportunities.",
      "It stands on four values: Global Connections, Trusted Partnerships, Smart Solutions and Lasting Value.",
      "A fuller company profile is on its way — this page will be updated when it is ready."
    ],
    facts: [
      ["What it does", "Trading"],
      ["Motto", "Connecting Markets, Creating Opportunities"]
    ],
    highlights: ["Global connections", "Trusted partnerships", "Smart solutions", "Lasting value"],
    gallery: [],
    leaders: [
      { name: "Ziaul Haider", role: "Managing Director", photo: IMG("p-access-jiyaul") }
    ],
    contacts: [["Group desk", "Please use the group contact details"]]
  }
];

/* People who sit on more than one company board — shown once in the Leadership section. */
export const PEOPLE = [
  { name: "Mahmudul Hasan",      photo: IMG("p-sb-mahmudul"),   roles: [["Premio Real Estate", "Managing Director"], ["South Bangla Agro Food", "Director"], ["Sonali Jute Mills", "Director"]] },
  { name: "Afsana Rahman",       photo: IMG("p-prem-afsana"),   roles: [["Premio Real Estate", "Chairman"]] },
  { name: "Syad Md Iddris",      photo: IMG("p-sb-syad"),       roles: [["ARJS Agro BD", "Deputy Managing Director"], ["South Bangla Agro Food", "Director"], ["Sonali Jute Mills", "Director"], ["Premio Real Estate", "Director"]] },
  { name: "Md. Nur Alam",        photo: IMG("p-sb-nur"),     roles: [["South Bangla Agro Food", "Chairman"], ["Sonali Jute Mills", "Chairman"], ["Premio Real Estate", "Director"]] },
  { name: "Miunudden Molla",     photo: IMG("p-sb-miunudden"),  roles: [["South Bangla Agro Food", "Managing Director"], ["Sonali Jute Mills", "Managing Director"], ["Premio Real Estate", "Director"]] },
  { name: "Shafiqul Islam",      photo: IMG("p-lake-shafiqul"), roles: [["Lake View Garden City", "Chairman"]] },
  { name: "Md. Sharif Uddin",    photo: IMG("p-lake-sharif"),   roles: [["Lake View Garden City", "Managing Director"]] },
  { name: "SK. Benozir Ahmed Siddique", photo: IMG("p-arjs-chair"), roles: [["ARJS Agro BD", "Chairman"]] },
  { name: "Md Akhter Hossain",   photo: IMG("p-arjs-md"),       roles: [["ARJS Agro BD", "Managing Director"]] },
  { name: "Shyad Hasan Ali",     photo: IMG("p-sb-shyad"),      roles: [["South Bangla Agro Food", "Director"], ["Sonali Jute Mills", "Director"], ["Premio Real Estate", "Director"]] },
  { name: "Ziaul Haider",        photo: IMG("p-access-jiyaul"), roles: [["Access World Trading", "Managing Director"]] }
];
