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
  // let arrayA = [
  //   {
  //     displayName: 'Mykhailo Kosovan',
  //     docId: 'I8CcgDyMROwHmBMpBmyW',
  //     email: 'oldestspy@gmail.com',
  //     latitude: '52.40791',
  //     location_id: '1',
  //     longitude: '16.9341',
  //     name: 'Old Market Square',
  //     photo:
  //       'https://media-cdn.tripadvisor.com/media/photo-m/1280/13/4d/ad/bb/old-market-square.jpg',
  //     photoURL:
  //       'https://lh3.googleusercontent.com/a/ALm5wu20RKMcrCt6l1jyhWbMNm6lUYZJe_Rqyz8WDS8P0A=s96-c',
  //     uid: 'ucCCwdqk0JbZKhSLTEH4vGtAkuG2',
  //   },
  //   {
  //     displayName: 'Mykhailo Kosovan',
  //     docId: 'I8CcgDyMROwHmBMpBmyW',
  //     email: 'oldestspy@gmail.com',
  //     latitude: '52.40791',
  //     location_id: '2',
  //     longitude: '16.9341',
  //     name: 'Old Market Square',
  //     photo:
  //       'https://media-cdn.tripadvisor.com/media/photo-m/1280/13/4d/ad/bb/old-market-square.jpg',
  //     photoURL:
  //       'https://lh3.googleusercontent.com/a/ALm5wu20RKMcrCt6l1jyhWbMNm6lUYZJe_Rqyz8WDS8P0A=s96-c',
  //     uid: 'ucCCwdqk0JbZKhSLTEH4vGtAkuG2',
  //   },
  //   {
  //     displayName: 'Mykhailo Kosovan',
  //     docId: 'I8CcgDyMROwHmBMpBmyW',
  //     email: 'oldestspy@gmail.com',
  //     latitude: '52.40791',
  //     location_id: '6',
  //     longitude: '16.9341',
  //     name: 'Old Market Square',
  //     photo:
  //       'https://media-cdn.tripadvisor.com/media/photo-m/1280/13/4d/ad/bb/old-market-square.jpg',
  //     photoURL:
  //       'https://lh3.googleusercontent.com/a/ALm5wu20RKMcrCt6l1jyhWbMNm6lUYZJe_Rqyz8WDS8P0A=s96-c',
  //     uid: 'ucCCwdqk0JbZKhSLTEH4vGtAkuG2',
  //   },
  //   // {
  //   //   displayName: 'Mykhailo Kosovan',
  //   //   docId: 'I8CcgDyMROwHmBMpBmyW',
  //   //   email: 'oldestspy@gmail.com',
  //   //   latitude: '52.40791',
  //   //   location_id: '7',
  //   //   longitude: '16.9341',
  //   //   name: 'Old Market Square',
  //   //   photo:
  //   //     'https://media-cdn.tripadvisor.com/media/photo-m/1280/13/4d/ad/bb/old-market-square.jpg',
  //   //   photoURL:
  //   //     'https://lh3.googleusercontent.com/a/ALm5wu20RKMcrCt6l1jyhWbMNm6lUYZJe_Rqyz8WDS8P0A=s96-c',
  //   //   uid: 'ucCCwdqk0JbZKhSLTEH4vGtAkuG2',
  //   // },
  //   // {
  //   //   displayName: 'Mykhailo Kosovan',
  //   //   docId: 'I8CcgDyMROwHmBMpBmyW',
  //   //   email: 'oldestspy@gmail.com',
  //   //   latitude: '52.40791',
  //   //   location_id: '5',
  //   //   longitude: '16.9341',
  //   //   name: 'Old Market Square',
  //   //   photo:
  //   //     'https://media-cdn.tripadvisor.com/media/photo-m/1280/13/4d/ad/bb/old-market-square.jpg',
  //   //   photoURL:
  //   //     'https://lh3.googleusercontent.com/a/ALm5wu20RKMcrCt6l1jyhWbMNm6lUYZJe_Rqyz8WDS8P0A=s96-c',
  //   //   uid: 'ucCCwdqk0JbZKhSLTEH4vGtAkuG2',
  //   // },
  // ];

  // let arrayB = [
  //   {
  //     displayName: 'Mykhailo Kosovan',
  //     docId: 'I8CcgDyMROwHmBMpBmyW',
  //     email: 'oldestspy@gmail.com',
  //     latitude: '52.40791',
  //     location_id: '5',
  //     longitude: '16.9341',
  //     name: 'Old Market Square',
  //     photo:
  //       'https://media-cdn.tripadvisor.com/media/photo-m/1280/13/4d/ad/bb/old-market-square.jpg',
  //     photoURL:
  //       'https://lh3.googleusercontent.com/a/ALm5wu20RKMcrCt6l1jyhWbMNm6lUYZJe_Rqyz8WDS8P0A=s96-c',
  //     uid: 'ucCCwdqk0JbZKhSLTEH4vGtAkuG2',
  //   },
  //   {
  //     displayName: 'Mykhailo Kosovan',
  //     docId: 'I8CcgDyMROwHmBMpBmyW',
  //     email: 'oldestspy@gmail.com',
  //     latitude: '52.40791',
  //     location_id: '4',
  //     longitude: '16.9341',
  //     name: 'Old Market Square',
  //     photo:
  //       'https://media-cdn.tripadvisor.com/media/photo-m/1280/13/4d/ad/bb/old-market-square.jpg',
  //     photoURL:
  //       'https://lh3.googleusercontent.com/a/ALm5wu20RKMcrCt6l1jyhWbMNm6lUYZJe_Rqyz8WDS8P0A=s96-c',
  //     uid: 'ucCCwdqk0JbZKhSLTEH4vGtAkuG2',
  //   },
  //   {
  //     displayName: 'Mykhailo Kosovan',
  //     docId: 'I8CcgDyMROwHmBMpBmyW',
  //     email: 'oldestspy@gmail.com',
  //     latitude: '52.40791',
  //     location_id: '1',
  //     longitude: '16.9341',
  //     name: 'Old Market Square',
  //     photo:
  //       'https://media-cdn.tripadvisor.com/media/photo-m/1280/13/4d/ad/bb/old-market-square.jpg',
  //     photoURL:
  //       'https://lh3.googleusercontent.com/a/ALm5wu20RKMcrCt6l1jyhWbMNm6lUYZJe_Rqyz8WDS8P0A=s96-c',
  //     uid: 'ucCCwdqk0JbZKhSLTEH4vGtAkuG2',
  //   },
  //   {
  //     displayName: 'Mykhailo Kosovan',
  //     docId: 'I8CcgDyMROwHmBMpBmyW',
  //     email: 'oldestspy@gmail.com',
  //     latitude: '52.40791',
  //     location_id: '9',
  //     longitude: '16.9341',
  //     name: 'Old Market Square',
  //     photo:
  //       'https://media-cdn.tripadvisor.com/media/photo-m/1280/13/4d/ad/bb/old-market-square.jpg',
  //     photoURL:
  //       'https://lh3.googleusercontent.com/a/ALm5wu20RKMcrCt6l1jyhWbMNm6lUYZJe_Rqyz8WDS8P0A=s96-c',
  //     uid: 'ucCCwdqk0JbZKhSLTEH4vGtAkuG2',
  //   },
  //   {
  //     displayName: 'Mykhailo Kosovan',
  //     docId: 'I8CcgDyMROwHmBMpBmyW',
  //     email: 'oldestspy@gmail.com',
  //     latitude: '52.40791',
  //     location_id: '10',
  //     longitude: '16.9341',
  //     name: 'Old Market Square',
  //     photo:
  //       'https://media-cdn.tripadvisor.com/media/photo-m/1280/13/4d/ad/bb/old-market-square.jpg',
  //     photoURL:
  //       'https://lh3.googleusercontent.com/a/ALm5wu20RKMcrCt6l1jyhWbMNm6lUYZJe_Rqyz8WDS8P0A=s96-c',
  //     uid: 'ucCCwdqk0JbZKhSLTEH4vGtAkuG2',
  //   },
  // ];
  // debugger;

  const dispatch = useAppDispatch();
  const {
    newJourney: { currentUser },
    bookMarks: { bookmarks },
  } = useAppSelector((state) => state);

  const [enableScroll, setEnableScroll] = useState(true);

  let lastBookmarksBatchRef: any = useRef([]); //<=== had to use this because no matter
  let lastVisibleBookmark: any = useRef([]); // < === how hard I tried with state i could not manage this

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
      lastBookmarksBatchRef.current = [...fetchedBookmarks];
      dispatch(setBookmarks(lastBookmarksBatchRef.current));
      lastVisibleBookmark.current =
        querySnapshot.docs[querySnapshot.docs.length - 1];
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
      startAfter(lastVisibleBookmark.current),
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
    let ids = new Set(lastBookmarksBatchRef.current.map((d) => d.docId));
    let merged = [
      ...lastBookmarksBatchRef.current,
      ...newlyFetchedBookmarks.filter((d) => !ids.has(d.docId)),
    ];
    dispatch(setBookmarks(merged));
    console.log(merged);
    lastVisibleBookmark.current =
      querySnapshot.docs[querySnapshot.docs.length - 1];
  };
  // =========== scroll logic ===========

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (e: Event) => {
    const target = e.target as HTMLDivElement;

    if (target.scrollHeight - (target.scrollTop + window.innerHeight) < 10) {
      console.log('load next batch');
      getAdditionalBookmark();
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
    <Wrapper
      ref={scrollRef}
      style={{ overflow: enableScroll ? 'scroll' : 'hidden' }}
    >
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
