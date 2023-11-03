import { ReactNode, useState, useRef, createContext, useEffect, useContext } from 'react';
import { StompHeaders, Client } from '@stomp/stompjs';
import { connectStomp, getGameConfig, onStompError, publishMessage } from '@/components/Game/stomp';
import { IGameConfig, IGamePlayProps, stompConfig } from '@/types/game';

export const GameContext = createContext<IGamePlayProps | undefined>(undefined);
const { DESTINATION_URI } = stompConfig;
const { GAME_URI, FIRST_ROUND_START_URI, FIRST_ROUND_GO_URI } = DESTINATION_URI;

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [stompClient, setStompClient] = useState<Client>();
  const isStompConnected = useRef<boolean>(false);
  const [gameConfig, setGameConfig] = useState<IGameConfig>({} as IGameConfig);

  const connectStompClient = async (headers: StompHeaders) => {
    console.log('Stomp 연결 대기 중');
    const client = await connectStomp(headers);
    setStompClient(client);
    isStompConnected.current = true;
    console.log('Stomp 연결 성공');
    getGameConfiguration(client);
    return client;
  };

  const getGameConfiguration = async (client: Client) => {
    return getGameConfig(client);
  };

  const handleErrorOnStomp = (client: Client, callback: Function) => {
    onStompError(client, callback);
  };

  const sendMessage = (client: Client, destination: string, body: string) => {
    publishMessage(client, destination, body);
  };

  useEffect(() => {
    connectStompClient({ Authorization: '1' });
  }, []);

  return (
    <GameContext.Provider
      value={{
        stompClient,
        setStompClient,
        isStompConnected: isStompConnected.current,
        getGameConfiguration,
        setGameConfig,
        connectStompClient,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  console.log(context);
  if (!context) {
    console.log('context 없음!');
    // throw new Error('useGameContext 에러');
  }
  return context;
};
