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
