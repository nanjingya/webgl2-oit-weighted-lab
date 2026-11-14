import test from 'node:test';
import assert from 'node:assert/strict';
import { premultiply, wboitWeight } from '../src/math/color.js';

test('premultiply scales rgb by alpha', () => {
  assert.deepEqual(premultiply([1, 0.5, 0.2], 0.5), [0.5, 0.25, 0.1]);
});

test('wboitWeight increases with alpha and nearer z', () => {
  const near = wboitWeight(0.2, 0.8, { zPower: 3, aPower: 1 });
  const far = wboitWeight(0.9, 0.8, { zPower: 3, aPower: 1 });
  const lowA = wboitWeight(0.2, 0.2, { zPower: 3, aPower: 1 });
  assert.ok(near > far);
  assert.ok(near > lowA);
  assert.ok(near > 0 && far > 0);
});
