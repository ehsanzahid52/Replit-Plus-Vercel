import { useState, useEffect } from 'react';
import { useParams } from 'wouter';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Share2, ExternalLink } from 'lucide-react';
import Navigation from '../components/Navigation';
import SEOHead from '../components/SEOHead';
import { useLanguageFromUrl } from '../components/LanguageRouter';

// Import tag utility functions
import { getTagNameSync, getTagSlugSync } from '../utils/tagData';

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

interface RelatedArticle {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  cover: {
    url: string;
  };
  published_date: string;
}

export default function AnalysisArticle() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const currentLanguage = useLanguageFromUrl();
  const [article, setArticle] = useState<AnalysisArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<RelatedArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      
      setLoading(true);
      try {
        // Extract keywords from slug to search by title (much more efficient)
        const searchKeywords = slug ? slug.split('-').slice(0, 3).join(' ') : '';
        let articleData = null;
        
        // First, try searching with keywords from slug
        if (searchKeywords) {
          const response = await fetch(
            `https://x7kt-9pgq-melx.n7.xano.io/api:J0tQsbwj/analysis?title=${encodeURIComponent(searchKeywords)}&per_page=50`
          );
          
          if (response.ok) {
            const data = await response.json();
            articleData = data.items.find((item: AnalysisArticle) => item.slug === slug);
          }
        }
        
        // If not found with keywords, search through all articles (fallback)
        if (!articleData) {
          let page = 1;
          let found = false;
          
          while (!found && page <= 20) { // Reduced safety limit since this is fallback
            const response = await fetch(
              `https://x7kt-9pgq-melx.n7.xano.io/api:J0tQsbwj/analysis?page=${page}&per_page=50`
            );
            
            if (!response.ok) {
              throw new Error('Failed to fetch articles');
            }
            
            const data = await response.json();
            articleData = data.items.find((item: AnalysisArticle) => item.slug === slug);
            
            if (articleData) {
              found = true;
            } else if (data.nextPage === null) {
              break;
            } else {
              page++;
            }
          }
        }
        
        if (!articleData) {
          throw new Error('Article not found');
        }
        
        setArticle(articleData);
        
        // Fetch related articles (excluding current article)
        const relatedResponse = await fetch(
          `https://x7kt-9pgq-melx.n7.xano.io/api:J0tQsbwj/analysis?per_page=4`
        );
        
        if (relatedResponse.ok) {
          const relatedData = await relatedResponse.json();
          const filtered = relatedData.items.filter(
            (item: AnalysisArticle) => item.id !== articleData.id
          ).slice(0, 3);
          setRelatedArticles(filtered);
        }
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLanguage === 'ar' ? 'ar-SA' : currentLanguage, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async () => {
    const url = window.location.href;
    const title = article?.title || 'GoldSniper Analysis';
    
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url
        });
      } catch (err) {
        // Fallback to copying URL
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      }
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  const goBack = () => {
    window.history.back();
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

  if (error || !article) {
    return (
      <div className="min-h-screen bg-black">
        <Navigation currentPage="analysis" />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Article Not Found</h1>
            <p className="text-gray-400 mb-8">The analysis article you're looking for doesn't exist or has been moved.</p>
            <Button 
              onClick={() => window.location.href = `/${currentLanguage}/analysis`}
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
        title={`${article.title} | XAUUSD Gold Trading Analysis - GoldSniper`}
        description={`${article.short_description} Get expert gold trading insights and XAUUSD market analysis from professional traders. Updated ${formatDate(article.published_date)}.`}
        keywords={`${article.title.toLowerCase()}, gold analysis, XAUUSD analysis, gold trading insights, market analysis, trading strategy, gold signals, precious metals trading`}
        canonical={`https://goldsniper.io/${currentLanguage}/analysis/${article.slug}`}
        ogImage={article.cover.url}
      />
      <Navigation currentPage="analysis" />

      {/* Article Header */}
      <section className="bg-gradient-to-r from-gray-900 via-black to-gray-900 py-8 md:py-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Article Meta */}
          <div className="flex items-center text-gray-400 text-sm mb-4">
            <Calendar className="w-4 h-4 mr-2" />
            {formatDate(article.published_date)}
            <span className="mx-3">•</span>
            <Clock className="w-4 h-4 mr-2" />
            {Math.ceil(article.content.length / 200)} min read
          </div>
          
          {/* Article Title */}
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {article.title}
          </h1>
          
          {/* Article Description */}
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            {article.short_description}
          </p>
          
          {/* Share Button */}
          <Button 
            onClick={handleShare}
            className="bg-[color:var(--brand-orange)] hover:bg-[color:var(--amber-accent)] text-black font-semibold border border-[color:var(--brand-orange)]"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share Article
          </Button>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          {/* Featured Image */}
          <div className="mb-12">
            <img 
              src={article.cover.url}
              alt={article.title}
              className="w-full h-auto rounded-2xl shadow-2xl cursor-pointer hover:scale-[1.02] transition-transform duration-300"
              onClick={() => window.location.href = `/${currentLanguage}/analysis/${article.slug}`}
            />
          </div>
          
          {/* Article Body */}
          <div className="prose prose-lg prose-invert max-w-none">
            <div className="text-gray-300 leading-relaxed whitespace-pre-line text-lg">
              {article.content}
            </div>
          </div>
          
          {/* Chart ID Reference */}
          {article.chart_id && (
            <div className="mt-8 p-4 bg-gray-900 rounded-xl border border-gray-800">
              <div className="flex items-center text-gray-400">
                <ExternalLink className="w-4 h-4 mr-2" />
                <span className="text-sm">Chart ID: {article.chart_id}</span>
              </div>
            </div>
          )}
          
          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="mt-8">
              <h3 className="text-white font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tagId) => (
                  <Badge 
                    key={tagId} 
                    variant="secondary" 
                    className="bg-gray-800 text-gray-300 hover:bg-[color:var(--brand-orange)] hover:text-black cursor-pointer transition-colors"
                    onClick={() => window.location.href = `/${currentLanguage}/analysis/tags/${getTagSlugSync(tagId)}`}
                  >
                    {getTagNameSync(tagId)}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-gray-900">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-white mb-8">Related Analysis</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {relatedArticles.map((relatedArticle) => (
                <Card key={relatedArticle.id} className="bg-black border-gray-800 hover:border-[color:var(--brand-orange)] transition-colors group">
                  <div 
                    className="h-48 overflow-hidden rounded-t-lg cursor-pointer"
                    onClick={() => window.location.href = `/${currentLanguage}/analysis/${relatedArticle.slug}`}
                  >
                    <img 
                      src={relatedArticle.cover.url}
                      alt={relatedArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center text-gray-400 text-sm mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(relatedArticle.published_date)}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-[color:var(--brand-orange)] transition-colors">
                      {relatedArticle.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-4 line-clamp-2 text-sm">
                      {relatedArticle.short_description}
                    </p>
                    
                    <Button 
                      onClick={() => window.location.href = `/${currentLanguage}/analysis/${relatedArticle.slug}`}
                      className="w-full bg-[color:var(--brand-orange)] hover:bg-[color:var(--amber-accent)] text-black font-semibold border border-[color:var(--brand-orange)]"
                    >
                      Read Analysis
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button 
                onClick={() => window.location.href = `/${currentLanguage}/analysis`}
                className="bg-[color:var(--brand-orange)] hover:bg-[color:var(--amber-accent)] text-black font-semibold border border-[color:var(--brand-orange)] px-8 py-3"
              >
                View All Analysis
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}