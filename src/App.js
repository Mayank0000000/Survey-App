import React from 'react';
import Home from './pages/Home';
import SideNav from './components/Navigation/SideNav';
import Survey from './pages/Survey';
import { Route, Routes } from 'react-router-dom';
import './App.css';



function App() {
  return (
    <div className='container'>      
          <SideNav />      
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='survey' element={<Survey />} />
          </Routes>      
    </div>
  )
}

export default App;