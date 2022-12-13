import { AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import styled from 'styled-components';
import FriendsScrollBar from '../components/UI/FriendsScrollBar';
import SearchedFriend from '../components/UI/SearchedFriend';
import { setSearchWindowOpen } from '../features/Friends/FriendsSlice';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';

function Friends() {
  const dispatch = useAppDispatch();

  const {
    friends: { searchedFriend },
    newJourney: { currentUser },
    bookMarks: { bookmarks },
  } = useAppSelector((state) => state);

  return (
    <Wrapper>
      <FriendsScrollBar />
      <AnimatePresence>{searchedFriend && <SearchedFriend />}</AnimatePresence>
    </Wrapper>
  );
}

export default Friends;

const Wrapper = styled.div`
  padding: 20px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  /* display: flex; */
  /* flex-direction: column; */
  /* align-items: center; */
  /* justify-content: space-around; */
  height: 100vh;
  width: 40vw;

  border-radius: 3rem 0 0 3rem;
`;
