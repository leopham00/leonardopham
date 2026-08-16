"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/work";
import { images } from "@/lib/images.generated";

const CYCLE_MS = 900;

/**
 * Hovering a row reveals that project's imagery, fixed and centred in the
 * viewport at full opacity, above the list. The hero leads, then the gallery
 * cycles. Each project remembers where its cycle got to, so leaving and
 * returning resumes rather than restarting.
 *
 * Every frame of the hovered project is mounted at once and switched by
 * opacity, so a cut never waits on a network fetch. The cycle also refuses to
 * advance onto a frame that has not decoded yet, which is what produced the
 * blank flash between images.
 */
export default function WorkIndex({ projects }: { projects: Project[] }) {
  const [hovered, setHovered] = useState<Project | null>(null);
  const [frame, setFrame] = useState(0);
  const [, forceRender] = useState(0);
  const resume = useRef<Record<string, number>>({});
  const loaded = useRef<Set<string>>(new Set());

  const key = hovered?.assets;
  const reel = useMemo(() => {
    const entry = key ? images[key] : undefined;
    return entry ? [entry.hero, ...entry.gallery].filter(Boolean) : [];
  }, [key]);

  const markLoaded = useCallback((src: string) => {
    if (loaded.current.has(src)) return;
    loaded.current.add(src);
    forceRender((n) => n + 1);
  }, []);

  useEffect(() => {
    if (!key || reel.length < 2) return;
    const id = setInterval(() => {
      setFrame((f) => {
        // step forward to the next frame that is actually ready
        for (let i = 1; i <= reel.length; i++) {
          const cand = (f + i) % reel.length;
          if (loaded.current.has(reel[cand]!.src)) {
            resume.current[key] = cand;
            return cand;
          }
        }
        return f;
      });
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [key, reel]);

  const onEnter = (p: Project) => {
    const len = images[p.assets]?.gallery.length ?? 0;
    const max = len; // hero + gallery, minus one
    const want = resume.current[p.assets] ?? 0;
    setFrame(want > max ? 0 : want);
    setHovered(p);
  };

  return (
    <>
      {/* Full opacity, above the rows so nothing obscures the work. */}
      <div
        className="hidden md:block fixed inset-0 z-30 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
          style={{
            width: "min(var(--preview-max-w), 90vw)",
            height: "min(var(--preview-max-h), 80vh)",
            // Hard gate: with nothing hovered the whole layer is inert, so a
            // frame can never linger on screen.
            visibility: hovered ? "visible" : "hidden",
          }}
        >
          {hovered && reel.map((img, i) => (
            <Image
              key={img!.src}
              src={img!.src}
              alt=""
              width={img!.w}
              height={img!.h}
              sizes="(max-width: 1200px) 45vw, 560px"
              priority={i === 0}
              onLoad={() => markLoaded(img!.src)}
              // Scale to whichever bound it meets first, never past either.
              className="absolute max-w-full max-h-full w-auto h-auto object-contain transition-opacity duration-150 ease-out"
              style={{ opacity: i === Math.min(frame, reel.length - 1) ? 1 : 0 }}
            />
          ))}
        </div>
      </div>

      <ul className="relative z-10" onMouseLeave={() => setHovered(null)}>
        {projects.map((p) => {
          const hero = images[p.assets]?.hero;
          return (
            <li key={p.slug} className="border-b border-hairline">
              <Link
                href={`/work/${p.slug}`}
                onMouseEnter={() => onEnter(p)}
                onFocus={() => onEnter(p)}
                className="group flex items-center gap-3 md:gap-6 px-4 md:px-6 py-3 md:py-4 transition-colors duration-200 hover:text-muted"
              >
                <span className="md:hidden relative shrink-0 w-14 h-14 overflow-hidden bg-[#ebebe8]">
                  {hero && (
                    <Image src={hero.src} alt="" fill sizes="56px" className="object-cover" />
                  )}
                </span>

                <span className="flex-1 min-w-0 flex flex-col md:flex-row md:items-baseline md:gap-6">
                  <span className="text-[clamp(0.95rem,1.6vw,1.15rem)] leading-tight truncate">
                    {p.title}
                  </span>
                  <span className="meta text-muted md:ml-auto md:text-right shrink-0 md:whitespace-nowrap">
                    {p.client}
                    {p.agency && <span className="opacity-70"> via {p.agency}</span>}
                    <span className="mx-2 opacity-40">·</span>
                    {p.role}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
