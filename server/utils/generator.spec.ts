import test from 'ava';

import {
  dedupe,
  generateArrayOfNumbers,
  generateSingleColumn,
  generateSingleColumnBoundsExclusive,
} from './generator';

import { ValidationError } from './validation';

test('dedupe removes duplicates from array', (t) => {
  const arr = [1, 2, 3, 4, 4, 4];
  t.deepEqual([1, 2, 3, 4], dedupe(arr));
});

test('dedupe leaves an array with unique items intact', (t) => {
  const arr = [1, 2, 3, 4, 5, 6];
  t.deepEqual([1, 2, 3, 4, 5, 6], dedupe(arr));
});

test('generateArrayOfNumbers generates within constraints', (t) => {
  const nums = generateArrayOfNumbers(10, 1, 15);
  t.is(nums.length, 10);
  nums.forEach((n) => {
    t.assert(n >= 1 && n <= 15, 'numbers are not within the specified range');
  });
});

test('generateArrayOfNumbers throws when there are too few unique numbers in range', (t) => {
  const error = t.throws<ValidationError<number>>(() =>
    generateArrayOfNumbers(10, 1, 5)
  );
  t.assert(error instanceof ValidationError);
  t.is(error.argumentName, 'length');
});

test('generateSingleColumn generates 5 unique numbers in range', (t) => {
  const col = generateSingleColumn(5, 10);
  t.is(col.length, 5);
  col.forEach((n) => {
    t.assert(n >= 5 && n <= 10, 'numbers are not within specified range');
  });
  t.deepEqual(dedupe(col), col);
});

test('generateSingleColumnBoundsExlusive generates 5 unique numbers in range', (t) => {
  const col = generateSingleColumnBoundsExclusive(4, 11);
  t.is(col.length, 5);
  col.forEach((n) => {
    t.assert(n > 4 && n < 11, 'numbers are not within specified range');
  });
  t.deepEqual(dedupe(col), col);
});
