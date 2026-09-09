import { test, expect } from '@playwright/test';
for (const route of ['/', '/tr'])
  for (const width of [1536, 1440, 1280, 1024, 768, 430, 390, 360]) {
    test(`${route} full page at ${width}`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      for (const id of [
        'projects',
        'approach',
        'toolkit',
        'about',
        'contact',
      ]) {
        await page.locator(`#${id}`).scrollIntoViewIfNeeded();
        await expect(page.locator(`#${id} h2`)).toBeVisible();
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
      }
      const portrait = page.locator('.about-context img');
      await expect
        .poll(() =>
          portrait.evaluate(
            (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
          ),
        )
        .toBe(true);
    });
  }
test('phase 2 remains readable without JavaScript', async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 360, height: 800 },
  });
  const page = await context.newPage();
  for (const route of ['/', '/tr']) {
    await page.goto(`${baseURL}${route}`);
    await expect(page.locator('main h2')).toHaveCount(5);
    await expect(page.locator('.copy-email button')).toBeDisabled();
    await expect(page.locator('.email-address')).toHaveAttribute(
      'href',
      'mailto:zafercagatayumut@gmail.com',
    );
  }
  await context.close();
});
