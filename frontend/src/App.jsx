import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { loadUser } from './actions/User';

import './App.css'
import Login from './Components/Login/Login';

import Home from './Components/Home/Home';
import Header from './Components/header/Header'
import Register from './Components/Register/Register';

import Account from './Components/Account/Account';
import NewPost from './Components/NewPost/NewPost';
import UpdateProfile from './Components/UpdateProfile/UpdateProfile';
import UpdatePassword from './Components/UpdatePassword/UpdatePassword';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';


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
        isAuthenticated &&     (<Header />)
      }
        <Routes>
          <Route path='/' element={isAuthenticated?<Home />:<Login />} />
          <Route path='/register' element={isAuthenticated?<Account />:<Register />} />
          <Route path='/account' element={isAuthenticated?<Account />:<Login />} />
          <Route path='/newpost' element={isAuthenticated?<NewPost />:<Login />} />
          <Route path='/update/profile' element={isAuthenticated?<UpdateProfile />:<Login />} />
          <Route path='/update/password' element={isAuthenticated?<UpdatePassword />:<Login />} />
          <Route path='/forgot/password' element={isAuthenticated?<UpdatePassword />:<ForgotPassword />} />
          <Route path='/password/reset/:token' element={isAuthenticated?<UpdatePassword />:<ResetPassword />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
