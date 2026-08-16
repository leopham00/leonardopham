"use client";

import FadeIn from "./FadeIn";

type Page = "home" | "content" | "websites" | "apps" | "about";

interface FooterProps {
  onPageChange: (page: Page) => void;
}

export default function Footer({ onPageChange }: FooterProps) {
  const navigateTo = (page: Page) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white text-muted">
      <FadeIn>
      <div className="px-4 pt-5 pb-4 border-t border-border">
        {/* Brand */}
        <div className="mb-4">
          <p className="text-[14px] font-medium tracking-[0.02em] text-foreground mb-2">
            Leonardo Pham
          </p>
          <p className="text-[13px] leading-relaxed max-w-[280px]">
            Social media content, websites, and software for businesses that
            want to stand out.
          </p>
        </div>

        {/* 3-col grid — works on both mobile and desktop */}
        <div className="grid grid-cols-3 gap-6 md:gap-8 mb-4">
          {/* Navigate */}
          <div>
            <p className="text-[10px] md:text-[11px] tracking-[0.1em] uppercase text-muted/40 mb-3 md:mb-4">
              Navigate
            </p>
            <ul className="space-y-2">
              {[
                { label: "Home", page: "home" as Page },
                { label: "Work", page: "content" as Page },
                { label: "About", page: "about" as Page },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => navigateTo(item.page)}
                    className="text-[13px] md:text-[14px] hover:text-foreground transition-colors duration-200"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="text-[10px] md:text-[11px] tracking-[0.1em] uppercase text-muted/40 mb-3 md:mb-4">
              Services
            </p>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigateTo("content")}
                  className="text-[13px] md:text-[14px] hover:text-foreground transition-colors duration-200 text-left"
                >
                  Content
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo("websites")}
                  className="text-[13px] md:text-[14px] hover:text-foreground transition-colors duration-200 text-left"
                >
                  Websites
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo("apps")}
                  className="text-[13px] md:text-[14px] hover:text-foreground transition-colors duration-200 text-left"
                >
                  Apps
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] md:text-[11px] tracking-[0.1em] uppercase text-muted/40 mb-3 md:mb-4">
              Contact
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:leopham00@gmail.com"
                  className="text-[13px] md:text-[14px] hover:text-foreground transition-colors duration-200"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] md:text-[14px] hover:text-foreground transition-colors duration-200"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] md:text-[14px] hover:text-foreground transition-colors duration-200"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-2 pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-1">
          <p className="text-[11px] text-muted/40">
            &copy; {new Date().getFullYear()} Leonardo Pham
          </p>
          <p className="text-[11px] text-muted/40">Southern California</p>
        </div>
      </div>
      </FadeIn>
    </footer>
  );
}
