export const CELL_SIZE = 9;

export const DEFAULT_MS_PER_FRAME = 1;

const keyLength = 4096;

export const DUMMY_KEY = Array.from(Array(keyLength)).map(
  () => Math.random() > 0.5
);
