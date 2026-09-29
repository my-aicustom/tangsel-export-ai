import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Building, 
  Phone, 
  Mail, 
  MapPin, 
  Tag, 
  ExternalLink, 
  Box,
  ShieldCheck, 
  Edit3, 
  Calculator, 
  ArrowRight,
  Video,
  FileText
} from 'lucide-react';
import type { IkmItem } from '../data/ikmData';
import { getVeyloRoomUrl } from '../lib/veyloBridge';

interface IkmDetailDrawerProps {
  ikm: IkmItem | null;
  onClose: () => void;
  onUpdateIkm?: (updated: IkmItem) => void;
}

export const IkmDetailDrawer: React.FC<IkmDetailDrawerProps> = ({ ikm, onClose, onUpdateIkm }) => {
  const [runningAudit, setRunningAudit] = useState(false);
  const [auditResult, setAuditResult] = useState<string | null>(null);

  if (!ikm) return null;

  const primaryProduct = ikm.products[0];
  const veyloTradeRoomUrl = getVeyloRoomUrl({
    ikmId: ikm.id,
    ikmName: ikm.namaUsaha,
    productId: primaryProduct?.id,
    productName: primaryProduct?.name,
    fobPriceUsd: primaryProduct?.fobPriceUsd,
    hsCode: primaryProduct?.hsCode,
  });

  const handleRunAudit = () => {
    setRunningAudit(true);
    setAuditResult(null);
    setTimeout(() => {
      setRunningAudit(false);
      if (ikm.grade === 'A') {
        setAuditResult('Komoditas memenuhi persyaratan dasar pada checklist kesiapan saat ini. Dokumen legalitas dan sertifikasi utama tercatat siap untuk proses kurasi TEI 2026.');
      } else if (ikm.grade === 'B') {
        setAuditResult('Siap bersyarat. Kapasitas mencukupi, tetapi dokumen kepatuhan negara tujuan masih perlu dilengkapi, misalnya EUDR, V-Legal, atau phytosanitary sesuai komoditas.');
      } else {
        setAuditResult('Belum siap untuk ekspor langsung. Prioritaskan pendampingan pada kemasan, izin edar, dan dokumen dasar sebelum masuk tahap business matching.');
      }
    }, 1200);
  };

  const handleGradeChange = (newGrade: 'A' | 'B' | 'C') => {
    if (onUpdateIkm) {
      onUpdateIkm({ ...ikm, grade: newGrade });
    }
  };

  const handleVerificationChange = (newStatus: 'belum' | 'terverifikasi' | 'siap_ekspor') => {
    if (onUpdateIkm) {
      onUpdateIkm({ ...ikm, statusVerifikasi: newStatus });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-white border-l border-slate-200 shadow-xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                  ikm.grade === 'A' 
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                    : ikm.grade === 'B'
                    ? 'bg-blue-100 text-blue-800 border-blue-300'
                    : 'bg-amber-100 text-amber-800 border-amber-300'
                }`}>
                  Grade {ikm.grade} : {ikm.grade === 'A' ? 'Siap Ekspor' : ikm.grade === 'B' ? 'Potensial (Gap Minor)' : 'Perlu Inkubasi'}
                </span>
                <span className="text-slate-400 text-xs">•</span>
                <span className="text-xs text-slate-500 font-mono">NIB: {ikm.nib}</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">{ikm.namaUsaha}</h2>
              <div className="text-xs text-emerald-700 font-semibold">{ikm.brand}</div>
            </div>
            <button
              onClick={onClose}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Quick Curator Adjustment Bar */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Edit3 size={13} className="text-emerald-600" />
                Penetapan Kurator Disperindag Tangsel:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-600 font-semibold block mb-1 text-xs">Klasifikasi Kesiapan:</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['A', 'B', 'C'] as const).map(g => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => handleGradeChange(g)}
                        className={`py-1.5 rounded-lg font-bold border transition ${
                          ikm.grade === g
                            ? g === 'A'
                              ? 'bg-emerald-600 text-white border-emerald-600 '
                              : g === 'B'
                              ? 'bg-blue-600 text-white border-blue-600 '
                              : 'bg-amber-600 text-white border-amber-600 '
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        Grade {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-slate-600 font-semibold block mb-1 text-xs">Status Verifikasi:</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'belum', label: 'Belum' },
                      { id: 'terverifikasi', label: 'Valid' },
                      { id: 'siap_ekspor', label: 'Ekspor' },
                    ].map(st => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => handleVerificationChange(st.id as any)}
                        className={`py-1.5 rounded-lg font-bold border text-xs transition ${
                          ikm.statusVerifikasi === st.id
                            ? 'bg-emerald-600 text-white border-emerald-600 '
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact & Location Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <MapPin size={15} className="text-emerald-600 shrink-0" />
                <span className="font-medium">Kec. {ikm.kecamatan}, Kota Tangsel</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Phone size={15} className="text-blue-600 shrink-0" />
                <span className="font-medium">PIC: {ikm.kontakNama} ({ikm.kontakWa})</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 sm:col-span-2">
                <Mail size={15} className="text-purple-600 shrink-0" />
                <span className="font-medium">{ikm.email}</span>
              </div>
            </div>

            {/* Business Summary */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Profil & Ringkasan Usaha
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed p-4 rounded-xl bg-slate-50 border border-slate-200">
                {ikm.summary}
              </p>
            </div>

            {/* Products Offered */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Produk Unggulan untuk TEI 2026
              </h3>
              <div className="space-y-3">
                {ikm.products.map((prod) => (
                  <div key={prod.id} className="p-4 rounded-xl bg-white border border-slate-200  space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{prod.name}</h4>
                        <div className="text-xs font-mono text-emerald-700 font-semibold mt-0.5">
                          HS Code: {prod.hsCode}
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <div className="text-base font-extrabold text-emerald-700">
                          ${prod.fobPriceUsd.toFixed(2)} <span className="text-xs font-normal text-slate-500">FOB</span>
                        </div>
                        <div className="text-xs text-slate-500 font-medium">MOQ: {prod.moq}</div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {prod.description}
                    </p>

                    {/* Key Specs */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <div>
                        <span className="text-slate-500 block">Kapasitas:</span>
                        <span className="font-bold text-slate-800">{prod.capacityPerMonth}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Berat Bersih:</span>
                        <span className="font-bold text-slate-800">{prod.dimensionsCm.weightKg} kg</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Dimensi Koli:</span>
                        <span className="font-bold text-slate-800">{prod.dimensionsCm.p}x{prod.dimensionsCm.l}x{prod.dimensionsCm.t} cm</span>
                      </div>
                    </div>

                    {/* Certification Badges */}
                    <div>
                      <span className="text-xs text-slate-600 block mb-1.5 font-bold">Sertifikasi & Kepatuhan:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {prod.certifications.map((cert, cIdx) => (
                          <span key={cIdx} className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                            ✓ {cert}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Forward to Logistics Simulation Action */}
                    <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                      <a
                        href={`/logistics?ikmId=${encodeURIComponent(ikm.id)}&productId=${encodeURIComponent(prod.id)}&p=${prod.dimensionsCm.p}&l=${prod.dimensionsCm.l}&t=${prod.dimensionsCm.t}&w=${prod.dimensionsCm.weightKg}&fob=${prod.fobPriceUsd}&productName=${encodeURIComponent(prod.name)}&exporterName=${encodeURIComponent(ikm.namaUsaha)}`}
                        className="flex-1 min-h-11 px-3 rounded-lg bg-slate-50 hover:bg-emerald-700 text-slate-700 hover:text-white text-sm font-semibold border border-slate-200 hover:border-emerald-700 flex items-center justify-center gap-2 transition group"
                      >
                        <Calculator size={14} className="text-emerald-600 group-hover:text-white transition" />
                        <span>Simulasi Kargo Logistik</span>
                        <ArrowRight size={13} className="group-hover:translate-x-0.5 transition" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gap Analysis & Disperindag Audit */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Catatan Kesiapan & Audit Kurator
                </h3>
                <button
                  onClick={handleRunAudit}
                  disabled={runningAudit}
                  className="inline-flex min-h-10 items-center gap-1.5 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold transition disabled:opacity-50"
                >
                  <ShieldCheck size={13} />
                  {runningAudit ? 'Memeriksa...' : 'Evaluasi Ulang'}
                </button>
              </div>

              {auditResult && (
                <div className="mb-3 p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 font-medium leading-relaxed">
                  {auditResult}
                </div>
              )}

              <div className="space-y-2">
                {ikm.gapAnalysis.map((gap, gIdx) => (
                  <div key={gIdx} className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
                    <AlertTriangle size={15} className="text-amber-600 shrink-0 mt-0.5" />
                    <span>{gap}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Drawer Footer Actions */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
            <a
              href={veyloTradeRoomUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-11 px-4 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-sm font-semibold transition flex items-center justify-center gap-2"
            >
              <Video size={14} />
              <span>Veylo Trade Room</span>
            </a>
            <a
              href={`https://wa.me/${ikm.kontakWa.replace(/^0/, '62')}?text=${encodeURIComponent(`Halo ${ikm.namaUsaha}, kami dari Tim Business Matching TEI 2026 Disperindag Tangsel...`)}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 min-h-11 px-4 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold text-center transition flex items-center justify-center gap-2"
            >
              <Phone size={14} />
              Hubungi via WhatsApp
            </a>
            <button
              onClick={onClose}
              className="min-h-11 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
