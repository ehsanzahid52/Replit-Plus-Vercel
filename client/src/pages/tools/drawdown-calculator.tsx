import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Calculator, BarChart3, Target, Download, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Navigation from '../../components/Navigation';
import SEOHead from '../../components/SEOHead';
import Footer from '../../components/Footer';
import { SiApple, SiGoogleplay } from 'react-icons/si';
import { useLanguageFromUrl } from '../../components/LanguageRouter';

export default function DrawdownCalculator() {
  const { t } = useTranslation();
  const currentLanguage = useLanguageFromUrl();
  
  const [calculator, setCalculator] = useState({
    peakBalance: '',
    currentBalance: '',
    result: '',
    recoveryNeeded: '',
    riskLevel: ''
  });

  const calculateDrawdown = () => {
    const peak = parseFloat(calculator.peakBalance);
    const current = parseFloat(calculator.currentBalance);
    
    if (isNaN(peak) || isNaN(current) || peak === 0) return;
    
    const drawdown = ((peak - current) / peak * 100);
    const recoveryNeeded = ((peak - current) / current * 100);
    
    let riskLevel = '';
    if (drawdown < 5) {
      riskLevel = 'Low Risk - Healthy account performance';
    } else if (drawdown < 15) {
      riskLevel = 'Moderate Risk - Monitor closely';
    } else if (drawdown < 30) {
      riskLevel = 'High Risk - Review trading strategy';
    } else {
      riskLevel = 'Very High Risk - Immediate action required';
    }
    
    setCalculator(prev => ({ 
      ...prev, 
      result: Math.abs(drawdown).toFixed(2),
      recoveryNeeded: recoveryNeeded.toFixed(2),
      riskLevel
    }));
  };

  const clearCalculator = () => {
    setCalculator({
      peakBalance: '',
      currentBalance: '',
      result: '',
      recoveryNeeded: '',
      riskLevel: ''
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
        title="XAUUSD Drawdown Calculator - Trading Account Performance Tool | GoldSniper"
        description="Calculate drawdown percentage for XAUUSD trading accounts. Analyze account performance, recovery requirements, and risk assessment for gold trading."
        keywords="XAUUSD drawdown calculator, trading drawdown analysis, account performance calculator, gold trading drawdown, trading risk assessment"
        canonical={`https://goldsniper.io/${currentLanguage}/tools/drawdown-calculator`}
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
            XAUUSD Drawdown Calculator
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Calculate current drawdown of your XAUUSD trading account. Essential tool for performance analysis and risk management assessment.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-2xl text-center mb-4">Drawdown Calculator</CardTitle>
              <p className="text-gray-400 text-center">Analyze your trading account performance</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Peak Balance ($)</label>
                  <input
                    type="number"
                    value={calculator.peakBalance}
                    onChange={(e) => setCalculator(prev => ({ ...prev, peakBalance: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[color:var(--brand-orange)] focus:outline-none"
                    placeholder="12000"
                    step="0.01"
                  />
                  <p className="text-xs text-gray-400 mt-1">Highest account balance achieved</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Current Balance ($)</label>
                  <input
                    type="number"
                    value={calculator.currentBalance}
                    onChange={(e) => setCalculator(prev => ({ ...prev, currentBalance: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[color:var(--brand-orange)] focus:outline-none"
                    placeholder="10000"
                    step="0.01"
                  />
                  <p className="text-xs text-gray-400 mt-1">Current account balance</p>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button onClick={calculateDrawdown} className="flex-1 bg-[color:var(--brand-orange)] hover:bg-[color:var(--amber-accent)] text-black font-semibold py-3">
                  Calculate Drawdown
                </Button>
                <Button onClick={clearCalculator} variant="outline" className="px-8 border-gray-600 text-gray-300 hover:bg-gray-800">
                  Clear
                </Button>
              </div>

              {calculator.result && (
                <div className="mt-8 p-6 bg-gray-800 rounded-lg border border-gray-700">
                  <h3 className="text-white font-semibold mb-4">Drawdown Analysis</h3>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gray-900 p-4 rounded">
                        <span className="text-gray-300 font-medium">Current Drawdown</span>
                        <p className="text-red-400 font-bold text-2xl">{calculator.result}%</p>
                      </div>
                      <div className="bg-gray-900 p-4 rounded">
                        <span className="text-gray-300 font-medium">Recovery Needed</span>
                        <p className="text-blue-400 font-bold text-xl">{calculator.recoveryNeeded}%</p>
                      </div>
                    </div>
                    <div className="bg-gray-900 p-4 rounded">
                      <span className="text-gray-300 font-medium">Risk Assessment:</span>
                      <p className="text-yellow-400 font-semibold mt-2">{calculator.riskLevel}</p>
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
          <h2 className="text-3xl font-bold text-white mb-8 text-center">XAUUSD Drawdown Management</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Understanding Drawdown</h3>
              <p className="text-gray-300 mb-4">
                Drawdown measures the decline from your account's peak balance to its current balance, expressed as a percentage.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li>• Shows account performance decline</li>
                <li>• Key risk management metric</li>
                <li>• Affects psychological trading</li>
                <li>• Critical for position sizing</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Recovery Strategies</h3>
              <p className="text-gray-300 mb-4">
                Different drawdown levels require different recovery approaches in XAUUSD trading.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li>• Reduce position sizes during drawdown</li>
                <li>• Focus on high-probability setups</li>
                <li>• Consider taking a trading break</li>
                <li>• Review and adjust strategy</li>
                <li>• Don't chase losses aggressively</li>
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
