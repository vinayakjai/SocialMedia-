import { useState } from 'react'
import {BrowserRouter ,Routes,Route} from "react-router-dom";
import {Provider} from "react-redux"
import store from './store';
import Header from './Components/header/Header'
import './App.css'
import Login from './Components/Login/Login';

function App() {
 

  return (
    <>
    <Provider store={store}>
     <BrowserRouter>
     <Header />
       <Routes>
        <Route path='/' element={<Login />} />
       </Routes>
     </BrowserRouter>
     </Provider>
    </>
  )
}

export default App
