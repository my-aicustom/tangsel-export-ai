export interface DestinationPort {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  airCode: string;
  flag: string;
  region: string;
  unLocode: string;
  portType: 'SEA' | 'AIR' | 'MULTIMODAL';
  airBaseRatePerKg: number;    // USD per kg
  oceanBaseRatePerCbm: number; // USD per CBM
  transitDaysAir: string;
  transitDaysOcean: string;
  customsRiskLevel?: 'Standard' | 'Strict' | 'High Compliance';
  customsRequirements?: string[];
}

export interface Tei2026FclOceanRate {
  route: string;
  destination: string;
  country: string;
  usd20ft: number;
  usd40ft: number;
}

export interface Tei2026LclOceanRate {
  route: string;
  destination: string;
  country: string;
  usdPerCbm: number;
  minimumCbm: number;
}

export const TEI_2026_OFFICIAL_RATES = {
  source: 'TEI 2026 Official Forwarding Rate (1-14 Oct 2026, Taman Tekno BSD - Tg Priok)',
  validity: '1-14 October 2026',
  origin: 'Taman Tekno BSD Serpong, Tangerang Selatan',
  gatewayPort: 'Pelabuhan Tanjung Priok, Jakarta',
  tax: {
    name: 'PPN',
    rate: 0.011
  },
  fclOceanFreightUsd: [
    { route: 'JKT - SINGAPORE', destination: 'Singapore', country: 'Singapore', usd20ft: 300, usd40ft: 450 },
    { route: 'JKT - PORT KLANG (PKL)', destination: 'Port Klang', country: 'Malaysia', usd20ft: 300, usd40ft: 450 },
    { route: 'JKT - KAOHSIUNG', destination: 'Kaohsiung', country: 'Taiwan', usd20ft: 300, usd40ft: 500 },
    { route: 'JKT - KEELUNG', destination: 'Keelung', country: 'Taiwan', usd20ft: 340, usd40ft: 500 },
    { route: 'JKT - TAICHUNG', destination: 'Taichung', country: 'Taiwan', usd20ft: 440, usd40ft: 550 },
    { route: 'JKT - LATKRABANG', destination: 'Lat Krabang', country: 'Thailand', usd20ft: 550, usd40ft: 750 },
    { route: 'JKT - LAEM CHABANG', destination: 'Laem Chabang', country: 'Thailand', usd20ft: 500, usd40ft: 700 },
    { route: 'JKT - BANGKOK', destination: 'Bangkok', country: 'Thailand', usd20ft: 525, usd40ft: 725 },
    { route: 'JKT - PUSAN', destination: 'Busan/Pusan', country: 'Korea', usd20ft: 275, usd40ft: 425 },
    { route: 'JKT - INCHEON', destination: 'Incheon', country: 'Korea', usd20ft: 350, usd40ft: 475 },
    { route: 'JKT - HO CHI MINH', destination: 'Ho Chi Minh', country: 'Vietnam', usd20ft: 300, usd40ft: 450 },
    { route: 'JKT - HAIPHONG', destination: 'Haiphong', country: 'Vietnam', usd20ft: 350, usd40ft: 500 },
    { route: 'JKT - NANSHA / SHEKOU', destination: 'Nansha / Shekou', country: 'China', usd20ft: 325, usd40ft: 480 },
    { route: 'JKT - NINGBO / SHANGHAI', destination: 'Ningbo / Shanghai', country: 'China', usd20ft: 325, usd40ft: 480 },
    { route: 'JKT - XIAMEN / QINGDAO', destination: 'Xiamen / Qingdao', country: 'China', usd20ft: 300, usd40ft: 480 },
    { route: 'JKT - SIHANOUKVILLE', destination: 'Sihanoukville', country: 'Cambodia', usd20ft: 850, usd40ft: 900 },
    { route: 'JKT - DAVAO', destination: 'Davao', country: 'Philippines', usd20ft: 300, usd40ft: 450 }
  ] satisfies Tei2026FclOceanRate[],
  lclOceanFreightUsd: [
    { route: 'JKT - SINGAPORE', destination: 'Singapore', country: 'Singapore', usdPerCbm: 20, minimumCbm: 2 },
    { route: 'JKT - PORT KLANG (PKL)', destination: 'Port Klang', country: 'Malaysia', usdPerCbm: 30, minimumCbm: 2 },
    { route: 'JKT - KAOHSIUNG', destination: 'Kaohsiung', country: 'Taiwan', usdPerCbm: 35, minimumCbm: 2 },
    { route: 'JKT - KEELUNG', destination: 'Keelung', country: 'Taiwan', usdPerCbm: 40, minimumCbm: 2 },
    { route: 'JKT - TAICHUNG', destination: 'Taichung', country: 'Taiwan', usdPerCbm: 45, minimumCbm: 2 },
    { route: 'JKT - LATKRABANG', destination: 'Lat Krabang', country: 'Thailand', usdPerCbm: 50, minimumCbm: 2 },
    { route: 'JKT - LAEM CHABANG', destination: 'Laem Chabang', country: 'Thailand', usdPerCbm: 50, minimumCbm: 2 },
    { route: 'JKT - BANGKOK', destination: 'Bangkok', country: 'Thailand', usdPerCbm: 55, minimumCbm: 2 },
    { route: 'JKT - PUSAN', destination: 'Busan/Pusan', country: 'Korea', usdPerCbm: 55, minimumCbm: 2 },
    { route: 'JKT - INCHEON', destination: 'Incheon', country: 'Korea', usdPerCbm: 50, minimumCbm: 2 },
    { route: 'JKT - HO CHI MINH', destination: 'Ho Chi Minh', country: 'Vietnam', usdPerCbm: 40, minimumCbm: 2 },
    { route: 'JKT - HAIPHONG', destination: 'Haiphong', country: 'Vietnam', usdPerCbm: 45, minimumCbm: 2 },
    { route: 'JKT - NANSHA / SHEKOU', destination: 'Nansha / Shekou', country: 'China', usdPerCbm: 45, minimumCbm: 2 },
    { route: 'JKT - NINGBO / SHANGHAI', destination: 'Ningbo / Shanghai', country: 'China', usdPerCbm: 50, minimumCbm: 2 },
    { route: 'JKT - XIAMEN / QINGDAO', destination: 'Xiamen / Qingdao', country: 'China', usdPerCbm: 50, minimumCbm: 2 }
  ] satisfies Tei2026LclOceanRate[],
  emklFclUsd: {
    trucking20ftPerTrip: 200,
    trucking40ftPerTrip: 300,
    handling20ftPerContainer: 40,
    handling40ftPerContainer: 50,
    fumigation20ftPerContainer: 200,
    fumigation40ftPerContainer: 300,
    adminDocumentSealEdiPerContainer: 130,
    storage20ftEstimatePerContainer: 68,
    storage40ftEstimatePerContainer: 80,
    liftoffInsuranceOther: 'At cost'
  },
  emklLclUsd: {
    trucking1To5CbmPerTrip: 150,
    trucking5To10CbmPerTrip: 230,
    handling1To5Cbm: 35,
    handling5To10Cbm: 40,
    fumigationIfAny: 175,
    otherInsurance: 'At cost'
  }
} as const;

export const DESTINATION_PORTS: DestinationPort[] = [
  {
    id: "port-sin",
    country: "Singapore",
    countryCode: "SG",
    airCode: "SIN",
    name: "Port of Singapore (PSA) / Changi Airport (SIN)",
    region: "ASEAN & Asia Hub",
    unLocode: "SGSIN",
    portType: "MULTIMODAL",
    airBaseRatePerKg: 4.8,
    oceanBaseRatePerCbm: 20,
    transitDaysAir: "1-2 Hari",
    transitDaysOcean: "2-4 Hari",
    flag: "🇸🇬",
    customsRequirements: [
      "SFA Import Permit (Makanan)",
      "GST 9% Deklarasi Bea Cukai Singapura",
      "Surat Keterangan Asal (SKA Form D)"
    ]
  },
  {
    id: "port-pkl",
    country: "Malaysia",
    countryCode: "MY",
    airCode: "KUL",
    name: "Port Klang (PKL) / Kuala Lumpur Airport (KUL)",
    region: "ASEAN & Asia Hub",
    unLocode: "MYPKG",
    portType: "MULTIMODAL",
    airBaseRatePerKg: 4.9,
    oceanBaseRatePerCbm: 30,
    transitDaysAir: "1-2 Hari",
    transitDaysOcean: "3-5 Hari",
    flag: "🇲🇾",
    customsRequirements: [
      "Malaysia Customs K1/K2 Declaration",
      "SST/GST import compliance when applicable",
      "Certificate of Origin Form D (ATIGA)"
    ]
  },
  {
    id: "port-khh",
    country: "Taiwan",
    countryCode: "TW",
    airCode: "KHH",
    name: "Port of Kaohsiung / Kaohsiung Airport (KHH)",
    region: "East Asia Pacific",
    unLocode: "TWKHH",
    portType: "MULTIMODAL",
    airBaseRatePerKg: 6.4,
    oceanBaseRatePerCbm: 35,
    transitDaysAir: "2-4 Hari",
    transitDaysOcean: "7-10 Hari",
    flag: "🇹🇼",
    customsRequirements: [
      "Taiwan Customs import declaration",
      "Bureau of Animal and Plant Health Inspection when applicable",
      "Commercial Invoice & Packing List"
    ]
  },
  {
    id: "port-kee",
    country: "Taiwan",
    countryCode: "TW",
    airCode: "TPE",
    name: "Port of Keelung / Taoyuan Airport (TPE)",
    region: "East Asia Pacific",
    unLocode: "TWKEL",
    portType: "MULTIMODAL",
    airBaseRatePerKg: 6.5,
    oceanBaseRatePerCbm: 40,
    transitDaysAir: "2-4 Hari",
    transitDaysOcean: "7-10 Hari",
    flag: "🇹🇼",
    customsRequirements: [
      "Taiwan Customs import declaration",
      "Commodity inspection where required",
      "Commercial Invoice & Packing List"
    ]
  },
  {
    id: "port-rmq",
    country: "Taiwan",
    countryCode: "TW",
    airCode: "RMQ",
    name: "Port of Taichung / Taichung Airport (RMQ)",
    region: "East Asia Pacific",
    unLocode: "TWTXG",
    portType: "MULTIMODAL",
    airBaseRatePerKg: 6.6,
    oceanBaseRatePerCbm: 45,
    transitDaysAir: "2-4 Hari",
    transitDaysOcean: "8-11 Hari",
    flag: "🇹🇼",
    customsRequirements: [
      "Taiwan Customs import declaration",
      "Commodity inspection where required",
      "Commercial Invoice & Packing List"
    ]
  },
  {
    id: "port-lkb",
    country: "Thailand",
    countryCode: "TH",
    airCode: "BKK",
    name: "Lat Krabang ICD / Bangkok Airport (BKK)",
    region: "ASEAN & Mekong",
    unLocode: "THLKR",
    portType: "MULTIMODAL",
    airBaseRatePerKg: 5.2,
    oceanBaseRatePerCbm: 50,
    transitDaysAir: "2-4 Hari",
    transitDaysOcean: "5-8 Hari",
    flag: "🇹🇭",
    customsRequirements: [
      "Thai Customs import declaration",
      "FDA Thailand registration for food/cosmetics where applicable",
      "Certificate of Origin Form D (ATIGA)"
    ]
  },
  {
    id: "port-lch",
    country: "Thailand",
    countryCode: "TH",
    airCode: "BKK",
    name: "Laem Chabang Port / Bangkok Airport (BKK)",
    region: "ASEAN & Mekong",
    unLocode: "THLCH",
    portType: "MULTIMODAL",
    airBaseRatePerKg: 5.2,
    oceanBaseRatePerCbm: 50,
    transitDaysAir: "2-4 Hari",
    transitDaysOcean: "5-8 Hari",
    flag: "🇹🇭",
    customsRequirements: [
      "Thai Customs import declaration",
      "FDA Thailand registration for food/cosmetics where applicable",
      "Certificate of Origin Form D (ATIGA)"
    ]
  },
  {
    id: "port-bkk",
    country: "Thailand",
    countryCode: "TH",
    airCode: "BKK",
    name: "Bangkok Port / Suvarnabhumi Airport (BKK)",
    region: "ASEAN & Mekong",
    unLocode: "THBKK",
    portType: "MULTIMODAL",
    airBaseRatePerKg: 5.2,
    oceanBaseRatePerCbm: 55,
    transitDaysAir: "2-4 Hari",
    transitDaysOcean: "5-8 Hari",
    flag: "🇹🇭",
    customsRequirements: [
      "Thai Customs import declaration",
      "FDA Thailand registration for food/cosmetics where applicable",
      "Certificate of Origin Form D (ATIGA)"
    ]
  },
  {
    id: "port-pus",
    country: "Korea",
    countryCode: "KR",
    airCode: "PUS",
    name: "Busan/Pusan Port / Gimhae Airport (PUS)",
    region: "Northeast Asia",
    unLocode: "KRPUS",
    portType: "MULTIMODAL",
    airBaseRatePerKg: 6.9,
    oceanBaseRatePerCbm: 55,
    transitDaysAir: "2-4 Hari",
    transitDaysOcean: "8-12 Hari",
    flag: "🇰🇷",
    customsRequirements: [
      "Korea Customs import declaration",
      "MFDS import notification for food/cosmetics where applicable",
      "Certificate of Origin Form AK"
    ]
  },
  {
    id: "port-icn",
    country: "Korea",
    countryCode: "KR",
    airCode: "ICN",
    name: "Incheon Port / Incheon Airport (ICN)",
    region: "Northeast Asia",
    unLocode: "KRINC",
    portType: "MULTIMODAL",
    airBaseRatePerKg: 6.8,
    oceanBaseRatePerCbm: 50,
    transitDaysAir: "2-4 Hari",
    transitDaysOcean: "8-12 Hari",
    flag: "🇰🇷",
    customsRequirements: [
      "Korea Customs import declaration",
      "MFDS import notification for food/cosmetics where applicable",
      "Certificate of Origin Form AK"
    ]
  },
  {
    id: "port-sgn",
    country: "Vietnam",
    countryCode: "VN",
    airCode: "SGN",
    name: "Ho Chi Minh Port / Tan Son Nhat Airport (SGN)",
    region: "ASEAN & Mekong",
    unLocode: "VNSGN",
    portType: "MULTIMODAL",
    airBaseRatePerKg: 5.4,
    oceanBaseRatePerCbm: 40,
    transitDaysAir: "2-4 Hari",
    transitDaysOcean: "5-8 Hari",
    flag: "🇻🇳",
    customsRequirements: [
      "Vietnam Customs import declaration",
      "Import permit or product registration where applicable",
      "Certificate of Origin Form D (ATIGA)"
    ]
  },
  {
    id: "port-hph",
    country: "Vietnam",
    countryCode: "VN",
    airCode: "HAN",
    name: "Haiphong Port / Noi Bai Airport (HAN)",
    region: "ASEAN & Mekong",
    unLocode: "VNHPH",
    portType: "MULTIMODAL",
    airBaseRatePerKg: 5.7,
    oceanBaseRatePerCbm: 45,
    transitDaysAir: "2-4 Hari",
    transitDaysOcean: "6-9 Hari",
    flag: "🇻🇳",
    customsRequirements: [
      "Vietnam Customs import declaration",
      "Import permit or product registration where applicable",
      "Certificate of Origin Form D (ATIGA)"
    ]
  },
  {
    id: "port-nsa",
    country: "China",
    countryCode: "CN",
    airCode: "CAN",
    name: "Nansha / Shekou Ports / Guangzhou Airport (CAN)",
    region: "East Asia Hub",
    unLocode: "CNNSA",
    portType: "MULTIMODAL",
    airBaseRatePerKg: 6.1,
    oceanBaseRatePerCbm: 45,
    transitDaysAir: "2-3 Hari",
    transitDaysOcean: "7-10 Hari",
    flag: "🇨🇳",
    customsRequirements: [
      "GACC Registration Decree 248/249",
      "China Customs import declaration",
      "Certificate of Origin Form E (ACFTA)"
    ]
  },
  {
    id: "port-sha",
    country: "China",
    countryCode: "CN",
    airCode: "PVG",
    name: "Ningbo / Shanghai Ports / Pudong Airport (PVG)",
    region: "East Asia Hub",
    unLocode: "CNSHA",
    portType: "MULTIMODAL",
    airBaseRatePerKg: 6.2,
    oceanBaseRatePerCbm: 50,
    transitDaysAir: "2-3 Hari",
    transitDaysOcean: "8-12 Hari",
    flag: "🇨🇳",
    customsRequirements: [
      "GACC Registration Decree 248/249",
      "China Customs import declaration",
      "Certificate of Origin Form E (ACFTA)"
    ]
  },
  {
    id: "port-xmn",
    country: "China",
    countryCode: "CN",
    airCode: "XMN",
    name: "Xiamen / Qingdao Ports / Xiamen Airport (XMN)",
    region: "East Asia Hub",
    unLocode: "CNXMN",
    portType: "MULTIMODAL",
    airBaseRatePerKg: 6.2,
    oceanBaseRatePerCbm: 50,
    transitDaysAir: "2-3 Hari",
    transitDaysOcean: "8-12 Hari",
    flag: "🇨🇳",
    customsRequirements: [
      "GACC Registration Decree 248/249",
      "China Customs import declaration",
      "Certificate of Origin Form E (ACFTA)"
    ]
  }
];

export const ORIGIN_PORTS = {
  seaport: { locode: 'IDJKT', name: 'Port of Tanjung Priok, Jakarta', province: 'DKI Jakarta / Banten Hinterland' },
  airport: { locode: 'IDCGK', name: 'Soekarno-Hatta International Airport', province: 'Tangerang, Banten' }
};

export type TruckVehicleType = 'LCL_1_5_CBM' | 'LCL_5_10_CBM' | 'TRAILER_20FT' | 'TRAILER_40FT';

export interface InlandTruckingRate {
  type: TruckVehicleType;
  label: string;
  capacityCbm: number;
  capacityWeightKg: number;
  costIdrPriok: number;
  costIdrCgk: number;
  costUsdPriok: number;
  costUsdCgk: number;
  description: string;
}

export const INLAND_TRUCKING_RATES: InlandTruckingRate[] = [
  {
    type: 'LCL_1_5_CBM',
    label: 'LCL Trucking Taman Tekno - Priok (1-5 CBM)',
    capacityCbm: 5,
    capacityWeightKg: 5000,
    costIdrPriok: 2697750,
    costIdrCgk: 2697750,
    costUsdPriok: 150,
    costUsdCgk: 150,
    description: 'Tarif resmi EMKL TEI 2026 untuk LCL 1-5 CBM dari Taman Tekno BSD ke Tanjung Priok'
  },
  {
    type: 'LCL_5_10_CBM',
    label: 'LCL Trucking Taman Tekno - Priok (5-10 CBM)',
    capacityCbm: 10,
    capacityWeightKg: 8000,
    costIdrPriok: 4136550,
    costIdrCgk: 4136550,
    costUsdPriok: 230,
    costUsdCgk: 230,
    description: 'Tarif resmi EMKL TEI 2026 untuk LCL 5-10 CBM dari Taman Tekno BSD ke Tanjung Priok'
  },
  {
    type: 'TRAILER_20FT',
    label: 'Trailer Kontainer 20ft Taman Tekno - Priok',
    capacityCbm: 28,
    capacityWeightKg: 21000,
    costIdrPriok: 3597000,
    costIdrCgk: 3597000,
    costUsdPriok: 200,
    costUsdCgk: 200,
    description: 'Tarif resmi EMKL TEI 2026 untuk trucking FCL 20ft dari Taman Tekno BSD ke Tanjung Priok'
  },
  {
    type: 'TRAILER_40FT',
    label: 'Trailer Kontainer 40ft Taman Tekno - Priok',
    capacityCbm: 58,
    capacityWeightKg: 26000,
    costIdrPriok: 5395500,
    costIdrCgk: 5395500,
    costUsdPriok: 300,
    costUsdCgk: 300,
    description: 'Tarif resmi EMKL TEI 2026 untuk trucking FCL 40ft dari Taman Tekno BSD ke Tanjung Priok'
  }
];

export function getRecommendedTruck(cbm: number, weightKg: number): InlandTruckingRate {
  if (cbm <= 5 && weightKg <= 5000) return INLAND_TRUCKING_RATES[0];
  if (cbm <= 10 && weightKg <= 8000) return INLAND_TRUCKING_RATES[1];
  if (cbm <= 33 && weightKg <= 21000) return INLAND_TRUCKING_RATES[2];
  return INLAND_TRUCKING_RATES[3];
}

export interface LogisticsSimulationParams {
  destinationId: string;
  actualWeightKg: number;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  packagesCount: number;
  cargoValueUsd: number;
  incoterm: 'FOB' | 'CIF' | 'EXW';
  mode: 'AIR_EXPRESS' | 'OCEAN_LCL';
  needInsurance: boolean;
}

export interface SimulationResult {
  chargeableWeightKg: number;
  volumetricWeightKg: number;
  totalVolumeCbm: number;
  baseFreightCostUsd: number;
  fuelSurchargeUsd: number;
  customsClearanceUsd: number;
  exportDocumentationUsd: number;
  insuranceCostUsd: number;
  inlandTruckingCostUsd?: number;
  inlandTruckingCostIdr?: number;
  inlandTruckDetails?: string;
  totalEstimatedCostUsd: number;
  totalEstimatedCostIdr: number;
  transitTimeEstimate: string;
  incotermExplanation: string;
  requiredDocuments: string[];
}

export interface ModeCalculation {
  mode: 'AIR_EXPRESS' | 'OCEAN_LCL';
  modeLabel: string;
  actualWeightKg: number;
  volumetricWeightKg: number;
  chargeableWeightKg: number;
  totalVolumeCbm: number;
  baseFreightCostUsd: number;
  fuelSurchargeUsd: number;
  customsClearanceUsd: number;
  exportDocumentationUsd: number;
  insuranceCostUsd: number;
  inlandTruckingCostUsd?: number;
  inlandTruckingCostIdr?: number;
  inlandTruckDetails?: string;
  totalEstimatedCostUsd: number;
  totalEstimatedCostIdr: number;
  transitTimeEstimate: string;
  costPerKgUsd: number;
  costPerCbmUsd: number;
  logisticsCostPercentageOfFob: number;
}

export interface SideBySideComparisonResult {
  actualWeightKg: number;
  volumetricWeightKg: number;
  totalVolumeCbm: number;
  fobCargoValueUsd: number;
  air: ModeCalculation;
  ocean: ModeCalculation;
  recommendedMode: 'AIR_EXPRESS' | 'OCEAN_LCL';
  recommendationReason: string;
}

export const LOGISTICS_RATE_META = {
  source: 'TEI 2026 Official Forwarding Rate (1-14 Oct 2026, Taman Tekno BSD - Tg Priok)',
  version: '2026.10.tei-official',
  validity: TEI_2026_OFFICIAL_RATES.validity,
  tax: 'PPN 1.1%'
};

export function calculateSideBySideComparison(
  params: LogisticsSimulationParams,
  usdToIdr: number = 17985
): SideBySideComparisonResult {
  const port = DESTINATION_PORTS.find(p => p.id === params.destinationId) || DESTINATION_PORTS[0];

  const totalActualWeight = Number((params.actualWeightKg * params.packagesCount).toFixed(2));
  const singleVolumetricWeight = (params.lengthCm * params.widthCm * params.heightCm) / 5000;
  const totalVolumetricWeight = Number((singleVolumetricWeight * params.packagesCount).toFixed(2));
  const totalCbm = Number((((params.lengthCm * params.widthCm * params.heightCm) / 1000000) * params.packagesCount).toFixed(3));
  const insuranceCost = params.needInsurance ? Math.max(params.cargoValueUsd * 0.0035, 25.00) : 0;
  const recommendedTruck = getRecommendedTruck(totalCbm, totalActualWeight);
  const airInlandTruckUsd = recommendedTruck.costUsdCgk;
  const airInlandTruckIdr = recommendedTruck.costIdrCgk;
  const oceanInlandTruckUsd = recommendedTruck.costUsdPriok;
  const oceanInlandTruckIdr = recommendedTruck.costIdrPriok;

  // 1. AIR FREIGHT CALCULATION
  const airChargeableWeight = Math.max(totalActualWeight, totalVolumetricWeight);
  const airBaseFreight = airChargeableWeight * port.airBaseRatePerKg;
  const airFuelSurcharge = airBaseFreight * 0.16; // 16% Fuel Surcharge
  const airCustoms = 45.00;
  const airDocs = 35.00;
  const airTotalUsd = Number((airBaseFreight + airFuelSurcharge + airCustoms + airDocs + insuranceCost + airInlandTruckUsd).toFixed(2));
  const airTotalIdr = Math.round((airBaseFreight + airFuelSurcharge + airCustoms + airDocs + insuranceCost) * usdToIdr) + airInlandTruckIdr;
  const airCostPerKg = Number((airTotalUsd / airChargeableWeight).toFixed(2));
  const airCostPerCbm = Number((airTotalUsd / Math.max(totalCbm, 0.01)).toFixed(2));
  const airPctFob = Number(((airTotalUsd / Math.max(params.cargoValueUsd, 1)) * 100).toFixed(1));

  const airCalc: ModeCalculation = {
    mode: 'AIR_EXPRESS',
    modeLabel: 'Air Freight Express (DHL Aviation / Cargo)',
    actualWeightKg: totalActualWeight,
    volumetricWeightKg: totalVolumetricWeight,
    chargeableWeightKg: Number(airChargeableWeight.toFixed(2)),
    totalVolumeCbm: totalCbm,
    baseFreightCostUsd: Number(airBaseFreight.toFixed(2)),
    fuelSurchargeUsd: Number(airFuelSurcharge.toFixed(2)),
    customsClearanceUsd: airCustoms,
    exportDocumentationUsd: airDocs,
    insuranceCostUsd: Number(insuranceCost.toFixed(2)),
    inlandTruckingCostUsd: airInlandTruckUsd,
    inlandTruckingCostIdr: airInlandTruckIdr,
    inlandTruckDetails: `${recommendedTruck.label} - Tangsel -> ${ORIGIN_PORTS.airport.name} (${ORIGIN_PORTS.airport.locode})`,
    totalEstimatedCostUsd: airTotalUsd,
    totalEstimatedCostIdr: airTotalIdr,
    transitTimeEstimate: port.transitDaysAir,
    costPerKgUsd: airCostPerKg,
    costPerCbmUsd: airCostPerCbm,
    logisticsCostPercentageOfFob: airPctFob
  };

  // 2. OCEAN LCL CALCULATION
  const oceanBillableCbm = Math.max(totalCbm, totalActualWeight / 1000, 2.0);
  const oceanBaseFreight = oceanBillableCbm * port.oceanBaseRatePerCbm;
  const oceanFuelSurcharge = oceanBaseFreight * 0.12; // 12% BAF / Bunker Surcharge
  const oceanCustoms = 65.00; // CFS handling + Customs export clearance
  const oceanDocs = 40.00; // Bill of Lading + PEB filing
  const oceanTotalUsd = Number((oceanBaseFreight + oceanFuelSurcharge + oceanCustoms + oceanDocs + insuranceCost + oceanInlandTruckUsd).toFixed(2));
  const oceanTotalIdr = Math.round((oceanBaseFreight + oceanFuelSurcharge + oceanCustoms + oceanDocs + insuranceCost) * usdToIdr) + oceanInlandTruckIdr;
  const oceanCostPerKg = Number((oceanTotalUsd / totalActualWeight).toFixed(2));
  const oceanCostPerCbm = Number((oceanTotalUsd / oceanBillableCbm).toFixed(2));
  const oceanPctFob = Number(((oceanTotalUsd / Math.max(params.cargoValueUsd, 1)) * 100).toFixed(1));

  const oceanCalc: ModeCalculation = {
    mode: 'OCEAN_LCL',
    modeLabel: 'Ocean Freight LCL (Konsolidasi Petikemas)',
    actualWeightKg: totalActualWeight,
    volumetricWeightKg: totalVolumetricWeight,
    chargeableWeightKg: Number((oceanBillableCbm * 1000).toFixed(2)), // W/M equivalent
    totalVolumeCbm: totalCbm,
    baseFreightCostUsd: Number(oceanBaseFreight.toFixed(2)),
    fuelSurchargeUsd: Number(oceanFuelSurcharge.toFixed(2)),
    customsClearanceUsd: oceanCustoms,
    exportDocumentationUsd: oceanDocs,
    insuranceCostUsd: Number(insuranceCost.toFixed(2)),
    inlandTruckingCostUsd: oceanInlandTruckUsd,
    inlandTruckingCostIdr: oceanInlandTruckIdr,
    inlandTruckDetails: `${recommendedTruck.label} - Tangsel -> ${ORIGIN_PORTS.seaport.name} (${ORIGIN_PORTS.seaport.locode})`,
    totalEstimatedCostUsd: oceanTotalUsd,
    totalEstimatedCostIdr: oceanTotalIdr,
    transitTimeEstimate: port.transitDaysOcean,
    costPerKgUsd: oceanCostPerKg,
    costPerCbmUsd: oceanCostPerCbm,
    logisticsCostPercentageOfFob: oceanPctFob
  };

  let recommendedMode: 'AIR_EXPRESS' | 'OCEAN_LCL' = 'AIR_EXPRESS';
  let recommendationReason = '';

  if (totalActualWeight >= 100 || totalCbm >= 0.75) {
    recommendedMode = 'OCEAN_LCL';
    const savings = airTotalUsd - oceanTotalUsd;
    recommendationReason = `Kargo berbobot ${totalActualWeight} kg (${totalCbm} CBM) lebih efisien via Ocean LCL dengan penghematan ~$${savings.toFixed(0)} USD (${((savings / airTotalUsd) * 100).toFixed(0)}% lebih hemat). Waktu tempuh ${port.transitDaysOcean}.`;
  } else {
    recommendedMode = 'AIR_EXPRESS';
    recommendationReason = `Kargo berbobot ${totalActualWeight} kg cocok via Air Express untuk kecepatan pengiriman (${port.transitDaysAir}) dan sampel buyer TEI 2026. Biaya logistik ${airPctFob}% dari nilai FOB.`;
  }

  return {
    actualWeightKg: totalActualWeight,
    volumetricWeightKg: totalVolumetricWeight,
    totalVolumeCbm: totalCbm,
    fobCargoValueUsd: params.cargoValueUsd,
    air: airCalc,
    ocean: oceanCalc,
    recommendedMode,
    recommendationReason
  };
}

export function calculateLogisticsEstimate(
  params: LogisticsSimulationParams,
  usdToIdr: number = 17985
): SimulationResult {
  const comparison = calculateSideBySideComparison(params, usdToIdr);
  const selected = params.mode === 'AIR_EXPRESS' ? comparison.air : comparison.ocean;

  let incotermDesc = '';
  switch (params.incoterm) {
    case 'EXW':
      incotermDesc = 'Ex Works: Pembeli menanggung biaya pengiriman internasional dan risiko mulai dari pintu pabrik/IKM Tangsel.';
      break;
    case 'FOB':
      incotermDesc = 'Free on Board: Penjual (IKM Tangsel) menanggung biaya sampai muat di kapal/pesawat di Jakarta (CGK/Tanjung Priok). Freight internasional ditanggung Buyer.';
      break;
    case 'CIF':
      incotermDesc = 'Cost, Insurance & Freight: Penjual (IKM Tangsel) menanggung biaya freight kargo dan asuransi pelayaran sampai di pelabuhan/bandara tujuan buyer.';
      break;
  }

  return {
    chargeableWeightKg: selected.chargeableWeightKg,
    volumetricWeightKg: selected.volumetricWeightKg,
    totalVolumeCbm: selected.totalVolumeCbm,
    baseFreightCostUsd: selected.baseFreightCostUsd,
    fuelSurchargeUsd: selected.fuelSurchargeUsd,
    customsClearanceUsd: selected.customsClearanceUsd,
    exportDocumentationUsd: selected.exportDocumentationUsd,
    insuranceCostUsd: selected.insuranceCostUsd,
    totalEstimatedCostUsd: selected.totalEstimatedCostUsd,
    totalEstimatedCostIdr: selected.totalEstimatedCostIdr,
    transitTimeEstimate: selected.transitTimeEstimate,
    incotermExplanation: incotermDesc,
    requiredDocuments: [
      'Pemberitahuan Ekspor Barang (PEB)',
      'Commercial Invoice & Packing List',
      'Air Waybill (AWB) / Bill of Lading (B/L)',
      'Certificate of Origin (SKA / Form A/COO)',
      'Dokumen Khusus Komoditas (Phytosanitary/Halal/V-Legal)'
    ]
  };
}

// Backwards-compatibility alias
export const calculateLogisticsDemo = calculateLogisticsEstimate;
