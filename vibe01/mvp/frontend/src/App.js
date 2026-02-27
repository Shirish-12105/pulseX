import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DiagnosticPage from './pages/DiagnosticPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/diagnostic" />} />
        <Route path="/diagnostic" element={<DiagnosticPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}
