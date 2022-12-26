import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const PublicRoute = ({ children }) => {
  const location = useLocation();
  const auth = useAuth();

  return (
    auth.loggedInfo ? <Navigate to="/" state={{ from: location }} /> : children
  );
};

export default PublicRoute;
