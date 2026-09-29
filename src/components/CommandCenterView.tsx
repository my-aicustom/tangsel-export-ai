import React, { useState } from 'react';
import { 
  Users, 
  Flame, 
  TrendingUp, 
  Award, 
  Search, 
  Globe2, 
  Sparkles,
  ArrowUpRight,
  Video
} from 'lucide-react';
import { 
  BUYER_LEADS, 
  PIPELINE_STAGES, 
  type BuyerLeadItem, 
  type PipelineStage 
} from '../data/buyerLeadsData';
import { INAEXPORT_INQUIRIES, type InaExportItem } from '../data/inaExportInquiryData';
import { LeadStatusChart, ReadinessDistributionChart, InquiriesTrendChart } from './Charts';
import { BuyerDetailModal } from './BuyerDetailModal';
import { InaExportRadarModal } from './InaExportRadarModal';
import { InstitutionalHero } from './InstitutionalHero';

export const CommandCenterView: React.FC = () => {
  const [leads, setLeads] = useState<BuyerLeadItem[]>(BUYER_LEADS);
  const [selectedLead, setSelectedLead] = useState<BuyerLeadItem | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<InaExportItem | null>(null);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'HOT' | 'WARM' | 'COLD' | 'DEAL'>('ALL');
  const [stageFilter, setStageFilter] = useState<'ALL' | PipelineStage>('ALL');
  const [countryFilter, setCountryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLeads = leads.filter(lead => {
    const matchStage = stageFilter === 'ALL' || lead.pipelineStage === stageFilter;
    const matchStatus = statusFilter === 'ALL' || lead.status === statusFilter;
    const matchCountry = countryFilter === 'ALL' || lead.country === countryFilter;
    const matchSearch = lead.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        lead.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        lead.categoryInterest.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStage && matchStatus && matchCountry && matchSearch;
  });

  const handleUpdateStatus = (id: string, newStatus: BuyerLeadItem['status']) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const handleUpdatePipelineStage = (id: string, newStage: PipelineStage) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, pipelineStage: newStage } : l));
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead(prev => prev ? { ...prev, pipelineStage: newStage } : null);
    }
  };

  const hotCount = leads.filter(l => l.status === 'HOT').length;
  const totalPipelineUsd = leads.reduce((acc, l) => acc + l.estimatedValueUsd, 0);

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Institutional Hero: Pemerintah Kota Tangerang Selatan & Disperindag with DHL Collaboration Block */}
      <InstitutionalHero />

      {/* Operational Priority Alert (High Contrast Light Mode) */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-amber-100 text-amber-800 shrink-0">
            <Sparkles size={20} />
          </div>
          <div className="text-sm text-slate-800 leading-relaxed">
            <span className="mr-2 inline-block text-xs font-bold uppercase tracking-wide text-amber-800">
              PRIORITAS LAPANGAN
            </span>
            <strong className="text-slate-950 font-bold">Delegasi Buyer Kamerun (Société Camerounaise de Distribution):</strong> Permintaan jadwal business matching resmi dan kuota awal palm sugar. Penyiapan pitch sheet, sampel fisik, dan room negosiasi online via Veylo.
          </div>
        </div>
        <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
          <a
            href="https://veylo.163.61.44.41.sslip.io/app"
            target="_blank"
            rel="noreferrer"
            className="min-h-11 px-3.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold transition flex items-center gap-1.5"
          >
            <Video size={14} />
            <span>Ruang Negosiasi Veylo</span>
          </a>
          <a
            href="/readiness"
            className="min-h-11 px-3.5 rounded-lg bg-white hover:bg-slate-50 text-slate-800 text-sm font-semibold border border-slate-200 transition"
          >
            Matrix IKM
          </a>
        </div>
      </div>

      {/* Top 4 Executive KPI Cards (Light Mode / Ramah Mata) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl bg-white border border-slate-200 p-5 transition hover:border-slate-300">
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Leads Buyer</span>
            <Users size={20} className="text-blue-600" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 tracking-tight">{leads.length}</span>
            <span className="text-xs text-emerald-700 font-semibold">+4 Pekan Ini</span>
          </div>
          <div className="text-xs text-slate-600 mt-2 flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            <strong className="text-slate-800">{hotCount}</strong> Berkategori HOT (&gt;80% Match)
          </div>
        </div>

        <div className="rounded-xl bg-white border border-slate-200 p-5 transition hover:border-slate-300">
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-xs font-semibold uppercase tracking-wider">IKM Terverifikasi</span>
            <Award size={20} className="text-emerald-600" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 tracking-tight">8 <span className="text-base font-semibold text-slate-500">IKM</span></span>
            <span className="text-xs text-emerald-700 font-semibold">3 Grade A Siap</span>
          </div>
          <div className="text-xs text-slate-600 mt-2 flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            4 Grade B (Perlu Dokumen Minor)
          </div>
        </div>

        <div className="rounded-xl bg-white border border-slate-200 p-5 transition hover:border-slate-300">
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-xs font-semibold uppercase tracking-wider">Radar InaExport Kemendag</span>
            <Globe2 size={20} className="text-blue-600" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 tracking-tight">{INAEXPORT_INQUIRIES.length}</span>
            <span className="text-xs text-blue-700 font-semibold">Sinkronisasi Data</span>
          </div>
          <div className="text-xs text-slate-600 mt-2 flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            4 Inquiry Match Score &gt; 80%
          </div>
        </div>

        <div className="rounded-xl bg-white border border-slate-200 p-5 transition hover:border-slate-300">
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-xs font-semibold uppercase tracking-wider">Potensi Ekspor Awal</span>
            <TrendingUp size={20} className="text-amber-600" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 tracking-tight">${(totalPipelineUsd / 1000).toFixed(0)}K</span>
            <span className="text-xs text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">USD Pipelines</span>
          </div>
          <div className="text-xs text-slate-600 mt-2 flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
            Termasuk FCL Palm Sugar Kamerun
          </div>
        </div>
      </div>

      {/* EXECUTIVE PIPELINE FUNNEL (High Contrast Light Mode) */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
                TAHAPAN KONVERSI EKSPOR
              </span>
              <span className="text-xs text-slate-500 font-semibold">Target TEI 2026</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight mt-1">
              Alur Progres: Simulasi → Konsultasi Dokumen → Permintaan Penawaran → Siap Kirim Kontainer
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Klik salah satu tahapan di bawah untuk menyaring daftar buyer berdasarkan tingkat kematangan negosiasi.
            </p>
          </div>

          {stageFilter !== 'ALL' && (
            <button
              onClick={() => setStageFilter('ALL')}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300 self-start sm:self-auto transition shadow-2xs"
            >
              Reset Pilihan
            </button>
          )}
        </div>

        {/* 4 Pipeline Stages Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
          {PIPELINE_STAGES.map((stage) => {
            const count = leads.filter(l => l.pipelineStage === stage.id).length;
            const stageValue = leads.filter(l => l.pipelineStage === stage.id).reduce((s, l) => s + l.estimatedValueUsd, 0);
            const isSelected = stageFilter === stage.id;

            return (
              <div
                key={stage.id}
                onClick={() => setStageFilter(isSelected ? 'ALL' : stage.id)}
                className={`p-4 rounded-lg border transition cursor-pointer relative group ${
                  isSelected
                    ? 'bg-emerald-50/70 border-emerald-600 ring-2 ring-emerald-500 shadow-sm'
                    : 'bg-slate-50/70 border-slate-200 hover:border-slate-400 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Tahap {stage.stepNumber}
                  </span>
                  <span className="text-xs font-semibold text-slate-600">
                    {count} Leads
                  </span>
                </div>

                <div className="mt-2.5">
                  <div className="font-extrabold text-slate-900 text-sm group-hover:text-emerald-700 transition">
                    {stage.label}
                  </div>
                  <div className="text-xl font-black text-emerald-800 mt-1">
                    ${(stageValue / 1000).toFixed(1)}K <span className="text-xs font-medium text-slate-500">USD</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                  {stage.description}
                </p>

                {/* Progress Line */}
                <div className="w-full h-1.5 bg-slate-200 rounded-full mt-3 overflow-hidden">
                  <div 
                    className="h-full bg-emerald-600 rounded-full transition-all"
                    style={{ width: `${(stageValue / Math.max(totalPipelineUsd, 1)) * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Middle Grid: Live Buyer Pipeline & Analytics Sidecars */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main 2 Cols: Buyer Leads Table / Board */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 space-y-4">
            {/* Header & Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Flame size={18} className="text-amber-600" />
                  Daftar Calon Pembeli Ekspor (Buyer Pipeline)
                </h3>
                <p className="text-xs text-slate-600 font-medium">
                  {stageFilter !== 'ALL' ? `Menampilkan tahap: ${stageFilter}` : 'Data inquiry terverifikasi dari Kiosk Booth TEI 2026, WhatsApp CS, dan Delegasi Asing.'}
                </p>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-lg bg-slate-100 p-1 text-sm font-semibold">
                {(['ALL', 'HOT', 'WARM', 'COLD', 'DEAL'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setStatusFilter(tab)}
                    className={`min-h-10 whitespace-nowrap px-3 rounded-md transition ${
                      statusFilter === tab
                        ? tab === 'DEAL' 
                          ? 'bg-purple-700 text-white shadow-2xs'
                          : tab === 'HOT'
                          ? 'bg-emerald-700 text-white shadow-2xs'
                          : tab === 'WARM'
                          ? 'bg-amber-600 text-white shadow-2xs'
                          : 'bg-slate-800 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Input & Country Filter Row */}
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari nama buyer, perusahaan, negara, atau komoditas..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full min-h-11 pl-10 pr-4 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white text-sm"
                />
              </div>

              <select
                value={countryFilter}
                onChange={e => setCountryFilter(e.target.value)}
                className="min-h-11 px-3.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium focus:outline-none focus:border-emerald-600 focus:bg-white"
              >
                <option value="ALL">Semua Negara Buyer</option>
                <option value="Cameroon">🇨🇲 Cameroon</option>
                <option value="United Arab Emirates">🇦🇪 United Arab Emirates</option>
                <option value="Netherlands">🇳🇱 Netherlands</option>
                <option value="Japan">🇯🇵 Japan</option>
                <option value="United States">🇺🇸 United States</option>
              </select>
            </div>

            {/* Leads Cards Grid */}
            <div className="space-y-3">
              {filteredLeads.map(lead => {
                const stageInfo = PIPELINE_STAGES.find(s => s.id === lead.pipelineStage) || PIPELINE_STAGES[0];

                return (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className="rounded-lg border border-slate-200 bg-white p-4 transition cursor-pointer group space-y-3 hover:border-emerald-400"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{lead.flag}</span>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-700 transition">
                              {lead.company}
                            </h4>
                            <span className={`px-2 py-0.5 rounded text-xs font-black uppercase border ${
                              lead.status === 'HOT'
                                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                : lead.status === 'WARM'
                                ? 'bg-amber-100 text-amber-800 border-amber-300'
                                : 'bg-slate-100 text-slate-700 border-slate-300'
                            }`}>
                              {lead.status}
                            </span>
                            <span className="px-2 py-0.5 rounded text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200">
                              Tahap {stageInfo.stepNumber}: {stageInfo.label}
                            </span>
                          </div>
                          <div className="text-xs text-slate-600 mt-0.5 font-medium">
                            {lead.buyerName} • <span className="text-slate-900 font-bold">{lead.country}</span>
                          </div>
                        </div>
                      </div>

                      <div className="sm:text-right shrink-0">
                        <div className="text-base font-black text-emerald-800">
                          ${lead.estimatedValueUsd.toLocaleString()} USD
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          Kecocokan: <strong>{lead.score}%</strong> • PIC: {lead.picAssigned}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg bg-slate-50 p-3 text-sm leading-5 text-slate-700">
                      "{lead.specificInquiry}"
                    </div>

                    <div className="pt-3 flex flex-col gap-2 border-t border-slate-100 text-xs text-slate-600 font-medium sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-800 font-bold">IKM Rekomendasi:</span>
                        <span className="text-slate-900 font-semibold">{lead.matchedIkm}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span>Incoterm: <strong className="text-blue-700">{lead.incoterm}</strong></span>
                        <span className="text-slate-300">|</span>
                        <span>Volume: <strong className="text-slate-900">{lead.targetVolume}</strong></span>
                        <span className="text-emerald-700 group-hover:translate-x-0.5 transition flex items-center gap-0.5 font-bold">
                          Detail Lembar Kerja →
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {filteredLeads.length === 0 && (
                <div className="text-center py-12 text-slate-500 text-xs font-medium">
                  Tidak ada lead yang cocok dengan filter yang dipilih.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidecar Col: Charts & InaExport Scraper Feed */}
        <div className="space-y-5 sm:space-y-6">
          {/* Charts Card */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-5">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Komposisi Pipeline
              </h3>
              <div className="mt-3">
                <LeadStatusChart />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Distribusi Kesiapan IKM (A/B/C)
              </h3>
              <ReadinessDistributionChart />
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Aktivitas Inquiry (4 Pekan)
              </h3>
              <InquiriesTrendChart />
            </div>
          </div>

          {/* InaExport Scraper Feed Radar */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Sparkles size={16} className="text-blue-600" />
                  Inquiry InaExport Kemendag
                </h3>
                <p className="text-xs text-slate-500 font-medium">Inquiry perdagangan terbaru yang tersinkronisasi</p>
              </div>
              <span className="text-xs font-semibold text-emerald-700">
                Aktif
              </span>
            </div>

            <div className="space-y-2.5">
              {INAEXPORT_INQUIRIES.slice(0, 4).map(inq => (
                <div
                  key={inq.id}
                  onClick={() => setSelectedInquiry(inq)}
                  className="p-3 rounded-lg bg-slate-50 border border-slate-200 hover:border-emerald-400 hover:bg-white cursor-pointer transition text-sm space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-bold text-slate-900">
                      <span>{inq.countryCode}</span>
                      <span>{inq.buyerNegara}</span>
                    </span>
                    <span className="text-xs font-semibold text-emerald-700">
                      Match {inq.matchScore}%
                    </span>
                  </div>
                  <div className="text-slate-800 font-semibold line-clamp-1">{inq.produkNama}</div>
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                    <span>Target: <strong>{inq.matchedIkm}</strong></span>
                    <span className="text-emerald-700 font-semibold">Lihat Brief →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modals & Drawers */}
      <BuyerDetailModal
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
        onUpdateStatus={handleUpdateStatus}
        onUpdatePipelineStage={handleUpdatePipelineStage}
      />

      <InaExportRadarModal
        inquiry={selectedInquiry}
        onClose={() => setSelectedInquiry(null)}
      />
    </div>
  );
};
