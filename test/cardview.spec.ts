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

test(
  'clicking all the containers marks all of them as crossed',
  withPage,
  async (t, page) => {
    const cardId = await getOneBingoCard(getBaseAppUrl());
    const cardUrl = getUrlForCard(cardId);

    await page.goto(cardUrl);

    const points = [...Array(5).keys()]
      .map((e) => e + 1)
      .flatMap((c) =>
        [...Array(5).keys()].map((r) => r + 1).map((r) => [r, c])
      );

    for (const [r, c] of points) {
      await page.click(
        `#app-root .content .card .number-container[data-row="${r}"][data-column="${c}"]:not(.is-header)`
      );
    }

    const numberCrosses = await page.$$(
      '#app-root .content .card .number-container:not(.is-header) .number-cross.visible'
    );

    t.is(numberCrosses.length, 25);
  }
);
