import axios from 'axios';
import dayjs from 'dayjs';
import type { PrayerTimes, NextPrayer, ActivePeriod, HijriDate } from '../types';
import { PERIODS, PRAYER_LIST } from '../constants/data';

const BASE = 'https://api.aladhan.com/v1';

// ─── YARDIMCI: saat string → dakika ────────────────────────
export function t2m(t: string): number {
  if (!t || !t.includes(':')) return 0;
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

export function nowM(): number {
  const n = new Date();
  return n.getHours() * 60 + n.getMinutes();
}

export function nowS(): number {
  const n = new Date();
  return n.getHours() * 3600 + n.getMinutes() * 60 + n.getSeconds();
}

// ─── NAMAZ VAKİTLERİ (API) ─────────────────────────────────
export async function fetchPrayerTimes(
  lat: number,
  lon: number,
  method: number = 13,
  school: number = 0,
): Promise<{ timings: PrayerTimes; hijri: HijriDate }> {
  const date = dayjs().format('DD-MM-YYYY');
  const res = await axios.get(`${BASE}/timings/${date}`, {
    params: { latitude: lat, longitude: lon, method, school },
    timeout: 10000,
  });
  const data = res.data.data;
  const timings: PrayerTimes = {
    Fajr:    data.timings.Fajr.slice(0, 5),
    Sunrise: data.timings.Sunrise.slice(0, 5),
    Dhuhr:   data.timings.Dhuhr.slice(0, 5),
    Asr:     data.timings.Asr.slice(0, 5),
    Maghrib: data.timings.Maghrib.slice(0, 5),
    Isha:    data.timings.Isha.slice(0, 5),
  };
  const h = data.date.hijri;
  const hijri: HijriDate = {
    day: h.day,
    month: { number: Number(h.month.number), en: h.month.en, ar: h.month.ar },
    year: h.year,
  };
  return { timings, hijri };
}

// ─── ŞEHİR ADI İLE NAMAZ VAKİTLERİ ───────────────────────
export async function fetchByCity(
  city: string,
  country: string,
  method: number = 13,
  school: number = 0,
): Promise<{ timings: PrayerTimes; hijri: HijriDate; lat: number; lon: number }> {
  const date = dayjs().format('DD-MM-YYYY');
  const res = await axios.get(`${BASE}/timingsByCity/${date}`, {
    params: { city, country, method, school },
    timeout: 10000,
  });
  const data = res.data.data;
  const timings: PrayerTimes = {
    Fajr:    data.timings.Fajr.slice(0, 5),
    Sunrise: data.timings.Sunrise.slice(0, 5),
    Dhuhr:   data.timings.Dhuhr.slice(0, 5),
    Asr:     data.timings.Asr.slice(0, 5),
    Maghrib: data.timings.Maghrib.slice(0, 5),
    Isha:    data.timings.Isha.slice(0, 5),
  };
  const h = data.date.hijri;
  const hijri: HijriDate = {
    day: h.day,
    month: { number: Number(h.month.number), en: h.month.en, ar: h.month.ar },
    year: h.year,
  };
  const meta = data.meta;
  return { timings, hijri, lat: Number(meta.latitude), lon: Number(meta.longitude) };
}

// ─── SONRAKİ NAMAZ ─────────────────────────────────────────
export function getNextPrayer(pt: PrayerTimes): NextPrayer {
  const nm = nowM();
  const ns = nowS();
  const list = PRAYER_LIST.map((p) => ({ ...p, m: t2m(pt[p.k]) }));
  const nx = list.find((p) => p.m > nm) ?? list[0];
  const remM = nx.m > nm ? nx.m - nm : nx.m + 1440 - nm;
  const remS = remM * 60 - new Date().getSeconds();
  const prevIdx = list.indexOf(nx) - 1;
  const prev = prevIdx >= 0 ? list[prevIdx] : list[list.length - 1];
  const tot = nx.m > prev.m ? nx.m - prev.m : nx.m + 1440 - prev.m;
  const elp = nm > prev.m ? nm - prev.m : nm + 1440 - prev.m;
  return {
    n: nx.n,
    k: nx.k,
    t: pt[nx.k],
    m: nx.m,
    remM,
    remS,
    prog: Math.min(100, (elp / tot) * 100),
  };
}

// ─── AKTİF VEKİT ───────────────────────────────────────────
function makePeriod(id: string, nm: number, st: number, en: number): ActivePeriod {
  const rem = en - nm;
  const prog = Math.max(0, Math.min(100, ((nm - st) / (en - st)) * 100));
  return { id, key: id, ...PERIODS[id], rem, st, en, prog };
}

export function getCurrentPeriod(pt: PrayerTimes): ActivePeriod | null {
  const nm = nowM();
  const f  = t2m(pt.Fajr);
  const sr = t2m(pt.Sunrise);
  const dh = t2m(pt.Dhuhr);
  const as = t2m(pt.Asr);
  const ma = t2m(pt.Maghrib);
  const is = t2m(pt.Isha);
  const kSe = sr + 45;
  const kAs = ma - 45;
  const zav = dh - 5;   // Zaval: öğleden ~5 dk önce başlar

  // Ezan vakti (±14 dakika)
  for (const ep of [f, dh, as, ma, is]) {
    if (nm >= ep - 3 && nm <= ep + 14) return makePeriod('ezan', nm, ep - 3, ep + 14);
  }

  if (nm < f)   return makePeriod('gece',          nm, is > nm ? is : 0, f);
  if (nm < sr)  return makePeriod('sabah_sonrasi', nm, f,   sr);
  if (nm < kSe) return makePeriod('kerahat_sabah', nm, sr,  kSe);
  if (nm < zav) return makePeriod('kusluk',        nm, kSe, zav);
  if (nm < dh)  return makePeriod('kerahat_sabah', nm, zav, dh);
  if (nm < as)  return makePeriod('ogle',          nm, dh,  as);
  if (nm < kAs) return makePeriod('ikindi',        nm, as,  kAs);
  if (nm < ma)  return makePeriod('kerahat_aksam', nm, kAs, ma);
  if (nm < is)  return makePeriod('aksam',         nm, ma,  is);
  if (nm < is + 85) return makePeriod('yatsi',     nm, is,  is + 85);
  return makePeriod('yatmadan', nm, is + 85, f + 1440);
}
