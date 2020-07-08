const minRange = 0;
const maxRange = 11;

const results: number[] = new Array(maxRange + 1).fill(0);

const getRandomNumber = (min: number, max: number): number => {
  return Math.round(Math.random() * (max - min) + min);
};

for (let i = 0; i < 10000; i++) {
  const num = getRandomNumber(minRange, maxRange);
  results[num] += 1;
}

// tslint:disable-next-line no-console
console.log(results);
