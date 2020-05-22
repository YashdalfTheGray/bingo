const getRandomNumber = (min: number, max: number): number => {
  return Math.round(Math.random() * (max - min) + min);
};

const dedupe = <T>(arr: Array<T>): Array<T> => [...new Set(arr)];

const generateArrayOfNumbers = (
  length: number,
  min: number,
  max: number
): number[] => new Array(length).fill(0).map(() => getRandomNumber(min, max));

const generateSingleColumn = (start: number, end: number): number[] => {
  let generated = dedupe(generateArrayOfNumbers(5, start, end));

  while (generated.length != 5) {
    const extraNumbersToGenerate = 5 - generated.length;
    console.log(`Found ${extraNumbersToGenerate} duplicates in the the array`);
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
