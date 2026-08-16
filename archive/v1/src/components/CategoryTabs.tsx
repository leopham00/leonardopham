"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Category = "content" | "websites" | "apps";

const categories: { key: Category; label: string }[] = [
  { key: "content", label: "Content" },
  { key: "websites", label: "Websites" },
  { key: "apps", label: "Apps" },
];

interface Project {
  title: string;
  description: string;
  tier: string;
  price: string;
  popular?: boolean;
  features: string[];
  turnaround: string;
  revisions: string;
}

const projects: Record<Category, Project[]> = {
  content: [
    {
      title: "Entry",
      description: "Quick-turn motion for social",
      tier: "entry",
      price: "$500",
      features: [
        "1–2 videos, 15–30 seconds each",
        "Reels / Stories / TikTok format",
        "Client provides all assets & brand kit",
        "Motion composition only",
      ],
      turnaround: "3–5 days",
      revisions: "1 round",
    },
    {
      title: "Standard",
      description: "Multi-platform content package",
      tier: "standard",
      price: "$1,000",
      popular: true,
      features: [
        "3–5 videos, up to 60 seconds",
        "Multi-platform (IG, LinkedIn, TikTok)",
        "Stock footage, SFX & music sourcing",
        "Motion design + text animation",
      ],
      turnaround: "7–10 days",
      revisions: "2 rounds",
    },
    {
      title: "Premium",
      description: "Full campaign production",
      tier: "premium",
      price: "$2,000",
      features: [
        "5–8 videos or full campaign package",
        "All aspect ratios + caption versions",
        "Full asset sourcing (footage, SFX, VO)",
        "Advanced motion + brand system",
      ],
      turnaround: "10–14 days",
      revisions: "3 rounds + priority",
    },
  ],
  websites: [
    {
      title: "Starter",
      description: "Single-page presence",
      tier: "starter",
      price: "$500",
      features: [
        "Single-page website",
        "Mobile responsive design",
        "Contact form integration",
        "SEO basics configured",
      ],
      turnaround: "2 weeks",
      revisions: "1 round",
    },
    {
      title: "Growth",
      description: "Multi-page with CMS",
      tier: "growth",
      price: "$1,000",
      popular: true,
      features: [
        "Multi-page website (up to 5 pages)",
        "CMS integration",
        "Analytics setup",
        "Performance optimization",
      ],
      turnaround: "3–4 weeks",
      revisions: "2 rounds",
    },
    {
      title: "Custom",
      description: "Full custom build",
      tier: "custom",
      price: "$2,000",
      features: [
        "Full custom design & development",
        "E-commerce or SaaS features",
        "API integrations",
        "Advanced animations & interactions",
      ],
      turnaround: "6–8 weeks",
      revisions: "3 rounds + priority",
    },
  ],
  apps: [],
};

interface CategoryTabsProps {
  onContactClick: (subject?: string) => void;
}

export default function CategoryTabs({ onContactClick }: CategoryTabsProps) {
  const [active, setActive] = useState<Category>("content");
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  return (
    <section id="work">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Tab switcher — id-c.se style */}
        <div className="flex items-center gap-6 md:gap-8 pb-8 border-b border-border">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                setActive(cat.key);
                setExpandedProject(null);
              }}
              className={`text-[14px] md:text-[15px] transition-colors duration-200 ${
                active === cat.key
                  ? "text-foreground font-medium"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery content */}
        <AnimatePresence mode="wait">
          {active === "apps" ? (
            <motion.div
              key="apps"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="py-20 md:py-32 text-center"
            >
              <p className="text-[clamp(2rem,4vw,3rem)] font-normal tracking-[-0.02em] mb-4">
                Starting at $5,000
              </p>
              <p className="text-[15px] text-muted max-w-[440px] mx-auto leading-relaxed mb-10">
                Every app is different. Native iOS, Android, or cross-platform —
                I build what your business actually needs.
              </p>
              <button
                onClick={() => onContactClick("App Development Inquiry")}
                className="text-[14px] text-foreground underline underline-offset-4 hover:opacity-60 transition-opacity"
              >
                Let&apos;s talk scope →
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Project cards — id-c.se grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 pt-10 md:pt-14 pb-16 md:pb-24">
                {projects[active].map((project) => {
                  const isExpanded = expandedProject === project.tier;
                  const subjectLine = `${active === "content" ? "Content" : "Website"} — ${project.title} (${project.price})`;

                  return (
                    <div key={project.tier} className="group">
                      {/* Image card — floating with shadow */}
                      <button
                        onClick={() =>
                          setExpandedProject(isExpanded ? null : project.tier)
                        }
                        className="w-full text-left"
                      >
                        <div className="relative aspect-[4/3] bg-surface rounded-sm overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow duration-300">
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5" />
                          {/* Placeholder label */}
                          <div className="absolute bottom-4 left-4 text-[11px] tracking-[0.06em] uppercase text-muted/50">
                            {active === "content" ? "Video" : "Site"} example
                          </div>
                          {project.popular && (
                            <div className="absolute top-4 right-4 text-[10px] tracking-[0.1em] uppercase px-2.5 py-1 bg-foreground text-white rounded-sm">
                              Popular
                            </div>
                          )}
                        </div>

                        {/* Title + description below card */}
                        <div className="mt-4">
                          <h3 className="text-[15px] font-medium text-foreground mb-0.5">
                            {project.title}
                            <span className="ml-2 font-normal text-muted">
                              {project.price}
                            </span>
                          </h3>
                          <p className="text-[13px] text-muted">
                            {project.description}
                          </p>
                        </div>
                      </button>

                      {/* Expanded detail — case study style */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="pt-6 pb-2">
                              <ul className="space-y-1.5 mb-5">
                                {project.features.map((f) => (
                                  <li
                                    key={f}
                                    className="text-[13px] text-muted leading-relaxed flex items-start gap-2"
                                  >
                                    <span className="text-foreground/30 mt-0.5 text-[6px]">
                                      ●
                                    </span>
                                    {f}
                                  </li>
                                ))}
                              </ul>

                              <div className="flex gap-4 mb-5 text-[12px] text-muted">
                                <span>{project.turnaround}</span>
                                <span className="text-border">·</span>
                                <span>{project.revisions}</span>
                              </div>

                              <button
                                onClick={() => onContactClick(subjectLine)}
                                className="text-[13px] text-foreground underline underline-offset-4 hover:opacity-60 transition-opacity"
                              >
                                Get started →
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
