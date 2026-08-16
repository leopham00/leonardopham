import type { Metadata } from "next";
import Image from "next/image";
import {
  intro,
  bio,
  experience,
  education,
  skills,
  tools,
  awards,
  contact,
  portrait,
} from "@/lib/about";

export const metadata: Metadata = {
  title: "About",
  description: intro,
};

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-hairline py-8 md:py-10 grid md:grid-cols-[10rem_1fr] gap-4 md:gap-10">
      <h2 className="meta text-muted">{label}</h2>
      <div>{children}</div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="px-4 md:px-6">
      {/* Portrait shares the row with the heading so its top edge lines up. */}
      <div className="grid md:grid-cols-[1fr_20rem] gap-8 md:gap-12 pt-10 md:pt-16 pb-8 md:pb-12 items-start">
        <div>
          <h1 className="text-[clamp(1.5rem,3.4vw,2.75rem)] leading-[1.15] tracking-[-0.02em] max-w-[24ch]">
            {intro}
          </h1>
          <div className="max-w-[62ch] space-y-5 mt-8 md:mt-12">
            {bio.map((p) => (
              <p key={p.slice(0, 32)} className="text-[clamp(0.95rem,1.6vw,1.05rem)] leading-[1.65]">
                {p}
              </p>
            ))}
          </div>
        </div>
        <div className="relative w-full aspect-[3/4] md:aspect-[3/5] bg-[#ebebe8] order-first md:order-last">
          <Image
            src={portrait}
            alt="Leonardo Pham"
            fill
            sizes="(max-width: 767px) 100vw, 20rem"
            className="object-cover object-[center_26%]"
            priority
          />
        </div>
      </div>

      <Section label="Experience">
        <ul>
          {experience.map((r) => (
            /* Fixed tracks: a wider date must never shift the org column. */
            <li
              key={`${r.org}-${r.years}`}
              className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_7rem] items-baseline gap-x-4 gap-y-1 py-2.5 border-b border-hairline last:border-0"
            >
              <span className="text-[0.95rem]">{r.title}</span>
              <span className="text-[0.95rem] text-muted">{r.org}</span>
              <span className="meta text-muted sm:text-right">{r.years}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section label="Education">
        <ul>
          {education.map((s) => (
            <li key={s.name} className="py-2.5 border-b border-hairline last:border-0">
              <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_11rem] items-baseline gap-x-4 gap-y-1">
                <span className="text-[0.95rem]">{s.name}</span>
                <span className="meta text-muted sm:text-right">{s.years}</span>
              </div>
              <p className="text-[0.875rem] text-muted mt-0.5">{s.detail}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section label="Skills">
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {skills.map((s) => (
            <li key={s} className="text-[0.95rem]">
              {s}
            </li>
          ))}
        </ul>
      </Section>

      <Section label="Tools">
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {tools.map((t) => (
            <li key={t} className="text-[0.95rem] text-muted">
              {t}
            </li>
          ))}
        </ul>
      </Section>

      <Section label="Awards">
        <ul>
          {awards.map((a) => (
            <li key={a} className="text-[0.95rem]">
              {a}
            </li>
          ))}
        </ul>
      </Section>

      <Section label="Contact">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a
            href={`mailto:${contact.email}`}
            className="text-[0.95rem] border-b border-ink pb-0.5 hover:text-muted hover:border-muted transition-colors duration-200"
          >
            {contact.email}
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.95rem] border-b border-ink pb-0.5 hover:text-muted hover:border-muted transition-colors duration-200"
          >
            LinkedIn ↗
          </a>
        </div>
      </Section>
    </div>
  );
}
