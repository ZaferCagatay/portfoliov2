import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
const base = process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:3100';
let server;
try { await fetch(base, { signal: AbortSignal.timeout(2000) }); } catch {
  server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', new URL(base).port || '3100'], {stdio: 'ignore'});
  for (let i = 0; i < 30; i++) {
    if (server.exitCode !== null) throw new Error('Preview server exited');
    try { await fetch(base, {signal: AbortSignal.timeout(2000)}); break; } catch { await new Promise(resolve => setTimeout(resolve, 500)); }
  }
}
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH });
const out = '.impeccable/review/engineering-pinned';
await mkdir(out, { recursive: true });
const report = [];
try {
  for (const [width, height, locale, reduced] of [[1440, 900, 'en', false], [1366, 768, 'en', false], [1024, 768, 'tr', false], [1280, 720, 'en', true], [390, 844, 'en', true], [320, 900, 'tr', true]]) {
    const context = await browser.newContext({viewport: {width, height}, reducedMotion: reduced ? 'reduce' : 'no-preference'});
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(base + (locale === 'en' ? '/' : '/tr'));
    await page.evaluate(() => document.fonts.ready);
    const section = page.locator('#approach');
    const root = section.locator('[data-phase]');
    await expect(root).toHaveAttribute('data-enhanced', 'true');
    const pinned = await root.getAttribute('data-pinned') === 'true';
    if (pinned) {
      for (const phase of [0, 3, 7]) {
        await root.evaluate((el, phase) => window.scrollTo({top: Number(el.dataset.scrollStart) + Number(el.dataset.scrollSegment) * (phase + .5), behavior: 'instant'}), phase);
        await expect(root).toHaveAttribute('data-phase', String(phase));
        await page.waitForTimeout(750);
        await page.screenshot({path: `${out}/${locale}-${width}-${height}-step${phase + 1}.png`});
      }
    } else {
      await section.screenshot({path: `${out}/${locale}-${width}-${height}-natural.png`});
    }
    const overflow = await section.evaluate(el => Array.from(el.querySelectorAll('*')).filter(child => { const r = child.getBoundingClientRect(); return r.width > 1 && (r.left < -1 || r.right > innerWidth + 1); }).map(el => ({tag: el.tagName, cls: el.className})));
    const violations = (await new AxeBuilder({page}).include('#approach').withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations;
    let fit;
    if (width === 1280) fit = await root.evaluate(el => {
      el.dataset.pinned = 'true';
      const viewport = el.querySelector('[data-engineering-viewport]');
      return {height: viewport.offsetHeight, scrollHeight: viewport.scrollHeight, children: Array.from(viewport.children).map(c => ({cls: c.className, height: c.getBoundingClientRect().height})), figure: el.querySelector('figure').getBoundingClientRect().height};
    });
    report.push({width, height, locale, reduced, pinned, errors, overflow, violations, fit});
    await context.close();
  }
  const context = await browser.newContext({javaScriptEnabled:false, viewport: {width:320, height:900}});
  const page = await context.newPage();
  await page.goto(base);
  await page.evaluate(() => document.fonts.ready);
  report.push({nojs: await page.evaluate(() => ({width: innerWidth, scrollWidth: document.documentElement.scrollWidth, overflow: Array.from(document.querySelectorAll('body *')).filter(el => {const r=el.getBoundingClientRect(); return r.width>1 && (r.right>innerWidth+1 || r.left < -1); }).map(el => ({tag:el.tagName, cls:el.className})).slice(0,20)}))});
  await context.close();
  await writeFile(`${out}/report.json`, JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));
} finally { await browser.close(); server?.kill('SIGTERM'); }
