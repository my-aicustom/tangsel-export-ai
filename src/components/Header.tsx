import React, { useState } from 'react';
import { 
  Bell, 
  Globe2, 
  Clock, 
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
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3.5 transition-all shadow-2xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Title & Context */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wider uppercase bg-emerald-100 text-emerald-900 border border-emerald-300">
              DISPERINDAG TANGSEL
            </span>
            <span className="text-slate-300 text-xs hidden sm:inline">•</span>
            <span className="text-[11px] text-slate-600 flex items-center gap-1 font-semibold">
              <Globe2 size={13} className="text-blue-600" />
              Trade Expo Indonesia 2026 Taskforce
            </span>
            <span className="text-slate-300 text-xs hidden sm:inline">•</span>
            <span className="text-[11px] text-amber-800 font-mono hidden lg:flex items-center gap-1 font-medium bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              <Clock size={11} className="text-amber-600" />
              Live System
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
            {title}
          </h1>
          <p className="text-xs text-slate-600 mt-0.5 max-w-2xl font-medium">
            {subtitle}
          </p>
        </div>

        {/* Actions & Live Indicators */}
        <div className="flex items-center gap-2.5 self-start md:self-auto shrink-0">
          {actions}

          {/* Powered by My AI Custom Badge */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Powered by</span>
            <img 
              src="/branding/my-aicustom-logo.webp" 
              alt="My AI Custom" 
              className="h-5 object-contain" 
            />
          </div>

          {/* Urgent Notification Pill */}
          <div className="relative">
            <button
              onClick={() => setShowAlert(!showAlert)}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition relative"
              title="Notifikasi Masuk"
            >
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500" />
            </button>

            {showAlert && (
              <div className="absolute right-0 mt-2 w-80 p-4 rounded-2xl bg-white border border-slate-300 shadow-xl z-50 text-xs space-y-2.5 animate-fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <AlertCircle size={15} className="text-amber-600" />
                    Notifikasi Prioritas TEI
                  </span>
                  <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">Baru Saja</span>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-slate-800">
                  <div className="font-bold text-emerald-900">Buyer Kamerun (SCD Douala)</div>
                  <p className="text-[11px] text-slate-700 mt-1 leading-relaxed">
                    Meminta pengiriman sampel palm sugar & kopi robusta sebelum 30 September. Gunakan Veylo untuk video room & generate Invoice.
                  </p>
                </div>
                <div className="text-[10px] text-slate-500 text-right font-medium">
                  Disperindag Kota Tangerang Selatan
                </div>
              </div>
            )}
          </div>

          {/* Direct Veylo Link */}
          <a
            href="https://veylo.163.61.44.41.sslip.io/app"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition shadow-xs"
          >
            <Video size={14} />
            <span>Veylo Trade Room</span>
            <ArrowUpRight size={12} />
          </a>

          <a
            href="/kiosk"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-semibold transition"
          >
            <Globe2 size={14} className="text-slate-600" />
            <span>Kiosk Display</span>
            <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </header>
  );
};
