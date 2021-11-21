export const DEFAULT_MS_PER_FRAME = 100;

const keyLength = 4096;

export const DUMMY_KEY = Array.from(Array(keyLength)).map(
  () => Math.random() > 0.5
);
