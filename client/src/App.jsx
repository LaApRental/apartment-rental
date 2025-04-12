import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { LoginPage } from './pages/LoginPage';
import RegisterNew from './pages/RegisterNew';
import ActivateAccount from './pages/ActivateAccount';
import DashboardPage from './pages/DashboardPage'; // ✅ use the new dashboard
import HostProfile from './pages/HostProfile';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterNew />} />
        <Route path="/activate" element={<ActivateAccount />} />
        <Route path="/dashboard" element={<DashboardPage />} /> {/* ✅ updated here */}
        <Route path="/profil" element={<HostProfile />} />
        <Route path="*" element={<div className="text-center p-10 text-gray-500">404 - Page not found</div>} />
      </Routes>
    </Router>
  );
}
