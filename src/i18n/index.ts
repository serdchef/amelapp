import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';

import tr from './locales/tr.json';
import en from './locales/en.json';
import ar from './locales/ar.json';
import ur from './locales/ur.json';
import hi from './locales/hi.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import id from './locales/id.json';

const resources = {
  tr: { translation: tr },
  en: { translation: en },
  ar: { translation: ar },
  ur: { translation: ur },
  hi: { translation: hi },
  es: { translation: es },
  fr: { translation: fr },
  id: { translation: id },
};

const LANGUAGE_KEY = 'user-language';
const RTL_LANGUAGES = ['ar', 'ur'];

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
  
  if (!savedLanguage) {
    const locale = Localization.getLocales()[0];
    savedLanguage = locale.languageCode;
  }

  // Varsayılan dili kontrol et
  if (!Object.keys(resources).includes(savedLanguage)) {
    savedLanguage = 'en';
  }

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: savedLanguage,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });

  // RTL Kontrolü
  const isRTL = RTL_LANGUAGES.includes(savedLanguage);
  if (isRTL !== I18nManager.isRTL) {
    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);
  }
};

initI18n();

export default i18n;
