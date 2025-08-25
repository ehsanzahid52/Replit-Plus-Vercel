import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Calculator, BarChart3, Target , Download, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Navigation from '../../components/Navigation';
import SEOHead from '../../components/SEOHead';
import Footer from '../../components/Footer';
import { SiApple, SiGoogleplay } from 'react-icons/si';
import { useLanguageFromUrl } from '../../components/LanguageRouter';

export default function PivotCalculator() {
  const { t } = useTranslation();
  const currentLanguage = useLanguageFromUrl();
  
  const [calculator, setCalculator] = useState({
    high: '',
    low: '',
    close: '',
    results: {} as { [key: string]: string }
  });

  const calculatePivotPoints = () => {
    const high = parseFloat(calculator.high);
    const low = parseFloat(calculator.low);
    const close = parseFloat(calculator.close);
    
    if (isNaN(high) || isNaN(low) || isNaN(close)) return;
    
    const pivot = (high + low + close) / 3;
    const r1 = (2 * pivot) - low;
    const r2 = pivot + (high - low);
    const r3 = high + 2 * (pivot - low);
    const s1 = (2 * pivot) - high;
    const s2 = pivot - (high - low);
    const s3 = low - 2 * (high - pivot);
    
    const results = {
      'Pivot Point': pivot.toFixed(2),
      'Resistance 1': r1.toFixed(2),
      'Resistance 2': r2.toFixed(2),
      'Resistance 3': r3.toFixed(2),
      'Support 1': s1.toFixed(2),
      'Support 2': s2.toFixed(2),
      'Support 3': s3.toFixed(2)
    };
    
    setCalculator(prev => ({ ...prev, results }));
  };

  const clearCalculator = () => {
    setCalculator({
      high: '',
      low: '',
      close: '',
      results: {}
    });
  };

  const handleDownloadClick = (platform: string) => {
    if (platform.includes('android')) {
      window.open('https://play.google.com/store/apps/details?id=com.tate.goldsniper&hl=en_GB', '_blank');
    } else if (platform.includes('ios')) {
      window.open('https://apps.apple.com/us/app/gold-sniper-xauusd-signals/id1585302472', '_blank');
    }
  };

  return (
    <>
    <div className="min-h-screen bg-black text-white">
      <SEOHead 
        title="XAUUSD Pivot Point Calculator - Gold Trading Support Resistance Tool | GoldSniper"
        description="Calculate pivot points, support and resistance levels for XAUUSD gold trading. Free pivot point calculator for technical analysis with daily, weekly levels."
        keywords="XAUUSD pivot calculator, gold pivot points, pivot point trading, support resistance calculator, XAUUSD technical analysis, gold trading pivots"
        canonical={`https://goldsniper.io/${currentLanguage}/tools/pivot-calculator`}
      />
      <Navigation currentPage="tools" />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 via-black to-gray-900 py-8 md:py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-[color:var(--brand-orange)] rounded-full">
              <Activity className="w-8 h-8 text-black" />
              </div>
            </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            XAUUSD Pivot Point Calculator
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Calculate pivot points and support/resistance levels for XAUUSD gold trading. Professional tool for technical analysis to identify key price levels.
          </p>
          </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-2xl text-center mb-4">Pivot Point Calculator</CardTitle>
              <p className="text-gray-400 text-center">Calculate pivot points for XAUUSD technical analysis</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">High Price</label>
                  <input
                    type="number"
                    value={calculator.high}
                    onChange={(e) => setCalculator(prev => ({ ...prev, high: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[color:var(--brand-orange)] focus:outline-none"
                    placeholder="2050.00"
                    step="0.01"
                  />
                  </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Low Price</label>
                  <input
                    type="number"
                    value={calculator.low}
                    onChange={(e) => setCalculator(prev => ({ ...prev, low: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[color:var(--brand-orange)] focus:outline-none"
                    placeholder="2000.00"
                    step="0.01"
                  />
                  </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Close Price</label>
                  <input
                    type="number"
                    value={calculator.close}
                    onChange={(e) => setCalculator(prev => ({ ...prev, close: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[color:var(--brand-orange)] focus:outline-none"
                    placeholder="2025.00"
                    step="0.01"
                  />
                  </div>
                </div>

              <div className="flex space-x-4">
                <Button onClick={calculatePivotPoints} className="flex-1 bg-[color:var(--brand-orange)] hover:bg-[color:var(--amber-accent)] text-black font-semibold py-3">
                  Calculate Pivot Points
                </Button>
                <Button onClick={clearCalculator} variant="outline" className="px-8 border-gray-600 text-gray-300 hover:bg-gray-800">
                  Clear
                </Button>
                </div>

              {Object.keys(calculator.results).length > 0 && (
                <div className="mt-8 p-6 bg-gray-800 rounded-lg border border-gray-700">
                  <h3 className="text-white font-semibold mb-4">Pivot Points & Levels</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {Object.entries(calculator.results).map(([level, value]) => (
                      <div key={level} className="flex justify-between bg-gray-900 p-3 rounded">
                        <span className="text-gray-300 font-medium">{level}</span>
                        <span className="text-green-400 font-bold">${value}</span>
                        </div>
                    ))}
                    </div>
                  </div>
              )}
            </CardContent>
          </Card>
          </div>
      </section>

      {/* Educational Content */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">XAUUSD Pivot Point Trading Guide</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">What are Pivot Points?</h3>
              <p className="text-gray-300 mb-4">
                Pivot points are technical indicators that help identify potential support and resistance levels in XAUUSD trading based on the previous period's high, low, and close prices.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li>• Pivot Point - Central reference level</li>
                <li>• Support levels - Potential buying zones</li>
                <li>• Resistance levels - Potential selling zones</li>
                <li>• Used for intraday and swing trading</li>
              </ul>
              </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">How to Use Pivot Points</h3>
              <p className="text-gray-300 mb-4">
                Pivot points help traders identify key price levels where XAUUSD might reverse or break through.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li>• Price above pivot = bullish bias</li>
                <li>• Price below pivot = bearish bias</li>
                <li>• Use as entry/exit points</li>
                <li>• Combine with other indicators</li>
                <li>• Set stop losses at key levels</li>
              </ul>
              </div>
            </div>
          </div>
      </section>
        {/* Download CTA Section */}
        <section className="py-16 bg-gradient-to-br from-gray-900/20 to-black/20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-4 rounded-2xl">
                <Download className="w-8 h-8 text-white" />
                </div>
              </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Professional XAUUSD Trading
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Download GoldSniper for complete trading tools, real-time signals, and professional market analysis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Button 
                onClick={() => handleDownloadClick('android')}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 shadow-xl transform hover:scale-105"
              >
                <SiGoogleplay className="w-6 h-6" />
                <span>{t('common.downloadFor', { platform: 'Google Play' })}</span>
              </Button>
              <Button 
                onClick={() => handleDownloadClick('ios')}
                className="bg-black hover:bg-gray-900 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 shadow-xl transform hover:scale-105 border-2 border-gray-700"
              >
                <SiApple className="w-6 h-6" />
                <span>{t('common.downloadFor', { platform: 'App Store' })}</span>
              </Button>
              </div>
            
            <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Advanced Tools</span>
                </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Real-Time Data</span>
                </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Expert Analysis</span>
                </div>
              </div>
            </div>
        </section>

            <Footer />
      </div>
    </>
  );
}