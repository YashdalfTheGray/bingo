# Javascript's RNG

I'll caveat this whole document with, "someone's probably already done this but I wanted to do it myself".

## The hypothesis

Javascript's RNG generates numbers on a flat probability curve. Meaning, if we are trying to generate 100 numbers in the range of 1 through 15 inclusive, the numbers will generate with an equal distribution.

## The experiment

Pretty simple experiment here. Generate 10,000 numbers between 1 and 100 and see what the probability curve looks like. As an addendum, generate 10,000 numbers between 1 and 10 and see what the probability curve looks like for smaller ranges. Another potential variable that we can look at is if the `worker_threads` module makes any difference.

### The generation code

```typescript
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
```

## The data

```typescript
console.log(results); // for range 1 through 10
// [ 0, 571, 1140, 1079, 1112, 1048, 1122, 1142, 1082, 1101, 603 ]
```

## The analysis

The initial results are relatively inconsistent in generation of 10,000 numbers across a range of 1 through 100. They are similarly inconsistent with a smaller range, 1 through 10.

### The bar chart generation code

```typescript
import * as fs from 'fs';
import { promisify } from 'util';

import * as jsdom from 'jsdom';

const writeFileAsync = promisify(fs.writeFile);

const doc = new jsdom.JSDOM('<!DOCTYPE html>');

const resultsCode = doc.window.document.createElement('pre');
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
doc.window.document.body.appendChild(resultsCode);

(async () => {
  try {
    writeFileAsync('docs/output.html', doc.serialize(), 'utf-8');
  } catch (err) {
    console.error(err); // tslint:disable-line no-console
  }
})();
```
