const wrapAround = (coord, size) => (coord >= 0 ? coord % size : coord + size);

const getNeighbors = ({ board, x, y }) => {
  const rowAbove = wrapAround(y + 1, board.length);
  const rowBelow = wrapAround(y - 1, board.length);
  const colRight = wrapAround(x + 1, board.length);
  const colLeft = wrapAround(x - 1, board.length);

  return [
    board[rowAbove][x], // top
    board[rowAbove][colRight], // top right
    board[y][colRight], // right
    board[rowBelow][colRight], // bottom right
    board[rowBelow][x], // bottom
    board[rowBelow][colLeft], // bottom left
    board[y][colLeft], // left
    board[rowAbove][colLeft], // top left
  ];
};

const getLiveNeighborCount = ({ board, x, y }) =>
  getNeighbors({ board, x, y }).filter(c => c).length;

export const bytesToBinary = bytes =>
  bytes
    .split('')
    .map(n => parseInt(n, 16).toString(2).padStart(4, 0))
    .join('');

// Turn key/bitString into two dimentional array
export const makeGameBoard = bitString => {
  const boardSize = Math.sqrt(bitString.length);
  return bitString.split('').reduce((accum, value, i) => {
    const tens = Math.floor(i / boardSize);
    const ones = i - tens * boardSize;
    const int = parseInt(value, 10);

    if (accum[tens]) {
      accum[tens][ones] = int;
    } else {
      accum[tens] = [int];
    }
    return accum;
  }, []);
};

export const calculateLife = ({ board, x, y }) => {
  const alive = board[y][x];
  const liveNeighborCount = getLiveNeighborCount({ board, x, y });

  // Any live cell with two or three live neighbours survives.
  if (alive) {
    if (liveNeighborCount === 2 || liveNeighborCount === 3) {
      return true;
    }
    // Any dead cell with three live neighbours becomes a live cell.
  } else if (liveNeighborCount === 3) {
    return true;
  }

  // All other live cells die in the next generation. Similarly, all other dead cells stay dead.
  return false;
};
