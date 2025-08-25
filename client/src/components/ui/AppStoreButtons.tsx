import { Button } from '@/components/ui/button';
import { SiApple, SiGoogleplay } from 'react-icons/si';
import { useTranslation } from 'react-i18next';

interface AppStoreButtonsProps {
  platform: 'ios' | 'android' | 'both';
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary';
  className?: string;
}

const AppStoreButtons: React.FC<AppStoreButtonsProps> = ({ 
  platform,
  size = 'medium',
  className = ''
}) => {
  const { t } = useTranslation();

  const handleDownloadClick = (platform: string) => {
    if (platform.includes('android')) {
      window.open('https://play.google.com/store/apps/details?id=com.tate.goldsniper&hl=en_GB', '_blank');
    } else if (platform.includes('ios')) {
      window.open('https://apps.apple.com/us/app/gold-sniper-xauusd-signals/id1585302472', '_blank');
    }
  };

  const buttonClasses = `
    font-bold rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 shadow-xl transform hover:scale-105
    ${size === 'small' ? 'py-2 px-4 text-sm' : ''}
    ${size === 'medium' ? 'py-4 px-6 text-base' : ''}
    ${size === 'large' ? 'py-5 px-8 text-lg' : ''}
    ${className}
  `;

  const renderAndroidButton = () => (
    <Button 
      onClick={() => handleDownloadClick('android')}
      className={`bg-green-600 hover:bg-green-700 text-white ${buttonClasses}`}
    >
      <SiGoogleplay className={`${size === 'small' ? 'w-4 h-4' : size === 'medium' ? 'w-5 h-5' : 'w-6 h-6'}`} />
      <span>{t('common.downloadFor', { platform: 'Google Play' })}</span>
    </Button>
  );

  const renderIOSButton = () => (
    <Button 
      onClick={() => handleDownloadClick('ios')}
      className={`bg-black hover:bg-gray-900 text-white border-2 border-gray-700 ${buttonClasses}`}
    >
      <SiApple className={`${size === 'small' ? 'w-4 h-4' : size === 'medium' ? 'w-5 h-5' : 'w-6 h-6'}`} />
      <span>{t('common.downloadFor', { platform: 'App Store' })}</span>
    </Button>
  );

  if (platform === 'both') {
    return (
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {renderAndroidButton()}
        {renderIOSButton()}
      </div>
    );
  }

  if (platform === 'android') {
    return renderAndroidButton();
  }

  return renderIOSButton();
};

export default AppStoreButtons;
