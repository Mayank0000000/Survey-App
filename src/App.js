import React from 'react';
import Home from './pages/Home';
import Header from './components/Header';
import SideNav from './components/Navigation/SideNav';
import Survey from './pages/Survey';
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div>
      <Header/>
      <SideNav/>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='survey' element={<Survey/>}/>
      </Routes>
      
    </div>
  )
}

export default App;