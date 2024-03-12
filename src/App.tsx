import React from 'react';
import logo from './logo.svg';
import './App.css';
import HeaderMain from './Components/Header/HeaderMain';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeMain from './Components/Home/HomeMain';
import ViewAll from './Components/ViewAll/ViewAllMain';
import DetailView from './Components/Details/DetailView';


function App() {
  return (
    <BrowserRouter>
      <HeaderMain />
      <Routes>
        <Route path="/" element={<HomeMain />} />
        <Route path="/allmobiles" element={<ViewAll />} />
        <Route path="/:mobile/:id" element={<DetailView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
