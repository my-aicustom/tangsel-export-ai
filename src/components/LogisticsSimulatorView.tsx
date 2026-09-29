import React, { useState, useEffect } from 'react';
import {
  PlaneTakeoff,
  Ship,
  Calculator,
  FileText,
  AlertTriangle,
  ShieldCheck,
  Check,
  ChevronRight,
  ChevronLeft,
  Info,
  Sparkles,
  Printer,
  RotateCcw,
  ArrowRight,
  TrendingDown,
  Layers,
  Clock,
  DollarSign,
  PackageCheck,
  Video,
  RefreshCw,
  ExternalLink,
  Database
} from 'lucide-react';
import {
  DESTINATION_PORTS,
  calculateLogisticsEstimate,
  calculateSideBySideComparison,
  type LogisticsSimulationParams,
  type SimulationResult,
  type SideBySideComparisonResult,
  LOGISTICS_RATE_META
} from '../data/logisticsRates';
import { CountryFlag } from './CountryFlag';
import {
  fetchFreightosMarketEstimates,
  fetchUsdIdrRate,
  type FreightMarketEstimates
} from '../lib/openFreightEstimate';

export const LogisticsSimulatorView: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [params, setParams] = useState<LogisticsSimulationParams>({
    destinationId: 'port-dla', // Cameroon / Douala default
    actualWeightKg: 25,
    lengthCm: 40,
    widthCm: 30,
    heightCm: 30,
    packagesCount: 10,
    cargoValueUsd: 1500,
    incoterm: 'CIF',
    mode: 'AIR_EXPRESS',
    needInsurance: true
  });

  const [forwardedContext, setForwardedContext] = useState<{
    exporterName?: string;
    productName?: string;
    fobPriceUsd?: number;
  } | null>(null);

  const [showExportModal, setShowExportModal] = useState(false);
  const [usdToIdr, setUsdToIdr] = useState(17985);
  const [fxDate, setFxDate] = useState<string | null>(null);
  const [marketEstimates, setMarketEstimates] = useState<FreightMarketEstimates | null>(null);
  const [marketLoading, setMarketLoading] = useState(false);
  const [marketError, setMarketError] = useState<string | null>(null);

  // Read URL query parameters passed from /readiness ("Create Logistics Simulation")
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const exporterName = searchParams.get('exporterName');
      const productName = searchParams.get('productName');
      const p = searchParams.get('p');
      const l = searchParams.get('l');
      const t = searchParams.get('t');
      const w = searchParams.get('w');
      const fob = searchParams.get('fob');
      const dest = searchParams.get('dest');

      if (exporterName || productName || p || w || fob) {
        const parsedP = p ? parseInt(p) : 40;
        const parsedL = l ? parseInt(l) : 30;
        const parsedT = t ? parseInt(t) : 30;
        const parsedW = w ? parseFloat(w) : 25;
        const parsedFob = fob ? parseFloat(fob) : 150;
        const defaultKoli = 10;

        setForwardedContext({
          exporterName: exporterName || undefined,
          productName: productName || undefined,
          fobPriceUsd: parsedFob
        });

        setParams(prev => ({
          ...prev,
          destinationId: dest || prev.destinationId,
          lengthCm: parsedP,
          widthCm: parsedL,
          heightCm: parsedT,
          actualWeightKg: parsedW,
          packagesCount: defaultKoli,
          cargoValueUsd: parsedFob * defaultKoli
        }));

        // Advance to step 2 so user sees the dimensions pre-filled
        setStep(2);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchUsdIdrRate(controller.signal)
      .then(({ rate, date }) => {
        setUsdToIdr(rate);
        setFxDate(date || null);
      })
      .catch(() => {
        // Keep the bundled operational fallback rate when the open FX endpoint is unavailable.
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    setMarketEstimates(null);
    setMarketError(null);
  }, [params.destinationId, params.actualWeightKg, params.lengthCm, params.widthCm, params.heightCm, params.packagesCount]);

  const result: SimulationResult = calculateLogisticsEstimate(params, usdToIdr);
  const comparison: SideBySideComparisonResult = calculateSideBySideComparison(params, usdToIdr);
  const selectedPort = DESTINATION_PORTS.find(p => p.id === params.destinationId) || DESTINATION_PORTS[0];

  const handleFetchMarketEstimate = async () => {
    setMarketLoading(true);
    setMarketError(null);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 9000);

    try {
      const estimates = await fetchFreightosMarketEstimates({
        airDestinationCode: selectedPort.airCode,
        seaDestinationLocode: selectedPort.unLocode,
        weightPerPackageKg: params.actualWeightKg,
        lengthCm: params.lengthCm,
        widthCm: params.widthCm,
        heightCm: params.heightCm,
        packagesCount: params.packagesCount,
      }, controller.signal);
      setMarketEstimates(estimates);
    } catch {
      setMarketError('Estimasi pasar publik belum tersedia untuk rute atau ukuran kargo ini. Model perencanaan internal tetap dapat digunakan.');
    } finally {
      window.clearTimeout(timeout);
      setMarketLoading(false);
    }
  };

  const formatMarketTransit = (min?: number, max?: number) => {
    if (min && max) return `${min}–${max} hari`;
    if (min) return `${min}+ hari`;
    return 'Transit mengikuti marketplace';
  };

  const handleReset = () => {
    setParams({
      destinationId: 'port-dla',
      actualWeightKg: 25,
      lengthCm: 40,
      widthCm: 30,
      heightCm: 30,
      packagesCount: 10,
      cargoValueUsd: 1500,
      incoterm: 'CIF',
      mode: 'AIR_EXPRESS',
      needInsurance: true
    });
    setForwardedContext(null);
    setStep(1);
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Partner Header: Disperindag Tangsel & Estimasi Integrasi Logistik */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
              Disperindag Kota Tangerang Selatan
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-sm text-slate-500">Tangsel Export AI</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
            Estimasi Biaya Logistik & Kargo Ekspor
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-xl leading-relaxed">
            Estimator operasional rute kargo internasional, perbandingan moda Air Express vs Ocean LCL, dan proyeksi landing cost IKM Tangsel untuk TEI 2026.
          </p>
        </div>

        <div className="rounded-lg bg-slate-50 px-4 py-3 text-xs text-slate-600 shrink-0 self-start sm:self-center">
          <div className="font-semibold uppercase tracking-wide text-slate-500">Status data</div>
          <div className="mt-0.5 font-bold text-slate-900">Open market + operational model</div>
          <div className="mt-0.5">Tanpa API key carrier dan tanpa vendor lock-in</div>
        </div>
      </div>

      {/* Disclaimer estimasi */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 sm:p-5 text-sm text-amber-950 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2 font-bold text-amber-900 text-sm">
          <div className="flex flex-wrap items-center gap-2">
            <AlertTriangle size={18} className="text-amber-700 shrink-0" />
            <span>Estimasi operasional — bukan quotation carrier</span>
          </div>
        </div>
        <p className="leading-relaxed text-amber-900/90 font-medium">
          Modul menggunakan <strong>estimasi pasar publik Freightos</strong> saat tersedia, kurs harian terbuka untuk konversi USD/IDR, serta model perencanaan internal sebagai fallback. Nilai ini tetap merupakan estimasi perencanaan dan bukan quotation yang mengikat sampai pemesanan dikonfirmasi oleh forwarder/carrier. Sumber fallback: <strong>{LOGISTICS_RATE_META.source}</strong>.
        </p>
      </div>

      {/* Exporter Forwarded Bridge Banner (if arriving from /readiness) */}
      {forwardedContext && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-100 text-emerald-800 shrink-0">
              <PackageCheck size={20} />
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-emerald-800 block tracking-wider">
                Data dari modul Kesiapan Ekspor
              </span>
              <div className="text-slate-900 font-bold text-sm mt-0.5">
                {forwardedContext.exporterName || 'IKM Tangsel'} — {forwardedContext.productName || 'Komoditas Unggulan'}
              </div>
              <div className="text-slate-600 text-xs mt-0.5 font-medium">
                Dimensi produk & nilai estimasi FOB (${forwardedContext.fobPriceUsd || 0}/unit) telah diimpor otomatis ke estimator.
              </div>
            </div>
          </div>
          <button
            onClick={() => setForwardedContext(null)}
            className="min-h-11 px-3 rounded-lg bg-white hover:bg-emerald-100 border border-emerald-200 text-sm font-semibold text-emerald-900 self-start sm:self-auto transition"
          >
            Tutup Notifikasi
          </button>
        </div>
      )}

      {/* Step Indicator Header */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Estimator Biaya Pengiriman
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Estimator Biaya Logistik Ekspor IKM
            </h2>
          </div>
          <button
            onClick={handleReset}
            className="min-h-11 flex items-center gap-1.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition self-start sm:self-auto"
          >
            <RotateCcw size={14} />
            Reset Form
          </button>
        </div>

        {/* Stepper Progress */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
          {[
            { s: 1, title: 'Destinasi Ekspor' },
            { s: 2, title: 'Dimensi & Koli' },
            { s: 3, title: 'Moda & Incoterms' },
            { s: 4, title: 'Perbandingan Biaya' },
          ].map((item) => (
            <div
              key={item.s}
              onClick={() => setStep(item.s as any)}
              className={`min-h-16 p-3 rounded-lg border text-center transition cursor-pointer ${
                step === item.s
                  ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 text-emerald-900 font-bold shadow-2xs'
                  : step > item.s
                  ? 'bg-slate-100 border-slate-200 text-emerald-800 font-medium'
                  : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}
            >
              <div className="text-xs text-slate-500 font-semibold">Langkah {item.s}</div>
              <div className="text-xs truncate mt-0.5">{item.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Wizard Steps Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Active Wizard Form */}
        <div className="lg:col-span-2">
          <div className="rounded-xl bg-white border border-slate-200 p-4 sm:p-6 min-h-[440px] flex flex-col justify-between">
            {/* Step 1: Destination */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">Pilih Negara & Pelabuhan / Bandara Tujuan</h3>
                  <p className="text-xs text-slate-600">
                    Pilih target pasar ekspor buyer untuk penyesuaian regulasi cukai dan rate card estimasi.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {DESTINATION_PORTS.map((port) => (
                    <button
                      type="button"
                      key={port.id}
                      onClick={() => setParams({ ...params, destinationId: port.id })}
                      aria-pressed={params.destinationId === port.id}
                      className={`w-full p-4 rounded-xl border transition text-left text-xs space-y-1.5 ${
                        params.destinationId === port.id
                          ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-2xs'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <CountryFlag code={port.countryCode} title={port.country} className="h-6 w-9" />
                          <span className="font-mono text-[11px] font-bold text-slate-400">{port.countryCode}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-xs font-bold bg-white text-slate-700 border border-slate-200">
                          {port.region}
                        </span>
                      </div>
                      <div className="font-bold text-slate-900 text-sm">{port.country}</div>
                      <div className="text-slate-600 text-xs leading-tight font-medium">{port.name}</div>
                      <div className="pt-2 flex justify-between text-xs text-slate-500 border-t border-slate-200">
                        <span>Udara: <strong className="text-blue-700">{port.transitDaysAir}</strong></span>
                        <span>Laut: <strong className="text-emerald-700">{port.transitDaysOcean}</strong></span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Dimensions & Weight */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">Dimensi Koli, Berat & Jumlah Kemasan</h3>
                  <p className="text-xs text-slate-600">
                    Sistem akan menghitung bobot aktual, berat volumetrik (Divisor 5.000 untuk Udara), dan kubikasi CBM (Laut LCL).
                  </p>
                </div>

                {/* Preset Tangsel Products */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <label className="text-xs font-bold text-emerald-800 block">
                    ⚡ Auto-Fill Preset Produk Komoditas Tangsel:
                  </label>
                  <select
                    onChange={(e) => {
                      const presets: Record<string, { p: number; l: number; t: number; w: number; val: number }> = {
                        aren: { p: 42, l: 28, t: 22, w: 11, val: 800 },
                        kopi: { p: 45, l: 32, t: 25, w: 11.5, val: 950 },
                        bambu: { p: 50, l: 40, t: 30, w: 9.5, val: 650 },
                        sambal: { p: 35, l: 25, t: 20, w: 9.8, val: 500 },
                        batik: { p: 38, l: 28, t: 18, w: 6.2, val: 1400 },
                        kuningan: { p: 30, l: 22, t: 18, w: 17.5, val: 2900 },
                      };
                      const found = presets[e.target.value];
                      if (found) {
                        setParams({
                          ...params,
                          lengthCm: found.p,
                          widthCm: found.l,
                          heightCm: found.t,
                          actualWeightKg: found.w,
                          cargoValueUsd: found.val,
                        });
                      }
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:border-emerald-600"
                  >
                    <option value="">-- Pilih Template Komoditas Tangsel (Opsional) --</option>
                    <option value="aren">Gula Aren Kristal Organik Pamulang (Karton 20x500g)</option>
                    <option value="kopi">Biji Kopi Robusta Sangrai Ciputat (Karton 10x1kg)</option>
                    <option value="bambu">Set Perlengkapan Bambu BSD (Karton 25 set)</option>
                    <option value="sambal">Retort Pouch Sambal Roa Bintaro (Karton 50x150g)</option>
                    <option value="batik">Syal Sutra Batik Anggrek Tangsel (Karton 50 pcs)</option>
                    <option value="kuningan">Fitting Kuningan Presisi Pamulang (Karton 100 pcs)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Jumlah Koli / Karton (Box)
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={params.packagesCount}
                      onChange={e => setParams({ ...params, packagesCount: Math.max(1, parseInt(e.target.value) || 1) })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:border-emerald-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Berat Aktual per Koli (kg)
                    </label>
                    <input
                      type="number"
                      min={0.1}
                      step={0.5}
                      value={params.actualWeightKg}
                      onChange={e => setParams({ ...params, actualWeightKg: parseFloat(e.target.value) || 1 })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:border-emerald-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <span className="text-xs font-bold text-slate-800 block">Ukuran Dimensi per Karton (cm)</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs text-slate-600 font-semibold block mb-1">Panjang (P) cm</label>
                      <input
                        type="number"
                        min={1}
                        value={params.lengthCm}
                        onChange={e => setParams({ ...params, lengthCm: parseInt(e.target.value) || 1 })}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-600 font-semibold block mb-1">Lebar (L) cm</label>
                      <input
                        type="number"
                        min={1}
                        value={params.widthCm}
                        onChange={e => setParams({ ...params, widthCm: parseInt(e.target.value) || 1 })}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-600 font-semibold block mb-1">Tinggi (T) cm</label>
                      <input
                        type="number"
                        min={1}
                        value={params.heightCm}
                        onChange={e => setParams({ ...params, heightCm: parseInt(e.target.value) || 1 })}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Calculation indicator card */}
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-2">
                  <div className="flex justify-between text-slate-700">
                    <span>Total Berat Aktual ({params.packagesCount} koli):</span>
                    <strong className="text-slate-900">{comparison.actualWeightKg} kg</strong>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Total Berat Volumetrik Air ((PxLxT)/5000 * {params.packagesCount}):</span>
                    <strong className="text-slate-900">{comparison.volumetricWeightKg} kg</strong>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Total Kubikasi Volume (CBM):</span>
                    <strong className="text-blue-800">{comparison.totalVolumeCbm} CBM</strong>
                  </div>
                  <div className="flex justify-between text-emerald-900 font-bold pt-2 border-t border-emerald-200">
                    <span>Chargeable Weight Air Freight:</span>
                    <span className="text-sm font-extrabold">{comparison.air.chargeableWeightKg} kg</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Mode & Incoterms */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">Moda Pengiriman & Persyaratan Incoterms</h3>
                  <p className="text-xs text-slate-600">
                    Tentukan moda transportasi utama dan pembagian tanggung jawab ongkos angkut antara eksportir dan buyer.
                  </p>
                </div>

                {/* Mode Select */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div
                    onClick={() => setParams({ ...params, mode: 'AIR_EXPRESS' })}
                    className={`p-4 rounded-xl border transition cursor-pointer text-xs space-y-2 ${
                      params.mode === 'AIR_EXPRESS'
                        ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/20 shadow-2xs'
                        : 'bg-slate-50 border-slate-200 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                        <PlaneTakeoff size={18} className="text-blue-600" />
                        Air Express
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      Cepat ({selectedPort.transitDaysAir}), cocok untuk sampel buyer TEI, dokumen, atau kargo urgent.
                    </p>
                    <div className="text-blue-800 font-mono text-xs font-bold">
                      Rate Indikatif: ${selectedPort.airBaseRatePerKg.toFixed(2)}/kg
                    </div>
                  </div>

                  <div
                    onClick={() => setParams({ ...params, mode: 'OCEAN_LCL' })}
                    className={`p-4 rounded-xl border transition cursor-pointer text-xs space-y-2 ${
                      params.mode === 'OCEAN_LCL'
                        ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-2xs'
                        : 'bg-slate-50 border-slate-200 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                        <Ship size={18} className="text-emerald-600" />
                        Ocean LCL
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      Ekonomis ({selectedPort.transitDaysOcean}), dihitung per CBM, ideal untuk kargo komersial skala besar.
                    </p>
                    <div className="text-emerald-800 font-mono text-xs font-bold">
                      Rate Indikatif: ${selectedPort.oceanBaseRatePerCbm.toFixed(2)}/CBM
                    </div>
                  </div>
                </div>

                {/* Incoterms Select */}
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Pilihan Incoterms 2020:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['FOB', 'CIF', 'EXW'] as const).map(term => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => setParams({ ...params, incoterm: term })}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                          params.incoterm === term
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 mt-2 p-3 rounded-xl bg-slate-50 border border-slate-200 leading-relaxed font-medium">
                    {result.incotermExplanation}
                  </p>
                </div>

                {/* Value & Insurance */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Estimasi Total Nilai Barang FOB ($ USD)
                    </label>
                    <input
                      type="number"
                      min={100}
                      step={100}
                      value={params.cargoValueUsd}
                      onChange={e => setParams({ ...params, cargoValueUsd: parseFloat(e.target.value) || 100 })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:bg-white focus:border-emerald-600"
                    />
                  </div>
                  <div className="flex items-center gap-3 pt-6">
                    <input
                      type="checkbox"
                      id="insurance"
                      checked={params.needInsurance}
                      onChange={e => setParams({ ...params, needInsurance: e.target.checked })}
                      className="w-4 h-4 rounded text-emerald-600 border-slate-300 focus:ring-emerald-500"
                    />
                    <label htmlFor="insurance" className="text-xs text-slate-700 cursor-pointer font-medium">
                      Sertakan Asuransi Pelayaran Ekspor (Marine Cargo All-Risk)
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Final Summary & SIDE-BY-SIDE AIR VS OCEAN COMPARISON */}
            {step === 4 && (
              <div className="space-y-5">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900">
                      Perbandingan Air Freight dan Ocean LCL
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Bandingkan estimasi biaya, waktu tempuh, dan bobot tagihan Air Express dengan Ocean LCL dari Tangsel ke {selectedPort.country}.
                  </p>
                </div>

                {/* Recommendation Alert */}
                <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-sm space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-900 text-sm">
                    <Sparkles size={16} className="text-emerald-700" />
                    <span>Saran moda berdasarkan estimasi: {comparison.recommendedMode === 'OCEAN_LCL' ? 'Ocean LCL (Laut)' : 'Air Freight (Udara)'}</span>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {comparison.recommendationReason}
                  </p>
                </div>

                {/* Open public market estimate */}
                <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                        <Database size={16} className="text-emerald-700" />
                        Estimasi Pasar Terbuka
                      </div>
                      <p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-600">
                        Ambil kisaran freight publik untuk rute yang dipilih. Data pasar menggunakan Freightos Public Shipping Estimates, kode lokasi mengacu UN/LOCODE, dan konversi USD/IDR menggunakan Frankfurter.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleFetchMarketEstimate}
                      disabled={marketLoading}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-wait disabled:opacity-60"
                    >
                      <RefreshCw size={15} className={marketLoading ? 'animate-spin' : ''} />
                      {marketLoading ? 'Mengambil data…' : marketEstimates ? 'Perbarui estimasi pasar' : 'Ambil estimasi pasar'}
                    </button>
                  </div>

                  {marketError && (
                    <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-900">
                      {marketError}
                    </div>
                  )}

                  {marketEstimates && (
                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {[
                        { id: 'AIR_EXPRESS' as const, label: 'Air Freight', data: marketEstimates.air, icon: PlaneTakeoff },
                        { id: 'OCEAN_LCL' as const, label: 'Ocean LCL', data: marketEstimates.ocean, icon: Ship },
                      ].map(item => {
                        const Icon = item.icon;
                        const active = params.mode === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setParams({ ...params, mode: item.id })}
                            disabled={!item.data}
                            className={`min-h-28 rounded-xl border p-4 text-left transition ${active ? 'border-emerald-500 bg-emerald-50/60' : 'border-slate-200 bg-slate-50 hover:bg-white'} disabled:cursor-not-allowed disabled:opacity-60`}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <span className="inline-flex items-center gap-2 text-sm font-bold text-slate-900"><Icon size={17} />{item.label}</span>
                              {active && <span className="text-xs font-semibold text-emerald-700">Moda aktif</span>}
                            </div>
                            {item.data ? (
                              <>
                                <div className="mt-3 text-xl font-extrabold tracking-tight text-slate-950">
                                  ${item.data.minUsd.toLocaleString('en-US')}–${item.data.maxUsd.toLocaleString('en-US')} USD
                                </div>
                                <div className="mt-1 text-xs text-slate-500">{formatMarketTransit(item.data.transitMinDays, item.data.transitMaxDays)}</div>
                              </>
                            ) : (
                              <div className="mt-3 text-xs text-slate-500">Belum ada estimasi publik untuk moda ini.</div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                    <span>FX USD/IDR: <strong className="text-slate-700">{usdToIdr.toLocaleString('id-ID')}</strong>{fxDate ? ` · referensi ${fxDate}` : ' · fallback lokal bila API tidak tersedia'}</span>
                    <a
                      href="https://ship.freightos.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-emerald-800 hover:underline"
                    >
                      Market estimate data by Freightos <ExternalLink size={12} />
                    </a>
                  </div>
                </div>

                {/* Mobile comparison summary */}
                <div className="grid grid-cols-1 gap-3 md:hidden">
                  {[
                    {
                      id: 'AIR_EXPRESS' as const,
                      label: 'Air Freight',
                      icon: PlaneTakeoff,
                      totalUsd: comparison.air.totalEstimatedCostUsd,
                      totalIdr: comparison.air.totalEstimatedCostIdr,
                      transit: comparison.air.transitTimeEstimate,
                      chargeable: `${comparison.air.chargeableWeightKg} kg`,
                      inland: comparison.air.inlandTruckingCostUsd,
                      ratio: comparison.air.logisticsCostPercentageOfFob,
                    },
                    {
                      id: 'OCEAN_LCL' as const,
                      label: 'Ocean LCL',
                      icon: Ship,
                      totalUsd: comparison.ocean.totalEstimatedCostUsd,
                      totalIdr: comparison.ocean.totalEstimatedCostIdr,
                      transit: comparison.ocean.transitTimeEstimate,
                      chargeable: `${comparison.ocean.chargeableWeightKg} kg W/M`,
                      inland: comparison.ocean.inlandTruckingCostUsd,
                      ratio: comparison.ocean.logisticsCostPercentageOfFob,
                    }
                  ].map(option => {
                    const Icon = option.icon;
                    const active = params.mode === option.id;
                    return (
                      <div key={option.id} className={`rounded-xl border p-4 ${active ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-200 bg-white'}`}>
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2 font-bold text-slate-950">
                            <Icon size={18} className={option.id === 'AIR_EXPRESS' ? 'text-blue-600' : 'text-emerald-700'} />
                            {option.label}
                          </div>
                          {active && <span className="text-xs font-semibold text-emerald-700">Moda aktif</span>}
                        </div>
                        <div className="mt-4 text-2xl font-extrabold tracking-tight text-slate-950">${option.totalUsd.toFixed(2)} USD</div>
                        <div className="mt-1 text-sm font-medium text-slate-500">≈ Rp {option.totalIdr.toLocaleString('id-ID')}</div>
                        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                          <div><dt className="text-xs text-slate-500">Transit</dt><dd className="mt-0.5 font-semibold text-slate-800">{option.transit}</dd></div>
                          <div><dt className="text-xs text-slate-500">Bobot tagihan</dt><dd className="mt-0.5 font-semibold text-slate-800">{option.chargeable}</dd></div>
                          <div><dt className="text-xs text-slate-500">Inland trucking</dt><dd className="mt-0.5 font-semibold text-slate-800">${option.inland?.toFixed(2)} USD</dd></div>
                          <div><dt className="text-xs text-slate-500">Biaya / FOB</dt><dd className="mt-0.5 font-semibold text-slate-800">{option.ratio}%</dd></div>
                        </dl>
                        <button
                          type="button"
                          onClick={() => setParams({ ...params, mode: option.id })}
                          className={`mt-4 min-h-11 w-full rounded-lg px-3 text-sm font-semibold ${active ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-800'}`}
                        >
                          {active ? 'Moda dipilih' : `Pilih ${option.label}`}
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Desktop comparison matrix */}
                <div className="hidden rounded-xl border border-slate-200 overflow-hidden bg-white md:block">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 text-xs">
                        <th className="py-3 px-4 font-bold">Komponen Logistik</th>
                        <th className={`py-3 px-4 font-bold transition ${params.mode === 'AIR_EXPRESS' ? 'bg-blue-50/80 text-blue-900' : 'text-slate-600'}`}>
                          <div className="flex items-center gap-1.5">
                            <PlaneTakeoff size={14} className="text-blue-600" />
                            <span>Air Freight Express</span>
                          </div>
                        </th>
                        <th className={`py-3 px-4 font-bold transition ${params.mode === 'OCEAN_LCL' ? 'bg-emerald-50/80 text-emerald-900' : 'text-slate-600'}`}>
                          <div className="flex items-center gap-1.5">
                            <Ship size={14} className="text-emerald-600" />
                            <span>Ocean Freight LCL</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      <tr>
                        <td className="py-2.5 px-4 text-slate-600 font-medium">Actual Weight (Bobot Fisik)</td>
                        <td className="py-2.5 px-4 text-slate-800 font-semibold">{comparison.air.actualWeightKg} kg</td>
                        <td className="py-2.5 px-4 text-slate-800 font-semibold">{comparison.ocean.actualWeightKg} kg</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 text-slate-600 font-medium">Volumetric Weight</td>
                        <td className="py-2.5 px-4 text-slate-800 font-semibold">{comparison.air.volumetricWeightKg} kg</td>
                        <td className="py-2.5 px-4 text-slate-400 italic">N/A (Basis Kubikasi CBM)</td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="py-2.5 px-4 text-slate-800 font-bold">Chargeable Weight (Ditagihkan)</td>
                        <td className="py-2.5 px-4 font-bold text-blue-800">{comparison.air.chargeableWeightKg} kg</td>
                        <td className="py-2.5 px-4 font-bold text-emerald-800">{comparison.ocean.chargeableWeightKg} kg (W/M Eq.)</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 text-slate-600 font-medium">Total Volume Kubikasi (CBM)</td>
                        <td className="py-2.5 px-4 text-slate-800">{comparison.air.totalVolumeCbm} CBM</td>
                        <td className="py-2.5 px-4 text-slate-800 font-bold">{comparison.ocean.totalVolumeCbm} CBM</td>
                      </tr>
                      <tr className="bg-amber-50/60">
                        <td className="py-2.5 px-4 text-slate-700 font-bold">
                          Inland Trucking (Tangsel → Priok/CGK)
                          <div className="text-xs text-slate-500 font-medium">Pick-up gudang IKM ke pelabuhan/bandara muat</div>
                        </td>
                        <td className="py-2.5 px-4 text-blue-900 font-semibold">
                          ${comparison.air.inlandTruckingCostUsd?.toFixed(2)} USD
                          <div className="text-xs text-slate-500 font-normal">
                            {comparison.air.inlandTruckDetails} · Rp {comparison.air.inlandTruckingCostIdr?.toLocaleString('id-ID')}
                          </div>
                        </td>
                        <td className="py-2.5 px-4 text-emerald-900 font-semibold">
                          ${comparison.ocean.inlandTruckingCostUsd?.toFixed(2)} USD
                          <div className="text-xs text-slate-500 font-normal">
                            {comparison.ocean.inlandTruckDetails} · Rp {comparison.ocean.inlandTruckingCostIdr?.toLocaleString('id-ID')}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 text-slate-600 font-medium">Transit Time Estimasi</td>
                        <td className="py-2.5 px-4 text-blue-700 font-semibold">{comparison.air.transitTimeEstimate}</td>
                        <td className="py-2.5 px-4 text-emerald-700 font-semibold">{comparison.ocean.transitTimeEstimate}</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 text-slate-600 font-medium">Biaya Efektif per kg</td>
                        <td className="py-2.5 px-4 font-mono text-slate-700 font-medium">${comparison.air.costPerKgUsd}/kg</td>
                        <td className="py-2.5 px-4 font-mono text-slate-700 font-medium">${comparison.ocean.costPerKgUsd}/kg</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 text-slate-600 font-medium">Biaya Efektif per CBM</td>
                        <td className="py-2.5 px-4 font-mono text-slate-700 font-medium">${comparison.air.costPerCbmUsd}/CBM</td>
                        <td className="py-2.5 px-4 font-mono text-slate-700 font-medium">${comparison.ocean.costPerCbmUsd}/CBM</td>
                      </tr>
                      <tr className="bg-slate-50 font-semibold">
                        <td className="py-2.5 px-4 text-slate-800">Logistics % of FOB Value</td>
                        <td className="py-2.5 px-4 text-blue-800 font-bold">
                          {comparison.air.logisticsCostPercentageOfFob}% dari FOB
                        </td>
                        <td className="py-2.5 px-4 text-emerald-800 font-bold">
                          {comparison.ocean.logisticsCostPercentageOfFob}% dari FOB
                        </td>
                      </tr>
                      <tr className="bg-slate-100 font-bold text-xs">
                        <td className="py-3 px-4 text-slate-900">TOTAL ESTIMASI</td>
                        <td className="py-3 px-4 text-blue-900">
                          <div className="text-sm">${comparison.air.totalEstimatedCostUsd.toFixed(2)} USD</div>
                          <div className="text-xs text-slate-500 font-mono font-normal">
                            ≈ Rp {comparison.air.totalEstimatedCostIdr.toLocaleString('id-ID')}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-emerald-900">
                          <div className="text-sm">${comparison.ocean.totalEstimatedCostUsd.toFixed(2)} USD</div>
                          <div className="text-xs text-slate-500 font-mono font-normal">
                            ≈ Rp {comparison.ocean.totalEstimatedCostIdr.toLocaleString('id-ID')}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-slate-600">Aksi Pilihan</td>
                        <td className="py-3 px-4">
                          <button
                            type="button"
                            onClick={() => setParams({ ...params, mode: 'AIR_EXPRESS' })}
                            className={`w-full py-2 px-3 rounded-lg font-bold text-xs transition ${
                              params.mode === 'AIR_EXPRESS'
                                ? 'bg-blue-600 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {params.mode === 'AIR_EXPRESS' ? '✓ Moda Aktif' : 'Pilih Moda Udara'}
                          </button>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            type="button"
                            onClick={() => setParams({ ...params, mode: 'OCEAN_LCL' })}
                            className={`w-full py-2 px-3 rounded-lg font-bold text-xs transition ${
                              params.mode === 'OCEAN_LCL'
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {params.mode === 'OCEAN_LCL' ? '✓ Moda Aktif' : 'Pilih Moda Laut'}
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Required Trade Documents */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-800 block">
                    Checklist Dokumen Kepabeanan Wajib (Disperindag & Bea Cukai):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {result.requiredDocuments.map((doc, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 font-medium">
                        <Check size={14} className="text-emerald-600 shrink-0" />
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Stepper Navigation Buttons */}
            <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((step - 1) as any)}
                  className="min-h-11 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold flex items-center gap-1.5 transition"
                >
                  <ChevronLeft size={16} />
                  Kembali
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep((step + 1) as any)}
                  className="min-h-11 px-5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold flex items-center gap-1.5 transition"
                >
                  Lanjutkan
                  <ChevronRight size={16} />
                </button>
              ) : (
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href="https://veylo.163.61.44.41.sslip.io/app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-11 px-4 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-sm font-semibold flex items-center gap-1.5 transition"
                  >
                    <Video size={15} />
                    Buka Veylo Room (Buat Dokumen Ekspor)
                  </a>
                  <button
                    type="button"
                    onClick={() => setShowExportModal(true)}
                    className="min-h-11 px-4 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold flex items-center gap-1.5 transition"
                  >
                    <Printer size={15} />
                    Cetak Lembar Estimasi
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Col: Summary */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Calculator size={16} className="text-emerald-600" />
                Ringkasan Pengiriman
              </span>
            </div>

            <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex justify-between text-slate-600">
                <span>Rute:</span>
                <span className="inline-flex items-center gap-2 text-slate-900 font-semibold"><CountryFlag code={selectedPort.countryCode} title={selectedPort.country} className="h-4 w-6" />Tangsel (ID) → {selectedPort.country}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Pelabuhan/Bandara:</span>
                <span className="text-slate-900 font-medium text-right truncate max-w-[150px]">{selectedPort.name}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Moda Aktif:</span>
                <span className={`font-bold ${params.mode === 'AIR_EXPRESS' ? 'text-blue-700' : 'text-emerald-700'}`}>
                  {params.mode === 'AIR_EXPRESS' ? '✈️ Air Express' : '🚢 Ocean LCL'}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Incoterms:</span>
                <span className="text-emerald-700 font-bold">{params.incoterm}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Estimasi Waktu:</span>
                <span className="text-slate-900 font-semibold">{result.transitTimeEstimate}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>% dari Nilai FOB:</span>
                <span className="text-amber-800 font-bold">
                  {params.mode === 'AIR_EXPRESS' ? comparison.air.logisticsCostPercentageOfFob : comparison.ocean.logisticsCostPercentageOfFob}%
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
              <div className="text-xs text-slate-600 font-medium">Perkiraan Biaya Pengiriman ({params.mode.replace('_', ' ')})</div>
              <div className="text-3xl font-black text-slate-900">
                ${result.totalEstimatedCostUsd.toFixed(2)} <span className="text-sm font-bold text-slate-500">USD</span>
              </div>
              <div className="text-xs text-emerald-800 font-mono font-bold">
                Rp {result.totalEstimatedCostIdr.toLocaleString('id-ID')}
              </div>
            </div>

            {/* Quick Side-by-side Delta Card */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
              <div className="font-semibold text-slate-800 flex items-center justify-between">
                <span>Delta Moda (Air vs Ocean):</span>
                <span className="text-emerald-700 font-bold">
                  Hemat ${Math.abs(comparison.air.totalEstimatedCostUsd - comparison.ocean.totalEstimatedCostUsd).toFixed(0)} USD via Laut
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <button
                  type="button"
                  onClick={() => setParams({ ...params, mode: 'AIR_EXPRESS' })}
                  aria-pressed={params.mode === 'AIR_EXPRESS'}
                  className={`min-h-20 p-2.5 rounded-lg border transition hover:-translate-y-0.5 hover:shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500 ${params.mode === 'AIR_EXPRESS' ? 'bg-blue-50 border-blue-400 text-blue-900 font-bold' : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300'}`}
                >
                  <div>Air Express</div>
                  <strong className="text-slate-900 text-xs block my-0.5">${comparison.air.totalEstimatedCostUsd.toFixed(0)}</strong>
                  <div>{comparison.air.transitTimeEstimate}</div>
                </button>
                <button
                  type="button"
                  onClick={() => setParams({ ...params, mode: 'OCEAN_LCL' })}
                  aria-pressed={params.mode === 'OCEAN_LCL'}
                  className={`min-h-20 p-2.5 rounded-lg border transition hover:-translate-y-0.5 hover:shadow-sm focus-visible:ring-2 focus-visible:ring-emerald-500 ${params.mode === 'OCEAN_LCL' ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold' : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-300'}`}
                >
                  <div>Ocean LCL</div>
                  <strong className="text-slate-900 text-xs block my-0.5">${comparison.ocean.totalEstimatedCostUsd.toFixed(0)}</strong>
                  <div>{comparison.ocean.transitTimeEstimate}</div>
                </button>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
              <div className="font-semibold text-slate-800 flex items-center gap-1">
                <Info size={14} className="text-blue-600" />
                Catatan Teknis Forwarding:
              </div>
              <p className="text-xs leading-relaxed">
                Chargeable weight: <strong>{result.chargeableWeightKg} kg</strong> (berdasarkan perbandingan berat fisik dan kubikasi W/M). Tarif resmi dikonfirmasi saat booking kargo.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Print / Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={() => setShowExportModal(false)} />
          <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <div>
                <span className="text-xs uppercase font-bold text-emerald-700">Pemerintah Kota Tangerang Selatan — Disperindag</span>
                <h3 className="text-base font-bold text-slate-900">Lembar Estimasi Logistik & Kargo Ekspor TEI 2026</h3>
              </div>
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                ESTIMASI OPERASIONAL
              </span>
            </div>

            {forwardedContext && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800">
                <strong>Pelaku Usaha (IKM):</strong> {forwardedContext.exporterName} • <strong>Komoditas:</strong> {forwardedContext.productName}
              </div>
            )}

            <div className="space-y-2 text-slate-700 leading-relaxed">
              <p><strong>Rute Ekspor:</strong> Tangerang Selatan (ID) → {selectedPort.name} ({selectedPort.country})</p>
              <p><strong>Spesifikasi Koli:</strong> {params.packagesCount} Box | Total Berat Fisik: {comparison.actualWeightKg} kg | Kubikasi: {comparison.totalVolumeCbm} CBM</p>
              <p><strong>Nilai Kargo FOB:</strong> ${params.cargoValueUsd.toLocaleString()} USD</p>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="font-bold text-slate-900">Perbandingan Biaya Pengiriman:</div>
                <div className="flex justify-between text-slate-700">
                  <span>✈️ Air Freight Express ({comparison.air.transitTimeEstimate}):</span>
                  <strong className="text-blue-800">${comparison.air.totalEstimatedCostUsd.toFixed(2)} USD ({comparison.air.logisticsCostPercentageOfFob}% of FOB)</strong>
                </div>
                <div className="flex justify-between text-slate-600 text-xs">
                  <span>↳ Inland Tangsel → CGK:</span>
                  <strong>${comparison.air.inlandTruckingCostUsd?.toFixed(2)} USD · {comparison.air.inlandTruckDetails}</strong>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>🚢 Ocean Freight LCL ({comparison.ocean.transitTimeEstimate}):</span>
                  <strong className="text-emerald-800">${comparison.ocean.totalEstimatedCostUsd.toFixed(2)} USD ({comparison.ocean.logisticsCostPercentageOfFob}% of FOB)</strong>
                </div>
                <div className="flex justify-between text-slate-600 text-xs">
                  <span>↳ Inland Tangsel → Priok:</span>
                  <strong>${comparison.ocean.inlandTruckingCostUsd?.toFixed(2)} USD · {comparison.ocean.inlandTruckDetails}</strong>
                </div>
              </div>

              <p className="text-xs text-slate-500 italic">
                *Dokumen ini merupakan hasil estimasi operasional Tangsel Export AI untuk perencanaan awal pengiriman. Nilai final mengikuti quotation forwarder/carrier dan kondisi aktual saat booking.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  window.print();
                  setShowExportModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition"
              >
                Cetak Lembar Resmi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
