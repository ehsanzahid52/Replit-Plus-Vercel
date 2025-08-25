import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, TrendingUp, BarChart3, DollarSign, Target, Activity, Zap, RefreshCw, AlertTriangle, Layers, Gift, ExternalLink, Crosshair } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Navigation from '../components/Navigation';
import SEOHead from '../components/SEOHead';
import { useLanguageFromUrl } from '../components/LanguageRouter';
import Footer from '../components/Footer';

export default function Tools() {
  const { t } = useTranslation();
  const currentLanguage = useLanguageFromUrl();








  const calculators = [
    {
      id: 'position-size',
      title: 'Position Size Calculator',
      description: 'Calculate optimal position size for XAUUSD trading with risk management',
      icon: Target,
      path: 'position-size-calculator',
      keywords: ['Position Size', 'Risk Management', 'Lot Size']
    },
    {
      id: 'pip-calculator',
      title: 'Pip Calculator',
      description: 'Calculate pip value and profit/loss for XAUUSD positions',
      icon: BarChart3,
      path: 'pip-calculator',
      keywords: ['Pip Value', 'Profit/Loss', 'Trade Analysis']
    },
    {
      id: 'margin-calculator',
      title: 'Margin Calculator',
      description: 'Calculate margin requirements and leverage for gold trading',
      icon: DollarSign,
      path: 'margin-calculator',
      keywords: ['Margin Required', 'Leverage', 'Free Margin']
    },
    {
      id: 'fibonacci-calculator',
      title: 'Fibonacci Calculator',
      description: 'Calculate Fibonacci retracement and extension levels',
      icon: TrendingUp,
      path: 'fibonacci-calculator',
      keywords: ['Technical Analysis', 'Support/Resistance', 'Retracements']
    },
    {
      id: 'pivot-calculator',
      title: 'Pivot Point Calculator',
      description: 'Calculate pivot points and support/resistance levels',
      icon: Activity,
      path: 'pivot-calculator',
      keywords: ['Support/Resistance', 'Pivot Points', 'Technical Analysis']
    },
    {
      id: 'risk-of-ruin',
      title: 'Risk of Ruin Calculator',
      description: 'Calculate probability of losing your trading account',
      icon: AlertTriangle,
      path: 'risk-of-ruin-calculator',
      keywords: ['Account Risk', 'Probability', 'Risk Management']
    },
    {
      id: 'leverage-calculator',
      title: 'Leverage Calculator',
      description: 'Calculate current leverage used in your account',
      icon: Layers,
      path: 'leverage-calculator',
      keywords: ['Current Leverage', 'Account Analysis', 'Trading Power']
    },
    {
      id: 'compounding-calculator',
      title: 'Compounding Calculator',
      description: 'Calculate compound growth of your trading account',
      icon: TrendingUp,
      path: 'compounding-calculator',
      keywords: ['Growth Planning', 'Compound Interest', 'Account Growth']
    },
    {
      id: 'drawdown-calculator',
      title: 'Drawdown Calculator',
      description: 'Calculate current drawdown of your trading account',
      icon: AlertTriangle,
      path: 'drawdown-calculator',
      keywords: ['Performance Tracking', 'Drawdown Analysis', 'Account Health']
    },
    {
      id: 'currency-converter',
      title: 'Currency Converter',
      description: 'Convert currencies for international gold trading',
      icon: RefreshCw,
      path: 'currency-converter',
      keywords: ['Currency Exchange', 'International Trading', 'FX Rates']
    },
    {
      id: 'rebate-calculator',
      title: 'Rebate Calculator',
      description: 'Calculate trading rebates and cashback rewards',
      icon: Gift,
      path: 'rebate-calculator',
      keywords: ['Trading Rebates', 'Cashback', 'Broker Rewards']
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead 
        title="XAUUSD Trading Tools & Calculators - Gold Trading Calculator Suite | GoldSniper"
        description="Professional XAUUSD trading calculators: position size, pip calculator, margin calculator, fibonacci, pivot points, risk of ruin & more. Free gold trading tools for better risk management."
        keywords="XAUUSD calculator, gold trading calculator, position size calculator, pip calculator, margin calculator, fibonacci calculator, pivot point calculator, risk of ruin calculator, leverage calculator, compounding calculator, drawdown calculator, rebate calculator, forex tools, trading tools"
        canonical={`https://goldsniper.io/${currentLanguage}/tools`}
      />
      <Navigation currentPage="tools" />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 via-black to-gray-900 py-8 md:py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            XAUUSD Trading Tools & Calculators
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
            Professional gold trading calculators for XAUUSD traders. Calculate position sizes, pip values, margins, fibonacci levels, and more. Essential risk management tools for successful gold trading.
          </p>
          
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <Calculator className="w-4 h-4 text-[color:var(--brand-orange)]" />
              <span>11 Professional Tools</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-[color:var(--brand-orange)]" />
              <span>XAUUSD Optimized</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-[color:var(--brand-orange)]" />
              <span>Real-time Calculations</span>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {calculators.map((calculator) => {
              const IconComponent = calculator.icon;
              
              return (
                <a 
                  key={calculator.id}
                  href={`/${currentLanguage}/tools/${calculator.path}`}
                  className="block"
                >
                  <Card className="bg-gray-900 border-gray-800 hover:border-[color:var(--brand-orange)] transition-all duration-200 cursor-pointer group h-full">
                    <CardContent className="p-8 text-center">
                      <div className="p-4 bg-[color:var(--brand-orange)] rounded-full w-20 h-20 mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                        <IconComponent className="w-12 h-12 text-black mx-auto mt-1" />
                      </div>
                      <CardTitle className="text-white text-xl mb-4 group-hover:text-[color:var(--brand-orange)] transition-colors">
                        {calculator.title}
                      </CardTitle>
                      <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                        {calculator.description}
                      </p>
                      {calculator.keywords && (
                        <div className="flex flex-wrap gap-2 justify-center mb-6">
                          {calculator.keywords.map((keyword) => (
                            <span key={keyword} className="text-xs bg-gray-800 text-gray-300 px-3 py-1 rounded-full">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center justify-center text-[color:var(--brand-orange)] text-sm font-medium group-hover:text-white transition-colors">
                        Open Calculator <ExternalLink className="w-4 h-4 ml-2" />
                      </div>
                    </CardContent>
                  </Card>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Professional XAUUSD Trading Calculator Suite</h2>
          
          <div className="prose prose-invert max-w-none">
            <div className="grid md:grid-cols-2 gap-8 text-gray-300">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Essential Gold Trading Tools</h3>
                <p className="mb-4">
                  Our comprehensive XAUUSD calculator suite provides professional traders with essential tools for risk management and position sizing. Calculate optimal position sizes, pip values, and margin requirements for gold trading with precision.
                </p>
                <ul className="space-y-2">
                  <li>• Position Size Calculator for proper risk management</li>
                  <li>• XAUUSD Pip Calculator for profit/loss calculations</li>
                  <li>• Margin Calculator for leverage requirements</li>
                  <li>• Fibonacci tools for technical analysis</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Advanced Risk Management</h3>
                <p className="mb-4">
                  Professional traders rely on accurate calculations for successful gold trading. Our risk management calculators help you determine optimal position sizes, calculate potential drawdowns, and assess risk of ruin scenarios.
                </p>
                <ul className="space-y-2">
                  <li>• Risk of Ruin Calculator for account safety</li>
                  <li>• Drawdown Calculator for performance tracking</li>
                  <li>• Leverage Calculator for position monitoring</li>
                  <li>• Compounding Calculator for growth planning</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}