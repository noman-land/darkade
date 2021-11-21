import React from 'react';

import { useConway } from './ConwayHooks';

import './ConwayBoard.css';

export const ConwayBoard = () => {
  const { canvasRef } = useConway();
  return (
    <canvas className="game-board" height={576} ref={canvasRef} width={576} />
  );
};
