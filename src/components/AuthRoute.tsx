import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// Corriger l'import
import { AuthService } from '../auth/AuthService';  // Chemin relatif correct

const AuthRoute: React.FC = () => {
  return AuthService.isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AuthRoute;
