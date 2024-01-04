import React, {useState} from 'react';
import Home from './pages/Home';
import SideNav from './components/Navigation/SideNav';
import SurveyResultsContainer from './components/SurveyResultsContainer';
import ImageResults from './pages/ImageResults';
import Image from './pages/Image';
import VideoUploader from './pages/Video';
import Survey from './pages/Survey';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import VideoResults from './pages/VideoResults';




function App() {
  
  
  return (
    <div className='container'>      
          <SideNav />
          <div className='centre'>    
          <Routes>
            <Route path='/' element={<Home  />} />
            <Route path='survey' element={<Survey />} />
            <Route path='image' element={<Image />} />
            <Route path={`Analytics/:id`} element={<SurveyResultsContainer />}></Route>
            <Route path='Image-Analytics/:id' element={<ImageResults/>}></Route>
            <Route path='Video-Analytics/:id' element={<VideoResults/>}></Route>
            <Route path='video' element={<VideoUploader/>}></Route>
          </Routes> 
          </div>       
    </div>
  )
}

export default App;