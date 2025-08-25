import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguageFromUrl } from '../../components/LanguageRouter';
import SEOHead from '../../components/SEOHead';
import Navigation from '../../components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calculator, TrendingUp, Shield, AlertTriangle, DollarSign, Target, BookOpen, Lightbulb, CheckCircle, XCircle, BarChart3, PieChart, Info, Download } from 'lucide-react';
import { SiApple, SiGoogleplay } from 'react-icons/si';
import Footer from '../../components/Footer';

export default function PositionSizeCalculator() {
  const { t } = useTranslation();
  const currentLanguage = useLanguageFromUrl();
  
  const [calculator, setCalculator] = useState({
    accountBalance: '',
    riskPercentage: '',
    entryPrice: '',
    stopLoss: '',
    result: '',
    riskAmount: '',
    pipDifference: '',
    recommendation: ''
  });

  const calculatePositionSize = () => {
    const balance = parseFloat(calculator.accountBalance);
    const risk = parseFloat(calculator.riskPercentage) / 100;
    const entry = parseFloat(calculator.entryPrice);
    const sl = parseFloat(calculator.stopLoss);
    
    if (balance && risk && entry && sl && entry !== sl) {
      const riskAmount = balance * risk;
      const pipDifference = Math.abs(entry - sl);
      // For XAUUSD: Position Size = Risk Amount / (Pip Difference × Pip Value)
      // Since pip value = $1 per lot, Position Size = Risk Amount / Pip Difference
      const positionSize = riskAmount / pipDifference;
      
      let recommendation = '';
      if (risk <= 0.01) recommendation = 'Conservative - Excellent risk management';
      else if (risk <= 0.02) recommendation = 'Moderate - Good risk management';
      else if (risk <= 0.05) recommendation = 'Aggressive - Higher risk';
      else recommendation = 'Very High Risk - Consider reducing';
      
      setCalculator(prev => ({ 
        ...prev, 
        result: positionSize.toFixed(2),
        riskAmount: riskAmount.toFixed(2),
        pipDifference: pipDifference.toFixed(2),
        recommendation
      }));
    }
  };

  const clearCalculator = () => {
    setCalculator({
      accountBalance: '',
      riskPercentage: '',
      entryPrice: '',
      stopLoss: '',
      result: '',
      riskAmount: '',
      pipDifference: '',
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

  const riskLevels = [
    { percentage: '1%', description: 'Ultra Conservative', color: 'text-green-400', risk: 'Very Low' },
    { percentage: '2%', description: 'Conservative', color: 'text-blue-400', risk: 'Low' },
    { percentage: '3%', description: 'Moderate', color: 'text-yellow-400', risk: 'Medium' },
    { percentage: '5%', description: 'Aggressive', color: 'text-orange-400', risk: 'High' },
    { percentage: '10%', description: 'Very Aggressive', color: 'text-red-400', risk: 'Very High' }
  ];

  const tradingTips = [
    {
      icon: <Shield className="w-6 h-6 text-green-400" />,
      title: 'Never Risk More Than 2%',
      description: 'Professional traders never risk more than 1-2% of their account on a single XAUUSD trade.'
    },
    {
      icon: <Target className="w-6 h-6 text-blue-400" />,
      title: 'Set Stop Loss First',
      description: 'Always determine your stop loss before calculating position size. This ensures proper risk management.'
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-purple-400" />,
      title: 'Account for Spreads',
      description: 'Remember to factor in spreads and slippage when calculating your actual risk per trade.'
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-orange-400" />,
      title: 'Track Your Performance',
      description: 'Keep detailed records of your position sizing decisions and their outcomes.'
    }
  ];

  const examples = [
    {
      scenario: 'Conservative Day Trading',
      balance: '$10,000',
      risk: '1%',
      entry: '$2,050',
      stopLoss: '$2,040',
      expectedSize: '1.00 lots',
      riskAmount: '$100'
    },
    {
      scenario: 'Moderate Swing Trading',
      balance: '$25,000',
      risk: '2%',
      entry: '$2,080',
      stopLoss: '$2,060',
      expectedSize: '1.25 lots',
      riskAmount: '$500'
    },
    {
      scenario: 'Aggressive Scalping',
      balance: '$5,000',
      risk: '3%',
      entry: '$2,070',
      stopLoss: '$2,065',
      expectedSize: '3.00 lots',
      riskAmount: '$150'
    }
  ];

  return (
    <>
      <SEOHead 
        title={t('calculators.positionSize.title')}
        description={t('calculators.positionSize.description')}
        keywords="XAUUSD position size calculator, gold trading position size, forex position calculator, risk management calculator, trading position size, gold trading risk"
        canonical={`https://goldsniper.io/${currentLanguage}/tools/position-size-calculator`}
      />
      
      <div className="min-h-screen bg-black text-white">
        <Navigation currentPage="tools" />
        
        {/* Hero Section */}
        <section className="py-8 md:py-16 bg-gradient-to-br from-gray-900 via-black to-gray-900">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-4 rounded-2xl">
                  <Calculator className="w-12 h-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                {t('calculators.positionSize.title')}
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {t('calculators.positionSize.subtitle')}
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium">
                  {t('calculators.common.professionalTool')}
                </span>
                <span className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium">
                  Risk Management
                </span>
                <span className="bg-purple-500/20 text-purple-400 px-4 py-2 rounded-full text-sm font-medium">
                  {t('calculators.common.freeCalculator')}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Calculator Form */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white flex items-center">
                    <Calculator className="w-6 h-6 mr-3 text-orange-400" />
                    Position Size Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t('calculators.positionSize.accountBalance')}
                    </label>
                    <input
                      type="number"
                      value={calculator.accountBalance}
                      onChange={(e) => setCalculator(prev => ({ ...prev, accountBalance: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                      placeholder="10000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t('calculators.positionSize.riskPercentage')}
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={calculator.riskPercentage}
                      onChange={(e) => setCalculator(prev => ({ ...prev, riskPercentage: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                      placeholder="2"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t('calculators.positionSize.entryPrice')}
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={calculator.entryPrice}
                      onChange={(e) => setCalculator(prev => ({ ...prev, entryPrice: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                      placeholder="2050.00"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t('calculators.positionSize.stopLoss')}
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={calculator.stopLoss}
                      onChange={(e) => setCalculator(prev => ({ ...prev, stopLoss: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                      placeholder="2040.00"
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <Button 
                      onClick={calculatePositionSize}
                      className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition-all"
                    >
                      {t('calculators.positionSize.calculateButton')}
                    </Button>
                    <Button 
                      onClick={clearCalculator}
                      variant="outline"
                      className="px-6 py-3 border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      {t('calculators.common.clear')}
                    </Button>
                  </div>
                  
                  {calculator.result && (
                    <div className="mt-6 p-6 bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/30 rounded-lg">
                      <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        {t('calculators.common.results')}
                      </h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">{t('calculators.positionSize.positionSize')}:</span>
                          <p className="text-xl font-bold text-white">{calculator.result} lots</p>
                        </div>
                        <div>
                          <span className="text-gray-400">{t('calculators.positionSize.riskAmount')}:</span>
                          <p className="text-xl font-bold text-red-400">${calculator.riskAmount}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">{t('calculators.positionSize.pipDifference')}:</span>
                          <p className="text-xl font-bold text-blue-400">${calculator.pipDifference}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">{t('calculators.positionSize.recommendation')}:</span>
                          <p className="text-sm font-medium text-yellow-400">{calculator.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Risk Level Guide */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white flex items-center">
                    <Shield className="w-6 h-6 mr-3 text-green-400" />
                    Risk Level Guide
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {riskLevels.map((level, index) => (
                      <div key={index} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                        <div className="flex justify-between items-center mb-2">
                          <span className={`text-lg font-bold ${level.color}`}>{level.percentage}</span>
                          <span className="text-sm text-gray-400">{level.risk} Risk</span>
                        </div>
                        <p className="text-gray-300">{level.description}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                    <div className="flex items-center mb-2">
                      <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
                      <span className="font-bold text-red-400">Risk Warning</span>
                    </div>
                    <p className="text-sm text-gray-300">
                      Never risk more than you can afford to lose. XAUUSD trading involves significant risk of loss.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Trading Tips Section */}
        <section className="py-16 bg-black">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Professional Trading Tips
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Essential position sizing strategies used by professional XAUUSD traders
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tradingTips.map((tip, index) => (
                <Card key={index} className="bg-gray-900 border-gray-800 hover:border-orange-500/50 transition-all">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      {tip.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">{tip.title}</h3>
                    <p className="text-gray-400 text-sm">{tip.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Examples Section */}
        <section className="py-16 bg-gray-900/30">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Real Trading Examples
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                See how position sizing works in different XAUUSD trading scenarios
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {examples.map((example, index) => (
                <Card key={index} className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-orange-400">
                      {example.scenario}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Account Balance:</span>
                      <span className="text-white font-medium">{example.balance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Risk Percentage:</span>
                      <span className="text-white font-medium">{example.risk}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Entry Price:</span>
                      <span className="text-white font-medium">{example.entry}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Stop Loss:</span>
                      <span className="text-white font-medium">{example.stopLoss}</span>
                    </div>
                    <hr className="border-gray-700" />
                    <div className="flex justify-between">
                      <span className="text-gray-400">Position Size:</span>
                      <span className="text-green-400 font-bold">{example.expectedSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Risk Amount:</span>
                      <span className="text-red-400 font-bold">{example.riskAmount}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Educational Content */}
        <section className="py-16 bg-black">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center mb-6">
                  <BookOpen className="w-8 h-8 text-blue-400 mr-3" />
                  <h2 className="text-3xl font-bold text-white">
                    {t('calculators.positionSize.whatIsPositionSizing')}
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    {t('calculators.positionSize.whatIsPositionSizingText')}
                  </p>
                  <p>
                    Position sizing is the foundation of successful XAUUSD trading. It determines how much capital you allocate to each trade based on your risk tolerance, account size, and the specific trade setup. Proper position sizing ensures you can survive losing streaks while maximizing profits during winning streaks.
                  </p>
                  <p>
                    Professional gold traders use systematic position sizing rules to maintain consistent risk across all their XAUUSD trades, regardless of market volatility or trade duration.
                  </p>
                </div>
              </div>
              
              <div>
                <div className="flex items-center mb-6">
                  <Lightbulb className="w-8 h-8 text-yellow-400 mr-3" />
                  <h2 className="text-3xl font-bold text-white">
                    {t('calculators.positionSize.riskManagementRules')}
                  </h2>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-900 rounded-lg border border-gray-800">
                    <h3 className="text-lg font-bold text-green-400 mb-2">The 1% Rule</h3>
                    <p className="text-gray-300 text-sm">
                      Never risk more than 1% of your account on a single XAUUSD trade. This ensures you can withstand 100 consecutive losses.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-900 rounded-lg border border-gray-800">
                    <h3 className="text-lg font-bold text-blue-400 mb-2">Set Stop Loss First</h3>
                    <p className="text-gray-300 text-sm">
                      Always determine your stop loss level before calculating position size. This prevents emotional decision-making.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-900 rounded-lg border border-gray-800">
                    <h3 className="text-lg font-bold text-purple-400 mb-2">Maximum Total Risk</h3>
                    <p className="text-gray-300 text-sm">
                      Limit total portfolio risk to 5-10% across all open XAUUSD positions simultaneously.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Formula Section */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center mb-6">
              <PieChart className="w-8 h-8 text-orange-400 mr-3" />
              <h2 className="text-3xl font-bold text-white">
                {t('calculators.positionSize.positionSizeFormula')}
              </h2>
            </div>
            
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-8">
                <div className="bg-black p-6 rounded-lg border border-orange-500/30 mb-6">
                  <p className="text-2xl font-mono text-orange-400 mb-4">
                    {t('calculators.positionSize.positionSizeFormulaText')}
                  </p>
                  <p className="text-gray-400 text-sm">
                    Where Position Size is in lots, and all prices are in USD
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <h3 className="font-bold text-green-400 mb-2">Account Balance</h3>
                    <p className="text-gray-300 text-sm">Your total trading capital available</p>
                  </div>
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <h3 className="font-bold text-blue-400 mb-2">Risk Percentage</h3>
                    <p className="text-gray-300 text-sm">Percentage of account you're willing to lose</p>
                  </div>
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <h3 className="font-bold text-purple-400 mb-2">Price Difference</h3>
                    <p className="text-gray-300 text-sm">Distance between entry and stop loss</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-black">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-400">
                Common questions about XAUUSD position sizing
              </p>
            </div>
            
            <div className="space-y-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-3">
                    What's the maximum position size I should use for XAUUSD?
                  </h3>
                  <p className="text-gray-400">
                    Professional traders typically risk no more than 1-2% of their account per trade. For a $10,000 account, this means risking $100-200 per XAUUSD trade regardless of position size.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-3">
                    How do I account for XAUUSD volatility in position sizing?
                  </h3>
                  <p className="text-gray-400">
                    Gold is highly volatile, so use wider stop losses and smaller position sizes. Consider using 0.5-1% risk during high volatility periods instead of the standard 2%.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-3">
                    Should I adjust position size based on market conditions?
                  </h3>
                  <p className="text-gray-400">
                    Yes, reduce position sizes during major news events, low liquidity periods, or when market volatility is unusually high. Increase slightly during stable trending markets.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Download CTA Section */}
        <section className="py-16 bg-gradient-to-br from-orange-900/20 to-yellow-900/20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-4 rounded-2xl">
                <Download className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get Real-Time XAUUSD Signals
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Download GoldSniper for 93% accurate gold trading signals, professional analysis, and risk management tools.
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
                <span>93% Accuracy</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Real-Time Alerts</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Risk Management</span>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}