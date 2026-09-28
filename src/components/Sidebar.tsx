import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ShieldCheck, 
  PlaneTakeoff, 
  Bot, 
  Store, 
  Menu, 
  X, 
  Video,
  ExternalLink,
  Calendar
} from 'lucide-react';
import { EVENT_CONFIG } from '../data/eventConfig';

interface SidebarProps {
  currentPath: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPath }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    {
      label: 'Command Center TEI',
      href: '/command-center',
      icon: LayoutDashboard,
      badge: 'Live',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
    },
    {
      label: 'Export Readiness IKM',
      href: '/readiness',
      icon: ShieldCheck,
      badge: '8 IKM',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
    },
    {
      label: 'Simulasi Logistik DHL',
      href: '/logistics',
      icon: PlaneTakeoff,
      badge: 'DEMO RATE',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
    },
    {
      label: 'AI Export Advisor',
      href: '/ai-advisor',
      icon: Bot,
      badge: 'Konsultasi',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
    },
    {
      label: 'Interactive Booth Kiosk',
      href: '/kiosk',
      icon: Store,
      badge: 'Visitor',
      badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
    },
    {
      label: 'B2B Meeting & Dokumen',
      href: 'https://veylo.163.61.44.41.sslip.io/app',
      icon: Video,
      badge: 'Veylo AI',
      badgeColor: 'bg-emerald-600 text-white border-emerald-700',
      isExternal: true
    }
  ];

  const isActive = (href: string) => {
    if (href === '/command-center' && (currentPath === '/' || currentPath === '/command-center')) {
      return true;
    }
    return currentPath === href;
  };

  return (
    <>
      {/* Mobile Bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
        <div className="flex items-center gap-2.5 min-w-0">
          <img 
            src="/branding/logo-tangsel.png" 
            alt="Logo Kota Tangerang Selatan" 
            className="w-8 h-8 object-contain shrink-0 drop-shadow-xs" 
          />
          <div className="min-w-0">
            <div className="text-xs sm:text-sm font-black text-slate-900 tracking-tight leading-none truncate">
              TANGSEL EXPORT AI
            </div>
            <div className="text-[10px] text-slate-500 font-medium truncate mt-0.5">
              Disperindag Kota Tangsel
            </div>
          </div>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition shrink-0 ml-2 border border-slate-300"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Overlay Backdrop for Mobile */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 shadow-sm ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header / Brand */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <img 
              src="/branding/logo-tangsel.png" 
              alt="Lambang Resmi Kota Tangerang Selatan" 
              className="w-10 h-10 object-contain shrink-0 drop-shadow-xs" 
            />
            <div className="min-w-0">
              <h1 className="text-sm font-black text-slate-900 tracking-tight leading-tight">
                TANGSEL EXPORT AI
              </h1>
              <div className="text-[10px] text-slate-600 font-medium leading-tight mt-0.5">
                Dinas Perindustrian & Perdagangan<br />
                <span className="text-emerald-700 font-bold">Kota Tangerang Selatan</span>
              </div>
            </div>
          </div>

          <div className="mt-3 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 flex items-center justify-between text-[11px] text-slate-700 shadow-2xs">
            <span className="flex items-center gap-1.5 font-medium truncate">
              <Calendar size={13} className="text-amber-600 shrink-0" />
              <span className="truncate">{EVENT_CONFIG.eventShortName} ({EVENT_CONFIG.eventLocation.split(',')[0]})</span>
            </span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold border border-emerald-300 text-[10px] shrink-0">
              {EVENT_CONFIG.countdownDays.split(' ')[0]}
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Sistem Operasional
          </div>

          {navItems.map((item) => {
            const active = !item.isExternal && isActive(item.href);
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                target={item.isExternal ? '_blank' : undefined}
                rel={item.isExternal ? 'noreferrer' : undefined}
                onClick={() => setMobileOpen(false)}
                className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-300 shadow-2xs'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon 
                    size={18} 
                    className={`transition-colors ${
                      active ? 'text-emerald-700' : 'text-slate-500 group-hover:text-slate-800'
                    }`} 
                  />
                  <span>{item.label}</span>
                </div>
                <div className="flex items-center gap-1">
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                  {item.isExternal && (
                    <ExternalLink size={12} className="text-emerald-700 ml-0.5" />
                  )}
                </div>
              </a>
            );
          })}
        </nav>

        {/* Bottom Status Card */}
        <div className="p-3.5 border-t border-slate-200 bg-slate-50">
          <div className="p-3 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-600 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between text-slate-900 font-bold">
              <span className="flex items-center gap-1.5 text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                Dual-Facing Engine
              </span>
              <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200 font-mono">v1.1</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
              Terintegrasi dengan basis data kurasi IKM Disperindag Tangsel, tarif kargo DHL internasional, dan Veylo video negotiation.
            </p>
            <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-[10px] font-semibold">
              <span className="text-slate-500">Status Operasi:</span>
              <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                100% Siap Sidang
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
