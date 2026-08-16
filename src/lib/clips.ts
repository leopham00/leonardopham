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
