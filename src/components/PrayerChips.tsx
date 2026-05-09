import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { colors, fonts, radius } from '../constants/theme';
import type { PrayerTimes } from '../types';
import { nowM, t2m } from '../services/prayerTimesService';
import { PRAYER_LIST } from '../constants/data';
import { useTranslation } from 'react-i18next';

interface Props {
  prayerTimes: PrayerTimes;
  nextPrayerKey: string;
}

export default function PrayerChips({ prayerTimes, nextPrayerKey }: Props) {
  const { t } = useTranslation();
  const nm = nowM();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
      style={styles.scroll}
    >
      {PRAYER_LIST.map((p) => {
        const isNext = p.k === nextPrayerKey;
        const pm     = t2m(prayerTimes[p.k]);
        const isPast = pm <= nm && !isNext;

        return (
          <View
            key={p.k}
            style={[styles.chip, isNext && styles.chipActive, isPast && styles.chipPast]}
          >
            <Text style={[styles.name, isNext && styles.nameActive]}>{t(`prayers.${p.k.toLowerCase()}`)}</Text>
            <Text style={[styles.time, isNext && styles.timeActive]}>
              {prayerTimes[p.k]}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { marginBottom: 14 },
  row: { paddingHorizontal: 14, gap: 7, flexDirection: 'row' },
  chip: {
    minWidth: 64,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.cream3,
    borderRadius: radius.r2,
    padding: 9,
    paddingHorizontal: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  chipActive: {
    backgroundColor: colors.forest,
    borderColor: 'transparent',
    shadowColor: colors.forest,
    shadowOpacity: 0.3,
  },
  chipPast: {
    opacity: 0.55,
  },
  name: {
    fontSize: 10.5,
    fontFamily: fonts.dmSansMedium,
    color: colors.ink4,
    marginBottom: 3,
  },
  nameActive: { color: 'rgba(255,255,255,0.65)' },
  time: {
    fontSize: 14.5,
    fontFamily: fonts.dmSansSemiBold,
    color: colors.ink,
  },
  timeActive: { color: '#fff' },
});
