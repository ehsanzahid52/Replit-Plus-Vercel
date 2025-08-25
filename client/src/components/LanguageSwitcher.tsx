import React, { useState } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { supportedLanguages } from '../i18n';
import { useLanguageChange, useLanguageFromUrl } from './LanguageRouter';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const changeLanguage = useLanguageChange();
  const currentLanguage = useLanguageFromUrl();
  const currentLangData = supportedLanguages[currentLanguage as keyof typeof supportedLanguages];

  const handleLanguageChange = (language: string) => {
    changeLanguage(language);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-white hover:text-[color:var(--brand-orange)] hover:bg-gray-800 transition-colors h-10 px-3"
      >
        <Globe className="w-4 h-4" />
        <span className="text-lg">{currentLangData?.flag}</span>
        <span className="inline sm:hidden text-sm">{currentLangData?.name}</span>
        <span className="hidden sm:inline">{currentLangData?.name}</span>
        <ChevronDown className="w-4 h-4" />
      </Button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 min-w-[180px]">
            {Object.entries(supportedLanguages).map(([code, data]) => (
              <button
                key={code}
                onClick={() => handleLanguageChange(code)}
                className={`w-full px-4 py-3 text-left flex items-center space-x-3 hover:bg-gray-800 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                  currentLanguage === code ? 'bg-gray-800 text-[color:var(--brand-orange)]' : 'text-white'
                }`}
              >
                <span className="text-lg">{data.flag}</span>
                <span>{data.name}</span>
                {currentLanguage === code && (
                  <span className="ml-auto text-[color:var(--brand-orange)]">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}