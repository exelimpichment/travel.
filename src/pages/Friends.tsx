import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import FriendsFeed from '../components/FriendsFeed';
import FriendsScrollBar from '../components/UI/FriendsScrollBar';
import SearchedFriend from '../components/UI/SearchedFriend';
import { setSearchWindowOpen } from '../features/Friends/FriendsSlice';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
// import { initiateFriendsArr } from '../utilities/friednsArrInnit';

function Friends() {
  const dispatch = useAppDispatch();

  const {
    friends: { searchedFriend },
    newJourney: { currentUser },
    bookMarks: { bookmarks },
  } = useAppSelector((state) => state);

  useEffect(() => {
    // initiateFriendsArr();
  }, [currentUser]);

  return (
    <Wrapper>
      <FriendsScrollBar />
      <AnimatePresence>{searchedFriend && <SearchedFriend />}</AnimatePresence>
      {/* <AnimatePresence>{searchedFriend && <SearchedFriend />}</AnimatePresence> */}
      <FriendsFeed />
    </Wrapper>
  );
}

export default Friends;

const Wrapper = styled.div`
  position: relative;
  padding: 20px 0 20px 0;
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
  transition: all 0.5s linear;
  border-radius: 3rem 0 0 3rem;
  -webkit-transition: all 0.7s ease-out;
  -moz-transition: all 0.7s ease-out;
  -ms-transition: all 0.7s ease-out;
  -o-transition: all 0.7s ease-out;
  transition: all 0.7s ease-out;
  margin-bottom: 1rem;
`;
