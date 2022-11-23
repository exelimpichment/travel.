import styled from 'styled-components';

function AttractionNameSection() {
  return (
    <Wrapper>
      <h1>Monkey Island</h1>
    </Wrapper>
  );
}

export default AttractionNameSection;

const Wrapper = styled.div`
  font-size: 1.5rem;
  display: flex;
  justify-content: start;
  width: 100%;
  padding-left: 15px;
  font-family: var(--mainFont);
`;
