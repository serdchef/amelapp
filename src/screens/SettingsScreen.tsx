import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, I18nManager, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, fonts, spacing, radius, globalStyles } from '../constants/theme';
import { useAppStore } from '../store/appStore';

const LANGUAGES = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'ur', name: 'اردو', flag: '🇵🇰' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'id', name: 'Indonesia', flag: '🇮🇩' },
];

const LANGUAGE_KEY = 'user-language';
const RTL_LANGUAGES = ['ar', 'ur'];

const CALC_METHODS = [
  { id: 13, name: 'Diyanet (Turkey)' },
  { id: 4,  name: 'Umm al-Qura (Makkah)' },
  { id: 2,  name: 'ISNA (North America)' },
  { id: 3,  name: 'MWL (World League)' },
  { id: 5,  name: 'Egypt Authority' },
  { id: 1,  name: 'Karachi University' },
  { id: 12, name: 'France (UOIF)' },
  { id: 14, name: 'Russia (SAMR)' },
  { id: 0,  name: 'Shia Ithna-Ashari' },
];

const SCHOOLS = [
  { id: 0, name: 'Standard / Shafi / Maliki' },
  { id: 1, name: 'Hanafi' },
];

export default function SettingsScreen() {
  const { t, i18n } = useTranslation();
  const store = useAppStore();

  // Yerel State (Onay butonuna basana kadar store'u güncellemez)
  const [localLng, setLocalLng]       = React.useState(i18n.language);
  const [localMethod, setLocalMethod] = React.useState(store.calculationMethod);
  const [localSchool, setLocalSchool] = React.useState(store.asrMethod);

  const handleSave = async () => {
    // 1) Dil Değişimi
    if (localLng !== i18n.language) {
      const isRTL = RTL_LANGUAGES.includes(localLng);
      await i18n.changeLanguage(localLng);
      await AsyncStorage.setItem(LANGUAGE_KEY, localLng);
      
      if (isRTL !== I18nManager.isRTL) {
        I18nManager.allowRTL(isRTL);
        I18nManager.forceRTL(isRTL);
        if (Platform.OS === 'web') window.location.reload();
        else Alert.alert(t('common.info'), t('settings.restart_required'));
      }
    }

    // 2) Metod ve Mezhep Güncelleme
    store.setCalculationMethod(localMethod);
    store.setAsrMethod(localSchool);

    Alert.alert(t('common.success'), t('settings.applied_success'));
  };

  return (
    <SafeAreaView style={globalStyles.screen}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>{t('settings.title')}</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('settings.language')}</Text>
          {LANGUAGES.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.langItem,
                localLng === lang.code && styles.langItemActive
              ]}
              onPress={() => setLocalLng(lang.code)}
            >
              <Text style={styles.langFlag}>{lang.flag}</Text>
              <Text style={styles.langName}>{lang.name}</Text>
              {localLng === lang.code && <Text style={styles.check}>✓</Text>}
            </TouchableOpacity>
          ))}
        </View>
        <View style={[styles.section, { marginTop: spacing.md }]}>
          <Text style={styles.sectionTitle}>{t('settings.calc_method')}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
            {CALC_METHODS.map((m) => (
              <TouchableOpacity
                key={m.id}
                style={[styles.chip, localMethod === m.id && styles.chipActive]}
                onPress={() => setLocalMethod(m.id)}
              >
                <Text style={[styles.chipText, localMethod === m.id && styles.chipTextActive]}>
                  {m.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={[styles.section, { marginTop: spacing.md }]}>
          <Text style={styles.sectionTitle}>{t('settings.school')}</Text>
          <View style={styles.schoolRow}>
            {SCHOOLS.map((s) => (
              <TouchableOpacity
                key={s.id}
                style={[styles.schoolBtn, localSchool === s.id && styles.schoolBtnActive]}
                onPress={() => setLocalSchool(s.id)}
              >
                <Text style={[styles.schoolText, localSchool === s.id && styles.schoolTextActive]}>
                  {s.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

        {/* KAYDET BUTONU */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.8}>
          <Text style={styles.saveBtnText}>{t('settings.save_btn')}</Text>
        </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.version}>{t('settings.version')}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: spacing.lg },
  title: {
    fontFamily: fonts.playfair,
    fontSize: 24,
    color: colors.forest,
    marginBottom: spacing.xl,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: radius.r3,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.cream3,
  },
  sectionTitle: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 14,
    color: colors.ink4,
    marginBottom: spacing.md,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    textTransform: 'uppercase',
  },
  langItem: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.cream3,
  },
  langItemActive: {
    backgroundColor: colors.cream,
    borderRadius: radius.md,
  },
  langFlag: { fontSize: 24, marginHorizontal: spacing.sm },
  langName: {
    flex: 1,
    fontFamily: fonts.dmSans,
    fontSize: 15,
    color: colors.ink2,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  check: { color: colors.forest2, fontWeight: 'bold' },
  footer: { marginTop: spacing.xl, alignItems: 'center' },
  version: { fontFamily: fonts.dmSans, fontSize: 11, color: colors.ink4 },
  chipScroll: { marginHorizontal: -spacing.md, paddingHorizontal: spacing.md },
  chip: {
    backgroundColor: colors.cream,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.cream3,
  },
  chipActive: {
    backgroundColor: colors.forest,
    borderColor: colors.forest,
  },
  chipText: { fontSize: 12, color: colors.ink3, fontFamily: fonts.dmSansMedium },
  chipTextActive: { color: '#fff' },
  schoolRow: { flexDirection: 'row', gap: 10 },
  schoolBtn: {
    flex: 1,
    padding: 12,
    borderRadius: radius.md,
    backgroundColor: colors.cream,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cream3,
  },
  schoolBtnActive: {
    backgroundColor: colors.forest,
    borderColor: colors.forest,
  },
  schoolText: { fontSize: 13, color: colors.ink3, fontFamily: fonts.dmSansSemiBold },
  schoolTextActive: { color: '#fff' },
  saveBtn: {
    backgroundColor: colors.forest,
    marginTop: spacing.xl,
    borderRadius: radius.r2,
    padding: 16,
    alignItems: 'center',
    shadowColor: colors.forest,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  saveBtnText: {
    color: '#fff',
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
