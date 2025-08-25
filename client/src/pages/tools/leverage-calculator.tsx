import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Layers, Download, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguageFromUrl } from '../../components/LanguageRouter';
import Navigation from '../../components/Navigation';
import SEOHead from '../../components/SEOHead';
import Footer from '../../components/Footer';
import AppStoreButtons from '../../components/ui/AppStoreButtons';

export default function LeverageCalculator() {
  const { t } = useTranslation();
  const currentLanguage = useLanguageFromUrl();
  const [calculator, setCalculator] = useState({
    accountBalance: '',
    usedMargin: '',
    result: '',
    marginLevel: ''
  });

  const calculateLeverage = () => {
    const balance = parseFloat(calculator.accountBalance);
    const usedMargin = parseFloat(calculator.usedMargin);
    
    if (isNaN(balance) || isNaN(usedMargin) || usedMargin === 0) return;
    
    const currentLeverage = balance / usedMargin;
    const marginLevel = ((balance / usedMargin) * 100).toFixed(0);
    
    setCalculator(prev => ({ 
      ...prev, 
      result: currentLeverage.toFixed(2),
      marginLevel: marginLevel
    }));
  };

  const clearCalculator = () => {
    setCalculator({
      accountBalance: '',
      usedMargin: '',
      result: '',
      marginLevel: ''
    });
  };

  return (
    <>
      <SEOHead 
        title="XAUUSD Leverage Calculator - GoldSniper"
        description="Calculate your leverage and margin utilization for XAUUSD trading. Analyze your account's trading power and risk exposure."
        keywords="leverage calculator, margin calculator, XAUUSD trading, gold trading tools"
        canonical={`https://www.goldsniper.com/tools/leverage-calculator/${currentLanguage}`}
      />
      <div className="min-h-screen bg-black text-white">
        <Navigation />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gray-900 via-black to-gray-900 py-8 md:py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-[color:var(--brand-orange)] rounded-full">
                <Layers className="w-8 h-8 text-black" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              XAUUSD Leverage Calculator
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Calculate your current leverage and margin utilization for XAUUSD trading. Analyze your account's trading power and risk exposure.
            </p>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-4 rounded-2xl">
                <Layers className="w-8 h-8 text-white" />
              </div>
            </div>
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-2xl text-center mb-4">Leverage Calculator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="accountBalance" className="text-white">Account Balance ($)</Label>
                    <Input
                      id="accountBalance"
                      type="number"
                      placeholder="10000"
                      value={calculator.accountBalance}
                      onChange={(e) => setCalculator({...calculator, accountBalance: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="usedMargin" className="text-white">Used Margin ($)</Label>
                    <Input
                      id="usedMargin"
                      type="number"
                      placeholder="1000"
                      value={calculator.usedMargin}
                      onChange={(e) => setCalculator({...calculator, usedMargin: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button 
                    onClick={calculateLeverage}
                    className="bg-[color:var(--brand-orange)] hover:bg-[color:var(--amber-accent)] text-white font-bold py-3 px-8 rounded-xl transition-all duration-200"
                  >
                    Calculate Leverage
                  </Button>
                </div>

                {calculator.result && (
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-4 text-center">Results</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-gray-400 text-sm">Current Leverage</p>
                        <p className="text-2xl font-bold text-[color:var(--brand-orange)]">
                          {calculator.result}:1
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 text-sm">Margin Level</p>
                        <p className="text-2xl font-bold text-[color:var(--brand-orange)]">
                          {((parseFloat(calculator.accountBalance) / parseFloat(calculator.usedMargin)) * 100).toFixed(0)}%
                        </p>
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
            <h2 className="text-3xl font-bold text-white mb-8 text-center">XAUUSD Leverage Trading Guide</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Understanding Leverage</h3>
                <p className="text-gray-300 mb-4">
                  Leverage allows you to control larger positions with smaller capital in XAUUSD trading, amplifying both potential profits and losses.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li>• Higher leverage = Higher risk</li>
                  <li>• Standard ratios: 1:50 to 1:500</li>
                  <li>• Affects margin requirements</li>
                  <li>• Impacts account drawdown</li>
                </ul>
              </div>
            
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Safe Leverage Practices</h3>
                <p className="text-gray-300 mb-4">
                  Follow these guidelines for responsible leverage usage in XAUUSD trading.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li>• Use lower leverage as a beginner</li>
                  <li>• Monitor margin level closely</li>
                  <li>• Keep free margin above 50%</li>
                  <li>• Set stop losses on all trades</li>
                  <li>• Avoid overleveraging your account</li>
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
              <AppStoreButtons platform="android" size="medium" />
              <AppStoreButtons platform="ios" size="medium" />
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