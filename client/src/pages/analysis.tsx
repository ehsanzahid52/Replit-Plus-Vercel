import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Search, Loader2 } from 'lucide-react';
import Navigation from '../components/Navigation';
import SEOHead from '../components/SEOHead';
import { useLanguageFromUrl } from '../components/LanguageRouter';

interface AnalysisArticle {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  content: string;
  published_date: string;
  tags: number[];
  cover: {
    url: string;
    meta: {
      width: number;
      height: number;
    };
  };
  chart_id: string;
}

interface AnalysisResponse {
  items: AnalysisArticle[];
  curPage: number;
  nextPage: number | null;
  prevPage: number | null;
  pageTotal: number;
  itemsTotal: number;
  perPage: number;
}

// Import tag utility functions
import { getTagNameSync, getTagSlugSync } from '../utils/tagData';

export default function Analysis() {
  const { t } = useTranslation();
  const currentLanguage = useLanguageFromUrl();
  const [articles, setArticles] = useState<AnalysisArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const observerTarget = useRef<HTMLDivElement>(null);

  const fetchArticles = async (page: number = 1, search: string = '', append: boolean = false) => {
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }
    
    try {
      const searchParam = search ? `&search=${encodeURIComponent(search)}` : '';
      const response = await fetch(
        `https://x7kt-9pgq-melx.n7.xano.io/api:J0tQsbwj/analysis?page=${page}${searchParam}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch analysis articles');
      }
      
      const data: AnalysisResponse = await response.json();
      
      if (append) {
        setArticles(prev => [...prev, ...data.items]);
      } else {
        setArticles(data.items);
      }
      
      setCurrentPage(data.curPage);
      setHasMore(data.nextPage !== null);
      setTotalItems(data.itemsTotal);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Load more articles when reaching the bottom
  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      fetchArticles(currentPage + 1, debouncedSearchQuery, true);
    }
  }, [currentPage, loadingMore, hasMore, debouncedSearchQuery]);

  // Initial load and search changes
  useEffect(() => {
    setCurrentPage(1);
    setHasMore(true);
    fetchArticles(1, debouncedSearchQuery, false);
  }, [debouncedSearchQuery]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
          loadMore();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [loadMore, hasMore, loadingMore, loading]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLanguage === 'ar' ? 'ar-SA' : currentLanguage, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Search will be handled by the debounced effect
  };

  const handleTagClick = (tagId: number) => {
    // Navigate to dedicated tag page
    window.location.href = `/${currentLanguage}/analysis/tags/${getTagSlugSync(tagId)}`;
  };

  const clearFilters = () => {
    setSearchQuery('');
    setDebouncedSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-black">
      <SEOHead 
        title={`${t('nav.analysis', 'Market Analysis')} - GoldSniper`}
        description="Professional gold market analysis and trading insights from expert traders. Get the latest XAUUSD analysis and trading strategies."
        keywords="gold market analysis, XAUUSD analysis, gold trading insights, market research, trading strategies"
        canonical={`https://goldsniper.io/${currentLanguage}/analysis`}
      />
      <Navigation currentPage="analysis" />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 via-black to-gray-900 py-8 md:py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Market Analysis & Insights
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Professional gold market analysis from expert traders. Stay ahead with our comprehensive XAUUSD insights and trading strategies.
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search analysis articles..."
                className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[color:var(--brand-orange)] transition-colors"
              />
            </div>
          </form>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Results Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="text-white">
              <h2 className="text-2xl font-bold mb-2">Latest Analysis</h2>
              <div className="flex items-center gap-4">
                <p className="text-gray-400">
                  Showing {articles.length} of {totalItems} articles
                  {searchQuery && ` for "${searchQuery}"`}
                </p>
                {searchQuery && (
                  <Button
                    onClick={clearFilters}
                    size="sm"
                    className="bg-[color:var(--brand-orange)] hover:bg-[color:var(--amber-accent)] text-black font-semibold border border-[color:var(--brand-orange)]"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          </div>

          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[color:var(--brand-orange)] mx-auto"></div>
              <p className="text-gray-400 mt-4">Loading analysis articles...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-red-400 mb-4">Error: {error}</p>
              <Button 
                onClick={() => fetchArticles(1, debouncedSearchQuery, false)}
                className="bg-[color:var(--brand-orange)] hover:bg-[color:var(--amber-accent)] text-black font-semibold border border-[color:var(--brand-orange)]"
              >
                Try Again
              </Button>
            </div>
          )}

          {!loading && !error && (
            <>
              {/* Articles Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {articles.map((article) => (
                  <Card key={article.id} className="bg-gray-900 border-gray-800 hover:border-[color:var(--brand-orange)] transition-colors group overflow-hidden">
                    {/* Article Image */}
                    <div 
                      className="h-48 overflow-hidden cursor-pointer"
                      onClick={() => window.location.href = `/${currentLanguage}/analysis/${article.slug}`}
                    >
                      <img 
                        src={article.cover.url} 
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <CardContent className="p-6">
                      {/* Date */}
                      <div className="flex items-center text-gray-400 text-sm mb-3">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(article.published_date)}
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2 group-hover:text-[color:var(--brand-orange)] transition-colors">
                        {article.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-400 mb-4 line-clamp-3">
                        {article.short_description}
                      </p>
                      
                      {/* Tags */}
                      {article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {article.tags.slice(0, 3).map((tagId) => (
                            <Badge 
                              key={tagId} 
                              variant="secondary" 
                              className="bg-gray-800 text-gray-300 hover:bg-[color:var(--brand-orange)] hover:text-black text-xs cursor-pointer transition-colors"
                              onClick={() => handleTagClick(tagId)}
                            >
                              {getTagNameSync(tagId)}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      {/* Read More Button */}
                      <Button 
                        className="w-full bg-[color:var(--brand-orange)] hover:bg-[color:var(--amber-accent)] text-black font-semibold border border-[color:var(--brand-orange)]"
                        onClick={() => window.location.href = `/${currentLanguage}/analysis/${article.slug}`}
                      >
                        Read Full Analysis
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Infinite Scroll Loading Indicator */}
              {loadingMore && (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-[color:var(--brand-orange)] mr-3" />
                  <span className="text-gray-400">Loading more articles...</span>
                </div>
              )}
              
              {/* End of Results */}
              {!hasMore && articles.length > 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-400">You've reached the end of all analysis articles.</p>
                </div>
              )}
              
              {/* Intersection Observer Target */}
              <div ref={observerTarget} className="h-10" />
            </>
          )}
        </div>
      </section>
    </div>
  );
}