'use client';

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
    <div>
      gkgkgk
    </div>
  )
}

export default RecentRecordItem;