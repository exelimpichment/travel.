import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export interface IFriend {
  photoURL: string;
  uid: string;
  email: string;
  displayName: string;
  docId?: string;
}

interface FriendsState {
  searchWindowOpen: boolean;
  friendsScrollBarOpen: boolean;
  userSearch: string;
  searchedFriend: IFriend | null;
}

const initialState: FriendsState = {
  searchWindowOpen: false,
  friendsScrollBarOpen: true,
  userSearch: '',
  searchedFriend: null,
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
    setUserSearch: (state, action) => {
      state.userSearch = action.payload;
    },
    setSearchedFriend: (state, action) => {
      state.searchedFriend = action.payload;
    },
  },
});

export const {
  setSearchWindowOpen,
  setFriendsScrollBarOpen,
  setUserSearch,
  setSearchedFriend,
} = friendsSlice.actions;

// export const selectBookmarks = (state: RootState) => state.bookMarks.test;

export default friendsSlice;
