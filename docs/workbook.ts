import { writeChartFile, buildChart } from './utils';

(async () => {
  const minRange = 1;
  const maxRange = 10;

  const results: number[] = new Array<number>(maxRange + 1).fill(0);

  const getRandomNumber = (min: number, max: number): number => {
    return Math.round(Math.random() * (max - min) + min);
  };

  for (let i = 0; i < 100000; i++) {
    const num = getRandomNumber(minRange, maxRange);
    results[num] += 1;
  }

  const chart = buildChart(results);

  // tslint:disable no-console
  console.log(results);
  // tslint:enable no-console

  await writeChartFile('docs/output.html', chart);
})();
