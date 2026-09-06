# Fugaz Agency — website export

Upload this whole folder. `index.html` is the entry point and is an exact copy of the site
(byte-identical to `FugazLanding.dc.html`); nothing has been rewritten or stripped.

## What must travel together

- `index.html` (+ `FugazLanding.dc.html`, the same file under its working name)
- `support.js`, `ds-base.js`, `lanyard.js`
- `_ds/` — the design system (tokens, keyframes, bundle)
- `assets/` — 32 files: founder stills + clips, avatars, badges, client marks, hero car, car strip, logo marks, favicon, WhatsApp glyph
- `assets/work/` — 10 project images

Every reference in the page resolves inside this folder; nothing points outside it except the
Satoshi webfont (Fontshare CDN) and the social / WhatsApp / mail links.

## Notes

- The two founder clips are fast-start H.264 MP4s. Serve them as files from the same folder —
  iOS needs byte-range support on the host, which every mainstream host provides.
- If the host shows an older version after upload, it is caching: hard-refresh or purge.
