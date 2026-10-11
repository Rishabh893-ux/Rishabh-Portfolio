import Image from "next/image";
import { site } from "@/data/site";

const initials = site.name
  .split(" ")
  .map((part) => part[0])
  .join("")
  .slice(0, 2)
  .toUpperCase();

/**
 * Profile photo in a rounded portrait card with a slowly rotating gradient border.
 * Until `site.photo` is set, it shows the initials instead, so the layout never
 * has an empty hole.
 */
export default function Avatar({
  width = 104,
  height = 128,
  priority = false,
}: {
  width?: number;
  height?: number;
  /** Load immediately (for an above-the-fold photo such as the hero). */
  priority?: boolean;
}) {
  return (
    <div className="relative shrink-0" style={{ width, height }}>
      <div aria-hidden="true" className="absolute -inset-2 rounded-3xl bg-accent/20 blur-xl" />
      <div className="relative h-full w-full overflow-hidden rounded-2xl p-[2px]">
        {/* Oversized conic layer spinning behind the photo; only its 2px edge shows. */}
        <div
          aria-hidden="true"
          className="absolute -inset-1/2 animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_0deg,rgb(var(--c-accent)),rgb(var(--c-accent2-bright)),rgb(var(--name-from)),rgb(var(--c-accent)))]"
        />
        <div className="relative h-full w-full overflow-hidden rounded-[14px] bg-surface">
          {site.photo ? (
            <Image
              src={site.photo}
              alt={`Photo of ${site.name}`}
              fill
              sizes={`${width * 2}px`}
              priority={priority}
              className="object-cover object-top"
            />
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
    </div>
  );
}
