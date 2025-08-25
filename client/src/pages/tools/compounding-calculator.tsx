import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TrendingUp, Download, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguageFromUrl } from '../../components/LanguageRouter';
import Navigation from '../../components/Navigation';
import SEOHead from '../../components/SEOHead';
import Footer from '../../components/Footer';
import AppStoreButtons from '../../components/ui/AppStoreButtons';

export default function CompoundingCalculator() {
  const { t } = useTranslation();
  const currentLanguage = useLanguageFromUrl();
  const [calculator, setCalculator] = useState({
    initialCapital: '',
    monthlyContribution: '',
    monthlyReturn: '',
    years: '',
    result: '',
    totalContributed: '',
    totalInterest: '',
    finalAmount: ''
  });

  const calculateCompounding = () => {
    const initial = parseFloat(calculator.initialCapital);
    const monthlyContribution = parseFloat(calculator.monthlyContribution);
    const monthlyReturn = parseFloat(calculator.monthlyReturn) / 100;
    const years = parseInt(calculator.years);
    
    if (isNaN(initial) || isNaN(monthlyContribution) || isNaN(monthlyReturn) || isNaN(years)) return;
    
    const totalMonths = years * 12;
    let currentBalance = initial;
    let totalContributed = 0;
    let totalInterest = 0;

    for (let i = 1; i <= totalMonths; i++) {
      const monthlyInterest = currentBalance * monthlyReturn;
      currentBalance += monthlyInterest;
      totalContributed += monthlyContribution;
      totalInterest += monthlyInterest;
    }

    setCalculator({
      ...calculator,
      finalAmount: currentBalance.toFixed(2),
      totalContributed: totalContributed.toFixed(2),
      totalInterest: totalInterest.toFixed(2)
    });
  };

  const clearCalculator = () => {
    setCalculator({
      initialCapital: '',
      monthlyContribution: '',
      monthlyReturn: '',
      years: '',
      result: '',
      totalContributed: '',
      totalInterest: '',
      finalAmount: ''
    });
  };

  return (
    <>
      <SEOHead 
        title="XAUUSD Compounding Calculator - GoldSniper"
        description="Calculate compound growth for XAUUSD trading strategies. Plan your long-term trading success with our compounding calculator."
        keywords="compounding calculator, compound growth, XAUUSD trading, gold trading tools"
        canonical={`https://www.goldsniper.com/tools/compounding-calculator/${currentLanguage}`}
      />
      <div className="min-h-screen bg-black text-white">
        <Navigation currentPage="tools" />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gray-900 via-black to-gray-900 py-8 md:py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-[color:var(--brand-orange)] rounded-full">
                <TrendingUp className="w-8 h-8 text-black" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              XAUUSD Compounding Calculator
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Calculate compound growth for XAUUSD trading strategies. Plan your long-term trading success with our compounding calculator.
            </p>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-2xl text-center mb-4">Compounding Calculator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="initialCapital" className="text-white">Initial Capital ($)</Label>
                    <Input
                      id="initialCapital"
                      type="number"
                      placeholder="10000"
                      value={calculator.initialCapital}
                      onChange={(e) => setCalculator({...calculator, initialCapital: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <Label htmlFor="monthlyContribution" className="text-white">Monthly Contribution ($)</Label>
                    <Input
                      id="monthlyContribution"
                      type="number"
                      placeholder="1000"
                      value={calculator.monthlyContribution}
                      onChange={(e) => setCalculator({...calculator, monthlyContribution: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white"
                      step="0.01"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="monthlyReturn" className="text-white">Monthly Return (%)</Label>
                    <Input
                      id="monthlyReturn"
                      type="number"
                      placeholder="5"
                      value={calculator.monthlyReturn}
                      onChange={(e) => setCalculator({...calculator, monthlyReturn: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="years" className="text-white">Years</Label>
                    <Input
                      id="years"
                      type="number"
                      placeholder="5"
                      value={calculator.years}
                      onChange={(e) => setCalculator({...calculator, years: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white"
                      step="0.1"
                    />
                  </div>
                </div>
                
                <div className="flex justify-center space-x-4">
                  <Button 
                    onClick={calculateCompounding}
                    className="bg-[color:var(--brand-orange)] hover:bg-[color:var(--amber-accent)] text-white font-bold py-3 px-8 rounded-xl transition-all duration-200"
                  >
                    Calculate
                  </Button>
                  <Button 
                    onClick={clearCalculator}
                    variant="outline"
                    className="px-8 border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    Clear
                  </Button>
                </div>

                {calculator.result && (
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-4 text-center">Results</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-gray-400 text-sm">Final Amount</p>
                        <p className="text-2xl font-bold text-[color:var(--brand-orange)]">
                          ${calculator.finalAmount}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 text-sm">Total Interest</p>
                        <p className="text-2xl font-bold text-[color:var(--brand-orange)]">
                          ${calculator.totalInterest}
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
            <h2 className="text-3xl font-bold text-white mb-8 text-center">XAUUSD Compounding Strategy</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Power of Compounding</h3>
                <p className="text-gray-300 mb-4">
                  Compounding allows your XAUUSD trading gains to generate their own gains, creating exponential growth over time.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li>• Reinvest all profits consistently</li>
                  <li>• Small returns compound into large gains</li>
                  <li>• Time is your greatest ally</li>
                  <li>• Consistency beats home runs</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Realistic Expectations</h3>
                <p className="text-gray-300 mb-4">
                  Set realistic monthly return targets for sustainable XAUUSD trading growth.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li>• Conservative: 2-5% monthly</li>
                  <li>• Moderate: 5-10% monthly</li>
                  <li>• Aggressive: 10%+ monthly (high risk)</li>
                  <li>• Focus on consistency over big wins</li>
                  <li>• Account for drawdown periods</li>
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