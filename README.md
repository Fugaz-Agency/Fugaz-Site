# fugaz-agency.com

Static marketing site for Fugaz Agency. No build step, no framework runtime, no
package manager. Push to `main` and Vercel serves the folder as is.

**Live:** https://fugaz-agency.com

## Layout

```
index.html          entire page: markup, styles and behaviour in one document
support.js          scroll, reveal and pin engine
lanyard.js          physics for the hanging team cards
ds-base.js          design-system runtime
_ds/                design tokens, keyframes, font bundle
assets/             imagery, video, icons
vercel.json         cache and security headers
robots.txt          crawl policy
sitemap.xml         single-route sitemap
```

Everything resolves inside the folder. The only external requests are the Satoshi
webfont from the Fontshare CDN and the outbound social links.

## Deploying

Vercel is wired to this repo and deploys `main` on push. There is nothing to
build, so a deploy is a file copy.

DNS runs through the domain registrar. The apex record points at Vercel; the
`www` subdomain currently has no record.

## Styling

Styles live inline on the elements and in a single `<style>` block in the head.
That is intentional, not an oversight.

The reveal engine in `support.js` reads `getAttribute("style")` and tests it
against `/transform|transition|animation/` to decide whether an element is
already owned by another animation. Elements tagged `data-atmo` and
`data-atmo-card` are read with `parseFloat(el.style.opacity)`. Moving those
declarations into a stylesheet changes what the engine sees, and the reveals
start behaving differently.

The same applies to `will-change`. It looks like dead weight at 727
declarations, but it decides which elements get their own compositing layer.
Two things break when you strip it:

1. An element carrying `will-change` becomes a containing block, so any
   `position:fixed` descendant positions against that element instead of the
   viewport. The close button of the scan modal sits at `position:fixed` and
   stops being clickable.
2. The pinned panels animate their `clip-path` on scroll. Without the hint the
   browser rasterises the rounded corners differently and the edges go hard.

## Grain

Three grain overlays ship with the page: one under the client logos, one in
Process, one in the footer. Only the first is visible; the other two sit at
`opacity: 0`.

They are hidden rather than deleted because the Process layer carries
`mix-blend-mode: multiply`. A blending child forces the browser to render its
container as an isolated group, which is what makes the animated `clip-path`
apply its 29px radius cleanly. Remove the child and the panel corners square off.

## Scan form

The five-step scan posts to Web3Forms and lands in the agency inbox. The
endpoint and access key can be overridden before `support.js` runs:

```html
<script>
  window.FUGAZ_SCAN_ENDPOINT = "https://your-endpoint";
  window.FUGAZ_ACCESS_KEY = "your-key";
</script>
```

## Assets

Photography is WebP at quality 82. The founder clips are fast-start H.264 MP4s
and need byte-range support on the host, which Vercel provides.

Icons are generated from `assets/favicon.svg`: a multi-size `.ico`, 192 and 512
PNGs for Android, and a 180px `apple-touch-icon.png` on a white background
because iOS ignores SVG favicons.

## Working on this

The page is generated from a design tool, so edits made directly in
`index.html` are lost on the next export. Change the design, export, then
reapply the items above.

## Open

* `www.fugaz-agency.com` has no DNS record
* the sitemap has not been submitted to Search Console
* the head `<style>` block leans on `!important` in ~600 places; harmless for
  performance, worth pruning if the block is ever hand-edited
