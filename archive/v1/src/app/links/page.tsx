"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ContactModal from "@/components/ContactModal";

interface LinkCard {
  id: string;
  title: string;
  href: string;
  image?: string;
  contain?: boolean;
  icon?: React.ReactNode;
  bg?: string;
}

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" className="w-14 h-14">
    <path d="M16.6 5.82A4.28 4.28 0 0 1 13.4 3h-3v12.4a2.59 2.59 0 0 1-2.6 2.6 2.59 2.59 0 0 1-2.6-2.6A2.59 2.59 0 0 1 7.8 12.8c.28 0 .56.05.82.13V9.8A5.72 5.72 0 0 0 2 15.4a5.72 5.72 0 0 0 5.8 5.6 5.72 5.72 0 0 0 5.8-5.6V9.56a7.37 7.37 0 0 0 4.4 1.44V7.82a4.28 4.28 0 0 1-1.4-2Z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-14 h-14">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1.5" fill="white" stroke="none" />
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" className="w-14 h-14">
    <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81Z" />
    <path d="m9.75 15.02 6.25-3.02-6.25-3.02v6.04Z" fill="#0a0a0a" />
  </svg>
);

const links: LinkCard[] = [
  {
    id: "instagram",
    title: "Instagram",
    href: "https://www.instagram.com/leopham2026/",
    icon: <InstagramIcon />,
    bg: "linear-gradient(135deg, #833AB4, #E1306C, #F77737)",
  },
  {
    id: "tiktok",
    title: "TikTok",
    href: "https://www.tiktok.com/@leopham2026",
    icon: <TikTokIcon />,
    bg: "#000000",
  },
  {
    id: "youtube",
    title: "YouTube",
    href: "https://www.youtube.com/@leonardopham00",
    icon: <YouTubeIcon />,
    bg: "#FF0000",
  },
  {
    id: "tabli",
    title: "Tabli",
    href: "https://apps.apple.com/us/app/tabli-split-bills-receipts/id6760800516",
    image: "/projects/tabli-icon.png",
    contain: true,
  },
  {
    id: "sillwriting",
    title: "Sill Writing",
    href: "https://sillwriting.vercel.app",
    image: "/projects/sillwriting-preview.png",
    contain: true,
  },
];

export default function LinksPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const openContact = useCallback(() => {
    setModalOpen(true);
  }, []);

  const stagger = (index: number) => index * 0.07;

  return (
    <AnimatePresence>
      {ready && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header — wordmark + reach out, no nav tabs */}
          <nav className="fixed top-0 left-0 right-0 z-50 bg-white">
            {/* Desktop */}
            <div className="hidden md:flex px-4 items-center justify-between h-14 border-b border-border">
              <span className="text-[14px] font-medium tracking-[0.01em] text-foreground">
                Leonardo Pham
              </span>
              <button
                onClick={openContact}
                className="text-[13px] font-medium text-white bg-foreground px-4 py-1.5 rounded-full hover:opacity-80 transition-opacity duration-200"
              >
                Reach out
              </button>
            </div>

            {/* Mobile */}
            <div className="md:hidden border-b border-border">
              <div className="px-4 flex items-center justify-between h-11">
                <span className="text-[14px] font-medium tracking-[0.01em] text-foreground">
                  Leonardo Pham
                </span>
                <button
                  onClick={openContact}
                  className="text-[12px] font-medium text-white bg-foreground px-3 py-1 rounded-full hover:opacity-80 transition-opacity duration-200"
                >
                  Reach out
                </button>
              </div>
            </div>
          </nav>

          {/* Card grid */}
          <main className="pt-14 md:pt-14">
            <div className="px-4 py-4">
              <div className="grid grid-cols-3 gap-4">
                {links.map((link, i) => (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: stagger(i),
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  >
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group text-left w-full block"
                    >
                      <div className="relative aspect-square bg-[#f0f0f0] rounded-lg overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.12)] group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)] group-hover:-translate-y-1 transition-all duration-300 ease-out">
                        {link.icon ? (
                          <div
                            className="absolute inset-0 flex items-center justify-center"
                            style={{ background: link.bg || "#0a0a0a" }}
                          >
                            {link.icon}
                          </div>
                        ) : (
                          <div
                            className="absolute inset-0 bg-no-repeat"
                            style={{
                              backgroundImage: `url('${link.image}')`,
                              backgroundSize: link.contain
                                ? "contain"
                                : "cover",
                              backgroundPosition: "center",
                              backgroundColor: link.contain
                                ? "white"
                                : undefined,
                            }}
                          />
                        )}

                        {/* Gradient + hover only on image cards */}
                        {!link.icon && (
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        )}
                        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
                      </div>
                      <p className="mt-2 text-[12px] font-medium text-foreground">
                        {link.title}
                      </p>
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          </main>

          <ContactModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            prefillSubject="found you on socials!"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
