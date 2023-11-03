export type itemType = 'MY' | 'ALL';

interface RankingItemProps {
  itemType: itemType;
  memberRank?: {
    nickname: string,
    rankingId: number,
    memberId: number,
    season: number,
    score: number,
  };
  item: {
    nickname: string,
    profileImage: string,
    rankingId: number,
    memberId: number,
    season: number,
    score: number,
  }, 
}

const RankingItem = ({itemType}: RankingItemProps) => {
  return (
    <div className='h-[80px]'>
      {itemType === 'MY' ? (
        <div>{ }</div>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default RankingItem;