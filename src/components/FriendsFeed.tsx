import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../firebase/firebaseConfig';
import { useAppSelector } from '../hooks/reduxHooks';
import FeedItem from './FeedItem';

function FriendsFeed() {
  const {
    friends: { searchedFriend },
  } = useAppSelector((state) => state);

  const getFeed = async () => {
    const querySnapshot = await getDocs(collection(db, 'feed'));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
    });
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <Wrapper>
      <FeedItem></FeedItem>
      <FeedItem></FeedItem>
      <FeedItem></FeedItem>
      <FeedItem></FeedItem>
      {/* <FeedItem></FeedItem>
      <FeedItem></FeedItem>
      <FeedItem></FeedItem>
      <FeedItem></FeedItem> */}
      {/* <h1>lol</h1>
      <h1>lol</h1>
      <h1>lol</h1>
      <h1>lol</h1>
      <h1>lol</h1>
      <h1>lol</h1>
      <h1>lol</h1>
      <h1>lol</h1>
      <h1>lol</h1>
      <h1>lol</h1>
      <h1>lol</h1>
      <h1>lol</h1>
      <h1>lol</h1>
      <h1>lol</h1>
      <h1>lol</h1>
      <h1>lol</h1>
      <h1>lol</h1>
      <h1>lol</h1>
      <h1>lol</h1>
      <h1>lol</h1> */}
      {/* <div className='empty-feed-container'>
        <h1 className='empty-feed'>Your feed is empty</h1>
      </div> */}
    </Wrapper>
  );
}

export default FriendsFeed;

const Wrapper = styled(motion.div)`
  margin-top: 1rem;
  overflow: scroll;
  width: 85%;
  display: flex;
  flex-direction: column;
  opacity: 1;
  height: 90%;

  &::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }

  .empty-feed-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .empty-feed {
    font-family: var(--secondaryFont);
    color: rgba(0, 0, 0, 0.5);
  }
`;
