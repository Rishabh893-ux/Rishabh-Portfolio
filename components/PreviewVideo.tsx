"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A muted, looping preview laid over a screenshot. `src` is the .mp4; a .webm with
 * the same name is offered first. Nothing is downloaded until the
 * first play (preload="none"), and the screenshot stays visible until the video
 * actually has frames to show.
 */
export default function PreviewVideo({ src, poster, playing }: { src: string; poster: string; playing: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (playing) {
      video.play().catch(() => {
        // Autoplay can be refused (e.g. data saver); the screenshot simply stays.
      });
    } else {
      video.pause();
    }
  }, [playing]);

  return (
    <>
      <video
        ref={ref}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        onPlaying={() => setReady(true)}
        className={cn(
          "absolute inset-0 h-full w-full object-cover object-left-top transition-opacity duration-300",
          playing && ready ? "opacity-100" : "opacity-0"
        )}
      >
        {/* WebM (VP9) first for browsers without H.264, such as open-source Chromium builds. */}
        <source src={src.replace(/\.mp4$/, ".webm")} type="video/webm" />
        <source src={src} type="video/mp4" />
      </video>
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-[10px] font-medium text-[#f5f5f6] backdrop-blur-sm transition-opacity duration-300",
          playing ? "opacity-0" : "opacity-100"
        )}
      >
        <Play size={10} className="fill-current" /> Preview
      </span>
    </>
  );
}
