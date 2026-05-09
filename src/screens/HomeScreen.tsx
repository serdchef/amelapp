import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  RefreshControl, ActivityIndicator, Alert, Modal, TextInput,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, radius, spacing, globalStyles } from '../constants/theme';
import { useAppStore } from '../store/appStore';
import { fetchPrayerTimes, fetchByCity, getCurrentPeriod, getNextPrayer } from '../services/prayerTimesService';
import { requestAndGetLocation } from '../services/locationService';
import { storage } from '../services/storageService';
import { schedulePrayerNotifications } from '../services/notificationService';
import HeroCountdown from '../components/HeroCountdown';
import PrayerChips from '../components/PrayerChips';
import HijriCard from '../components/HijriCard';
import AmelItem from '../components/AmelItem';
import { DAYS, HIJRI_SPECIAL, LOCATIONS, LOC_DB } from '../constants/data';
import { getSmartSuggestion } from '../services/suggestionService';
import type { LocationKey, Amel } from '../types';

export default function HomeScreen() {
  const { t } = useTranslation();
  const store = useAppStore();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [cityModalVisible, setCityModalVisible] = useState(false);
  const [cityInput, setCityInput] = useState('');
  const [countryInput, setCountryInput] = useState('TR');

  // ─── İLK YÜKLEMİDE KONUM + VAKİTLER ──────────────────
  useEffect(() => {
    initApp();
  }, []);

  // Ayarlar (Metod/Mezhep) değiştiğinde otomatik yenile
  useEffect(() => {
    if (store.latitude && store.longitude) {
      updateTimes();
    }
  }, [store.calculationMethod, store.asrMethod]);

  async function updateTimes() {
    if (!store.latitude || !store.longitude) return;
    try {
      const { timings, hijri } = await fetchPrayerTimes(
        store.latitude, 
        store.longitude, 
        store.calculationMethod, 
        store.asrMethod
      );
      store.setPrayerTimes(timings);
      store.setHijriDate(hijri);
      if (store.notificationsEnabled) {
        await schedulePrayerNotifications(timings);
      }
    } catch (e) {
      console.warn('updateTimes error:', e);
    }
  }

  async function initApp() {
    setLoading(true);
    try {
      // 1) Cache'ten yükle
      const saved = await storage.loadAll();
      if (saved.bookmarks.length) store.bookmarkedAmels.length === 0 &&
        useAppStore.setState({ bookmarkedAmels: saved.bookmarks });
      store.setNotificationsEnabled(saved.notifications);

      // 2) Konum al (Sadece koordinat yoksa)
      if (!saved.coords.latitude) {
        const geo = await requestAndGetLocation();
        if (geo) {
          store.setCoords(geo.latitude, geo.longitude);
          store.setCity(geo.city, geo.country);
          await storage.saveCity(geo.city, geo.country);
          await storage.saveCoords(geo.latitude, geo.longitude);
  
          const { timings, hijri } = await fetchPrayerTimes(
            geo.latitude, 
            geo.longitude, 
            store.calculationMethod, 
            store.asrMethod
          );
          store.setPrayerTimes(timings);
          store.setHijriDate(hijri);
  
          if (saved.notifications) {
            await schedulePrayerNotifications(timings);
          }
        } else {
          // Konum reddedildiyse cache'ten şehir dene
          const { city, country } = saved.city;
          if (city) {
            await loadByCity(city, country);
          }
        }
      } else {
        // Zaten konum varsa direkt vakitleri yükle
        store.setCoords(saved.coords.latitude, saved.coords.longitude);
        store.setCity(saved.city.city, saved.city.country);
        await updateTimes();
      }
    } catch (e) {
      console.warn('initApp error:', e);
    }
    setLoading(false);
  }

  async function loadByCity(city: string, country: string) {
    try {
      const res = await fetchByCity(city, country, store.calculationMethod, store.asrMethod);
      store.setPrayerTimes(res.timings);
      store.setHijriDate(res.hijri);
      store.setCity(city, country);
      store.setCoords(res.lat, res.lon);
      await storage.saveCity(city, country);
    } catch {
      Alert.alert(t('common.error'), t('home.city_not_found'));
    }
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (store.latitude && store.longitude) {
      try {
        const { timings, hijri } = await fetchPrayerTimes(store.latitude, store.longitude);
        store.setPrayerTimes(timings);
        store.setHijriDate(hijri);
      } catch {}
    }
    setRefreshing(false);
  }, [store.latitude, store.longitude]);

  async function handleCityChange() {
    if (!cityInput.trim()) return;
    setCityModalVisible(false);
    setLoading(true);
    await loadByCity(cityInput.trim(), countryInput.trim() || 'TR');
    setLoading(false);
  }

  if (!pt) {
    return (
      <SafeAreaView style={[globalStyles.screen, styles.center]}>
        <ActivityIndicator size="large" color={colors.forest} />
      </SafeAreaView>
    );
  }

  const nx      = pt ? getNextPrayer(pt) : null;
  const period  = pt ? getCurrentPeriod(pt) : null;
  const today   = DAYS[new Date().getDay()];
  const hspec   = store.hijriDate ? HIJRI_SPECIAL[store.hijriDate.month.number] : null;

  const [suggestion, setSuggestion] = useState<Amel | null>(null);

  useEffect(() => {
    if (period) {
      setSuggestion(getSmartSuggestion(period.key));
    }
  }, [period?.key]);

  if (!nx || !period) return null;

  return (
    <SafeAreaView style={globalStyles.screen} edges={['top']}>
      {/* ─── HEADER ─────────────────────────────────── */}
      <View style={styles.header}>
        <View style={styles.brand}>
          <Text style={styles.brandTitle}>{t('home.title')}</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.cityBtn} onPress={() => setCityModalVisible(true)}>
            <Text style={styles.cityBtnText} numberOfLines={1}>📍 {store.cityName}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.forest} />}
      >
        {/* HERO COUNTDOWN */}
        <HeroCountdown prayerTimes={pt} />

        {/* PRAYER CHIPS */}
        <PrayerChips prayerTimes={pt} nextPrayerKey={nx.k} />

        {/* AKTİF VEKİT */}
        {period && (
          <View style={globalStyles.section}>
            <Text style={globalStyles.sectionLabel}>{t('home.doing_now')}</Text>
            <View style={[styles.periodCard, period.kerahat && styles.kerahatCard]}>
              <View style={styles.periodTop}>
                <View style={styles.periodNameRow}>
                  <Text style={styles.periodIcon}>{period.icon}</Text>
                  <Text style={styles.periodTitle}>{t(`periods.${period.key}`)}</Text>
                </View>
                <View style={[styles.badge,
                  period.rem <= 20 ? styles.badgeUrgent : period.rem <= 45 ? styles.badgeWarn : null
                ]}>
                  <Text style={[styles.badgeText,
                    period.rem <= 20 ? styles.badgeTextUrgent : period.rem <= 45 ? styles.badgeTextWarn : null
                  ]}>{period.rem} {t('home.min_left')}</Text>
                </View>
              </View>

              {period.kerahat && (
                <View style={styles.kerahatNotice}>
                  <Text style={styles.kerahatText}>⛔ {t('home.kerahat_notice')}</Text>
                </View>
              )}

              <Text style={styles.periodDesc}>{period.desc}</Text>

              {period.amels.map((a) => (
                <AmelItem
                  key={a.id}
                  amel={a}
                  bookmarked={store.bookmarkedAmels.includes(a.id)}
                  onToggleBookmark={(id) => {
                    const wasBookmarked = store.bookmarkedAmels.includes(id);
                    store.toggleBookmark(id);
                    const updated = wasBookmarked
                      ? store.bookmarkedAmels.filter((x) => x !== id)
                      : [...store.bookmarkedAmels, id];
                    storage.saveBookmarks(updated);
                  }}
                />
              ))}

              <View style={styles.periodFooter}>
                <Text style={styles.periodFooterText}>{t('home.next')}: {t(`prayers.${nx.k.toLowerCase()}`)} {nx.t}</Text>
              </View>
            </View>
          </View>
        )}

        {/* KÜTÜPHANE ÖNERİSİ */}
        {suggestion && (
          <View style={globalStyles.section}>
            <Text style={globalStyles.sectionLabel}>{t('library.suggestion_title') || 'Kitaptan Bir Amel'}</Text>
            <View style={styles.suggestionCard}>
              <View style={styles.suggestionHeader}>
                <Text style={styles.suggestionIcon}>✨</Text>
                <Text style={styles.suggestionTitle}>{t('library.suggestion_subtitle') || 'Faziletli Ameller'}</Text>
              </View>
              <AmelItem
                amel={suggestion}
                bookmarked={store.bookmarkedAmels.includes(suggestion.id)}
                onToggleBookmark={(id) => {
                  store.toggleBookmark(id);
                  const was = store.bookmarkedAmels.includes(id);
                  storage.saveBookmarks(was ? store.bookmarkedAmels.filter(x => x !== id) : [...store.bookmarkedAmels, id]);
                }}
              />
            </View>
          </View>
        )}

        {/* HİCRİ TAKVİM */}
        {store.hijriDate && <HijriCard hijri={store.hijriDate} />}

        {/* KONUM SEÇİCİ */}
        <View style={globalStyles.section}>
          <Text style={globalStyles.sectionLabel}>{t('home.where_are_you')}</Text>
          <View style={styles.locGrid}>
            {LOCATIONS.map((loc) => (
              <TouchableOpacity
                key={loc.key}
                style={[styles.locCard, store.selectedLocation === loc.key && styles.locCardActive]}
                onPress={() => store.setSelectedLocation(
                  store.selectedLocation === loc.key ? null : loc.key as LocationKey
                )}
              >
                <Text style={styles.locIcon}>{loc.icon}</Text>
                <Text style={[styles.locName, store.selectedLocation === loc.key && styles.locNameActive]}>
                  {loc.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* KONUM AMELLERİ */}
        {store.selectedLocation && LOC_DB[store.selectedLocation] && (
          <View style={globalStyles.section}>
            <View style={styles.periodCard}>
              <View style={styles.periodTop}>
                <View style={styles.periodNameRow}>
                  <Text style={styles.periodIcon}>📍</Text>
                  <Text style={styles.periodTitle}>{t('home.special_deeds')}</Text>
                </View>
              </View>
              {LOC_DB[store.selectedLocation].map((a) => (
                <AmelItem key={a.id} amel={a}
                  bookmarked={store.bookmarkedAmels.includes(a.id)}
                  onToggleBookmark={(id) => store.toggleBookmark(id)}
                />
              ))}
            </View>
          </View>
        )}

        {/* BUGÜN */}
        <View style={[globalStyles.section, { marginBottom: 24 }]}>
          <Text style={globalStyles.sectionLabel}>{t('home.today')}: {t(`days.${new Date().getDay()}`)}</Text>
          <View style={styles.todayCard}>
            <View style={styles.todayBadge}>
              <Text style={styles.todayBadgeText}>✦ {t(`days.${new Date().getDay()}`)}</Text>
            </View>
            {today.special && (
              <Text style={styles.todaySpecial}>📌 {today.special}</Text>
            )}
            {today.fasting && (
              <View style={styles.fastingRow}>
                <Text style={styles.fastingIcon}>🌙</Text>
                <View>
                <Text style={styles.fastingTitle}>{t('home.fasting_title')}</Text>
                <Text style={styles.fastingSub}>{t('home.fasting_desc')}</Text>
                </View>
              </View>
            )}
            {hspec && (
              <View style={styles.hspecBadge}>
                <Text style={styles.hspecText}>🌙 {hspec.name} Ayı — {hspec.badge}</Text>
              </View>
            )}
            {[...today.amels, ...(hspec?.amels ?? [])].map((a) => (
              <AmelItem key={a.id} amel={a}
                bookmarked={store.bookmarkedAmels.includes(a.id)}
                onToggleBookmark={(id) => store.toggleBookmark(id)}
              />
            ))}
            {today.amels.length === 0 && !hspec && (
              <Text style={styles.noAmel}>{t('home.no_special_deeds')}</Text>
            )}
          </View>
        </View>
      </ScrollView>

      {/* ŞEHİR DEĞİŞTİR MODAL */}
      <Modal visible={cityModalVisible} transparent animationType="slide"
        onRequestClose={() => setCityModalVisible(false)}>
        <TouchableOpacity style={styles.modalBg} activeOpacity={1}
          onPress={() => setCityModalVisible(false)}>
          <TouchableOpacity style={styles.modalSheet} activeOpacity={1}>
            <Text style={styles.modalTitle}>{t('home.change_city')}</Text>
            <View style={styles.modalRow}>
              <TextInput
                style={styles.modalInput}
                placeholder={t('home.city')}
                value={cityInput}
                onChangeText={setCityInput}
                placeholderTextColor={colors.ink4}
              />
              <TextInput
                style={[styles.modalInput, { flex: 0, width: 70 }]}
                placeholder={t('home.country')}
                value={countryInput}
                onChangeText={setCountryInput}
                placeholderTextColor={colors.ink4}
                autoCapitalize="characters"
                maxLength={2}
              />
            </View>
            <TouchableOpacity style={styles.modalSubmit} onPress={handleCityChange}>
              <Text style={styles.modalSubmitText}>{t('home.update')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCityModalVisible(false)}>
              <Text style={styles.modalCancel}>{t('home.cancel')}</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingText: { marginTop: 12, fontSize: 14, color: colors.ink4, fontFamily: fonts.dmSans },
  retryBtn: { marginTop: 16, backgroundColor: colors.forest, paddingHorizontal: 24, paddingVertical: 12, borderRadius: radius.r2 },
  retryText: { color: '#fff', fontFamily: fonts.dmSansSemiBold },

  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.md, paddingVertical: 13,
    backgroundColor: 'rgba(247,242,232,0.95)',
    borderBottomWidth: 1, borderBottomColor: colors.cream3,
  },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  brandTitle: { fontFamily: fonts.playfair, fontSize: 17, color: colors.forest },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  cityBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: colors.white, borderWidth: 1, borderColor: colors.cream3,
    borderRadius: 30, paddingHorizontal: 11, paddingVertical: 6,
    maxWidth: 140,
  },
  cityBtnText: { fontSize: 12.5, fontFamily: fonts.dmSansMedium, color: colors.forest2 },

  periodCard: {
    backgroundColor: colors.white, borderRadius: radius.r3,
    padding: 18, borderWidth: 1, borderColor: colors.cream3,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 12, elevation: 4,
  },
  kerahatCard: {
    backgroundColor: '#FFF8F5',
    borderColor: 'rgba(192,57,43,0.12)',
  },
  periodTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  periodNameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  periodIcon: { fontSize: 20 },
  periodTitle: { fontFamily: fonts.playfair, fontSize: 17, color: colors.forest, lineHeight: 22 },
  badge: { backgroundColor: colors.sage3, borderRadius: 30, paddingHorizontal: 11, paddingVertical: 4 },
  badgeUrgent: { backgroundColor: colors.dangerBg },
  badgeWarn: { backgroundColor: colors.warnBg },
  badgeText: { fontSize: 11.5, fontFamily: fonts.dmSansSemiBold, color: colors.forest2 },
  badgeTextUrgent: { color: colors.danger },
  badgeTextWarn: { color: colors.warn },
  kerahatNotice: { backgroundColor: colors.dangerBg, borderRadius: radius.r1, padding: 10, marginBottom: 12 },
  kerahatText: { fontSize: 12.5, color: colors.danger, fontFamily: fonts.dmSansMedium },
  periodDesc: { fontSize: 13, color: colors.ink3, lineHeight: 21, marginBottom: 14, fontFamily: fonts.dmSans },
  periodFooter: { borderTopWidth: 1, borderTopColor: colors.cream3, paddingTop: 12, marginTop: 12 },
  periodFooterText: { fontSize: 11.5, color: colors.ink4, fontFamily: fonts.dmSans },

  locGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  locCard: {
    width: '30%', backgroundColor: colors.white, borderWidth: 1.5,
    borderColor: colors.cream3, borderRadius: radius.r2,
    paddingVertical: 13, paddingHorizontal: 4, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  locCardActive: { borderColor: colors.forest2, backgroundColor: '#EAF5EE' },
  locIcon: { fontSize: 22, marginBottom: 5 },
  locName: { fontSize: 11, fontFamily: fonts.dmSansSemiBold, color: colors.ink2, textAlign: 'center' },
  locNameActive: { color: colors.forest2 },

  todayCard: {
    backgroundColor: colors.white, borderRadius: radius.r3,
    padding: 16, borderWidth: 1, borderColor: colors.cream3,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 12, elevation: 4,
  },
  todayBadge: {
    backgroundColor: colors.forest, borderRadius: 30,
    paddingHorizontal: 12, paddingVertical: 5, alignSelf: 'flex-start', marginBottom: 10,
  },
  todayBadgeText: { fontSize: 12, fontFamily: fonts.dmSansSemiBold, color: '#fff' },
  todaySpecial: {
    fontSize: 12, color: colors.ink3, lineHeight: 19,
    backgroundColor: colors.cream, borderRadius: radius.r1,
    padding: 9, marginBottom: 10, fontFamily: fonts.dmSans,
  },
  fastingRow: {
    flexDirection: 'row', alignItems: 'center', gap: 9,
    backgroundColor: colors.gold4, borderWidth: 1, borderColor: 'rgba(184,146,14,0.2)',
    borderRadius: radius.r1, padding: 9, marginBottom: 10,
  },
  fastingIcon: { fontSize: 20 },
  fastingTitle: { fontSize: 12.5, fontFamily: fonts.dmSansSemiBold, color: colors.gold },
  fastingSub: { fontSize: 11, color: colors.ink3, fontFamily: fonts.dmSans },
  hspecBadge: {
    backgroundColor: 'rgba(184,146,14,0.08)', borderWidth: 1, borderColor: 'rgba(184,146,14,0.15)',
    borderRadius: radius.r1, padding: 9, marginBottom: 10,
  },
  hspecText: { fontSize: 12, fontFamily: fonts.dmSansSemiBold, color: colors.gold },
  noAmel: { fontSize: 13, color: colors.ink4, textAlign: 'center', padding: 14, fontFamily: fonts.dmSans },

  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalSheet: {
    backgroundColor: colors.white, borderTopLeftRadius: radius.r4,
    borderTopRightRadius: radius.r4, padding: 22, paddingBottom: 36,
  },
  modalTitle: { fontFamily: fonts.playfair, fontSize: 18, color: colors.forest, marginBottom: 16 },
  modalRow: { flexDirection: 'row', gap: 8, marginBottom: 13 },
  modalInput: {
    flex: 1, padding: 11, borderWidth: 1.5, borderColor: colors.cream3,
    borderRadius: radius.r2, fontSize: 14, color: colors.ink,
    fontFamily: fonts.dmSans, backgroundColor: colors.cream,
  },
  modalSubmit: {
    backgroundColor: colors.forest, borderRadius: radius.r2,
    padding: 13, alignItems: 'center',
  },
  modalSubmitText: { color: '#fff', fontSize: 15, fontFamily: fonts.dmSansSemiBold },
  modalCancel: { textAlign: 'center', color: colors.ink4, fontSize: 14, marginTop: 8, padding: 8, fontFamily: fonts.dmSans },
  
  suggestionCard: {
    backgroundColor: colors.white, borderRadius: radius.r3,
    padding: 16, borderLeftWidth: 4, borderLeftColor: colors.gold,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 8, elevation: 3,
  },
  suggestionHeader: { flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 12 },
  suggestionIcon: { fontSize: 18 },
  suggestionTitle: { fontFamily: fonts.playfair, fontSize: 15, color: colors.forest },
});
