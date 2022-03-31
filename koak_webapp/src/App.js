import './App.css';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import MainPage from './screens/MainPage';
import ForgotPwd from './screens/ForgotPwd';
import ApiRequestContextProvider from './context/ApiRequestContext';
import ServiceConnection from './screens/ServiceConnection';
import Image from './screens/psyko.png'
import KoakScreen from './screens/KoakScreen';
import ClientApk from './screens/ClientApk';

function App() {
  return (
    <div className="bg-[#f7e8ce] h-screen font-serif" style={{backgroundImage: `url(${Image})`, backgroundSize: 'cover', backgroundRepeat: "no-repeat"}}>
        <ApiRequestContextProvider>
          <Router>
            <Routes>
              <Route exact path='/' element={<Login/>}></Route>
              <Route exact path="/login" element={<Login/>}></Route>
              <Route exact path="/signup" element={<SignUp/>}></Route>
              <Route path="/forgot-password" element={<ForgotPwd/>}></Route>
              <Route path="/mainpage" element={<MainPage/>}></Route>
              <Route path="/connection" element={<ServiceConnection/>}></Route>
              <Route path="/koaks" element={<KoakScreen/>}></Route>
              <Route path="/client.apk" element={<ClientApk/>}></Route>
            </Routes>
          </Router>
        </ApiRequestContextProvider>
    </div>
  );
}

export default App;
