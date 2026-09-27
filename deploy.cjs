// Build only the approved public files. Old GitHub uploads stay out of production.
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const files = require('./deploy-files.json');
if (!Array.isArray(files) || !files.includes('index.html')) throw new Error('Invalid deployment manifest');
for (const file of files) {
  if (typeof file !== 'string' || file.startsWith('/') || file.split('/').includes('..')) throw new Error('Unsafe deployment path');
  if (!fs.statSync(path.join(root, file)).isFile()) throw new Error('Missing required file: ' + file);
}
const output = path.join(root, 'dist');
fs.rmSync(output, { recursive: true, force: true });
for (const file of files) {
  const destination = path.join(output, file);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(path.join(root, file), destination);
}
// Optional public project identifier supplied by Vercel at build time.
const clarityProjectId = process.env.CLARITY_PROJECT_ID;
if (clarityProjectId) {
  if (!/^[a-z0-9]+$/i.test(clarityProjectId)) throw new Error('Invalid CLARITY_PROJECT_ID');
  fs.writeFileSync(path.join(output, 'analytics-config.js'),
    'window.FugazAnalyticsConfig = Object.freeze(' + JSON.stringify({ clarityProjectId }) + ');\n');
}
console.log('Prepared ' + files.length + ' public files.');
