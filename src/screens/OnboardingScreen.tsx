import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Dimensions, ScrollView, Platform, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, radius, spacing } from '../constants/theme';
import { requestAndGetLocation } from '../services/locationService';
import { requestNotificationPermission } from '../services/notificationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { I18nManager } from 'react-native';

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

const CONTINUE_TEXTS: Record<string, string> = {
  tr: 'Devam Et',
  en: 'Continue',
  ar: 'استمرار',
  ur: 'آگے بڑھیں',
  hi: 'आगे बढ़ें',
  es: 'Continuar',
  fr: 'Continuer',
  id: 'Lanjutkan',
};

const LANGUAGE_KEY = 'user-language';
const RTL_LANGUAGES = ['ar', 'ur'];

const { width } = Dimensions.get('window');

export const ONBOARDED_KEY = 'FA_ONBOARDED';

interface Slide {
  emoji: string;
  title: string;
  subtitle: string;
  cta?: string;
  ctaAction?: () => Promise<void> | void;
  skip?: boolean;
}

interface Props {
  onDone: () => void;
}

export default function OnboardingScreen({ onDone }: Props) {
  const { t, i18n } = useTranslation();
  const [page, setPage] = useState(0);
  const [selectedLng, setSelectedLng] = useState(i18n.language);
  const [locGranted, setLocGranted] = useState<boolean | null>(null);
  const [notifGranted, setNotifGranted] = useState<boolean | null>(null);

  // page'i AsyncStorage'dan yükle - i18n re-render'larına karşı koruma
  useEffect(() => {
    AsyncStorage.getItem('FA_ONBOARD_PAGE').then((val) => {
      if (val && val !== '0') setPage(parseInt(val));
    });
  }, []);

  async function finish() {
    await AsyncStorage.setItem(ONBOARDED_KEY, 'true');
    onDone();
  }

  async function handleLocationRequest() {
    const result = await requestAndGetLocation();
    setLocGranted(result !== null);
    goNext();
  }

  async function handleNotificationRequest() {
    const granted = await requestNotificationPermission();
    setNotifGranted(granted);
    await finish();
  }

  async function handleLanguageChange(lng: string) {
    // Sadece local state'i güncelle, i18n'e dokunma (re-render'a neden olur)
    setSelectedLng(lng);
  }

  async function handleLanguageConfirm() {
    try {
      const lng = selectedLng;
      // Önce sayfayı ilerlet (state kaybı olmasın diye)
      await AsyncStorage.setItem('FA_ONBOARD_PAGE', '1');
      await AsyncStorage.setItem(LANGUAGE_KEY, lng);
      // Sonra dili değiştir
      await i18n.changeLanguage(lng);
    } catch (e) {
      console.error('handleLanguageConfirm error:', e);
    }
    setPage(1);
  }

  function goNext() {
    const next = page + 1;
    setPage(next);
  }

  const slides: Slide[] = [
    {
      emoji: '🌐',
      title: 'Choose Language / Dil Seçin',
      subtitle: 'Please select your preferred language to continue.\nLütfen devam etmek için dil seçiminizi yapın.',
      cta: t('common.continue', 'Continue / Devam Et'),
      ctaAction: goNext,
    },
    {
      emoji: '🕌',
      title: t('onboarding.welcome_title'),
      subtitle: t('onboarding.welcome_subtitle'),
      cta: t('onboarding.start'),
      ctaAction: goNext,
    },
    {
      emoji: '📍',
      title: t('onboarding.location_title'),
      subtitle: t('onboarding.location_subtitle'),
      cta: t('onboarding.location_btn'),
      ctaAction: handleLocationRequest,
      skip: true,
    },
    {
      emoji: '🔔',
      title: t('onboarding.notif_title'),
      subtitle: t('onboarding.notif_subtitle'),
      cta: t('onboarding.notif_btn'),
      ctaAction: handleNotificationRequest,
      skip: true,
    },
  ];

  const current = slides[page];

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.slideContainer}>
        <View style={styles.slide}>
          <View style={styles.bgRing1} />
          <View style={styles.bgRing2} />

          {/* SAYFA 0: DİL SEÇİMİ */}
          {page === 0 && (
            <>
              <View style={styles.emojiWrap}><Text style={styles.emoji}>🌐</Text></View>
              <Text style={styles.title}>{t('onboarding.choose_language')}</Text>
              <Text style={styles.subtitle}>{t('onboarding.select_lang_desc')}</Text>
              <View style={styles.langGrid}>
                {LANGUAGES.map((l) => (
                  <TouchableOpacity
                    key={l.code}
                    style={[styles.langBtn, selectedLng === l.code && styles.langBtnActive]}
                    onPress={() => handleLanguageChange(l.code)}
                  >
                    <Text style={styles.langFlag}>{l.flag}</Text>
                    <Text style={[styles.langName, selectedLng === l.code && styles.langNameActive]}>{l.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          {/* SAYFA 1: HOŞ GELDİNİZ */}
          {page === 1 && (
            <>
              <View style={styles.emojiWrap}><Text style={styles.emoji}>🕌</Text></View>
              <Text style={styles.title}>{t('onboarding.welcome_title')}</Text>
              <Text style={styles.subtitle}>{t('onboarding.welcome_subtitle')}</Text>
            </>
          )}

          {/* SAYFA 2: KONUM */}
          {page === 2 && (
            <>
              <View style={styles.emojiWrap}><Text style={styles.emoji}>📍</Text></View>
              <Text style={styles.title}>{t('onboarding.location_title')}</Text>
              <Text style={styles.subtitle}>{t('onboarding.location_subtitle')}</Text>
            </>
          )}

          {/* SAYFA 3: BİLDİRİM */}
          {page === 3 && (
            <>
              <View style={styles.emojiWrap}><Text style={styles.emoji}>🔔</Text></View>
              <Text style={styles.title}>{t('onboarding.notif_title')}</Text>
              <Text style={styles.subtitle}>{t('onboarding.notif_subtitle')}</Text>
            </>
          )}
        </View>
      </View>

      {/* ─── Alt panel ─── */}
      <View style={styles.footer}>
        {/* Sayfa noktaları */}
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View key={i} style={[styles.dot, i === page && styles.dotActive]} />
          ))}
        </View>

        {/* Ana buton */}
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            if (page === 0) {
              handleLanguageConfirm(); // Bu artık goNext'i içinde çağırıyor
            } else if (page === 1) {
              goNext();
            } else if (page === 2) {
              handleLocationRequest();
            } else if (page === 3) {
              handleNotificationRequest();
            }
          }}
          activeOpacity={0.85}
        >
          <Text style={styles.btnText}>
            {page === 0 ? (CONTINUE_TEXTS[selectedLng] || 'Continue') : 
             page === 1 ? t('onboarding.start') :
             page === 2 ? t('onboarding.location_btn') :
             t('onboarding.notif_btn')}
          </Text>
        </TouchableOpacity>

        {/* Atla */}
        {current.skip && (
          <TouchableOpacity
            onPress={page === slides.length - 1 ? finish : goNext}
            style={styles.skipBtn}
          >
            <Text style={styles.skipText}>
              {page === slides.length - 1 ? t('common.not_now') : t('common.skip')}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  slideContainer: {
    flex: 1,
  },
  slide: {
    width,
    flex: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  bgRing1: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 160,
    borderWidth: 1,
    borderColor: 'rgba(27,58,40,0.06)',
    top: -80,
    right: -80,
  },
  bgRing2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(184,146,14,0.08)',
    bottom: 100,
    left: -60,
  },
  emojiWrap: {
    width: 100,
    height: 100,
    borderRadius: 28,
    backgroundColor: colors.forest,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    shadowColor: colors.forest,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  emoji: {
    fontSize: 42,
  },
  title: {
    fontFamily: fonts.playfair,
    fontSize: 28,
    color: colors.forest,
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 18,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontFamily: fonts.dmSans,
    fontSize: 15,
    color: colors.ink3,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 320,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: Platform.OS === 'ios' ? 32 : 24,
    paddingTop: 12,
    alignItems: 'center',
  },
  dots: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 24,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.cream3,
  },
  dotActive: {
    width: 20,
    backgroundColor: colors.forest,
  },
  btn: {
    width: '100%',
    backgroundColor: colors.forest,
    borderRadius: radius.r3,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: colors.forest,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  btnText: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 16,
    color: '#fff',
    letterSpacing: 0.2,
  },
  skipBtn: {
    marginTop: 14,
    paddingVertical: 8,
  },
  skipText: {
    fontFamily: fonts.dmSansMedium,
    fontSize: 14,
    color: colors.ink4,
  },
  langGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 20,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  langBtn: {
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: radius.r1,
    borderWidth: 1,
    borderColor: colors.cream3,
  },
  langBtnActive: {
    borderColor: colors.forest,
    backgroundColor: colors.sage3,
  },
  langFlag: { fontSize: 18, marginRight: 8 },
  langName: { fontSize: 13, fontFamily: fonts.dmSansMedium, color: colors.forest },
  langNameActive: { fontFamily: fonts.dmSansSemiBold },
});
