# Portfolio — EL YOUSFI Hajar

Personal portfolio of **EL YOUSFI Hajar** — M2 ISERT (FSTM) engineer at the intersection of **AI · Telecom · Cybersecurity · Embedded Systems**. Open to a 6-month PFE from February 2027 (Casablanca / Rabat).

Live: https://hajar-mythos7.github.io

## Design

**Elite Engineering × AI Research Lab** — dark graphite (`#050505`), editorial layout, strong display type (Space Grotesk + Inter), hairline rules, technical diagrams, restrained electric-blue accent. Motion is sparse and UX-driven; all effects respect `prefers-reduced-motion`.

## Structure

```
index.html                          flagship — full experience
telecom.html                        direction page — Telecom & Networks (accent teal)
ia.html                             direction page — AI & Embedded (accent violet)
case-studies/
  o-ran.html                        Proactive Load Balancing in 5G O-RAN (featured)
  intrusion-camera.html             Intelligent Intrusion Detection Camera
  ai-safe-drive.html                AI Safe Drive Guardian
  webscada.html                     WebSCADA Pro
css/style.css                       shared design system (accent via body.type-*)
js/main.js                          nav, reveal, hero canvas, cursor, magnetic, reduced-motion
assets/cv/*.pdf                     the 6 CVs (3 directions × FR/EN)
```

## Principles

- Static-first, zero build step (GitHub Pages friendly).
- No invented metrics — every figure on the site comes from the projects.
- Semantic HTML, keyboard-accessible focus states, one canvas instance per page, hierarchy: featured case study > secondary projects > archive rows.

## Update

`git add -A && git commit -m "message" && git push` → Pages redeploys automatically.