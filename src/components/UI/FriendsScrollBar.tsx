import styled from 'styled-components';
import All_AddUser_Button from './All_AddUser_Button';
import UserSearch from './UserSearch';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { AnimatePresence, motion } from 'framer-motion';
import { friendsPhotos } from '../../features/NewJourney/tempFriendsPhotos';
import { useEffect, useRef } from 'react';
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from 'react-icons/bs';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { setFriends } from '../../features/Friends/FriendsSlice';

interface IDetailedFriend {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
}

function FriendsScrollBar() {
  const dispatch = useAppDispatch();
  const {
    friends: { searchWindowOpen, friendsScrollBarOpen, friends },
    newJourney: { currentUser },
    bookMarks: { bookmarks },
  } = useAppSelector((state) => state);

  useEffect(() => {
    try {
      const unsub = onSnapshot(
        doc(db, 'users', `${currentUser?.uid}`),
        (doc) => {
          const data = doc.data();
          console.log(data);
          dispatch(setFriends(data));
        }
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  // email(pin):"exelimpichment2@gmail.com"
  // displayName(pin):"Natan Hopkin"
  // uid(pin):"nsidPuwRICdck5LhWHg9WBg0Z383"
  // photoURL(pin):"https://lh3.googleusercontent.com/a/ALm5wu34ORKEcQBP03lI-0T03Up7hn31NxCVkxU7Li4z=s96-c"

  return (
    <>
      <Wrapper>
        <All_AddUser_Button />
        <AnimatePresence>{searchWindowOpen && <UserSearch />}</AnimatePresence>
        <AnimatePresence>
          {friendsScrollBarOpen &&
            friendsPhotos.map((friend) => (
              <motion.div
                className='img-container'
                key={friend.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                onClick={() => console.log('clicked photo')}
              >
                <img src={friend.img} alt={friend.name} />
                <p className='username'>{friend.name}</p>
              </motion.div>
            ))}
        </AnimatePresence>
      </Wrapper>
    </>
  );
}

export default FriendsScrollBar;

const Wrapper = styled.div`
  min-height: 80px;
  /* z-index: 2; */
  /* margin-bottom: 3rem; */
  overflow: scroll;
  width: 85%;
  display: flex;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  .img-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    padding-left: 0.7rem;

    .username {
      /* color: red; */
      font-size: 0.8rem;
      font-weight: 300;
      font-style: italic;
      font-family: var(--secondaryFont);
      text-align: center;
      max-width: 65px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  img {
    height: 64px;
    border-radius: 50%;
    cursor: pointer;

    &:hover {
      border: 1px solid black;
    }
  }
`;

//   .all-users-placeholder-left {
//     padding-left: 12px;
//     width: 2rem;
//     height: 4rem;
//     background-color: rgba(0, 0, 0, 0.5);
//     border-radius: 10rem 0 0 10rem;
//     cursor: pointer;

//     &:hover {
//       background-color: rgba(0, 0, 0, 0.7);
//     }

//     h2 {
//       font-family: var(--secondaryFont);
//     }
//   }

//   .all-users-placeholder-right {
//     /* display: flex;  */
//     /* flex-direction: column;
//     justify-content: center;
//     align-items: center; */
//     padding-right: 16px;
//     width: 2rem;
//     height: 4rem;
//     background-color: rgba(0, 0, 0, 0.5);
//     border-radius: 0 10rem 10rem 0;
//     background-color: rgba(0, 0, 0, 0.5);
//     cursor: pointer;

//     &:hover {
//       background-color: rgba(0, 0, 0, 0.7);
//     }

//     svg {
//     }
//   }
