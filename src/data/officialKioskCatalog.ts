export type OfficialCatalogCategory = 'pangan' | 'non-pangan';

export interface OfficialKioskProduct {
  id: string;
  name: string;
  ownerName: string;
  businessName?: string;
  category: OfficialCatalogCategory;
  description: string;
  imageUrl: string;
  detailUrl: string;
  capacity?: string;
  market?: 'Ekspor' | 'Dalam Negeri' | 'Terkurasi';
  curatedAt?: string;
}

/**
 * Verified showcase sourced from the official Rumah Kurasi Tangerang Selatan
 * product catalogue. Keep this list factual: no synthetic HS codes, FOB prices,
 * certifications, capacities or business identities are invented here.
 */
export const OFFICIAL_KIOSK_PRODUCTS: OfficialKioskProduct[] = [
  {
    id: 'rk-489',
    name: 'Keypops Popcorn',
    ownerName: 'Ajeng Isyadewi RA',
    category: 'pangan',
    description: 'Camilan popcorn terkurasi Rumah Kurasi Tangsel dengan kombinasi rasa manis dan gurih untuk konsumsi praktis.',
    imageUrl: 'https://clouddiskominfo.tangerangselatankota.go.id/kurasi/produk/1784884584_6a632d6827bbf.jpeg',
    detailUrl: 'https://kurasi.tangerangselatankota.go.id/produk/489',
    market: 'Terkurasi',
    curatedAt: '24 Jul 2026'
  },
  {
    id: 'rk-488',
    name: 'Lumpia Crispy Pedas Asin',
    ownerName: 'Kartika Bela',
    category: 'pangan',
    description: 'Lumpia crispy rasa pedas asin yang tercatat sebagai produk terkurasi pada katalog resmi Rumah Kurasi Tangsel.',
    imageUrl: 'https://clouddiskominfo.tangerangselatankota.go.id/kurasi/produk/1784883816_6a632a686440a.jpeg',
    detailUrl: 'https://kurasi.tangerangselatankota.go.id/produk/488',
    market: 'Terkurasi',
    curatedAt: '24 Jul 2026'
  },
  {
    id: 'rk-484',
    name: 'Emping Jagung Crispy Jagung Bakar',
    ownerName: 'Poniyem',
    category: 'pangan',
    description: 'Emping jagung crispy varian jagung bakar yang tercatat pada katalog produk resmi Rumah Kurasi Tangsel.',
    imageUrl: 'https://clouddiskominfo.tangerangselatankota.go.id/kurasi/produk/1784546791_6a5e05e7310cc.jpg',
    detailUrl: 'https://kurasi.tangerangselatankota.go.id/produk/484',
    market: 'Terkurasi',
    curatedAt: '20 Jul 2026'
  },
  {
    id: 'rk-480',
    name: 'Maksa Makaroni Fish and Cheese',
    ownerName: 'Selamet Ibrohim',
    category: 'pangan',
    description: 'Produk snack makaroni fish and cheese yang ditampilkan pada katalog terkurasi resmi Tangerang Selatan.',
    imageUrl: 'https://clouddiskominfo.tangerangselatankota.go.id/kurasi/produk/1784273314_6a59d9a2ec545.jpeg',
    detailUrl: 'https://kurasi.tangerangselatankota.go.id/produk/480',
    market: 'Terkurasi',
    curatedAt: '17 Jul 2026'
  },
  {
    id: 'rk-477',
    name: 'ALIMA FOOD NUSANTARA',
    ownerName: 'Nurmugiyono',
    category: 'pangan',
    description: 'Kopi tubruk Mozza 7 dari biji kopi Indonesia yang tercantum pada katalog resmi Rumah Kurasi Tangsel.',
    imageUrl: 'https://clouddiskominfo.tangerangselatankota.go.id/kurasi/produk/1782270679_6a3b4ad7c5d0e.jpg',
    detailUrl: 'https://kurasi.tangerangselatankota.go.id/produk/477',
    market: 'Terkurasi',
    curatedAt: '24 Jun 2026'
  },
  {
    id: 'rk-381',
    name: 'Heat and Eat Dendeng Balado',
    ownerName: 'Max Mandias',
    category: 'pangan',
    description: 'Dendeng balado gaya Padang siap santap; produk resmi Rumah Kurasi Tangsel.',
    imageUrl: 'https://clouddiskominfo.tangerangselatankota.go.id/kurasi/produk/1760072755_68e894339bced.jpg',
    detailUrl: 'https://kurasi.tangerangselatankota.go.id/produk/381',
    capacity: '50.000 pcs/bulan',
    market: 'Dalam Negeri'
  },
  {
    id: 'rk-393',
    name: 'Zara Silk Dagu',
    ownerName: 'Shalia Andhita Puteri',
    category: 'non-pangan',
    description: 'Mukena berbahan premium silk dengan detail lace dan mini prayer mat; pada katalog resmi ditandai untuk pasar ekspor.',
    imageUrl: 'https://clouddiskominfo.tangerangselatankota.go.id/kurasi/produk/1763696722_691fe052f06d4.jpg',
    detailUrl: 'https://kurasi.tangerangselatankota.go.id/produk/393',
    capacity: '100 pcs',
    market: 'Ekspor'
  },
  {
    id: 'rk-392',
    name: 'Zara Silk Premium',
    ownerName: 'Shalia Andhita Puteri',
    category: 'non-pangan',
    description: 'Mukena premium silk dengan detail lace dan pilihan warna, ditampilkan pada katalog resmi Rumah Kurasi Tangsel.',
    imageUrl: 'https://clouddiskominfo.tangerangselatankota.go.id/kurasi/produk/1763696439_691fdf37d1b23.jpg',
    detailUrl: 'https://kurasi.tangerangselatankota.go.id/produk/392',
    market: 'Terkurasi'
  },
  {
    id: 'rk-375',
    name: 'Kayu Manis',
    ownerName: 'Nurazlinda',
    businessName: 'Putra Bungsu Harapan Berjaya',
    category: 'non-pangan',
    description: 'Komoditas kayu manis aromatik dari Putra Bungsu Harapan Berjaya; tercatat untuk pasar ekspor pada Rumah Kurasi Tangsel.',
    imageUrl: 'https://clouddiskominfo.tangerangselatankota.go.id/kurasi/produk/1759292386_68dcabe296de6.jpg',
    detailUrl: 'https://kurasi.tangerangselatankota.go.id/produk/375',
    capacity: '5 × 1 kg',
    market: 'Ekspor'
  },
  {
    id: 'rk-371',
    name: 'Minyak Nilam',
    ownerName: 'Nurazlinda',
    businessName: 'Putra Bungsu Harapan Berjaya',
    category: 'non-pangan',
    description: 'Minyak atsiri nilam (Pogostemon cablin) yang tercatat sebagai komoditas pasar ekspor pada Rumah Kurasi Tangsel.',
    imageUrl: 'https://clouddiskominfo.tangerangselatankota.go.id/kurasi/produk/1759291696_68dca930ad9f5.jpg',
    detailUrl: 'https://kurasi.tangerangselatankota.go.id/produk/371',
    capacity: '200 kg',
    market: 'Ekspor'
  },
  {
    id: 'rk-367',
    name: 'Cosmar Milky Shield Body Serum',
    ownerName: 'Michael Ongko Wijaya',
    category: 'non-pangan',
    description: 'Body serum yang tercatat pada katalog resmi Rumah Kurasi Tangsel.',
    imageUrl: 'https://clouddiskominfo.tangerangselatankota.go.id/kurasi/produk/1759222612_68db9b54da918.jpg',
    detailUrl: 'https://kurasi.tangerangselatankota.go.id/produk/367',
    market: 'Terkurasi'
  }
];
