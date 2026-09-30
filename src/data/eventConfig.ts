export interface EventConfig {
  eventName: string;
  eventShortName: string;
  eventDates: string;
  eventLocation: string;
  boothLocation: string;
  eventStartAt: string;
  eventEndAt: string;
  countdownDays?: string;
  countdownNumber?: number;
  anchorDate?: string;
}

export const EVENT_CONFIG: EventConfig = {
  eventName: 'Trade Expo Indonesia (TEI) 2026',
  eventShortName: 'TEI 2026',
  eventDates: '14 - 19 Oktober 2026',
  eventLocation: 'ICE BSD City, Tangerang',
  boothLocation: 'Booth Disperindag Tangsel, Hall 3 ICE BSD',
  eventStartAt: '2026-10-14T00:00:00+07:00',
  eventEndAt: '2026-10-19T23:59:59+07:00'
};

const DAY_MS = 1000 * 60 * 60 * 24;

export const getEventCountdownLabel = (nowMs: number = Date.now()): string => {
  const startMs = new Date(EVENT_CONFIG.eventStartAt).getTime();
  const endMs = new Date(EVENT_CONFIG.eventEndAt).getTime();

  if (nowMs < startMs) {
    const days = Math.max(1, Math.ceil((startMs - nowMs) / DAY_MS));
    return `H-${days} Menuju Pameran`;
  }

  if (nowMs <= endMs) return 'TEI 2026 Sedang Berlangsung';
  return 'TEI 2026 Telah Selesai';
};
