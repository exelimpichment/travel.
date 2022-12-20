import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FiSend } from 'react-icons/fi';
import { BiComment } from 'react-icons/bi';
import { setFeedItemCommentsOpened } from '../features/Friends/FriendsSlice';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { AnimatePresence, motion } from 'framer-motion';
import { FaRegTimesCircle } from 'react-icons/fa';

let url =
  'https://lh3.googleusercontent.com/a/AEdFTp6HvOp_KL1jZt4i6zSWZQpnrhtdNOsLAPpjUejc=s96-c';
let displayName = 'EX`EL community';

let attrectionUrl =
  'https://media-cdn.tripadvisor.com/media/photo-m/1280/13/4d/ad/bb/old-market-square.jpg';

function FeedItem() {
  const [toggle, setToggle] = useState(false);
  const {
    // newJourney: { currentUser },
    friends: { feedItemCommentsOpened },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  return (
    <Wrapper>
      {/* =========1/3================================ */}
      <div className='user-info-container'>
        <img src={url} alt='' />
        <p className='userName'>{displayName}</p>
      </div>
      {/* =========2/3================================ */}
      <div className='attraction-img-container'>
        <img src={attrectionUrl} alt='' />
        <div className='swg-flex-container'>
          <button className='likes flex-container'>
            <AiOutlineHeart />
            <p className='counter'>3</p>
          </button>
          <button
            className='comments flex-container'
            type='button'
            onClick={() => setToggle(!toggle)}
          >
            <BiComment />
            <p className='counter'>3</p>
          </button>
        </div>
        {/* ===========COMMENTS SECTION======================= */}
        <AnimatePresence>
          {toggle && (
            <CommentsWrapper
              initial={{ opacity: 0, height: '1%' }}
              animate={{ opacity: 1, height: '100%' }}
              exit={{ opacity: 0, height: '1%' }}
              transition={{ ease: 'easeOut', duration: 0.4 }}
            >
              <div className='comments-section'></div>
              <button
                type='button'
                className='escapeButton'
                onClick={() => setToggle(!toggle)}
              >
                <FaRegTimesCircle />
              </button>
            </CommentsWrapper>
          )}
        </AnimatePresence>
      </div>
      {/* =========3/3================================ */}

      <div className='comment-section-container'>
        <input type='text' placeholder='comment...'></input>
        <button
          type='button'
          className='svg-sent'
          onClick={() => console.log('click')}
        >
          <FiSend />
        </button>
      </div>
    </Wrapper>
  );
}

export default FeedItem;

const CommentsWrapper = styled(motion.div)`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  bottom: 0;
  left: 0;

  svg {
    font-size: 1.5rem;
    &:hover {
      color: #46bcec;
      transition: all 0.3s ease-in-out;
    }
  }
`;

const Wrapper = styled.div`
  margin-bottom: 2rem;
  background-color: rgba(0, 0, 0, 0.5);
  min-height: 80%;
  display: grid;
  grid-template-rows: 55px 1fr 55px;
  border-radius: 7px;

  /* ======= user  ===== 1/3 ===== */
  .user-info-container {
    display: flex;
    align-items: center;
    justify-content: start;
    border-bottom: 1px solid rgba(0, 0, 0, 0.9);
    padding-left: 1rem;

    img {
      border-radius: 50%;
      height: 75%;
    }

    .userName {
      font-family: var(--secondaryFont);
      padding-left: 1rem;
    }
  }
  /* ======= attraction ===== 2/3 ===== */
  .attraction-img-container {
    border-bottom: 1px solid rgba(0, 0, 0, 0.9);
    position: relative;

    /* flex-container {
      display: flex;
      flex-direction: row;
    } */

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }

    .swg-flex-container {
      font-size: 1.3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      bottom: 5px;
      left: 5px;

      .likes {
        &:hover {
          color: #bf2e44;
          transition: all 0.3s ease-in-out;
        }
      }

      .comments {
        margin-left: 0.5rem;
        &:hover {
          color: #46bcec;
          transition: all 0.3s ease-in-out;
        }
      }

      .flex-container {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.9);
        padding: 1px 5px 1px 5px;
        border-radius: 25px;
        height: 2rem;
        width: auto;
        cursor: pointer;
      }

      .counter {
        font-family: var(--secondaryFont);
        padding-left: 5px;
      }
    }
  }
  /* ======= comment ===== 3/3 ===== */
  .comment-section-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 25px 2px 15px;

    input {
      width: 90%;
      height: 100%;
      background-color: transparent;
      border: none;
      color: white;
      font-family: var(--secondaryFont);
    }

    .svg-sent {
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 1.6rem;
      cursor: pointer;
      color: white;

      &:hover {
        font-size: 1.7rem;
        transition: all 0.3s ease-in-out;
        color: #46bcec;
      }
    }
  }
`;
