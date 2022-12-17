import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import {
  setFriendsScrollBarOpen,
  setSearchedFriend,
  setSearchWindowOpen,
} from '../../features/Friends/FriendsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { IFriend } from '../../features/Friends/FriendsSlice';
import { User } from '../../features/NewJourney/NewJourneySlice';

function SearchedFriend() {
  const dispatch = useAppDispatch();
  const {
    newJourney: { currentUser },
    friends: { searchWindowOpen, userSearch, searchedFriend },
  } = useAppSelector((state) => state);

  const addFriend = async () => {
    dispatch(setSearchedFriend(null));
    dispatch(setSearchWindowOpen()),
      setTimeout(() => {
        dispatch(setFriendsScrollBarOpen());
      }, 600);
    //  ======= ADDING FRIEND TO MY LIST ========
    // doc(
    //           db,
    //           'users',
    //           `${currentUser?.uid}`,
    //           'userFriends',
    //           'detailedUsersList'
    //           ),

    if (searchedFriend !== null) {
      let tempFriend: IFriend = {
        photoURL: searchedFriend.photoURL,
        uid: searchedFriend.uid,
        email: searchedFriend.email,
        displayName: searchedFriend.displayName,
      };

      await updateDoc(
        doc(
          db,
          'users',
          `${currentUser?.uid}`,
          'userFriends',
          'detailedUsersList'
        ),
        {
          friendsList: arrayUnion(searchedFriend.uid),
        }
      );
      await updateDoc(
        doc(
          db,
          'users',
          `${currentUser?.uid}`,
          'userFriends',
          'detailedUsersList'
        ),
        {
          detailedFriends: arrayUnion(tempFriend),
        }
      );
    }

    //  ======= ADDING ME TO FRIEND LIST ========

    if (currentUser !== null && searchedFriend !== null) {
      let tempCurrentUser: User = {
        photoURL: currentUser.photoURL,
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: currentUser.displayName,
      };

      await updateDoc(
        doc(
          db,
          'users',
          `${searchedFriend.uid}`,
          'userFriends',
          'detailedUsersList'
        ),
        {
          friends: arrayUnion(currentUser?.uid),
        }
      );
      await updateDoc(
        doc(
          db,
          'users',
          `${searchedFriend.uid}`,
          'userFriends',
          'detailedUsersList'
        ),
        {
          detailedFriendsList: arrayUnion(tempCurrentUser),
        }
      );
    }
  };

  return (
    <Wrapper
      initial={{ opacity: 0, y: -70 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className='user-container'>
        <img src={searchedFriend?.photoURL} alt={searchedFriend?.displayName} />
        <div className='text-section'>
          <p>{searchedFriend?.displayName}</p>
          <p>{searchedFriend?.email}</p>
        </div>
      </div>
      <div className='btn-container'>
        <button type='button' onClick={addFriend}>
          add
        </button>
      </div>
    </Wrapper>
  );
}

export default SearchedFriend;

const Wrapper = styled(motion.div)`
  position: absolute;
  top: 90px;
  width: 85%;
  height: 64px;
  background-color: rgba(0, 0, 0);
  border-top-left-radius: 32px 32px;
  border-bottom-left-radius: 32px 32px;
  border-top-right-radius: 32px 32px;
  border-bottom-right-radius: 32px 32px;
  /* margin-top: -5px; */

  /* padding: 2px 10px 2px 0px; */

  .btn-container {
    margin-right: 1rem;
    font-size: 1.2rem;
    font-family: var(--secondaryFont);

    &:hover {
      color: #46bcec;
      transition: all 0.3s ease-in-out;
      font-size: 1.3rem;
    }
  }

  display: flex;
  justify-content: space-between;
  align-items: center;

  .user-container {
    display: flex;

    .text-section {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      font-family: var(--secondaryFont);
    }
  }

  img {
    border-radius: 50%;
    height: 64px;
    margin-right: 1rem;
  }
`;
