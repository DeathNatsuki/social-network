import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './index.css';

import Navbar from './components/NavBar.jsx';
import Home    from './components/pages/Home.jsx';
import Login   from './components/pages/Login.jsx';
import Register from './components/pages/Register.jsx';
import Profile from './components/pages/Profile.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"                  element={<Home />} />
        <Route path="/login"             element={<Login />} />
        <Route path="/register"          element={<Register />} />
        <Route path="/profile/:profileId" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
