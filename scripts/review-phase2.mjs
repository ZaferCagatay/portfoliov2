import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
});
await mkdir('.impeccable/review', { recursive: true });
for (const [name, route, width] of [
  ['desktop', '/', 1440],
  ['mobile', '/', 390],
  ['desktop-tr', '/tr', 1440],
  ['mobile-tr', '/tr', 360],
]) {
  const page = await browser.newPage({
    viewport: { width, height: 900 },
    reducedMotion: 'reduce',
  });
  await page.goto('http://127.0.0.1:3101' + route);
  await page.evaluate(() => document.fonts.ready);
  await page.locator('.about-context img').scrollIntoViewIfNeeded();
  await page.locator('.about-context img').evaluate((img) => img.decode());
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({
    path: `.impeccable/review/${name}.png`,
    fullPage: true,
  });
  await page.close();
}
await browser.close();
