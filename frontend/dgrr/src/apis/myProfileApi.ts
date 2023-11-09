import axios from 'axios';
import { setUrl } from '@/utils/setUrl';

const apiUrl = `${setUrl}/member`;

export interface MemberProps {
  memberId: number;
  nickname: string;
  profileImage: string;
  description: string;
}

export interface GameHistoryProps {
  gameHistoryId: number;
  gameRoomId: number;
  gameResult: string;
  gameType: string;
  gameTime: number;
  holdingTime: number;
  ratingChange: number;
  highlightImage: string;
  createdAt: string;
  opponentNickname: string;
  opponentProfileImage: string;
  opponentDescription: string;
}

export interface GetMyInfoProps {
  member: MemberProps;
  ranking: {
    season: number;
    score: number;
    rank: number;
    tier: string;
  };
  gameHistoryList: GameHistoryProps[];
}

export interface UpdateMyInfoProps {
  nickname: string | undefined;
  profileImage: string | undefined;
  description: string | undefined;
}

export const getMyInfoApi = async () => {
  // axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
  axios.defaults.headers.common['Authorization'] = 1;
  const res = await axios.get<GetMyInfoProps>(`${apiUrl}/member-id`);
  console.log('회원 정보 확인', res.data);
  return res.data;
};

export const updateMyInfoApi = async (props: UpdateMyInfoProps) => {
  // axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
  axios.defaults.headers.common['Authorization'] = 1;
  const res = await axios.put<MemberProps>(`${apiUrl}`, props);
  console.log('회원 정보 수정', res.data);
  return res.data;
};
