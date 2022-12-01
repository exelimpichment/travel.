import React, { useEffect } from 'react';
import { TbMapPin } from 'react-icons/tb';
import styled from 'styled-components';
import { Attraction } from '../features/NewJourney/NewJourneySlice';
import { useAppSelector } from '../hooks/reduxHooks';

// I spent two day looking for
// solution (when I remove "any"
// type)  and I was not able to
// figure out how to solve this

function Marker(props: any) {
  // console.log(props.props);
  let { attraction } = props;
  // console.log(attraction);

  const {
    newJourney: { locationIdArr, allPlacesShown },
  } = useAppSelector((state) => state);

  useEffect(() => {
    // console.log(
    //   locationsId?.includes(attraction.location_id),
    //   attraction.location_id,
    //   { locationsId }
    // );
    console.log('test');
  }, []);

  return (
    // <Wrapper>
    <Wrapper
      style={
        !allPlacesShown && !locationIdArr?.includes(attraction.location_id)
          ? { display: 'none' }
          : {}
      }
    >
      <div className='pin-container'>
        {/* {attraction?.photo?.images?.medium?.url ? } */}

        <img
          style={
            locationIdArr?.includes(attraction.location_id)
              ? { border: '3px solid #46bcec ' }
              : {}
          }
          src={attraction?.photo?.images?.medium?.url}
          alt={attraction?.name}
        />
      </div>
    </Wrapper>
  );
}

export default Marker;

const Wrapper = styled.div`
  height: 60px;
  width: 60px;
  /* display: none; */
  /* background-color: red; */

  .pin-container {
    font-size: 2rem;

    img {
      transform: translate(-50%, -50%);
      position: absolute;
      height: 60px;
      width: 60px;
      border-radius: 50%;
      border: 1.5px solid #444444;
      cursor: pointer;
      /* display: none; */

      &:hover {
        height: 70px;
        width: 70px;
        transition: all 0.3s ease-out;
        border: 2px solid #46bcec;
        z-index: 2;
      }
    }
  }
`;
