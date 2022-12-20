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
  const dispatch = useAppDispatch();
  const {
    newJourney: { currentUser },
    bookMarks: { bookmarks },
  } = useAppSelector((state) => state);

  const [test, setTest] = useState(true);

  // MAKE FIRST QUERRY =========

  let getBookmarks = async () => {
    const firstLoading = query(
      collection(db, 'users', `${currentUser?.uid}`, 'bookmarks'),
      orderBy('createdAt'),
      limit(6)
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
      // console.log(fetchedBookmarks);
      // lastBookmarksBatchRef.current = [...fetchedBookmarks];
      // dispatch(setBookmarks(lastBookmarksBatchRef.current));
      dispatch(setBookmarks(fetchedBookmarks));
      // lastBookmarksBatchRef = querySnapshot.docs[querySnapshot.docs.length - 1];
      setTest(querySnapshot.docs[querySnapshot.docs.length - 1]);
    });
  };

  useEffect(() => {
    getBookmarks();
  }, []);

  // ===================== ADDITIONAL BOOKMARKS' FETCH===========================================

  let getAdditionalBookmark = async () => {
    const followingLoadings = query(
      collection(db, 'users', `${currentUser?.uid}`, 'bookmarks'),
      orderBy('createdAt'),
      startAfter(test),
      limit(6)
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
    // lastBookmarksBatchRef = querySnapshot.docs[querySnapshot.docs.length - 1];
    // setTest(querySnapshot.docs[querySnapshot.docs.length - 1]);

    let all = new Set([...bookmarks, ...newlyFetchedBookmarks]);
    console.log(all);
    return querySnapshot.docs[querySnapshot.docs.length - 1];

    // dispatch(setBookmarks(all));
  };
  // =========== scroll logic ===========

  // =========== scroll logic ===========

  return (
    <Wrapper>
      <button
        type='button'
        onClick={() =>
          getAdditionalBookmark().then((resp) => {
            setTest(resp);
          })
        }
      >
        load new
      </button>
      <div className='flex-container'>
        {bookmarks?.map((bookmark) => (
          <Bookmark key={bookmark.location_id} bookmark={bookmark}></Bookmark>
        ))}
      </div>
    </Wrapper>
  );
}

export default Bookmarks;

const Wrapper = styled.div`
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
  }
`;
