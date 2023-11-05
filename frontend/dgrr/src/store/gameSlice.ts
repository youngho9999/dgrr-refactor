import { GameType } from '@/types/game';
import { createSlice } from '@reduxjs/toolkit';

const initialState: GameType = {
  client: undefined,
  gameInfo: {
    turn: 'FIRST',
    gameRoomId: '',
    openViduToken: '',
    myInfo: { nickname: '', profileImage: '', description: '', rating: 0, rank: 'BRONZE' },
    enemyInfo: { nickname: '', profileImage: '', description: '', rating: 0, rank: 'BRONZE' },
  },
};

const gameSlice = createSlice({
  name: 'gameSlice',
  initialState,
  reducers: {
    reset: () => initialState,
    saveGameInfo: (state, action) => {
      state = action.payload;
    },
    createClient: (state, action) => {
      // console.log(action.payload)
      state.client = action.payload
    }
  },
});

export default gameSlice.reducer;
export const { saveGameInfo, createClient } = gameSlice.actions;
