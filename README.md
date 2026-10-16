# 💡 Lumo — SaaS Landing Page

A polished, fully responsive product landing page for a fictional team task-manager SaaS. Built with **pure HTML, CSS and vanilla JavaScript** — no frameworks, no build step, no dependencies.

**Live demo:** https://muhammadawais047.github.io/landing-page/

## Features

- **Sticky glass header** with scroll shadow and an animated hamburger menu on mobile
- **Hero with a pure-CSS product mockup** — dashboard window, animated bar chart, task list (zero images)
- **Count-up stats** that animate when scrolled into view (`IntersectionObserver`)
- **Monthly / yearly pricing toggle** driven by `data-*` attributes with `aria-pressed` state
- **5-item FAQ accordion** with smooth max-height transitions and proper `aria-expanded`
- **Scroll-reveal animations** with per-element stagger and full `prefers-reduced-motion` support
- **Semantic, accessible markup** — skip link, focus-visible styles, labelled nav landmarks
- **Fully responsive** across desktop, tablet and mobile

## Tech

| Layer  | Choice                                            |
| ------ | ------------------------------------------------- |
| Markup | Semantic HTML5                                    |
| Style  | Modern CSS (grid, custom properties, gradients)   |
| Logic  | Vanilla ES2020 JavaScript, IIFE, no dependencies  |

## Run locally

```bash
# any static server works
python -m http.server 8080
# then open http://localhost:8080
```

Or simply open `index.html` in a browser.

## Project structure

```
landing-page/
├── index.html   # page content & structure
├── styles.css   # theme, layout, animations, responsive rules
└── app.js       # nav, pricing toggle, FAQ, reveal & count-up
```

---

© 2026 [Muhammad Awais](https://github.com/MuhammadAwais047) — fictional product built for portfolio purposes. Licensed under the [MIT License](LICENSE).
