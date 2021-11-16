import { useEffect, useState } from 'react';

import { DEFAULT_MS_PER_FRAME, DUMMY_KEY } from './ConwayConstants';
import { calculateLife, makeGameBoard } from './ConwayUtils';

export const useConway = () => {
  const [msPerFrame, setMsPerFrame] = useState(DEFAULT_MS_PER_FRAME);
  const [board, setBoard] = useState(makeGameBoard(DUMMY_KEY));

  useEffect(() => {
    const interval = setInterval(() => {
      setBoard(board =>
        board.map((row, y) => row.map((_, x) => calculateLife({ x, y }, board)))
      );
    }, msPerFrame);

    return () => clearInterval(interval);
  }, [msPerFrame, setBoard]);

  return { board, setMsPerFrame };
};
