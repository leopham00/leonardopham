"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { Img } from "@/lib/images.generated";

/**
 * Project gallery. Clicking a shot opens it in a lightbox over a dimmed page.
 * Closes on the X, on backdrop click, and on Escape.
 */
export default function Gallery({ shots }: { shots: Img[] }) {
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
    // stop the page scrolling behind the lightbox
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, shots.length]);

  const active = open === null ? null : shots[open];

  return (
    <>
      <div className="px-4 md:px-6 pb-8 md:pb-16 grid gap-4 md:gap-6 md:grid-cols-2 items-start">
        {shots.map((img, i) => {
          const wide = img.w / img.h > 1.3;
          return (
            <button
              key={img.src}
              type="button"
              onClick={() => setOpen(i)}
              aria-label="Open image"
              className={`flex justify-center w-full cursor-zoom-in ${wide ? "md:col-span-2" : ""}`}
            >
              <Image
                src={img.src}
                alt=""
                width={img.w}
                height={img.h}
                sizes={wide ? "(max-width: 767px) 100vw, 92vw" : "(max-width: 767px) 100vw, 46vw"}
                style={{ maxHeight: "var(--preview-max-h)" }}
                className="w-auto h-auto max-w-full bg-[#ebebe8]"
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
            src={active.src}
            alt=""
            width={active.w}
            height={active.h}
            sizes="100vw"
            // clicking the image itself must not close the lightbox
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-full w-auto h-auto object-contain cursor-default"
          />
        </div>
      )}
    </>
  );
}
