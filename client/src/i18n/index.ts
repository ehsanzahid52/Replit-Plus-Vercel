import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

import enTranslation from './locales/en.json';
import esTranslation from './locales/es.json';
import frTranslation from './locales/fr.json';
import deTranslation from './locales/de.json';
import arTranslation from './locales/ar.json';
import zhTranslation from './locales/zh.json';

export const supportedLanguages = {
  en: { name: 'English', flag: '🇺🇸' },
  es: { name: 'Español', flag: '🇪🇸' },
  fr: { name: 'Français', flag: '🇫🇷' },
  de: { name: 'Deutsch', flag: '🇩🇪' },
  ar: { name: 'العربية', flag: '🇸🇦' },
  zh: { name: '中文', flag: '🇨🇳' }
};

export const defaultLanguage = 'en';

const resources = {
  en: { translation: enTranslation },
  es: { translation: esTranslation },
  fr: { translation: frTranslation },
  de: { translation: deTranslation },
  ar: { translation: arTranslation },
  zh: { translation: zhTranslation }
};

// Custom language detector for URL-based language detection
const customLanguageDetector = {
  name: 'customLanguageDetector',
  lookup() {
    // Check URL path first
    const path = window.location.pathname;
    const langMatch = path.match(/^\/([a-z]{2})(\/|$)/);
    if (langMatch && supportedLanguages[langMatch[1] as keyof typeof supportedLanguages]) {
      return langMatch[1];
    }
    
    // Fallback to localStorage
    const storedLang = localStorage.getItem('i18nextLng');
    if (storedLang && supportedLanguages[storedLang as keyof typeof supportedLanguages]) {
      return storedLang;
    }
    
    // Fallback to browser language
    const browserLang = navigator.language.split('-')[0];
    if (supportedLanguages[browserLang as keyof typeof supportedLanguages]) {
      return browserLang;
    }
    
    return defaultLanguage;
  },
  cacheUserLanguage(lng: string) {
    localStorage.setItem('i18nextLng', lng);
  }
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: defaultLanguage,
    debug: false,
    
    interpolation: {
      escapeValue: false
    },
    
    detection: {
      order: ['customLanguageDetector', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupFromPathIndex: 0
    },
    
    supportedLngs: Object.keys(supportedLanguages),
    
    react: {
      useSuspense: false
    }
  });

// Add custom language detector
i18n.services.languageDetector.addDetector(customLanguageDetector);

export default i18n;