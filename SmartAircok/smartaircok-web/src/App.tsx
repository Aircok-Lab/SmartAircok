import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from './items/RootReducer';

import Login from './login/Login';
// import MainLoader from './main/MainLoader';
import Main from './main/Main';

import './App.css';

function App() {  
  // const test = (useSelector((state: RootState) => state.actLogin.refresh_token) ? '1' : '0') +
  //               (useSelector((state: RootState) => state.actDatas.devices).size > 0 ? '1' : '0')

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