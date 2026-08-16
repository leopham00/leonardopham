"use client";

const clients = [
  "Vice",
  "Vitamin Water",
  "Mediabrands",
  "BREACH",
  "Google",
  "Atheory",
  "1000heads",
  "Coca Cola",
  "Sprite",
  "Tylenol",
  "Newtrend Society",
];

export default function ClientMarquee() {
  return (
    <section className="py-4 md:py-5 border-b border-border overflow-hidden">
      <p className="text-[11px] tracking-[0.14em] uppercase text-muted text-center mb-4">
        Trusted by
      </p>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-white to-transparent z-10" />
        <div className="animate-marquee flex items-center whitespace-nowrap">
          {[...clients, ...clients].map((client, i) => (
            <span
              key={`${client}-${i}`}
              className="inline-flex items-center mx-8 md:mx-12 text-[14px] md:text-[15px] font-medium tracking-[0.04em] text-muted/60 uppercase"
            >
              {client}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
