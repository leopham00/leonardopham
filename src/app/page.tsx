import Link from "next/link";
import WorkIndex from "@/components/WorkIndex";
import { projects, DISCIPLINES, type Discipline } from "@/lib/work";

const KEYS = DISCIPLINES.map((d) => d.key);

function isDiscipline(v: string | undefined): v is Discipline {
  return !!v && (KEYS as string[]).includes(v);
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ c?: string }>;
}) {
  const { c } = await searchParams;
  const filter = isDiscipline(c) ? c : null;

  // One global order; a filter only narrows it.
  const ordered = filter ? projects.filter((p) => p.discipline === filter) : projects;

  return (
    <>
      <div className="px-4 md:px-6 pt-10 md:pt-16 pb-6 md:pb-10">
        <h1 className="text-[clamp(1.75rem,4.2vw,3.25rem)] leading-[1.05] tracking-[-0.025em] max-w-[20ch]">
          Brand identity, motion, and digital design.
        </h1>
        <p className="mt-5 max-w-[52ch] text-[0.95rem] leading-[1.65] text-muted">
          I build identities, motion, and films that bring a brand&apos;s voice to life.
          Previously creative director at BREACH Magazine, lead designer at Atheory, and
          video director at VICE News.
        </p>
      </div>

      <nav
        aria-label="Filter work by discipline"
        className="px-4 md:px-6 pb-5 flex flex-wrap gap-x-5 gap-y-2 border-b border-hairline"
      >
        <Link
          href="/"
          aria-current={!filter ? "true" : undefined}
          className={`meta transition-colors duration-200 ${
            !filter ? "text-ink" : "text-muted hover:text-ink"
          }`}
        >
          All
        </Link>
        {DISCIPLINES.map((d) => (
          <Link
            key={d.key}
            href={`/?c=${d.key}`}
            aria-current={filter === d.key ? "true" : undefined}
            className={`meta transition-colors duration-200 ${
              filter === d.key ? "text-ink" : "text-muted hover:text-ink"
            }`}
          >
            {d.label}
          </Link>
        ))}
      </nav>

      <WorkIndex projects={ordered} />
    </>
  );
}
