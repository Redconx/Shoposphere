import React from 'react';
import logo from './logo.svg';
import './App.css';
import HeaderMain from './Components/Header/HeaderMain';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeMain from './Components/Home/HomeMain';


function App() {
  return (
    <BrowserRouter>
      <HeaderMain />
      <Routes>
        <Route path="/" element={<HomeMain />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
