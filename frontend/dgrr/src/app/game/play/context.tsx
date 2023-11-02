import { ReactNode, useState, useRef, createContext, useEffect } from 'react';
import { StompHeaders, Client } from '@stomp/stompjs';
import { connectStomp, gameSubscribe } from '@/components/Game/stomp';
import { IGamePlayProps, stompConfig } from '@/types/game';

export const GameContext = createContext<IGamePlayProps | undefined>(undefined);
const { DESTINATION_URI } = stompConfig;
const { GAME_URI } = DESTINATION_URI;

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [stompClient, setStompClient] = useState<Client>();
  const isStompConnected = useRef<boolean>(false);

  const connectStompClient = async (headers: StompHeaders) => {
    console.log('Stomp 연결 대기 중');
    const client = await connectStomp(headers);
    setStompClient(client);
    isStompConnected.current = true;
    console.log('Stomp 연결 성공');

    gameSubscribe(client, GAME_URI);
  };

  useEffect(() => {
    connectStompClient({ Authorization: '1' });
  }, []);

  return (
    <GameContext.Provider
      value={{ stompClient, setStompClient, isStompConnected: isStompConnected.current }}
    >
      {children}
    </GameContext.Provider>
  );
};
