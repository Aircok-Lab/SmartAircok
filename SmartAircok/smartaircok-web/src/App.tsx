import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from './items/RootReducer';

import Login from './login/Login';
import Main from './main/Main';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {useSelector((state: RootState) => state.actLogin.refresh_token) ? 
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
        {/* {
          {
            '00' :  <>
                      <Route path="/login" element={ <Login /> } />
                      <Route element={ <Navigate to="/login" /> } />
                      <Route path="/" element={  <Navigate to="/login" /> } />
                      <Route path="/*" element={ <Navigate to="/login" /> } />
                    </>,
            '10' :  <>
                      <Route path="/mainloader" element={ <MainLoader /> } />
                      <Route element={ <Navigate to="/mainloader" /> } />
                      <Route path="/" element={  <Navigate to="/mainloader" /> } />
                      <Route path="/*" element={ <Navigate to="/mainloader" /> } />
                    </>,
            '11' :  <>
                      <Route path="/main" element={ <Main /> } />
                      <Route element={ <Navigate to="/main" /> } />
                      <Route path="/" element={  <Navigate to="/main" /> } />
                      <Route path="/*" element={ <Navigate to="/main" /> } />
                    </>,
          }[test]
        } */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;