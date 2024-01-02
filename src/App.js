import React from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import { Routes,Route } from 'react-router-dom';

function App() {
  return (
   <Routes>
    <Route path='/' element={<LandingPage/>}/>
    <Route path='/dashboard/:id' element={<Dashboard/>}/>
   </Routes>
  );
}

export default App;
