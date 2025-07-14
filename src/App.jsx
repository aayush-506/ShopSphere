import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar';
import Add from './pages/Add';
import { useState } from 'react';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import List from './pages/List';
import Orders from './pages/Orders'


export const backendUrl = import.meta.env.VITE_BACKEND_URL


const App = () => {
  

  const [token, settoken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):"")
  useEffect(() => {
      localStorage.setItem('token',token)
      }
    , [token])

  return (
    <div >
      <ToastContainer position="top-right" autoClose={3000} />
      {token === ' ' ? <Login  settoken={settoken} /> :
        <>
          <Navbar settoken={settoken} />
          <Routes>
             <Route path="/" element={<Navigate to="/add" />} />
            <Route path='/add' element={<Add token={token} />} />
            <Route path='/list' element={<List token={token} />} />
            {/* <Route path='/orders' element={<Orders token={token} />} /> */}
          </Routes>
        </>
      }
    </div>
  );
};

export default App;
