"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import HeroGallery from "@/components/HeroGallery";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";

type Page = "home" | "content" | "websites" | "apps" | "about";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSubject, setModalSubject] = useState("");
  const [activePage, setActivePage] = useState<Page>("home");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const handlePageChange = useCallback((page: Page) => {
    window.scrollTo({ top: 0, behavior: "instant" });
    if (page === activePage) return;
    setActivePage(page);
  }, [activePage]);

  const openContact = useCallback((subject?: string) => {
    setModalSubject(subject ?? "Start a Project");
    setModalOpen(true);
  }, []);

  return (
    <AnimatePresence>
        {ready && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              <Navigation
                activePage={activePage}
                onPageChange={handlePageChange}
                onContactClick={() => openContact("Reaching Out")}
              />
            </motion.div>

            <main>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <HeroGallery activePage={activePage} onContactClick={openContact} onPageChange={handlePageChange} />
              </motion.div>

              {(activePage === "home" || activePage === "about") && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <CTASection onContactClick={() => openContact("Start a Project")} />
                </motion.div>
              )}
            </main>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Footer onPageChange={handlePageChange} />
            </motion.div>

            <ContactModal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              prefillSubject={modalSubject}
            />
          </motion.div>
        )}
    </AnimatePresence>
  );
}
