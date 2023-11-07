'use client';

import { IoImageOutline } from 'react-icons/io5';
import useTimeStamp from '@/hooks/useTimeStamp';

interface RecentRecordItemProps {
  item: {
    gameHistoryId: number;
    gameRoomId: number;
    gameResult: string;
    gameType: string;
    gameTime: number;
    holdingTime: number;
    ratingChange: number;
    highlightImage: string;
    createdAt: string;
    opponentNickname: string;
    opponentProfileImage: string;
    opponentDescription: string;
  };
}

const RecentRecordItem = ({ item }: RecentRecordItemProps) => {
  const textColor =
    item.ratingChange > 0
      ? 'text-[#E83F57]'
      : item.ratingChange < 0
      ? 'text-[#5383E8]'
      : 'text-black';
  const getOrLose = item.ratingChange >= 0 ? '획득' : '상실';

  return (
    <div>
      <div className='flex h-[50px] mb-1 justify-between'>
        <div className='gap-x-[12px] flex items-center ms-2'>
          {item.gameResult === 'WIN' ? (
            <div className='bg-[#5383E8] w-[24px] h-[24px] text-white text-center rounded-full font-semibold'>
              승
            </div>
          ) : item.gameResult === 'DRAW' ? (
            <div className='bg-[#868E96] w-[24px] h-[24px] text-white text-center rounded-full font-semibold'>
              무
            </div>
          ) : (
            <div className='bg-[#E83F57] w-[24px] h-[24px] text-white text-center rounded-full font-semibold'>
              패
            </div>
          )}
          <img
            src={item.opponentProfileImage}
            alt='opponentProileImage'
            className='w-[24px] h-[24px] rounded-full inline-block'
          />
          <div className='text-sm ms-1 inline-block'>
            <div className='font-semibold'>{item.opponentNickname}</div>
            <div className={`text-xs ${textColor}`}>
              나의 {getOrLose} 점수 : {item.ratingChange}
            </div>
          </div>
        </div>
        <div className='flex items-center me-2'>
          {item.gameResult !== 'DRAW' ? (
            <div>
              <IoImageOutline fontSize={'24px'} />
            </div>
          ) : null}
          <div className='text-sm inline-block w-[69px] text-right'>
            {useTimeStamp(item.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentRecordItem;
