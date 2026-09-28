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
    id: 'lead-01',
    source: 'business_matching_cameroun',
    buyerName: 'Jean-Paul Kamga',
    company: 'Société Camerounaise de Distribution (SCD)',
    country: 'Cameroon',
    flag: '🇨🇲',
    categoryInterest: 'Food & Beverage / Organic Sugar',
    specificInquiry: 'Mencari pasokan palm sugar kristal organik kemasan retail 500g untuk jaringan supermarket di Douala dan Yaoundé. Memerlukan sertifikat Halal & uji mutu lab internasional.',
    targetVolume: '1 x 20ft FCL (~18 Ton) per triwulan',
    incoterm: 'CIF',
    score: 94.5,
    status: 'HOT',
    pipelineStage: 'POTENTIAL_SHIPMENT',
    estimatedValueUsd: 50000,
    picAssigned: 'Rama',
    matchedIkm: 'PT Java Palm Sugar Nusantara',
    matchedProduct: 'Organic Arenga Palm Sugar (Granule 500g)',
    timestamp: '24 Sep 2026, 08:30 WIB',
    contactWa: '+237 6 77 12 34 56',
    contactEmail: 'jp.kamga@scd-distribution.cm',
    notes: 'Kebutuhan sangat mendesak. Sampel sudah diminta dikirimkan via DHL Express ke kantor perwakilan Kamerun di Jakarta sebelum 30 September.'
  },
  {
    id: 'lead-02',
    source: 'inaexport_sync',
    buyerName: 'Tariq Al-Mansoor',
    company: 'Al-Madina Import & Export LLC',
    country: 'United Arab Emirates',
    flag: '🇦🇪',
    categoryInterest: 'Herbal & Spices Extract',
    specificInquiry: 'Permintaan pasokan konsentrat ekstrak jahe merah instan dan temulawak dalam sachet untuk pasar ritel herbal Dubai & Abu Dhabi. Syarat wajib Halal terakreditasi ESMA/BPJPH.',
    targetVolume: '20.000 Box per bulan',
    incoterm: 'FOB',
    score: 91.0,
    status: 'HOT',
    pipelineStage: 'QUOTATION_REQUESTED',
    estimatedValueUsd: 32000,
    picAssigned: 'Rama',
    matchedIkm: 'PT Herbal Alami Banten Sejahtera',
    matchedProduct: 'Instant Red Ginger Extract (Granule Sachet 20x15g)',
    timestamp: '23 Sep 2026, 17:15 WIB',
    contactWa: '+971 50 123 9876',
    contactEmail: 'tariq@almadinatrade.ae',
    notes: 'Inquiry sinkronisasi otomatis dari feed InaExport Kemendag. Sudah dikontak via WA business, respon antusias.'
  },
  {
    id: 'lead-03',
    source: 'booth_visitor',
    buyerName: 'Willem van den Berg',
    company: 'Rotterdam Green Living B.V.',
    country: 'Netherlands',
    flag: '🇳🇱',
    categoryInterest: 'Eco Furniture & Bamboo Craft',
    specificInquiry: 'Mencari produsen perlengkapan makan ramah lingkungan berbahan bambu laminasi dengan sertifikasi legalitas kayu (V-Legal/SVLK) untuk pasar retail HoReCa di Benelux.',
    targetVolume: '5.000 Set cutlery per pemesanan',
    incoterm: 'FOB',
    score: 82.0,
    status: 'HOT',
    pipelineStage: 'QUOTATION_REQUESTED',
    estimatedValueUsd: 16500,
    picAssigned: 'Febri',
    matchedIkm: 'UD Bambu Kriya BSD',
    matchedProduct: 'Eco-Friendly Bamboo Cutlery & Bento Set',
    timestamp: '24 Sep 2026, 09:10 WIB',
    contactWa: '+31 6 81234567',
    contactEmail: 'willem@rotterdamgreen.nl',
    notes: 'Telah berkunjung ke desk Disperindag Tangsel, meminta penjadwalan pitching business meeting resmi pada 15 Oktober di TEI 2026.'
  },
  {
    id: 'lead-04',
    source: 'wa_bot',
    buyerName: 'Kenji Takahashi',
    company: 'Kyoto Artisan Imports',
    country: 'Japan',
    flag: '🇯🇵',
    categoryInterest: 'Textile / Traditional Silk Batik',
    specificInquiry: 'Tertarik dengan syal sutra motif anggrek khas Tangsel dengan pewarna alami untuk butik kimono modern di Kyoto & Tokyo.',
    targetVolume: '200 Pcs per motif',
    incoterm: 'CIF',
    score: 78.0,
    status: 'WARM',
    pipelineStage: 'CONSULTATION',
    estimatedValueUsd: 18000,
    picAssigned: 'Febri',
    matchedIkm: 'CV Anggrek Lestari Tangsel',
    matchedProduct: 'Hand-drawn Silk Batik Scarf - Orchid Edition',
    timestamp: '22 Sep 2026, 14:20 WIB',
    contactWa: '+81 90 4321 8765',
    contactEmail: 'takahashi@kyotoartisan.jp',
    notes: 'Sedang meminta detail uji ketahanan luntur warna (colorfastness certificate) standar JIS.'
  },
  {
    id: 'lead-05',
    source: 'business_matching_cameroun',
    buyerName: 'Pauline Mballa',
    company: 'Atlantic Foodstuffs Yaoundé',
    country: 'Cameroon',
    flag: '🇨🇲',
    categoryInterest: 'Specialty Coffee / Robusta',
    specificInquiry: 'Kebutuhan biji kopi sangrai specialty Robusta untuk supply roastery lokal Afrika Tengah. Membutuhkan pengiriman sampel 5kg.',
    targetVolume: '2 Ton per pengiriman',
    incoterm: 'CIF',
    score: 69.5,
    status: 'WARM',
    pipelineStage: 'SIMULATION',
    estimatedValueUsd: 14500,
    picAssigned: 'Syaiful',
    matchedIkm: 'Koperasi Kopi Robusta Ciputat Mandiri',
    matchedProduct: 'Specialty Java Robusta Roasted Beans (1kg)',
    timestamp: '21 Sep 2026, 11:45 WIB',
    contactWa: '+237 6 99 87 65 43',
    contactEmail: 'pauline@atlanticfood.cm',
    notes: 'Syaiful sedang memverifikasi biaya kurir pengiriman sampel biji kopi ke Yaoundé via simulasi DHL.'
  },
  {
    id: 'lead-06',
    source: 'booth_visitor',
    buyerName: 'Michael Chang',
    company: 'Pacific Wholesale Logistics',
    country: 'United States',
    flag: '🇺🇸',
    categoryInterest: 'Ready-to-Eat Sauces',
    specificInquiry: 'Mencari sambal ikan roa kemasan pouch retort tahan lama untuk toko Asia di Pantai Barat AS.',
    targetVolume: '3.000 Pouch initial trial',
    incoterm: 'FOB',
    score: 55.0,
    status: 'COLD',
    pipelineStage: 'SIMULATION',
    estimatedValueUsd: 14000,
    picAssigned: 'Fahmi',
    matchedIkm: 'CV Dapoer Roa Bintaro',
    matchedProduct: 'Smoked Roa Fish Chili Paste (Retort Pouch 150g)',
    timestamp: '20 Sep 2026, 16:00 WIB',
    contactWa: '+1 415 555 0199',
    contactEmail: 'mchang@pacificwholesale.com',
    notes: 'Kendala: Belum ada izin FDA FCE/SID untuk pangan retort asam rendah. Disarankan re-audit kesiapan regulasi pangan AS.'
  }
];
