import React from 'react';

import { Cell } from './Cell';
import { useConway } from './ConwayHooks';
import { Row } from './Row';

import './ConwayBoard.css';

export const ConwayBoard = () => {
  const { board } = useConway();
  return (
    <div className="game-board">
      {board.map((row, y) => (
        <Row key={y}>
          {row.map((alive, x) => (
            <Cell alive={alive} key={`${x}${y}`} />
          ))}
        </Row>
      ))}
    </div>
  );
};
