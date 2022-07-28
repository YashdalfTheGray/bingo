import test from 'ava';

import {
  withPage,
  setupEnvironment,
  getOneBingoCard,
  getBaseAppUrl,
  getUrlForCard,
} from './utils';

test.before(async () => {
  setupEnvironment();
});

test(
  'the right number of containers are generated',
  withPage,
  async (t, page) => {
    const cardId = await getOneBingoCard(getBaseAppUrl());
    const cardUrl = getUrlForCard(cardId);

    await page.goto(cardUrl);

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

test(
  'clicking on a number container marks it crossed',
  withPage,
  async (t, page) => {
    const cardId = await getOneBingoCard(getBaseAppUrl());
    const cardUrl = getUrlForCard(cardId);

    await page.goto(cardUrl);

    await page.click(
      '#app-root .content .card .number-container:not(.is-header)'
    );

    const numberCrosses = await page.$$(
      '#app-root .content .card .number-container:not(.is-header) .number-cross.visible'
    );

    t.is(numberCrosses.length, 1);
  }
);

// test(
//   'clicking on a number container marks it crossed',
//   withPage,
//   async (t, page) => {
//     const cardId = await getOneBingoCard(getBaseAppUrl());
//     const cardUrl = getUrlForCard(cardId);

//     await page.goto(cardUrl);

//     const numberContainers = await page.$$(
//       '#app-root .content .card .number-container:not(.is-header)'
//     );

//     await Promise.all(numberContainers.map((c) => c.click()));

//     const numberCrosses = await page.$$(
//       '#app-root .content .card .number-container:not(.is-header) .number-cross.visible'
//     );

//     t.is(numberCrosses.length, 25);
//   }
// );
