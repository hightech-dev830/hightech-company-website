import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = [
  '/',
  '/about',
  '/services',
  '/services/web-development',
  '/industries',
  '/projects',
  '/careers',
  '/contact',
];
for (const path of routes) {
  test(`${path} renders accessibly on desktop and mobile`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator('main h1')).toHaveCount(1);
    await expect(page.locator('main h1')).toBeVisible();
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
      ),
    ).toBe(true);
    const accessibility = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(accessibility.violations).toEqual([]);
    for (const width of [390, 320]) {
      await page.setViewportSize({ width, height: 844 });
      await expect
        .poll(
          () =>
            page.evaluate(
              () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
            ),
          { message: `overflow on ${path} at ${width}px` },
        )
        .toBe(true);
      await expect(page.locator('main h1')).toBeVisible();
    }
    const mobileAccessibility = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(mobileAccessibility.violations).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test('mobile navigation supports Escape, links, and desktop resize', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Open navigation' })).toBeFocused();
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await page
    .getByRole('navigation', { name: 'Mobile navigation' })
    .getByRole('link', { name: 'About', exact: false })
    .click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole('button', { name: 'Open navigation' })).toHaveAttribute(
    'aria-expanded',
    'false',
  );
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(page.locator('#mobile-navigation')).not.toBeVisible();
});

test('motion controls pause, persist, and keep content readable with reduced motion', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('canvas[data-starfield]')).toHaveCount(0);
  await page.getByRole('button', { name: 'Pause animations' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'paused');
  await expect(page.locator('.company-hero-copy')).toHaveCSS('animation-name', 'none');
  await expect(page.locator('.company-hero-copy')).toHaveCSS('opacity', '1');
  await page.reload();
  await expect(page.getByRole('button', { name: 'Play animations' })).toBeVisible();
  await page.getByRole('button', { name: 'Play animations' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'playing');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(
    page.getByRole('button', { name: 'Animations reduced by system preference' }),
  ).toBeDisabled();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'paused');
  await expect(page.locator('.company-hero-copy')).toHaveCSS('opacity', '1');
  await page.locator('.company-faq').scrollIntoViewIfNeeded();
  await expect(page.locator('.company-faq h2')).toBeVisible();
});

test('direct navigation, back, refresh, and unknown routes work', async ({ page }) => {
  await page.goto('/services');
  await expect(page.locator('main h1')).toBeVisible();
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'Work', exact: true })
    .click();
  await expect(page).toHaveURL(/\/projects$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/services$/);
  await page.reload();
  await expect(page.locator('main h1')).toBeVisible();
  await page.goto('/not-a-page');
  await expect(
    page.getByRole('heading', { name: 'This page took a different path.' }),
  ).toBeVisible();
  await page.getByRole('link', { name: 'Back to the studio' }).click();
  await expect(page).toHaveURL(/\/$/);
});
