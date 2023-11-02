'use client';

import { FuncButton } from '@/components/FuncButton';
import Rank from '@/components/elements/Rank';
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

  const clickOneMore = () => {
    console.log('One More Time')
  }

  useEffect(() => {
    setGameResult({
      myInfo: {
        nickname: 'player1',
        profileImage: '/images/nongdam.jpg',
        description: 'A dedicated gamer from Seoul.',
        rating: 1500,
        tier: 'Gold',
      },
      enemyInfo: {
        nickname: '가나다라마바사아자차카타',
        profileImage: '/images/sample_image2.png',
        description: 'An avid player from Busan.',
        rating: 1550,
        tier: 'Gold',
      },
      highlightImage: '/images/sample_image2.png', //비겼을 경우 null
      gameResult: 'LOSE',
      afterRating: 1600,
      afterTier: 'Gold',
    });
  }, []);
  
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
        <div className='mt-16'>
          <Rank pageType='GAMERESULT' rating={gameResult.afterRating} tier={gameResult.afterTier} />
        </div>
        <div>
          <div className='flex gap-2'>
            <img className='w-10 aspect-square rounded-full items-center' src={gameResult.enemyInfo.profileImage} alt='상대방 프로필 사진' />
            <div className='inline-block'>
              <div className='h-[16px]'>{gameResult.enemyInfo.nickname}</div>
              <div className='h-[16px]'>{gameResult.enemyInfo.description}</div>
            </div>
          </div>
        </div>
        <FuncButton clickEvent={clickOneMore} value='한 판 더?'></FuncButton>
        <FuncButton clickEvent={clickOneMore} value='한 판 더?'></FuncButton>
      </div>
    </div>
  );
};

export default Result;
