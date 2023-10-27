'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/elements/Header';
import Rank from '@/components/elements/Rank';
import { IoChevronForwardOutline } from 'react-icons/io5';

const MyProfile = () => {
  const [myInfo, setMyInfo] = useState({
    member: {
      memberId: 0,
      nickname: '',
      profileImage: '',
      description: '',
    },
    ranking: {
      season: 0,
      score: 0,
      rank: '',
    },
    gameDetailList: [
      {
        gameDetailId: 1,
        gameRoomId: 123456,
        gameResult: '',
        gameType: '',
        gameTime: 30,
        holdingTime: 30,
        laughAmount: 415,
        highlightImage: '',
        opponentNickname: '',
        opponentProfileImage: '',
        opponentDescription: '',
      },
    ],
  });

  useEffect(() => {
    setMyInfo({
      member: {
        memberId: 1,
        nickname: '가나다라마바사아자차카타',
        profileImage: '/images/nongdam.jpg',
        description: '행복한 하루 보내길',
      },
      ranking: {
        season: 1,
        score: 1500,
        rank: 'BRONZE',
      },
      gameDetailList: [
        {
          gameDetailId: 1,
          gameRoomId: 123456,
          gameResult: 'WIN',
          gameType: 'RANDOM',
          gameTime: 30,
          holdingTime: 30,
          laughAmount: 415,
          highlightImage: 'highlight_image_sample',
          opponentNickname: 'opponent_nickname_sample',
          opponentProfileImage: 'opponent_profileimage',
          opponentDescription: 'opponent_description_sample',
        },
        {
          gameDetailId: 2,
          gameRoomId: 123456,
          gameResult: 'WIN',
          gameType: 'RANDOM',
          gameTime: 30,
          holdingTime: 30,
          laughAmount: 415,
          highlightImage: 'highlight_image_sample',
          opponentNickname: 'opponent_nickname_sample',
          opponentProfileImage: 'opponent_profileimage',
          opponentDescription: 'opponent_description_sample',
        },
        {
          gameDetailId: 3,
          gameRoomId: 123456,
          gameResult: 'WIN',
          gameType: 'RANDOM',
          gameTime: 30,
          holdingTime: 30,
          laughAmount: 415,
          highlightImage: 'highlight_image_sample',
          opponentNickname: 'opponent_nickname_sample',
          opponentProfileImage: 'opponent_profileimage',
          opponentDescription: 'opponent_description_sample',
        },
        {
          gameDetailId: 4,
          gameRoomId: 123456,
          gameResult: 'WIN',
          gameType: 'RANDOM',
          gameTime: 30,
          holdingTime: 30,
          laughAmount: 415,
          highlightImage: 'highlight_image_sample',
          opponentNickname: 'opponent_nickname_sample',
          opponentProfileImage: 'opponent_profileimage',
          opponentDescription: 'opponent_description_sample',
        },
      ],
    });
  }, []);

  return (
    <div>
      <Header headerType='PROFILE' />
      {/* 내 정보 */}
      <div className='h-[220px] flex justify-center items-center'>
        <div>
          <div className='flex justify-center'>
            {myInfo.member.profileImage !== '' ? (
              <img
                src={myInfo.member.profileImage}
                alt='profileImage'
                className='w-[80px] aspect-square rounded-full'
              />
            ) : (
              <img
                src='/images/default_profile_image.png'
                alt='profileImage'
                className='w-[80px] aspect-square rounded-full'
              />
            )}
          </div>
          <div className='text-center mt-6 mb-3 text-lg font-semibold'>
            {myInfo.member.nickname}
          </div>
          <div className='text-center text-sm text-[#767676]'>{myInfo.member.description}</div>
        </div>
      </div>
      {/* 내 티어 */}
      <Rank rank={myInfo.ranking.rank} rating={myInfo.ranking.score} />
      {/* 최근 전적 */}
      <div className='mt-16 mb-4 ms-6'>
        <div className='flex justify-between items-center'>
          <div className='text-lg font-semibold me-1'>최근 전적</div>
          <div className='flex items-center cursor-pointer'>
            <div className='font-bold text-sm me-1'>더 보기</div>
            <div className='inline-block'>
              <IoChevronForwardOutline />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
