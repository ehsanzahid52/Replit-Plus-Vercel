import { useState } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'wouter';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguageFromUrl } from './LanguageRouter';

interface NavigationProps {
  currentPage?: 'home' | 'features' | 'results' | 'pricing' | 'insights' | 'analysis' | 'tools' | 'support' | 'signals-app' | 'terms' | 'privacy';
}

export default function Navigation({ currentPage = 'home' }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  const [location, setLocation] = useLocation();
  const currentLang = useLanguageFromUrl();

  // Device detection and app download logic
  const detectDevice = () => {
    const userAgent = navigator.userAgent || navigator.vendor;
    
    if (/iPad|iPhone|iPod/.test(userAgent)) {
      return 'ios';
    }
    
    if (/android/i.test(userAgent)) {
      return 'android';
    }
    
    // Default to Android for unknown devices
    return 'android';
  };

  const handleGetApp = () => {
    const device = detectDevice();
    
    if (device === 'ios') {
      window.open('https://apps.apple.com/us/app/gold-sniper-xauusd-signals/id1585302472', '_blank');
    } else {
      window.open('https://play.google.com/store/apps/details?id=com.tate.goldsniper&hl=en_GB', '_blank');
    }
  };

  const createLanguagePath = (path: string) => {
    return `/${currentLang}${path}`;
  };

  const isActivePage = (page: string) => {
    const currentPath = location;
    if (page === 'home') {
      return currentPath === `/${currentLang}` || currentPath === '/';
    }
    return currentPath === `/${currentLang}/${page}` || currentPath === `/${page}`;
  };

  return (
    <header className="bg-black/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-800 relative">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a 
            href={createLanguagePath('')}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <img 
              src="/goldsniper-logo.png" 
              alt="GoldSniper Logo" 
              className="w-10 h-10 object-contain rounded-full" 
            />
            <span className="text-lg sm:text-xl font-bold text-white whitespace-nowrap">GOLDSNIPER</span>
          </a>
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex items-center space-x-6">
              <a 
                href={createLanguagePath('')}
                className={`transition-colors ${isActivePage('home') ? 'text-[color:var(--brand-orange)] font-semibold' : 'text-gray-300 hover:text-[color:var(--brand-orange)]'}`}
              >
                {t('nav.home')}
              </a>
              <a 
                href={createLanguagePath('/signals-app')}
                className={`transition-colors ${isActivePage('signals-app') ? 'text-[color:var(--brand-orange)] font-semibold' : 'text-gray-300 hover:text-[color:var(--brand-orange)]'}`}
              >
                {t('nav.signalsApp')}
              </a>
              <a 
                href={createLanguagePath('/results')}
                className={`transition-colors ${isActivePage('results') ? 'text-[color:var(--brand-orange)] font-semibold' : 'text-gray-300 hover:text-[color:var(--brand-orange)]'}`}
              >
                {t('nav.performance')}
              </a>
              <a 
                href={createLanguagePath('/analysis')}
                className={`transition-colors ${isActivePage('analysis') ? 'text-[color:var(--brand-orange)] font-semibold' : 'text-gray-300 hover:text-[color:var(--brand-orange)]'}`}
              >
                {t('nav.analysis', 'Analysis')}
              </a>
              <a 
                href={createLanguagePath('/tools')}
                className={`transition-colors ${isActivePage('tools') ? 'text-[color:var(--brand-orange)] font-semibold' : 'text-gray-300 hover:text-[color:var(--brand-orange)]'}`}
              >
                {t('nav.tools', 'Tools')}
              </a>
              <a 
                href={createLanguagePath('/support')}
                className={`transition-colors ${isActivePage('support') ? 'text-[color:var(--brand-orange)] font-semibold' : 'text-gray-300 hover:text-[color:var(--brand-orange)]'}`}
              >
                {t('nav.support')}
              </a>
            </nav>
            
            {/* Get app button (mobile only) */}
            <button 
              className="md:hidden text-white hover:text-[color:var(--brand-orange)] transition-colors flex items-center space-x-1 text-xs font-medium mr-3 h-10 px-3 rounded-lg hover:bg-gray-800"
              onClick={handleGetApp}
              aria-label="Download app"
            >
              <Download className="w-3 h-3" />
              <span>Get app</span>
            </button>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-white hover:text-[color:var(--brand-orange)] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
        
        {/* Mobile menu overlay */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Mobile menu */}
            <div className="absolute top-full left-0 right-0 bg-gray-900 border-t border-gray-800 z-50 md:hidden">
              <div className="px-6 py-4 space-y-4 text-center">
                <a 
                  href={createLanguagePath('')}
                  className={`block text-lg transition-colors ${isActivePage('home') ? 'text-[color:var(--brand-orange)] font-semibold' : 'text-gray-300'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav.home')}
                </a>
                <a 
                  href={createLanguagePath('/signals-app')}
                  className={`block text-lg transition-colors ${isActivePage('signals-app') ? 'text-[color:var(--brand-orange)] font-semibold' : 'text-gray-300'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav.signalsApp')}
                </a>
                <a 
                  href={createLanguagePath('/results')}
                  className={`block text-lg transition-colors ${isActivePage('results') ? 'text-[color:var(--brand-orange)] font-semibold' : 'text-gray-300'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav.performance')}
                </a>
                <a 
                  href={createLanguagePath('/analysis')}
                  className={`block text-lg transition-colors ${isActivePage('analysis') ? 'text-[color:var(--brand-orange)] font-semibold' : 'text-gray-300'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav.analysis', 'Analysis')}
                </a>
                <a 
                  href={createLanguagePath('/tools')}
                  className={`block text-lg transition-colors ${isActivePage('tools') ? 'text-[color:var(--brand-orange)] font-semibold' : 'text-gray-300'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav.tools', 'Tools')}
                </a>
                <a 
                  href={createLanguagePath('/support')}
                  className={`block text-lg transition-colors ${isActivePage('support') ? 'text-[color:var(--brand-orange)] font-semibold' : 'text-gray-300'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav.support')}
                </a>
                
                <div className="pt-4 border-t border-gray-700 flex flex-col items-center space-y-2">
                  <div className="text-xs text-gray-400 uppercase tracking-wide">Language</div>
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
