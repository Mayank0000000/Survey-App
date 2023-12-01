import React from 'react';
import Home from './pages/Home';
import Header from './components/Header';
import SideNav from './components/Navigation/SideNav';


function App() {
  return (
    <div>
      <Header/>
      <SideNav/>
      {/* <Home/> */}
    </div>
  )
}

export default App;