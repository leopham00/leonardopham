"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A single persistent, chromeless YouTube player used for hover previews.
 *
 * Mounting a fresh iframe per hover costs a second or two of black while the
 * player boots. Instead one player is created up front and switched between
 * videos with loadVideoById, which is near instant after the first load.
 *
 * The preview stays hidden until playback is genuinely running, so the spinner
 * and title card never show. The iframe is sized to cover its container, which
 * crops the letterboxing YouTube adds around vertical video.
 */

interface YTPlayer {
  loadVideoById: (id: string) => void;
  pauseVideo: () => void;
  playVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
  mute: () => void;
  destroy: () => void;
  getCurrentTime: () => number;
  unloadModule: (name: string) => void;
  setOption: (module: string, option: string, value: unknown) => void;
}

declare global {
  interface Window {
    YT?: {
      Player: new (el: HTMLElement, opts: Record<string, unknown>) => YTPlayer;
      PlayerState: { PLAYING: number; ENDED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<void> | null = null;

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
  const watch = useRef<number | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const clearWatch = () => {
      if (watch.current !== null) {
        window.clearInterval(watch.current);
        watch.current = null;
      }
    };

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
          cc_load_policy: 0,
          annotations: 3,
        },
        events: {
          onReady: (e: { target: YTPlayer }) => {
            e.target.mute();
            killCaptions(e.target);
            // A hover that landed while the API was still booting left an id
            // waiting. Without this the preview stays empty until the user
            // hovers something else and comes back.
            if (current.current) e.target.loadVideoById(current.current);
          },
          onStateChange: (e: { data: number }) => {
            const p = player.current;
            if (!p) return;

            // playerVars loop does nothing alongside loadVideoById, and the
            // endscreen would otherwise sit there at full opacity.
            if (e.data === window.YT?.PlayerState.ENDED) {
              p.seekTo(0, true);
              p.playVideo();
              return;
            }
            if (e.data !== window.YT?.PlayerState.PLAYING) return;

            killCaptions(p);
            // Reveal only once frames are actually running: PLAYING fires
            // while the spinner and title card are still on screen.
            const id = current.current;
            clearWatch();
            watch.current = window.setInterval(() => {
              const pl = player.current;
              if (!pl || current.current !== id) return clearWatch();
              if (pl.getCurrentTime() > 0.35) {
                clearWatch();
                setPlayingId(id);
              }
            }, 60);
          },
        },
      });
    });

    return () => {
      cancelled = true;
      clearWatch();
      try {
        player.current?.destroy();
      } catch {
        /* already torn down */
      }
      player.current = null;
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
