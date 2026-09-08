# Fugaz Agency website

## Upload to GitHub

1. Unzip the download and open FUGAZ-upload.
2. Upload its contents to the root of Fugaz-Agency/Fugaz-Site, replacing matching files. Keep assets/vendor inside assets. Do not upload the ZIP itself or nest FUGAZ-upload in the repository.
3. Commit the upload. The connected Vercel project runs node deploy.cjs and serves dist. The configuration sets a static build with no package installation.
4. Once deployed, open the site in a fresh tab and check the scan, Process corners, photo section and mobile layout. Submit a real scan and confirm Diego receives it.

The build copies only deploy-files.json entries into production. Old styles, misplaced vendor folders and earlier HTML exports left in GitHub cannot override this release or be served by this build. Uploads do not delete old GitHub source files or history: delete obsolete exports separately if you want those removed from the public repository too.

## Scan delivery

The original five-step interface posts directly to Web3Forms with the supplied public access key. Your build notes identify diego@fugaz-agency.com as the inbox attached to that key. The UI keeps its original immediate results animation; it does not wait for an email response. Delivery errors are reported to the browser console without logging submitted details. Actual provider activation, domain restrictions and inbox receipt must be confirmed after deployment. Vercel is the web host; scan submissions are not stored in a Vercel dashboard by this static site.

## Maintenance

The page's inline styles, CSS cascade, animations, grain, scroll physics and compositing contexts intentionally remain intact. The export reads inline styles during animation setup, so moving them into new classes or removing !important rules can change motion. Load optimizations remove the repeated page fetch, defer boot scripts, preload critical resources, use verified versioned dependencies with CDN fallbacks, remux video for fast start, and losslessly optimize eligible images.

The browser title is Fugaz Agency - Creative Agency. Browser, Android and Apple icons, a web manifest, and static social metadata are included. Vendor copyright and license notices are retained. Source cleanup is not a claim of human-only authorship.

To run the production build locally: node deploy.cjs. Serve the resulting dist folder over HTTP. Keep deploy-files.json updated when adding public files. No environment variables are required for the supplied Web3Forms integration.
