export interface RegulasiKbItem {
  id: string;
  judul: string;
  kategori: string;
  negaraTujuan: string;
  ringkasan: string;
  dokumenWajib: string[];
  sumberRegulasi: string;
  tags: string[];
}

export const REGULASI_KB_DATA: RegulasiKbItem[] = [
  {
    id: 'reg-01',
    judul: 'Regulasi Bebas Deforestasi Uni Eropa (EUDR Regulation 2023/1115)',
    kategori: 'food_beverage',
    negaraTujuan: 'Uni Eropa (Jerman, Belanda, Prancis, dll)',
    ringkasan: 'Komoditas kopi, kakao, dan kayu yang masuk pasar UE wajib memiliki bukti geolocation poligon kebun lahan tanam yang terbukti tidak mengalami deforestasi setelah 31 Desember 2020 serta uji due diligence (Uji Tuntas).',
    dokumenWajib: [
      'EUDR Due Diligence Statement (DDS)',
      'Koordinat GPS Poligon Kebun Petani',
      'Phytosanitary Certificate dari Karantina Indonesia',
      'Certificate of Origin (Form A / COO)'
    ],
    sumberRegulasi: 'European Parliament & Council Regulation (EU) 2023/1115',
    tags: ['Kopi', 'EUDR', 'Uni Eropa', 'Deforestasi', 'Traceability']
  },
  {
    id: 'reg-02',
    judul: 'Ketentuan Sertifikasi Halal MRA untuk Ekspor Pangan ke Uni Emirat Arab (UAE)',
    kategori: 'food_beverage',
    negaraTujuan: 'Uni Emirat Arab & Gulf Cooperation Council (GCC)',
    ringkasan: 'Sertifikat Halal resmi yang diterbitkan BPJPH Kemenag RI telah memiliki perjanjian Mutual Recognition Agreement (MRA) dengan MoIAT/ESMA UEA. Produk F&B harus mencantumkan logo halal resmi beserta QR code verifikasi pada kemasan luar.',
    dokumenWajib: [
      'Sertifikat Halal BPJPH Kemenag RI',
      'Health Certificate dari BPOM RI',
      'Certificate of Analysis (COA) Laboratorium Terakreditasi',
      'Commercial Invoice & Packing List bilingual (EN/AR)'
    ],
    sumberRegulasi: 'MoIAT UAE Technical Regulation on Halal Products 2055-1',
    tags: ['Halal', 'UAE', 'BPJPH', 'F&B', 'Timur Tengah']
  },
  {
    id: 'reg-03',
    judul: 'Sistem Verifikasi Legalitas Kayu (SVLK / V-Legal) untuk Ekspor Furniture & Kerajinan Bambu',
    kategori: 'furniture_dekor',
    negaraTujuan: 'Global / UE / USA / Australia',
    ringkasan: 'Seluruh produk olahan kayu dan bambu wajib disertai Dokumen V-Legal (FLEGT License untuk Uni Eropa) yang diterbitkan oleh Lembaga Penilai dan Verifikasi Independen (LPVI) terakreditasi KAN.',
    dokumenWajib: [
      'Dokumen V-Legal / FLEGT License',
      'Pemberitahuan Ekspor Barang (PEB)',
      'Phytosanitary Certificate (perlakuan Fumigasi AFAS / Methyl Bromide)',
      'Bill of Lading / Air Waybill'
    ],
    sumberRegulasi: 'Permendag No. 23 Tahun 2023 tentang Kebijakan Ekspor Produk Kehutanan',
    tags: ['SVLK', 'V-Legal', 'Bambu', 'Furnitur', 'Kehutanan']
  },
  {
    id: 'reg-04',
    judul: 'Tata Laksana Kepabeanan Pemberitahuan Ekspor Barang (PEB) Bea Cukai',
    kategori: 'semua_kategori',
    negaraTujuan: 'Seluruh Negara',
    ringkasan: 'Eksportir wajib menyampaikan dokumen PEB secara elektronik melalui portal Indonesia National Single Window (INSW) atau modul CEISA Bea Cukai paling lambat sebelum pemuatan barang ke sarana pengangkut ekspor.',
    dokumenWajib: [
      'Nomor Induk Berusaha (NIB) Hak Akses Kepabeanan Ekspor',
      'Invoice Penjualan Internasional',
      'Packing List Rinci dengan Nomor Koli & Dimensi',
      'Bukti Bayar Bea Keluar (jika komoditas terkena pungutan ekspor)'
    ],
    sumberRegulasi: 'Peraturan Direktur Jenderal Bea dan Cukai No. PER-07/BC/2023',
    tags: ['PEB', 'Bea Cukai', 'INSW', 'NIB', 'Prosedur Ekspor']
  },
  {
    id: 'reg-05',
    judul: 'Regulasi Pangan Kemasan Retort & Rendah Asam US FDA (FCE & SID)',
    kategori: 'food_beverage',
    negaraTujuan: 'Amerika Serikat',
    ringkasan: 'Produk pangan retort kemasan hermetis seperti olahan sambal dan ikan roa wajib mendaftarkan Food Canning Establishment (FCE) dan mengajukan Submission Identifier (SID) proses termal sterilisasi ke US FDA sebelum pengiriman kargo.',
    dokumenWajib: [
      'FDA Facility Registration Number',
      'FCE & SID Filing Approval',
      'Prior Notice of Imported Food (PN Confirmation)',
      'Hazard Analysis and Critical Control Point (HACCP) Plan'
    ],
    sumberRegulasi: 'US 21 CFR Part 108 & 113 Acidified & Low-Acid Canned Foods',
    tags: ['FDA', 'FCE/SID', 'Retort', 'Pangan Olahan', 'Amerika Serikat']
  },
  {
    id: 'reg-06',
    judul: 'Tarif Logistik & Pengapalan Ekspor Resmi TEI 2026 (FCL & LCL)',
    kategori: 'semua_kategori',
    negaraTujuan: 'Singapura, Malaysia, Taiwan, Thailand, Korea, Vietnam, China, Kamboja, Filipina',
    ringkasan: 'Acuan resmi freight forwarding TEI 2026 berlaku 1-14 Oktober 2026 untuk kargo dari Taman Tekno BSD Serpong, Tangerang Selatan menuju Pelabuhan Tanjung Priok. Tarif mencakup ocean freight FCL 20ft/40ft, LCL minimum 2 CBM, trucking EMKL Taman Tekno-Priok, handling, dokumen, fumigasi bila diperlukan, storage estimasi, dan PPN 1,1%.',
    dokumenWajib: [
      'Quotation freight forwarding TEI 2026',
      'Pemberitahuan Ekspor Barang (PEB)',
      'Commercial Invoice & Packing List',
      'Bill of Lading (B/L)',
      'Dokumen fumigasi bila komoditas atau buyer mensyaratkan'
    ],
    sumberRegulasi: 'TEI 2026 Official Forwarding Rate, valid 1-14 Oktober 2026',
    tags: ['TEI 2026', 'Freight', 'FCL', 'LCL', 'EMKL', 'Tanjung Priok']
  }
];
