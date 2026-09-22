# Intro logo correction — 22 September 2026

The preloader is a sibling of the main page container. The preparation helper previously looked only inside that container, leaving data-preparing on the actual preloader and hiding its logo and text throughout the animation.

The helper now uses the same document fallback as the animation controller, decodes the actual intro image, and clears the loading state before the existing animation starts. The black logo is preloaded. Original animation keyframes, duration, CSS, and all site assets are unchanged.

Includes all previous footer, metadata, icon, mobile, scan and social fixes. Preserves the Vercel Analytics script reported in the GitHub change; dashboard tracking has not been verified.

Validation: reproduced the hidden state on the live site. New regression tests fail on the previous helper and pass on this fix, including sibling markup, delayed logo decoding, cancellation and Escape. Existing readiness/availability tests and 82-file production build pass. Browser visual playback of this local revision and physical phone testing remain unverified.

Upload all contents of FUGAZ-upload into the repository root, replacing matching files, then allow Vercel to deploy.
