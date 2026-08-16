"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A single persistent, chromeless YouTube player used for hover previews.
 *
 * Mounting a fresh iframe per hover costs a second or two of black while the
 * player boots. Instead one player is created up front and switched between
 * videos with loadVideoById, which is near instant after the first load.
 *
 * The still stays visible underneath until playback actually begins, so a
 * hover never shows a black box. The iframe is sized to cover its container,
 * which crops the letterboxing YouTube adds around vertical videos.
 */

interface YTPlayer {
  loadVideoById: (id: string) => void;
  pauseVideo: () => void;
  mute: () => void;
  getPlayerState: () => number;
  getCurrentTime: () => number;
  unloadModule: (name: string) => void;
  setOption: (module: string, option: string, value: unknown) => void;
}

declare global {
  interface Window {
    YT?: {
      Player: new (el: HTMLElement, opts: Record<string, unknown>) => YTPlayer;
      PlayerState: { PLAYING: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<void> | null = null;

/** YouTube can still force subtitles on even with cc_load_policy off. */
function killCaptions(p: YTPlayer | null) {
  if (!p) return;
  try {
    p.unloadModule("captions");
    p.unloadModule("cc");
    p.setOption("captions", "track", {});
  } catch {
    /* module may not be loaded yet */
  }
}

function loadApi(): Promise<void> {
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve) => {
    if (window.YT?.Player) return resolve();
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    const s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(s);
  });
  return apiPromise;
}

export default function HoverVideo({
  videoId,
  aspect,
}: {
  videoId: string | null;
  /** width / height of the source, so the box matches the video, not a square. */
  aspect: number;
}) {
  const host = useRef<HTMLDivElement>(null);
  const player = useRef<YTPlayer | null>(null);
  const current = useRef<string | null>(null);
  // Track which id is actually playing rather than a bare boolean, so a new
  // hover never shows the previous video's frame while the swap is in flight.
  const [playingId, setPlayingId] = useState<string | null>(null);

  // Boot one player, once.
  useEffect(() => {
    let cancelled = false;
    loadApi().then(() => {
      if (cancelled || !host.current || player.current || !window.YT) return;
      player.current = new window.YT.Player(host.current, {
        playerVars: {
          autoplay: 0,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          disablekb: 1,
          playsinline: 1,
          fs: 0,
          loop: 1,
          cc_load_policy: 0,
          annotations: 3,
        },
        events: {
          onReady: (e: { target: YTPlayer }) => {
            e.target.mute();
            killCaptions(e.target);
          },
          onStateChange: (e: { data: number }) => {
            if (e.data !== window.YT?.PlayerState.PLAYING) return;
            killCaptions(player.current);
            // Reveal only once frames are actually running. PLAYING fires
            // while the spinner and title card are still on screen.
            const id = current.current;
            const started = window.setInterval(() => {
              const p = player.current;
              if (!p || current.current !== id) return window.clearInterval(started);
              if (p.getCurrentTime() > 0.35) {
                window.clearInterval(started);
                setPlayingId(id);
              }
            }, 60);
          },
        },
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Swap the video on hover; pause when the hover ends.
  useEffect(() => {
    current.current = videoId;
    const p = player.current;
    if (!p) return;
    if (videoId) {
      p.mute();
      p.loadVideoById(videoId);
    } else {
      p.pauseVideo();
    }
  }, [videoId]);

  return (
    <div
      className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 ease-out"
      style={{ opacity: videoId && playingId === videoId ? 1 : 0 }}
    >
      {/* Box takes the video's own ratio, so nothing is letterboxed. */}
      <div
        className="yt-cover relative overflow-hidden"
        style={{
          aspectRatio: String(aspect),
          width: aspect >= 1 ? "100%" : "auto",
          height: aspect >= 1 ? "auto" : "100%",
          maxWidth: "100%",
          maxHeight: "100%",
        }}
      >
        <div ref={host} />
      </div>
    </div>
  );
}
