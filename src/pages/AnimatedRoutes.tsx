import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import {
  NavigationBar,
  Bookmarks,
  Error,
  Friends,
  HeroPage,
  MusicPlayer,
  NewJourney,
  AttractionsSection,
} from '../pages/index';
import { AnimatePresence } from 'framer-motion';

function AnimatedRoutes() {
  const location = useLocation();
  console.log(location.pathname);
  console.log(location.pathname.split('/')[1]);
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<HeroPage />} />
        <Route path='new-journey' element={<NewJourney />}>
          {/* <Route path='attractions' element={<AttractionsSection />} /> */}
          {/* <Route path='friends' element={<Friends />} /> */}
          {/* <Route path='bookmarks' element={<Bookmarks />} /> */}
        </Route>
        <Route path='/music-player' element={<MusicPlayer />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
