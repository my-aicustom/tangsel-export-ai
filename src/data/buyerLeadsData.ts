export type PipelineStage = 'SIMULATION' | 'CONSULTATION' | 'QUOTATION_REQUESTED' | 'POTENTIAL_SHIPMENT';

export interface PipelineStageInfo {
  id: PipelineStage;
  label: string;
  stepNumber: number;
  description: string;
  badgeColor: string;
}

export const PIPELINE_STAGES: PipelineStageInfo[] = [
  {
    id: 'SIMULATION',
    label: 'Simulation',
    stepNumber: 1,
    description: 'Simulasi Kargo & Biaya Logistik Indikatif',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40'
  },
  {
    id: 'CONSULTATION',
    label: 'Consultation',
    stepNumber: 2,
    description: 'Konsultasi Regulasi & Standar Internasional',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40'
  },
  {
    id: 'QUOTATION_REQUESTED',
    label: 'Quotation Requested',
    stepNumber: 3,
    description: 'Permintaan Kuotasi Resmi & Negosiasi Incoterms',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
  },
  {
    id: 'POTENTIAL_SHIPMENT',
    label: 'Potential Shipment',
    stepNumber: 4,
    description: 'Potensi Pengapalan Siap Kontrak TEI 2026',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
  }
];

export interface BuyerLeadItem {
  id: string;
  source: 'booth_visitor' | 'wa_bot' | 'inaexport_sync' | 'business_matching_cameroun';
  buyerName: string;
  company: string;
  country: string;
  flag: string;
  categoryInterest: string;
  specificInquiry: string;
  targetVolume: string;
  incoterm: 'FOB' | 'CIF' | 'EXW';
  score: number;
  status: 'HOT' | 'WARM' | 'COLD' | 'DEAL';
  pipelineStage: PipelineStage;
  estimatedValueUsd: number;
  picAssigned: 'Rama' | 'Febri' | 'Lukman' | 'Syaiful' | 'Fahmi';
  matchedIkm: string;
  matchedProduct: string;
  timestamp: string;
  contactWa: string;
  contactEmail: string;
  notes: string;
}

export const BUYER_LEADS: BuyerLeadItem[] = [
  {
    "id": "lead-01",
    "source": "business_matching_cameroun",
    "buyerName": "Paul Mbappe",
    "company": "Societe Camerounaise de Distribution (SCD)",
    "country": "Cameroon",
    "flag": "🇨🇲",
    "categoryInterest": "food_beverage",
    "specificInquiry": "2 Kontainer Gula Aren Organik 500g + Sampel Sambal Roa Kemasan Retort",
    "targetVolume": "2 x 20ft FCL (36 Ton)",
    "incoterm": "CIF",
    "score": 94,
    "status": "HOT",
    "pipelineStage": "POTENTIAL_SHIPMENT",
    "estimatedValueUsd": 142000,
    "picAssigned": "Rama",
    "matchedIkm": "PT Java Palm Sugar Nusantara",
    "matchedProduct": "Organic Arenga Palm Sugar",
    "timestamp": "28 Sep 2026, 14:20"
  },
  {
    "id": "lead-02",
    "source": "inaexport_sync",
    "buyerName": "Hans Schmidt",
    "company": "Bio-Reformhaus Hamburg GmbH",
    "country": "Germany",
    "flag": "🇩🇪",
    "categoryInterest": "food_beverage",
    "specificInquiry": "Organic Coconut Sugar Granule bulk pack 25kg bags (EU Organic Certified)",
    "targetVolume": "20 Metric Ton",
    "incoterm": "FOB",
    "score": 96,
    "status": "HOT",
    "pipelineStage": "QUOTATION_REQUESTED",
    "estimatedValueUsd": 76000,
    "picAssigned": "Febri",
    "matchedIkm": "PT Java Palm Sugar Nusantara",
    "matchedProduct": "Organic Arenga Palm Sugar",
    "timestamp": "27 Sep 2026, 11:45"
  },
  {
    "id": "lead-03",
    "source": "booth_visitor",
    "buyerName": "Kenji Sato",
    "company": "Sato Global Trading Co., Ltd.",
    "country": "Japan",
    "flag": "🇯🇵",
    "categoryInterest": "fashion_kerajinan",
    "specificInquiry": "Syal Sutra Batik Anggrek Vandoglas pewarna alami dengan kotak gift eksklusif",
    "targetVolume": "2.500 Pcs Handcrafted",
    "incoterm": "FOB",
    "score": 91,
    "status": "WARM",
    "pipelineStage": "CONSULTATION",
    "estimatedValueUsd": 71250,
    "picAssigned": "Lukman",
    "matchedIkm": "CV Anggrek Lestari Tangsel (Datik Batik)",
    "matchedProduct": "Hand-drawn Silk Batik Scarf",
    "timestamp": "27 Sep 2026, 16:10"
  },
  {
    "id": "lead-04",
    "source": "inaexport_sync",
    "buyerName": "Tariq Al-Maktoum",
    "company": "Al-Barakah Food & Spices Trading LLC",
    "country": "United Arab Emirates",
    "flag": "🇦🇪",
    "categoryInterest": "food_beverage",
    "specificInquiry": "Ekstrak Temulawak Curcumin 95% & Bubuk Jahe Merah Instan Halal",
    "targetVolume": "1 x 40ft Container (15.000 Box)",
    "incoterm": "CIF",
    "score": 95,
    "status": "HOT",
    "pipelineStage": "POTENTIAL_SHIPMENT",
    "estimatedValueUsd": 320000,
    "picAssigned": "Rama",
    "matchedIkm": "PT Herbal Alami Banten Sejahtera",
    "matchedProduct": "Standardized Curcumin Extract Powder",
    "timestamp": "26 Sep 2026, 10:15"
  },
  {
    "id": "lead-05",
    "source": "wa_bot",
    "buyerName": "David Miller",
    "company": "Pacific Eco Products Inc.",
    "country": "United States",
    "flag": "🇺🇸",
    "categoryInterest": "furniture_dekor",
    "specificInquiry": "Cutlery set bambu FSC certified 100% dan sedotan bambu petung",
    "targetVolume": "100.000 Set (2 x 40ft HQ)",
    "incoterm": "FOB",
    "score": 89,
    "status": "WARM",
    "pipelineStage": "SIMULATION",
    "estimatedValueUsd": 165000,
    "picAssigned": "Syaiful",
    "matchedIkm": "Bambu Lestari BSD",
    "matchedProduct": "Organic Bamboo Cutlery Set",
    "timestamp": "26 Sep 2026, 08:30"
  },
  {
    "id": "lead-06",
    "source": "inaexport_sync",
    "buyerName": "Marc Dubois",
    "company": "Cafes de Geneve SA",
    "country": "Switzerland",
    "flag": "🇨🇭",
    "categoryInterest": "food_beverage",
    "specificInquiry": "Specialty Robusta Green Beans Grade 1 Fine Banten (WoC Geneva Follow-up)",
    "targetVolume": "5 x 20ft FCL (90 Ton)",
    "incoterm": "FOB",
    "score": 97,
    "status": "DEAL",
    "pipelineStage": "POTENTIAL_SHIPMENT",
    "estimatedValueUsd": 369000,
    "picAssigned": "Febri",
    "matchedIkm": "Koperasi Kopi Robusta Ciputat Mandiri",
    "matchedProduct": "Specialty Robusta Green Beans Grade 1",
    "timestamp": "25 Sep 2026, 15:00"
  },
  {
    "id": "lead-07",
    "source": "booth_visitor",
    "buyerName": "Tan Wei Ming",
    "company": "SingaMech Industrial Supply Pte Ltd",
    "country": "Singapore",
    "flag": "🇸🇬",
    "categoryInterest": "manufaktur",
    "specificInquiry": "Precision brass valve fitting 1/2 inch and sanitary stainless steel clamp",
    "targetVolume": "50.000 Pcs Regular Bi-monthly",
    "incoterm": "FOB",
    "score": 93,
    "status": "HOT",
    "pipelineStage": "QUOTATION_REQUESTED",
    "estimatedValueUsd": 145000,
    "picAssigned": "Fahmi",
    "matchedIkm": "Presisi Teknik Logam Tangsel",
    "matchedProduct": "High Precision Brass Ball Valve Fitting",
    "timestamp": "25 Sep 2026, 13:20"
  },
  {
    "id": "lead-08",
    "source": "inaexport_sync",
    "buyerName": "Lucas Van Der Beek",
    "company": "Nordic Eco Living BV",
    "country": "Netherlands",
    "flag": "🇳🇱",
    "categoryInterest": "furniture_dekor",
    "specificInquiry": "Teak wood dining board SVLK compliant + Rattan pendant lamp shade",
    "targetVolume": "1 x 40ft HC (3.500 Pcs)",
    "incoterm": "FOB",
    "score": 90,
    "status": "WARM",
    "pipelineStage": "CONSULTATION",
    "estimatedValueUsd": 68500,
    "picAssigned": "Lukman",
    "matchedIkm": "CV Mahagoni Kencana Ciputat",
    "matchedProduct": "Solid Teak Wood Dining Board",
    "timestamp": "24 Sep 2026, 17:00"
  },
  {
    "id": "lead-09",
    "source": "wa_bot",
    "buyerName": "Zhang Wei",
    "company": "Shanghai Bio-Organic Ingredients Corp",
    "country": "China",
    "flag": "🇨🇳",
    "categoryInterest": "food_beverage",
    "specificInquiry": "Cold pressed virgin coconut oil bulk drum 200L (GACC Registered facility)",
    "targetVolume": "40 Drum (8.000 Liter)",
    "incoterm": "CIF",
    "score": 88,
    "status": "WARM",
    "pipelineStage": "SIMULATION",
    "estimatedValueUsd": 54000,
    "picAssigned": "Syaiful",
    "matchedIkm": "CV Banten Organik Virgin Coconut Oil",
    "matchedProduct": "Cold Pressed Virgin Coconut Oil",
    "timestamp": "24 Sep 2026, 09:40"
  },
  {
    "id": "lead-10",
    "source": "booth_visitor",
    "buyerName": "Liam O’Connor",
    "company": "Down Under Health Foods Pty Ltd",
    "country": "Australia",
    "flag": "🇦🇺",
    "categoryInterest": "food_beverage",
    "specificInquiry": "Organic Moringa Powder 200g + Freeze Dried Mango Slices",
    "targetVolume": "20.000 Pouch Mixed Air Freight",
    "incoterm": "CIF",
    "score": 92,
    "status": "HOT",
    "pipelineStage": "QUOTATION_REQUESTED",
    "estimatedValueUsd": 58000,
    "picAssigned": "Rama",
    "matchedIkm": "CV Serpong Nutrisi Hayati",
    "matchedProduct": "Organic Moringa Oleifera Leaf Powder",
    "timestamp": "23 Sep 2026, 14:15"
  },
  {
    "id": "lead-11",
    "source": "inaexport_sync",
    "buyerName": "Fatima Zahra",
    "company": "Riyadh Modest Haute Couture",
    "country": "Saudi Arabia",
    "flag": "🇸🇦",
    "categoryInterest": "fashion_kerajinan",
    "specificInquiry": "Bordir komputer tencel abaya mewah untuk pasar Idul Fitri & Ramadhan",
    "targetVolume": "5.000 Pcs Eksklusif",
    "incoterm": "CIF",
    "score": 94,
    "status": "HOT",
    "pipelineStage": "POTENTIAL_SHIPMENT",
    "estimatedValueUsd": 125000,
    "picAssigned": "Febri",
    "matchedIkm": "PT Cipta Busana Bordir Cireundeu",
    "matchedProduct": "Luxury Tencel Embroidered Abaya",
    "timestamp": "23 Sep 2026, 11:00"
  },
  {
    "id": "lead-12",
    "source": "wa_bot",
    "buyerName": "Francois Dupont",
    "company": "Grasse Parfumerie Fine SARL",
    "country": "France",
    "flag": "🇫🇷",
    "categoryInterest": "manufaktur",
    "specificInquiry": "Pure dark patchouli oil PA 32% minimum GC-MS lot certified",
    "targetVolume": "200 kg (8 Drum 25kg)",
    "incoterm": "FOB",
    "score": 95,
    "status": "HOT",
    "pipelineStage": "QUOTATION_REQUESTED",
    "estimatedValueUsd": 142000,
    "picAssigned": "Lukman",
    "matchedIkm": "CV Rempah Wangi Rempoa",
    "matchedProduct": "Pure Patchouli Essential Oil",
    "timestamp": "22 Sep 2026, 16:30"
  }
];
