import React from 'react';
import { FaFacebook } from 'react-icons/fa';
import styled from 'styled-components';
import {
  signInWithRedirect,
  auth,
  facebookProvider,
} from '../../firebase/firebaseConfig';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { setToggleNavbarOpen } from '../../features/NewJourney/NewJourneySlice';

// const handleSignIn = () => {
//   signInWithRedirect(auth, facebookProvider).catch((error) => {
//     console.log(error);
//   });
//   navigate('new-journey/attractions');
// };

function FacebookLoginButton() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignIn = () => {
    dispatch(setToggleNavbarOpen('off'));
    signInWithRedirect(auth, facebookProvider).catch((error) => {
      console.log(error);
    });
    // navigate('/new-journey/attractions');
  };

  return (
    <Wrapper
      type='button'
      //  onClick={handleSignIn}
    >
      <div className='g-sign-in-button'>
        <div className='content-wrapper'>
          <div className='logo-wrapper'>
            <FaFacebook></FaFacebook>
          </div>
          <span className='text-container'>
            <span style={{ color: '#c0c0c0' }}>Sign in with Facebook</span>
          </span>
        </div>
      </div>
    </Wrapper>
  );
}

export default FacebookLoginButton;

const Wrapper = styled.button`
  margin-bottom: 10px;

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
    width: 1.9rem;
    height: 1.9rem;
    color: white;
  }

  .logo-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 43px;
    height: 100%;
    border-radius: 5px;

    width: 48px;
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
