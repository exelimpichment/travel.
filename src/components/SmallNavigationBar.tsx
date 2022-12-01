import React from 'react';
import styled from 'styled-components';
import { setCarouselView } from '../features/NewJourney/NewJourneySlice';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { smallLinks } from '../utilities/smallLinks';

function SmallNavigationBar() {
  const {
    newJourney: { allPlacesShown },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  return (
    <Wrapper>
      {smallLinks.map((link) => (
        <button
          // disabled={link.disabled}
          key={link.id}
          type='button'
          className='button'
          onClick={() => dispatch(setCarouselView())}
        >
          {link.text}
        </button>
      ))}
    </Wrapper>
  );
}

export default SmallNavigationBar;

const Wrapper = styled.div`
  display: flex;
  color: rgba(242, 242, 243, 255);
  padding-right: 15px;
  font-family: var(--secondaryFont);
  font-size: 1.1rem;
  .button {
    padding-left: 1.5rem;
    &:hover {
      color: #46bcec;
      transition: all 0.3s ease-in-out;
    }
  }
`;
