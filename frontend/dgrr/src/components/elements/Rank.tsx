'use client';

import Swal from 'sweetalert2';
import React, { useState, useEffect } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import { IoHelpCircleOutline } from 'react-icons/io5';
import ModalWithX from './ModalWithX';

type pageType = 'GAMERESULT' | 'PROFILE';

interface RankProps {
  pageType: pageType;
  tier: string;
  rating: number;
}

const Rank = ({ pageType, tier, rating }: RankProps) => {
  const [nowRating, setNowRating] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tierList = [{image: '/images/Gold.png', title: '골드 Gold', explain: '1800 ~'}, {image: '/images/Sliver.png', title: '실버 Sliver', explain: '1600 ~'}, {image: '/images/Bronze.png', title: '브론즈 Bronze', explain: '1400 ~'}]

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setNowRating(rating - 1400);
  }, [rating]);

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
      position: 'center',
      width: 350,
      showConfirmButton: false,
      allowOutsideClick: true,
      showCloseButton: true,
      customClass: {
        closeButton: 'custom-close-button', // 사용자 정의 클래스를 closeButton에 지정
      },
    });

    Toast.fire({
      html: `
      <div>
        <div class="tier-item" style="margin-top: 22px">
          <img class="tier-image" src="/images/Gold.png" />
          <div class="tier-text">
            <div class="tier-title">골드 Gold</div>
            <div style="font-size: 12px">1800 ~</div>
          </div>
        </div>
        <div class="tier-item" style="margin: 11px 0px">
          <img class="tier-image" src="/images/Sliver.png" />
          <div class="tier-text">
            <div class="tier-title">실버 Sliver</div>
            <div style="font-size: 12px">1600 ~</div>
          </div>
        </div>
        <div class="tier-item">
          <img class="tier-image" src="/images/Bronze.png" />
          <div class="tier-text">
            <div class="tier-title">브론즈 Bronze</div>
            <div style="font-size: 12px">1400 ~</div>
          </div>
        </div>
      </div>
    `,
    });
  };

  return (
    <div>
      {pageType === 'PROFILE' ? (
        <div className="h-[220px] py-6 my-2">
          <div className="flex items-center pb-4">
            <div className="text-lg font-semibold ps-6 me-1">내 티어</div>
            <div className="inline-block cursor-pointer hover:text-main-blue" onMouseEnter={handleModalOpen} onMouseLeave={handleModalClose}>
              <IoHelpCircleOutline fontSize={'18px'} />
            </div>
            {isModalOpen && (
              <div className='fixed top-0 left-0 w-screen h-screen flex items-center justify-center'>
              <div className='bg-white p-4 rounded-lg'>
                  {tierList.map((tier, index) => [
                    <div className='bg-[#e7e0ec] py-[8px] px-[15px] rounded-md flex items-center' key={index}>
                      <img src={tier.image} className='w-[38px] aspect-square ms-3' />
                      <div className='flex'>
                        <div className='text-sm font-semibold'>{tier.title}</div>
                        <div className='text-xs'>{tier.explain}</div>

                      </div>
                  </div>

                  ])}
              </div>
            </div>
            )}
          </div>
          <div className="flex justify-center">
            {tier === 'Gold' ? (
              <img src="/images/Gold.png" alt="Gold" className="w-[80px] aspect-square" />
            ) : tier === 'Sliver' ? (
              <img src="/images/Sliver.png" alt="Sliver" className="w-[80px] aspect-square" />
            ) : (
              <img src="/images/Bronze.png" alt="Bronze" className="w-[80px] aspect-square" />
            )}
          </div>
          <div className="flex justify-center mt-[19px]">
            {tier === 'Gold' ? (
              <ProgressBar
                {...progressBarProps} // 기본 매개변수를 전달
                bgColor="#FCC858"
              />
            ) : tier === 'Sliver' ? (
              <ProgressBar
                {...progressBarProps} // 기본 매개변수를 전달
                bgColor="#B8B8B8"
              />
            ) : (
              <ProgressBar
                {...progressBarProps} // 기본 매개변수를 전달
                bgColor="#C4872F"
              />
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-center">
            {tier === 'Gold' ? (
              <img src="/images/Gold.png" alt="Gold" className="w-[90px] aspect-square" />
            ) : tier === 'Sliver' ? (
              <img src="/images/Sliver.png" alt="Sliver" className="w-[90px] aspect-square" />
            ) : (
              <img src="/images/Bronze.png" alt="Bronze" className="w-[90px] aspect-square" />
            )}
          </div>
          <div className="flex justify-center mt-[25px]">
            {tier === 'Gold' ? (
              <ProgressBar
                {...progressBarProps} // 기본 매개변수를 전달
                bgColor="#FCC858"
              />
            ) : tier === 'Sliver' ? (
              <ProgressBar
                {...progressBarProps} // 기본 매개변수를 전달
                bgColor="#B8B8B8"
              />
            ) : (
              <ProgressBar
                {...progressBarProps} // 기본 매개변수를 전달
                bgColor="#C4872F"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Rank;

// ProgressBar 컴포넌트를 사용할 때 나타나는 경고를 숨김
console.error = () => {};
