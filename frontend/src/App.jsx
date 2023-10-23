import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"

import Header from './Components/header/Header'
import './App.css'
import Login from './Components/Login/Login';

import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import { loadUser } from './actions/User';


function App() {
  const dispatch = useDispatch();
 
  useEffect(()=>{
   
     dispatch(loadUser());
   },[
  
   ])
    
   const {isAuthenticated}=useSelector((state)=>state.user);
   
  
  return (
    <>

      <BrowserRouter>
      {
        (isAuthenticated &&     <Header />)
      }
        <Routes>
          <Route path='/' element={isAuthenticated?<Home />:<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
