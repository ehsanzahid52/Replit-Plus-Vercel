// Complete tag mapping based on actual API data
const API_TAG_MAPPING: Record<number, { name: string; slug: string; description: string }> = {
  10: { name: "Trend Analysis", slug: "trend-analysis", description: "Analysis related to trend-analysis" },
  11: { name: "Signal Service", slug: "signalservice", description: "Analysis related to signalservice" },
  12: { name: "Signals Provider", slug: "signalsprovider", description: "Analysis related to signalsprovider" },
  14: { name: "Signals", slug: "signals", description: "Analysis related to signals" },
  15: { name: "Chart Patterns", slug: "chart-patterns", description: "Analysis related to chart-patterns" },
  16: { name: "DXY", slug: "dxy", description: "Analysis related to dxy" },
  17: { name: "Index", slug: "index", description: "Analysis related to index" },
  18: { name: "Trading", slug: "trading", description: "Analysis related to trading" },
  19: { name: "Wave Analysis", slug: "wave-analysis", description: "Analysis related to wave-analysis" },
  20: { name: "Support And Resistance", slug: "support-and-resistance", description: "Analysis related to support-and-resistance" },
  21: { name: "Smart Money Concept", slug: "smartmoneyconcept", description: "Analysis related to smartmoneyconcept" },
  22: { name: "SMC", slug: "smc", description: "Analysis related to smc" },
  23: { name: "ICT", slug: "ict", description: "Analysis related to ict" },
  24: { name: "Spot", slug: "spot", description: "Analysis related to spot" },
  25: { name: "Signal", slug: "signal", description: "Analysis related to signal" },
  26: { name: "Fundamental Analysis", slug: "fundamental-analysis", description: "A tool for assessing market trading strategies and analytics." },
  27: { name: "Binance", slug: "binance", description: "Trade & invest with Binance. Review terms & conditions, research ideas & scripts." },
  28: { name: "Bybit", slug: "bybit", description: "Bybit - Trading Ideas, Strategies, Opinions, Analytics" },
  29: { name: "Futures", slug: "futures", description: "Futures — Explore trading ideas, strategies, opinions, and analytics." },
  30: { name: "BNB", slug: "bnb", description: "BNB — Financial market analysis and trading strategies." },
  31: { name: "Fibonacci Retracement", slug: "fibonacci-retracement", description: "Fibonacci Retracement — Trading strategies and market analytics." },
  32: { name: "Support And Resistance", slug: "support_and_resistance", description: "Support_and_Resistance — Analysis and strategies for financial market trading." },
  33: { name: "Consolidation", slug: "consolidation", description: "Consolidation - Analysis of trading strategies and market opinions." },
  34: { name: "Trend Line Break", slug: "trend-line-break", description: "Analysis related to trend-line-break" },
  35: { name: "XAUSUD", slug: "xausud", description: "xausud - Trading ideas, strategies, opinions, analytics." },
  36: { name: "Gold", slug: "gold", description: "Gold Price in Global Financial Markets" },
  37: { name: "Supply And Demand", slug: "supply-and-demand", description: "Supply-and-Demand - Analysis and strategies for market trading." },
  38: { name: "AB-CD", slug: "ab-cd", description: "AB-CD — Trading ideas, strategies, and analytics." },
  39: { name: "Trend Trading", slug: "trendtrading", description: "trendtrading — A tag for discussing strategies, opinions, and analytics related to trend trading." },
  40: { name: "Symmetrical Triangle", slug: "symmetrical-triangle", description: "symmetrical-triangle — A tag for trading strategies and market analytics." },
  41: { name: "Zigzag", slug: "zigzag", description: "Zigzag - A tag for trading strategies, ideas, and analytics." },
  42: { name: "Triangle", slug: "triangle", description: "Triangle Pattern: A bilateral pattern; post break-out, the trend may continue or reverse." },
  43: { name: "Trading Ideas", slug: "tradingideas", description: "tradingideas — Explore strategies, opinions, and analytics for trading." },
  44: { name: "Flat", slug: "flat", description: "FLAT — Trading Ideas and Analytics" },
  45: { name: "Ascending Channel", slug: "ascending-channel", description: "Analysis related to ascending-channel" },
  46: { name: "Gold Trading Strategy", slug: "goldtradingstrategy", description: "goldtradingstrategy - A tag focusing on strategies and analytics for trading gold." },
  47: { name: "Breakout", slug: "breakout", description: "Breakout - Analysis and strategies for trading." },
  48: { name: "XAUUSD", slug: "xauusd", description: "Analysis related to xauusd" },
  49: { name: "Gold Prediction", slug: "goldprediction", description: "Analysis related to goldprediction" },
  50: { name: "Ascending Triangle", slug: "ascending-triangle", description: "ascending-triangle — A tag for trading ideas, strategies, and analytics." },
  51: { name: "Exit", slug: "exit", description: "exit — Trading strategies, ideas, analytics, and opinions." },
  52: { name: "Technical Indicators", slug: "technical-indicators", description: "technical-indicators — A resource for trading strategies, ideas, and analytics." },
  53: { name: "Long", slug: "long", description: "LONG — Explore trading ideas, strategies, opinions, and analytics." },
  54: { name: "Gold Analysis", slug: "goldanalysis", description: "Live Gold Spot to US Dollar Rate. XAU USD Chart with Historical Data." },
  55: { name: "Gold Trading", slug: "goldtrading", description: "goldtrading — Strategies, opinions, and analytics for trading in gold." },
  56: { name: "NFP", slug: "nfp", description: "nfp — A tag for trading ideas, strategies, opinions, and analytics." },
  57: { name: "Descending Channel", slug: "descending-channel", description: "Analysis related to descending-channel" },
  58: { name: "Analysis", slug: "analysis", description: "Analysis - Trading ideas, strategies, and analytics." },
  59: { name: "Forex", slug: "forex", description: "Forex — Trading ideas, strategies, and analytics." },
  60: { name: "Trend Lines", slug: "trend-lines", description: "trend-lines — Analyze and understand market direction and patterns." },
  61: { name: "Short", slug: "short", description: "Short — A tag for trading ideas, strategies, opinions, and analytics." },
  62: { name: "Technical Analysis", slug: "technical-analysis", description: "technical-analysis — A comprehensive study of trading strategies and market analytics." },
  63: { name: "Crypto", slug: "crypto", description: "Explore trading strategies and analytics with advanced crypto charts." },
  64: { name: "Tariffs", slug: "tariffs", description: "Tariffs - Analysis, strategies, and opinions on trading." },
  65: { name: "Contains Imagine", slug: "containsimagine", description: "Containsimagine — Platform for trading ideas, strategies, and analytics." },
  66: { name: "XAUUSD Analysis", slug: "xauusdanalysis", description: "xauusdanalysis - Analytical insights and strategies related to XAU/USD trading." },
  67: { name: "Sell", slug: "sell", description: "SELL — Trading Ideas, Strategies, Analytics" },
  68: { name: "Bearish Patterns", slug: "bearish-patterns", description: "Analysis related to bearish-patterns" },
  69: { name: "XAUUSD Signals", slug: "xauusdsignals", description: "xauusdsignals — Trading ideas, strategies, and analytics for gold to USD exchange." },
  70: { name: "XAUUSD Updates", slug: "xauusdupdates", description: "xauusdupdates — Provides trading ideas, strategies, and analytics." }
};

// Helper functions for consistent tag display
export const getTagName = (tagId: number): string => {
  return API_TAG_MAPPING[tagId]?.name || `Tag ${tagId}`;
};

export const getTagSlug = (tagId: number): string => {
  return API_TAG_MAPPING[tagId]?.slug || `tag-${tagId}`;
};

export const getTagDescription = (tagId: number): string => {
  return API_TAG_MAPPING[tagId]?.description || `Analysis related to tag ${tagId}`;
};

export const getTagBySlug = (slug: string): { id: number; name: string; description: string } | null => {
  const entry = Object.entries(API_TAG_MAPPING).find(([, data]) => data.slug === slug);
  return entry ? { 
    id: parseInt(entry[0]), 
    name: entry[1].name, 
    description: entry[1].description 
  } : null;
};

// Export for backwards compatibility
export const getTagNameSync = getTagName;
export const getTagSlugSync = getTagSlug;

// Export the mapping for other components that need it
export const tagMapping = API_TAG_MAPPING;