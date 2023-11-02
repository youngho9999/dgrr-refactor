import { ReactNode, useState, useRef, createContext, useEffect } from 'react';
import { StompHeaders, Client } from '@stomp/stompjs';
import { connectStomp } from '@/components/Game/stomp';
import { IGamePlayProps } from '@/types/game';

export const GameContext = createContext<IGamePlayProps | undefined>(undefined);
export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [stompClient, setStompClient] = useState<Client>();
  const isStompConnected = useRef<boolean>(false);

  const connectStompClient = async (headers: StompHeaders) => {
    console.log('Stomp 연결 대기 중');
    const client = await connectStomp(headers);
    setStompClient(client);
    isStompConnected.current = true;
    console.log('Stomp 연결 성공');
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
