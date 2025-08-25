import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, ArrowLeft, Calendar, Target, Share2, Twitter, Facebook, Copy } from 'lucide-react';
import { SiApple, SiGoogleplay } from 'react-icons/si';
import { useTranslation } from 'react-i18next';
import { useLocation, useRoute } from 'wouter';
import Navigation from '../components/Navigation';
import SEOHead from '../components/SEOHead';
import { useLanguageFromUrl } from '../components/LanguageRouter';

interface MonthDetailData {
  month: string;
  year: number;
  winRate: number;
  totalSignals: number;
  profit: number;
  bestDay: string;
  avgPipsPerSignal: number;
}

// Mock data for demonstration  
const mockMonthData: MonthDetailData = {
  month: 'January',
  year: 2024,
  winRate: 87.5,
  totalSignals: 156,
  profit: 12450,
  bestDay: 'Jan 15',
  avgPipsPerSignal: 45.2
};

export default function MonthDetails() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const currentLang = useLanguageFromUrl();
  const [match, params] = useRoute(`/${currentLang}/results/:monthYear`);
  const [monthData, setMonthData] = useState<MonthDetailData>(mockMonthData);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleDownloadClick = (platform: string) => {
    if (platform.includes('android')) {
      window.open('https://play.google.com/store/apps/details?id=com.tate.goldsniper&hl=en_GB', '_blank');
    } else if (platform.includes('ios')) {
      window.open('https://apps.apple.com/us/app/gold-sniper-xauusd-signals/id1585302472', '_blank');
    }
  };

  // Parse month and year from URL
  useEffect(() => {
    if (match && params?.monthYear) {
      const [month, year] = params.monthYear.split('-');
      // In a real app, you would fetch data based on month and year
      // For now, we'll use mock data
      setMonthData({
        ...mockMonthData,
        month: month.charAt(0).toUpperCase() + month.slice(1),
        year: parseInt(year)
      });
    }
  }, [match]);

  const handleBackClick = () => {
    setLocation(`/${currentLang}/results`);
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out GoldSniper's ${monthData.month} ${monthData.year} performance: ${monthData.winRate}% win rate with ${monthData.totalSignals} signals!`;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        });
        break;
    }
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead 
        title={`${monthData.month} ${monthData.year} Performance - GoldSniper XAUUSD Trading Signals`}
        description={`Detailed performance analysis for ${monthData.month} ${monthData.year}. Win rate: ${monthData.winRate}%, Total signals: ${monthData.totalSignals}, Total pips: ${monthData.profit}`}
        pagePath={`/results/${monthData.month.toLowerCase()}-${monthData.year}`}
      />
      
      <Navigation currentPage="results" />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="mb-12 fade-in">
          <Button 
            variant="ghost" 
            onClick={handleBackClick}
            className="mb-6 text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Results
          </Button>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 gradient-gold rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[color:var(--brand-orange)] to-[color:var(--brand-orange)] bg-clip-text text-transparent">
                  {monthData.month} {monthData.year}
                </h1>
                <p className="text-gray-400 text-base md:text-lg">Monthly Performance</p>
              </div>
            </div>
            
            {/* Share Buttons */}
            <div className="flex items-center space-x-2 md:space-x-3 justify-start lg:justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('twitter')}
                className="bg-gray-800 border-gray-700 hover:border-blue-400 hover:bg-blue-400/10 text-white px-2 md:px-3"
              >
                <Twitter className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Share</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('facebook')}
                className="bg-gray-800 border-gray-700 hover:border-blue-600 hover:bg-blue-600/10 text-white px-2 md:px-3"
              >
                <Facebook className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Share</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('copy')}
                className="bg-gray-800 border-gray-700 hover:border-[color:var(--brand-orange)] hover:bg-[color:var(--brand-orange)]/10 text-white px-2 md:px-3"
              >
                <Copy className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">{copySuccess ? 'Copied!' : 'Copy Link'}</span>
                <span className="md:hidden">{copySuccess ? '✓' : 'Copy'}</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Performance Overview - Same as main page but expanded */}
        <Card className="bg-gray-800 border-gray-700 hover:border-[color:var(--brand-orange)]/50 transition-all duration-300 fade-in mb-8">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[color:var(--brand-orange)]/20 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[color:var(--brand-orange)]" />
                </div>
                <div>
                  <CardTitle className="text-white text-lg">
                    {monthData.month} {monthData.year} Performance
                  </CardTitle>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Win Rate */}
            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
              <span className="text-muted-foreground text-lg">Win Rate</span>
              <div className="flex items-center space-x-2">
                {monthData.winRate >= 85 ? (
                  <TrendingUp className="w-5 h-5 text-green-400" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-yellow-400" />
                )}
                <span className="text-white font-bold text-2xl">{monthData.winRate}%</span>
              </div>
            </div>
            
            {/* Total Signals */}
            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
              <span className="text-muted-foreground text-lg">Total Signals</span>
              <span className="text-white font-bold text-2xl">{monthData.totalSignals}</span>
            </div>
            
            {/* Profit */}
            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
              <span className="text-muted-foreground text-lg">Profit (Pips)</span>
              <span className="text-green-400 font-bold text-2xl">+{monthData.profit.toLocaleString()}</span>
            </div>
            
            {/* Best Day */}
            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
              <span className="text-muted-foreground text-lg">Best Trading Day</span>
              <span className="text-[color:var(--brand-orange)] font-bold text-2xl">{monthData.bestDay}</span>
            </div>
            
            {/* Average Pips */}
            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border-t border-border">
              <span className="text-muted-foreground text-lg">Average Pips per Signal</span>
              <span className="text-white font-bold text-2xl">{monthData.avgPipsPerSignal}</span>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center fade-in">
          <Card className="bg-gray-800 border-gray-700 bg-gradient-to-br from-[color:var(--brand-orange)]/10 to-[color:var(--brand-orange)]/5 border-[color:var(--brand-orange)]/30">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Want results like these?
              </h3>
              <p className="text-muted-foreground text-lg mb-6">
                Join thousands of successful traders using GoldSniper's proven XAUUSD signals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => handleDownloadClick('android')}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 text-lg shadow-xl"
                >
                  <SiGoogleplay className="w-6 h-6" />
                  <span>{t('common.getOnGooglePlay')}</span>
                </Button>
                <Button 
                  onClick={() => handleDownloadClick('ios')}
                  className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 text-lg shadow-xl border-2 border-gray-600"
                >
                  <SiApple className="w-6 h-6" />
                  <span>{t('common.downloadOnAppStore')}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}