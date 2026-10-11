import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { siteUrl } from "@/lib/siteUrl";
import { Analytics } from "@vercel/analytics/next";
import CommandPalette from "@/components/CommandPalette";
import BackToTop from "@/components/BackToTop";
import { themeInitScript } from "@/lib/theme";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jbmono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jbmono", display: "swap" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
  weight: ["500", "600", "700"],
});

const title = `${site.name} — Full Stack Developer | Next.js · Node.js · MongoDB`;
const description =
  "Full Stack Developer and Full Stack Intern at ImpulseAI, building Next.js, Node.js and MongoDB applications and AI-powered automations with n8n and OpenAI.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s — ${site.name}`,
  },
  description,
  keywords: [
    "Rishabh Kasaudhan",
    "Software Engineer",
    "AI Developer",
    "MongoDB",
    "n8n Automation",
    "Full Stack Developer",
    "Automation",
    "Next.js Developer",
    "React Developer",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    title,
    description,
    siteName: site.name,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: {
    icon: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jbmono.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="bg-bg text-primary font-sans antialiased selection:bg-accent/30 selection:text-primary">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-surface2 focus:px-4 focus:py-2 focus:text-sm focus:text-primary focus:border focus:border-accent"
        >
          Skip to content
        </a>
        {children}
        <BackToTop />
        <CommandPalette />
        <Analytics />
      </body>
    </html>
  );
}
