import * as fs from 'fs';
import { promisify } from 'util';

const writeFileAsync = promisify(fs.writeFile);

import * as jsdom from 'jsdom';

const chart = new jsdom.JSDOM('<!DOCTYPE html>');

const minRange = 1;
const maxRange = 10;

const results: number[] = new Array(maxRange + 1).fill(0);

const getRandomNumber = (min: number, max: number): number => {
  return Math.round(Math.random() * (max - min) + min);
};

for (let i = 0; i < 100000; i++) {
  const num = getRandomNumber(minRange, maxRange);
  results[num] += 1;
}

const resultsCode = chart.window.document.createElement('pre');
resultsCode.innerHTML = JSON.stringify(
  results.reduce(
    (acc, v, i) => ({
      ...acc,
      [i]: v,
    }),
    {}
  ),
  null,
  2
);
chart.window.document.body.appendChild(resultsCode);

// tslint:disable no-console
console.log(results);
// tslint:enable no-console

(async () => {
  try {
    writeFileAsync('docs/output.html', chart.serialize(), 'utf-8');
  } catch (err) {
    console.error(err); // tslint:disable-line no-console
  }
})();
