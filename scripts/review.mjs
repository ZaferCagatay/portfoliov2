import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH });
const dir = '.impeccable/review';
await mkdir(dir, {recursive:true});
const records = [];
for (const [name, path, width, height] of [
  ['desktop','/',1440,900], ['mobile','/',390,844],
  ['desktop-tr','/tr',1440,900], ['mobile-tr','/tr',390,844],
  ['tablet','/',768,1024], ['small-mobile-tr','/tr',360,800],
]) {
  const context = await browser.newContext({viewport:{width,height}, deviceScaleFactor:1});
  const page = await context.newPage();
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.addInitScript(() => {
    window.__perf = { cls:0, lcp:0 };
    new PerformanceObserver(list => { for(const entry of list.getEntries()) if(!entry.hadRecentInput) window.__perf.cls += entry.value; }).observe({type:'layout-shift',buffered:true});
    new PerformanceObserver(list => { window.__perf.lcp = list.getEntries().at(-1).startTime; }).observe({type:'largest-contentful-paint',buffered:true});
  });
  await page.goto(`${process.env.PREVIEW_URL || "http://127.0.0.1:3101"}${path}`);
  await page.evaluate(()=>document.fonts.ready);
  await page.waitForTimeout(1400);
  await page.screenshot({path:`${dir}/${name}.png`,fullPage:true});
  const metrics = await page.evaluate(()=>({...window.__perf, overflow:document.documentElement.scrollWidth>innerWidth, transferBytes:performance.getEntriesByType('resource').reduce((sum,e)=>sum+e.transferSize,0), nav:performance.getEntriesByType('navigation')[0].toJSON()}));
  records.push({name,width,height,errors,...metrics});
  await context.close();
}
await writeFile(`${dir}/performance.json`, JSON.stringify(records,null,2));
console.log(records.map(({name,cls,lcp,overflow,transferBytes,errors})=>({name,cls,lcp,overflow,transferBytes,errors})));
await browser.close();
