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
    setMyInfo({'nickname': '안녕', 'description': '행복한 하루 보내길', 'profileImage': './public/images/nongdam.jpg', 'rating': 1500, 'rank': 'Gold'})
  }, [])

  return (
    <div>
      <Header headerType='PROFILE' />
      <img src='./public/images/nongdam.jpg' alt="" />
    </div>
  )
}

export default MyProfile;