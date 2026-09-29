import React, { useState } from 'react';
import { X, Send, CheckCircle2, Globe, Calendar, Clock } from 'lucide-react';
import type { InaExportItem } from '../data/inaExportInquiryData';

interface InaExportRadarModalProps {
  inquiry: InaExportItem | null;
  onClose: () => void;
}

export const InaExportRadarModal: React.FC<InaExportRadarModalProps> = ({ inquiry, onClose }) => {
  const [sent, setSent] = useState(false);

  if (!inquiry) return null;

  const handleSendBrief = () => {
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{inquiry.countryCode}</span>
            <div>
              <span className="text-xs font-mono text-emerald-700 font-bold">{inquiry.inaexportId}</span>
              <h3 className="text-sm font-bold text-slate-900">Peluang InaExport Kemendag</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Komoditas Dicari</div>
            <div className="text-base font-bold text-slate-900">{inquiry.produkNama}</div>
            <div className="flex justify-between text-slate-700 pt-2 border-t border-slate-200">
              <span>Negara Buyer: <strong className="text-slate-900">{inquiry.buyerNegara}</strong></span>
              <span>Volume: <strong className="text-emerald-700">{inquiry.qtyOrderRaw}</strong></span>
            </div>
            <div className="flex justify-between text-slate-500 text-xs pt-1">
              <span>Diposting: {inquiry.tanggalPost}</span>
              <span className="text-amber-700 font-bold">{inquiry.masaAktif}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-700" />
                IKM Tangsel yang Cocok
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold border border-emerald-300">
                Match {inquiry.matchScore}%
              </span>
            </div>
            <div className="text-sm font-bold text-slate-900">{inquiry.matchedIkm}</div>
            <p className="text-slate-700 text-xs leading-relaxed">
              Spesifikasi produk dan sertifikasi menunjukkan kecocokan awal. Verifikasi detail inquiry sebelum meneruskan peluang ke IKM binaan.
            </p>
          </div>

          {sent ? (
            <div className="p-3.5 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 font-semibold text-center flex items-center justify-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-700" />
              Brief peluang ekspor berhasil diteruskan ke WhatsApp IKM!
            </div>
          ) : (
            <button
              onClick={handleSendBrief}
              className="w-full min-h-12 px-4 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold transition flex items-center justify-center gap-2"
            >
              <Send size={15} />
              Kirimkan Peluang Ekspor ke IKM via WhatsApp
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
