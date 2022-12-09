import React, { useState } from 'react';
import links from '../utilities/links';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { handleSignOut } from '../firebase/firebaseConfig';
import { useNavigate, Link } from 'react-router-dom';
import { GiMountains } from 'react-icons/gi';
import {
  setCurrentUser,
  setToggleNavbarOpen,
} from '../features/NewJourney/NewJourneySlice';
import { redirect } from 'react-router-dom';

function NavigationBar2() {
  const {
    newJourney: { toggleNavbarOpen },
  } = useAppSelector((state) => state);
  // const [toggleNavbarOpen, setToggleNavbarOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <>
      <button
        style={{ position: 'absolute', top: 340, left: 3, zIndex: '999' }}
        type='button'
        onClick={() => {
          handleSignOut();
          // dispatch(setCurrentUser(null));
        }}
      >
        sign out
      </button>
      <Wrapper>
        <div className='navbar-container'>
          {/* =========TOGGLE_BUTTON====== */}
          <motion.button
            key='navBar'
            whileHover={{ scale: 1.1 }}
            type='button'
            className='menuToggle'
            onClick={() => dispatch(setToggleNavbarOpen('toggle'))}
          >
            <GiMountains></GiMountains>
          </motion.button>
          {/* =========TOGGLE_BUTTON====== */}

          <div className='links-container'>
            <AnimatePresence>
              {toggleNavbarOpen &&
                links.map((link) => {
                  return (
                    <motion.div
                      key={link.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45 }}
                    >
                      <button
                        onClick={() => {
                          dispatch(setToggleNavbarOpen('toggle'));

                          navigate(link.path);
                        }}
                        type='button'
                        className='link'
                      >
                        <>{link.icon}</>
                      </button>
                    </motion.div>
                  );
                })}
            </AnimatePresence>
          </div>

          {/* ================================================================ */}

          {/* ================================================================ */}
        </div>
      </Wrapper>
    </>
  );
}

export default NavigationBar2;

const Wrapper = styled.div`
  position: absolute;
  left: 0.95rem;
  top: 1.2rem;
  z-index: 10;

  .navbar-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: black;
    font-size: 3.2rem;
  }

  .menuToggle {
    height: 3.2rem;
    margin-bottom: 7px;
    font-weight: 900;
    &:hover {
      color: #46bcec;
      transition: all 0.3s ease-out;
    }
  }

  .link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background: #c0c0c0;
    margin-bottom: 7px;

    &:hover {
      cursor: pointer;
      background: #acacac;
    }

    svg {
      font-size: 2rem;
    }
  }
`;
