import seoRoutes from '@/data/seo-routes.json';
import contactFaqs from '@/data/contact-faqs.json';
import { site } from '@/data/site';

export type RouteSeo = {
  path: string;
  title: string;
  description: string;
  ogTitle?: string;
  noindex?: boolean;
};

export const routesSeo = seoRoutes as RouteSeo[];
export { contactFaqs };

export const defaultSeo: RouteSeo = routesSeo[0];

export const notFoundSeo: RouteSeo = {
  path: '',
  title: 'Page not found — HighTech',
  description:
    'The page you’re looking for isn’t on the HighTech site. Return home or contact the studio to continue the conversation.',
  ogTitle: 'Page not found — HighTech',
  noindex: true,
};

export function getRouteSeo(pathname: string): RouteSeo {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  return routesSeo.find((route) => route.path === normalized) ?? notFoundSeo;
}

export const ogImageAlt =
  'HighTech — Good ideas. Built into great software. Independent software studio.';

export function absoluteUrl(path = '/'): string {
  if (!path || path === '/') return `${site.url}/`;
  return `${site.url}${path.startsWith('/') ? path : `/${path}`}`;
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    image: absoluteUrl('/og-image.png'),
    logo: absoluteUrl('/favicon.svg'),
    description: defaultSeo.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '24 East Clairmont Drive',
      addressLocality: 'Newark',
      addressRegion: 'DE',
      postalCode: '19702',
      addressCountry: 'US',
    },
    sameAs: [site.github],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: site.email,
        telephone: site.phone,
        areaServed: 'US',
        availableLanguage: ['English'],
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name: site.name,
    url: site.url,
    description: defaultSeo.description,
    publisher: { '@id': `${site.url}/#organization` },
    inLanguage: 'en-US',
  };
}

export function breadcrumbJsonLd(pathname: string) {
  const seo = getRouteSeo(pathname);
  if (seo.noindex || seo.path === '/') return null;

  const label = seo.ogTitle ?? seo.title.replace(/\s—\sHighTech$/, '');
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: absoluteUrl('/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: label,
        item: absoluteUrl(seo.path),
      },
    ],
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.append(element);
  }
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }
}

const STRUCTURED_DATA_ID = 'site-structured-data';

export function applyStructuredData(
  data: Array<Record<string, unknown> | null | undefined>,
) {
  const payload = data.filter(Boolean);
  let script = document.getElementById(STRUCTURED_DATA_ID) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = STRUCTURED_DATA_ID;
    script.type = 'application/ld+json';
    document.head.append(script);
  }
  script.text = JSON.stringify(payload);
}

export function applyDocumentSeo(pathname: string) {
  const seo = getRouteSeo(pathname);
  const url = absoluteUrl(seo.noindex ? pathname : seo.path || pathname);
  const ogTitle = seo.ogTitle ?? seo.title;
  const image = absoluteUrl('/og-image.png');

  document.title = seo.title;

  upsertMeta('meta[name="description"]', {
    name: 'description',
    content: seo.description,
  });
  upsertMeta('meta[name="robots"]', {
    name: 'robots',
    content: seo.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large',
  });

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.append(canonical);
  }
  canonical.href = url;

  upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
  upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: site.name });
  upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'en_US' });
  upsertMeta('meta[property="og:title"]', { property: 'og:title', content: ogTitle });
  upsertMeta('meta[property="og:description"]', {
    property: 'og:description',
    content: seo.description,
  });
  upsertMeta('meta[property="og:url"]', { property: 'og:url', content: url });
  upsertMeta('meta[property="og:image"]', { property: 'og:image', content: image });
  upsertMeta('meta[property="og:image:width"]', { property: 'og:image:width', content: '1200' });
  upsertMeta('meta[property="og:image:height"]', { property: 'og:image:height', content: '630' });
  upsertMeta('meta[property="og:image:alt"]', { property: 'og:image:alt', content: ogImageAlt });

  upsertMeta('meta[name="twitter:card"]', {
    name: 'twitter:card',
    content: 'summary_large_image',
  });
  upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: ogTitle });
  upsertMeta('meta[name="twitter:description"]', {
    name: 'twitter:description',
    content: seo.description,
  });
  upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image });
  upsertMeta('meta[name="twitter:image:alt"]', { name: 'twitter:image:alt', content: ogImageAlt });

  applyStructuredData([
    organizationJsonLd(),
    websiteJsonLd(),
    breadcrumbJsonLd(pathname),
    seo.path === '/contact' ? faqJsonLd(contactFaqs) : null,
  ]);

  return seo;
}
