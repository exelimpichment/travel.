import React, { Component, useRef } from 'react';
import styled from 'styled-components';
import AttractionDescription from './AttractionDescription';
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
      <AttractionCarousel />
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
  justify-content: space-between;
  height: 100vh;
  width: 40vw;
  border-radius: 3rem 0 0 3rem;
  /* padding: 20px 0 0px 0; */
  overflow: hidden;
`;
