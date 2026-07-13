import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './App.jsx';
import { ErrorBoundary } from './ErrorBoundary.jsx';
import AdminApp from './admin/AdminApp.jsx';
import { Routes, Route } from 'react-router-dom';
import { PortfolioDataProvider } from './context/PortfolioDataContext.jsx';

// Configuration flag to temporarily disable public access to the admin dashboard
const ADMIN_ENABLED = false;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <PortfolioDataProvider>
            <Routes>
              {ADMIN_ENABLED && <Route path="/admin/*" element={<AdminApp />} />}
              <Route path="/*" element={<App />} />
            </Routes>
          </PortfolioDataProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
