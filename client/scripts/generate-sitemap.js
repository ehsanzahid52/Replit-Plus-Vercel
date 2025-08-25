import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Tag mapping with SEO priorities - keep in sync with sitemapGenerator.ts
const TAG_PRIORITIES = {
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
  'forex': { priority: '0.8', changefreq: 'daily' }
};

// Tag mapping from your codebase
const API_TAG_MAPPING = {
  10: { name: "Trend Analysis", slug: "trend-analysis" },
  11: { name: "Signal Service", slug: "signalservice" },
  12: { name: "Signals Provider", slug: "signalsprovider" },
  14: { name: "Signals", slug: "signals" },
  15: { name: "Chart Patterns", slug: "chart-patterns" },
  16: { name: "DXY", slug: "dxy" },
  17: { name: "Index", slug: "index" },
  18: { name: "Trading", slug: "trading" },
  19: { name: "Wave Analysis", slug: "wave-analysis" },
  20: { name: "Support And Resistance", slug: "support-and-resistance" },
  21: { name: "Smart Money Concept", slug: "smartmoneyconcept" },
  22: { name: "SMC", slug: "smc" },
  23: { name: "ICT", slug: "ict" },
  24: { name: "Spot", slug: "spot" },
  25: { name: "Signal", slug: "signal" },
  26: { name: "Fundamental Analysis", slug: "fundamental-analysis" },
  27: { name: "Binance", slug: "binance" },
  28: { name: "Bybit", slug: "bybit" },
  29: { name: "Futures", slug: "futures" },
  30: { name: "BNB", slug: "bnb" },
  31: { name: "Fibonacci Retracement", slug: "fibonacci-retracement" },
  32: { name: "Support And Resistance", slug: "support_and_resistance" },
  33: { name: "Consolidation", slug: "consolidation" },
  34: { name: "Trend Line Break", slug: "trend-line-break" },
  35: { name: "XAUSUD", slug: "xausud" },
  36: { name: "Gold", slug: "gold" },
  37: { name: "Supply And Demand", slug: "supply-and-demand" },
  38: { name: "AB-CD", slug: "ab-cd" },
  39: { name: "Trend Trading", slug: "trendtrading" },
  40: { name: "Symmetrical Triangle", slug: "symmetrical-triangle" },
  41: { name: "Zigzag", slug: "zigzag" },
  42: { name: "Triangle", slug: "triangle" },
  43: { name: "Trading Ideas", slug: "tradingideas" },
  44: { name: "Flat", slug: "flat" },
  45: { name: "Ascending Channel", slug: "ascending-channel" },
  46: { name: "Gold Trading Strategy", slug: "goldtradingstrategy" },
  47: { name: "Breakout", slug: "breakout" },
  48: { name: "XAUUSD", slug: "xauusd" },
  49: { name: "Gold Prediction", slug: "goldprediction" },
  50: { name: "Ascending Triangle", slug: "ascending-triangle" },
  51: { name: "Exit", slug: "exit" },
  52: { name: "Technical Indicators", slug: "technical-indicators" },
  53: { name: "Long", slug: "long" },
  54: { name: "Gold Analysis", slug: "goldanalysis" },
  55: { name: "Gold Trading", slug: "goldtrading" },
  56: { name: "NFP", slug: "nfp" },
  57: { name: "Descending Channel", slug: "descending-channel" },
  58: { name: "Analysis", slug: "analysis" },
  59: { name: "Forex", slug: "forex" },
  60: { name: "Trend Lines", slug: "trend-lines" },
  61: { name: "Short", slug: "short" },
  62: { name: "Technical Analysis", slug: "technical-analysis" },
  63: { name: "Crypto", slug: "crypto" },
  64: { name: "Tariffs", slug: "tariffs" },
  65: { name: "Contains Imagine", slug: "containsimagine" },
  66: { name: "XAUUSD Analysis", slug: "xauusdanalysis" },
  67: { name: "Sell", slug: "sell" },
  68: { name: "Bearish Patterns", slug: "bearish-patterns" },
  69: { name: "XAUUSD Signals", slug: "xauusdsignals" },
  70: { name: "XAUUSD Updates", slug: "xauusdupdates" }
};

const SUPPORTED_LANGUAGES = ['en', 'es', 'fr', 'de', 'ar', 'zh'];
const BASE_URL = 'https://goldsniper.io';
const ANALYSIS_API_URL = 'https://x7kt-9pgq-melx.n7.xano.io/api:J0tQsbwj/analysis';

async function generateSitemap() {
  console.log('🚀 Generating dynamic sitemap...');
  
  const urls = [];
  const today = new Date().toISOString().split('T')[0];

  // Add static pages
  console.log('📄 Adding static pages...');
  addStaticUrls(urls, today);

  // Add dynamic analysis content
  console.log('🔍 Fetching dynamic analysis content...');
  await addDynamicAnalysisUrls(urls, today);

  // Generate XML
  const sitemap = generateSitemapXML(urls);
  
  // Write to file
  const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap);
  
  console.log(`✅ Dynamic sitemap generated with ${urls.length} URLs!`);
  console.log(`📁 Saved to: ${sitemapPath}`);
}

function addStaticUrls(urls, today) {
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

async function addDynamicAnalysisUrls(urls, today) {
  try {
    // Add all known tag pages first
    Object.entries(API_TAG_MAPPING).forEach(([tagId, tagData]) => {
      const tagSlug = tagData.slug;
      const tagConfig = TAG_PRIORITIES[tagSlug] || { priority: '0.6', changefreq: 'weekly' };
      
      urls.push({
        loc: `${BASE_URL}/en/analysis/tags/${tagSlug}`,
        lastmod: today,
        changefreq: tagConfig.changefreq,
        priority: tagConfig.priority
      });
    });

    console.log(`📊 Added ${Object.keys(API_TAG_MAPPING).length} tag pages`);

    // Fetch ALL dynamic analysis articles intelligently
    let page = 1;
    const perPage = 20; // API is hardcoded to 20 items per page
    let hasMore = true;
    let totalArticles = 0;
    let consecutiveEmptyPages = 0;
    const maxConsecutiveEmptyPages = 3; // Safety: stop if we hit 3 empty pages in a row

    console.log(`📖 Starting to fetch analysis articles with ${perPage} per page (API limit)...`);
    console.log(`📊 Expected total: 861 articles across 44 pages`);

    while (hasMore) {
      try {
        console.log(`📖 Fetching articles page ${page}...`);
        const response = await fetch(`${ANALYSIS_API_URL}?page=${page}&per_page=${perPage}`);
        
        if (!response.ok) {
          console.warn(`Failed to fetch analysis articles page ${page}: ${response.status} ${response.statusText}`);
          break;
        }

        const data = await response.json();
        const articles = data.items || [];

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
        if (page % 5 === 0) {
          console.log(`📊 Progress: Processed ${page - 1} pages, ${totalArticles} articles so far...`);
        }

        // Safety check to prevent infinite loops (but allow for all 44 pages)
        if (page > 50) {
          console.log(`⚠️  Safety limit reached (50 pages). Stopping to prevent infinite loop.`);
          break;
        }

      } catch (error) {
        console.error(`❌ Error fetching analysis articles page ${page}:`, error);
        break;
      }
    }

    console.log(`🎯 Analysis articles fetch complete!`);
    console.log(`📊 Total pages processed: ${page - 1}`);
    console.log(`📝 Total analysis articles added: ${totalArticles}`);

  } catch (error) {
    console.error('❌ Critical error in addDynamicAnalysisUrls:', error);
    // Don't fail completely - continue with static URLs
  }
}

function generateSitemapXML(urls) {
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

// Run the script
generateSitemap().catch(console.error);