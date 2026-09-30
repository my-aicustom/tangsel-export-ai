import React, { useEffect, useState } from 'react';
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
  Calendar,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { EVENT_CONFIG, getEventCountdownLabel } from '../data/eventConfig';
import { VEYLO_BASE_URL } from '../lib/veyloBridge';

interface SidebarProps {
  currentPath: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPath }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [countdownLabel, setCountdownLabel] = useState(() => getEventCountdownLabel());

  useEffect(() => {
    const saved = window.localStorage.getItem('tangsel-sidebar-collapsed') === '1';
    setCollapsed(saved);
    document.documentElement.dataset.sidebar = saved ? 'collapsed' : 'expanded';
  }, []);

  useEffect(() => {
    const updateCountdown = () => setCountdownLabel(getEventCountdownLabel());
    updateCountdown();
    const timer = window.setInterval(updateCountdown, 60 * 60 * 1000);
    return () => window.clearInterval(timer);
  }, []);

  const toggleCollapsed = () => {
    setCollapsed(prev => {
      const next = !prev;
      window.localStorage.setItem('tangsel-sidebar-collapsed', next ? '1' : '0');
      document.documentElement.dataset.sidebar = next ? 'collapsed' : 'expanded';
      return next;
    });
  };

  const showExpanded = !collapsed || mobileOpen;

  const navItems = [
    { label: 'Command Center', href: '/command-center', icon: LayoutDashboard },
    { label: 'Kesiapan Ekspor IKM', href: '/readiness', icon: ShieldCheck },
    { label: 'Estimasi Logistik', href: '/logistics', icon: PlaneTakeoff },
    { label: 'Asisten Regulasi Ekspor', href: '/ai-advisor', icon: Bot },
    { label: 'Kiosk Booth TEI', href: '/kiosk', icon: Store },
    {
      label: 'Meeting & Dokumen B2B',
      href: VEYLO_BASE_URL,
      icon: Video,
      isExternal: true
    }
  ];

  const isActive = (href: string) => {
    if (href === '/command-center' && (currentPath === '/' || currentPath === '/command-center')) return true;
    return currentPath === href;
  };

  return (
    <>
      <div className="sticky top-0 z-40 flex min-h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:hidden">
        <div className="flex min-w-0 items-center gap-2.5">
          <img src="/branding/logo-tangsel.png" alt="Logo Kota Tangerang Selatan" className="h-9 w-9 shrink-0 object-contain" />
          <div className="min-w-0">
            <div className="truncate text-sm font-extrabold tracking-tight text-slate-950">Tangsel Export AI</div>
            <div className="truncate text-xs text-slate-500">Disperindag Tangerang Selatan</div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="tap-target inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
          aria-label="Buka navigasi"
          aria-expanded={mobileOpen}
        >
          <Menu size={21} />
        </button>
      </div>

      {mobileOpen && (
        <button type="button" className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Tutup navigasi" />
      )}

      <aside
        className={`desktop-sidebar fixed inset-y-0 left-0 z-50 flex w-[min(18rem,88vw)] flex-col border-r border-slate-200 bg-white transition-[width,transform] duration-200 lg:translate-x-0 ${
          collapsed ? 'lg:w-20' : 'lg:w-72'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className={`border-b border-slate-200 px-4 py-4 ${collapsed ? 'lg:px-3' : ''}`}>
          <div className={`flex items-center justify-between gap-3 ${collapsed ? 'lg:flex-col' : ''}`}>
            <div className={`flex min-w-0 items-center gap-2.5 ${collapsed ? 'lg:justify-center lg:gap-0' : ''}`}>
              <img src="/branding/logo-tangsel.png" alt="Lambang Kota Tangerang Selatan" className="h-10 w-10 shrink-0 object-contain" />
              {showExpanded && (
                <>
                  <div className="h-8 w-px bg-slate-200" />
                  <div className="flex flex-col shrink-0">
                    <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400">Powered by</span>
                    <img
                      src="/branding/my-aicustom-logo.webp"
                      alt="My AI Custom"
                      className="h-4 w-auto shrink-0 object-contain"
                    />
                  </div>
                  <div className="h-8 w-px bg-slate-200" />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-extrabold tracking-tight text-slate-950">Tangsel Export AI</div>
                    <div className="text-[11px] leading-tight text-slate-500">Disperindag Tangsel</div>
                  </div>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={toggleCollapsed}
              className="tap-target hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 lg:inline-flex"
              aria-label={collapsed ? 'Perlebar sidebar' : 'Ciutkan sidebar'}
              title={collapsed ? 'Perlebar sidebar' : 'Ciutkan sidebar'}
            >
              {collapsed ? <PanelLeftOpen size={19} /> : <PanelLeftClose size={19} />}
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="tap-target inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden"
              aria-label="Tutup navigasi"
            >
              <X size={20} />
            </button>
          </div>

          {showExpanded && (
            <div className="mt-4 hidden items-center justify-between gap-3 rounded-lg bg-slate-50 px-3 py-2.5 text-xs text-slate-600 lg:flex">
              <span className="flex min-w-0 items-center gap-2">
                <Calendar size={15} className="shrink-0 text-emerald-700" />
                <span className="truncate">{EVENT_CONFIG.eventShortName} · {EVENT_CONFIG.eventLocation.split(',')[0]}</span>
              </span>
              <span className="shrink-0 font-semibold text-slate-800">{countdownLabel}</span>
            </div>
          )}
        </div>

        <nav className={`flex-1 overflow-y-auto px-3 py-4 ${collapsed ? 'lg:px-2' : ''}`} aria-label="Navigasi utama">
          {showExpanded && <div className="px-3 pb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Operasional</div>}
          <div className="space-y-1">
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
                  title={collapsed ? item.label : undefined}
                  className={`group flex min-h-11 items-center rounded-lg text-sm font-semibold transition ${
                    collapsed ? 'lg:justify-center lg:px-0' : 'gap-3 px-3'
                  } ${active ? 'bg-emerald-50 text-emerald-950' : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'}`}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon size={19} className={`shrink-0 ${active ? 'text-emerald-700' : 'text-slate-500'}`} />
                  {showExpanded && <span className="min-w-0 flex-1 truncate">{item.label}</span>}
                  {showExpanded && item.isExternal && <ExternalLink size={14} className="shrink-0 text-slate-400" />}
                </a>
              );
            })}
          </div>
        </nav>

        <div className={`border-t border-slate-200 p-4 ${collapsed ? 'lg:p-3' : ''}`}>
          <div className={`flex items-center gap-2 text-xs text-slate-500 ${collapsed ? 'lg:justify-center' : ''}`} title="Sistem operasional aktif">
            <span className="h-2 w-2 rounded-full bg-emerald-600" />
            {showExpanded && <span>Sistem operasional aktif</span>}
          </div>
          {showExpanded && (
            <div className="mt-3 flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
              <span className="text-xs text-slate-400">Technology partner</span>
              <img src="/branding/my-aicustom-logo.webp" alt="My AI Custom" className="h-4 w-auto object-contain opacity-70" />
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
