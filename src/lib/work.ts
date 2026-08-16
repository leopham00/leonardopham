/**
 * Single source of truth for the work index.
 *
 * Copy for everything except the web projects comes from the 2024 Readymag
 * portfolio (see docs/prd/content-inventory.md), typo-corrected. Order within
 * each discipline is editorial; there are no years on this site.
 *
 * `client` is the brand the work was for. `agency` is who Leo did it through,
 * when that differs, e.g. Google Chrome (client) via 1000heads (agency).
 */

export type Discipline = "design" | "video" | "web" | "etc";

export interface Project {
  slug: string;
  title: string;
  /** The brand the work was for. */
  client: string;
  /** The studio or agency the work was done through, when it differs. */
  agency?: string;
  discipline: Discipline;
  industry?: string;
  role: string;
  body: string;
  link?: string;
  /** Links to weave into the body copy: collaborators, clients. */
  bodyLinks?: { text: string; href: string }[];
  /** Key into images.generated.ts: the folder under /public/work. */
  assets: string;
  /** Pure image project: no body copy, gallery only. */
  galleryOnly?: boolean;
}

import { images } from "./images.generated";

export const DISCIPLINES: { key: Discipline; label: string }[] = [
  { key: "design", label: "Design" },
  { key: "video", label: "Video" },
  { key: "web", label: "Web" },
  { key: "etc", label: "Etc" },
];

export const projects: Project[] = [
  // ── Design ──────────────────────────────────────────────────────────────
  {
    slug: "breach",
    title: "BREACH",
    client: "BREACH Magazine",
    discipline: "design",
    industry: "Fashion",
    role: "Creative Director",
    bodyLinks: [
      { text: "Takuto Domeki", href: "https://takutodomeki.cargo.site/" },
      { text: "Sam Yoon", href: "https://yamsoon.com/" },
    ],
    body: "The fashion and arts magazine needed an identity that both paid homage to early print and blurred the lines between the creative and their work. The team, which included graphic designers Takuto Domeki, Sam Yoon, and Kayleen Bae, married BREACH's boldness and edge with a clean and simple approach that allowed the artist and their work to come to life on its pages.",
    assets: "breach",
  },
  {
    slug: "atheory",
    title: "Atheory Branding",
    client: "Atheory",
    discipline: "design",
    industry: "Music + Audio Tools",
    role: "Graphic Designer",
    bodyLinks: [{ text: "Sam Yoon", href: "https://yamsoon.com/" }],
    body: "Atheory aimed to narrow the gap between musicians and their musical process. Sam Yoon and I took inspiration from audioreactive ferrofluids to design the Atheory “key” and provide its demographic with the idea that Atheory's autotune pedal would grant them access to a streamlined creative process. The logo went on to live on their socials and site.",
    assets: "atheory",
  },
  {
    slug: "anamorphosis",
    title: "ANAMORPHOSIS",
    client: "Independent",
    discipline: "design",
    industry: "Film",
    role: "Graphic Designer",
    body: "A branding project for an animation film festival. The festival's identity played on the concept of animation frames and walks its audience through the different eras and categories of animation: from early experimental animation, to anime and modern animated films. The brand's identity was implemented into posters and a website.",
    assets: "anamorphosis",
  },
  {
    slug: "tylenol-healing-the-divide",
    title: "Tylenol: Healing the Divide",
    client: "Tylenol",
    agency: "Mediabrands Content Studio",
    discipline: "design",
    industry: "Healthcare",
    role: "Graphic Designer",
    body: "In an effort to lend their hand in the movement, Tylenol needed branding concepts for a health insurance initiative and docuseries. These logo variants explore the typography and symbolism that would effectively deliver the project's goals and values.",
    assets: "tylenol",
  },
  {
    slug: "pitchfork-pictograms",
    title: "Pitchfork Pictograms",
    client: "Independent",
    discipline: "design",
    industry: "Music",
    role: "Graphic Designer",
    body: "Pictograms speak louder than words. This project aims to assign symbols that would denote Pitchfork's news and media by music genre.",
    assets: "pitchfork",
  },

  // ── Video ──────────────────────────────────────────────────────────────
  {
    slug: "mbcs-outreach",
    title: "MBCS Outreach",
    client: "Mediabrands Content Studio",
    discipline: "video",
    industry: "Advertising",
    role: "Video Editor",
    body: "In this outreach campaign, Mediabrands Content Studio called upon its diverse team members to tell their stories. The videos give quick insight into the warm and welcoming environment, and the vulnerability, available to its family.",
    assets: "mbcs",
  },
  {
    slug: "vice-dumbest-drug-moments",
    title: "VICE: Dumbest Drug Moments",
    client: "VICE News",
    discipline: "video",
    industry: "Mass Media",
    role: "Video Director, Editor",
    body: "To reach a wider TikTok audience, VICE hired us to write, shoot, and edit a series telling the stories of history's dumbest drug mishaps and myths.",
    assets: "vice",
  },
  {
    slug: "motion-graphics-reel",
    title: "Motion Graphics Reel",
    client: "Personal",
    discipline: "video",
    role: "Graphic Designer",
    body: "In order to display the range of works and projects in my portfolio, as well as exhibit my motion graphics skill, this motion graphics reel gives the audience a sense of my work.",
    assets: "motion-reel",
  },
  {
    slug: "sprite-uproxx",
    title: "Sprite x UPROXX",
    client: "Sprite × UPROXX",
    agency: "Mediabrands Content Studio",
    discipline: "video",
    industry: "Beverage",
    role: "Video Editor",
    body: "A concept film: a pitch deck translated into something you can actually watch. Sprite is steadfast in supporting the growth and uniqueness of these artists, so to present the many creatives we worked with, this film pieces together the range of upcoming artists and creators in Sprite and UPROXX's collaboration.",
    assets: "sprite",
  },
  {
    slug: "easyherb-reels",
    title: "EasyHerb Reels",
    client: "EasyHerb",
    discipline: "video",
    industry: "Cannabis",
    role: "Video Director, Editor",
    bodyLinks: [{ text: "EasyHerb", href: "https://www.instagram.com/easyherb.nyc/" }],
    body: "All you need, straight to your front door. The cannabis delivery service covers everything from product to drinks and more. This series of Instagram reels showcases EasyHerb's fun and laid-back identity in streamlining the business-to-consumer process.",
    assets: "easyherb",
  },
  {
    slug: "coke-taste-of-togetherness",
    title: "Coke: Taste of Togetherness",
    client: "Coca-Cola",
    discipline: "video",
    industry: "Beverage",
    role: "Video Editor",
    body: "A concept film: a pitch deck turned into a visual aid. Since much of the world has incorporated Coke into its traditional dishes, the company wanted to explore the building blocks of any meal. Most of all, we wanted to convey what we call the Taste of Together: the flavors that bring us all together.",
    assets: "coke-togetherness",
  },
  {
    slug: "coke-cj-henry",
    title: "Coke x CJ Henry",
    client: "Coca-Cola",
    agency: "Interpublic Group",
    discipline: "video",
    industry: "Beverage",
    role: "Video Editor",
    body: "A concept film built to sell an idea. When an Australian artist named CJ Henry took to Instagram to show her love for Diet Coke, we saw an opportunity for a partnership, so we translated the pitch into a film that showed what Coke's support for artists could look like.",
    assets: "coke-cj-henry",
  },
  {
    slug: "vitaminwater-thrivehacks",
    title: "Vitaminwater #thrivehacks",
    client: "Vitaminwater",
    agency: "Interpublic Group",
    discipline: "video",
    industry: "Beverage",
    role: "Video Editor",
    body: "A concept film: the deck made visual. Inspired by the how-tos and lifehacks seen on social platforms, Vitaminwater wanted to lend a hand towards a fresher and healthier lifestyle, and this film showed how that mission would play out on screen.",
    assets: "vitaminwater",
  },
  {
    slug: "sacred-embodiment",
    title: "Sacred Embodiment Ads",
    client: "Sacred Embodiment",
    discipline: "video",
    industry: "Alternative Medicine",
    role: "Video Editor",
    bodyLinks: [
      { text: "Sacred Embodiment Teachings", href: "https://www.instagram.com/sacred.embodiment.teachings/?hl=en" },
    ],
    body: "Rosaria Cabrera's Sacred Embodiment Teachings came to our needs in a time of crisis during the pandemic. These Instagram reel ads sought to bring the program's practices in holistic healing to a wider audience.",
    assets: "sacred-embodiment",
  },

  {
    slug: "google-chrome",
    title: "Google Chrome",
    client: "Google Chrome",
    agency: "1000heads",
    discipline: "video",
    industry: "Technology",
    role: "Motion Graphics Designer",
    body: "Short form social work for Chrome, built around the small shortcuts people actually use: translating a menu abroad, pulling up bookmarks, finding a recipe without the scroll. Each cut has to land the feature in the first second and still be worth watching to the end.",
    assets: "google-chrome",
  },

  // ── Etc: photography and personal work ─────────────────────────────────────────────────────────
  {
    slug: "nts-apparel",
    title: "NTS Apparel Line",
    client: "NEWTREND Society",
    discipline: "etc",
    industry: "Fashion",
    role: "Photographer",
    body: "NEWTREND needed to communicate the easy-going positivity of their apparel line. This shoot provides the profiles and lifestyle photos to showcase their identity across their website and socials.",
    assets: "nts",
  },
  {
    slug: "independent",
    title: "Independent Projects",
    client: "Independent",
    discipline: "etc",
    industry: "Design, art, film",
    role: "Designer, Filmmaker, Photographer",
    body: "Designs, films, and photography made as independent explorations of my art practice.",
    galleryOnly: true,
    assets: "independent",
  },

  // ── Web ─────────────────────────────────────────────────────────────────
  {
    slug: "crulink",
    title: "CruLink",
    client: "CruLink",
    discipline: "web",
    industry: "Fabrication",
    role: "Designer, Developer",
    body: "A B2B platform connecting fabricators with the customers who need them. Full-stack build on Next.js and Supabase with Stripe Connect for split payments, real-time messaging, order tracking, and multi-tenant architecture.",
    link: "https://crulink.com/",
    assets: "crulink",
  },
  {
    slug: "brownings-welding",
    title: "Browning's Welding",
    client: "Browning's Welding",
    discipline: "web",
    industry: "Fabrication",
    role: "Designer, Developer",
    body: "A brand-forward site for a family-owned welding and fabrication business, built around a full-bleed hero and a quote request flow. Mobile-optimized, with a service showcase that does the selling.",
    link: "https://www.browningswelding.com/",
    assets: "brownings",
  },
  {
    slug: "addvo",
    title: "ADDVO",
    client: "ADDVO",
    discipline: "web",
    industry: "IT Consultancy",
    role: "Designer, Developer",
    body: "A Swedish IT consultancy needed a site that matched the caliber of its talent matching platform. Cinematic hero, clear service breakdowns, and a contact flow built for conversion.",
    link: "https://www.addvo.se/",
    assets: "addvo",
  },
  {
    slug: "spandrel-studio",
    title: "Spandrel Studio",
    client: "Spandrel Studio",
    discipline: "web",
    industry: "Fabrication",
    role: "Designer, Developer",
    body: "A custom fabrication business site built around a multi-step quote builder. CMS-powered content management with real-time quote notifications and an admin dashboard.",
    link: "https://spandrel-site-v0.vercel.app/",
    assets: "spandrel",
  },
  {
    slug: "bl-site-demos",
    title: "B&L Site Demos",
    client: "B&L Collective",
    discipline: "web",
    industry: "Design Studio",
    role: "Designer, Developer",
    body: "A three-variant editorial demo (Editorial, Atelier, Concierge) with a live customizer that swaps layout, profession, and palette in real time across five business types. Custom slide-in panel built on the Web Animations API.",
    link: "https://bnlsitedemos.vercel.app/",
    assets: "bl-demos",
  },
];

/** Index order is the positioning: design first, web last. */
export const orderedProjects: Project[] = DISCIPLINES.flatMap((d) =>
  projects.filter((p) => p.discipline === d.key),
);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function gallery(p: Project) {
  return images[p.assets]?.gallery ?? [];
}

export function videos(p: Project) {
  return images[p.assets]?.videos ?? [];
}

export function hero(p: Project) {
  return images[p.assets]?.hero ?? null;
}
