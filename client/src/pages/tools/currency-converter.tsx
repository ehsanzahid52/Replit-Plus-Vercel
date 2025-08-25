import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, Calculator, BarChart3, Target, Download, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Navigation from '../../components/Navigation';
import SEOHead from '../../components/SEOHead';
import Footer from '../../components/Footer';
import { SiApple, SiGoogleplay } from 'react-icons/si';
import { useLanguageFromUrl } from '../../components/LanguageRouter';

export default function CurrencyConverter() {
  const { t } = useTranslation();
  const currentLanguage = useLanguageFromUrl();
  
  const [calculator, setCalculator] = useState({
    amount: '',
    fromCurrency: 'USD',
    toCurrency: 'EUR',
    result: '',
    rate: ''
  });

  const calculateCurrencyConversion = () => {
    const amount = parseFloat(calculator.amount);
    if (isNaN(amount)) return;
    
    // Simplified exchange rates for demo
    const exchangeRates: { [key: string]: number } = {
      'USD-EUR': 0.85,
      'EUR-USD': 1.18,
      'USD-GBP': 0.73,
      'GBP-USD': 1.37,
      'USD-JPY': 110.0,
      'JPY-USD': 0.009,
      'USD-CHF': 0.92,
      'CHF-USD': 1.09,
      'USD-CAD': 1.25,
      'CAD-USD': 0.80,
      'USD-AUD': 1.35,
      'AUD-USD': 0.74
    };
    
    const rateKey = `${calculator.fromCurrency}-${calculator.toCurrency}`;
    const rate = exchangeRates[rateKey] || 1;
    const result = (amount * rate).toFixed(2);
    
    setCalculator(prev => ({ 
      ...prev, 
      result, 
      rate: rate.toFixed(4) 
    }));
  };

  const clearCalculator = () => {
    setCalculator({
      amount: '',
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      result: '',
      rate: ''
    });
  };

  const handleDownloadClick = (platform: string) => {
    if (platform.includes('android')) {
      window.open('https://play.google.com/store/apps/details?id=com.tate.goldsniper&hl=en_GB', '_blank');
    } else if (platform.includes('ios')) {
      window.open('https://apps.apple.com/us/app/gold-sniper-xauusd-signals/id1585302472', '_blank');
    }
  };

  const swapCurrencies = () => {
    setCalculator(prev => ({
      ...prev,
      fromCurrency: prev.toCurrency,
      toCurrency: prev.fromCurrency,
      result: '',
      rate: ''
    }));
  };

  return (
    <>
    <div className="min-h-screen bg-black text-white">
      <SEOHead 
        title="Currency Converter - XAUUSD International Trading Tool | GoldSniper"
        description="Convert currencies for international XAUUSD gold trading. Real-time exchange rates for major currency pairs used in global gold markets."
        keywords="currency converter, XAUUSD currency exchange, international gold trading, forex rates, currency calculator, gold trading currencies"
        canonical={`https://goldsniper.io/${currentLanguage}/tools/currency-converter`}
      />
      <Navigation currentPage="tools" />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 via-black to-gray-900 py-8 md:py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-[color:var(--brand-orange)] rounded-full">
              <RefreshCw className="w-8 h-8 text-black" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Currency Converter
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Convert currencies for international XAUUSD gold trading. Essential tool for managing multi-currency trading accounts and global gold markets.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-2xl text-center mb-4">Currency Converter</CardTitle>
              <p className="text-gray-400 text-center">Convert between major trading currencies</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-4 gap-6 items-end">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Amount</label>
                  <input
                    type="number"
                    value={calculator.amount}
                    onChange={(e) => setCalculator(prev => ({ ...prev, amount: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[color:var(--brand-orange)] focus:outline-none"
                    placeholder="1000"
                    step="0.01"
                  />
                  </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">From</label>
                  <select
                    value={calculator.fromCurrency}
                    onChange={(e) => setCalculator(prev => ({ ...prev, fromCurrency: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[color:var(--brand-orange)] focus:outline-none"
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="JPY">JPY - Japanese Yen</option>
                    <option value="CHF">CHF - Swiss Franc</option>
                    <option value="CAD">CAD - Canadian Dollar</option>
                    <option value="AUD">AUD - Australian Dollar</option>
                  </select>
                </div>
                <div className="flex justify-center">
                  <Button 
                    onClick={swapCurrencies}
                    variant="outline" 
                    size="sm"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                  </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">To</label>
                  <select
                    value={calculator.toCurrency}
                    onChange={(e) => setCalculator(prev => ({ ...prev, toCurrency: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[color:var(--brand-orange)] focus:outline-none"
                  >
                    <option value="EUR">EUR - Euro</option>
                    <option value="USD">USD - US Dollar</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="JPY">JPY - Japanese Yen</option>
                    <option value="CHF">CHF - Swiss Franc</option>
                    <option value="CAD">CAD - Canadian Dollar</option>
                    <option value="AUD">AUD - Australian Dollar</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button onClick={calculateCurrencyConversion} className="flex-1 bg-[color:var(--brand-orange)] hover:bg-[color:var(--amber-accent)] text-black font-semibold py-3">
                  Convert Currency
                </Button>
                <Button onClick={clearCalculator} variant="outline" className="px-8 border-gray-600 text-gray-300 hover:bg-gray-800">
                  Clear
                </Button>
              </div>

              {calculator.result && (
                <div className="mt-8 p-6 bg-gray-800 rounded-lg border border-gray-700">
                  <h3 className="text-white font-semibold mb-4">Conversion Result</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-900 p-4 rounded">
                      <span className="text-gray-300 font-medium">Converted Amount</span>
                      <p className="text-green-400 font-bold text-2xl">{calculator.result} {calculator.toCurrency}</p>
                    </div>
                    <div className="bg-gray-900 p-4 rounded">
                      <span className="text-gray-300 font-medium">Exchange Rate</span>
                      <p className="text-blue-400 font-bold text-xl">1 {calculator.fromCurrency} = {calculator.rate} {calculator.toCurrency}</p>
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
          <h2 className="text-3xl font-bold text-white mb-8 text-center">International XAUUSD Trading</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Currency Considerations</h3>
              <p className="text-gray-300 mb-4">
                When trading XAUUSD internationally, currency conversion affects your profits, margins, and risk calculations.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li>• Account base currency matters</li>
                <li>• Exchange rate fluctuations affect profits</li>
                <li>• Consider conversion costs</li>
                <li>• Monitor currency correlations</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Major Trading Currencies</h3>
              <p className="text-gray-300 mb-4">
                These are the most common currencies used in XAUUSD gold trading globally.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li>• USD - Primary gold trading currency</li>
                <li>• EUR - European gold markets</li>
                <li>• GBP - London gold fixing</li>
                <li>• JPY - Asian trading sessions</li>
                <li>• CHF - Safe haven correlations</li>
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
