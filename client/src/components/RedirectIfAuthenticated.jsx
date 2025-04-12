import React from 'react';
import { Navigate } from 'react-router-dom';

const RedirectIfAuthenticated = ({ children }) => {
  const user = localStorage.getItem('user');
  return user ? <Navigate to="/dashboard" replace /> : children;
};

export default RedirectIfAuthenticated;
