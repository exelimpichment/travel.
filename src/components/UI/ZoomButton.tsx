import styled from 'styled-components';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import {
  setCoordinates,
  setFindMeZoom,
  setZoom,
} from '../../../src/features/NewJourney/NewJourneySlice';
import { RiUserLocationFill } from 'react-icons/ri';
import { FiLoader } from 'react-icons/fi';
import { BiLoaderCircle } from 'react-icons/bi';
import { useState } from 'react';

function ZoomButton() {
  const [loading, setLoading] = useState(false);
  const [deg, setDeg] = useState(0);
  const dispatch = useAppDispatch();

  const {
    newJourney: { zoom },
  } = useAppSelector((state) => state);

  const refreshGeolocation = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition((coords: GeolocationPosition) => {
      dispatch(
        setCoordinates({
          lat: coords.coords.latitude,
          lng: coords.coords.longitude,
        })
      );
      setLoading(false);
      dispatch(setFindMeZoom(12));
    });
  };

  return (
    <Wrapper>
      <div className='buttons-container'>
        <button className='myLocation' onClick={() => refreshGeolocation()}>
          {loading ? <BiLoaderCircle /> : <RiUserLocationFill />}
        </button>
        <button
          className='btn'
          type='button'
          onClick={() => {
            dispatch(setZoom('increment'));
          }}
        >
          <AiFillPlusCircle></AiFillPlusCircle>
        </button>
        <button
          className='btn'
          type='button'
          onClick={() => {
            dispatch(setZoom('decrement'));
          }}
        >
          <AiFillMinusCircle></AiFillMinusCircle>
        </button>
      </div>
    </Wrapper>
  );
}

export default ZoomButton;

const Wrapper = styled.nav`
  position: absolute;
  z-index: 1000;
  bottom: 2.5rem;
  left: 1.5rem;

  .myLocation {
    transition: all 0.1s linear;
    z-index: 1000;
    bottom: 1.5rem;

    cursor: pointer;

    svg {
      z-index: 1000;
      font-size: 2.2rem;
      color: #444444;
    }
  }

  .buttons-container {
    justify-content: space-between;
    font-size: 2.2rem;
    display: flex;
    flex-direction: column;
    color: #444444;
    height: 8rem;

    .btn {
      height: 2.2rem;
    }

    svg {
      &:hover {
        color: #46bcec;
        transition: all 0.3s ease-in-out;
      }
    }
  }
`;
