import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

import HomePage from './pages/Home';
import LoginPage from './pages/login';
import NotFoundPage from './pages/not-found';
import SignupPage from './pages/signup';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={HomePage}></Route>
        <Route path="/login" element={LoginPage} />
        <Route path="/signup" element={SignupPage}></Route>
        <Route path="*" element={NotFoundPage}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
