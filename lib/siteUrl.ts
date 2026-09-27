// Server-only: VERCEL_PROJECT_PRODUCTION_URL is set by Vercel at build time.
// Set NEXT_PUBLIC_SITE_URL once a custom domain is connected.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");
