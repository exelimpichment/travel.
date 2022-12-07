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
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { setBookmarks } from '../features/Bookmarks/BookmarksSlice';

function Bookmarks() {
  // let bookmarksArray: object[] = [];
  let lastVisibleBookmark: any;

  const {
    bookMarks: { bookmarks },
  } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  let getBookmarks = async () => {
    const firstLoading = query(
      collection(db, 'users', 'nsidPuwRICdck5LhWHg9WBg0Z383', 'bookmarks'),
      orderBy('createdAt'),
      limit(5)
    );
    const querySnapshot = await getDocs(firstLoading);
    let fetchedBookmarks: object[] = [];
    querySnapshot.forEach((doc) => {
      let docId = doc.id;
      const {
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
    // console.log('test');
    dispatch(setBookmarks(fetchedBookmarks));
    lastVisibleBookmark = querySnapshot.docs[querySnapshot.docs.length - 1];
    // bookmarksArray = fetchedBookmarks;
  };

  useEffect(() => {
    getBookmarks();
  }, []);

  // =========== scroll logic ===========

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (e: Event) => {
    const target = e.target as HTMLDivElement;

    if (target.scrollHeight - (target.scrollTop + window.innerHeight) < 100) {
      console.log(bookmarks);

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

  // ===================== ADDITIONAL BOOKMARKS' FETCH===========================================

  let getAdditionalBookmark = async (bookmarks: any) => {
    const additionalLoading = query(
      collection(db, 'users', 'nsidPuwRICdck5LhWHg9WBg0Z383', 'bookmarks'),
      orderBy('createdAt'),
      startAfter(lastVisibleBookmark),
      limit(5)
    );
    const querySnapshot = await getDocs(additionalLoading);
    let newlyFetchedBookmarks: object[] = [];
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, ' => ', doc.data());
      const {
        displayName,
        docID,
        email,
        latitude,
        location_id,
        longitude,
        photo,
        photoURL,
        uid,
      } = doc.data();
      newlyFetchedBookmarks.push({
        displayName,
        docID,
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
    return newlyFetchedBookmarks;
    // dispatch(setBookmarks(newlyFetchedBookmarks));
  };

  let arr = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];

  return (
    <Wrapper ref={scrollRef}>
      Bookmarks
      {arr.map((item, i) => (
        <h1 key={i}>lol</h1>
      ))}
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
  margin-left: 3rem;
  border-radius: 3rem 0 0 3rem;
`;
