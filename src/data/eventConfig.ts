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

export const EVENT_CONFIG: EventConfig = {
  eventName: 'Trade Expo Indonesia (TEI) 2026',
  eventShortName: 'TEI 2026',
  eventDates: '14 - 19 Oktober 2026',
  eventLocation: 'ICE BSD City, Tangerang',
  boothLocation: 'Booth Disperindag Tangsel, Hall 3 ICE BSD',
  countdownDays: 'H-20 Menuju Pameran',
  countdownNumber: 20,
  anchorDate: '24 September 2026'
};
