import React, { Component, useRef } from 'react';
import styled from 'styled-components';
import AttractionNameSection from './AttractionNameSection';
import IdentitySection from './IdentitySection';
import SmallNavigationBar from './SmallNavigationBar';
import AttractionCarousel from './UI/AttractionCarousel';
import SearchBar from './UI/SearchBar';

function AttractionsSection() {
  return (
    <Wrapper>
      <SearchBar />
      <AttractionNameSection />
      <SmallNavigationBar />
      <AttractionCarousel />
      <IdentitySection />
    </Wrapper>
  );
}

export default AttractionsSection;

const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100vh;
  width: 40vw;
  margin-left: 3rem;
  border-radius: 3rem 0 0 3rem;
`;
