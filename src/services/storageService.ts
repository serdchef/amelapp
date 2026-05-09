import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  BOOKMARKS:    'FA_BOOKMARKS',
  CITY:         'FA_CITY',
  COUNTRY:      'FA_COUNTRY',
  LAT:          'FA_LAT',
  LON:          'FA_LON',
  DARK_MODE:    'FA_DARK_MODE',
  NOTIFICATIONS:'FA_NOTIFICATIONS',
};

export const storage = {
  async saveBookmarks(ids: string[]) {
    await AsyncStorage.setItem(KEYS.BOOKMARKS, JSON.stringify(ids));
  },
  async getBookmarks(): Promise<string[]> {
    const d = await AsyncStorage.getItem(KEYS.BOOKMARKS);
    return d ? JSON.parse(d) : [];
  },

  async saveCity(city: string, country: string) {
    await AsyncStorage.multiSet([[KEYS.CITY, city], [KEYS.COUNTRY, country]]);
  },
  async getCity(): Promise<{ city: string; country: string }> {
    const vals = await AsyncStorage.multiGet([KEYS.CITY, KEYS.COUNTRY]);
    return { city: vals[0][1] ?? 'Istanbul', country: vals[1][1] ?? 'TR' };
  },

  async saveCoords(lat: number, lon: number) {
    await AsyncStorage.multiSet([[KEYS.LAT, String(lat)], [KEYS.LON, String(lon)]]);
  },
  async getCoords(): Promise<{ lat: number | null; lon: number | null }> {
    const vals = await AsyncStorage.multiGet([KEYS.LAT, KEYS.LON]);
    const lat = vals[0][1] ? Number(vals[0][1]) : null;
    const lon = vals[1][1] ? Number(vals[1][1]) : null;
    return { lat, lon };
  },

  async saveDarkMode(val: boolean) {
    await AsyncStorage.setItem(KEYS.DARK_MODE, String(val));
  },
  async getDarkMode(): Promise<boolean> {
    return (await AsyncStorage.getItem(KEYS.DARK_MODE)) === 'true';
  },

  async saveNotifications(val: boolean) {
    await AsyncStorage.setItem(KEYS.NOTIFICATIONS, String(val));
  },
  async getNotifications(): Promise<boolean> {
    const v = await AsyncStorage.getItem(KEYS.NOTIFICATIONS);
    return v === null ? true : v === 'true';
  },

  async loadAll() {
    const [bookmarks, city, coords, darkMode, notifications] = await Promise.all([
      this.getBookmarks(),
      this.getCity(),
      this.getCoords(),
      this.getDarkMode(),
      this.getNotifications(),
    ]);
    return { bookmarks, city, coords, darkMode, notifications };
  },
};
