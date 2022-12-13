import { BiChevronLeftCircle, BiChevronRightCircle } from 'react-icons/bi';
import styled from 'styled-components';
import {
  BsBookmarkCheckFill,
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from 'react-icons/bs';

function FriendsProfilePictureScroll() {
  const scroll = (scrollOffset: number): void => {
    if (ScrollCarouselY.current !== null)
      ScrollCarouselY.current.scrollLeft += scrollOffset;
  };

  return (
    <Wrapper className='buttons-container'>
      <button type='button' className='btn' onClick={() => scroll(-250)}>
        <BsFillArrowLeftCircleFill />
      </button>
      <button type='button' className='btn' onClick={() => scroll(250)}>
        <BsFillArrowRightCircleFill />
      </button>
    </Wrapper>
  );
}

export default FriendsProfilePictureScroll;

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  right: 10px;

  svg {
    font-size: 2rem;
  }
`;
