import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

interface musicPlayerState {
  test3: number;
}

const initialState: musicPlayerState = {
  test3: 1,
};

export const musicPlayerSlice = createSlice({
  name: 'musicPlayer',
  initialState,
  reducers: {},
});

export const {} = musicPlayerSlice.actions;

// export const selectBookmarks = (state: RootState) => state.bookMarks.test;

export default musicPlayerSlice;
