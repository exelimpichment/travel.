import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AnimatedRoutes, NavigationBar } from './pages/index';

function App() {
  const [toggleNavbarOpen, setToggleNavbarOpen] = useState(false);

  return (
    <BrowserRouter>
      <NavigationBar />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
