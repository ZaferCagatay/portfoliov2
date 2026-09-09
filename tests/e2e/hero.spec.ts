import { test, expect } from '@playwright/test';

for (const locale of ['en', 'tr']) {
  for (const width of [1536, 1440, 1280, 1024, 768, 430, 390, 360]) {
    test(`${locale} hero fits ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(locale === 'en' ? '/' : '/tr');
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(
        page.getByText('Zafer Çağatay Umut', { exact: true }),
      ).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      const brokenAnchors = await page
        .locator('a[href^="#"]')
        .evaluateAll(
          (links) =>
            links.filter(
              (link) =>
                !document.getElementById(link.getAttribute('href')!.slice(1)),
            ).length,
        );
      expect(brokenAnchors).toBe(0);
      const images = page.locator('.hero-proof img');
      await expect(images).toHaveCount(2);
      for (const image of await images.all())
        await expect
          .poll(() =>
            image.evaluate(
              (element: HTMLImageElement) =>
                element.complete && element.naturalWidth > 0,
            ),
          )
          .toBe(true);
      await expect(page.locator('main > section')).toHaveCount(6);
    });
  }
}

test('mobile disclosure supports keyboard, Escape, close-on-navigation and language switching', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const menu = page.getByRole('button', { name: 'Menu', exact: true });
  await menu.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('summary')).toHaveAttribute(
    'aria-expanded',
    'true',
  );
  await page.keyboard.press('Tab');
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await menu.click();
  await page.locator('#mobile-menu').getByText('View my work').click();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await page.getByRole('link', { name: 'Türkçe sayfaya geç' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'tr');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Karmaşık',
  );
});

test('resume is a real local PDF and contact points to the supplied address', async ({
  page,
  request,
}) => {
  await page.goto('/');
  const response = await request.get('/resume/Zafer_Cagatay_Umut_Resume.pdf');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/pdf');
  expect((await response.body()).subarray(0, 4).toString()).toBe('%PDF');
  await expect(page.locator('.editorial-actions a').first()).toHaveAttribute(
    'href',
    'mailto:zafercagatayumut@gmail.com',
  );
});

test('reduced motion removes sticky distance and transforms', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await expect(
    page.getByRole('button', { name: 'Reduced motion on' }),
  ).toBeDisabled();
  expect(
    await page
      .locator('.hero-sticky')
      .evaluate((el) => getComputedStyle(el).position),
  ).toBe('relative');
  expect(
    await page
      .locator('.hero-shell')
      .evaluate((el) => getComputedStyle(el).minHeight),
  ).toBe('0px');
  expect(
    await page
      .locator('.headline-exit')
      .evaluate((el) => getComputedStyle(el).transform),
  ).toBe('none');
});

test('desktop scroll reverses and manual pause stops movement', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1600 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Pause motion' }).waitFor();
  await expect(page.locator('.hero-shell')).toHaveAttribute(
    'data-sticky-enabled',
    'true',
  );
  await page.evaluate(() =>
    scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }),
  );
  await expect
    .poll(() =>
      page
        .locator('.headline-exit')
        .evaluate((el) => parseFloat(getComputedStyle(el).opacity)),
    )
    .toBeLessThan(1);
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  await expect
    .poll(() =>
      page
        .locator('.headline-exit')
        .evaluate((el) => parseFloat(getComputedStyle(el).opacity)),
    )
    .toBe(1);
  await page.getByRole('button', { name: 'Pause motion' }).click();
  await expect(
    page.getByRole('button', { name: 'Resume motion' }),
  ).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.hero-shell')).toHaveAttribute(
    'data-motion-paused',
    'true',
  );
});

test('short landscape and effective 200% desktop zoom retain readable flow', async ({
  page,
}) => {
  for (const size of [
    { width: 844, height: 390 },
    { width: 720, height: 450 },
  ]) {
    await page.setViewportSize(size);
    await page.goto('/tr');
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect(
      await page
        .locator('.hero-sticky')
        .evaluate((el) => getComputedStyle(el).position),
    ).toBe('relative');
  }
});

test('server content and mobile navigation work without JavaScript', async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  for (const route of ['/', '/tr']) {
    await page.goto(`${baseURL}${route}`);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    const menu = await page.locator('summary').boundingBox();
    expect(menu).not.toBeNull();
    await page.mouse.click(
      menu!.x + menu!.width / 2,
      menu!.y + menu!.height / 2,
    );
    await expect(page.locator('#mobile-menu')).toBeVisible();
    await expect(page.locator('#mobile-menu a')).toHaveCount(5);
  }
  await context.close();
});
