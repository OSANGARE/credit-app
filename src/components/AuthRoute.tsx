import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthService } from '../auth/AuthService';

const AuthRoute: React.FC = () => {
  return AuthService.isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AuthRoute;