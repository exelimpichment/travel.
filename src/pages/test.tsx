import { useEffect, useRef, useState, useMemo } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import {
  collection,
  getDocs,
  query,
  doc,
  getDoc,
  where,
  limit,
  startAfter,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { setBookmarks } from '../features/Bookmarks/BookmarksSlice';
import Bookmark from '../components/Bookmark';

function Bookmarks() {
  const {
    newJourney: { currentUser },
    bookMarks: { bookmarks },
  } = useAppSelector((state) => state);
  let lastVisibleBookmark: any;

  const dispatch = useAppDispatch();

  // MAKE FIRST QUERRY =========

  let getBookmarks = async () => {
    console.log(currentUser);

    const firstLoading = query(
      collection(db, 'users', `${currentUser?.uid}`, 'bookmarks'),
      orderBy('createdAt'),
      limit(9)
    );

    const unsubscribe = onSnapshot(firstLoading, (querySnapshot) => {
      const fetchedBookmarks: object[] = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, ' => ', doc.data());
        let docId = doc.id;
        const {
          name,
          displayName,
          email,
          latitude,
          location_id,
          longitude,
          photo,
          photoURL,
          uid,
        } = doc.data();
        fetchedBookmarks.push({
          name,
          displayName,
          docId,
          email,
          latitude,
          location_id,
          longitude,
          photo,
          photoURL,
          uid,
        });
      });
      console.log('render');
      dispatch(setBookmarks(fetchedBookmarks));
      lastVisibleBookmark = querySnapshot.docs[querySnapshot.docs.length - 1];
    });
  };

  useEffect(() => {
    getBookmarks();
  }, []);

  // ===================== ADDITIONAL BOOKMARKS' FETCH===========================================

  let getAdditionalBookmark = async (bookmarks: any) => {
    console.log('inside', bookmarks);

    const followingLoadings = query(
      collection(db, 'users', `${currentUser?.uid}`, 'bookmarks'),
      orderBy('createdAt'),
      startAfter(lastVisibleBookmark),
      limit(9)
    );

    const querySnapshot = await getDocs(followingLoadings);
    let newlyFetchedBookmarks: object[] = [];
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, ' => ', doc.data());
      let docId = doc.id;
      const {
        name,
        displayName,
        email,
        latitude,
        location_id,
        longitude,
        photo,
        photoURL,
        uid,
      } = doc.data();
      newlyFetchedBookmarks.push({
        name,
        displayName,
        docId,
        email,
        latitude,
        location_id,
        longitude,
        photo,
        photoURL,
        uid,
      });
    });
    console.log(bookmarks, '!!!!!!');
    console.log(newlyFetchedBookmarks);
    let arr: any = bookmarks.concat(newlyFetchedBookmarks);
    console.log(arr);
    //   return newlyFetchedBookmarks;

    dispatch(setBookmarks(arr));
  };
  // =========== scroll logic ===========

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (e: Event) => {
    const target = e.target as HTMLDivElement;

    if (target.scrollHeight - (target.scrollTop + window.innerHeight) < 100) {
      console.log('load next batch');
      getAdditionalBookmark(bookmarks);
    }
  };

  useEffect(() => {
    if (scrollRef.current !== null)
      scrollRef.current.addEventListener('scroll', handleScroll);
    return function () {
      if (scrollRef.current !== null)
        scrollRef.current.removeEventListener('scroll', handleScroll);
    };
  }, []);
  // =========== scroll logic ===========

  return (
    <Wrapper ref={scrollRef}>
      <div className='flex-container'>
        {bookmarks?.map((bookmark) => (
          <Bookmark key={bookmark.location_id} bookmark={bookmark}></Bookmark>
        ))}
      </div>
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
      <h1>lol</h1>
      <h1>lol</h1> */}
    </Wrapper>
  );
}

export default Bookmarks;

const Wrapper = styled.div`
  overflow: scroll;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  height: 100vh;
  width: 40vw;
  border-radius: 3rem 0 0 3rem;

  .flex-container {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-gap: 1rem;
    padding: 1rem;
    margin-right: 1rem;
    cursor: pointer;

    /* grid-template-rows: 12px 12px ; */
  }
`;
