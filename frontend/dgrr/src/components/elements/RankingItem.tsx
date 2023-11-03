import RankingMedal from './RankingMedal';

export type itemType = 'MY' | 'ALL';

interface RankingItemProps {
  itemType: itemType;
  item: {
    memberId: 0,
    rating: 0,
    rank: 0,
    nickname: '',
    profileImage: '',
  }
}

const RankingItem = ({itemType, item}: RankingItemProps) => {
  return (
    <div>
      {itemType === 'MY' ? (
        <div>
          <div className='flex justify-center items-center bg-main-blue rounded-l-lg'>
            <RankingMedal ranking={item.rank} />
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default RankingItem;