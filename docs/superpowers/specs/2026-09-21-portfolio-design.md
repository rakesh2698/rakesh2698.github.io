# Portfolio Website — Design Spec

## Purpose
A single-page personal portfolio for Rakesh Satpathy, targeting DevOps / SRE
engineering roles. Primary audience: recruiters and hiring managers doing a
quick skim. Goal: make a strong impression at a glance, then reward a closer
look with real detail.

## Content Source
Content is drawn from `Rakesh_Satpathy_DevOps.pdf` (résumé), kept at
resume-level detail. No internal hostnames, ticket IDs, or other
company-confidential specifics beyond what's already in the résumé bullets.

## Non-goals
- No CMS, no backend, no build tooling (npm/webpack/etc.)
- No blog, no multi-page routing
- No analytics/tracking

## Structure
Three static files, no build step:
- `index.html` — content and markup
- `style.css` — all styling
- `script.js` — interactivity

## Page Sections (in order)
1. **Hero** — name, title ("DevOps / SRE Engineer"), short tagline,
   terminal-prompt-style flourish, quick links (email, phone, LinkedIn,
   résumé download).
2. **About/Summary** — adapted from résumé summary paragraph.
3. **Skills** — grouped by category (OS, Cloud, Automation & IaC,
   Containers & Orchestration, CI/CD & Collaboration, Monitoring &
   Observability, Other), rendered as tag/badge chips.
4. **Experience** — timeline style, two entries:
   - DevOps Engineer, Rakuten (Dec 2025–Present)
   - Senior System Administrator, TCS (May 2022–Dec 2025)
   Each entry shows role/company/dates always visible; bullets expand on
   click/tap (collapsed by default to keep the at-a-glance view clean).
5. **Certifications** — list of 6 certs from résumé (Cisco Networking
   Academy x5, OpenEDG PCAP), with issuer and year.
6. **Education** — Bachelor's in Textile Engineering, Odisha University of
   Technology and Research, 2018–2022.
7. **Contact** — email, phone, LinkedIn link, résumé download button.

## Visual Design
Dark, terminal/dev-themed:
- Background: deep charcoal/navy (`#0d1117`-family)
- Accent color: teal or amber (single accent, used consistently for links,
  highlights, badge borders)
- Monospace font (e.g. system mono stack or a Google Font like "JetBrains
  Mono" / "Fira Code") for hero line, skill badges, and section labels
- Sans-serif font for body copy/readability
- Subtle background texture: faint grid or dot pattern
- Skill badges styled like terminal tags: `[ Ansible ]` `[ Terraform ]`

## Interactivity (vanilla JS, no framework)
- Smooth-scroll anchor navigation with scroll-spy (nav highlights active
  section)
- Reveal-on-scroll animation (fade/slide-in) for sections as they enter
  viewport, using `IntersectionObserver`
- Click-to-expand bullets on each Experience entry
- Light/dark toggle, defaulting to dark (persists choice via
  `localStorage`)

## Styling Approach
Hand-written CSS (no Tailwind), using CSS custom properties for the
color palette and spacing scale so the dark/light toggle is a matter of
swapping variable values on a root class.

## Accessibility & Responsiveness
- Semantic HTML (`<nav>`, `<section>`, `<header>`, etc.)
- Sufficient color contrast in both themes
- Responsive layout: single-column stacking on mobile, nav collapses to a
  simple top bar
- Respects `prefers-reduced-motion` for the reveal animations

## Deployment
- New git repo at `~/Desktop/rakeshwork` (already initialized)
- Structured for GitHub Pages: static files at repo root (or `/docs` if
  preferred later), deployed by pushing to `main` and enabling Pages in
  repo settings
- Repo creation on GitHub and the actual push are NOT done automatically —
  exact steps will be handed to the user at the end for their approval

## Testing / Verification
- Open `index.html` directly in a browser and manually verify:
  - All sections render with correct résumé content
  - Nav scroll-spy and smooth scroll work
  - Experience bullets expand/collapse
  - Light/dark toggle works and persists on reload
  - Reveal animations fire correctly on scroll
  - Layout holds up at mobile width (~375px) and desktop width (~1440px)
- No automated test suite — this is a static content site; visual/manual
  verification is the appropriate bar.
