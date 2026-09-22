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
