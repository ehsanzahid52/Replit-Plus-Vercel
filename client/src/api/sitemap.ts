import { generateDynamicSitemap } from '../utils/sitemapGenerator';

export async function GET() {
  try {
    const sitemap = await generateDynamicSitemap();
    
    return new Response(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
        'X-Robots-Tag': 'noindex' // Don't index the sitemap itself
      }
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    return new Response('Error generating sitemap', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  }
}