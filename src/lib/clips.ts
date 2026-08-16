/**
 * Short muted loops used as the hover preview for video projects.
 *
 * YouTube and Vimeo embeds cannot start instantly: the iframe has to boot a
 * player, negotiate, and buffer, which is a second or two of black. A local
 * clip preloaded in the background starts on the same frame as the hover.
 *
 * Export spec per clip:
 *   4 to 8 seconds, muted, no audio track at all
 *   720p on the long edge, H.264 MP4
 *   target under 1.5 MB so the whole set preloads quietly
 *   name it preview.mp4 and drop it in public/work/<key>/
 *
 * Key is the project's `assets` value from work.ts. Uncomment as clips land;
 * any project without one falls back to its still image reel.
 */
export const clips: Record<string, string> = {
  // "mbcs": "/work/mbcs/preview.mp4",
  // "vice": "/work/vice/preview.mp4",
  // "motion-reel": "/work/motion-reel/preview.mp4",
  // "sprite": "/work/sprite/preview.mp4",
  // "easyherb": "/work/easyherb/preview.mp4",
  // "coke-togetherness": "/work/coke-togetherness/preview.mp4",
  // "coke-cj-henry": "/work/coke-cj-henry/preview.mp4",
  // "vitaminwater": "/work/vitaminwater/preview.mp4",
  // "sacred-embodiment": "/work/sacred-embodiment/preview.mp4",
  // "independent": "/work/independent/preview.mp4",
  // "anamorphosis": "/work/anamorphosis/preview.mp4",
};

export function clipFor(assets: string): string | undefined {
  return clips[assets];
}
