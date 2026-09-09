import { test, expect } from '@playwright/test';
for (const [locale, route] of [
  ['en', '/'],
  ['tr', '/tr'],
]) {
  test(`${locale} final navigation, project carousel, metadata and contact`, async ({
    page,
    request,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(route);
    for (const id of ['projects', 'approach', 'about', 'contact']) {
      await page.locator(`.desktop-navigation a[href="#${id}"]`).click();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      await expect(page.locator(`#${id}`)).toBeInViewport();
    }
    await expect(page.locator('[data-project-slide]')).toHaveCount(4);
    await expect(page.locator('[data-carousel]')).toHaveAttribute(
      'data-enhanced',
      'true',
    );
    await expect(page.locator('#contact a.email-address')).toHaveAttribute(
      'href',
      'mailto:zafercagatayumut@gmail.com',
    );
    await page.locator('footer a[href="#top"]').click();
    await expect(page.locator('header')).toBeInViewport();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://zafercagatayumut.com${route === '/' ? '' : '/tr'}`,
    );
    await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute(
      'href',
      'https://zafercagatayumut.com/tr',
    );
    expect(
      (await request.get('/opengraph-image')).headers()['content-type'],
    ).toContain('image/png');
  });
  for (const fails of [false, true])
    test(`${locale} clipboard ${fails ? 'denial' : 'success'}`, async ({
      page,
    }) => {
      await page.addInitScript(
        ({ fails }) =>
          Object.defineProperty(navigator, 'clipboard', {
            value: {
              writeText: async (value: string) => {
                if (fails) throw new Error('Denied');
                Object.assign(window, { copiedEmail: value });
              },
            },
          }),
        { fails },
      );
      await page.goto(route);
      await page.locator('.copy-email button').click();
      await expect(page.locator('.copy-email').getByRole('status')).toHaveText(
        fails
          ? locale === 'en'
            ? 'Couldn’t copy. Select the email address to copy it manually.'
            : 'Kopyalanamadı. E-posta adresini seçip elle kopyalayabilirsiniz.'
          : locale === 'en'
            ? 'Email copied'
            : 'E-posta kopyalandı',
      );
      if (!fails)
        expect(
          await page.evaluate(() => Reflect.get(window, 'copiedEmail')),
        ).toBe('zafercagatayumut@gmail.com');
      await expect(page.locator('.email-address')).toBeVisible();
    });
}
