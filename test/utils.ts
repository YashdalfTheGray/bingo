import * as dotenv from 'dotenv';
import puppeteer from 'puppeteer';
import fetch from 'node-fetch';

import { ICardResponse } from '@bingo/client/service';

let browserInstance: puppeteer.Browser | null = null;

export type AllPuppeteerLaunchOptions = puppeteer.LaunchOptions &
  puppeteer.BrowserLaunchArgumentOptions &
  puppeteer.BrowserConnectOptions;

export function setupEnvironment() {
  dotenv.config();
}

export async function getBrowser(
  otherOptions?: Partial<AllPuppeteerLaunchOptions>
): Promise<puppeteer.Browser> {
  if (browserInstance) {
    /* tslint:disable-next-line */
    console.log(
      `already have browser with version ${browserInstance.version}, returning`
    );
    return browserInstance;
  }

  const options: AllPuppeteerLaunchOptions = {
    ignoreHTTPSErrors: true,
    headless: process.env.DEBUG !== 'interactive',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu',
    ],
  };

  if (process.env.SLOWDOWN_IN_MS) {
    options.slowMo = parseInt(process.env.SLOWDOWN_IN_MS, 10);
  }

  browserInstance = await puppeteer.launch(
    Object.assign(options, otherOptions)
  );

  return browserInstance;
}

export async function openApp(browser: puppeteer.Browser, url: string) {
  const { VIEWPORT_HEIGHT, VIEWPORT_WIDTH } = process.env;
  const height = parseInt(VIEWPORT_HEIGHT!, 10) || 768;
  const width = parseInt(VIEWPORT_WIDTH!, 10) || 1200;

  const page = await browser.newPage();

  await page.setViewport({ height, width });
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

export async function getOneBingoCard(host: string) {
  const response = await fetch(`${host}/api/bingo/one`);
  const json = (await response.json()) as ICardResponse;
  return json.card;
}
