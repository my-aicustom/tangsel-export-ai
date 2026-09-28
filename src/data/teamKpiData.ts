export interface DailyLogItem {
  id: string;
  tanggal: string;
  personel: 'Febri' | 'Rama' | 'Lukman' | 'Syaiful' | 'Fahmi';
  role: string;
  prioritasPagi: string;
  targetOutput: string;
  deadlineJam: string;
  kendala: string;
  realisasiSore: string;
  evidenceUrl: string;
  statusColor: 'GREEN' | 'YELLOW' | 'RED';
  catatanPimpinan: string;
}

export interface KpiScorecard {
  personel: 'Febri' | 'Rama' | 'Lukman' | 'Syaiful' | 'Fahmi';
  role: string;
  disiplin: number;  // Max 30
  output: number;    // Max 45
  quality: number;   // Max 15
  reporting: number; // Max 10
  totalScore: number;
  status: 'High Performer' | 'On Track' | 'At Risk' | 'Off Track';
}

export const MONTHLY_KPI_SCORES: KpiScorecard[] = [
  {
    personel: 'Febri',
    role: 'Lead IKM & Export Readiness',
    disiplin: 29,
    output: 43,
    quality: 14,
    reporting: 9,
    totalScore: 95,
    status: 'High Performer'
  },
  {
    personel: 'Rama',
    role: 'Lead Buyer, Matching & Pitching',
    disiplin: 28,
    output: 42,
    quality: 14,
    reporting: 9,
    totalScore: 93,
    status: 'High Performer'
  },
  {
    personel: 'Lukman',
    role: 'Finance & Vendor Specialist',
    disiplin: 27,
    output: 39,
    quality: 13,
    reporting: 8,
    totalScore: 87,
    status: 'On Track'
  },
  {
    personel: 'Syaiful',
    role: 'IKM Administrative Support',
    disiplin: 26,
    output: 38,
    quality: 12,
    reporting: 8,
    totalScore: 84,
    status: 'On Track'
  },
  {
    personel: 'Fahmi',
    role: 'Operational Support & Evidence',
    disiplin: 22,
    output: 32,
    quality: 10,
    reporting: 6,
    totalScore: 70,
    status: 'At Risk'
  }
];

export const DAILY_WORKBOARD_LOGS: DailyLogItem[] = [
  {
    id: 'log-01',
    tanggal: '24 Sep 2026',
    personel: 'Febri',
    role: 'Lead IKM & Export Readiness',
    prioritasPagi: 'Verifikasi kesiapan audit sertifikasi USDA Organic PT Java Palm Sugar & update matrix Grade A',
    targetOutput: 'Daftar audit final 8 IKM prioritas TEI 2026 & lampiran sertifikat digital',
    deadlineJam: '15:00 WIB',
    kendala: 'Koperasi Kopi Ciputat masih menunggu nomor pendaftaran GPS kebun untuk EUDR',
    realisasiSore: '8 IKM terverifikasi lengkap. 3 IKM Grade A telah dikonfirmasi siap display katalog TEI.',
    evidenceUrl: 'https://drive.google.com/drive/folders/disperindag-tangsel-tei-ikm-ready',
    statusColor: 'GREEN',
    catatanPimpinan: 'Bagus. Koordinasikan dengan Rama untuk matching buyer Kamerun.'
  },
  {
    id: 'log-02',
    tanggal: '24 Sep 2026',
    personel: 'Rama',
    role: 'Lead Buyer, Matching & Pitching',
    prioritasPagi: 'Finalisasi buyer profile delegasi Kamerun (SCD Douala) & penyiapan draft one-sheet pitching EN',
    targetOutput: '1 lembar pitching sheet bahasa Inggris untuk komoditas Gula Aren & Ekstrak Herbal',
    deadlineJam: '14:30 WIB',
    kendala: 'Menunggu konfirmasi final MOQ dari Febri',
    realisasiSore: 'Pitching sheet siap dan di-review bersama pimpinan. Format matching matrix terisi 100%.',
    evidenceUrl: 'https://drive.google.com/file/d/pitching-sheet-tei-cameroun-v2.pdf',
    statusColor: 'GREEN',
    catatanPimpinan: 'Pertahankan kualitas substansi materi promosi.'
  },
  {
    id: 'log-03',
    tanggal: '24 Sep 2026',
    personel: 'Lukman',
    role: 'Finance & Vendor Specialist',
    prioritasPagi: 'Cek termin pembayaran sewa counter booth ICE BSD Hall 3A dan vendor booth contractor',
    targetOutput: 'Laporan status financial readiness & SPK kontraktor booth',
    deadlineJam: '16:00 WIB',
    kendala: 'Dokumen kelengkapan NPWP vendor dekorasi ada koreksi nomor rekening',
    realisasiSore: 'SPK telah ditandatangani, revisi lampiran vendor sudah diterima dan diajukan ke BPKAD.',
    evidenceUrl: 'https://drive.google.com/drive/folders/spk-booth-tei-2026-lukman',
    statusColor: 'YELLOW',
    catatanPimpinan: 'Kawal terus sampai pencairan uang muka rampung sebelum 30 September.'
  },
  {
    id: 'log-04',
    tanggal: '24 Sep 2026',
    personel: 'Syaiful',
    role: 'IKM Administrative Support',
    prioritasPagi: 'Menghubungi 5 IKM kandidat untuk konfirmasi pengiriman sampel produk fisik ke kantor Disperindag',
    targetOutput: '5 IKM terkonfirmasi; bukti tanda terima kurir sampel',
    deadlineJam: '15:30 WIB',
    kendala: '1 IKM (Keripik Mak Itam) sulit dihubungi pada pagi hari',
    realisasiSore: '4 IKM sudah mengirimkan sampel. 1 IKM baru merespon sore hari dan menjanjikan kirim besok pagi.',
    evidenceUrl: 'https://drive.google.com/file/d/log-kontak-ikm-24sep.xlsx',
    statusColor: 'YELLOW',
    catatanPimpinan: 'Pastikan besok pagi sebelum jam 10 sampel Mak Itam sudah tiba.'
  },
  {
    id: 'log-05',
    tanggal: '24 Sep 2026',
    personel: 'Fahmi',
    role: 'Operational Support & Evidence',
    prioritasPagi: 'Membuat katalog digital QR code dan template form tanda terima pengunjung booth TEI',
    targetOutput: 'File PDF materi QR Kiosk + form pengunjung bilingual terstruktur',
    deadlineJam: '16:00 WIB',
    kendala: 'Printer kantor mengalami paper jam, belum sempat cetak mockup uji coba',
    realisasiSore: 'Desain digital sudah selesai di folder kerja, uji cetak ditunda besok pagi.',
    evidenceUrl: 'https://drive.google.com/drive/folders/operational-evidence-fahmi',
    statusColor: 'YELLOW',
    catatanPimpinan: 'Disiplin target harian harus ditingkatkan agar tidak menumpuk di minggu depan.'
  }
];
