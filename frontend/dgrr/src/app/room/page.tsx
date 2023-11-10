'use client';

import { publishMessage } from '@/components/Game/stomp';
import Header from '@/components/elements/Header';
import { useAppSelector } from '@/store/hooks';
import { roomStompConfig } from '@/types/room';
import { useEffect } from 'react';

const RoomPage = () => {
  const client = useAppSelector((state) => state.game.client);
  const roomcode = useAppSelector((state) => state.room.roomCode);
  const { DESTINATION_URI } = roomStompConfig;
  const { READY_SUB_URI, EXIT_SUB_URI, READY_SEND_URI, EXIT_SEND_URI, ROOM_START_URI } =
    DESTINATION_URI;
  const subscribeRoom = () => {
    client?.subscribe(READY_SUB_URI, (message) => {
      console.log('준비상황: ', message.body);
    });
    client?.subscribe(EXIT_SUB_URI, (message) => {
      console.log('나갔음: ', message.body);
    });
  };

  const startGame = () => {
    if (client) {
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
  }, [client]);
  return (
    <div>
      <Header headerType='WAITING' roomCode={roomcode} />
      방!!
      <button onClick={readyOnOff}>준비!!!!!</button>
      <button onClick={startGame}>게임 시작!!!</button>
    </div>
  );
};

export default RoomPage;
