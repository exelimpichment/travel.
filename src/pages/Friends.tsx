import React from 'react';
import styled from 'styled-components';
import tempUser from '../assets/tempUser.jpg';
import { motion, AnimatePresence } from 'framer-motion';

function Friends() {
  return (
    <Wrapper>
      <div className='motion.container'>
        <div className='carousel'></div>
        <img src={tempUser} alt='' />
        <img src={tempUser} alt='' />
        <img src={tempUser} alt='' />
        <img src={tempUser} alt='' />
      </div>
    </Wrapper>
  );
}

export default Friends;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .container {
    background-color: red;
  }
`;
