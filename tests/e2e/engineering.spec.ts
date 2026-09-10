import { expect, test, type Page } from '@playwright/test';

async function setup(page: Page, route = '/') {
  await page.goto(route);
  await page.evaluate(() => document.fonts.ready);
  const root = page.locator('#approach [data-phase]');
  await expect(root).toHaveAttribute('data-pinned', 'true');
  const metrics = await root.evaluate(el => ({
    start: Number((el as HTMLElement).dataset.scrollStart),
    segment: Number((el as HTMLElement).dataset.scrollSegment),
    end: Number((el as HTMLElement).dataset.scrollEnd),
  }));
  const move = async (position: number) => {
    await page.evaluate(top => window.scrollTo({ top, behavior: 'instant' }), position);
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  };
  await move(metrics.start + metrics.segment * .5);
  await expect(root).toHaveAttribute('data-phase', '0');
  return { root, metrics, move };
}

for (const [width, height, route, reduced] of [
  [1440, 1000, '/', false], [1440, 900, '/tr', false],
  [1366, 768, '/', false], [1024, 768, '/tr', false],
  [1280, 720, '/', true],
] as const) {
  test(`pinned stages and stationary arrows ${width}x${height} ${route} reduced=${reduced}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.emulateMedia({ reducedMotion: reduced ? 'reduce' : 'no-preference' });
    const { root, metrics, move } = await setup(page, route);
    const previous = root.getByRole('button').first();
    const next = root.getByRole('button').nth(1);
    await expect(previous).toBeDisabled();
    await expect(next).toBeEnabled();
    const initial = (await next.boundingBox())!;
    const heading = await page.locator('#approach-heading').boundingBox();
    const visual = await root.locator('figure').boundingBox();
    expect(visual!.y + visual!.height).toBeLessThanOrEqual(height);
    // Click the same physical coordinates repeatedly: controls must not move.
    for (let i = 1; i < 8; i++) {
      await page.mouse.click(initial.x + initial.width / 2, initial.y + initial.height / 2);
      await expect(root).toHaveAttribute('data-phase', String(i));
      const box = (await next.boundingBox())!;
      expect(Math.abs(box.y - initial.y)).toBeLessThan(1);
      expect(Math.abs(box.x - initial.x)).toBeLessThan(1);
      expect(Math.abs((await page.locator('#approach-heading').boundingBox())!.y - heading!.y)).toBeLessThan(1);
    }
    await expect(next).toBeDisabled();
    const back = (await previous.boundingBox())!;
    for (let i = 6; i >= 0; i--) {
      await page.mouse.click(back.x + back.width / 2, back.y + back.height / 2);
      await expect(root).toHaveAttribute('data-phase', String(i));
    }
    // Mixed input continues from the segment selected by the arrows.
    await move(metrics.start + metrics.segment * 3.5);
    await expect(root).toHaveAttribute('data-phase', '3');
    await previous.focus();
    await page.keyboard.press('Enter');
    await expect(root).toHaveAttribute('data-phase', '2');
    await page.mouse.wheel(0, Math.round(metrics.segment * .7));
    await expect(root).toHaveAttribute('data-phase', '3');
    await next.focus();
    await page.keyboard.press('Space');
    await expect(root).toHaveAttribute('data-phase', '4');
    // Final range finishes before release; reversing past the start releases too.
    await move(metrics.end - 20);
    await expect(root).toHaveAttribute('data-phase', '7');
    expect(Math.abs((await root.locator('[data-engineering-viewport]').boundingBox())!.y)).toBeLessThan(1);
    await move(metrics.end + 100);
    expect((await root.locator('[data-engineering-viewport]').boundingBox())!.y).toBeLessThan(-90);
    await move(metrics.start - 100);
    await expect(root).toHaveAttribute('data-phase', '0');
    expect((await root.locator('[data-engineering-viewport]').boundingBox())!.y).toBeGreaterThan(90);
  });
}

test('small scroll increments are sequential in both directions and stable at thresholds', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const { root, metrics, move } = await setup(page);
  const sequence: number[] = [0];
  for (let position = metrics.start + 40; position < metrics.end; position += 80) {
    await move(position);
    const current = Number(await root.getAttribute('data-phase'));
    if (sequence.at(-1) !== current) sequence.push(current);
  }
  expect(sequence).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
  const reverse: number[] = [7];
  for (let position = metrics.end - 40; position > metrics.start; position -= 80) {
    await move(position);
    const current = Number(await root.getAttribute('data-phase'));
    if (reverse.at(-1) !== current) reverse.push(current);
  }
  expect(reverse).toEqual([7, 6, 5, 4, 3, 2, 1, 0]);
  const boundary = metrics.start + metrics.segment * 3;
  await move(boundary - 30);
  await expect(root).toHaveAttribute('data-phase', '2');
  for (const offset of [3, -3, 7, -7]) {
    await move(boundary + offset);
    await expect(root).toHaveAttribute('data-phase', '2');
  }
  await move(boundary + 20);
  await expect(root).toHaveAttribute('data-phase', '3');
  for (const offset of [-3, 3, -7, 7]) {
    await move(boundary + offset);
    await expect(root).toHaveAttribute('data-phase', '3');
  }
  // A deliberate large jump settles directly; no queued catch-up animation.
  await move(metrics.start + metrics.segment * 7.5);
  await expect(root).toHaveAttribute('data-phase', '7');
});

test('mobile stays in normal flow and reduced motion retains desktop navigation', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const { root, metrics, move } = await setup(page);
  await move(metrics.start + metrics.segment * 4.5);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(root).toHaveAttribute('data-phase', '4');
  await expect(root.getByRole('button').nth(1)).toBeEnabled();
  expect(await root.evaluate(el => el.getAnimations({ subtree: true }).filter(a => a.playState === 'running').length)).toBe(0);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(root).toHaveAttribute('data-pinned', 'false');
  await expect(root.getByRole('button').nth(1)).toBeHidden();
  const stages = root.locator('[data-engineering-step]');
  for (let i = 0; i < 8; i++) {
    await stages.nth(i).evaluate(el => el.scrollIntoView({block: 'center', behavior: 'instant'}));
    await expect(root).toHaveAttribute('data-phase', String(i));
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('mobile lifecycle remains complete without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 900 } });
  const page = await context.newPage();
  await page.goto(`${baseURL}/`);
  const section = page.locator('#approach');
  await expect(section.locator('[data-engineering-step]')).toHaveCount(8);
  await expect(section.getByRole('heading', { name: 'Observe and improve' })).toBeVisible();
  expect(await section.innerText()).not.toMatch(/Karta|Pavlov/);
  await page.evaluate(() => document.fonts.ready);
  // Scope this regression check to the changed section. The existing carousel
  // has a separate 1px document overflow without JavaScript at 320px.
  expect(await section.evaluate(el => Array.from(el.querySelectorAll('*')).filter(child => {
    const box = child.getBoundingClientRect();
    return box.width > 1 && (box.left < -1 || box.right > innerWidth + 1);
  }).length)).toBe(0);
  await context.close();
});
