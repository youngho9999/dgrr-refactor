'use client';
import { publishMessage } from '@/components/Game/stomp';
import { useAppSelector } from '@/store/hooks';
import { saveRoomCode, saveRoomInfo } from '@/store/roomSlice';
import { roomStompConfig } from '@/types/room';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const RommLoadingPage = () => {
  const client = useAppSelector((state) => state.game.client);
  const backUrl = process.env.NEXT_PUBLIC_BACK_URL;
  const { DESTINATION_URI } = roomStompConfig;
  const { ENTER_SUB_URI, ENTER_SEND_URI } = DESTINATION_URI;
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (client) {
      axios
        .post(`${backUrl}/waiting-room`)
        .then((res) => {
          console.log(res.data);
          // 방만들기 요청해서 code 오면 대기방 입장 시작
          if (res.data) {
            const roomCode = res.data;
            dispatch(saveRoomCode(roomCode));
            client.subscribe(ENTER_SUB_URI, (message) => {
              console.log('방 정보: ', message.body);
              dispatch(saveRoomInfo(JSON.parse(message.body)));
              router.push('/room');
            });
            publishMessage(client, ENTER_SEND_URI, roomCode);
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
