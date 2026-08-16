"use client";

import FadeIn from "./FadeIn";

interface AboutProps {
  onContactClick: () => void;
}

export default function About({ onContactClick }: AboutProps) {
  return (
    <section id="about" className="relative">
      <div className="relative min-h-[80vh] md:min-h-[90vh] bg-surface overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

        <div className="relative z-10 flex flex-col justify-end min-h-[80vh] md:min-h-[90vh] px-6 md:px-10 pb-12 md:pb-20 pt-24">
          <div className="max-w-[1400px] mx-auto w-full">
            <FadeIn>
              <p className="text-[12px] tracking-[0.08em] uppercase text-white/50 mb-6">
                About
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="text-[clamp(3rem,8vw,7rem)] font-light leading-[0.9] tracking-[-0.03em] text-white mb-8 md:mb-12">
                Leonardo
                <br />
                Pham
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="max-w-[500px]">
                <p className="text-[15px] leading-relaxed text-white/80 mb-4">
                  Design engineer based in Southern California. I help
                  businesses cut through the noise with social media content,
                  high-converting websites, and software that actually works.
                </p>
                <p className="text-[15px] leading-relaxed text-white/60 mb-8">
                  Every project starts with understanding what you need — not
                  what looks good in a portfolio. Clean execution, honest
                  timelines, real results.
                </p>

                <button
                  onClick={onContactClick}
                  className="text-[13px] text-white underline underline-offset-4 hover:opacity-60 transition-opacity"
                >
                  Get in touch →
                </button>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
