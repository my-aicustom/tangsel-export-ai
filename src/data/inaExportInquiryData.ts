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

export const INAEXPORT_INQUIRIES: InaExportItem[] = [
  {
    id: 'ina-01',
    inaexportId: 'INQ-2026-9812',
    produkNama: 'Organic Coconut Sugar & Arenga Palm Nectar',
    buyerNegara: 'Germany',
    countryCode: '🇩🇪',
    tanggalPost: '24 Sep 2026',
    masaAktif: '30 Hari Tersisa',
    qtyOrderRaw: '20 Metric Tons',
    matchedIkm: 'PT Java Palm Sugar Nusantara',
    matchedProdukId: 'prod-01',
    matchScore: 94.0,
    statusMatch: 'matched_high'
  },
  {
    id: 'ina-02',
    inaexportId: 'INQ-2026-9814',
    produkNama: 'Instant Herbal Drinks Granule (Ginger, Curcuma)',
    buyerNegara: 'United Arab Emirates',
    countryCode: '🇦🇪',
    tanggalPost: '23 Sep 2026',
    masaAktif: '25 Hari Tersisa',
    qtyOrderRaw: '15.000 Boxes',
    matchedIkm: 'PT Herbal Alami Banten Sejahtera',
    matchedProdukId: 'prod-05',
    matchScore: 90.5,
    statusMatch: 'matched_high'
  },
  {
    id: 'ina-03',
    inaexportId: 'INQ-2026-9820',
    produkNama: 'Specialty Green Coffee Beans Grade 1 Robusta',
    buyerNegara: 'Egypt',
    countryCode: '🇪🇬',
    tanggalPost: '22 Sep 2026',
    masaAktif: '18 Hari Tersisa',
    qtyOrderRaw: '5 x 20ft FCL',
    matchedIkm: 'Koperasi Kopi Robusta Ciputat Mandiri',
    matchedProdukId: 'prod-03',
    matchScore: 84.5,
    statusMatch: 'matched_high'
  },
  {
    id: 'ina-04',
    inaexportId: 'INQ-2026-9825',
    produkNama: 'Eco-friendly Bamboo Tableware & Kitchenware',
    buyerNegara: 'Australia',
    countryCode: '🇦🇺',
    tanggalPost: '21 Sep 2026',
    masaAktif: '20 Hari Tersisa',
    qtyOrderRaw: '10.000 Units',
    matchedIkm: 'UD Bambu Kriya BSD',
    matchedProdukId: 'prod-04',
    matchScore: 82.0,
    statusMatch: 'matched_high'
  },
  {
    id: 'ina-05',
    inaexportId: 'INQ-2026-9833',
    produkNama: 'Traditional Handwoven Batik Fabrics & Shawls',
    buyerNegara: 'Singapore',
    countryCode: '🇸🇬',
    tanggalPost: '20 Sep 2026',
    masaAktif: '15 Hari Tersisa',
    qtyOrderRaw: '500 Pcs',
    matchedIkm: 'CV Anggrek Lestari Tangsel',
    matchedProdukId: 'prod-02',
    matchScore: 79.5,
    statusMatch: 'matched_medium'
  },
  {
    id: 'ina-06',
    inaexportId: 'INQ-2026-9840',
    produkNama: 'Spicy Fish Paste in Vacuum Retort Pouches',
    buyerNegara: 'Malaysia',
    countryCode: '🇲🇾',
    tanggalPost: '19 Sep 2026',
    masaAktif: '12 Hari Tersisa',
    qtyOrderRaw: '5.000 Pouches',
    matchedIkm: 'CV Dapoer Roa Bintaro',
    matchedProdukId: 'prod-06',
    matchScore: 71.0,
    statusMatch: 'matched_medium'
  }
];
