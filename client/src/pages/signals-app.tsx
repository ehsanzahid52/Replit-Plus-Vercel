import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Bell, Shield, Smartphone, Activity, TrendingUp, ArrowUp, ArrowDown, DollarSign, BarChart3, Globe, Crosshair, ExternalLink, Award, X, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'wouter';
import Navigation from '../components/Navigation';
import SEOHead from '../components/SEOHead';
import FAQ from '../components/FAQ';
import { useLanguageFromUrl } from '../components/LanguageRouter';
import AppStoreButtons from '../components/ui/AppStoreButtons';

export default function SignalsApp() {
  const { t } = useTranslation();
  const currentLanguage = useLanguageFromUrl();
  const [, setLocation] = useLocation();

  const handleResultsClick = () => {
    setLocation(`/${currentLanguage}/results`);
  };

  const handleSupportClick = () => {
    setLocation(`/${currentLanguage}/support`);
  };

  const handleAnalysisClick = () => {
    setLocation(`/${currentLanguage}/analysis`);
  };

  // Ensure fade-in elements become visible when they enter the viewport
  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SEOHead 
        title={`${t('nav.signalsApp')} - GoldSniper`}
        description="Download GoldSniper for professional XAUUSD trading signals, real-time market analysis, and advanced trading tools."
        keywords="gold trading signals, XAUUSD signals, trading app, forex signals, gold trading app"
        canonical={`https://goldsniper.io/${currentLanguage}/signals-app`}
      />
      <div className="min-h-screen bg-black text-white">
        <Navigation currentPage="signals-app" />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gray-900 via-black to-gray-900 py-8 md:py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="mb-8 md:mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {t('signalsApp.title')}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                {t('signalsApp.subtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
                <AppStoreButtons platform="android" size="large" />
                <AppStoreButtons platform="ios" size="large" />
              </div>
            </div>
            
            {/* App Preview */}
            <div className="relative flex justify-center">
              <div className="hero-phone">
                <img 
                  src="https://cdn.prod.website-files.com/61389171fc46d55b610c07fe/614a4da80502ad8434e17664_Group%20150.png" 
                  alt="GoldSniper app interface showing gold trading signals" 
                  className="w-80 md:w-96 h-auto max-w-full object-contain" 
                />
              </div>
            </div>
          </div>
        </section>

      {/* App Demo Video Section */}
      <section className="bg-gray-900 py-8 md:py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-4 md:mb-6">
            <h2 className="text-3xl font-bold text-white mb-3">{t('video.title')}</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-2 md:mb-4">
              {t('video.subtitle')}
            </p>
          </div>
          
          <div className="relative bg-black rounded-2xl p-4">
            <div className="aspect-video rounded-xl overflow-hidden mb-4">
              <iframe
                src="https://www.youtube.com/embed/lLdbwqSMRB0"
                title="GoldSniper Trading Signals App Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <p className="text-gray-300 text-center">{t('video.description')}</p>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section id="features" className="bg-black py-8 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-3xl font-bold text-white mb-3">{t('features.title')}</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-2 md:mb-4">
              {t('features.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
            <Card className="fade-in bg-gray-900 border-[color:var(--brand-orange)]/30 hover:border-[color:var(--brand-orange)] transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[color:var(--brand-orange)] rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{t('features.cards.experienced.title')}</h3>
                <p className="text-gray-400 text-lg">{t('features.cards.experienced.description')}</p>
              </CardContent>
            </Card>
            
            <Card className="fade-in bg-gray-900 border-[color:var(--brand-orange)]/30 hover:border-[color:var(--brand-orange)] transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[color:var(--brand-orange)] rounded-xl flex items-center justify-center mb-4">
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{t('features.cards.signals.title')}</h3>
                <p className="text-gray-400">{t('features.cards.signals.description')}</p>
              </CardContent>
            </Card>
            
            <Card className="fade-in bg-gray-900 border-[color:var(--brand-orange)]/30 hover:border-[color:var(--brand-orange)] transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[color:var(--brand-orange)] rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{t('features.cards.overwhelmed.title')}</h3>
                <p className="text-gray-400">{t('features.cards.overwhelmed.description')}</p>
              </CardContent>
            </Card>
            
            <Card className="fade-in bg-gray-900 border-[color:var(--brand-orange)]/30 hover:border-[color:var(--brand-orange)] transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[color:var(--brand-orange)] rounded-xl flex items-center justify-center mb-4">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{t('features.cards.interface.title')}</h3>
                <p className="text-gray-400">{t('features.cards.interface.description')}</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center bg-gradient-to-r from-[color:var(--brand-orange)] to-[color:var(--amber-accent)] rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-black mb-4">{t('features.cta.title')}</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AppStoreButtons platform="ios" size="large" />
              <AppStoreButtons platform="android" size="large" />
            </div>
          </div>
        </div>
      </section>

      {/* How Signals Work */}
      <section className="bg-gray-900 py-8 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-3xl font-bold text-white mb-3">{t('howItWorks.title')}</h2>
            <p className="text-lg text-gray-400 max-w-4xl mx-auto mb-2 md:mb-4">
              {t('howItWorks.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
            <div className="text-center fade-in">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">1</div>
              <p className="text-gray-300 text-lg">{t('howItWorks.steps.step1')}</p>
            </div>
            
            <div className="text-center fade-in">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">2</div>
              <p className="text-gray-300 text-lg">{t('howItWorks.steps.step2')}</p>
            </div>
            
            <div className="text-center fade-in">
              <div className="w-16 h-16 bg-[color:var(--brand-orange)] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">3</div>
              <p className="text-gray-300 text-lg">{t('howItWorks.steps.step3')}</p>
            </div>
            
            <div className="text-center fade-in">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">4</div>
              <p className="text-gray-300 text-lg">{t('howItWorks.steps.step4')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Read Signals */}
      <section className="bg-black py-8 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">{t('howToRead.title')}</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t('howToRead.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-6 md:mb-8">
            <Card className="bg-gray-900 border-[color:var(--brand-orange)]/30">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{t('howToRead.status.title')}</h3>
                <p className="text-gray-400 mb-4">{t('howToRead.status.description')}</p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-green-400 font-medium">Live</span>
                    <span className="text-gray-500">- {t('howToRead.status.live')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-red-400 font-medium">Closed</span>
                    <span className="text-gray-500">- {t('howToRead.status.closed')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900 border-[color:var(--brand-orange)]/30">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[color:var(--brand-orange)] rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{t('howToRead.action.title')}</h3>
                <p className="text-gray-400 mb-4">{t('howToRead.action.description')}</p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <ArrowUp className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 font-medium">BUY</span>
                    <span className="text-gray-500">- {t('howToRead.action.buy')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ArrowDown className="w-4 h-4 text-red-400" />
                    <span className="text-red-400 font-medium">SELL</span>
                    <span className="text-gray-500">- {t('howToRead.action.sell')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900 border-[color:var(--brand-orange)]/30">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{t('howToRead.entryPrice.title')}</h3>
                <p className="text-gray-400">{t('howToRead.entryPrice.description')}</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-gradient-to-r from-red-900/50 to-orange-900/50 rounded-2xl p-6 border border-red-500/30">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">{t('howToRead.payAttention.title')}</h3>
            <p className="text-gray-300 text-lg mb-6 text-center">{t('howToRead.payAttention.subtitle')}</p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <X className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Automatically</h4>
                <p className="text-gray-400">{t('howToRead.payAttention.automaticallySl')}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Automatically</h4>
                <p className="text-gray-400">{t('howToRead.payAttention.automaticallyTp')}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[color:var(--brand-orange)] rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Manually</h4>
                <p className="text-gray-400">{t('howToRead.payAttention.manually')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gold Trading Education */}
      <section className="bg-gray-900 py-8 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">{t('goldTradingEducation.title')}</h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto">
              {t('goldTradingEducation.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 mb-6 md:mb-8">
            <Card className="bg-black border-[color:var(--brand-orange)]/30">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[color:var(--brand-orange)] rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{t('goldTradingEducation.safeHaven.title')}</h3>
                <p className="text-gray-400 text-lg">{t('goldTradingEducation.safeHaven.description')}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-black border-[color:var(--brand-orange)]/30">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{t('goldTradingEducation.longTerm.title')}</h3>
                <p className="text-gray-400 text-lg">{t('goldTradingEducation.longTerm.description')}</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-gradient-to-r from-[color:var(--brand-orange)] to-[color:var(--amber-accent)] rounded-2xl p-6 text-center">
            <h3 className="text-2xl font-bold text-black mb-4">{t('goldTradingEducation.successMetrics.title')}</h3>
            <p className="text-black/80 text-lg mb-6">{t('goldTradingEducation.successMetrics.subtitle')}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-black mb-2">10-20%</div>
                <div className="text-black/70">{t('goldTradingEducation.successMetrics.monthlyIncome')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-black mb-2">M15+</div>
                <div className="text-black/70">{t('goldTradingEducation.successMetrics.timeframe')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-black mb-2">XAU/USD</div>
                <div className="text-black/70">{t('goldTradingEducation.successMetrics.tradingPair')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trading Tips Section */}
      <section className="bg-black py-8 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">{t('tradingTips.title')}</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-2 md:mb-4">
              {t('tradingTips.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            <Card className="bg-gray-900 border-[color:var(--brand-orange)]/30">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4 text-white font-bold text-xl">1</div>
                <h3 className="text-lg font-semibold text-white mb-3">{t('tradingTips.tips.plan.title')}</h3>
                <p className="text-gray-400">{t('tradingTips.tips.plan.description')}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900 border-[color:var(--brand-orange)]/30">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4 text-white font-bold text-xl">2</div>
                <h3 className="text-lg font-semibold text-white mb-3">{t('tradingTips.tips.riskManagement.title')}</h3>
                <p className="text-gray-400">{t('tradingTips.tips.riskManagement.description')}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900 border-[color:var(--brand-orange)]/30">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[color:var(--brand-orange)] rounded-xl flex items-center justify-center mb-4 text-white font-bold text-xl">3</div>
                <h3 className="text-lg font-semibold text-white mb-3">{t('tradingTips.tips.cutLosses.title')}</h3>
                <p className="text-gray-400">{t('tradingTips.tips.cutLosses.description')}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900 border-[color:var(--brand-orange)]/30">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4 text-white font-bold text-xl">4</div>
                <h3 className="text-lg font-semibold text-white mb-3">{t('tradingTips.tips.followTrend.title')}</h3>
                <p className="text-gray-400">{t('tradingTips.tips.followTrend.description')}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900 border-[color:var(--brand-orange)]/30">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-pink-600 rounded-xl flex items-center justify-center mb-4 text-white font-bold text-xl">5</div>
                <h3 className="text-lg font-semibold text-white mb-3">{t('tradingTips.tips.bigPicture.title')}</h3>
                <p className="text-gray-400">{t('tradingTips.tips.bigPicture.description')}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900 border-[color:var(--brand-orange)]/30">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mb-4 text-white font-bold text-xl">6</div>
                <h3 className="text-lg font-semibold text-white mb-3">{t('tradingTips.tips.review.title')}</h3>
                <p className="text-gray-400">{t('tradingTips.tips.review.description')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Market Factors */}
      <section className="bg-gray-900 py-8 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">{t('marketFactors.title')}</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-2 md:mb-4">
              {t('marketFactors.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-12">
            <div className="text-center fade-in">
              <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <BarChart3 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">{t('marketFactors.supplyDemand.title')}</h3>
              <p className="text-gray-300 text-lg">{t('marketFactors.supplyDemand.description')}</p>
            </div>
            
            <div className="text-center fade-in">
              <div className="w-20 h-20 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">{t('marketFactors.volatility.title')}</h3>
              <p className="text-gray-300 text-lg">{t('marketFactors.volatility.description')}</p>
            </div>
            
            <div className="text-center fade-in">
              <div className="w-20 h-20 bg-[color:var(--brand-orange)] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">{t('marketFactors.geopolitics.title')}</h3>
              <p className="text-gray-300 text-lg">{t('marketFactors.geopolitics.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* App Interface Preview */}
      <section className="bg-black py-8 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="fade-in">
              <h2 className="text-4xl font-bold text-white mb-6">
                {t('appInterface.title')}
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                {t('appInterface.subtitle')}
              </p>
              
              <div className="space-y-4 mb-8">
                {(t('appInterface.features', { returnObjects: true }) as string[]).map((feature: string, index: number) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[color:var(--brand-orange)] rounded-full"></div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                onClick={handleResultsClick}
                className="bg-[color:var(--brand-orange)] hover:bg-[color:var(--amber-accent)] text-black font-bold py-6 px-12 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 h-16 text-xl shadow-xl transform hover:scale-105 min-w-[200px] border border-[color:var(--brand-orange)]"
              >
                <Smartphone className="w-6 h-6" />
                <span>{t('appInterface.button')}</span>
              </Button>
            </div>
            
            <div className="relative fade-in flex justify-center">
              <div className="w-80 h-80 flex items-center justify-center">
                <img 
                  src="https://cdn.prod.website-files.com/61389171fc46d55b610c07fe/614a4da80502ad8434e17664_Group%20150.png" 
                  alt="GoldSniper app interface showing trading dashboard" 
                  className="max-w-full max-h-full object-contain" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Premium Section */}
      <section className="bg-black py-8 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-4xl font-bold text-white mb-6">{t('premium.title')}</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-2 md:mb-4">
              {t('premium.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-8">
            <div className="bg-gray-900 rounded-2xl p-6 border border-[color:var(--brand-orange)]/30">
              <h3 className="text-2xl font-bold text-white mb-6">Premium Benefits</h3>
              <div className="space-y-4">
                {(t('premium.benefits', { returnObjects: true }) as string[]).map((benefit: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <p className="text-gray-300">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[color:var(--brand-orange)] to-[color:var(--amber-accent)] rounded-2xl p-6 text-center">
              <h3 className="text-2xl font-bold text-black mb-4">{t('premium.expertTeam.title')}</h3>
              <p className="text-black/80 text-lg mb-6">
                {t('premium.expertTeam.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <AppStoreButtons platform="ios" size="medium" />
                <AppStoreButtons platform="android" size="medium" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Stats */}
      <section className="bg-gradient-to-r from-[color:var(--brand-orange)] to-[color:var(--amber-accent)] py-8 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative fade-in flex justify-center">
              <div className="w-80 h-80 flex items-center justify-center">
                <img 
                  src="https://cdn.prod.website-files.com/61389171fc46d55b610c07fe/61484477f7c5051f6345d215_image%2022.png" 
                  alt="App performance statistics and results" 
                  className="max-w-full max-h-full object-contain" 
                />
              </div>
            </div>
            
            <div className="fade-in">
              <h2 className="text-4xl font-bold text-black mb-6">
                {t('performance.appPerformance.title')}
              </h2>
              <p className="text-xl text-black/80 mb-8">
                {t('performance.appPerformance.subtitle')}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-black mb-2">93%</div>
                  <div className="text-black/70 text-sm md:text-base">{t('performance.stats.successRate')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-black mb-2">17K+</div>
                  <div className="text-black/70 text-sm md:text-base">{t('performance.stats.activeUsers')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-black mb-2">24/7</div>
                  <div className="text-black/70 text-sm md:text-base">{t('performance.stats.marketCoverage')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-black mb-2">&lt; 1s</div>
                  <div className="text-black/70 text-sm md:text-base">{t('performance.stats.signalDelivery')}</div>
                </div>
              </div>
              
              <Button 
                onClick={handleResultsClick}
                className="bg-black text-white hover:bg-gray-900 font-bold py-6 px-12 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 h-16 text-xl shadow-xl transform hover:scale-105 min-w-[200px]"
              >
                <Award className="w-6 h-6" />
                <span>{t('performance.button')}</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Trading Features - SEO Content */}
      <section className="bg-black py-8 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Advanced XAUUSD Trading Features
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Discover powerful tools and insights that give professional traders the edge in gold markets
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
            <div className="bg-gray-900 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[color:var(--brand-orange)] to-[color:var(--amber-accent)] rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Real-Time Market Analysis</h3>
              <p className="text-gray-400">
                Advanced algorithms analyze gold market movements 24/7, identifying profitable entry and exit points with precision timing for XAUUSD trades.
              </p>
            </div>

            <div className="bg-gray-900 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[color:var(--brand-orange)] to-[color:var(--amber-accent)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Risk Management Tools</h3>
              <p className="text-gray-400">
                Sophisticated risk management features help protect your capital with automated stop-loss levels and position sizing recommendations for every gold signal.
              </p>
            </div>

            <div className="bg-gray-900 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[color:var(--brand-orange)] to-[color:var(--amber-accent)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Global Market Coverage</h3>
              <p className="text-gray-400">
                Monitor gold markets across London, New York, and Asian sessions with comprehensive coverage of all major trading hours and market overlaps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gold Trading Strategies - SEO Content */}
      <section className="bg-gray-900 py-8 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Professional Gold Trading Strategies
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Learn from experienced traders who have mastered the art of XAUUSD trading through proven strategies and disciplined execution.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[color:var(--brand-orange)] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-black font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">Trend Following Strategy</h4>
                    <p className="text-gray-400">Identify and follow strong gold price trends using technical indicators and momentum analysis for consistent profits.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[color:var(--brand-orange)] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-black font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">Breakout Trading</h4>
                    <p className="text-gray-400">Capitalize on price breakouts from key support and resistance levels in the gold market for maximum profit potential.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[color:var(--brand-orange)] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-black font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">News-Based Trading</h4>
                    <p className="text-gray-400">React quickly to economic news and events that impact gold prices, from Fed announcements to geopolitical developments.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-r from-[color:var(--brand-orange)] to-[color:var(--amber-accent)] rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-black mb-6">Trading Performance Metrics</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-black mb-2">85%</div>
                    <div className="text-black/70 text-sm">Win Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-black mb-2">1:3</div>
                    <div className="text-black/70 text-sm">Risk/Reward</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-black mb-2">15%</div>
                    <div className="text-black/70 text-sm">Monthly ROI</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-black mb-2">0.5%</div>
                    <div className="text-black/70 text-sm">Max Drawdown</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Gold Trading Guide - SEO Content */}
      <section className="bg-gray-900 py-8 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-4xl font-bold text-white mb-6">{t('comprehensiveGuide.title')}</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-2 md:mb-4">
              {t('comprehensiveGuide.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-black rounded-2xl p-4 md:p-6">
              <h3 className="text-2xl font-bold text-[color:var(--brand-orange)] mb-4">{t('comprehensiveGuide.sections.realTime.title')}</h3>
              <p className="text-gray-300 text-lg mb-4">
                {t('comprehensiveGuide.sections.realTime.content')}
              </p>
            </div>
            
            <div className="bg-black rounded-2xl p-4 md:p-6">
              <h3 className="text-2xl font-bold text-[color:var(--brand-orange)] mb-4">{t('comprehensiveGuide.sections.global.title')}</h3>
              <p className="text-gray-300 text-lg mb-4">
                {t('comprehensiveGuide.sections.global.content')}
              </p>
            </div>
            
            <div className="bg-black rounded-2xl p-4 md:p-6">
              <h3 className="text-2xl font-bold text-[color:var(--brand-orange)] mb-4">{t('comprehensiveGuide.sections.specifics.title')}</h3>
              <p className="text-gray-300 text-lg mb-4">
                {t('comprehensiveGuide.sections.specifics.content')}
              </p>
            </div>
            
            <div className="bg-black rounded-2xl p-4 md:p-6">
              <h3 className="text-2xl font-bold text-[color:var(--brand-orange)] mb-4">{t('comprehensiveGuide.sections.howGoldWorks.title')}</h3>
              <p className="text-gray-300 text-lg mb-4">
                {t('comprehensiveGuide.sections.howGoldWorks.content')}
              </p>
            </div>
            
            <div className="bg-black rounded-2xl p-4 md:p-6">
              <h3 className="text-2xl font-bold text-[color:var(--brand-orange)] mb-4">{t('comprehensiveGuide.sections.startTrading.title')}</h3>
              <p className="text-gray-300 text-lg mb-4">
                {t('comprehensiveGuide.sections.startTrading.content')}
              </p>
            </div>
            
            <div className="bg-black rounded-2xl p-4 md:p-6">
              <h3 className="text-2xl font-bold text-[color:var(--brand-orange)] mb-4">{t('comprehensiveGuide.sections.bestApps.title')}</h3>
              <p className="text-gray-300 text-lg mb-4">
                {t('comprehensiveGuide.sections.bestApps.content')}
              </p>
            </div>
          </div>
          
          <div className="text-center mt-6 md:mt-12">
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <AppStoreButtons platform="ios" size="large" />
              <AppStoreButtons platform="android" size="large" />
            </div>
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="bg-black py-8 md:py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">{t('downloadCta.title')}</h2>
          <p className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
            {t('downloadCta.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <AppStoreButtons platform="android" size="large" />
            <AppStoreButtons platform="ios" size="large" />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 gradient-gold rounded-xl flex items-center justify-center">
                  <Crosshair className="text-white w-6 h-6" />
                </div>
                <span className="text-2xl font-bold text-white">GOLDSNIPER</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                {t('footer.description')}
              </p>
              <div className="flex space-x-4">
                <a href="https://t.me/goldsniper_official" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[color:var(--brand-orange)] transition-colors">
                  <ExternalLink className="w-6 h-6" />
                </a>
                <a href="https://twitter.com/goldsniper_io" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[color:var(--brand-orange)] transition-colors">
                  <ExternalLink className="w-6 h-6" />
                </a>
                <a href="https://instagram.com/goldsniper.official" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[color:var(--brand-orange)] transition-colors">
                  <ExternalLink className="w-6 h-6" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">{t('footer.sections.appFeatures')}</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href={`/${currentLanguage}/signals-app`} className="hover:text-white transition-colors">{t('footer.links.realTimeSignals')}</a></li>
                <li><a href={`/${currentLanguage}/analysis`} className="hover:text-white transition-colors">{t('footer.links.marketAnalysis')}</a></li>
                <li><a href={`/${currentLanguage}/results`} className="hover:text-white transition-colors">{t('footer.links.performanceTracking')}</a></li>
                <li><a href={`/${currentLanguage}/signals-app`} className="hover:text-white transition-colors">{t('footer.links.communityAccess')}</a></li>
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
    </div>
  </>
);
}
