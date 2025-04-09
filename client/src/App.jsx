import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { LoginPage } from './pages/LoginPage';
import { RegisterNew } from './pages/RegisterNew';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
         <Route path="/register" element={<RegisterNew />} />
        <Route path="*" element={<div className="text-center p-10 text-gray-500">404 - Page not found</div>} />
      </Routes>
    </Router>
  );
}
