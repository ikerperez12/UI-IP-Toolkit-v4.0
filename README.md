# UI IP Toolkit

<p align="center">
  <a href="https://ui-ip-toolkit.vercel.app/"><strong>Live Demo</strong></a>
  |
  <a href="#quick-start"><strong>Run Locally</strong></a>
  |
  <a href="#architecture"><strong>Architecture</strong></a>
</p>

<p align="center">
  <img alt="Static Site" src="https://img.shields.io/badge/runtime-static-0b0b10?style=flat-square">
  <img alt="JavaScript" src="https://img.shields.io/badge/frontend-HTML%20%2B%20CSS%20%2B%20JS-c2a4ff?style=flat-square">
  <img alt="Deployment" src="https://img.shields.io/badge/deploy-Vercel-111827?style=flat-square">
  <img alt="Security Headers" src="https://img.shields.io/badge/security-hardened-38bdf8?style=flat-square">
</p>

UI IP Toolkit is a public-facing static catalog of copy-ready frontend assets: gradients, buttons, fonts, loading states, hover treatments, glass surfaces, layout fragments, and reusable product UI patterns. It is designed to feel like a polished product library rather than a loose code dump, while remaining safe to publish and trivial to deploy on Vercel.

## Preview

<p align="center">
  <img src=".github/assets/ui-ip-toolkit-demo.gif" alt="Animated preview of UI IP Toolkit" width="100%">
</p>

<p align="center">
  <img src=".github/assets/ui-ip-toolkit-bento.png" alt="Bento overview of key UI IP Toolkit sections" width="100%">
</p>

## Highlights

- Poster-style landing page with dense sectioned browsing and explicit pagination instead of endless oversized grids.
- Expanded visual systems across color tokens, curated gradients, keyframe patterns, typography, buttons, loading states, text effects, shadows, hover effects, glass UI, and interactive utilities.
- Local asset strategy only: background audio, fonts, scripts, and documentation media are served from the repository with no third-party runtime dependencies.
- Copy-first workflow: each card keeps a direct snippet payload so the catalog remains useful as a working toolkit, not just a gallery.
- Public-safe static deployment posture with Vercel headers, CSP, restrictive policies, and no backend surface.
- README and preview assets generated from the real deployed experience to keep the repository presentation aligned with the product.

## Tech Stack

| Layer | Tools |
| --- | --- |
| App shell | `index.html`, semantic sections, handcrafted CSS |
| Interaction | `assets/app.js`, DOM-driven pagination, copy actions, background audio control |
| Motion | CSS keyframes, reveal transitions, cursor layer, hover states |
| Typography | Local font assets in `assets/fonts/` |
| Documentation media | Generated screenshots, GIF, hero, bento assets in `.github/assets/` |
| Deployment | Vercel static hosting via `vercel.json` |
| Security | CSP, `Referrer-Policy`, `Permissions-Policy`, frame blocking, MIME hardening |

## Architecture

```mermaid
flowchart LR
  User["Browser user"] --> Vercel["Vercel static deployment"]
  Vercel --> HTML["index.html"]
  HTML --> JS["assets/app.js"]
  HTML --> Fonts["assets/fonts/*"]
  HTML --> Audio["assets/audio/the-high-ridge.mp3"]
  HTML --> Media[".github/assets + docs/images"]
  JS --> Catalog["Paginated UI sections + copy payloads"]
  JS --> UX["Cursor, reveal, audio, navigation state"]
```

## Quick Start

```bash
git clone https://github.com/ikerperez12/UI-IP-Toolkit-v4.0.git
cd UI-IP-Toolkit-v4.0
npm install
npm start
```

Open `http://127.0.0.1:3333/`.

This project is fully static, so there is no backend boot sequence, no environment secret requirement, and no build-time service dependency for local preview.

## Production Notes

- Live URL: [ui-ip-toolkit.vercel.app](https://ui-ip-toolkit.vercel.app/)
- Deployment target: Vercel static site from the repository root
- Security contract: response headers are defined in `vercel.json`
- Runtime assets: `assets/app.js`, `assets/audio/`, and `assets/fonts/` are self-hosted
- Marketing assets: `.github/assets/` is reserved for README and repository presentation media
- Metadata: canonical URL and social tags live in `index.html`

## Repository Status

This repository is intentionally shaped as a clean public product surface: static-only, deployable as-is, documentation-backed, and free from internal environment coupling.
