import test from 'ava';

import * as validation from './validation';

test('assert does not throw for a condition that is true', (t) => {
  t.notThrows(() => validation.assert(1 === 1, 'test message'));
});

test('assert throws for a condition that is false', (t) => {
  t.throws(() => validation.assert(false, 'test message'));
});
