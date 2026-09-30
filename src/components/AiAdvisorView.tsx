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
  ArrowRight
} from 'lucide-react';
import { REGULASI_KB_DATA, type RegulasiKbItem } from '../data/regulasiKbData';
import { CountryFlag } from './CountryFlag';
import { VEYLO_BASE_URL, VEYLO_CHAT_API_URL } from '../lib/veyloBridge';

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
  followUps?: string[];
  kind?: 'message' | 'context_notice';
}

type CitationPreviewState = {
  citation: { title: string; source: string };
  matches: RegulasiKbItem[];
};

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


type ContextInputMode = 'saved' | 'manual';

type ManualContextState = {
  exporterName: string;
  productName: string;
  hsCode: string;
  destinationCountry: string;
  destinationPort: string;
  volume: string;
  fobValueUsd: string;
  incoterm: ShipmentContext['incoterm'];
  shippingMode: ShipmentContext['shippingMode'];
  certifications: string;
  primaryNeed: string;
};

const EMPTY_MANUAL_CONTEXT: ManualContextState = {
  exporterName: '',
  productName: '',
  hsCode: '',
  destinationCountry: '',
  destinationPort: '',
  volume: '',
  fobValueUsd: '',
  incoterm: 'FOB',
  shippingMode: 'AIR_EXPRESS',
  certifications: '',
  primaryNeed: ''
};

const resolveCountryCode = (country: string): string => {
  const normalized = country.trim().toLowerCase();
  const mappings: Array<[string[], string]> = [
    [['belanda', 'netherlands', 'holland'], 'NL'],
    [['kamerun', 'cameroon'], 'CM'],
    [['uni emirat arab', 'uae', 'emirates', 'dubai'], 'AE'],
    [['amerika serikat', 'united states', 'usa', 'us'], 'US'],
    [['jerman', 'germany'], 'DE'],
    [['singapura', 'singapore'], 'SG'],
    [['china', 'tiongkok'], 'CN'],
    [['jepang', 'japan'], 'JP'],
    [['australia'], 'AU'],
    [['indonesia'], 'ID']
  ];
  return mappings.find(([names]) => names.some(name => normalized.includes(name)))?.[1]
    || normalized.replace(/[^a-z]/g, '').slice(0, 2).toUpperCase();
};

const currentWibTime = () => new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';

const createWelcomeMessage = (context: ShipmentContext | null): ChatMessage => ({
  id: `welcome-${Date.now()}`,
  sender: 'ai',
  text: context
    ? `Data ekspor sudah aktif untuk **${context.productName}** menuju **${context.destinationCountry}**. Saya akan menggunakan informasi produk, HS Code, tujuan, moda pengiriman, Incoterm, dan kepatuhan yang Anda berikan sebagai konteks jawaban.\n\nSilakan tulis kebutuhan utama Anda, misalnya dokumen wajib, klasifikasi HS Code, sertifikasi, ketentuan negara tujuan, atau prosedur kepabeanan.`
    : 'Konsultasi umum siap digunakan. Tanyakan HS Code, dokumen ekspor, sertifikasi, ketentuan negara tujuan, atau prosedur kepabeanan. Anda dapat menambahkan Data Ekspor kapan saja agar jawaban lebih spesifik.',
  timestamp: currentWibTime(),
  contextTag: context?.label,
  sourceType: 'knowledge_base',
  followUps: context ? context.suggestedQuestions.slice(0, 3) : [
    'Apa dokumen dasar yang harus disiapkan sebelum ekspor?',
    'Bagaimana menentukan HS Code produk saya?',
    'Sertifikasi apa yang biasanya diminta negara tujuan?'
  ]
});

const PRODUCT_CONTEXT_HINTS: Array<{ contextId: string; patterns: RegExp[] }> = [
  { contextId: 'shipment-01', patterns: [/\bkopi\b/i, /robusta/i, /coffee/i] },
  { contextId: 'shipment-02', patterns: [/gula\s*aren/i, /palm\s*sugar/i, /arenga/i] },
  { contextId: 'shipment-03', patterns: [/jahe/i, /ginger/i] },
  { contextId: 'shipment-04', patterns: [/bambu/i, /bamboo/i, /cutlery/i] },
  { contextId: 'shipment-05', patterns: [/sambal/i, /\broa\b/i, /retort/i] }
];

const COUNTRY_CONTEXT_HINTS: Array<{ contextId: string; patterns: RegExp[] }> = [
  { contextId: 'shipment-01', patterns: [/belanda/i, /netherlands/i, /amsterdam/i, /rotterdam/i] },
  { contextId: 'shipment-02', patterns: [/kamerun/i, /cameroon/i, /douala/i] },
  { contextId: 'shipment-03', patterns: [/uni emirat arab/i, /\buae\b/i, /dubai/i, /emirates/i] },
  { contextId: 'shipment-04', patterns: [/jerman/i, /germany/i, /munich/i, /hamburg/i] },
  { contextId: 'shipment-05', patterns: [/amerika/i, /united states/i, /\busa\b/i, /los angeles/i, /\bfda\b/i] }
];

const getContextById = (id?: string | null) => SHIPMENT_CONTEXTS.find(item => item.id === id) || null;

const detectContextFromQuery = (query: string, current: ShipmentContext | null): ShipmentContext | null => {
  const productHint = PRODUCT_CONTEXT_HINTS.find(hint => hint.patterns.some(pattern => pattern.test(query)));
  const countryHint = COUNTRY_CONTEXT_HINTS.find(hint => hint.patterns.some(pattern => pattern.test(query)));
  const productContext = getContextById(productHint?.contextId);
  const countryContext = getContextById(countryHint?.contextId);

  if (productContext && countryContext) {
    if (productContext.id === countryContext.id) return productContext;
    return {
      ...productContext,
      id: `detected-${productContext.id}-${countryContext.countryCode}`,
      label: `${productContext.productName} → ${countryContext.destinationCountry}`,
      destinationCountry: countryContext.destinationCountry,
      countryCode: countryContext.countryCode,
      destinationPort: countryContext.destinationPort,
      keyCompliance: [],
      suggestedQuestions: [
        `Dokumen apa saja yang wajib untuk ekspor ${productContext.productName} ke ${countryContext.destinationCountry}?`,
        `Apakah HS Code ${productContext.hsCode} memiliki ketentuan khusus di ${countryContext.destinationCountry}?`,
        `Sertifikasi apa yang perlu diprioritaskan untuk ${productContext.productName} di ${countryContext.destinationCountry}?`
      ]
    };
  }

  if (productContext && productContext.id !== current?.id) return productContext;

  if (countryContext && current && countryContext.countryCode !== current.countryCode) {
    return {
      ...current,
      id: `detected-${current.id}-${countryContext.countryCode}`,
      label: `${current.productName} → ${countryContext.destinationCountry}`,
      destinationCountry: countryContext.destinationCountry,
      countryCode: countryContext.countryCode,
      destinationPort: countryContext.destinationPort,
      keyCompliance: [],
      suggestedQuestions: [
        `Apa persyaratan impor untuk ${current.productName} di ${countryContext.destinationCountry}?`,
        `Dokumen asal dan kepabeanan apa yang perlu disiapkan untuk ${countryContext.destinationCountry}?`,
        `Apakah ada sertifikasi khusus untuk ${current.productName} di ${countryContext.destinationCountry}?`
      ]
    };
  }

  return null;
};

const buildDynamicFollowUps = (query: string, context: ShipmentContext | null): string[] => {
  const q = query.toLowerCase();
  if (q.includes('phytosanitary') || q.includes('eudr') || q.includes('kopi') || q.includes('residu')) {
    return ['Berapa biaya dan alur pemeriksaan karantina di CGK?', 'Bagaimana format Due Diligence Statement EUDR?', 'Berapa batas residu pestisida (MRL) untuk produk ini?'];
  }
  if (q.includes('sambal') || q.includes('retort') || q.includes('fda') || q.includes('amerika')) {
    return ['Bagaimana proses FCE & SID untuk pangan retort?', 'Kapan Prior Notice FDA harus diajukan?', 'Apa format label Nutrition Facts yang harus dipakai?'];
  }
  if (q.includes('halal') || q.includes('uae') || q.includes('dubai') || q.includes('jahe')) {
    return ['Apakah sertifikat Halal BPJPH langsung diakui?', 'Apa syarat label Arab–Inggris?', 'Health Certificate apa yang perlu disiapkan?'];
  }
  if (q.includes('bambu') || q.includes('svlk') || q.includes('v-legal') || q.includes('jerman')) {
    return ['Bagaimana validasi dokumen V-Legal?', 'Apakah fumigasi wajib untuk pengiriman ini?', 'Uji food-contact apa yang diperlukan di Uni Eropa?'];
  }
  if (q.includes('kamerun') || q.includes('cameroon') || q.includes('gula aren')) {
    return ['Apakah perlu inspeksi pra-pengapalan ke Kamerun?', 'Dokumen COO/SKA apa yang digunakan?', 'Bagaimana melindungi produk dari kelembapan selama pelayaran?'];
  }
  if (q.includes('peb') || q.includes('bea cukai') || q.includes('kepabeanan') || q.includes('lartas')) {
    return ['Dokumen apa saja yang dilampirkan ke PEB?', 'Bagaimana mengecek status Lartas HS Code?', 'Kapan NPE diterbitkan oleh Bea Cukai?'];
  }
  const candidates = context?.suggestedQuestions?.length ? context.suggestedQuestions : [
    'Dokumen ekspor apa yang perlu diprioritaskan?',
    'Apakah HS Code produk ini sudah tepat?',
    'Sertifikasi apa yang perlu diverifikasi berikutnya?'
  ];
  return candidates.filter(item => item.toLowerCase() !== q).slice(0, 3);
};

const createContextNotice = (context: ShipmentContext | null): ChatMessage => ({
  id: `context-${Date.now()}`,
  sender: 'ai',
  kind: 'context_notice',
  text: context ? `Konteks dialihkan ke: ${context.productName} → ${context.destinationCountry}` : 'Konteks data ekspor dilepas. Konsultasi dilanjutkan dalam mode umum.',
  timestamp: currentWibTime()
});

export const AiAdvisorView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'kb'>('chat');
  const [inputPrompt, setInputPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [kbSearch, setKbSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedArticle, setSelectedArticle] = useState<RegulasiKbItem | null>(null);
  const [citationPreview, setCitationPreview] = useState<CitationPreviewState | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  const [contextMode, setContextMode] = useState<ContextInputMode>('saved');
  const [savedContextId, setSavedContextId] = useState(SHIPMENT_CONTEXTS[0].id);
  const [manualContext, setManualContext] = useState<ManualContextState>(EMPTY_MANUAL_CONTEXT);
  const [showAdvancedContext, setShowAdvancedContext] = useState(false);
  const [contextError, setContextError] = useState('');
  const [contextPanelOpen, setContextPanelOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<ShipmentContext | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [createWelcomeMessage(null)]);

  useEffect(() => {
    if (activeTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, activeTab]);

  useEffect(() => {
    const input = messageInputRef.current;
    if (!input) return;
    input.style.height = '0px';
    input.style.height = `${Math.min(Math.max(input.scrollHeight, 48), 160)}px`;
  }, [inputPrompt]);

  const generalPrompts = [
    'Syarat ekspor Kopi Robusta ke Uni Eropa (EUDR)?',
    'Apakah sertifikat Halal BPJPH diakui di UAE?',
    'Ketentuan V-Legal / SVLK untuk kerajinan bambu?',
    'Tata laksana dokumen PEB kepabeanan Bea Cukai?',
    'Syarat FDA FCE/SID untuk pangan retort pouch sambal roa?'
  ];

  const activePrompts = selectedShipment ? selectedShipment.suggestedQuestions : generalPrompts;

  const handleResetChat = () => {
    setMessages([createWelcomeMessage(selectedShipment)]);
    setInputPrompt('');
    setIsTyping(false);
  };

  const handleChangeContext = () => {
    if (selectedShipment && SHIPMENT_CONTEXTS.some(item => item.id === selectedShipment.id)) {
      setContextMode('saved');
      setSavedContextId(selectedShipment.id);
    }
    setContextPanelOpen(true);
    setContextError('');
  };

  const handleStartGeneralConsultation = () => {
    const hadContext = Boolean(selectedShipment);
    setSelectedShipment(null);
    setContextPanelOpen(false);
    setContextError('');
    if (hadContext) setMessages(prev => [...prev, createContextNotice(null)]);
  };

  const handleStartConsultation = (event: React.FormEvent) => {
    event.preventDefault();
    setContextError('');

    let nextContext: ShipmentContext | null = null;
    let firstQuestion = '';

    if (contextMode === 'saved') {
      nextContext = SHIPMENT_CONTEXTS.find(item => item.id === savedContextId) || null;
      if (!nextContext) {
        setContextError('Pilih data pengiriman yang ingin digunakan.');
        return;
      }
    } else {
      if (!manualContext.productName.trim() || !manualContext.destinationCountry.trim()) {
        setContextError('Nama produk dan negara tujuan wajib diisi.');
        return;
      }

      const keyCompliance = manualContext.certifications
        .split(',')
        .map(item => item.trim())
        .filter(Boolean);
      const hsCode = manualContext.hsCode.trim() || 'Belum ditentukan';
      const destination = manualContext.destinationCountry.trim();
      const product = manualContext.productName.trim();
      const primaryNeed = manualContext.primaryNeed.trim();

      nextContext = {
        id: `manual-${Date.now()}`,
        label: `${product} → ${destination}`,
        exporterName: manualContext.exporterName.trim() || 'IKM / eksportir',
        productName: product,
        hsCode,
        destinationCountry: destination,
        countryCode: resolveCountryCode(destination),
        destinationPort: manualContext.destinationPort.trim() || 'Belum ditentukan',
        volume: manualContext.volume.trim() || 'Belum diisi',
        fobValueUsd: Number(manualContext.fobValueUsd) || 0,
        incoterm: manualContext.incoterm,
        shippingMode: manualContext.shippingMode,
        keyCompliance,
        suggestedQuestions: [
          ...(primaryNeed ? [primaryNeed] : []),
          `Dokumen apa saja yang wajib untuk ekspor ${product} ke ${destination}?`,
          hsCode === 'Belum ditentukan'
            ? `Bagaimana menentukan HS Code yang tepat untuk ${product}?`
            : `Apakah HS Code ${hsCode} memiliki ketentuan khusus untuk tujuan ${destination}?`,
          `Sertifikasi atau standar apa yang perlu dipenuhi untuk ${product} di ${destination}?`
        ].slice(0, 3)
      };
      firstQuestion = primaryNeed;
    }

    const contextChanged = nextContext?.label !== selectedShipment?.label;
    setSelectedShipment(nextContext);
    setContextPanelOpen(false);
    if (contextChanged) setMessages(prev => [...prev, createContextNotice(nextContext)]);
    if (firstQuestion) setInputPrompt(firstQuestion);
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

  const buildOfflineAdvisorReply = (query: string, contextOverride: ShipmentContext | null = selectedShipment): { reply: string; citations: { title: string; source: string }[] } => {
    let reply = '';
    let citations: { title: string; source: string }[] = [];
    const q = query.toLowerCase().trim();
    const context = contextOverride;
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

    const ctxPrefix = (context && !isMeta)
      ? `[Konteks Kargo: ${context.productName} - HS: ${context.hsCode} ke ${context.destinationCountry}]\n\n`
      : '';

    // 1. Pertanyaan Seputar Sumber Data / Internet
    if (q.includes('internet') || q.includes('sumber data') || q.includes('dapat data') || q.includes('ambil data') || q.includes('database') || q.includes('akurasi') || q.includes('valid')) {
      reply = `Basis jawaban saya menggabungkan **referensi regulasi terkurasi** dengan layanan AI untuk membantu menelusuri konteks ekspor:
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
    } else if (q.includes('kopi') || q.includes('eudr') || q.includes('eropa') || (context?.id === 'shipment-01' && (q.includes('deforestasi') || q.includes('traces') || q.includes('mrl') || q.includes('residu') || q.includes('phytosanitary')))) {
      reply = `${ctxPrefix}Untuk ekspor Kopi Robusta (${context?.exporterName || 'Koperasi Kopi Robusta Ciputat'}) ke Uni Eropa berdasarkan regulasi EUDR (Regulation 2023/1115):
1. **Bukti Bebas Deforestasi**: Wajib melampirkan data geolocation poligon GPS kebun budidaya petani (cut-off date 31 Des 2020).
2. **Due Diligence Statement (DDS)**: Diunggah melalui sistem TRACES-NT Uni Eropa sebelum kargo sandar di Rotterdam.
3. **Dokumen Pendukung**: Phytosanitary Certificate dari Karantina Tumbuhan RI (Bandara CGK / Pelabuhan Tanjung Priok), Form A/COO, dan uji residu pestisida (MRL) akreditasi ISO 17025.
4. **Status Kesiapan Tangsel**: Verifikasi titik koordinat kebun petani binaan Ciputat saat ini sedang difasilitasi oleh Dinas Pertanian & Disperindag Tangsel.`;
      citations = [{
        title: 'Regulasi Bebas Deforestasi Uni Eropa (EUDR Regulation 2023/1115)',
        source: 'European Commission Regulation (EU) 2023/1115'
      }];
    } else if (q.includes('halal') || q.includes('uae') || q.includes('emirates') || q.includes('timur tengah') || (context?.id === 'shipment-03')) {
      reply = `${ctxPrefix}Sertifikat Halal resmi BPJPH Kemenag RI telah memiliki perjanjian pengakuan timbal balik (**Mutual Recognition Agreement / MRA**) dengan MoIAT/ESMA Uni Emirat Arab (UEA).
Persyaratan teknis untuk komoditas F&B (${context?.productName || 'Ekstrak Jahe Merah'}):
- Sertifikat Halal resmi BPJPH dengan logo Garuda Nasional & QR Code aktif.
- Label kemasan bilingual: Keterangan komposisi dan petunjuk saji wajib memuat Bahasa Arab & Inggris.
- Health Certificate dari BPOM RI dan Certificate of Analysis (COA) mikrobiologi dari Sucofindo/SGS.
- Komoditas siap dipromosikan ke buyer Al-Madina UAE di booth TEI 2026.`;
      citations = [{
        title: 'Ketentuan Sertifikasi Halal MRA untuk Ekspor Pangan ke UAE',
        source: 'MoIAT UAE Technical Regulation 2055-1'
      }];
    } else if (q.includes('bambu') || q.includes('svlk') || q.includes('kayu') || q.includes('v-legal') || (context?.id === 'shipment-04')) {
      reply = `${ctxPrefix}Untuk produk perabot dan perlengkapan makan berbahan bambu (${context?.exporterName || 'UD Bambu Kriya BSD'}):
1. **Dokumen V-Legal (SVLK)**: Wajib diterbitkan oleh Lembaga Penilai & Verifikasi Independen (LPVI) terakreditasi KAN sesuai Permendag No. 23/2023. Nomor V-Legal langsung divalidasi ke modul ekspor PEB Bea Cukai.
2. **Fumigasi**: Wajib melalui perlakuan fumigasi berstandar AFAS atau Heat Treatment bersertifikat Phytosanitary resmi.
3. **Food Grade Testing**: Wajib menyertakan sertifikat uji migrasi zat kimia aman kontak pangan (SGS / Sucofindo) sesuai standar EU Framework Regulation (EC) No 1935/2004.`;
      citations = [{
        title: 'Sistem Verifikasi Legalitas Kayu (SVLK / V-Legal)',
        source: 'Permendag No. 23 Tahun 2023'
      }];
    } else if (q.includes('fda') || q.includes('retort') || q.includes('roa') || q.includes('sambal') || (context?.id === 'shipment-05')) {
      reply = `${ctxPrefix}Untuk produk pangan kemasan retort tahan suhu ruang (${context?.productName || 'Sambal Roa Retort Pouch'}) tujuan Amerika Serikat:
1. **FDA Facility Registration**: Registrasi fasilitas dapur produksi di portal FDA FURLS.
2. **FCE & SID (Food Canning Establishment & Submission Identifier)**: Pengajuan jadwal proses sterilisasi panas (F0 value) ke US FDA untuk kategori Low-Acid/Acidified Foods (21 CFR Part 108/113).
3. **Prior Notice**: Wajib mengirimkan pemberitahuan awal (PN Confirm Number) ke US Customs & Border Protection (CBP) sebelum kargo mendarat di pelabuhan LAX/Long Beach.`;
      citations = [{
        title: 'Regulasi Pangan Kemasan Retort US FDA (FCE & SID)',
        source: 'US 21 CFR Part 108 & 113'
      }];
    } else if (q.includes('kamerun') || q.includes('gula') || q.includes('aren') || (context?.id === 'shipment-02')) {
      reply = `${ctxPrefix}Untuk ekspor kargo Gula Aren Kristal Organik (${context?.exporterName || 'PT Java Palm Sugar Nusantara'}) ke Port of Douala, Kamerun:
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
    if (!query.trim() || isTyping) return;

    const detectedContext = isMetaQuery(query) ? null : detectContextFromQuery(query, selectedShipment);
    const effectiveShipment = detectedContext || selectedShipment;
    const contextChanged = Boolean(detectedContext && detectedContext.label !== selectedShipment?.label);

    if (contextChanged && detectedContext) setSelectedShipment(detectedContext);

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: currentWibTime()
    };

    setMessages(prev => [...prev, userMsg, ...(contextChanged && detectedContext ? [createContextNotice(detectedContext)] : [])]);
    setInputPrompt('');
    setIsTyping(true);

    let replyData: { reply: string; citations: { title: string; source: string }[]; sourceType: 'live' | 'knowledge_base' };
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 12000);

    let liveSuccess = false;
    const endpoints = [
      '/api/trade-chat',
      VEYLO_CHAT_API_URL
    ];

    for (const url of endpoints) {
      if (liveSuccess) break;
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            message: (effectiveShipment && !isMetaQuery(query))
              ? `[Data Ekspor]
Eksportir: ${effectiveShipment.exporterName}
Produk: ${effectiveShipment.productName}
HS Code: ${effectiveShipment.hsCode}
Negara Tujuan: ${effectiveShipment.destinationCountry}
Pelabuhan/Bandara: ${effectiveShipment.destinationPort}
Volume: ${effectiveShipment.volume}
Nilai FOB: USD ${effectiveShipment.fobValueUsd}
Incoterm: ${effectiveShipment.incoterm}
Moda: ${effectiveShipment.shippingMode}
Kepatuhan/Sertifikasi: ${effectiveShipment.keyCompliance.join(', ') || 'Belum diisi'}

Pertanyaan: ${query}`
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
                  title: `Asisten Regulasi Ekspor${data.recommendedView ? ' · ' + data.recommendedView : ''}`,
                  source: data.recommendedRoute ? `Rute rekomendasi: ${data.recommendedRoute}` : 'Layanan AI Regulasi Ekspor Tangsel'
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
      const offline = buildOfflineAdvisorReply(query, effectiveShipment);
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
      contextTag: isMetaQuery(query) ? undefined : effectiveShipment?.label,
      sourceType: replyData.sourceType,
      followUps: buildDynamicFollowUps(query, effectiveShipment)
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  const handleComposerKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (inputPrompt.trim() && !isTyping) void handleSend();
    }
  };

  const getRelatedKbForCitation = (citation: { title: string; source: string }): RegulasiKbItem[] => {
    const terms = `${citation.title} ${citation.source}`
      .toLowerCase()
      .split(/[^a-z0-9]+/i)
      .filter(term => term.length > 3);
    return REGULASI_KB_DATA
      .map(item => ({
        item,
        score: terms.filter(term => `${item.judul} ${item.sumberRegulasi} ${item.tags.join(' ')}`.toLowerCase().includes(term)).length
      }))
      .filter(entry => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(entry => entry.item);
  };

  const handleCitationOpen = (citation: { title: string; source: string }) => {
    const matches = getRelatedKbForCitation(citation);
    if (matches.length === 1) {
      setSelectedArticle(matches[0]);
      return;
    }
    setCitationPreview({ citation, matches });
  };

  const filteredKb = REGULASI_KB_DATA.filter(item => {
    const matchCat = selectedCategory === 'ALL' || item.kategori === selectedCategory || item.kategori === 'semua_kategori';
    const matchSearch = item.judul.toLowerCase().includes(kbSearch.toLowerCase()) ||
                        item.ringkasan.toLowerCase().includes(kbSearch.toLowerCase()) ||
                        item.negaraTujuan.toLowerCase().includes(kbSearch.toLowerCase()) ||
                        item.tags.some(t => t.toLowerCase().includes(kbSearch.toLowerCase()));
    return matchCat && matchSearch;
  });

  const savedPreview = SHIPMENT_CONTEXTS.find(item => item.id === savedContextId) || SHIPMENT_CONTEXTS[0];

  return (
    <div className="space-y-5 selection:bg-emerald-100 selection:text-slate-950">
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
        <div className="min-w-0">
          <div className="ui-label">Workspace konsultasi ekspor</div>
          <div className="mt-1 text-sm text-slate-600">Masukkan data ekspor agar jawaban regulasi mengikuti produk dan negara tujuan Anda.</div>
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

      {activeTab === 'chat' && contextPanelOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <button type="button" className="absolute inset-0 bg-slate-950/35 backdrop-blur-[1px]" onClick={() => setContextPanelOpen(false)} aria-label="Tutup editor data ekspor" />
          <section className="relative h-full w-full max-w-xl overflow-y-auto border-l border-slate-200 bg-white shadow-2xl">
          <div className="border-b border-slate-200 px-5 py-5 sm:px-7 sm:py-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-2xl">
                <div className="ui-label">Data ekspor</div>
                <h2 className="mt-1 text-xl font-extrabold tracking-tight text-slate-950 sm:text-2xl">Data ekspor untuk membantu jawaban AI</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">Pilih data tersimpan atau isi manual. Chat tetap aman saat data diganti; perubahan konteks hanya memengaruhi jawaban berikutnya.</p>
              </div>
              <button type="button" onClick={() => setContextPanelOpen(false)} className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200" aria-label="Tutup editor data ekspor"><X size={18}/></button>
            </div>
          </div>

          <form onSubmit={handleStartConsultation} className="p-5 sm:p-7">
            <fieldset>
              <legend className="text-sm font-semibold text-slate-900">Pilih sumber data</legend>
              <div className="mt-3 grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1.5">
                <button
                  type="button"
                  onClick={() => { setContextMode('saved'); setContextError(''); }}
                  className={`min-h-11 rounded-lg px-3 text-sm font-semibold transition ${contextMode === 'saved' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                  aria-pressed={contextMode === 'saved'}
                >
                  Data tersimpan
                </button>
                <button
                  type="button"
                  onClick={() => { setContextMode('manual'); setContextError(''); }}
                  className={`min-h-11 rounded-lg px-3 text-sm font-semibold transition ${contextMode === 'manual' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                  aria-pressed={contextMode === 'manual'}
                >
                  Input manual
                </button>
              </div>
            </fieldset>

            {contextMode === 'saved' ? (
              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="saved-shipment" className="mb-1.5 block text-sm font-semibold text-slate-800">Data pengiriman</label>
                  <select
                    id="saved-shipment"
                    value={savedContextId}
                    onChange={event => setSavedContextId(event.target.value)}
                    className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-900 focus:border-emerald-600 focus:bg-white focus:outline-none"
                  >
                    {SHIPMENT_CONTEXTS.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}
                  </select>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <CountryFlag code={savedPreview.countryCode} title={savedPreview.destinationCountry} className="h-8 w-12 shrink-0" />
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-slate-950">{savedPreview.productName}</div>
                      <div className="mt-0.5 text-sm text-slate-600">{savedPreview.exporterName}</div>
                    </div>
                  </div>
                  <dl className="mt-4 grid grid-cols-2 gap-4 border-t border-slate-200 pt-4 text-sm sm:grid-cols-4">
                    <div><dt className="text-xs text-slate-500">Tujuan</dt><dd className="mt-1 font-semibold text-slate-800">{savedPreview.destinationCountry}</dd></div>
                    <div><dt className="text-xs text-slate-500">HS Code</dt><dd className="mt-1 font-mono font-semibold text-slate-800">{savedPreview.hsCode}</dd></div>
                    <div><dt className="text-xs text-slate-500">Incoterm</dt><dd className="mt-1 font-semibold text-slate-800">{savedPreview.incoterm}</dd></div>
                    <div><dt className="text-xs text-slate-500">Moda</dt><dd className="mt-1 font-semibold text-slate-800">{savedPreview.shippingMode === 'AIR_EXPRESS' ? 'Air Freight' : 'Ocean LCL'}</dd></div>
                  </dl>
                </div>
              </div>
            ) : (
              <div className="mt-6 space-y-5">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="ctx-exporter" className="mb-1.5 block text-sm font-semibold text-slate-800">Nama IKM / eksportir <span className="font-normal text-slate-400">(opsional)</span></label>
                    <input id="ctx-exporter" type="text" value={manualContext.exporterName} onChange={e => setManualContext(prev => ({ ...prev, exporterName: e.target.value }))} placeholder="Contoh: CV Kopi Tangsel" className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-600 focus:bg-white focus:outline-none" />
                  </div>
                  <div>
                    <label htmlFor="ctx-product" className="mb-1.5 block text-sm font-semibold text-slate-800">Produk / komoditas <span className="text-red-600">*</span></label>
                    <input id="ctx-product" type="text" required value={manualContext.productName} onChange={e => setManualContext(prev => ({ ...prev, productName: e.target.value }))} placeholder="Contoh: Kopi Robusta Sangrai" className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-600 focus:bg-white focus:outline-none" />
                  </div>
                  <div>
                    <label htmlFor="ctx-hs" className="mb-1.5 block text-sm font-semibold text-slate-800">HS Code <span className="font-normal text-slate-400">(boleh kosong)</span></label>
                    <input id="ctx-hs" type="text" inputMode="decimal" value={manualContext.hsCode} onChange={e => setManualContext(prev => ({ ...prev, hsCode: e.target.value }))} placeholder="Contoh: 0901.21.00" className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 font-mono text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-600 focus:bg-white focus:outline-none" />
                    <p className="mt-1.5 text-xs text-slate-500">Kosongkan jika Anda ingin meminta bantuan identifikasi HS Code.</p>
                  </div>
                  <div>
                    <label htmlFor="ctx-country" className="mb-1.5 block text-sm font-semibold text-slate-800">Negara tujuan <span className="text-red-600">*</span></label>
                    <input id="ctx-country" type="text" required value={manualContext.destinationCountry} onChange={e => setManualContext(prev => ({ ...prev, destinationCountry: e.target.value }))} placeholder="Contoh: Netherlands / Belanda" className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-600 focus:bg-white focus:outline-none" />
                  </div>
                </div>

                <div>
                  <label htmlFor="ctx-need" className="mb-1.5 block text-sm font-semibold text-slate-800">Kebutuhan utama <span className="font-normal text-slate-400">(opsional)</span></label>
                  <textarea id="ctx-need" rows={3} value={manualContext.primaryNeed} onChange={e => setManualContext(prev => ({ ...prev, primaryNeed: e.target.value }))} placeholder="Contoh: Dokumen apa yang wajib untuk mengirim kopi ke Rotterdam dan apakah perlu phytosanitary?" className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-900 placeholder-slate-400 focus:border-emerald-600 focus:bg-white focus:outline-none" />
                </div>

                <div className="rounded-xl border border-slate-200">
                  <button type="button" onClick={() => setShowAdvancedContext(value => !value)} className="flex min-h-12 w-full items-center justify-between gap-3 px-4 text-left text-sm font-semibold text-slate-800 hover:bg-slate-50" aria-expanded={showAdvancedContext}>
                    <span>Detail tambahan pengiriman</span>
                    <span className="text-xs font-medium text-slate-500">{showAdvancedContext ? 'Tutup' : 'Pelabuhan, volume, FOB, moda, sertifikasi'}</span>
                  </button>

                  {showAdvancedContext && (
                    <div className="grid grid-cols-1 gap-4 border-t border-slate-200 p-4 md:grid-cols-2">
                      <div>
                        <label htmlFor="ctx-port" className="mb-1.5 block text-sm font-semibold text-slate-800">Pelabuhan / bandara tujuan</label>
                        <input id="ctx-port" type="text" value={manualContext.destinationPort} onChange={e => setManualContext(prev => ({ ...prev, destinationPort: e.target.value }))} placeholder="Contoh: Port of Rotterdam" className="min-h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-900 focus:border-emerald-600 focus:bg-white focus:outline-none" />
                      </div>
                      <div>
                        <label htmlFor="ctx-volume" className="mb-1.5 block text-sm font-semibold text-slate-800">Jumlah / berat kargo</label>
                        <input id="ctx-volume" type="text" value={manualContext.volume} onChange={e => setManualContext(prev => ({ ...prev, volume: e.target.value }))} placeholder="Contoh: 15 koli / 172.5 kg" className="min-h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-900 focus:border-emerald-600 focus:bg-white focus:outline-none" />
                      </div>
                      <div>
                        <label htmlFor="ctx-fob" className="mb-1.5 block text-sm font-semibold text-slate-800">Nilai FOB (USD)</label>
                        <input id="ctx-fob" type="number" min="0" step="0.01" inputMode="decimal" value={manualContext.fobValueUsd} onChange={e => setManualContext(prev => ({ ...prev, fobValueUsd: e.target.value }))} placeholder="Contoh: 1425" className="min-h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-900 focus:border-emerald-600 focus:bg-white focus:outline-none" />
                      </div>
                      <div>
                        <label htmlFor="ctx-incoterm" className="mb-1.5 block text-sm font-semibold text-slate-800">Incoterm</label>
                        <select id="ctx-incoterm" value={manualContext.incoterm} onChange={e => setManualContext(prev => ({ ...prev, incoterm: e.target.value as ShipmentContext['incoterm'] }))} className="min-h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-900 focus:border-emerald-600 focus:bg-white focus:outline-none">
                          <option value="EXW">EXW — Ex Works</option>
                          <option value="FOB">FOB — Free on Board</option>
                          <option value="CIF">CIF — Cost, Insurance & Freight</option>
                        </select>
                      </div>
                      <fieldset>
                        <legend className="mb-1.5 text-sm font-semibold text-slate-800">Moda pengiriman</legend>
                        <div className="grid grid-cols-2 gap-2">
                          <button type="button" onClick={() => setManualContext(prev => ({ ...prev, shippingMode: 'AIR_EXPRESS' }))} className={`min-h-11 rounded-lg border px-3 text-sm font-semibold ${manualContext.shippingMode === 'AIR_EXPRESS' ? 'border-blue-400 bg-blue-50 text-blue-800' : 'border-slate-200 bg-white text-slate-700'}`} aria-pressed={manualContext.shippingMode === 'AIR_EXPRESS'}><span className="inline-flex items-center gap-2"><PlaneTakeoff size={15}/> Udara</span></button>
                          <button type="button" onClick={() => setManualContext(prev => ({ ...prev, shippingMode: 'OCEAN_LCL' }))} className={`min-h-11 rounded-lg border px-3 text-sm font-semibold ${manualContext.shippingMode === 'OCEAN_LCL' ? 'border-emerald-400 bg-emerald-50 text-emerald-800' : 'border-slate-200 bg-white text-slate-700'}`} aria-pressed={manualContext.shippingMode === 'OCEAN_LCL'}><span className="inline-flex items-center gap-2"><Ship size={15}/> Laut</span></button>
                        </div>
                      </fieldset>
                      <div>
                        <label htmlFor="ctx-certs" className="mb-1.5 block text-sm font-semibold text-slate-800">Sertifikasi / kepatuhan yang sudah dimiliki</label>
                        <input id="ctx-certs" type="text" value={manualContext.certifications} onChange={e => setManualContext(prev => ({ ...prev, certifications: e.target.value }))} placeholder="Pisahkan dengan koma: Halal BPJPH, HACCP, BPOM MD" className="min-h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-900 focus:border-emerald-600 focus:bg-white focus:outline-none" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {contextError && <div role="alert" className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">{contextError}</div>}

            <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <button type="button" onClick={handleStartGeneralConsultation} className="min-h-11 px-3 text-sm font-semibold text-slate-500 hover:text-slate-900">Gunakan mode umum</button>
              <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2">
                Terapkan Data <ArrowRight size={16}/>
              </button>
            </div>
          </form>
          </section>
        </div>
      )}

      {activeTab === 'chat' && (
        <>
          <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
            {selectedShipment ? (
              <div className="flex min-w-0 items-center gap-3">
                <CountryFlag code={selectedShipment.countryCode} title={selectedShipment.destinationCountry} className="h-8 w-12 shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Data ekspor aktif</div>
                  <div className="mt-0.5 truncate text-sm font-bold text-slate-950">{selectedShipment.productName} <span className="font-normal text-slate-400">→</span> {selectedShipment.destinationCountry}</div>
                  <div className="mt-0.5 text-xs text-slate-500">HS {selectedShipment.hsCode} · {selectedShipment.incoterm} · {selectedShipment.shippingMode === 'AIR_EXPRESS' ? 'Air Freight' : 'Ocean LCL'}</div>
                </div>
              </div>
            ) : (
              <div><div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Mode konsultasi</div><div className="mt-0.5 text-sm font-bold text-slate-950">Konsultasi umum tanpa data pengiriman</div></div>
            )}
            <button type="button" onClick={handleChangeContext} className="min-h-11 shrink-0 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50">{selectedShipment ? 'Ganti Data' : 'Tambah Data'}</button>
          </div>

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_330px]">
            <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <div className="flex h-[min(68dvh,720px)] min-h-[560px] flex-col bg-slate-50/50">
                <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3 sm:px-5">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-600" />
                    <span className="truncate text-sm font-semibold text-slate-900">Asisten Regulasi Ekspor Tangsel</span>
                    <span className="hidden text-xs font-medium text-emerald-700 sm:inline">Online</span>
                  </div>
                  <button type="button" onClick={handleResetChat} className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-lg px-3 text-sm font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-900">
                    <RotateCcw size={14}/> Percakapan Baru
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 sm:p-5">
                  <div className="mx-auto max-w-3xl space-y-4">
                    {messages.map((m) => m.kind === 'context_notice' ? (
                      <div key={m.id} className="flex justify-center py-1">
                        <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
                          <Package size={13} className="shrink-0"/><span className="truncate">{m.text}</span>
                        </div>
                      </div>
                    ) : (
                      <div key={m.id} className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {m.sender === 'ai' && <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800"><Bot size={18}/></div>}
                        <div className={`max-w-[92%] rounded-xl px-4 py-3 text-sm leading-6 sm:max-w-[84%] ${m.sender === 'user' ? 'bg-emerald-700 text-white' : 'border border-slate-200 bg-white text-slate-800'}`}>
                          {m.sender === 'ai' && m.contextTag && (
                            <div className="mb-2 flex items-center gap-1.5 border-b border-slate-100 pb-2 text-xs font-semibold text-emerald-800"><Package size={12}/><span className="truncate">{m.contextTag}</span></div>
                          )}
                          <div>{renderMessageText(m.text)}</div>
                          {m.citations && m.citations.length > 0 && (
                            <div className="mt-3 space-y-2 border-t border-slate-100 pt-3">
                              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600"><BookOpen size={13} className="text-emerald-700"/> Rujukan</div>
                              {m.citations.map((c, i) => (
                                <button key={i} type="button" onClick={() => handleCitationOpen(c)} className="group flex w-full items-start justify-between gap-3 rounded-lg border border-transparent bg-slate-50 px-3 py-2 text-left text-xs text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50">
                                  <span><strong className="text-slate-800 group-hover:text-emerald-900">{c.title}</strong><span className="mx-1">·</span>{c.source}</span>
                                  <ArrowRight size={13} className="mt-0.5 shrink-0 text-slate-400 group-hover:text-emerald-700"/>
                                </button>
                              ))}
                            </div>
                          )}
                          {m.sender === 'ai' && m.followUps && m.followUps.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2 border-t border-slate-100 pt-3">
                              {m.followUps.map((followUp, index) => (
                                <button key={index} type="button" onClick={() => handleSend(followUp)} disabled={isTyping} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-left text-xs font-medium leading-5 text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-900 disabled:opacity-50">
                                  {followUp}
                                </button>
                              ))}
                            </div>
                          )}
                          <div className={`mt-2 text-right text-xs ${m.sender === 'user' ? 'text-emerald-100' : 'text-slate-400'}`}>{m.timestamp}</div>
                        </div>
                      </div>
                    ))}

                    {isTyping && <div className="flex items-center gap-2 text-sm text-slate-500"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-600"/> Menyiapkan jawaban berdasarkan referensi regulasi...</div>}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                <div className="border-t border-slate-200 bg-white p-3 sm:p-4">
                  <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="mx-auto flex max-w-3xl items-end gap-2">
                    <div className="min-w-0 flex-1">
                      <label htmlFor="advisor-message" className="sr-only">Pertanyaan regulasi ekspor</label>
                      <textarea
                        ref={messageInputRef}
                        id="advisor-message"
                        rows={1}
                        placeholder={selectedShipment ? `Tanyakan persyaratan untuk ${selectedShipment.productName}...` : 'Tanyakan HS Code, sertifikasi, dokumen, atau aturan negara tujuan...'}
                        value={inputPrompt}
                        onChange={e => setInputPrompt(e.target.value)}
                        onKeyDown={handleComposerKeyDown}
                        className="min-h-12 max-h-40 w-full resize-none overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-900 placeholder-slate-400 focus:border-emerald-600 focus:bg-white focus:outline-none"
                        aria-describedby="advisor-message-hint"
                      />
                      <div id="advisor-message-hint" className="mt-1 hidden text-xs text-slate-400 sm:block">Enter untuk kirim · Shift+Enter untuk baris baru</div>
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
                    <div className="min-w-0"><div className="ui-label">Data ekspor</div><div className="mt-1 text-sm font-bold leading-5 text-slate-900">{selectedShipment.productName}</div><div className="mt-0.5 text-xs text-slate-500">HS {selectedShipment.hsCode} · {selectedShipment.destinationCountry}</div></div>
                  </div>
                  <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3 border-t border-slate-100 pt-4 text-xs">
                    <div><dt className="text-slate-400">FOB</dt><dd className="mt-0.5 font-semibold text-slate-800">{selectedShipment.fobValueUsd > 0 ? `$${selectedShipment.fobValueUsd.toLocaleString()}` : 'Belum diisi'}</dd></div>
                    <div><dt className="text-slate-400">Incoterm</dt><dd className="mt-0.5 font-semibold text-slate-800">{selectedShipment.incoterm}</dd></div>
                    <div><dt className="text-slate-400">Moda</dt><dd className="mt-0.5 font-semibold text-slate-800">{selectedShipment.shippingMode === 'AIR_EXPRESS' ? 'Air Freight' : 'Ocean LCL'}</dd></div>
                    <div><dt className="text-slate-400">Volume</dt><dd className="mt-0.5 line-clamp-2 font-semibold text-slate-800">{selectedShipment.volume}</dd></div>
                  </dl>
                  <div className="mt-4 border-t border-slate-100 pt-4">
                    <div className="text-xs font-semibold text-slate-700">Kepatuhan / sertifikasi</div>
                    {selectedShipment.keyCompliance.length > 0 ? <div className="mt-2 space-y-2">{selectedShipment.keyCompliance.map((item, i) => <div key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600"><CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-600"/><span>{item}</span></div>)}</div> : <p className="mt-2 text-xs leading-5 text-slate-500">Belum ada sertifikasi yang dimasukkan.</p>}
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600"><div className="font-semibold text-slate-900">Konsultasi umum</div><p className="mt-1 leading-5">Tambahkan Data Ekspor jika Anda ingin jawaban disesuaikan dengan produk dan negara tujuan tertentu.</p></div>
              )}

              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500"><HelpCircle size={14} className="text-emerald-700"/> Pertanyaan cepat</div>
                <div className="mt-3 space-y-2">{activePrompts.slice(0, 3).map((q, idx) => <button key={idx} type="button" onClick={() => handleSend(q)} className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-left text-sm leading-5 text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50">{q}</button>)}</div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 text-xs leading-5 text-slate-500">
                <div className="flex items-center gap-2 font-semibold text-slate-800"><ShieldCheck size={14} className="text-emerald-700"/> Basis referensi</div>
                <p className="mt-2">Jawaban mengacu pada basis regulasi terkurasi dan perlu diverifikasi kembali terhadap ketentuan terbaru instansi penerbit sebelum transaksi atau pengapalan.</p>
                <a href={VEYLO_BASE_URL} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-3 font-semibold text-white hover:bg-slate-800"><Video size={14}/> Buka Ruang Negosiasi</a>
              </div>
            </aside>
          </div>
        </>
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
                <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">{item.dokumenWajib.slice(0, 3).map((doc, i) => <div key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600"><CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-600"/>{doc}</div>)}</div>
                <div className="mt-4 text-xs font-semibold text-emerald-700">Buka panduan lengkap →</div>
              </button>
            ))}
          </div>

          {citationPreview && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <button type="button" className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={() => setCitationPreview(null)} aria-label="Tutup pratinjau rujukan" />
              <div className="relative w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:p-6">
                <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
                  <div><div className="ui-label">Rujukan jawaban</div><h3 className="mt-1 text-lg font-bold text-slate-900">{citationPreview.citation.title}</h3><div className="mt-1 text-sm text-slate-500">{citationPreview.citation.source}</div></div>
                  <button type="button" onClick={() => setCitationPreview(null)} className="tap-target inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200" aria-label="Tutup"><X size={18}/></button>
                </div>
                {citationPreview.matches.length > 0 ? (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm leading-6 text-slate-600">Basis regulasi terkait yang bisa dibuka tanpa meninggalkan percakapan:</p>
                    {citationPreview.matches.map(item => (
                      <button key={item.id} type="button" onClick={() => { setCitationPreview(null); setSelectedArticle(item); }} className="w-full rounded-xl border border-slate-200 p-3 text-left hover:border-emerald-300 hover:bg-emerald-50">
                        <div className="text-sm font-semibold text-slate-900">{item.judul}</div><div className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">{item.ringkasan}</div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">Rujukan ini berasal dari respons layanan AI dan belum memiliki artikel Basis Regulasi yang cocok secara langsung. Gunakan nama sumber di atas untuk verifikasi pada instansi penerbit.</p>
                )}
              </div>
            </div>
          )}

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
