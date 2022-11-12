import React, { useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import {
  getAttractionsData,
  setCoordinates,
  setBounds,
} from '../features/NewJourney/NewJourneySlice';
import mapStyle from '../components/UI/mapStyles';

// let center = { lat: 0, lng: 0 };

function Map() {
  const dispatch = useAppDispatch();

  const {
    newJourney: { loading, attractions, coordinates, bounds },
  } = useAppSelector((state) => state);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((coords: GeolocationPosition) => {
      dispatch(
        setCoordinates({
          lat: coords.coords.latitude,
          lng: coords.coords.longitude,
        })
      );
    });
  }, []);

  useEffect(() => {
    let boundsObject = {
      ne: { lat: bounds.ne.lat, lng: bounds.ne.lng },
      sw: { lat: bounds.sw.lat, lng: bounds.sw.lng },
    };

    coordinates?.lat === 0 &&
      coordinates?.lng === 0 &&
      console.log('NOTfetching');
    // coordinates?.lat !== 0 &&
    //   coordinates?.lng !== 0 &&
    //   dispatch(getAttractionsData(boundsObject));
  }, [coordinates, bounds]);

  interface test {
    x: number;
    y: number;
  }

  const options = {
    styles: mapStyle,
    disableDefaultUI: true,
    zoomControl: true,
  };

  return (
    <Wrapper>
      {/* map */}
      <div className='map' style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyA74mseU6zIQdvYJimqzGyizKhHkzu379s' }}
          // defaultCenter={coordinates}
          center={coordinates}
          defaultZoom={12}
          margin={[50, 50, 50, 50]}
          options={options}
          onChange={(e) => {
            console.log(e);
            dispatch(setCoordinates({ lat: e.center.lat, lng: e.center.lng }));
            dispatch(
              setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
            );
          }}
        ></GoogleMapReact>
      </div>
    </Wrapper>
  );
}

export default Map;

const Wrapper = styled.main`
  .map {
    height: 100%;
    width: 100%;
  }
`;
