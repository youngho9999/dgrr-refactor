import { OpenVidu, Publisher, StreamManager, Session } from "openvidu-browser";
import { useState } from "react";
import { getToken } from "./openvidu";

export const GamePlay = () => {
  // openvidu
  const [OV, setOV] = useState<OpenVidu>();
  const [session, setSession] = useState<Session>();
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [subscriber, setSubscriber] = useState<Array<StreamManager>>([]);
  const [initUserData, setInitUserData] = useState({
    mySessionId: "",
    myUserName: "",
  });

  const JoinSession = () => {
    // openvidu 객체 생성
    const newOV = new OpenVidu();
    // 필요하지 않은 log 제거
    newOV.enableProdMode();

    // initSession 생성
    const newSession = newOV.initSession();

    setOV(newOV);
    setSession(newSession);

    // session에 connect
    const connection = () => {
      getToken(initUserData.mySessionId!).then((token: any) => {
        newSession
          .connect(token, { cilentData: initUserData.myUserName })
          .then(async () => {
            newOV
              .getUserMedia({
                audioSource: false,
                videoSource: undefined,
                resolution: "1208x720",
                frameRate: 60,
              })
              .then((MediaStream) => {
                const videoTrack = MediaStream.getVideoTracks()[0];
                const newPublisher = newOV.initPublisher(
                  initUserData.myUserName,
                  {
                    audioSource: undefined,
                    videoSource: undefined,
                    publishAudio: true,
                    publishVideo: true,
                    resolution: "1280x720",
                    frameRate: 60,
                    insertMode: "APPEND",
                    mirror: true,
                  }
                );

                newPublisher.once("accessAllowed", () => {
                  newSession.publish(newPublisher);
                  setPublisher(newPublisher);
                });
              });
          })
          .catch((err) => {
            console.log("seesion connect : ", err.code, err.message);
          });
      });
    };
    connection();
  };
  return <></>;
};
