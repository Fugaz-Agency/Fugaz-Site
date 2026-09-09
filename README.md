# Fugaz Agency website

## Upload

1. Unzip this download and open `FUGAZ-upload`.
2. Upload the **contents** of that folder to the root of `Fugaz-Agency/Fugaz-Site`, replacing matching files. Do not upload the ZIP itself or nest the folder inside the repository.
3. Commit the upload. The connected Vercel project runs `node deploy.cjs` and serves `dist` without installing packages.

The build publishes only the files in `deploy-files.json`. Old files left in GitHub cannot override the deployed release. The upload does not delete previous source files or Git history.

## Code structure

- `index.html`: content, semantic component classes, metadata and export component bindings.
- `styles/base.*.css`: layer order, global defaults, typography behavior and keyframes.
- `styles/components.*.css`: reusable component styles and structure for elements created by the controller.
- `styles/responsive.*.css`: desktop, tablet and phone layouts.
- `styles/interactions.*.css`: hover, control state, cursor and reduced-motion rules.
- `scripts/page.*.js`: page lifecycle, intro, scroll choreography and visual effects.
- `scripts/scan.*.js`: five-step scan, submission, results and overlay dismissal.
- `scripts/navigation.*.js`: menus, section navigation, legal panels and focus handling.
- `support.*.js`, `ds-base.*.js`, `_ds/`, `lanyard.*.js`: the retained export renderer and design-system components.

2,264 of 2,266 authored inline style attributes have moved into reusable classes. The two remaining attributes pass positioning inputs to imported lanyard components. JavaScript still writes transient inline values for animation and interactive state; removing those would change the motion.

This revision reduces the previous release’s 337 `!important` declarations to 26 across the page stylesheets. It removes 308 priority flags and three redundant priority declarations, plus 22 other redundant declarations. The remaining priorities are isolated to scroll-height and scan state, hover/motion interaction, cursor state and reduced-motion behavior. Static styles for animated links and the footer WhatsApp fill now belong to CSS classes, allowing responsive rules to work through the normal cascade.

The X keeps its original 34px face with an invisible 44px hit area. The scan panel reference is refreshed after viewport changes and again when closing, so mobile resizing cannot disconnect the close action. Scan steps use an explicit active class instead of matching the text of a style attribute.

## Maintenance and hosting

Runtime files, controller modules and styles use content-derived filenames to prevent stale resource combinations. If editing files later, update the content suffix and HTML references together. Add new public files to `deploy-files.json`.

Run `node deploy.cjs` locally, then serve `dist` over HTTP. The browser title remains `Fugaz Agency - Creative Agency`, including background tabs. The icon set, manifest, social metadata and previous lossless asset optimizations are retained.

## Scan delivery

Submissions still go directly to Web3Forms using the supplied public access key. The supplied build instructions identify `diego@fugaz-agency.com` as the linked inbox. Vercel hosts the website; this static build does not store scans in a Vercel dashboard. Results animate immediately as before, with delivery failures reported in the browser console.

After deployment, submit a real scan and confirm inbox receipt. No real messages were sent during this revision's tests. Provider activation and delivery to the inbox cannot be confirmed from local checks.

Vendor license notices remain intact. This is a code-maintenance refactor, not a claim of human-only authorship.

## Scroll blur repair — September 9

The previous refactor left the photo-section text blurred: clearing the runtime filter exposed the CSS entry blur again. The controller now explicitly writes `filter: none` at the clear state. The same reset is explicit in the reduced-motion settlement and the small section labels. Blur amounts, word staggering, scroll thresholds, opacity and movement formulas remain unchanged.

This release retains the mobile scan dismissal repair, extracted CSS and split controllers.
