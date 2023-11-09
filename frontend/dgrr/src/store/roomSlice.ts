import { RoomType } from '@/types/room';
import { createSlice } from '@reduxjs/toolkit';

const initialState: RoomType = {
  roomInfo: {
    roomId: '',
    waitingMember: null,
  },
};

const roomSlice = createSlice({
  name: 'roomSlice',
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
  },
});

export default roomSlice.reducer;
export const { reset } = roomSlice.actions;
