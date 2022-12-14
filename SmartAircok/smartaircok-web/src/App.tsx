import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

import Login from './login/Login';
import Main from './main/Main';

import './App.css';

function App() {

  // localStorage.removeItem("id");
  // localStorage.removeItem("admin");
  // localStorage.removeItem("accesstoken");
  // localStorage.removeItem("refreshtoken");
  
  return (
    <BrowserRouter>
      <Routes>
        {localStorage.getItem("accesstoken") ? 
          <>
            <Route path="/main" element={ <Main /> } />
            <Route element={ <Navigate to="/main" /> } />
            <Route path="/" element={  <Navigate to="/main" /> } />
            <Route path="/*" element={ <Navigate to="/main" /> } />
          </>
            :
          <>
            <Route path="/login" element={ <Login /> } />
            <Route element={ <Navigate to="/login" /> } />
            <Route path="/" element={  <Navigate to="/login" /> } />
            <Route path="/*" element={ <Navigate to="/login" /> } />
          </>
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;