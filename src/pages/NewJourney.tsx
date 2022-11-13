import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import {
  getAttractionsData,
  setCoordinates,
  setBounds,
  setZoom,
} from '../features/NewJourney/NewJourneySlice';
import mapStyle from '../components/UI/mapStyles';
import imgHorizontal from '../assets/mntn_horizontal.jpg';
import ZoomButton from '../components/UI/ZoomButton';

function NewJourney() {
  const dispatch = useAppDispatch();

  const {
    newJourney: { coordinates, bounds, zoom },
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

  // use effect making geolocation every 5 sec================================
  // useEffect(() => {
  //   let timer = setTimeout(() => {
  //     navigator.geolocation.getCurrentPosition(
  //       (coords: GeolocationPosition) => {
  //         dispatch(
  //           setCoordinates({
  //             lat: coords.coords.latitude,
  //             lng: coords.coords.longitude,
  //           })
  //         );
  //       }
  //     );
  //   }, 5000);
  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    let boundsObject = {
      ne: { lat: bounds.ne.lat, lng: bounds.ne.lng },
      sw: { lat: bounds.sw.lat, lng: bounds.sw.lng },
    };

    coordinates?.lat === 0 &&
      coordinates?.lng === 0 &&
      console.log('NOTfetching');
    // attraction fetching================================
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
    zoomControl: false,
  };

  return (
    <Wrapper>
      <div
        className='map-container'
        style={{
          borderRadius: '0 3rem 3rem 0',
          overflow: 'hidden',
        }}
      >
        <ZoomButton></ZoomButton>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyA74mseU6zIQdvYJimqzGyizKhHkzu379s' }}
          // defaultCenter={coordinates}
          center={coordinates}
          defaultZoom={12}
          zoom={zoom}
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
      <div className='attraction-section'>test</div>
    </Wrapper>
  );
}

export default NewJourney;

const Wrapper = styled.div`
  display: flex;
  .map-container {
    height: 100vh;
    width: 60vw;
  }

  .attraction-section {
    background-color: white;
    height: 100vh;
  }

  @media (min-width: 490px) {
    background-color: #fff;
    display: flex;
    background-image: url(${imgHorizontal});
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;

    color: red;
    overflow: hidden;
    height: 100vh;

    .map-container {
      height: 100vh;
      width: 60vw;
      border-style: 12px black solid;
    }

    .attraction-section {
      overflow: hidden;
      background-color: transparent;
      height: 100vh;
    }
  }
`;
