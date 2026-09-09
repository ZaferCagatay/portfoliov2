import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
for (const [route, next, previous] of [
  ['/', 'Next project', 'Previous project'],
  ['/tr', 'Sonraki proje', 'Önceki proje'],
]) {
  test(`${route} selectors, rapid navigation, loops and resizing`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(route);
    const carousel = page.locator('[data-carousel]');
    await expect(carousel).toHaveAttribute('data-enhanced', 'true');
    await carousel.scrollIntoViewIfNeeded();
    const initialBounds = await carousel
      .locator('[data-project-slide="karta"]')
      .boundingBox();
    const stageBounds = await carousel.boundingBox();
    expect(
      Math.abs(
        initialBounds!.x +
          initialBounds!.width / 2 -
          stageBounds!.x -
          stageBounds!.width / 2,
      ),
    ).toBeLessThan(2);
    const lastBounds = await carousel
      .locator('[data-project-slide="affiliate-platform"]')
      .boundingBox();
    expect(
      initialBounds!.x - lastBounds!.x - lastBounds!.width,
    ).toBeGreaterThanOrEqual(24);
    const selected = carousel.locator(
      '[data-project-slide][data-selected="true"]',
    );
    for (let i = 0; i < 12; i++)
      await carousel.getByRole('button', { name: next, exact: true }).click();
    await expect(selected).toHaveAttribute('data-project-slide', 'karta');
    for (let i = 0; i < 5; i++)
      await carousel
        .getByRole('button', { name: previous, exact: true })
        .click();
    await expect(selected).toHaveAttribute(
      'data-project-slide',
      'affiliate-platform',
    );
    for (const width of [1536, 1440, 1280, 1024, 768, 430, 390, 360, 844]) {
      await page.setViewportSize({ width, height: width === 844 ? 390 : 900 });
      await expect(selected).toHaveAttribute(
        'data-project-slide',
        'affiliate-platform',
      );
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      const bounds = await selected.boundingBox();
      expect(bounds!.x).toBeGreaterThanOrEqual(0);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width + 1);
    }
    await carousel.locator('[data-carousel-controls] button').nth(1).click();
    await expect(selected).toHaveAttribute('data-project-slide', 'pavlov');
    await expect(selected.locator('a')).toHaveAttribute(
      'href',
      'https://pavlovpet.app',
    );
    await expect(carousel.locator('a[href*="github"]')).toHaveCount(0);
  });
}
test('drag snaps and vertical wheel scrolls the document', async ({ page }) => {
  await page.goto('/');
  const carousel = page.locator('[data-carousel]');
  await expect(carousel).toHaveAttribute('data-enhanced', 'true');
  await carousel.scrollIntoViewIfNeeded();
  const slide = carousel.locator('[data-project-slide="karta"]');
  const box = await slide.boundingBox();
  await page.mouse.move(box!.x + box!.width * 0.7, box!.y + 100);
  await page.mouse.down();
  await page.mouse.move(box!.x + 30, box!.y + 105, { steps: 20 });
  await page.mouse.up();
  await expect(carousel.locator('[data-selected="true"]')).toHaveAttribute(
    'data-project-slide',
    'pavlov',
  );
  await expect(carousel.getByRole('status')).toContainText('Pavlov');
  const scroll = await page.evaluate(() => scrollY);
  await page.mouse.wheel(0, 400);
  await expect
    .poll(() => page.evaluate(() => scrollY))
    .toBeGreaterThan(scroll + 100);
});
test('no JavaScript retains scrollable projects and real links', async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 360, height: 800 },
  });
  const page = await context.newPage();
  await page.goto(baseURL!);
  const carousel = page.locator('[data-carousel]');
  await expect(carousel.locator('h3')).toHaveCount(4);
  await expect(carousel.locator('[inert]')).toHaveCount(0);
  await expect(carousel.getByRole('button')).toHaveCount(0);
  const link = carousel.locator('a[href="https://pavlovpet.app"]');
  await link.focus();
  await expect(link).toBeInViewport();
  await context.close();
});
test('failed project imagery preserves content and controls', async ({
  page,
}) => {
  await page.route(/.*(?:_next\/image|projects\/).*/, (route) => route.abort());
  await page.goto('/');
  const carousel = page.locator('[data-carousel]');
  await carousel
    .getByRole('button', { name: 'Next project', exact: true })
    .click();
  await expect(carousel.locator('[data-selected="true"] h3')).toHaveText(
    'Pavlov Pet Care',
  );
  await expect(carousel.locator('[data-selected="true"] a')).toBeVisible();
});
test('Embla falls back to bounded one- and two-project tracks', async ({
  page,
}) => {
  const source = await readFile(
    'node_modules/embla-carousel/esm/embla-carousel.esm.js',
    'utf8',
  );
  await page.goto('/');
  for (const count of [1, 2]) {
    const result = await page.evaluate(
      async ({ source, count }) => {
        const { default: Embla } = await import(
          URL.createObjectURL(new Blob([source], { type: 'text/javascript' }))
        );
        const viewport = document.createElement('div');
        viewport.style.cssText = 'width:600px;overflow:hidden';
        viewport.innerHTML = `<div style="display:flex;gap:24px">${Array.from({ length: count }, () => '<div style="flex:0 0 84%;height:100px">Project</div>').join('')}</div>`;
        document.body.append(viewport);
        const api = Embla(viewport, {
          align: 'center',
          containScroll: false,
          slidesToScroll: 1,
          loop: count > 2,
        });
        const startPrevious = api.canScrollPrev();
        api.scrollNext(true);
        api.scrollNext(true);
        const result = {
          selected: api.selectedScrollSnap(),
          next: api.canScrollNext(),
          startPrevious,
        };
        api.destroy();
        viewport.remove();
        return result;
      },
      { source, count },
    );
    expect(result).toEqual({
      selected: count - 1,
      next: false,
      startPrevious: false,
    });
  }
});
test('touch swipe keeps vertical page gestures available', async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    hasTouch: true,
    isMobile: true,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto(baseURL!);
  const carousel = page.locator('[data-carousel]');
  await expect(carousel).toHaveAttribute('data-enhanced', 'true');
  await page.evaluate(() =>
    scrollTo(
      0,
      document.querySelector('[data-carousel]')!.getBoundingClientRect().top +
        scrollY,
    ),
  );
  const cdp = await context.newCDPSession(page);
  const swipe = async (
    from: { x: number; y: number },
    to: { x: number; y: number },
  ) => {
    await cdp.send('Input.dispatchTouchEvent', {
      type: 'touchStart',
      touchPoints: [from],
    });
    for (let step = 1; step <= 12; step++) {
      await cdp.send('Input.dispatchTouchEvent', {
        type: 'touchMove',
        touchPoints: [
          {
            x: from.x + ((to.x - from.x) * step) / 12,
            y: from.y + ((to.y - from.y) * step) / 12,
          },
        ],
      });
      await page.waitForTimeout(16);
    }
    await cdp.send('Input.dispatchTouchEvent', {
      type: 'touchEnd',
      touchPoints: [],
    });
  };
  await swipe({ x: 320, y: 150 }, { x: 60, y: 150 });
  await expect(carousel.locator('[data-selected="true"]')).toHaveAttribute(
    'data-project-slide',
    'pavlov',
  );
  const before = await page.evaluate(() => scrollY);
  await swipe({ x: 190, y: 420 }, { x: 190, y: 180 });
  await expect
    .poll(() => page.evaluate(() => scrollY))
    .toBeGreaterThan(before + 100);
  await context.close();
});
test('dragging a live link suppresses navigation; a subsequent click works', async ({
  page,
}) => {
  await page.goto('/');
  const carousel = page.locator('[data-carousel]');
  await expect(carousel).toHaveAttribute('data-enhanced', 'true');
  const link = carousel.locator('[data-project-slide="karta"] a');
  await link.scrollIntoViewIfNeeded();
  await page.evaluate(() => {
    Reflect.set(window, 'projectClicks', 0);
    document
      .querySelector('[data-carousel]')!
      .addEventListener('click', (event) => {
        if ((event.target as HTMLElement).closest('a')) {
          event.preventDefault();
          Reflect.set(
            window,
            'projectClicks',
            Reflect.get(window, 'projectClicks') + 1,
          );
        }
      });
  });
  const box = await link.boundingBox();
  await page.mouse.move(box!.x + 8, box!.y + box!.height / 2);
  await page.mouse.down();
  await page.mouse.move(box!.x + 40, box!.y + box!.height / 2, { steps: 8 });
  await page.mouse.up();
  expect(await page.evaluate(() => Reflect.get(window, 'projectClicks'))).toBe(
    0,
  );
  await carousel.locator('[data-carousel-controls] button').first().click();
  await link.click();
  expect(await page.evaluate(() => Reflect.get(window, 'projectClicks'))).toBe(
    1,
  );
});

test('initialization failure restores native project content', async ({
  page,
}) => {
  await page.addInitScript(() => {
    const measure = window.getComputedStyle;
    let failed = false;
    window.getComputedStyle = function (target, pseudo) {
      if (!failed && target.closest('[data-carousel]')) {
        failed = true;
        throw new Error('Simulated carousel initialization failure');
      }
      return measure.call(this, target, pseudo);
    };
  });
  await page.goto('/');
  const carousel = page.locator('[data-carousel]');
  await expect(carousel).toHaveAttribute('data-enhanced', 'false');
  await expect(carousel.locator('h3')).toHaveCount(4);
  await expect(carousel.locator('[inert]')).toHaveCount(0);
  await carousel.locator('a[href="https://pavlovpet.app"]').focus();
  await expect(
    carousel.locator('a[href="https://pavlovpet.app"]'),
  ).toBeInViewport();
});
