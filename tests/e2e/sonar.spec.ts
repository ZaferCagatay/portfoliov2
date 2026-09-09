import { test, expect } from "@playwright/test";

declare global { interface Window { sonarDraws: number; sonarFrameDraws: number; sonarMaxDraws: number } }

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.sonarDraws = 0; window.sonarFrameDraws = 0; window.sonarMaxDraws = 0;
    const original = CanvasRenderingContext2D.prototype.clearRect;
    CanvasRenderingContext2D.prototype.clearRect = function (...args) {
      if (this.canvas.closest('[data-slot="sonar-grid"]')) {
        window.sonarDraws++; window.sonarFrameDraws++;
        window.sonarMaxDraws = Math.max(window.sonarMaxDraws, window.sonarFrameDraws);
      }
      return original.apply(this, args);
    };
    const frame = () => { window.sonarFrameDraws = 0; requestAnimationFrame(frame); };
    requestAnimationFrame(frame);
  });
});

const ready = async (page: import("@playwright/test").Page) => {
  await page.goto("/");
  await expect(page.locator('[data-slot="sonar-grid"]')).toHaveAttribute("data-canvas-ready", "true");
};

test("canvas animates without duplicate loops and manual pause freezes it", async ({ page }) => {
  await ready(page); await page.waitForTimeout(1000);
  await page.evaluate(() => { window.sonarMaxDraws = 0; window.sonarFrameDraws = 0; });
  await page.waitForTimeout(300);
  expect(await page.evaluate(() => window.sonarMaxDraws)).toBe(1);
  await page.getByRole("button", { name: "Pause motion" }).click();
  await page.waitForTimeout(100);
  const count = await page.evaluate(() => window.sonarDraws);
  await page.waitForTimeout(250);
  expect(await page.evaluate(() => window.sonarDraws)).toBe(count);
  await page.getByRole("button", { name: "Resume motion" }).click();
  await expect.poll(() => page.evaluate(() => window.sonarDraws)).toBeGreaterThan(count);
});

test("reduced motion stays static, including after taps", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await ready(page); await page.waitForTimeout(200);
  const count = await page.evaluate(() => window.sonarDraws);
  await page.locator("h1").click();
  await page.waitForTimeout(300);
  expect(await page.evaluate(() => window.sonarDraws)).toBe(count);
});

test("hidden-document and offscreen transitions suspend and restore drawing", async ({ page }) => {
  await ready(page);
  await page.evaluate(() => { Object.defineProperty(document, "hidden", { configurable: true, value: true }); document.dispatchEvent(new Event("visibilitychange")); });
  await page.waitForTimeout(100);
  const hidden = await page.evaluate(() => window.sonarDraws);
  await page.waitForTimeout(250); expect(await page.evaluate(() => window.sonarDraws)).toBe(hidden);
  await page.evaluate(() => { Object.defineProperty(document, "hidden", { configurable: true, value: false }); document.dispatchEvent(new Event("visibilitychange")); });
  await expect.poll(() => page.evaluate(() => window.sonarDraws)).toBeGreaterThan(hidden);
  await page.locator(".hero-field").evaluate(el => { (el as HTMLElement).style.transform = "translateY(300vh)"; });
  await page.waitForTimeout(150);
  const outside = await page.evaluate(() => window.sonarDraws);
  await page.waitForTimeout(250); expect(await page.evaluate(() => window.sonarDraws)).toBe(outside);
  await page.locator(".hero-field").evaluate(el => { (el as HTMLElement).style.removeProperty("transform"); });
  await expect.poll(() => page.evaluate(() => window.sonarDraws)).toBeGreaterThan(outside);
});

test("DPR is capped and backing store follows mobile resizing", async ({ page }) => {
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 3, mobile: false });
  await ready(page);
  expect(await page.locator("canvas").evaluate((el: HTMLCanvasElement) => el.width / el.getBoundingClientRect().width)).toBeCloseTo(2, 1);
  await cdp.send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 3, mobile: true });
  await expect.poll(() => page.locator("canvas").evaluate((el: HTMLCanvasElement) => el.width / el.getBoundingClientRect().width)).toBeCloseTo(1.5, 1);
});

test("canvas failure preserves fallback, content and working actions", async ({ page }) => {
  await page.addInitScript(() => { Object.defineProperty(HTMLCanvasElement.prototype, "getContext", { value: () => null }); });
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator(".field-dots")).toBeVisible();
  await page.locator(".hero-primary a").first().click();
  await expect(page).toHaveURL(/#projects$/);
});

test("touch ripple preserves link navigation and native touch scrolling", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(`${baseURL}/`);
  await expect(page.locator('[data-slot="sonar-grid"]')).toHaveAttribute("data-canvas-ready", "true");
  await page.locator("h1").tap();
  expect(await page.locator(".hero-shell").evaluate(el => getComputedStyle(el).touchAction)).toBe("auto");
  await page.locator(".hero-primary a").first().tap();
  await expect(page).toHaveURL(/#projects$/);
  await context.close();
});
