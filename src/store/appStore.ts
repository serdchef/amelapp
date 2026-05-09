import { create } from 'zustand';
import type { AppState, PrayerTimes, HijriDate, LocationKey } from '../types';

export const useAppStore = create<AppState>((set) => ({
  prayerTimes:        null,
  hijriDate:          null,
  cityName:           'İstanbul',
  countryCode:        'TR',
  latitude:           null,
  longitude:          null,
  selectedLocation:   null,
  bookmarkedAmels:    [],
  notificationsEnabled: true,
  darkMode:           false,
  calculationMethod:  13, // Default: Diyanet
  asrMethod:          0,  // Default: Shafi/Standard

  setPrayerTimes: (pt: PrayerTimes) => set({ prayerTimes: pt }),
  setHijriDate:   (h: HijriDate)    => set({ hijriDate: h }),
  setCity: (city: string, country: string) => set({ cityName: city, countryCode: country }),
  setCoords: (lat: number, lon: number)    => set({ latitude: lat, longitude: lon }),
  setSelectedLocation: (loc: LocationKey | null) => set({ selectedLocation: loc }),

  toggleBookmark: (amelId: string) =>
    set((state) => ({
      bookmarkedAmels: state.bookmarkedAmels.includes(amelId)
        ? state.bookmarkedAmels.filter((id) => id !== amelId)
        : [...state.bookmarkedAmels, amelId],
    })),

  setNotificationsEnabled: (val: boolean) => set({ notificationsEnabled: val }),
  setDarkMode: (val: boolean)             => set({ darkMode: val }),
  setCalculationMethod: (val: number)      => set({ calculationMethod: val }),
  setAsrMethod: (val: number)              => set({ asrMethod: val }),
}));
