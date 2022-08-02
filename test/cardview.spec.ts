import test from 'ava';

import {
  withPage,
  setupEnvironment,
  getOneBingoCard,
  getBaseAppUrl,
  getUrlForCard,
  getBingoCardPoints,
  getBingoHeaderPoints,
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

    const points = getBingoCardPoints();

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

test('clicking on the bingo header does nothing', withPage, async (t, page) => {
  const cardId = await getOneBingoCard(getBaseAppUrl());
  const cardUrl = getUrlForCard(cardId);

  await page.goto(cardUrl);

  const points = getBingoHeaderPoints();

  for (const [r, c] of points) {
    await page.click(
      `#app-root .content .card .number-container.is-header[data-row="${r}"][data-column="${c}"]`
    );
  }

  const numberCrosses = await page.$$(
    '#app-root .content .card .number-container:not(.is-header) .number-cross.visible'
  );

  t.is(numberCrosses.length, 0);
});

test('an error is shown if the link is bad', withPage, async (t, page) => {
  const cardId = await getOneBingoCard(getBaseAppUrl());
  // intentionally add something to the link
  const cardUrl = `${getUrlForCard(cardId)}f`;

  await page.goto(cardUrl);
  await page.waitForSelector('#app-root .bingo-header .title');

  const content = await page.$('#app-root .content .card.invalid-card');
  const message = await content!.evaluate((e) => e.textContent);

  t.not(message!.length, 0);
  t.true(/invalid/i.test(message!));
});
