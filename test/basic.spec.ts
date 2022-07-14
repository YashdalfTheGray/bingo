import test from 'ava';

import { withPageAt, setupEnvironment, getOneBingoCard } from './utils';

let cardId = '';

test.before(async () => {
  setupEnvironment();

  cardId = await getOneBingoCard(process.env.TEST_SERVER_URL!);
});

test(
  'something shows up on the page',
  withPageAt(process.env.TEST_SERVER_URL!),
  async (t, page) => {
    const header = await page.$('#app-root .bingo-header .title');

    t.truthy(header);
  }
);

test(
  'we see the generate view when there is no card query param',
  withPageAt(process.env.TEST_SERVER_URL!),
  async (t, page) => {
    const numberInput = await page.$('#app-root .generator #card-number-input');
    const generateButton = await page.$(
      '#app-root .generator #generate-button'
    );

    t.truthy(numberInput);
    t.truthy(generateButton);
  }
);
