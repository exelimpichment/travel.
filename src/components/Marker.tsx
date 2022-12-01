import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../hooks/reduxHooks';
import { motion, AnimatePresence } from 'framer-motion';

// I spent two day looking for
// solution (when I remove "any"
// type)  and I was not able to
// figure out how to solve this

function Marker(props: any) {
  let { attraction } = props;

  const {
    newJourney: { locationIdArr, allPlacesShown },
  } = useAppSelector((state) => state);

  return (
    <AnimatePresence>
      {(!allPlacesShown &&
        !locationIdArr?.includes(attraction.location_id)) || (
        <Wrapper>
          <div className='pin-container'>
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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
      )}
    </AnimatePresence>
  );
}

export default Marker;

const Wrapper = styled.div`
  height: 60px;
  width: 60px;

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

// style={
//   !allPlacesShown && !locationIdArr?.includes(attraction.location_id)
//     ? { display: 'none' }
//     : {}
// }
