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
    "id": "ikm-01",
    "namaUsaha": "PT Java Palm Sugar Nusantara",
    "brand": "Nusantara Sweet Gold",
    "kecamatan": "Pamulang",
    "alamat": "Jl. Surya Kencana No. 45, Pamulang Barat",
    "kontakNama": "Bambang Sudarsono",
    "kontakWa": "081298881234",
    "email": "export@javapalmsugar.id",
    "grade": "A",
    "statusVerifikasi": "siap_ekspor",
    "nib": "9120004510291",
    "summary": "Produsen gula aren kristal organik premium dengan sertifikasi ekspor lengkap untuk pasar Eropa dan Timur Tengah.",
    "gapAnalysis": [
      "Semua sertifikasi utama terpenuhi (Halal, USDA Organic, HACCP, FDA).",
      "Rekomendasi: Lakukan audit lab residu tahunan berkelanjutan."
    ],
    "products": [
      {
        "id": "prod-01",
        "name": "Organic Arenga Palm Sugar (Granule 500g)",
        "category": "food_beverage",
        "hsCode": "1702.90.99",
        "capacityPerMonth": "25 Ton",
        "moq": "1.000 Pack (500 kg)",
        "fobPriceUsd": 3.8,
        "certifications": [
          "Halal BPJPH",
          "USDA Organic",
          "EU Organic",
          "HACCP",
          "FDA Reg"
        ],
        "dimensionsCm": {
          "p": 20,
          "l": 12,
          "t": 6,
          "weightKg": 0.52
        },
        "description": "Gula aren murni kristal kadar air <1.5%, indeks glikemik rendah, cocok untuk konsumsi ritel dan horeka internasional.",
        "photoUrl": "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=600&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "ikm-02",
    "namaUsaha": "Presisi Teknik Logam Tangsel",
    "brand": "Pamulang Precision Brass",
    "kecamatan": "Pamulang",
    "alamat": "Kawasan Industri Pergudangan Taman Tekno Blok G No. 12, Pamulang",
    "kontakNama": "Ir. Hendra Wijaya",
    "kontakWa": "081311223344",
    "email": "sales@pamulangbrass.com",
    "grade": "A",
    "statusVerifikasi": "siap_ekspor",
    "nib": "9120108849201",
    "summary": "Spesialis bubut presisi CNC dan pengecoran kuningan untuk komponen katup industri, water meter, dan pipa gas standar ASTM/JIS.",
    "gapAnalysis": [
      "ISO 9001:2015 aktif, sertifikat bahan RoHS compliant.",
      "Perlu sertifikasi CE Marking untuk penetrasi pasar Jerman."
    ],
    "products": [
      {
        "id": "prod-02",
        "name": "High Precision Brass Ball Valve Fitting 1/2 Inch",
        "category": "manufaktur",
        "hsCode": "8481.80.99",
        "capacityPerMonth": "50.000 Pcs",
        "moq": "1.000 Pcs",
        "fobPriceUsd": 2.9,
        "certifications": [
          "ISO 9001:2015",
          "RoHS Compliance",
          "SNI 0111"
        ],
        "dimensionsCm": {
          "p": 8,
          "l": 5,
          "t": 4,
          "weightKg": 0.22
        },
        "description": "Fitting katup bola kuningan tempa tahan tekanan 600 WOG dengan finishing poles electroplated anti-karat.",
        "photoUrl": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "ikm-03",
    "namaUsaha": "CV Banten Organik Virgin Coconut Oil",
    "brand": "PureBanten VCO",
    "kecamatan": "Pamulang",
    "alamat": "Jl. Pajajaran No. 18, Pamulang Timur",
    "kontakNama": "Siti Aminah, S.TP",
    "kontakWa": "085711229988",
    "email": "info@purebantenvco.id",
    "grade": "A",
    "statusVerifikasi": "siap_ekspor",
    "nib": "9120203348192",
    "summary": "Pabrikasi Cold-Pressed Virgin Coconut Oil (VCO) grade kosmetik & farmasi dengan kadar asam laurat 52%.",
    "gapAnalysis": [
      "Sertifikat Halal dan BPOM MD aktif.",
      "Membutuhkan penambahan uji residu lab Eurofins untuk ekspor Prancis."
    ],
    "products": [
      {
        "id": "prod-03",
        "name": "Cold Pressed Virgin Coconut Oil 1000ml (Food & Cosmetic Grade)",
        "category": "food_beverage",
        "hsCode": "1513.11.00",
        "capacityPerMonth": "15.000 Liter",
        "moq": "500 Liter",
        "fobPriceUsd": 6.2,
        "certifications": [
          "Halal BPJPH",
          "BPOM MD",
          "HACCP",
          "GMP"
        ],
        "dimensionsCm": {
          "p": 10,
          "l": 10,
          "t": 26,
          "weightKg": 1.05
        },
        "description": "Minyak kelapa murni tanpa pemanasan, aroma kelapa segar alami, kadar air <0.05%, jernih kristal.",
        "photoUrl": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "ikm-04",
    "namaUsaha": "CV Kriya Perak Nusantara Pamulang",
    "brand": "Pamulang Silverworks",
    "kecamatan": "Pamulang",
    "alamat": "Kompleks Reni Jaya Blok AC No. 7, Pamulang Barat",
    "kontakNama": "Ahmad Faisal",
    "kontakWa": "081807765544",
    "email": "faisal@pamulangsilver.com",
    "grade": "B",
    "statusVerifikasi": "terverifikasi",
    "nib": "9120309918234",
    "summary": "Pengrajin perhiasan perak filigree 925 dan mutiara air tawar dengan ukiran etnik kontemporer.",
    "gapAnalysis": [
      "Sertifikat kadar perak 925 Balai Kerajinan aktif.",
      "Perlu perbaikan kemasan display ritel eco-friendly."
    ],
    "products": [
      {
        "id": "prod-04",
        "name": "Handmade 925 Sterling Silver Brooch - Orchid Series",
        "category": "fashion_kerajinan",
        "hsCode": "7113.11.00",
        "capacityPerMonth": "1.200 Pcs",
        "moq": "50 Pcs",
        "fobPriceUsd": 18.5,
        "certifications": [
          "Sertifikat Uji Kadar Perak 92.5%",
          "Kemenkumham Hak Cipta"
        ],
        "dimensionsCm": {
          "p": 9,
          "l": 9,
          "t": 4,
          "weightKg": 0.08
        },
        "description": "Bros perak murni 925 teknik filigree buatan tangan dengan mutiara budidaya dan lapisan rhodium anti-kusam.",
        "photoUrl": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "ikm-05",
    "namaUsaha": "Koperasi Kopi Robusta Ciputat Mandiri",
    "brand": "Kopi Blandongan Ciputat",
    "kecamatan": "Ciputat",
    "alamat": "Jl. Dewi Sartika No. 102, Cipayung, Ciputat",
    "kontakNama": "Dedi Kurniawan",
    "kontakWa": "081399887766",
    "email": "kopi@ciputatmandiri.id",
    "grade": "A",
    "statusVerifikasi": "siap_ekspor",
    "nib": "8120104499120",
    "summary": "Kolektif roastery dan petani kopi specialty Banten. Roasting profil dark/medium untuk kopi espresso dan cold brew.",
    "gapAnalysis": [
      "SCA Cupping Score 84.5 terpenuhi.",
      "Sertifikat Organik ICERT aktif. Siap untuk kontrak FCL pameran TEI."
    ],
    "products": [
      {
        "id": "prod-05",
        "name": "Specialty Robusta Green Beans Grade 1 Fine (Jute Bag 60kg)",
        "category": "food_beverage",
        "hsCode": "0901.11.10",
        "capacityPerMonth": "40 Ton",
        "moq": "1.200 kg (20 Bag)",
        "fobPriceUsd": 4.1,
        "certifications": [
          "Specialty Coffee SCA Score 84.5",
          "Halal BPJPH",
          "Barantan Fitosanitari"
        ],
        "dimensionsCm": {
          "p": 90,
          "l": 60,
          "t": 30,
          "weightKg": 60.5
        },
        "description": "Biji kopi robusta petik merah single origin lereng Banten, kadar air 11.8%, defect <5%, aroma cokelat karamel.",
        "photoUrl": "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "ikm-06",
    "namaUsaha": "CV Mahagoni Kencana Ciputat",
    "brand": "Blandongan Wood Craft",
    "kecamatan": "Ciputat",
    "alamat": "Jl. RE Martadinata No. 55, Cipayung, Ciputat",
    "kontakNama": "Gunawan Prasetyo",
    "kontakWa": "081288990011",
    "email": "craft@mahagoni.co.id",
    "grade": "A",
    "statusVerifikasi": "siap_ekspor",
    "nib": "8120205519283",
    "summary": "Produsen perabot dapur dan homeware kayu mahoni dan jati legal bersertifikat SVLK/V-Legal.",
    "gapAnalysis": [
      "SVLK (Sistem Verifikasi Legalitas Kayu) 100% aktif.",
      "Uji food-grade mineral oil lolos standar FDA US."
    ],
    "products": [
      {
        "id": "prod-06",
        "name": "Solid Teak Wood Dining Board & Cutlery Set (Food Grade)",
        "category": "furniture_dekor",
        "hsCode": "4419.90.00",
        "capacityPerMonth": "5.000 Set",
        "moq": "200 Set",
        "fobPriceUsd": 12.8,
        "certifications": [
          "V-Legal / SVLK",
          "FDA Food Contact Safe",
          "FSC Controlled"
        ],
        "dimensionsCm": {
          "p": 38,
          "l": 22,
          "t": 3,
          "weightKg": 0.85
        },
        "description": "Talenan saji kayu jati perhutani tanpa sambungan, difinishing beeswax alami ramah lingkungan tahan jamur.",
        "photoUrl": "https://images.unsplash.com/photo-1590736969955-71cc94801759?w=600&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "ikm-07",
    "namaUsaha": "PT Sentosa Keramik Hias Ciputat",
    "brand": "TerraCiputat",
    "kecamatan": "Ciputat",
    "alamat": "Jl. Ki Hajar Dewantara No. 24, Sawah, Ciputat",
    "kontakNama": "Maya Indriyani",
    "kontakWa": "087799112233",
    "email": "maya@terraciputat.com",
    "grade": "B",
    "statusVerifikasi": "terverifikasi",
    "nib": "8120306628194",
    "summary": "Studio keramik artistik dan vas gerabah terracotta tahan cuaca untuk hotel dan dekorasi lanskap tropis.",
    "gapAnalysis": [
      "Pengepakan krat kayu bersertifikasi ISPM 15 aktif.",
      "Perlu uji ketahanan drop test untuk kargo laut jarak jauh."
    ],
    "products": [
      {
        "id": "prod-07",
        "name": "Artisan Terracotta Planter Vase - Nordic Matte Glaze",
        "category": "furniture_dekor",
        "hsCode": "6913.90.00",
        "capacityPerMonth": "3.000 Pcs",
        "moq": "150 Pcs",
        "fobPriceUsd": 14.5,
        "certifications": [
          "SNI Keramik Halus",
          "ISPM 15 Packing Certificate"
        ],
        "dimensionsCm": {
          "p": 28,
          "l": 28,
          "t": 40,
          "weightKg": 4.2
        },
        "description": "Pot gerabah tanah liat pembakaran 1200C dengan lapisan glasir matte anti-lumut untuk interior premium.",
        "photoUrl": "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "ikm-08",
    "namaUsaha": "UD Berkah Madu Hutan Ciputat",
    "brand": "Banten Wild Honey",
    "kecamatan": "Ciputat",
    "alamat": "Jl. Siliwangi No. 89, Pondok Benda, Ciputat",
    "kontakNama": "H. Suryadi",
    "kontakWa": "081277665544",
    "email": "info@bantenwildhoney.com",
    "grade": "B",
    "statusVerifikasi": "terverifikasi",
    "nib": "8120407739281",
    "summary": "Pengepul dan pemroses madu hutan liar murni Apis dorsata hutan Ujung Kulon dengan kadar air terkontrol 18%.",
    "gapAnalysis": [
      "Uji keaslian lab enzim diastase dan uji gula C3/C4 lolos.",
      "Perlu kemasan toples kaca dengan seal induksi tamper-proof."
    ],
    "products": [
      {
        "id": "prod-08",
        "name": "Raw Forest Wild Honey (Apis Dorsata) 500g Jar",
        "category": "food_beverage",
        "hsCode": "0409.00.00",
        "capacityPerMonth": "8.000 Jar",
        "moq": "300 Jar",
        "fobPriceUsd": 5.4,
        "certifications": [
          "Halal BPJPH",
          "BPOM MD",
          "Uji Lab Diastase Number > 8"
        ],
        "dimensionsCm": {
          "p": 9,
          "l": 9,
          "t": 14,
          "weightKg": 0.78
        },
        "description": "Madu mentah tanpa pasteurisasi dari nektar bunga hutan alami, kaya antioksidan dan enzim aktif.",
        "photoUrl": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "ikm-09",
    "namaUsaha": "CV Anggrek Lestari Tangsel (Datik Batik)",
    "brand": "Datik Batik Pesona Anggrek",
    "kecamatan": "Ciputat Timur",
    "alamat": "Jl. Ir. H. Juanda No. 88, Cireundeu, Ciputat Timur",
    "kontakNama": "Ibu Ratna Dewi / Datik",
    "kontakWa": "08118002931",
    "email": "info@datikbatik.com",
    "grade": "A",
    "statusVerifikasi": "siap_ekspor",
    "nib": "8120301140552",
    "summary": "Produsen batik tulis dan cap ikonik Tangsel berorientasi ekspor, bermotif anggrek vandoglas dan blandongan dengan pewarna alami.",
    "gapAnalysis": [
      "Legalitas lengkap, binaan Disperindag & BRIncubator, pernah ekspor parsial ke Singapura.",
      "Sertifikat SNI Batik Mark dan Eco-Textile aktif."
    ],
    "products": [
      {
        "id": "prod-09",
        "name": "Hand-drawn Silk Batik Scarf - Orchid Vandoglas Edition",
        "category": "fashion_kerajinan",
        "hsCode": "6214.10.00",
        "capacityPerMonth": "1.500 Pcs",
        "moq": "50 Pcs",
        "fobPriceUsd": 28.5,
        "certifications": [
          "SNI Batik Mark",
          "OEKO-TEX Standard 100",
          "Halal Lifestyle"
        ],
        "dimensionsCm": {
          "p": 25,
          "l": 15,
          "t": 3,
          "weightKg": 0.25
        },
        "description": "Syal sutra asli motif anggrek khas Tangerang Selatan dengan pewarna ramah lingkungan dan tepian jahit tangan halus.",
        "photoUrl": "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "ikm-10",
    "namaUsaha": "PT Cipta Busana Bordir Cireundeu",
    "brand": "Modest Embro Cireundeu",
    "kecamatan": "Ciputat Timur",
    "alamat": "Jl. Pisangan Raya No. 42, Pisangan, Ciputat Timur",
    "kontakNama": "Fauziah Rahma",
    "kontakWa": "081388112233",
    "email": "fauziah@modestembro.com",
    "grade": "A",
    "statusVerifikasi": "siap_ekspor",
    "nib": "8120401182736",
    "summary": "Garmen busana muslimah dan abaya dengan bordir komputer presisi untuk pasar Timur Tengah (UAE, Saudi) dan Malaysia.",
    "gapAnalysis": [
      "Kapasitas produksi 10.000 pcs/bulan stabil.",
      "Memenuhi standar sizing Timur Tengah dan fitting bahan tencel breathable."
    ],
    "products": [
      {
        "id": "prod-10",
        "name": "Luxury Tencel Embroidered Abaya - Dubai Cut",
        "category": "fashion_kerajinan",
        "hsCode": "6204.42.00",
        "capacityPerMonth": "8.000 Pcs",
        "moq": "100 Pcs",
        "fobPriceUsd": 22,
        "certifications": [
          "SNI Busana Wanita",
          "OEKO-TEX Class 1",
          "Halal Supply Chain"
        ],
        "dimensionsCm": {
          "p": 35,
          "l": 28,
          "t": 4,
          "weightKg": 0.45
        },
        "description": "Abaya eksklusif berbahan tencel adem serat kayu dengan detail bordir benang emas metalik motif geometris islami.",
        "photoUrl": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "ikm-11",
    "namaUsaha": "CV Rempah Wangi Rempoa",
    "brand": "Rempoa Aromatics",
    "kecamatan": "Ciputat Timur",
    "alamat": "Jl. Pahlawan No. 16, Rempoa, Ciputat Timur",
    "kontakNama": "Dr. Ilham Nugroho",
    "kontakWa": "081233445566",
    "email": "export@rempoaaroma.id",
    "grade": "A",
    "statusVerifikasi": "siap_ekspor",
    "nib": "8120502293847",
    "summary": "Distilasi fraksinasi minyak atsiri murni (Patchouli Nilam, Serai Wangi, Cengkeh) untuk bahan baku parfum dan industri kosmetik.",
    "gapAnalysis": [
      "GC-MS certificate of analysis lengkap per batch.",
      "MSDS standar GHS PBB tersedia dwibahasa."
    ],
    "products": [
      {
        "id": "prod-11",
        "name": "Pure Patchouli Essential Oil (Dark Nilam PA 32%) 25kg Drum",
        "category": "manufaktur",
        "hsCode": "3301.29.90",
        "capacityPerMonth": "2.500 kg",
        "moq": "50 kg",
        "fobPriceUsd": 65,
        "certifications": [
          "GC-MS Batch Tested",
          "IFRA Compliant",
          "Halal BPJPH",
          "ISO 9001"
        ],
        "dimensionsCm": {
          "p": 32,
          "l": 32,
          "t": 48,
          "weightKg": 27.5
        },
        "description": "Minyak nilam distilasi uap stainless steel berkadar Patchouli Alcohol 32% minimum, fixative aroma alami terbaik.",
        "photoUrl": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "ikm-12",
    "namaUsaha": "UD Banten Snack Sejahtera",
    "brand": "Keripik Pisang Tanduk Rempoa",
    "kecamatan": "Ciputat Timur",
    "alamat": "Jl. Delima No. 12, Rengas, Ciputat Timur",
    "kontakNama": "Wahyudi",
    "kontakWa": "087811224455",
    "email": "snack@bantenrajapisang.com",
    "grade": "B",
    "statusVerifikasi": "terverifikasi",
    "nib": "8120603304958",
    "summary": "Keripik pisang tanduk oven vacuum frying renyah rendah minyak dengan kemasan nitrogen flush barrier.",
    "gapAnalysis": [
      "Kemasan foil multilayer menjaga kerenyahan 12 bulan.",
      "Nutrition Facts panel sudah disesuaikan standar FDA USA."
    ],
    "products": [
      {
        "id": "prod-12",
        "name": "Vacuum Fried Crispy Plantain Chips 150g (Original Sea Salt)",
        "category": "food_beverage",
        "hsCode": "2008.99.10",
        "capacityPerMonth": "25.000 Pcs",
        "moq": "1.000 Pcs",
        "fobPriceUsd": 1.45,
        "certifications": [
          "Halal BPJPH",
          "BPOM MD",
          "HACCP"
        ],
        "dimensionsCm": {
          "p": 18,
          "l": 7,
          "t": 24,
          "weightKg": 0.17
        },
        "description": "Keripik pisang tanduk pilihan diolah dengan minyak kelapa higienis tanpa MSG dan tanpa bahan pengawet sintesis.",
        "photoUrl": "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "ikm-13",
    "namaUsaha": "Dapur Sambal Roa Nusantara Bintaro",
    "brand": "Dapur Roa Bintaro",
    "kecamatan": "Pondok Aren",
    "alamat": "Bintaro Jaya Sektor 9, Jl. Kasuari No. 15, Pondok Aren",
    "kontakNama": "Chef Ronald Maramis",
    "kontakWa": "08119777234",
    "email": "order@dapurroabintaro.com",
    "grade": "A",
    "statusVerifikasi": "siap_ekspor",
    "nib": "9120401184920",
    "summary": "Produsen sambal kemasan retort pouch tahan 18 bulan suhu ruang tanpa pengawet. Spesialis ikan roa asap dan cumi balado.",
    "gapAnalysis": [
      "Lolos uji retort steril komersial (F0 > 3.0).",
      "Telah mengantongi sertifikat HACCP dan izin edar BPOM MD."
    ],
    "products": [
      {
        "id": "prod-13",
        "name": "Retort Pouch Smoked Roa Chili Paste 150g (Sterilized Shelf-Stable)",
        "category": "food_beverage",
        "hsCode": "2103.90.19",
        "capacityPerMonth": "20.000 Pouch",
        "moq": "500 Pouch",
        "fobPriceUsd": 2.1,
        "certifications": [
          "Halal BPJPH",
          "BPOM MD",
          "HACCP",
          "Retort Sterility Report"
        ],
        "dimensionsCm": {
          "p": 12,
          "l": 3,
          "t": 18,
          "weightKg": 0.16
        },
        "description": "Sambal roa khas Manado olahan dapur Tangsel dengan ikan roa asap asli rica, siap saji tanpa perlu pendingin.",
        "photoUrl": "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "ikm-14",
    "namaUsaha": "PT Bintaro Kulit Kreasi",
    "brand": "Bintaro Leather Goods",
    "kecamatan": "Pondok Aren",
    "alamat": "Jl. Graha Bintaro Raya No. 77, Pondok Aren",
    "kontakNama": "Dicky Ardiansyah",
    "kontakWa": "081299003322",
    "email": "dicky@bintaroleather.com",
    "grade": "A",
    "statusVerifikasi": "siap_ekspor",
    "nib": "9120502295031",
    "summary": "Produksi kerajinan tas kulit nabati (vegetable-tanned leather), dompet, dan cardholder ekspor ke Jepang dan Korea.",
    "gapAnalysis": [
      "LWG (Leather Working Group) certified leather raw material.",
      "Jahitan tangan teknik saddle stitch presisi tinggi."
    ],
    "products": [
      {
        "id": "prod-14",
        "name": "Full Grain Vegetable Tanned Leather Weekender Duffle Bag",
        "category": "fashion_kerajinan",
        "hsCode": "4202.92.00",
        "capacityPerMonth": "800 Pcs",
        "moq": "30 Pcs",
        "fobPriceUsd": 85,
        "certifications": [
          "SNI Kulit Jadi",
          "LWG Raw Material Sourced",
          "Kemenkumham Merk Terdaftar"
        ],
        "dimensionsCm": {
          "p": 52,
          "l": 26,
          "t": 30,
          "weightKg": 1.85
        },
        "description": "Tas jinjing travel berbahan kulit sapi jawa samak nabati tanpa zat kimia kromium, ritsleting kuningan YKK solid.",
        "photoUrl": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "ikm-15",
    "namaUsaha": "CV Cokelat Artisan Bintaro",
    "brand": "ChocoBintaro Single Origin",
    "kecamatan": "Pondok Aren",
    "alamat": "Jl. Maleo Raya Blok JA No. 8, Bintaro, Pondok Aren",
    "kontakNama": "Astrid Wibowo",
    "kontakWa": "081377889900",
    "email": "astrid@chocobintaro.id",
    "grade": "A",
    "statusVerifikasi": "siap_ekspor",
    "nib": "9120603306142",
    "summary": "Pengolahan cokelat bean-to-bar 70% dark chocolate dari biji kakao fermentasi petani lokal Banten.",
    "gapAnalysis": [
      "Sertifikat Halal dan BPOM MD aktif.",
      "Packing berinsulasi thermal foil untuk kargo udara ke negara tropis/sub-tropis."
    ],
    "products": [
      {
        "id": "prod-15",
        "name": "Single Origin 70% Dark Chocolate Bar with Arenga Sugar 80g",
        "category": "food_beverage",
        "hsCode": "1806.32.00",
        "capacityPerMonth": "12.000 Bar",
        "moq": "500 Bar",
        "fobPriceUsd": 2.75,
        "certifications": [
          "Halal BPJPH",
          "BPOM MD",
          "HACCP",
          "Fair Trade Certified"
        ],
        "dimensionsCm": {
          "p": 16,
          "l": 8,
          "t": 1.2,
          "weightKg": 0.09
        },
        "description": "Cokelat batang artisan dengan pemanis alami gula aren Pamulang, rasa fruity floral khas kakao fermentasi tanah nusantara.",
        "photoUrl": "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "ikm-16",
    "namaUsaha": "UD EcoPrint Lestari Bintaro",
    "brand": "Botanica EcoPrint Tangsel",
    "kecamatan": "Pondok Aren",
    "alamat": "Jl. Jurang Mangu Barat No. 22, Pondok Aren",
    "kontakNama": "Nurul Hidayati",
    "kontakWa": "085811223344",
    "email": "botanica@ecoprintangsel.com",
    "grade": "B",
    "statusVerifikasi": "terverifikasi",
    "nib": "9120704417253",
    "summary": "Kain dan selendang ecoprint murni jejak daun jati, kenikir, dan kayu secang di atas serat sutra dan katun primissima.",
    "gapAnalysis": [
      "Uji tahan luntur warna terhadap pencucian (ISO 105-C06) lolos skor 4-5.",
      "Kapasitas produksi kelompok tani wanita 1.000 lembar/bulan."
    ],
    "products": [
      {
        "id": "prod-16",
        "name": "Pure Botanical Leaf Print Silk Shawl (Zero Chemical Dyes)",
        "category": "fashion_kerajinan",
        "hsCode": "6214.90.00",
        "capacityPerMonth": "1.000 Pcs",
        "moq": "40 Pcs",
        "fobPriceUsd": 32,
        "certifications": [
          "OEKO-TEX Eco-Passport",
          "Dekranasda Binaan Unggulan"
        ],
        "dimensionsCm": {
          "p": 28,
          "l": 18,
          "t": 2.5,
          "weightKg": 0.18
        },
        "description": "Selendang sutra ecoprint eksklusif dengan jejak pigmen klorofil dan tanin daun alami asli tanpa pewarna sintetis.",
        "photoUrl": "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "ikm-17",
    "namaUsaha": "Bambu Lestari BSD",
    "brand": "BambuTech Serpong",
    "kecamatan": "Serpong",
    "alamat": "Jl. Raya Rawa Buntu No. 28, Serpong",
    "kontakNama": "Agus Setiawan",
    "kontakWa": "081287654321",
    "email": "info@bambutech.id",
    "grade": "A",
    "statusVerifikasi": "siap_ekspor",
    "nib": "9120202283910",
    "summary": "Manufaktur peralatan makan, sedotan, dan perabot bambu laminasi dengan perlakuan pengawetan boraks alami anti-jamur standar Uni Eropa.",
    "gapAnalysis": [
      "Lolos uji migrasi bahan kontak pangan (EU No 10/2011).",
      "Sertifikat FSC (Forest Stewardship Council) aktif."
    ],
    "products": [
      {
        "id": "prod-17",
        "name": "Organic Bamboo Cutlery Set in Canvas Pouch (FSC Certified)",
        "category": "furniture_dekor",
        "hsCode": "4419.12.00",
        "capacityPerMonth": "50.000 Set",
        "moq": "2.000 Set",
        "fobPriceUsd": 1.65,
        "certifications": [
          "FSC 100% Bamboo",
          "EU Food Contact Safe",
          "LFGB Certified"
        ],
        "dimensionsCm": {
          "p": 22,
          "l": 6,
          "t": 3,
          "weightKg": 0.12
        },
        "description": "Set sendok, garpu, pisau, sumpit, dan sedotan bambu petung dengan sikat pembersih dalam pouch kanvas katun organik.",
        "photoUrl": "https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?w=600&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "ikm-18",
    "namaUsaha": "PT Serpong Solar Inovasi",
    "brand": "Serpong Solar Light",
    "kecamatan": "Serpong",
    "alamat": "BSD Sektor 1.3, Jl. Griya Loka Raya No. 40, Serpong",
    "kontakNama": "Ir. Taufik Hidayat",
    "kontakWa": "08119001827",
    "email": "export@serpongsolar.com",
    "grade": "A",
    "statusVerifikasi": "siap_ekspor",
    "nib": "9120304495062",
    "summary": "Perakitan lampu jalan tenaga surya (All-In-One Solar Street Light) dan modul baterai LiFePO4 untuk pasar Afrika & Asia Selatan.",
    "gapAnalysis": [
      "Sertifikasi CE, RoHS, dan uji IP67 tahan air laut.",
      "Uji ketahanan baterai UN38.3 untuk pengiriman kargo udara/laut."
    ],
    "products": [
      {
        "id": "prod-18",
        "name": "Integrated 60W All-In-One Solar Street Light with LiFePO4 Battery",
        "category": "manufaktur",
        "hsCode": "9405.42.00",
        "capacityPerMonth": "2.500 Unit",
        "moq": "50 Unit",
        "fobPriceUsd": 78,
        "certifications": [
          "CE Mark",
          "RoHS Compliance",
          "UN38.3 Battery Test",
          "IP67 Waterproof"
        ],
        "dimensionsCm": {
          "p": 75,
          "l": 32,
          "t": 14,
          "weightKg": 6.8
        },
        "description": "Lampu penerangan jalan mandiri panel monocrystalline 80W, LED chip Bridgelux 8000 lumens, sensor gerak microwave.",
        "photoUrl": "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "ikm-19",
    "namaUsaha": "CV Serpong Nutrisi Hayati",
    "brand": "Serpong Superfood",
    "kecamatan": "Serpong",
    "alamat": "Jl. Ciater Raya No. 99, Serpong",
    "kontakNama": "Dewi Lestari, M.Biotech",
    "kontakWa": "081312345678",
    "email": "info@serpongsuperfood.com",
    "grade": "A",
    "statusVerifikasi": "siap_ekspor",
    "nib": "9120405506173",
    "summary": "Budidaya dan pemrosesan bubuk spirulina dan kelor (Moringa oleifera) grade farmasi tanpa pestisida.",
    "gapAnalysis": [
      "Lolos uji logam berat (Pb, Cd, As, Hg) di bawah limit WHO.",
      "Sertifikat Halal dan BPOM MD aktif."
    ],
    "products": [
      {
        "id": "prod-19",
        "name": "Organic Moringa Oleifera Leaf Powder 200g (Pouch Stand-up)",
        "category": "food_beverage",
        "hsCode": "1211.90.99",
        "capacityPerMonth": "10.000 Pouch",
        "moq": "500 Pouch",
        "fobPriceUsd": 3.2,
        "certifications": [
          "Halal BPJPH",
          "BPOM MD",
          "Organic Certificate Indonesia",
          "GMP"
        ],
        "dimensionsCm": {
          "p": 14,
          "l": 6,
          "t": 22,
          "weightKg": 0.22
        },
        "description": "Bubuk daun kelor hijau murni pengeringan dingin (dehydrator suhu rendah) mempertahankan kadar klorofil dan multivitamin.",
        "photoUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "ikm-20",
    "namaUsaha": "UD Rotan Tropis Serpong",
    "brand": "RattanTropica Tangsel",
    "kecamatan": "Serpong",
    "alamat": "Jl. Lingkar Luar Barat No. 17, Buaran, Serpong",
    "kontakNama": "Bambang Irawan",
    "kontakWa": "081298765432",
    "email": "sales@rattantropica.com",
    "grade": "B",
    "statusVerifikasi": "terverifikasi",
    "nib": "9120506617284",
    "summary": "Kerajinan anyaman rotan alami dan sintetis ramah lingkungan: keranjang laundry, kap lampu, dan kursi santai bergaya boho.",
    "gapAnalysis": [
      "Sertifikat fumigasi standar Barantan dan V-Legal rotan.",
      "Perlu paletisasi standar pelabuhan untuk muatan LCL."
    ],
    "products": [
      {
        "id": "prod-20",
        "name": "Natural Rattan Pendant Lamp Shade - Boho Bell Shape",
        "category": "furniture_dekor",
        "hsCode": "9405.99.90",
        "capacityPerMonth": "2.000 Pcs",
        "moq": "80 Pcs",
        "fobPriceUsd": 16.8,
        "certifications": [
          "Fumigation Certificate",
          "V-Legal Rattan Origin"
        ],
        "dimensionsCm": {
          "p": 42,
          "l": 42,
          "t": 45,
          "weightKg": 1.1
        },
        "description": "Kap lampu gantung anyaman rotan pitrit halus finishing waterbased clear coat anti-rayap, rangka besi kokoh.",
        "photoUrl": "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "ikm-21",
    "namaUsaha": "PT Alam Sutera Moulding Presisi",
    "brand": "Alamsutera Plastic & Mould",
    "kecamatan": "Serpong Utara",
    "alamat": "Kawasan Industri Pakualam Kav. 8, Serpong Utara",
    "kontakNama": "Kevin Susanto",
    "kontakWa": "08118822991",
    "email": "kevin@as-moulding.com",
    "grade": "A",
    "statusVerifikasi": "siap_ekspor",
    "nib": "9120607728395",
    "summary": "Pencetakan injeksi plastik presisi dan botol kosmetik bioplastik biodegradable PLA/PHA ramah lingkungan.",
    "gapAnalysis": [
      "Sertifikasi biodegradable ASTM D6400 & EN 13432.",
      "ISO 9001:2015 dan cleanroom packaging kelas 100.000."
    ],
    "products": [
      {
        "id": "prod-21",
        "name": "Biodegradable PLA Cosmetic Lotion Bottle 250ml with Pump",
        "category": "manufaktur",
        "hsCode": "3923.30.90",
        "capacityPerMonth": "100.000 Pcs",
        "moq": "5.000 Pcs",
        "fobPriceUsd": 0.65,
        "certifications": [
          "EN 13432 Compostable",
          "FDA Food & Drug Contact",
          "ISO 9001"
        ],
        "dimensionsCm": {
          "p": 6,
          "l": 6,
          "t": 18,
          "weightKg": 0.045
        },
        "description": "Botol kosmetik bahan polimer jagung PLA terurai alami dalam 180 hari di fasilitas pengomposan industri.",
        "photoUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "ikm-22",
    "namaUsaha": "CV Jelupang Keripik Sehat",
    "brand": "Jelupang Crispy Fruits",
    "kecamatan": "Serpong Utara",
    "alamat": "Jl. Bhayangkara No. 45, Paku Jaya, Serpong Utara",
    "kontakNama": "Endang Prihatin",
    "kontakWa": "081399001122",
    "email": "order@jelupangcrispy.com",
    "grade": "A",
    "statusVerifikasi": "siap_ekspor",
    "nib": "9120708839406",
    "summary": "Keripik buah tropis beku kering (Freeze Dried Mango, Jackfruit, Pineapple) tanpa tambahan gula dan minyak.",
    "gapAnalysis": [
      "Teknologi lyophilizer freeze-drying suhu -40C.",
      "Kadar air <2%, nutrisi dan bentuk asli buah 98% terjaga."
    ],
    "products": [
      {
        "id": "prod-22",
        "name": "Freeze Dried Tropical Mango Slices 50g (Zero Added Sugar)",
        "category": "food_beverage",
        "hsCode": "0804.50.20",
        "capacityPerMonth": "30.000 Pouch",
        "moq": "1.200 Pouch",
        "fobPriceUsd": 2.3,
        "certifications": [
          "Halal BPJPH",
          "BPOM MD",
          "HACCP",
          "BRCGS Food Safety"
        ],
        "dimensionsCm": {
          "p": 15,
          "l": 5,
          "t": 20,
          "weightKg": 0.065
        },
        "description": "Camilan sehat mangga arumanis kering beku renyah lumer di lidah, kaya vitamin C alami, kemasan foil ziplock.",
        "photoUrl": "https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "ikm-23",
    "namaUsaha": "UD Serpong Utara Leather Crafter",
    "brand": "NorthSerpong Footwear",
    "kecamatan": "Serpong Utara",
    "alamat": "Jl. Melati No. 8, Jelupang, Serpong Utara",
    "kontakNama": "Rian Pratama",
    "kontakWa": "087812345678",
    "email": "rian@northserpong.com",
    "grade": "B",
    "statusVerifikasi": "terverifikasi",
    "nib": "9120809940517",
    "summary": "Sepatu kulit pria handmade konstruksi Goodyear Welted dengan outsole kulit sol dan karet Vibram.",
    "gapAnalysis": [
      "Konstruksi sepatu standar tailoring Eropa.",
      "Perlu standardisasi sertifikasi eco-leather bebas VOC."
    ],
    "products": [
      {
        "id": "prod-23",
        "name": "Handcrafted Goodyear Welted Leather Oxford Dress Shoes",
        "category": "fashion_kerajinan",
        "hsCode": "6403.59.00",
        "capacityPerMonth": "500 Pasang",
        "moq": "30 Pasang",
        "fobPriceUsd": 58,
        "certifications": [
          "SNI Sepatu Kulit",
          "Uji Ketahanan Flex Sol 50.000 Putaran"
        ],
        "dimensionsCm": {
          "p": 34,
          "l": 20,
          "t": 13,
          "weightKg": 1.4
        },
        "description": "Sepatu formal pria kulit sapi calfskin full grain dengan jahitan goodyear welted kuat yang bisa diganti sol.",
        "photoUrl": "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "ikm-24",
    "namaUsaha": "CV Herbal Tropika Serpong Utara",
    "brand": "Jamu Modern Jelupang",
    "kecamatan": "Serpong Utara",
    "alamat": "Jl. Pondok Jagung No. 19, Serpong Utara",
    "kontakNama": "apt. Larasati, S.Farm",
    "kontakWa": "081234567890",
    "email": "laras@jamumodern.co.id",
    "grade": "A",
    "statusVerifikasi": "siap_ekspor",
    "nib": "9120901051628",
    "summary": "Jamu effervescent dan sachet serbuk temulawak, jahe merah, dan kunyit dengan ekstraksi terstandar CPOTB.",
    "gapAnalysis": [
      "CPOTB (Cara Pembuatan Obat Tradisional yang Baik) BPOM aktif.",
      "Sertifikat Halal dan uji stabilitas 24 bulan tuntas."
    ],
    "products": [
      {
        "id": "prod-24",
        "name": "Red Ginger & Curcuma Instant Effervescent Tablets (Tube of 10s)",
        "category": "food_beverage",
        "hsCode": "2106.90.99",
        "capacityPerMonth": "40.000 Tube",
        "moq": "1.000 Tube",
        "fobPriceUsd": 1.85,
        "certifications": [
          "BPOM TR",
          "Halal BPJPH",
          "CPOTB Grade A",
          "HACCP"
        ],
        "dimensionsCm": {
          "p": 3.5,
          "l": 3.5,
          "t": 15,
          "weightKg": 0.08
        },
        "description": "Tablet larut air jahe merah hangat instan dengan pemanis stevia tanpa kalori, praktis untuk traveler dan imunitas.",
        "photoUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "ikm-25",
    "namaUsaha": "PT Herbal Alami Banten Sejahtera",
    "brand": "Banten BioHerbal",
    "kecamatan": "Setu",
    "alamat": "Kawasan Pergudangan Taman Tekno Blok F2 No. 8, Setu",
    "kontakNama": "Dr. Hendra Wijaya",
    "kontakWa": "081198884321",
    "email": "export@bioherbal.co.id",
    "grade": "A",
    "statusVerifikasi": "siap_ekspor",
    "nib": "9120106628491",
    "summary": "Ekstraksi herbal terstandar (Curcuma xanthorrhiza, Gingerol, Moringa) untuk industri farmasi dan nutraceutical internasional.",
    "gapAnalysis": [
      "Audit fasilitas CPOTB (Cara Pembuatan Obat Tradisional yang Baik) grade A.",
      "Dukungan ekspor Timur Tengah dan Afrika."
    ],
    "products": [
      {
        "id": "prod-25",
        "name": "Standardized Curcumin Extract Powder 95% (Drum 25kg)",
        "category": "food_beverage",
        "hsCode": "1302.19.00",
        "capacityPerMonth": "5.000 kg",
        "moq": "100 kg",
        "fobPriceUsd": 48,
        "certifications": [
          "Halal BPJPH",
          "BPOM MD",
          "CPOTB",
          "ISO 22000",
          "US FDA Facility Registered"
        ],
        "dimensionsCm": {
          "p": 38,
          "l": 38,
          "t": 55,
          "weightKg": 27.2
        },
        "description": "Ekstrak murni rimpang temulawak dengan kadar kurkuminoid 95% HPLC, bebas residu pelarut kimia, standar pharmacopeia.",
        "photoUrl": "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "ikm-26",
    "namaUsaha": "Koperasi Anggrek Bulan Tangsel",
    "brand": "Orchid Paradise Tangsel",
    "kecamatan": "Setu",
    "alamat": "Kawasan Agrowisata Anggrek, Jl. Lingkar Selatan No. 10, Muncul, Setu",
    "kontakNama": "Ir. Hartono, M.Sc",
    "kontakWa": "081211229900",
    "email": "info@anggrektangsel.org",
    "grade": "A",
    "statusVerifikasi": "siap_ekspor",
    "nib": "9120207739502",
    "summary": "Kultur jaringan bibit anggrek hibrida botol steril (Phalaenopsis, Dendrobium, Vandoglas) bersertifikat CITES dan Fitosanitari.",
    "gapAnalysis": [
      "Laboratorium kultur jaringan steril kelas 100.",
      "Izin CITES (Convention on International Trade in Endangered Species) resmi BKSDA."
    ],
    "products": [
      {
        "id": "prod-26",
        "name": "Tissue Culture Orchid Flask (In Vitro 30 Seedlings per Flask)",
        "category": "fashion_kerajinan",
        "hsCode": "0602.90.10",
        "capacityPerMonth": "6.000 Flask",
        "moq": "100 Flask",
        "fobPriceUsd": 6.8,
        "certifications": [
          "Barantan Fitosanitari",
          "CITES Export Permit BKSDA",
          "SKPB Benih Pertanian"
        ],
        "dimensionsCm": {
          "p": 12,
          "l": 12,
          "t": 18,
          "weightKg": 0.65
        },
        "description": "Bibit anggrek hibrida unggul dalam media agar steril bebas virus dan bakteri, siap adaptasi di greenhouse internasional.",
        "photoUrl": "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=600&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "ikm-27",
    "namaUsaha": "CV Setu Logam Presisi Stainless",
    "brand": "Setu Stainless Components",
    "kecamatan": "Setu",
    "alamat": "Jl. Babakan No. 44, Bakti Jaya, Setu",
    "kontakNama": "Arief Budiman",
    "kontakWa": "081388776655",
    "email": "arief@setustainless.com",
    "grade": "B",
    "statusVerifikasi": "terverifikasi",
    "nib": "9120308840613",
    "summary": "Pabrikasi baut khusus, flange, dan fitting pipa stainless steel 304/316 untuk industri kelautan dan pengolahan pangan.",
    "gapAnalysis": [
      "Sertifikasi material mill test certificate 3.1 EN 10204.",
      "Perlu peningkatan kapasitas mesin bubut otomatis 5-axis."
    ],
    "products": [
      {
        "id": "prod-27",
        "name": "Sanitary Stainless Steel 316 Tri-Clamp Pipe Fitting 2 Inch",
        "category": "manufaktur",
        "hsCode": "7307.29.10",
        "capacityPerMonth": "15.000 Pcs",
        "moq": "500 Pcs",
        "fobPriceUsd": 4.5,
        "certifications": [
          "3A Sanitary Standard",
          "ISO 9001:2015",
          "Mill Test Certificate 3.1"
        ],
        "dimensionsCm": {
          "p": 7,
          "l": 7,
          "t": 4,
          "weightKg": 0.35
        },
        "description": "Sambungan pipa higienis stainless steel 316L poles elektropolishing Ra < 0.4um untuk pabrik susu dan farmasi.",
        "photoUrl": "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=600&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "ikm-28",
    "namaUsaha": "UD Kerajinan Serat Alami Muncul",
    "brand": "Muncul Natural Fiber",
    "kecamatan": "Setu",
    "alamat": "Jl. Puspiptek Raya No. 101, Muncul, Setu",
    "kontakNama": "Karsih",
    "kontakWa": "085712349876",
    "email": "karsih@munculfiber.com",
    "grade": "B",
    "statusVerifikasi": "terverifikasi",
    "nib": "9120409951724",
    "summary": "Anyaman karpet, placemat, dan tempat penyimpanan berbahan serat pelepah pisang, mendong, dan eceng gondok alami.",
    "gapAnalysis": [
      "Bebas kutu dan jamur dengan oven pengeringan surya hibrida.",
      "Sertifikat fumigasi ekspor Barantan tersedia."
    ],
    "products": [
      {
        "id": "prod-28",
        "name": "Woven Water Hyacinth Placemat & Coaster Set (100% Biodegradable)",
        "category": "furniture_dekor",
        "hsCode": "4602.19.00",
        "capacityPerMonth": "8.000 Set",
        "moq": "200 Set",
        "fobPriceUsd": 4.2,
        "certifications": [
          "Fumigation Certificate",
          "Barantan Health Certificate",
          "Zero Plastic"
        ],
        "dimensionsCm": {
          "p": 35,
          "l": 35,
          "t": 6,
          "weightKg": 0.45
        },
        "description": "Set alas piring anyaman serat eceng gondok alami ramah lingkungan tahan panas dengan sentuhan rustic tropis.",
        "photoUrl": "https://images.unsplash.com/photo-1590736969955-71cc94801759?w=600&auto=format&fit=crop&q=80"
      }
    ]
  }
];
