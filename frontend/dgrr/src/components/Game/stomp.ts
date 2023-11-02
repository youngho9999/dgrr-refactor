import { Client, StompHeaders } from '@stomp/stompjs';
import { IGameConfig, stompConfig } from '@/types/game';

const { DESTINATION_URI } = stompConfig;
// eslint-disable-next-line
const { MATCHING_URI, GAME_URI, IMAGE_DATA_URI, STATUS_URI, END_URI, RESULT_URI } = DESTINATION_URI;

export const connectStomp = (headers: StompHeaders) => {
  const client = new Client({
    brokerURL: process.env.NEXT_PUBLIC_BROKER_URL,
    connectHeaders: {
      ...headers,
    },
    debug: (message) => {
      console.log('[Stomp Debug :: message]', message); // 웹소켓 디버깅 로그 추가
    },
  });

  // 클라이언트 활성화
  client.activate();

  return new Promise<Client>((resolve) => {
    client.onConnect = (frame) => {
      resolve(client);
    };
  });
};

export const getGameConfig = (client: Client) => {
  return new Promise<IGameConfig>((resolve) => {
    console.log(GAME_URI, '를 구독합니다. ');
    client.subscribe(GAME_URI, (message) => {
      console.log(' 게임 메시지를 받았습니다. message : ' + message);
      const gameConfig = JSON.parse(message.body);
      resolve(gameConfig);
    });

    const token = localStorage.getItem('token');
    console.log(MATCHING_URI, '로 localStorage의 token을 보냅니다. ');
    if (token !== null) {
      client.publish({
        destination: MATCHING_URI,
        body: token,
      });
    } else {
      console.error('Error 발생!! localStorage에 토큰이 없습니다.');
    }
  });
};

export const onStompError = (client: Client, callback: Function) => {
  client.onStompError = (frame) => {
    callback();
    console.log('Broker reported error: ' + frame.headers['message']);
    console.log('Additional details: ' + frame.body);
  };
};

export const publishMessage = (client: Client, destination: string, body: string) => {
  client.publish({ destination, body });
};
