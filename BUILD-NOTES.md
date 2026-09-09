Mobile scroll-progress line — 9 September 2026

Validation: 36 browser checks passed across widths 375, 390, 430, 700, 701 and 1440px, covering before/during/after Process, reverse scrolling, start and end of page. Tested in Chromium at resized viewports, not on a physical iPhone. Deployment build and JavaScript syntax checks passed.

The page progress indicator is now a 2px vertical line fixed to the right edge at widths up to 700px. It fills downward as the visitor scrolls. The line turns white while the dark Process panel fills the screen, and returns to black as the panel leaves. The same state works when scrolling upward. Desktop retains its horizontal progress line.

Progress shares the existing scroll controller and Process panel state; no additional scroll listeners or layout measurements were added. All prior fixes are included. No animation timing or media files changed.

Mobile navigation top position — 9 September 2026

The mobile navigation now uses the top safe-area inset instead of a 34px gap. It remains fixed while scrolling. No animation scripts, media, menu behavior or desktop navigation styles were changed.

Verification: fixed position checked at five scroll depths across five mobile viewport sizes; hidden at the 701px desktop breakpoint. Menu opened and closed successfully. Checks used Chromium with resized viewports, not a physical iPhone.

# CSS cascade cleanup — September 9

The page CSS now has 26 priority declarations, down from 337 in FUGAZ-x-links-fixed.zip (92.3% fewer). Removed 308 unnecessary priority flags and 25 redundant declarations, including three repeated priority declarations. Base, component, responsive and interaction styles now have separate files and documented responsibilities.

Two controller-created elements previously forced CSS layout overrides: animated links received an inline display rule, and the footer WhatsApp fill received inline dimensions and border radius. Those static declarations now belong to component classes. Their existing transitions, measurements and event handlers are preserved. Other runtime inline values remain where they control motion.

## Validation

- Compared 75 computed style properties across the template at ten viewport sizes, including 700/701px, 1024/1025px and 1199/1200px boundaries: no differences.
- Compared the running page, open scan, shortened viewport and closed scan at phone, tablet and desktop sizes. Layout/style differences were limited to six transition-property/timing readings on independently timed logo animations in one desktop sample; animation source definitions are unchanged.
- Compared 24 menu, portfolio, privacy and scan states at 390px and 1440px widths, including all five scan steps: no differences in the sampled non-motion styles.
- Compared every animated text word’s computed filter, opacity and transform at 28 scroll positions on phone and desktop, including reverse scrolling: no differences.
- Source comparison confirms that page-controller changes are limited to the two static-style-to-class substitutions. All other scripts, every CSS keyframe and all media files match the previous release.
- JavaScript syntax, CSS parsing, production manifest and build checks passed. No scan was submitted.

Checks ran in Chromium with iframe viewports, not on physical phones or Safari. These checks support visual/behavioral preservation within the tested conditions; they do not establish identical performance on every device. The retained renderer is still a design-export runtime. This cleanup is a maintainability improvement, not a claim of human-only authorship.

---

# Team video alignment — September 9

Both team card stills are lossless WebP exports of their respective videos’ first decoded frame. Their decoded RGB pixels were verified against those frames. Images and videos share the existing crop, position and color filters; each video also uses the matching still as its poster.

The existing entrance zoom now applies to both image and video. Desktop hover keeps the still visible until playback is ready. Pending reset timers are cancelled on re-entry and cleanup. Existing crossfade durations, CSS and video files are unchanged.

Verification: production build and JavaScript syntax pass; focused lifecycle checks cover delayed readiness, leaving before playback starts, rapid re-entry, rejected playback and cleanup. Browser and physical-device playback were not tested for this revision.

---

# Link-preview thumbnail — September 9

Replaced the social-sharing image with the supplied FugazThumbnailFINAL.png, preserving its original bytes and 1800 × 945 dimensions. Open Graph, Twitter and structured-data image URLs share a new content-versioned asset path. The deployment manifest includes the new image.

Verified the production build, metadata references and image identity. All other production files match FUGAZ-animation-restored.zip byte for byte.

---

# Scroll blur correction — September 9

The September 8 validation below missed a scroll-driven CSS reset regression. Matching Web Animations API calls and static computed styles was not sufficient to verify this section, which writes its filters directly while scrolling.

Moving the entry blur into a CSS class meant `style.filter = ""` restored `blur(13px)` instead of producing the original unfiltered state. Three reset values now explicitly use `none`: the text-word clear state, section-label clear state, and reduced-motion word settlement. No blur curve, opacity, movement, scroll boundary, stagger or easing value was changed.

The page script has a new content-derived filename. The production manifest and HTML reference it together. All other production files are unchanged from the previous ZIP.

## Verification of this correction

The original release and corrected release were run in Chromium at a 1280 × 800 viewport. Seventeen rendered scroll samples covered entry, sharp holds, exit, all four text beats and reverse scrolling. Every sampled word's computed filter, opacity and transform matched the original exactly at the matching scroll position. The corrected Realism hold was also checked visually.

A syntax-tree comparison confirms that the only page-controller behavior changes are the three filter-reset values. A regression check covers all 27 blur levels from 0 to 13px. The reduced-motion settlement explicitly clears the word filter as well.

All other production content and assets match the previous ZIP, apart from the HTML reference and deployment manifest needed for the new script filename. These checks do not claim performance parity on every physical device.

---

# Validation notes — mobile scan and code cleanup

## Fixed

The scan overlay lives outside the page root so it is not trapped by transformed ancestors. The resize rebind previously searched only inside that root and replaced the working panel reference with null. In the comparison browser, clicking X after a phone-height resize left the original scan open. The revised reference lookup and close method successfully dismissed it.

The visible X remains 34 × 34px. A transparent pseudo-element expands its click area to 44 × 44px. The additional hit area was exercised 3px outside the visible circle on step five after a simulated keyboard-height resize.

The HTML now contains two component-host positioning style attributes instead of 2,266 style attributes. 2,264 styles were consolidated into 457 reusable component rules. The main stylesheet dropped from 601 priority overrides to 322 intentional guards; 15 existing hover-state declarations were moved from runtime-generated rules to the stylesheet. Runtime motion values remain inline where required.

The page controller now loads as normal JavaScript, with separate scan and navigation modules. It no longer evaluates the full page controller from an inline script. The retained export renderer still supports its original component evaluation path.

## Verification

- Responsive CSS comparisons against the previous release at 390 × 844, 820 × 844, 1440 × 1000 and 375 × 667. Positioning, dimensions, type, color, grid/flex, clipping, opacity, transforms and transition defaults were compared across the template. Differences were limited to the intended X positioning context and the phase of independently running marquee/dot animations.
- Side-by-side visual review of the mobile hero and open scan.
- Scan open, option selection, all five steps, close after resizing, expanded X hit area, reopen/reset and Escape dismissal.
- Mobile menu open/close after separating the navigation module.
- All 27 Web Animations API call expressions match the previous release after syntax normalization, including keyframes, duration, delay, easing and fill mode.
- The Web3Forms fetch call is unchanged after syntax normalization. No real submission was sent.
- All 50 existing asset files match the previous release byte for byte.
- JavaScript syntax checks and a clean production build succeeded. All 75 approved public files were copied exactly to dist. The final content-versioned release booted in the browser.
- All page asset references resolve. The supplied design-system registry still contains 12 absent reference-image paths in unused component styles; the page does not instantiate those classes. No new missing asset references were introduced.

## Limits

Responsive tests ran in Chromium iframe viewports, not on a physical iPhone or Safari. This is not a guarantee of frame-for-frame performance on every GPU or device. No device-specific frame-rate improvement is claimed. The refactor preserves the animation definitions and the rendering comparisons described above.

The existing scan delivery integration is preserved. Inbox receipt and provider activation require a real submission after deployment. This release has not been deployed to GitHub or Vercel by the assistant.
