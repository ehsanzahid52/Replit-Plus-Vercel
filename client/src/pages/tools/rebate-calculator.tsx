import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift, Calculator, BarChart3, Target , Download, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Navigation from '../../components/Navigation';
import SEOHead from '../../components/SEOHead';
import Footer from '../../components/Footer';
import { SiApple, SiGoogleplay } from 'react-icons/si';
import { useLanguageFromUrl } from '../../components/LanguageRouter';

export default function RebateCalculator() {
  const { t } = useTranslation();
  const currentLanguage = useLanguageFromUrl();
  
  const [calculator, setCalculator] = useState({
    tradeVolume: '',
    rebatePerLot: '',
    tradingDays: '',
    result: '',
    monthlyRebate: '',
    yearlyRebate: ''
  });

  const calculateRebate = () => {
    const volume = parseFloat(calculator.tradeVolume);
    const rebatePerLot = parseFloat(calculator.rebatePerLot);
    const tradingDays = parseFloat(calculator.tradingDays) || 22; // Default 22 trading days per month
    
    if (isNaN(volume) || isNaN(rebatePerLot)) return;
    
    const dailyRebate = volume * rebatePerLot;
    const monthlyRebate = dailyRebate * tradingDays;
    const yearlyRebate = monthlyRebate * 12;
    
    setCalculator(prev => ({ 
      ...prev, 
      result: dailyRebate.toFixed(2),
      monthlyRebate: monthlyRebate.toFixed(2),
      yearlyRebate: yearlyRebate.toFixed(2)
    }));
  };

  const clearCalculator = () => {
    setCalculator({
      tradeVolume: '',
      rebatePerLot: '',
      tradingDays: '',
      result: '',
      monthlyRebate: '',
      yearlyRebate: ''
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
        title="XAUUSD Rebate Calculator - Trading Cashback Rewards Tool | GoldSniper"
        description="Calculate trading rebates and cashback rewards for XAUUSD trading. Estimate daily, monthly, and yearly rebate earnings from your gold trading volume."
        keywords="XAUUSD rebate calculator, trading cashback calculator, gold trading rebates, broker rebate calculator, trading rewards calculator"
        canonical={`https://goldsniper.io/${currentLanguage}/tools/rebate-calculator`}
      />
      <Navigation currentPage="tools" />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 via-black to-gray-900 py-8 md:py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-[color:var(--brand-orange)] rounded-full">
              <Gift className="w-8 h-8 text-black" />
              </div>
            </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            XAUUSD Rebate Calculator
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Calculate trading rebates and cashback rewards for XAUUSD trading. Estimate your potential earnings from broker rebate programs.
          </p>
          </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-2xl text-center mb-4">Rebate Calculator</CardTitle>
              <p className="text-gray-400 text-center">Calculate your trading rebate earnings</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Daily Trade Volume (Lots)</label>
                  <input
                    type="number"
                    value={calculator.tradeVolume}
                    onChange={(e) => setCalculator(prev => ({ ...prev, tradeVolume: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[color:var(--brand-orange)] focus:outline-none"
                    placeholder="10"
                    step="0.01"
                  />
                  <p className="text-xs text-gray-400 mt-1">Average lots traded per day</p>
                  </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Rebate Per Lot ($)</label>
                  <input
                    type="number"
                    value={calculator.rebatePerLot}
                    onChange={(e) => setCalculator(prev => ({ ...prev, rebatePerLot: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[color:var(--brand-orange)] focus:outline-none"
                    placeholder="3.50"
                    step="0.01"
                  />
                  <p className="text-xs text-gray-400 mt-1">Rebate amount per standard lot</p>
                  </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Trading Days/Month</label>
                  <input
                    type="number"
                    value={calculator.tradingDays}
                    onChange={(e) => setCalculator(prev => ({ ...prev, tradingDays: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[color:var(--brand-orange)] focus:outline-none"
                    placeholder="22"
                    min="1"
                    max="31"
                  />
                  <p className="text-xs text-gray-400 mt-1">Average trading days per month</p>
                  </div>
                </div>

              <div className="flex space-x-4">
                <Button onClick={calculateRebate} className="flex-1 bg-[color:var(--brand-orange)] hover:bg-[color:var(--amber-accent)] text-black font-semibold py-3">
                  Calculate Rebates
                </Button>
                <Button onClick={clearCalculator} variant="outline" className="px-8 border-gray-600 text-gray-300 hover:bg-gray-800">
                  Clear
                </Button>
                </div>

              {calculator.result && (
                <div className="mt-8 p-6 bg-gray-800 rounded-lg border border-gray-700">
                  <h3 className="text-white font-semibold mb-4">Rebate Earnings</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gray-900 p-4 rounded text-center">
                      <span className="text-gray-300 font-medium block mb-2">Daily Rebate</span>
                      <p className="text-green-400 font-bold text-xl">${calculator.result}</p>
                      </div>
                    <div className="bg-gray-900 p-4 rounded text-center">
                      <span className="text-gray-300 font-medium block mb-2">Monthly Rebate</span>
                      <p className="text-blue-400 font-bold text-xl">${calculator.monthlyRebate}</p>
                      </div>
                    <div className="bg-gray-900 p-4 rounded text-center">
                      <span className="text-gray-300 font-medium block mb-2">Yearly Rebate</span>
                      <p className="text-purple-400 font-bold text-xl">${calculator.yearlyRebate}</p>
                      </div>
                    </div>
                  
                  <div className="mt-6 p-4 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg border border-green-500/30">
                    <h4 className="text-white font-semibold mb-2">Rebate Impact</h4>
                    <p className="text-gray-300 text-sm">
                      Your rebates can cover approximately {((parseFloat(calculator.monthlyRebate) / 100) * 2).toFixed(1)} standard lot trades per month 
                      (assuming $2 spread cost per lot).
                    </p>
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
          <h2 className="text-3xl font-bold text-white mb-8 text-center">XAUUSD Trading Rebates Guide</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">How Rebates Work</h3>
              <p className="text-gray-300 mb-4">
                Trading rebates are cashback rewards paid by brokers or introducing brokers for your XAUUSD trading volume.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li>• Paid per lot traded (round turn)</li>
                <li>• Usually credited monthly</li>
                <li>• Reduces effective trading costs</li>
                <li>• Available through IB programs</li>
              </ul>
              </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Maximizing Rebates</h3>
              <p className="text-gray-300 mb-4">
                Strategies to optimize your rebate earnings from XAUUSD trading.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li>• Choose high rebate IB programs</li>
                <li>• Maintain consistent trading volume</li>
                <li>• Consider rebates in strategy costs</li>
                <li>• Track rebate payments regularly</li>
                <li>• Factor into profitability analysis</li>
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