import test from 'ava';

import {
  withPage,
  setupEnvironment,
  getOneBingoCard,
  getBaseAppUrl,
  getUrlForCard,
} from './utils';

test.before(() => {
  setupEnvironment();
});

test('something shows up on the page', withPage, async (t, page) => {
  await page.goto(getBaseAppUrl());

  const header = await page.$('#app-root .bingo-header .title');

  t.truthy(header);
});

test(
  'we see the generate view when there is no card query param',
  withPage,
  async (t, page) => {
    await page.goto(getBaseAppUrl());

    const numberInput = await page.$('#app-root .generator #card-number-input');
    const generateButton = await page.$(
      '#app-root .generator #generate-button'
    );

    t.truthy(numberInput);
    t.truthy(generateButton);
  }
);

test(
  'we see a bingo card when a card url param is given',
  withPage,
  async (t, page) => {
    const cardId = await getOneBingoCard(getBaseAppUrl());
    const cardUrl = getUrlForCard(cardId);

    await page.goto(cardUrl);

    const card = await page.$('#app-root .content .card');

    t.truthy(card);
  }
);
