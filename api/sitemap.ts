import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const baseUrl = 'https://goldsniper.vercel.app';
  const supportedLanguages = ['en', 'es', 'fr', 'de', 'ar', 'zh'];
  const pages = ['', '/signals-app', '/results', '/pricing', '/support', '/performance'];
  
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  supportedLanguages.forEach(lang => {
    pages.forEach(page => {
      sitemap += '  <url>\n';
      sitemap += `    <loc>${baseUrl}/${lang}${page}</loc>\n`;
      sitemap += '    <changefreq>weekly</changefreq>\n';
      sitemap += '    <priority>0.8</priority>\n';
      sitemap += '  </url>\n';
    });
  });
  
  sitemap += '</urlset>';
  
  res.setHeader('Content-Type', 'application/xml');
  res.status(200).send(sitemap);
}