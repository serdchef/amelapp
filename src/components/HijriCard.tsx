import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, radius, spacing } from '../constants/theme';
import { HIJRI_SPECIAL } from '../constants/data';
import type { HijriDate } from '../types';
import { useTranslation } from 'react-i18next';

interface Props {
  hijri: HijriDate;
}

export default function HijriCard({ hijri }: Props) {
  const { t } = useTranslation();
  const now      = new Date();
  const dayName  = t(`days.${now.getDay()}`);
  const months   = t('months', { returnObjects: true }) as string[];
  const gregDate = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
  const hspec    = HIJRI_SPECIAL[hijri.month.number];

  return (
    <View style={[styles.card, { marginHorizontal: spacing.md, marginBottom: spacing.md }]}>
      <View>
        <Text style={styles.dayName}>{dayName.toUpperCase()}</Text>
        <Text style={styles.greg}>{gregDate}</Text>
        <Text style={styles.dateNum}>{hijri.day} {hijri.month.en}</Text>
        <Text style={styles.monthEn}>{hijri.month.en} {hijri.year} H</Text>
        {hspec && <Text style={styles.badge}>✦ {hspec.badge}</Text>}
      </View>
      <View style={styles.right}>
        <Text style={styles.arabicMonth}>{hijri.month.ar}</Text>
        <Text style={styles.yearText}>{hijri.year} هـ</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.r3,
    backgroundColor: colors.forest,
    padding: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 8,
  },
  dayName: {
    fontSize: 10,
    fontFamily: fonts.dmSansSemiBold,
    letterSpacing: 1.5,
    color: 'rgba(255,255,255,0.4)',
    marginBottom: 4,
  },
  greg: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.65)',
    fontFamily: fonts.dmSans,
    marginBottom: 2,
  },
  dateNum: {
    fontSize: 24,
    fontFamily: fonts.playfair,
    color: '#fff',
    lineHeight: 28,
  },
  monthEn: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    fontFamily: fonts.dmSans,
    marginTop: 2,
  },
  badge: {
    marginTop: 6,
    fontSize: 10.5,
    color: colors.gold3,
    fontFamily: fonts.dmSansSemiBold,
    backgroundColor: 'rgba(184,146,14,0.2)',
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 30,
    alignSelf: 'flex-start',
  },
  right: { alignItems: 'flex-end' },
  arabicMonth: {
    fontFamily: fonts.amiri,
    fontSize: 36,
    color: colors.gold2,
    lineHeight: 44,
  },
  yearText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
    fontFamily: fonts.dmSans,
    textAlign: 'right',
  },
});
