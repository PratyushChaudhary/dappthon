import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
// import rootReducer from './reducer';
// import { Provider } from 'react-redux';
// import { configureStore } from '@reduxjs/toolkit';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
  </StrictMode>
);
