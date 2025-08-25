import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'wouter';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Loader2, Search } from 'lucide-react';
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
import { getTagBySlug, getTagName, getTagSlug } from '../utils/tagData';

export default function AnalysisTag() {
  const { tagSlug } = useParams();
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

  // Get tag data from slug
  const tagInfo = tagSlug ? getTagBySlug(tagSlug) : null;

  const fetchArticles = async (page: number = 1, append: boolean = false) => {
    if (!tagInfo) return;
    
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }
    
    try {
      const response = await fetch(
        `https://x7kt-9pgq-melx.n7.xano.io/api:J0tQsbwj/analysis?page=${page}&per_page=50`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch analysis articles');
      }
      
      const data: AnalysisResponse = await response.json();
      
      // Filter articles that contain the target tag
      const filteredItems = data.items.filter(item => item.tags.includes(tagInfo.id));
      
      if (append) {
        setArticles(prev => [...prev, ...filteredItems]);
      } else {
        setArticles(filteredItems);
      }
      
      setCurrentPage(data.curPage);
      // Continue fetching if we have few results and there are more pages
      setHasMore(data.nextPage !== null && filteredItems.length >= 10);
      setTotalItems(filteredItems.length); // This will be updated as we fetch more
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Load more articles when reaching the bottom
  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      fetchArticles(currentPage + 1, false);
    }
  }, [currentPage, loadingMore, hasMore]);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Initial load and search changes
  useEffect(() => {
    setCurrentPage(1);
    setHasMore(true);
    fetchArticles(1, false);
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

  const goBack = () => {
    window.location.href = `/${currentLanguage}/analysis`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Navigation currentPage="analysis" />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[color:var(--brand-orange)]"></div>
        </div>
      </div>
    );
  }

  if (error || !tagInfo) {
    return (
      <div className="min-h-screen bg-black">
        <Navigation currentPage="analysis" />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Tag Not Found</h1>
            <p className="text-gray-400 mb-8">The tag you're looking for doesn't exist or has been moved.</p>
            <Button 
              onClick={goBack}
              className="bg-[color:var(--brand-orange)] hover:bg-[color:var(--amber-accent)] text-black font-semibold border border-[color:var(--brand-orange)]"
            >
              Back to Analysis
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <SEOHead 
        title={`${tagInfo.name} Gold Trading Analysis | XAUUSD Market Insights - GoldSniper`}
        description={`${tagInfo.description} Explore comprehensive ${tagInfo.name.toLowerCase()} analysis for XAUUSD gold trading. Expert insights and professional trading strategies updated daily.`}
        keywords={`${tagInfo.name.toLowerCase()}, ${tagInfo.name.toLowerCase()} gold analysis, XAUUSD ${tagInfo.name.toLowerCase()}, gold analysis, XAUUSD analysis, gold trading insights, market analysis, trading strategies, precious metals trading`}
        canonical={`https://goldsniper.io/${currentLanguage}/analysis/tags/${tagSlug}`}
      />
      <Navigation currentPage="analysis" />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 via-black to-gray-900 py-8 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <Badge className="bg-[color:var(--brand-orange)] text-black font-semibold mb-4 text-sm">
              {tagInfo.name}
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {tagInfo.name} Analysis
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              {tagInfo.description}
            </p>
            
            <p className="text-gray-400">
              {articles.length > 0 && `Showing ${articles.length}${hasMore ? '+' : ''} articles tagged with "${tagInfo.name}"`}
              {articles.length === 0 && !loading && 'No articles found for this tag'}
              {loading && 'Loading articles...'}
            </p>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
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
                              className={`text-xs cursor-pointer transition-colors ${
                                tagId === tagInfo.id
                                  ? 'bg-[color:var(--brand-orange)] text-black border border-[color:var(--brand-orange)]'
                                  : 'bg-gray-800 text-gray-300 hover:bg-[color:var(--brand-orange)] hover:text-black'
                              }`}
                              onClick={() => {
                                window.location.href = `/${currentLanguage}/analysis/tags/${getTagSlug(tagId)}`;
                              }}
                            >
                              {getTagName(tagId)}
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
                  <p className="text-gray-400">You've reached the end of all "{tagInfo.name}" articles.</p>
                </div>
              )}
              
              {/* No Results */}
              {articles.length === 0 && !loading && (
                <div className="text-center py-12">
                  <p className="text-gray-400 mb-4">No articles found for "{tagInfo.name}" tag.</p>
                  <Button 
                    onClick={goBack}
                    className="bg-[color:var(--brand-orange)] hover:bg-[color:var(--amber-accent)] text-black font-semibold border border-[color:var(--brand-orange)]"
                  >
                    Browse All Analysis
                  </Button>
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