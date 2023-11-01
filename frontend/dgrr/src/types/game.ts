export interface ChildMethods {
  getVideoElement: () => HTMLVideoElement | null;
}

export interface IGameConfig {
  // 게임룸 생성 성공 여부
  success: string;

  // 게임 정보
  turn: "FIRST" | "SECOND";
  startTime: string;
  gameSessionId: string;
  openViduToken: string;

  // 내 유저 정보
  myInfo: IMemberInfo;
  enemyInfo: IMemberInfo;
}

export interface IMemberInfo {
  nickname: string;
  profileImage: string;
  description: string;
  rating: number;
  rank: "BRONZE" | "SILVER" | "GOLD";
}

export interface IImageResult {
  success: string;
  emotion: string;
  probability: string;
  smileProbability: string;
}

export interface IGameStatus {
  status: "round changed";
  result: "LAUGH" | "HOLD_BACK";
  startTime: string;
}

export interface IGameResult {
  firstRoundTime: number;
  secondRoundTime: number;
  gameResult: string;
  reward: number;
  beforeRank: "BRONZE" | "SILVER" | "GOLD";
  afterRank: "BRONZE" | "SILVER" | "GOLD";
}

//Stomp
export const stompConfig = {
  CONNECT_HEADER: {
    "heart-beat": "10000,10000",
  },

  DESTINATION_URI: {
    MATCHING_URI: "/send/matching",
    GAME_URI: "/user/recv/game",
    IMAGE_DATA_URI: "/send/imgData",
    IMAGE_RESULT_URI: "/user/recv/imgResult",
    STATUS_URI: "/user/recv/status",
    RESULT_URI: "/user/recv/result",
  },
  CAPTURE_INTERVAL: 500,
};

//OpenVidu
export const openViduConfig = {
  APPLICATION_SERVER_URL: "",
  PUBLISHER_PROPERTIES: {
    audioSource: undefined,
    videoSource: undefined,
    publishAudio: true,
    publishVideo: true,
    resolution: "1280x720",
    frameRate: 60,
    insertMode: "APPEND",
    mirror: true,
  },
};
