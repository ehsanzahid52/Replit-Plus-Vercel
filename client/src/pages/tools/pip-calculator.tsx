import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguageFromUrl } from '../../components/LanguageRouter';
import SEOHead from '../../components/SEOHead';
import Navigation from '../../components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calculator, TrendingUp, DollarSign, Target, BookOpen, Lightbulb, CheckCircle, BarChart3, PieChart, Info, ArrowUpDown, Zap, Download } from 'lucide-react';
import { SiApple, SiGoogleplay } from 'react-icons/si';
import Footer from '../../components/Footer';

export default function PipCalculator() {
  const { t } = useTranslation();
  const currentLanguage = useLanguageFromUrl();
  
  const [calculator, setCalculator] = useState({
    currencyPair: 'XAUUSD',
    tradeSize: '',
    pips: '',
    accountCurrency: 'USD',
    pipValue: '',
    totalValue: '',
    profitLoss: ''
  });

  const calculatePipValue = () => {
    const tradeSize = parseFloat(calculator.tradeSize);
    const pips = parseFloat(calculator.pips);
    
    if (tradeSize && pips) {
      // For XAUUSD, 1 pip = $0.01, 1 lot = 100 oz
      const pipValue = (tradeSize * 100 * 0.01);
      const totalValue = pipValue * pips;
      
      setCalculator(prev => ({ 
        ...prev, 
        pipValue: pipValue.toFixed(2),
        totalValue: totalValue.toFixed(2),
        profitLoss: totalValue.toFixed(2)
      }));
    }
  };

  const clearCalculator = () => {
    setCalculator({
      currencyPair: 'XAUUSD',
      tradeSize: '',
      pips: '',
      accountCurrency: 'USD',
      pipValue: '',
      totalValue: '',
      profitLoss: ''
    });
  };

  const handleDownloadClick = (platform: string) => {
    if (platform.includes('android')) {
      window.open('https://play.google.com/store/apps/details?id=com.tate.goldsniper&hl=en_GB', '_blank');
    } else if (platform.includes('ios')) {
      window.open('https://apps.apple.com/us/app/gold-sniper-xauusd-signals/id1585302472', '_blank');
    }
  };

  const pipExamples = [
    {
      scenario: 'Small Day Trade',
      lotSize: '0.1',
      pipMovement: '10',
      pipValue: '$1.00',
      totalPnL: '$10.00',
      direction: 'profit',
      description: 'Conservative position with small profit'
    },
    {
      scenario: 'Standard Scalp',
      lotSize: '0.5',
      pipMovement: '5',
      pipValue: '$5.00',
      totalPnL: '$25.00',
      direction: 'profit',
      description: 'Quick scalping trade'
    },
    {
      scenario: 'Swing Trade Win',
      lotSize: '1.0',
      pipMovement: '50',
      pipValue: '$10.00',
      totalPnL: '$500.00',
      direction: 'profit',
      description: 'Larger position with significant gain'
    },
    {
      scenario: 'Stop Loss Hit',
      lotSize: '0.2',
      pipMovement: '-20',
      pipValue: '$2.00',
      totalPnL: '-$40.00',
      direction: 'loss',
      description: 'Controlled loss with proper risk management'
    }
  ];

  const tradingScenarios = [
    {
      title: 'Scalping Strategy',
      description: 'Quick trades targeting 2-5 pips',
      timeframe: '1-5 minutes',
      typicalPips: '2-5 pips',
      riskReward: '1:1 to 1:2',
      lotSize: '0.1-0.5 lots'
    },
    {
      title: 'Day Trading',
      description: 'Intraday trades targeting 10-30 pips',
      timeframe: '15min-4H',
      typicalPips: '10-30 pips',
      riskReward: '1:2 to 1:3',
      lotSize: '0.1-1.0 lots'
    },
    {
      title: 'Swing Trading',
      description: 'Multi-day trades targeting 50-200 pips',
      timeframe: '4H-Daily',
      typicalPips: '50-200 pips',
      riskReward: '1:3 to 1:5',
      lotSize: '0.05-0.5 lots'
    }
  ];

  const pipFacts = [
    {
      icon: <Target className="w-6 h-6 text-blue-400" />,
      title: 'XAUUSD Pip Value',
      description: 'For XAUUSD, 1 pip = $0.01. With 1 standard lot (100 oz), each pip movement equals $1.00.'
    },
    {
      icon: <Calculator className="w-6 h-6 text-green-400" />,
      title: 'Lot Size Impact',
      description: 'Doubling your lot size doubles your pip value. 0.1 lot = $0.10 per pip, 1.0 lot = $1.00 per pip.'
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-purple-400" />,
      title: 'Profit Calculation',
      description: 'Total P&L = Pip Movement × Pip Value × Number of Lots. Always calculate before entering trades.'
    },
    {
      icon: <Zap className="w-6 h-6 text-orange-400" />,
      title: 'Quick Math',
      description: 'For 1 lot XAUUSD: 10 pips = $10, 50 pips = $50, 100 pips = $100 profit/loss.'
    }
  ];

  return (
    <>
      <SEOHead 
        title={t('calculators.pip.title')}
        description={t('calculators.pip.description')}
        keywords="XAUUSD pip calculator, gold pip value calculator, forex pip calculator, trading pip value, gold trading pips, XAUUSD pip value"
        canonical={`https://goldsniper.io/${currentLanguage}/tools/pip-calculator`}
      />
      
      <div className="min-h-screen bg-black text-white">
        <Navigation currentPage="tools" />
        
        {/* Hero Section */}
        <section className="py-8 md:py-16 bg-gradient-to-br from-gray-900 via-black to-gray-900">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-2xl">
                  <Calculator className="w-12 h-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {t('calculators.pip.title')}
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {t('calculators.pip.subtitle')}
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <span className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium">
                  {t('calculators.common.professionalTool')}
                </span>
                <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium">
                  Pip Value Calculator
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
                    <Calculator className="w-6 h-6 mr-3 text-blue-400" />
                    XAUUSD Pip Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t('calculators.pip.currencyPair')}
                    </label>
                    <select
                      value={calculator.currencyPair}
                      onChange={(e) => setCalculator(prev => ({ ...prev, currencyPair: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                    >
                      <option value="XAUUSD">XAUUSD (Gold/USD)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t('calculators.pip.tradeSize')}
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={calculator.tradeSize}
                      onChange={(e) => setCalculator(prev => ({ ...prev, tradeSize: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                      placeholder="1.0"
                    />
                    <p className="text-xs text-gray-500 mt-1">Standard lot = 1.0, Mini lot = 0.1, Micro lot = 0.01</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t('calculators.pip.pips')}
                    </label>
                    <input
                      type="number"
                      value={calculator.pips}
                      onChange={(e) => setCalculator(prev => ({ ...prev, pips: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                      placeholder="10"
                    />
                    <p className="text-xs text-gray-500 mt-1">Enter positive for profit, negative for loss</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t('calculators.pip.accountCurrency')}
                    </label>
                    <select
                      value={calculator.accountCurrency}
                      onChange={(e) => setCalculator(prev => ({ ...prev, accountCurrency: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                    >
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                    </select>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button 
                      onClick={calculatePipValue}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-all"
                    >
                      {t('calculators.pip.calculateButton')}
                    </Button>
                    <Button 
                      onClick={clearCalculator}
                      variant="outline"
                      className="px-6 py-3 border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      {t('calculators.common.clear')}
                    </Button>
                  </div>
                  
                  {calculator.pipValue && (
                    <div className="mt-6 p-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-lg">
                      <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        {t('calculators.common.results')}
                      </h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">{t('calculators.pip.pipValue')}:</span>
                          <p className="text-xl font-bold text-white">${calculator.pipValue}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">{t('calculators.pip.totalValue')}:</span>
                          <p className={`text-xl font-bold ${parseFloat(calculator.totalValue) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            ${calculator.totalValue}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Pip Value Quick Reference */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white flex items-center">
                    <Target className="w-6 h-6 mr-3 text-green-400" />
                    XAUUSD Pip Value Reference
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center text-xs font-medium text-gray-400 border-b border-gray-700 pb-2">
                      <span>Lot Size</span>
                      <span>Per Pip Value</span>
                      <span>10 Pip Move</span>
                    </div>
                    
                    {[
                      { lot: '0.01', pip: '$0.01', tenPips: '$0.10' },
                      { lot: '0.1', pip: '$0.10', tenPips: '$1.00' },
                      { lot: '0.5', pip: '$0.50', tenPips: '$5.00' },
                      { lot: '1.0', pip: '$1.00', tenPips: '$10.00' },
                      { lot: '2.0', pip: '$2.00', tenPips: '$20.00' },
                      { lot: '5.0', pip: '$5.00', tenPips: '$50.00' }
                    ].map((row, index) => (
                      <div key={index} className="grid grid-cols-3 gap-4 text-center py-2 hover:bg-gray-800 rounded">
                        <span className="text-blue-400 font-medium">{row.lot}</span>
                        <span className="text-white">{row.pip}</span>
                        <span className="text-green-400">{row.tenPips}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Info className="w-5 h-5 text-blue-400 mr-2" />
                      <span className="font-bold text-blue-400">Quick Tip</span>
                    </div>
                    <p className="text-sm text-gray-300">
                      For XAUUSD, each $1.00 price movement equals 100 pips. A move from $2000 to $2001 = 100 pips.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Trading Examples Section */}
        <section className="py-16 bg-black">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Real Trading Examples
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                See how pip values work in different XAUUSD trading scenarios
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
              {pipExamples.map((example, index) => (
                <Card key={index} className="bg-gray-900 border-gray-800 hover:border-blue-500/50 transition-all">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-blue-400 flex items-center justify-between">
                      {example.scenario}
                      <span className={`text-sm ${example.direction === 'profit' ? 'text-green-400' : 'text-red-400'}`}>
                        {example.direction === 'profit' ? '↗' : '↘'}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Lot Size:</span>
                      <span className="text-white font-medium">{example.lotSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Pip Movement:</span>
                      <span className="text-white font-medium">{example.pipMovement}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Pip Value:</span>
                      <span className="text-white font-medium">{example.pipValue}</span>
                    </div>
                    <hr className="border-gray-700" />
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total P&L:</span>
                      <span className={`font-bold ${example.direction === 'profit' ? 'text-green-400' : 'text-red-400'}`}>
                        {example.totalPnL}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{example.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trading Strategies Section */}
        <section className="py-16 bg-gray-900/30">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                XAUUSD Trading Strategies
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Different trading approaches and their typical pip targets
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {tradingScenarios.map((scenario, index) => (
                <Card key={index} className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-white">
                      {scenario.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300">{scenario.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Timeframe:</span>
                        <span className="text-blue-400 font-medium">{scenario.timeframe}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Typical Pips:</span>
                        <span className="text-green-400 font-medium">{scenario.typicalPips}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Risk:Reward:</span>
                        <span className="text-purple-400 font-medium">{scenario.riskReward}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Lot Size:</span>
                        <span className="text-orange-400 font-medium">{scenario.lotSize}</span>
                      </div>
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
                    {t('calculators.pip.whatIsAPip')}
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    {t('calculators.pip.whatIsAPipText')}
                  </p>
                  <p>
                    In XAUUSD trading, understanding pip values is crucial for calculating potential profits and losses. Unlike traditional forex pairs, gold (XAUUSD) uses a different pip structure where movements are typically measured in dollars and cents.
                  </p>
                  <p>
                    For XAUUSD, a pip is $0.01 movement in the gold price. If gold moves from $2000.00 to $2000.10, that's a 10-pip movement. This makes calculation straightforward: each pip equals exactly one cent.
                  </p>
                  <div className="mt-6 p-4 bg-gray-900 rounded-lg border border-gray-800">
                    <h3 className="text-lg font-bold text-green-400 mb-2">Key Point</h3>
                    <p className="text-sm">
                      XAUUSD pip value = Trade Size (lots) × 100 oz × $0.01 = $1.00 per pip for 1 standard lot
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center mb-6">
                  <Lightbulb className="w-8 h-8 text-yellow-400 mr-3" />
                  <h2 className="text-3xl font-bold text-white">
                    {t('calculators.pip.calculatingPipValue')}
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    {t('calculators.pip.calculatingPipValueText')}
                  </p>
                  <p>
                    The pip value calculation for XAUUSD is simpler than most currency pairs because it's quoted directly in USD. This eliminates the need for complex currency conversions that other pairs require.
                  </p>
                  <div className="space-y-3 mt-6">
                    <div className="p-3 bg-gray-900 rounded border border-gray-800">
                      <div className="flex justify-between items-center">
                        <span className="text-blue-400 font-medium">0.1 lots:</span>
                        <span className="text-white">$0.10 per pip</span>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-900 rounded border border-gray-800">
                      <div className="flex justify-between items-center">
                        <span className="text-blue-400 font-medium">1.0 lots:</span>
                        <span className="text-white">$1.00 per pip</span>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-900 rounded border border-gray-800">
                      <div className="flex justify-between items-center">
                        <span className="text-blue-400 font-medium">10.0 lots:</span>
                        <span className="text-white">$10.00 per pip</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pip Facts Section */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Essential Pip Facts
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Key information every XAUUSD trader should know about pips
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pipFacts.map((fact, index) => (
                <Card key={index} className="bg-gray-900 border-gray-800 hover:border-blue-500/50 transition-all">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      {fact.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">{fact.title}</h3>
                    <p className="text-gray-400 text-sm">{fact.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Formula Section */}
        <section className="py-16 bg-black">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center mb-6">
              <PieChart className="w-8 h-8 text-blue-400 mr-3" />
              <h2 className="text-3xl font-bold text-white">
                {t('calculators.pip.pipValueFormula')}
              </h2>
            </div>
            
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-8">
                <div className="bg-black p-6 rounded-lg border border-blue-500/30 mb-6">
                  <p className="text-2xl font-mono text-blue-400 mb-4">
                    {t('calculators.pip.pipValueFormulaText')}
                  </p>
                  <p className="text-gray-400 text-sm">
                    For XAUUSD: Pip Value = Trade Size (lots) × 100 oz × $0.01
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <h3 className="font-bold text-green-400 mb-2">Trade Size</h3>
                    <p className="text-gray-300 text-sm">Number of lots you're trading (0.1, 1.0, etc.)</p>
                  </div>
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <h3 className="font-bold text-blue-400 mb-2">Pip Movement</h3>
                    <p className="text-gray-300 text-sm">Number of pips the price moved</p>
                  </div>
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <h3 className="font-bold text-purple-400 mb-2">Contract Size</h3>
                    <p className="text-gray-300 text-sm">100 ounces per standard lot for XAUUSD</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-900/30">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-400">
                Common questions about XAUUSD pip calculations
              </p>
            </div>
            
            <div className="space-y-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-3">
                    How much is 1 pip worth in XAUUSD?
                  </h3>
                  <p className="text-gray-400">
                    For 1 standard lot (100 oz) of XAUUSD, 1 pip equals $1.00. For 0.1 lots, 1 pip equals $0.10. The pip value scales directly with your position size.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-3">
                    What's the difference between pips and points in gold trading?
                  </h3>
                  <p className="text-gray-400">
                    In XAUUSD, pips and points are often used interchangeably. Both refer to $0.01 movements. However, some brokers may use "points" for smaller decimal places beyond the standard pip.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-3">
                    How do spreads affect pip calculations?
                  </h3>
                  <p className="text-gray-400">
                    Spreads represent the difference between bid and ask prices, measured in pips. For XAUUSD, typical spreads range from 0.3 to 1.0 pips. This cost is deducted from your profit calculation.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Download CTA Section */}
        <section className="py-16 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-2xl">
                <Download className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Master XAUUSD Trading
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Get precise pip calculations with our mobile app featuring real-time signals and advanced trading tools.
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
                <span>Instant Pip Values</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Live Market Data</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Professional Tools</span>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}