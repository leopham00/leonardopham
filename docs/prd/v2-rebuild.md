# PRD — leonardopham.com v2

**Status:** Built — awaiting font files only
**Author:** Leo + Claude
**Created:** 2026-08-13
**Supersedes:** v1 (archived, see §9)

---

## 1. Context

v1 shipped and works, but has three problems.

**Design.** Rounded rectangles everywhere (`rounded-lg`, `rounded-full`), card shadows, gradient overlays, an autoplaying muted YouTube hero, a client marquee, and a Framer Motion load cascade on every element. The chrome competes with the work.

**Architecture.** `src/app/page.tsx` is `"use client"` with `activePage` held in React state. The four sections are not routes. There is no URL for any individual project, nothing is shareable, and nothing is server-rendered or indexable. For a portfolio whose job is to be found and linked, this is the most expensive property of the build.

**Distribution.** `leonardopham.link` is intercepted by Spectrum Security Suite (CUJO AI) and returns a block page. DNS and Vercel are both configured correctly — this is a domain-reputation block on the `.link` TLD. Deferred to a separate track (§10).

## 2. Goals

1. One scannable index that presents the entire body of work as a single object.
2. A real URL for every project — server-rendered, indexable, shareable.
3. A visual language with zero decoration: no cards, no shadows, no radius, no gradients.
4. Present the design work first. Preserve none of v1's design or code.

## 3. Non-goals

- No CMS. Work data is a typed TypeScript module.
- No blog, no case-study long-form, no dark mode toggle.
- No contact form. A `mailto:` link is the contact path.
- No analytics in v1 of the rebuild.
- Not fixing the `.link` domain in this scope (§10).

## 4. Success criteria

- Every project reachable at a unique, crawlable URL.
- Index renders as a Server Component with no client-side data fetch.
- Zero `border-radius` in the codebase (enforced by lint rule or review).
- Lighthouse ≥ 95 across the board, mobile.
- No horizontal scroll at 375px.
- First paint shows real content, not an animation about to start.

## 5. Design direction

### 5.1 Synthesis of references

Common properties across Icebug, depth-stack-archive, and Porto Rocha:

1. **No containers.** Content sits on the ground plane. Separation via 1px hairlines and whitespace, never boxes.
2. **Two type sizes, no middle.** One large display size, one small size doing all navigational and metadata work. The missing mid-range is what reads as confident.
3. **The index is the page.** The body of work is one scannable list, not a curated arrangement with hero treatment.
4. **Imagery is the only color.** Monochrome chrome; all saturation from the work.
5. **Motion responds to intent.** Hover-triggered reveals. Nothing plays at you on load.

**Explicitly not borrowed:** depth-stack-archive is desktop-only. Its hover mechanic gets a designed touch equivalent here (§6.1), not a bolt-on.

### 5.2 Tokens

Ground is light. Ink is near-black. All color comes from project imagery.

| Token | Value | Use |
|---|---|---|
| `--ground` | `#FAFAF9` | Page background |
| `--ink` | `#0A0A0A` | Primary text |
| `--muted` | `#737373` | Metadata, secondary |
| `--hairline` | `#E0E0DD` | 1px rules |

**Radius: `0`. Everywhere. No exceptions.**

### 5.3 Type

Two families, two roles:

- **Display / body** — a neutral grotesk, tight tracking at large sizes.
- **Meta / UI** — monospace, uppercase, wide tracking, for disciplines, clients, roles, nav, and labels. This is the Icebug move and it carries the utilitarian tone without licensing cost.

Loaded via `next/font/local`, self-hosted, no layout shift.

**Resolved:** Leo owns licensed fonts and is supplying the files. Self-hosted via `next/font/local`. Awaiting delivery — see §11.

Scale — deliberately sparse:

| Step | Size | Use |
|---|---|---|
| Display | `clamp(2.5rem, 7vw, 5.5rem)` | Page identity only |
| Row | `clamp(0.95rem, 1.6vw, 1.15rem)` | Index rows, body |
| Meta | `0.6875rem` (11px), `0.12em` tracking, uppercase | Everything else |

### 5.4 Motion

- `transform` and `opacity` only.
- 200–400ms, `cubic-bezier(0.25, 0.1, 0.25, 1)`.
- **No load cascade.** The index is present on paint.
- Hover reveals only, plus route transitions.
- Respect `prefers-reduced-motion`.

### 5.5 Layout

Full-bleed with consistent gutters — 16px mobile, 24px desktop. No narrow centered column. Content runs to the edges.

## 6. Pages

### 6.1 `/` — Work index

The primary object. All 20 projects as rows.

**Row anatomy:** `Title` ————— `Client` · `Role`, separated by a 1px hairline. **No years anywhere on the site** — the work is presented as a body, not a timeline.

**Desktop reveal:** on row hover, the project's image fades in *behind* the list — centered, low opacity, soft-edged, text stays legible on top. Only one image at a time. This is the depth-stack mechanic.

**Mobile:** no hover exists. Each row carries a small inline thumbnail at the leading edge, always visible. The list stays the primary object; the image is supporting. Designed as its own layout, not a degraded desktop.

**Ordering — the positioning decision.** The target is design work. The index is therefore ordered by discipline, not chronology:

1. **Design** — brand identity, logos, art direction (5)
2. **Motion** — motion graphics (1)
3. **Video** — direction and editing (8)
4. **Photography** (1)
5. **Web** — sites and platforms (5)

**20 projects total.** Design occupies the top of the page unscrolled. Order within a discipline is editorial — strongest first — since there are no years to sort by.

**Filters:** `All` / `Design` / `Motion` / `Video` / `Web` as mono text links. Drives `?c=` searchParam, read server-side so filtered views SSR and are shareable. Canonical stays `/`. Header shows a count, e.g. `Work (20)`.

**Row metadata** comes from the Readymag structure, which is stronger than v1's: every project has a **Client**, an **Industry**, and a **Role**. Industry sits on the detail page.

### 6.2 `/work/[slug]` — Project detail

Server-rendered, one per project. Title, client, industry, role, the body paragraph, embedded video(s) where they exist, live link for web work, prev/next navigation.

### 6.3 `/about`

Bio, education, experience table, skills, tools, awards, contact. All copy exists in `content-inventory.md` — the Readymag About page is complete and does not need rewriting, only typo fixes. Links: email `mailto:` and LinkedIn. **No social links** (Instagram, TikTok, YouTube all cut). Portrait is `public/projects/bio.webp` — cropped to remove the iOS button, 122KB.

### 6.4 `/links` — deleted

Was a social linktree. Socials, Sill Writing, and Tabli are all cut, leaving nothing on it. Route removed.

### 6.5 `/not-found`

Minimal, in-system.

## 7. Data model

`src/lib/work.ts` — single typed source of truth.

```ts
export type Discipline = "design" | "motion" | "video" | "photography" | "web";

export interface Project {
  slug: string;          // URL identity
  title: string;
  client: string;        // "BREACH Magazine", "Independent", "Personal"
  discipline: Discipline;
  industry?: string;     // "Fashion", "Beverage", "Healthcare"
  role: string;          // "Creative Director", "Video Editor"
  body: string;          // the Readymag paragraph — index summary + meta
  link?: string;         // live URL (build work)
  videoId?: string;      // primary YouTube id
  extraVideos?: string[];
  image: string;         // index reveal + detail hero
}
```

Copy source is `docs/prd/content-inventory.md` (scraped from the 2024 Readymag portfolio), **not** the v1 Next.js site. The Readymag copy is materially better: real client names, industries, roles, and written paragraphs rather than generated bullets. v1's contribution is limited to the eight build projects, which have no Readymag equivalent.

## 8. Tech decisions

| Decision | Choice | Rationale |
|---|---|---|
| Framework | Next.js 16 App Router | Already on it, stays |
| Rendering | Server Components; client only for the hover-reveal | The index must be static HTML |
| Framer Motion | **Removed** | CSS transitions cover hover; native View Transitions cover routes. Cuts a dependency and the load-cascade temptation |
| Styling | Tailwind v4, fresh token set | Existing `globals.css` is replaced, not edited |
| Images | `next/image`, explicit dimensions | Per `Create/CLAUDE.md` |
| Fonts | `next/font`, self-hosted | No layout shift |

**Every component is written new.** No file is carried over from `src/components/`.

## 9. v1 archival

1. Tag current `main` as `v1-final`.
2. Push branch `v1-archive` to origin — full history preserved.
3. Copy `src/`, `public/`, and config files to `archive/v1/` in the repo so it is browsable without checking out a branch.
4. Add `archive/` to `tsconfig.json` `exclude` and the ESLint ignore list so it never compiles or lints.
5. Delete `src/components/` and rebuild.

## 10. Domain (deferred track)

Confirmed findings, for whenever this is picked up:

- DNS is correct: `A → 216.198.79.1`, `www → cname.vercel-dns.com`. Domain is attached to the Vercel team.
- `leonardopham.vercel.app` returns 200. The site is up.
- `http://leonardopham.link` → 302 → `block.charter-prod.hosted.cujo.io/warn.html`. HTTPS handshake then fails because the interceptor cannot cleanly MITM it.
- Controls from the same machine: `crulink.com` and `browningswelding.com` (identical Vercel setup) both 200. Other `.link` domains resolve fine.

**Conclusion:** domain-reputation blocklisting, not misconfiguration. `.link` is heavily phishing-abused and new registrations are flagged by default on several filters.

**Options:** (a) register `leonardopham.com` — confirmed available — and make it canonical, redirecting `.link`; (b) whitelist in Spectrum and file a CUJO false-positive report, which fixes it only for Leo; (c) both.

Interim: production is `leonardopham.vercel.app`.

## 11. Open questions

| # | Question | Blocks |
|---|---|---|
| # | Item | Blocks | Owner |
|---|---|---|---|
| 1 | **Font files.** Licensed, being supplied. Wired via `next/font/local`; system grotesk + mono stands in until then. | Visual direction | Leo |
| 2 | **1000heads / Google Chrome work.** Data model supports it (`client` + `agency`); copy and images still needed. | New rows | Leo |

Everything else is resolved. Images are done — 172 WebP assets in `public/work`, pulled from the Readymag CDN and merged with the v1 web screenshots.

**Resolved:** no years anywhere · iOS apps cut (Tabli, 4:5) · Monolith cut · Spandrel kept · Sill Writing cut · self-referential "Leonardo Pham" project cut · `/links` deleted · socials cut, LinkedIn kept · copy source is Readymag · `bio.png` cropped and converted to `bio.webp` (122KB) · typo fixes approved.

## 12. Content inventory

Moved to **[`content-inventory.md`](./content-inventory.md)** — full scrape of the 2024 Readymag portfolio: bio, education, 10-role experience table, skills, tools, awards, and all 16 project write-ups with client, industry, and role.

---

## Changelog

| Date | Change |
|---|---|
| 2026-08-13 | Second asset pass, done properly. Discovered the Readymag widget schema exposes `unscaledUrl` (full originals, up to 7199px) plus the **crop rectangle Leo set in the editor** — the first pass ignored both, which is what caused the grain and the black bars. Re-pulled all 157 images from originals with crops applied at 2200px/q88. Also found `slideshow` and `video` widget types the first pass missed entirely: that recovered 34 videos (EasyHerb 10 not 7, Independent 14, MBCS 4, Sacred 3, ANAMORPHOSIS's site recording) and the draft.js `entityMap` link entities (Sam Yoon → yamsoon.com, Takuto Domeki → takutodomeki.cargo.site). Removed 3 Atheory images that sit on the BREACH page in the source. Motion renamed to Video. Reveal now full-opacity above the rows, hero-led, cycling with per-project resume. Mobile scroll-dim removed. |
| 2026-08-13 | Images resolved without Leo lifting a finger: 391 CDN URLs found via the Readymag widgets API, deduped to 157 real assets (the rest were cross-host duplicates and rendered-text PNGs), converted to WebP, merged with v1's web screenshots. 172 files, 20MB. Also recovered the three missing video IDs. Client/agency split added for the 1000heads → Google Chrome case. Motion and video merged into one discipline. Statement header replaces the bare "Work" H1. Reveal is now viewport-fixed; mobile gets centred-row emphasis with native scroll — no looping, no autoplay. |
| 2026-08-13 | v2 built. All routes live, 20 project pages prerendered, framer-motion removed, `/links` deleted, `src/components/` rebuilt from zero. Placeholder plates stand in until image exports land (`IMAGES_READY` flag in `WorkIndex.tsx`); system-font fallback until Leo's licensed faces arrive. |
| 2026-08-13 | Scraped the 2024 Readymag portfolio — it holds 15 projects the v1 site had dropped entirely, including all the branding/design work. Copy source switched to Readymag. Repositioned around design work: index now orders Design → Motion → Video → Photography → Build. Socials cut, LinkedIn kept. Sill Writing cut. |
| 2026-08-13 | Initial draft. IA set to unified filterable index. Domain work split to a deferred track; production stays on `leonardopham.vercel.app`. Clean-room rebuild confirmed — content data only, zero design or code carryover. |
