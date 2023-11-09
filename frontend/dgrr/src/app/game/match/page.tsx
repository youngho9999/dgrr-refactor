'use client';
import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import { Device, OpenVidu, Publisher, Session, Subscriber } from 'openvidu-browser';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import './match.scss';

const MatchPage = () => {
  const [OV, setOV] = useState<OpenVidu>();
  const [OVSession, setOVSession] = useState<Session>();
  const [publisher, setPublisher] = useState<Publisher>();
  const [subscriber, setSubscriber] = useState<Subscriber>();
  const currentVideoDeviceRef = useRef<Device>();
  const openviduToken = useAppSelector((state) => state.game.gameInfo.openviduToken);
  const gameInfo = useAppSelector((state) => state.game.gameInfo);
  const dispatch = useDispatch();
  const router = useRouter();

  // // 오픈비두 연결
  // const connectOV = () => {
  //   initGame().then(({ OV, session }) => {
  //     // console.log("THE FIRST OV INItialte");
  //     setOV(OV);
  //     setOVSession(session);
  //     session.on('streamCreated', (event) => {
  //       const ySubscriber = session.subscribe(event.stream, undefined);
  //       setSubscriber(ySubscriber);
  //       dispatch(saveSubscriber(ySubscriber));
  //     });

  //     //연결
  //     joinSession(OV, session, openviduToken, gameInfo.myInfo.nickname)
  //       .then(({ publisher, currentVideoDevice }) => {
  //         console.log('받은 퍼블리셔: ', publisher);
  //         setPublisher(publisher);
  //         dispatch(savePublisher(publisher));
  //         currentVideoDeviceRef.current = currentVideoDevice;
  //         console.log('OpenVidu 연결 완료');
  //         router.push('/game/play');
  //       })
  //       .catch((error) => {
  //         console.log('OpenVidu 연결 실패', error.code, error.message);
  //       });
  //     console.log('초반퍼블리셔: ', publisher);
  //   });
  // };

  // useEffect(() => {
  //   // WebSocket 연결
  //   const PYTHON_URL = process.env.NEXT_PUBLIC_PYTHON_URL;
  //   const websocket = new WebSocket(`${PYTHON_URL}`);
  //   dispatch(saveWebsocket(websocket));
  //   websocket.onopen = () => console.log('WebSocket 연결됨');
  //   websocket.onmessage = (event) => console.log('서버로부터 메세지 받음:', event.data);
  //   websocket.onerror = (error) => console.log('WebSocket 에러:', error);
  //   websocket.onclose = () => console.log('WebSocket 연결 종료됨');

  //   connectOV();
  // }, []);

  return (
    <>
      <div className='bg-main-blue w-screen h-screen max-w-[500px]'>
        <div className='flex flex-col justify-between h-full'>
          {/* 내 정보 */}
          <div className='flex flex-col flex-1 justify-end bg-match-white mx-6 my-0'>
            <div className='flex flex-2 items-center justify-center bg-match-versus py-6 mx-3 my-4 rounded-lg'></div>
            <div className='flex flex-1 items-end justify-center bg-match-versus py-1 px-3 mx-3 my-2 rounded-lg'>
              <div className='MatchedPersonBackground1 min-h-[150px]'></div>
            </div>
          </div>

          {/* ------------------------------------------------------------------------------------------------------------- */}

          {/* 상대 정보 */}
          <div className='flex flex-col flex-1 justify-end bg-match-white mx-6 my-0'>
            <div className='flex flex-1 items-start justify-center bg-match-versus py-1 px-3 mx-3 my-2 rounded-lg'>
              <div className='MatchedPersonBackground2 min-h-[150px]'></div>
            </div>
            <div className='flex flex-2 items-center justify-center bg-match-versus py-6 mx-3 my-4 rounded-lg'></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MatchPage;
