import styled from 'styled-components';
import { HiOutlinePlusSm } from 'react-icons/hi';
import {
  setFriendsScrollBarOpen,
  setSearchedFriend,
  setSearchWindowOpen,
} from '../../features/Friends/FriendsSlice';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { toast } from 'react-toastify';

function All_AddUser_Button() {
  const dispatch = useAppDispatch();
  const {
    friends: { searchWindowOpen, friendsScrollBarOpen },
    newJourney: { currentUser },
    bookMarks: { bookmarks },
  } = useAppSelector((state) => state);

  let swapScrollbarSearch = () => {
    dispatch(setSearchedFriend(null));
    friendsScrollBarOpen
      ? (dispatch(setFriendsScrollBarOpen()),
        setTimeout(() => {
          dispatch(setSearchWindowOpen());
        }, 450))
      : (dispatch(setSearchWindowOpen()),
        setTimeout(() => {
          dispatch(setFriendsScrollBarOpen());
        }, 600));
  };

  return (
    <Wrapper>
      <div
        className='all-users-placeholder-left'
        // onClick={() => {console.log('click');}}
      >
        <h2>All</h2>
      </div>

      <div
        className='all-users-placeholder-right'
        onClick={() => {
          currentUser
            ? swapScrollbarSearch()
            : toast.info('You have to log in', {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
        }}
      >
        <HiOutlinePlusSm
          style={
            searchWindowOpen
              ? { transform: 'rotate(135deg)' }
              : { transform: 'rotate(0deg)' }
          }
        ></HiOutlinePlusSm>
      </div>
    </Wrapper>
  );
}

export default All_AddUser_Button;

const Wrapper = styled(motion.div)`
  display: flex;
  .all-users-placeholder-left {
    border-left: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: center;

    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    height: 64px;
    border-top-left-radius: 32px 32px;
    border-bottom-left-radius: 32px 32px;
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, 0.7);
    }

    h2 {
      width: 32px;
      font-family: var(--secondaryFont);
      text-align: center;
    }
  }

  .all-users-placeholder-right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-left: 1px solid black;

    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    height: 64px;
    border-top-right-radius: 32px 32px;
    border-bottom-right-radius: 32px 32px;
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, 0.7);
    }

    svg {
      font-size: 1.6rem;
      width: 32px;
      font-family: var(--secondaryFont);
      text-align: center;
      transition: all 0.4s linear;
    }
  }
`;
