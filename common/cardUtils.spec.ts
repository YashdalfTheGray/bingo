import test from 'ava';

import * as cardUtils from './cardUtils';

test('encodeOneColumn converts a single column', (t) => {
  t.is('614dc45', cardUtils.encodeOneColumn([1, 2, 3, 4, 5]));
});

test('encodeColumns encodes all the columns of numbers', (t) => {
  t.deepEqual(
    ['614dc45', '242f51ce'],
    cardUtils.encodeColumns([
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
    ])
  );
});
