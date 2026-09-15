import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import routes from '../src/data/seo-routes.json' with { type: 'json' };

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');
const siteUrl = 'https://hightech-company-website.vercel.app';
const ogImage = `${siteUrl}/og-image.png`;
const ogImageAlt = 'HighTech — Good ideas. Built into great software. Independent software studio.';

function absoluteUrl(path) {
  if (!path || path === '/') return `${siteUrl}/`;
  return `${siteUrl}${path}`;
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function upsertTaggedMeta(html, attr, key, content) {
  const pattern = new RegExp(
    `<meta\\s+${attr}="${key}"\\s+content="[^"]*"\\s*\\/?>|<meta\\s+content="[^"]*"\\s+${attr}="${key}"\\s*\\/?>`,
    'i',
  );
  const tag = `<meta ${attr}="${key}" content="${escapeHtml(content)}" />`;
  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace('</head>', `    ${tag}\n  </head>`);
}

function replaceMeta(html, { title, description, path, ogTitle }) {
  const url = absoluteUrl(path);
  const socialTitle = ogTitle ?? title;

  let next = html;
  next = next.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`);
  next = upsertTaggedMeta(next, 'name', 'description', description);
  next = upsertTaggedMeta(next, 'name', 'robots', 'index, follow, max-image-preview:large');
  next = next.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${url}" />`,
  );
  next = upsertTaggedMeta(next, 'property', 'og:title', socialTitle);
  next = upsertTaggedMeta(next, 'property', 'og:description', description);
  next = upsertTaggedMeta(next, 'property', 'og:url', url);
  next = upsertTaggedMeta(next, 'property', 'og:image', ogImage);
  next = upsertTaggedMeta(next, 'property', 'og:image:alt', ogImageAlt);
  next = upsertTaggedMeta(next, 'name', 'twitter:title', socialTitle);
  next = upsertTaggedMeta(next, 'name', 'twitter:description', description);
  next = upsertTaggedMeta(next, 'name', 'twitter:image', ogImage);
  next = upsertTaggedMeta(next, 'name', 'twitter:image:alt', ogImageAlt);
  return next;
}

function injectOrganizationJsonLd(html, description) {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': `${siteUrl}/#organization`,
        name: 'HighTech',
        url: siteUrl,
        email: 'contact@hightech.fit',
        telephone: '+1 (540) 952-9270',
        image: ogImage,
        logo: `${siteUrl}/favicon.svg`,
        description,
        address: {
          '@type': 'PostalAddress',
          streetAddress: '24 East Clairmont Drive',
          addressLocality: 'Newark',
          addressRegion: 'DE',
          postalCode: '19702',
          addressCountry: 'US',
        },
        sameAs: ['https://github.com/hightech-dev830'],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: 'HighTech',
        url: siteUrl,
        description,
        publisher: { '@id': `${siteUrl}/#organization` },
        inLanguage: 'en-US',
      },
    ],
  };

  const script = `<script id="site-structured-data" type="application/ld+json">${JSON.stringify(data)}</script>`;
  if (html.includes('application/ld+json')) return html;
  return html.replace('</head>', `    ${script}\n  </head>`);
}

const indexPath = join(distDir, 'index.html');
const baseHtml = readFileSync(indexPath, 'utf8');
const home = routes.find((route) => route.path === '/');

let homeHtml = replaceMeta(baseHtml, home);
homeHtml = injectOrganizationJsonLd(homeHtml, home.description);
writeFileSync(indexPath, homeHtml);

for (const route of routes) {
  if (route.path === '/') continue;
  const html = replaceMeta(baseHtml, route);
  const outDir = join(distDir, route.path.replace(/^\//, ''));
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), html);
  console.log(`Prerendered SEO shell: ${route.path}`);
}

console.log('Prerendered SEO shells for all routes.');
