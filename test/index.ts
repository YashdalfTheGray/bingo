import test from 'ava';

import { withPageAt } from './utils';

test(
  'we see something on the page',
  withPageAt('http://localhost:8080'),
  async (t, page) => {
    const header = await page.$('#app-root .bingo-header .title');

    t.truthy(header);
  }
);
