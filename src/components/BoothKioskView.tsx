import React, { useState, useEffect } from 'react';
import {
  Store,
  Search,
  Globe2,
  Send,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Phone,
  Layers,
  X,
  FileCheck2,
  PlaneTakeoff,
  AlertTriangle,
  Building,
  ShieldCheck,
  Calculator,
  QrCode,
  Smartphone,
  Copy,
  Check,
  Video,
  Bot
} from 'lucide-react';
import { OFFICIAL_KIOSK_PRODUCTS, type OfficialCatalogCategory, type OfficialKioskProduct } from '../data/officialKioskCatalog';
import { DESTINATION_PORTS, calculateLogisticsEstimate } from '../data/logisticsRates';
import { ProductImage } from './ProductImage';
import { CountryFlag } from './CountryFlag';
import { getVeyloRoomUrl } from '../lib/veyloBridge';

export const BoothKioskView: React.FC = () => {
  const [lang, setLang] = useState<'ID' | 'EN'>('ID');
  const [kioskMode, setKioskMode] = useState<'CATALOG' | 'SELF_AUDIT' | 'LOGISTICS'>('CATALOG');
  const [search, setSearch] = useState('');
  const [selectedZone, setSelectedZone] = useState<OfficialCatalogCategory | 'ALL'>('ALL');
  const [selectedProduct, setSelectedProduct] = useState<OfficialKioskProduct | null>(null);
  const [inquirySent, setInquirySent] = useState(false);
  const [inquirySubmitting, setInquirySubmitting] = useState(false);
  const [inquiryError, setInquiryError] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [buyerCountry, setBuyerCountry] = useState('');
  const [buyerContact, setBuyerContact] = useState('');
  const [showQrModal, setShowQrModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [kioskContinuationUrl, setKioskContinuationUrl] = useState<string>('http://localhost:4321/kiosk');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const publicEnv = (import.meta as any).env?.PUBLIC_SITE_URL;
      const baseUrl = publicEnv ? publicEnv.replace(/\/$/, '') : window.location.origin;
      setKioskContinuationUrl(`${baseUrl}/kiosk`);
    }
  }, []);

  // Mode B: Self-Audit State
  const [auditNamaUsaha, setAuditNamaUsaha] = useState('');
  const [auditKomoditas, setAuditKomoditas] = useState('Kopi');
  const [auditNegaraTarget, setAuditNegaraTarget] = useState('Uni Eropa');
  const [auditSertifikasi, setAuditSertifikasi] = useState<string[]>(['Halal']);
  const [auditOutput, setAuditOutput] = useState<{
    grade: string;
    checklist: { item: string; ready: boolean }[];
    rekomendasi: string;
  } | null>(null);

  // Mode C: Quick Logistics State
  const [quickPortId, setQuickPortId] = useState('port-dla');
  const [quickWeightKg, setQuickWeightKg] = useState(50);
  const [quickPackages, setQuickPackages] = useState(5);
  const [quickMode, setQuickMode] = useState<'AIR_EXPRESS' | 'OCEAN_LCL'>('AIR_EXPRESS');

  const filtered = OFFICIAL_KIOSK_PRODUCTS.filter(product => {
    const matchZone = selectedZone === 'ALL' || product.category === selectedZone;
    const query = search.trim().toLowerCase();
    const matchSearch = !query ||
      product.name.toLowerCase().includes(query) ||
      product.ownerName.toLowerCase().includes(query) ||
      (product.businessName || '').toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query);
    return matchZone && matchSearch;
  });

  const getProductVeyloUrl = (
    product: OfficialKioskProduct,
    buyer?: { name?: string; country?: string }
  ) => getVeyloRoomUrl({
    ikmId: product.id,
    ikmName: product.businessName || product.ownerName,
    productId: product.id,
    productName: product.name,
    buyerName: buyer?.name,
    buyerCountry: buyer?.country,
  });

  const getProductAdvisorUrl = (product: OfficialKioskProduct) => {
    const params = new URLSearchParams({
      source: 'rumah-kurasi',
      ikmId: product.id,
      ikmName: product.businessName || product.ownerName,
      productId: product.id,
      productName: product.name,
      sourceUrl: product.detailUrl
    });
    return `/ai-advisor?${params.toString()}`;
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || inquirySubmitting) return;

    setInquirySubmitting(true);
    setInquiryError('');
    setInquirySent(false);

    try {
      const response = await fetch('https://n8n.163.61.44.41.sslip.io/webhook/tangsel-export-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          buyerName: buyerName.trim(),
          buyerCountry: buyerCountry.trim(),
          buyerContact: buyerContact.trim(),
          ikmId: selectedProduct.id,
          ikmName: selectedProduct.businessName || selectedProduct.ownerName,
          productId: selectedProduct.id,
          productName: selectedProduct.name,
          hsCode: '',
          fobPriceUsd: 0,
          source: 'kiosk-rumah-kurasi'
        })
      });

      const payload = await response.json().catch(() => null);
      if (!response.ok || !payload?.ok) throw new Error('Inquiry belum dapat disimpan.');

      setInquirySent(true);
      setBuyerName('');
      setBuyerCountry('');
      setBuyerContact('');
    } catch {
      setInquiryError(lang === 'ID'
        ? 'Permintaan belum terkirim. Periksa koneksi lalu coba lagi.'
        : 'The request could not be sent. Check your connection and try again.');
    } finally {
      setInquirySubmitting(false);
    }
  };

  const handleRunSelfAudit = (e: React.FormEvent) => {
    e.preventDefault();
    const hasHalal = auditSertifikasi.includes('Halal');
    const hasBpom = auditSertifikasi.includes('BPOM MD');
    const hasHaccp = auditSertifikasi.includes('HACCP');
    const hasOrganic = auditSertifikasi.includes('Organic');

    let grade = 'Grade C (Perlu Inkubasi)';
    let rec = 'Perlu perbaikan izin edar lokal (BPOM MD) dan kemasan barrier foil sebelum dapat dipromosikan ke buyer internasional.';

    if (hasHaccp || (hasBpom && hasHalal && hasOrganic)) {
      grade = 'Grade A (Siap Ekspor Langsung)';
      rec = 'Sertifikasi internasional dan keamanan pangan lengkap! Komoditas memenuhi standar ekspor TEI 2026 dan siap difasilitasi business matching oleh Disperindag Tangsel.';
    } else if (hasBpom || hasHalal) {
      grade = 'Grade B (Potensial - Minor Gap)';
      rec = 'Legalitas dasar terpenuhi. Perlu penambahan sertifikasi kepatuhan pasar target (contoh: EUDR untuk kopi atau FDA untuk pangan olahan).';
    }

    const checklist = [
      { item: 'Legalitas Usaha NIB', ready: true },
      { item: 'Sertifikat Halal Resmi BPJPH', ready: hasHalal },
      { item: 'Izin Edar BPOM MD Pangan Olahan', ready: hasBpom },
      { item: 'Sistem Keamanan Pangan HACCP / ISO 22000', ready: hasHaccp },
      { item: 'Traceability & Regulasi Khusus Negara Tujuan', ready: hasOrganic }
    ];

    setAuditOutput({
      grade,
      checklist,
      rekomendasi: rec
    });
  };

  const quickSimResult = calculateLogisticsEstimate({
    destinationId: quickPortId,
    actualWeightKg: quickWeightKg / quickPackages,
    lengthCm: 35,
    widthCm: 25,
    heightCm: 25,
    packagesCount: quickPackages,
    cargoValueUsd: 1200,
    incoterm: 'CIF',
    mode: quickMode,
    needInsurance: true
  });

  return (
    <div className="space-y-5 sm:space-y-6 text-slate-900">
      {/* Kiosk Hero Topbar */}
      <div className="rounded-xl bg-white border border-slate-200 p-4 sm:p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="/branding/logo-tangsel.png"
              alt="Lambang Resmi Kota Tangerang Selatan"
              className="w-14 h-14 object-contain shrink-0 drop-shadow-xs"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
                  {lang === 'ID' ? 'Kios Interaktif Booth' : 'Interactive Booth Kiosk'}
                </span>
                <span className="text-slate-500 text-sm font-medium">TEI 2026 • ICE BSD City</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
                {lang === 'ID' ? 'Katalog Komoditas Ekspor Tangerang Selatan' : 'South Tangerang Export Commodity Catalog'}
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                {lang === 'ID'
                  ? 'Pemerintah Kota Tangerang Selatan — Dinas Perindustrian dan Perdagangan'
                  : 'Official Government of South Tangerang City — Department of Industry and Trade'}
              </p>
            </div>
          </div>

          {/* Language Switcher & Actions */}
          <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-wrap sm:items-center">
            <div className="col-span-2 flex rounded-lg bg-slate-100 p-1 text-sm sm:col-span-1">
              <button
                onClick={() => setLang('ID')}
                className={`min-h-10 flex-1 px-3 rounded-md font-semibold transition ${
                  lang === 'ID' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ID
              </button>
              <button
                onClick={() => setLang('EN')}
                className={`min-h-10 flex-1 px-3 rounded-md font-semibold transition ${
                  lang === 'EN' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="min-h-11 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold transition flex items-center justify-center gap-1.5"
            >
              <QrCode size={15} />
              <span>{lang === 'ID' ? 'Buka di HP (QR Scan)' : 'Open on Phone (QR)'}</span>
            </button>

            <a
              href={selectedProduct ? getProductVeyloUrl(selectedProduct) : getVeyloRoomUrl({})}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-11 px-3 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-sm font-semibold transition flex items-center justify-center gap-1.5"
            >
              <Video size={15} />
              <span>Veylo Room</span>
            </a>

          </div>
        </div>
      </div>

      {/* 3 Core Kiosk Modes Switcher Bar */}
      <div className="grid grid-cols-3 gap-1 rounded-xl border border-slate-200 bg-white p-1.5 text-sm">
        <button
          onClick={() => setKioskMode('CATALOG')}
          className={`min-h-12 px-2 sm:px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2 border ${
            kioskMode === 'CATALOG'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
              : 'text-slate-700 border-transparent hover:bg-slate-100'
          }`}
        >
          <Store size={16} />
          <span><span className="sm:hidden">{lang === 'ID' ? 'Katalog' : 'Catalog'}</span><span className="hidden sm:inline">{lang === 'ID' ? 'Katalog & Pencarian Buyer' : 'Catalog & Buyer Discovery'}</span></span>
        </button>

        <button
          onClick={() => setKioskMode('SELF_AUDIT')}
          className={`min-h-12 px-2 sm:px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2 border ${
            kioskMode === 'SELF_AUDIT'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
              : 'text-slate-700 border-transparent hover:bg-slate-100'
          }`}
        >
          <FileCheck2 size={16} />
          <span><span className="sm:hidden">{lang === 'ID' ? 'Self-Audit' : 'Self-Audit'}</span><span className="hidden sm:inline">{lang === 'ID' ? 'Daftarkan IKM & Self-Audit' : 'MSME Self-Audit & Onboarding'}</span></span>
        </button>

        <button
          onClick={() => setKioskMode('LOGISTICS')}
          className={`min-h-12 px-2 sm:px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2 border ${
            kioskMode === 'LOGISTICS'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
              : 'text-slate-700 border-transparent hover:bg-slate-100'
          }`}
        >
          <PlaneTakeoff size={16} />
          <span><span className="sm:hidden">{lang === 'ID' ? 'Logistik' : 'Freight'}</span><span className="hidden sm:inline">{lang === 'ID' ? 'Estimator Kargo' : 'Freight Estimator'}</span></span>
        </button>
      </div>

      {/* ================= MODE A: CATALOG & DISCOVERY ================= */}
      {kioskMode === 'CATALOG' && (
        <div className="space-y-6">
          {/* Search & Zones Filter */}
          <div className="space-y-3">
            <div className="relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder={lang === 'ID' ? 'Cari produk, pemilik, atau nama usaha terkurasi...' : 'Search verified products, owners, or businesses...'}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 text-sm shadow-xs font-medium"
              />
            </div>

            {/* Category Zones */}
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                { id: 'ALL' as const, labelId: 'Semua', labelEn: 'All' },
                { id: 'pangan' as const, labelId: 'Pangan', labelEn: 'Food' },
                { id: 'non-pangan' as const, labelId: 'Non-Pangan', labelEn: 'Non-Food' },
              ].map(zone => (
                <button
                  key={zone.id}
                  onClick={() => setSelectedZone(zone.id)}
                  className={`px-4 py-2 rounded-xl font-bold transition border ${
                    selectedZone === zone.id
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {lang === 'ID' ? zone.labelId : zone.labelEn}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-xl border border-emerald-200 bg-emerald-50/60 px-4 py-3 text-sm text-slate-700 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="font-semibold text-emerald-900">Katalog terverifikasi.</span>{' '}
              {lang === 'ID'
                ? 'Produk dan foto pada bagian ini bersumber dari portal resmi Rumah Kurasi Tangerang Selatan.'
                : 'Products and photos in this section are sourced from the official South Tangerang Rumah Kurasi portal.'}
            </div>
            <a
              href="https://kurasi.tangerangselatankota.go.id/produk"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 font-semibold text-emerald-800 hover:underline"
            >
              {lang === 'ID' ? 'Lihat katalog resmi ↗' : 'Open official catalog ↗'}
            </a>
          </div>

          {/* Verified Product Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {filtered.map(product => (
              <article
                key={product.id}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-emerald-400 group"
              >
                <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                  <ProductImage
                    src={product.imageUrl}
                    alt={`Foto resmi ${product.name}`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-emerald-700 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
                      Terverifikasi Rumah Kurasi
                    </span>
                    {product.market === 'Ekspor' && (
                      <span className="rounded-full bg-slate-900/85 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                        Pasar Ekspor
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-3 p-4 sm:p-5">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                      {product.category === 'pangan' ? (lang === 'ID' ? 'Pangan' : 'Food') : (lang === 'ID' ? 'Non-Pangan' : 'Non-Food')}
                    </div>
                    <h3 className="mt-1 text-base font-bold leading-6 text-slate-950">{product.name}</h3>
                    <p className="mt-1 text-xs font-medium text-slate-500">
                      {product.businessName ? `${product.businessName} · ` : ''}{product.ownerName}
                    </p>
                  </div>

                  <p className="line-clamp-3 text-sm leading-6 text-slate-600">{product.description}</p>

                  <div className="grid grid-cols-2 gap-3 rounded-lg bg-slate-50 p-3 text-xs">
                    <div>
                      <span className="block text-slate-400">{lang === 'ID' ? 'Status' : 'Status'}</span>
                      <strong className="mt-1 block text-slate-800">{product.market || 'Terkurasi'}</strong>
                    </div>
                    <div>
                      <span className="block text-slate-400">{lang === 'ID' ? 'Kapasitas' : 'Capacity'}</span>
                      <strong className="mt-1 block text-slate-800">{product.capacity || (lang === 'ID' ? 'Lihat sumber resmi' : 'See official source')}</strong>
                    </div>
                  </div>

                  <a
                    href={product.detailUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-800"
                  >
                    {lang === 'ID' ? 'Buka detail di Rumah Kurasi' : 'Open Rumah Kurasi detail'} <ArrowRight size={13}/>
                  </a>
                </div>

                <div className="space-y-2 border-t border-slate-100 p-4 sm:p-5">
                  <a
                    href={getProductAdvisorUrl(product)}
                    className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 text-sm font-semibold text-emerald-900 transition hover:border-emerald-400 hover:bg-emerald-100"
                  >
                    <Bot size={16} />
                    <span>{lang === 'ID' ? 'Tanya Regulasi Produk Ini ke AI' : 'Ask AI About Export Rules'}</span>
                    <ArrowRight size={14} />
                  </a>
                  <div className="flex items-center gap-2">
                    <a
                      href={getProductVeyloUrl(product)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Buka Ruang Negosiasi Veylo"
                      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition hover:bg-slate-800 hover:text-white"
                    >
                      <Video size={16} />
                    </a>
                    <button
                      type="button"
                      onClick={() => { setSelectedProduct(product); setInquirySent(false); setInquiryError(''); }}
                      className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 text-sm font-semibold text-white transition hover:bg-emerald-800"
                    >
                      <span>{lang === 'ID' ? 'Hubungi Booth / Request Sampel' : 'Contact Booth / Request Sample'}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
              {lang === 'ID' ? 'Produk terverifikasi tidak ditemukan untuk pencarian ini.' : 'No verified products match this search.'}
            </div>
          )}
        </div>
      )}

      {/* ================= MODE B: UMKM SELF-AUDIT ================= */}
      {kioskMode === 'SELF_AUDIT' && (
        <div className="max-w-3xl mx-auto space-y-6 text-xs">
          <div className="rounded-xl bg-white border border-slate-200 p-5 sm:p-7 space-y-5">
            <div>
              <div className="flex items-center gap-2 text-emerald-700 font-bold uppercase text-xs">
                <Sparkles size={16} />
                Checklist Kesiapan Ekspor
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-1">
                {lang === 'ID' ? 'Audit Kesiapan Regulasi Komoditas UMKM' : 'MSME Export Regulation Self-Audit'}
              </h2>
              <p className="text-slate-600 text-xs mt-1">
                Pelaku usaha dapat menguji kelengkapan dokumen dan sertifikasi sebelum mendaftar kurasi ekspor TEI 2026.
              </p>
            </div>

            <form onSubmit={handleRunSelfAudit} className="space-y-4">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Nama Usaha / Merek</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Kopi Rempah Pamulang"
                  value={auditNamaUsaha}
                  onChange={e => setAuditNamaUsaha(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:bg-white focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Jenis Komoditas</label>
                  <select
                    value={auditKomoditas}
                    onChange={e => setAuditKomoditas(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium focus:bg-white focus:border-emerald-600"
                  >
                    <option value="Kopi">Kopi Robusta / Arabika</option>
                    <option value="Gula Aren">Gula Aren / Pemanis Alami</option>
                    <option value="Bambu">Perabot / Kerajinan Bambu</option>
                    <option value="Sambal Retort">Sambal Olahan Pouch Retort</option>
                    <option value="Batik">Kain / Busana Batik Sutra</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Negara / Kawasan Target Ekspor</label>
                  <select
                    value={auditNegaraTarget}
                    onChange={e => setAuditNegaraTarget(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium focus:bg-white focus:border-emerald-600"
                  >
                    <option value="Uni Eropa">🇪🇺 Uni Eropa (Jerman, Belanda, Prancis)</option>
                    <option value="Timur Tengah / UAE">🇦🇪 Timur Tengah & UAE (GCC)</option>
                    <option value="Amerika Serikat">🇺🇸 Amerika Serikat (US FDA)</option>
                    <option value="Afrika / Kamerun">🇨🇲 Afrika Barat & Tengah (Kamerun)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1.5">Sertifikasi yang Sudah Dimiliki:</label>
                <div className="flex flex-wrap gap-2">
                  {['Halal', 'BPOM MD', 'HACCP', 'Organic', 'SVLK V-Legal', 'SNI'].map(c => {
                    const active = auditSertifikasi.includes(c);
                    return (
                      <button
                        type="button"
                        key={c}
                        onClick={() => {
                          if (active) {
                            setAuditSertifikasi(auditSertifikasi.filter(item => item !== c));
                          } else {
                            setAuditSertifikasi([...auditSertifikasi, c]);
                          }
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                          active
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-500 shadow-2xs'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {active ? '✓ ' : '+ '}{c}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="w-full min-h-12 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm transition flex items-center justify-center gap-2"
              >
                <Sparkles size={16} />
                Jalankan Audit Kesiapan Ekspor
              </button>
            </form>

            {/* AI Audit Output */}
            {auditOutput && (
              <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-300 space-y-4">
                <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
                  <div>
                    <span className="text-xs text-slate-500 uppercase font-bold">Hasil Evaluasi Kesiapan</span>
                    <h3 className="text-base font-extrabold text-slate-900 mt-0.5">{auditNamaUsaha || 'IKM Anda'}</h3>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-white text-emerald-800 border border-emerald-300 shadow-2xs">
                    {auditOutput.grade}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-800 block">Checklist Kepatuhan Dokumen ({auditNegaraTarget}):</span>
                  {auditOutput.checklist.map((chk, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                      <span className="text-slate-800 font-medium">{chk.item}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                        chk.ready ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {chk.ready ? 'Terpenuhi' : 'Belum Ada'}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 leading-relaxed font-medium">
                  <strong className="text-emerald-800 block mb-1 font-bold">Rekomendasi Tindak Lanjut:</strong>
                  {auditOutput.rekomendasi}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= MODE C: QUICK LOGISTICS ESTIMATOR ================= */}
      {kioskMode === 'LOGISTICS' && (
        <div className="max-w-3xl mx-auto space-y-6 text-xs">
          <div className="rounded-xl bg-white border border-slate-200 p-5 sm:p-7 space-y-5">
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs">
              <span className="font-bold block text-amber-900">ESTIMASI OPERASIONAL KARGO</span>
              Perkiraan biaya kargo untuk perencanaan awal buyer TEI 2026. Nilai final mengikuti quotation forwarder/carrier saat booking.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-slate-700 font-semibold mb-1 flex items-center gap-2">
                  Destinasi Buyer
                  {(() => { const selected = DESTINATION_PORTS.find(p => p.id === quickPortId); return selected ? <CountryFlag code={selected.countryCode} title={selected.country} className="h-4 w-6" /> : null; })()}
                </label>
                <select
                  value={quickPortId}
                  onChange={e => setQuickPortId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium focus:bg-white focus:border-emerald-600"
                >
                  {DESTINATION_PORTS.map(p => (
                    <option key={p.id} value={p.id}>{p.flag} {p.country}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Total Berat Kargo (kg)</label>
                <input
                  type="number"
                  min={5}
                  value={quickWeightKg}
                  onChange={e => setQuickWeightKg(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:bg-white focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Moda Kargo</label>
                <select
                  value={quickMode}
                  onChange={e => setQuickMode(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium focus:bg-white focus:border-emerald-600"
                >
                  <option value="AIR_EXPRESS">Air Express (Cepat)</option>
                  <option value="OCEAN_LCL">Ocean LCL (Ekonomis)</option>
                </select>
              </div>
            </div>

            {/* Quick Result Card */}
            <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
              <div className="text-xs text-slate-600 font-medium">Perkiraan Biaya Pengiriman Kargo (Indikatif)</div>
              <div className="text-3xl font-black text-slate-900">
                ${quickSimResult.totalEstimatedCostUsd.toFixed(2)} <span className="text-sm font-bold text-slate-500">USD</span>
              </div>
              <div className="text-xs text-emerald-800 font-mono font-bold">
                Rp {quickSimResult.totalEstimatedCostIdr.toLocaleString('id-ID')}
              </div>
              <div className="pt-2 text-xs text-slate-600">
                Estimasi Waktu Tempuh: <strong className="text-slate-900">{quickSimResult.transitTimeEstimate}</strong> • Chargeable Weight: <strong className="text-slate-900">{quickSimResult.chargeableWeightKg} kg</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Buyer Quick Inquiry Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={() => setSelectedProduct(null)} />
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-xl shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-start border-b border-slate-200 pb-3">
              <div>
                <span className="text-xs uppercase font-bold text-emerald-700">Trade Expo Indonesia 2026</span>
                <h3 className="text-base font-bold text-slate-900">
                  {lang === 'ID' ? 'Hubungi Perwakilan Booth Disperindag' : 'Contact Booth Delegation'}
                </h3>
              </div>
              <button onClick={() => setSelectedProduct(null)} className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900 transition">
                <X size={18} />
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <div className="font-bold text-slate-900">{selectedProduct.name}</div>
              <div className="text-slate-500 font-medium">{selectedProduct.businessName || selectedProduct.ownerName}</div>
            </div>

            {inquirySent ? (
              <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 size={36} className="text-emerald-700 mx-auto" />
                <h4 className="text-sm font-bold text-slate-900">
                  {lang === 'ID' ? 'Inquiry Berhasil Dicatat!' : 'Inquiry Successfully Logged!'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {lang === 'ID'
                    ? 'Permintaan sudah masuk ke daftar tindak lanjut booth Disperindag Tangsel. Kontak Anda tersimpan untuk proses follow-up.'
                    : 'Your request has been saved to the booth follow-up list for further contact.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    {lang === 'ID' ? 'Nama Lengkap / Buyer Name *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={e => setBuyerName(e.target.value)}
                    placeholder="e.g. John Doe / Pierre"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:bg-white focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    {lang === 'ID' ? 'Negara Asal / Country *' : 'Country of Origin *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={buyerCountry}
                    onChange={e => setBuyerCountry(e.target.value)}
                    placeholder="e.g. Cameroon, UAE, Germany, Japan"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:bg-white focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    {lang === 'ID' ? 'Nomor WhatsApp / Email Kontak *' : 'WhatsApp Number or Email *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={buyerContact}
                    onChange={e => setBuyerContact(e.target.value)}
                    placeholder="+237 ... or +971 ... or email@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:bg-white focus:border-emerald-600 font-mono"
                  />
                </div>

                {inquiryError && (
                  <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
                    {inquiryError}
                  </div>
                )}

                <div className="pt-2">
                  <a
                    href={getProductVeyloUrl(selectedProduct, { name: buyerName, country: buyerCountry })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-2 w-full py-3 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-2"
                  >
                    <Video size={14} />
                    Buka Veylo Room dengan Context Produk
                  </a>
                  <button
                    type="submit"
                    disabled={inquirySubmitting}
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-2 disabled:cursor-wait disabled:opacity-60"
                  >
                    <Send size={14} />
                    {inquirySubmitting
                      ? (lang === 'ID' ? 'Mengirim...' : 'Sending...')
                      : (lang === 'ID' ? 'Kirimkan Permintaan Pertemuan' : 'Submit Meeting Request')}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Mobile QR Continuation Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={() => setShowQrModal(false)} />
          <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-xl shadow-2xl p-6 space-y-5 text-xs text-center">
            <div className="flex justify-between items-start border-b border-slate-200 pb-3 text-left">
              <div>
                <span className="text-xs uppercase font-bold text-emerald-700">Booth Disperindag Tangsel • TEI 2026</span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  {lang === 'ID' ? 'Lanjutkan di Smartphone Anda' : 'Continue on Your Smartphone'}
                </h3>
              </div>
              <button onClick={() => setShowQrModal(false)} className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900 transition">
                <X size={18} />
              </button>
            </div>

            {/* QR Graphic Container */}
            <div className="flex flex-col items-center justify-center py-2 space-y-3">
              <div className="rounded-2xl border-2 border-emerald-200 bg-white p-4 shadow-sm">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&ecc=M&data=${encodeURIComponent(kioskContinuationUrl)}`}
                  alt={lang === 'ID' ? 'QR Code aktif menuju Kiosk Tangsel Export AI' : 'Live QR code to Tangsel Export AI Kiosk'}
                  className="h-48 w-48 object-contain sm:h-56 sm:w-56"
                />
              </div>

              <div className="space-y-1">
                <p className="font-bold text-slate-800 text-xs">
                  {lang === 'ID' ? 'Scan QR aktif ini dari kamera HP' : 'Scan this live QR code with your phone'}
                </p>
                <p className="text-slate-500 text-xs max-w-xs mx-auto">
                  {lang === 'ID'
                    ? 'QR ini berisi tautan Kiosk yang aktif, bukan ilustrasi. Halaman yang sama akan terbuka di browser HP Anda.'
                    : 'The interactive catalog will open directly on your mobile browser.'}
                </p>
              </div>
            </div>

            {/* Direct Link Copier */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <span className="text-slate-500 block font-medium">Atau salin tautan langsung berikut:</span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={kioskContinuationUrl}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-800 font-mono text-xs select-all focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(kioskContinuationUrl);
                    setCopiedLink(true);
                    setTimeout(() => setCopiedLink(false), 2000);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shrink-0 flex items-center gap-1 transition"
                >
                  {copiedLink ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedLink ? 'Tersalin' : 'Salin'}</span>
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
