import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const servicePath = '/services/web-development';

test('desktop service menu supports keyboard entry, Escape and real navigation', async ({
  page,
}) => {
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Explore services' });
  await trigger.focus();
  await page.keyboard.press('ArrowDown');
  const menu = page.getByRole('region', { name: 'Service navigation' });
  const service = menu.getByRole('link', { name: /Web development/ });
  await expect(service).toBeFocused();
  const accessibility = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(accessibility.violations).toEqual([]);
  await page.keyboard.press('Escape');
  await expect(menu).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await trigger.click();
  await service.click();
  await expect(page).toHaveURL(new RegExp(`${servicePath}$`));
  await expect(page.locator('main h1')).toContainText('Web applications.');
  await expect(menu).toHaveCount(0);
});

test('mobile service disclosure opens by keyboard and routes to the detail page', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open navigation' }).click();
  const menu = page.getByRole('navigation', { name: 'Mobile navigation' });
  const summary = menu.locator('summary');
  await summary.focus();
  await page.keyboard.press('Enter');
  const link = menu.getByRole('link', { name: 'Web development', exact: true });
  await expect(link).toBeVisible();
  const accessibility = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(accessibility.violations).toEqual([]);
  await link.click();
  await expect(page).toHaveURL(new RegExp(`${servicePath}$`));
  await expect(menu).toHaveCount(0);
  await expect(page.locator('main h1')).toContainText('Web applications.');
});

test('preview deep links land on their content rather than an invisible or missing anchor', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const [path, id] of [
    ['/#solutions', 'solutions'],
    ['/services#service-ai', 'service-ai'],
    ['/services#service-mobile', 'service-mobile'],
    [`${servicePath}#web-scope`, 'web-scope'],
  ]) {
    await page.goto(path);
    const target = page.locator(`[id="${id}"]`);
    await expect(target).toBeVisible();
    await expect
      .poll(
        async () => {
          const box = await target.boundingBox();
          return !!box && box.y >= 75 && box.y < 250;
        },
        { message: `Anchor ${path} should appear below the sticky header` },
      )
      .toBe(true);
  }
});

test('nested route variants retain canonical page metadata and unknown children remain not found', async ({
  page,
}) => {
  for (const path of [
    servicePath,
    `${servicePath}/`,
    '/Services/Web-Development/',
    '/%73ervices/%77eb-development',
  ]) {
    await page.goto(path);
    await expect(page.locator('main h1')).toContainText('Web applications.');
    await expect(page).toHaveTitle('Web application development — HighTech');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://hightech-company-website.vercel.app${servicePath}`,
    );
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      'content',
      `https://hightech-company-website.vercel.app${servicePath}`,
    );
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      /Customer portals, internal tools/,
    );
  }
  await page.goto(`${servicePath}/unknown`);
  await expect(page).toHaveTitle('Page not found — HighTech');
  await expect(page.locator('main h1')).toContainText('This page took a different path.');
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    'content',
    'Page not found — HighTech',
  );
});

test('homepage and service FAQs toggle with Enter and Space', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const path of ['/', servicePath]) {
    await page.goto(path);
    const detail = page.locator('main details').first();
    const summary = detail.locator('summary');
    await summary.scrollIntoViewIfNeeded();
    await summary.focus();
    await page.keyboard.press('Enter');
    await expect(detail).toHaveAttribute('open', '');
    await expect(detail.locator('p')).toBeVisible();
    await page.keyboard.press('Space');
    await expect(detail).not.toHaveAttribute('open', '');
  }
});

test('every internal preview destination resolves to a real page and target', async ({ page }) => {
  test.setTimeout(90000);
  const destinations = new Set<string>();
  for (const source of ['/', servicePath]) {
    await page.goto(source);
    await expect(page.locator('main h1')).toBeVisible();
    const links = await page.locator('a[href]').evaluateAll((elements) =>
      elements
        .map((element) => {
          const url = new URL((element as HTMLAnchorElement).href);
          return url.origin === location.origin ? `${url.pathname}${url.hash}` : null;
        })
        .filter((value): value is string => value !== null),
    );
    links.forEach((link) => destinations.add(link));
  }
  for (const destination of destinations) {
    await page.goto(destination);
    await expect(page.locator('main h1')).toBeVisible();
    await expect(page.locator('main h1')).not.toContainText('This page took a different path.');
    const hash = new URL(page.url()).hash;
    if (hash)
      expect(
        await page.evaluate(
          (id) => !!document.getElementById(id),
          decodeURIComponent(hash.slice(1)),
        ),
      ).toBe(true);
  }
});
