import test from 'ava';

import { withPageAt } from './utils';

test(
  'something shows up on the page',
  withPageAt('http://localhost:8080'),
  async (t, page) => {
    const header = await page.$('#app-root .bingo-header .title');

    t.truthy(header);
  }
);

test(
  'we see the generate view when there is no card query param',
  withPageAt('http://localhost:8080'),
  async (t, page) => {
    const numberInput = await page.$('#app-root .generator #card-number-input');
    const generateButton = await page.$(
      '#app-root .generator #generate-button'
    );

    t.truthy(numberInput);
    t.truthy(generateButton);
  }
);
