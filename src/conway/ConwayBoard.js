import React from 'react';

import { useConway } from './ConwayHooks';
import { CELL_SIZE, BOARD_SIZE } from './ConwayConstants';

import './ConwayBoard.css';

const boardSizePx = CELL_SIZE * BOARD_SIZE;

export const ConwayBoard = () => {
  const { canvasRef } = useConway();
  return (
    <canvas
      className="game-board"
      height={boardSizePx}
      ref={canvasRef}
      width={boardSizePx}
    />
  );
};
