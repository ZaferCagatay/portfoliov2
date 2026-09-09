import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
for (const route of ['/', '/tr'])
  test(`${route} keyboard, focus, live status and axe`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(route);
    const carousel = page.locator('[data-carousel]');
    await expect(carousel).toHaveAttribute('data-enhanced', 'true');
    await carousel.focus();
    await page.keyboard.press('ArrowRight');
    await expect(carousel.locator('[data-selected="true"]')).toHaveAttribute(
      'data-project-slide',
      'pavlov',
    );
    await expect(carousel.getByRole('status')).toContainText('Pavlov');
    const link = carousel.locator('[data-selected="true"] a');
    await page.keyboard.press('Tab');
    await expect(link).toBeFocused();
    await expect(link).toBeInViewport();
    await page.keyboard.press('ArrowLeft');
    await expect(carousel).toBeFocused();
    await expect(carousel.locator('[data-selected="true"]')).toHaveAttribute(
      'data-project-slide',
      'karta',
    );
    await carousel.locator('[data-carousel-controls] button').first().focus();
    await page.keyboard.press('End');
    await expect(carousel.locator('[data-selected="true"]')).toHaveAttribute(
      'data-project-slide',
      'affiliate-platform',
    );
    await page.keyboard.press('Home');
    await expect(carousel.locator('[aria-current="true"]')).toHaveCount(1);
    await expect(carousel.locator('[inert]')).toHaveCount(3);
    const results = await new AxeBuilder({ page })
      .include('#projects')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
    const labels = await new AxeBuilder({ page })
      .include('#projects')
      .withRules(['label-content-name-mismatch'])
      .analyze();
    expect(labels.violations).toEqual([]);
    await page.locator('#contact h2').click();
    await page.keyboard.press('ArrowRight');
    await expect(carousel.locator('[data-selected="true"]')).toHaveAttribute(
      'data-project-slide',
      'karta',
    );
  });
test('live reduced motion and manual pause are honored', async ({ page }) => {
  await page.goto('/');
  const carousel = page.locator('[data-carousel]');
  await expect(carousel).toHaveAttribute('data-stopped', 'false');
  await page.getByRole('button', { name: 'Pause motion', exact: true }).click();
  await expect(carousel).toHaveAttribute('data-stopped', 'true');
  await carousel
    .getByRole('button', { name: 'Next project', exact: true })
    .click();
  await expect(carousel.getByRole('status')).toContainText('Pavlov');
  await page
    .getByRole('button', { name: 'Resume motion', exact: true })
    .click();
  await expect(carousel).toHaveAttribute('data-stopped', 'false');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(carousel).toHaveAttribute('data-stopped', 'true');
});

for (const reducedMotion of ['reduce', 'no-preference'] as const)
  test(`no hydration errors with ${reducedMotion}`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.emulateMedia({ reducedMotion });
    for (const route of ['/', '/tr']) {
      await page.goto(route);
      await expect(page.locator('[data-carousel]')).toHaveAttribute(
        'data-enhanced',
        'true',
      );
      await page.locator('[data-carousel-controls] button').nth(1).click();
    }
    expect(errors).toEqual([]);
  });
