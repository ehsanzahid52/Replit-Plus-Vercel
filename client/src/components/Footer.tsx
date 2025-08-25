import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguageFromUrl } from './LanguageRouter';
import AppStoreButtons from './ui/AppStoreButtons';

export default function Footer() {
  const { t } = useTranslation();
  const currentLanguage = useLanguageFromUrl();

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/goldsniper-logo.png" 
                alt="GoldSniper Logo" 
                className="w-12 h-12 object-contain rounded-full" 
              />
              <span className="text-2xl font-bold text-white">GOLDSNIPER</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com/goldsniper" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[color:var(--brand-orange)] transition-colors">
                <ExternalLink className="w-6 h-6" />
              </a>
              <a href="https://instagram.com/goldsniper" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[color:var(--brand-orange)] transition-colors">
                <ExternalLink className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com/company/goldsniper" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[color:var(--brand-orange)] transition-colors">
                <ExternalLink className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('footer.sections.appFeatures')}</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href={`/${currentLanguage}/signals-app`} className="hover:text-white transition-colors">{t('nav.signalsApp')}</a></li>
              <li><a href={`/${currentLanguage}/results`} className="hover:text-white transition-colors">{t('nav.performance')}</a></li>
              <li><a href={`/${currentLanguage}/analysis`} className="hover:text-white transition-colors">{t('nav.analysis', 'Analysis')}</a></li>
              <li><a href={`/${currentLanguage}/tools`} className="hover:text-white transition-colors">{t('nav.tools', 'Tools')}</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('footer.sections.support')}</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href={`/${currentLanguage}/support`} className="hover:text-white transition-colors">{t('footer.links.helpCenter')}</a></li>
              <li><a href={`/${currentLanguage}/support`} className="hover:text-white transition-colors">{t('common.contactSupport')}</a></li>
              <li><a href={`/${currentLanguage}/privacy`} className="hover:text-white transition-colors">{t('footer.links.privacy')}</a></li>
              <li><a href={`/${currentLanguage}/terms`} className="hover:text-white transition-colors">{t('footer.links.terms')}</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <p className="text-gray-400">{t('footer.copyright')}</p>
              <p className="text-sm text-gray-500 mt-1">{t('footer.disclaimer')}</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <AppStoreButtons platform="android" size="small" />
              <AppStoreButtons platform="ios" size="small" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}