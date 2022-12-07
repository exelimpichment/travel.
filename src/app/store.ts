import { configureStore } from '@reduxjs/toolkit';
import NewJourneySlice from '../features/NewJourney/NewJourneySlice';
import BookmarksSlice from '../features/Bookmarks/BookmarksSlice';
import FriendsSlice from '../features/Friends/FriendsSlice';
import MusicPlayer from '../features/MusicPlayer/MusicPlayerSlice';

export const store = configureStore({
  reducer: {
    newJourney: NewJourneySlice.reducer,
    bookMarks: BookmarksSlice.reducer,
    friends: FriendsSlice.reducer,
    musicPlayer: MusicPlayer.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
