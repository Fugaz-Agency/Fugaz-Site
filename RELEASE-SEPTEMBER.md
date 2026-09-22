# September 22 release

## Changes

- Footer: KVK 42169294; Frans Halsstraat 15-2, 1072BJ Amsterdam; (Only on appointment).
- Opening sequence: finish page setup, wait for Satoshi and hero/logo image decoding (up to 3.5 seconds), then allow two animation frames before the original intro. Essential font files are now self-hosted, byte-identical to the original CDN files. The animation keyframes, durations and easing are unchanged. Failed resources cannot indefinitely block the opening; Escape also skips preparation.
- Projects ESC control: pointer/touch opening has no focus ring. Keyboard navigation retains a visible outline and the existing focus trap.
- Planning quarter: January–February Q1; March–May Q2; June–August Q3; September–November Q4; December Q1 of next year. Uses Europe/Amsterdam time, refreshes hourly and when returning to the tab. Hero and Availability section share the same calculation.
- Capacity: the user-supplied value is 3; it no longer fluctuates according to a date/randomness formula. This is editable in the `spots` default in index.html (zero means zero), not connected to a booking system. Update it as actual availability changes.
- Removed the additional “Need to start sooner?” line at the user’s request. The automatic quarter label is retained.

## Validation and limits

Build, JavaScript syntax, references, deployment integrity, quarter boundaries, readiness success/failure/timeout/cancellation, and input-mode handling checked. Original intro code and animation calls compared against the prior release. Prior assets, social links, scan module, navigation module and responsive rules preserved, apart from cache-version updates for the self-hosted fonts.

The cloud browser's policy blocked the local preview. Visual behavior, frame rate on a physical phone, and live form delivery have not been verified for this release. No deployment or form submission was performed.

## Upload

Unzip and upload the contents of FUGAZ-upload to the existing GitHub repository root, replacing matching files. Vercel runs node deploy.cjs and publishes only the manifest-listed files. The ZIP includes all prior fixes. This is maintained, AI-assisted source code; it is not represented as exclusively human-authored.

Reference audit: the inherited design-system reference styles retain 13 missing bitmap URLs already present in the input release. No new missing asset references were introduced. These original reference styles were not changed by this update.

## Footer social layout update

Removed the bottom “2026 • Fugaz Agency” line. The existing LinkedIn, X and Instagram links are right-aligned above 700px and centred at 700px and below. All link destinations and hover/reveal animation code are preserved. Build and scoped source comparison verified; no visual browser pass is claimed.

## Search favicon and description update

The main raster favicon is now /favicon.png: a 192×192 antialiased export of the original SVG logo. The URL is intentionally stable. Browsers can also use the existing vector SVG. The favicon.ico fallbacks now contain eight independently sized images from 16px to 256px; the homepage no longer advertises the low-resolution ICO as its search icon. Original logo geometry and colours are preserved.

Search, Open Graph, X and structured-data descriptions now read:

You built something real. We make it look that way. Branding, websites and campaign creatives from Fugaz Agency in Amsterdam.

Build, PNG/ICO decoding, dimensions, metadata consistency, deployment manifest and preservation of page body/scripts/styles checked. Google's actual result can only be checked after deployment and recrawling; Google may choose different snippet text. Request indexing for https://fugaz-agency.com/ in Search Console after deploying. Google documents that recrawling can take days to weeks.

Sources: https://developers.google.com/search/docs/appearance/favicon-in-search and https://developers.google.com/search/docs/appearance/snippet

## Footer divider update (supersedes removal above)

Restored 2026 | Fugaz Agency with a 1px-wide, 12px-high divider at 25% black and 12px spacing. Desktop places this label left and social links right. On mobile both rows are centred and stacked. Latest favicon and description changes are retained. Build and scoped file checks passed; no browser visual pass is claimed.
