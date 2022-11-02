import { useState } from 'react'
import  {HeroPage} from './pages'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HeroPage />} />
      {/* <Route path="/" element={<HeroPage />} /> */}
    </Routes>
    </BrowserRouter>
  )
}

export default App
