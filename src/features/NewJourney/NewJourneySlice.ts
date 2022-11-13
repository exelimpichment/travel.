import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import axios from 'axios';
import GoogleMapReact from '../../../node_modules/@types/google-map-react/index';

let apiURL: string =
  'https://travel-advisor.p.rapidapi.com/attractions/list-in-boundary';

interface AttractionsResponse {
  [key: string]: object | object[];
  data: object[];
}

interface Bounds {
  ne: { lat: number; lng: number };
  sw: { lat: number; lng: number };
}

export const getAttractionsData = createAsyncThunk(
  'newJourney/getAttractionsData',
  async (position: Bounds, thunkAPI) => {
    try {
      console.log(
        position.ne.lng,
        position.ne.lat,
        position.sw.lng,
        position.sw.lat
      );

      const response = await axios.get<AttractionsResponse>(apiURL, {
        params: {
          tr_longitude: position.ne.lng,
          tr_latitude: position.ne.lat,
          bl_longitude: position.sw.lng,
          bl_latitude: position.sw.lat,
        },
        headers: {
          'X-RapidAPI-Key':
            '83977db5eamshb16c568adbe75abp16ab34jsn4f1c341cc44d',
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        },
      });

      return response.data;
    } catch (error: any) {
      console.log(error);
    }
  }
);

interface AttractionsState {
  attractions: object[] | undefined;
  loading: 'idle' | 'true' | 'false' | 'failed';
  coordinates: GoogleMapReact.Coords | undefined;
  zoom: number;
  bounds: {
    ne: { lat: number; lng: number };
    sw: { lat: number; lng: number };
  };
}

const initialState: AttractionsState = {
  loading: 'idle',
  attractions: [],
  coordinates: { lat: 0, lng: 0 },
  zoom: 12,
  bounds: {
    ne: { lat: 0, lng: 0 },
    sw: { lat: 0, lng: 0 },
  },
};

type Decrement = 'decrement';
type Increment = 'increment';

export const newJourneySlice = createSlice({
  name: 'newJourney',
  initialState,
  reducers: {
    setCoordinates: (state, action) => {
      state.coordinates = action.payload;
    },
    setBounds: (state, action) => {
      state.bounds = action.payload;
    },
    setZoom: (state: AttractionsState, action) => {
      if (action.payload === 'decrement' && state.zoom > 3) {
        state.zoom -= 1;
      }
      if (action.payload === 'increment' && state.zoom < 22) {
        state.zoom += 1;
      }
    },
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

export const { setCoordinates, setBounds, setZoom } = newJourneySlice.actions;

export const selectCount = (state: RootState) => state.newJourney.attractions;

export default newJourneySlice;
