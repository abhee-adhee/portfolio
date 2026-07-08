import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { 
  Login, 
  Dashboard, 
  Projects, 
  Skills, 
  Education, 
  Experience, 
  Hero,
  Settings,
  Analytics,
  Media,
  FutureFeatures
} from './pages';
import { AdminAuthGuard } from './components/auth/AdminAuthGuard';

export default function AdminApp() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      
      <Route 
        path="*" 
        element={
          <AdminAuthGuard>
            <Routes>
              {/* Overview Routes */}
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="analytics" element={<Analytics />} />
              
              {/* Content Management Routes */}
              <Route path="portfolio" element={<Projects />} />
              <Route path="pages" element={<Hero />} />
              <Route path="projects" element={<Projects />} />
              <Route path="skills" element={<Skills />} />
              <Route path="education" element={<Education />} />
              <Route path="experience" element={<Experience />} />
              <Route path="hero" element={<Hero />} />
              <Route path="media" element={<Media />} />

              {/* System Routes */}
              <Route path="settings" element={<Settings />} />
              <Route path="features" element={<FutureFeatures />} />
              
              {/* Fallback */}
              <Route path="*" element={<Navigate to="dashboard" replace />} />
            </Routes>
          </AdminAuthGuard>
        } 
      />
    </Routes>
  );
}
