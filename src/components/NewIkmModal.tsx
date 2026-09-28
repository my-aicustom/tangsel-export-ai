import React, { useState } from 'react';
import { X, Plus, CheckCircle2, ShieldCheck, Building, Sparkles } from 'lucide-react';
import type { IkmItem } from '../data/ikmData';

interface NewIkmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddIkm: (newIkm: IkmItem) => void;
}

export const NewIkmModal: React.FC<NewIkmModalProps> = ({ isOpen, onClose, onAddIkm }) => {
  if (!isOpen) return null;

  const [namaUsaha, setNamaUsaha] = useState('');
  const [brand, setBrand] = useState('');
  const [kecamatan, setKecamatan] = useState<IkmItem['kecamatan']>('Serpong');
  const [kontakNama, setKontakNama] = useState('');
  const [kontakWa, setKontakWa] = useState('');
  const [email, setEmail] = useState('');
  const [nib, setNib] = useState('');
  const [namaProduk, setNamaProduk] = useState('');
  const [category, setCategory] = useState<'food_beverage' | 'fashion_kerajinan' | 'furniture_dekor' | 'manufaktur'>('food_beverage');
  const [hsCode, setHsCode] = useState('');
  const [fobPriceUsd, setFobPriceUsd] = useState('5.00');
  const [selectedCerts, setSelectedCerts] = useState<string[]>(['Halal BPJPH']);
  const [summary, setSummary] = useState('');

  const availableCerts = ['Halal BPJPH', 'BPOM MD', 'HACCP', 'ISO 22000', 'USDA Organic', 'SNI', 'SVLK V-Legal'];

  const toggleCert = (cert: string) => {
    if (selectedCerts.includes(cert)) {
      setSelectedCerts(selectedCerts.filter(c => c !== cert));
    } else {
      setSelectedCerts([...selectedCerts, cert]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaUsaha.trim() || !namaProduk.trim()) return;

    // Determine preliminary grade
    let grade: 'A' | 'B' | 'C' = 'C';
    if (selectedCerts.length >= 3 && (selectedCerts.includes('HACCP') || selectedCerts.includes('ISO 22000') || selectedCerts.includes('SVLK V-Legal'))) {
      grade = 'A';
    } else if (selectedCerts.length >= 1) {
      grade = 'B';
    }

    const newIkm: IkmItem = {
      id: `ikm-${Date.now()}`,
      namaUsaha,
      brand: brand || namaUsaha,
      kecamatan,
      alamat: `Jl. Raya ${kecamatan}, Tangerang Selatan`,
      kontakNama,
      kontakWa,
      email: email || 'info@ikm-tangsel.id',
      grade,
      statusVerifikasi: 'belum',
      nib: nib || '0000000000000',
      summary: summary || 'IKM binaan baru terdaftar mandiri pada platform Tangsel Export AI.',
      gapAnalysis: [
        'Data baru didaftarkan secara online.',
        'Menunggu verifikasi fisik sampel produk dan kelengkapan dokumen legalitas oleh Tim Kurator Disperindag Tangsel.'
      ],
      products: [
        {
          id: `prod-${Date.now()}`,
          name: namaProduk,
          category,
          hsCode: hsCode || '0000.00.00',
          capacityPerMonth: '1.000 Pcs',
          moq: '100 Pcs',
          fobPriceUsd: parseFloat(fobPriceUsd) || 5.0,
          certifications: selectedCerts,
          dimensionsCm: { p: 20, l: 15, t: 8, weightKg: 0.5 },
          description: summary || 'Produk unggulan hasil produksi IKM Tangerang Selatan.',
          photoUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80'
        }
      ]
    };

    onAddIkm(newIkm);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
              Registrasi Mandiri & Kurasi Baru
            </span>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Tambah IKM Binaan Ekspor Baru
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-600 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-700 font-semibold block mb-1">Nama Perusahaan / IKM *</label>
              <input
                type="text"
                required
                placeholder="Contoh: CV Banten Kopi Makmur"
                value={namaUsaha}
                onChange={e => setNamaUsaha(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white text-xs font-medium"
              />
            </div>

            <div>
              <label className="text-slate-700 font-semibold block mb-1">Nama Brand / Merk Dagang</label>
              <input
                type="text"
                placeholder="Contoh: Ciputat Robusta Specialty"
                value={brand}
                onChange={e => setBrand(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white text-xs font-medium"
              />
            </div>

            <div>
              <label className="text-slate-700 font-semibold block mb-1">Kecamatan Domisili Tangsel</label>
              <select
                value={kecamatan}
                onChange={e => setKecamatan(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium focus:outline-none focus:border-emerald-600 focus:bg-white"
              >
                <option value="Ciputat">Ciputat</option>
                <option value="Ciputat Timur">Ciputat Timur</option>
                <option value="Pamulang">Pamulang</option>
                <option value="Pondok Aren">Pondok Aren</option>
                <option value="Serpong">Serpong</option>
                <option value="Serpong Utara">Serpong Utara</option>
                <option value="Setu">Setu</option>
              </select>
            </div>

            <div>
              <label className="text-slate-700 font-semibold block mb-1">Nomor Induk Berusaha (NIB)</label>
              <input
                type="text"
                placeholder="13 Digit Nomor Induk Berusaha"
                value={nib}
                onChange={e => setNib(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white text-xs font-medium font-mono"
              />
            </div>

            <div>
              <label className="text-slate-700 font-semibold block mb-1">Nama PIC Kontak</label>
              <input
                type="text"
                placeholder="Nama Pemilik / Manajer Ekspor"
                value={kontakNama}
                onChange={e => setKontakNama(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white text-xs font-medium"
              />
            </div>

            <div>
              <label className="text-slate-700 font-semibold block mb-1">Nomor WhatsApp Aktif</label>
              <input
                type="text"
                placeholder="08xxxxxxxxxx"
                value={kontakWa}
                onChange={e => setKontakWa(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white text-xs font-medium font-mono"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Spesifikasi Produk Unggulan
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="text-slate-700 font-semibold block mb-1">Nama Produk Ekspor *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Roasted Bean Arabica 250g Valve Pouch"
                  value={namaProduk}
                  onChange={e => setNamaProduk(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white text-xs font-medium"
                />
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Estimasi HS Code</label>
                <input
                  type="text"
                  placeholder="0901.21.00"
                  value={hsCode}
                  onChange={e => setHsCode(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white text-xs font-mono font-medium"
                />
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Kategori Produk</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium focus:outline-none focus:border-emerald-600 focus:bg-white"
                >
                  <option value="food_beverage">Food & Beverage</option>
                  <option value="fashion_kerajinan">Fashion & Kerajinan</option>
                  <option value="furniture_dekor">Furniture & Home Decor</option>
                  <option value="manufaktur">Manufaktur Ringan</option>
                </select>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Estimasi Harga FOB (USD)</label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="5.00"
                  value={fobPriceUsd}
                  onChange={e => setFobPriceUsd(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white text-xs font-medium"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-slate-700 font-semibold block mb-1.5">
              Sertifikasi yang Sudah Dimiliki:
            </label>
            <div className="flex flex-wrap gap-2">
              {availableCerts.map(cert => {
                const isSelected = selectedCerts.includes(cert);
                return (
                  <button
                    key={cert}
                    type="button"
                    onClick={() => toggleCert(cert)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-2xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '} {cert}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-slate-700 font-semibold block mb-1">
              Ringkasan Kapasitas & Nilai Jual Produk
            </label>
            <textarea
              rows={3}
              placeholder="Jelaskan keunggulan produk, kapasitas bulanan, dan sertifikasi khusus..."
              value={summary}
              onChange={e => setSummary(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white text-xs font-medium resize-none"
            />
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 leading-relaxed flex items-center gap-2">
            <Sparkles size={16} className="text-emerald-700 shrink-0" />
            <span>
              Sistem AI Kurasi Disperindag akan otomatis menghitung estimasi grade kesiapan (Grade A/B/C) berdasarkan kelengkapan legalitas dan sertifikasi yang Anda masukkan.
            </span>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs transition flex items-center gap-2"
            >
              <Plus size={15} />
              Simpan IKM Baru
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
