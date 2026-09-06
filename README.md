# Fugaz site — clean export

Only what `FugazLanding.dc.html` actually loads. Drop this folder anywhere and open
`FugazLanding.dc.html`; nothing else is needed.

## Two ways to use it

- `Fugaz Agency.html` — one self-contained 16.4 MB file, works offline, no other files needed.
- `FugazLanding.dc.html` + the folders below — the editable source tree.

## Contents (43 referenced files, all present)

- `FugazLanding.dc.html` — the site
- `support.js` — Design Component runtime
- `ds-base.js` — loads the design system (stylesheet + bundle)
- `lanyard.js` — the draggable founder badge
- `_ds/fugaz-design-system-…/` — design system: tokens, figma CSS, `_ds_bundle.js`
- `assets/` — 32 files, incl. `favicon.svg`: founder photos + clips, avatars, badges, client marks, the hero car, the car strip, logo marks, WhatsApp glyph
- `assets/work/` — 10 project images

## Left out

- `assets/avatar-diego-v3.png`
- `assets/avatar-diego-v7.png`
- `assets/client-freightflow.png`
- `assets/client-gd1.svg`
- `assets/ideas-car-strip.png`
- `assets/logo-mark.svg`
- `assets/logo-wordmark-white.svg`
- `assets/partner-dubai-airports.svg`
- `assets/partner-emirates.svg`
- `assets/partner-hermes.svg`
- `assets/partner-louis-vuitton.svg`
- `assets/team-both-founders-sm.jpg`
- `assets/team-both-founders.png`
- `assets/team-diego-chair.png`
- `assets/team-diego-portrait-sm.jpg`
- `assets/team-diego-portrait-v2.jpg`
- `assets/team-diego-portrait-v3.png`
- `assets/team-diego-sm.jpg`
- `assets/team-diego-v4.jpg`
- `assets/team-diego.jpg`
- `assets/team-luka-chair-sm.jpg`
- `assets/team-luka-chair.png`
- `assets/team-luka-portrait-v2.jpg`
- `assets/team-luka-sunset.jpg`
- `assets/team-luka-v4.jpg`
- `assets/official/` (+ its 10 bitmaps) — the Figma `.fugaz-media-*` sheet; no class from it is used any more
- `FugazIntro.dc.html`, `Fugaz Landing.html`, `scraps/`, `uploads/` — drafts and source material

Note: the partner marks in the design system (Hermès, Louis Vuitton, Dubai Airports, Emirates)
are **not** used by the site — the client row runs on the real client logos in `assets/client-*`.
They stay available in the design system under `uploads/Fugaz Design System/assets/`.
