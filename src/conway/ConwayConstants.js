export const BOARD_SIZE = 64;

export const CELL_SIZE = 9;

export const DEFAULT_MS_PER_FRAME = 10;

const keyLength = BOARD_SIZE ** 2;

export const DUMMY_KEY = Array.from(Array(keyLength)).map(
  () => Math.random() > 0.5
);
