import Image from "next/image";
import PreviewVideo from "./PreviewVideo";

export default function Screenshot({
  src,
  alt,
  url,
  className = "",
  imageClassName: imageClassNameProp,
  sizes = "(min-width: 1024px) 320px, 100vw",
  priority = false,
  natural = false,
  zoomOnHover = false,
  video,
  playing = false,
}: {
  src: string;
  alt: string;
  url?: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Show the whole image at its own aspect ratio instead of cropping to a frame. */
  natural?: boolean;
  /** Zoom the image slightly when a parent with the `group` class is hovered. */
  zoomOnHover?: boolean;
  /** Optional muted preview video shown over the screenshot while `playing`. */
  video?: string;
  playing?: boolean;
}) {
  const imageClassName = imageClassNameProp ?? "aspect-[16/10]";
  const zoom = zoomOnHover ? " transition-transform duration-700 ease-out group-hover:scale-[1.06]" : "";
  const host = url?.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <div className={`overflow-hidden rounded-xl border border-border bg-bg/60 ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-border px-3.5 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        {host && <span className="ml-1.5 truncate font-mono text-[10px] text-secondary/70">{host}</span>}
      </div>
      {natural ? (
        <Image src={src} alt={alt} width={0} height={0} sizes={sizes} priority={priority} className={`h-auto w-full${zoom}`} />
      ) : (
        <div className={`relative w-full ${imageClassName}`}>
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover object-left-top${zoom}`} />
          {video && <PreviewVideo src={video} poster={src} playing={playing} />}
        </div>
      )}
    </div>
  );
}
