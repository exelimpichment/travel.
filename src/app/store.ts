import { configureStore } from "@reduxjs/toolkit";
import newJourneyReducer from "../features/NewJourney/NewJourneySlice"

export const store = configureStore({
  reducer: {
    newJourney : newJourneyReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

