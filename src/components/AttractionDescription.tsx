import styled from 'styled-components';
import { useAppSelector } from '../hooks/reduxHooks';

function AttractionDescription() {
  const {
    newJourney: { attractions },
  } = useAppSelector((state) => state);
  return (
    <Wrapper>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
        voluptates autem velit amet iusto ullam, vel eos repellat quia, illo ea
        corporis harum totam fuga numquam in? Incidunt, quaerat porro!
      </p>
    </Wrapper>
  );
}

export default AttractionDescription;

const Wrapper = styled.div`
  padding-top: 2rem;
  margin: 0 15px 0 15px;

  p {
    font-style: italic;
    font-size: 1.2rem;
  }
`;
