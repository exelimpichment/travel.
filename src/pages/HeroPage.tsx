import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import imgVertical from '../assets/mntn_vertical.jpg';
import imgHorizontal from '../assets/mntn_horizontal.jpg';
import GoogleLoginButton from '../components/UI/GoogleLoginButton';
import FacebookLoginButton from '../components/UI/FacebookLoginButton';
import { AnimatePresence } from 'framer-motion';
import { useAuthState, auth } from '../firebase/firebaseConfig';
import { motion } from 'framer-motion';
import { useAppDispatch } from '../hooks/reduxHooks';
import { setCurrentUser, User } from '../features/NewJourney/NewJourneySlice';
import {
  collectionGroup,
  query,
  doc,
  setDoc,
  getDocs,
  where,
} from 'firebase/firestore';

import { db } from '../firebase/firebaseConfig';

function HeroPage() {
  const dispatch = useAppDispatch();
  const [user, loading, error] = useAuthState(auth);
  console.log({ user }, { loading }, { error });

  useEffect(() => {
    if (user) {
      const { displayName, email, photoURL, uid } = user;
      dispatch(setCurrentUser({ displayName, email, photoURL, uid }));
      const addUserToDb = async () => {
        await setDoc(doc(db, 'users', `${uid}`), {
          displayName,
          email,
          photoURL,
          uid,
          friends: [uid],
          detailedFriendsList: [],
        });
      };
      addUserToDb();
    } else {
      console.log('no user');
    }
  }, [user]);

  // useEffect(() => {
  //   console.log('1');

  //   const getBookmarks = async () => {
  //     console.log('2');
  //     const testt = query(
  //       collectionGroup(db, 'bookmarks'),
  //       where('type', '==', 'test')
  //     );
  //     console.log('3');
  //     const querySnapshot = await getDocs(testt);
  //     console.log('4');
  //     querySnapshot.forEach((doc) => console.log(doc.data()));
  //   };
  //   getBookmarks();
  //   console.log('5');
  // }, []);

  const [toggleNavbarOpen, setToggleNavbarOpen] = useState(false);

  return (
    <Wrapper>
      <div className='container'>
        <motion.div
          key='centrePiece'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='centrePiece'
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <div className='text-container'>
              <h1>Travel.</h1>
              <p>Small app with</p>
              <p>big heart</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          key='buttons'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='centrePiece'
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <GoogleLoginButton />
          <FacebookLoginButton />
        </motion.div>
      </div>
    </Wrapper>
  );
}

export default HeroPage;

const Wrapper = styled.main`
  /* position: relative; */

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: url(${imgVertical});
    height: 100vh;
    width: 100vw;
    align-self: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;

    .menuToggle {
      position: absolute;
      left: 20px;
      top: 20px;
      font-size: 3.5rem;
    }

    .centrePiece {
      transform: translateY(10vh);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .text-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    }

    h1 {
      margin: 0;
      color: var(--mainBlack);
      font-family: var(--mainFont);
      font-size: 2.8rem;
      line-height: 4rem;
    }

    p {
      color: var(--mainBlack);
      font-family: var(--secondaryFont);
      font-size: 1.35rem;
      line-height: 1.7rem;
    }

    @media (min-width: 490px) {
      background-image: url(${imgHorizontal});
    }
  }
`;
