import styled from 'styled-components';
import { IBookmark } from '../features/Bookmarks/BookmarksSlice';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useAppSelector } from '../hooks/reduxHooks';

interface LocalProps {
  bookmark: IBookmark;
}

function Bookmark({ bookmark }: LocalProps) {
  const {
    newJourney: { currentUser },
  } = useAppSelector((state) => state);

  // FUNCTION THAT DELETES A BOOKMARK
  const deleteBookmarks = async (docId: string) => {
    console.log(currentUser?.uid);
    console.log(docId);
    await deleteDoc(
      doc(db, 'users', `${currentUser?.uid}`, 'bookmarks', `${docId}`)
    );
  };

  return (
    <Wrapper>
      <div
        className='picture-container'
        onClick={() => {
          console.log('picture clicked');
        }}
      >
        <img src={bookmark.photo} alt={bookmark.name} />
        <div className='overlay'>
          <div className='content'>
            <h2>{bookmark.name}</h2>
            <button
              type='button'
              onClick={(e) => {
                e.stopPropagation();
                deleteBookmarks(bookmark.docId);
              }}
            >
              <AiOutlineCloseCircle />
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Bookmark;

const Wrapper = styled.div`
  .picture-container {
    position: relative;
    /* width: 40%;
    height: 100%; */

    .overlay {
      border-radius: 0.5rem;
      background-color: rgba(0, 0, 0, 0);
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      transition: all 0.9s ease-out;

      .content {
        color: transparent;
        font-family: var(--secondaryFont);

        h2 {
          position: absolute;
          bottom: 6px;
          left: 6px;
        }
      }

      &:hover .content {
        color: white;
      }

      &:hover {
        background-color: rgba(0, 0, 0, 0.5);
      }
    }
  }

  svg {
    font-size: 1.7rem;
    position: absolute;
    top: 11px;
    right: 11px;

    &:hover {
      color: #46bcec;
    }
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
    object-fit: cover;
  }
`;
