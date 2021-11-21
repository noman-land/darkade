import { useCallback, useEffect, useState } from 'react';

import { CELL_SIZE, DEFAULT_MS_PER_FRAME, DUMMY_KEY } from './ConwayConstants';
import { calculateLife, makeGameBoard } from './ConwayUtils';

export const useConway = () => {
  const [context, setContext] = useState();
  const [msPerFrame, setMsPerFrame] = useState(DEFAULT_MS_PER_FRAME);
  const [board, setBoard] = useState(makeGameBoard(DUMMY_KEY));

  const canvasRef = useCallback(canvas => {
    if (!canvas.getContext) {
      return console.error('<canvas> not supported');
    }

    setContext(canvas.getContext('2d'));
  }, []);

  useEffect(() => {
    let interval;

    if (context) {
      interval = setInterval(() => {
        context.clearRect(0, 0, CELL_SIZE * 64, CELL_SIZE * 64);
        context.fillStyle = 'black';
        setBoard(board =>
          board.map((row, y) =>
            row.map((_, x) => {
              const alive = calculateLife({ x, y }, board);
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
    }
    return () => clearInterval(interval);
  }, [context, msPerFrame, setBoard]);

  return { board, canvasRef, setMsPerFrame };
};
