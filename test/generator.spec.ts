import test from 'ava';

import { withPage, setupEnvironment, getBaseAppUrl } from './utils';

test.before(() => {
  setupEnvironment();
});

test('the generator generates specified cards', withPage, async (t, page) => {
  const numberToGenerate = 5;

  await page.goto(getBaseAppUrl());

  await page.$('#app-root .bingo-header .title');

  await page.type('#app-root #card-number-input', numberToGenerate.toString());
  await page.click('#app-root #generate-button');

  await page.waitForSelector('#app-root .card-detail-row');
  const cardsGenerated = await page.$$('#app-root .card-detail-row');

  t.is(cardsGenerated.length, numberToGenerate);
});

test('the card rows contain links', withPage, async (t, page) => {
  const numberToGenerate = 5;

  await page.goto(getBaseAppUrl());

  await page.$('#app-root .bingo-header .title');

  await page.type('#app-root #card-number-input', numberToGenerate.toString());
  await page.click('#app-root #generate-button');

  await page.waitForSelector('#app-root .card-detail-row');

  const cardLinks = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll('#app-root .card-detail-row .card-number a'),
      (a) => a.getAttribute('href')!
    )
  );

  t.truthy(cardLinks.every((v) => /\?card=/.test(v)));
});

test('the card rows contain share buttons', withPage, async (t, page) => {
  const numberToGenerate = 5;

  await page.goto(getBaseAppUrl());

  await page.$('#app-root .bingo-header .title');

  await page.type('#app-root #card-number-input', numberToGenerate.toString());
  await page.click('#app-root #generate-button');

  await page.waitForSelector('#app-root .card-detail-row');

  const cardActions = await page.$$(
    '#app-root .card-detail-row .card-actions button'
  );

  t.is(cardActions.length, numberToGenerate);
});

test(
  'a check appears on click of the share button',
  withPage,
  async (t, page) => {
    const numberToGenerate = 1;

    await page.goto(getBaseAppUrl());

    await page.$('#app-root .bingo-header .title');

    await page.type(
      '#app-root #card-number-input',
      numberToGenerate.toString()
    );
    await page.click('#app-root #generate-button');

    await page.waitForSelector('#app-root .card-detail-row');

    await page.click('#app-root .card-detail-row .card-actions .copy-button');

    const doneIcon = await page.$(
      '#app-root .card-detail-row .card-actions .done-icon.visible'
    );

    t.truthy(doneIcon);
  }
);
