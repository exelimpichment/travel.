import React from 'react';
import styled from 'styled-components';
import { AiFillMinusCircle } from 'react-icons/ai';
import { AiFillPlusCircle } from 'react-icons/ai';
import { ActionCreator } from '@reduxjs/toolkit';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { setZoom } from '../../../src/features/NewJourney/NewJourneySlice';

function ZoomButton() {
  const dispatch = useAppDispatch();

  const {
    newJourney: { zoom },
  } = useAppSelector((state) => state);

  return (
    <Wrapper>
      <div className='buttons-container'>
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
  bottom: 1.5rem;
  left: 1.5rem;

  .buttons-container {
    justify-content: space-between;
    font-size: 2.2rem;
    display: flex;
    flex-direction: column;
    color: #444444;
    height: 5rem;

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
