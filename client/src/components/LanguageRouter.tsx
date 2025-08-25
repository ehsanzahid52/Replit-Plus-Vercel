import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import { supportedLanguages, defaultLanguage } from '../i18n';

interface LanguageRouterProps {
  children: React.ReactNode;
}

export default function LanguageRouter({ children }: LanguageRouterProps) {
  const [location, setLocation] = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    // Check if current URL has a language prefix
    const path = location;
    const langMatch = path.match(/^\/([a-z]{2})(\/|$)/);
    
    if (langMatch) {
      const urlLang = langMatch[1];
      if (supportedLanguages[urlLang as keyof typeof supportedLanguages]) {
        // URL has valid language, set it
        if (i18n.language !== urlLang) {
          i18n.changeLanguage(urlLang);
        }
      } else {
        // Invalid language in URL, redirect to default
        const newPath = path.replace(/^\/[a-z]{2}/, '');
        setLocation(`/${defaultLanguage}${newPath}`);
      }
    } else if (path !== '/') {
      // No language in URL, redirect to default language
      const newPath = path === '/' ? '' : path;
      setLocation(`/${defaultLanguage}${newPath}`);
    } else {
      // Root path, redirect to default language
      setLocation(`/${defaultLanguage}`);
    }
  }, [location, i18n, setLocation]);

  return <>{children}</>;
}

// Hook to get current language from URL
export function useLanguageFromUrl(): string {
  const [location] = useLocation();
  const langMatch = location.match(/^\/([a-z]{2})(\/|$)/);
  return langMatch ? langMatch[1] : defaultLanguage;
}

// Hook to change language with URL update
export function useLanguageChange() {
  const [location, setLocation] = useLocation();
  const { i18n } = useTranslation();

  const changeLanguage = (newLang: string) => {
    if (!supportedLanguages[newLang as keyof typeof supportedLanguages]) {
      return;
    }

    // Update i18n language
    i18n.changeLanguage(newLang);

    // Update URL
    const currentPath = location;
    const pathWithoutLang = currentPath.replace(/^\/[a-z]{2}/, '');
    const newPath = `/${newLang}${pathWithoutLang}`;
    
    setLocation(newPath);
  };

  return changeLanguage;
}
