const getRandomNumber = (min: number, max: number): number => {
  return Math.round(Math.random() * (max - min) + min);
};

const dedupe = <T>(arr: Array<T>): Array<T> => [...new Set(arr)];

const generateArrayOfNumbers = (
  length: number,
  min: number,
  max: number
): number[] => new Array(length).fill(0).map(() => getRandomNumber(min, max));

export { getRandomNumber, dedupe, generateArrayOfNumbers };
