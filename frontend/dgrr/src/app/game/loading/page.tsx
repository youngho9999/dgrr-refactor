'use client';
import character from '@/../../public/images/logo_character.png';
import Image from 'next/image';
import Header from '@/components/elements/Header';
import { FuncButton } from '@/components/FuncButton';
import { useEffect, useState } from 'react';
import { ExplainModal } from '@/components/elements/ExplainModal';
import { useAppSelector } from '@/store/hooks';
import { stompConfig } from '@/types/game';
import { useDispatch } from 'react-redux';
import { saveGameInfo } from '@/store/gameSlice';
import { publishMessage } from '@/components/Game/stomp';
import { useRouter } from 'next/navigation';

const GameLoading = () => {
  const [openModal, setOpenModal] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const client = useAppSelector((state) => state.game.client);
  const { DESTINATION_URI } = stompConfig;
  const { GAME_URI, MATCHING_URI } = DESTINATION_URI;
  const dispatch = useDispatch();
  const router = useRouter();

  // 랜덤매칭
  const gameMatch = () => {
    if (client) {
      publishMessage(client, MATCHING_URI, '');
    }
  };

  const subscribeGame = () => {
    client?.subscribe(GAME_URI, (message) => {
      console.log('게임정보 받는 메세지: ', message.body);
      // 게임 정보 저장
      dispatch(saveGameInfo(JSON.parse(message.body)));
      // 게임 정보가 왔다면 매칭 페이지로 이동
      router.push('/game/match');
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    subscribeGame();
    gameMatch();
    return () => clearInterval(interval);
  }, [client]);

  return (
    <div className='bg-main-blue w-screen h-screen min-h-[580px] max-w-[500px]'>
      <Header headerType='MATCHING' />
      {openModal && <ExplainModal onClose={handleModal} />}
      <div className='flex flex-col justify-between h-5/6 pt-10'>
        <div className='flex justify-center mb-5'>
          <Image alt='캐릭터' src={character} className='w-40 h-40' />
        </div>
        <div className='flex justify-center font-bold'>
          <h1>게임 찾는 중...</h1>
        </div>
        <div className='flex justify-center font-bold'>
          <div className='Timer'>{seconds}s</div>
        </div>
        <div className='flex justify-center'>
          <FuncButton value='게임 설명' clickEvent={handleModal} small={true} />
        </div>
      </div>
    </div>
  );
};

export default GameLoading;
