export interface DestinationPort {
  id: string;
  name: string;
  country: string;
  flag: string;
  region: 'Africa' | 'Middle East' | 'Europe' | 'Asia' | 'North America';
  airBaseRatePerKg: number;    // USD per kg
  oceanBaseRatePerCbm: number; // USD per CBM
  transitDaysAir: string;
  transitDaysOcean: string;
  customsRiskLevel: 'Standard' | 'Strict' | 'High Compliance';
}

export const DESTINATION_PORTS: DestinationPort[] = [
  {
    id: 'port-dla',
    name: 'Douala International Airport / Port of Douala',
    country: 'Cameroon',
    flag: '🇨🇲',
    region: 'Africa',
    airBaseRatePerKg: 7.80,
    oceanBaseRatePerCbm: 145.00,
    transitDaysAir: '4 - 6 Hari',
    transitDaysOcean: '35 - 42 Hari',
    customsRiskLevel: 'Strict'
  },
  {
    id: 'port-dxb',
    name: 'Dubai International (DXB) / Port of Jebel Ali',
    country: 'United Arab Emirates',
    flag: '🇦🇪',
    region: 'Middle East',
    airBaseRatePerKg: 5.20,
    oceanBaseRatePerCbm: 85.00,
    transitDaysAir: '2 - 3 Hari',
    transitDaysOcean: '18 - 22 Hari',
    customsRiskLevel: 'Standard'
  },
  {
    id: 'port-rtm',
    name: 'Amsterdam Schiphol (AMS) / Port of Rotterdam',
    country: 'Netherlands',
    flag: '🇳🇱',
    region: 'Europe',
    airBaseRatePerKg: 6.90,
    oceanBaseRatePerCbm: 110.00,
    transitDaysAir: '3 - 5 Hari',
    transitDaysOcean: '28 - 34 Hari',
    customsRiskLevel: 'High Compliance'
  },
  {
    id: 'port-nrt',
    name: 'Tokyo Narita (NRT) / Port of Yokohama',
    country: 'Japan',
    flag: '🇯🇵',
    region: 'Asia',
    airBaseRatePerKg: 4.80,
    oceanBaseRatePerCbm: 65.00,
    transitDaysAir: '2 - 3 Hari',
    transitDaysOcean: '12 - 16 Hari',
    customsRiskLevel: 'High Compliance'
  },
  {
    id: 'port-lax',
    name: 'Los Angeles (LAX) / Port of Long Beach',
    country: 'United States',
    flag: '🇺🇸',
    region: 'North America',
    airBaseRatePerKg: 8.50,
    oceanBaseRatePerCbm: 125.00,
    transitDaysAir: '4 - 6 Hari',
    transitDaysOcean: '24 - 30 Hari',
    customsRiskLevel: 'High Compliance'
  }
];

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

  // 1. AIR FREIGHT CALCULATION
  const airChargeableWeight = Math.max(totalActualWeight, totalVolumetricWeight);
  const airBaseFreight = airChargeableWeight * port.airBaseRatePerKg;
  const airFuelSurcharge = airBaseFreight * 0.16; // 16% Fuel Surcharge
  const airCustoms = 45.00;
  const airDocs = 35.00;
  const airTotalUsd = Number((airBaseFreight + airFuelSurcharge + airCustoms + airDocs + insuranceCost).toFixed(2));
  const airTotalIdr = Math.round(airTotalUsd * usdToIdr);
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
  const oceanTotalUsd = Number((oceanBaseFreight + oceanFuelSurcharge + oceanCustoms + oceanDocs + insuranceCost).toFixed(2));
  const oceanTotalIdr = Math.round(oceanTotalUsd * usdToIdr);
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
