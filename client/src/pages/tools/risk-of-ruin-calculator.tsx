import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Calculator, BarChart3, Target , Download, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Navigation from '../../components/Navigation';
import SEOHead from '../../components/SEOHead';
import Footer from '../../components/Footer';
import { SiApple, SiGoogleplay } from 'react-icons/si';
import { useLanguageFromUrl } from '../../components/LanguageRouter';

export default function RiskOfRuinCalculator() {
  const { t } = useTranslation();
  const currentLanguage = useLanguageFromUrl();
  
  const [calculator, setCalculator] = useState({
    winRate: '',
    riskRewardRatio: '',
    riskPerTrade: '',
    result: '',
    recommendation: ''
  });

  const calculateRiskOfRuin = () => {
    const winRate = parseFloat(calculator.winRate) / 100;
    const rrRatio = parseFloat(calculator.riskRewardRatio);
    const riskPerTrade = parseFloat(calculator.riskPerTrade) / 100;
    
    if (isNaN(winRate) || isNaN(rrRatio) || isNaN(riskPerTrade)) return;
    
    const lossRate = 1 - winRate;
    const p = winRate;
    const q = lossRate;
    const b = rrRatio;
    
    // Kelly Criterion and Risk of Ruin calculation
    const kelly = (p * (b + 1) - 1) / b;
    const actualRisk = riskPerTrade;
    
    // Simplified risk of ruin calculation
    let riskOfRuinPercent;
    if (p <= q) {
      riskOfRuinPercent = 100; // Negative expectancy
    } else {
      const a = q / p;
      riskOfRuinPercent = Math.pow(a, 1 / actualRisk) * 100;
    }
    
    riskOfRuinPercent = Math.min(riskOfRuinPercent, 100);
    
    let recommendation = '';
    if (riskOfRuinPercent > 50) {
      recommendation = 'Very High Risk - Reduce position size immediately';
    } else if (riskOfRuinPercent > 20) {
      recommendation = 'High Risk - Consider reducing risk per trade';
    } else if (riskOfRuinPercent > 5) {
      recommendation = 'Moderate Risk - Acceptable for experienced traders';
    } else {
      recommendation = 'Low Risk - Conservative approach';
    }
    
    setCalculator(prev => ({ 
      ...prev, 
      result: riskOfRuinPercent.toFixed(2),
      recommendation 
    }));
  };

  const clearCalculator = () => {
    setCalculator({
      winRate: '',
      riskRewardRatio: '',
      riskPerTrade: '',
      result: '',
      recommendation: ''
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
        title="Risk of Ruin Calculator - XAUUSD Trading Account Risk Assessment | GoldSniper"
        description="Calculate risk of ruin probability for XAUUSD trading. Assess account blowout risk with win rate, risk-reward ratio, and position size analysis."
        keywords="risk of ruin calculator, trading risk assessment, account risk calculator, XAUUSD risk management, trading probability calculator, account blowout risk"
        canonical={`https://goldsniper.io/${currentLanguage}/tools/risk-of-ruin-calculator`}
      />
      <Navigation currentPage="tools" />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 via-black to-gray-900 py-8 md:py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-[color:var(--brand-orange)] rounded-full">
              <AlertTriangle className="w-8 h-8 text-black" />
              </div>
            </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Risk of Ruin Calculator
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Calculate the probability of losing your trading account with XAUUSD trading. Essential risk management tool for assessing account survival odds.
          </p>
          </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-2xl text-center mb-4">Risk of Ruin Calculator</CardTitle>
              <p className="text-gray-400 text-center">Assess your trading account risk probability</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Win Rate (%)</label>
                  <input
                    type="number"
                    value={calculator.winRate}
                    onChange={(e) => setCalculator(prev => ({ ...prev, winRate: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[color:var(--brand-orange)] focus:outline-none"
                    placeholder="60"
                    min="0"
                    max="100"
                  />
                  </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Risk/Reward Ratio</label>
                  <input
                    type="number"
                    value={calculator.riskRewardRatio}
                    onChange={(e) => setCalculator(prev => ({ ...prev, riskRewardRatio: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[color:var(--brand-orange)] focus:outline-none"
                    placeholder="2.0"
                    step="0.1"
                  />
                  </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Risk Per Trade (%)</label>
                  <input
                    type="number"
                    value={calculator.riskPerTrade}
                    onChange={(e) => setCalculator(prev => ({ ...prev, riskPerTrade: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[color:var(--brand-orange)] focus:outline-none"
                    placeholder="2"
                    step="0.1"
                  />
                  </div>
                </div>

              <div className="flex space-x-4">
                <Button onClick={calculateRiskOfRuin} className="flex-1 bg-[color:var(--brand-orange)] hover:bg-[color:var(--amber-accent)] text-black font-semibold py-3">
                  Calculate Risk of Ruin
                </Button>
                <Button onClick={clearCalculator} variant="outline" className="px-8 border-gray-600 text-gray-300 hover:bg-gray-800">
                  Clear
                </Button>
                </div>

              {calculator.result && (
                <div className="mt-8 p-6 bg-gray-800 rounded-lg border border-gray-700">
                  <h3 className="text-white font-semibold mb-4">Risk Assessment Results</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between bg-gray-900 p-4 rounded">
                      <span className="text-gray-300 font-medium">Risk of Ruin Probability</span>
                      <span className="text-red-400 font-bold text-xl">{calculator.result}%</span>
                      </div>
                    <div className="bg-gray-900 p-4 rounded">
                      <span className="text-gray-300 font-medium">Recommendation:</span>
                      <p className="text-yellow-400 font-semibold mt-2">{calculator.recommendation}</p>
                      </div>
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
          <h2 className="text-3xl font-bold text-white mb-8 text-center">XAUUSD Risk Management Guide</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">What is Risk of Ruin?</h3>
              <p className="text-gray-300 mb-4">
                Risk of ruin is the probability that your trading account will be completely depleted based on your trading statistics and risk management approach.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li>• Probability of account depletion</li>
                <li>• Based on win rate and risk parameters</li>
                <li>• Critical for position sizing</li>
                <li>• Helps set realistic expectations</li>
              </ul>
              </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Risk Management Rules</h3>
              <p className="text-gray-300 mb-4">
                Follow these guidelines to minimize your risk of ruin in XAUUSD trading.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li>• Never risk more than 2% per trade</li>
                <li>• Maintain positive expectancy</li>
                <li>• Use stop losses consistently</li>
                <li>• Keep detailed trading records</li>
                <li>• Review and adjust regularly</li>
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