import React from 'react';
import links from '../utilities/links';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { GiMountains } from 'react-icons/gi';
import { handleSignOut } from '../firebase/firebaseConfig';

function NavigationBar() {
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
              type='button'
              className='link'
              onClick={() => console.log(link.text)}
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
