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
  Video
} from 'lucide-react';
import { IKM_DATABASE, type IkmItem, type ProductItem } from '../data/ikmData';
import { DESTINATION_PORTS, calculateLogisticsDemo } from '../data/dhlDemoRates';
import { getVeyloRoomUrl } from '../lib/veyloBridge';

export const BoothKioskView: React.FC = () => {
  const [lang, setLang] = useState<'ID' | 'EN'>('ID');
  const [kioskMode, setKioskMode] = useState<'CATALOG' | 'SELF_AUDIT' | 'LOGISTICS'>('CATALOG');
  const [search, setSearch] = useState('');
  const [selectedZone, setSelectedZone] = useState<string>('ALL');
  const [selectedProduct, setSelectedProduct] = useState<{ ikm: IkmItem; product: ProductItem } | null>(null);
  const [inquirySent, setInquirySent] = useState(false);
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

  // Flatten products
  const allProducts: { ikm: IkmItem; product: ProductItem }[] = [];
  IKM_DATABASE.forEach(ikm => {
    ikm.products.forEach(p => {
      allProducts.push({ ikm, product: p });
    });
  });

  const filtered = allProducts.filter(({ ikm, product }) => {
    const matchZone = selectedZone === 'ALL' || product.category === selectedZone;
    const matchSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
                        ikm.namaUsaha.toLowerCase().includes(search.toLowerCase()) ||
                        product.description.toLowerCase().includes(search.toLowerCase()) ||
                        product.hsCode.includes(search);
    return matchZone && matchSearch;
  });

  const getProductVeyloUrl = (
    ikm: IkmItem,
    product: ProductItem,
    buyer?: { name?: string; country?: string }
  ) => getVeyloRoomUrl({
    ikmId: ikm.id,
    ikmName: ikm.namaUsaha,
    productId: product.id,
    productName: product.name,
    fobPriceUsd: product.fobPriceUsd,
    hsCode: product.hsCode,
    buyerName: buyer?.name,
    buyerCountry: buyer?.country,
  });

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setSelectedProduct(null);
      setBuyerName('');
      setBuyerCountry('');
      setBuyerContact('');
    }, 2500);
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

  const quickSimResult = calculateLogisticsDemo({
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
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Kiosk Hero Topbar */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img 
              src="/branding/logo-tangsel.png" 
              alt="Lambang Resmi Kota Tangerang Selatan" 
              className="w-14 h-14 object-contain shrink-0 drop-shadow-xs" 
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {lang === 'ID' ? 'Kios Interaktif Booth' : 'Interactive Booth Kiosk'}
                </span>
                <span className="text-slate-500 text-xs font-semibold">TEI 2026 • ICE BSD City</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
                {lang === 'ID' ? 'Katalog Komoditas Ekspor Tangerang Selatan' : 'South Tangerang Export Commodity Catalog'}
              </h1>
              <p className="text-xs text-slate-600 mt-0.5 font-medium">
                {lang === 'ID'
                  ? 'Pemerintah Kota Tangerang Selatan — Dinas Perindustrian dan Perdagangan'
                  : 'Official Government of South Tangerang City — Department of Industry and Trade'}
              </p>
            </div>
          </div>

          {/* Language Switcher & Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs">
              <button
                onClick={() => setLang('ID')}
                className={`px-3 py-1.5 rounded-lg font-bold transition ${
                  lang === 'ID' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ID
              </button>
              <button
                onClick={() => setLang('EN')}
                className={`px-3 py-1.5 rounded-lg font-bold transition ${
                  lang === 'EN' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5"
            >
              <QrCode size={15} />
              <span>{lang === 'ID' ? 'Buka di HP (QR Scan)' : 'Open on Phone (QR)'}</span>
            </button>

            <a
              href={selectedProduct ? getProductVeyloUrl(selectedProduct.ikm, selectedProduct.product) : getVeyloRoomUrl({})}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5"
            >
              <Video size={15} />
              <span>Veylo Room</span>
            </a>

            <a
              href="/command-center"
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition"
            >
              ← Dashboard
            </a>
          </div>
        </div>
      </div>

      {/* 3 Core Kiosk Modes Switcher Bar */}
      <div className="p-1.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-wrap gap-2 text-xs">
        <button
          onClick={() => setKioskMode('CATALOG')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold transition flex items-center justify-center gap-2 border ${
            kioskMode === 'CATALOG'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
              : 'text-slate-700 border-transparent hover:bg-slate-100'
          }`}
        >
          <Store size={16} />
          <span>{lang === 'ID' ? 'Mode A: Katalog & Pencarian Buyer' : 'Mode A: Catalog & Buyer Discovery'}</span>
        </button>

        <button
          onClick={() => setKioskMode('SELF_AUDIT')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold transition flex items-center justify-center gap-2 border ${
            kioskMode === 'SELF_AUDIT'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
              : 'text-slate-700 border-transparent hover:bg-slate-100'
          }`}
        >
          <FileCheck2 size={16} />
          <span>{lang === 'ID' ? 'Mode B: Daftarkan IKM (Self-Audit AI)' : 'Mode B: MSME Self-Audit & Onboarding'}</span>
        </button>

        <button
          onClick={() => setKioskMode('LOGISTICS')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold transition flex items-center justify-center gap-2 border ${
            kioskMode === 'LOGISTICS'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
              : 'text-slate-700 border-transparent hover:bg-slate-100'
          }`}
        >
          <PlaneTakeoff size={16} />
          <span>{lang === 'ID' ? 'Mode C: Quick Estimator Kargo (DHL Demo)' : 'Mode C: Quick Freight Estimator (Demo)'}</span>
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
                placeholder={lang === 'ID' ? 'Cari produk ekspor, rempah, batik, kopi, bambu, atau HS Code...' : 'Search export commodities, coffee, textiles, bamboo, or HS Code...'}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 text-sm shadow-xs font-medium"
              />
            </div>

            {/* Category Zones */}
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                { id: 'ALL', labelId: 'Semua Kategori', labelEn: 'All Categories' },
                { id: 'food_beverage', labelId: 'Food & Beverage', labelEn: 'Food & Beverage' },
                { id: 'fashion_kerajinan', labelId: 'Fashion & Kerajinan', labelEn: 'Fashion & Handcraft' },
                { id: 'furniture_dekor', labelId: 'Furniture & Dekorasi', labelEn: 'Furniture & Decor' },
                { id: 'manufaktur', labelId: 'Manufaktur Presisi', labelEn: 'Precision Manufacturing' },
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

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(({ ikm, product }) => (
              <div
                key={product.id}
                className="rounded-3xl bg-white border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between hover:border-emerald-400 hover:shadow-md transition group"
              >
                <div>
                  <div className="h-48 w-full bg-slate-100 relative overflow-hidden">
                    <img
                      src={product.photoUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase shadow-xs ${
                        ikm.grade === 'A' ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'
                      }`}>
                        Grade {ikm.grade}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] font-mono text-cyan-200 font-semibold">
                        HS: {product.hsCode}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-white/90 backdrop-blur-md text-emerald-800 font-extrabold text-sm border border-slate-200 shadow-xs">
                      ${product.fobPriceUsd.toFixed(2)} USD <span className="text-[10px] text-slate-500 font-normal">FOB</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <div className="text-[11px] text-emerald-700 font-bold uppercase tracking-wider">{ikm.brand}</div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition">
                        {product.name}
                      </h3>
                      <div className="text-xs text-slate-500 font-medium mt-0.5">
                        {ikm.namaUsaha} • {ikm.kecamatan}, Tangsel
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                      <div>
                        <span className="text-slate-500 block text-[11px]">{lang === 'ID' ? 'Kapasitas:' : 'Capacity:'}</span>
                        <strong className="text-slate-900">{product.capacityPerMonth}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[11px]">Min. Order (MOQ):</span>
                        <strong className="text-slate-900">{product.moq}</strong>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {product.certifications.map((c, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-emerald-50 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                          ✓ {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center gap-2">
                  <a
                    href={getProductVeyloUrl(ikm, product)}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Buka Ruang Negosiasi Veylo"
                    className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white border border-blue-200 transition shadow-2xs"
                  >
                    <Video size={16} />
                  </a>
                  <button
                    onClick={() => setSelectedProduct({ ikm, product })}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-2"
                  >
                    <span>{lang === 'ID' ? 'Request Pertemuan / Sampel' : 'Request Meeting / Sample'}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= MODE B: UMKM SELF-AUDIT ================= */}
      {kioskMode === 'SELF_AUDIT' && (
        <div className="max-w-3xl mx-auto space-y-6 text-xs">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5">
            <div>
              <div className="flex items-center gap-2 text-emerald-700 font-bold uppercase text-[11px]">
                <Sparkles size={16} />
                AI Export Gap Checklist (Self-Service Kiosk)
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
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:bg-white focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Jenis Komoditas</label>
                  <select
                    value={auditKomoditas}
                    onChange={e => setAuditKomoditas(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium focus:bg-white focus:border-emerald-600"
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium focus:bg-white focus:border-emerald-600"
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
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-2"
              >
                <Sparkles size={16} />
                Jalankan Audit AI Kesiapan Ekspor
              </button>
            </form>

            {/* AI Audit Output */}
            {auditOutput && (
              <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-300 space-y-4">
                <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Hasil Evaluasi AI Disperindag</span>
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
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
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
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5">
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs">
              <span className="font-bold block text-amber-900">DEMO RATE & KEMITRAAN LOGISTIK DALAM PEMBAHASAN</span>
              Perhitungan indikatif cepat kargo ekspor untuk buyer pameran TEI 2026.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Destinasi Buyer</label>
                <select
                  value={quickPortId}
                  onChange={e => setQuickPortId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium focus:bg-white focus:border-emerald-600"
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:bg-white focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Moda Kargo</label>
                <select
                  value={quickMode}
                  onChange={e => setQuickMode(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium focus:bg-white focus:border-emerald-600"
                >
                  <option value="AIR_EXPRESS">Air Express (Cepat)</option>
                  <option value="OCEAN_LCL">Ocean LCL (Ekonomis)</option>
                </select>
              </div>
            </div>

            {/* Quick Result Card */}
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-2">
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
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-start border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-700">Trade Expo Indonesia 2026</span>
                <h3 className="text-base font-bold text-slate-900">
                  {lang === 'ID' ? 'Hubungi Perwakilan Booth Disperindag' : 'Contact Booth Delegation'}
                </h3>
              </div>
              <button onClick={() => setSelectedProduct(null)} className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900 transition">
                <X size={18} />
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <div className="font-bold text-slate-900">{selectedProduct.product.name}</div>
              <div className="text-slate-500 font-medium">{selectedProduct.ikm.namaUsaha} (Kec. {selectedProduct.ikm.kecamatan})</div>
            </div>

            {inquirySent ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-2">
                <CheckCircle2 size={36} className="text-emerald-700 mx-auto" />
                <h4 className="text-sm font-bold text-slate-900">
                  {lang === 'ID' ? 'Inquiry Berhasil Dicatat!' : 'Inquiry Successfully Logged!'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {lang === 'ID'
                    ? 'Petugas booth Disperindag Tangsel akan menghubungi nomor kontak Anda untuk penjadwalan pertemuan bisnis.'
                    : 'Our booth trade officer will contact you shortly to schedule an in-person meeting.'}
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:bg-white focus:border-emerald-600"
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:bg-white focus:border-emerald-600"
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:bg-white focus:border-emerald-600 font-mono"
                  />
                </div>

                <div className="pt-2">
                  <a
                    href={getProductVeyloUrl(selectedProduct.ikm, selectedProduct.product, { name: buyerName, country: buyerCountry })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-2 w-full py-3 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-2"
                  >
                    <Video size={14} />
                    Buka Veylo Room dengan Context Produk
                  </a>
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-2"
                  >
                    <Send size={14} />
                    {lang === 'ID' ? 'Kirimkan Permintaan Pertemuan' : 'Submit Meeting Request'}
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
          <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 space-y-5 text-xs text-center">
            <div className="flex justify-between items-start border-b border-slate-200 pb-3 text-left">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-700">Booth Disperindag Tangsel • TEI 2026</span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  {lang === 'ID' ? 'Lanjutkan di Smartphone Anda' : 'Continue on Your Smartphone'}
                </h3>
              </div>
              <button onClick={() => setShowQrModal(false)} className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900 transition">
                <X size={18} />
              </button>
            </div>

            {/* QR Graphic Container */}
            <div className="flex flex-col items-center justify-center py-2 space-y-3">
              <div className="p-4 bg-white rounded-2xl shadow-sm border-2 border-emerald-200 inline-block">
                <svg className="w-48 h-48" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Top-Left Finder */}
                  <rect x="10" y="10" width="30" height="30" rx="4" fill="#0f172a" />
                  <rect x="16" y="16" width="18" height="18" fill="white" />
                  <rect x="20" y="20" width="10" height="10" rx="2" fill="#059669" />

                  {/* Top-Right Finder */}
                  <rect x="80" y="10" width="30" height="30" rx="4" fill="#0f172a" />
                  <rect x="86" y="16" width="18" height="18" fill="white" />
                  <rect x="90" y="20" width="10" height="10" rx="2" fill="#059669" />

                  {/* Bottom-Left Finder */}
                  <rect x="10" y="80" width="30" height="30" rx="4" fill="#0f172a" />
                  <rect x="16" y="86" width="18" height="18" fill="white" />
                  <rect x="20" y="90" width="10" height="10" rx="2" fill="#059669" />

                  {/* Timing & Data Patterns */}
                  <rect x="45" y="15" width="6" height="6" fill="#0f172a" />
                  <rect x="55" y="15" width="6" height="6" fill="#059669" />
                  <rect x="65" y="15" width="6" height="6" fill="#0f172a" />

                  <rect x="15" y="45" width="6" height="6" fill="#0f172a" />
                  <rect x="15" y="55" width="6" height="6" fill="#059669" />
                  <rect x="15" y="65" width="6" height="6" fill="#0f172a" />

                  {/* Center Data Matrix Grid */}
                  <rect x="45" y="45" width="8" height="8" rx="1" fill="#059669" />
                  <rect x="57" y="45" width="8" height="8" rx="1" fill="#0f172a" />
                  <rect x="69" y="45" width="8" height="8" rx="1" fill="#059669" />

                  <rect x="45" y="57" width="8" height="8" rx="1" fill="#0f172a" />
                  <rect x="57" y="57" width="8" height="8" rx="1" fill="#059669" />
                  <rect x="69" y="57" width="8" height="8" rx="1" fill="#0f172a" />

                  <rect x="45" y="69" width="8" height="8" rx="1" fill="#059669" />
                  <rect x="57" y="69" width="8" height="8" rx="1" fill="#0f172a" />
                  <rect x="69" y="69" width="8" height="8" rx="1" fill="#059669" />

                  {/* Alignment Details */}
                  <rect x="85" y="85" width="16" height="16" rx="3" fill="#0f172a" />
                  <rect x="89" y="89" width="8" height="8" fill="white" />
                  <rect x="91" y="91" width="4" height="4" fill="#059669" />
                </svg>
              </div>

              <div className="space-y-1">
                <p className="font-bold text-slate-800 text-xs">
                  {lang === 'ID' ? 'Arahkan Kamera HP ke QR Code' : 'Point Your Phone Camera at QR Code'}
                </p>
                <p className="text-slate-500 text-[11px] max-w-xs mx-auto">
                  {lang === 'ID'
                    ? 'Katalog interaktif & fitur self-audit IKM akan terbuka di browser smartphone Anda.'
                    : 'The interactive catalog will open directly on your mobile browser.'}
                </p>
              </div>
            </div>

            {/* Direct Link Copier */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] space-y-2">
              <span className="text-slate-500 block font-medium">Atau salin tautan langsung berikut:</span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={kioskContinuationUrl}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-800 font-mono text-[11px] select-all focus:outline-none"
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
