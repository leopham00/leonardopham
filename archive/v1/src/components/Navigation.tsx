"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Page = "home" | "content" | "websites" | "apps" | "about";

interface NavigationProps {
  activePage: Page;
  onPageChange: (page: Page) => void;
  onContactClick: () => void;
}

const pages: { key: Page; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "content", label: "Content" },
  { key: "websites", label: "Websites" },
  { key: "apps", label: "Apps" },
  { key: "about", label: "About" },
];

export default function Navigation({
  activePage,
  onPageChange,
  onContactClick,
}: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      {/* Desktop: single row */}
      <div className="hidden md:flex px-4 items-center justify-between h-14 border-b border-border">
        <button
          onClick={() => onPageChange("home")}
          className="text-[14px] font-medium tracking-[0.01em] text-foreground"
        >
          Leonardo Pham
        </button>

        <div className="flex items-center gap-5">
          {pages.map((page, i) => (
            <motion.button
              key={page.key}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              onClick={() => onPageChange(page.key)}
              className={`relative text-[13px] pb-[18px] -mb-[18px] transition-colors duration-200 ${
                activePage === page.key
                  ? "text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {page.label}
              {activePage === page.key && (
                <motion.div
                  layoutId="navUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-foreground"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        <button
          onClick={onContactClick}
          className="text-[13px] font-medium text-white bg-foreground px-4 py-1.5 rounded-full hover:opacity-80 transition-opacity duration-200"
        >
          Reach out
        </button>
      </div>

      {/* Mobile: two rows */}
      <div className="md:hidden border-b border-border">
        {/* Row 1: Wordmark left, icons right */}
        <div className="px-4 flex items-center justify-between h-11">
          <button
            onClick={() => onPageChange("home")}
            className="text-[14px] font-medium tracking-[0.01em] text-foreground"
          >
            Leonardo Pham
          </button>
          <button
            onClick={onContactClick}
            className="text-[12px] font-medium text-white bg-foreground px-3 py-1 rounded-full hover:opacity-80 transition-opacity duration-200"
          >
            Reach out
          </button>
        </div>

        {/* Row 2: Nav buttons */}
        <div className="px-4 flex items-center justify-between h-10">
          {pages.map((page, i) => (
            <motion.button
              key={page.key}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              onClick={() => onPageChange(page.key)}
              className={`relative text-[12px] whitespace-nowrap pb-[10px] -mb-[10px] transition-colors duration-200 ${
                activePage === page.key
                  ? "text-foreground"
                  : "text-muted"
              }`}
            >
              {page.label}
              {activePage === page.key && (
                <motion.div
                  layoutId="navUnderlineMobile"
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-foreground"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </nav>
  );
}
