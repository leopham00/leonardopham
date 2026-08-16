"use client";

import { useEffect, useState } from "react";
import { PREVIEW_MAX_W, PREVIEW_MAX_H } from "@/lib/preview-bounds";

const KEY = "preview-bounds";

/**
 * Development-only overlay for dialling in the preview image bounds against
 * the real images. Writes straight to the CSS variables so the hover preview
 * and gallery respond live, and draws the bounding box so the allowed area is
 * visible while tuning.
 *
 * Saved values persist in localStorage; the printed line gets pasted back into
 * src/lib/preview-bounds.ts to commit them. Never rendered in production.
 */
export default function PreviewBoundsTuner() {
  const [w, setW] = useState(PREVIEW_MAX_W);
  const [h, setH] = useState(PREVIEW_MAX_H);
  const [open, setOpen] = useState(true);
  const [saved, setSaved] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect --
     Restoring persisted values has to happen after mount, otherwise the
     server and client render different numbers and hydration mismatches. */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return;
      const v = JSON.parse(raw) as { w?: number; h?: number };
      if (v.w) setW(v.w);
      if (v.h) setH(v.h);
    } catch {
      /* ignore malformed storage */
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--preview-max-w", `${w}px`);
    root.style.setProperty("--preview-max-h", `${h}px`);
  }, [w, h]);

  const save = () => {
    localStorage.setItem(KEY, JSON.stringify({ w, h }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2400);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 left-4 z-[60] bg-ink text-ground meta px-3 py-2"
      >
        Bounds
      </button>
    );
  }

  return (
    <>
      {/* The allowed area, drawn where the hover preview actually sits. */}
      <div className="fixed inset-0 z-[55] pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 outline-1 outline-dashed outline-[#ff3b30]"
          style={{
            width: "min(var(--preview-max-w), 90vw)",
            height: "min(var(--preview-max-h), 80vh)",
          }}
        >
          <span className="absolute -top-5 left-0 meta text-[#ff3b30]">
            {w} × {h}
          </span>
        </div>
      </div>

      <div className="fixed bottom-4 left-4 z-[60] w-[264px] bg-ink text-ground p-4 select-none">
        <div className="flex items-center justify-between mb-3">
          <span className="meta">Preview bounds</span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Hide"
            className="meta opacity-60 hover:opacity-100"
          >
            ✕
          </button>
        </div>

        <label className="meta opacity-70 block mb-1">Width {w}px</label>
        <input
          type="range"
          min={280}
          max={1000}
          step={10}
          value={w}
          onChange={(e) => setW(+e.target.value)}
          className="w-full mb-4 accent-white"
        />

        <label className="meta opacity-70 block mb-1">Height {h}px</label>
        <input
          type="range"
          min={280}
          max={1000}
          step={10}
          value={h}
          onChange={(e) => setH(+e.target.value)}
          className="w-full mb-4 accent-white"
        />

        <button
          onClick={save}
          className="w-full border border-ground/40 py-2 meta hover:bg-ground hover:text-ink transition-colors duration-150"
        >
          {saved ? "Saved, tell Claude" : "Save bounds"}
        </button>

        <p className="meta opacity-50 mt-3 leading-relaxed break-words">
          width {w}, height {h}
        </p>
      </div>
    </>
  );
}
