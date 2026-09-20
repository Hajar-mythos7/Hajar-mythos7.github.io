# Portfolio — EL YOUSFI Hajar

Personal portfolio of **EL YOUSFI Hajar** — M2 ISERT (FSTM) engineer at the intersection of **AI · Telecom · Cybersecurity · Embedded Systems**. Open to a 6-month PFE from February 2027 (Casablanca / Rabat).

Live: https://hajar-mythos7.github.io

## Design

**Elite Engineering × AI Research Lab** — dark graphite (`#050505`), editorial layout, strong display type (Space Grotesk + Inter), hairline rules, technical diagrams, restrained electric-blue accent. Motion is sparse and UX-driven; all effects respect `prefers-reduced-motion`.

## Structure

```
index.html                          flagship — full experience (EN)
index-fr.html                       flagship — version française (FR)
telecom.html                        direction page — Telecom & Networks, teal accent (EN)
telecom-fr.html                     version française
ia.html                             direction page — AI & Embedded, violet accent (EN)
ia-fr.html                          version française
case-studies/
  o-ran.html                        Proactive Load Balancing in 5G O-RAN (featured)
  o-ran-fr.html                     version française
  intrusion-camera.html             Intelligent Intrusion Detection Camera
  intrusion-camera-fr.html          version française
  ai-safe-drive.html                AI Safe Drive Guardian
  ai-safe-drive-fr.html             version française
  webscada.html                     WebSCADA Pro
  webscada-fr.html                  version française
css/style.css                       shared design system (accent via body.type-*)
js/main.js                          nav, reveal, hero canvas, cursor, magnetic, reduced-motion
sitemap.xml                         all 14 pages, EN + FR
assets/cv/*.pdf                     the 6 CVs (3 directions × FR/EN)
```

## Languages

- English is the default (`/`); every page has a French twin `*-fr.html`.
- A language toggle (EN | FR) sits in the nav of every page and links to the paired version.
- FR pages carry a `lang="fr"` attribute and an `<link rel="alternate" hreflang="en">` pointing back.

## Principles

- Static-first, zero build step (GitHub Pages friendly).
- No invented metrics — every figure on the site comes from the projects.
- Semantic HTML, keyboard-accessible focus states, one canvas instance per page, hierarchy: featured case study > secondary projects > archive rows.

## Update

`git add -A && git commit -m "message" && git push` → Pages redeploys automatically.