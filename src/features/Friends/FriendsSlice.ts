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
  friends: string[];
  detailedFriends: IFriend[];
  feedItemCommentsOpened: boolean;
}

const initialState: FriendsState = {
  feedItemCommentsOpened: false,
  searchWindowOpen: false,
  friendsScrollBarOpen: true,
  userSearch: '',
  searchedFriend: null,
  friends: [],
  detailedFriends: [],
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
      state.friends = action.payload;
    },
    setDetailedFriends: (state, action) => {
      state.detailedFriends = action.payload;
    },
    setFeedItemCommentsOpened: (state) => {
      state.feedItemCommentsOpened = !state.feedItemCommentsOpened;
    },
  },
});

export const {
  setSearchWindowOpen,
  setFriendsScrollBarOpen,
  setUserSearch,
  setSearchedFriend,
  setFriends,
  setDetailedFriends,
  setFeedItemCommentsOpened,
} = friendsSlice.actions;

// export const selectBookmarks = (state: RootState) => state.bookMarks.test;

export default friendsSlice;
