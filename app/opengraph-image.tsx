import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Google Fonts serves TTF (which the renderer needs) when no browser user-agent is sent.
async function loadSpaceGrotesk(): Promise<ArrayBuffer | null> {
  try {
    const css = await (await fetch("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700")).text();
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const display = await loadSpaceGrotesk();
  const [first, ...rest] = site.name.split(" ");
  const tags = ["Next.js", "Node.js", "MongoDB", "n8n", "OpenAI"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#08080A",
          backgroundImage: "radial-gradient(circle at 0% 0%, rgba(108,92,231,0.38), rgba(8,8,10,0) 60%)",
          color: "#F5F5F6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 26, color: "#96969E" }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: "#6C5CE7" }} />
          Open to SDE &amp; Full Stack roles
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: display ? "Space Grotesk" : "sans-serif", fontSize: 112, fontWeight: 700, lineHeight: 1, letterSpacing: -3 }}>{first}</div>
          <div style={{ fontFamily: display ? "Space Grotesk" : "sans-serif", fontSize: 112, fontWeight: 700, lineHeight: 1.05, letterSpacing: -3, color: "#9C90FF" }}>
            {rest.join(" ")}
          </div>
          <div style={{ marginTop: 28, fontSize: 36, color: "#D4D4DA" }}>
            Full Stack Developer · Full Stack Intern @ ImpulseAI
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {tags.map((t) => (
            <div
              key={t}
              style={{
                fontSize: 24,
                padding: "10px 20px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.14)",
                color: "#C7C7D1",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: display ? [{ name: "Space Grotesk", data: display, weight: 700, style: "normal" }] : undefined,
    },
  );
}
