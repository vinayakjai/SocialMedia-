import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"

import Header from './Components/header/Header'
import './App.css'
import Login from './Components/Login/Login';

import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import { loadUser } from './actions/User';
import Account from './Components/Account/Account';
import NewPost from './Components/NewPost/NewPost';


function App() {
  const dispatch = useDispatch();
 
  useEffect( ()=>{
   
     
        dispatch(loadUser());
        
   },[
    dispatch
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
          <Route path='/register' element={isAuthenticated?<Account />:<Register />} />
          <Route path='/account' element={isAuthenticated?<Account />:<Login />} />
          <Route path='/newpost' element={isAuthenticated?<NewPost />:<Login />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
