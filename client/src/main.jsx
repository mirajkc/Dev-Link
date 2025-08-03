import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './context/appContext.jsx';
import { AdminProvider } from './context/adminAppContext.jsx';

createRoot(document.getElementById('root')).render(
 <StrictMode>
  <BrowserRouter>
    <AppProvider>
      <AdminProvider>
        <App />
      </AdminProvider>
    </AppProvider>
  </BrowserRouter>
</StrictMode>

);
