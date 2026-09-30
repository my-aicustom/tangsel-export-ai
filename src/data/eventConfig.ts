export interface EventConfig {
  eventName: string;
  eventShortName: string;
  eventDates: string;
  eventLocation: string;
  boothLocation: string;
  countdownDays: string;
  countdownNumber: number;
  anchorDate: string;
}

const TARGET_EVENT_DATE = new Date('2026-10-14T09:00:00+07:00');
const now = new Date();
const diffMs = TARGET_EVENT_DATE.getTime() - now.getTime();
const daysRemaining = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

export const EVENT_CONFIG: EventConfig = {
  eventName: 'Trade Expo Indonesia (TEI) 2026',
  eventShortName: 'TEI 2026',
  eventDates: '14 - 19 Oktober 2026',
  eventLocation: 'ICE BSD City, Tangerang',
  boothLocation: 'Booth Disperindag Tangsel, Hall 3 ICE BSD',
  countdownDays: daysRemaining > 0 ? `H-${daysRemaining} Menuju Pameran` : 'Sedang Berlangsung Hari Ini',
  countdownNumber: daysRemaining,
  anchorDate: now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
};
