# Cookies, insights and mobile KVK

## Upload
Upload everything inside FUGAZ-upload to the repository root, replacing matching files. Vercel builds with `node deploy.cjs` as before.

## Clarity project connected
This release is configured for your Microsoft Clarity project `yoy4qmd45k`. No extra script needs to be pasted into index.html: the consent controller loads the official Clarity tag once, only after acceptance.

1. Upload this ZIP and let Vercel deploy. No environment variable is required. If you previously set CLARITY_PROJECT_ID in Vercel, remove it or set it to yoy4qmd45k because it overrides the file during the build.
2. In Clarity Settings > Setup, keep automatic cookie setting OFF so consent is required, and keep sensitive-content masking enabled. Do not install a second Clarity snippet.
3. Open the deployed site, accept analytics, click and scroll, then check this project's Recordings and Heatmaps. A fresh browser should send no requests to Clarity before acceptance or after Decline.

The project identifier is public, not a secret API key. Visitors who made a choice before this project was configured will be asked again.

## Where the data appears
- Vercel Web Analytics: aggregate visitors, page views and referral/device information. Existing Vercel script preserved.
- Microsoft Clarity: scroll/click heatmaps and session recordings for visitors who opt in. Data appears in Clarity, not inside Vercel Analytics.
- Speed Insights is a separate Vercel performance product and is not added by this update.

Consent cannot give complete coverage: declined visits, blocked trackers, and activity before acceptance will not be in Clarity recordings.

## Behaviour and privacy
A cream, rounded Satoshi banner appears after the intro. Accept analytics and Decline are both available immediately. Cookie settings inside the Privacy policy reopens it; there is no standalone footer settings link. The card enters with a 900ms fade and 8px upward slide. Brand, heading, copy, buttons and details follow in a staggered 1100ms blur-to-sharp reveal, finishing within 1.64 seconds. Both consent buttons appear together. No scaling is used. Blur is not retained after the animation. Reduced-motion and keyboard-focus states reveal content immediately. The first-party choice cookie lasts up to 180 days. Advertising storage is always denied. Clarity loads only after a valid positive choice and a configured project ID. Scan content is explicitly masked; normal Clarity input masking also applies. Privacy copy has been updated to describe this setup.

Withdrawing consent clears accessible first-party Clarity cookies and reloads the page to unload the running recorder. It does not erase previously collected data. Keep the notice accurate if you add other analytics or marketing services later.

## KVK correction
Business details remain in the original footer column, outside the animated wrapper. They are excluded from automatic reveal tagging. Phone-number autodetection is disabled, and mobile phone-link hiding now targets only the two authored contact links. A browser-generated phone link around KVK can no longer match that broad hiding rule.

## Verification
Consent logic tests cover no tracking before consent, accept/decline, saved choices, intro completion, withdrawal, expiry, project changes, delayed mounting and unavailable cookie storage. Existing intro and availability tests pass. Production build, local references and static footer structure checked. Original intro keyframes and all image/video assets are unchanged.

This release has not been visually verified in mobile Safari/Firefox/Chrome or tested against a live Clarity project. The project ID is configured; live collection still needs deployment and dashboard verification.
