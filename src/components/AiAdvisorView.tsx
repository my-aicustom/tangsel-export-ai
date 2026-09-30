import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  BookOpen,
  Search,
  Tag,
  ExternalLink,
  FileText,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  X,
  ShieldCheck,
  Download,
  Package,
  Layers,
  MapPin,
  PlaneTakeoff,
  Ship,
  Info,
  Video,
  Zap
} from 'lucide-react';
import { REGULASI_KB_DATA, type RegulasiKbItem } from '../data/regulasiKbData';
import { CountryFlag } from './CountryFlag';

export interface ShipmentContext {
  id: string;
  label: string;
  exporterName: string;
  productName: string;
  hsCode: string;
  destinationCountry: string;
  countryCode: string;
  destinationPort: string;
  volume: string;
  fobValueUsd: number;
  incoterm: 'FOB' | 'CIF' | 'EXW';
  shippingMode: 'AIR_EXPRESS' | 'OCEAN_LCL';
  keyCompliance: string[];
  suggestedQuestions: string[];
}

export const SHIPMENT_CONTEXTS: ShipmentContext[] = [
  {
    id: 'shipment-01',
    label: 'Kargo #EXP-2026-001: Kopi Robusta Sangrai ke Amsterdam (Belanda / EUDR)',
    exporterName: 'Koperasi Kopi Robusta Ciputat Mandiri',
    productName: 'Specialty Java Robusta Roasted Beans',
    hsCode: '0901.21.00',
    destinationCountry: 'Belanda (Uni Eropa)',
    countryCode: 'NL',
    destinationPort: 'Port of Rotterdam / AMS',
    volume: '15 Koli (~172.5 kg)',
    fobValueUsd: 1425,
    incoterm: 'CIF',
    shippingMode: 'AIR_EXPRESS',
    keyCompliance: ['EUDR (Reg. 2023/1115)', 'Phytosanitary Karantina', 'Uji Residu MRL ISO 17025'],
    suggestedQuestions: [
      'Bagaimana pemenuhan uji deforestasi EUDR TRACES-NT untuk pengapalan kopi ini?',
      'Apakah sertifikat Phytosanitary wajib dilampirkan sebelum kargo diberangkatkan dari CGK?',
      'Berapa batas residu pestisida (MRL) yang diizinkan otoritas pabean Uni Eropa?'
    ]
  },
  {
    id: 'shipment-02',
    label: 'Kargo #EXP-2026-002: Palm Sugar Organik ke Douala (Kamerun / Afrika)',
    exporterName: 'PT Java Palm Sugar Nusantara (Pamulang)',
    productName: 'Organic Arenga Palm Sugar (Granule 500g)',
    hsCode: '1702.90.90',
    destinationCountry: 'Kamerun (Afrika Tengah)',
    countryCode: 'CM',
    destinationPort: 'Port of Douala (Port-DLA)',
    volume: '1 x 20ft FCL (~18 Ton / 1.800 Karton)',
    fobValueUsd: 28800,
    incoterm: 'CIF',
    shippingMode: 'OCEAN_LCL',
    keyCompliance: ['Sertifikat Halal BPJPH', 'COA Mutu Kadar Air <1.5%', 'Certificate of Origin Form A'],
    suggestedQuestions: [
      'Dokumen kepabeanan apa saja yang wajib untuk ekspor palm sugar ke Kamerun?',
      'Apakah buyer Kamerun membutuhkan inspeksi pra-pengapalan (BIVAC / SGS)?',
      'Bagaimana memastikan kemasan retail 500g tahan kelembaban selama pelayaran laut?'
    ]
  },
  {
    id: 'shipment-03',
    label: 'Kargo #EXP-2026-003: Ekstrak Jahe Merah Instan ke Dubai (UAE / Halal MRA)',
    exporterName: 'PT Herbal Alami Banten Sejahtera (Setu)',
    productName: 'Instant Red Ginger Extract (Granule Sachet)',
    hsCode: '2106.90.99',
    destinationCountry: 'Uni Emirat Arab (Dubai)',
    countryCode: 'AE',
    destinationPort: 'Dubai International (DXB) / Jebel Ali',
    volume: '50 Karton (20.000 Sachet / ~300 kg)',
    fobValueUsd: 4200,
    incoterm: 'FOB',
    shippingMode: 'AIR_EXPRESS',
    keyCompliance: ['Halal BPJPH (MRA MoIAT Terpenuhi)', 'Health Certificate BPOM MD', 'Label Bilingual Arab-Inggris'],
    suggestedQuestions: [
      'Apakah sertifikat Halal BPJPH otomatis diakui Dubai Municipality via MRA?',
      'Apa aturan label kemasan bilingual (Arab & Inggris) untuk pasar ritel UAE?',
      'Bagaimana tata cara pengurusan Health Certificate BPOM untuk pengapalan ke DXB?'
    ]
  },
  {
    id: 'shipment-04',
    label: 'Kargo #EXP-2026-004: Kerajinan Bambu Ramah Lingkungan ke Munich (Jerman / SVLK)',
    exporterName: 'UD Bambu Kriya BSD Tangsel (Serpong)',
    productName: 'Eco Bamboo Cutlery & Bento Tableware Set',
    hsCode: '4421.91.90',
    destinationCountry: 'Jerman (Uni Eropa)',
    countryCode: 'DE',
    destinationPort: 'Hamburg Port / MUC',
    volume: '30 Karton (~285 kg)',
    fobValueUsd: 3600,
    incoterm: 'CIF',
    shippingMode: 'OCEAN_LCL',
    keyCompliance: ['SVLK V-Legal Mandiri', 'Fumigasi AFAS Standar', 'Food Grade EU Reg 1935/2004'],
    suggestedQuestions: [
      'Apakah nomor V-Legal langsung divalidasi ke modul PEB Bea Cukai?',
      'Bagaimana prosedur sertifikasi fumigasi AFAS sebelum container stuffing?',
      'Uji migrasi kimia apa yang diwajibkan Jerman untuk perlengkapan makan bambu?'
    ]
  },
  {
    id: 'shipment-05',
    label: 'Kargo #EXP-2026-005: Sambal Roa Kemasan Retort ke Los Angeles (USA / FDA)',
    exporterName: 'Dapur Roa Nusantara Bintaro (Pondok Aren)',
    productName: 'Sambal Roa Asli Manado Retort Pouch 150g',
    hsCode: '2103.90.13',
    destinationCountry: 'Amerika Serikat (West Coast)',
    countryCode: 'US',
    destinationPort: 'Port of Long Beach / LAX',
    volume: '40 Karton (~392 kg)',
    fobValueUsd: 3800,
    incoterm: 'CIF',
    shippingMode: 'AIR_EXPRESS',
    keyCompliance: ['US FDA Facility Registration', 'FDA FCE / SID Identifier', 'US Prior Notice CBP'],
    suggestedQuestions: [
      'Bagaimana alur pendaftaran Food Canning Establishment (FCE) dan SID di FDA?',
      'Kapan Prior Notice wajib dikirimkan ke US Customs sebelum pesawat kargo mendarat?',
      'Apakah kemasan retort pouch wajib mencantumkan Nutrition Facts format FDA 2020?'
    ]
  }
];

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  citations?: { title: string; source: string }[];
  contextTag?: string;
  sourceType?: 'live' | 'knowledge_base';
}

const renderMessageText = (text: string) => {
  return text.split('\n').map((line, lineIndex) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <React.Fragment key={lineIndex}>
        {parts.map((part, partIndex) =>
          part.startsWith('**') && part.endsWith('**')
            ? <strong key={partIndex} className="font-semibold text-inherit">{part.slice(2, -2)}</strong>
            : <React.Fragment key={partIndex}>{part}</React.Fragment>
        )}
        {lineIndex < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    );
  });
};

export const AiAdvisorView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'kb'>('chat');
  const [inputPrompt, setInputPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [kbSearch, setKbSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedArticle, setSelectedArticle] = useState<RegulasiKbItem | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Selected Shipment Context for Consulting
  const [selectedShipment, setSelectedShipment] = useState<ShipmentContext | null>(SHIPMENT_CONTEXTS[0]);

  const initialMessage: ChatMessage = {
    id: 'm-1',
    sender: 'ai',
    text: `Halo! Saya Asisten Regulasi Ekspor Tangsel. Saya siap membantu menelusuri persyaratan ekspor, HS Code, sertifikasi internasional, dan kelengkapan dokumen kepabeanan.

Saat ini konteks konsultasi terhubung ke: **${SHIPMENT_CONTEXTS[0].label}**. Anda dapat menanyakan persyaratan regulasi spesifik untuk pengapalan ini atau memilih pengapalan lain melalui menu konteks di atas.`,
    timestamp: '08:30 WIB',
    contextTag: SHIPMENT_CONTEXTS[0].label
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);

  // Auto-scroll chat to latest message (placed after messages is defined)
  useEffect(() => {
    if (activeTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, activeTab]);

  const generalPrompts = [
    'Syarat ekspor Kopi Robusta ke Uni Eropa (EUDR)?',
    'Apakah sertifikat Halal BPJPH diakui di UAE?',
    'Ketentuan V-Legal / SVLK untuk kerajinan bambu?',
    'Tata laksana dokumen PEB kepabeanan Bea Cukai?',
    'Syarat FDA FCE/SID untuk pangan retort pouch sambal roa?'
  ];

  const activePrompts = selectedShipment ? selectedShipment.suggestedQuestions : generalPrompts;

  const handleResetChat = () => {
    setMessages([initialMessage]);
    setInputPrompt('');
    setIsTyping(false);
  };

  const handleShipmentContextChange = (contextId: string) => {
    if (!contextId) {
      setSelectedShipment(null);
      return;
    }
    const found = SHIPMENT_CONTEXTS.find(s => s.id === contextId) || null;
    setSelectedShipment(found);
    if (found) {
      const switchNotice: ChatMessage = {
        id: `sys-${Date.now()}`,
        sender: 'ai',
        text: `📌 **Konteks Pengiriman Dialihkan ke:** ${found.label}
- **Eksportir:** ${found.exporterName}
- **Komoditas & HS Code:** ${found.productName} (HS: ${found.hsCode})
- **Tujuan:** ${found.destinationCountry} via ${found.destinationPort}
- **Moda & Incoterm:** ${found.shippingMode} - ${found.incoterm}
- **Standar Kepatuhan Kunci:** ${found.keyCompliance.join(' • ')}

Silakan tanyakan regulasi atau klik pertanyaan cepat yang telah disesuaikan dengan kargo ini.`,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
        contextTag: found.label
      };
      setMessages(prev => [...prev, switchNotice]);
    }
  };

  const isMetaQuery = (queryText: string): boolean => {
    const q = queryText.toLowerCase().trim();
    const patterns = [
      /^(halo|hai|hei|p|ping|selamat\s+(pagi|siang|sore|malam)|assalamu[']?alaikum)/i,
      /(siapa\s+(kamu|anda)|kamu\s+siapa|anda\s+siapa)/i,
      /(ini\s+data(nya)?\s+dari\s+(mana|internet)|sumber\s+data|dapat\s+data\s+dari\s+mana|ambil\s+data\s+dari\s+mana)/i,
      /(dari\s+internet\s+kan|pakai\s+ai\s+apa|model\s+apa|llm\s+apa|openrouter)/i,
      /(kamu\s+bisa\s+apa|bisa\s+bantu\s+apa|fitur\s+apa\s+saja|cara\s+kerja)/i,
      /(apakah\s+(ini\s+)?(akurat|resmi|valid|benar))/i
    ];
    return patterns.some(pattern => pattern.test(q));
  };

  const buildOfflineAdvisorReply = (query: string): { reply: string; citations: { title: string; source: string }[] } => {
    let reply = '';
    let citations: { title: string; source: string }[] = [];
    const q = query.toLowerCase().trim();
    const isMeta = isMetaQuery(query);
    const kbHit = REGULASI_KB_DATA.find(item => {
      const haystack = [
        item.judul,
        item.ringkasan,
        item.negaraTujuan,
        item.sumberRegulasi,
        ...item.tags,
        ...item.dokumenWajib,
      ].join(' ').toLowerCase();
      return q.split(/\s+/).filter(word => word.length > 3).some(word => haystack.includes(word));
    });

    const ctxPrefix = (selectedShipment && !isMeta)
      ? `[Konteks Kargo: ${selectedShipment.productName} - HS: ${selectedShipment.hsCode} ke ${selectedShipment.destinationCountry}]\n\n`
      : '';

    // 1. Pertanyaan Seputar Sumber Data / Internet
    if (q.includes('internet') || q.includes('sumber data') || q.includes('dapat data') || q.includes('ambil data') || q.includes('database') || q.includes('akurasi') || q.includes('valid')) {
      reply = `Betul! Basis data saya bersumber dari penelusuran **live intelligence real-time (OpenRouter)** yang dipadukan dengan repositori regulasi resmi terkurasi:
1. **INSW (Indonesia National Single Window)**: Ketentuan Lartas & tarif BTKI 2022.
2. **Kementerian Perdagangan & Bea Cukai RI**: Regulasi ekspor, PEB (PER-07/BC/2023), dan SKA.
3. **Badan Karantina Indonesia & BPOM**: Standar SPS (Sanitary & Phytosanitary) dan keamanan pangan.
4. **Disperindag Kota Tangerang Selatan**: Kurasi komoditas unggulan dan fasilitasi IKM binaan TEI 2026.

Semua informasi divalidasi silang untuk memastikan kepatuhan teknis perdagangan internasional.`;
      citations = [{
        title: 'Repositori Regulasi Perdagangan Terintegrasi',
        source: 'Disperindag Tangsel · INSW · Bea Cukai RI'
      }];
    } else if (q === 'halo' || q === 'hai' || q === 'hei' || q.startsWith('halo') || q.startsWith('hai') || q.includes('assalamualaikum') || q.includes('selamat pagi') || q.includes('selamat siang') || q.includes('selamat sore') || q.includes('selamat malam') || q.includes('siapa kamu') || q.includes('siapa anda')) {
      reply = `Halo! Saya **Asisten Regulasi Ekspor Tangsel**, konsultan AI resmi Disperindag Kota Tangerang Selatan untuk fasilitasi IKM binaan menuju Trade Expo Indonesia 2026.
Saya siap membantu Anda menavigasi:
1. **Regulasi Global & Standar Kepatuhan**: EUDR (Eropa), US FDA FCE/SID (Amerika), Halal MRA (UAE/GCC), SVLK V-Legal (Kayu/Bambu).
2. **Kesesuaian HS Code**: Klasifikasi 8-digit BTKI 2022 dan regulasi Lartas kepabeanan.
3. **Simulasi Rute & Freight**: Estimasi biaya kargo udara (CGK) dan laut (Tanjung Priok) ke 8 pelabuhan utama dunia.
4. **Trisula Dokumen Pabean**: Commercial Invoice, Packing List, PEB, dan SKA (Form A/D/AK).

Silakan ketik pertanyaan spesifik seputar komoditas atau pilih salah satu pertanyaan cepat yang tersedia!`;
      citations = [{
        title: 'Layanan Konsultasi Ekspor Disperindag Tangsel',
        source: 'Dinas Perindustrian dan Perdagangan Kota Tangerang Selatan'
      }];
    } else if (q.includes('cara ekspor') || q.includes('langkah ekspor') || q.includes('tahapan ekspor') || q.includes('mulai ekspor') || q.includes('prosedur ekspor') || q.includes('syarat awal')) {
      reply = `${ctxPrefix}Panduan 5 Langkah Praktis Memulai Ekspor bagi IKM Tangerang Selatan:
1. **Legalitas Usaha**: Pastikan memiliki NIB berbasis risiko melalui OSS RBA dengan akses kepabeanan aktif.
2. **Standardisasi Produk**: Penuhi legalitas domestik (P-IRT/BPOM/Halal BPJPH/SNI) serta uji laboratorium parameter ekspor (ISO 17025).
3. **Penetapan Harga & Incoterms**: Hitung Ex-Works, FOB (Priok/CGK), atau CIF tujuan buyer menggunakan kalkulator logistik kami.
4. **Dokumen Ekspor (Trisula Dokumen)**: Siapkan Commercial Invoice, Packing List, dan ajukan Pemberitahuan Ekspor Barang (PEB) ke CEISA Bea Cukai.
5. **Business Matching**: Manfaatkan fasilitas temu bisnis buyer internasional di booth Disperindag Tangsel pada TEI 2026.`;
      citations = [{
        title: 'Panduan Akselerasi Ekspor IKM Nasional',
        source: 'Kementerian Perdagangan RI & Disperindag Tangsel'
      }];
    } else if (q.includes('pembayaran') || q.includes('letter of credit') || q.includes('lc') || q.includes('t/t') || q.includes('dp') || q.includes('modal') || q.includes('pembiayaan')) {
      reply = `${ctxPrefix}Ketentuan Pembayaran & Fasilitas Pembiayaan Ekspor untuk IKM Tangsel:
1. **Metode Pembayaran Aman**: Gunakan **Irrevocable Confirmed Letter of Credit (L/C)** at sight atau kombinasi T/T (Telegraphic Transfer) DP minimal 30-50% sebelum produksi dan pelunasan saat copy Bill of Lading (B/L) diterbitkan.
2. **Asuransi Ekspor**: Disarankan memproteksi risiko gagal bayar buyer melalui asuransi ekspor ASEI / Indonesia Eximbank.
3. **Fasilitas Pembiayaan**: Lembaga Pembiayaan Ekspor Indonesia (LPEI / Eximbank) menyediakan program Penjaminan & Pembiayaan Modal Kerja Ekspor khusus IKM berorientasi ekspor yang difasilitasi dinas.`;
      citations = [{
        title: 'Mekanisme Transaksi & Pembiayaan Ekspor',
        source: 'Lembaga Pembiayaan Ekspor Indonesia (LPEI) & Bank Indonesia'
      }];
    } else if (q.includes('ongkir') || q.includes('biaya logistik') || q.includes('freight') || q.includes('tarif kargo') || q.includes('kontainer') || q.includes('trucking') || q.includes('lcl') || q.includes('fcl')) {
      reply = `${ctxPrefix}Estimasi Biaya Logistik Kargo Ekspor Tangsel:
- Modul **Logistik & Estimasi Biaya** kami telah mengintegrasikan kalkulator multimoda untuk 8 pelabuhan global tujuan utama ekspor (Singapura, Shanghai, Tokyo, Los Angeles, Rotterdam, Dubai, Sydney, Douala).
- Meliputi kalkulasi **Inland Trucking** (Pick-up van s/d Trailer kontainer 40ft) dari sentra IKM Tangsel ke Pelabuhan Tanjung Priok atau Bandara Soekarno-Hatta (CGK).
- Anda dapat langsung membuka menu navigasi **Logistik & Kargo** di bilah samping untuk melakukan simulasi real-time berbasis bobot dan dimensi kargo.`;
      citations = [{
        title: 'Simulator Logistik & Kargo Multimoda Tangsel',
        source: 'Disperindag Tangsel & Standar Freight Forwarding 2026'
      }];
    } else if (q.includes('kopi') || q.includes('eudr') || q.includes('eropa') || (selectedShipment?.id === 'shipment-01' && (q.includes('deforestasi') || q.includes('traces') || q.includes('mrl') || q.includes('residu') || q.includes('phytosanitary')))) {
      reply = `${ctxPrefix}Untuk ekspor Kopi Robusta (${selectedShipment?.exporterName || 'Koperasi Kopi Robusta Ciputat'}) ke Uni Eropa berdasarkan regulasi EUDR (Regulation 2023/1115):
1. **Bukti Bebas Deforestasi**: Wajib melampirkan data geolocation poligon GPS kebun budidaya petani (cut-off date 31 Des 2020).
2. **Due Diligence Statement (DDS)**: Diunggah melalui sistem TRACES-NT Uni Eropa sebelum kargo sandar di Rotterdam.
3. **Dokumen Pendukung**: Phytosanitary Certificate dari Karantina Tumbuhan RI (Bandara CGK / Pelabuhan Tanjung Priok), Form A/COO, dan uji residu pestisida (MRL) akreditasi ISO 17025.
4. **Status Kesiapan Tangsel**: Verifikasi titik koordinat kebun petani binaan Ciputat saat ini sedang difasilitasi oleh Dinas Pertanian & Disperindag Tangsel.`;
      citations = [{
        title: 'Regulasi Bebas Deforestasi Uni Eropa (EUDR Regulation 2023/1115)',
        source: 'European Commission Regulation (EU) 2023/1115'
      }];
    } else if (q.includes('halal') || q.includes('uae') || q.includes('emirates') || q.includes('timur tengah') || (selectedShipment?.id === 'shipment-03')) {
      reply = `${ctxPrefix}Sertifikat Halal resmi BPJPH Kemenag RI telah memiliki perjanjian pengakuan timbal balik (**Mutual Recognition Agreement / MRA**) dengan MoIAT/ESMA Uni Emirat Arab (UEA).
Persyaratan teknis untuk komoditas F&B (${selectedShipment?.productName || 'Ekstrak Jahe Merah'}):
- Sertifikat Halal resmi BPJPH dengan logo Garuda Nasional & QR Code aktif.
- Label kemasan bilingual: Keterangan komposisi dan petunjuk saji wajib memuat Bahasa Arab & Inggris.
- Health Certificate dari BPOM RI dan Certificate of Analysis (COA) mikrobiologi dari Sucofindo/SGS.
- Komoditas siap dipromosikan ke buyer Al-Madina UAE di booth TEI 2026.`;
      citations = [{
        title: 'Ketentuan Sertifikasi Halal MRA untuk Ekspor Pangan ke UAE',
        source: 'MoIAT UAE Technical Regulation 2055-1'
      }];
    } else if (q.includes('bambu') || q.includes('svlk') || q.includes('kayu') || q.includes('v-legal') || (selectedShipment?.id === 'shipment-04')) {
      reply = `${ctxPrefix}Untuk produk perabot dan perlengkapan makan berbahan bambu (${selectedShipment?.exporterName || 'UD Bambu Kriya BSD'}):
1. **Dokumen V-Legal (SVLK)**: Wajib diterbitkan oleh Lembaga Penilai & Verifikasi Independen (LPVI) terakreditasi KAN sesuai Permendag No. 23/2023. Nomor V-Legal langsung divalidasi ke modul ekspor PEB Bea Cukai.
2. **Fumigasi**: Wajib melalui perlakuan fumigasi berstandar AFAS atau Heat Treatment bersertifikat Phytosanitary resmi.
3. **Food Grade Testing**: Wajib menyertakan sertifikat uji migrasi zat kimia aman kontak pangan (SGS / Sucofindo) sesuai standar EU Framework Regulation (EC) No 1935/2004.`;
      citations = [{
        title: 'Sistem Verifikasi Legalitas Kayu (SVLK / V-Legal)',
        source: 'Permendag No. 23 Tahun 2023'
      }];
    } else if (q.includes('fda') || q.includes('retort') || q.includes('roa') || q.includes('sambal') || (selectedShipment?.id === 'shipment-05')) {
      reply = `${ctxPrefix}Untuk produk pangan kemasan retort tahan suhu ruang (${selectedShipment?.productName || 'Sambal Roa Retort Pouch'}) tujuan Amerika Serikat:
1. **FDA Facility Registration**: Registrasi fasilitas dapur produksi di portal FDA FURLS.
2. **FCE & SID (Food Canning Establishment & Submission Identifier)**: Pengajuan jadwal proses sterilisasi panas (F0 value) ke US FDA untuk kategori Low-Acid/Acidified Foods (21 CFR Part 108/113).
3. **Prior Notice**: Wajib mengirimkan pemberitahuan awal (PN Confirm Number) ke US Customs & Border Protection (CBP) sebelum kargo mendarat di pelabuhan LAX/Long Beach.`;
      citations = [{
        title: 'Regulasi Pangan Kemasan Retort US FDA (FCE & SID)',
        source: 'US 21 CFR Part 108 & 113'
      }];
    } else if (q.includes('kamerun') || q.includes('gula') || q.includes('aren') || (selectedShipment?.id === 'shipment-02')) {
      reply = `${ctxPrefix}Untuk ekspor kargo Gula Aren Kristal Organik (${selectedShipment?.exporterName || 'PT Java Palm Sugar Nusantara'}) ke Port of Douala, Kamerun:
1. **Inspeksi Pra-Pengapalan**: Importir Kamerun biasanya memerlukan laporan pemeriksaan kesesuaian mutu (Clean Report of Findings / CRF) dari BIVAC/Bureau Veritas sebelum keberangkatan kapal.
2. **Dokumen Kepabeanan**: Pemberitahuan Ekspor Barang (PEB), Commercial Invoice, Packing List, Bill of Lading (B/L), dan Certificate of Origin (Form A/SKA).
3. **Sertifikasi Mutu**: Certificate of Analysis (COA) kadar air < 1.5%, uji bebas aflatoksin, dan sertifikat Halal BPJPH.
4. **Proteksi Kargo Laut**: Mengingat transit time laut adalah 35 - 42 hari, wajib menggunakan container liner bag dan silica gel desiccant khusus kontainer.`;
      citations = [{
        title: 'Ketentuan Ekspor Komoditas Pangan ke Wilayah CEMAC (Afrika Tengah)',
        source: 'CEMAC Trade Harmonization & Cameroon Customs Authority'
      }];
    } else if (q.includes('peb') || q.includes('cukai') || q.includes('bea')) {
      reply = `${ctxPrefix}Tata laksana Pemberitahuan Ekspor Barang (PEB) sesuai PER-07/BC/2023:
1. Eksportir wajib memiliki NIB yang berfungsi sebagai identitas kepabeanan aktif.
2. Pengisian modul PEB elektronik secara mandiri atau melalui PPJK mitra resmi di sistem CEISA Bea Cukai.
3. Lampiran wajib: Commercial Invoice, Packing List (tertera jumlah koli, berat kotor/bersih), dan pemenuhan Larangan & Pembatasan (Lartas).
4. Setelah diverifikasi sistem, Bea Cukai akan menerbitkan Nota Pelayanan Ekspor (NPE) untuk memasukkan kargo ke Kawasan Pabean bandara/pelabuhan.`;
      citations = [{
        title: 'Tata Laksana Kepabeanan Pemberitahuan Ekspor Barang (PEB)',
        source: 'Peraturan Dirjen Bea dan Cukai No. PER-07/BC/2023'
      }];
    } else if (kbHit) {
      reply = `${ctxPrefix}${kbHit.ringkasan}

Dokumen yang perlu diprioritaskan:
${kbHit.dokumenWajib.slice(0, 4).map((doc, index) => `${index + 1}. ${doc}`).join('\n')}`;
      citations = [{
        title: kbHit.judul,
        source: kbHit.sumberRegulasi
      }];
    } else {
      reply = `${ctxPrefix}Berdasarkan standar perdagangan internasional & fasilitasi Disperindag Tangsel: Setiap pengapalan komoditas ekspor memerlukan pemenuhan 3 pilar:
1. **Legalitas & NIB Kepabeanan**: Terdaftar di portal OSS RBA dan CEISA Bea Cukai.
2. **Standar Mutu Khusus Negara Tujuan**: Pengujian laboratorium ISO 17025 (bebas cemaran/residu), sertifikat Halal/Organik, dan izin impor negara mitra.
3. **Trisula Dokumen Pelayaran**: Commercial Invoice, Packing List, Bill of Lading / Air Waybill, serta Certificate of Origin (SKA / COO).

Silakan tanyakan detail HS Code komoditas Anda atau pilih salah satu pertanyaan cepat yang tersedia.`;
      citations = [{
        title: 'Standar Operasional Prosedur Ekspor Terpadu Tangsel',
        source: 'Disperindag Tangsel & Kementerian Perdagangan RI'
      }];
    }

    return { reply, citations };
  };

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputPrompt;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setIsTyping(true);

    let replyData: { reply: string; citations: { title: string; source: string }[]; sourceType: 'live' | 'knowledge_base' };
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 12000);

    let liveSuccess = false;
    const endpoints = [
      '/api/trade-chat',
      'https://veylo.163.61.44.41.sslip.io/app/api/trade-chat'
    ];

    for (const url of endpoints) {
      if (liveSuccess) break;
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            message: (selectedShipment && !isMetaQuery(query))
              ? `[Konteks Kargo: ${selectedShipment.productName} (HS: ${selectedShipment.hsCode}) ke ${selectedShipment.destinationCountry}]\n\n${query}`
              : query,
            history: messages.slice(-4).map(m => ({
              speaker: m.sender === 'user' ? 'user' : 'advisor',
              text: m.text
            }))
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data?.reply && typeof data.reply === 'string') {
            replyData = {
              reply: data.reply,
              sourceType: 'live',
              citations: [
                {
                  title: `Veylo AI Trade Intelligence · ${data.recommendedView ? 'Panel ' + data.recommendedView : 'Konsultasi Ekspor'}`,
                  source: data.recommendedRoute ? `Rute Rekomendasi: ${data.recommendedRoute}` : 'Live OpenRouter Model'
                }
              ]
            };
            liveSuccess = true;
            break;
          }
        }
      } catch {
        // Try fallback endpoint or offline
      }
    }
    window.clearTimeout(timeoutId);

    if (!liveSuccess) {
      const offline = buildOfflineAdvisorReply(query);
      replyData = {
        ...offline,
        sourceType: 'knowledge_base'
      };
    }

    const aiMsg: ChatMessage = {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      text: replyData.reply,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      citations: replyData.citations,
      contextTag: isMetaQuery(query) ? undefined : selectedShipment?.label,
      sourceType: replyData.sourceType
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  const filteredKb = REGULASI_KB_DATA.filter(item => {
    const matchCat = selectedCategory === 'ALL' || item.kategori === selectedCategory || item.kategori === 'semua_kategori';
    const matchSearch = item.judul.toLowerCase().includes(kbSearch.toLowerCase()) ||
                        item.ringkasan.toLowerCase().includes(kbSearch.toLowerCase()) ||
                        item.negaraTujuan.toLowerCase().includes(kbSearch.toLowerCase()) ||
                        item.tags.some(t => t.toLowerCase().includes(kbSearch.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
        <div className="min-w-0">
          <div className="ui-label">Workspace konsultasi ekspor</div>
          <div className="mt-1 text-sm text-slate-600">Pilih konteks kargo, ajukan pertanyaan, lalu buka rujukan regulasi bila perlu.</div>
        </div>
        <div className="flex w-full items-center rounded-lg bg-slate-100 p-1 sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveTab('chat')}
            className={`min-h-10 flex-1 rounded-md px-3 text-sm font-semibold transition sm:flex-none ${activeTab === 'chat' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            <span className="inline-flex items-center gap-2"><Bot size={15}/> Konsultasi</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('kb')}
            className={`min-h-10 flex-1 rounded-md px-3 text-sm font-semibold transition sm:flex-none ${activeTab === 'kb' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            <span className="inline-flex items-center gap-2"><BookOpen size={15}/> Basis Regulasi <span className="text-xs text-slate-400">{REGULASI_KB_DATA.length}</span></span>
          </button>
        </div>
      </div>

      {activeTab === 'chat' && (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_330px]">
          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="border-b border-slate-200 bg-white p-4 sm:p-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700"><Package size={17}/></span>
                    Konteks konsultasi
                  </div>
                  <p className="mt-1 text-xs leading-5 text-slate-500">Jawaban akan memprioritaskan komoditas, negara tujuan, HS Code, dan kebutuhan dokumen pada konteks terpilih.</p>
                </div>
                <div className="flex min-w-0 flex-1 items-center gap-2 lg:max-w-xl">
                  <select
                    value={selectedShipment?.id || ''}
                    onChange={(e) => handleShipmentContextChange(e.target.value)}
                    className="min-h-11 min-w-0 flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-800 focus:border-emerald-600 focus:bg-white focus:outline-none"
                    aria-label="Pilih konteks pengiriman"
                  >
                    <option value="">Umum / tanpa konteks kargo</option>
                    {SHIPMENT_CONTEXTS.map(sc => <option key={sc.id} value={sc.id}>{sc.label}</option>)}
                  </select>
                  {selectedShipment && (
                    <button type="button" onClick={() => setSelectedShipment(null)} className="min-h-11 shrink-0 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 hover:bg-slate-50">Hapus</button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex h-[min(66dvh,700px)] min-h-[540px] flex-col bg-slate-50/50">
              <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3 sm:px-5">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-600 animate-pulse" />
                  <span className="truncate text-sm font-semibold text-slate-900">Asisten Regulasi Ekspor Tangsel</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200">
                    <Zap size={11} className="text-emerald-600" /> Live AI Engine
                  </span>
                </div>
                <button type="button" onClick={handleResetChat} className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-lg px-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-900">
                  <RotateCcw size={14}/> Reset
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-5">
                <div className="mx-auto max-w-3xl space-y-4">
                  {messages.map((m) => (
                    <div key={m.id} className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {m.sender === 'ai' && <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800"><Bot size={18}/></div>}
                      <div className={`max-w-[88%] rounded-xl px-4 py-3 text-sm leading-6 sm:max-w-[82%] ${m.sender === 'user' ? 'bg-emerald-700 text-white' : 'border border-slate-200 bg-white text-slate-800'}`}>
                        {m.sender === 'ai' && (
                          <div className="mb-2 flex items-center justify-between gap-2 border-b border-slate-100 pb-1.5 text-[11px]">
                            {m.contextTag ? (
                              <div className="flex items-center gap-1.5 font-semibold text-emerald-800 truncate">
                                <Package size={12}/>
                                <span className="truncate">{m.contextTag}</span>
                              </div>
                            ) : (
                              <span className="font-semibold text-slate-500">Konsultasi Ekspor</span>
                            )}
                            <span className={`shrink-0 rounded px-1.5 py-0.5 font-medium ${
                              m.sourceType === 'live'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-slate-100 text-slate-600'
                            }`}>
                              {m.sourceType === 'live' ? '⚡ Live AI Advisor' : '📚 Basis Regulasi'}
                            </span>
                          </div>
                        )}
                        <div>{renderMessageText(m.text)}</div>
                        {m.citations && m.citations.length > 0 && (
                          <div className="mt-3 space-y-2 border-t border-slate-100 pt-3">
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600"><BookOpen size={13} className="text-emerald-700"/> Rujukan</div>
                            {m.citations.map((c, i) => <div key={i} className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600"><strong className="text-slate-800">{c.title}</strong><span className="mx-1">·</span>{c.source}</div>)}
                          </div>
                        )}
                        <div className={`mt-2 text-right text-[11px] ${m.sender === 'user' ? 'text-emerald-100' : 'text-slate-400'}`}>{m.timestamp}</div>
                      </div>
                    </div>
                  ))}

                  {messages.length <= 1 && !isTyping && (
                    <div className="ml-0 rounded-xl border border-dashed border-slate-300 bg-white/70 p-4 sm:ml-12">
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Mulai dari pertanyaan berikut</div>
                      <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2">
                        {activePrompts.slice(0, 4).map((q, idx) => (
                          <button key={idx} type="button" onClick={() => handleSend(q)} className="min-h-11 rounded-lg border border-slate-200 bg-white px-3 py-2 text-left text-sm leading-5 text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50">{q}</button>
                        ))}
                      </div>
                    </div>
                  )}

                  {isTyping && <div className="flex items-center gap-2 text-sm text-slate-500"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-600"/> Menyiapkan jawaban berdasarkan referensi regulasi...</div>}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              <div className="border-t border-slate-200 bg-white p-3 sm:p-4">
                <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="mx-auto flex max-w-3xl items-end gap-2">
                  <div className="min-w-0 flex-1">
                    <label htmlFor="advisor-message" className="sr-only">Pertanyaan regulasi ekspor</label>
                    <input
                      id="advisor-message"
                      type="text"
                      placeholder={selectedShipment ? `Tanyakan persyaratan untuk ${selectedShipment.productName}...` : 'Tanyakan HS Code, sertifikasi, dokumen, atau aturan negara tujuan...'}
                      value={inputPrompt}
                      onChange={e => setInputPrompt(e.target.value)}
                      className="min-h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-600 focus:bg-white focus:outline-none"
                    />
                  </div>
                  <button type="submit" disabled={!inputPrompt.trim() || isTyping} className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-emerald-700 px-4 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-40"><Send size={16}/> <span className="hidden sm:inline">Kirim</span></button>
                </form>
              </div>
            </div>
          </section>

          <aside className="space-y-4">
            {selectedShipment ? (
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-start gap-3">
                  <CountryFlag code={selectedShipment.countryCode} title={selectedShipment.destinationCountry} className="h-7 w-10 shrink-0" />
                  <div className="min-w-0">
                    <div className="ui-label">Konteks aktif</div>
                    <div className="mt-1 text-sm font-bold leading-5 text-slate-900">{selectedShipment.productName}</div>
                    <div className="mt-0.5 text-xs text-slate-500">HS {selectedShipment.hsCode} · {selectedShipment.destinationCountry}</div>
                  </div>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3 border-t border-slate-100 pt-4 text-xs">
                  <div><dt className="text-slate-400">FOB</dt><dd className="mt-0.5 font-semibold text-slate-800">${selectedShipment.fobValueUsd.toLocaleString()}</dd></div>
                  <div><dt className="text-slate-400">Incoterm</dt><dd className="mt-0.5 font-semibold text-slate-800">{selectedShipment.incoterm}</dd></div>
                  <div><dt className="text-slate-400">Moda</dt><dd className="mt-0.5 font-semibold text-slate-800">{selectedShipment.shippingMode === 'AIR_EXPRESS' ? 'Air Express' : 'Ocean LCL'}</dd></div>
                  <div><dt className="text-slate-400">Volume</dt><dd className="mt-0.5 font-semibold text-slate-800 line-clamp-2">{selectedShipment.volume}</dd></div>
                </dl>
                <div className="mt-4 border-t border-slate-100 pt-4">
                  <div className="text-xs font-semibold text-slate-700">Kepatuhan utama</div>
                  <div className="mt-2 space-y-2">
                    {selectedShipment.keyCompliance.map((item, i) => <div key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600"><CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-600"/><span>{item}</span></div>)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600"><div className="font-semibold text-slate-900">Konsultasi umum</div><p className="mt-1 leading-5">Pilih konteks kargo jika Anda ingin jawaban disesuaikan dengan produk, HS Code, dan negara tujuan tertentu.</p></div>
            )}

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500"><HelpCircle size={14} className="text-emerald-700"/> Pertanyaan cepat</div>
              <div className="mt-3 space-y-2">
                {activePrompts.slice(0, 3).map((q, idx) => <button key={idx} type="button" onClick={() => handleSend(q)} className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-left text-sm leading-5 text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50">{q}</button>)}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 text-xs leading-5 text-slate-500">
              <div className="flex items-center gap-2 font-semibold text-slate-800"><ShieldCheck size={14} className="text-emerald-700"/> Basis referensi</div>
              <p className="mt-2">Jawaban mengacu pada basis regulasi terkurasi dan perlu diverifikasi kembali terhadap ketentuan terbaru instansi penerbit sebelum transaksi atau pengapalan.</p>
              <a href="https://veylo.163.61.44.41.sslip.io/app" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-3 font-semibold text-white hover:bg-slate-800"><Video size={14}/> Buka Ruang Negosiasi</a>
            </div>
          </aside>
        </div>
      )}

      {activeTab === 'kb' && (
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Cari regulasi, negara tujuan, atau dokumen wajib..." value={kbSearch} onChange={e => setKbSearch(e.target.value)} className="min-h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-600 focus:bg-white focus:outline-none" />
            </div>
            <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="min-h-11 rounded-lg border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-800 focus:border-emerald-600 focus:bg-white focus:outline-none">
              <option value="ALL">Semua Kategori</option>
              <option value="food_beverage">Food & Beverage</option>
              <option value="furniture_dekor">Furniture & Kerajinan Bambu</option>
              <option value="semua_kategori">Kepabeanan & PEB Umum</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filteredKb.map(item => (
              <button type="button" key={item.id} onClick={() => setSelectedArticle(item)} className="group rounded-xl border border-slate-200 bg-white p-5 text-left transition hover:border-emerald-400 hover:shadow-sm">
                <div className="flex items-start justify-between gap-3"><h3 className="text-sm font-bold leading-5 text-slate-900 group-hover:text-emerald-800">{item.judul}</h3><span className="shrink-0 rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">{item.negaraTujuan}</span></div>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{item.ringkasan}</p>
                <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                  {item.dokumenWajib.slice(0, 3).map((doc, i) => <div key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600"><CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-600"/>{doc}</div>)}
                </div>
                <div className="mt-4 text-xs font-semibold text-emerald-700">Buka panduan lengkap →</div>
              </button>
            ))}
          </div>

          {selectedArticle && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <button type="button" className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={() => setSelectedArticle(null)} aria-label="Tutup detail regulasi" />
              <div className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:p-6">
                <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
                  <div><div className="ui-label">Panduan regulasi ekspor</div><h3 className="mt-1 text-lg font-bold text-slate-900">{selectedArticle.judul}</h3><div className="mt-1 text-sm text-slate-500">Target: {selectedArticle.negaraTujuan}</div></div>
                  <button type="button" onClick={() => setSelectedArticle(null)} className="tap-target inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200" aria-label="Tutup"><X size={18}/></button>
                </div>
                <p className="mt-5 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">{selectedArticle.ringkasan}</p>
                <div className="mt-5"><h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Dokumen wajib</h4><div className="mt-2 space-y-2">{selectedArticle.dokumenWajib.map((doc,i)=><div key={i} className="flex items-start gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-600"/>{doc}</div>)}</div></div>
                <div className="mt-5 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-900"><strong>Dasar regulasi:</strong> {selectedArticle.sumberRegulasi}</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
