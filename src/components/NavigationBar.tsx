import React from 'react';
import links from '../utilities/links';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { handleSignOut } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

function NavigationBar() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      {links.map((link) => {
        return (
          <motion.div
            key={link.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => navigate(link.path)}
              type='button'
              className='link'
            >
              <>{link.icon}</>
            </button>
          </motion.div>
        );
      })}
      <button
        type='button'
        onClick={() => {
          handleSignOut();
        }}
      >
        sign out
      </button>
    </Wrapper>
  );
}

export default NavigationBar;

const Wrapper = styled.nav`
  /* z-index: 1000; */
  position: absolute;

  .link-container {
    margin-bottom: 8px;
  }

  .link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    background: #c0c0c0;
    position: relative;
    left: 20px;
    top: 85px;
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
