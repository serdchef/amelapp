// ─── AMEL ────────────────────────────────────────────────
export interface Amel {
  id: string;
  t: string;      // Turkish title
  en_t?: string;  // English title
  ur_t?: string;  // Urdu title
  ar?: string;    // Arabic text
  txt: string;    // Turkish transcription
  ur_txt?: string; // Urdu transcription
  faz: string;    // Turkish virtue description
  en_faz?: string; // English virtue description
  ur_faz?: string; // Urdu virtue description
  src: string;    // source
  k?: string;     // repetition count
}

// ─── PERIOD ──────────────────────────────────────────────
export interface Period {
  name: string;
  icon: string;
  kerahat: boolean;
  desc: string;
  amels: Amel[];
}

export interface ActivePeriod extends Period {
  id: string;
  key: string;    // i18n key
  rem: number;    // dakika kaldı
  st: number;
  en: number;
  prog: number;   // 0-100
}

// ─── PRAYER TIMES ────────────────────────────────────────
export interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export interface NextPrayer {
  n: string;      // Türkçe isim (Sabah, Öğle...)
  k: keyof PrayerTimes;
  t: string;      // saat (14:30)
  m: number;      // dakika cinsinden
  remM: number;   // kalan dakika
  remS: number;   // kalan saniye
  prog: number;   // ilerleme 0-100
}

// ─── DAY ─────────────────────────────────────────────────
export interface Day {
  name: string;
  en: string;
  special: string | null;
  fasting: boolean;
  amels: Amel[];
}

// ─── HIJRI ───────────────────────────────────────────────
export interface HijriDate {
  day: string;
  month: {
    number: number;
    en: string;
    ar: string;
  };
  year: string;
}

// ─── LOCATION ────────────────────────────────────────────
export type LocationKey = 'ev' | 'cami' | 'carsi' | 'yolculuk' | 'kabir';

// ─── APP STORE ───────────────────────────────────────────
export interface AppState {
  prayerTimes: PrayerTimes | null;
  hijriDate: HijriDate | null;
  cityName: string;
  countryCode: string;
  latitude: number | null;
  longitude: number | null;
  selectedLocation: LocationKey | null;
  bookmarkedAmels: string[];
  notificationsEnabled: boolean;
  darkMode: boolean;
  calculationMethod: number;
  asrMethod: number;

  setPrayerTimes: (pt: PrayerTimes) => void;
  setHijriDate: (h: HijriDate) => void;
  setCity: (city: string, country: string) => void;
  setCoords: (lat: number, lon: number) => void;
  setSelectedLocation: (loc: LocationKey | null) => void;
  toggleBookmark: (amelId: string) => void;
  setNotificationsEnabled: (val: boolean) => void;
  setDarkMode: (val: boolean) => void;
  setCalculationMethod: (val: number) => void;
  setAsrMethod: (val: number) => void;
}
