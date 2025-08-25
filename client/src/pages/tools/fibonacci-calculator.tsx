import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BarChart3, Download, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguageFromUrl } from '../../components/LanguageRouter';
import Navigation from '../../components/Navigation';
import SEOHead from '../../components/SEOHead';
import Footer from '../../components/Footer';
import AppStoreButtons from '../../components/ui/AppStoreButtons';

export default function FibonacciCalculator() {
  const { t } = useTranslation();
  const currentLanguage = useLanguageFromUrl();
  const [calculator, setCalculator] = useState({
    highPrice: '',
    lowPrice: '',
    retracementLevel: '',
    extensionLevel: '',
    result: '',
    retracementPrice: '',
    extensionPrice: ''
  });

  const calculateFibonacci = () => {
    const high = parseFloat(calculator.highPrice);
    const low = parseFloat(calculator.lowPrice);
    const retracement = parseFloat(calculator.retracementLevel);
    const extension = parseFloat(calculator.extensionLevel);

    if (isNaN(high) || isNaN(low) || isNaN(retracement) || isNaN(extension)) return;

    const diff = high - low;
    const retracementPrice = high - (diff * retracement / 100);
    const extensionPrice = high + (diff * extension / 100);

    setCalculator({
      ...calculator,
      retracementPrice: retracementPrice.toFixed(2),
      extensionPrice: extensionPrice.toFixed(2)
    });
  };

  const clearCalculator = () => {
    setCalculator({
      highPrice: '',
      lowPrice: '',
      retracementLevel: '',
      extensionLevel: '',
      result: '',
      retracementPrice: '',
      extensionPrice: ''
    });
  };

  return (
    <>
      <SEOHead 
        title="XAUUSD Fibonacci Calculator - GoldSniper"
        description="Calculate Fibonacci retracements and extensions for XAUUSD trading. Identify key support, resistance, and target levels."
        keywords="fibonacci calculator, retracements, extensions, XAUUSD trading, gold trading tools"
        canonical={`https://www.goldsniper.com/tools/fibonacci-calculator/${currentLanguage}`}
      />
      <div className="min-h-screen bg-black text-white">
        <Navigation currentPage="tools" />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gray-900 via-black to-gray-900 py-8 md:py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-[color:var(--brand-orange)] rounded-full">
                <BarChart3 className="w-8 h-8 text-black" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              XAUUSD Fibonacci Calculator
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Calculate Fibonacci retracements and extensions for XAUUSD trading. Identify key support, resistance, and target levels.
            </p>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-2xl text-center mb-4">Fibonacci Calculator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="highPrice" className="text-white">High Price ($)</Label>
                    <Input
                      id="highPrice"
                      type="number"
                      placeholder="2000.00"
                      value={calculator.highPrice}
                      onChange={(e) => setCalculator({...calculator, highPrice: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lowPrice" className="text-white">Low Price ($)</Label>
                    <Input
                      id="lowPrice"
                      type="number"
                      placeholder="1900.00"
                      value={calculator.lowPrice}
                      onChange={(e) => setCalculator({...calculator, lowPrice: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white"
                      step="0.01"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="retracementLevel" className="text-white">Retracement Level (%)</Label>
                    <Input
                      id="retracementLevel"
                      type="number"
                      placeholder="61.8"
                      value={calculator.retracementLevel}
                      onChange={(e) => setCalculator({...calculator, retracementLevel: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="extensionLevel" className="text-white">Extension Level (%)</Label>
                    <Input
                      id="extensionLevel"
                      type="number"
                      placeholder="161.8"
                      value={calculator.extensionLevel}
                      onChange={(e) => setCalculator({...calculator, extensionLevel: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white"
                      step="0.1"
                    />
                  </div>
                </div>
                
                <div className="flex justify-center space-x-4">
                  <Button 
                    onClick={calculateFibonacci}
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
                        <p className="text-gray-400 text-sm">Retracement Price</p>
                        <p className="text-2xl font-bold text-[color:var(--brand-orange)]">
                          ${calculator.retracementPrice}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 text-sm">Extension Price</p>
                        <p className="text-2xl font-bold text-[color:var(--brand-orange)]">
                          ${calculator.extensionPrice}
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
            <h2 className="text-3xl font-bold text-white mb-8 text-center">XAUUSD Fibonacci Trading Guide</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Fibonacci Retracements</h3>
                <p className="text-gray-300 mb-4">
                  Fibonacci retracements help identify potential support and resistance levels in XAUUSD trading based on the key Fibonacci ratios.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li>• 23.6% - Minor retracement level</li>
                  <li>• 38.2% - Shallow retracement</li>
                  <li>• 50% - Psychological level</li>
                  <li>• 61.8% - Golden ratio (most important)</li>
                  <li>• 78.6% - Deep retracement</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Fibonacci Extensions</h3>
                <p className="text-gray-300 mb-4">
                  Fibonacci extensions help predict potential price targets beyond the original trend in XAUUSD movements.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li>• 61.8% - First extension target</li>
                  <li>• 100% - Equal leg projection</li>
                  <li>• 138.2% - Strong extension level</li>
                  <li>• 161.8% - Golden ratio extension</li>
                  <li>• 261.8% - Extreme extension target</li>
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
