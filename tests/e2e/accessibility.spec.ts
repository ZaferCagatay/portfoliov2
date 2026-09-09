import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
for (const locale of ['en', 'tr']) {
  for (const width of [1440, 390]) {
    test(`accessible ${locale} at ${width}px`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.setViewportSize({ width, height: 900 });
      await page.goto(locale === 'en' ? '/' : '/tr');
      await page
        .getByRole('button', {
          name:
            locale === 'en' ? 'Reduced motion on' : 'Azaltılmış hareket açık',
        })
        .waitFor();
      if (width === 390) await page.locator('summary').click();
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      expect(results.violations).toEqual([]);
      await page.keyboard.press('Escape');
      await page.evaluate(() =>
        (document.activeElement as HTMLElement)?.blur(),
      );
      await page.keyboard.press('Tab');
      const focus = await page
        .locator(':focus')
        .evaluate((el) => ({
          style: getComputedStyle(el).outlineStyle,
          width: getComputedStyle(el).outlineWidth,
        }));
      expect(focus.style).toBe('solid');
      expect(parseFloat(focus.width)).toBeGreaterThanOrEqual(2);
    });
  }
}
