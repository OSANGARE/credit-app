import { CreditService } from '../api/creditApi';

export const AuthService = {
  async login(email: string, password: string) {
    // En production, remplacer par un vrai endpoint
    const mockAuth = {
      token: 'mock-jwt-token',
      user: {
        name: 'Jean Dupont',
        email,
      },
    };

    localStorage.setItem('authToken', mockAuth.token);
    return mockAuth;
  },

  logout() {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  },

  async getCurrentUser() {
    // Vérifie le token et récupère les infos utilisateur
    const token = localStorage.getItem('authToken');
    if (!token) return null;

    return {
      name: 'Jean Dupont',
      email: 'jean@example.com',
    };
  },

  isAuthenticated() {
    return !!localStorage.getItem('authToken');
  },
};