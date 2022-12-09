import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

interface FriendsState {
  searchWindowOpen: boolean;
  friendsScrollBarOpen: boolean;
}

const initialState: FriendsState = {
  searchWindowOpen: false,
  friendsScrollBarOpen: true,
};

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setSearchWindowOpen: (state) => {
      state.searchWindowOpen = !state.searchWindowOpen;
    },
    setFriendsScrollBarOpen: (state) => {
      state.friendsScrollBarOpen = !state.friendsScrollBarOpen;
    },
  },
});

export const { setSearchWindowOpen, setFriendsScrollBarOpen } =
  friendsSlice.actions;

// export const selectBookmarks = (state: RootState) => state.bookMarks.test;

export default friendsSlice;
