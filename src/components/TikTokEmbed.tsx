"use client";

import { useEffect, useRef, useState } from "react";

/**
 * TikTok's embed renders a fixed 325x738 card on a white page, whatever size
 * the iframe is: a wide frame just gets white margins, and below the video sit
 * the caption, music credit and share buttons. None of it can be styled, since
 * the document is cross origin.
 *
 * So the frame is sized to the card exactly and scaled up, with the container
 * clipped to the video region. What survives is the video and nothing else.
 *
 * These numbers are measured from the live embed. If TikTok changes the card,
 * the crop drifts and they need remeasuring.
 */
const CARD_W = 325;
const CARD_H = 738;
const VIDEO_W = 323;
const VIDEO_H = 574;
const OFFSET_X = 1;
const OFFSET_Y = 1;

export default function TikTokEmbed({ id, title }: { id: string; title: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setScale(el.clientWidth / VIDEO_W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={box}
      className="relative w-full overflow-hidden bg-ground"
      style={{ aspectRatio: `${VIDEO_W} / ${VIDEO_H}` }}
    >
      <div
        className="absolute top-0 left-0"
        style={{
          width: VIDEO_W,
          height: VIDEO_H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          // nothing to show until the first measure, or it flashes at 1:1
          visibility: scale ? "visible" : "hidden",
        }}
      >
        <iframe
          src={`https://www.tiktok.com/embed/v2/${id}`}
          title={title || "TikTok video"}
          loading="lazy"
          allow="encrypted-media; picture-in-picture"
          scrolling="no"
          className="absolute border-0"
          style={{
            width: CARD_W,
            height: CARD_H,
            left: -OFFSET_X,
            top: -OFFSET_Y,
          }}
        />
      </div>
    </div>
  );
}
