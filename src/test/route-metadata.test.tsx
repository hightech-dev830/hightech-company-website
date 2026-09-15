import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import App from '@/App';
import { site } from '@/data/site';
import { breadcrumbJsonLd, getRouteSeo, routesSeo } from '@/lib/seo';

function LocationProbe() {
  const { pathname } = useLocation();
  return <output aria-label="Current pathname">{pathname}</output>;
}

function renderRoute(pathname: string) {
  render(
    <MemoryRouter initialEntries={[pathname]}>
      <App />
      <LocationProbe />
    </MemoryRouter>,
  );
}

function metaContent(selector: string) {
  return document.head.querySelector(selector)?.getAttribute('content') ?? null;
}

describe('matched route metadata', () => {
  let canonical: HTMLLinkElement;
  let previousTitle: string;
  let existingHeadNodes: Set<Element>;

  beforeEach(() => {
    existingHeadNodes = new Set(document.head.children);
    previousTitle = document.title;
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = `${site.url}/stale`;
    document.head.append(canonical);
  });

  afterEach(() => {
    canonical.remove();
    document.title = previousTitle;
    document.getElementById('site-structured-data')?.remove();
    Array.from(document.head.children).forEach((node) => {
      if (!existingHeadNodes.has(node)) node.remove();
    });
  });

  it.each(['/services', '/Services', '/services/', '/%73ervices'])(
    'uses Services metadata for %s without changing the location',
    async (pathname) => {
      renderRoute(pathname);

      expect(
        await screen.findByRole('heading', {
          level: 1,
          name: /Good ideas deserve well-built software\./,
        }),
      ).toBeInTheDocument();
      expect(screen.getByLabelText('Current pathname')).toHaveTextContent(pathname);
      expect.soft(document.title).toBe('Software, design & applied AI — HighTech');
      expect.soft(canonical.href).toBe(`${site.url}/services`);
      expect
        .soft(metaContent('meta[name="description"]'))
        .toMatch(/applied AI, web applications, mobile experiences/i);
      expect.soft(metaContent('meta[property="og:url"]')).toBe(`${site.url}/services`);
      expect.soft(metaContent('meta[name="robots"]')).toContain('index');
    },
  );

  it.each([
    '/services/web-development',
    '/Services/Web-Development/',
    '/%73ervices/%77eb-development',
  ])('uses canonical metadata for the new service page at %s', async (pathname) => {
    renderRoute(pathname);
    await waitFor(() => expect(document.title).toBe('Web application development — HighTech'));
    expect(canonical.href).toBe(`${site.url}/services/web-development`);
    expect(screen.getByLabelText('Current pathname')).toHaveTextContent(pathname);
    expect(await screen.findByRole('heading', { level: 1 })).not.toHaveTextContent(
      'This page took a different path.',
    );
  });

  it('sets a matching description and social metadata for the revised homepage', async () => {
    const tags = [
      ['name', 'description'],
      ['property', 'og:title'],
      ['property', 'og:description'],
      ['property', 'og:url'],
      ['name', 'twitter:title'],
      ['name', 'twitter:description'],
    ].map(([key, value]) => {
      const tag = document.createElement('meta');
      tag.setAttribute(key, value);
      tag.content = 'stale';
      document.head.append(tag);
      return tag;
    });
    try {
      renderRoute('/');
      await waitFor(() =>
        expect(document.title).toBe('HighTech — Digital products built around your business.'),
      );
      expect(tags[0].content).toContain('web applications');
      expect(tags[1].content).toBe(document.title);
      expect(tags[2].content).toBe(tags[0].content);
      expect(tags[3].content).toBe(`${site.url}/`);
      expect(tags[4].content).toBe(document.title);
      expect(tags[5].content).toBe(tags[0].content);
    } finally {
      tags.forEach((tag) => tag.remove());
    }
  });

  it('keeps the not-found metadata for a path that does not match a page', async () => {
    renderRoute('/services-extra');

    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: 'This page took a different path.',
      }),
    ).toBeInTheDocument();
    expect(document.title).toBe('Page not found — HighTech');
    expect(canonical.href).toBe(`${site.url}/services-extra`);
    expect(metaContent('meta[name="robots"]')).toBe('noindex, nofollow');
  });

  it('publishes organization and website structured data on every page', async () => {
    renderRoute('/about');
    await screen.findByRole('heading', { level: 1, name: /Small team\. Serious craft\./i });

    const script = document.getElementById('site-structured-data');
    expect(script?.getAttribute('type')).toBe('application/ld+json');
    const data = JSON.parse(script?.textContent ?? '[]') as Array<Record<string, unknown>>;
    expect(data.some((item) => JSON.stringify(item['@type']).includes('Organization'))).toBe(true);
    expect(data.some((item) => item['@type'] === 'WebSite')).toBe(true);
    expect(data.some((item) => item['@type'] === 'BreadcrumbList')).toBe(true);
  });

  it('adds FAQ structured data on the contact page', async () => {
    renderRoute('/contact');
    await screen.findByRole('heading', { level: 1, name: /Good work starts with/i });

    const data = JSON.parse(
      document.getElementById('site-structured-data')?.textContent ?? '[]',
    ) as Array<Record<string, unknown>>;
    expect(data.some((item) => item['@type'] === 'FAQPage')).toBe(true);
  });
});

describe('SEO route catalog', () => {
  it('includes the service hub in the nested service breadcrumb', () => {
    expect(
      breadcrumbJsonLd('/services/web-development')?.itemListElement.map((item) => item.item),
    ).toEqual([`${site.url}/`, `${site.url}/services`, `${site.url}/services/web-development`]);
  });
  it('covers every public route with unique titles and descriptions', () => {
    expect(routesSeo).toHaveLength(8);
    const titles = new Set(routesSeo.map((route) => route.title));
    const descriptions = new Set(routesSeo.map((route) => route.description));
    expect(titles.size).toBe(8);
    expect(descriptions.size).toBe(8);
    expect(getRouteSeo('/services/web-development').noindex).not.toBe(true);
    expect(getRouteSeo('/about').path).toBe('/about');
    expect(getRouteSeo('/missing').noindex).toBe(true);
  });
});
