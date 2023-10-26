'use client';

import Swal from "sweetalert2";
import React, { useState, useEffect } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import { IoHelpCircleOutline } from 'react-icons/io5';

interface RankProps {
  rank: string;
  rating: number;
}

const Rank = ({ rank, rating }: RankProps) => {
  const [nowRating, setNowRating] = useState(0)

  useEffect(() => {
    setNowRating(rating - 1400)
  }, [rating])

  // ProgressBar 컴포넌트에 대한 기본 매개변수 설정
  const progressBarProps = {
    completed: nowRating,
    maxCompleted: 400,
    customLabel: rating.toString(),
    width: '270px',
    height: '25px',
  };

  const showHelp = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      allowOutsideClick: true,
    });

    Toast.fire({
      html: '<div style="color: red; font-size: 18px;">안녕</div>'
    });
  };

  return (
    <div>
      <div className='flex items-center mt-6 mb-4 ms-6'>
        <div className='text-lg font-semibold me-1'>내 티어</div>
        <div className='inline-block cursor-pointer' onClick={showHelp}>
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
           {...progressBarProps} // 기본 매개변수를 전달
            bgColor='#FCC858'
          />
        ) : rank === 'Sliver' ? (
          <ProgressBar
            {...progressBarProps} // 기본 매개변수를 전달
            bgColor='#B8B8B8'
          />
        ) : (
          <ProgressBar
           {...progressBarProps} // 기본 매개변수를 전달
            bgColor='#C4872F'
          />
        )}
      </div>
    </div>
  );
};

export default Rank;

// ProgressBar 컴포넌트를 사용할 때 나타나는 경고를 숨김
console.error = () => {};