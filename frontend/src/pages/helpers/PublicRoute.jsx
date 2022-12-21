import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const location = useLocation();
  return (
    localStorage.getItem('user') ? <Navigate to="/" state={{ from: location }} /> : children
  );
};

export default PublicRoute;
