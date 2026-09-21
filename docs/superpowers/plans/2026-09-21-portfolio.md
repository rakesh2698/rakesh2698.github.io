# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page, dark terminal-themed portfolio site for Rakesh Satpathy targeting DevOps/SRE roles, deployable to GitHub Pages with no build step.

**Architecture:** Three static files (`index.html`, `style.css`, `script.js`) at the repo root. HTML holds semantic sections in document order; CSS uses custom properties for a swappable dark/light palette; JS is vanilla (scroll-spy, reveal-on-scroll, expand/collapse, theme toggle), each behavior in its own function, wired up on `DOMContentLoaded`.

**Tech Stack:** Plain HTML5, hand-written CSS (custom properties, flexbox/grid), vanilla JS (`IntersectionObserver`, `localStorage`). No frameworks, no build tools, no dependencies.

**Spec:** `docs/superpowers/specs/2026-09-21-portfolio-design.md`

## Global Constraints

- No build tooling (no npm, no bundler) — files must run by opening `index.html` directly or via a static file server.
- No frameworks/CDN dependencies (Tailwind was considered and rejected — hand-written CSS only).
- Content is resume-level detail only — no internal hostnames, ticket IDs, or company-confidential specifics beyond `Rakesh_Satpathy_DevOps.pdf`.
- Dark theme is default; light theme is a toggle, persisted via `localStorage`.
- Must respect `prefers-reduced-motion` for scroll animations.
- Semantic HTML required (`<nav>`, `<header>`, `<section>`, etc.) for accessibility.

---

## Résumé Content Reference

Use exactly this content (already verified against `Rakesh_Satpathy_DevOps.pdf`) when writing markup:

**Name/Title/Contact:** Rakesh Satpathy — DevOps / SRE Engineer — rakeshsatpathy96085@gmail.com — +91 9348682207 — linkedin.com/in/rakesh-satpathy

**Summary:** Senior DevOps / Cloud Engineer with 5 years of hands-on experience in Linux, cloud infrastructure, infrastructure automation, network automation, CI/CD, Kubernetes, and observability. Skilled in Ansible, AWS, Jenkins, Terraform, Docker, Kubernetes, Python, Bash, Prometheus, Grafana, Alertmanager, and Git. Experienced in leading infrastructure automation and platform migration initiatives, managing production environments, modernizing legacy platforms, implementing monitoring and alerting, and driving EOL remediation. Strong background in troubleshooting complex production issues and building reliable, scalable, and highly automated infrastructure solutions.

**Skills (grouped):**
- Operating Systems: Linux (SUSE, RHEL, Ubuntu), Solaris, HP-UX
- Cloud: AWS (EC2, S3, Lambda, CloudFormation, CloudWatch, IAM, VPC), GCP, CCloud
- Automation & IaC: Ansible, Terraform, Chef, Jinja2, Python, Shell
- Containers & Orchestration: Docker, Kubernetes, Helm
- CI/CD & Collaboration: Jenkins, Bitbucket, Jira, Git
- Monitoring & Observability: Grafana, Prometheus, Alertmanager, ELK, CheckMK, Shinken, Nagios, Dynatrace
- Other: Infoblox, LDAP, SELinux

**Experience — DevOps Engineer, Rakuten (Dec 2025 – Present):**
- Migrated enterprise Ansible platform from 2.7 to Ansible Core 2.18, reducing playbook failures by 20%.
- Standardized Grafana dashboards and alerting across large-scale network infrastructure, cutting alert noise by 18%.
- Improved monitoring coverage on Grafana and Prometheus across 3,000+ devices, closing alerting gaps and reducing missed incidents by 15%.
- Automated multi-vendor network operations using Ansible and Python, cutting manual change effort by 25-28%.
- Executed production EOL remediation and platform modernization with structured pre/post validation, reducing rollback incidents by 20%.
- Troubleshot Jenkins pipeline failures – build-agent issues, credentials, dependencies, deployment failures – improving pipeline success rate by 24%.
- Designed and maintained Jenkins CI/CD pipelines, reducing deployment cycle time by 20%.
- Templatized network operations using Jinja2, Ansible, and Python, cutting manual configuration errors by 25%.
- Migrated monitoring from Shinken to CheckMK, closing out a long-pending EOL project and improving alert accuracy.
- Introduced a Terraform-based approach to onboard devices, cutting onboarding time from days to hours.
- Prepared runbooks and templates for the NOC team, reducing MTTR by 23%.

**Experience — Senior System Administrator, TCS, Bangalore, India (May 2022 – Dec 2025):**
- Working on a project for SAP.
- Streamlined patch management for 3,100+ Linux machines every month, cutting vulnerability counts by 30% and keeping the environment aligned with IT security policy.
- Brought Infrastructure-as-Code practices (Ansible/Chef, Terraform) into the team, cutting deployment time by 75% and making configuration consistent across 2,500+ servers.
- Worked closely with the DevOps team on CI/CD so code pushes stopped causing downtime.
- Migrated Linux auth from local passwords to LDAP, which improved admin efficiency by about 25%.
- Automated infrastructure provisioning with CloudFormation and Terraform, cutting deployment time by 40%.
- Led a 5-person team through migrating 300+ legacy systems to the cloud – 35% cost reduction and better scalability out of it.
- Part of a 24/7 on-call rotation, keeping systems up through both peak and off-peak hours.
- Rolled out Nagios-based network monitoring that cut disruptions by 35% and saved roughly $250,000 a year in operational cost.
- Ran a centralized McAfee antivirus deployment across all 3,100+ Linux machines, cutting malware incidents by 40%.
- Automated daily cron jobs for routine maintenance, saving each engineer about 2 hours a day.
- Designed and deployed highly available AWS architectures (EC2, Auto Scaling, Load Balancers) for clients.
- Built serverless automation with AWS Lambda for data processing and scheduled/trigger-based workflows, wired into S3 events and CloudWatch.

**Certifications:**
- Introduction to Cybersecurity — Cisco Networking Academy — 2021
- Cisco DevNet Associate — Cisco Networking Academy — 2021
- PCAP: Programming Essentials in Python — OpenEDG JavaScript Institute — 2021
- Cybersecurity Essentials — Cisco Networking Academy — 2021
- Cisco CCNA v7: Introduction to Networks — Cisco Networking Academy — 2021
- Cisco CCNA v7: Switching, Routing, and Wireless Essentials — Cisco Networking Academy — 2021

**Education:** Bachelor's degree in Textile Engineering — Odisha University of Technology and Research, Bhubaneshwar, India — 2018–2022 — 8.2 (GPA)

---

### Task 1: Project scaffold, CSS variables, and base layout shell

**Files:**
- Create: `index.html`
- Create: `style.css`
- Create: `script.js`
- Create: `assets/` (directory, for the résumé PDF later)

**Interfaces:**
- Produces: HTML document with `<nav id="navbar">` and empty `<section>` elements with ids `#hero`, `#about`, `#skills`, `#experience`, `#certifications`, `#education`, `#contact`, in that order. CSS custom properties on `:root` and `:root[data-theme="light"]`: `--bg`, `--bg-alt`, `--fg`, `--fg-muted`, `--accent`, `--border`, `--font-mono`, `--font-sans`, `--space-1` through `--space-6`. `<body>` links `style.css` in `<head>` and `script.js` at the end of `<body>` with `defer`.

- [ ] **Step 1: Create the directory and base HTML skeleton**

Create `index.html`:

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Rakesh Satpathy — DevOps / SRE Engineer</title>
  <meta name="description" content="Portfolio of Rakesh Satpathy, DevOps / SRE Engineer specializing in Ansible, AWS, Terraform, Kubernetes, and observability." />
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <nav id="navbar">
    <div class="nav-inner">
      <a href="#hero" class="nav-logo">rsatpathy</a>
      <ul class="nav-links">
        <li><a href="#about">about</a></li>
        <li><a href="#skills">skills</a></li>
        <li><a href="#experience">experience</a></li>
        <li><a href="#certifications">certs</a></li>
        <li><a href="#education">education</a></li>
        <li><a href="#contact">contact</a></li>
      </ul>
      <button id="theme-toggle" aria-label="Toggle light/dark theme">◐</button>
    </div>
  </nav>

  <main>
    <section id="hero"></section>
    <section id="about"></section>
    <section id="skills"></section>
    <section id="experience"></section>
    <section id="certifications"></section>
    <section id="education"></section>
    <section id="contact"></section>
  </main>

  <script src="script.js" defer></script>
</body>
</html>
```

- [ ] **Step 2: Create `style.css` with the variable palette and base reset**

```css
:root {
  --bg: #0d1117;
  --bg-alt: #161b22;
  --fg: #e6edf3;
  --fg-muted: #8b949e;
  --accent: #2dd4bf;
  --border: #30363d;
  --font-mono: "JetBrains Mono", "Fira Code", ui-monospace, SFMono-Regular, Consolas, monospace;
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 2rem;
  --space-5: 3rem;
  --space-6: 5rem;
}

:root[data-theme="light"] {
  --bg: #f6f8fa;
  --bg-alt: #ffffff;
  --fg: #1f2328;
  --fg-muted: #57606a;
  --accent: #0f766e;
  --border: #d0d7de;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--bg);
  color: var(--fg);
  font-family: var(--font-sans);
  line-height: 1.6;
}

section {
  max-width: 960px;
  margin: 0 auto;
  padding: var(--space-6) var(--space-3);
}

a {
  color: var(--accent);
  text-decoration: none;
}
```

- [ ] **Step 3: Create an empty `script.js` with the DOMContentLoaded wrapper**

```js
document.addEventListener("DOMContentLoaded", () => {
  // Behaviors added in later tasks
});
```

- [ ] **Step 4: Create the assets directory**

```bash
mkdir -p assets
```

- [ ] **Step 5: Verify structure**

Run: `grep -c '<section id=' index.html`
Expected: `7`

Run: `open index.html` (macOS) and confirm the page loads with a dark background and no console errors (empty page is expected — content comes in later tasks).

- [ ] **Step 6: Commit**

```bash
git add index.html style.css script.js assets
git commit -m "Scaffold portfolio site structure and base styles"
```

---

### Task 2: Hero section + nav styling

**Files:**
- Modify: `index.html` (`#hero` section, nav content already present)
- Modify: `style.css`

**Interfaces:**
- Consumes: CSS variables from Task 1 (`--bg`, `--accent`, `--font-mono`, etc.), `#navbar` and `#hero` ids from Task 1.
- Produces: `.hero-prompt`, `.hero-name`, `.hero-title`, `.hero-links` CSS classes, reused by no later task but establishing the visual idiom (terminal prompt style) referenced in the spec.

- [ ] **Step 1: Fill in the hero markup**

Replace `<section id="hero"></section>` in `index.html` with:

```html
<section id="hero">
  <p class="hero-prompt">~/rakesh-satpathy $ whoami</p>
  <h1 class="hero-name">Rakesh Satpathy</h1>
  <p class="hero-title">&gt; DevOps / SRE Engineer</p>
  <p class="hero-tagline">Automation-first infra engineer — Ansible, AWS, Kubernetes, and observability at scale.</p>
  <div class="hero-links">
    <a href="mailto:rakeshsatpathy96085@gmail.com">Email</a>
    <a href="tel:+919348682207">Call</a>
    <a href="https://linkedin.com/in/rakesh-satpathy" target="_blank" rel="noopener">LinkedIn</a>
    <a href="assets/Rakesh_Satpathy_DevOps.pdf" download>Résumé ↓</a>
  </div>
</section>
```

- [ ] **Step 2: Style the hero and nav**

Append to `style.css`:

```css
#navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--bg-alt);
  border-bottom: 1px solid var(--border);
  z-index: 100;
}

.nav-inner {
  max-width: 960px;
  margin: 0 auto;
  padding: var(--space-1) var(--space-3);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: var(--font-mono);
}

.nav-links {
  list-style: none;
  display: flex;
  gap: var(--space-3);
}

.nav-links a {
  color: var(--fg-muted);
}

.nav-links a.active {
  color: var(--accent);
}

#theme-toggle {
  background: none;
  border: 1px solid var(--border);
  color: var(--fg);
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
}

#hero {
  padding-top: calc(var(--space-6) + 3rem);
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: var(--font-mono);
}

.hero-prompt {
  color: var(--fg-muted);
}

.hero-name {
  font-size: 3rem;
  margin: var(--space-2) 0;
}

.hero-title {
  color: var(--accent);
  font-size: 1.5rem;
}

.hero-tagline {
  font-family: var(--font-sans);
  color: var(--fg-muted);
  margin-top: var(--space-2);
  max-width: 40ch;
}

.hero-links {
  display: flex;
  gap: var(--space-3);
  margin-top: var(--space-4);
}
```

- [ ] **Step 3: Verify**

Run: `grep -c 'hero-name' index.html`
Expected: `1`

Run: `open index.html` and confirm the hero shows name, title, tagline, and four links, styled in monospace with the teal accent on the title.

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "Add hero section content and styling"
```

---

### Task 3: About section

**Files:**
- Modify: `index.html` (`#about`)
- Modify: `style.css`

**Interfaces:**
- Consumes: `--fg-muted`, `--space-*` variables from Task 1.
- Produces: `.section-heading` class, reused by Tasks 4–7 for consistent section titles.

- [ ] **Step 1: Fill in the about markup**

Replace `<section id="about"></section>` with:

```html
<section id="about">
  <h2 class="section-heading">about</h2>
  <p>
    Senior DevOps / Cloud Engineer with 5 years of hands-on experience in Linux,
    cloud infrastructure, infrastructure automation, network automation, CI/CD,
    Kubernetes, and observability. Skilled in Ansible, AWS, Jenkins, Terraform,
    Docker, Kubernetes, Python, Bash, Prometheus, Grafana, Alertmanager, and Git.
    Experienced in leading infrastructure automation and platform migration
    initiatives, managing production environments, modernizing legacy platforms,
    implementing monitoring and alerting, and driving EOL remediation. Strong
    background in troubleshooting complex production issues and building
    reliable, scalable, and highly automated infrastructure solutions.
  </p>
</section>
```

- [ ] **Step 2: Style the section heading (shared by later sections)**

Append to `style.css`:

```css
.section-heading {
  font-family: var(--font-mono);
  color: var(--accent);
  font-size: 1.25rem;
  text-transform: lowercase;
  margin-bottom: var(--space-3);
  border-bottom: 1px solid var(--border);
  padding-bottom: var(--space-1);
}

#about p {
  color: var(--fg);
  max-width: 70ch;
}
```

- [ ] **Step 3: Verify**

Run: `grep -c 'section-heading' index.html`
Expected: `1`

Run: `open index.html` and confirm the About section renders the summary paragraph under a styled "about" heading.

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "Add about section"
```

---

### Task 4: Skills section

**Files:**
- Modify: `index.html` (`#skills`)
- Modify: `style.css`

**Interfaces:**
- Consumes: `.section-heading` from Task 3.
- Produces: `.skill-group`, `.skill-badge` classes.

- [ ] **Step 1: Fill in the skills markup**

Replace `<section id="skills"></section>` with:

```html
<section id="skills">
  <h2 class="section-heading">skills</h2>

  <div class="skill-group">
    <h3>Operating Systems</h3>
    <div class="skill-badges">
      <span class="skill-badge">Linux (SUSE)</span>
      <span class="skill-badge">Linux (RHEL)</span>
      <span class="skill-badge">Linux (Ubuntu)</span>
      <span class="skill-badge">Solaris</span>
      <span class="skill-badge">HP-UX</span>
    </div>
  </div>

  <div class="skill-group">
    <h3>Cloud</h3>
    <div class="skill-badges">
      <span class="skill-badge">AWS EC2</span>
      <span class="skill-badge">AWS S3</span>
      <span class="skill-badge">AWS Lambda</span>
      <span class="skill-badge">CloudFormation</span>
      <span class="skill-badge">CloudWatch</span>
      <span class="skill-badge">IAM</span>
      <span class="skill-badge">VPC</span>
      <span class="skill-badge">GCP</span>
      <span class="skill-badge">CCloud</span>
    </div>
  </div>

  <div class="skill-group">
    <h3>Automation &amp; IaC</h3>
    <div class="skill-badges">
      <span class="skill-badge">Ansible</span>
      <span class="skill-badge">Terraform</span>
      <span class="skill-badge">Chef</span>
      <span class="skill-badge">Jinja2</span>
      <span class="skill-badge">Python</span>
      <span class="skill-badge">Shell</span>
    </div>
  </div>

  <div class="skill-group">
    <h3>Containers &amp; Orchestration</h3>
    <div class="skill-badges">
      <span class="skill-badge">Docker</span>
      <span class="skill-badge">Kubernetes</span>
      <span class="skill-badge">Helm</span>
    </div>
  </div>

  <div class="skill-group">
    <h3>CI/CD &amp; Collaboration</h3>
    <div class="skill-badges">
      <span class="skill-badge">Jenkins</span>
      <span class="skill-badge">Bitbucket</span>
      <span class="skill-badge">Jira</span>
      <span class="skill-badge">Git</span>
    </div>
  </div>

  <div class="skill-group">
    <h3>Monitoring &amp; Observability</h3>
    <div class="skill-badges">
      <span class="skill-badge">Grafana</span>
      <span class="skill-badge">Prometheus</span>
      <span class="skill-badge">Alertmanager</span>
      <span class="skill-badge">ELK</span>
      <span class="skill-badge">CheckMK</span>
      <span class="skill-badge">Shinken</span>
      <span class="skill-badge">Nagios</span>
      <span class="skill-badge">Dynatrace</span>
    </div>
  </div>

  <div class="skill-group">
    <h3>Other</h3>
    <div class="skill-badges">
      <span class="skill-badge">Infoblox</span>
      <span class="skill-badge">LDAP</span>
      <span class="skill-badge">SELinux</span>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Style skill groups and badges**

Append to `style.css`:

```css
.skill-group {
  margin-bottom: var(--space-3);
}

.skill-group h3 {
  font-size: 0.95rem;
  color: var(--fg-muted);
  margin-bottom: var(--space-1);
  font-weight: 600;
}

.skill-badges {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

.skill-badge {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 0.2rem 0.6rem;
  color: var(--fg);
  background-color: var(--bg-alt);
}

.skill-badge::before {
  content: "[ ";
  color: var(--fg-muted);
}

.skill-badge::after {
  content: " ]";
  color: var(--fg-muted);
}
```

- [ ] **Step 3: Verify**

Run: `grep -c 'skill-badge"' index.html`
Expected: `34`

Run: `open index.html` and confirm skills render as 8 grouped rows of terminal-tag-style badges.

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "Add skills section with grouped badges"
```

---

### Task 5: Experience section with expand/collapse

**Files:**
- Modify: `index.html` (`#experience`)
- Modify: `style.css`
- Modify: `script.js`

**Interfaces:**
- Consumes: `.section-heading` from Task 3.
- Produces: `.timeline-entry`, `.timeline-toggle`, `.timeline-bullets` classes; `initExperienceToggles()` function in `script.js`, called from the `DOMContentLoaded` handler.

- [ ] **Step 1: Fill in the experience markup**

Replace `<section id="experience"></section>` with:

```html
<section id="experience">
  <h2 class="section-heading">experience</h2>

  <article class="timeline-entry">
    <button class="timeline-toggle" aria-expanded="false">
      <div>
        <h3>DevOps Engineer — Rakuten</h3>
        <p class="timeline-dates">Dec 2025 – Present</p>
      </div>
      <span class="toggle-icon">+</span>
    </button>
    <ul class="timeline-bullets" hidden>
      <li>Migrated enterprise Ansible platform from 2.7 to Ansible Core 2.18, reducing playbook failures by 20%.</li>
      <li>Standardized Grafana dashboards and alerting across large-scale network infrastructure, cutting alert noise by 18%.</li>
      <li>Improved monitoring coverage on Grafana and Prometheus across 3,000+ devices, closing alerting gaps and reducing missed incidents by 15%.</li>
      <li>Automated multi-vendor network operations using Ansible and Python, cutting manual change effort by 25-28%.</li>
      <li>Executed production EOL remediation and platform modernization with structured pre/post validation, reducing rollback incidents by 20%.</li>
      <li>Troubleshot Jenkins pipeline failures – build-agent issues, credentials, dependencies, deployment failures – improving pipeline success rate by 24%.</li>
      <li>Designed and maintained Jenkins CI/CD pipelines, reducing deployment cycle time by 20%.</li>
      <li>Templatized network operations using Jinja2, Ansible, and Python, cutting manual configuration errors by 25%.</li>
      <li>Migrated monitoring from Shinken to CheckMK, closing out a long-pending EOL project and improving alert accuracy.</li>
      <li>Introduced a Terraform-based approach to onboard devices, cutting onboarding time from days to hours.</li>
      <li>Prepared runbooks and templates for the NOC team, reducing MTTR by 23%.</li>
    </ul>
  </article>

  <article class="timeline-entry">
    <button class="timeline-toggle" aria-expanded="false">
      <div>
        <h3>Senior System Administrator — TCS</h3>
        <p class="timeline-dates">May 2022 – Dec 2025, Bangalore, India</p>
      </div>
      <span class="toggle-icon">+</span>
    </button>
    <ul class="timeline-bullets" hidden>
      <li>Working on a project for SAP.</li>
      <li>Streamlined patch management for 3,100+ Linux machines every month, cutting vulnerability counts by 30% and keeping the environment aligned with IT security policy.</li>
      <li>Brought Infrastructure-as-Code practices (Ansible/Chef, Terraform) into the team, cutting deployment time by 75% and making configuration consistent across 2,500+ servers.</li>
      <li>Worked closely with the DevOps team on CI/CD so code pushes stopped causing downtime.</li>
      <li>Migrated Linux auth from local passwords to LDAP, which improved admin efficiency by about 25%.</li>
      <li>Automated infrastructure provisioning with CloudFormation and Terraform, cutting deployment time by 40%.</li>
      <li>Led a 5-person team through migrating 300+ legacy systems to the cloud – 35% cost reduction and better scalability out of it.</li>
      <li>Part of a 24/7 on-call rotation, keeping systems up through both peak and off-peak hours.</li>
      <li>Rolled out Nagios-based network monitoring that cut disruptions by 35% and saved roughly $250,000 a year in operational cost.</li>
      <li>Ran a centralized McAfee antivirus deployment across all 3,100+ Linux machines, cutting malware incidents by 40%.</li>
      <li>Automated daily cron jobs for routine maintenance, saving each engineer about 2 hours a day.</li>
      <li>Designed and deployed highly available AWS architectures (EC2, Auto Scaling, Load Balancers) for clients.</li>
      <li>Built serverless automation with AWS Lambda for data processing and scheduled/trigger-based workflows, wired into S3 events and CloudWatch.</li>
    </ul>
  </article>
</section>
```

- [ ] **Step 2: Style the timeline**

Append to `style.css`:

```css
.timeline-entry {
  border-left: 2px solid var(--border);
  padding-left: var(--space-3);
  margin-bottom: var(--space-4);
}

.timeline-toggle {
  width: 100%;
  background: none;
  border: none;
  color: var(--fg);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 0;
  text-align: left;
}

.timeline-toggle h3 {
  font-size: 1.1rem;
}

.timeline-dates {
  color: var(--fg-muted);
  font-family: var(--font-mono);
  font-size: 0.85rem;
}

.toggle-icon {
  font-family: var(--font-mono);
  color: var(--accent);
  font-size: 1.25rem;
}

.timeline-bullets {
  margin-top: var(--space-2);
  padding-left: var(--space-3);
  color: var(--fg-muted);
}

.timeline-bullets li {
  margin-bottom: var(--space-1);
}
```

- [ ] **Step 3: Write the expand/collapse behavior**

Replace the contents of `script.js` with:

```js
function initExperienceToggles() {
  document.querySelectorAll(".timeline-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const bullets = button.nextElementSibling;
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      bullets.hidden = expanded;
      button.querySelector(".toggle-icon").textContent = expanded ? "+" : "−";
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initExperienceToggles();
});
```

- [ ] **Step 4: Verify**

Run: `grep -c 'timeline-entry' index.html`
Expected: `2`

Run: `open index.html`, click each experience header, and confirm the bullet list toggles open/closed and the `+`/`−` icon flips.

- [ ] **Step 5: Commit**

```bash
git add index.html style.css script.js
git commit -m "Add experience section with expand/collapse"
```

---

### Task 6: Certifications and education sections

**Files:**
- Modify: `index.html` (`#certifications`, `#education`)
- Modify: `style.css`

**Interfaces:**
- Consumes: `.section-heading` from Task 3.
- Produces: `.cert-list`, `.cert-item` classes.

- [ ] **Step 1: Fill in the certifications markup**

Replace `<section id="certifications"></section>` with:

```html
<section id="certifications">
  <h2 class="section-heading">certifications</h2>
  <ul class="cert-list">
    <li class="cert-item">
      <span class="cert-name">Introduction to Cybersecurity</span>
      <span class="cert-meta">Cisco Networking Academy · 2021</span>
    </li>
    <li class="cert-item">
      <span class="cert-name">Cisco DevNet Associate</span>
      <span class="cert-meta">Cisco Networking Academy · 2021</span>
    </li>
    <li class="cert-item">
      <span class="cert-name">PCAP: Programming Essentials in Python</span>
      <span class="cert-meta">OpenEDG JavaScript Institute · 2021</span>
    </li>
    <li class="cert-item">
      <span class="cert-name">Cybersecurity Essentials</span>
      <span class="cert-meta">Cisco Networking Academy · 2021</span>
    </li>
    <li class="cert-item">
      <span class="cert-name">Cisco CCNA v7: Introduction to Networks</span>
      <span class="cert-meta">Cisco Networking Academy · 2021</span>
    </li>
    <li class="cert-item">
      <span class="cert-name">Cisco CCNA v7: Switching, Routing, and Wireless Essentials</span>
      <span class="cert-meta">Cisco Networking Academy · 2021</span>
    </li>
  </ul>
</section>
```

- [ ] **Step 2: Fill in the education markup**

Replace `<section id="education"></section>` with:

```html
<section id="education">
  <h2 class="section-heading">education</h2>
  <p class="edu-degree">Bachelor's degree in Textile Engineering</p>
  <p class="edu-meta">Odisha University of Technology and Research · Bhubaneshwar, India · 2018 – 2022 · GPA 8.2</p>
</section>
```

- [ ] **Step 3: Style both sections**

Append to `style.css`:

```css
.cert-list {
  list-style: none;
}

.cert-item {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-1);
  padding: var(--space-1) 0;
  border-bottom: 1px solid var(--border);
}

.cert-name {
  color: var(--fg);
}

.cert-meta {
  color: var(--fg-muted);
  font-family: var(--font-mono);
  font-size: 0.85rem;
}

.edu-degree {
  font-size: 1.1rem;
  margin-bottom: var(--space-1);
}

.edu-meta {
  color: var(--fg-muted);
  font-family: var(--font-mono);
  font-size: 0.85rem;
}
```

- [ ] **Step 4: Verify**

Run: `grep -c 'cert-item' index.html`
Expected: `6`

Run: `open index.html` and confirm certifications list and education entry render correctly.

- [ ] **Step 5: Commit**

```bash
git add index.html style.css
git commit -m "Add certifications and education sections"
```

---

### Task 7: Contact section and résumé asset

**Files:**
- Modify: `index.html` (`#contact`)
- Modify: `style.css`
- Copy: `assets/Rakesh_Satpathy_DevOps.pdf`

**Interfaces:**
- Consumes: `.section-heading` from Task 3, `assets/` directory from Task 1, `hero-links` résumé download link from Task 2 (must point to the same file path created here).

- [ ] **Step 1: Copy the résumé PDF into the project**

```bash
cp "/Users/rakesh.satpathy/Downloads/Rakesh personal/Rakesh_Satpathy_DevOps.pdf" assets/Rakesh_Satpathy_DevOps.pdf
```

- [ ] **Step 2: Fill in the contact markup**

Replace `<section id="contact"></section>` with:

```html
<section id="contact">
  <h2 class="section-heading">contact</h2>
  <p class="contact-line"><a href="mailto:rakeshsatpathy96085@gmail.com">rakeshsatpathy96085@gmail.com</a></p>
  <p class="contact-line"><a href="tel:+919348682207">+91 9348682207</a></p>
  <p class="contact-line"><a href="https://linkedin.com/in/rakesh-satpathy" target="_blank" rel="noopener">linkedin.com/in/rakesh-satpathy</a></p>
  <a class="resume-button" href="assets/Rakesh_Satpathy_DevOps.pdf" download>Download Résumé ↓</a>
</section>
```

- [ ] **Step 3: Style the contact section**

Append to `style.css`:

```css
.contact-line {
  margin-bottom: var(--space-1);
  font-family: var(--font-mono);
}

.resume-button {
  display: inline-block;
  margin-top: var(--space-3);
  padding: 0.6rem 1.2rem;
  border: 1px solid var(--accent);
  border-radius: 4px;
  color: var(--accent);
  font-family: var(--font-mono);
}

.resume-button:hover {
  background-color: var(--accent);
  color: var(--bg);
}
```

- [ ] **Step 4: Verify**

Run: `ls assets/Rakesh_Satpathy_DevOps.pdf`
Expected: file exists, no error.

Run: `grep -c 'resume-button' index.html`
Expected: `1`

Run: `open index.html`, click "Download Résumé", and confirm the PDF opens/downloads.

- [ ] **Step 5: Commit**

```bash
git add index.html style.css assets/Rakesh_Satpathy_DevOps.pdf
git commit -m "Add contact section and résumé download asset"
```

---

### Task 8: Scroll-spy nav and smooth scroll

**Files:**
- Modify: `script.js`
- Modify: `style.css`

**Interfaces:**
- Consumes: `#navbar .nav-links a` elements from Task 1, `<section>` ids from Task 1.
- Produces: `initScrollSpy()` function, called from `DOMContentLoaded`.

- [ ] **Step 1: Enable smooth scrolling via CSS**

Append to `style.css`:

```css
html {
  scroll-behavior: smooth;
}

main {
  scroll-padding-top: 4rem;
}
```

- [ ] **Step 2: Write the scroll-spy function**

Add to `script.js` (above the `DOMContentLoaded` listener) and call it inside the listener:

```js
function initScrollSpy() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-50% 0px -50% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}
```

Update the `DOMContentLoaded` listener:

```js
document.addEventListener("DOMContentLoaded", () => {
  initExperienceToggles();
  initScrollSpy();
});
```

- [ ] **Step 3: Verify**

Run: `grep -c 'initScrollSpy' script.js`
Expected: `2` (definition + call)

Run: `open index.html`, scroll through the page, and confirm the nav link for the currently-visible section turns the accent color.

- [ ] **Step 4: Commit**

```bash
git add script.js style.css
git commit -m "Add scroll-spy nav highlighting and smooth scroll"
```

---

### Task 9: Reveal-on-scroll animation

**Files:**
- Modify: `script.js`
- Modify: `style.css`

**Interfaces:**
- Consumes: `<section>` elements from Task 1.
- Produces: `initRevealOnScroll()` function, called from `DOMContentLoaded`.

- [ ] **Step 1: Add reveal CSS**

Append to `style.css`:

```css
main section {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

main section.revealed {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  main section {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

- [ ] **Step 2: Write the reveal-on-scroll function**

Add to `script.js`:

```js
function initRevealOnScroll() {
  const sections = document.querySelectorAll("main section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  sections.forEach((section) => observer.observe(section));
}
```

Update the `DOMContentLoaded` listener:

```js
document.addEventListener("DOMContentLoaded", () => {
  initExperienceToggles();
  initScrollSpy();
  initRevealOnScroll();
});
```

- [ ] **Step 3: Verify**

Run: `grep -c 'initRevealOnScroll' script.js`
Expected: `2`

Run: `open index.html`, scroll down, and confirm each section fades/slides into view the first time it enters the viewport, and that the hero (visible on load) still appears without requiring a scroll.

Note: the hero section is visible on page load before any scroll event fires the `IntersectionObserver` callback — confirm in Step 3 that `#hero` still gets `revealed` added automatically (it will, since `IntersectionObserver` fires once for elements already in view on observe).

- [ ] **Step 4: Commit**

```bash
git add script.js style.css
git commit -m "Add reveal-on-scroll animation with reduced-motion support"
```

---

### Task 10: Light/dark theme toggle with persistence

**Files:**
- Modify: `script.js`

**Interfaces:**
- Consumes: `#theme-toggle` button from Task 1, `data-theme` attribute on `<html>` from Task 1, `:root[data-theme="light"]` CSS from Task 1.
- Produces: `initThemeToggle()` function, called from `DOMContentLoaded`.

- [ ] **Step 1: Write the theme toggle function**

Add to `script.js`:

```js
function initThemeToggle() {
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  const stored = localStorage.getItem("theme");

  if (stored) {
    root.setAttribute("data-theme", stored);
  }

  toggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", current);
    localStorage.setItem("theme", current);
  });
}
```

Update the `DOMContentLoaded` listener:

```js
document.addEventListener("DOMContentLoaded", () => {
  initExperienceToggles();
  initScrollSpy();
  initRevealOnScroll();
  initThemeToggle();
});
```

- [ ] **Step 2: Verify**

Run: `grep -c 'initThemeToggle' script.js`
Expected: `2`

Run: `open index.html`, click the theme toggle button, confirm colors switch to the light palette, reload the page, and confirm the light theme persists.

- [ ] **Step 3: Commit**

```bash
git add script.js
git commit -m "Add light/dark theme toggle with localStorage persistence"
```

---

### Task 11: Responsive layout pass, README, and final verification

**Files:**
- Modify: `style.css` (mobile breakpoint)
- Create: `README.md`

**Interfaces:**
- Consumes: all classes from Tasks 1–10.
- Produces: none (terminal task).

- [ ] **Step 1: Add a mobile breakpoint**

Append to `style.css`:

```css
@media (max-width: 640px) {
  .nav-inner {
    flex-wrap: wrap;
    gap: var(--space-1);
  }

  .nav-links {
    gap: var(--space-2);
    font-size: 0.85rem;
  }

  .hero-name {
    font-size: 2rem;
  }

  .hero-links {
    flex-wrap: wrap;
  }

  .cert-item {
    flex-direction: column;
    align-items: flex-start;
  }
}
```

- [ ] **Step 2: Write the README with GitHub Pages deployment steps**

Create `README.md`:

```markdown
# Rakesh Satpathy — Portfolio

Single-page portfolio site. No build step — open `index.html` directly, or
serve locally with:

    python3 -m http.server 8000

## Deploying to GitHub Pages

1. Create a new repository on GitHub (e.g. `rakesh-satpathy.github.io` for a
   root user site, or any name for a project site).
2. Add it as a remote and push:

       git remote add origin <your-repo-url>
       git branch -M main
       git push -u origin main

3. In the repo on GitHub: Settings → Pages → Source → set to `main` branch,
   `/ (root)` folder → Save.
4. Wait a minute, then visit the URL GitHub shows on that same Pages settings
   page.
```

- [ ] **Step 3: Full manual verification pass**

Run each check and confirm by eye in a browser (`open index.html`):

- [ ] All 7 sections show correct résumé content (hero, about, skills, experience, certifications, education, contact)
- [ ] Nav scroll-spy highlights the active section while scrolling
- [ ] Clicking a nav link smooth-scrolls to that section
- [ ] Experience bullets expand/collapse on click for both entries
- [ ] Reveal-on-scroll animations fire once per section, hero visible immediately on load
- [ ] Theme toggle switches palettes and persists across reload
- [ ] Résumé download link (hero and contact) opens the correct PDF
- [ ] Resize browser to ~375px width: nav wraps, hero name shrinks, no horizontal scroll, cert rows stack

Run: `grep -rc 'TBD\|TODO\|FIXME' index.html style.css script.js`
Expected: `index.html:0`, `style.css:0`, `script.js:0` (no leftover placeholders)

- [ ] **Step 4: Commit**

```bash
git add style.css README.md
git commit -m "Add responsive breakpoint, README, and deployment instructions"
```
