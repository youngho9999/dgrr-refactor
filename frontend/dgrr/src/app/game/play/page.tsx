'use client';
import { useEffect } from 'react';
import { GameProvider } from './context';

const PlayPage = () => {
  return (
    <GameProvider>
      <div>스톰프야 일해줘</div>
    </GameProvider>
  );
};

export default PlayPage;
