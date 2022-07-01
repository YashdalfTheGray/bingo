import * as dotenv from 'dotenv';
import puppeteer from 'puppeteer';

export type AllPuppeteerLaunchOptions = puppeteer.LaunchOptions &
  puppeteer.BrowserLaunchArgumentOptions &
  puppeteer.BrowserConnectOptions;

export function setupEnvironment() {
  dotenv.config();
}

export async function getBrowser(
  otherOptions?: Partial<AllPuppeteerLaunchOptions>
): Promise<puppeteer.Browser> {
  const options: AllPuppeteerLaunchOptions = {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: process.env.DEBUG !== 'interactive',
  };

  return puppeteer.launch(Object.assign(options, otherOptions));
}

export async function openApp(browser: puppeteer.Browser, url: string) {
  const page = await browser.newPage();

  await page.setViewport({ height: 768, width: 1200 });
  await page.goto(url);

  return page;
}

export async function screenshot(page: puppeteer.Page, path: string) {
  return ['screenshot', 'interactive'].includes(process.env.DEBUG || '')
    ? page.screenshot({ path, fullPage: true })
    : null;
}

export async function waitForNotLoading(
  page: puppeteer.Page,
  selector: string = '[data-test-id="loading-snackbar"]'
) {
  await page.waitForSelector(selector);
  await page.waitForSelector(selector, {
    hidden: true,
  });
  return page;
}
