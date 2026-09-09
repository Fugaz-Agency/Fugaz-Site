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
