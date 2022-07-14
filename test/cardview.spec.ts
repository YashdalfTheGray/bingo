import test from 'ava';

import { withPageAt, setupEnvironment, getOneBingoCard } from './utils';

let cardId = '';

test.before(async () => {
  setupEnvironment();

  console.log(process.env);

  cardId = await getOneBingoCard(process.env.TEST_SERVER_URL!);
});

test(
  'the right number of containers are generated',
  withPageAt(`${process.env.TEST_SERVER_URL}/?card=${cardId}`),
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
