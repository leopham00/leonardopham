"use client";

import { motion } from "framer-motion";

interface HeroProps {
  onContactClick: () => void;
}

export default function Hero({ onContactClick }: HeroProps) {
  return (
    <section id="home" className="pt-14">
      {/* Top bar — availability + contact */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex items-start justify-between py-6 border-b border-border">
          <div>
            <p className="text-[12px] font-medium tracking-[0.04em] text-foreground mb-1">
              Availability
            </p>
            <p className="text-[13px] text-muted leading-relaxed">
              Open for projects Q2 2026.{" "}
              <button
                onClick={onContactClick}
                className="text-foreground underline underline-offset-2 hover:opacity-60 transition-opacity"
              >
                Get in touch.
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Hero statement */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-12 md:pt-20 pb-16 md:pb-24">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-[clamp(1.75rem,4.5vw,3.2rem)] font-normal leading-[1.25] tracking-[-0.015em] max-w-[900px] text-foreground"
        >
          Design engineer in Southern California making social media content,
          websites, and software for businesses that want to cut through the
          noise{" "}
          <span className="text-muted">
            [i.e motion graphics, web development, custom apps].
          </span>
        </motion.h1>
      </div>
    </section>
  );
}
