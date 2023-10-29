'use client';

import { it } from "node:test";

interface RecentRecordItemProps {
  item: {
    gameDetailId: number,
    gameRoomId: number,
    gameResult: string,
    gameType: string,
    gameTime: number,
    holdingTime: number,
    laughAmount: number,
    highlightImage: string,
    opponentNickname: string,
    opponentProfileImage: string,
    opponentDescription: string,
  },
}

const RecentRecordItem = ({item}: RecentRecordItemProps) => {
  return (
    <div className="flex h-[40px] mb-2">
      <div className="flex gap-x-2">
        {item.gameResult === 'WIN' ? (
          <div className="bg-[#5383E8] w-[24px] h-[24px] text-white text-center rounded-full font-semibold">승</div>
        ) : item.gameResult === 'DRAW' ? (
          <div className="bg-[#868E96] w-[24px] h-[24px] text-white text-center rounded-full font-semibold">무</div>
        ) : (
          <div className="bg-[#E83F57] w-[24px] h-[24px] text-white text-center rounded-full font-semibold">패</div>
        )}
        <img src={item.opponentProfileImage} alt='opponentProileImage' className="w-[24px] h-[24px] rounded-full inline-block" />
        <div className="text-sm flex items-center">{item.opponentNickname}</div>
      </div>
      <div className="flex">
        <div>dddddddd</div>
        <div className="text-xs items-center">gameDetailList에 날짜 필요</div>
      </div>
    </div>
  )
}

export default RecentRecordItem;