import test from 'ava';

import { withPage, setupEnvironment, getBaseAppUrl } from './utils';

test.before(() => {
  setupEnvironment();
});

test('the generator generates specified cards', withPage, async (t, page) => {
  await page.goto(getBaseAppUrl());

  await page.$('#app-root .bingo-header .title');

  await page.type('#app-root #card-number-input', '5');
  await page.click('#app-root #generate-button');

  await page.waitForSelector('#app-root .card-detail-row');
  const cardsGenerated = await page.$$('#app-root .card-detail-row');

  t.is(cardsGenerated.length, 5);
});
