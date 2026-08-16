/**
 * Bounds for the hover preview on the work index and for gallery images.
 * Every image scales up or down to meet whichever bound it hits first,
 * preserving aspect ratio and never exceeding either.
 *
 * These seed the --preview-max-w / --preview-max-h CSS variables. The dev
 * overlay tunes those live; paste the saved numbers back here to commit them.
 */
export const PREVIEW_MAX_W = 700;
export const PREVIEW_MAX_H = 700;
