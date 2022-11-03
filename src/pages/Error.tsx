import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import errorPageVertical from '../assets/errorPage_vertical.jpg';
import errorPageHorizontal from '../assets/errorPage_horizontal.jpg';

function Error() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div className='container'>
        <div className='centralPiece'>
          <h1>404</h1>
          <h2>Looks like you're lost</h2>
          <button
            type='button'
            onClick={() => {
              navigate('/');
            }}
          >
            Go to Home
          </button>
        </div>
      </div>
    </Wrapper>
  );
}

export default Error;

const Wrapper = styled.div`
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: url(${errorPageVertical});
    height: 100vh;
    width: 100vw;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    font-family: 'Montserrat', sans-serif;

    .centralPiece {
      margin-bottom: 10rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    h1 {
      font-size: 4rem;
      font-weight: 500;
      margin-bottom: 0.3rem;
    }

    h2 {
      font-weight: 400;
      font-size: 1.25rem;
      padding-bottom: 3px;
    }

    button {
      font-size: 1.25rem;
      color: #32b2ff;
      cursor: pointer;
      font-weight: 400;

      &:hover {
        color: #0000ee;
      }
    }

    @media (min-width: 490px) {
      background-image: url(${errorPageHorizontal});
      color: #35383a;
      h1 {
        font-size: 8rem;
        font-weight: 600;
        margin-bottom: 0.3rem;
      }
      h2 {
        font-weight: 500;
        font-size: 2rem;
        padding-bottom: 9px;
      }
      button {
        font-size: 1.5rem;
      }
    }
  }
`;
