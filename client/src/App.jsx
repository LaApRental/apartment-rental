import React from 'react';

import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import RegisterNew from './pages/RegisterNew';
import ActivateAccount from './pages/ActivateAccount';
import DashboardPage from './pages/DashboardPage'; // ✅ use the new dashboard
import HostProfile from './pages/HostProfile';
import RedirectIfAuthenticated from './components/RedirectIfAuthenticated';

export default function App() {
  return (
    <Router>
      <Routes>

                <Route
                  path="/login"
                  element={
                    <RedirectIfAuthenticated>
                      <LoginPage />
                    </RedirectIfAuthenticated>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <RedirectIfAuthenticated>
                      <RegisterNew />
                    </RedirectIfAuthenticated>
                  }
                />
        <Route path="/activate" element={<ActivateAccount />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profil"
                element={
                  <ProtectedRoute>
                    <HostProfile />
                  </ProtectedRoute>
                }
              />
        <Route path="*" element={<div className="text-center p-10 text-gray-500">404 - Page not found</div>} />
      </Routes>
    </Router>
  );
}
