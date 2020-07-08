# Javascript's RNG

I'll caveat this whole document with, "someone's probably already done this but I wanted to do it myself".

## The hypothesis

Javascript's RNG generates numbers on a flat probability curve. Meaning, if we are trying to generate 100 numbers in the range of 1 through 15 inclusive, the numbers will generate with an equal distribution.

## The experiment

Pretty simple experiment here. Generate 10,000 numbers between 1 and 100 and see what the probability curve looks like. As an addendum, generate 10,000 numbers between 1 and 10 and see what the probability curve looks like for smaller ranges. Another potential variable that we can look at is if the `worker_threads` module makes any difference.

### The generation code

```typescript
const results = [];

const getRandomNumber = (min: number, max: number): number => {
  return Math.round(Math.random() * (max - min) + min);
};

for (let i = 0; i < 10000; i++) {
  const number = getRandomNumber(0, 100);
  results[number] = results[number] ? results[number]++ : 1;
}
```
