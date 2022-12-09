import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

interface BookmarksState {
  bookmarks: IBookmark[] | [];
}

export interface IBookmark {
  name: string;
  displayName: string;
  docId: string;
  email: string;
  latitude: string;
  location_id: string;
  longitude: string;
  photo: string;
  photoURL: string;
  uid: string;
}

const initialState: BookmarksState = {
  bookmarks: [],
};

export const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    setBookmarks: (state, action) => {
      state.bookmarks = action.payload;
    },
  },
});

export const { setBookmarks } = bookmarksSlice.actions;

// export const selectBookmarks = (state: RootState) => state.bookMarks.test;

export default bookmarksSlice;
