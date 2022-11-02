import React, { useState, useEffect } from 'react';

import { BsGoogle } from 'react-icons/bs';
import styled from 'styled-components';
import {
  auth,
  provider,
  signInWithRedirect,
  signOut,
} from '../../firebase/firebaseConfig';

const handleSignIn = () => {
  signInWithRedirect(auth, provider).catch((error) => {
    console.log(error);
  });
};

function GoogleLoginButton() {
  return (
    <Wrapper type='button' onClick={handleSignIn}>
      <div className='g-sign-in-button'>
        <div className='content-wrapper'>
          <div className='logo-wrapper'>
            <BsGoogle className='svg'></BsGoogle>
          </div>
          <span className='text-container'>
            <span style={{ color: '#c0c0c0' }}>Sign in with Google</span>
          </span>
        </div>
      </div>
    </Wrapper>
  );
}

export default GoogleLoginButton;

const Wrapper = styled.button`
  margin-bottom: 10px;
  margin-top: 18rem;

  .g-sign-in-button {
    display: inline-block;
    width: 240px;
    height: 43px;
    background-color: var(--mainBlack);
    color: #6c6c6c;
    border-radius: 5px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
    transition: background-color 0.218s, border-color 0.218s, box-shadow 0.218s;
  }

  .g-sign-in-button:hover {
    cursor: pointer;
    box-shadow: 0 0 3px 3px rgba(108, 108, 108, 0.3);
  }

  .g-sign-in-button:active {
    background-color: #6c6c6c;
    transition: background-color 0.2s;
  }

  .content-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    border: 1px solid transparent;
  }

  svg {
    width: 1.65rem;
    height: 1.65rem;
    color: white;
    /* margin-right: 2px; */
  }

  .logo-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    /* padding: 15px; */
    /* background: #6c6c6c; */
    width: 43px;
    height: 100%;
    border-radius: 5px;
  }

  .g-sign-in-button .text-container {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Roboto', arial, sans-serif;
    font-weight: 500;
    letter-spacing: 0.21px;
    font-size: 16px;
    line-height: 48px;
    vertical-align: top;
    border: none;
    display: inline-block;
    text-align: center;
    width: 180px;
  }
`;
