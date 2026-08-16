"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { Img, Vid } from "@/lib/images.generated";

export type Item =
  | ({ kind: "img" } & Img)
  | ({ kind: "video" } & Vid);

/**
 * Project media. Images open in a lightbox over a dimmed page; videos play
 * inline. Landscape items span the full row rather than sitting centred in a
 * single column, so the grid keeps its edges.
 */
export default function Gallery({
  items,
  cols = 2,
  autoplay = false,
}: {
  items: Item[];
  cols?: 2 | 4;
  autoplay?: boolean;
}) {
  const shots = items.filter((i): i is { kind: "img" } & Img => i.kind === "img");
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % shots.length));
      if (e.key === "ArrowLeft")
        setOpen((i) => (i === null ? i : (i - 1 + shots.length) % shots.length));
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, shots.length]);

  const active = open === null ? null : shots[open];
  const grid = cols === 4 ? "md:grid-cols-4" : "md:grid-cols-2";
  const span = cols === 4 ? "md:col-span-4" : "md:col-span-2";

  return (
    <>
      <div className={`px-4 md:px-6 pb-8 md:pb-16 grid gap-4 md:gap-6 ${grid} items-start`}>
        {items.map((item) => {
          if (item.kind === "video") {
            const src =
              item.provider === "youtube"
                ? `https://www.youtube-nocookie.com/embed/${item.id}?rel=0&modestbranding=1${
                    autoplay ? `&autoplay=1&mute=1&loop=1&playlist=${item.id}&controls=0` : ""
                  }`
                : `https://player.vimeo.com/video/${item.id}?title=0&byline=0&portrait=0${
                    autoplay ? "&autoplay=1&muted=1&loop=1&background=1" : ""
                  }`;
            return (
              <div key={`${item.provider}-${item.id}`} className={span}>
                <div className="relative w-full aspect-video bg-[#ebebe8]">
                  <iframe
                    src={src}
                    title={item.title || "Project video"}
                    loading="lazy"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full border-0"
                  />
                </div>
                {autoplay && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="meta text-muted mt-2 inline-block hover:text-ink transition-colors duration-200"
                  >
                    {item.title || "Watch"} ↗
                  </a>
                )}
              </div>
            );
          }

          const wide = item.w / item.h > 1.3;
          const i = shots.indexOf(item);
          return (
            <button
              key={item.src}
              type="button"
              onClick={() => setOpen(i)}
              aria-label="Open image"
              className={`block w-full cursor-zoom-in ${wide ? span : ""}`}
            >
              <Image
                src={item.src}
                alt=""
                width={item.w}
                height={item.h}
                sizes={wide ? "(max-width: 767px) 100vw, 92vw" : "(max-width: 767px) 100vw, 46vw"}
                className="w-full h-auto bg-[#ebebe8]"
              />
            </button>
          );
        })}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={close}
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 md:p-10"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white text-2xl leading-none w-10 h-10 flex items-center justify-center hover:opacity-60 transition-opacity duration-200"
          >
            ✕
          </button>
          <Image
            /* keyed so React mounts a fresh node: without it the browser keeps
               painting the previously decoded image until the new one loads */
            key={active.src}
            src={active.src}
            alt=""
            width={active.w}
            height={active.h}
            sizes="100vw"
            priority
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-full w-auto h-auto object-contain cursor-default"
          />
        </div>
      )}
    </>
  );
}
