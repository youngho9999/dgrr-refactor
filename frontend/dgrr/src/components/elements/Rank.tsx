import React, { useState } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import { IoHelpCircleOutline } from 'react-icons/io5';

interface RankProps {
  rank: string;
  rating: number;
}

const Rank = ({ rank, rating }: RankProps) => {
  const nowRating = rating - 1400;

  return (
    <div>
      <div className='flex items-center mt-6 mb-4 ms-6'>
        <div className='text-lg font-semibold me-1'>내 티어</div>
        <div className='inline-block'>
          <IoHelpCircleOutline fontSize={'18px'} />
        </div>
      </div>
      <div className='flex justify-center'>
        {rank === 'Gold' ? (
          <img src='/images/Gold.png' alt='Gold' className='w-[80px] aspect-square' />
        ) : rank === 'Sliver' ? (
          <img src='/images/Sliver.png' alt='Sliver' className='w-[80px] aspect-square' />
        ) : (
          <img src='/images/Bronze.png' alt='Bronze' className='w-[80px] aspect-square' />
        )}
      </div>
      <div className='flex justify-center mt-[19px]'>
        {rank === 'Gold' ? (
          <ProgressBar
            completed={nowRating}
            maxCompleted={400}
            customLabel={rating.toString()}
            bgColor='#FCC858'
            width='270px'
            height='25px'
          />
        ) : rank === 'Sliver' ? (
          <ProgressBar
            completed={nowRating}
            maxCompleted={400}
            customLabel={rating.toString()}
            bgColor='#B8B8B8'
            width='270px'
            height='25px'
          />
        ) : (
          <ProgressBar
            completed={nowRating}
            maxCompleted={400}
            customLabel={rating.toString()}
            bgColor='#C4872F'
            width='270px'
            height='25px'
          />
        )}
      </div>
    </div>
  );
};

export default Rank;
