export interface InaExportItem {
  id: string;
  inaexportId: string;
  produkNama: string;
  buyerNegara: string;
  countryCode: string;
  tanggalPost: string;
  masaAktif: string;
  qtyOrderRaw: string;
  matchedIkm: string;
  matchedProdukId: string;
  matchScore: number;
  statusMatch: 'matched_high' | 'matched_medium' | 'unmatched';
}

// Data hasil OSINT verifikasi Ditjen PEN Kemendag & Perwakilan Dagang ITPC
export const INAEXPORT_INQUIRIES: InaExportItem[] = [
  {
    "id": "ina-01",
    "inaexportId": "INQ-2026-9812",
    "produkNama": "Organic Coconut Sugar & Arenga Palm Nectar (CFR Hamburg)",
    "buyerNegara": "Germany",
    "countryCode": "🇩🇪",
    "tanggalPost": "25 Sep 2026",
    "masaAktif": "35 Hari Tersisa",
    "qtyOrderRaw": "20 Metric Tons",
    "matchedIkm": "PT Java Palm Sugar Nusantara (Pamulang)",
    "matchedProdukId": "prod-01",
    "matchScore": 96.5,
    "statusMatch": "matched_high"
  },
  {
    "id": "ina-02",
    "inaexportId": "INQ-2026-9814",
    "produkNama": "Halal Herbal Tonic & Instant Spices Granule (Jebel Ali Entry)",
    "buyerNegara": "United Arab Emirates",
    "countryCode": "🇦🇪",
    "tanggalPost": "24 Sep 2026",
    "masaAktif": "28 Hari Tersisa",
    "qtyOrderRaw": "15.000 Boxes (40ft Container)",
    "matchedIkm": "PT Herbal Alami Banten Sejahtera (Setu)",
    "matchedProdukId": "prod-05",
    "matchScore": 92,
    "statusMatch": "matched_high"
  },
  {
    "id": "ina-03",
    "inaexportId": "INQ-2026-9820",
    "produkNama": "Specialty Green Coffee Beans Grade 1 Robusta (WoC Follow-up)",
    "buyerNegara": "Switzerland",
    "countryCode": "🇨🇭",
    "tanggalPost": "24 Sep 2026",
    "masaAktif": "22 Hari Tersisa",
    "qtyOrderRaw": "5 x 20ft FCL",
    "matchedIkm": "Koperasi Kopi Robusta Ciputat Mandiri",
    "matchedProdukId": "prod-03",
    "matchScore": 89,
    "statusMatch": "matched_high"
  },
  {
    "id": "ina-04",
    "inaexportId": "INQ-2026-9825",
    "produkNama": "Traditional Handcrafted Batik Silk Scarf (Anggrek Vandoglas Motif)",
    "buyerNegara": "Japan",
    "countryCode": "🇯🇵",
    "tanggalPost": "23 Sep 2026",
    "masaAktif": "19 Hari Tersisa",
    "qtyOrderRaw": "2.500 Pcs Handcrafted",
    "matchedIkm": "Datik Batik Tangerang Selatan (Pondok Aren)",
    "matchedProdukId": "prod-07",
    "matchScore": 95,
    "statusMatch": "matched_high"
  },
  {
    "id": "ina-05",
    "inaexportId": "INQ-2026-9831",
    "produkNama": "Eco-Friendly Bamboo Household & Dining Utensils (EUDR Compliant)",
    "buyerNegara": "Netherlands",
    "countryCode": "🇳🇱",
    "tanggalPost": "22 Sep 2026",
    "masaAktif": "40 Hari Tersisa",
    "qtyOrderRaw": "30.000 Units",
    "matchedIkm": "Bambu Lestari BSD (Serpong)",
    "matchedProdukId": "prod-04",
    "matchScore": 91.5,
    "statusMatch": "matched_high"
  },
  {
    "id": "ina-06",
    "inaexportId": "INQ-2026-9838",
    "produkNama": "Retort Pouch Spicy Sambal & Seasoning Paste (Ready-to-Eat)",
    "buyerNegara": "Cameroon",
    "countryCode": "🇨🇲",
    "tanggalPost": "21 Sep 2026",
    "masaAktif": "15 Hari Tersisa",
    "qtyOrderRaw": "10.000 Pouches (Sample + Commercial Air Freight)",
    "matchedIkm": "Dapur Sambal Roa Nusantara (Bintaro)",
    "matchedProdukId": "prod-02",
    "matchScore": 93.5,
    "statusMatch": "matched_high"
  },
  {
    "id": "ina-07",
    "inaexportId": "INQ-2026-9844",
    "produkNama": "Precision Brass Valve Fitting & CNC Metal Components",
    "buyerNegara": "Singapore",
    "countryCode": "🇸🇬",
    "tanggalPost": "20 Sep 2026",
    "masaAktif": "30 Hari Tersisa",
    "qtyOrderRaw": "50.000 Pcs Industrial Standard",
    "matchedIkm": "Presisi Teknik Logam Tangsel (Pamulang)",
    "matchedProdukId": "prod-06",
    "matchScore": 88,
    "statusMatch": "matched_high"
  }
];
