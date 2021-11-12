import React, { useEffect, useState } from 'react';

import './App.css';

const BOARD_SIZE = 64;

const tickLengthMs = 50;

const wrapAround = coord =>
  coord >= 0 ? coord % BOARD_SIZE : coord + BOARD_SIZE;

const getNeighbors = ({ x, y }, board) => {
  const rowAbove = wrapAround(y + 1);
  const rowBelow = wrapAround(y - 1);
  const colRight = wrapAround(x + 1);
  const colLeft = wrapAround(x - 1);

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

const getLiveNeighborCount = ({ x, y }, board) =>
  getNeighbors({ x, y }, board).filter(c => c).length;

// Turn game map into two dimentional array
const cells = Array.from(Array(4096))
  .map(() => Boolean(Math.random() > 0.5))
  .reduce((accum, value, i) => {
    const tens = Math.floor(i / BOARD_SIZE);
    const ones = i - tens * BOARD_SIZE;
    if (accum[tens]) {
      accum[tens][ones] = value;
    } else {
      accum[tens] = [value];
    }
    return accum;
  }, []);

const calculateLife = ({ x, y }, board) => {
  const alive = board[y][x];
  const liveNeighborCount = getLiveNeighborCount({ x, y }, board);

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

const App = () => {
  const [board, setBoard] = useState(cells);

  useEffect(() => {
    const interval = setInterval(() => {
      setBoard(board =>
        board.map((row, y) => row.map((_, x) => calculateLife({ x, y }, board)))
      );
    }, tickLengthMs);

    return () => clearInterval(interval);
  }, [setBoard]);

  return (
    <div className="app">
      <div className="game-board">
        {board.map((row, y) => (
          <div className="row" key={y}>
            {row.map((alive, x) => (
              <span
                className={`cell ${alive ? 'on' : ''} cell-${x}-${y}`}
                key={`${x}${y}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
