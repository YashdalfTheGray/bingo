import { validate, assert } from './validation';

const getRandomNumber = (min: number, max: number): number => {
  return Math.round(Math.random() * (max - min) + min);
};

const dedupe = <T>(arr: T[]): T[] => [...new Set(arr)];

const excludeBounds = (a: number[], start: number, end: number) =>
  a.filter((v) => v > start && v < end);

const generateArrayOfNumbers = (length: number, min: number, max: number) =>
  validate(
    (
      validatedLength: number,
      validatedMin: number,
      validatedMax: number
    ): number[] =>
      new Array(validatedLength)
        .fill(0)
        .map(() => getRandomNumber(validatedMin, validatedMax)),
    [
      { argName: 'min', validator: ([_, mn, mx]) => mn >= 0 && mn < mx },
      { argName: 'max', validator: ([_, mn, mx]) => mx >= 0 && mn < mx },
      { argName: 'length', validator: ([l, mn, mx]) => l > 0 && l <= mx - mn },
    ],
    length,
    min,
    max
  );

/**
 * Generates an array of (5 by default) numbers that include start and end
 * mathematically expressed, the range is `[start, end]`
 * @param start the start of the range, inclusive
 * @param end the end of the range, inclusive
 * @param length the length of the array to generate
 */
const generateSingleColumn = (
  start: number,
  end: number,
  length = 5
): number[] => {
  assert(end > start, 'end', end);
  assert(end - start >= length, 'length', length);
  assert(length > 0, 'length', length);

  let generated = dedupe(generateArrayOfNumbers(length, start, end));

  while (generated.length !== length) {
    const extraNumbersToGenerate = length - generated.length;
    generated = dedupe([
      ...generated,
      ...generateArrayOfNumbers(extraNumbersToGenerate, start, end),
    ]);
  }

  return generated;
};

/**
 * generates an array of (5 by default) numbers that exclude start and end
 * mathematically expressed, the range is `(start, end)`
 * @param start the start of the range, exclusive
 * @param end the end of the range, exlusive
 * @param length the length of the array to generate
 */
const generateSingleColumnBoundsExclusive = (
  start: number,
  end: number,
  length = 5
): number[] => {
  assert(end > start, 'end', end);
  assert(end - start - 2 >= length, 'length', length);
  assert(length > 0, 'length', length);

  let generated = dedupe(generateArrayOfNumbers(length, start, end));
  generated = excludeBounds(generated, start, end);

  while (generated.length !== length) {
    const extraNumbersToGenerate = length - generated.length;
    const newNumbers = excludeBounds(
      generateArrayOfNumbers(extraNumbersToGenerate, start, end),
      start,
      end
    );

    generated = dedupe([...generated, ...newNumbers]);
  }

  return generated;
};

export {
  getRandomNumber,
  dedupe,
  generateArrayOfNumbers,
  generateSingleColumn,
  generateSingleColumnBoundsExclusive,
};
