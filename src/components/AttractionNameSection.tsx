import styled from 'styled-components';
import { useAppSelector } from '../hooks/reduxHooks';

function AttractionNameSection() {
  const {
    newJourney: { activeAttraction },
  } = useAppSelector((state) => state);
  return (
    <Wrapper>
      <h1>{activeAttraction?.name}</h1>
      <h2>{activeAttraction?.address}</h2>
    </Wrapper>
  );
}

export default AttractionNameSection;

const Wrapper = styled.div`
  min-height: 150px;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: start;
  width: 100%;
  padding: 0 15px 0 15px;
  margin: 2rem 0 2rem 0;
  font-family: var(--mainFont);
`;
