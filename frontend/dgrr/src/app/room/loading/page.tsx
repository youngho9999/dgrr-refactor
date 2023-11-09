'use client';
import { useAppSelector } from '@/store/hooks';
import axios from 'axios';
import { useEffect } from 'react';

const RommLoadingPage = () => {
  const client = useAppSelector((state) => state.game.client);
  const backUrl = process.env.NEXT_PUBLIC_BACK_URL;
  useEffect(() => {
    if (client) {
      axios
        .post(`${backUrl}/waiting-room`)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
          }
        })
        .catch((err) => {
          console.log('내용: ', err.message);
        });
    }
  }, [client]);

  return <div>방 만드는 중~~</div>;
};

export default RommLoadingPage;
