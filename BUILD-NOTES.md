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
