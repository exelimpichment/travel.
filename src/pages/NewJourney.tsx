import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
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
import { motion } from 'framer-motion';
import AttractionsSection from '../components/AttractionsSection';
import { TbMapPin } from 'react-icons/tb';

function NewJourney() {
  // useEffect(() => {
  //   // Google Analytics
  //   console.log(location);
  // }, [location]);
  const [width, setWidth] = useState(0);
  const mapRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  // dangerous piece of code. hope i got it right
  // useLayoutEffect(() => {
  //   if (mapRef.current != null) {
  //     setWidth(mapRef.current.offsetWidth);
  //   }
  //   console.log(width);
  // });

  const {
    newJourney: { coordinates, bounds, zoom, attractions },
  } = useAppSelector((state) => state);
  console.log(attractions?.map((attraction) => attraction?.latitude));

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

  useEffect(() => {
    let boundsObject = {
      ne: { lat: bounds.ne.lat, lng: bounds.ne.lng },
      sw: { lat: bounds.sw.lat, lng: bounds.sw.lng },
    };

    console.log('1');
    coordinates?.lat === 0 &&
      coordinates?.lng === 0 &&
      console.log('NOTfetching');
    // attraction fetching================================
    coordinates?.lat !== 0 &&
      coordinates?.lng !== 0 &&
      dispatch(getAttractionsData(boundsObject));
    console.log('2');
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

  let innerWidth = window.innerWidth;

  return (
    <Wrapper>
      {/* ================================================ */}
      <motion.div
        initial={{ x: -innerWidth * 0.6 }}
        // 0 - innerWidth of map div
        animate={{ x: 0 }}
        exit={{ x: -innerWidth * 0.6 }}
        transition={{ duration: 1, delay: 0.3 }}
        // ==============
        className='map-container'
        // ref={mapRef}
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
            dispatch(setCoordinates({ lat: e.center.lat, lng: e.center.lng }));
            dispatch(
              setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
            );
          }}
        >
          {attractions?.map((attraction) => (
            <div
              className='mapPin-container'
              key={Number(attraction.location_id)}
              lng={Number(attraction.longitude)}
              lat={Number(attraction.latitude)}
            >
              <TbMapPin></TbMapPin>
            </div>
          ))}
          {/* TbMapPin */}
        </GoogleMapReact>
      </motion.div>
      {/* ================================================ */}
      <motion.div
        initial={{ x: innerWidth + 1000 }}
        //  innerWidth of window + with of div
        animate={{ x: 0 }}
        exit={{ x: innerWidth + 1000 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <AttractionsSection />
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
