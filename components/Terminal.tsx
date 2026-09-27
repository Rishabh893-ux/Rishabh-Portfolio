"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";

type Line = { prompt?: boolean; text: string };

const bootLines: Line[] = [
  { prompt: true, text: "whoami" },
  { text: "Rishabh Kasaudhan — Full Stack Developer" },
  { prompt: true, text: "cat current_role.txt" },
  { text: "Full Stack Intern @ ImpulseAI (Jan 2026 – present)" },
  { prompt: true, text: "stack" },
  { text: "Next.js · React · Node.js · Express · MongoDB · PostgreSQL · n8n · OpenAI" },
];

const HELP_TEXT = [
  "Available commands:",
  "experience — jump to Experience",
  "about      — jump to About",
  "skills     — jump to Skills",
  "projects   — jump to Featured Work",
  "github     — open GitHub profile",
  "contact    — jump to Contact",
  "resume     — download resume",
  "whoami     — who is this",
  "sudo       — nice try",
  "clear      — clear the terminal",
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Terminal() {
  const [history, setHistory] = useState<Line[]>(bootLines);
  const [input, setInput] = useState("");
  const [booted, setBooted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [history]);

  function runCommand(raw: string) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    let output: string[] = [];

    switch (cmd) {
      case "help":
        output = HELP_TEXT;
        break;
      case "about":
        scrollToId("about");
        output = ["Scrolling to About…"];
        break;
      case "skills":
        scrollToId("skills");
        output = ["Scrolling to Skills…"];
        break;
      case "projects":
        scrollToId("work");
        output = ["Scrolling to Featured Work…"];
        break;
      case "experience":
        scrollToId("experience");
        output = ["Scrolling to Experience…"];
        break;
      case "github":
        window.open(site.githubUrl, "_blank");
        output = [`Opening ${site.githubUrl}`];
        break;
      case "contact":
        scrollToId("contact");
        output = ["Scrolling to Contact…"];
        break;
      case "resume":
        window.open(site.resumeUrl, "_blank");
        output = ["Opening resume…"];
        break;
      case "whoami":
        output = ["Full stack dev, currently interning at ImpulseAI. Type \"experience\" for more."];
        break;
      case "sudo":
        output = ["Permission denied: nice try. This terminal is read-only fun."];
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      default:
        output = [`command not found: ${cmd} — type "help"`];
    }

    setHistory((h) => [...h, { prompt: true, text: raw }, ...output.map((text) => ({ text }))]);
    setInput("");
  }

  return (
    <div
      className="gradient-border w-full rounded-xl border border-border bg-surface/70 backdrop-blur-sm shadow-glow2 overflow-hidden"
      onClick={() => inputRef.current?.focus()}
      role="group"
      aria-label="Interactive terminal — optional"
    >
      <div className="flex items-center gap-1.5 border-b border-border bg-surface2/60 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 font-mono text-xs text-secondary">rishabh@dev — zsh</span>
      </div>
      <div ref={scrollRef} className="h-[17.5rem] sm:h-60 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-6">
        {booted &&
          history.map((line, i) => (
            <div key={i} className={line.prompt ? "text-primary" : "text-secondary"}>
              {line.prompt ? (
                <span>
                  <span className="text-accent">rishabh@dev</span>
                  <span className="text-secondary">:~$ </span>
                  {line.text}
                </span>
              ) : (
                <span className="pl-0">{line.text}</span>
              )}
            </div>
          ))}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            runCommand(input);
          }}
          className="flex items-center gap-1 mt-1"
        >
          <span className="text-accent">rishabh@dev</span>
          <span className="text-secondary">:~$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-primary placeholder:text-secondary/50"
            placeholder='try "help"'
            aria-label="Terminal command input"
            autoComplete="off"
            spellCheck={false}
          />
          {!input && <span className="h-4 w-[7px] animate-blink bg-accent" aria-hidden="true" />}
        </form>
      </div>
    </div>
  );
}
