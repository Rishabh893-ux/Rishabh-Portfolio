import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { site } from "@/data/site";
import { formatDate, getAllPosts, getPost } from "@/lib/blog";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.description,
    openGraph: { type: "article", title: post.meta.title, description: post.meta.description, publishedTime: post.meta.date },
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();
  const { meta, content, headings } = post;

  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-32 pb-24 sm:pt-40">
        <div className="section-container">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded text-sm text-secondary transition-colors hover:text-primary focus-ring"
            >
              <ArrowLeft size={15} /> All posts
            </Link>
            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-secondary">
              <time dateTime={meta.date}>{formatDate(meta.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{meta.readingMinutes} min read</span>
              <span aria-hidden="true">·</span>
              <span>{site.name}</span>
            </div>
            <h1 className="mt-4 font-serif text-4xl font-normal leading-[1.05] tracking-tight text-primary sm:text-6xl">
              {meta.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-secondary">{meta.description}</p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-10 lg:grid-cols-[1fr_220px]">
            <article className="prose-blog min-w-0">
              <MDXRemote
                source={content}
                options={{
                  mdxOptions: {
                    rehypePlugins: [
                      rehypeSlug,
                      [
                        rehypePrettyCode,
                        { theme: { dark: "github-dark-dimmed", light: "github-light" }, keepBackground: false },
                      ],
                    ],
                  },
                }}
              />
            </article>

            {headings.length > 0 && (
              <aside className="hidden lg:block">
                <nav aria-label="On this page" className="sticky top-28">
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-secondary">On this page</div>
                  <ul className="mt-3 space-y-2 border-l border-border">
                    {headings.map((h) => (
                      <li key={h.id}>
                        <a
                          href={`#${h.id}`}
                          className="-ml-px block border-l border-transparent pl-3 text-sm text-secondary transition-colors hover:border-accent hover:text-primary"
                        >
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </aside>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
