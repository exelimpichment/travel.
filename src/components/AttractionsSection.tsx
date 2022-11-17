import React from 'react';
import styled from 'styled-components';
import AttractionNameSection from './AttractionNameSection';
import IdentitySection from './IdentitySection';
import SmallNavigationBar from './SmallNavigationBar';
import AttractionCarousel from './UI/AttractionCarousel';
import SearchBar from './UI/SearchBar';

function AttractionsSection() {
  return (
    <Wrapper>
      {/* <SearchBar />
      <AttractionNameSection />
      <SmallNavigationBar />
      <AttractionCarousel /> */}
      <IdentitySection />
    </Wrapper>
  );
}

export default AttractionsSection;

const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;

  height: 100%;
  width: 550px;
  margin-left: 3rem;
  border-radius: 3rem 0 0 3rem;
`;
