import React, { useRef } from 'react';
import tempUser from '../../assets/tempUser.jpg';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks/reduxHooks';
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';
import SmallNavigationBar from '../SmallNavigationBar';
import AttractionDescription from '../AttractionDescription';

function AttractionCarousel() {
  const ScrollCarouselY = useRef<null | HTMLDivElement>(null);

  const scroll = (scrollOffset: number): void => {
    ScrollCarouselY.current.scrollLeft += scrollOffset;
  };

  const {
    newJourney: { coordinates, bounds, zoom, attractions },
  } = useAppSelector((state) => state);

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
        <div className='photo-container'>
          <img
            src='https://media-cdn.tripadvisor.com/media/photo-o/09/b9/08/45/screenshot-2015-12-11.jpg'
            alt=''
          />
          <h2 className='img-text'>Long Son Pagoda</h2>
        </div>
        <div className='photo-container'>
          <img
            src='https://media-cdn.tripadvisor.com/media/photo-w/0a/58/9b/cc/i-resort-nha-trang.jpg'
            alt=''
          />
          <h2 className='img-text'>Long Son Pagoda</h2>
        </div>
        <div className='photo-container'>
          <img
            src='https://media-cdn.tripadvisor.com/media/photo-o/0c/aa/f4/46/photo2jpg.jpg'
            alt=''
          />
          <h2 className='img-text'>Long Son Pagoda</h2>
        </div>
        <div className='photo-container'>
          <img
            src='https://media-cdn.tripadvisor.com/media/photo-o/13/82/b7/ba/img-20180620-210414-451.jpg'
            alt=''
          />
          <h2 className='img-text'>Long Son Pagoda</h2>
        </div>
        <div className='photo-container'>
          <img
            src='https://media-cdn.tripadvisor.com/media/photo-o/0e/76/cd/0d/nha-trang-cable-car.jpg'
            alt=''
          />
          <h2 className='img-text'>Long Son Pagoda</h2>
        </div>
        {/*<div className='photo-container'>
          <img
            src='https://media-cdn.tripadvisor.com/media/photo-o/0a/08/2e/f3/long-son-pagoda.jpg'
            alt=''
          />
        </div>
        <div className='photo-container'>
          <img
            src='https://media-cdn.tripadvisor.com/media/photo-o/09/b9/08/45/screenshot-2015-12-11.jpg'
            alt=''
          />
        </div> */}
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
