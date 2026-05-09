import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, radius } from '../constants/theme';
import { getNextPrayer } from '../services/prayerTimesService';
import type { PrayerTimes } from '../types';
import { useTranslation } from 'react-i18next';

interface Props {
  prayerTimes: PrayerTimes;
}

export default function HeroCountdown({ prayerTimes }: Props) {
  const { t } = useTranslation();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const nx = getNextPrayer(prayerTimes);
  const totalSec = Math.abs(nx.remS);
  const hours   = Math.floor(totalSec / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  const countdownStr = hours > 0
    ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
    : `${pad(minutes)}:${pad(seconds)}`;

  return (
    <View style={styles.hero}>
      {/* Dekoratif halkalar */}
      <View style={[styles.ring, styles.ring1]} />
      <View style={[styles.ring, styles.ring2]} />
      <View style={[styles.ring, styles.ring3]} />

      <Text style={styles.tag}>{t('home.next_prayer')}</Text>

      <View style={styles.topRow}>
        <Text style={styles.prayerName}>{t(`prayers.${nx.k.toLowerCase()}`)}</Text>
        <Text style={styles.prayerTime}>{nx.t}</Text>
      </View>

      <View style={styles.countdownRow}>
        <Text style={styles.countdown}>{countdownStr}</Text>
        <Text style={styles.countdownUnit}>{t('home.remaining')}</Text>
      </View>

      {/* Progress bar */}
      <View style={styles.barWrap}>
        <View style={[styles.barFill, { width: `${nx.prog}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    margin: 14,
    borderRadius: radius.r4,
    backgroundColor: colors.forest,
    padding: 22,
    paddingBottom: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 10,
  },
  ring: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  ring1: { width: 140, height: 140, top: -50, right: -40 },
  ring2: { width: 200, height: 200, top: -80, right: -70 },
  ring3: { width: 90,  height: 90,  bottom: -20, left: -20 },
  tag: {
    fontSize: 9.5,
    fontFamily: fonts.dmSansSemiBold,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.45)',
    marginBottom: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  prayerName: {
    fontFamily: fonts.playfair,
    fontSize: 30,
    color: '#fff',
    letterSpacing: -0.5,
    lineHeight: 34,
  },
  prayerTime: {
    fontSize: 28,
    fontFamily: fonts.dmSansSemiBold,
    color: 'rgba(255,255,255,0.85)',
    letterSpacing: -1,
  },
  countdownRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginVertical: 10,
  },
  countdown: {
    fontSize: 52,
    fontFamily: fonts.dmSansSemiBold,
    color: '#fff',
    letterSpacing: -3,
    lineHeight: 56,
  },
  countdownUnit: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    fontFamily: fonts.dmSansMedium,
  },
  barWrap: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 2,
    height: 2,
    overflow: 'hidden',
  },
  barFill: {
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 2,
  },
});
