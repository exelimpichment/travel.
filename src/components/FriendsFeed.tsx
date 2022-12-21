import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { setFriendsFeedArr } from '../features/Friends/FriendsSlice';
import { db } from '../firebase/firebaseConfig';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import FeedItem from './FeedItem';

interface IFriendsFeed {
  displayName: string;
  email: string;
  friends: string[];
  latitude: string;
  likes: string[];
  location_id: string;
  longitude: string;
  name: string;
  photo: string;
  photoURL: string;
  uid: string;
  docID: string;
  comments: object[];
}

function FriendsFeed() {
  const dispatch = useAppDispatch();
  const {
    friends: { friendsFeedArr },
  } = useAppSelector((state) => state);

  const getFeed = async () => {
    console.log('get feed');

    const querySnapshot = await getDocs(collection(db, 'feed'));
    let friendsFeed: IFriendsFeed[] = [];
    querySnapshot.forEach((doc) => {
      let docID = doc.id;
      const {
        displayName,
        email,
        friends,
        latitude,
        likes,
        location_id,
        longitude,
        name,
        photo,
        photoURL,
        uid,
        comments,
        // i do not need createdAt field
      } = doc.data();
      friendsFeed.push({
        displayName,
        email,
        friends,
        latitude,
        likes,
        location_id,
        longitude,
        name,
        photo,
        photoURL,
        uid,
        docID,
        comments,
      });
    });
    console.log(friendsFeed);
    dispatch(setFriendsFeedArr(friendsFeed));
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <Wrapper>
      {friendsFeedArr.length > 1 ? (
        friendsFeedArr.map((friend) => <FeedItem friend={friend}></FeedItem>)
      ) : (
        <div className='empty-feed-container'>
          <h1 className='empty-feed'>Your feed is empty</h1>
        </div>
      )}
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
