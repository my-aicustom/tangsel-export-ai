import React, { useState } from 'react';
import {
  Bell,
  Globe2,
  ArrowUpRight,
  Video,
  AlertCircle
} from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle: string;
  actions?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, actions }) => {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <header className="relative lg:sticky lg:top-0 z-30 bg-white/95 lg:backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="text-emerald-800">Disperindag Tangerang Selatan</span>
            <span aria-hidden="true">•</span>
            <span className="inline-flex items-center gap-1">
              <Globe2 size={14} aria-hidden="true" />
              TEI 2026
            </span>
          </div>
          <h1 className="mt-1 text-xl font-extrabold tracking-tight text-slate-950 sm:text-2xl">
            {title}
          </h1>
          <p className="mt-1 max-w-3xl text-sm leading-5 text-slate-600">
            {subtitle}
          </p>
        </div>

        <div className="flex w-full items-center gap-2.5 md:w-auto md:justify-end">
          {actions}

          {/* Powered by My AI Custom Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Powered by</span>
            <img 
              src="/branding/my-aicustom-logo.webp" 
              alt="My AI Custom" 
              className="h-5 w-auto object-contain" 
            />
          </div>

          <div className="relative ml-auto md:ml-0">
            <button
              type="button"
              onClick={() => setShowAlert(!showAlert)}
              className="tap-target relative inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
              aria-label="Buka notifikasi prioritas"
              aria-expanded={showAlert}
            >
              <Bell size={18} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-amber-500" />
            </button>

            {showAlert && (
              <div className="absolute right-0 z-50 mt-2 w-[min(22rem,calc(100vw-2rem))] rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-xl">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3 font-bold text-slate-900">
                  <AlertCircle size={16} className="text-amber-600" />
                  Notifikasi prioritas TEI
                </div>
                <div className="mt-3 rounded-lg bg-amber-50 p-3 text-slate-800">
                  <div className="font-semibold">Buyer Kamerun (SCD Douala)</div>
                  <p className="mt-1 text-sm leading-5 text-slate-600">
                    Meminta pengiriman sampel palm sugar dan kopi robusta sebelum 30 September. Siapkan tindak lanjut dan ruang negosiasi bila diperlukan.
                  </p>
                </div>
              </div>
            )}
          </div>

          <a
            href="https://veylo.163.61.44.41.sslip.io/app"
            target="_blank"
            rel="noreferrer"
            className="tap-target inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-3.5 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
          >
            <Video size={16} />
            <span className="hidden sm:inline">Ruang Negosiasi</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  );
};
