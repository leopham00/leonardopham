/**
 * Which projects play their video as the hover preview instead of showing
 * still images.
 *
 * Keyed by the project's `assets` value in work.ts. Anything not listed keeps
 * the still reel, which is the better choice for projects whose strength is
 * the frames rather than the motion.
 *
 * Note on vertical work: YouTube always serves a 16:9 player, so a vertical
 * Short sits pillarboxed inside it. The preview crops those bars away, which
 * means the visible area is the centre strip of an already small frame. The
 * stills for those projects are sharper, so they are left off by default.
 */
export const videoPreview = new Set<string>([
  "motion-reel",
  "sprite",
  "coke-togetherness",
  "coke-cj-henry",
  "vitaminwater",
  "sacred-embodiment",
]);

export function playsVideo(assets: string): boolean {
  return videoPreview.has(assets);
}

/**
 * Per project ordering of media on the project page.
 *
 * "mix" alternates videos and images in a 1, 1, 2, 2 rhythm rather than a flat
 * alternation, keeping the running order within each group so the strongest
 * videos still lead. Column span and tile ratio are derived, not configured: a
 * project with a single video gives it the full row, everything else runs one
 * video per column, and the tile takes the orientation of the project's hero.
 *
 * `trailing` pins social media screenshots to the very end. They are context,
 * not the work, so they should never interrupt it.
 */
export interface MediaLayout {
  order?: "interleave" | "mix";
  trailing?: string[];
}

export const mediaLayout: Record<string, MediaLayout> = {
  easyherb: {
    order: "mix",
    trailing: ["/work/easyherb/01.webp", "/work/easyherb/05.webp"],
  },
  "sacred-embodiment": {
    trailing: ["/work/sacred-embodiment/01.webp"],
  },
};

export function layoutFor(assets: string): MediaLayout {
  return mediaLayout[assets] ?? {};
}
