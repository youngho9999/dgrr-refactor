'use client';

import { FuncButton } from '@/components/FuncButton';
import { publishMessage } from '@/components/Game/stomp';
import Header from '@/components/elements/Header';
import { saveGameInfo } from '@/store/gameSlice';
import { useAppSelector } from '@/store/hooks';
import { setReady } from '@/store/roomSlice';
import { stompConfig } from '@/types/game';
import { roomStompConfig } from '@/types/room';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const RoomPage = () => {
  const client = useAppSelector((state) => state.game.client);
  const roomcode = useAppSelector((state) => state.room.roomCode);
  const owner = useAppSelector((state) => state.room.roomInfo[0].waitingMember.waitingMemberId);
  const [memberId, setMemberId] = useState('');
  const readyState = useAppSelector((state) => state.room.roomReady);
  const { ROOM_DESTINATION_URI } = roomStompConfig;
  const { READY_SUB_URI, EXIT_SUB_URI, READY_SEND_URI, ROOM_START_URI } = ROOM_DESTINATION_URI;
  const dispatch = useDispatch();
  const router = useRouter();
  const { DESTINATION_URI } = stompConfig;
  const { GAME_URI } = DESTINATION_URI;

  const subscribeRoom = () => {
    client?.subscribe(READY_SUB_URI, (message) => {
      const content = JSON.parse(message.body);
      console.log('준비상황: ', content);
      dispatch(setReady(content.waitingMember.ready));
    });
    client?.subscribe(EXIT_SUB_URI, (message) => {
      console.log('나갔음: ', message.body);
    });
    client?.subscribe(GAME_URI, (message) => {
      console.log('게임정보 받는 메세지: ', message.body);
      // 게임 정보 저장
      dispatch(saveGameInfo(JSON.parse(message.body)));
      // 게임 정보가 왔다면 매칭 페이지로 이동
      router.push('/game/match');
    });
  };

  const startGame = () => {
    if (client && readyState) {
      publishMessage(client, ROOM_START_URI, '');
    }
  };

  const readyOnOff = () => {
    if (client) {
      publishMessage(client, READY_SEND_URI, '');
    }
  };
  useEffect(() => {
    if (client) {
      subscribeRoom();
    }
    const memberId = localStorage.getItem('memberId');
    if (memberId) {
      setMemberId(memberId);
    }
  }, [client, memberId]);

  return (
    <div className='w-screen h-screen max-w-[500px] min-h-[565px] bg-black'>
      <Header headerType='WAITING' roomCode={roomcode} />
      {owner !== memberId ? (
        <FuncButton value='준비하기' small={true} clickEvent={readyOnOff} />
      ) : readyState ? (
        <FuncButton value='시작하기' small={true} clickEvent={startGame} />
      ) : (
        <button
          disabled
          className={`rounded-lg border-2 max-w-xs py-5 hover:brightness-110 w-20 cursor-hover bg-slate-300`}
        >
          <p className={`text-zinc-800 text-center text-base font-bold uppercase leading-none`}>
            시작하기
          </p>
        </button>
      )}
    </div>
  );
};

export default RoomPage;
