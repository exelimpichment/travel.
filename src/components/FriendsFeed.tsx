import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useAppSelector } from '../hooks/reduxHooks';

function FriendsFeed() {
  const {
    friends: { searchedFriend },
  } = useAppSelector((state) => state);

  return (
    <Wrapper>
      {/* <h1>lol</h1>
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
      <h1>lol</h1> */}
      <div className='empty-feed-container'>
        <h1 className='empty-feed'>Your feed is empty</h1>
      </div>
    </Wrapper>
  );
}

export default FriendsFeed;

const Wrapper = styled(motion.div)`
  overflow: scroll;
  width: 85%;
  display: flex;
  flex-direction: column;
  opacity: 1;

  .empty-feed-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .empty-feed {
    font-family: var(--secondaryFont);
    color: rgba(0, 0, 0, 0.5);
  }
`;
