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
 * order      "mix" alternates videos and images in a 1, 1, 2, 2 rhythm rather
 *            than a flat alternation, keeping the running order within each
 *            group so the strongest videos still lead.
 * trailing   social media screenshots, pinned to the very end. They are
 *            context, not the work, so they never interrupt it.
 * pairs      images that must sit side by side on the same row.
 * videoAfter place the video after this many images instead of interleaving.
 * hideStills keep the stills for the hover preview but off the project page.
 * cols       grid columns on the project page. Defaults to 2. Four suits
 *            sets of vertical clips, which read as a contact sheet at that size.
 *
 * Column span and tile ratio are derived, not configured: a project with a
 * single landscape video gives it the full row, everything else runs one video
 * per column, and the tile takes the orientation of the project's hero.
 */
export interface MediaLayout {
  order?: "interleave" | "mix";
  trailing?: string[];
  pairs?: [string, string][];
  videoAfter?: number;
  /** Keep the stills for the hover preview but leave them off the page. */
  hideStills?: boolean;
  cols?: 2 | 4;
}

export const mediaLayout: Record<string, MediaLayout> = {
  // The stills are only there to feed the hover preview. On the page itself
  // the TikTok cards are the work, so the thumbnails would just repeat them.
  "google-chrome-dyk": { hideStills: true, cols: 4 },
  "google-chrome-organic": { hideStills: true, cols: 4 },
  easyherb: {
    order: "mix",
    trailing: ["/work/easyherb/01.webp", "/work/easyherb/05.webp"],
    cols: 4,
  },
  "sacred-embodiment": {
    trailing: ["/work/sacred-embodiment/01.webp"],
    cols: 4,
  },
  vice: { cols: 4 },
  "coke-cj-henry": { cols: 4 },
  breach: {
    pairs: [["/work/breach/17.webp", "/work/breach/19.webp"]],
  },
  atheory: {
    pairs: [["/work/atheory/06.webp", "/work/atheory/04.webp"]],
  },
  anamorphosis: {
    videoAfter: 3,
  },
};

export function layoutFor(assets: string): MediaLayout {
  return mediaLayout[assets] ?? {};
}
