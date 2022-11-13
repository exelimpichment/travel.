import { useState } from 'react';
import { HeroPage } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NewJourney from './pages/NewJourney';
import Friends from './pages/Friends';
import Bookmarks from './pages/Bookmarks';
import MusicPlayer from './pages/MusicPlayer';
import Error from './pages/Error';
import NavigationBar from './components/NavigationBar';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [toggleNavbarOpen, setToggleNavbarOpen] = useState(false);
  return (
    <BrowserRouter>
      {/* <AnimatePresence>
        {toggleNavbarOpen && <NavigationBar></NavigationBar>}
      </AnimatePresence> */}
      {/* <NavigationBar></NavigationBar> */}
      <Routes>
        <Route path='/' element={<HeroPage />} />
        <Route path='/new-journey' element={<NewJourney />} />
        <Route path='/friends' element={<Friends />} />
        <Route path='/bookmarks' element={<Bookmarks />} />
        <Route path='/music-player' element={<MusicPlayer />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
