interface AnalysisArticle {
  id: number;
  title: string;
  slug: string;
  published_date: string;
  tags: number[];
}

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
  alternates?: { hreflang: string; href: string }[];
}

const SUPPORTED_LANGUAGES = ['en', 'es', 'fr', 'de', 'ar', 'zh'];
const BASE_URL = 'https://goldsniper.io';
const ANALYSIS_API_URL = 'https://x7kt-9pgq-melx.n7.xano.io/api:J0tQsbwj/analysis';

// Tag mapping with SEO priorities
const TAG_PRIORITIES: Record<string, { priority: string; changefreq: string }> = {
  // Highest priority - Gold & XAUUSD
  'xauusd': { priority: '0.9', changefreq: 'daily' },
  'gold': { priority: '0.9', changefreq: 'daily' },
  'goldanalysis': { priority: '0.9', changefreq: 'daily' },
  'goldtrading': { priority: '0.9', changefreq: 'daily' },
  'goldprediction': { priority: '0.9', changefreq: 'daily' },
  'goldtradingstrategy': { priority: '0.9', changefreq: 'daily' },
  'xauusdanalysis': { priority: '0.9', changefreq: 'daily' },
  'xauusdsignals': { priority: '0.9', changefreq: 'daily' },
  'xauusdupdates': { priority: '0.9', changefreq: 'daily' },
  
  // High priority - Trading & Signals
  'signals': { priority: '0.8', changefreq: 'daily' },
  'signal': { priority: '0.8', changefreq: 'daily' },
  'signalservice': { priority: '0.8', changefreq: 'daily' },
  'signalsprovider': { priority: '0.8', changefreq: 'daily' },
  'trading': { priority: '0.8', changefreq: 'daily' },
  'tradingideas': { priority: '0.8', changefreq: 'daily' },
  'trendtrading': { priority: '0.8', changefreq: 'daily' },
  'technical-analysis': { priority: '0.8', changefreq: 'daily' },
  'trend-analysis': { priority: '0.8', changefreq: 'daily' },
  'fundamental-analysis': { priority: '0.8', changefreq: 'daily' },
  'wave-analysis': { priority: '0.8', changefreq: 'daily' },
  'chart-patterns': { priority: '0.8', changefreq: 'daily' },
  'support-and-resistance': { priority: '0.8', changefreq: 'daily' },
  'fibonacci-retracement': { priority: '0.8', changefreq: 'daily' },
  'technical-indicators': { priority: '0.8', changefreq: 'daily' },
  'trend-lines': { priority: '0.8', changefreq: 'daily' },
  'analysis': { priority: '0.8', changefreq: 'daily' },
  'forex': { priority: '0.8', changefreq: 'daily' },
  
  // Medium priority - Patterns & Strategies
  'triangle': { priority: '0.7', changefreq: 'weekly' },
  'ascending-triangle': { priority: '0.7', changefreq: 'weekly' },
  'symmetrical-triangle': { priority: '0.7', changefreq: 'weekly' },
  'ascending-channel': { priority: '0.7', changefreq: 'weekly' },
  'descending-channel': { priority: '0.7', changefreq: 'weekly' },
  'breakout': { priority: '0.7', changefreq: 'weekly' },
  'consolidation': { priority: '0.7', changefreq: 'weekly' },
  'bearish-patterns': { priority: '0.7', changefreq: 'weekly' },
  'long': { priority: '0.7', changefreq: 'weekly' },
  'short': { priority: '0.7', changefreq: 'weekly' },
  'sell': { priority: '0.7', changefreq: 'weekly' },
  'exit': { priority: '0.7', changefreq: 'weekly' },
  'dxy': { priority: '0.7', changefreq: 'weekly' },
  'nfp': { priority: '0.7', changefreq: 'weekly' },
  'supply-and-demand': { priority: '0.7', changefreq: 'weekly' },
  'smartmoneyconcept': { priority: '0.7', changefreq: 'weekly' },
  'smc': { priority: '0.7', changefreq: 'weekly' },
  'ict': { priority: '0.7', changefreq: 'weekly' },
  
  // Lower priority - Platform specific
  'binance': { priority: '0.6', changefreq: 'weekly' },
  'bybit': { priority: '0.6', changefreq: 'weekly' },
  'futures': { priority: '0.6', changefreq: 'weekly' },
  'spot': { priority: '0.6', changefreq: 'weekly' },
  'crypto': { priority: '0.6', changefreq: 'weekly' },
  'ab-cd': { priority: '0.6', changefreq: 'weekly' },
  'zigzag': { priority: '0.6', changefreq: 'weekly' },
  'flat': { priority: '0.6', changefreq: 'weekly' },
  'trend-line-break': { priority: '0.6', changefreq: 'weekly' },
  
  // Lowest priority - Miscellaneous
  'index': { priority: '0.5', changefreq: 'weekly' },
  'bnb': { priority: '0.5', changefreq: 'weekly' },
  'tariffs': { priority: '0.5', changefreq: 'weekly' },
  'containsimagine': { priority: '0.5', changefreq: 'weekly' }
};

// Import tag utilities
import { tagMapping, getTagSlug } from './tagData';

export async function generateDynamicSitemap(): Promise<string> {
  const urls: SitemapUrl[] = [];
  const today = new Date().toISOString().split('T')[0];

  console.log('🚀 Starting sitemap generation...');

  // Add static pages
  addStaticUrls(urls, today);
  console.log(`📄 Static pages added: ${urls.length} URLs`);

  // Fetch and add dynamic analysis content
  await addDynamicAnalysisUrls(urls, today);

  // Generate final statistics
  const analysisUrls = urls.filter(url => url.loc.includes('/analysis/'));
  const tagUrls = urls.filter(url => url.loc.includes('/analysis/tags/'));
  const toolUrls = urls.filter(url => url.loc.includes('/tools/'));
  const staticUrls = urls.filter(url => !url.loc.includes('/analysis/') && !url.loc.includes('/tools/'));

  console.log('🎯 FINAL SITEMAP STATISTICS:');
  console.log(`📊 Total URLs: ${urls.length}`);
  console.log(`📝 Analysis Articles: ${analysisUrls.length}`);
  console.log(`🏷️  Tag Pages: ${tagUrls.length}`);
  console.log(`🛠️  Tool Pages: ${toolUrls.length}`);
  console.log(`📄 Static Pages: ${staticUrls.length}`);
  console.log(`🌐 Languages Supported: ${SUPPORTED_LANGUAGES.join(', ')}`);

  // Generate XML
  return generateSitemapXML(urls);
}

function addStaticUrls(urls: SitemapUrl[], today: string) {
  // Root redirect
  urls.push({
    loc: `${BASE_URL}/`,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.9'
  });

  // Home pages for all languages
  SUPPORTED_LANGUAGES.forEach(lang => {
    const isDefault = lang === 'en';
    urls.push({
      loc: `${BASE_URL}/${lang}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '1.0',
      alternates: isDefault ? SUPPORTED_LANGUAGES.map(l => ({
        hreflang: l === 'en' ? 'x-default' : l,
        href: `${BASE_URL}/${l === 'en' ? 'en' : l}`
      })) : undefined
    });
  });

  // Add other static page categories
  const staticPages = [
    { path: 'signals-app', priority: '0.9', changefreq: 'weekly' },
    { path: 'results', priority: '0.8', changefreq: 'weekly' },
    { path: 'analysis', priority: '0.9', changefreq: 'daily' },
    { path: 'tools', priority: '0.8', changefreq: 'weekly' },
    { path: 'support', priority: '0.7', changefreq: 'weekly' },
    { path: 'privacy', priority: '0.6', changefreq: 'monthly' },
    { path: 'terms', priority: '0.6', changefreq: 'monthly' }
  ];

  staticPages.forEach(page => {
    SUPPORTED_LANGUAGES.forEach(lang => {
      const isDefault = lang === 'en';
      urls.push({
        loc: `${BASE_URL}/${lang}/${page.path}`,
        lastmod: today,
        changefreq: page.changefreq,
        priority: page.priority,
        alternates: isDefault ? SUPPORTED_LANGUAGES.map(l => ({
          hreflang: l === 'en' ? 'x-default' : l,
          href: `${BASE_URL}/${l}/${page.path}`
        })) : undefined
      });
    });

    // Add backward compatibility URLs
    urls.push({
      loc: `${BASE_URL}/${page.path}`,
      lastmod: today,
      changefreq: page.changefreq,
      priority: '0.5'
    });
  });

  // Add individual calculator tools
  const calculatorTools = [
    'position-size-calculator',
    'pip-calculator',
    'margin-calculator',
    'leverage-calculator',
    'fibonacci-calculator',
    'pivot-calculator',
    'drawdown-calculator',
    'compounding-calculator',
    'currency-converter',
    'rebate-calculator',
    'risk-of-ruin-calculator'
  ];

  calculatorTools.forEach(tool => {
    SUPPORTED_LANGUAGES.forEach(lang => {
      const isDefault = lang === 'en';
      urls.push({
        loc: `${BASE_URL}/${lang}/tools/${tool}`,
        lastmod: today,
        changefreq: 'monthly',
        priority: '0.7',
        alternates: isDefault ? SUPPORTED_LANGUAGES.map(l => ({
          hreflang: l === 'en' ? 'x-default' : l,
          href: `${BASE_URL}/${l}/tools/${tool}`
        })) : undefined
      });
    });

    // Add backward compatibility URL
    urls.push({
      loc: `${BASE_URL}/tools/${tool}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.6'
    });
  });
}

async function addDynamicAnalysisUrls(urls: SitemapUrl[], today: string) {
  try {
    console.log('Starting to fetch dynamic analysis content for sitemap...');
    
    // Add all known tag pages first (from tag mapping)
    Object.entries(tagMapping).forEach(([tagId, tagData]) => {
      const tagSlug = tagData.slug;
      const tagConfig = TAG_PRIORITIES[tagSlug] || { priority: '0.6', changefreq: 'weekly' };
      
      // Add tag page for each supported language
      SUPPORTED_LANGUAGES.forEach(lang => {
        const isDefault = lang === 'en';
        urls.push({
          loc: `${BASE_URL}/${lang}/analysis/tags/${tagSlug}`,
          lastmod: today,
          changefreq: tagConfig.changefreq,
          priority: tagConfig.priority,
          alternates: isDefault ? SUPPORTED_LANGUAGES.map(l => ({
            hreflang: l === 'en' ? 'x-default' : l,
            href: `${BASE_URL}/${l}/analysis/tags/${tagSlug}`
          })) : undefined
        });
      });

      // Add backward compatibility URL
      urls.push({
        loc: `${BASE_URL}/analysis/tags/${tagSlug}`,
        lastmod: today,
        changefreq: tagConfig.changefreq,
        priority: '0.5'
      });
    });

    // Fetch ALL dynamic analysis articles intelligently
    let page = 1;
    const perPage = 100; // Optimal balance between API calls and data size
    let hasMore = true;
    let totalArticles = 0;
    let consecutiveEmptyPages = 0;
    const maxConsecutiveEmptyPages = 3; // Safety: stop if we hit 3 empty pages in a row

    console.log(`Starting to fetch analysis articles with ${perPage} per page...`);

    while (hasMore) {
      try {
        console.log(`Fetching page ${page}...`);
        
        const response = await fetch(`${ANALYSIS_API_URL}?page=${page}&per_page=${perPage}`);
        
        if (!response.ok) {
          console.warn(`Failed to fetch analysis articles page ${page}: ${response.status} ${response.statusText}`);
          break;
        }

        const data = await response.json();
        const articles: AnalysisArticle[] = data.items || [];

        if (articles.length === 0) {
          consecutiveEmptyPages++;
          console.log(`Page ${page} returned 0 articles. Consecutive empty pages: ${consecutiveEmptyPages}`);
          
          if (consecutiveEmptyPages >= maxConsecutiveEmptyPages) {
            console.log(`Stopping: hit ${maxConsecutiveEmptyPages} consecutive empty pages`);
            break;
          }
          
          page++;
          continue;
        }

        // Reset consecutive empty pages counter
        consecutiveEmptyPages = 0;

        // Add individual article URLs (English only since articles don't have translated URLs)
        articles.forEach(article => {
          const articleDate = new Date(article.published_date).toISOString().split('T')[0];
          
          // Add English URL (primary)
          urls.push({
            loc: `${BASE_URL}/en/analysis/${article.slug}`,
            lastmod: articleDate,
            changefreq: 'weekly',
            priority: '0.8'
          });

          // Add backward compatibility URL (English default)
          urls.push({
            loc: `${BASE_URL}/analysis/${article.slug}`,
            lastmod: articleDate,
            changefreq: 'weekly',
            priority: '0.7'
          });
        });

        totalArticles += articles.length;
        console.log(`✓ Page ${page}: Added ${articles.length} articles. Total so far: ${totalArticles}`);

        // Check if there are more pages based on API response
        hasMore = data.nextPage !== null && articles.length === perPage;
        
        if (hasMore) {
          console.log(`→ Next page available: ${data.nextPage}`);
        } else {
          console.log(`→ No more pages available (nextPage: ${data.nextPage}, articles on this page: ${articles.length})`);
        }

        page++;

        // Progress indicator for large sitemaps
        if (page % 10 === 0) {
          console.log(`📊 Progress: Processed ${page} pages, ${totalArticles} articles so far...`);
        }

      } catch (error) {
        console.error(`❌ Error fetching analysis articles page ${page}:`, error);
        break;
      }
    }

    console.log(`🎯 Sitemap generation complete!`);
    console.log(`📊 Total pages processed: ${page - 1}`);
    console.log(`📝 Total analysis articles added: ${totalArticles}`);
    console.log(`🌐 Total URLs in sitemap: ${urls.length}`);

  } catch (error) {
    console.error('❌ Critical error in addDynamicAnalysisUrls:', error);
    // Don't fail completely - continue with static URLs
  }
}

function generateSitemapXML(urls: SitemapUrl[]): string {
  const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

  const xmlFooter = `</urlset>`;

  const urlEntries = urls.map(url => {
    let entry = `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>`;

    if (url.alternates) {
      url.alternates.forEach(alt => {
        entry += `\n    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />`;
      });
    }

    entry += '\n  </url>';
    return entry;
  }).join('\n\n');

  return `${xmlHeader}\n\n${urlEntries}\n\n${xmlFooter}`;
}

// Export for use in API routes or build scripts
export { generateDynamicSitemap as default };