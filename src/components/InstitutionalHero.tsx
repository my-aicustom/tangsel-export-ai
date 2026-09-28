import React from 'react';
import { 
  Globe2, 
  Calendar, 
  ArrowUpRight, 
  Video
} from 'lucide-react';
import { EVENT_CONFIG } from '../data/eventConfig';

export const InstitutionalHero: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm">
      {/* Decorative emerald gradient stripe at top */}
      <div className="h-1.5 w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600" />

      <div className="relative p-5 sm:p-6 lg:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Side: Tangsel Government Identity */}
        <div className="flex-1 space-y-3.5">
          {/* Government Emblem & Institutional Header */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="/branding/logo-tangsel.png" 
                alt="Lambang Resmi Kota Tangerang Selatan" 
                className="w-12 h-12 sm:w-14 sm:h-14 object-contain shrink-0 drop-shadow-xs"
              />
              <div className="h-10 w-[1px] bg-slate-200" />
              <div className="flex flex-col">
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Powered by</span>
                <img 
                  src="/branding/my-aicustom-logo.webp" 
                  alt="Logo My AI Custom" 
                  className="h-7 sm:h-8 object-contain shrink-0"
                />
              </div>
            </div>
            <div className="border-l-2 border-slate-200 pl-3.5 sm:pl-4">
              <div className="text-[11px] sm:text-xs font-bold tracking-widest uppercase text-slate-500">
                Pemerintah Kota Tangerang Selatan
              </div>
              <h2 className="text-sm sm:text-base font-extrabold uppercase tracking-wide text-slate-900 leading-snug mt-0.5">
                Dinas Perindustrian dan Perdagangan
              </h2>
              <div className="text-xs sm:text-sm font-bold text-emerald-700 flex items-center gap-1.5 flex-wrap">
                <span>Gugus Tugas Pameran Internasional TEI 2026</span>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <span className="text-slate-600 text-[11px] font-semibold">In Collaboration with My AI Custom</span>
              </div>
            </div>
          </div>

          {/* Platform Identity */}
          <div className="pt-1">
            <div className="flex flex-wrap items-baseline gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none">
                Tangsel Export AI
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                GovTech Mandiri
              </span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-700 mt-1">
              Command Center Kurasi IKM, Logistik Ekspor, & Business Matching
            </div>
          </div>

          {/* Supporting Copy */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl font-normal">
            Pusat kendali resmi Pemerintah Kota Tangerang Selatan untuk memantau kesiapan ekspor UMKM/IKM, perhitungan kargo internasional, dan negosiasi transaksi buyer asing di Trade Expo Indonesia (ICE BSD).
          </p>

          {/* Event Context Pill */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-medium">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 font-semibold shadow-2xs">
              <Calendar size={13} className="text-amber-600" />
              <span>{EVENT_CONFIG.eventName} ({EVENT_CONFIG.eventDates})</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 shadow-2xs">
              <Globe2 size={13} className="text-blue-600" />
              <span>{EVENT_CONFIG.boothLocation}</span>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-bold border border-emerald-300 text-[10px] shadow-2xs">
              {EVENT_CONFIG.countdownDays}
            </span>
          </div>
        </div>

        {/* Right Side: Quick Action & DHL Block */}
        <div className="lg:w-80 shrink-0 space-y-3">
          {/* Veylo Live Negotiation Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-300 text-slate-800 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                Ruang Negosiasi Buyer
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
            </div>
            <div className="text-xs font-bold text-slate-900">
              Veylo Video Call & PDF Generator
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              Mulai negosiasi langsung dwibahasa & cetak Commercial Invoice / SKA Form D instan.
            </p>
            <a
              href="https://veylo.163.61.44.41.sslip.io/app"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-xs"
            >
              <Video size={13} />
              <span>Buka Ruang Veylo</span>
              <ArrowUpRight size={13} />
            </a>
          </div>

          {/* DHL Proposed Collaboration */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 space-y-2 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-white rounded-lg shadow-2xs border border-slate-200 shrink-0">
                <img 
                  src="/branding/logo-dhl.png" 
                  alt="DHL Logo" 
                  className="h-5 w-auto object-contain max-w-[75px]" 
                />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">
                  Forwarding Kargo DHL
                </div>
                <div className="text-[10px] text-slate-500 truncate">
                  Simulasi Tarif Ekspor Tangsel
                </div>
              </div>
            </div>
            <a
              href="/logistics"
              className="w-full py-1.5 px-3 rounded-lg bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold border border-slate-300 flex items-center justify-center gap-1.5 transition shadow-2xs"
            >
              <span>Kalkulator Kargo DHL</span>
              <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
