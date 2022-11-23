import React from 'react';
import styled from 'styled-components';
import { GoSearch } from 'react-icons/go';

function SearchBar() {
  return (
    <Wrapper>
      <input type='text' />
      <button
        type='button'
        onClick={() => console.log('search...')}
        className='btn'
      >
        <GoSearch></GoSearch>
      </button>
    </Wrapper>
  );
}

export default SearchBar;

const Wrapper = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  input {
    width: 85%;

    border: none;
    appearance: none;
    background-color: transparent;
    color: #ffffff;

    padding: 5px;
    font-family: var(--secondaryFont);
    font-size: 1.5rem;

    border-bottom: 1px solid #ffffff;

    &::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: white;
      opacity: 1; /* Firefox */
    }
  }

  button {
    height: 100%;
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 1rem;
    &:hover {
      color: #46bcec;
      transition: all 0.3s ease-in-out;
    }
  }
`;
