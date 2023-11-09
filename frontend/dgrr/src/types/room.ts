export type RoomType = {
  roomInfo: RoomConfig;
  roomCode: string;
};

export interface RoomConfig {
  roomId: string;
  waitingMember: WaitMemberConfig | null;
}

export interface WaitMemberConfig {
  waitingMemberId: number;
  nickname: string;
  profileImg: string;
  ready: boolean;
}

export const roomStompConfig = {
  DESTINATION_URI: {
    // 방 입장
    ENTER_SEND_URI: '/send/room-enter',
    // 준비/취소
    READY_SEND_URI: '/send/room-ready',
    // 대기방 나가기
    EXIT_SEND_URI: '/send/room-exit',
    // 대기방에서 게임 시작
    ROOM_START_URI: '/send/room-start',

    // 방 들어온 사람 정보
    ENTER_SUB_URI: '/user/recv/room-enter',
    // 참가자 레디 정보
    READY_SUB_URI: '/user/recv/room-ready',
    // 참가자 나가기 정보
    EXIT_SUB_URI: '/user/recv/room-exit',
  },
};
