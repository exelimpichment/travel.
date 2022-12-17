import { configureStore, combineReducers } from '@reduxjs/toolkit';
import NewJourneySlice from '../features/NewJourney/NewJourneySlice';
import BookmarksSlice from '../features/Bookmarks/BookmarksSlice';
import FriendsSlice from '../features/Friends/FriendsSlice';
// import MusicPlayer from '../features/MusicPlayer/MusicPlayerSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const rootReducer = combineReducers({
  newJourney: NewJourneySlice.reducer,
  bookMarks: BookmarksSlice.reducer,
  friends: FriendsSlice.reducer,
  // musicPlayer: MusicPlayer.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
