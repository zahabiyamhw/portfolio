# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # local dev server → http://localhost:5173/portfolio/
npm run build      # production build into dist/
npm run preview    # preview the production build locally
npm run deploy     # build + push to gh-pages branch (requires git remote)
```

## Deployment

Hosted at `https://zahabiyamhw.github.io/portfolio/`.  
The `base` in `vite.config.js` is set to `/portfolio/` — all asset paths must account for this prefix.  
The PDF resume lives in `public/Zahabiya_SE_1.pdf` and is referenced as `/portfolio/Zahabiya_SE_1.pdf`.

## Architecture

Single-page React app (Vite). No router — pure scroll-based navigation.

**Two-column layout (desktop ≥1024px):**  
`LeftPanel` is `position: sticky; height: 100vh` — it never scrolls. The right column scrolls through all sections. On mobile, `LeftPanel` is hidden and replaced by `MobileHeader` (shown once at top) and `MobileNav` (floating lines on the right edge).

**Active section tracking:**  
`App.jsx` uses `IntersectionObserver` on each section `id`. The active section is lifted up to `App` and passed down to `LeftPanel` (for nav highlighting) and `MobileNav` (for line highlighting).

**All content lives in `src/data/resume.js`** — edit that file to update any copy, not the components.

## Secret terminal

Press `` ` `` (backtick) anywhere on the page to open/close the terminal overlay.  
Supported commands: `help`, `whoami`, `ls`, `ls skills/`, `cat summary`, `experience`, `joke`, `clear`, `exit`.  
Adding a new command: add a `case` to the `runCommand` switch in `src/components/Terminal.jsx` and list it in the `help` output.
