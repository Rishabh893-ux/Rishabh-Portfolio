import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/data/site";

export default function Footer() {
  return (
    // Extra bottom padding keeps the last row clear of the floating "Ask my AI" button.
    <footer className="section-inverse relative border-t border-border pt-10 pb-28">
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="section-container grid gap-6 text-center sm:text-left lg:grid-cols-[1.2fr_0.8fr_0.4fr] lg:items-center">
        <div>
          <div className="font-medium text-primary">{site.name}</div>
          <div className="mt-1 text-sm text-secondary">Software Engineer • AI • Full Stack • Automation</div>
        </div>

        <div className="text-sm text-secondary">
          Open to SDE &amp; Full Stack roles — currently building AI automation at ImpulseAI.
        </div>

        <div className="flex items-center justify-center gap-2 sm:justify-end">
          <a
            href={site.githubUrl}
            target="_blank"
            aria-label="GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-secondary transition-colors hover:border-accent2/30 hover:text-primary focus-ring"
          >
            <Github size={16} />
          </a>
          <a
            href={site.linkedinUrl}
            target="_blank"
            aria-label="LinkedIn"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-secondary transition-colors hover:border-accent2/30 hover:text-primary focus-ring"
          >
            <Linkedin size={16} />
          </a>
          <a
            href={`mailto:${site.email}`}
            aria-label="Email"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-secondary transition-colors hover:border-accent2/30 hover:text-primary focus-ring"
          >
            <Mail size={16} />
          </a>
        </div>
      </div>

      <div className="section-container mt-4 flex flex-col-reverse items-center gap-4 border-t border-border pt-4 text-center text-xs text-secondary sm:flex-row sm:justify-between sm:text-left">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <a
          href="#top"
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs text-secondary transition-colors hover:border-accent2/30 hover:text-primary focus-ring"
        >
          <ArrowUp size={12} /> Back to top
        </a>
      </div>
    </footer>
  );
}
