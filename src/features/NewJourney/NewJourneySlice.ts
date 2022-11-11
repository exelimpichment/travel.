import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://travel-advisor.p.rapidapi.com/attractions/list-in-boundary',
  params: {
    tr_longitude: '109.262909',
    tr_latitude: '12.346705',
    bl_longitude: '109.095887',
    bl_latitude: '12.113245',
    // currency: 'USD',
    // lunit: 'km',
    // lang: 'en_US'
  },
  headers: {
    'X-RapidAPI-Key': '83977db5eamshb16c568adbe75abp16ab34jsn4f1c341cc44d',
    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
  },
};

interface AttractionsResponse {
  [key: string]: object | object[];
  data: object[];
}

export const getAttractionsData = createAsyncThunk(
  'newJourney/getAttractionsData',
  async (thunkAPI) => {
    try {
      const response = await axios.get<AttractionsResponse>(
        options.url,
        options
      );
      console.log(response.data);

      return response.data;
    } catch (error: any) {
      console.log(error);
    }
  }
);

interface AttractionsState {
  attractions: object[] | undefined;
  loading: 'idle' | 'true' | 'false' | 'failed';
}

const initialState: AttractionsState = {
  attractions: [],
  loading: 'idle',
};

export const newJourneySlice = createSlice({
  name: 'newJourney',
  initialState,
  reducers: {
    // standard reducers
  },
  extraReducers: (builder) => {
    builder.addCase(
      getAttractionsData.pending,
      (state: AttractionsState, action) => {
        state.loading = 'true';
      }
    );

    builder.addCase(
      getAttractionsData.fulfilled,
      (
        state: AttractionsState,
        action: PayloadAction<AttractionsResponse | undefined>
      ) => {
        state.loading = 'false';
        state.attractions = action.payload?.data;
        // here may be a mistake, guys ... sorry... this TS is tough!  soon you will
        //  hire me and my code will be reviewed. so I can become a better faster. :)
      }
    );
  },
});

export const {} = newJourneySlice.actions;

export const selectCount = (state: RootState) => state.newJourney.attractions;

export default newJourneySlice;
