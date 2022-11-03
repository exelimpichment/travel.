import React from 'react';
import styled from 'styled-components';
import Map from '../components/Map';

function NewJourney() {
  return (
    <Wrapper>
      <h1>NewJourney</h1>
      <Map />
    </Wrapper>
  );
}

export default NewJourney;

const Wrapper = styled.div`
  color: red;
`;
