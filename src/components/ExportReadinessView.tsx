import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  Plus, 
  Sparkles, 
  Building, 
  MapPin, 
  Award, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink,
  Tag,
  Calculator,
  Video,
  FileText
} from 'lucide-react';
import { IKM_DATABASE, type IkmItem } from '../data/ikmData';
import { IkmDetailDrawer } from './IkmDetailDrawer';
import { NewIkmModal } from './NewIkmModal';

export const ExportReadinessView: React.FC = () => {
  const [ikms, setIkms] = useState<IkmItem[]>(IKM_DATABASE);
  const [selectedIkm, setSelectedIkm] = useState<IkmItem | null>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [gradeFilter, setGradeFilter] = useState<'ALL' | 'A' | 'B' | 'C'>('ALL');
  const [kecamatanFilter, setKecamatanFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIkms = ikms.filter(ikm => {
    const matchGrade = gradeFilter === 'ALL' || ikm.grade === gradeFilter;
    const matchKecamatan = kecamatanFilter === 'ALL' || ikm.kecamatan === kecamatanFilter;
    const matchSearch = ikm.namaUsaha.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        ikm.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        ikm.products.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.hsCode.includes(searchQuery));
    return matchGrade && matchKecamatan && matchSearch;
  });

  const handleAddIkm = (newIkm: IkmItem) => {
    setIkms(prev => [newIkm, ...prev]);
  };

  const handleUpdateIkm = (updated: IkmItem) => {
    setIkms(prev => prev.map(i => i.id === updated.id ? updated : i));
    setSelectedIkm(updated);
  };

  const countA = ikms.filter(i => i.grade === 'A').length;
  const countB = ikms.filter(i => i.grade === 'B').length;
  const countC = ikms.filter(i => i.grade === 'C').length;

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Disperindag Kurasi Context Banner */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-emerald-50 text-emerald-700 shrink-0">
            <ShieldCheck size={28} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
                DISPERINDAG TANGSEL • KURASI TEI 2026
              </span>
              <span className="text-sm text-slate-500">Database Master IKM Binaan</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight mt-1">
              Klasifikasi Kesiapan Ekspor Berbasis Kepatuhan Regulasi Internasional
            </h2>
            <p className="text-sm text-slate-600 mt-1 leading-relaxed">
              Audit mandiri kelayakan sertifikasi (Halal BPJPH, BPOM MD, HACCP, SVLK, EUDR) dan gap dokumen per negara target buyer.
            </p>
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 md:flex md:w-auto md:items-center md:shrink-0">
          <a
            href="https://veylo.163.61.44.41.sslip.io/app"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-11 px-4 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-sm font-semibold transition flex items-center justify-center gap-2"
          >
            <Video size={16} />
            <span>Veylo Trade Room</span>
          </a>
          <button
            onClick={() => setIsNewModalOpen(true)}
            className="min-h-11 px-4 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold transition flex items-center justify-center gap-2"
          >
            <Plus size={16} />
            <span>Tambah IKM Binaan</span>
          </button>
        </div>
      </div>

      {/* Grade Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div 
          onClick={() => setGradeFilter(gradeFilter === 'A' ? 'ALL' : 'A')}
          className={`p-4 sm:p-5 rounded-xl border transition cursor-pointer ${
            gradeFilter === 'A' 
              ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/20' 
              : 'bg-white border-slate-200 hover:border-emerald-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-emerald-600" />
              Grade A: Siap Ekspor
            </span>
            <span className="text-2xl font-extrabold text-slate-900">{countA} IKM</span>
          </div>
          <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
            Legalitas & sertifikasi internasional lengkap. Siap masuk katalog pameran utama & pitching business matching TEI 2026.
          </p>
        </div>

        <div 
          onClick={() => setGradeFilter(gradeFilter === 'B' ? 'ALL' : 'B')}
          className={`p-4 sm:p-5 rounded-xl border transition cursor-pointer ${
            gradeFilter === 'B' 
              ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/20' 
              : 'bg-white border-slate-200 hover:border-blue-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-800 flex items-center gap-1.5">
              <AlertTriangle size={16} className="text-blue-600" />
              Grade B: Potensial (Gap Minor)
            </span>
            <span className="text-2xl font-extrabold text-slate-900">{countB} IKM</span>
          </div>
          <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
            Kualitas & kapasitas siap, perlu penyesuaian dokumen spesifik negara tujuan (contoh: traceability EUDR atau fumigasi).
          </p>
        </div>

        <div 
          onClick={() => setGradeFilter(gradeFilter === 'C' ? 'ALL' : 'C')}
          className={`p-4 sm:p-5 rounded-xl border transition cursor-pointer ${
            gradeFilter === 'C' 
              ? 'bg-amber-50/80 border-amber-500 ring-2 ring-amber-500/20' 
              : 'bg-white border-slate-200 hover:border-amber-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
              <Sparkles size={16} className="text-amber-600" />
              Grade C: Inkubasi Dasar
            </span>
            <span className="text-2xl font-extrabold text-slate-900">{countC} IKM</span>
          </div>
          <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
            Izin edar lokal P-IRT atau kemasan masih perlu perbaikan barrier foil sebelum dipromosikan ke buyer internasional.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama IKM, merk, produk, atau HS Code..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full min-h-11 pl-10 pr-4 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white text-sm transition"
          />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <select
            value={kecamatanFilter}
            onChange={e => setKecamatanFilter(e.target.value)}
            className="min-h-11 w-full sm:w-auto px-3.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium focus:outline-none focus:border-emerald-600 focus:bg-white transition"
          >
            <option value="ALL">Semua Kecamatan Tangsel</option>
            <option value="Ciputat">Ciputat</option>
            <option value="Ciputat Timur">Ciputat Timur</option>
            <option value="Pamulang">Pamulang</option>
            <option value="Pondok Aren">Pondok Aren</option>
            <option value="Serpong">Serpong</option>
            <option value="Serpong Utara">Serpong Utara</option>
            <option value="Setu">Setu</option>
          </select>

          {gradeFilter !== 'ALL' && (
            <button
              onClick={() => setGradeFilter('ALL')}
              className="min-h-11 w-full sm:w-auto px-3 rounded-lg bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200 transition"
            >
              Reset Grade
            </button>
          )}
        </div>
      </div>

      {/* Mobile IKM List */}
      <div className="space-y-3 md:hidden">
        {filteredIkms.map(ikm => {
          const primaryProduct = ikm.products[0];
          return (
            <article key={ikm.id} className="rounded-xl border border-slate-200 bg-white p-4">
              <button
                type="button"
                onClick={() => setSelectedIkm(ikm)}
                className="w-full text-left"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-base font-bold text-slate-950">{ikm.namaUsaha}</div>
                    <div className="mt-0.5 text-sm font-medium text-emerald-700">{ikm.brand}</div>
                  </div>
                  <span className={`shrink-0 rounded-md px-2.5 py-1 text-xs font-semibold ${
                    ikm.grade === 'A'
                      ? 'bg-emerald-50 text-emerald-800'
                      : ikm.grade === 'B'
                      ? 'bg-blue-50 text-blue-800'
                      : 'bg-amber-50 text-amber-800'
                  }`}>
                    Grade {ikm.grade}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                  <div>
                    <div className="text-xs font-medium text-slate-500">Kecamatan</div>
                    <div className="mt-0.5 font-semibold text-slate-800">{ikm.kecamatan}</div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-500">Kapasitas / bulan</div>
                    <div className="mt-0.5 font-semibold text-slate-800">{primaryProduct?.capacityPerMonth}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-xs font-medium text-slate-500">Produk utama</div>
                    <div className="mt-0.5 font-semibold text-slate-900">{primaryProduct?.name}</div>
                    <div className="mt-0.5 font-mono text-xs text-slate-500">HS {primaryProduct?.hsCode}</div>
                  </div>
                </div>
              </button>

              <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                {primaryProduct && (
                  <a
                    href={`/logistics?ikmId=${encodeURIComponent(ikm.id)}&productId=${encodeURIComponent(primaryProduct.id)}&p=${primaryProduct.dimensionsCm.p}&l=${primaryProduct.dimensionsCm.l}&t=${primaryProduct.dimensionsCm.t}&w=${primaryProduct.dimensionsCm.weightKg}&fob=${primaryProduct.fobPriceUsd}&productName=${encodeURIComponent(primaryProduct.name)}&exporterName=${encodeURIComponent(ikm.namaUsaha)}`}
                    className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-slate-100 px-3 text-sm font-semibold text-slate-800"
                  >
                    <Calculator size={16} /> Simulasi
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedIkm(ikm)}
                  className="inline-flex min-h-11 flex-1 items-center justify-center rounded-lg bg-emerald-700 px-3 text-sm font-semibold text-white"
                >
                  Lihat Detail
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Desktop IKM Table */}
      <div className="hidden rounded-xl bg-white border border-slate-200 overflow-hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-xs">
              <tr>
                <th className="py-4 px-5">Nama IKM & Brand</th>
                <th className="py-4 px-4">Kecamatan</th>
                <th className="py-4 px-4">Grade Kesiapan</th>
                <th className="py-4 px-5">Produk Utama & HS Code</th>
                <th className="py-4 px-4">Sertifikasi Kunci</th>
                <th className="py-4 px-4">Kapasitas / Bulan</th>
                <th className="py-4 px-5 text-right">Aksi Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredIkms.map(ikm => {
                const primaryProduct = ikm.products[0];
                return (
                  <tr
                    key={ikm.id}
                    onClick={() => setSelectedIkm(ikm)}
                    className="hover:bg-slate-50/80 cursor-pointer transition group"
                  >
                    <td className="py-4 px-5">
                      <div className="font-bold text-slate-900 group-hover:text-emerald-700 transition">
                        {ikm.namaUsaha}
                      </div>
                      <div className="text-xs text-emerald-600 font-semibold">{ikm.brand}</div>
                    </td>
                    <td className="py-4 px-4 text-slate-700">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-slate-400 shrink-0" />
                        <span className="font-medium">{ikm.kecamatan}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold border inline-block ${
                        ikm.grade === 'A'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : ikm.grade === 'B'
                          ? 'bg-blue-50 text-blue-800 border-blue-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}>
                        Grade {ikm.grade}
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <div className="font-semibold text-slate-900">{primaryProduct?.name}</div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">HS: {primaryProduct?.hsCode}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {primaryProduct?.certifications.slice(0, 2).map((c, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-xs font-medium text-slate-700 border border-slate-200">
                            {c}
                          </span>
                        ))}
                        {(primaryProduct?.certifications.length || 0) > 2 && (
                          <span className="text-xs text-slate-400 self-center font-bold">
                            +{primaryProduct!.certifications.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-800 font-medium">
                      {primaryProduct?.capacityPerMonth}
                    </td>
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {primaryProduct && (
                          <a
                            href={`/logistics?ikmId=${encodeURIComponent(ikm.id)}&productId=${encodeURIComponent(primaryProduct.id)}&p=${primaryProduct.dimensionsCm.p}&l=${primaryProduct.dimensionsCm.l}&t=${primaryProduct.dimensionsCm.t}&w=${primaryProduct.dimensionsCm.weightKg}&fob=${primaryProduct.fobPriceUsd}&productName=${encodeURIComponent(primaryProduct.name)}&exporterName=${encodeURIComponent(ikm.namaUsaha)}`}
                            onClick={(e) => e.stopPropagation()}
                            title="Simulasi Biaya Kargo"
                            className="p-2 rounded-xl bg-slate-100 hover:bg-emerald-600 text-slate-600 hover:text-white border border-slate-200 transition shadow-2xs"
                          >
                            <Calculator size={14} />
                          </a>
                        )}
                        <a
                          href="https://veylo.163.61.44.41.sslip.io/app"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          title="Buka Veylo Trade Room (Video & Dokumen Ekspor)"
                          className="p-2 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white border border-blue-200 transition shadow-2xs"
                        >
                          <Video size={14} />
                        </a>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedIkm(ikm);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white text-xs font-bold border border-emerald-200 transition shadow-2xs"
                        >
                          Detail Audit →
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredIkms.length === 0 && (
          <div className="text-center py-14 text-slate-500 text-xs">
            Tidak ada IKM yang cocok dengan filter yang dipilih.
          </div>
        )}
      </div>

      {/* Drawer & Modal */}
      <IkmDetailDrawer
        ikm={selectedIkm}
        onClose={() => setSelectedIkm(null)}
        onUpdateIkm={handleUpdateIkm}
      />

      <NewIkmModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onAddIkm={handleAddIkm}
      />
    </div>
  );
};
