# GoldSniper Trading Signals App

## Overview

GoldSniper is a mobile-first trading signals application focused on XAUUSD (Gold) trading. The application provides high-accuracy trading signals with a claimed 93% success rate. The system is built as a modern full-stack web application with a React frontend and Express backend, designed to convert visitors into mobile app users through an engaging landing page experience.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Components**: Comprehensive shadcn/ui component system with Radix UI primitives

### Backend Architecture
- **Runtime**: Node.js with Express framework (ES modules)
- **Language**: TypeScript with strict type checking
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: PostgreSQL session store with connect-pg-simple

### Development Environment
- **Package Manager**: npm with lockfile version 3
- **Development Server**: tsx for TypeScript execution
- **Build Process**: esbuild for server bundling, Vite for client bundling
- **Environment**: Replit-optimized with development banner and cartographer integration

## Key Components

### Landing Page Strategy
The application implements a conversion-focused landing page with:
- Hero section with mobile app preview
- Partner credibility indicators
- Value proposition cards highlighting key benefits
- Download conversion points for iOS and Android
- Performance statistics and testimonials
- Mobile-first responsive design

### Database Schema
Currently implements a minimal user system with:
- Users table with username/password authentication
- Extensible schema for future trading signal data
- Drizzle migrations management

### UI Component System
Comprehensive component library including:
- Form components (inputs, selects, checkboxes)
- Navigation components (menus, breadcrumbs)
- Feedback components (toasts, alerts, progress)
- Layout components (cards, sheets, dialogs)
- Data display components (tables, charts, badges)

## Data Flow

### Client-Server Communication
1. **Static Assets**: Served directly from Vite development server
2. **API Routes**: Prefixed with `/api` for backend communication
3. **Client State**: Managed through React Query with optimistic updates
4. **Authentication**: Session-based authentication with PostgreSQL storage

### Database Operations
1. **ORM Layer**: Drizzle provides type-safe database operations
2. **Migration Management**: Automated schema versioning through drizzle-kit
3. **Connection Management**: Neon serverless driver for PostgreSQL connections

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **drizzle-orm**: Type-safe SQL ORM
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible component primitives
- **tailwindcss**: Utility-first CSS framework

### Development Dependencies
- **vite**: Frontend build tool and development server
- **tsx**: TypeScript execution engine
- **esbuild**: JavaScript bundler for production
- **@replit/vite-plugin-***: Replit development environment integration

### Brand Assets Integration
The application references external CDN assets for:
- Partner logos and credibility indicators
- Currency icons and trading symbols
- Mobile app preview imagery
- Social proof and testimonial content

## Deployment Strategy

### Build Process
1. **Client Build**: Vite builds React application to `dist/public`
2. **Server Build**: esbuild bundles Express server to `dist/index.js`
3. **Database**: Drizzle migrations ensure schema consistency

### Environment Configuration
- **Development**: Local development with hot reload
- **Production**: Single process serving both client and API
- **Database**: Environment variable-based connection string

### Hosting Considerations
- Static assets served from Express server
- Database migrations run via `npm run db:push`
- Environment variables required for database connectivity

## Changelog

```
Changelog:
- July 01, 2025. Initial setup
- July 01, 2025. Complete redesign of landing page inspired by professional GoldSniper design:
  * Transformed from mobile-first to full-width marketing website
  * Implemented dark theme with black backgrounds and gold (#C79901) accents
  * Added professional navigation header with section links
  * Enhanced hero section with large typography and authentic phone mockup imagery
  * Integrated real partner logos and authentic trading assets from original website
  * Built comprehensive sections: features, performance results, trader expertise, how it works, pricing, trading insights, and footer
  * Used authentic image assets from original GoldSniper CDN
  * Added smooth fade-in animations and professional styling
  * Implemented proper responsive design for desktop and mobile
  * Added navigation anchors for smooth scrolling between sections
- January 22, 2025. Comprehensive SEO optimization implementation:
  * Created XML sitemap (/sitemap.xml) and robots.txt for search engine optimization
  * Enhanced HTML meta tags with complete Open Graph and Twitter Card support
  * Implemented structured data (JSON-LD) with SoftwareApplication and Organization schemas
  * Added canonical URLs and mobile app deep linking
  * Created SEOHead component for dynamic meta tag management across pages
  * Built comprehensive FAQ section with trading-focused content for keyword targeting
  * Added page-specific SEO optimization for signals-app page
  * Reduced excessive spacing throughout the application for improved UX
  * Created reusable Navigation component to eliminate code duplication
- January 22, 2025. Mobile navigation and routing fixes:
  * Added responsive mobile hamburger menu for navigation accessibility
  * Fixed page crashes by removing problematic translation dependencies from App.tsx
  * Implemented clean routing system without translation complexity
  * Mobile menu includes all navigation links and language switcher
  * Fixed navigation between pages on both desktop and mobile devices
- January 22, 2025. Mobile spacing optimization and translation restoration:
  * Significantly improved mobile user experience by reducing excessive spacing under subtitle paragraphs
  * Targeted spacing optimization for section descriptions (mb-2 md:mb-4) while maintaining desktop layout
  * Restored proper section-level spacing (py-12 md:py-20) for visual separation between major content areas
  * Fixed translation system by reconnecting LanguageSwitcher to i18n with useTranslation hooks
  * Resolved JavaScript errors with missing icon imports (X, Target) in signals-app page
  * Achieved optimal balance: clear section separation with compact mobile subtitle spacing
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```