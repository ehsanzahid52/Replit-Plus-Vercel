import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'wouter';
import { supportedLanguages } from '../i18n';
import { useLanguageFromUrl } from './LanguageRouter';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  pagePath?: string; // e.g., '/', '/signals-app'
}

export default function SEOHead({ 
  title, 
  description, 
  keywords, 
  canonical, 
  ogImage,
  pagePath = '/'
}: SEOHeadProps) {
  const { t } = useTranslation();
  const currentLanguage = useLanguageFromUrl();
  const [location] = useLocation();
  const baseUrl = 'https://goldsniper.io';

  // Detect section from URL
  const getSectionFromUrl = () => {
    const path = location;
    const sectionMatch = path.match(/\/([^\/]+)$/);
    return sectionMatch ? sectionMatch[1] : null;
  };

  const currentSection = getSectionFromUrl();

  // Get section-specific SEO data
  const getSectionSEO = () => {
    switch (currentSection) {
      case 'results':
      case 'performance':
        return {
          title: `${t('nav.performance')} - GoldSniper | Trading Performance & Results`,
          description: t('performance.subtitle') || 'View our trading performance and results. See how GoldSniper delivers consistent profits with 93% accuracy.',
          keywords: 'gold trading performance, XAUUSD results, trading accuracy, gold sniper performance, forex results'
        };
      case 'pricing':
        return {
          title: `${t('nav.pricing')} - GoldSniper | Free Trading Signals App`,
          description: t('download.subtitle') || 'Download GoldSniper for free and start receiving professional gold trading signals with 93% accuracy.',
          keywords: 'gold trading app download, free trading signals, XAUUSD app, gold sniper download'
        };
      case 'support':
        return {
          title: `${t('nav.support')} - GoldSniper | Trading Support & Insights`,
          description: 'Get trading support and insights from GoldSniper. Learn about gold market trends and trading strategies.',
          keywords: 'gold trading support, trading insights, XAUUSD analysis, gold market trends'
        };
      default:
        return {
          title: title || 'GoldSniper - #1 Gold Trading Signals App | 93% Accuracy XAUUSD',
          description: description || 'Get professional gold trading signals with 93% accuracy. Join thousands of successful XAUUSD traders using GoldSniper\'s proven signals and analysis.',
          keywords: keywords || 'gold trading signals, XAUUSD signals, gold sniper, trading app, forex signals, gold analysis, trading alerts'
        };
    }
  };

  const sectionSEO = getSectionSEO();
  const currentPath = currentSection ? `/${currentSection}` : pagePath;

  useEffect(() => {
    // Update document title
    if (sectionSEO.title) {
      document.title = sectionSEO.title;
    }

    // Update meta description
    if (sectionSEO.description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', sectionSEO.description);
      }
    }

    // Update keywords
    if (sectionSEO.keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', sectionSEO.keywords);
      }
    }

    // Update canonical URL with language and section
    const canonicalUrl = canonical || `${baseUrl}/${currentLanguage}${currentPath}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonicalUrl);
    }

    // Update language meta tag
    let langMeta = document.querySelector('meta[http-equiv="content-language"]');
    if (langMeta) {
      langMeta.setAttribute('content', currentLanguage);
    }

    // Update hreflang tags for all supported languages
    const updateHreflangTags = () => {
      // Remove existing hreflang tags
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(tag => {
        tag.remove();
      });

      // Add hreflang tags for all languages
      Object.keys(supportedLanguages).forEach(lang => {
        const link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = lang;
        link.href = `${baseUrl}/${lang}${currentPath}`;
        document.head.appendChild(link);
      });

      // Add x-default hreflang
      const xDefaultLink = document.createElement('link');
      xDefaultLink.rel = 'alternate';
      xDefaultLink.hreflang = 'x-default';
      xDefaultLink.href = `${baseUrl}/en${currentPath}`;
      document.head.appendChild(xDefaultLink);
    };

    updateHreflangTags();

    // Update Open Graph tags
    if (sectionSEO.title) {
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', sectionSEO.title);
      }
    }

    if (sectionSEO.description) {
      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute('content', sectionSEO.description);
      }
    }

    const ogUrl = canonical || `${baseUrl}/${currentLanguage}${currentPath}`;
    let ogUrlMeta = document.querySelector('meta[property="og:url"]');
    if (ogUrlMeta) {
      ogUrlMeta.setAttribute('content', ogUrl);
    }

    if (ogImage) {
      let ogImg = document.querySelector('meta[property="og:image"]');
      if (ogImg) {
        ogImg.setAttribute('content', ogImage);
      } else {
        // Create OG image meta tag if it doesn't exist
        const newOgImg = document.createElement('meta');
        newOgImg.setAttribute('property', 'og:image');
        newOgImg.setAttribute('content', ogImage);
        document.head.appendChild(newOgImg);
      }

      // Also update Twitter image
      let twitterImg = document.querySelector('meta[name="twitter:image"]');
      if (twitterImg) {
        twitterImg.setAttribute('content', ogImage);
      } else {
        // Create Twitter image meta tag if it doesn't exist
        const newTwitterImg = document.createElement('meta');
        newTwitterImg.setAttribute('name', 'twitter:image');
        newTwitterImg.setAttribute('content', ogImage);
        document.head.appendChild(newTwitterImg);
      }
    }

    // Update og:locale
    let ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) {
      ogLocale.setAttribute('content', currentLanguage);
    }

  }, [sectionSEO.title, sectionSEO.description, sectionSEO.keywords, canonical, ogImage, currentPath, currentLanguage, baseUrl, currentSection, pagePath, t]);

  return null;
}