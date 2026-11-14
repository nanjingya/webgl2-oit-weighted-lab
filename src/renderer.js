export function createRenderer(canvas) {
  return {
    resize() {},
    draw() { throw new Error('TODO renderer'); },
  };
}
