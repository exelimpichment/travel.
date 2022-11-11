import { configureStore } from '@reduxjs/toolkit';
import newJourneySlice from '../features/NewJourney/NewJourneySlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    newJourney: newJourneySlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
