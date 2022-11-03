import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface NewJourneyState {
  value: number
}

const initialState: NewJourneyState = {
  value: 0,
}

export const newJourneySlice = createSlice({
  name: 'newJourney',
  initialState,
  reducers: {},
})

export const {} = newJourneySlice.actions

export default newJourneySlice.reducer

