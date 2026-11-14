export function premultiply(rgb, a) {
  return [rgb[0] * a, rgb[1] * a, rgb[2] * a];
}

export function wboitWeight(z, a, opts = {}) {
  const zPower = opts.zPower ?? 3;
  const aPower = opts.aPower ?? 1;
  const zClamped = Math.min(Math.max(z, 1e-5), 1);
  // nearer (smaller z) => larger weight; higher alpha => larger weight
  const zTerm = Math.pow(1 - zClamped, zPower);
  const aTerm = Math.pow(Math.min(Math.max(a, 0), 1), aPower);
  return Math.max(zTerm * aTerm, 1e-6);
}
