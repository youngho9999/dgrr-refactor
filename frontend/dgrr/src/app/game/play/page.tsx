'use client';
import { useAppSelector } from '@/store/hooks';
import { ChildMethods, stompConfig } from '@/types/game';
import { useEffect, useRef, useState } from 'react';
import { UserVideoComponent } from './videoComponent';
import { Publisher } from 'openvidu-browser';
import { useDispatch } from 'react-redux';
import { saveGameResult } from '@/store/gameSlice';

const PlayPage = () => {
  const client = useAppSelector((state) => state.game.client);
  const { DESTINATION_URI } = stompConfig;
  const {
    FIRST_ROUND_GO_URI,
    FIRST_ROUND_NO_LAUGH_URI,
    FIRST_ROUND_LAUGH_URI,
    FIRST_ROUND_START_URI,
    SECOND_ROUND_GO_URI,
    SECOND_ROUND_LAUGH_URI,
    SECOND_ROUND_NO_LAUGH_URI,
    SECOND_ROUND_START_URI,
    ERROR_URI,
    RESULT_URI,
    STATUS_URI,
  } = DESTINATION_URI;
  const [firstRoundResult, setFirstRoundResult] = useState('');
  const [secondRoundResult, setSecondRoundResult] = useState('');
  const childRef = useRef<ChildMethods | null>(null);
  const dispatch = useDispatch();

  const subscribeGame = () => {
    // 1라운드 관련 구독
    client?.subscribe(FIRST_ROUND_GO_URI, (message) => {
      console.log('1라운드 메세지: ', message);
      if (message.body == 'START') {
        console.log('1라운드 시작');
      }
    });
    client?.subscribe(FIRST_ROUND_NO_LAUGH_URI, (message) => {
      console.log('1라운드 메세지: ', message);
      setFirstRoundResult(message.body);
    });
    client?.subscribe(FIRST_ROUND_LAUGH_URI, (message) => {
      console.log('1라운드 메세지: ', message);
      setFirstRoundResult(message.body);
    });

    // 2라운드 관련 구독
    client?.subscribe(SECOND_ROUND_GO_URI, (message) => {
      console.log('2라운드 메세지: ', message);
      if (message.body == 'START') {
        console.log('2라운드 시작');
      }
    });
    client?.subscribe(SECOND_ROUND_NO_LAUGH_URI, (message) => {
      console.log('2라운드 메세지: ', message);
      setSecondRoundResult(message.body);
    });
    client?.subscribe(SECOND_ROUND_LAUGH_URI, (message) => {
      console.log('2라운드 메세지: ', message);
      setSecondRoundResult(message.body);
    });

    // error
    client?.subscribe(ERROR_URI, (message) => {
      console.log('error: ', message);
    });

    // 게임 결과
    client?.subscribe(RESULT_URI, (message)=> {
      dispatch(saveGameResult(message.body))
    })
  };

  // 웹소켓 관련
  const [ws, setWs] = useState<WebSocket | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [publisher, setPublisher] = useState<Publisher>();
  useEffect(() => {
    // 웹캠 연결
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.log('웹캠 에러:', err));
    // WebSocket 연결
    const PYTHON_URL = process.env.NEXT_PUBLIC_PYTHON_URL;
    const websocket = new WebSocket(`${PYTHON_URL}`);
    setWs(websocket);
    websocket.onopen = () => console.log('WebSocket 연결됨');
    websocket.onmessage = (event) => console.log('서버로부터 메세지 받음:', event.data);
    websocket.onerror = (error) => console.log('WebSocket 에러:', error);
    websocket.onclose = () => console.log('WebSocket 연결 종료됨');
    // 웹캠 이미지 캡쳐 및 전송
    const captureAndSend = () => {
      if (canvasRef.current && videoRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.drawImage(videoRef.current, 0, 0, 640, 480); // 여기서 640x480은 캡처할 이미지의 크기입니다. 원하는대로 조절하세요.
          const dataURL = canvasRef.current.toDataURL('image/jpeg');
          if (websocket.readyState === WebSocket.OPEN) {
            const message = {
              image: dataURL,
              header: {
                round: 1,
                gameSessionId: '12345',
              },
            };
            websocket.send(JSON.stringify(message));
          }
        }
      }
    };
    const intervalId = setInterval(captureAndSend, 1000);
    return () => {
      clearInterval(intervalId);
      if (websocket) {
        websocket.close();
      }
    };
  }, []);

  return (
    <div>
      <UserVideoComponent ref={childRef} streamManager={publisher} />
      <video ref={videoRef} width="640" height="480" autoPlay muted />
      <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }} />
    </div>
  );
};

export default PlayPage;
