'use client';

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
      gameResult: 'WIN',
      afterRating: 1600,
      afterTier: 'Gold',
    });
  }, []);

  return (
    <div className="flex justify-center items-center bg-main-blue w-screen h-screen max-w-[360px]">
      <div className="bg-white w-11/12 h-[522px] rounded-[12px]"></div>
    </div>
  );
};

export default Result;
