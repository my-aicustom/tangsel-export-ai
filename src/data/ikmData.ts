export interface ProductItem {
  id: string;
  name: string;
  category: 'food_beverage' | 'fashion_kerajinan' | 'furniture_dekor' | 'manufaktur';
  hsCode: string;
  capacityPerMonth: string;
  moq: string;
  fobPriceUsd: number;
  certifications: string[];
  dimensionsCm: { p: number; l: number; t: number; weightKg: number };
  description: string;
  photoUrl: string;
}

export interface IkmItem {
  id: string;
  namaUsaha: string;
  brand: string;
  kecamatan: 'Ciputat' | 'Ciputat Timur' | 'Pamulang' | 'Pondok Aren' | 'Serpong' | 'Serpong Utara' | 'Setu';
  alamat: string;
  kontakNama: string;
  kontakWa: string;
  email: string;
  grade: 'A' | 'B' | 'C';
  statusVerifikasi: 'siap_ekspor' | 'terverifikasi' | 'belum';
  nib: string;
  summary: string;
  gapAnalysis: string[];
  products: ProductItem[];
}

export const IKM_DATABASE: IkmItem[] = [
  {
    id: 'ikm-01',
    namaUsaha: 'PT Java Palm Sugar Nusantara',
    brand: 'Nusantara Sweet Gold',
    kecamatan: 'Pamulang',
    alamat: 'Jl. Surya Kencana No. 45, Pamulang Barat',
    kontakNama: 'Bambang Sudarsono',
    kontakWa: '081298881234',
    email: 'export@javapalmsugar.id',
    grade: 'A',
    statusVerifikasi: 'siap_ekspor',
    nib: '9120004510291',
    summary: 'Produsen gula aren kristal organik premium dengan sertifikasi ekspor lengkap untuk pasar Eropa dan Timur Tengah.',
    gapAnalysis: [
      'Semua sertifikasi utama terpenuhi (Halal, USDA Organic, HACCP, FDA).',
      'Rekomendasi: Tambahkan uji residu pestisida tahunan untuk buyer Jerman.'
    ],
    products: [
      {
        id: 'prod-01',
        name: 'Organic Arenga Palm Sugar (Granule 500g)',
        category: 'food_beverage',
        hsCode: '1702.90.99',
        capacityPerMonth: '25 Ton',
        moq: '1.000 Pack (500 kg)',
        fobPriceUsd: 3.80,
        certifications: ['Halal BPJPH', 'USDA Organic', 'EU Organic', 'HACCP', 'FDA Reg'],
        dimensionsCm: { p: 20, l: 12, t: 6, weightKg: 0.52 },
        description: 'Gula aren murni indeks glikemik rendah, dikeringkan dengan higienis dan dikemas foil vakum kedap udara.',
        photoUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80'
      }
    ]
  },
  {
    id: 'ikm-02',
    namaUsaha: 'CV Anggrek Lestari Tangsel',
    brand: 'Batik Pesona Anggrek',
    kecamatan: 'Ciputat Timur',
    alamat: 'Jl. Ir. H. Juanda No. 88, Cireundeu',
    kontakNama: 'Ibu Ratna Dewi',
    kontakWa: '08118002931',
    email: 'info@pesonanggrek.com',
    grade: 'A',
    statusVerifikasi: 'siap_ekspor',
    nib: '8120301140552',
    summary: 'Spesialis kain dan busana batik tulis bermotif ikon anggrek van douglas khas Tangerang Selatan dengan pewarna alami.',
    gapAnalysis: [
      'Legalitas lengkap, telah berpengalaman ekspor parsial ke Singapura.',
      'Sertifikat SNI Batik dan Eco-textile sudah aktif.'
    ],
    products: [
      {
        id: 'prod-02',
        name: 'Hand-drawn Silk Batik Scarf - Orchid Edition',
        category: 'fashion_kerajinan',
        hsCode: '6214.10.00',
        capacityPerMonth: '800 Pcs',
        moq: '50 Pcs',
        fobPriceUsd: 28.50,
        certifications: ['SNI Batik Mark', 'OEKO-TEX Standard 100', 'Halal Lifestyle'],
        dimensionsCm: { p: 25, l: 15, t: 3, weightKg: 0.25 },
        description: 'Syal sutra asli motif anggrek Tangerang Selatan dengan pewarna ramah lingkungan dan tepian jahit tangan halus.',
        photoUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&auto=format&fit=crop&q=80'
      }
    ]
  },
  {
    id: 'ikm-03',
    namaUsaha: 'Koperasi Kopi Robusta Ciputat Mandiri',
    brand: 'Ciputat Roast Works',
    kecamatan: 'Ciputat',
    alamat: 'Jl. Dewi Sartika No. 12, Ciputat',
    kontakNama: 'Ahmad Fauzi',
    kontakWa: '081310928374',
    email: 'contact@ciputatroast.id',
    grade: 'B',
    statusVerifikasi: 'terverifikasi',
    nib: '0220108920119',
    summary: 'Koperasi pengolah specialty fine robusta dan blend rempah dengan profil aroma dark cocoa dan rempah tropis.',
    gapAnalysis: [
      'Legalitas BPOM MD & Halal BPJPH lengkap.',
      'GAP UTAMA: Belum memiliki dokumen Uji Bebas Deforestasi (EUDR Traceability GPS coordinates) untuk masuk pasar Uni Eropa.',
      'Kapasitas kemasan 1kg foil dengan one-way valve sudah standar ekspor.'
    ],
    products: [
      {
        id: 'prod-03',
        name: 'Specialty Java Robusta Roasted Beans (1kg)',
        category: 'food_beverage',
        hsCode: '0901.21.00',
        capacityPerMonth: '10 Ton',
        moq: '200 Kg',
        fobPriceUsd: 9.50,
        certifications: ['Halal BPJPH', 'BPOM MD', 'Q-Robusta Graded 84+'],
        dimensionsCm: { p: 30, l: 18, t: 10, weightKg: 1.05 },
        description: 'Biji kopi sangrai specialty robusta proses honey basah, acidity rendah dengan aroma cokelat karamel.',
        photoUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&auto=format&fit=crop&q=80'
      }
    ]
  },
  {
    id: 'ikm-04',
    namaUsaha: 'UD Bambu Kriya BSD',
    brand: 'Serpong Bamboo Craft',
    kecamatan: 'Serpong',
    alamat: 'Kawasan Industri Taman Tekno Blok F1, Serpong',
    kontakNama: 'Hendra Setiawan',
    kontakWa: '08177263910',
    email: 'sales@serpongbamboo.com',
    grade: 'B',
    statusVerifikasi: 'terverifikasi',
    nib: '1289004819203',
    summary: 'Perajin perabot dan peralatan rumah tangga berbahan bambu laminasi dengan perlakuan anti-jamur modern.',
    gapAnalysis: [
      'Memiliki sertifikasi V-Legal / SVLK untuk industri hasil hutan bukan kayu.',
      'GAP: Perlu update sertifikat Fumigasi (Phytosanitary Certificate) untuk pengapalan ke Australia/Amerika.'
    ],
    products: [
      {
        id: 'prod-04',
        name: 'Eco-Friendly Bamboo Cutlery & Bento Set',
        category: 'furniture_dekor',
        hsCode: '4419.19.00',
        capacityPerMonth: '5.000 Set',
        moq: '500 Set',
        fobPriceUsd: 6.20,
        certifications: ['SVLK V-Legal', 'Food Grade Test (SGS)'],
        dimensionsCm: { p: 24, l: 12, t: 5, weightKg: 0.35 },
        description: 'Set sendok garpu sumpit dan wadah bekal bambu laminasi food-safe bebas bahan kimia berbahaya.',
        photoUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80'
      }
    ]
  },
  {
    id: 'ikm-05',
    namaUsaha: 'PT Herbal Alami Banten Sejahtera',
    brand: 'HerbaTangsel',
    kecamatan: 'Serpong Utara',
    alamat: 'Ruko Jalur Sutera Timur No. 3A, Serpong Utara',
    kontakNama: 'Dr. Diana Kusuma',
    kontakWa: '081234918273',
    email: 'diana@herbatangsel.co.id',
    grade: 'A',
    statusVerifikasi: 'siap_ekspor',
    nib: '9120019283741',
    summary: 'Industri ekstrak herbal siap seduh berbasis jahe merah, temulawak, dan sereh dengan teknologi spray-drying.',
    gapAnalysis: [
      'Sertifikasi lengkap (BPOM TR, Halal, GMP/CPOTB).',
      'Siap untuk pasar Timur Tengah, Kamerun, dan ASEAN.'
    ],
    products: [
      {
        id: 'prod-05',
        name: 'Instant Red Ginger Extract (Granule Sachet 20x15g)',
        category: 'food_beverage',
        hsCode: '2106.90.99',
        capacityPerMonth: '50.000 Box',
        moq: '1.000 Box',
        fobPriceUsd: 4.50,
        certifications: ['Halal BPJPH', 'BPOM TR', 'GMP CPOTB', 'ISO 22000'],
        dimensionsCm: { p: 18, l: 14, t: 8, weightKg: 0.38 },
        description: 'Minuman serbuk sari jahe merah dengan gula aren dan rempah alami, mudah larut dalam air hangat.',
        photoUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80'
      }
    ]
  },
  {
    id: 'ikm-06',
    namaUsaha: 'CV Dapoer Roa Bintaro',
    brand: 'Sambal Oma Bintaro',
    kecamatan: 'Pondok Aren',
    alamat: 'Jl. Bintaro Utama Sektor 5 No. 19, Pondok Aren',
    kontakNama: 'Farhan Maulana',
    kontakWa: '08159982314',
    email: 'order@omabintaro.id',
    grade: 'B',
    statusVerifikasi: 'terverifikasi',
    nib: '0239019283719',
    summary: 'Produsen aneka sambal Nusantara kemasan pouch retort pouch tahan 18 bulan suhu ruang tanpa pengawet sintesis.',
    gapAnalysis: [
      'Memiliki izin edar BPOM MD dan Halal.',
      'GAP: Perlu validasi uji sterilisasi panas (F0 value) untuk sertifikat FDA Acidified/Low-Acid Canned Foods (FCE/SID).'
    ],
    products: [
      {
        id: 'prod-06',
        name: 'Smoked Roa Fish Chili Paste (Retort Pouch 150g)',
        category: 'food_beverage',
        hsCode: '2103.90.19',
        capacityPerMonth: '15.000 Pouch',
        moq: '600 Pouch',
        fobPriceUsd: 2.20,
        certifications: ['BPOM MD', 'Halal BPJPH'],
        dimensionsCm: { p: 16, l: 11, t: 3, weightKg: 0.18 },
        description: 'Sambal ikan roa asap khas Bintaro diproses dengan autoclave retort bertekanan, awet dan aman dibawa bepergian.',
        photoUrl: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&auto=format&fit=crop&q=80'
      }
    ]
  },
  {
    id: 'ikm-07',
    namaUsaha: 'Keripik Singkong & Pisang Mak Itam',
    brand: 'Mak Itam Crispy',
    kecamatan: 'Setu',
    alamat: 'Jl. Raya Puspiptek Gg. Makam No. 7, Setu',
    kontakNama: 'Ibu Siti Maryam',
    kontakWa: '085711223344',
    email: 'makitam.snack@gmail.com',
    grade: 'C',
    statusVerifikasi: 'belum',
    nib: '1928301928301',
    summary: 'Produsen olahan keripik pisang tanduk dan singkong renyah aneka rasa binaan RT setempat di Setu.',
    gapAnalysis: [
      'Masih mengantongi izin P-IRT lokal, belum BPOM MD.',
      'Kemasan masih plastik PP biasa tanpa barrier aluminium foil.',
      'Belum memiliki uji nutrition facts dan label multilingual.',
      'Status: Masuk program inkubasi Disperindag Tangsel 2026.'
    ],
    products: [
      {
        id: 'prod-07',
        name: 'Crispy Sweet Banana Chips (250g)',
        category: 'food_beverage',
        hsCode: '2008.99.10',
        capacityPerMonth: '1.500 Pcs',
        moq: '200 Pcs',
        fobPriceUsd: 1.10,
        certifications: ['P-IRT', 'Halal (Proses Sidang)'],
        dimensionsCm: { p: 22, l: 14, t: 5, weightKg: 0.27 },
        description: 'Keripik pisang manis gurih khas Tangsel digoreng dengan minyak kelapa berkualitas.',
        photoUrl: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281699?w=600&auto=format&fit=crop&q=80'
      }
    ]
  },
  {
    id: 'ikm-08',
    namaUsaha: 'Bengkel Presisi Pamulang Teknik',
    brand: 'Pamulang Precision Brass',
    kecamatan: 'Pamulang',
    alamat: 'Jl. Pajajaran No. 102, Pamulang Barat',
    kontakNama: 'Ir. Joko Wahyudi',
    kontakWa: '081299881122',
    email: 'joko@pamulangteknik.co.id',
    grade: 'B',
    statusVerifikasi: 'terverifikasi',
    nib: '8192830192812',
    summary: 'Manufaktur komponen kuningan, fitting pipa gas presisi, dan nozzle mesin industri UMKM.',
    gapAnalysis: [
      'Sertifikasi ISO 9001:2015 aktif.',
      'GAP: Perlu pengujian sertifikasi RoHS / Lead-Free Certificate untuk kepatuhan pasar industri Uni Eropa.'
    ],
    products: [
      {
        id: 'prod-08',
        name: 'Precision Brass Threaded Fitting 1/2 Inch (Box of 50)',
        category: 'manufaktur',
        hsCode: '7412.20.00',
        capacityPerMonth: '20.000 Pcs',
        moq: '1.000 Pcs',
        fobPriceUsd: 145.00,
        certifications: ['ISO 9001:2015', 'TKDN 62%'],
        dimensionsCm: { p: 28, l: 20, t: 15, weightKg: 8.50 },
        description: 'Fitting ulir kuningan tahan tekanan tinggi untuk instalasi air bersih dan sistem manifold gas.',
        photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80'
      }
    ]
  }
];
