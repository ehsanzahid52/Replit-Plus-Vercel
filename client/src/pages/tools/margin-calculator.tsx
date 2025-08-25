import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Calculator, TrendingUp, Shield, AlertTriangle , Download, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Navigation from '../../components/Navigation';
import SEOHead from '../../components/SEOHead';
import Footer from '../../components/Footer';
import { SiApple, SiGoogleplay } from 'react-icons/si';
import { useLanguageFromUrl } from '../../components/LanguageRouter';

export default function MarginCalculator() {
  const { t } = useTranslation();
  const currentLanguage = useLanguageFromUrl();
  
  const [calculator, setCalculator] = useState({
    currencyPair: 'XAUUSD',
    tradeSize: '',
    leverage: '',
    accountCurrency: 'USD',
    contractSize: '100',
    currentPrice: '',
    marginRequired: '',
    marginPercentage: '',
    freeMargin: '',
    accountBalance: ''
  });

  const calculateMargin = () => {
    const tradeSize = parseFloat(calculator.tradeSize);
    const leverage = parseFloat(calculator.leverage);
    const currentPrice = parseFloat(calculator.currentPrice) || 2000; // Default gold price
    const contractSize = 100; // Standard XAUUSD contract size (100 oz)
    const accountBalance = parseFloat(calculator.accountBalance);
    
    if (tradeSize && leverage && currentPrice) {
      // For XAUUSD: Margin = (Trade Size × Contract Size × Current Price) ÷ Leverage
      const notionalValue = tradeSize * contractSize * currentPrice;
      const marginRequired = notionalValue / leverage;
      const marginPercentage = accountBalance ? (marginRequired / accountBalance) * 100 : 0;
      const freeMargin = accountBalance ? accountBalance - marginRequired : 0;
      
      setCalculator(prev => ({
        ...prev,
        marginRequired: marginRequired.toFixed(2),
        marginPercentage: marginPercentage.toFixed(2),
        freeMargin: freeMargin.toFixed(2)
      }));
    }
  };

  const clearCalculator = () => {
    setCalculator({
      currencyPair: 'XAUUSD',
      tradeSize: '',
      leverage: '',
      accountCurrency: 'USD',
      contractSize: '100',
      currentPrice: '',
      marginRequired: '',
      marginPercentage: '',
      freeMargin: '',
      accountBalance: ''
    });
  };

  const handleDownloadClick = (platform: string) => {
    if (platform.includes('android')) {
      window.open('https://play.google.com/store/apps/details?id=com.tate.goldsniper&hl=en_GB', '_blank');
    } else if (platform.includes('ios')) {
      window.open('https://apps.apple.com/us/app/gold-sniper-xauusd-signals/id1585302472', '_blank');
    }
  };

  const leverageExamples = [
    { leverage: '1:50', margin: '2%', description: 'Conservative', risk: 'Low' },
    { leverage: '1:100', margin: '1%', description: 'Standard', risk: 'Medium' },
    { leverage: '1:200', margin: '0.5%', description: 'Aggressive', risk: 'High' },
    { leverage: '1:500', margin: '0.2%', description: 'Very High Risk', risk: 'Very High' }
  ];

  return (
    <>
    <div className="min-h-screen bg-black text-white">
      <SEOHead 
        title="XAUUSD Margin Calculator - Gold Trading Margin Requirements | GoldSniper"
        description="Calculate margin requirements for XAUUSD gold trading. Free margin calculator for forex and gold traders. Determine required margin, leverage ratios, and free margin for any trade size."
        keywords="XAUUSD margin calculator, gold margin calculator, forex margin calculator, trading margin requirements, XAUUSD leverage calculator, gold trading margin, margin requirement calculator, forex leverage calculator"
        canonical={`https://goldsniper.io/${currentLanguage}/tools/margin-calculator`}
      />
      <Navigation currentPage="tools" />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 via-black to-gray-900 py-8 md:py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-[color:var(--brand-orange)] rounded-full">
              <DollarSign className="w-8 h-8 text-black" />
              </div>
            </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            XAUUSD Margin Calculator
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Calculate margin requirements for XAUUSD gold trading with different leverage ratios. Determine required margin, free margin, and understand your trading capacity before opening positions.
          </p>
          
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <Calculator className="w-4 h-4 text-[color:var(--brand-orange)]" />
              <span>Accurate Calculations</span>
              </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-[color:var(--brand-orange)]" />
              <span>Risk Management</span>
              </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-[color:var(--brand-orange)]" />
              <span>XAUUSD Optimized</span>
              </div>
            </div>
          </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-2xl text-center mb-4">Margin Requirement Calculator</CardTitle>
              <p className="text-gray-400 text-center">Calculate margin requirements for your XAUUSD trades</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Currency Pair</label>
                  <select
                    value={calculator.currencyPair}
                    onChange={(e) => setCalculator(prev => ({ ...prev, currencyPair: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[color:var(--brand-orange)] focus:outline-none"
                  >
                    <option value="XAUUSD">XAUUSD (Gold/USD)</option>
                    <option value="EURUSD">EURUSD</option>
                    <option value="GBPUSD">GBPUSD</option>
                    <option value="USDJPY">USDJPY</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Select trading instrument</p>
                  </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Trade Size (Lots)</label>
                  <input
                    type="number"
                    value={calculator.tradeSize}
                    onChange={(e) => setCalculator(prev => ({ ...prev, tradeSize: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[color:var(--brand-orange)] focus:outline-none"
                    placeholder="1.0"
                    step="0.01"
                  />
                  <p className="text-xs text-gray-500 mt-1">Position size in lots</p>
                  </div>
                </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Leverage (1:X)</label>
                  <input
                    type="number"
                    value={calculator.leverage}
                    onChange={(e) => setCalculator(prev => ({ ...prev, leverage: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[color:var(--brand-orange)] focus:outline-none"
                    placeholder="100"
                  />
                  <p className="text-xs text-gray-500 mt-1">Your broker's leverage ratio</p>
                  </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Current Gold Price ($)</label>
                  <input
                    type="number"
                    value={calculator.currentPrice}
                    onChange={(e) => setCalculator(prev => ({ ...prev, currentPrice: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[color:var(--brand-orange)] focus:outline-none"
                    placeholder="2000.00"
                    step="0.01"
                  />
                  <p className="text-xs text-gray-500 mt-1">Current XAUUSD price</p>
                  </div>
                </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Account Balance ($)</label>
                  <input
                    type="number"
                    value={calculator.accountBalance}
                    onChange={(e) => setCalculator(prev => ({ ...prev, accountBalance: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[color:var(--brand-orange)] focus:outline-none"
                    placeholder="10000"
                  />
                  <p className="text-xs text-gray-500 mt-1">Your trading account balance</p>
                  </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Contract Size</label>
                  <input
                    type="number"
                    value={calculator.contractSize}
                    onChange={(e) => setCalculator(prev => ({ ...prev, contractSize: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[color:var(--brand-orange)] focus:outline-none"
                    placeholder="100"
                    disabled
                  />
                  <p className="text-xs text-gray-500 mt-1">Ounces per lot (XAUUSD standard)</p>
                  </div>
                </div>

              <div className="flex space-x-4">
                <Button onClick={calculateMargin} className="flex-1 bg-[color:var(--brand-orange)] hover:bg-[color:var(--amber-accent)] text-black font-semibold py-3">
                  Calculate Margin
                </Button>
                <Button onClick={clearCalculator} variant="outline" className="px-8 border-gray-600 text-gray-300 hover:bg-gray-800">
                  Clear
                </Button>
                </div>

              {calculator.marginRequired && (
                <div className="mt-8 p-6 bg-gray-800 rounded-lg border border-gray-700">
                  <h3 className="text-white font-semibold mb-4">Margin Calculation Results</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-900 p-4 rounded">
                      <div className="text-sm text-gray-400">Required Margin</div>
                      <div className="text-2xl font-bold text-red-400">${calculator.marginRequired}</div>
                      <div className="text-xs text-gray-500">Capital locked for this trade</div>
                      </div>
                    <div className="bg-gray-900 p-4 rounded">
                      <div className="text-sm text-gray-400">Free Margin</div>
                      <div className={`text-2xl font-bold ${parseFloat(calculator.freeMargin) > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        ${calculator.freeMargin}
                        </div>
                      <div className="text-xs text-gray-500">Available for new trades</div>
                      </div>
                    </div>
                  <div className="mt-4 grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-900 p-4 rounded">
                      <div className="text-sm text-gray-400">Margin Usage</div>
                      <div className="text-lg font-semibold text-yellow-400">{calculator.marginPercentage}%</div>
                      <div className="text-xs text-gray-500">Of total account balance</div>
                      </div>
                    <div className="bg-gray-900 p-4 rounded">
                      <div className="text-sm text-gray-400">Leverage Ratio</div>
                      <div className="text-lg font-semibold text-blue-400">1:{calculator.leverage}</div>
                      <div className="text-xs text-gray-500">Applied leverage</div>
                      </div>
                    </div>
                  {parseFloat(calculator.marginPercentage) > 50 && (
                    <div className="mt-4 p-4 bg-red-900/30 border border-red-500/50 rounded">
                      <div className="flex items-center">
                        <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
                        <span className="text-red-400 font-medium">High Margin Usage Warning</span>
                        </div>
                      <div className="text-red-300 text-sm mt-1">
                        Using {calculator.marginPercentage}% of your account as margin is risky. Consider reducing position size.
                        </div>
                      </div>
                  )}
                  </div>
              )}
            </CardContent>
          </Card>
          </div>
      </section>

      {/* Leverage Examples */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">XAUUSD Leverage & Margin Examples</h2>
          <p className="text-gray-400 text-center mb-12 max-w-3xl mx-auto">
            Different leverage ratios require different margin amounts. Higher leverage means lower margin requirements but increased risk.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leverageExamples.map((example, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-[color:var(--brand-orange)] mb-2">
                    {example.leverage}
                    </div>
                  <div className="text-white font-medium mb-2">
                    {example.margin} Margin
                    </div>
                  <div className="text-gray-300 text-sm mb-4">
                    {example.description}
                    </div>
                  <div className={`text-xs font-medium px-2 py-1 rounded ${
                    example.risk === 'Low' ? 'bg-green-900 text-green-400' :
                    example.risk === 'Medium' ? 'bg-yellow-900 text-yellow-400' :
                    example.risk === 'High' ? 'bg-red-900 text-red-400' :
                    'bg-red-900 text-red-300'
                  }`}>
                    {example.risk} Risk
                    </div>
                </CardContent>
              </Card>
            ))}
            </div>
          </div>
      </section>

      {/* Educational Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Understanding XAUUSD Margin Requirements</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">What is Trading Margin?</h3>
              <p className="text-gray-300 mb-4">
                Trading margin is the deposit required to open a leveraged position in XAUUSD. It's not a fee but collateral that your broker holds while your position is open.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li>• Enables leveraged trading</li>
                <li>• Returned when position closes</li>
                <li>• Varies with position size and leverage</li>
                <li>• Required for all leveraged instruments</li>
              </ul>
              </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Margin vs Free Margin</h3>
              <p className="text-gray-300 mb-4">
                Understanding the difference between used margin and free margin is crucial for effective XAUUSD trading and risk management.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li>• Used Margin: Locked for open positions</li>
                <li>• Free Margin: Available for new trades</li>
                <li>• Margin Level: Equity ÷ Used Margin × 100</li>
                <li>• Margin Call: When margin level drops too low</li>
              </ul>
              </div>
            </div>

          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">XAUUSD Margin Calculation Formula</h3>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="text-center">
                <div className="text-lg text-gray-300 mb-2">Required Margin =</div>
                <div className="text-xl font-mono text-[color:var(--brand-orange)]">
                  (Trade Size × Contract Size × Current Price) ÷ Leverage
                  </div>
                <div className="text-sm text-gray-400 mt-4">
                  For 1 lot XAUUSD at $2000 with 1:100 leverage: (1 × 100 × $2000) ÷ 100 = $2000 margin required
                  </div>
                </div>
              </div>
            </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-green-400 mr-3" />
                <h4 className="text-lg font-semibold text-white">Conservative (1:50)</h4>
                </div>
              <p className="text-gray-300 text-sm">
                2% margin requirement. Lower risk but requires more capital. Suitable for risk-averse traders.
              </p>
              </div>
            
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center mb-4">
                <DollarSign className="w-6 h-6 text-yellow-400 mr-3" />
                <h4 className="text-lg font-semibold text-white">Standard (1:100)</h4>
                </div>
              <p className="text-gray-300 text-sm">
                1% margin requirement. Balanced approach used by most professional XAUUSD traders.
              </p>
              </div>
            
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-6 h-6 text-red-400 mr-3" />
                <h4 className="text-lg font-semibold text-white">High Risk (1:500+)</h4>
                </div>
              <p className="text-gray-300 text-sm">
                0.2% or less margin. Very risky - small movements can wipe out accounts. Use with extreme caution.
              </p>
              </div>
            </div>
          </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">XAUUSD Margin Calculator FAQ</h2>
          
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-3">How much margin do I need to trade 1 lot of XAUUSD?</h3>
              <p className="text-gray-300">
                Margin required depends on leverage and current gold price. With 1:100 leverage and gold at $2000: 1 lot requires $2000 margin. With 1:200 leverage: $1000 margin. Use our calculator for exact amounts.
              </p>
              </div>
            
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-3">What happens if my free margin reaches zero?</h3>
              <p className="text-gray-300">
                When free margin reaches zero, you cannot open new positions. If it goes negative due to losing trades, your broker may issue a margin call or automatically close positions to protect your account.
              </p>
              </div>
            
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-3">Is higher leverage always better for XAUUSD trading?</h3>
              <p className="text-gray-300">
                No. While higher leverage requires less margin, it significantly increases risk. XAUUSD can be volatile - high leverage can quickly wipe out accounts. Most professionals use conservative leverage ratios for gold trading.
              </p>
              </div>
            
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-3">How is XAUUSD margin different from forex pairs?</h3>
              <p className="text-gray-300">
                XAUUSD margin calculation is similar to forex but uses the gold price directly. Unlike currency pairs where you need conversion rates, XAUUSD margin is calculated using the current gold price in USD, making calculations more straightforward.
              </p>
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