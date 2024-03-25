import { createSlice } from '@reduxjs/toolkit';

type UnreadState = {
  read: string[];
  quantity: number;
};

const initialState: UnreadState = {
  read: [],
  quantity: 0,
};

const unreadSlice = createSlice({
  name: 'unread',
  initialState,
  reducers: {
    readPost(state, action: { payload: string }) {
      state.read.push(action.payload);
      state.quantity -= 1;
    },
  },
});

export const { readPost } = unreadSlice.actions;

const unreadReducer = unreadSlice.reducer;
export default unreadReducer;