import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { formatDate, getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on building AI agents, full-stack apps and automations — what worked, what broke and why.",
};

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-32 pb-24 sm:pt-40">
        <div className="section-container max-w-3xl">
          <span className="inline-flex items-center gap-2 font-mono text-xs text-accent">
            <span className="h-px w-4 bg-gradient-to-r from-accent to-accent2" />
            Writing
          </span>
          <h1 className="mt-3 font-serif text-5xl font-normal leading-[1.05] tracking-tight text-primary sm:text-6xl">
            Notes from the build
          </h1>
          <p className="mt-4 max-w-xl leading-relaxed text-secondary">
            Write-ups of real problems from my projects: how I solved them, the trade-offs, and what I&apos;d do
            differently.
          </p>

          <ul className="mt-12 divide-y divide-border border-y border-border">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block py-8 focus-ring rounded">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-secondary">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span aria-hidden="true">·</span>
                    <span>{post.readingMinutes} min read</span>
                  </div>
                  <h2 className="mt-3 flex items-start gap-2 font-serif text-3xl leading-tight text-primary transition-colors group-hover:text-accent">
                    {post.title}
                    <ArrowUpRight size={20} className="mt-1.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                  </h2>
                  <p className="mt-2 leading-relaxed text-secondary">{post.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {post.tags.map((t) => (
                      <span key={t} className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-secondary">
                        {t}
                      </span>
                    ))}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
