import test from 'ava';

import { withPageAt, setupEnvironment, getOneBingoCard } from './utils';

let cardId = '';
let testServerUrl = '';

test.before(async () => {
  setupEnvironment();
  testServerUrl = process.env.TEST_SERVER_URL!;

  cardId = await getOneBingoCard(testServerUrl);
});

test(
  'something shows up on the page',
  withPageAt(testServerUrl),
  async (t, page) => {
    const header = await page.$('#app-root .bingo-header .title');

    t.truthy(header);
  }
);

test(
  'we see the generate view when there is no card query param',
  withPageAt(testServerUrl),
  async (t, page) => {
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
  withPageAt(`${testServerUrl}/?card=${cardId}`),
  async (t, page) => {
    const card = await page.$('#app-root .content .card');

    t.truthy(card);
  }
);
