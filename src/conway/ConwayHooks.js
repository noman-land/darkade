import { useCallback, useEffect, useState } from 'react';
import { Darkade } from '../darkade/Darkade';

import { BOARD_SIZE, CELL_SIZE, DEFAULT_MS_PER_FRAME } from './ConwayConstants';
import { bytesToBinary, calculateLife, makeGameBoard } from './ConwayUtils';

const darkade = new Darkade('0xDarkadeAddress');

export const useConway = () => {
  const [context, setContext] = useState();
  const [msPerFrame, setMsPerFrame] = useState(DEFAULT_MS_PER_FRAME);
  const [board, setBoard] = useState();

  const canvasRef = useCallback(canvas => {
    if (!canvas.getContext) {
      return console.error('<canvas> not supported');
    }

    setContext(canvas.getContext('2d'));
  }, []);

  useEffect(() => {
    darkade
      .getSeed()
      .then(seed => setBoard(makeGameBoard(bytesToBinary(seed.slice(2)))));
  }, []);

  useEffect(() => {
    if (!context || !board) {
      return;
    }

    const interval = setInterval(() => {
      context.clearRect(0, 0, CELL_SIZE * BOARD_SIZE, CELL_SIZE * BOARD_SIZE);
      context.fillStyle = 'black';
      setBoard(board =>
        board.map((row, y) =>
          row.map((_, x) => {
            const alive = calculateLife({ board, x, y });
            if (alive) {
              context.fillRect(
                x * CELL_SIZE,
                y * CELL_SIZE,
                CELL_SIZE,
                CELL_SIZE
              );
            }
            return alive;
          })
        )
      );
    }, msPerFrame);

    return () => clearInterval(interval);
  }, [board, context, msPerFrame, setBoard]);

  return { canvasRef, setMsPerFrame };
};
