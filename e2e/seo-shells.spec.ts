import { expect, test } from '@playwright/test';
import routes from '../src/data/seo-routes.json' with { type: 'json' };

const siteURL = 'https://hightech-company-website.vercel.app';

test.describe('SEO shells before JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  for (const route of routes) {
    test(`${route.path} serves its own metadata without JavaScript`, async ({ page }) => {
      const response = await page.goto(route.path);
      expect(response?.status()).toBe(200);
      await expect(page).toHaveTitle(route.title);
      await expect(page.locator('head meta[name="description"]')).toHaveAttribute(
        'content',
        route.description,
      );
      await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute(
        'href',
        `${siteURL}${route.path}`,
      );
      await expect(page.locator('head meta[property="og:title"]')).toHaveAttribute(
        'content',
        route.ogTitle ?? route.title,
      );
      await expect(page.locator('head meta[property="og:url"]')).toHaveAttribute(
        'content',
        `${siteURL}${route.path}`,
      );
      await expect(page.locator('head meta[name="robots"]')).toHaveAttribute(
        'content',
        'index, follow, max-image-preview:large',
      );
    });
  }
});

test('runtime SEO reuses the prerendered structured-data script instead of duplicating it', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('main h1')).toBeVisible();
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
  await expect(page.locator('#site-structured-data')).toHaveCount(1);
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'Company', exact: true })
    .click();
  await expect(page.locator('main h1')).toContainText('Small team.');
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
});

test('the new service retains upstream organization, breadcrumb and robots handling', async ({
  page,
}) => {
  await page.goto('/services/web-development');
  await expect(page.locator('main h1')).toBeVisible();
  const data = await page.locator('#site-structured-data').textContent();
  const entries = JSON.parse(data ?? '[]');
  expect(
    entries.some((item: { '@type': string | string[] }) =>
      JSON.stringify(item['@type']).includes('Organization'),
    ),
  ).toBe(true);
  const breadcrumb = entries.find(
    (item: { '@type': string }) => item['@type'] === 'BreadcrumbList',
  );
  expect(breadcrumb.itemListElement.map((item: { item: string }) => item.item)).toEqual([
    `${siteURL}/`,
    `${siteURL}/services`,
    `${siteURL}/services/web-development`,
  ]);
  await page.goto('/not-a-page');
  await expect(page.locator('head meta[name="robots"]')).toHaveAttribute(
    'content',
    'noindex, nofollow',
  );
  await page.getByRole('link', { name: 'Back to the studio' }).click();
  await expect(page.locator('head meta[name="robots"]')).toHaveAttribute(
    'content',
    'index, follow, max-image-preview:large',
  );
});
