import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAppSelector } from '../../hooks/reduxHooks';

function UserSearch() {
  const {
    friends: { searchWindowOpen },
  } = useAppSelector((state) => state);

  return (
    <Wrapper
      initial={{ width: 64 }}
      animate={{ width: '100%' }}
      exit={{ width: 64 }}
      transition={{ duration: 0.6 }}
    >
      <input type='text' />
    </Wrapper>
  );
}

export default UserSearch;

const Wrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  height: 64px;
  border-top-left-radius: 32px 32px;
  border-bottom-left-radius: 32px 32px;
  border-top-right-radius: 32px 32px;
  border-bottom-right-radius: 32px 32px;

  /* width: 600px; */

  input {
    height: 70%;
    width: 90%;
    width: 85%;

    border: none;
    appearance: none;
    background-color: transparent;
    color: #ffffff;

    padding: 5px;
    font-family: var(--secondaryFont);
    font-size: 1.4rem;

    /* border-bottom: 1px solid #ffffff; */

    &::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: white;
      opacity: 1; /* Firefox */
    }
  }
`;
