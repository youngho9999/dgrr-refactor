import { RoomType } from '@/types/room';
import { createSlice } from '@reduxjs/toolkit';

const initialState: RoomType = {
  roomInfo: {
    roomId: '',
    waitingMember: null,
  },
  roomCode: '',
};

const roomSlice = createSlice({
  name: 'roomSlice',
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
    saveRoomInfo: (state, action) => {
      console.log('방 정보 저장: ', action.payload);
      state.roomInfo = action.payload;
    },
    saveRoomCode: (state, action) => {
      console.log('룸 코드: ', action.payload);
      state.roomCode = action.payload;
    },
  },
});

export default roomSlice.reducer;
export const { reset, saveRoomInfo, saveRoomCode } = roomSlice.actions;
