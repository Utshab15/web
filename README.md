# Pathak Web Works

A production-ready, single-page agency website for **Pathak Web Works** — a modern web development studio.

## Features

- Dark-mode design with glassmorphism, gradient accents, and subtle grid background
- Fully responsive (Desktop 1440px+, Laptop 1024px, Tablet 768px, Mobile 375px)
- Sticky navigation with mobile drawer
- Interactive hero device mockup with viewport toggles
- Animated tech stack marquee
- Filterable portfolio showcase
- 4-step process pipeline
- Tiered pricing with interactive scope estimator
- Contact form with inline validation, service chips, and file upload
- Scroll-triggered reveal animations

## Quick Start

No build step required. Open `index.html` in any modern browser:

```
d:\Work Website\index.html
```

Or serve locally with any static server (Python, Live Server extension, etc.):

```bash
# Python 3
python -m http.server 8080
```

Then visit `http://localhost:8080`

## Customize

| What to change | File | Location |
|---|---|---|
| Contact email & phone | `index.html` | Contact section |
| Pricing tiers | `index.html` | Pricing section |
| Portfolio projects | `index.html` | Portfolio section |
| Brand colors | `styles.css` | `:root` CSS variables |
| Form behavior | `script.js` | Contact form handler |

## Deploy

Upload all files to any static host:

- **Netlify** — drag & drop the folder
- **Vercel** — import the directory
- **GitHub Pages** — push to a repo and enable Pages
- **Cloudflare Pages** — connect repo or upload

## File Structure

```
index.html   — Full page markup (all sections)
styles.css   — Global styles, responsive breakpoints, animations
script.js    — Nav, portfolio filter, pricing estimator, form validation
```

## License

© 2026 Pathak Web Works. All rights reserved.
