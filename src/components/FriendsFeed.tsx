import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useAppSelector } from '../hooks/reduxHooks';

function FriendsFeed() {
  const {
    friends: { searchedFriend },
  } = useAppSelector((state) => state);

  // const tempMove = () => {
  //   setPixel(74);
  // };
  // console.log(`translateY(${pixel})`);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setMovedPosition(!movedPosition);
  //   }, 1300);
  // }, [searchedFriend]);

  return (
    <Wrapper
    // style={{ height: 'calc(10px + 100px)' }}
    // style={{
    //   transform: feedMoved ? `translateY(74px)` : `translateY(0px)`,
    //   transition: 'all 0.3s linear',
    // }}
    >
      {/* <button type='button' onClick={tempMove}>
        click
      </button> */}
      <h1>lol</h1>
      <h1>lol</h1>
      <h1>lol</h1>
      <h1>lol</h1>
      <h1>lol</h1>
      <h1>lol</h1>
      <h1>lol</h1>
      <h1>lol</h1>
      <h1>lol</h1>
      <h1>lol</h1>
      <h1>lol</h1>
      <h1>lol</h1>
      <h1>lol</h1>
      <h1>lol</h1>
      <h1>lol</h1>
      <h1>lol</h1>
      <h1>lol</h1>
      <h1>lol</h1>
      <h1>lol</h1>
      <h1>lol</h1>
    </Wrapper>
  );
}

export default FriendsFeed;

const Wrapper = styled(motion.div)`
  background: #46bcec;
  overflow: scroll;
  width: 85%;
  display: flex;
  flex-direction: column;
  opacity: 1;

  h1 {
    background-color: red;
  }
`;
