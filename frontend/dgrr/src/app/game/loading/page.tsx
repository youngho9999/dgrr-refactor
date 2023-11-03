'use client';
import character from '@/../../public/images/logo_character.png';
import Image from 'next/image';
import { FuncButton } from '@/components/FuncButton';
import { useEffect, useState } from 'react';
import { ExplainModal } from '@/components/elements/ExplainModal';
import { GameProvider, useGameContext } from '../play/context';
import { IGameConfig } from '@/types/game';

const GameLoading = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const { stompClient, setGameConfig, connectStompClient, getGameConfiguration } = useGameContext();

  useEffect(() => {
    const tryConnectStomp = async () => {
      if (!stompClient) {
        console.log('스톰프 연결 시도!');
        const client = await connectStompClient({ Authorization: '1' });
        console.log('여기 왜 안옴?', client);
        console.log('게임 시작!');
        // startGameSession(await getGameConfiguration(client));
      }
    };

    const startGameSession = (message: IGameConfig) => {
      console.log('message: ', message);
      if (message.gameRoomId) {
        setGameConfig(message);
      } else {
        console.log('게임 설정 수신 오류');
      }
    };

    // tryConnectStomp();
  }, [stompClient]);

  return (
    <div className="grid place-items-center bg-main-blue w-screen h-screen max-w-[500px]">
      {openModal && <ExplainModal onClose={handleModal} />}
      <Image alt="캐릭터" src={character} className="w-40 h-40" />
      <h1>게임 찾는 중...</h1>
      <FuncButton value="게임 설명" clickEvent={handleModal} small={true} />
    </div>
  );
};

export default GameLoading;
