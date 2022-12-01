import React, { useEffect, useRef } from 'react';
import tempUser from '../../assets/tempUser.jpg';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';
import SmallNavigationBar from '../SmallNavigationBar';
import AttractionDescription from '../AttractionDescription';
import { BsFillBookmarkFill, BsBookmarkCheckFill } from 'react-icons/bs';
import { User, Attraction } from '../../features/NewJourney/NewJourneySlice';
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  doc,
  query,
  where,
  orderBy,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { object } from 'prop-types';
import {
  setDocIdObject,
  setLocationIdArr,
} from '../../features/NewJourney/NewJourneySlice';

function AttractionCarousel() {
  const dispatch = useAppDispatch();
  // const ScrollCarouselY = useRef<null | HTMLDanivElement>(null);
  const ScrollCarouselY = useRef<null | any>(null);

  const scroll = (scrollOffset: number): void => {
    ScrollCarouselY.current.scrollLeft += scrollOffset;
  };

  const {
    newJourney: {
      attractions,
      currentUser,
      locationIdArr,
      docIdObject,
      allPlacesShown,
    },
  } = useAppSelector((state) => state);

  const addBookmarks = async (bookmark: Bookmark) => {
    console.log('sent to FB');
    const docRef = await addDoc(
      collection(db, 'users', `${bookmark.uid}`, 'bookmarks'),
      {
        ...bookmark,
      }
    );
  };

  const deleteBookmarks = async (docId: string) => {
    await deleteDoc(
      doc(db, 'users', `${currentUser?.uid}`, 'bookmarks', `${docId}`)
    );
  };

  interface Bookmark extends User {
    location_id: string;
    photo: string;
    latitude: string;
    longitude: string;
    createdAt: any;
  }

  useEffect(() => {
    const q = query(collection(db, `users/${currentUser?.uid}/bookmarks`));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const bookmarks: object[] = [];
      querySnapshot.forEach((doc) => {
        let docID = doc.id;
        bookmarks.push({ ...doc.data(), docID });
      });

      const docIdObject: object[] = [];
      const locationsId: string[] = [];

      bookmarks.forEach((bookmark: any) => {
        const { location_id, docID } = bookmark;
        docIdObject.push({ location_id, docID });
        locationsId.push(location_id);
      });

      dispatch(setDocIdObject(docIdObject));
      dispatch(setLocationIdArr(locationsId));
    });
  }, []);

  return (
    <Wrapper>
      <div className='small-menu-container'>
        <div className='buttons-container'>
          <button type='button' className='btn' onClick={() => scroll(-250)}>
            <BsFillArrowLeftCircleFill />
          </button>
          <button type='button' className='btn' onClick={() => scroll(250)}>
            <BsFillArrowRightCircleFill />
          </button>
        </div>
        <SmallNavigationBar />
      </div>
      {/* ================================================================ */}
      <div className='carousel' ref={ScrollCarouselY}>
        {/* <div className='carousel'> */}
        {attractions?.map((attraction) => (
          <div className='photo-container' key={attraction.location_id}>
            <button
              type='button'
              onClick={
                currentUser === null
                  ? () => {
                      console.log('no user. please offer to login');
                    }
                  : () => {
                      if (locationIdArr?.includes(attraction.location_id)) {
                        docIdObject?.map((object) => {
                          object.location_id === attraction.location_id
                            ? deleteBookmarks(object.docID)
                            : null;
                        });
                        console.log('deleted location');
                      } else {
                        addBookmarks({
                          location_id: attraction.location_id,
                          photo: attraction.photo.images.original.url,
                          latitude: attraction.latitude,
                          longitude: attraction.longitude,
                          displayName: currentUser?.displayName,
                          email: currentUser?.email,
                          photoURL: currentUser?.photoURL,
                          uid: currentUser?.uid,
                          createdAt: serverTimestamp(),
                        });
                      }
                    }
              }
            >
              <BsBookmarkCheckFill
                style={
                  locationIdArr?.includes(attraction.location_id)
                    ? { color: '#46bcec' }
                    : { color: 'rgba(0, 0, 0, 0.5)' }
                }
              />
            </button>
            <img src={attraction.photo.images.original.url} alt='' />
          </div>
        ))}
      </div>
      <AttractionDescription />
      {/* ================================================================ */}
    </Wrapper>
  );
}

export default AttractionCarousel;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: start;
  margin-bottom: 10%;

  .carousel {
    height: 310px;
    scroll-behavior: smooth;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 0 15px 0 15px;
    /* ====googled this | hiding scrollbar===== */
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    &::-webkit-scrollbar {
      display: none; /* for Chrome, Safari, and Opera */
    }

    .photo-container {
      position: relative;
      min-width: 210px;
      min-height: 200px;
      width: 200px;
      height: 300px;
      padding: 0 12px 0 0px;
      cursor: pointer;

      &:hover {
        min-width: 210px;
        min-height: 210px;
        width: 210px;
        height: 310px;
        transition: all 0.3s ease-in-out;
      }

      svg {
        position: absolute;
        top: 0px;
        right: 15%;
        font-size: 2rem;
        /* color: rgba(0, 0, 0, 0.5); */
        /* background-color: rgba(0, 0, 0, 0.5); */

        &:hover {
          color: #46bcec;
          transition: all 0.3s ease-in-out;
        }
      }

      img {
        border-radius: 1.5rem;
        height: 100%;
        width: 100%;
        object-fit: cover;
      }

      .img-text {
        position: absolute;
        bottom: 10%;
        left: 10px;
        z-index: 9999;
        font-family: var(--mainFont);
      }
    }
  }

  .small-menu-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 15px;
    padding-bottom: 0.5rem;

    .buttons-container {
      font-size: 1.9rem;
      color: rgba(242, 242, 243, 255);
      padding-top: 0.5rem;

      .btn {
        height: 2.2rem;
        padding: 0 5px 0 0;

        svg {
          &:hover {
            color: #46bcec;
            transition: all 0.3s ease-in-out;
          }
        }
      }
    }
  }
`;

// ==============NOTE===========NOTE==========
// tried to filter this carusel also but decided to leave it like it was.
// ==============NOTE===========NOTE==========

//   return (
//     <Wrapper>
//       <div className='small-menu-container'>
//         <div className='buttons-container'>
//           <button type='button' className='btn' onClick={() => scroll(-250)}>
//             <BsFillArrowLeftCircleFill />
//           </button>
//           <button type='button' className='btn' onClick={() => scroll(250)}>
//             <BsFillArrowRightCircleFill />
//           </button>
//         </div>
//         <SmallNavigationBar />
//       </div>
//       {/* ================================================================ */}
//       <div className='carousel' ref={ScrollCarouselY}>
//         {/* <div className='carousel'> */}
//         {attractions?.map((attraction) => (
//           <AnimatePresence>
//             {(!allPlacesShown &&
//               !locationIdArr?.includes(attraction.location_id)) || (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 className='photo-container'
//                 key={attraction.location_id}
//               >
//                 <button
//                   type='button'
//                   onClick={
//                     currentUser === null
//                       ? () => {
//                           console.log('no user. please offer to login');
//                         }
//                       : () => {
//                           if (locationIdArr?.includes(attraction.location_id)) {
//                             docIdObject?.map((object) => {
//                               object.location_id === attraction.location_id
//                                 ? deleteBookmarks(object.docID)
//                                 : null;
//                             });
//                             console.log('deleted location');
//                           } else {
//                             addBookmarks({
//                               location_id: attraction.location_id,
//                               photo: attraction.photo.images.original.url,
//                               latitude: attraction.latitude,
//                               longitude: attraction.longitude,
//                               displayName: currentUser?.displayName,
//                               email: currentUser?.email,
//                               photoURL: currentUser?.photoURL,
//                               uid: currentUser?.uid,
//                               createdAt: serverTimestamp(),
//                             });
//                           }
//                         }
//                   }
//                 >
//                   <BsBookmarkCheckFill
//                     style={
//                       locationIdArr?.includes(attraction.location_id)
//                         ? { color: '#46bcec' }
//                         : { color: 'rgba(0, 0, 0, 0.5)' }
//                     }
//                   />
//                 </button>
//                 <img src={attraction.photo.images.original.url} alt='' />
//               </motion.div>
//             )}
//           </AnimatePresence>
//         ))}
//       </div>
//       <AttractionDescription />
//       {/* ================================================================ */}
//     </Wrapper>
//   );
// }
