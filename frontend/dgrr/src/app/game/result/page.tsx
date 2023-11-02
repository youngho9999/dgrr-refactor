'use client';

import Rank from '@/components/elements/Rank';
import ProgressBar from '@ramonak/react-progress-bar';
import { useEffect, useState } from 'react';

const Result = () => {
  const [gameResult, setGameResult] = useState({
    myInfo: {
      nickname: '',
      profileImage: '',
      description: '',
      rating: 0,
      tier: '',
    },
    enemyInfo: {
      nickname: '',
      profileImage: '',
      description: '',
      rating: 0,
      tier: '',
    },
    highlightImage: '', //비겼을 경우 null
    gameResult: '',
    afterRating: 0,
    afterTier: '',
  });

  useEffect(() => {
    setGameResult({
      myInfo: {
        nickname: 'player1',
        profileImage: 'https://example.com/images/player1.jpg',
        description: 'A dedicated gamer from Seoul.',
        rating: 1500,
        tier: 'Gold',
      },
      enemyInfo: {
        nickname: 'player2',
        profileImage: 'https://example.com/images/player2.jpg',
        description: 'An avid player from Busan.',
        rating: 1550,
        tier: 'Gold',
      },
      highlightImage: 'https://example.com/images/player2.jpg', //비겼을 경우 null
      gameResult: 'LOSE',
      afterRating: 1600,
      afterTier: 'Gold',
    });
  }, []);

  const progressBarProps = {
    completed: gameResult.afterRating - 1400,
    maxCompleted: 400,
    customLabel: gameResult.afterRating.toString(),
    width: '270px',
    height: '25px',
  };
  
  return (
    <div className="flex justify-center items-center bg-main-blue w-screen h-screen max-w-[360px]">
      <div className="bg-white w-11/12 h-[522px] rounded-[12px] p-5">
        <div className='text-[40px] font-bold text-center'>
          {gameResult.gameResult === 'WIN' ? (
            <div>WIN</div>
          ) : (
            <div>LOSE</div>
          )}
        </div>
        <div>
          <Rank pageType='GAMERESULT' rating={gameResult.afterRating} tier={gameResult.afterTier} />
        </div>
      </div>
    </div>
  );
};

export default Result;
