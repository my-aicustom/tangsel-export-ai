import React, { useState } from 'react';
import { X, CheckCircle, Globe, Calendar, User, Phone, Mail, Award, ArrowRight, ShieldCheck, RefreshCw, Layers, Video, FileText } from 'lucide-react';
import { PIPELINE_STAGES, type BuyerLeadItem, type PipelineStage } from '../data/buyerLeadsData';

interface BuyerDetailModalProps {
  lead: BuyerLeadItem | null;
  onClose: () => void;
  onUpdateStatus?: (id: string, newStatus: BuyerLeadItem['status']) => void;
  onUpdatePipelineStage?: (id: string, newStage: PipelineStage) => void;
}

export const BuyerDetailModal: React.FC<BuyerDetailModalProps> = ({ lead, onClose, onUpdateStatus, onUpdatePipelineStage }) => {
  if (!lead) return null;

  const [currentStatus, setCurrentStatus] = useState<BuyerLeadItem['status']>(lead.status);
  const [currentStage, setCurrentStage] = useState<PipelineStage>(lead.pipelineStage);
  const [copied, setCopied] = useState(false);

  const handleStatusChange = (status: BuyerLeadItem['status']) => {
    setCurrentStatus(status);
    if (onUpdateStatus) {
      onUpdateStatus(lead.id, status);
    }
  };

  const handleStageChange = (stage: PipelineStage) => {
    setCurrentStage(stage);
    if (onUpdatePipelineStage) {
      onUpdatePipelineStage(lead.id, stage);
    }
  };

  const handleCopyPitch = () => {
    const pitchText = `[PITCH TEI 2026 DISPERINDAG TANGSEL]
Buyer: ${lead.buyerName} (${lead.company} - ${lead.country})
Komoditas: ${lead.categoryInterest}
IKM Rekomendasi: ${lead.matchedIkm} - ${lead.matchedProduct}
Incoterm: ${lead.incoterm} | Estimasi Volume: ${lead.targetVolume}
PIC Disperindag: ${lead.picAssigned}
Catatan: ${lead.notes}`;

    navigator.clipboard.writeText(pitchText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xl">{lead.flag}</span>
              <span className="text-sm font-bold text-slate-800">{lead.country}</span>
              <span className="text-slate-400 text-xs">•</span>
              <span className={`px-2.5 py-0.5 rounded text-[11px] font-extrabold uppercase tracking-wider border ${
                currentStatus === 'HOT'
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : currentStatus === 'WARM'
                  ? 'bg-amber-100 text-amber-800 border-amber-300'
                  : currentStatus === 'DEAL'
                  ? 'bg-purple-100 text-purple-800 border-purple-300'
                  : 'bg-slate-100 text-slate-800 border-slate-300'
              }`}>
                {currentStatus} LEAD
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">{lead.company}</h2>
            <div className="text-xs text-slate-600 mt-0.5 font-medium">
              Kontak Utama: <strong className="text-slate-900">{lead.buyerName}</strong>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-600 hover:text-slate-900 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Specific Inquiry */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
              Kebutuhan Spesifik Buyer
            </div>
            <p className="text-sm text-slate-800 leading-relaxed font-medium">
              "{lead.specificInquiry}"
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-700 border-t border-slate-200">
              <div>
                <span className="text-slate-500 mr-1.5 font-normal">Target Volume:</span>
                <strong className="text-emerald-700 font-bold">{lead.targetVolume}</strong>
              </div>
              <div>
                <span className="text-slate-500 mr-1.5 font-normal">Incoterms:</span>
                <strong className="text-blue-700 font-bold">{lead.incoterm}</strong>
              </div>
              <div>
                <span className="text-slate-500 mr-1.5 font-normal">Sumber Lead:</span>
                <span className="capitalize font-semibold text-slate-800">{lead.source.replace(/_/g, ' ')}</span>
              </div>
            </div>
          </div>

          {/* AI Matching Engine Breakdown */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                <Award size={16} className="text-emerald-600" />
                Hasil Rekomendasi Matching Engine
              </div>
              <div className="text-sm font-extrabold text-emerald-700">
                Score: {lead.score}%
              </div>
            </div>

            <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-2xs flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-slate-900">{lead.matchedIkm}</div>
                <div className="text-xs text-slate-600 font-medium mt-0.5">{lead.matchedProduct}</div>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                Sangat Cocok
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
              <div className="p-2 rounded bg-white border border-slate-200 shadow-2xs">
                <div className="text-slate-500 font-medium">Kategori / HS (50%)</div>
                <div className="text-emerald-700 font-bold mt-0.5">100% Cocok</div>
              </div>
              <div className="p-2 rounded bg-white border border-slate-200 shadow-2xs">
                <div className="text-slate-500 font-medium">Sertifikasi (30%)</div>
                <div className="text-emerald-700 font-bold mt-0.5">Lengkap (Halal/ISO)</div>
              </div>
              <div className="p-2 rounded bg-white border border-slate-200 shadow-2xs">
                <div className="text-slate-500 font-medium">Kapasitas (20%)</div>
                <div className="text-blue-700 font-bold mt-0.5">Memenuhi Demand</div>
              </div>
            </div>
          </div>

          {/* Internal Notes & PIC */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-600 font-bold uppercase tracking-wider">PIC Disperindag:</span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 font-bold border border-blue-200">
                {lead.picAssigned} (Disperindag Tangsel)
              </span>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed font-medium">
              <strong className="text-amber-800 block mb-1">Catatan Strategis Negosiasi:</strong>
              {lead.notes}
            </div>
          </div>

          {/* Executive Pipeline Stage Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block flex items-center gap-1.5">
                <Layers size={14} className="text-emerald-600" />
                Tahapan Pipeline Ekspor:
              </label>
              <span className="text-xs font-bold text-emerald-700 font-mono">
                Est. Nilai: ${lead.estimatedValueUsd.toLocaleString()} USD
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PIPELINE_STAGES.map((ps) => (
                <button
                  key={ps.id}
                  type="button"
                  onClick={() => handleStageChange(ps.id)}
                  className={`p-2.5 rounded-xl text-left border transition text-xs ${
                    currentStage === ps.id
                      ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 text-emerald-900 font-bold shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <div className="text-[10px] text-slate-400 font-semibold">Tahap {ps.stepNumber}</div>
                  <div className="truncate font-bold mt-0.5 text-slate-800">{ps.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Status Pipeline Updater */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              Prioritas Tindak Lanjut:
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['HOT', 'WARM', 'COLD', 'DEAL'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => handleStatusChange(st)}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition border ${
                    currentStatus === st
                      ? st === 'HOT'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : st === 'WARM'
                        ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                        : st === 'DEAL'
                        ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                        : 'bg-slate-700 text-white border-slate-700 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleCopyPitch}
            className="py-2.5 px-4 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold transition"
          >
            {copied ? '✓ Tersalin ke Clipboard' : 'Salin Lembar Pitching'}
          </button>
          <div className="flex items-center gap-2">
            <a
              href="https://veylo.163.61.44.41.sslip.io/app"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-xs transition flex items-center gap-2"
            >
              <Video size={14} />
              <span>Veylo Trade Room</span>
            </a>
            <a
              href={`https://wa.me/${lead.contactWa.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${lead.buyerName}, this is official representative from Disperindag Tangerang Selatan regarding Trade Expo Indonesia 2026 inquiry for ${lead.categoryInterest}...`)}`}
              target="_blank"
              rel="noreferrer"
              className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition flex items-center gap-2"
            >
              <Phone size={14} />
              WhatsApp Buyer
            </a>
            <button
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl bg-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-300"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
