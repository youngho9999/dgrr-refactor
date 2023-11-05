'use client';
import { useAppSelector } from "@/store/hooks";
import { stompConfig } from "@/types/game";
import { useState } from "react";

const PlayPage = () => {
  const client = useAppSelector((state)=>state.game.client)
  const { DESTINATION_URI } = stompConfig;
  const { FIRST_ROUND_GO_URI, FIRST_ROUND_NO_LAUGH_URI, FIRST_ROUND_LAUGH_URI, FIRST_ROUND_START_URI, SECOND_ROUND_GO_URI, SECOND_ROUND_LAUGH_URI, SECOND_ROUND_NO_LAUGH_URI, SECOND_ROUND_START_URI, ERROR_URI, RESULT_URI, STATUS_URI } = DESTINATION_URI;
  const [firstRoundResult, setFirstRoundResult] = useState('')
  const [secondRoundResult, setSecondRoundResult] = useState('')

  const subscribeGame = () =>{
    // 1라운드 관련 구독
    client?.subscribe(FIRST_ROUND_GO_URI, (message)=>{
      console.log('1라운드 메세지: ', message)
      if (message.body == 'START') {
        console.log('1라운드 시작')
      }
    })
    client?.subscribe(FIRST_ROUND_NO_LAUGH_URI, (message)=>{
      console.log('1라운드 메세지: ', message)
      setFirstRoundResult(message.body)
    })
    client?.subscribe(FIRST_ROUND_LAUGH_URI, (message)=>{
      console.log('1라운드 메세지: ', message)
      setFirstRoundResult(message.body)
    })

    // 2라운드 관련 구독
    client?.subscribe(SECOND_ROUND_GO_URI, (message)=>{
      console.log('2라운드 메세지: ', message)
      if (message.body == 'START') {
        console.log('2라운드 시작')
      }
    })
    client?.subscribe(SECOND_ROUND_NO_LAUGH_URI, (message)=>{
      console.log('2라운드 메세지: ', message)
      setSecondRoundResult(message.body)
    })
    client?.subscribe(SECOND_ROUND_LAUGH_URI, (message)=>{
      console.log('2라운드 메세지: ', message)
      setSecondRoundResult(message.body)
    })

    // error
    client?.subscribe(ERROR_URI, (message)=>{
      console.log('error: ', message)
    })
  }
  return <div>스톰프야 일해줘</div>;
};

export default PlayPage;
