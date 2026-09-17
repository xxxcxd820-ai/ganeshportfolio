import { useState, useEffect, useRef, Fragment } from "react";

/* ─────────────────────────────────────────────
   GLOBAL ASSETS & PROFILE PORTRAIT
   Place your images in public/assets/
───────────────────────────────────────────── */
const PORTRAIT = "/assets/portrait.jpg";

/* ─────────────────────────────────────────────
   GLOBAL STYLES & THEME TOKENS
   Supports Dark and Light modes seamlessly
───────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    /* Dark Theme Tokens */
    .pf-root.dark {
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
      --card-glass: rgba(255,255,255,0.045);
      --card-border: rgba(255,255,255,0.10);
      --nav-glass: rgba(10,10,10,0.85);
    }

    /* Light Theme Tokens */
    .pf-root.light {
      --bg: #FAFAFA;
      --bg-2: #F4F4F5;
      --bg-deep: #E4E4E7;
      --surface: #FFFFFF;
      --surface-2: #F4F4F5;
      --ink: #09090B;
      --ink-soft: #52525B;
      --ink-muted: #71717A;
      --line: #E4E4E7;
      --line-strong: #D4D4D8;
      --accent: #09090B;
      --accent-soft: rgba(0,0,0,0.06);
      --grad: linear-gradient(135deg, #ee0979 0%, #ff6a00 100%);
      --grad-soft: rgba(238,9,121,0.12);
      --invert-bg: #18181B;
      --invert-ink: #FFFFFF;
      --card-glass: rgba(255,255,255,0.85);
      --card-border: rgba(0,0,0,0.08);
      --nav-glass: rgba(250,250,250,0.85);
    }

    html { scroll-behavior: smooth; }

    .pf-root {
      font-family: 'Inter', sans-serif;
      background: var(--bg);
      color: var(--ink);
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
      min-height: 100vh;
      transition: background-color 0.3s ease, color 0.3s ease;
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
      background: var(--surface);
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

    .theme-toggle-btn {
      display: inline-flex; align-items: center; justify-content: center;
      width: 36px; height: 36px; border-radius: 50%;
      border: 1px solid var(--line); background: var(--surface);
      color: var(--ink); cursor: pointer; font-size: 15px;
      transition: background 0.2s, transform 0.2s, border-color 0.2s;
    }
    .theme-toggle-btn:hover {
      transform: scale(1.06); border-color: var(--ink-soft);
    }

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
    .eco-section { position: relative; overflow: hidden; background: var(--bg-2); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
    .eco-bg { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
    .eco-grid { position: absolute; inset: 0; opacity: .45;
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
      box-shadow: 0 14px 30px -18px rgba(0,0,0,0.15);
      opacity: 0; transform: translateY(20px);
      transition: opacity .55s ease, transform .55s cubic-bezier(.22,1,.36,1), box-shadow .3s, border-color .3s; }
    .eco-in .eco-card { opacity: 1; transform: none; }
    .eco-card:hover { transform: translateY(-4px); box-shadow: 0 24px 46px -22px rgba(0,0,0,0.25); border-color: var(--line-strong); }

    .eco-title { font-size: 15px; font-weight: 600; letter-spacing: -.01em; line-height: 1.2; color: var(--ink); }
    .eco-desc { font-size: 12.5px; font-weight: 300; color: var(--ink-soft); line-height: 1.5; margin-top: 7px; }

    .eco-core { flex-basis: clamp(166px, 16.5vw, 198px); padding: 26px 20px 22px;
      background: linear-gradient(var(--surface), var(--surface)) padding-box, var(--grad) border-box; border: 1.5px solid transparent;
      box-shadow: 0 20px 40px -20px rgba(238,9,121,.3); }
    .eco-badge { display: inline-block; font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: .14em; text-transform: uppercase;
      padding: 4px 9px; border-radius: 999px; margin-bottom: 14px; color: #fff;
      background: var(--grad); }

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
      box-shadow: 0 18px 40px -16px rgba(0,0,0,0.25);
    }
    .portrait img {
      width: 100%; height: 100%; object-fit: cover; object-position: 50% 22%; display: block;
      transition: transform 1.1s cubic-bezier(0.22,1,0.36,1);
    }
    .portrait:hover img { transform: scale(1.035); }
    .portrait .caption {
      position: absolute; left: 0; right: 0; bottom: 0; padding: 16px 20px;
      display: flex; justify-content: space-between; align-items: center;
      background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0)); color: #fff;
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
      opacity:.75;
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
const CASE_STUDIES = [
  /* ─────────────────────────────────────────────────────────────
     CASE STUDY 01: FINTECH & WEALTHTECH
  ───────────────────────────────────────────────────────────── */
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
    heroImage: "/assets/UBank1.png",

    // Dual-Sided Framing / Core Value Prop
    dualProps: {
      left: {
        title: "Consumer / Retail Saver",
        badge: "Demand Side",
        points: [
          "Zero-confusion transaction statements with categorized merchant logos.",
          "Sub-second P2P transfers without nested multi-factor confirmation friction.",
          "Automated micro-budgeting and smart recurring bill predictions."
        ]
      },
      right: {
        title: "Wealth & Portfolio User",
        badge: "Supply / High Value",
        points: [
          "High-yield treasury and multi-currency exchange tracking in real-time.",
          "Instant freezing, biometric authentication, and strict KYC compliance.",
          "Seamless developer handoff specs reducing latency to under 1.2s."
        ]
      }
    },

    overview: [
      "Led the end-to-end design lifecycle for UBank's flagship digital banking platform across iOS and Android.",
      "Conducted generative user research, financial behavioral interviews, and heuristic evaluations to map friction points during money transfers and bill payments.",
      "Architected responsive design tokens, modular component patterns, and interactive micro-animations using Figma variables.",
      "Collaborated shoulder-to-shoulder with backend and iOS/Android engineers using Figma Dev Mode annotations to guarantee strict accessibility and pixel accuracy."
    ],
    responsibilities: [
      "User Journey & Financial Flow Mapping",
      "Interactive High-Fidelity Prototyping",
      "Accessibility & WCAG Compliance Audits",
      "Design Systems & Token Architecture",
      "Design QA & Developer Handoff"
    ],

    // User Personas
    personas: [
      {
        name: "Vikram R.",
        role: "Daily Commuter & Tech Worker",
        goal: "Wants fast, transparent split-bills and instant money transfers without waiting on verification codes.",
        frustration: "Overwhelmed by financial jargon, obscure balance updates, and multi-step transfer flows."
      },
      {
        name: "Ayesha K.",
        role: "Freelance Consultant",
        goal: "Needs real-time categorization of expenses and simple invoice reconciliation on mobile.",
        frustration: "Lack of exportable tax-friendly statements and slow card transaction alerts."
      },
      {
        name: "Raj M.",
        role: "Small Business Proprietor",
        goal: "Requires instant access to cashflow metrics and zero-latency batch salary payments.",
        frustration: "Complex security verification timeouts that disrupt high-volume payment processing."
      }
    ],

    // Usability Testing & Nielsen Severity Matrix
    usabilityTests: [
      {
        task: "Task 1: Execute Instant P2P Transfer",
        severity: "Severity 3 (Major)",
        severityColor: "#ff4d4f",
        issue: "Users failed to notice recipient account confirmation before clicking proceed.",
        solution: "Introduced a high-contrast bottom confirmation sheet with recipient avatar and fee breakdown."
      },
      {
        task: "Task 2: Filter Transaction History",
        severity: "Severity 2 (Minor)",
        severityColor: "#faad14",
        issue: "Date range selector was buried under a nested submenu icon.",
        solution: "Promoted primary time filters ('This Month', 'Last 30 Days') to horizontal sticky pills."
      },
      {
        task: "Task 3: Card Freeze & Safety Controls",
        severity: "Severity 1 (Cosmetic)",
        severityColor: "#52c41a",
        issue: "Card lock switch icon didn't convey real-time active state.",
        solution: "Added animated tactile switch with explicit status text: 'Card Temporarily Locked'."
      }
    ],

    screens: [
      { title: "Smart Dashboard & Balance Insights", src: "/assets/UBank2.png" },
      { title: "One-Tap P2P Instant Transfer Flow", src: "/assets/UBank3.png" },
      { title: "Card Security & Financial Controls", src: "/assets/UBank4.png" }
    ],

    challenge: "Legacy banking interfaces overwhelmed users with technical financial jargon, dense account views, and multi-step transfer flows that caused high transaction abandonment.",
    constraints: [
      "Strict financial compliance & banking data regulations",
      "Multi-factor authentication (MFA) UX barriers",
      "High-contrast accessibility standards",
      "Cross-platform consistency across iOS and Android"
    ],
    solution: [
      {
        group: "Smart Dashboard & Quick Actions",
        note: "Core interaction framework",
        items: [
          "One-tap P2P money transfers",
          "Visual spending breakdown & budgeting insights",
          "Real-time card freeze & security toggles",
          "Contextual scheduled transaction alerts"
        ]
      },
      {
        group: "Banking Design System",
        note: "Scalable component foundation",
        items: [
          "Figma token architecture for light/dark modes",
          "Accessible keypad & currency inputs",
          "State-driven micro-interactions",
          "Reusable transaction status modals"
        ]
      }
    ],
    impact: [
      {
        group: "Conversion & Efficiency",
        items: [
          "44% decrease in transaction completion time",
          "38% increase in daily active engagement with budgeting tools",
          "Zero accessibility regressions reported across releases"
        ]
      },
      {
        group: "Operational Agility",
        items: [
          "Cut developer implementation cycle by 35% with Dev Mode annotations",
          "Standardized design-to-code naming parity across cross-functional teams"
        ]
      }
    ]
  },

  /* ─────────────────────────────────────────────────────────────
     CASE STUDY 02: DUAL-SIDED MARKETPLACE & MOBILITY (FLIT LOGISTICS)
  ───────────────────────────────────────────────────────────── */
  {
    id: "flit-urban-mobility",
    index: "02",
    title: "Flit — Zero-Commission Urban Mobility & Logistics",
    subtitle: "Architecting a two-sided on-demand ecosystem pairing passenger ride-hailing with hyper-local parcel logistics.",
    preview: "Empirical field research, zero-commission economics, and high-urgency mobile task flows for riders and drivers.",
    company: "Flit Mobility",
    year: "2023 — 2024",
    role: "Lead Product Designer",
    tags: ["Marketplace UX", "Logistics", "Usability Testing", "Nielsen Heuristics", "Affinity Mapping"],
    detailTitle: "Flit: Dual-Service Urban Transportation Platform",
    detailSubtitle: "Solving driver turnover and rider surge anxiety through transparent booking flows and combined delivery logistics.",
    heroImage: "/assets/Flit1.png",

    // Dual-Sided Framing
    dualProps: {
      left: {
        title: "Riders & Parcel Senders",
        badge: "Demand Side",
        points: [
          "Guaranteed upfront fare quotes with zero surge pricing multipliers.",
          "Single-app switching between ride hailing and same-day city courier requests.",
          "Live telemetry map showing vehicle ETA, route heatmaps, and courier verification pin."
        ]
      },
      right: {
        title: "Fleet Drivers & Couriers",
        badge: "Supply Side (Zero Commission)",
        points: [
          "100% direct fare retention model with optional daily subscription fee.",
          "Combined ride & delivery requests to maximize idle time and hourly earnings.",
          "One-touch instant payout settlements directly into verified UPI bank accounts."
        ]
      }
    },

    overview: [
      "Led end-to-end product design from generative field interviews to high-fidelity design specifications for iOS, Android, and Driver terminals.",
      "Conducted in-vehicle ride-along field studies to analyze driver distraction triggers and cognitive load during dispatch alerts.",
      "Established an interactive Figma component kit optimized for high outdoor sunlight contrast (WCAG AAA) and one-handed thumb interaction zones.",
      "Synthesized usability testing observations using Affinity Mapping and evaluated design iterations against Nielsen's Severity Rating scale."
    ],
    responsibilities: [
      "Field UX Research & In-Cab Shadowing",
      "Two-Sided Service Blueprint Architecture",
      "Affinity Diagramming & Heuristic Analysis",
      "Ergonomic Driver Interface & Interaction Design",
      "A/B Preference Testing & Micro-Interactions"
    ],

    personas: [
      {
        name: "Arjun K.",
        role: "Full-Time Ride-Hail Driver",
        goal: "Wants predictable daily earnings without losing 25–30% in platform commissions.",
        frustration: "Complex dispatch prompts while navigating traffic, leading to missed trip opportunities and low ratings."
      },
      {
        name: "Sneha M.",
        role: "Independent Boutique Owner",
        goal: "Requires immediate on-demand courier dispatch to deliver urgent local retail orders to customers.",
        frustration: "Existing courier apps are too expensive for parcels under 5 km and provide inaccurate pickup ETAs."
      },
      {
        name: "David T.",
        role: "Daily Transit Commuter",
        goal: "Needs transparent pricing and dependable driver commitments during peak morning hours.",
        frustration: "Frequent driver trip cancellations and unpredictable surge multipliers."
      }
    ],

    usabilityTests: [
      {
        task: "Task 1: Dispatch Urgent Parcel Pickup",
        severity: "Severity 3 (Major)",
        severityColor: "#ff4d4f",
        issue: "60% of users failed to distinguish between ride-hailing and parcel mode during location selection.",
        solution: "Introduced a prominent two-tab segmented toggle at the top of the map with distinct icon cues and vehicle illustrations."
      },
      {
        task: "Task 2: Driver In-Transit Fare Verification",
        severity: "Severity 2 (Minor)",
        severityColor: "#faad14",
        issue: "Drivers struggled to read customer drop-off instructions on dashboard mount while navigating.",
        solution: "Redesigned trip banners to dynamic large typography cards with text-to-speech voice readout prompts."
      },
      {
        task: "Task 3: Post-Trip Courier Proof of Delivery",
        severity: "Severity 1 (Cosmetic)",
        severityColor: "#52c41a",
        issue: "Photo capture confirmation lacked tactile visual verification of successful camera upload.",
        solution: "Implemented instant green edge-halo feedback and haptic vibration upon image geotag validation."
      }
    ],

    screens: [
      { title: "Dual-Mode Booking & Live Geolocation Map", src: "/assets/Flit2.png" },
      { title: "Driver Ergonomic Dispatch & Earnings Console", src: "/assets/Flit3.png" },
      { title: "Transparent Pricing & Live Courier Telemetry", src: "/assets/Flit4.png" }
    ],

    challenge: "Traditional mobility applications rely on steep 25–30% platform commissions that alienate drivers, causing high cancellation rates, delayed pickups, and user churn.",
    constraints: [
      "Low battery consumption during continuous background GPS tracking",
      "High visibility requirements under harsh outdoor sunlight",
      "Strict safety guidelines requiring minimal driver distraction (<2 seconds tap interaction)",
      "Low-bandwidth offline mode for transit dead-zones"
    ],
    solution: [
      {
        group: "Driver Command Console",
        note: "Ergonomic in-transit UX",
        items: [
          "OLED Dark Mode interface reducing cabin night-glare",
          "Giant single-tap accept touch targets (>64px)",
          "Real-time transparent earnings gauge without hidden deductions",
          "Automated parcel drop-off verification camera overlay"
        ]
      },
      {
        group: "Rider Seamless Checkout & Tracking",
        note: "Frictionless dual service",
        items: [
          "One-tap pickup estimation with fixed upfront quotes",
          "Integrated parcel dimension selector with instant weight estimation",
          "Emergency safety SOS with real-time route sharing",
          "Zero-surge guarantee pricing breakdown"
        ]
      }
    ],
    impact: [
      {
        group: "Operational Metrics",
        items: [
          "Driver cancellation rate reduced from 28% to 6.4%",
          "Average pickup dispatch time dropped by 3.2 minutes across pilot zones",
          "4.9/5 overall app rating across 45,000+ completed transit trips"
        ]
      },
      {
        group: "Business Growth",
        items: [
          "52% increase in driver sign-ups within 90 days of the zero-commission pilot",
          "31% of daily active riders cross-utilized the on-demand parcel courier feature"
        ]
      }
    ]
  },

  /* ─────────────────────────────────────────────────────────────
     CASE STUDY 03: ENTERPRISE B2B SAAS & DESIGN SYSTEM
  ───────────────────────────────────────────────────────────── */
  {
    id: "pulse-design-system",
    index: "03",
    title: "Pulse — Multi-Brand Enterprise UI & Token Engine",
    subtitle: "Standardizing component governance and design-to-code velocity across 4 web platforms and 2 native applications.",
    preview: "Multi-tier semantic tokens, automated WCAG accessibility QA, and zero-loss Figma Dev Mode developer handoff.",
    company: "Pulse Core Systems",
    year: "2022 — 2023",
    role: "Senior UI/UX Specialist",
    tags: ["Design Systems", "Design Tokens", "Dev Mode", "Storybook", "Enterprise SaaS"],
    detailTitle: "Pulse Enterprise Design System & Component Governance",
    detailSubtitle: "Bridging the visual-to-code gap across product squads through semantic variables, token engines, and unified UI specifications.",
    heroImage: "/assets/Pulse1.png",

    // Dual-Sided Framing
    dualProps: {
      left: {
        title: "Product Designers & Creators",
        badge: "Design Acceleration",
        points: [
          "250+ responsive component variants with standardized autolayout 5.0 properties.",
          "Global semantic tokens for instant light, dark, and high-contrast brand theming.",
          "Single source of truth eliminating duplicated prototype exploration."
        ]
      },
      right: {
        title: "Frontend Engineering Teams",
        badge: "Developer Velocity",
        points: [
          "Direct parity between Figma variables and production CSS/Tailwind tokens.",
          "Automated Design QA checklists integrated directly into Storybook CI/CD.",
          "Figma Dev Mode annotations eliminating speculative spacing measurements."
        ]
      }
    },

    overview: [
      "Led the architecture and technical rollout of the Pulse Design System, unifying 6 disparate enterprise cloud products.",
      "Audited 1,400+ legacy UI screens to catalog inconsistencies, duplicate CSS classes, and WCAG color contrast violations.",
      "Built a semantic 3-tier token architecture (Global, Semantic, Component) using Figma Variables and Style Dictionary.",
      "Established a monthly Design System Governance Council, conducting component reviews and cross-functional handoff workshops with engineering leads."
    ],
    responsibilities: [
      "Multi-Tier Design Token Architecture",
      "Component Variant Library & Micro-Interactions",
      "Automated WCAG Accessibility & Contrast Audits",
      "Storybook React Component Alignment",
      "Design-to-Code Governance & Documentation"
    ],

    personas: [
      {
        name: "Marcus L.",
        role: "Staff Frontend Engineer",
        goal: "Needs clean, production-ready token names matching Tailwind CSS without guessing pixel dimensions.",
        frustration: "Designers delivering static Figma files with inconsistent padding, missing error states, and unlinked hex codes."
      },
      {
        name: "Elena Z.",
        role: "Product Designer (Feature Squad)",
        goal: "Wants to rapidly mock up complex enterprise data tables and wizards without rebuilding recurring components.",
        frustration: "Conflicting component variants across different team files causing rework during design critique sessions."
      },
      {
        name: "Pooja B.",
        role: "VP of Product Management",
        goal: "Demands visual brand consistency and predictable sprint estimation across multi-region product rollouts.",
        frustration: "Product launches delayed by weeks due to repetitive styling fixes, regressions, and accessibility bugs."
      }
    ],

    usabilityTests: [
      {
        task: "Task 1: Engineer Token Inspection in Dev Mode",
        severity: "Severity 3 (Major)",
        severityColor: "#ff4d4f",
        issue: "Developers could not determine whether hardcoded spacing values were intentional overrides or tokens.",
        solution: "Enforced strict component token aliasing (e.g., `space.inset.sm`) and enabled automated Dev Mode token tooltips."
      },
      {
        task: "Task 2: High-Density Table Filtering & Sorting",
        severity: "Severity 2 (Minor)",
        severityColor: "#faad14",
        issue: "Users in complex data grids struggled to notice multi-column active sorting indicators.",
        solution: "Engineered high-contrast sort icons with visual numeric priority pills (1, 2, 3) for multi-column sorting."
      },
      {
        task: "Task 3: Dark Mode Accessibility Contrast Switch",
        severity: "Severity 1 (Cosmetic)",
        severityColor: "#52c41a",
        issue: "Secondary button border lacked sufficient 3:1 contrast ratio against card backgrounds in dark mode.",
        solution: "Updated semantic border variable tokens to automatically shift contrast values upon theme mode swap."
      }
    ],

    screens: [
      { title: "Atomic Tokens & Theme Engine Architecture", src: "/assets/Pulse2.png" },
      { title: "Complex Data Table & Enterprise Filter Suite", src: "/assets/Pulse3.png" },
      { title: "Storybook Alignment & Figma Dev Mode Specifications", src: "/assets/Pulse4.png" }
    ],

    challenge: "Rapid expansion across multiple international teams led to 6 fragmented web products with 42 different button styles, unmaintainable technical debt, and continuous accessibility failures.",
    constraints: [
      "Zero disruption to active agile sprints during legacy migration",
      "Strict WCAG 2.1 Level AA compliance across all components",
      "Seamless support for responsive web, iPad OS viewports, and electron desktop wrappers",
      "Backwards compatibility with React and legacy Vue.js codebases"
    ],
    solution: [
      {
        group: "Tokenization Engine",
        note: "Global semantic hierarchy",
        items: [
          "3-Tier Token structure: Reference (Primitive) → System (Semantic) → Component",
          "Automated export via Style Dictionary to JSON, SCSS, and Tailwind config",
          "Color blindness simulator mode verified for all palette pairings",
          "Fluid typography and modular spacing scales based on 8pt grid"
        ]
      },
      {
        group: "Component Library & Governance",
        note: "Figma Dev Mode parity",
        items: [
          "250+ accessible components with built-in interactive states",
          "Live interactive documentation with Storybook and Zeroheight integration",
          "Component contribution RFC process for squad feature designers",
          "Automated linting for unlinked styles and contrast regressions"
        ]
      }
    ],
    impact: [
      {
        group: "Engineering Velocity",
        items: [
          "Cut design-to-code sprint delivery time by 48%",
          "Reduced UI-related GitHub issues and styling bug tickets by 72%",
          "Eliminated 600+ duplicate CSS class declarations from core frontend repos"
        ]
      },
      {
        group: "Product Quality",
        items: [
          "Achieved 100% WCAG 2.1 AA compliance certification across enterprise product suites",
          "Standardized brand parity across 6 enterprise applications under unified governance"
        ]
      }
    ]
  }
];

const EXPERIENCE = [
  {
    co: "Figma",
    role: "Product Designer",
    period: "Jun 2025 — Present",
    industry: "Design Systems & Product Experience",
    desc: "Designed user-centered workflows across web and digital experiences. Built and maintained scalable design systems, tokens, and variables. Partnered with engineers via Figma Dev Mode to strengthen design-to-development handoffs, while using Google Analytics and Mixpanel to drive data-informed improvements.",
    tags: ["Figma Dev Mode", "Design Systems", "Design Tokens", "GA4", "Mixpanel", "WCAG"],
  },
  {
    co: "TikTok",
    role: "User Experience Designer",
    period: "Jul 2024 — May 2025",
    industry: "Social & Content Platforms",
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
   NAV (With Light / Dark Mode Toggle)
───────────────────────────────────────────── */
/* ─────────────────────────────────────────────
   NAV (Single Theme Toggle)
───────────────────────────────────────────── */
function Nav({ page, go, theme, toggleTheme }) {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const links = [
    { label: "About", p: "about" },
    { label: "Work", p: "home" },
    { label: "Projects", p: "projects" },
    { label: "Experience", p: "experience" }
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
        background: scrolled ? "var(--nav-glass)" : "transparent",
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
        {/* Brand / Logo */}
        {/* Brand / Logo with Round Profile Image */}
       {/* Brand / Logo */}
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
            Ganesh Kolluri
            <span style={{ color: "var(--ink-muted)", fontWeight: 400 }}>.</span>
          </span>
        </button>

        {/* Right Controls Container */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* Desktop Links */}
          <nav
            className="desktop-nav"
            style={{ display: "flex", gap: 24, alignItems: "center" }}
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

          {/* THE ONLY TOGGLE BUTTON (Visible across both desktop and mobile) */}
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {/* Mobile Hamburger Menu Toggle */}
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
      </div>

      {/* Mobile Menu Dropdown */}
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
          border: 1px solid var(--line);
        }
        .hv-lightarm { position: absolute; left: 50%; top: 50%; width: 0; height: 0; transform: rotate(var(--a)); }
        .hv-lightnode {
          position: absolute; left: 0; top: 0; width: 4px; height: 4px; border-radius: 50%; margin: -2px;
          transform: translateY(calc(-1 * var(--rad)));
          background: var(--ink);
          box-shadow: 0 0 8px 1px rgba(255,160,90,0.6); opacity: 0.65;
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
          max-width: 110px; padding: 6px 10px; border-radius: 14px;
          background: var(--card-glass); border: 1px solid var(--card-border);
          backdrop-filter: blur(9px); pointer-events: auto; cursor: default;
          box-shadow: 0 8px 22px -10px rgba(0,0,0,0.15);
          transition: transform .25s ease, background .25s;
        }
        .hv-card:hover { transform: translate(-50%,-50%) translateY(-4px) scale(1.02); }
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
            padding: 6px 10px; border-radius: 14px; background: var(--card-glass);
            border: 1px solid var(--card-border); backdrop-filter: blur(8px);
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
   SAFE IMAGE COMPONENT
───────────────────────────────────────────── */
function SafeImage({ src, alt, style, className }) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        style={{
          width: "100%",
          minHeight: 220,
          background: "var(--surface)",
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
        boxShadow: "0 24px 60px -20px rgba(0,0,0,0.15)",
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
              web and mobile platforms.
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
              through end-to-end product design lifecycles.
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
        
{/* HOME PAGE PROJECTS PREVIEW */}
      <section className="wrap" style={{ padding: "92px 40px 40px", borderTop: "1px solid var(--line)" }}>
        <SectionHead kicker="Development & UI" title="Featured Projects" right="Interactive builds" />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32, marginTop: 12 }}>
          {PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="reveal"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderRadius: 20,
                overflow: "hidden",
                cursor: "pointer",
                transition: "transform 0.3s ease, border-color 0.3s ease",
              }}
              onClick={() => go("projects")}
            >
              <div style={{ height: 210, width: "100%", overflow: "hidden", position: "relative" }}>
                <img
                  src={proj.image}
                  alt={proj.title}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: 14,
                    left: 14,
                    background: "rgba(0,0,0,0.65)",
                    backdropFilter: "blur(6px)",
                    color: "#fff",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9.5,
                    padding: "4px 10px",
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  {proj.category}
                </span>
              </div>
              <div style={{ padding: "24px 22px" }}>
                <div className="font-mono grad-text" style={{ fontSize: 11, fontWeight: 700 }}>
                  {proj.year}
                </div>
                <h3 className="font-display" style={{ fontSize: 20, fontWeight: 600, marginTop: 6, letterSpacing: "-0.015em" }}>
                  {proj.title}
                </h3>
                <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.6, marginTop: 8 }}>
                  {proj.desc}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 16 }}>
                  {proj.tags.slice(0, 3).map((t) => (
                    <span key={t} className="tag" style={{ fontSize: 10, padding: "3px 8px" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 44 }}>
          <button className="btn btn-ghost" onClick={() => go("projects")}>
            Explore All Projects →
          </button>
        </div>
      </section>
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
            WCAG and accessibility-first principles[ ].
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
            Dev Mode handoffs, and behavioral analytics via Mixpanel and GA4[ ].
          </p>
          <button className="btn btn-ghost" onClick={() => go("about")}>
            Read full background →
          </button>
        </div>
        <div className="portrait reveal">
          <SafeImage src={PORTRAIT} alt="Ganesh - Senior Product Designer" />
          <div className="caption">
            <span className="cap-name">Ganesh Kolluri</span>
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
const PROJECTS = [
  {
    id: "fintech-crypto-dashboard",
    title: "Apex Finance — Web3 Asset Dashboard",
    category: "Fintech & Web3 Platform",
    year: "2025",
    desc: "A real-time cryptocurrency and fiat wealth management interface featuring live portfolio tracking, biometric transaction signing, and dynamic light/dark charts.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    tags: ["React", "TypeScript", "Tailwind CSS", "Figma", "Chart.js"],
    liveUrl: "https://example.com/demo-finance",
    githubUrl: "https://github.com/example/finance-dashboard",
    stats: [
      { label: "Active Traders", val: "120K+" },
      { label: "Transaction Speed", val: "<1.2s" },
      { label: "System Uptime", val: "99.98%" },
    ],
  },
  {
    id: "ai-collaborative-workspace",
    title: "NovaDocs — Real-time AI Note Canvas",
    category: "SaaS Productivity Tool",
    year: "2024",
    desc: "Collaborative whiteboard and markdown editor powered by generative AI autocomplete, multi-cursor presence, and seamless Figma component embeds.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    tags: ["Next.js", "Socket.IO", "Prisma ORM", "Design Tokens", "Framer Motion"],
    liveUrl: "https://example.com/demo-novadocs",
    githubUrl: "https://github.com/example/novadocs-app",
    stats: [
      { label: "Daily Edits", val: "450K+" },
      { label: "Sync Latency", val: "18ms" },
      { label: "Retention Rate", val: "68%" },
    ],
  },
  {
    id: "luxury-ecommerce-experience",
    title: "Aura Haute — Luxury Fashion Atelier",
    category: "E-Commerce Experience",
    year: "2023",
    desc: "High-fashion e-commerce platform blending minimal typography, 3D interactive bag and sneaker inspection, and streamlined Apple Pay checkout.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    tags: ["Three.js", "Shopify Headless", "UI/UX Architecture", "WCAG 2.1"],
    liveUrl: "https://example.com/demo-aura",
    githubUrl: "https://github.com/example/aura-fashion",
    stats: [
      { label: "Conversion Lift", val: "+34%" },
      { label: "Avg Session Time", val: "4m 12s" },
      { label: "Bounce Rate", val: "22%" },
    ],
  },
];
/* ─────────────────────────────────────────────
   ECOSYSTEM COMPONENT
───────────────────────────────────────────── */
function EcosystemFlow() {
  const [ref, inView] = useInView(0.16);
  const nodes = [
    { title: "User Discovery", desc: "Interviews, surveys & personas." },
    { title: "FigJam Ideation", desc: "Journey maps & architecture.", core: true },
    { title: "Figma Prototyping", desc: "Design tokens & interactive UI.", core: true },
    { title: "Usability Testing", desc: "Heuristic evaluation & QA." },
    { title: "Figma Dev Mode", desc: "Annotations & code specs.", core: true },
    { title: "GA4 / Mixpanel", desc: "A/B metrics & continuous growth." },
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
            reusable design tokens, and seamless engineering handoffs.
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
   CASE STUDY PAGE
───────────────────────────────────────────── */
/* ─────────────────────────────────────────────
   CASE STUDY PAGE (Flit Taxi Inspired Architecture)
   Features: Dual-Sided Framing, Personas, 
   Nielsen Usability Matrix, Screens & KPI Impact
───────────────────────────────────────────── */
function CaseStudyPage({ cs, go, openCase }) {
  const nextIdx =
    (CASE_STUDIES.findIndex((c) => c.id === cs.id) + 1) % CASE_STUDIES.length;
  const next = CASE_STUDIES[nextIdx];
  const Bullet = ({ ch = "→" }) => (
    <span className="grad-text" style={{ fontWeight: 700, flexShrink: 0 }}>
      {ch}
    </span>
  );

  return (
    <main className="cs-static" style={{ paddingTop: 70 }}>
      {/* ── 1. CASE HERO ── */}
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
              maxWidth: 860,
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

        {/* HERO SHOWCASE IMAGE */}
        <div
          className="wrap hero-in"
          style={{ position: "relative", zIndex: 1, paddingBottom: 60 }}
        >
          <div style={{ maxWidth: 940, margin: "0 auto" }}>
            <SafeImage
              src={cs.heroImage}
              alt={`${cs.title} Hero Showcase`}
              style={{ maxHeight: 540, objectFit: "cover" }}
            />
          </div>
        </div>
      </div>

      {/* ── 2. DUAL-SIDED MARKETPLACE / CORE VALUE PROPOSITION ── */}
      {cs.dualProps && (
        <div
          style={{
            background: "var(--bg-2)",
            borderBottom: "1px solid var(--line)",
          }}
        >
          <div className="wrap" style={{ padding: "80px 40px" }}>
            <span className="eyebrow">Strategic Framing</span>
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
              Dual-Sided Ecosystem Architecture
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: 24,
              }}
            >
              {/* Left Side (e.g. Consumer / Rider) */}
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                  borderRadius: 20,
                  padding: "32px 28px",
                  boxShadow: "0 10px 30px -15px rgba(0,0,0,0.1)",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 12px",
                    borderRadius: 999,
                    background: "var(--grad-soft)",
                    border: "1px solid rgba(238,9,121,0.3)",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "#fff",
                    marginBottom: 16,
                  }}
                >
                  {cs.dualProps.left.badge}
                </span>
                <h3
                  className="font-display"
                  style={{ fontSize: 22, fontWeight: 600, marginBottom: 16 }}
                >
                  {cs.dualProps.left.title}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {cs.dualProps.left.points.map((pt, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "baseline",
                        fontSize: 14.5,
                        color: "var(--ink-soft)",
                        lineHeight: 1.6,
                      }}
                    >
                      <Bullet />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side (e.g. Driver / Business / Provider) */}
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                  borderRadius: 20,
                  padding: "32px 28px",
                  boxShadow: "0 10px 30px -15px rgba(0,0,0,0.1)",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 12px",
                    borderRadius: 999,
                    background: "var(--accent-soft)",
                    border: "1px solid var(--line-strong)",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "var(--ink)",
                    marginBottom: 16,
                  }}
                >
                  {cs.dualProps.right.badge}
                </span>
                <h3
                  className="font-display"
                  style={{ fontSize: 22, fontWeight: 600, marginBottom: 16 }}
                >
                  {cs.dualProps.right.title}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {cs.dualProps.right.points.map((pt, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "baseline",
                        fontSize: 14.5,
                        color: "var(--ink-soft)",
                        lineHeight: 1.6,
                      }}
                    >
                      <Bullet />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 3. OVERVIEW & RESPONSIBILITIES ── */}
      <div
        className="wrap grid-2"
        style={{
          padding: "80px 40px",
          display: "grid",
          gridTemplateColumns: "1.5fr 0.55fr",
          gap: 64,
          alignItems: "start",
        }}
      >
        <div>
          <span className="eyebrow">Project Overview</span>
          {cs.overview.map((para, i) => (
            <p
              key={i}
              style={{
                fontSize: i === 0 ? 20 : 16,
                fontWeight: i === 0 ? 400 : 300,
                color: i === 0 ? "var(--ink)" : "var(--ink-soft)",
                lineHeight: 1.75,
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
            borderRadius: 16,
            padding: "28px 24px",
          }}
        >
          <div
            className="font-mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--ink-muted)",
              marginBottom: 12,
            }}
          >
            Core Ownership
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {cs.responsibilities.map((it) => (
              <div
                key={it}
                style={{
                  display: "flex",
                  gap: 9,
                  alignItems: "baseline",
                  fontSize: 14,
                  color: "var(--ink-soft)",
                  lineHeight: 1.5,
                }}
              >
                <Bullet />
                {it}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 4. RESEARCH & TARGET PERSONAS ── */}
      {cs.personas && cs.personas.length > 0 && (
        <div
          style={{
            background: "var(--surface)",
            borderTop: "1px solid var(--line)",
            borderBottom: "1px solid var(--line)",
          }}
        >
          <div className="wrap" style={{ padding: "80px 40px" }}>
            <span className="eyebrow">User Research</span>
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
              Target User Personas &amp; Friction
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 24,
              }}
            >
              {cs.personas.map((p, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "var(--bg)",
                    border: "1px solid var(--line)",
                    borderRadius: 18,
                    padding: "26px 22px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 12,
                      }}
                    >
                      <span className="font-display" style={{ fontSize: 18, fontWeight: 600 }}>
                        {p.name}
                      </span>
                      <span className="font-mono grad-text" style={{ fontSize: 11, fontWeight: 700 }}>
                        Persona 0{idx + 1}
                      </span>
                    </div>
                    <div
                      className="font-mono"
                      style={{
                        fontSize: 11,
                        color: "var(--ink-muted)",
                        textTransform: "uppercase",
                        marginBottom: 18,
                      }}
                    >
                      {p.role}
                    </div>

                    <div style={{ marginBottom: 14 }}>
                      <div
                        className="font-mono"
                        style={{ fontSize: 10, color: "var(--ink)", fontWeight: 600, textTransform: "uppercase", marginBottom: 4 }}
                      >
                        Goal &amp; Motivation
                      </div>
                      <p style={{ fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.55 }}>
                        {p.goal}
                      </p>
                    </div>

                    <div>
                      <div
                        className="font-mono"
                        style={{ fontSize: 10, color: "#ff4d4f", fontWeight: 600, textTransform: "uppercase", marginBottom: 4 }}
                      >
                        Core Friction / Pain Point
                      </div>
                      <p style={{ fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.55 }}>
                        {p.frustration}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── 5. USABILITY TESTING MATRIX (Nielsen Rating Scale) ── */}
      {cs.usabilityTests && cs.usabilityTests.length > 0 && (
        <div className="wrap" style={{ padding: "80px 40px" }}>
          <span className="eyebrow">Empirical Testing</span>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(26px,4vw,42px)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              marginTop: 14,
              marginBottom: 12,
            }}
          >
            Usability Testing &amp; Nielsen Severity Matrix
          </h2>
          <p
            style={{
              fontSize: 16,
              fontWeight: 300,
              color: "var(--ink-soft)",
              marginBottom: 36,
              maxWidth: 680,
              lineHeight: 1.6,
            }}
          >
            Evaluated critical user tasks using Nielsen's Severity Scale (0–4) to prioritize interface friction and iterate high-friction journeys before handoff.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {cs.usabilityTests.map((t, idx) => (
              <div
                key={idx}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                  borderRadius: 16,
                  padding: "22px 26px",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: 20,
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "inline-block",
                      padding: "3px 10px",
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: 700,
                      fontFamily: "'JetBrains Mono', monospace",
                      background: "rgba(255,255,255,0.06)",
                      color: t.severityColor,
                      border: `1px solid ${t.severityColor}40`,
                      marginBottom: 8,
                    }}
                  >
                    {t.severity}
                  </div>
                  <div className="font-display" style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)" }}>
                    {t.task}
                  </div>
                </div>

                <div>
                  <div className="font-mono" style={{ fontSize: 10.5, color: "var(--ink-muted)", textTransform: "uppercase", marginBottom: 4 }}>
                    Observed Friction
                  </div>
                  <p style={{ fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.5 }}>
                    {t.issue}
                  </p>
                </div>

                <div>
                  <div className="font-mono" style={{ fontSize: 10.5, color: "var(--accent)", textTransform: "uppercase", marginBottom: 4 }}>
                    UX Resolution / Design Fix
                  </div>
                  <p style={{ fontSize: 13.5, color: "var(--ink)", lineHeight: 1.5 }}>
                    {t.solution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 6. UI SCREENS GALLERY ── */}
      {cs.screens && cs.screens.length > 0 && (
        <div
          style={{
            background: "var(--bg-2)",
            borderTop: "1px solid var(--line)",
            borderBottom: "1px solid var(--line)",
          }}
        >
          <div className="wrap" style={{ padding: "80px 40px" }}>
            <span className="eyebrow">Design System &amp; Flows</span>
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
              High-Fidelity Interface Delivery
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
                    borderRadius: 18,
                    padding: 18,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <SafeImage
                    src={screen.src}
                    alt={screen.title}
                    style={{ maxHeight: 400, objectFit: "cover" }}
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

      {/* ── 7. CHALLENGE & CONSTRAINTS ── */}
      {cs.challenge && (
        <div
          className="wrap grid-2"
          style={{
            padding: "80px 40px",
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
            <span className="eyebrow">Technical Constraints</span>
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

      {/* ── 8. SOLUTION ── */}
      {cs.solution && (
        <div
          style={{
            background: "var(--surface)",
            borderTop: "1px solid var(--line)",
            borderBottom: "1px solid var(--line)",
          }}
        >
          <div className="wrap" style={{ padding: "82px 40px" }}>
            <span className="eyebrow">The Architecture</span>
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
              What Was Architected &amp; Shipped
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
                    background: "var(--bg-2)",
                    border: "1px solid var(--line)",
                    borderRadius: 16,
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

      {/* ── 9. MEASURABLE IMPACT ── */}
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
                Key Outcomes &amp; Metrics
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
                  <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
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
                        <span className="grad-text" style={{ fontWeight: 700 }}>
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

      {/* ── 10. NEXT CASE STUDY NAV ── */}
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
      b: "I believe great product design lives right at the intersection of customer empathy, business strategy, and engineering viability. Over the past 5+ years, I have shaped B2C and SaaS platforms by translating raw user research and business targets into elegant, scalable digital systems.",
    },
    {
      h: "Systems & Discovery.",
      b: "From Figma component libraries and token architectures to user journey mapping and A/B experimentation, my approach is grounded in end-to-end thinking. I partner closely with engineers via Figma Dev Mode to ensure designs execute with pixel perfection, zero spec ambiguity, and strict WCAG accessibility compliance.",
    },
  ];

  const strengths = [
    {
      t: "End-to-End Ownership",
      d: "Guiding products from exploratory UX research and journey maps to production QA.",
    },
    {
      t: "Design Systems & Tokens",
      d: "Building reusable component systems that accelerate cross-functional sprint velocity.",
    },
    {
      t: "Data-Driven Iteration",
      d: "Leveraging GA4, Mixpanel, and Hotjar to measure and elevate engagement.",
    },
    {
      t: "Engineering Symbiosis",
      d: "Figma Dev Mode specs, annotations, and front-end familiarity (HTML/CSS/JS).",
    },
  ];

  return (
    <main style={{ paddingTop: 70 }}>
      <div className="wrap" style={{ padding: "64px 40px 52px" }}>
        <div className="anim-up d1">
          <span className="eyebrow">About Ganesh Kolluri</span>
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
            SaaS, mobile, and digital product experiences.
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
            <SafeImage src={PORTRAIT} alt="Ganesh Kolluri - Senior Product Designer" />
            <div className="caption">
              <span className="cap-name">Ganesh Kolluri</span>
              <span className="cap-loc">Senior Designer</span>
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
                  style={{ background: "var(--surface)", padding: "20px 20px" }}
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
            delivering measurable impact.
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
          cross-functional teams.
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
   DEDICATED PROJECTS PAGE
   Professional, high-impact portfolio layout
───────────────────────────────────────────── */
function ProjectsPage({ go }) {
  useScrollReveal("projects");

  return (
    <main style={{ paddingTop: 70 }}>
      {/* Header */}
      <div className="wrap" style={{ padding: "64px 40px 52px" }}>
        <div className="anim-up d1">
          <span className="eyebrow">Featured Portfolio</span>
        </div>
        <h1
          className="font-display anim-up d2"
          style={{
            fontSize: "clamp(38px,6vw,78px)",
            fontWeight: 600,
            letterSpacing: "-0.035em",
            lineHeight: 1.03,
            maxWidth: 900,
            marginTop: 14,
          }}
        >
          Selected projects &amp;{" "}
          <em className="grad-text" style={{ fontStyle: "italic", fontWeight: 400 }}>
            live digital products.
          </em>
        </h1>
        <p
          className="anim-up d3"
          style={{
            fontSize: 17,
            fontWeight: 300,
            color: "var(--ink-soft)",
            marginTop: 18,
            maxWidth: 640,
            lineHeight: 1.7,
          }}
        >
          A curated gallery of full-stack web applications, SaaS tools, and design-led digital products built with emphasis on interaction precision and engineering execution.
        </p>
      </div>

      <hr className="rule" style={{ margin: "0 40px" }} />

      {/* Projects Showcase Stream */}
      <div className="wrap" style={{ padding: "80px 40px", display: "flex", flexDirection: "column", gap: 96 }}>
        {PROJECTS.map((proj, idx) => (
          <article
            key={proj.id}
            className="reveal"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--line)",
              borderRadius: 24,
              overflow: "hidden",
              boxShadow: "0 24px 60px -20px rgba(0,0,0,0.2)",
              display: "grid",
              gridTemplateColumns: idx % 2 === 0 ? "1.15fr 0.85fr" : "0.85fr 1.15fr",
              gap: 0,
              alignItems: "stretch",
            }}
          >
            {/* Project Image Card */}
            <div
              style={{
                order: idx % 2 === 0 ? 1 : 2,
                position: "relative",
                minHeight: 380,
                background: "var(--bg-2)",
                overflow: "hidden",
                borderRight: idx % 2 === 0 ? "1px solid var(--line)" : "none",
                borderLeft: idx % 2 !== 0 ? "1px solid var(--line)" : "none",
              }}
            >
              <img
                src={proj.image}
                alt={proj.title}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  background: "var(--nav-glass)",
                  backdropFilter: "blur(10px)",
                  padding: "6px 14px",
                  borderRadius: 100,
                  border: "1px solid var(--line)",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: "var(--ink)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {proj.category}
              </div>
            </div>

            {/* Project Details */}
            <div
              style={{
                order: idx % 2 === 0 ? 2 : 1,
                padding: "clamp(32px, 5vw, 56px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                background: "var(--surface)",
              }}
            >
              <div>
                <div className="font-mono grad-text" style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>
                  Project 0{idx + 1} · {proj.year}
                </div>
                <h2 className="font-display" style={{ fontSize: "clamp(24px, 3.2vw, 36px)", fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.15 }}>
                  {proj.title}
                </h2>
                <p style={{ fontSize: 15, fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.7, marginTop: 16 }}>
                  {proj.desc}
                </p>

                {/* Tech Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 22 }}>
                  {proj.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Metrics Grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 16,
                    marginTop: 32,
                    paddingTop: 24,
                    borderTop: "1px solid var(--line)",
                  }}
                >
                  {proj.stats.map((st) => (
                    <div key={st.label}>
                      <div className="font-display grad-text" style={{ fontSize: 20, fontWeight: 700 }}>
                        {st.val}
                      </div>
                      <div className="font-mono" style={{ fontSize: 10, color: "var(--ink-muted)", marginTop: 4, textTransform: "uppercase" }}>
                        {st.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 36 }}>
                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-fill"
                  style={{ padding: "10px 18px" }}
                >
                  Live Demo <span>↗</span>
                </a>
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost"
                  style={{ padding: "10px 18px" }}
                >
                  Source Code <span>⌥</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Footer CTA */}
      <div style={{ background: "var(--surface)", borderTop: "1px solid var(--line)", textAlign: "center" }}>
        <div className="wrap" style={{ padding: "76px 40px" }}>
          <div className="reveal">
            <span className="eyebrow" style={{ display: "inline-flex", justifyContent: "center" }}>
              Collaborate
            </span>
            <h2 className="font-display" style={{ fontSize: "clamp(28px,4.5vw,52px)", fontWeight: 600, letterSpacing: "-0.03em", margin: "16px 0 28px" }}>
              Have an ambitious build in mind?
            </h2>
            <button className="btn btn-fill" onClick={() => go("contact")}>
              Let's Talk Architecture →
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
    { label: "Projects", p: "projects" },
    { label: "Experience", p: "experience" },
    { label: "Contact", p: "contact" },
  ];
  return (
    <footer
      style={{
        borderTop: "1px solid var(--line)",
        background: "var(--bg-2)",
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
              Ganesh Kolluri.
            </div>
            <div
              className="font-mono"
              style={{
                fontSize: 11,
                color: "var(--ink-muted)",
                marginTop: 3,
              }}
            >
              © {new Date().getFullYear()} Ganesh Kolluri. All rights reserved.
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
  const [theme, setTheme] = useState("dark"); // "dark" | "light"

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

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
    <div className={`pf-root ${theme}`}>
      <GlobalStyles />
      <Nav page={page} go={go} theme={theme} toggleTheme={toggleTheme} />
      {page === "home" && <HomePage go={go} openCase={openCase} />}
      {page === "projects" && <ProjectsPage go={go} />}
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