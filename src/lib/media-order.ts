import type { Img, Vid } from "./images.generated";
import { layoutFor } from "./clips";
import { gallery, videos, hero, type Project } from "./work";

export type Item = ({ kind: "img" } & Img) | ({ kind: "video" } & Vid);

/**
 * The order media appears on a project page.
 *
 * Shared so the hover preview on the index can cycle a project's stills in the
 * same sequence the project page shows them. Keeping two copies of this drifts
 * the moment either is touched.
 */
export function orderedMedia(project: Project): Item[] {
  const clips = videos(project);
  const shots = gallery(project);
  const layout = layoutFor(project.assets);

  if (layout.hideStills) return clips.map((v) => ({ kind: "video", ...v }));

  const h = hero(project);
  const vertical = !!h && h.w / h.h < 1;
  const videoWidth = clips.length === 1 && !vertical ? 2 : 1;

  const trailing = new Set(layout.trailing ?? []);
  const imgs: Item[] = shots
    .filter((s) => !trailing.has(s.src))
    .map((s) => ({ kind: "img", ...s }));
  const tail: Item[] = shots
    .filter((s) => trailing.has(s.src))
    .map((s) => ({ kind: "img", ...s }));
  const vids: Item[] = clips.map((v) => ({ kind: "video", ...v }));

  let seq: Item[];
  if (!imgs.length) seq = vids;
  else if (!vids.length) seq = imgs;
  else if (layout.videoAfter !== undefined) {
    seq = [...imgs.slice(0, layout.videoAfter), ...vids, ...imgs.slice(layout.videoAfter)];
  } else if (layout.order === "mix") {
    // 1, 1, 2, 2 rhythm rather than a flat alternation
    const pattern: ["v" | "i", number][] = [
      ["v", 1],
      ["i", 1],
      ["v", 2],
      ["i", 2],
    ];
    const out: Item[] = [];
    let vi = 0;
    let ii = 0;
    let p = 0;
    while (vi < vids.length || ii < imgs.length) {
      const [which, n] = pattern[p++ % pattern.length];
      for (let k = 0; k < n; k++) {
        if (which === "v" && vi < vids.length) out.push(vids[vi++]);
        if (which === "i" && ii < imgs.length) out.push(imgs[ii++]);
      }
    }
    seq = out;
  } else {
    const out: Item[] = [];
    let vi = 0;
    const every = Math.max(1, Math.floor(imgs.length / vids.length));
    imgs.forEach((img, i) => {
      out.push(img);
      if (vi < vids.length && (i + 1) % every === 0) out.push(vids[vi++]);
    });
    while (vi < vids.length) out.push(vids[vi++]);
    seq = out;
  }

  const width = (it: Item) =>
    it.kind === "video" ? videoWidth : it.w / it.h > 1.3 ? 2 : 1;

  /* Group requested pairs into one atom so they share a row. */
  type Atom = { items: Item[]; width: number };
  const pairMap = new Map((layout.pairs ?? []).map(([a, b]) => [a, b]));
  const partners = new Set((layout.pairs ?? []).map(([, b]) => b));
  const atoms: Atom[] = [];
  const pending = seq.filter((it) => !(it.kind === "img" && partners.has(it.src)));
  for (const it of pending) {
    const mate = it.kind === "img" ? pairMap.get(it.src) : undefined;
    const other = mate ? seq.find((x) => x.kind === "img" && x.src === mate) : undefined;
    if (other) atoms.push({ items: [it, other], width: 2 });
    else atoms.push({ items: [it], width: width(it) });
  }

  /* A two wide atom landing mid row pulls the next single forward to close the
     gap. Only a genuine shortage at the end leaves a column empty. */
  const packed: Item[] = [];
  const queue = [...atoms];
  let col = 0;
  while (queue.length) {
    const atom = queue.shift()!;
    if (atom.width === 2 && col === 1) {
      const fill = queue.findIndex((a) => a.width === 1);
      if (fill >= 0) {
        packed.push(...queue.splice(fill, 1)[0].items);
        col = 0;
      }
    }
    packed.push(...atom.items);
    col = atom.width === 2 ? 0 : (col + 1) % 2;
  }
  return [...packed, ...tail];
}

/**
 * The stills a project shows, in page order, for the index hover preview.
 * Falls back to the raw gallery for projects whose page is videos only.
 */
export function previewReel(project: Project): Img[] {
  const inPageOrder = orderedMedia(project)
    .filter((i): i is { kind: "img" } & Img => i.kind === "img")
    .map(({ ...img }) => img as Img);

  const source = inPageOrder.length ? inPageOrder : gallery(project);
  const h = hero(project);
  const seen = new Set<string>();
  const out: Img[] = [];
  for (const img of source.length ? source : h ? [h] : []) {
    if (seen.has(img.src)) continue;
    seen.add(img.src);
    out.push(img);
  }
  return out;
}
