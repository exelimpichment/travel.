import React from 'react';
import styled from 'styled-components';

function MusicPlayer() {
  return <Wrapper>музыка нас связала тайною нашей стала</Wrapper>;
}

export default MusicPlayer;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  font-size: 5rem;
`;
