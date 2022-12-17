import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AnimatedRoutes, NavigationBar } from './pages/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [toggleNavbarOpen, setToggleNavbarOpen] = useState(false);

  return (
    <BrowserRouter>
      <NavigationBar />
      <AnimatedRoutes />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
