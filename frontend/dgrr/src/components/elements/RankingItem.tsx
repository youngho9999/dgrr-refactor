import RankingMedal from './RankingMedal';

export type itemType = 'MY' | 'ALL';

interface RankingItemProps {
  itemType: itemType;
  item: {
    memberId: number;
    rating: number;
    rank: number;
    nickname: string;
    profileImage: string;
  };
}

const RankingItem = ({ itemType, item }: RankingItemProps) => {
  return (
    <div className="h-[80px] w-11/12 flex">
      {itemType === 'MY' || item.rank > 3 ? (
        <div className="w-1/5 h-full flex justify-center items-center bg-main-blue rounded-l-lg">
          <RankingMedal ranking={item.rank} />
        </div>
      ) : (
        <div>
          <div className="w-1/5 h-full flex justify-center items-center bg-[#EAEEFF] rounded-l-lg">
            <RankingMedal ranking={item.rank} />
          </div>
        </div>
      )}
      <div className="w-4/5 flex items-center bg-white rounded-r-lg">
        <img className='w-[60px] aspect-square rounded-full mx-3' src={item.profileImage} alt="프로필 사진" />
        <div className="inline-block">
          <div className='mb-1 font-semibold'>{item.nickname}</div>
          <div className='flex gap-x-2'>
            <div className='flex w-[24px] aspect-square'>
              {item.rating >= 1800 ? (
                <img src="/images/Gold.png" alt="티어_골드" />
              ) : item.rating >= 1600 ? (
                <img src="/images/Sliver.png" alt="티어_실버" />
              ) : (
                <img src="/images/Bronze.png" alt="티어_브론즈" />
              )}
            </div>
            <div className='flex items-center text-sm'>
              {item.rating}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingItem;
