'use client';
import opositProfileImage from '@/../public/images/m-bread1.png';
import myProfileImage from '@/../public/images/m-bread2.png';
import matchAttack from '@/../public/images/match-attack.png';
import vsImage from '@/../public/images/vs-image.png';
import { useAppSelector } from '@/store/hooks';
import { Image } from 'next/dist/client/image-component';
import { useRouter } from 'next/navigation';
import { Device, OpenVidu, Publisher, Session, Subscriber } from 'openvidu-browser';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import './match.scss';
// import matchDefenseImage from '@/../public/images/match-defense.png';

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
  const roleMessage = '상대방을 웃기세요!';

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
    <div className='Container relative w-screen h-screen min-w-[500px] min-h-[844px] max-w-[500px] z-0 truncate'>
      <div className='Turn flex absolute items-center justify-center bg-match-versus mt-20 mx-3 m-2 rounded-lg'>
        <Image
          className='MatchedPersonProfile w-[20%] rounded-full'
          alt='역할 이미지'
          src={matchAttack}
        />
        <div className='text-[30px] text-[#000000] font-black'>
          <p>{roleMessage}</p>
        </div>
      </div>

      <div className='flex flex-col justify-between h-full'>
        {/* 내 정보 */}

        <div className='flex flex-col flex-1 justify-end bg-match-white mx-6 my-0'>
          <div className='flex flex-1 items-center justify-center bg-match-versus py-6 mx-3 my-4 rounded-lg'></div>
          <div className='MatchedPerson1 flex flex-1 relative items-end justify-center bg-match-versus py-5 px-3 mx-3 my-2 rounded-lg'>
            <div className='MatchedPersonBackground1 min-h-[150px] min-x-[400px] z-30'>
              <div className='absolute text-[10px] text-[#9cd4ab] mt-4 ml-[80%] mb-[50px]'>
                NickName
              </div>

              <div className='w-[240px] ml-[160px] mt-7 ml-4 text-[#fee691] text-[18px] rounded-lg border-b-2 '>
                <p>가나다라마바사아자차카타</p>
              </div>
              <div className='absolute text-[10px] text-[#9cd4ab] mt-4 ml-[80%] mb-[50px]'>
                상태메시지
              </div>
              <div className='ml-[160px] min-w-[150px] max-w-[220px] text-[14px] text-[#f2f2f2] pl-2 mt-6 ml-4 rounded-lg border-b-2 '>
                <p>내가 보여준다고 했지??</p>
              </div>
            </div>

            <Image
              className='MatchedPersonProfile w-[160px] mb-[2%] mr-[60%] absolute rounded-full border-0 border-cyan-500 z-50'
              alt='프로필 이미지'
              src={myProfileImage}
            />
          </div>
        </div>

        {/* ------------------------------------------------------------------------------------------------------------- */}

        {/* vsImage */}
        <div className='VersusImage absolute w-[140px] left-[37.5%] top-[43%] z-40'>
          <Image alt='vs이미지' src={vsImage} />
        </div>
        {/* ------------------------------------------------------------------------------------------------------------- */}

        {/* 상대 정보 */}
        <div className='flex flex-col flex-1 justify-end bg-match-white mx-6 my-0'>
          <div className='MatchedPerson2 flex flex-1 relative items-start justify-center bg-match-versus py-5 px-2 mx-3 my-2 rounded-lg'>
            <div className='MatchedPersonBackground2 min-h-[150px] min-x-[400px] z-30'>
              <div className='absolute text-[10px] text-[#9cd4ab] mt-4 ml-5'>NickName</div>
              <div className='w-[240px] pl-2 mt-7 ml-4 text-[#fee691] text-[18px] rounded-lg border-b-2 '>
                <p>가나다라마바사아자차카타</p>
              </div>
              <div className='absolute text-[10px] text-[#9cd4ab] mt-3 ml-5'>상태메시지</div>
              <div className='min-w-[150px] max-w-[220px] text-[14px] text-[#f2f2f2] pl-2 mt-6 ml-4 rounded-lg border-b-2 '>
                <p>내가 보여준다고 했지??</p>
              </div>
            </div>
            <Image
              className='MatchedPersonProfile w-[160px] mt-[2%] ml-[52%] absolute rounded-full border-0 border-cyan-500 z-50'
              alt='프로필 이미지'
              src={opositProfileImage}
            />
          </div>

          <div className='flex flex-1 items-center justify-center bg-match-versus py-6 mx-3 my-4 rounded-lg'></div>
        </div>
      </div>
    </div>
  );
};

export default MatchPage;
