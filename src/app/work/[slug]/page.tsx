import Link from "next/link";
import Gallery, { type Item } from "@/components/Gallery";
import { layoutFor } from "@/lib/clips";
import NextImage from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  projects,
  getProject,
  DISCIPLINES,
  gallery,
  videos,
  hero,
  type Project,
} from "@/lib/work";

const ordered = projects;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.body.slice(0, 160) };
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="meta text-muted mb-1">{label}</dt>
      <dd className="text-[0.95rem] leading-snug">{value}</dd>
    </div>
  );
}

/** Renders the body copy, hyperlinking collaborator and client names. */
function Body({ project }: { project: Project }) {
  const links = project.bodyLinks ?? [];
  if (!links.length) return <>{project.body}</>;

  const pattern = new RegExp(
    `(${links.map((l) => l.text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
  );
  return (
    <>
      {project.body.split(pattern).map((part, i) => {
        const link = links.find((l) => l.text === part);
        return link ? (
          <a
            key={i}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-ink pb-0.5 hover:text-muted hover:border-muted transition-colors duration-200"
          >
            {part}
          </a>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const i = ordered.findIndex((p) => p.slug === slug);
  const prev = i > 0 ? ordered[i - 1] : null;
  const next = i < ordered.length - 1 ? ordered[i + 1] : null;
  const clips = videos(project);
  const shots = gallery(project);
  const layout = layoutFor(project.assets);
  // Vertical work keeps a vertical tile; the hero shares the video's shape.
  const h = hero(project);
  const vertical = !!h && h.w / h.h < 1;
  const videoAspect = vertical ? "9 / 16" : "16 / 9";
  // One video per column. A lone video takes the full row, except when it is
  // vertical, where full width would make it absurdly tall.
  const videoSpan = clips.length === 1 && !vertical ? "full" : "half";

  /* Order the media, then pack it so a full width item never leaves a column
     empty behind it. Screenshots stay pinned to the end. */
  const media: Item[] = (() => {
    if (layout.hideStills) return clips.map((v) => ({ kind: "video", ...v }));
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
      it.kind === "video" ? (videoSpan === "full" ? 2 : 1) : it.w / it.h > 1.3 ? 2 : 1;

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

    /* A two wide atom landing mid row pulls the next single forward to close
       the gap. Only a genuine shortage at the end leaves a column empty. */
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
  })();
  // Web projects have no gallery of their own; their hero is the screenshot,
  // and it doubles as a link to the live site.
  const siteShot = shots.length === 0 && project.link ? hero(project) : null;
  // Independent Projects is a reel: clips autoplay muted and link out.
  const autoplay = project.galleryOnly;

  return (
    <article>
      <div className="px-4 md:px-6 pt-6 md:pt-10 pb-8 md:pb-12 border-b border-hairline">
        {/* An explicit way home: history alone fails when someone lands here
            from a shared link with nothing to go back to. */}
        <Link
          href="/"
          className="meta text-muted hover:text-ink transition-colors duration-200 inline-block mb-8 md:mb-12"
        >
          ← All work
        </Link>
        <h1 className="text-[clamp(2rem,5.5vw,4.25rem)] leading-[0.98] tracking-[-0.03em] mb-8 md:mb-12">
          {project.title}
        </h1>
        <dl className="flex flex-wrap gap-x-10 gap-y-6">
          <Field label="Client" value={project.client} />
          {project.agency && <Field label="Agency" value={project.agency} />}
          <Field label="Role" value={project.role} />
          {project.industry && <Field label="Industry" value={project.industry} />}
          <Field
            label="Discipline"
            value={DISCIPLINES.find((d) => d.key === project.discipline)?.label ?? ""}
          />
        </dl>
      </div>

      <div className="px-4 md:px-6 py-8 md:py-12">
        <p className="max-w-[62ch] text-[clamp(0.95rem,1.6vw,1.15rem)] leading-[1.6]">
          <Body project={project} />
        </p>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="meta inline-block mt-8 border-b border-ink pb-0.5 hover:text-muted hover:border-muted transition-colors duration-200"
          >
            Visit site ↗
          </a>
        )}
      </div>

      {media.length > 0 && (
        <Gallery
          items={media}
          autoplay={autoplay}
          videoSpan={videoSpan}
          videoAspect={videoAspect}
        />
      )}

      {siteShot && (
        /* Sits in the grid like everything else, never centred on its own. */
        <div className="px-4 md:px-6 pb-8 md:pb-16 grid gap-4 md:gap-6 md:grid-cols-2 items-start">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${project.title}`}
            className="block group"
          >
            <NextImage
              src={siteShot.src}
              alt=""
              width={siteShot.w}
              height={siteShot.h}
              sizes="(max-width: 767px) 100vw, 46vw"
              className="w-full h-auto bg-[#ebebe8] transition-opacity duration-200 group-hover:opacity-90"
            />
          </a>
        </div>
      )}

      <nav
        className="border-t border-b border-hairline flex"
        aria-label="Project navigation"
      >
        {prev ? (
          <Link
            href={`/work/${prev.slug}`}
            className="flex-1 px-4 md:px-6 py-5 border-r border-hairline hover:bg-[#f2f2ef] transition-colors duration-200"
          >
            <span className="meta text-muted block mb-1">Previous</span>
            <span className="text-[0.95rem]">{prev.title}</span>
          </Link>
        ) : (
          <span className="flex-1 border-r border-hairline" />
        )}
        {next ? (
          <Link
            href={`/work/${next.slug}`}
            className="flex-1 px-4 md:px-6 py-5 text-right hover:bg-[#f2f2ef] transition-colors duration-200"
          >
            <span className="meta text-muted block mb-1">Next</span>
            <span className="text-[0.95rem]">{next.title}</span>
          </Link>
        ) : (
          <span className="flex-1" />
        )}
      </nav>
    </article>
  );
}
