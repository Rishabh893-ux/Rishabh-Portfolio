import Image from "next/image";
import { site } from "@/data/site";

const initials = site.name
  .split(" ")
  .map((part) => part[0])
  .join("")
  .slice(0, 2)
  .toUpperCase();

/**
 * Profile photo inside a slowly rotating gradient ring. Until `site.photo` is set,
 * it shows the initials instead, so the layout never has an empty hole.
 */
export default function Avatar({ size = 76 }: { size?: number }) {
  return (
    <div className="relative shrink-0 rounded-full p-[3px]" style={{ width: size, height: size }}>
      <div
        aria-hidden="true"
        className="absolute inset-0 animate-[spin_8s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,#6C5CE7,rgb(var(--c-accent2-bright)),#9C90FF,#6C5CE7)]"
      />
      <div aria-hidden="true" className="absolute -inset-2 rounded-full bg-accent/20 blur-xl" />
      {/* bg-colored gap between the ring and the photo */}
      <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-bg bg-surface">
        {site.photo ? (
          <Image src={site.photo} alt={`Photo of ${site.name}`} fill sizes={`${size}px`} className="object-cover" />
        ) : (
          <span
            role="img"
            aria-label={site.name}
            className="flex h-full w-full items-center justify-center font-display text-2xl font-semibold gradient-text-static"
          >
            {initials}
          </span>
        )}
      </div>
    </div>
  );
}
