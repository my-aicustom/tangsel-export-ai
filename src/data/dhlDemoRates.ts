export interface DestinationPort {
  id: string;
  name: string;
  country: string;
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

export const DESTINATION_PORTS: DestinationPort[] = [
  {
    "id": "port-sin",
    "country": "Singapore",
    "name": "Port of Singapore (PSA) / Changi Airport (SIN)",
    "region": "ASEAN & Asia Hub",
    "unLocode": "SGSIN",
    "portType": "MULTIMODAL",
    "airBaseRatePerKg": 4.8,
    "oceanBaseRatePerCbm": 42,
    "transitDaysAir": "1-2 Hari",
    "transitDaysOcean": "2-4 Hari",
    "flag": "🇸🇬",
    "customsRequirements": [
      "SFA Import Permit (Makanan)",
      "GST 9% Deklarasi Bea Cukai Singapura",
      "Surat Keterangan Asal (SKA Form D)"
    ]
  },
  {
    "id": "port-sha",
    "country": "China",
    "name": "Port of Shanghai (Yangshan) / Pudong Airport (PVG)",
    "region": "East Asia Hub",
    "unLocode": "CNSHA",
    "portType": "MULTIMODAL",
    "airBaseRatePerKg": 6.2,
    "oceanBaseRatePerCbm": 58,
    "transitDaysAir": "2-3 Hari",
    "transitDaysOcean": "8-12 Hari",
    "flag": "🇨🇳",
    "customsRequirements": [
      "GACC Registration Decree 248/249",
      "AQSIQ Phytosanitary Certificate",
      "Certificate of Origin Form E (ACFTA)"
    ]
  },
  {
    "id": "port-tyo",
    "country": "Japan",
    "name": "Port of Yokohama / Tokyo Narita Airport (NRT)",
    "region": "East Asia Pacific",
    "unLocode": "JPYOK",
    "portType": "MULTIMODAL",
    "airBaseRatePerKg": 7.8,
    "oceanBaseRatePerCbm": 75,
    "transitDaysAir": "2-4 Hari",
    "transitDaysOcean": "10-14 Hari",
    "flag": "🇯🇵",
    "customsRequirements": [
      "MHLW Food Sanitation Act Notification",
      "MAFF Plant Quarantine Inspection",
      "EPA Form AJ / IJEPA"
    ]
  },
  {
    "id": "port-lax",
    "country": "United States",
    "name": "Port of Los Angeles (POLA) / LAX Airport",
    "region": "North America",
    "unLocode": "USLAX",
    "portType": "MULTIMODAL",
    "airBaseRatePerKg": 12.5,
    "oceanBaseRatePerCbm": 145,
    "transitDaysAir": "3-5 Hari",
    "transitDaysOcean": "22-28 Hari",
    "flag": "🇺🇸",
    "customsRequirements": [
      "US FDA Facility Registration & Prior Notice",
      "ISF 10+2 Filing (Laut)",
      "Lacey Act Declaration (Kayu/Bambu)"
    ]
  },
  {
    "id": "port-rtm",
    "country": "Netherlands",
    "name": "Port of Rotterdam (RTM) / Amsterdam Schiphol (AMS)",
    "region": "European Union",
    "unLocode": "NLRTM",
    "portType": "MULTIMODAL",
    "airBaseRatePerKg": 11.2,
    "oceanBaseRatePerCbm": 120,
    "transitDaysAir": "3-5 Hari",
    "transitDaysOcean": "24-28 Hari",
    "flag": "🇳🇱",
    "customsRequirements": [
      "EU Deforestation Regulation (EUDR) Due Diligence",
      "REX System Statement on Origin",
      "CE Mark (Teknik/Alat)"
    ]
  },
  {
    "id": "port-dxb",
    "country": "United Arab Emirates",
    "name": "Port of Jebel Ali / Dubai World Central (DWC)",
    "region": "Middle East & GCC",
    "unLocode": "AEJEA",
    "portType": "MULTIMODAL",
    "airBaseRatePerKg": 8.9,
    "oceanBaseRatePerCbm": 85,
    "transitDaysAir": "2-4 Hari",
    "transitDaysOcean": "14-18 Hari",
    "flag": "🇦🇪",
    "customsRequirements": [
      "ESMA Halal Halal National Mark Verification",
      "MoIAT ECAS Conformity",
      "Bilingual Arabic-English Labels"
    ]
  },
  {
    "id": "port-syd",
    "country": "Australia",
    "name": "Port Botany (Sydney) / Sydney Kingsford Smith (SYD)",
    "region": "Oceania",
    "unLocode": "AUSYD",
    "portType": "MULTIMODAL",
    "airBaseRatePerKg": 9.8,
    "oceanBaseRatePerCbm": 95,
    "transitDaysAir": "3-5 Hari",
    "transitDaysOcean": "12-16 Hari",
    "flag": "🇦🇺",
    "customsRequirements": [
      "BICON Biosecurity Import Conditions",
      "DAFF Inspection Notice",
      "IA-CEPA Origin Declaration"
    ]
  },
  {
    "id": "port-dla",
    "country": "Cameroon",
    "name": "Port of Douala (DLA) / Douala International Airport",
    "region": "West Africa",
    "unLocode": "CMDLA",
    "portType": "MULTIMODAL",
    "airBaseRatePerKg": 14.8,
    "oceanBaseRatePerCbm": 165,
    "transitDaysAir": "4-7 Hari",
    "transitDaysOcean": "28-35 Hari",
    "flag": "🇨🇲",
    "customsRequirements": [
      "ANOR PECAE Pre-Shipment Conformity",
      "Bilingual French-English Invoices",
      "ECTN / BESC Electronic Cargo Tracking"
    ]
  }
];

export const ORIGIN_PORTS = {
  seaport: { locode: 'IDJKT', name: 'Port of Tanjung Priok, Jakarta', province: 'DKI Jakarta / Banten Hinterland' },
  airport: { locode: 'IDCGK', name: 'Soekarno-Hatta International Airport', province: 'Tangerang, Banten' }
};

export type TruckVehicleType = 'PICKUP_VAN' | 'CDD_4T' | 'FUSO_10T' | 'TRAILER_20FT' | 'TRAILER_40FT';

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
    type: 'PICKUP_VAN',
    label: 'Pickup / Blind Van (1-2 CBM)',
    capacityCbm: 2,
    capacityWeightKg: 800,
    costIdrPriok: 450000,
    costIdrCgk: 350000,
    costUsdPriok: 25.02,
    costUsdCgk: 19.46,
    description: 'Cocok untuk sampel kargo & LCL kecil dari sentra IKM Tangsel'
  },
  {
    type: 'CDD_4T',
    label: 'Colt Diesel Double (CDD 14 CBM / 4 Ton)',
    capacityCbm: 14,
    capacityWeightKg: 4000,
    costIdrPriok: 1200000,
    costIdrCgk: 950000,
    costUsdPriok: 66.72,
    costUsdCgk: 52.82,
    description: 'Armada standar LCL agregat antar gudang Tangsel ke CFS Priok'
  },
  {
    type: 'FUSO_10T',
    label: 'Fuso Heavy Box (30 CBM / 10 Ton)',
    capacityCbm: 30,
    capacityWeightKg: 10000,
    costIdrPriok: 2200000,
    costIdrCgk: 1800000,
    costUsdPriok: 122.32,
    costUsdCgk: 100.08,
    description: 'Muatan partai besar konsolidasi sentra industri Serpong/Setu'
  },
  {
    type: 'TRAILER_20FT',
    label: 'Trailer Kontainer 20ft (FCL Haulage)',
    capacityCbm: 28,
    capacityWeightKg: 21000,
    costIdrPriok: 2800000,
    costIdrCgk: 2800000,
    costUsdPriok: 155.68,
    costUsdCgk: 155.68,
    description: 'Haulage kontainer 20ft dari depo Jakarta ke pabrik Tangsel bolak-balik'
  },
  {
    type: 'TRAILER_40FT',
    label: 'Trailer Kontainer 40ft (FCL Haulage)',
    capacityCbm: 58,
    capacityWeightKg: 26000,
    costIdrPriok: 3800000,
    costIdrCgk: 3800000,
    costUsdPriok: 211.28,
    costUsdCgk: 211.28,
    description: 'Haulage kontainer 40ft High Cube untuk ekspor volume tinggi'
  }
];

export function getRecommendedTruck(cbm: number, weightKg: number): InlandTruckingRate {
  if (cbm <= 2 && weightKg <= 800) return INLAND_TRUCKING_RATES[0];
  if (cbm <= 14 && weightKg <= 4000) return INLAND_TRUCKING_RATES[1];
  if (cbm <= 30 && weightKg <= 10000) return INLAND_TRUCKING_RATES[2];
  if (cbm <= 33 && weightKg <= 21000) return INLAND_TRUCKING_RATES[3];
  return INLAND_TRUCKING_RATES[4];
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

export function calculateSideBySideComparison(params: LogisticsSimulationParams): SideBySideComparisonResult {
  const port = DESTINATION_PORTS.find(p => p.id === params.destinationId) || DESTINATION_PORTS[0];
  const usdToIdr = 17985; // Live OSINT Rate (29/9/2026)

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
    modeLabel: 'Air Freight Express (DHL Aviation)',
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
  // Standard Ocean LCL Billing: W/M (1 CBM = 1000 kg). Billable CBM is max(CBM, actualWeight/1000, 1.0 minimum)
  const oceanBillableCbm = Math.max(totalCbm, totalActualWeight / 1000, 1.0);
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

  // Recommendation logic
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

export function calculateLogisticsDemo(params: LogisticsSimulationParams): SimulationResult {
  const comparison = calculateSideBySideComparison(params);
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
