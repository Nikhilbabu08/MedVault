import React from 'react';
import {Routes,Route} from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Create from './components/pages/Create';
import Inventory from './components/pages/Inventory';
import Update from './components/pages/Update';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Contact from './components/pages/Contact';
import './index.css';
import View from './components/pages/View';


function App() {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/create' element={<Create/>} />
        <Route  path="/inventory" element={<Inventory/>} />
        <Route path='/:postId/update'  element={<Update/>} />
        <Route path='/:postId'  element={<View/>} />
        <Route path= "/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </div>
  )
}

export default App

