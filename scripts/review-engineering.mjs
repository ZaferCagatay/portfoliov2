import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
const base = 'http://127.0.0.1:3000';
let server;
try { await fetch(base); } catch {
  server = spawn('npm', ['run', 'dev', '--', '--hostname', '127.0.0.1', '--port', '3000'], { stdio: 'ignore', detached: true });
  for (let i = 0; i < 60; i++) { try { await fetch(base); break; } catch { await new Promise(r => setTimeout(r, 500)); } }
}
const browser = await chromium.launch({ executablePath: '/home/cenk/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome' });
const out = '.impeccable/review/engineering';
await mkdir(out, { recursive: true });
const report = [];
try {
  for (const [route, width] of [['/', 1440], ['/tr', 1440], ['/', 768], ['/', 390], ['/tr', 360], ['/', 320]]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base + route);
    await page.evaluate(() => document.fonts.ready);
    const section = page.locator('#approach');
    await section.scrollIntoViewIfNeeded();
    const name = `${route === '/' ? 'en' : 'tr'}-${width}`;
    await section.screenshot({ path: `${out}/${name}-karta.png` });
    const controls = section.getByRole('group').getByRole('button');
    await controls.nth(1).focus();
    await page.keyboard.press('Enter');
    if (await controls.nth(1).getAttribute('aria-pressed') !== 'true') throw new Error('Keyboard product switch failed');
    const nodes = section.locator('button[aria-controls]');
    const details = [];
    for (let i = 0; i < 4; i++) {
      await nodes.nth(i).focus();
      await page.keyboard.press('Space');
      details.push(await section.getByRole('status').innerText());
      if (await nodes.nth(i).getAttribute('aria-pressed') !== 'true') throw new Error('Keyboard layer selection failed');
    }
    await nodes.nth(1).click();
    await page.evaluate(() => document.activeElement?.blur());
    await section.screenshot({ path: `${out}/${name}-pavlov.png` });
    const overflow = await section.evaluate(el => Array.from(el.querySelectorAll('*')).filter(child => {
      const rect = child.getBoundingClientRect();
      return rect.width > 1 && (rect.right > innerWidth + 1 || rect.left < -1);
    }).map(el => ({tag: el.tagName, cls: el.className})));
    const axe = await new AxeBuilder({ page }).include('#approach').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    report.push({route, width, errors, overflow, violations: axe.violations, detailStates: details.length,
      runningAnimations: await section.evaluate(el => el.getAnimations({subtree: true}).filter(a => a.playState === 'running').length)});
    await page.close();
  }
  const page = await browser.newPage({viewport: {width: 1440, height: 1000}, reducedMotion: 'no-preference'});
  await page.goto(base);
  await page.locator('#approach').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  const settled = await page.locator('#approach').evaluate(el => el.getAnimations({subtree:true}).filter(a => a.playState === 'running').length);
  report.push({motion: 'finite entrance settled', runningAnimations: settled});
  await page.close();
  const nojs = await browser.newPage({javaScriptEnabled: false, viewport: {width: 390, height: 1000}});
  await nojs.goto(base);
  report.push({noJavaScript: await nojs.locator('#approach').getByRole('heading').allTextContents()});
  await nojs.close();
  await writeFile(`${out}/report.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally { await browser.close(); if(server) { try { process.kill(-server.pid, 'SIGTERM'); } catch {} } }
