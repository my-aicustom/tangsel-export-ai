import React from 'react';

// 1. Lead Status Breakdown Chart (Light Mode High Contrast)
export const LeadStatusChart: React.FC = () => {
  const data = [
    { label: 'HOT (>80%)', count: 3, color: 'bg-emerald-600', barColor: '#059669', textColor: 'text-emerald-700 font-bold' },
    { label: 'WARM (60-79%)', count: 2, color: 'bg-amber-600', barColor: '#d97706', textColor: 'text-amber-800 font-bold' },
    { label: 'COLD (<60%)', count: 1, color: 'bg-slate-500', barColor: '#64748b', textColor: 'text-slate-700 font-bold' },
  ];
  const max = 4;

  return (
    <div className="space-y-3">
      {data.map((item, idx) => (
        <div key={idx} className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-slate-800 flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
              {item.label}
            </span>
            <span className={item.textColor}>{item.count} Leads</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(item.count / max) * 100}%`,
                backgroundColor: item.barColor,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

// 2. Export Readiness Distribution Chart (Grade A/B/C)
export const ReadinessDistributionChart: React.FC = () => {
  const data = [
    { grade: 'Grade A', label: 'Siap Ekspor', count: 3, percent: 37.5, color: '#059669', bg: 'bg-emerald-50 text-emerald-800 border border-emerald-200' },
    { grade: 'Grade B', label: 'Gap Minor', count: 4, percent: 50.0, color: '#2563eb', bg: 'bg-blue-50 text-blue-800 border border-blue-200' },
    { grade: 'Grade C', label: 'Inkubasi', count: 1, percent: 12.5, color: '#d97706', bg: 'bg-amber-50 text-amber-800 border border-amber-200' },
  ];

  return (
    <div className="space-y-4">
      {/* Visual Stacked Bar */}
      <div className="h-4 w-full rounded-full bg-slate-200 flex overflow-hidden ring-1 ring-slate-300">
        <div style={{ width: '37.5%' }} className="bg-emerald-600 hover:opacity-90 transition" title="Grade A: 3 IKM" />
        <div style={{ width: '50.0%' }} className="bg-blue-600 hover:opacity-90 transition" title="Grade B: 4 IKM" />
        <div style={{ width: '12.5%' }} className="bg-amber-500 hover:opacity-90 transition" title="Grade C: 1 IKM" />
      </div>

      {/* Legend & Stats */}
      <div className="grid grid-cols-3 gap-2 pt-1 text-center">
        {data.map((item, idx) => (
          <div key={idx} className={`p-2.5 rounded-xl ${item.bg}`}>
            <div className="text-xs font-bold">{item.grade}</div>
            <div className="text-xl font-black text-slate-900 mt-0.5">{item.count} <span className="text-xs font-semibold text-slate-600">IKM</span></div>
            <div className="text-xs font-medium text-slate-600 mt-0.5">{item.percent}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 3. Weekly Inquiries Radar Trend Chart (SVG Sparkline)
export const InquiriesTrendChart: React.FC = () => {
  const points = [
    { label: 'W1 Sep', value: 8 },
    { label: 'W2 Sep', value: 14 },
    { label: 'W3 Sep', value: 23 },
    { label: 'W4 Sep (Now)', value: 38 },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <div>
          <span className="text-2xl font-black text-slate-900">83</span>
          <span className="text-xs text-slate-600 font-medium ml-1.5">Total Inquiry Radar</span>
        </div>
        <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
          +65% vs Pekan Lalu
        </span>
      </div>

      <div className="h-28 w-full relative pt-2">
        <svg viewBox="0 0 300 90" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="gradientTrendLight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#059669" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="0" y1="75" x2="300" y2="75" stroke="#e2e8f0" strokeDasharray="3 3" />
          <line x1="0" y1="40" x2="300" y2="40" stroke="#e2e8f0" strokeDasharray="3 3" />

          {/* Area fill */}
          <polygon
            points="0,85 20,70 100,58 190,38 280,10 280,85 0,85"
            fill="url(#gradientTrendLight)"
          />

          {/* Line */}
          <polyline
            fill="none"
            stroke="#059669"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points="20,70 100,58 190,38 280,10"
          />

          {/* Points */}
          <circle cx="20" cy="70" r="4" fill="#ffffff" stroke="#059669" strokeWidth="2.5" />
          <circle cx="100" cy="58" r="4" fill="#ffffff" stroke="#059669" strokeWidth="2.5" />
          <circle cx="190" cy="38" r="4" fill="#ffffff" stroke="#059669" strokeWidth="2.5" />
          <circle cx="280" cy="10" r="5" fill="#059669" stroke="#ffffff" strokeWidth="2" />
        </svg>

        <div className="flex justify-between text-xs font-semibold text-slate-500 mt-1">
          {points.map((p, i) => (
            <span key={i}>{p.label}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
