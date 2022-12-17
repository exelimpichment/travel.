import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { GoSearch } from 'react-icons/go';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import {
  setSearchedFriend,
  setUserSearch,
} from '../../features/Friends/FriendsSlice';
import { toast } from 'react-toastify';

function UserSearch() {
  const dispatch = useAppDispatch();

  const {
    friends: { searchWindowOpen, userSearch, searchedFriend },
  } = useAppSelector((state) => state);

  const searchFriend = (e: React.FormEvent) => {
    // e.preventDefault();
    const getData = async () => {
      const userRef = collection(db, 'users');
      const q = query(userRef, where('email', '==', `${userSearch}`));
      const querySnapshot = await getDocs(q);
      let user;
      querySnapshot.forEach((doc) => {
        user = { ...doc.data(), docId: doc.id };
      });
      user
        ? dispatch(setSearchedFriend(user))
        : toast.warning('No User found', {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
    };
    getData();

    dispatch(setUserSearch(''));
  };

  return (
    <Wrapper
      initial={{ width: 64 }}
      animate={{ width: '100%' }}
      exit={{ width: 64 }}
      transition={{ duration: 0.6 }}
    >
      <input
        type='text'
        autoFocus
        value={userSearch}
        onChange={(event) => {
          dispatch(setUserSearch(event.target.value));
        }}
      />
      <button type='button' onClick={searchFriend}>
        <GoSearch />
      </button>
    </Wrapper>
  );
}

export default UserSearch;

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  height: 64px;
  border-top-left-radius: 32px 32px;
  border-bottom-left-radius: 32px 32px;
  border-top-right-radius: 32px 32px;
  border-bottom-right-radius: 32px 32px;

  button {
    transform: translateY(2px);
    svg {
      font-size: 1.7rem;
    }

    &:hover {
      color: #46bcec;
      transition: all 0.3s ease-in-out;
    }
  }

  /* width: 600px; */

  input {
    height: 70%;
    width: 80%;
    /* width: 85%; */

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
