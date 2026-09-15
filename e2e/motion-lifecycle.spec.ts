import { test, expect } from '@playwright/test';

test('section reveals remain readable after scrolling and route changes', async ({ page }) => {
  await page.goto('/');
  const reveal = page.locator('.company-partnership .reveal');
  await expect(reveal).toHaveAttribute('data-pending', 'true');
  await reveal.scrollIntoViewIfNeeded();
  await expect(reveal).toHaveAttribute('data-pending', 'false');
  await expect(reveal).toHaveCSS('opacity', '1');
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'Services', exact: true })
    .click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(reveal).toHaveCount(0);
  await page.goBack();
  await page.locator('.company-partnership').scrollIntoViewIfNeeded();
  await expect(page.locator('.company-partnership .reveal')).toHaveCSS('opacity', '1');
  await page.getByRole('button', { name: 'Pause animations' }).click();
  await page.reload();
  await expect(page.getByRole('button', { name: 'Play animations' })).toBeVisible();
  const hidden = await page
    .locator('.reveal')
    .evaluateAll((nodes) => nodes.filter((node) => getComputedStyle(node).opacity === '0').length);
  expect(hidden).toBe(0);
});
