import styled from 'styled-components';
import { setCarouselView } from '../features/NewJourney/NewJourneySlice';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';

function SmallNavigationBar() {
  const {
    newJourney: { allPlacesShown },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  return (
    <Wrapper>
      <button
        disabled={allPlacesShown}
        type='button'
        className='button'
        onClick={() => dispatch(setCarouselView())}
      >
        All places
      </button>
      <button
        disabled={!allPlacesShown}
        type='button'
        className='button'
        onClick={() => dispatch(setCarouselView())}
      >
        Bookmarks
      </button>
    </Wrapper>
  );
}

export default SmallNavigationBar;

const Wrapper = styled.div`
  display: flex;
  color: rgba(242, 242, 243, 255);
  padding-right: 15px;
  font-family: var(--secondaryFont);
  font-size: 1.2rem;
  font-weight: 500;
  .button {
    padding-left: 1.5rem;
    &:hover {
      color: #46bcec;
      transition: all 0.3s ease-in-out;
    }
    &:disabled {
      color: #46bcec;
      transition: all 0.3s ease-in-out;
    }
  }
`;
