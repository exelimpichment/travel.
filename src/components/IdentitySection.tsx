import React from 'react';
import styled from 'styled-components';
import tempUser from '../assets/tempUser.jpg';

let name = 'natan hopkin';

function IdentitySection() {
  return (
    <Wrapper>
      <h2>{name}</h2>
      <div className='img-container'>
        <img src={tempUser} alt='user picture' />
      </div>
    </Wrapper>
  );
}

export default IdentitySection;

const Wrapper = styled.div`
  display: flex;
  img {
    border-radius: 50%;
    height: 60px;
  }
`;
