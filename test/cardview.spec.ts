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
  'the right number of containers are generated',
  withPageAt(`${testServerUrl}/?card=${cardId}`),
  async (t, page) => {
    const allContainers = await page.$$(
      '#app-root .content .card .number-container'
    );
    const headers = await page.$$(
      '#app-root .content .card .number-container.is-header'
    );

    t.is(allContainers.length, 30);
    t.is(allContainers.length - headers.length, 25);
  }
);
