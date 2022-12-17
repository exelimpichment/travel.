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
  friends: IFriend[] | [];
  // feedMoved: boolean;
}

const initialState: FriendsState = {
  searchWindowOpen: false,
  friendsScrollBarOpen: true,
  userSearch: '',
  searchedFriend: null,
  friends: [],
  // feedMoved: false,
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
    setFriends: (state, action) => {
      state.friends = { ...state.friends, ...action.payload };
    },
    // setFeedMoved: (state) => {
    //   state.feedMoved = !state.feedMoved;
    // },
  },
});

export const {
  setSearchWindowOpen,
  setFriendsScrollBarOpen,
  setUserSearch,
  setSearchedFriend,
  setFriends,
} = friendsSlice.actions;

// export const selectBookmarks = (state: RootState) => state.bookMarks.test;

export default friendsSlice;
