import React, { useState } from 'react';
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
  Video
} from 'lucide-react';
import { REGULASI_KB_DATA, type RegulasiKbItem } from '../data/regulasiKbData';

export interface ShipmentContext {
  id: string;
  label: string;
  exporterName: string;
  productName: string;
  hsCode: string;
  destinationCountry: string;
  destinationPort: string;
  volume: string;
  fobValueUsd: number;
  incoterm: 'FOB' | 'CIF' | 'EXW';
  shippingMode: 'AIR_EXPRESS' | 'OCEAN_LCL';
  keyCompliance: string[];
  suggestedQuestions: string[];
}

export const DEMO_SHIPMENT_CONTEXTS: ShipmentContext[] = [
  {
    id: 'shipment-01',
    label: 'Kargo #EXP-2026-001: Kopi Robusta Sangrai ke Amsterdam (Belanda / EUDR)',
    exporterName: 'Koperasi Kopi Robusta Ciputat Mandiri',
    productName: 'Specialty Java Robusta Roasted Beans',
    hsCode: '0901.21.00',
    destinationCountry: 'Belanda (Uni Eropa)',
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
}

export const AiAdvisorView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'kb'>('chat');
  const [inputPrompt, setInputPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [kbSearch, setKbSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedArticle, setSelectedArticle] = useState<RegulasiKbItem | null>(null);

  // Selected Shipment Context for Consulting
  const [selectedShipment, setSelectedShipment] = useState<ShipmentContext | null>(DEMO_SHIPMENT_CONTEXTS[0]);

  const initialMessage: ChatMessage = {
    id: 'm-1',
    sender: 'ai',
    text: `Halo! Saya Tangsel AI Export Advisor (OpenRouter & RAG Regulasi Kemendag). Saya siap membantu konsultasi kepatuhan regulasi ekspor, HS Code, sertifikasi internasional (EUDR, Halal UAE, US FDA), dan kelengkapan dokumen PEB kepabeanan.

Saat ini konteks konsultasi terhubung ke: **${DEMO_SHIPMENT_CONTEXTS[0].label}**. Anda dapat menanyakan persyaratan regulasi spesifik untuk pengapalan ini atau memilih pengapalan lain melalui menu konteks di atas.`,
    timestamp: '08:30 WIB',
    contextTag: DEMO_SHIPMENT_CONTEXTS[0].label
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);

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
    const found = DEMO_SHIPMENT_CONTEXTS.find(s => s.id === contextId) || null;
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

  const buildOfflineAdvisorReply = (query: string): { reply: string; citations: { title: string; source: string }[] } => {
    let reply = '';
    let citations: { title: string; source: string }[] = [];
    const q = query.toLowerCase();
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

    // If tied to shipment context, provide tailored response
    const ctxPrefix = selectedShipment
      ? `[Konteks: ${selectedShipment.productName} - HS: ${selectedShipment.hsCode} ke ${selectedShipment.destinationCountry}]\n\n`
      : '';

    if (q.includes('kopi') || q.includes('eudr') || q.includes('eropa') || (selectedShipment?.id === 'shipment-01' && (q.includes('deforestasi') || q.includes('traces') || q.includes('mrl') || q.includes('residu') || q.includes('phytosanitary')))) {
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
      reply = `${ctxPrefix}Berdasarkan basis pengetahuan regulasi ekspor Disperindag Tangsel: Setiap pengapalan komoditas memerlukan verifikasi NIB kepabeanan, standar mutu sertifikasi teknis (SNI/BPOM/Halal/Organik), dan kelengkapan dokumen pelayaran (Invoice, Packing List, Certificate of Origin). Silakan gunakan salah satu pertanyaan cepat yang tersedia untuk petunjuk rinci per komoditas.`;
      citations = [{
        title: 'Tata Laksana Kepabeanan Pemberitahuan Ekspor Barang (PEB)',
        source: 'Peraturan Dirjen Bea dan Cukai No. PER-07/BC/2023'
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

    let replyData: { reply: string; citations: { title: string; source: string }[] };
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 6000);

    try {
      const response = await fetch('https://veylo.163.61.44.41.sslip.io/app/api/trade-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          message: query,
          history: messages.slice(-4).map(m => ({
            speaker: m.sender === 'user' ? 'user' : 'advisor',
            text: m.text
          }))
        })
      });
      if (!response.ok) throw new Error('Live advisor unavailable');
      const data = await response.json();
      if (!data?.reply || typeof data.reply !== 'string') throw new Error('Live advisor returned no reply');
      replyData = {
        reply: data.reply,
        citations: [{
          title: 'OpenRouter Live Trade Intelligence (Ditjen PEN & INSW Grounded)',
          source: 'Veylo Trade Chat Cloud Endpoint'
        }]
      };
    } catch {
      replyData = buildOfflineAdvisorReply(query);
    } finally {
      window.clearTimeout(timeoutId);
    }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyData.reply,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
        citations: replyData.citations,
        contextTag: selectedShipment?.label
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
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 shrink-0">
            <Bot size={28} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase bg-emerald-100 text-emerald-800 border border-emerald-200">
                OPENROUTER & RAG KEMENDAG
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-green-100 text-green-800 border border-green-300">
                Live Trade Intelligence (OpenRouter Cloud + Offline Fallback)
              </span>
              <span className="text-xs text-slate-500 font-medium">Asisten Regulasi Ekspor Tangsel</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight mt-1">
              Konsultasi Cerdas Regulasi, Sertifikasi, & Standar Perdagangan Internasional
            </h2>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
              Panduan interaktif kepatuhan regulasi ekspor (EUDR, Halal UAE, US FDA, SVLK) terintegrasi dengan data kargo IKM binaan Tangerang Selatan.
            </p>
          </div>
        </div>

        {/* Tab Controls & Veylo Link */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto shrink-0">
          <a
            href="https://veylo.163.61.44.41.sslip.io/app"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5"
          >
            <Video size={14} />
            <span>Veylo Trade Room</span>
          </a>
          <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs">
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-3.5 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                activeTab === 'chat'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Bot size={14} />
              Chat AI Advisor
            </button>
            <button
              onClick={() => setActiveTab('kb')}
              className={`px-3.5 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                activeTab === 'kb'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen size={14} />
              Basis Regulasi ({REGULASI_KB_DATA.length})
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: INTERACTIVE CHAT UI */}
      {activeTab === 'chat' && (
        <div className="space-y-4">
          {/* SHIPMENT CONTEXT SELECTOR BAR */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <Package size={20} className="text-emerald-700 shrink-0" />
              <div>
                <span className="font-bold text-slate-900 block">Pilih Konteks Pengiriman Kargo (Shipment Context):</span>
                <span className="text-[11px] text-slate-500 font-medium">Pertanyaan dan respons AI akan merujuk ke data pengapalan komoditas terpilih</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedShipment?.id || ''}
                onChange={(e) => handleShipmentContextChange(e.target.value)}
                className="w-full md:w-auto px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium focus:bg-white focus:border-emerald-600"
              >
                <option value="">-- Umum / Tanpa Konteks Kargo Khusus --</option>
                {DEMO_SHIPMENT_CONTEXTS.map(sc => (
                  <option key={sc.id} value={sc.id}>{sc.label}</option>
                ))}
              </select>

              {selectedShipment && (
                <button
                  onClick={() => setSelectedShipment(null)}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold shrink-0 transition"
                  title="Bersihkan Konteks"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Active Context Card (if selected) */}
          {selectedShipment && (
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-2.5 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                    Konteks Kargo Aktif
                  </span>
                  <span className="font-bold text-slate-900">{selectedShipment.productName}</span>
                  <span className="text-slate-500 font-mono text-[11px] font-medium">(HS: {selectedShipment.hsCode})</span>
                </div>
                <div className="text-right text-xs">
                  <span className="text-slate-600">Nilai FOB: </span>
                  <strong className="text-emerald-800 font-bold">${selectedShipment.fobValueUsd.toLocaleString()} USD</strong>
                  <span className="text-slate-400 mx-1.5">•</span>
                  <span className="text-slate-600">Moda: </span>
                  <strong className="text-blue-800 font-bold">{selectedShipment.shippingMode}</strong>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-700 pt-1">
                <div>
                  <span className="text-slate-500">Eksportir Tangsel: </span>
                  <strong className="text-slate-900">{selectedShipment.exporterName}</strong>
                </div>
                <div>
                  <span className="text-slate-500">Tujuan: </span>
                  <strong className="text-slate-900">{selectedShipment.destinationCountry} ({selectedShipment.destinationPort})</strong>
                </div>
                <div>
                  <span className="text-slate-500">Volume: </span>
                  <strong className="text-slate-900">{selectedShipment.volume}</strong>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-emerald-200 text-[11px]">
                <span className="text-slate-600 font-bold">Standar Kepatuhan:</span>
                {selectedShipment.keyCompliance.map((k, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-white text-emerald-900 border border-emerald-300 font-bold shadow-2xs">
                    ✓ {k}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Chat Box (3 Cols) */}
            <div className="lg:col-span-3 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col h-[600px] overflow-hidden">
              {/* Chat Box Top Header */}
              <div className="p-3.5 px-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                  <span className="font-bold text-slate-900">Konsultasi AI Export Advisor</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    ONLINE RAG
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-600 font-medium">Disperindag Kota Tangsel</span>
                </div>
                <button
                  onClick={handleResetChat}
                  className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-xs font-semibold shadow-2xs"
                  title="Mulai percakapan baru"
                >
                  <RotateCcw size={13} />
                  <span>Reset Chat</span>
                </button>
              </div>

              {/* Messages Thread */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/40">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex gap-3 text-xs ${
                      m.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {m.sender === 'ai' && (
                      <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 border border-blue-300 flex items-center justify-center shrink-0 shadow-2xs">
                        <Bot size={18} />
                      </div>
                    )}

                    <div
                      className={`max-w-2xl p-4 rounded-2xl space-y-2.5 ${
                        m.sender === 'user'
                          ? 'bg-emerald-600 text-white rounded-br-none shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-xs'
                      }`}
                    >
                      {m.contextTag && m.sender === 'ai' && (
                        <div className="text-[11px] text-emerald-800 font-bold border-b border-slate-100 pb-1 flex items-center gap-1">
                          <Package size={13} />
                          <span className="truncate">{m.contextTag}</span>
                        </div>
                      )}

                      <div className="whitespace-pre-line leading-relaxed text-xs font-normal">
                        {m.text}
                      </div>

                      {/* Citations Card if AI */}
                      {m.citations && m.citations.length > 0 && (
                        <div className="pt-2 border-t border-slate-100 text-xs space-y-1">
                          <span className="text-slate-600 font-bold flex items-center gap-1">
                            <BookOpen size={13} className="text-emerald-700" />
                            Rujukan Regulasi Resmi:
                          </span>
                          {m.citations.map((c, i) => (
                            <div key={i} className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950 font-medium">
                              <strong className="text-slate-900">{c.title}</strong> — <span className="text-slate-600">{c.source}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className={`text-[10px] text-right font-medium ${m.sender === 'user' ? 'text-emerald-100' : 'text-slate-400'}`}>
                        {m.timestamp}
                      </div>
                    </div>

                    {m.sender === 'user' && (
                      <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-800 flex items-center justify-center shrink-0 font-bold text-xs shadow-2xs">
                        TS
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-medium italic">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                    AI Advisor sedang menelusuri basis regulasi ekspor Kemendag...
                  </div>
                )}
              </div>

              {/* Input Bar */}
              <div className="p-3.5 border-t border-slate-200 bg-white">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    placeholder={selectedShipment ? `Tanyakan regulasi untuk ${selectedShipment.productName}...` : "Ketik pertanyaan regulasi ekspor, HS Code, sertifikasi, atau dokumen PEB..."}
                    value={inputPrompt}
                    onChange={e => setInputPrompt(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white text-xs font-medium transition"
                  />
                  <button
                    type="submit"
                    disabled={!inputPrompt.trim() || isTyping}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold text-xs transition shadow-xs flex items-center gap-1.5"
                  >
                    <Send size={15} />
                    Kirim
                  </button>
                </form>
              </div>
            </div>

            {/* Sidecar Col: Context-Aware Quick Prompts */}
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <HelpCircle size={15} className="text-emerald-700" />
                  {selectedShipment ? 'Pertanyaan Kargo Terpilih' : 'Pertanyaan Cepat (FAQ Ekspor)'}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {selectedShipment 
                    ? `Topik yang disesuaikan dengan ${selectedShipment.productName} (${selectedShipment.destinationCountry}):`
                    : 'Klik salah satu topik di bawah untuk melihat rujukan regulasi ekspor:'}
                </p>

                <div className="space-y-2">
                  {activePrompts.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(q)}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-left text-xs text-slate-700 hover:text-slate-900 transition leading-snug font-medium shadow-2xs"
                    >
                      "{q}"
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Notice */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <Info size={14} className="text-blue-600" />
                  <span>Keterangan Basis Pengetahuan:</span>
                </div>
                <p className="leading-relaxed text-[11px]">
                  Modul AI Advisor merujuk pada standar kepatuhan regulasi terkurasi Disperindag Tangsel, Kemendag RI, Bea Cukai, dan ketentuan standar pasar mitra internasional TEI 2026.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: KNOWLEDGE BASE BROWSER */}
      {activeTab === 'kb' && (
        <div className="space-y-4">
          {/* Search & Filter */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari artikel regulasi, negara tujuan, atau dokumen wajib..."
                value={kbSearch}
                onChange={e => setKbSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white text-xs font-medium transition"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium focus:outline-none focus:border-emerald-600 focus:bg-white"
            >
              <option value="ALL">Semua Kategori</option>
              <option value="food_beverage">Food & Beverage</option>
              <option value="furniture_dekor">Furniture & Kerajinan Bambu</option>
              <option value="semua_kategori">Kepabeanan & PEB Umum</option>
            </select>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredKb.map(item => (
              <div
                key={item.id}
                onClick={() => setSelectedArticle(item)}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 text-xs hover:border-emerald-500 cursor-pointer transition group"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition leading-tight">
                    {item.judul}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200 shrink-0">
                    {item.negaraTujuan}
                  </span>
                </div>

                <p className="text-slate-600 leading-relaxed line-clamp-3 font-medium">
                  {item.ringkasan}
                </p>

                {/* Required Documents */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-700 block">
                    Dokumen & Sertifikasi Wajib:
                  </span>
                  <div className="space-y-1 text-xs">
                    {item.dokumenWajib.slice(0, 3).map((doc, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-slate-700">
                        <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                        <span className="truncate">{doc}</span>
                      </div>
                    ))}
                    {item.dokumenWajib.length > 3 && (
                      <div className="text-[11px] text-emerald-700 font-bold pl-5">
                        +{item.dokumenWajib.length - 3} dokumen lainnya (klik untuk melihat)
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                  <span className="italic truncate max-w-[200px]">Ref: {item.sumberRegulasi}</span>
                  <span className="text-emerald-700 font-bold group-hover:translate-x-0.5 transition">
                    Buka Panduan Lengkap →
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Article Detail Modal */}
          {selectedArticle && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={() => setSelectedArticle(null)} />
              <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 space-y-5 text-xs max-h-[85vh] overflow-y-auto">
                <div className="flex justify-between items-start border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                      Dokumen Regulasi Ekspor Resmi
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5">{selectedArticle.judul}</h3>
                    <div className="text-xs text-slate-600 mt-0.5 font-medium">
                      Target Wilayah: <strong className="text-slate-900">{selectedArticle.negaraTujuan}</strong>
                    </div>
                  </div>
                  <button onClick={() => setSelectedArticle(null)} className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900 transition">
                    <X size={18} />
                  </button>
                </div>

                <div className="space-y-2 text-slate-800 leading-relaxed text-xs">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Ringkasan Ketentuan:</h4>
                  <p className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed font-medium">{selectedArticle.ringkasan}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Daftar Dokumen Wajib:</h4>
                  <div className="space-y-1.5">
                    {selectedArticle.dokumenWajib.map((doc, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5 text-slate-800 font-medium">
                        <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-medium">
                  <strong>Dasar Hukum Regulasi:</strong> {selectedArticle.sumberRegulasi}
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
