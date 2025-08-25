import { supportedLanguages, defaultLanguage } from '../i18n';

/**
 * Get the current language from URL
 */
export function getLanguageFromUrl(): string {
  const path = window.location.pathname;
  const langMatch = path.match(/^\/([a-z]{2})(\/|$)/);
  return langMatch ? langMatch[1] : defaultLanguage;
}

/**
 * Check if a language code is supported
 */
export function isSupportedLanguage(lang: string): boolean {
  return Object.keys(supportedLanguages).includes(lang);
}

/**
 * Get language data by code
 */
export function getLanguageData(lang: string) {
  return supportedLanguages[lang as keyof typeof supportedLanguages];
}

/**
 * Get all supported language codes
 */
export function getSupportedLanguages(): string[] {
  return Object.keys(supportedLanguages);
}

/**
 * Update URL with new language
 */
export function updateUrlWithLanguage(newLang: string): void {
  if (!isSupportedLanguage(newLang)) {
    return;
  }

  const currentPath = window.location.pathname;
  const pathWithoutLang = currentPath.replace(/^\/[a-z]{2}/, '');
  const newPath = `/${newLang}${pathWithoutLang}`;
  
  window.history.pushState({}, '', newPath);
}

/**
 * Get the path without language prefix
 */
export function getPathWithoutLanguage(): string {
  const path = window.location.pathname;
  return path.replace(/^\/[a-z]{2}/, '') || '/';
}