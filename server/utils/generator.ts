import { validate, assert } from './validation';

const getRandomNumber = (min: number, max: number): number => {
  return Math.round(Math.random() * (max - min) + min);
};

const dedupe = <T>(arr: T[]): T[] => [...new Set(arr)];

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
      { argName: 'length', validator: ([l, mn, mx]) => l > 0 && l <= mx - mn },
      { argName: 'min', validator: ([_, mn, mx]) => mn >= 0 && mn < mx },
      { argName: 'max', validator: ([_, mn, mx]) => max >= 0 && mn < mx },
    ],
    length,
    min,
    max
  );

const generateSingleColumn = (
  start: number,
  end: number,
  length = 5
): number[] => {
  assert(end > start, 'End of the range has to be after the start');
  assert(end - start >= length, 'Not enough unique numbers in range');
  assert(length > 0, 'Have to request more than 0 numbers');

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

export {
  getRandomNumber,
  dedupe,
  generateArrayOfNumbers,
  generateSingleColumn,
};
