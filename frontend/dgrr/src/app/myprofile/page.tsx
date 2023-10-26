'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/elements/Header';

const MyProfile = () => {
  const [myInfo, setMyInfo] = useState({
    nickname: '',
    description: '',
    profileImage: '',
    rating: 0,
    rank: '',
  });

  useEffect(() => {
    setMyInfo({'nickname': '가나다라마바사아자차카타', 'description': '행복한 하루 보내길', 'profileImage': '/images/nongdam.jpg', 'rating': 1500, 'rank': 'Gold'})
  }, [])

  return (
    <div>
      <Header headerType='PROFILE' />
      <div className='h-[220px] flex justify-center items-center'>
        <div>
          <div className='flex justify-center'>
            <img src={myInfo.profileImage} alt='profileImage' className='w-[80px] aspect-square rounded-full' />
          </div>
          <div className='text-center mt-6 mb-3 text-lg font-semibold'>
            {myInfo.nickname}
          </div>
          <div className='text-center text-sm text-[#767676]'>
            {myInfo.description}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile;