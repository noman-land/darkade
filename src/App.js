import React, { useEffect, useState } from 'react';

import './App.css';

const BOARD_SIZE = 64;

const tickLengthMs = 200;

const wrapAround = coord => (coord >= 0 ? coord : coord + BOARD_SIZE);

const getNeighbors = ({ x, y }, board) => {
  const rowAboveIndex = wrapAround(y + 1);
  const rowBelowIndex = wrapAround(y - 1);
  const rowAbove =
    board[rowAboveIndex] === undefined ? [] : board[rowAboveIndex];
  const rowBelow =
    board[rowBelowIndex] === undefined ? [] : board[rowBelowIndex];
  const colRight = wrapAround(x + 1);
  const colLeft = wrapAround(x - 1);

  return [
    rowAbove[x], // top
    rowAbove[colRight], // top right
    board[y][colRight], // right
    rowBelow[colRight], // bottom right
    rowBelow[x], // bottom
    rowBelow[colLeft], // bottom left
    board[y][colLeft], // left
    rowAbove[colLeft], // top left
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

  // Any dead cell with three live neighbours becomes a live cell.
  // Any live cell with two or three live neighbours survives.
  // All other live cells die in the next generation. Similarly, all other dead cells stay dead.
  if (alive) {
    if (liveNeighborCount === 2 || liveNeighborCount === 3) {
      return true;
    }
  }

  if (liveNeighborCount === 3) {
    return true;
  }

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
