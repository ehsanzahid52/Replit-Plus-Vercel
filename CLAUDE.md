# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

### Development
- `npm run dev` - Start full development environment (client + server)
- `npm run dev:client` - Start client development server only
- `npm run dev:server` - Start server development only

### Building and Testing
- `npm run build` - Build both client and server for production
- `npm run build:client` - Build client only
- `npm run build:server` - Build server only  
- `npm run check` - Run TypeScript type checking
- `cd client && npm run lint` - Run ESLint on client code

### Database
- `npm run db:push` - Push database schema changes to Neon PostgreSQL

## Architecture Overview

This is a full-stack trading signals website for GoldSniper (XAUUSD trading app) built with:

### Frontend (React + TypeScript)
- **Location**: `client/src/`
- **Framework**: React 18 with Vite build system
- **Styling**: Tailwind CSS + shadcn/ui component library (Radix UI primitives)
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state
- **Internationalization**: i18next with 6 supported languages (en, es, fr, de, ar, zh)

### Backend (Node.js + Express)
- **Location**: `server/`
- **Runtime**: Node.js with Express (ES modules)
- **Database**: PostgreSQL via Neon serverless with Drizzle ORM
- **Schema**: Located in `shared/schema.ts`
- **Build**: esbuild for production bundling

### Key Architecture Patterns

#### Monorepo Structure
- Root `package.json` handles full-stack operations
- `client/package.json` for client-specific dependencies
- `shared/` directory contains common schemas and types
- Path aliases: `@/*` maps to `client/src/*`, `@shared/*` to `shared/*`

#### Development vs Production
- **Development**: Vite dev server with hot reload + concurrent Express server
- **Production**: Single Express server serving both static assets and API routes
- **Port**: Always serves on port 5002 in all environments

#### Internationalization
- Multi-language routing: `/{lang}` prefixed routes for all pages
- Language detection and switching via `LanguageRouter` component  
- Fallback routes without language prefix for backward compatibility

#### Component System
- Comprehensive shadcn/ui components in `client/src/components/ui/`
- Custom components for navigation, language switching, and SEO
- Mobile-responsive design with hamburger navigation

#### Database Integration
- Drizzle ORM with type-safe operations
- Migration management via `drizzle-kit`
- Neon serverless PostgreSQL driver
- Environment-based connection via `DATABASE_URL`

## AI Tools Integration

### Taskmaster-AI
- **Status**: Initialized and configured as MCP server
- **Configuration**: `.taskmaster.json` contains project metadata
- **Access**: Available through MCP server connection in Cursor
- **Purpose**: AI-powered task management and project assistance

## Development Notes

- Always run type checking with `npm run check` before commits
- Client linting available via `npm run lint` in client directory
- The application serves both marketing pages and trading signal functionality
- SEO optimization includes structured data, Open Graph, and XML sitemaps
- Mobile-first responsive design with specific spacing optimizations