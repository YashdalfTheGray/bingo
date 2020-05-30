const getRandomNumber = (min: number, max: number): number => {
  return Math.round(Math.random() * (max - min) + min);
};

const dedupe = <T>(arr: T[]): T[] => [...new Set(arr)];

// TODO YashdalfTheGray 2020/05/30 - validate input
const generateArrayOfNumbers = (
  length: number,
  min: number,
  max: number
): number[] => new Array(length).fill(0).map(() => getRandomNumber(min, max));

// TODO YashdalfTheGray 2020/05/30 - validate input
const generateSingleColumn = (
  start: number,
  end: number,
  length = 5
): number[] => {
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
