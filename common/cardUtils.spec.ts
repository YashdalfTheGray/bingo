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

test('decodeOneColumn converts a single string into a column', (t) => {
  t.deepEqual([1, 2, 3, 4, 5], cardUtils.decodeOneColumn('614dc45'));
});

test('decodeColumns converts strings back to columns', (t) => {
  t.deepEqual(
    [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
    ],
    cardUtils.decodeColumns(['614dc45', '242f51ce'])
  );
});

test('hashColumns returns a short hash for all colums', (t) => {
  t.is(
    cardUtils.hashColumns([
      [1, 2, 3],
      [4, 5, 6],
    ]),
    '9d7b7fbd'
  );
});
