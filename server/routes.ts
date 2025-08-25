import type { Express } from "express";
import { createServer, type Server } from "http";
import path from "path";

async function mountApi(app: Express, route: string, relFile: string) {
  try {
    const mod = await import(path.resolve(process.cwd(), relFile));
    const handler = (mod as any).default;
    if (typeof handler !== "function") {
      console.error(`No default export function in ${relFile}`);
      return;
    }
    app.all(route, (req, res) => handler(req as any, res as any));
    console.log(`Mounted ${route} -> ${relFile}`);
  } catch (err) {
    console.error(`Failed to mount ${relFile} for ${route}:`, err);
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Mount API handlers from api/ for Replit (Vercel uses them natively)
  await mountApi(app, "/api/health", "api/health.ts");
  await mountApi(app, "/api/signals", "api/signals.ts");
  await mountApi(app, "/api/sitemap", "api/sitemap.ts");
  await mountApi(app, "/api/robots", "api/robots.ts");

  // Also expose non-API SEO endpoints via the same api/ handlers
  await mountApi(app, "/sitemap.xml", "api/sitemap.ts");
  await mountApi(app, "/robots.txt", "api/robots.ts");

  const httpServer = createServer(app);
  return httpServer;
}
