import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { useAppSelector } from '../hooks/reduxHooks';

function AttractionDescription() {
  const {
    newJourney: { activeAttraction },
  } = useAppSelector((state) => state);
  return (
    <Wrapper>
      <AnimatePresence>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {activeAttraction?.description}
        </motion.p>
      </AnimatePresence>
    </Wrapper>
  );
}

export default AttractionDescription;

const Wrapper = styled.div`
  display: flex;
  transition: all 0.3 ease;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  padding: 0 15px 0 15px;

  p {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    overflow: hidden;
    -webkit-box-orient: vertical;

    font-style: italic;
    font-size: 1.2rem;
    font-family: var(--mainFont);
  }
`;
