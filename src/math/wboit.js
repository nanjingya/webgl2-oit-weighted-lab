export function accumulate(prev, colorPremul, weight) {
  const sumColor = [
    prev.sumColor[0] + colorPremul[0] * weight,
    prev.sumColor[1] + colorPremul[1] * weight,
    prev.sumColor[2] + colorPremul[2] * weight,
  ];
  const sumAlpha = prev.sumAlpha + weight;
  return { sumColor, sumAlpha };
}

export function composite(sumColor, sumAlpha, bg = [0, 0, 0]) {
  if (!sumAlpha || Math.abs(sumAlpha) < 1e-12) return [...bg];
  return [
    sumColor[0] / sumAlpha,
    sumColor[1] / sumAlpha,
    sumColor[2] / sumAlpha,
  ];
}
