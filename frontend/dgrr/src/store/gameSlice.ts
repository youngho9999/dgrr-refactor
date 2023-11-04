import { IGameConfig } from '@/types/game';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IGameConfig = {
  turn: 'FIRST',
  gameRoomId: '',
  openViduToken: '',
  myInfo: { nickname: '', profileImage: '', description: '', rating: 0, rank: 'BRONZE' },
  enemyInfo: { nickname: '', profileImage: '', description: '', rating: 0, rank: 'BRONZE' },
};

const gameSlice = createSlice({
  name: 'gameSlice',
  initialState,
  reducers:{

  }
})

export default gameSlice.reducer;