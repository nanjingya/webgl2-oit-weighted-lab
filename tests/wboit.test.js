import test from 'node:test';
import assert from 'node:assert/strict';
import { accumulate, composite } from '../src/math/wboit.js';
import { premultiply, wboitWeight } from '../src/math/color.js';

test('accumulate then composite recovers opaque-ish color', () => {
  let acc = { sumColor: [0, 0, 0], sumAlpha: 0 };
  const a = 1;
  const rgb = [0.2, 0.4, 0.8];
  const premul = premultiply(rgb, a);
  const w = wboitWeight(0.3, a);
  acc = accumulate(acc, premul, w);
  const out = composite(acc.sumColor, acc.sumAlpha, [0, 0, 0]);
  assert.ok(Math.abs(out[0] - rgb[0]) < 1e-6);
  assert.ok(Math.abs(out[1] - rgb[1]) < 1e-6);
  assert.ok(Math.abs(out[2] - rgb[2]) < 1e-6);
});

test('composite stable when empty', () => {
  const out = composite([0, 0, 0], 0, [0.1, 0.2, 0.3]);
  assert.deepEqual(out, [0.1, 0.2, 0.3]);
});
