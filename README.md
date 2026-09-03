# Portfolio Website (Starter)

A simple, dependency-free portfolio site: a landing section up top, and a
tab-based "Selected work" section below it with five project slots. Click
any of the five tabs to swap in that project's detail panel.

## Files

- `index.html` — page structure and content (all placeholder text)
- `style.css` — all styling (colors, type, layout, responsive rules)
- `README.md` — this file

There's no build step and no dependencies beyond two Google Fonts
(`Newsreader` for headings, `Work Sans` for body text), loaded via a
`<link>` tag in `index.html`. Everything else — including the tab
interaction — is plain HTML/CSS/JS.

## Running it locally

Just open `index.html` in a browser. No server or build tools required.

If you want to serve it locally (useful for testing on other devices on
your network), from this folder run:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## How the tabs work

Each of the 5 project tabs is a `<button role="tab">`. Clicking one (or
using the arrow keys while a tab is focused) shows the matching
`<article role="tabpanel">` below and hides the other four. The logic
lives in the small `<script>` block at the bottom of `index.html` — there's
nothing to configure, it just matches each tab's `aria-controls` attribute
to a panel's `id`.

## Customizing content

Everything you're likely to want to change is marked with square brackets,
like `[Your Name]` or `[Placeholder — ...]`. Search for `[` in `index.html`
to find every spot that needs real content:

- **Header**: your name/wordmark
- **Hero section**: your headline, intro paragraph, and call-to-action link
- **Each of the 5 tabs**: a short title and one-line summary (shown in the
  tab strip itself)
- **Each of the 5 detail panels**: role, year, tools, an overview
  paragraph, and problem / approach / outcome sections, plus a link to the
  live project
- **Footer**: contact email and social links

Each panel also has a `.panel-media` block — a placeholder pattern with a
"Project image placeholder" label. Swap it for a real `<img>` or background
image once you have screenshots or artwork for that project.

## Adding, removing, or reordering projects

The site is currently wired for exactly 5 projects (5 tabs ↔ 5 panels), to
match a `repeat(5, 1fr)` grid in `style.css`. To change the count:

1. In `index.html`, add/remove a matching `<button role="tab">` /
   `<article role="tabpanel">` pair. Keep each tab's `aria-controls` in
   sync with its panel's `id`, and give each a unique `id` /
   `aria-labelledby` pair.
2. In `style.css`, update `.tabs { grid-template-columns: repeat(5, 1fr); }`
   to the new count.

The JavaScript doesn't need to change — it works off however many
`.tab` / `.panel` elements exist on the page.

## Design notes

- **Palette**: warm paper background, near-black ink text, and a mustard
  accent used sparingly (the active tab's underline, links, hover states).
- **Type**: `Newsreader` (serif) for headings, `Work Sans` for everything
  else.
- **Motion**: kept deliberately minimal — the active tab's underline
  animates in, and the detail panel does one small fade/settle transition
  when you switch projects. Nothing animates on scroll or on hover besides
  color changes. All of it is disabled automatically for visitors with
  `prefers-reduced-motion` set.

## Deploying

This is a fully static site, so any static host works: GitHub Pages,
Netlify, Vercel, Cloudflare Pages, or a plain file upload to any web
server. There's nothing to build — just upload `index.html` and
`style.css` together.
