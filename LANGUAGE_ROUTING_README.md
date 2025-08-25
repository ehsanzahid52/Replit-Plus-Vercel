# Language Routing System for GoldSniper

## Overview

This document explains the new language routing system implemented for the GoldSniper application, which provides SEO-friendly URLs and proper language switching functionality.

## URL Structure

The application now supports language-specific URLs with the following structure:

```
/en/ - English homepage
/es/ - Spanish homepage
/fr/ - French homepage
/de/ - German homepage
/ar/ - Arabic homepage
/zh/ - Chinese homepage

/en/signals-app - English features page
/es/signals-app - Spanish features page
/fr/signals-app - French features page
// etc.
```

## How It Works

### 1. Language Detection
- The system automatically detects the language from the URL path
- If no language is specified, it redirects to the default language (English)
- Invalid language codes redirect to the default language

### 2. Language Switching
- When a user changes language, the URL updates automatically
- The current page path is preserved when switching languages
- Language preference is stored in localStorage for future visits

### 3. SEO Optimization
- Each language version has its own canonical URL
- Hreflang tags are automatically generated for all languages
- Meta tags update dynamically based on the current language
- Sitemap.xml includes all language versions

## Components

### LanguageRouter
The main component that handles language routing logic:

```typescript
import LanguageRouter from '@/components/LanguageRouter';

// Wrap your app with LanguageRouter
<LanguageRouter>
  <YourApp />
</LanguageRouter>
```

### LanguageSwitcher
The language switcher component that users interact with:

```typescript
import LanguageSwitcher from '@/components/LanguageSwitcher';

// Use in your navigation
<LanguageSwitcher />
```

### Hooks

#### useLanguageFromUrl()
Returns the current language from the URL:

```typescript
import { useLanguageFromUrl } from '@/components/LanguageRouter';

const currentLanguage = useLanguageFromUrl(); // 'en', 'es', etc.
```

#### useLanguageChange()
Returns a function to change the current language:

```typescript
import { useLanguageChange } from '@/components/LanguageRouter';

const changeLanguage = useLanguageChange();
changeLanguage('es'); // Changes to Spanish
```

## SEO Features

### Meta Tags
- Dynamic title and description based on language
- Language-specific canonical URLs
- Proper hreflang attributes
- Open Graph tags for social media

### Sitemap
- Automatically generated at `/sitemap.xml`
- Includes all language versions of each page
- Updated weekly with proper priorities

### Robots.txt
- Available at `/robots.txt`
- Includes sitemap reference
- Proper crawling instructions

## Implementation Details

### Server-Side Routing
The server handles language-specific routes and serves the appropriate content:

```typescript
// Server routes all language paths to the main app
app.use("*", (req, res) => {
  res.sendFile(path.resolve(distPath, "index.html"));
});
```

### Client-Side Routing
The client handles the actual routing logic:

```typescript
// Language-specific routes
{Object.keys(supportedLanguages).map(lang => (
  <Route key={lang} path={`/${lang}`} component={Landing} />
))}
```

## Testing

To test the language routing system:

1. **Language Switching**: Click the language switcher and verify URLs update
2. **Direct URL Access**: Navigate directly to `/es/` or `/fr/` and verify content loads
3. **SEO Meta Tags**: Check that meta tags update when language changes
4. **Sitemap**: Visit `/sitemap.xml` to verify all language versions are included

## Troubleshooting

### Common Issues

1. **Language not changing**: Check that the LanguageRouter is wrapping your app
2. **URL not updating**: Verify the useLanguageChange hook is being used
3. **SEO tags not updating**: Ensure SEOHead component is receiving the correct pagePath

### Debug Tools

Use the browser console to check:
- Current language: `window.location.pathname`
- Stored language preference: `localStorage.getItem('i18nextLng')`

## Future Enhancements

1. **Content Translation**: Complete translation of all content
2. **Language-Specific Content**: Different content for different markets
3. **Analytics**: Track language-specific user behavior
4. **Performance**: Optimize loading for different languages
