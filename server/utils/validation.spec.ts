import test from 'ava';

import * as validation from './validation';

test('assert does not throw for a condition that is true', (t) => {
  t.notThrows(() => validation.assert(1 === 1, 'test', 1));
});

test('assert throws for a condition that is false', (t) => {
  t.throws(() => validation.assert(false, 'test', false));
});

test('ValidationError has a property for arg name and value', (t) => {
  const err = new validation.ValidationError('test', 2);
  t.is(err.argumentName, 'test');
  t.is(err.value, 2);
});

test('ValidationError properties are read only', (t) => {
  const err = new validation.ValidationError('test', 2);
  const thrownErr = t.throws(() => ((err as any).argumentName = 'test'));
  t.assert(thrownErr instanceof TypeError);
});

test('validate runs arg validators and then calls the function', (t) => {
  const f = (a: number, b: number) => a / b;
  const result = validation.validate(
    f,
    [
      { argName: 'a', validator: ([a, b]) => a > b },
      { argName: 'b', validator: ([a, b]) => b !== 0 },
    ],
    15,
    5
  );
  t.is(result, 3);
});

test('validate throws an error if there are no validators passed in', (t) => {
  const f = (a: number, b: number) => a / b;
  t.throws(() => validation.validate(f, [], 15, 5));
});
