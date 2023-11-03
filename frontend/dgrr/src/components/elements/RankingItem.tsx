export type itemType = 'MY' | 'ALL';

interface RankingItemProps {
  itemType: itemType;
  item?: {
    nickname: string,
    profileImage: string,
    rankingId: number,
    memberId: number,
    season: number,
    score: number,
  }, 
}

const RankingItem = ({itemType, item}: RankingItemProps) => {
  return (
    <div>
      {itemType === 'MY' ? (
        <div>
          <div className='flex justify-center items-center bg-main-blue rounded-l-lg text-lg font-semibold'></div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default RankingItem;