import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

interface FriendsState {
  test2: number;
}

const initialState: FriendsState = {
  test2: 1,
};

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {},
});

export const {} = friendsSlice.actions;

// export const selectBookmarks = (state: RootState) => state.bookMarks.test;

export default friendsSlice;
