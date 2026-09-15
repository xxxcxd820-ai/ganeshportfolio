import { useState, useEffect, useRef, Fragment } from "react";

/* ─────────────────────────────────────────────
   GLOBAL ASSETS & PROFILE PORTRAIT
   Place your images in public/assets/
───────────────────────────────────────────── */
const PORTRAIT = "/assets/portrait.jpg";

/* ─────────────────────────────────────────────
   GLOBAL STYLES
   Dark-only — tokens defined once on .pf-root
───────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    .pf-root {
      --bg: #0A0A0A;
      --bg-2: #111111;
      --bg-deep: #000000;
      --surface: #171717;
      --surface-2: #1c1c1c;
      --ink: #FFFFFF;
      --ink-soft: #A1A1AA;
      --ink-muted: #71717A;
      --line: #27272A;
      --line-strong: #3F3F46;
      --accent: #FFFFFF;
      --accent-soft: rgba(255,255,255,0.10);
      --grad: linear-gradient(135deg, #ee0979 0%, #ff6a00 100%);
      --grad-soft: rgba(238,9,121,0.16);
      --invert-bg: #111111;
      --invert-ink: #FFFFFF;
    }

    html { scroll-behavior: smooth; }

    .pf-root {
      font-family: 'Inter', sans-serif;
      background: var(--bg);
      color: var(--ink);
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
      min-height: 100vh;
    }

    .font-display { font-family: 'Inter Tight', sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }

    .eyebrow {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--ink-muted);
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .eyebrow::before {
      content: '';
      width: 6px; height: 6px;
      background: var(--grad);
      border-radius: 50%;
      display: inline-block;
    }

    .rule { border: none; border-top: 1px solid var(--line); }

    .tag {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      letter-spacing: 0.06em;
      color: var(--ink-soft);
      border: 1px solid var(--line);
      padding: 5px 11px;
      border-radius: 100px;
      white-space: nowrap;
    }

    @keyframes fadeUp { from { opacity:0; transform:translateY(26px);} to {opacity:1; transform:translateY(0);} }
    @keyframes fadeIn { from { opacity:0;} to {opacity:1;} }
    .anim-up { animation: fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both; }
    @keyframes heroIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
    .hero-in { animation: heroIn 0.8s cubic-bezier(0.16,1,0.3,1) both; }
    @media (prefers-reduced-motion: reduce) { .hero-in { animation: none; } }
    .anim-in { animation: fadeIn 0.6s ease both; }
    .d1{animation-delay:.06s}.d2{animation-delay:.16s}.d3{animation-delay:.26s}
    .d4{animation-delay:.36s}.d5{animation-delay:.46s}.d6{animation-delay:.56s}

    .reveal { opacity:0; transform: translateY(22px);
      transition: opacity .8s cubic-bezier(0.22,1,0.36,1), transform .8s cubic-bezier(0.22,1,0.36,1); }
    .reveal.visible { opacity:1; transform: translateY(0); }
    .cs-static .reveal { opacity: 1 !important; transform: none !important; transition: none !important; }

    .hover-line { position: relative; display: inline-block; }
    .hover-line::after {
      content:''; position:absolute; bottom:-3px; left:0; width:100%; height:1px;
      background: var(--accent); transform: scaleX(0); transform-origin: right;
      transition: transform .35s cubic-bezier(0.22,1,0.36,1);
    }
    .hover-line:hover::after { transform: scaleX(1); transform-origin: left; }

    .nav-link {
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase;
      color: var(--ink-soft); transition: color .2s; cursor: pointer;
      background: none; border: none;
    }
    .nav-link:hover { color: var(--ink); }

    .btn {
      display: inline-flex; align-items: center; gap: 9px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase;
      padding: 13px 22px; border-radius: 4px; cursor: pointer; text-decoration: none;
      transition: transform .2s, background .25s, color .25s, border-color .25s;
    }
    .btn-fill { background: var(--grad); color: #fff; border: none; }
    .btn-fill:hover { transform: scale(1.03); box-shadow: 0 12px 34px -8px rgba(238,9,121,0.55), 0 0 22px -6px rgba(255,106,0,0.4); }
    .btn-ghost { background: transparent; color: var(--ink); border: 1px solid var(--line-strong); }
    .btn-ghost:hover { border-color: var(--ink); transform: translateY(-2px); }

    .grad-text {
      background: var(--grad);
      -webkit-background-clip: text; background-clip: text;
      -webkit-text-fill-color: transparent; color: transparent;
    }

    .work-row { transition: background .35s ease, padding-left .35s ease; }
    .work-row:hover { background: var(--surface); padding-left: 12px; }
    .work-row .arrow { opacity:0; transform: translateX(-8px);
      transition: opacity .3s, transform .3s cubic-bezier(0.22,1,0.36,1);
      background: var(--grad); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent; }
    .work-row:hover .arrow { opacity:1; transform: translateX(0); }
    .work-row .idx { transition: color .3s; }
    .work-row:hover .idx { color: var(--accent); }

    .cs-grid {
      display: grid;
      grid-template-columns: 56px minmax(0,1fr) auto 40px;
      grid-template-areas: "idx body tags arrow";
      align-items: center;
      gap: 20px;
      padding: 32px 0;
    }
    .cs-grid .idx { grid-area: idx; align-self: start; }
    .cs-grid .cs-body { grid-area: body; max-width: 560px; }
    .cs-grid .cs-tags { grid-area: tags; display: flex; gap: 7px; flex-wrap: wrap; justify-content: flex-end; max-width: 250px; }
    .cs-grid .arrow { grid-area: arrow; text-align: right; }

    @media (max-width: 1024px) {
      .cs-grid {
        grid-template-columns: 44px minmax(0,1fr) 28px;
        grid-template-areas:
          "idx body arrow"
          "idx tags arrow";
        align-items: start;
        column-gap: 18px;
        row-gap: 18px;
      }
      .cs-grid .cs-body { max-width: 640px; }
      .cs-grid .cs-tags { justify-content: flex-start; max-width: none; }
      .cs-grid .arrow { align-self: center; }
    }
    @media (max-width: 600px) {
      .cs-grid {
        grid-template-columns: 1fr;
        grid-template-areas: "idx" "body" "tags";
        row-gap: 14px;
        padding: 30px 0;
      }
      .cs-grid .cs-body { max-width: none; }
      .cs-grid .arrow { display: none; }
    }

    /* ── Ecosystem flow ── */
    .eco-section { position: relative; overflow: hidden; background: var(--bg-deep); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
    .eco-bg { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
    .eco-grid { position: absolute; inset: 0; opacity: .32;
      background-image: linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px);
      background-size: 46px 46px;
      -webkit-mask-image: radial-gradient(ellipse 72% 64% at 50% 46%, #000 0%, transparent 80%);
              mask-image: radial-gradient(ellipse 72% 64% at 50% 46%, #000 0%, transparent 80%); }
    .eco-glow { position: absolute; left: 50%; top: 44%; width: 760px; height: 420px; transform: translate(-50%,-50%);
      background: radial-gradient(circle, rgba(238,9,121,0.15), rgba(255,106,0,0.06) 42%, transparent 70%); filter: blur(26px); }

    .eco-head { opacity: 0; transform: translateY(16px); transition: opacity .7s ease, transform .7s cubic-bezier(.22,1,.36,1); }
    .eco-in .eco-head { opacity: 1; transform: none; }

    .eco-track { position: relative; display: flex; align-items: stretch; justify-content: center; gap: 0;
      overflow-x: auto; scrollbar-width: none; padding: 4px 2px 8px;
      -webkit-mask-image: linear-gradient(90deg, transparent, #000 3.5%, #000 96.5%, transparent);
              mask-image: linear-gradient(90deg, transparent, #000 3.5%, #000 96.5%, transparent); }
    .eco-track::-webkit-scrollbar { display: none; }

    .eco-card { position: relative; flex: 0 0 clamp(150px, 15vw, 178px); align-self: center;
      display: flex; flex-direction: column; align-items: flex-start;
      background: var(--surface); border: 1px solid var(--line); border-radius: 24px; padding: 22px 18px 20px;
      box-shadow: 0 14px 30px -18px rgba(0,0,0,.7);
      opacity: 0; transform: translateY(20px);
      transition: opacity .55s ease, transform .55s cubic-bezier(.22,1,.36,1), box-shadow .3s, border-color .3s; }
    .eco-in .eco-card { opacity: 1; transform: none; }
    .eco-card:hover { transform: translateY(-4px); box-shadow: 0 24px 46px -22px rgba(0,0,0,.85); border-color: var(--line-strong); }

    .eco-title { font-size: 15px; font-weight: 600; letter-spacing: -.01em; line-height: 1.2; color: var(--ink); }
    .eco-desc { font-size: 12.5px; font-weight: 300; color: var(--ink-soft); line-height: 1.5; margin-top: 7px; }

    .eco-core { flex-basis: clamp(166px, 16.5vw, 198px); padding: 26px 20px 22px;
      background: linear-gradient(var(--surface), var(--surface)) padding-box, var(--grad) border-box; border: 1.5px solid transparent;
      box-shadow: 0 24px 50px -22px rgba(238,9,121,.4), 0 10px 24px -16px rgba(0,0,0,.8); }
    .eco-badge { display: inline-block; font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: .14em; text-transform: uppercase;
      padding: 4px 9px; border-radius: 999px; margin-bottom: 14px; color: #fff;
      background: var(--grad-soft); border: 1px solid rgba(238,9,121,.4); }

    .eco-line { position: relative; flex: 0 0 clamp(26px, 3vw, 46px); align-self: center; height: 2px; overflow: hidden;
      background: var(--line); border-radius: 2px; transform: scaleX(0); transform-origin: left center;
      transition: transform .55s cubic-bezier(.22,1,.36,1); }
    .eco-in .eco-line { transform: scaleX(1); }
    .eco-pulse { position: absolute; top: 0; left: 0; height: 100%; width: 60%; border-radius: 2px;
      background: linear-gradient(90deg, transparent, #ee0979, #ff6a00, transparent);
      transform: translateX(-120%); animation: ecoPulse 2.6s linear infinite; }
    @keyframes ecoPulse { from { transform: translateX(-120%); } to { transform: translateX(220%); } }

    @media (max-width: 900px) { .eco-track { justify-content: flex-start; } }
    @media (max-width: 680px) {
      .eco-track { flex-direction: column; align-items: stretch; overflow-x: visible; }
      .eco-card, .eco-core { flex-basis: auto; width: 100%; }
      .eco-line { width: 2px; height: 32px; align-self: center; transform: scaleY(0); transform-origin: top center; }
      .eco-in .eco-line { transform: scaleY(1); }
    }

    /* ── Editorial portrait ── */
    .portrait {
      position: relative; width: 100%; aspect-ratio: 4 / 5;
      border-radius: 12px; overflow: hidden; border: 1px solid var(--line);
      background: var(--surface);
      box-shadow: 0 18px 40px -16px rgba(0,0,0,0.45);
    }
    .portrait img {
      width: 100%; height: 100%; object-fit: cover; object-position: 50% 22%; display: block;
      transition: transform 1.1s cubic-bezier(0.22,1,0.36,1);
    }
    .portrait:hover img { transform: scale(1.035); }
    .portrait .caption {
      position: absolute; left: 0; right: 0; bottom: 0; padding: 16px 20px;
      display: flex; justify-content: space-between; align-items: center;
      background: linear-gradient(to top, rgba(8,8,8,0.75), rgba(8,8,8,0)); color: #fff;
    }
    .portrait .caption .cap-name { font-family: 'JetBrains Mono', monospace; font-size: 12px; }
    .portrait .caption .cap-loc { font-family: 'JetBrains Mono', monospace; font-size: 11px; opacity: 0.7; }

    /* ── Hero ambient grid ── */
    .hero-grid {
      position:absolute; inset:0; pointer-events:none; z-index:0;
      background-image:
        linear-gradient(var(--line) 1px, transparent 1px),
        linear-gradient(90deg, var(--line) 1px, transparent 1px);
      background-size: 64px 64px;
      -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 35%, #000 0%, transparent 75%);
      mask-image: radial-gradient(ellipse 70% 60% at 50% 35%, #000 0%, transparent 75%);
      opacity:.6;
    }
    @keyframes glowPulse { 0%,100%{opacity:.5; transform:scale(1);} 50%{opacity:.85; transform:scale(1.06);} }
    .hero-glow {
      position:absolute; z-index:0; pointer-events:none;
      width: 520px; height: 520px; border-radius:50%;
      background: radial-gradient(circle, var(--accent-soft) 0%, transparent 68%);
      filter: blur(20px); animation: glowPulse 7s ease-in-out infinite;
    }

    /* ── Layout helpers ── */
    .wrap { max-width: 1180px; margin: 0 auto; padding-left: 40px; padding-right: 40px; }
    .mobile-menu { display:none; flex-direction:column; gap:5px; cursor:pointer; padding:6px; background:none; border:none; }
    .mobile-menu span { display:block; width:22px; height:1.5px; background: var(--ink); transition: transform .3s, opacity .3s; }

    @media (max-width: 820px) {
      .mobile-menu { display:flex; }
      .desktop-nav { display:none !important; }
      .wrap { padding-left: 22px; padding-right: 22px; }
      .grid-2 { grid-template-columns: 1fr !important; gap: 48px !important; }
      .cs-2col { grid-template-columns: 1fr !important; }
      .strength-grid { grid-template-columns: 1fr !important; }
    }
  `}</style>
);

/* ─────────────────────────────────────────────
   DATA — Ganesh's Resume & GitHub Case Studies
───────────────────────────────────────────── */
const PROFILE = {
  name: "Ganesh",
  title: "Senior Product Designer | UX/UI Designer",
  tagline: "Translating complex product requirements into scalable, intuitive digital experiences.",
  email: "ganesh.design@example.com",
  linkedin: "linkedin.com/in/ganesh-ux",
  resume: "/Ganesh_Resume.pdf",
  location: "USA · Remote",
};

const STATS = [
  { n: "5+", l: "Years of Experience" },
  { n: "58%", l: "Active User Growth (SaaS)" },
  { n: "3+", l: "Global Tech Platforms" },
];

/* ─────────────────────────────────────────────
   CASE STUDIES (Direct Image Mapping)
───────────────────────────────────────────── */
const CASE_STUDIES = [
  {
    id: "ubank-digital-banking",
    index: "01",
    title: "UBank — Next-Gen Digital Banking & Wealth",
    subtitle: "Re-imagining retail mobile banking with frictionless onboarding, smart spending insights, and instant transfers.",
    preview: "End-to-end UX architecture and design system implementation for a secure digital banking ecosystem.",
    company: "UBank",
    year: "2024 — Present",
    role: "Senior Product Designer",
    tags: ["Fintech UX", "Mobile Banking", "Figma Dev Mode", "Design Systems", "WCAG 2.1 AA"],
    detailTitle: "UBank Digital Banking & Financial Management App",
    detailSubtitle: "Transforming complex financial workflows into accessible, user-friendly mobile banking journeys.",
    heroImage: "/assets/ubank_hero.png",
    screens: [
      { title: "Smart Dashboard & Balance Insights", src: "/assets/ubank_screen1.png" },
      { title: "One-Tap P2P Instant Transfer Flow", src: "/assets/ubank_screen2.png" },
      { title: "Card Security & Financial Controls", src: "/assets/ubank_screen3.png" },
    ],
    overview: [
      "Led the end-to-end design lifecycle for UBank's flagship digital banking platform across iOS and Android.",
      "Conducted generative user research, financial behavioral interviews, and heuristic evaluations to map friction points during money transfers and bill payments.",
      "Architected responsive design tokens, modular component patterns, and interactive micro-animations using Figma variables.",
      "Collaborated shoulder-to-shoulder with backend and iOS/Android engineers using Figma Dev Mode annotations to guarantee strict accessibility and pixel accuracy.",
    ],
    responsibilities: [
      "User Journey & Financial Flow Mapping",
      "Interactive High-Fidelity Prototyping",
      "Accessibility & WCAG Compliance Audits",
      "Design Systems & Token Architecture",
      "Design QA & Developer Handoff",
    ],
    ecosystemFlow: true,
    challenge: "Legacy banking interfaces overwhelmed users with technical financial jargon, dense account views, and multi-step transfer flows that caused high transaction abandonment.",
    constraints: [
      "Strict financial compliance & banking data regulations",
      "Multi-factor authentication (MFA) UX barriers",
      "High-contrast accessibility standards",
      "Cross-platform consistency across iOS and Android",
    ],
    solution: [
      {
        group: "Smart Dashboard & Quick Actions",
        note: "Core interaction framework",
        items: [
          "One-tap P2P money transfers",
          "Visual spending breakdown & budgeting insights",
          "Real-time card freeze & security toggles",
          "Contextual scheduled transaction alerts",
        ],
      },
      {
        group: "Banking Design System",
        note: "Scalable component foundation",
        items: [
          "Figma token architecture for light/dark modes",
          "Accessible keypad & currency inputs",
          "State-driven micro-interactions",
          "Reusable transaction status modals",
        ],
      },
    ],
    impact: [
      {
        group: "Conversion & Efficiency",
        items: [
          "44% decrease in transaction completion time",
          "38% increase in daily active engagement with budgeting tools",
          "Zero accessibility regressions reported across releases",
        ],
      },
      {
        group: "Operational Agility",
        items: [
          "Cut developer implementation cycle by 35% with Dev Mode annotations",
          "Standardized design-to-code naming parity across cross-functional teams",
        ],
      },
    ],
  },
  {
    id: "bookapp-mobile-reading",
    index: "02",
    title: "BookApp — E-Reader & Audio Platform UX",
    subtitle: "Crafting an immersive digital reading and listening experience driven by personalized discovery.",
    preview: "Bridging physical reading habits with digital interfaces through typographic precision and spatial navigation.",
    company: "BookApp Project",
    year: "2023 — 2024",
    role: "Lead UX/UI Designer",
    tags: ["Content Discovery", "Mobile App", "Interaction Design", "User Testing", "E-Reader UI"],
    detailTitle: "BookApp — Immersive Reading & Audio Ecosystem",
    detailSubtitle: "A human-centered mobile experience designed for reading focus, seamless audiobook switching, and algorithmic discovery.",
    heroImage: "/assets/bookapp_hero.png",
    screens: [
      { title: "Distraction-Free Typographic Reader", src: "/assets/bookapp_screen1.png" },
      { title: "Hybrid Audio/E-Book Sync Player", src: "/assets/bookapp_screen2.png" },
      { title: "Curated Algorithmic Discovery Feed", src: "/assets/bookapp_screen3.png" },
    ],
    overview: [
      "Spearheaded user research, reader personas, and interactive wireframing for an all-in-one digital book and audiobook platform.",
      "Designed an e-reader engine emphasizing typographic hierarchy, adjustable margins, dark paper tones, and customizable reading modes.",
      "Synthesized usability feedback through Hotjar session audits and remote testing, identifying navigation bottlenecks in bookmarking and audio sync.",
      "Engineered an audio-to-text live switching flow that enables readers to alternate between listening and reading without losing progress.",
    ],
    responsibilities: [
      "User Persona Development & Empathy Mapping",
      "Typographic & Reader UI System Design",
      "Interactive Wireframing & Usability Validation",
      "Audio Player Interaction Architecture",
      "Design Documentation & Guidelines",
    ],
    challenge: "Digital readers suffered from visual eye fatigue, fragmented audio synchronization, and cluttered book discovery catalogues that stalled content exploration.",
    constraints: [
      "Low-latency audio-text timeline synchronization",
      "Readability across small mobile displays under direct sunlight",
      "Offline reading state architecture",
    ],
    solution: [
      {
        group: "Distraction-Free Reading Mode",
        note: "Ergonomic viewing UI",
        items: [
          "Dynamic typography and line-height controls",
          "Sepia, OLED Black, and high-contrast paper themes",
          "Gesture-based page turning and progress scrubbing",
          "Contextual dictionary and text-highlighter toolbars",
        ],
      },
      {
        group: "Hybrid Audio/E-Book Player",
        note: "Seamless media switching",
        items: [
          "Persistent mini-player with scrubber",
          "Whispersync timeline tracking",
          "Sleep timer & variable playback speeds",
          "Smart library filtering by genre and reading mood",
        ],
      },
    ],
    impact: [
      {
        group: "Reader Retention",
        items: [
          "48% increase in average reading session length",
          "62% user preference for custom hybrid audio player over standard controls",
          "High satisfaction score (4.8/5) in post-launch usability tests",
        ],
      },
    ],
  },
  {
    id: "multi-platform-ui-suite",
    index: "03",
    title: "Modular UI Suite & Component Architecture",
    subtitle: "Enterprise-scale UI kits and component frameworks designed for cross-device scalability and developer velocity.",
    preview: "Creating reusable component ecosystems, interaction libraries, and documentation for web and mobile products.",
    company: "Design Engineering",
    year: "2022 — 2023",
    role: "Senior UI/UX Specialist",
    tags: ["Component Libraries", "Dev Handoff", "Design Tokens", "A/B Testing", "Responsive Web"],
    detailTitle: "Scalable Enterprise UI Library & Multi-Platform Pattern Kit",
    detailSubtitle: "A modular, tokenized design framework built to bridge UI components, accessibility standards, and clean code implementation.",
    heroImage: "/assets/uikit_hero.png",
    screens: [
      { title: "Atomic Tokens & Theme Palette", src: "/assets/uikit_screen1.png" },
      { title: "Component Variants & Responsive Grids", src: "/assets/uikit_screen2.png" },
      { title: "Interactive Modal & Form Systems", src: "/assets/uikit_screen3.png" },
    ],
    overview: [
      "Engineered a multi-platform UI kit containing 250+ responsive components, nested variants, and semantic design tokens.",
      "Established comprehensive design documentation including component states, autolayout guidelines, and code snippet references.",
      "Conducted A/B testing and quantitative user tracking (GA4 & Hotjar) to refine responsive card layouts, tables, and modal workflows.",
      "Aligned UX standards across web, tablet, and mobile breakpoints to ensure flawless layout parity and fast prototyping cycles.",
    ],
    responsibilities: [
      "Multi-Tier Component Library Architecture",
      "Tokenization (Colors, Spacing, Typography)",
      "Cross-Platform Responsive Layout QA",
      "Behavioral Analytics & Conversion Optimization",
      "Storybook & Component State Alignment",
    ],
    challenge: "Rapidly scaling teams built redundant UI elements with inconsistent states, ballooning technical debt and causing visual fragmentation across products.",
    constraints: [
      "Support for responsive desktop web, tablet, and iOS/Android viewport sizes",
      "Zero-dependency component styling",
      "Strict brand and accessibility token enforcement",
    ],
    solution: [
      {
        group: "Atomic Design System",
        items: [
          "Global token palette (color, radius, elevation)",
          "Universal forms with instant validation states",
          "Dynamic tables with sorting and multi-select",
          "Modular navigation bars and responsive drawers",
        ],
      },
      {
        group: "Handoff & Governance",
        items: [
          "Storybook component mapping",
          "Figma component playground with variant properties",
          "Strict version control & change-log system",
          "Automated contrast validation checklists",
        ],
      },
    ],
    impact: [
      {
        group: "Productivity & Quality",
        items: [
          "50%+ faster turnaround time from concept to high-fi prototype",
          "Elimination of redundant CSS and styling inconsistencies",
          "Adopted across multiple web and mobile application builds",
        ],
      },
    ],
  },
];

const EXPERIENCE = [
  {
    co: "Figma",
    role: "Product Designer",
    period: "Jun 2025 — Present",
    industry: "Design Systems & Product Experience · USA / Remote",
    desc: "Designed user-centered workflows across web and digital experiences. Built and maintained scalable design systems, tokens, and variables. Partnered with engineers via Figma Dev Mode to strengthen design-to-development handoffs, while using Google Analytics and Mixpanel to drive data-informed improvements.",
    tags: ["Figma Dev Mode", "Design Systems", "Design Tokens", "GA4", "Mixpanel", "WCAG"],
  },
  {
    co: "TikTok",
    role: "User Experience Designer",
    period: "Jul 2024 — May 2025",
    industry: "Social & Content Platforms · USA / Remote",
    desc: "Created user-centered product experiences for social and content-focused features. Translated user research and persona studies into flows, mockups, and interactive prototypes. Supported design QA, accessibility compliance, and cross-functional Agile sprints.",
    tags: ["User Research", "Interaction Design", "Prototyping", "Usability Testing", "Agile"],
  },
  {
    co: "KV Graphics",
    role: "UI/UX Designer",
    period: "Aug 2020 — Jul 2023",
    industry: "B2C SaaS Products · Hyderabad, India",
    desc: "Designed and launched 2 B2C SaaS platforms end-to-end, contributing to a 58% increase in active users in 3 months. Analyzed user sessions with Hotjar and Google Analytics to optimize user flows, while building reusable component libraries for responsive web and mobile applications.",
    tags: ["B2C SaaS", "58% Growth", "Hotjar", "Google Analytics", "Component Library", "Wireframing"],
  },
];

const SKILLS = [
  {
    cat: "UX Research & Strategy",
    items: [
      "User-Centered Design",
      "User Interviews & Surveys",
      "Persona Development",
      "User Journey Mapping",
      "Usability Testing & Heuristics",
      "Product Discovery & Thinking",
    ],
  },
  {
    cat: "UI & Interaction Design",
    items: [
      "UI & Interaction Design",
      "Wireframing & Prototyping",
      "Information Architecture",
      "Visual & Content Hierarchy",
      "Responsive Web & Mobile",
      "WCAG & Accessibility-First",
    ],
  },
  {
    cat: "Design Systems & Dev",
    items: [
      "UI Component Libraries",
      "Design Tokens & Variables",
      "Figma Dev Mode & Annotations",
      "HTML5 / CSS3 / JavaScript",
      "Design QA & Spec Sheets",
      "Version Control (GitHub / VS Code)",
    ],
  },
  {
    cat: "Tools & Analytics",
    items: [
      "Figma & FigJam",
      "Sketch & Adobe XD",
      "Google Analytics (GA4) & Mixpanel",
      "Hotjar & A/B Testing",
      "Jira, Confluence & Miro",
      "Balsamiq & InVision",
    ],
  },
];

const EDUCATION = [
  {
    degree: "Master of Science in Information Systems",
    school: "Saint Louis University",
    loc: "St. Louis, MO, USA",
    period: "Aug 2023 – May 2025",
  },
  {
    degree: "Bachelor of Technology in Electrical & Electronics Engineering",
    school: "Andhra University",
    loc: "Andhra Pradesh, India",
    period: "Jun 2019 – Jul 2022",
  },
];

/* ─────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────── */
function useScrollReveal(dep) {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.visible)");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return scrolled;
}

function useInView(threshold = 0.18) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─────────────────────────────────────────────
   NAV
───────────────────────────────────────────── */
function Nav({ page, go }) {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const links = [
    { label: "About", p: "about" },
    { label: "Work", p: "home" },
    { label: "Experience", p: "experience" },
    { label: "Contact", p: "contact" },
  ];
  const nav = (p) => {
    go(p);
    setOpen(false);
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "border-color .3s, backdrop-filter .3s, background .3s",
        background: scrolled
          ? "color-mix(in srgb, var(--bg) 82%, transparent)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled
          ? "1px solid var(--line)"
          : "1px solid transparent",
      }}
    >
      <div
        className="wrap"
        style={{
          height: 70,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={() => nav("home")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              width: 9,
              height: 9,
              background: "var(--grad)",
              borderRadius: 2,
              display: "inline-block",
            }}
          />
          <span
            className="font-display"
            style={{
              fontSize: 17,
              fontWeight: 600,
              color: "var(--ink)",
              letterSpacing: "-0.02em",
            }}
          >
            Ganesh
            <span style={{ color: "var(--ink-muted)", fontWeight: 400 }}>.</span>
          </span>
        </button>

        <nav
          className="desktop-nav"
          style={{ display: "flex", gap: 30, alignItems: "center" }}
        >
          {links.map(({ label, p }) => (
            <button
              key={p}
              onClick={() => nav(p)}
              className={`nav-link hover-line${page === p ? " grad-text" : ""}`}
              style={{ color: page === p ? undefined : "var(--ink-soft)" }}
            >
              {label}
            </button>
          ))}
          <button
            className="btn btn-fill"
            onClick={() => nav("contact")}
            style={{ padding: "9px 16px" }}
          >
            Get In Touch
          </button>
        </nav>

        <button
          className="mobile-menu"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span
            style={{
              transform: open ? "rotate(45deg) translateY(6px)" : "none",
            }}
          />
          <span style={{ opacity: open ? 0 : 1 }} />
          <span
            style={{
              transform: open ? "rotate(-45deg) translateY(-6px)" : "none",
            }}
          />
        </button>
      </div>

      {open && (
        <div
          style={{
            background: "var(--bg)",
            borderTop: "1px solid var(--line)",
            padding: "22px 22px 30px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {links.map(({ label, p }) => (
            <button
              key={p}
              onClick={() => nav(p)}
              className={page === p ? "grad-text" : ""}
              style={{
                background: "none",
                border: "none",
                textAlign: "left",
                padding: "12px 0",
                fontSize: 26,
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                color: page === p ? undefined : "var(--ink)",
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          ))}
          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 16,
              alignItems: "center",
            }}
          >
            <button className="btn btn-fill" onClick={() => nav("contact")}>
              Get In Touch
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

/* ─────────────────────────────────────────────
   SECTION HEADER
───────────────────────────────────────────── */
function SectionHead({ kicker, title, em, right }) {
  return (
    <div
      className="reveal"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        flexWrap: "wrap",
        gap: 16,
        marginBottom: 44,
      }}
    >
      <div>
        <span className="eyebrow">{kicker}</span>
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(28px,4.2vw,46px)",
            fontWeight: 600,
            letterSpacing: "-0.025em",
            marginTop: 14,
            lineHeight: 1.08,
          }}
        >
          {title}
          {em && (
            <em
              style={{
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--ink-soft)",
              }}
            >
              {" "}
              {em}
            </em>
          )}
        </h2>
      </div>
      {right && (
        <span
          className="font-mono"
          style={{ fontSize: 12, color: "var(--ink-muted)" }}
        >
          {right}
        </span>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO VISUAL ORBIT
───────────────────────────────────────────── */
const HERO_SKILLS = [
  { label: "Figma Dev Mode", orbit: 2, angle: 0, tier: "m", fdur: 12, fdelay: 0 },
  { label: "UX Research", orbit: 2, angle: 72, tier: "m", fdur: 14, fdelay: 1.5 },
  { label: "Design Systems", orbit: 2, angle: 144, tier: "m", fdur: 13, fdelay: 2.1 },
  { label: "Interaction Design", orbit: 2, angle: 216, tier: "t", fdur: 15, fdelay: 0.4 },
  { label: "Usability Testing", orbit: 2, angle: 288, tier: "t", fdur: 11.5, fdelay: 1.0 },
  { label: "Design Tokens", orbit: 3, angle: 36, tier: "d", fdur: 16, fdelay: 0.8 },
  { label: "GA4 & Mixpanel", orbit: 3, angle: 108, tier: "d", fdur: 14.5, fdelay: 0.6 },
  { label: "WCAG Accessibility", orbit: 3, angle: 180, tier: "d", fdur: 13.5, fdelay: 2.4 },
  { label: "A/B Testing", orbit: 3, angle: 252, tier: "d", fdur: 15.5, fdelay: 1.2 },
  { label: "SaaS Product Design", orbit: 3, angle: 324, tier: "d", fdur: 12.5, fdelay: 1.8 },
];

const HERO_ORBITS = {
  1: { frac: 0.16, spin: 84, dir: "reverse", nodeAngle: 210 },
  2: { frac: 0.355, spin: 72, dir: "normal", nodeAngle: 30 },
  3: { frac: 0.5, spin: 72, dir: "normal", nodeAngle: 160 },
};

function HeroOrbit({ n }) {
  const o = HERO_ORBITS[n];
  const cdir = o.dir === "reverse" ? "normal" : "reverse";
  const cards = HERO_SKILLS.filter((s) => s.orbit === n);
  return (
    <div
      className={`hv-orbit hv-orbit-${n}`}
      style={{
        "--spin": `${o.spin}s`,
        "--dir": o.dir,
        "--cdir": cdir,
        "--rad": `calc(var(--stage) * ${o.frac})`,
      }}
    >
      <div className="hv-ringline" />
      <div className="hv-lightarm" style={{ "--a": `${o.nodeAngle}deg` }}>
        <span className="hv-lightnode" />
      </div>
      {cards.map((s) => (
        <div
          className="hv-arm"
          key={s.label}
          data-tier={s.tier}
          style={{ "--a": `${s.angle}deg` }}
        >
          <div className="hv-armlen">
            <div className="hv-cspin">
              <div className="hv-cangle" style={{ "--a": `${s.angle}deg` }}>
                <div
                  className="hv-float"
                  style={{
                    "--fdur": `${s.fdur}s`,
                    "--fdelay": `${s.fdelay}s`,
                  }}
                >
                  <span className="hv-card">
                    <span className="hv-pip" />
                    <span className="hv-label">{s.label}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function HeroVisual() {
  const MOBILE = ["Design Systems", "UX Research", "Figma Dev Mode"];
  return (
    <Fragment>
      <style>{`
        .hero-visual {
          position: absolute; top: 0; bottom: 0; left: 50%;
          width: 100%; max-width: 1180px; transform: translateX(-50%);
          padding: 0 40px;
          display: flex; align-items: center; justify-content: flex-end;
          pointer-events: none; z-index: 1;
        }
        .hv-stage {
          --stage: clamp(380px, 38vw, 405px);
          position: relative; flex: none;
          width: min(var(--stage), calc(100% - 700px));
          height: min(var(--stage), calc(100% - 700px));
          aspect-ratio: 1 / 1;
          margin-top: clamp(0px, 1.5vh, 18px);
          will-change: transform, opacity;
          animation: hvAppear 1.1s cubic-bezier(0.16,1,0.3,1) 0.45s both;
        }
        @keyframes hvAppear { from { opacity: 0; transform: scale(0.94); } to { opacity: 1; transform: scale(1); } }
        .hv-core { position: absolute; left: 50%; top: 50%; width: 26%; height: 26%; transform: translate(-50%,-50%); }
        .hv-core-glow {
          position: absolute; left: 50%; top: 50%; width: 320%; height: 320%;
          transform: translate(-50%,-50%); border-radius: 50%;
          background: radial-gradient(circle, var(--grad-soft) 0%, rgba(255,106,0,0.10) 36%, transparent 70%);
          filter: blur(6px); animation: hvGlow 7s ease-in-out infinite;
        }
        @keyframes hvGlow { 0%,100% { opacity: 0.6; } 50% { opacity: 0.9; } }
        .hv-core-orb {
          position: absolute; inset: 0; border-radius: 50%;
          background:
            radial-gradient(circle at 36% 30%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.55) 14%, transparent 42%),
            radial-gradient(circle at 50% 50%, rgba(255,150,90,0.45) 0%, rgba(238,9,121,0.40) 52%, rgba(238,9,121,0.08) 78%, transparent 100%);
          box-shadow: 0 0 40px -6px rgba(238,9,121,0.45), inset 0 0 18px -4px rgba(255,255,255,0.55);
          animation: hvPulse 8s ease-in-out infinite;
        }
        @keyframes hvPulse { 0%,100% { transform: scale(0.98); } 50% { transform: scale(1.02); } }
        .hv-orbit { position: absolute; inset: 0; will-change: transform;
          animation: hvSpin var(--spin) linear infinite; animation-direction: var(--dir); }
        @keyframes hvSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .hv-ringline {
          position: absolute; left: 50%; top: 50%;
          width: calc(var(--rad) * 2); height: calc(var(--rad) * 2);
          transform: translate(-50%,-50%); border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.07);
        }
        .hv-lightarm { position: absolute; left: 50%; top: 50%; width: 0; height: 0; transform: rotate(var(--a)); }
        .hv-lightnode {
          position: absolute; left: 0; top: 0; width: 3px; height: 3px; border-radius: 50%; margin: -1.5px;
          transform: translateY(calc(-1 * var(--rad)));
          background: rgba(255,255,255,0.7);
          box-shadow: 0 0 8px 1px rgba(255,160,90,0.6); opacity: 0.5;
        }
        .hv-arm { position: absolute; left: 50%; top: 50%; width: 0; height: 0; transform: rotate(var(--a)); }
        .hv-armlen { position: absolute; left: 0; top: 0; transform: translateY(calc(-1 * var(--rad))); }
        .hv-cspin { animation: hvSpin var(--spin) linear infinite; animation-direction: var(--cdir); }
        .hv-cangle { transform: rotate(calc(-1 * var(--a))); }
        .hv-float { animation: hvFloat var(--fdur) ease-in-out var(--fdelay) infinite alternate; }
        @keyframes hvFloat { from { transform: translateY(-4px); } to { transform: translateY(4px); } }

        .hv-card {
          position: absolute; left: 0; top: 0; transform: translate(-50%,-50%);
          display: inline-flex; align-items: center; gap: 6px;
          max-width: 104px; padding: 6px 10px; border-radius: 14px;
          background: rgba(255,255,255,0.045); border: 1px solid rgba(255,255,255,0.10);
          backdrop-filter: blur(9px); pointer-events: auto; cursor: default;
          box-shadow: 0 8px 22px -14px rgba(0,0,0,0.8);
          transition: transform .25s ease, background .25s;
        }
        .hv-card:hover { transform: translate(-50%,-50%) translateY(-4px) scale(1.02); background: rgba(255,255,255,0.08); }
        .hv-pip { flex: none; width: 6px; height: 6px; border-radius: 50%; background: var(--grad); }
        .hv-label { font-family: 'JetBrains Mono', monospace; font-size: 9.5px; line-height: 1.25; color: var(--ink-soft); }

        @media (max-width: 1179px) {
          .hv-stage { --stage: clamp(280px, 34vw, 360px); width: min(var(--stage), calc(100% - 650px)); height: min(var(--stage), calc(100% - 650px)); }
          .hv-orbit-3 { display: none; }
          .hv-arm[data-tier="d"] { display: none; }
        }
        .hv-mobile { display: none; }
        @media (max-width: 1023px) {
          .hero-visual { display: none; }
          .hv-mobile { display: block; position: absolute; top: 60px; right: 12px; width: 130px; height: 200px; }
          .hv-m-card {
            position: absolute; display: inline-flex; align-items: center; gap: 6px;
            padding: 6px 10px; border-radius: 14px; background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.09); backdrop-filter: blur(8px);
            opacity: 0; animation: hvMobileFade 9s ease-in-out infinite;
          }
          .hv-m-card:nth-child(2) { top: 0; right: 0; animation-delay: 0s; }
          .hv-m-card:nth-child(3) { top: 70px; right: 30px; animation-delay: 1.6s; }
          .hv-m-card:nth-child(4) { top: 140px; right: 4px; animation-delay: 3.2s; }
          @keyframes hvMobileFade { 0%, 100% { opacity: 0.18; } 50% { opacity: 0.62; } }
        }
      `}</style>

      <div className="hero-visual" aria-hidden="true">
        <div className="hv-stage">
          <div className="hv-core">
            <div className="hv-core-glow" />
            <div className="hv-core-orb" />
          </div>
          <HeroOrbit n={3} />
          <HeroOrbit n={2} />
          <HeroOrbit n={1} />
        </div>
      </div>

      <div className="hv-mobile" aria-hidden="true">
        {MOBILE.map((label) => (
          <span className="hv-m-card" key={label}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--grad)",
              }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9.5,
                color: "var(--ink-soft)",
              }}
            >
              {label}
            </span>
          </span>
        ))}
      </div>
    </Fragment>
  );
}

/* ─────────────────────────────────────────────
   REVEAL / SAFE IMAGE COMPONENT
   Auto-handles missing image paths with a clean preview card
───────────────────────────────────────────── */
function SafeImage({ src, alt, style, className }) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        style={{
          width: "100%",
          minHeight: 220,
          background: "linear-gradient(135deg, #18181b 0%, #09090b 100%)",
          border: "1px dashed var(--line-strong)",
          borderRadius: 14,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          color: "var(--ink-muted)",
          textAlign: "center",
          ...style,
        }}
      >
        <span style={{ fontSize: 24, marginBottom: 8 }}>🖼️</span>
        <span className="font-mono" style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          {alt || "Product Mockup Screen"}
        </span>
        <span className="font-mono" style={{ fontSize: 9.5, color: "var(--ink-soft)", marginTop: 4 }}>
          {src ? src : "Place asset in public/assets/"}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setError(true)}
      className={className}
      style={{
        display: "block",
        width: "100%",
        height: "auto",
        borderRadius: 14,
        border: "1px solid var(--line)",
        background: "var(--surface)",
        boxShadow: "0 24px 60px -20px rgba(0,0,0,0.6)",
        objectFit: "cover",
        ...style,
      }}
    />
  );
}

/* ─────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────── */
function HomePage({ go, openCase }) {
  useScrollReveal("home");
  return (
    <main style={{ paddingTop: 70 }}>
      {/* HERO */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        <div className="hero-grid" />
        <div
          className="hero-glow"
          style={{ top: -120, left: "50%", transform: "translateX(-50%)" }}
        />
        <div
          className="wrap"
          style={{
            position: "relative",
            zIndex: 1,
            padding: "104px 40px 96px",
          }}
        >
          <div className="anim-up d1" style={{ marginBottom: 26 }}>
            <span className="eyebrow">
              {PROFILE.title} · {PROFILE.location}
            </span>
          </div>
          <h1
            className="font-display anim-up d2"
            style={{
              fontSize: "clamp(40px,7.4vw,96px)",
              fontWeight: 600,
              lineHeight: 1.0,
              letterSpacing: "-0.035em",
              maxWidth: 1000,
            }}
          >
            {PROFILE.name}
          </h1>
          <div
            className="anim-up d3"
            style={{
              marginTop: 40,
              display: "flex",
              flexDirection: "column",
              gap: 22,
            }}
          >
            <p
              style={{
                fontSize: 18,
                fontWeight: 300,
                color: "var(--ink-soft)",
                lineHeight: 1.7,
                maxWidth: 620,
              }}
            >
              Product Designer and UX/UI professional with 5+ years of experience
              designing user-centered digital products and SaaS experiences across
              web and mobile platforms[cite: 1].
            </p>
            <p
              style={{
                fontSize: 18,
                fontWeight: 300,
                color: "var(--ink-soft)",
                lineHeight: 1.7,
                maxWidth: 620,
              }}
            >
              I translate user research, business requirements, and product goals
              into{" "}
              <em
                className="grad-text"
                style={{ fontStyle: "italic", fontWeight: 400 }}
              >
                intuitive, scalable, and accessible experiences
              </em>{" "}
              through end-to-end product design lifecycles[cite: 1].
            </p>
            <div
              style={{
                display: "flex",
                gap: 14,
                flexWrap: "wrap",
                marginTop: 10,
              }}
            >
              <button
                className="btn btn-fill"
                onClick={() =>
                  document.getElementById("work")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                View Case Studies <span>↓</span>
              </button>
              <a
                className="btn btn-ghost"
                href={PROFILE.resume}
                download="Ganesh_Resume.pdf"
              >
                Download Resume
              </a>
            </div>
          </div>

          {/* Stats */}
          <div
            className="anim-up d4"
            style={{
              display: "flex",
              gap: 44,
              marginTop: 76,
              paddingTop: 40,
              borderTop: "1px solid var(--line)",
              flexWrap: "wrap",
            }}
          >
            {STATS.map(({ n, l }) => (
              <div key={l}>
                <div
                  className="font-display grad-text"
                  style={{
                    fontSize: 34,
                    fontWeight: 600,
                    letterSpacing: "-0.03em",
                    display: "inline-block",
                  }}
                >
                  {n}
                </div>
                <div
                  className="font-mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--ink-muted)",
                    marginTop: 6,
                  }}
                >
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
        <HeroVisual />
      </section>

      {/* WORK / CASE STUDIES */}
      <section id="work" className="wrap" style={{ padding: "92px 40px 40px" }}>
        <SectionHead
          kicker="Selected Work"
          title="Featured Case Studies"
          right="2020 — Present"
        />
      </section>
      <div
        className="wrap"
        style={{
          borderTop: "1px solid var(--line)",
          paddingLeft: 40,
          paddingRight: 40,
        }}
      >
        {CASE_STUDIES.map((cs) => (
          <div
            key={cs.id}
            className="work-row reveal"
            style={{ borderBottom: "1px solid var(--line)", cursor: "pointer" }}
            onClick={() => openCase(cs)}
          >
            <div className="cs-grid">
              <span
                className="font-mono idx grad-text"
                style={{ fontSize: 13 }}
              >
                {cs.index}
              </span>
              <div className="cs-body">
                <h3
                  className="font-display"
                  style={{
                    fontSize: "clamp(20px,3vw,30px)",
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {cs.title}
                </h3>
                <p
                  style={{
                    fontSize: 14.5,
                    color: "var(--ink-soft)",
                    marginTop: 6,
                    lineHeight: 1.5,
                  }}
                >
                  {cs.subtitle}
                </p>
                <p
                  style={{
                    fontSize: 13.5,
                    color: "var(--ink-muted)",
                    marginTop: 8,
                    lineHeight: 1.6,
                  }}
                >
                  {cs.preview}
                </p>
                <div
                  className="font-mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--ink-muted)",
                    marginTop: 14,
                  }}
                >
                  Role · <span style={{ color: "var(--ink-soft)" }}>{cs.role}</span>
                  {"  "}·{"  "}
                  Company ·{" "}
                  <span style={{ color: "var(--ink-soft)" }}>{cs.company}</span>
                </div>
              </div>
              <div className="cs-tags">
                {cs.tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
              <div className="arrow" style={{ fontSize: 22 }}>
                →
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ABOUT SNIPPET */}
      <section
        className="wrap grid-2"
        style={{
          padding: "104px 40px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 72,
          alignItems: "center",
        }}
      >
        <div className="reveal">
          <span className="eyebrow">About Me</span>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(26px,3.6vw,42px)",
              fontWeight: 600,
              letterSpacing: "-0.025em",
              lineHeight: 1.14,
              marginTop: 14,
              marginBottom: 22,
            }}
          >
            Balancing user empathy with{" "}
            <em
              style={{
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--ink-soft)",
              }}
            >
              business & engineering velocity.
            </em>
          </h2>
          <p
            style={{
              fontSize: 16,
              fontWeight: 300,
              color: "var(--ink-soft)",
              lineHeight: 1.8,
              marginBottom: 18,
            }}
          >
            Experienced in building design systems, reusable component
            libraries, design tokens, and interaction patterns while applying
            WCAG and accessibility-first principles[cite: 1].
          </p>
          <p
            style={{
              fontSize: 16,
              fontWeight: 300,
              color: "var(--ink-soft)",
              lineHeight: 1.8,
              marginBottom: 30,
            }}
          >
            A collaborative partner to Product Managers, Engineers, and UX
            Researchers with hands-on experience driving Agile sprints, Figma
            Dev Mode handoffs, and behavioral analytics via Mixpanel and GA4[cite: 1].
          </p>
          <button className="btn btn-ghost" onClick={() => go("about")}>
            Read full background →
          </button>
        </div>
        <div className="portrait reveal">
          <SafeImage src={PORTRAIT} alt="Ganesh - Senior Product Designer" />
          <div className="caption">
            <span className="cap-name">Ganesh</span>
            <span className="cap-loc">Senior Product Designer</span>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section
        className="wrap"
        style={{
          padding: "118px 40px",
          textAlign: "center",
          borderTop: "1px solid var(--line)",
        }}
      >
        <div className="reveal" style={{ maxWidth: 660, margin: "0 auto" }}>
          <span
            className="eyebrow"
            style={{ justifyContent: "center", display: "inline-flex" }}
          >
            Contact
          </span>
          <h2
            className="font-display grad-text"
            style={{
              fontSize: "clamp(34px,6vw,66px)",
              fontWeight: 600,
              letterSpacing: "-0.035em",
              lineHeight: 1.04,
              marginTop: 18,
              marginBottom: 26,
            }}
          >
            Let's Design Scalable Products
          </h2>
          <p
            style={{
              fontSize: 17,
              fontWeight: 300,
              color: "var(--ink-soft)",
              lineHeight: 1.7,
              marginBottom: 36,
            }}
          >
            Looking for an experienced Senior Product Designer who can turn
            complex workflows into high-converting products? Let's talk.
          </p>
          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button className="btn btn-fill" onClick={() => go("contact")}>
              Get in touch →
            </button>
            <a
              className="btn btn-ghost"
              href={PROFILE.resume}
              download="Ganesh_Resume.pdf"
            >
              Download Resume
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ─────────────────────────────────────────────
   ECOSYSTEM COMPONENT
───────────────────────────────────────────── */
function EcosystemFlow() {
  const [ref, inView] = useInView(0.16);
  const nodes = [
    { title: "User Discovery", desc: "Interviews, surveys & personas[cite: 1]." },
    { title: "FigJam Ideation", desc: "Journey maps & architecture[cite: 1].", core: true },
    { title: "Figma Prototyping", desc: "Design tokens & interactive UI[cite: 1].", core: true },
    { title: "Usability Testing", desc: "Heuristic evaluation & QA[cite: 1]." },
    { title: "Figma Dev Mode", desc: "Annotations & code specs[cite: 1].", core: true },
    { title: "GA4 / Mixpanel", desc: "A/B metrics & continuous growth[cite: 1]." },
  ];

  return (
    <div className={`eco-section${inView ? " eco-in" : ""}`} ref={ref}>
      <div className="eco-bg" aria-hidden="true">
        <div className="eco-grid" />
        <div className="eco-glow" />
      </div>

      <div
        className="wrap"
        style={{
          position: "relative",
          zIndex: 1,
          padding: "96px 40px",
        }}
      >
        <div
          className="eco-head"
          style={{
            textAlign: "center",
            maxWidth: 640,
            margin: "0 auto 58px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <span className="eyebrow">Design Workflow</span>
          </div>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(30px,5vw,56px)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              marginTop: 14,
              lineHeight: 1.05,
            }}
          >
            From Discovery <span className="grad-text">to Production QA</span>
          </h2>
          <p
            style={{
              fontSize: 16,
              fontWeight: 300,
              color: "var(--ink-soft)",
              lineHeight: 1.7,
              marginTop: 18,
            }}
          >
            An end-to-end product design lifecycle driven by behavioral data,
            reusable design tokens, and seamless engineering handoffs[cite: 1].
          </p>
        </div>

        <div className="eco-track">
          {nodes.map((n, i) => (
            <Fragment key={i}>
              <div
                className={`eco-card${n.core ? " eco-core" : ""}`}
                style={{
                  transitionDelay: inView ? `${120 + i * 90}ms` : "0ms",
                }}
              >
                {n.core && <span className="eco-badge">Core Engine</span>}
                <div className="eco-title font-display">{n.title}</div>
                <div className="eco-desc">{n.desc}</div>
              </div>
              {i < nodes.length - 1 && (
                <div
                  className="eco-line"
                  style={{
                    transitionDelay: inView ? `${170 + i * 90}ms` : "0ms",
                  }}
                >
                  <span
                    className="eco-pulse"
                    style={{ animationDelay: `${i * 0.32}s` }}
                  />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CASE STUDY PAGE (With Fixed Universal Showcase)
───────────────────────────────────────────── */
function CaseStudyPage({ cs, go, openCase }) {
  const nextIdx =
    (CASE_STUDIES.findIndex((c) => c.id === cs.id) + 1) % CASE_STUDIES.length;
  const next = CASE_STUDIES[nextIdx];
  const Bullet = ({ ch = "→" }) => (
    <span
      className="grad-text"
      style={{ fontWeight: 700, flexShrink: 0 }}
    >
      {ch}
    </span>
  );

  return (
    <main className="cs-static" style={{ paddingTop: 70 }}>
      {/* CASE HERO */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div className="hero-grid" />
        <div
          className="wrap"
          style={{
            position: "relative",
            zIndex: 1,
            paddingTop: 52,
            paddingBottom: 40,
          }}
        >
          <button
            onClick={() => go("home")}
            className="nav-link anim-in"
            style={{ marginBottom: 30 }}
          >
            ← Back to all work
          </button>
          <div
            className="anim-up d1 font-mono"
            style={{ fontSize: 13, marginBottom: 14 }}
          >
            <span className="grad-text" style={{ fontWeight: 600 }}>
              {cs.index}
            </span>
            <span style={{ color: "var(--ink-muted)" }}> / {cs.company}</span>
          </div>
          <h1
            className="font-display anim-up d2"
            style={{
              fontSize: "clamp(34px,4.6vw,62px)",
              fontWeight: 600,
              letterSpacing: "-0.04em",
              lineHeight: 1.04,
              maxWidth: 820,
            }}
          >
            {cs.detailTitle || cs.title}
          </h1>
          <p
            className="anim-up d3"
            style={{
              fontSize: 17,
              fontWeight: 300,
              color: "var(--ink-soft)",
              lineHeight: 1.6,
              marginTop: 18,
              maxWidth: 680,
            }}
          >
            {cs.detailSubtitle || cs.subtitle}
          </p>
          <div
            className="anim-up d4"
            style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 26 }}
          >
            {cs.tags.map((t) => (
              <span key={t} className="tag grad-text">
                {t}
              </span>
            ))}
          </div>
          <div
            className="anim-up d5"
            style={{
              display: "flex",
              gap: 44,
              marginTop: 30,
              paddingTop: 24,
              borderTop: "1px solid var(--line)",
            }}
          >
            <div>
              <div
                className="font-mono"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--ink-muted)",
                  marginBottom: 6,
                }}
              >
                Role
              </div>
              <div style={{ fontSize: 14, color: "var(--ink)" }}>{cs.role}</div>
            </div>
            <div>
              <div
                className="font-mono"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--ink-muted)",
                  marginBottom: 6,
                }}
              >
                Timeline
              </div>
              <div style={{ fontSize: 14, color: "var(--ink)" }}>{cs.year}</div>
            </div>
          </div>
        </div>

        {/* HERO SHOWCASE IMAGE (Always visible) */}
        <div
          className="wrap hero-in"
          style={{ position: "relative", zIndex: 1, paddingBottom: 60 }}
        >
          <div style={{ maxWidth: 920, margin: "0 auto" }}>
            <SafeImage
              src={cs.heroImage}
              alt={`${cs.title} Hero Showcase`}
              style={{ maxHeight: 520, objectFit: "cover" }}
            />
          </div>
        </div>
      </div>

      {/* OVERVIEW & RESPONSIBILITIES */}
      <div
        className="wrap grid-2"
        style={{
          padding: "78px 40px",
          display: "grid",
          gridTemplateColumns: "1.5fr 0.55fr",
          gap: 64,
          alignItems: "start",
        }}
      >
        <div>
          <span className="eyebrow">Overview</span>
          {cs.overview.map((para, i) => (
            <p
              key={i}
              style={{
                fontSize: i === 0 ? 21 : 16,
                fontWeight: i === 0 ? 400 : 300,
                color: i === 0 ? "var(--ink)" : "var(--ink-soft)",
                lineHeight: 1.7,
                marginTop: i === 0 ? 18 : 14,
              }}
            >
              {para}
            </p>
          ))}
        </div>
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--line)",
            borderRadius: 14,
            padding: "26px 24px",
          }}
        >
          <div
            className="font-mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--ink-muted)",
              marginBottom: 8,
            }}
          >
            Core Responsibilities
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {cs.responsibilities.map((it) => (
              <div
                key={it}
                style={{
                  display: "flex",
                  gap: 9,
                  alignItems: "baseline",
                  fontSize: 14,
                  color: "var(--ink-soft)",
                }}
              >
                <Bullet />
                {it}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ECOSYSTEM FLOW */}
      {cs.ecosystemFlow && <EcosystemFlow />}

      {/* DYNAMIC SCREEN GALLERY SECTION */}
      {cs.screens && cs.screens.length > 0 && (
        <div
          style={{
            background: "var(--bg-2)",
            borderTop: "1px solid var(--line)",
            borderBottom: "1px solid var(--line)",
          }}
        >
          <div className="wrap" style={{ padding: "80px 40px" }}>
            <span className="eyebrow">Product UI Breakdown</span>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(26px,4vw,42px)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                marginTop: 14,
                marginBottom: 36,
              }}
            >
              Interface Design & Key Flows
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 28,
              }}
            >
              {cs.screens.map((screen, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--line)",
                    borderRadius: 16,
                    padding: 16,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <SafeImage
                    src={screen.src}
                    alt={screen.title}
                    style={{ maxHeight: 380, objectFit: "cover" }}
                  />
                  <div
                    className="font-display"
                    style={{
                      fontSize: 15,
                      fontWeight: 500,
                      color: "var(--ink)",
                      marginTop: 14,
                    }}
                  >
                    {screen.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CHALLENGE & CONSTRAINTS */}
      {cs.challenge && (
        <div
          className="wrap grid-2"
          style={{
            padding: "78px 40px",
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: 64,
            alignItems: "start",
          }}
        >
          <div>
            <span className="eyebrow">The Challenge</span>
            <p
              className="font-display"
              style={{
                fontSize: "clamp(20px,2.8vw,28px)",
                fontWeight: 400,
                fontStyle: "italic",
                color: "var(--ink)",
                lineHeight: 1.5,
                marginTop: 16,
              }}
            >
              "{cs.challenge}"
            </p>
          </div>
          <div>
            <span className="eyebrow">Constraints & Requirements</span>
            <div style={{ marginTop: 16 }}>
              {cs.constraints.map((c) => (
                <div
                  key={c}
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "baseline",
                    padding: "11px 0",
                    borderBottom: "1px solid var(--line)",
                    fontSize: 15,
                    color: "var(--ink-soft)",
                    fontWeight: 300,
                  }}
                >
                  <Bullet ch="—" />
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SOLUTION */}
      {cs.solution && (
        <div
          style={{
            background: "var(--surface)",
            borderTop: "1px solid var(--line)",
            borderBottom: "1px solid var(--line)",
          }}
        >
          <div className="wrap" style={{ padding: "82px 40px" }}>
            <span className="eyebrow">The Solution</span>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(26px,4vw,44px)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                marginTop: 14,
                marginBottom: 44,
              }}
            >
              What Was Architected & Delivered
            </h2>
            <div
              className="cs-2col"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 20,
              }}
            >
              {cs.solution.map((g) => (
                <div
                  key={g.group}
                  style={{
                    background: "var(--bg)",
                    border: "1px solid var(--line)",
                    borderRadius: 14,
                    padding: "30px 28px",
                  }}
                >
                  <h3
                    className="font-display"
                    style={{
                      fontSize: 19,
                      fontWeight: 600,
                      letterSpacing: "-0.01em",
                      marginBottom: g.note ? 4 : 18,
                    }}
                  >
                    {g.group}
                  </h3>
                  {g.note && (
                    <div
                      className="font-mono"
                      style={{
                        fontSize: 11,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: "var(--ink-muted)",
                        marginBottom: 18,
                      }}
                    >
                      {g.note}
                    </div>
                  )}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                    }}
                  >
                    {g.items.map((it) => (
                      <div
                        key={it}
                        style={{
                          display: "flex",
                          gap: 11,
                          alignItems: "baseline",
                          fontSize: 15,
                          color: "var(--ink-soft)",
                          fontWeight: 300,
                        }}
                      >
                        <Bullet />
                        {it}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* IMPACT */}
      {cs.impact && (
        <div style={{ background: "var(--invert-bg)", color: "var(--invert-ink)" }}>
          <div className="wrap" style={{ padding: "82px 40px" }}>
            <div style={{ marginBottom: 40 }}>
              <span
                className="font-mono grad-text"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                ✦ Measurable Impact
              </span>
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(26px,4vw,44px)",
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                  marginTop: 12,
                }}
              >
                Key Outcomes & Metrics
              </h2>
            </div>
            <div
              className="cs-2col"
              style={{
                display: "grid",
                gridTemplateColumns:
                  cs.impact.length > 1 ? "1fr 1fr" : "1fr",
                gap: 40,
              }}
            >
              {cs.impact.map((g, gi) => (
                <div key={gi}>
                  {g.group && (
                    <h3
                      className="font-display"
                      style={{ fontSize: 18, fontWeight: 600, marginBottom: 18 }}
                    >
                      {g.group}
                    </h3>
                  )}
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 0 }}
                  >
                    {g.items.map((it) => (
                      <div
                        key={it}
                        style={{
                          display: "flex",
                          gap: 13,
                          alignItems: "baseline",
                          padding: "13px 0",
                          borderBottom: "1px solid rgba(255,255,255,0.12)",
                        }}
                      >
                        <span
                          className="grad-text"
                          style={{ fontWeight: 700 }}
                        >
                          ✦
                        </span>
                        <span style={{ fontSize: 15.5 }}>{it}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* NEXT CASE */}
      <div className="wrap" style={{ borderTop: "1px solid var(--line)" }}>
        <div
          className="work-row"
          style={{ cursor: "pointer" }}
          onClick={() => {
            openCase(next);
            window.scrollTo({ top: 0 });
          }}
        >
          <div
            style={{
              padding: "44px 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            <div>
              <span
                className="font-mono"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--ink-muted)",
                }}
              >
                Next Case Study
              </span>
              <h3
                className="font-display"
                style={{
                  fontSize: "clamp(24px,3.6vw,40px)",
                  fontWeight: 600,
                  letterSpacing: "-0.025em",
                  marginTop: 8,
                }}
              >
                {next.title}
              </h3>
            </div>
            <span className="arrow grad-text" style={{ fontSize: 30 }}>
              →
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ─────────────────────────────────────────────
   ABOUT PAGE
───────────────────────────────────────────── */
function AboutPage({ go }) {
  useScrollReveal("about");

  const story = [
    {
      h: "Philosophy & Purpose.",
      b: "I believe great product design lives right at the intersection of customer empathy, business strategy, and engineering viability[cite: 1]. Over the past 5+ years, I have shaped B2C and SaaS platforms by translating raw user research and business targets into elegant, scalable digital systems[cite: 1].",
    },
    {
      h: "Systems & Discovery.",
      b: "From Figma component libraries and token architectures to user journey mapping and A/B experimentation, my approach is grounded in end-to-end thinking[cite: 1]. I partner closely with engineers via Figma Dev Mode to ensure designs execute with pixel perfection, zero spec ambiguity, and strict WCAG accessibility compliance[cite: 1].",
    },
  ];

  const strengths = [
    {
      t: "End-to-End Ownership",
      d: "Guiding products from exploratory UX research and journey maps to production QA[cite: 1].",
    },
    {
      t: "Design Systems & Tokens",
      d: "Building reusable component systems that accelerate cross-functional sprint velocity[cite: 1].",
    },
    {
      t: "Data-Driven Iteration",
      d: "Leveraging GA4, Mixpanel, and Hotjar to measure and elevate engagement[cite: 1].",
    },
    {
      t: "Engineering Symbiosis",
      d: "Figma Dev Mode specs, annotations, and front-end familiarity (HTML/CSS/JS)[cite: 1].",
    },
  ];

  return (
    <main style={{ paddingTop: 70 }}>
      <div className="wrap" style={{ padding: "64px 40px 52px" }}>
        <div className="anim-up d1">
          <span className="eyebrow">About Ganesh</span>
        </div>
        <h1
          className="font-display anim-up d2"
          style={{
            fontSize: "clamp(30px,4.4vw,56px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1.08,
            maxWidth: 960,
            marginTop: 14,
          }}
        >
          Senior Product Designer with 5+ years creating{" "}
          <em
            className="grad-text"
            style={{ fontStyle: "italic", fontWeight: 400 }}
          >
            SaaS, mobile, and digital product experiences[cite: 1].
          </em>
        </h1>
      </div>
      <hr className="rule" style={{ margin: "0 40px" }} />

      <div
        className="wrap grid-2"
        style={{
          padding: "72px 40px",
          display: "grid",
          gridTemplateColumns: "0.85fr 1.15fr",
          gap: 72,
          alignItems: "start",
        }}
      >
        <div style={{ position: "sticky", top: 100 }}>
          <div className="portrait reveal">
            <SafeImage src={PORTRAIT} alt="Ganesh - Senior Product Designer" />
            <div className="caption">
              <span className="cap-name">Ganesh</span>
              <span className="cap-loc">USA / Remote</span>
            </div>
          </div>
        </div>

        <div>
          {story.map(({ h, b }) => (
            <div className="reveal" key={h} style={{ marginBottom: 44 }}>
              <h3
                className="font-display"
                style={{
                  fontSize: 21,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  marginBottom: 14,
                }}
              >
                {h}
              </h3>
              <p
                style={{
                  fontSize: 16,
                  fontWeight: 300,
                  color: "var(--ink-soft)",
                  lineHeight: 1.8,
                }}
              >
                {b}
              </p>
            </div>
          ))}

          {/* Key strengths */}
          <div className="reveal">
            <h3
              className="font-display"
              style={{
                fontSize: 21,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                marginBottom: 18,
              }}
            >
              Core Strengths.
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 1,
                background: "var(--line)",
                border: "1px solid var(--line)",
                borderRadius: 8,
                overflow: "hidden",
              }}
              className="strength-grid"
            >
              {strengths.map((s) => (
                <div
                  key={s.t}
                  style={{ background: "var(--bg)", padding: "20px 20px" }}
                >
                  <div
                    className="font-mono"
                    style={{
                      fontSize: 12,
                      color: "var(--accent)",
                      marginBottom: 8,
                    }}
                  >
                    {s.t}
                  </div>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 300,
                      color: "var(--ink-soft)",
                      lineHeight: 1.6,
                    }}
                  >
                    {s.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SKILLS */}
      <div
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div className="wrap" style={{ padding: "76px 40px" }}>
          <SectionHead kicker="Expertise" title="Skills & Toolkit" />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
              gap: 40,
            }}
          >
            {SKILLS.map(({ cat, items }) => (
              <div className="reveal" key={cat}>
                <div
                  className="font-mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    marginBottom: 14,
                    paddingBottom: 12,
                    borderBottom: "1px solid var(--line)",
                  }}
                >
                  {cat}
                </div>
                {items.map((it) => (
                  <div
                    key={it}
                    style={{
                      fontSize: 14.5,
                      fontWeight: 300,
                      color: "var(--ink-soft)",
                      padding: "8px 0",
                      borderBottom: "1px solid var(--line)",
                    }}
                  >
                    {it}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* EDUCATION */}
      <div className="wrap" style={{ padding: "76px 40px" }}>
        <span className="eyebrow">Academic Background</span>
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(26px,4vw,40px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            marginTop: 14,
            marginBottom: 36,
          }}
        >
          Education
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 32,
          }}
        >
          {EDUCATION.map((edu) => (
            <div
              key={edu.degree}
              className="reveal"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderRadius: 12,
                padding: "26px 24px",
              }}
            >
              <div
                className="font-mono grad-text"
                style={{ fontSize: 12, fontWeight: 700 }}
              >
                {edu.period}
              </div>
              <h3
                className="font-display"
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  marginTop: 10,
                  marginBottom: 6,
                }}
              >
                {edu.degree}
              </h3>
              <div
                style={{ fontSize: 14, color: "var(--ink-soft)", fontWeight: 300 }}
              >
                {edu.school} · {edu.loc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          background: "var(--invert-bg)",
          color: "var(--invert-ink)",
          textAlign: "center",
        }}
      >
        <div className="wrap" style={{ padding: "80px 40px" }}>
          <div className="reveal">
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(30px,5vw,58px)",
                fontWeight: 600,
                letterSpacing: "-0.035em",
                marginBottom: 30,
              }}
            >
              Ready to elevate your product experience?
            </h2>
            <button className="btn btn-fill" onClick={() => go("contact")}>
              Let's Connect →
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ─────────────────────────────────────────────
   EXPERIENCE PAGE
───────────────────────────────────────────── */
function ExperiencePage({ go }) {
  useScrollReveal("experience");
  return (
    <main style={{ paddingTop: 70 }}>
      <div className="wrap" style={{ padding: "64px 40px 52px" }}>
        <div className="anim-up d1">
          <span className="eyebrow">Career Highlights</span>
        </div>
        <h1
          className="font-display anim-up d2"
          style={{
            fontSize: "clamp(38px,6vw,78px)",
            fontWeight: 600,
            letterSpacing: "-0.035em",
            lineHeight: 1.03,
            maxWidth: 860,
            marginTop: 14,
          }}
        >
          Over five years of{" "}
          <em
            className="grad-text"
            style={{ fontStyle: "italic", fontWeight: 400 }}
          >
            delivering measurable impact[cite: 1].
          </em>
        </h1>
        <p
          className="anim-up d3"
          style={{
            fontSize: 17,
            fontWeight: 300,
            color: "var(--ink-soft)",
            marginTop: 18,
            maxWidth: 620,
            lineHeight: 1.7,
          }}
        >
          From Figma and TikTok to high-growth SaaS platforms — building scalable
          design systems, conducting deep discovery, and partnering closely with
          cross-functional teams[cite: 1].
        </p>
      </div>
      <hr className="rule" style={{ margin: "0 40px" }} />

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "64px 40px" }}>
        {EXPERIENCE.map((e, i) => (
          <div
            className="reveal exp-row"
            key={e.co}
            style={{
              display: "grid",
              gridTemplateColumns: "180px 1fr",
              gap: 36,
              paddingBottom: 44,
              marginBottom: 44,
              borderBottom:
                i < EXPERIENCE.length - 1 ? "1px solid var(--line)" : "none",
            }}
          >
            <div>
              <div
                className="font-mono"
                style={{ fontSize: 13, color: "var(--accent)" }}
              >
                {e.period}
              </div>
              <div
                className="font-mono"
                style={{
                  fontSize: 11,
                  color: "var(--ink-muted)",
                  marginTop: 8,
                  letterSpacing: "0.04em",
                }}
              >
                {e.industry}
              </div>
            </div>
            <div>
              <h3
                className="font-display"
                style={{
                  fontSize: 23,
                  fontWeight: 600,
                  letterSpacing: "-0.015em",
                }}
              >
                {e.co}
              </h3>
              <div
                style={{
                  fontSize: 14,
                  color: "var(--ink-muted)",
                  marginTop: 4,
                  marginBottom: 14,
                }}
              >
                {e.role}
              </div>
              <p
                style={{
                  fontSize: 15,
                  fontWeight: 300,
                  color: "var(--ink-soft)",
                  lineHeight: 1.75,
                  marginBottom: 16,
                }}
              >
                {e.desc}
              </p>
              <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                {e.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--line)",
          textAlign: "center",
        }}
      >
        <div className="wrap" style={{ padding: "76px 40px" }}>
          <div className="reveal">
            <span
              className="eyebrow"
              style={{ display: "inline-flex", justifyContent: "center" }}
            >
              Case Studies
            </span>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(28px,4.5vw,52px)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                margin: "16px 0 28px",
              }}
            >
              Explore the detailed design work.
            </h2>
            <button className="btn btn-fill" onClick={() => go("home")}>
              View Selected Work →
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ─────────────────────────────────────────────
   CONTACT PAGE
───────────────────────────────────────────── */
function ContactPage() {
  useScrollReveal("contact");

  const methods = [
    { l: "Email", v: PROFILE.email, href: `mailto:${PROFILE.email}` },
    { l: "LinkedIn", v: PROFILE.linkedin, href: `https://${PROFILE.linkedin}` },
  ];

  return (
    <main style={{ paddingTop: 70 }}>
      <div
        className="wrap"
        style={{
          padding:
            "clamp(72px,12vh,128px) 40px clamp(96px,14vh,150px)",
        }}
      >
        <div className="anim-up d1">
          <span className="eyebrow">Contact</span>
        </div>
        <h1
          className="font-display anim-up d2 grad-text"
          style={{
            fontSize: "clamp(34px,5.4vw,68px)",
            fontWeight: 600,
            letterSpacing: "-0.035em",
            lineHeight: 1.05,
            marginTop: 16,
            maxWidth: 900,
          }}
        >
          Let's Build Meaningful Experiences Together
        </h1>
        <p
          className="anim-up d3"
          style={{
            fontSize: "clamp(15px,1.6vw,18px)",
            fontWeight: 300,
            color: "var(--ink-soft)",
            lineHeight: 1.8,
            marginTop: 26,
            maxWidth: 600,
          }}
        >
          I am always open to discussing senior product design roles, design
          systems architecture, SaaS scaling, and exciting collaborative
          projects.
        </p>
        <div
          className="anim-up d4"
          style={{
            marginTop: "clamp(40px,6vh,64px)",
            display: "flex",
            flexWrap: "wrap",
            gap: "32px 72px",
          }}
        >
          {methods.map(({ l, v, href }) => (
            <div
              key={l}
              style={{ display: "flex", flexDirection: "column", gap: 10 }}
            >
              <span
                className="font-mono"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--ink-muted)",
                }}
              >
                {l}
              </span>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="hover-line"
                style={{
                  fontSize: "clamp(18px,2.3vw,26px)",
                  fontWeight: 500,
                  color: "var(--ink)",
                  textDecoration: "none",
                  letterSpacing: "-0.01em",
                }}
              >
                {v}
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer({ go }) {
  const links = [
    { label: "About", p: "about" },
    { label: "Work", p: "home" },
    { label: "Experience", p: "experience" },
    { label: "Contact", p: "contact" },
  ];
  return (
    <footer
      style={{
        borderTop: "1px solid var(--line)",
        background: "var(--bg-deep)",
      }}
    >
      <div
        className="wrap"
        style={{
          padding: "44px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 24,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              width: 9,
              height: 9,
              background: "var(--grad)",
              borderRadius: 2,
            }}
          />
          <div>
            <div
              className="font-display"
              style={{
                fontSize: 17,
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              Ganesh.
            </div>
            <div
              className="font-mono"
              style={{
                fontSize: 11,
                color: "var(--ink-muted)",
                marginTop: 3,
              }}
            >
              © {new Date().getFullYear()} Ganesh. All rights reserved.
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 26 }}>
          {links.map(({ label, p }) => (
            <button
              key={p}
              onClick={() => go(p)}
              className="nav-link hover-line"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   ROOT COMPONENT
───────────────────────────────────────────── */
export default function Portfolio() {
  const [page, setPage] = useState("home");
  const [cs, setCs] = useState(null);

  const go = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const openCase = (c) => {
    setCs(c);
    setPage("case-study");
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="pf-root">
      <GlobalStyles />
      <Nav page={page} go={go} />
      {page === "home" && <HomePage go={go} openCase={openCase} />}
      {page === "case-study" && cs && (
        <CaseStudyPage cs={cs} go={go} openCase={openCase} />
      )}
      {page === "about" && <AboutPage go={go} />}
      {page === "experience" && <ExperiencePage go={go} />}
      {page === "contact" && <ContactPage />}
      <Footer go={go} />
    </div>
  );
}