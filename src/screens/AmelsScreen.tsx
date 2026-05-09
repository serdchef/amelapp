import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, radius, spacing, globalStyles } from '../constants/theme';
import { useAppStore } from '../store/appStore';
import { PERIODS } from '../constants/data';
import AmelItem from '../components/AmelItem';
import { storage } from '../services/storageService';

const PERIOD_KEYS = Object.keys(PERIODS).filter((k) => k !== 'ezan');

export default function AmelsScreen() {
  const { t } = useTranslation();
  const [selectedKey, setSelectedKey] = useState(PERIOD_KEYS[0]);
  const store = useAppStore();
  const period = PERIODS[selectedKey];

  return (
    <SafeAreaView style={globalStyles.screen} edges={['top']}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('all_deeds.title')}</Text>
      </View>

      {/* SEKMELERİ */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabScroll}
        contentContainerStyle={styles.tabRow}
      >
        {PERIOD_KEYS.map((key) => {
          const p = PERIODS[key];
          const isActive = key === selectedKey;
          return (
            <TouchableOpacity
              key={key}
              style={[styles.tab, isActive && styles.tabActive]}
              onPress={() => setSelectedKey(key)}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {p.icon} {t(`periods.${key}`)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* İÇERİK */}
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={[globalStyles.section, { paddingTop: spacing.md }]}>
          {/* Dönem açıklaması */}
          {period.kerahat && (
            <View style={styles.kerahatNotice}>
              <Text style={styles.kerahatText}>⛔ {t('home.kerahat_notice')}</Text>
            </View>
          )}
          <Text style={styles.periodDesc}>{t(`periods.${selectedKey}_desc`)}</Text>

          {/* Ameller */}
          {period.amels.map((a) => (
            <AmelItem
              key={a.id}
              amel={a}
              bookmarked={store.bookmarkedAmels.includes(a.id)}
              onToggleBookmark={(id) => {
                store.toggleBookmark(id);
                const updated = store.bookmarkedAmels.includes(id)
                  ? store.bookmarkedAmels.filter((x) => x !== id)
                  : [...store.bookmarkedAmels, id];
                storage.saveBookmarks(updated);
              }}
            />
          ))}

          {period.amels.length === 0 && (
            <Text style={styles.empty}>{t('all_deeds.empty')}</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.cream3,
  },
  headerTitle: {
    fontFamily: fonts.playfair,
    fontSize: 20,
    color: colors.forest,
  },
  tabScroll: {
    borderBottomWidth: 1,
    borderBottomColor: colors.cream3,
    maxHeight: 50,
  },
  tabRow: {
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
  },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: colors.cream3,
    backgroundColor: colors.white,
  },
  tabActive: {
    backgroundColor: colors.forest,
    borderColor: 'transparent',
  },
  tabText: {
    fontSize: 12,
    fontFamily: fonts.dmSansSemiBold,
    color: colors.ink3,
    whiteSpace: 'nowrap',
  } as any,
  tabTextActive: { color: '#fff' },
  kerahatNotice: {
    backgroundColor: colors.dangerBg,
    borderRadius: radius.r1,
    padding: 10,
    marginBottom: 12,
  },
  kerahatText: {
    fontSize: 12.5,
    color: colors.danger,
    fontFamily: fonts.dmSansMedium,
  },
  periodDesc: {
    fontSize: 13,
    color: colors.ink3,
    lineHeight: 21,
    marginBottom: 14,
    fontFamily: fonts.dmSans,
  },
  empty: {
    textAlign: 'center',
    color: colors.ink4,
    fontSize: 14,
    paddingVertical: 24,
    fontFamily: fonts.dmSans,
  },
});
