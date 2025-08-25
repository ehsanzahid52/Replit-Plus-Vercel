import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { ExternalLink } from 'lucide-react';
import { SiGoogleplay, SiApple } from 'react-icons/si';
import Navigation from '../components/Navigation';
import SEOHead from '../components/SEOHead';
import { useLanguageFromUrl } from '../components/LanguageRouter';
import { Button } from '../components/ui/button';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface DayChartData {
  date: string;
  pips: number;
}

interface Statistics {
  trades: number;
  pips: number;
  won: number;
  daily: number;
  monthly: number;
  trades_per_month: number;
  avg_trade_time: string;
}

interface GoldStats {
  day_chart: DayChartData[];
  total_pips: number;
  average_pips: number;
  statistics: Statistics;
}

// API service function
const goldSignalsAPI = {
  async getStatistics(): Promise<GoldStats> {
    // TODO: The stats endpoint requires authentication - temporarily using mock data
    // const response = await fetch('https://x7kt-9pgq-melx.n7.xano.io/api:47ignXdD/v2/stats');
    
    // Mock data for development (replace with actual API call once authentication is resolved)
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
    
    return {
      day_chart: [
        { date: '2025-08-13', pips: 150 },
        { date: '2025-08-14', pips: -80 },
        { date: '2025-08-15', pips: 220 },
        { date: '2025-08-16', pips: 180 },
        { date: '2025-08-17', pips: -120 },
        { date: '2025-08-18', pips: 300 },
        { date: '2025-08-19', pips: 90 },
        { date: '2025-08-20', pips: -50 },
        { date: '2025-08-21', pips: 240 },
        { date: '2025-08-22', pips: 160 },
      ],
      total_pips: 1290,
      average_pips: 129.0,
      statistics: {
        trades: 156,
        pips: 1290,
        won: 78,
        daily: 5.2,
        monthly: 18.5,
        trades_per_month: 52,
        avg_trade_time: '2.5h'
      }
    };
  }
};

const getSentimentMessage = (totalPips: number, lastDayPips: number) => {
  if (lastDayPips < -5000) {
    return "⚠️ Recent setback, but we're working to recover";
  }
  if (totalPips > 2000) {
    return `🚀 Excellent run: +${totalPips.toLocaleString()} pips overall`;
  }
  if (totalPips > 0) {
    return `📈 Positive progress: +${totalPips.toLocaleString()} pips overall`;
  }
  if (totalPips < -1000) {
    return `💪 Working to recover: ${totalPips.toLocaleString()} pips overall`;
  }
  return `📊 Current performance: ${totalPips.toLocaleString()} pips overall`;
};

const exponentialBackoff = (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000);

export default function Results() {
  const { t } = useTranslation();
  const currentLanguage = useLanguageFromUrl();
  const [chartData, setChartData] = useState<any>(null);
  const [chartOptions, setChartOptions] = useState<any>(null);

  // Data fetching with React Query
  const { data: goldStats, isLoading, error } = useQuery({
    queryKey: ['gold-statistics'],
    queryFn: () => goldSignalsAPI.getStatistics(),
    retry: 3,
    retryDelay: exponentialBackoff,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });


  // Gradient creation function
  const createFillGradient = (ctx: any, chartArea: any, up: boolean) => {
    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    if (up) {
      // Green gradient for positive performance
      gradient.addColorStop(0, 'rgba(0, 211, 183, 0.3)');
      gradient.addColorStop(1, 'rgba(0, 211, 183, 0)');
    } else {
      // Red gradient for negative performance
      gradient.addColorStop(0, 'rgba(255, 77, 109, 0.3)');
      gradient.addColorStop(1, 'rgba(255, 77, 109, 0)');
    }
    return gradient;
  };

  // Prepare chart data when goldStats is available
  useEffect(() => {
    if (!goldStats?.day_chart) return;

    // Process data - take last 10 days and reverse for chronological order
    const processedChartData = goldStats.day_chart.slice(-10).reverse();
    
    // Calculate cumulative balance progression
    let cumulativeBalance = 0;
    const cumulativeData = processedChartData.map(item => {
      cumulativeBalance += item.pips;
      return cumulativeBalance;
    });

    const data = {
      labels: processedChartData.map(item => new Date(item.date).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      })),
      datasets: [{
        label: 'Balance',
        data: cumulativeData,
        segment: {
          // Dynamic line colors based on performance direction
          borderColor: (ctx: any) => ctx.p1.parsed.y > ctx.p0.parsed.y ? '#00d3b7' : '#ff4d6d',
          backgroundColor: (ctx: any) => {
            const area = ctx.chart.chartArea;
            return createFillGradient(ctx.chart.ctx, area, ctx.p1.parsed.y > ctx.p0.parsed.y);
          }
        },
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        // Dynamic point colors
        pointBackgroundColor: (ctx: any) => ctx.raw > (ctx.dataset.data[ctx.dataIndex - 1] || ctx.raw) ? '#00d3b7' : '#ff4d6d',
        pointBorderWidth: 0,
        fill: 'start',
        tension: 0.4  // Smooth curve
      }]
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'index' as const,
      },
      layout: {
        padding: { top: 20, bottom: 10, left: 20, right: 20 }
      },
      scales: {
        x: {
          ticks: {
            color: '#aaa',
            font: { 
              family: 'Inter, sans-serif', 
              size: 10, 
              weight: '400' 
            },
            maxRotation: 0,
          },
          grid: { display: false }  // Hide vertical grid lines
        },
        y: {
          ticks: {
            color: '#aaa',
            font: { 
              family: 'Inter, sans-serif', 
              size: 10, 
              weight: '400' 
            },
            callback: (value: any) => `${value}`,  // Format Y-axis labels
          },
          grid: { color: 'rgba(200, 200, 200, 0.1)' }  // Subtle horizontal grid
        }
      },
      plugins: {
        legend: { display: false },  // Hide legend
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          titleColor: '#333',
          bodyColor: '#333',
          borderColor: '#eee',
          borderWidth: 1,
          callbacks: {
            label: (context: any) => `${context.parsed.y} pips`
          }
        }
      }
    };

    setChartData(data);
    setChartOptions(options);
  }, [goldStats]);


  if (error) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navigation currentPage="results" />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Unable to Load Statistics</h1>
            <p className="text-gray-400 mb-8">Please try again later or contact support.</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-[color:var(--brand-orange)] hover:bg-[color:var(--amber-accent)] text-black font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  const lastDayPips = goldStats?.day_chart[goldStats.day_chart.length - 1]?.pips || 0;
  const sentimentMessage = goldStats ? getSentimentMessage(goldStats.total_pips, lastDayPips) : "";

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead 
        title={`${t('nav.performance')} - GoldSniper`}
        description="View comprehensive performance statistics and trading results from GoldSniper's professional XAUUSD signals."
        keywords="gold trading results, XAUUSD performance, trading statistics, forex signals results"
        canonical={`https://goldsniper.io/${currentLanguage}/results`}
      />
      <Navigation currentPage="results" />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('results.header.title', 'Trading Performance')}
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t('results.header.subtitle', 'Real-time statistics and comprehensive analysis of our XAUUSD trading signals.')}
          </p>
        </div>

        {/* Chart Container */}
        <div className="bg-gray-900 rounded-3xl shadow-2xl p-8 mb-12 border border-gray-800">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-white mb-2">{t('results.chart.title', 'Last Ten Days')}</h2>
            <p className="text-sm text-gray-400 px-4">{sentimentMessage}</p>
          </div>
          <div className="h-64 sm:h-80 w-full">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="w-8 h-8 border-2 border-gray-600 border-t-[color:var(--brand-orange)] rounded-full animate-spin"></div>
              </div>
            ) : chartData && chartOptions ? (
              <Line data={chartData} options={chartOptions} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No chart data available
              </div>
            )}
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              {t('results.stats.title', 'Key Performance Metrics')}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {t('results.stats.subtitle', 'Comprehensive overview of our trading performance and success rates.')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {goldStats && !isLoading ? (
            <>
              {/* Row 1 */}
              <div className="text-center p-4 sm:p-6 bg-gray-800 rounded-2xl border border-gray-700 hover:border-[color:var(--brand-orange)] transition-colors group">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-[color:var(--brand-orange)] transition-colors break-words">📊 {goldStats.statistics.trades}</div>
                <div className="text-gray-400 text-xs sm:text-sm font-medium">{t('results.stats.totalTrades', 'Total Trades')}</div>
              </div>
              
              <div className="text-center p-4 sm:p-6 bg-gray-800 rounded-2xl border border-gray-700 hover:border-[color:var(--brand-orange)] transition-colors group">
                <div className="text-2xl sm:text-3xl font-bold text-[color:var(--brand-orange)] mb-2 group-hover:scale-105 transition-transform break-words">📈 {goldStats.statistics.pips.toLocaleString()}</div>
                <div className="text-gray-400 text-xs sm:text-sm font-medium">{t('results.stats.totalPips', 'Total Pips')}</div>
              </div>

              <div className="text-center p-4 sm:p-6 bg-gray-800 rounded-2xl border border-gray-700 hover:border-green-400 transition-colors group">
                <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-2 group-hover:scale-105 transition-transform break-words">😍 {goldStats.statistics.won}%</div>
                <div className="text-gray-400 text-xs sm:text-sm font-medium">{t('results.stats.winRate', 'Win Rate')}</div>
              </div>
              
              <div className="text-center p-4 sm:p-6 bg-gray-800 rounded-2xl border border-gray-700 hover:border-[color:var(--brand-orange)] transition-colors group">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-[color:var(--brand-orange)] transition-colors break-words">💰 {goldStats.statistics.daily}%</div>
                <div className="text-gray-400 text-xs sm:text-sm font-medium">{t('results.stats.dailyReturn', 'Daily Return')}</div>
              </div>

              <div className="text-center p-4 sm:p-6 bg-gray-800 rounded-2xl border border-gray-700 hover:border-[color:var(--brand-orange)] transition-colors group">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-[color:var(--brand-orange)] transition-colors break-words">📅 {goldStats.statistics.monthly}%</div>
                <div className="text-gray-400 text-xs sm:text-sm font-medium">{t('results.stats.monthlyReturn', 'Monthly Return')}</div>
              </div>
              
              <div className="text-center p-4 sm:p-6 bg-gray-800 rounded-2xl border border-gray-700 hover:border-[color:var(--brand-orange)] transition-colors group">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-[color:var(--brand-orange)] transition-colors break-words">🗓️ {goldStats.statistics.trades_per_month}</div>
                <div className="text-gray-400 text-xs sm:text-sm font-medium">{t('results.stats.tradesPerMonth', 'Trades Per Month')}</div>
              </div>

              <div className="text-center p-4 sm:p-6 bg-gray-800 rounded-2xl border border-gray-700 hover:border-[color:var(--brand-orange)] transition-colors group">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-[color:var(--brand-orange)] transition-colors break-words">🔨 {goldStats.average_pips.toFixed(1)}</div>
                <div className="text-gray-400 text-xs sm:text-sm font-medium">{t('results.stats.averagePips', 'Average Pips')}</div>
              </div>
              
              <div className="text-center p-4 sm:p-6 bg-gray-800 rounded-2xl border border-gray-700 hover:border-[color:var(--brand-orange)] transition-colors group">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-[color:var(--brand-orange)] transition-colors break-words">⏰ {goldStats.statistics.avg_trade_time}</div>
                <div className="text-gray-400 text-xs sm:text-sm font-medium">{t('results.stats.averageTime', 'Average Time')}</div>
              </div>
            </>
          ) : (
            // Loading state for statistics
            Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="text-center p-4 sm:p-6 bg-gray-800 rounded-2xl border border-gray-700">
                <div className="w-8 h-8 border-2 border-gray-600 border-t-[color:var(--brand-orange)] rounded-full animate-spin mx-auto mb-2"></div>
                <div className="text-gray-400 text-xs sm:text-sm font-medium">Loading...</div>
              </div>
            ))
          )}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-gradient-to-r from-[color:var(--brand-orange)] to-[color:var(--amber-accent)] rounded-3xl p-8 md:p-12 text-center mb-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              {t('results.cta.title', 'Ready to Start Trading?')}
            </h2>
            <p className="text-lg md:text-xl text-black/80 mb-8 max-w-2xl mx-auto">
              {t('results.cta.description', 'Get real-time XAUUSD signals, track your performance, and join thousands of successful traders using GoldSniper.')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => window.open('https://play.google.com/store/apps/details?id=com.tate.goldsniper&hl=en_GB', '_blank')}
                className="bg-black hover:bg-gray-900 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <SiGoogleplay className="w-6 h-6" />
                <span>{t('results.cta.downloadAndroid', 'Download for Android')}</span>
              </Button>
              
              <Button 
                onClick={() => window.open('https://apps.apple.com/us/app/gold-sniper-xauusd-signals/id1585302472', '_blank')}
                className="bg-black hover:bg-gray-900 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <SiApple className="w-6 h-6" />
                <span>{t('results.cta.downloadIOS', 'Download for iOS')}</span>
              </Button>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-black/70">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span className="text-sm font-medium">{t('results.cta.features.realtime', 'Real-time Signals')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span className="text-sm font-medium">{t('results.cta.features.performance', 'Performance Tracking')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span className="text-sm font-medium">{t('results.cta.features.support', '24/7 Support')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src="/goldsniper-logo.png" 
                  alt="GoldSniper Logo" 
                  className="w-12 h-12 object-contain rounded-[15px]" 
                />
                <span className="text-2xl font-bold text-white">GOLDSNIPER</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                {t('footer.description', 'Professional XAUUSD trading signals with real-time performance tracking and comprehensive market analysis.')}
              </p>
              <div className="flex space-x-4">
                <a href="https://twitter.com/goldsniper" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[color:var(--brand-orange)] transition-colors">
                  <ExternalLink className="w-6 h-6" />
                </a>
                <a href="https://instagram.com/goldsniper" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[color:var(--brand-orange)] transition-colors">
                  <ExternalLink className="w-6 h-6" />
                </a>
                <a href="https://linkedin.com/company/goldsniper" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[color:var(--brand-orange)] transition-colors">
                  <ExternalLink className="w-6 h-6" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">{t('footer.sections.appFeatures', 'App Features')}</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="text-gray-400">{t('nav.features', 'Features')}</li>
                <li><a href={`/${currentLanguage}/results`} className="hover:text-white transition-colors">{t('nav.performance', 'Performance')}</a></li>
                <li className="text-gray-400">{t('nav.support', 'Support')}</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">{t('footer.sections.support', 'Support')}</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href={`/${currentLanguage}/support`} className="hover:text-white transition-colors">{t('footer.links.helpCenter', 'Help Center')}</a></li>
                <li><a href={`/${currentLanguage}/support`} className="hover:text-white transition-colors">{t('common.contactSupport', 'Contact Support')}</a></li>
                <li><a href={`/${currentLanguage}/privacy`} className="hover:text-white transition-colors">{t('footer.links.privacy', 'Privacy Policy')}</a></li>
                <li><a href={`/${currentLanguage}/terms`} className="hover:text-white transition-colors">{t('footer.links.terms', 'Terms of Service')}</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <p className="text-gray-400">{t('footer.copyright', '© 2025 GoldSniper. All rights reserved.')}</p>
                <p className="text-sm text-gray-500 mt-1">{t('footer.disclaimer', 'Trading involves risk. Past performance does not guarantee future results.')}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="bg-[color:var(--brand-orange)] hover:bg-[color:var(--amber-accent)] text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm">
                  <SiGoogleplay className="w-4 h-4" />
                  <span>{t('common.downloadFor', { platform: 'Google Play' }) || 'Download for Google Play'}</span>
                </Button>
                <Button className="bg-white hover:bg-gray-100 text-black font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm border border-gray-300">
                  <SiApple className="w-4 h-4" />
                  <span>{t('common.downloadFor', { platform: 'App Store' }) || 'Download for App Store'}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}