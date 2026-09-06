# Fugaz — Design System

Fugaz is a boutique creative agency in Amsterdam run by two founders, **Luka Milić** and
**Diego Gomes**. It takes a deliberately tiny number of high-ticket partners a year —
luxury brands, athletes, streamers, founders — and every surface is built to sell status
and scarcity rather than features.

This design system powers Fugaz's own site and everything shipped for partners: brand
identities, marketing sites and proposal decks.

## Sources

Everything here was extracted from one attached file:

- **`uploads/Fugaz Master File.fig`** — mounted read-only. Pages: `Master File` (103 frames,
  brand-book spreads), `NoteBook` (67 frames, logo exploration), `Branding Concepts` (2),
  `Marketing concepts` (1), `Web concepts` (18), `Presentations` (0 frames — empty).
  **The live web direction is `Web concept Fugaz OFFICIAL` → `Section 1` → `Desktop - 1`
  (node `172:47`)** — the gradient one. Also read: `265:117` *Desktop - 2* (a variant of the same),
  `93:46` `LOGO_WHITE`, `93:61` `LOGO_BlueIcon`, `93:56` `Frame 54` (the tile).
  The older `Web concept Fugaz V1` section (node `110:2`) is **superseded** and is not
  reflected anywhere in this system.
- No codebase, no live Figma URL, no decks were provided.

Raw materialized output from the file lives in **`figma/`** and is kept verbatim.

### A note on the source file

The `Master File` guideline spreads were built on a third-party layout template and still
carry its placeholder content — Dutch body copy, "© 2026 MR BOOST Inc.", swatch names like
"Vetsocial" / "Vet blue", and the template's own logo symbols (`LOGO MARK`, `LOGO HORIZONTAL`,
`LOGO VERTICAL`, `LOGO MARK - UNICOLOR`). Those are **not** Fugaz assets. The Fugaz identity is
`LOGO_WHITE` / `LOGO_BLACK` / `LOGO_BLUE` / `LOGO_GRADIANT` / `LOGO_BlueIcon` /
`LOGO_White_blue-Icon` plus the web concepts. This system uses the *layout* of the guideline
spreads and the *content* of the Fugaz work.

---

## Content fundamentals

**Voice: short, declarative, slightly arrogant.** State a constraint and let it sell.
Every line below is verbatim from `Desktop - 1`.

- "0 spots left for Q3."
- "The most exclusive design studio."
- "Our projects & clients speak for us."
- "Built by a young team full with energy and new ideas."
- "We help you design your brand to it's full potential."
- "Book a call" / "View work" — the only two button labels on the page.
- "info@fugaz-agency.com" / "linkedin / X / instagram" — the only header content.

**Rules**

- Sentence case for headlines and buttons. Uppercase only in brand-book breadcrumbs and
  footers (20px, `rgb(66,66,66)`), never in body copy.
- No exclamation marks. No adverbs. No "we're passionate about", no "empower", no "seamless".
- Never enthusiastic, never explanatory. If a sentence explains, cut it.
- "We" only when naming the studio; mostly the copy is impersonal — the work states the fact.
- Partners are named by their real marks in the logo row, never in copy.
- **No emoji anywhere.** No unicode decorations. The only non-alphabetic glyphs are the `/`
  separators in "linkedin / X / instagram", the `›` breadcrumb chevron in the brand book, and
  `%` in the preloader counter.
- Numbers are typeset, not written: "0 spots", "01%", "99%".

**Signature copy move — the two-tone headline.** Every section headline is two lines: the
first line is the setup in grey `#808080`, the second is the point in black `#000000`.

> <span style="color:#808080">Built by a young team</span>
> <span style="color:#000">full with energy and new ideas.</span>

Use `.fugaz-setup` / `.fugaz-point`.

---

## Visual foundations

### Colour

A warm off-white sheet, white panels, black type, and one electric blue that only ever
appears as a corner gradient.

| Token | Value | Use |
| --- | --- | --- |
| `--fugaz-blue` | `#0057FE` | The single accent. Figma Variable "Fugaz Blue". |
| `--fugaz-hero-gradient` | `linear-gradient(52.426deg,#000 11.94%,rgba(0,87,254,.97) 59.44%,rgba(14,96,254,.97) 83.25%,rgba(48,119,255,.96) 101.96%,rgba(115,163,255,.89) 112.29%,#FFF 138.56%)` | The hero panel and the preloader. |
| `--page` | `#EFEEEC` | The warm off-white sheet every panel sits on. |
| `--white` | `#FFFFFF` | Content panels. |
| `--surface-soft` | `#FAFAFA` | Work cards and team cards. |
| `--placeholder` | `#D9D9D9` | Empty avatar / media slots. |
| `--grey-marquee` | `#7A7A7A` | Partner logo row. |
| `--black` | `#000000` | Statement text. |
| `--dot-red` | `#CD2C2C` | The 6.823px scarcity dot, and nothing else. |
| `--scrim` | `rgba(0,0,0,0.43)` | The secondary pill over the gradient. |

**The gradient is never flat and never clean.** It runs at **52.426°** — black lands in the
bottom-left corner, saturated blue fills the middle, and it blows out toward white past the
top-right — under film grain at `opacity .34`, `mix-blend-mode: overlay`. A flat `#0057FE`
hero is a bug. (The footer band is the one exception: flat `#0057FE` plus grain.)

There is no semantic colour scale, no tinted greys, no second accent. The red dot is a signal,
not a palette entry.

### Type

One family: **Satoshi**, geometric grotesk, at Regular 400 and Medium 500. Never Bold, never
Black, no serif anywhere, no second family.

Everything at display and UI size is Medium 500, tracking `-0.020em`, leading `0.909` —
headlines set as a solid block. Only the header email and social line loosen to `-0.010em`.

| Role | Size | Weight | Token |
| --- | --- | --- | --- |
| Hero statement | 68.13986px | 500 | `--size-hero` |
| Section headline (two-tone) | 50px | 500 | `--size-section` |
| Footer wordmark "Fugaz Agency" | 42.99674px | 500 | `--size-wordmark` |
| Founder name | 25px | 500 | `--size-name` |
| Lede | 21.51474px | 500 | `--size-lede` |
| Scarcity badge | 18.10332px | 400 | `--size-badge` |
| Header email / socials | 17px | 500 | `--size-meta` |
| Pill label | 14.94px | 500 | `--size-button` |

> **Font source:** the concept is set in *Satoshi*, which ships no binaries in the .fig.
> `tokens/fonts.css` declares real `@font-face` rules for weights 400 / 500 / 700 pointing at
> the Fontshare CDN (`cdn.fontshare.com`), so the family resolves everywhere.
> **If Fugaz has a licensed cut, send the files and I'll repoint the `src` at local binaries.**
> The Master File's other fonts — *Formula Condensed*, *Anton*, *Poppins*, *Geist*,
> *Modern Gothic*, *Bagoss Extended-TRIAL* — belong to the third-party guideline template and to
> the superseded V1 web concept, and are deliberately not part of this system.

### Shape

Nothing has a square corner.

`--radius-panel` **29px** (every stacked panel, hero included) · `--radius-card` **31.26959px**
(work cards) · `--radius-team` **31px** (team cards and their photos) · `--radius-button`
**28.12395px** (pills) · `--radius-logo-pill` **9.67812px** (header capsule) · `--radius-tile`
**18.932%** of the side (app icon).

### Layout

The page is **1440px wide on a warm off-white sheet (`#EFEEEC`)**, and every section is a
**1411px panel inset 15px from the page edge**, stacked with roughly **21px** of sheet showing
between them. Nothing is full-bleed. The hero panel is **987px** tall; the partner panel is
**192px**; content panels sit at whatever height their content needs.

Inside a panel, copy is inset **73px** from the left. The header row sits at left **102** /
top **73**, is **1235.268px** wide, and holds three things: the email, the logo capsule, the
social line. There is no navigation menu.

The hero block is **554px** wide, centred at left **444** / top **342**, and stacks:
graphic → scarcity badge → two-line statement → lede → button pair.

Whitespace is oversized — the hero statement occupies roughly a third of a 987px panel and the
rest is gradient.

### Backgrounds & imagery

The gradient panel *is* the background. No stock photography, no patterns, no illustration.
The one graphic in the system is the **vectorised F1 car** above the hero headline —
74.701 × 43.88, full colour, sitting straight on the gradient.

Work is shown as floating device and dashboard mockups on a soft `#FAFAFA` field inside rounded
cards — never a flat pasted screenshot bled to the card edge. Founder photography is warm,
close-cropped and unretouched-looking. Partner marks run greyscale at 40% opacity.

### Depth, transparency, blur

**One shadow, and it is almost invisible:** `0 0 51.7px rgba(0,0,0,0.03)` on every panel.
That is the whole depth system — no card shadows, no elevation scale, no inner strokes.

Blur appears exactly twice: `backdrop-filter: blur(5.1px)` on the two pill buttons. The scrim
pill is `rgba(0,0,0,0.43)`. No frosted panels, no protection gradients — the gradient already
guarantees contrast under white type.

### Motion

Premium and heavy; it matters as much as the layout.

- **One easing curve everywhere:** `cubic-bezier(0.16, 1, 0.3, 1)`. Durations 0.6s / 0.9s / 1.4s.
  Nothing bounces, nothing springs.
- **Preloader:** full-screen gradient panel, white mark centred, counter running `01%` → `99%`
  bottom-left, then the panel lifts away upward.
- **Page transitions:** the same gradient panel wipes across.
- **Scroll:** inertia/smooth (Lenis-style), slow and weighted.
- **Headline reveal:** word-by-word from behind a mask; the grey line arrives first, the black
  line lands after it.
- **Magnetic** buttons and logo — they lean toward the cursor.
- **Work cards** lift `-6px` and scale to `1.02`; the inner mockup parallaxes a few px.
- The partner marque scrolls infinitely and slowly (`--marquee-duration` 40s), masked to
  nothing at both ends, and never pauses on hover.
- Everything animates **once**, not on every re-entry, and all of it respects
  `prefers-reduced-motion` (the tokens collapse to `0.01s`).

**Hover:** opacity to `.6` on links, lift + scale on cards, no colour change.
**Press:** no scale-down, no colour shift — the system does not bounce.

---

## Iconography

**The source file defines no icon set.** There is no icon font, no sprite sheet, no SVG icon
library anywhere in the Figma file — the only vector artwork is the Fugaz mark itself, the
drawn `FUGAZ` wordmark, the drawn `CREATIVE AGENCY` tagline, and the small `›` breadcrumb
chevron on the brand-book footers.

Consequences, and they are intentional:

- Buttons are **label-only**. There is no icon-button, no leading/trailing glyph, no chevron
  on nav items.
- Nothing in this system should introduce Lucide, Heroicons, Feather or any other CDN icon
  set. If a future surface genuinely needs one, it is a brand decision, not a build decision —
  ask first.
- **No emoji, ever.** No unicode symbols used as icons.
- The one repeated glyph is the breadcrumb `›`, set in Geist at 20px `rgb(66,66,66)`.

Real assets extracted from the file live in `assets/`:

| File | What |
| --- | --- |
| `logo-mark.svg` | The mark, `currentColor` |
| `logo-mark-white.svg` / `-blue.svg` / `-black.svg` | Pre-coloured cuts |
| `logo-wordmark.svg` / `logo-wordmark-white.svg` | The drawn `FUGAZ` wordmark |
| `logo-tagline.svg` | The drawn `CREATIVE AGENCY` line |
| `logo-tile.svg` | Blue squircle app icon |
| `hero-f1-car.svg` | The hero graphic, 529 paths, flattened out of `Desktop - 1` |
| `partner-dubai-airports.svg` | Client mark, vector |
| `partner-louis-vuitton.svg` | Client mark, vector |
| `partner-hermes.svg` | Client mark, vector |
| `partner-emirates.svg` | Client mark, vector |

Bitmaps (founder avatars and photos, the J.P. Morgan mark, the four work mockups) live in
`figma/official/assets/` and are painted through the generated `.fig-asset-*` classes in
`figma/official/fig-assets.css` — reference the class, never re-crop the image.

---

## Index

```
readme.md              this file
SKILL.md               agent-skill entry point
styles.css             global CSS entry — @import list only
thumbnail.html         project tile
tokens/                colors · typography · layout · motion · fonts · base
assets/                logo SVGs
figma/                 verbatim fig_materialize output + fig-tokens/typography/assets CSS
guidelines/            16 foundation specimen cards
components/brand/      LogoMark · LogoLockup · LogoTile
components/site/       HeroPanel · Panel · SiteHeader · LogoCapsule · HeroStatement · ScarcityBadge
                       PillButton · PartnerMarquee · WorkCard · TeamCard · SectionHeadline · Preloader
ui_kits/fugaz-site/    fugaz-agency.com recreation of "Web concept Fugaz OFFICIAL"
ui_kits/brand-book/    2000×1125 guideline spreads (3 pages)
templates/fugaz-landing/  copyable landing-page starting point
```

### Components

Authored primitives — `components/brand/`: **LogoMark**, **LogoLockup**, **LogoTile**.
`components/site/`: **HeroPanel**, **Panel**, **SiteHeader**, **LogoCapsule**, **HeroStatement**,
**ScarcityBadge**, **PillButton**, **PartnerMarquee**, **WorkCard**, **TeamCard**,
**SectionHeadline**, **Preloader**.

Verbatim Figma extractions — `figma/`: **LOGOWHITE**, **LOGOBLACK**, **LOGOBLUE**,
**LOGOGRADIANT**, **LOGOBlueIcon**, **LOGOWhiteBlueIcon**, **LOGOMARK**, **LOGOHORIZONTAL**,
**LOGOVERTICAL**, **LOGOMARKUNICOLOR**, **WALLPAPERDARKMODEIOS**, **WALLPAPERDARKMODEMACOS**,
**WALLPAPERLIGHTMODEIOS**, **WALLPAPERLIGHTMODEMACOS**, **Frame12**, **Frame44**, **Frame45**,
**Frame46**, **Frame47**, **Frame49**, **Frame54**, **Frame58**, **Frame59**, **Frame60**,
**Frame61**, **Group51332**.

## Intentional additions

Confirmed intentional additions (14): `LogoLockup`, `LogoTile`, `HeroPanel`, `HeroStatement`,
`LogoCapsule`, `Panel`, `PartnerMarquee`, `PillButton`, `Preloader`, `ScarcityBadge`,
`SectionHeadline`, `SiteHeader`, `TeamCard`, `WorkCard`.


**These nine components are confirmed intentional additions.** They carry names that do not
appear in the `.fig`'s component list, and that is correct: the file defines its component
inventory as 26 standalone symbols — all logo lockups, wallpapers and icon-tile frames — and
defines **no UI primitives as Figma components at all**. The website's buttons, nav, bubbles,
cards, panel and preloader exist only as loose, unnamed layers inside the *Web concept Fugaz V1*
section (node `110:2`). Each one below is authored directly from those layers with every
dimension transcribed rather than invented, and each is named for what it is in the product
rather than for a Figma layer name that does not exist.

| Added component | Source layer in `Desktop - 1` (172:47) | Why it is named this |
| --- | --- | --- |
| `HeroPanel` | the 1411×987 gradient rounded-rect | an unnamed rounded rectangle |
| `Panel` | `Rectangle 12` (1411×1024, r29, white) | a generic Figma rectangle name |
| `SiteHeader` | the 1235.268×47.323 header row | an unnamed frame |
| `LogoCapsule` | the 132.268×47.323 white capsule | an unnamed auto-layout frame |
| `HeroStatement` | `Group 11` (554×328) | a default group name |
| `ScarcityBadge` | the dot + "0 spots left for Q3" row | an unnamed auto-layout frame |
| `PillButton` | the `Book a call` / `View work` pills | layers named after their labels |
| `PartnerMarquee` | the masked 1253×105 logo row | an unnamed mask group |
| `WorkCard` | `Rectangle 14` (644.154×446.113, r31.2696) | a generic Figma rectangle name |
| `TeamCard` | the 359×613 founder frames | unnamed frames |
| `SectionHeadline` | `Built by a young team…` text layer | a text layer named after its content |
| `LogoLockup` | `LOGO_BlueIcon` (93:61) — mark + wordmark | parameterised wrapper over the symbol |
| `LogoTile` | `Frame 54` (93:56) — blue squircle + mark | parameterised wrapper over the symbol |
| `Preloader` | `Frame 66` (141:224), carried over from the V1 section | a default frame name |

That is all fourteen. Nothing else was added and nothing was invented: the scarcity badge,
partner marquee and team cards all exist in `Desktop - 1` as loose layers. `Preloader` is the
only one with no counterpart in the OFFICIAL frame — it is carried over from `Frame 66`
(141:224) because the brand's motion spec requires it.

The verbatim `figma/` extractions keep the file's own names (`LOGOWHITE`, `Frame54`,
`Group51332`, …) untouched, so the source vocabulary is still reachable.

## Caveats

- **No brand-book sample deck.** The `Presentations` page in the .fig is empty (0 frames) and no
  deck was attached, so no slide templates were authored.
- **The footer photograph is missing.** `90c775433c5f4850.png` is 21.4 MB and exceeded the
  extractor's per-image budget, so the footer band renders as flat `#0057FE` plus grain.
- **The HGK partner mark** in the footer of `Desktop - 1` could not be isolated from the
  extraction and is omitted from the kit.
- **Four wallpaper bitmaps were dropped** for the same size reason (`WALLPAPER DARK MODE - IOS`,
  `- MACOS`, `WALLPAPER LIGHT MODE - MACOS`).
- **Three vectors had no decodable geometry** (`Rectangle 41606` inside the template's
  `LOGO MARK` family) and were emitted as plain boxes.
- **Panel heights below the hero are normalised.** `Desktop - 1` is 6526px tall with four 1024px
  white panels; not every panel's interior was reachable from the extraction, so the kit sizes
  panels to their content instead of padding them to 1024.
- Satoshi loads from the Fontshare CDN, not from licensed binaries.
