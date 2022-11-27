import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import {
  getAttractionsData,
  setCoordinates,
  setBounds,
  setZoom,
  setChildClicked,
} from '../features/NewJourney/NewJourneySlice';
import mapStyle from '../components/UI/mapStyles';
import imgHorizontal from '../assets/mntn_horizontal.jpg';
import ZoomButton from '../components/UI/ZoomButton';
import { motion } from 'framer-motion';
import AttractionsSection from '../components/AttractionsSection';
import Marker from '../components/Marker';
import { Outlet, Link } from 'react-router-dom';

function NewJourney() {
  const [width, setWidth] = useState(0);

  const mapRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const {
    newJourney: { coordinates, bounds, zoom, attractions },
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
  //   }, 3000);
  //   return () => clearTimeout(timer);
  // }, []);

  // useEffect(() => {
  // let boundsObject = {
  // ne: { lat: bounds.ne.lat, lng: bounds.ne.lng },
  // sw: { lat: bounds.sw.lat, lng: bounds.sw.lng },
  // };

  // coordinates?.lat === 0 &&
  //   coordinates?.lng === 0 &&
  // attraction fetching================================
  // console.log('1');

  // coordinates?.lat !== 0 &&
  //   coordinates?.lng !== 0 &&
  //   dispatch(getAttractionsData(boundsObject));
  // console.log('2');
  // }, [bounds]);
  // }, [coordinates, bounds]);

  interface test {
    x: number;
    y: number;
  }

  const options = {
    styles: mapStyle,
    disableDefaultUI: true,
    zoomControl: false,
    fullscreenControl: false,
  };

  let innerWidth = window.innerWidth;

  let lat = 0;
  let lng = 0;

  return (
    <Wrapper>
      {/* ================================================ */}
      <motion.div
        key='map'
        initial={{ x: -innerWidth * 0.6 }}
        // 0 - innerWidth of map div
        animate={{ x: 0 }}
        exit={{ x: -innerWidth * 0.6 }}
        transition={{ duration: 1 }}
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
          onChildClick={(child) => dispatch(setChildClicked(child))}
          onChange={(e) => {
            dispatch(setCoordinates({ lat: e.center.lat, lng: e.center.lng }));
            dispatch(
              setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
            );
          }}
        >
          {/* list will not be changed here, so I used i for keyProp */}
          {attractions?.map(
            (attraction, i) =>
              attraction.latitude &&
              attraction.longitude && (
                // I spent two days looking for
                //a solution (when I remove "any"
                // type)  and I was not able to
                // figure out how to solve this
                <Marker
                  style={{ zIndex: 1 }}
                  attraction={attraction}
                  key={i}
                  lat={Number(attraction.latitude)}
                  lng={Number(attraction.longitude)}
                />
              )
          )}

          {/* <Marker position={{ lat: lat, lng: lng }}></Marker> */}
        </GoogleMapReact>
      </motion.div>
      {/* ================================================ */}
      <motion.div
        key='outlet'
        initial={{ x: innerWidth + 1000 }}
        //  innerWidth of window + with of div
        animate={{ x: 0 }}
        exit={{ x: innerWidth + 1000 }}
        transition={{ duration: 1 }}
      >
        <Outlet />
      </motion.div>
    </Wrapper>
  );
}

export default NewJourney;

const Wrapper = styled.div`
  display: flex;
  .map-container {
    height: 100vh;
    width: 60vw;
    background-color: rgba(0, 0, 0, 0.5);
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
