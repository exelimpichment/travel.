import React from 'react';
import styled from 'styled-components';
import { smallLinks } from '../utilities/smallLinks';

function SmallNavigationBar() {
  return (
    <Wrapper>
      {smallLinks.map((link) => (
        <button
          key={link.id}
          type='button'
          className='button'
          onClick={() => console.log(link.text)}
        >
          {link.text}
        </button>
      ))}
    </Wrapper>
  );
}

export default SmallNavigationBar;

const Wrapper = styled.div`
  display: flex;
  color: rgba(242, 242, 243, 255);
  padding-right: 15px;
  font-family: var(--secondaryFont);
  font-size: 1.1rem;
  .button {
    padding-left: 1.5rem;
    &:hover {
      color: #46bcec;
      transition: all 0.3s ease-in-out;
    }
  }
`;
