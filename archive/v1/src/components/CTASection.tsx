"use client";

import FadeIn from "./FadeIn";

interface CTASectionProps {
  onContactClick: () => void;
}

export default function CTASection({ onContactClick }: CTASectionProps) {
  return (
    <section className="py-16 md:py-24 px-4 text-center">
      <div>
        <FadeIn>
          <h2 className="text-[clamp(2rem,4.5vw,3.2rem)] font-normal leading-[1.2] tracking-[-0.015em] mb-10 md:mb-14">
            Let&apos;s build your
            <br />
            dream project.
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <button
            onClick={onContactClick}
            className="text-[14px] text-foreground underline underline-offset-4 hover:opacity-60 transition-opacity"
          >
            Start a project →
          </button>
        </FadeIn>
      </div>
    </section>
  );
}
