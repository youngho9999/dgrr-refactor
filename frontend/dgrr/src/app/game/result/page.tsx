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
  const clickGoToMain = () => {
    console.log('Go To Main')
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
        <div className='mt-9'>
          <Rank pageType='GAMERESULT' rating={gameResult.afterRating} tier={gameResult.afterTier} />
        </div>
        <div>
          <div className='flex items-center ms-1 mt-9 mb-7 gap-x-2'>
            <div>
              <img className='w-10 aspect-square rounded-full' src={gameResult.enemyInfo.profileImage} alt='상대방 프로필 사진' />
            </div>
            <div className='inline-block'>
              <div className='text-[15px] font-bold'>상대방 닉네임</div>
              <div className='text-sm'>{gameResult.enemyInfo.nickname}</div>
            </div>
          </div>
        </div>
        <div className='space-y-3'>
          <div className='flex justify-center'>
            <FuncButton clickEvent={clickOneMore} value='한 판 더?' />
          </div>
          <div className='flex justify-center'>
            <FuncButton clickEvent={clickGoToMain} value='메인으로' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
