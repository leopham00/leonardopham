import Link from "next/link";
import Gallery from "@/components/Gallery";
import { layoutFor } from "@/lib/clips";
import { orderedMedia } from "@/lib/media-order";
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

  const media = orderedMedia(project);
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
          cols={layout.cols}
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
