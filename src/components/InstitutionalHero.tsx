import React from 'react';
import {
  Globe2,
  Calendar,
  ArrowUpRight,
  Video,
  PlaneTakeoff
} from 'lucide-react';
import { EVENT_CONFIG } from '../data/eventConfig';
import { VEYLO_BASE_URL } from '../lib/veyloBridge';

export const InstitutionalHero: React.FC = () => {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="h-1 w-full bg-emerald-700" />
      <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1fr_18rem] lg:items-center lg:p-7">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3.5">
            <div className="flex items-center gap-3">
              <img
                src="/branding/logo-tangsel.png"
                alt="Lambang Kota Tangerang Selatan"
                className="h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14"
              />
              <div className="h-9 w-px bg-slate-200 hidden sm:block" />
              <div className="flex flex-col">
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Powered by</span>
                <img
                  src="/branding/my-aicustom-logo.webp"
                  alt="Logo My AI Custom"
                  className="h-6 sm:h-7 w-auto object-contain shrink-0"
                />
              </div>
            </div>
            <div className="min-w-0 sm:border-l sm:border-slate-200 sm:pl-3.5">
              <div className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                Pemerintah Kota Tangerang Selatan
              </div>
              <div className="mt-0.5 text-sm font-bold text-slate-950 sm:text-base">
                Dinas Perindustrian dan Perdagangan
              </div>
              <div className="mt-0.5 text-sm font-medium text-emerald-800">
                Gugus Tugas Trade Expo Indonesia 2026
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
              Tangsel Export AI
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
              Pusat kendali kesiapan ekspor IKM, tindak lanjut buyer, simulasi logistik, dan dukungan business matching untuk pelaksanaan TEI 2026.
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2">
              <Calendar size={16} className="text-emerald-700" />
              {EVENT_CONFIG.eventName} · {EVENT_CONFIG.eventDates}
            </span>
            <span className="inline-flex items-center gap-2">
              <Globe2 size={16} className="text-emerald-700" />
              {EVENT_CONFIG.boothLocation}
            </span>
            <span className="font-semibold text-slate-800">{EVENT_CONFIG.countdownDays}</span>
          </div>
        </div>

        <div className="space-y-2">
          <a
            href={VEYLO_BASE_URL}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-12 items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-900 transition hover:border-emerald-300 hover:bg-emerald-50"
          >
            <span className="flex items-center gap-2">
              <Video size={18} className="text-emerald-700" />
              Ruang negosiasi buyer
            </span>
            <ArrowUpRight size={15} className="text-slate-400" />
          </a>
          <a
            href="/logistics"
            className="flex min-h-12 items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
          >
            <span className="flex items-center gap-2.5">
              <img
                src="/branding/logo-dhl.png"
                alt="DHL Logo"
                className="h-4 w-auto object-contain shrink-0 max-w-[65px]"
              />
              <span>Simulasi kargo DHL Express</span>
            </span>
            <ArrowUpRight size={15} className="text-slate-400" />
          </a>
          <p className="px-1 pt-1 text-xs leading-5 text-slate-500">
            Estimasi logistik bersifat indikatif. Status kerja sama mitra mengikuti proses resmi Disperindag.
          </p>
        </div>
      </div>
    </section>
  );
};
