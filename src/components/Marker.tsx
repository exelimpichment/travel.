import React from 'react';
import { TbMapPin } from 'react-icons/tb';
import styled from 'styled-components';
import { Attraction } from '../features/NewJourney/NewJourneySlice';

// I spent two day looking for
// solution (when I remove "any"
// type)  and I was not able to
// figure out how to solve this

function Marker(props: any) {
  // console.log(props.props);
  let { attraction } = props;

  return (
    <Wrapper>
      <div className='pin-container' onClick={() => console.log('click')}>
        {/* {attraction?.photo?.images?.medium?.url ? } */}

        <img
          src={attraction?.photo?.images?.medium?.url}
          alt={attraction?.name}
        />
      </div>
    </Wrapper>
  );
}

export default Marker;

const Wrapper = styled.div`
  &:hover {
    z-index: 555555 !important;
  }
  .pin-container {
    z-index: 998;
    font-size: 2rem;
    img {
      height: 60px;
      width: 60px;
      border-radius: 50%;
      border: 1.5px solid #444444;
      cursor: pointer;

      &:hover {
        height: 70px;
        width: 70px;
        transition: all 0.3s ease-out;

        border: 2px solid #46bcec;
      }
    }

    &:hover {
      z-index: 555555 !important;
    }
  }
`;
