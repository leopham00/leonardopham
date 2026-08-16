/**
 * About page content. Source: 2024 Readymag portfolio, typo-corrected.
 * See docs/prd/content-inventory.md.
 */

export const intro =
  "Leonardo Pham is a filmmaker and designer from Los Angeles, CA, whose background in advertising, film, and music brings a holistic approach to storytelling.";

export const bio = [
  "Based in Los Angeles, CA, I'm a designer and filmmaker with a passion for storytelling. When I attended the Los Angeles County High School for the Arts for music and fine art, I discovered my love for film. I went on to develop my film and sound installation practices at The Cooper Union, where I fell in love with design. Since then, I have worked as an ad strategist and creative at Interpublic Group and Mediabrands Content Studio, creative directed a fashion and arts magazine, and worked on several media-related productions, blending my experiences in video, design, and sound to craft engaging and memorable stories.",
  "Regardless of the medium, every brand has its story to tell. My work aims to give brands the voice that does justice to their stories, message, and values.",
];

export interface Role {
  title: string;
  org: string;
  years: string;
}

export const experience: Role[] = [
  { title: "Co-Founder + CCO", org: "B&L Collective LLC", years: "2026" },
  { title: "Motion Graphics Designer", org: "1000heads", years: "2025" },
  { title: "Lead Designer", org: "Atheory", years: "2023" },
  { title: "Video Director", org: "VICE News", years: "2023" },
  { title: "Creative Director", org: "BREACH Magazine", years: "2022–2023" },
  { title: "Video Editor + Designer/PA", org: "Mediabrands Content Studio", years: "2021–2022" },
  { title: "Video Director + Set Designer", org: "CHIVALRY", years: "2021" },
  { title: "Video Editor", org: "Sacred Embodiment", years: "2021" },
  { title: "Production Assistant", org: "Pacific Clearstream Media Group", years: "2021" },
  { title: "Co-Founder + CCO", org: "Dune Enterprises", years: "2020" },
  { title: "Freelance Director of Photography", org: "J. Paul Getty Trust", years: "2018" },
  { title: "Videographer + Media Manager", org: "Film and Video Poetry Society", years: "2018" },
];

export interface School {
  name: string;
  detail: string;
  years: string;
}

export const education: School[] = [
  {
    name: "The Cooper Union",
    detail: "School of Art + Design, BFA, Minor in Literature and Philosophy",
    years: "Class of 2024",
  },
  {
    name: "ArtCenter College of Design",
    detail: "Studio Art Intensive Programs",
    years: "Jul '16 – Jul '19",
  },
  {
    name: "Los Angeles County High School for the Arts",
    detail: "School of Music + School of Art",
    years: "Jul '16 – Jul '19",
  },
];

export const skills = [
  "Video Editing",
  "Motion Graphics",
  "Creative Direction",
  "Brand Identity",
  "Photography",
  "Sound Design",
  "Music Production",
];

export const tools = [
  "Premiere Pro",
  "After Effects",
  "DaVinci Resolve",
  "Photoshop",
  "Illustrator",
  "InDesign",
  "Lightroom",
  "Figma",
  "Rhino 3D",
  "Ableton Live",
];

export const awards = ["CU Innovator Award"];

export const contact = {
  email: "leopham00@gmail.com",
  linkedin: "https://www.linkedin.com/in/leonardopham/",
  location: "Los Angeles, CA",
};

export const portrait = "/projects/bio.webp";
