import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
});
const directory = '.impeccable/review/phase3';
await mkdir(directory, { recursive: true });
const results = [];
for (const route of ['/', '/tr'])
  for (const width of [1536, 1440, 1280, 1024, 768, 430, 390, 360]) {
    const page = await browser.newPage({
      viewport: { width, height: 900 },
      reducedMotion: 'reduce',
    });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.addInitScript(() => {
      window.metrics = { lcp: 0, cls: 0 };
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries())
          window.metrics.lcp = entry.startTime;
      }).observe({ type: 'largest-contentful-paint', buffered: true });
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries())
          if (!entry.hadRecentInput) window.metrics.cls += entry.value;
      }).observe({ type: 'layout-shift', buffered: true });
    });
    await page.goto(
      (process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:3100') + route,
    );
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(500);
    const initial = await page.evaluate(() => ({
      ...window.metrics,
      transfer: performance
        .getEntriesByType('resource')
        .reduce((sum, entry) => sum + entry.transferSize, 0),
      js: performance
        .getEntriesByType('resource')
        .filter((entry) => entry.name.includes('.js'))
        .reduce((sum, entry) => sum + entry.transferSize, 0),
    }));
    const carousel = page.locator('[data-carousel]');
    await carousel.scrollIntoViewIfNeeded();
    for (let index = 0; index < 4; index++) {
      await carousel
        .locator('[data-carousel-controls] button')
        .nth(index)
        .click();
      await page
        .locator('[data-selected="true"] img')
        .evaluateAll((images) =>
          Promise.all(
            images
              .filter((img) => img.getClientRects().length)
              .map((img) => img.decode().catch(() => {})),
          ),
        );
      await carousel.screenshot({
        path: `${directory}/${route === '/' ? 'en' : 'tr'}-${width}-${index + 1}.png`,
      });
    }
    results.push({
      route,
      width,
      initial,
      errors,
      overflow: await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
    });
    await page.close();
  }
await writeFile(`${directory}/metrics.json`, JSON.stringify(results, null, 2));
await browser.close();
