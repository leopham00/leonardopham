"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ClientMarquee from "./ClientMarquee";

type Page = "home" | "content" | "websites" | "apps" | "about";

interface Project {
  id: string;
  title: string;
  description: string;
  type: "video" | "website" | "app";
  link?: string;
  videoId?: string;
  image: string;
  heroImage?: string;
  details: string[];
  extraVideos?: string[];
  contain?: boolean;
  containBg?: string;
  bgPos?: string;
  bgSize?: string;
}

const contentProjects: Project[] = [
  { id: "c1", title: "Motion Graphics Reel", description: "2024 motion graphics showreel", type: "video", videoId: "K0roS-q_vR4", image: "/projects/mograph-thumb.jpg", details: ["Compilation reel showcasing kinetic typography, brand animations, and motion design", "Features work across multiple clients and platforms"] },
  { id: "c2", title: "MBCS Outreach", description: "Multi-video outreach campaign for MBCS", type: "video", videoId: "Ail7YEz__4M", image: "/projects/mbcs-thumb.jpg", extraVideos: ["1cmrdWIwhgs", "4pwxmD_6ROU", "3CkU_ULq5Xc"], details: ["4-part video series across YouTube and Instagram Shorts for community outreach", "Mix of long-form content and vertical Shorts for multi-platform distribution"] },
  { id: "c3", title: "Sprite x UPROXX", description: "Concept video pitched at Mediabrands Content Studio", type: "video", videoId: "tE9PJ_nkhvk", image: "/projects/sprite-thumb.jpg", details: ["Concept video pitched at Mediabrands Content Studio under McCann Worldgroup for Sprite x UPROXX", "On-location direction with talent, styled shoots, and full post-production"] },
  { id: "c4", title: "Sacred Embodiment", description: "Instagram ad campaign for wellness brand", type: "video", videoId: "uRoR99UJmx4", image: "/projects/sacred-thumb.jpg", extraVideos: ["-KHqQ14M0zc", "0-Le2jUDjlE"], details: ["Series of Instagram ads for Sacred Embodiment wellness brand", "Visually-driven ad creatives designed for conversion on Instagram feed and Stories"] },
  { id: "c5", title: "Vice Reel", description: "Motion graphics for Vice media TikTok campaign", type: "video", videoId: "BTXRNMnvGLE", image: "/projects/vice-thumb.jpg", details: ["Drug Moments TikTok campaign with kinetic typography and brand-matched color grading", "Motion graphics + text animation delivered for TikTok and social platforms"] },
  { id: "c6", title: "EasyHerb NYC", description: "Social content for NYC herbal brand", type: "video", videoId: "zQ4Le_cCUzE", image: "/projects/easyherb-logo.png", contain: true, extraVideos: ["C_xi36p9RSQ", "rCkgiSjDxD8", "SQ2NMuv97UI", "74yp7OCxnjo", "_5xRiHfdzoA", "mQMS04BEqNo"], details: ["Multi-format social content including Reels, product showcases, and lifestyle shoots", "Full production from concept to delivery for Instagram and TikTok"] },
];

const appProjects: Project[] = [
  { id: "a1", title: "CruLink", description: "B2B platform connecting fabricators with customers", type: "app", link: "https://crulink.com/", image: "/projects/crulink-logo.png", heroImage: "/projects/crulink.png", contain: true, details: ["Full-stack platform on Next.js and Supabase with Stripe Connect for split payments", "Real-time messaging, order tracking, and multi-tenant architecture for fabrication businesses"] },
  { id: "a2", title: "Tabli", description: "Split bills and receipts with friends", type: "app", link: "https://apps.apple.com/us/app/tabli-split-bills-receipts/id6760800516", image: "/projects/tabli-icon.png", details: ["React Native and Expo app for splitting bills, scanning receipts, and tracking group expenses", "QR code sharing, itemized splits, and real-time sync across devices"] },
  { id: "a3", title: "4:5", description: "Reframe horizontal video for vertical-first platforms", type: "app", link: "https://apps.apple.com/us/app/4-5-video-reframer/id6762262950", image: "/projects/fourfive-icon.png", contain: true, details: ["iOS app for reframing 16:9 footage to 4:5 and 9:16 with keyframed subject tracking", "Built in SwiftUI with a minimal scrubber-first UI — pick your subject, pick your crops, export"] },
  { id: "a4", title: "Sill Writing", description: "Ambient writing app exploring life through themed prompts", type: "app", image: "/projects/sillwriting-preview.png", contain: true, details: ["Minimalist writing experience with ambient soundscapes and curated prompts across themes like Life, Death, Relationships, Purpose, and Joy", "Designed for introspective journaling with a distraction-free interface and atmospheric audio by PatrickLieberkind"] },
];

const websiteProjects: Project[] = [
  { id: "w1", title: "Browning's Welding", description: "Commercial fabrication site with quote request system", type: "website", link: "https://www.browningswelding.com/", image: "/projects/brownings-preview.png", heroImage: "/projects/brownings.png", details: ["Full-bleed hero with brand-forward design for a family-owned welding and fabrication business", "Mobile-optimized with quote request flow and service showcase"] },
  { id: "w2", title: "Spandrel Studio", description: "Custom fabrication business site with quote system", type: "website", link: "https://spandrel-site-v0.vercel.app/", image: "/projects/spandrel.png", heroImage: "/projects/spandrel.png", bgPos: "left top", details: ["Next.js and Tailwind site with a custom multi-step quote builder for fabrication projects", "CMS-powered content management with real-time quote notifications and admin dashboard"] },
  { id: "w3", title: "B&L Site Demos", description: "Multi-variant website demo with live customizer", type: "website", link: "https://bnlsitedemos.vercel.app/", image: "/projects/bnlsitedemos.png", heroImage: "/projects/bnlsitedemos.png", details: ["Three-variant editorial demo (Editorial, Atelier, Concierge) with a live customizer that swaps layout, profession, and palette in real time across five business types", "Custom slide-in panel built with the Web Animations API, per-profession content system, and mobile-first responsive design"] },
  { id: "w4", title: "Monolith", description: "Experimental design system test site", type: "website", link: "https://monolithnewsystemdesigntest.vercel.app/", image: "/projects/monolith.png", heroImage: "/projects/monolith.png", details: ["Experimental test environment for a new design system exploring generative visuals and layout patterns", "Built as a proof-of-concept for visual identity exploration with procedural graphics"] },
  { id: "w5", title: "ADDVO", description: "Swedish IT consultancy with talent matching platform", type: "website", link: "https://www.addvo.se/", image: "/projects/addvo.png", heroImage: "/projects/addvo.png", bgPos: "center", details: ["Modern consultancy site with cinematic hero, service breakdowns, and contact flow", "Built for conversion with clear CTAs and premium visual design"] },
  { id: "w6", title: "Leonardo Pham", description: "Freelance portfolio with tab-based navigation", type: "website", link: "https://leonardopham.vercel.app/", image: "/projects/leonardopham.png", heroImage: "/projects/leonardopham.png", bgPos: "left top", details: ["Single-page portfolio built with Next.js, Tailwind CSS, and Framer Motion", "Tab-based navigation with cascading animations, project modals, and embedded video showreel"] },
];

interface HeroGalleryProps {
  activePage: Page;
  onContactClick: (subject?: string) => void;
  onPageChange: (page: Page) => void;
  onVideoReady?: () => void;
}

export default function HeroGallery({ activePage, onContactClick, onPageChange, onVideoReady }: HeroGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const stagger = (index: number) => index * 0.07;

  return (
    <section id="home" className="pt-[84px] md:pt-14">
      <div className="px-4">
        {/* Page content */}
        <AnimatePresence mode="wait">
          {/* ── Home: hero video ── */}
          {activePage === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="pt-4 pb-0"
            >
              <div className="relative w-full aspect-[4/3] md:aspect-[2.2/1] bg-[#f0f0f0] rounded-lg overflow-hidden">
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <iframe
                    src="https://www.youtube.com/embed/K0roS-q_vR4?autoplay=1&mute=1&loop=1&playlist=K0roS-q_vR4&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&start=2&end=49"
                    className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto aspect-video"
                    style={{ border: "none", transform: "translate(-50%, -50%)" }}
                    allow="autoplay; encrypted-media"
                    title="Showreel"
                    onLoad={() => onVideoReady?.()}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 pointer-events-none">
                  <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-medium leading-[1.1] tracking-[-0.02em] text-white">
                    I make brands move,
                    <br />
                    <span className="font-bold">websites convert,</span>
                    <br />
                    and apps work.
                  </h2>
                </div>
              </div>

              <ClientMarquee />

              {/* ── Featured Section: 2x2 quadrants ── */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {/* Content quadrant */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.35 }}
                    className="mb-4"
                  >
                    <button onClick={() => onPageChange("content")} className="flex items-end gap-3 text-foreground hover:text-foreground/60 hover:-translate-y-0.5 transition-all duration-300">
                      <h3 className="text-[clamp(2rem,5vw,4rem)] font-medium tracking-[-0.03em] leading-[0.95]">Content</h3>
                      <span className="text-[clamp(0.67rem,1.67vw,1.33rem)] leading-[1.4]">→</span>
                    </button>
                  </motion.div>
                  <div className="grid grid-cols-2 gap-4">
                    {contentProjects.slice(0, 4).map((project, i) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 + i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
                      >
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="group text-left w-full"
                        >
                          <div className="relative aspect-square bg-[#f0f0f0] rounded-lg overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.12)] group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)] group-hover:-translate-y-1 transition-all duration-300 ease-out">
                            <div className={"absolute inset-0 bg-no-repeat"} style={{ backgroundImage: `url('${project.image}')`, backgroundSize: project.bgSize || (project.contain ? "contain" : "cover"), backgroundPosition: project.bgPos || "center", backgroundColor: project.contain ? (project.containBg || "white") : undefined }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
                            <p className="absolute bottom-3 left-3 text-[11px] text-white/80 font-medium">
                              {project.title}
                            </p>
                          </div>
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Websites quadrant */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className="mb-4"
                  >
                    <button onClick={() => onPageChange("websites")} className="flex items-end gap-3 text-foreground hover:text-foreground/60 hover:-translate-y-0.5 transition-all duration-300">
                      <h3 className="text-[clamp(2rem,5vw,4rem)] font-medium tracking-[-0.03em] leading-[0.95]">Websites</h3>
                      <span className="text-[clamp(0.67rem,1.67vw,1.33rem)] leading-[1.4]">→</span>
                    </button>
                  </motion.div>
                  <div className="grid grid-cols-2 gap-4">
                    {websiteProjects.slice(0, 4).map((project, i) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.55 + i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
                      >
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="group text-left w-full"
                        >
                          <div className="relative aspect-square bg-[#f0f0f0] rounded-lg overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.12)] group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)] group-hover:-translate-y-1 transition-all duration-300 ease-out">
                            <div className={"absolute inset-0 bg-no-repeat"} style={{ backgroundImage: `url('${project.image}')`, backgroundSize: project.bgSize || (project.contain ? "contain" : "cover"), backgroundPosition: project.bgPos || "center", backgroundColor: project.contain ? (project.containBg || "white") : undefined }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
                            <p className="absolute bottom-3 left-3 text-[11px] text-white/80 font-medium">
                              {project.title}
                            </p>
                          </div>
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Apps quadrant */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.65 }}
                    className="mb-4"
                  >
                    <button onClick={() => onPageChange("apps")} className="flex items-end gap-3 text-foreground hover:text-foreground/60 hover:-translate-y-0.5 transition-all duration-300">
                      <h3 className="text-[clamp(2rem,5vw,4rem)] font-medium tracking-[-0.03em] leading-[0.95]">Apps</h3>
                      <span className="text-[clamp(0.67rem,1.67vw,1.33rem)] leading-[1.4]">→</span>
                    </button>
                  </motion.div>
                  <div className="grid grid-cols-2 gap-4">
                    {appProjects.slice(0, 4).map((project, i) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.7 + i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
                      >
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="group text-left w-full"
                        >
                          <div className="relative aspect-square bg-[#f0f0f0] rounded-lg overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.12)] group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)] group-hover:-translate-y-1 transition-all duration-300 ease-out">
                            <div className={"absolute inset-0 bg-no-repeat"} style={{ backgroundImage: `url('${project.image}')`, backgroundSize: project.bgSize || (project.contain ? "contain" : "cover"), backgroundPosition: project.bgPos || "center", backgroundColor: project.contain ? (project.containBg || "white") : undefined }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
                            <p className="absolute bottom-3 left-3 text-[11px] text-white/80 font-medium">
                              {project.title}
                            </p>
                          </div>
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* About quadrant */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.8 }}
                    className="mb-4"
                  >
                    <button onClick={() => onPageChange("about")} className="flex items-end gap-3 text-foreground hover:text-foreground/60 hover:-translate-y-0.5 transition-all duration-300">
                      <h3 className="text-[clamp(2rem,5vw,4rem)] font-medium tracking-[-0.03em] leading-[0.95]">About</h3>
                      <span className="text-[clamp(0.67rem,1.67vw,1.33rem)] leading-[1.4]">→</span>
                    </button>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <button
                      onClick={() => onPageChange("about")}
                      className="group text-left w-full"
                    >
                      <div className="relative aspect-square bg-[#f0f0f0] rounded-lg overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.12)] group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)] group-hover:-translate-y-1 transition-all duration-300 ease-out">
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: "url('/projects/bio.png')" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <p className="text-[16px] font-medium text-white leading-tight">Leonardo Pham</p>
                          <p className="text-[12px] text-white/70 mt-1">Design Engineer</p>
                        </div>
                      </div>
                    </button>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* ── Content: portrait gallery ── */}
          {activePage === "content" && (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="py-4"
                          >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {contentProjects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: stagger(i), ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="group text-left w-full"
                    >
                      <div className="relative aspect-square bg-[#f0f0f0] rounded-lg overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.12)] group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)] group-hover:-translate-y-1 transition-all duration-300 ease-out">
                        <div className={"absolute inset-0 bg-no-repeat"} style={{ backgroundImage: `url('${project.image}')`, backgroundSize: project.bgSize || (project.contain ? "contain" : "cover"), backgroundPosition: project.bgPos || "center", backgroundColor: project.contain ? (project.containBg || "white") : undefined }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
                        <p className="absolute bottom-4 left-4 text-[12px] text-white/80 font-medium">
                          {project.title}
                        </p>
                      </div>
                    </button>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: stagger(contentProjects.length), ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <button onClick={() => onContactClick("Content Project")} className="group text-left w-full">
                    <div className="relative aspect-square bg-white border border-border rounded-lg overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.12)] group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)] group-hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col items-start justify-end p-5">
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/[0.03] transition-colors duration-300" />
                      <p className="text-[clamp(1rem,2.5vw,1.5rem)] font-medium leading-tight text-foreground tracking-[-0.02em]">Let&apos;s make your<br />brand move.</p>
                      <p className="text-[12px] text-muted mt-2">Start a project →</p>
                    </div>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* ── Websites: landscape gallery ── */}
          {activePage === "websites" && (
            <motion.div
              key="websites"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="py-4"
                          >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {websiteProjects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: stagger(i), ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="group text-left w-full"
                    >
                      <div className="relative aspect-square bg-[#f0f0f0] rounded-lg overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.12)] group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)] group-hover:-translate-y-1 transition-all duration-300 ease-out">
                        <div className={"absolute inset-0 bg-no-repeat"} style={{ backgroundImage: `url('${project.image}')`, backgroundSize: project.bgSize || (project.contain ? "contain" : "cover"), backgroundPosition: project.bgPos || "center", backgroundColor: project.contain ? (project.containBg || "white") : undefined }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
                        <p className="absolute bottom-4 left-4 text-[12px] text-white/80 font-medium">
                          {project.title}
                        </p>
                      </div>
                    </button>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: stagger(websiteProjects.length), ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <button onClick={() => onContactClick("Website Project")} className="group text-left w-full">
                    <div className="relative aspect-square bg-white border border-border rounded-lg overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.12)] group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)] group-hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col items-start justify-end p-5">
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/[0.03] transition-colors duration-300" />
                      <p className="text-[clamp(1rem,2.5vw,1.5rem)] font-medium leading-tight text-foreground tracking-[-0.02em]">Let&apos;s build your<br />dream site.</p>
                      <p className="text-[12px] text-muted mt-2">Start a project →</p>
                    </div>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* ── Apps: portrait gallery ── */}
          {activePage === "apps" && (
            <motion.div
              key="apps"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="py-4"
                          >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {appProjects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: stagger(i), ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="group text-left w-full"
                    >
                      <div className="relative aspect-square bg-[#f0f0f0] rounded-lg overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.12)] group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)] group-hover:-translate-y-1 transition-all duration-300 ease-out">
                        <div className={"absolute inset-0 bg-no-repeat"} style={{ backgroundImage: `url('${project.image}')`, backgroundSize: project.bgSize || (project.contain ? "contain" : "cover"), backgroundPosition: project.bgPos || "center", backgroundColor: project.contain ? (project.containBg || "white") : undefined }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
                        <p className="absolute bottom-4 left-4 text-[12px] text-white/80 font-medium">
                          {project.title}
                        </p>
                      </div>
                    </button>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: stagger(appProjects.length), ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <button onClick={() => onContactClick("App Project")} className="group text-left w-full">
                    <div className="relative aspect-square bg-white border border-border rounded-lg overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.12)] group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)] group-hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col items-start justify-end p-5">
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/[0.03] transition-colors duration-300" />
                      <p className="text-[clamp(1rem,2.5vw,1.5rem)] font-medium leading-tight text-foreground tracking-[-0.02em]">Let&apos;s build your<br />next app.</p>
                      <p className="text-[12px] text-muted mt-2">Start a project →</p>
                    </div>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* ── About ── */}
          {activePage === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="pt-4 pb-4"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="relative bg-[#f0f0f0] rounded-lg overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[calc((100vw-32px)/2.2)]">
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: "url('/projects/bio.png')",
                    }}
                  />
                </div>
                <div className="flex flex-col justify-end py-4 lg:pl-6">
                  <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-medium leading-[0.95] tracking-[-0.03em] text-foreground mb-8">
                    Leonardo
                    <br />
                    Pham
                  </h2>
                  <p className="text-[14px] leading-relaxed text-muted mb-3 max-w-[420px]">
                    Design engineer based in Southern California. I help
                    businesses cut through the noise with social media content,
                    high-converting websites, and software that actually works.
                  </p>
                  <p className="text-[14px] leading-relaxed text-muted/60 mb-8 max-w-[420px]">
                    Every project starts with understanding what you need — not
                    what looks good in a portfolio. Clean execution, honest
                    timelines, real results.
                  </p>
                  <button
                    onClick={() => onContactClick("Contact")}
                    className="text-[13px] text-foreground underline underline-offset-4 hover:opacity-60 transition-opacity self-start"
                  >
                    Get in touch →
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Project Modal ── */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed inset-0 z-[90] flex items-start justify-center pt-16 pb-8 px-4 overflow-y-auto"
              onClick={() => setSelectedProject(null)}
            >
              <div
                className="bg-white w-full max-w-[640px] rounded-lg overflow-hidden relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-foreground hover:bg-white transition-colors"
                  aria-label="Close"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="1" y1="1" x2="13" y2="13" />
                    <line x1="13" y1="1" x2="1" y2="13" />
                  </svg>
                </button>

                {/* Hero media */}
                {selectedProject.type === "video" && selectedProject.videoId ? (
                  /* Video: autoplay with sound */
                  <div className="relative w-full aspect-[9/16] max-h-[70vh] bg-black">
                    <iframe
                      src={`https://www.youtube.com/embed/${selectedProject.videoId}?autoplay=1&loop=1&playlist=${selectedProject.videoId}&controls=1&rel=0&modestbranding=1&playsinline=1`}
                      className="w-full h-full"
                      style={{ border: "none" }}
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      title={selectedProject.title}
                    />
                  </div>
                ) : (
                  /* Website/App: clickable placeholder */
                  <button
                    onClick={() => {
                      if (selectedProject.link) {
                        window.open(selectedProject.link, "_blank", "noopener,noreferrer");
                      }
                    }}
                    className={`relative w-full bg-[#f0f0f0] ${selectedProject.type === "app" ? "aspect-square" : "aspect-[16/10]"} cursor-pointer group`}
                  >
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${selectedProject.heroImage || selectedProject.image}')` }} />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="w-14 h-14 rounded-full bg-foreground/80 flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.5">
                          <path d="M1 15L15 1M15 1H5M15 1v10" />
                        </svg>
                      </div>
                    </div>
                  </button>
                )}

                {/* Content */}
                <div className="p-6 md:p-8">
                  {/* Title + action link on same row */}
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <h3 className="text-[20px] font-medium tracking-[-0.01em] text-foreground">
                      {selectedProject.title}
                    </h3>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 mb-6">
                    <p className="text-[14px] text-muted">
                      {selectedProject.description}
                    </p>
                    {selectedProject.type === "video" && selectedProject.videoId && (
                      <a
                        href={`https://youtube.com/watch?v=${selectedProject.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13px] text-foreground underline underline-offset-4 hover:opacity-60 transition-opacity whitespace-nowrap"
                      >
                        YouTube →
                      </a>
                    )}
                    {selectedProject.type === "website" && selectedProject.link && (
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13px] text-foreground underline underline-offset-4 hover:opacity-60 transition-opacity whitespace-nowrap"
                      >
                        Visit site →
                      </a>
                    )}
                  </div>

                  {/* Details */}
                  <div className="border-t border-border pt-5">
                    <p className="text-[13px] text-muted leading-relaxed">
                      {selectedProject.details.join(". ")}.
                    </p>
                  </div>

                  {/* Extra videos / Screenshots */}
                  {selectedProject.extraVideos && selectedProject.extraVideos.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 mt-6">
                      {selectedProject.extraVideos.map((vid) => (
                        <div key={vid} className="relative bg-black rounded-md overflow-hidden aspect-[9/16]">
                          <iframe
                            src={`https://www.youtube.com/embed/${vid}?rel=0&modestbranding=1&playsinline=1`}
                            className="w-full h-full"
                            style={{ border: "none" }}
                            allow="encrypted-media"
                            allowFullScreen
                            title={vid}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
