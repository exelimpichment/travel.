import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import axios from 'axios';
import GoogleMapReact from '../../../node_modules/@types/google-map-react/index';
import { tempAttractions } from './tempAttractions';
import { string } from 'prop-types';

let apiURL: string =
  'https://travel-advisor.p.rapidapi.com/attractions/list-in-boundary';

interface AttractionsResponse {
  [key: string]: object | object[];
  data: Attraction[];
}

interface Bounds {
  ne: { lat: number; lng: number };
  sw: { lat: number; lng: number };
}

export const getAttractionsData = createAsyncThunk(
  'newJourney/getAttractionsData',
  async (position: Bounds, thunkAPI) => {
    try {
      const response = await axios.get<AttractionsResponse>(apiURL, {
        params: {
          tr_longitude: position.ne.lng,
          tr_latitude: position.ne.lat,
          bl_longitude: position.sw.lng,
          bl_latitude: position.sw.lat,
        },
        headers: {
          'X-RapidAPI-Key':
            'ee7d318de7msh8542f14947f21a0p156d1ajsn77a26d909433',
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        },
      });

      return response.data;
    } catch (error: any) {
      console.log(error);
    }
  }
);

export interface Attraction {
  [key: string]: any;
  latitude: string;
  longitude: string;
  location_id: string;
  address: string;
  name: string;
  description: string;
  photo: {
    images: {
      large: {
        url: string;
      };
      medium: {
        url: string;
      };
      original: {
        url: string;
      };
      small: {
        url: string;
      };
      thumbnail: {
        url: string;
      };
    };
  };
}

export interface User {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
}

export interface DocIdObject {
  location_id: string;
  docID: string;
}

interface AttractionsState {
  activeAttraction: {
    description: string;
    name: string;
    address: string;
  } | null;
  allPlacesShown: boolean;
  currentUser: User | null;
  childClicked: number | null;
  docIdObject: null | DocIdObject[];
  locationIdArr: null | string[];
  attractions: Attraction[] | undefined;
  loading: 'idle' | 'true' | 'false' | 'failed';
  coordinates: GoogleMapReact.Coords | undefined;
  zoom: number;
  bounds: {
    ne: { lat: number; lng: number };
    sw: { lat: number; lng: number };
  };
}

const initialState: AttractionsState = {
  activeAttraction: null,
  allPlacesShown: true,
  currentUser: null,
  childClicked: null,
  // attractions: undefined,
  docIdObject: null,
  locationIdArr: null,
  attractions: tempAttractions,
  loading: 'idle',
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
    setActiveAttraction: (state, action) => {
      state.activeAttraction = action.payload;
    },
    setCarouselView: (state) => {
      state.allPlacesShown = !state.allPlacesShown;
    },
    setLocationIdArr: (state, action) => {
      state.locationIdArr = action.payload;
    },
    setDocIdObject: (state, action) => {
      state.docIdObject = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setChildClicked: (state, action) => {
      state.childClicked = action.payload;
    },
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
        console.log(action.payload?.data);

        // here may be a mistake, guys ... sorry... this TS is tough!  soon you will
        //  hire me and my code will be reviewed. so I can become better faster. :)
      }
    );
  },
});

export const {
  setCoordinates,
  setBounds,
  setZoom,
  setChildClicked,
  setCurrentUser,
  setDocIdObject,
  setLocationIdArr,
  setCarouselView,
  setActiveAttraction,
} = newJourneySlice.actions;

export const selectCount = (state: RootState) => state.newJourney.attractions;

export default newJourneySlice;
