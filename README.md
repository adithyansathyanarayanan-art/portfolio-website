# Adithyan S. — Portfolio

Personal portfolio of Adithyan Sathyanarayanan: illustration, design and
visual storytelling. A small, dependency-free static site with three pages:

- **Work** (`index.html`) — a masonry gallery of projects. Clicking a project
  opens a full-screen project view with a tab bar for jumping between
  projects, previous/next buttons, and an image lightbox.
- **About** (`about.html`) — portrait and bio, with links to get in touch.
- **Contact** (`contact.html`) — contact details, ordered by how active each
  channel is: Instagram first (with Behance beside it), then direct contact
  (phone, WhatsApp), then professional (email, LinkedIn).

## Files

```
index.html        Work page: gallery, project view, lightbox, all page scripts
about.html        About page
contact.html      Contact page
style.css         All styling for every page
assets/
  images/         Artwork, thumbnails, portrait and icons
  videos/         Project videos
```

There's no build step. The only external dependency is two Google Fonts
(`Newsreader` for headings, `Work Sans` for body text), loaded with a
`<link>` tag in each page.

## Running it locally

Open `index.html` in a browser, or serve the folder with any static server
(serving it lets you test on a phone on the same network, and lets the
video scrub properly), for example:

```
npx serve .
```

## The Work page

### Gallery

The gallery is Pinterest-style masonry: every card keeps its image's own
shape, and cards pack into as many columns as fit (each at least 260px
wide; always two on phones). A short script at the bottom of `index.html`
sizes each card's grid rows from its height, and re-runs on its own when
images load or the window is resized. Card *n* opens project *n*.

### Project view

Each project is an `<article class="panel">` inside the project view,
matched to its gallery card and its tab by `data-index` / `id`. Projects
1–4 use the **stacked** layout (`panel panel--stacked`): title, then the
image(s) centred, then the write-up. Images are capped at 55% of the window
height so the text starts on the same screen. To keep their shape while
capped, each `.panel-gallery` carries a `--ratio` (the images' combined
width ÷ height), plus `--gaps` when images sit side by side.

Project 5 uses the original two-column layout (image left, text right).

Other behaviour:

- **Lightbox** — click any project image to see it larger; projects with
  several images get previous/next arrows.
- **Video** (project 4) — a native player with a poster image. It pauses
  when you switch projects or close the view, and the mouse pointer comes
  back in fullscreen.
- **Keyboard** — arrow keys switch projects (or seek, when the video has
  focus), Esc closes, and focus stays inside the view while it's open.

## Editing content

Placeholder text is in square brackets — search for `[` in `index.html` to
find each project's role, year, tools, overview and problem / approach /
outcome sections, and the project titles (`Project Title One` …).

**Adding an image to a project:** put the file in `assets/images/`, add an
`<img>` with its real `width` and `height`, and update that project's
`--ratio` (see above). Large source files are best exported as a smaller
web copy first (the About portrait, for example, is a 1000px-wide JPEG made
from the full-size original).

**Adding or removing a project:** add or remove a matching gallery card
(`.gallery-item`), project tab (`.pv-tab`) and panel (`.panel`), keeping
their numbers in sync. The scripts work off however many exist.

## Design notes

- **Palette** — dark green-black background (`#0D1613`), off-white text
  (`#F3F1EB`), a red accent (`#DF301C`) for underlines and the cursor dot,
  and teal (`#00B7CD`) for links and hover states. All defined as CSS
  variables at the top of `style.css`.
- **Type** — `Newsreader` (serif) for headings and display text,
  `Work Sans` for everything else.
- **Motion** — a custom cursor dot, a tilt on hover over project images, a
  small settle animation when switching projects, and a hidden Konami-code
  easter egg. Animations are switched off for visitors with
  `prefers-reduced-motion` set.

## Deploying

It's a fully static site, so any static host works (GitHub Pages, Netlify,
Vercel, Cloudflare Pages…). Upload the HTML files, `style.css` and the
`assets/` folder together — nothing needs building.
