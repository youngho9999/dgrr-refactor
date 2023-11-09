export type RoomType = {
  roomInfo: RoomConfig;
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
