import { useState } from 'react';
import { Route, Routes } from 'react-router';
import './App.css';
import Navbar from './Header Component/Navbar';
import OfferHeader from './Header Component/OfferHeader';
import Auth from './Pages/Auth';
import CBS from './Pages/CBS';
import Farms from './Pages/Farms';
import Helpers from './Pages/Helpers';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';

function App() {
  const [active,setACtive] = useState('home')
  return (
    <div className="App">
      <OfferHeader/>
      <Navbar active={active} setActive={setACtive}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/farms' element={<Farms/>}/>
        <Route path='/helpers' element={<Helpers/>}/>
        <Route path='/cbs' element={<CBS/>}/>
        <Route path='*' element={<NotFound/>}/>
        <Route path='/auth' element={<Auth/>}/>
      </Routes>
    </div>
  );
}

export default App;
