import * as dotenv from 'dotenv';
import puppeteer from 'puppeteer';
import { ExecutionContext } from 'ava';

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

export async function withPage(
  t: ExecutionContext,
  run: (t: ExecutionContext, page: puppeteer.Page) => Promise<void>
) {
  const browser = await getBrowser();

  const { VIEWPORT_HEIGHT, VIEWPORT_WIDTH } = process.env;
  const height = parseInt(VIEWPORT_HEIGHT!, 10) || 768;
  const width = parseInt(VIEWPORT_WIDTH!, 10) || 1200;

  const page = await browser.newPage();
  await page.setViewport({ height, width });

  try {
    await run(t, page);
  } finally {
    await page.close();
    await browser.close();
  }
}

export function getBaseAppUrl() {
  if (!process.env.TEST_SERVER_URL) {
    throw new Error(
      [
        'TEST_SERVER_URL environment variable is not defined.',
        'Likely, getBaseAppUrl() was called before calling setupEnvironment()',
      ].join('\n')
    );
  }

  return process.env.TEST_SERVER_URL;
}

export function getUrlForCard(cardId: string) {
  return `${getBaseAppUrl()}/?card=${cardId}`;
}

export function getBingoCardPoints() {
  return [...Array(5).keys()]
    .map((e) => e + 1)
    .flatMap((c) => [...Array(5).keys()].map((r) => r + 1).map((r) => [r, c]));
}

export function getBingoHeaderPoints() {
  return [...Array(5).keys()].map((e) => e + 1).map((c) => [0, c]);
}
