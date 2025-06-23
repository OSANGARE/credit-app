import axios from 'axios';

type ApplicationData = {
  amount: number;
  term: number;
  purpose: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
  };
};

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://api.credit-app.com/v1',
  timeout: 10000,
});

// Intercepteur pour les requêtes
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur pour les réponses
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const CreditService = {
  async submitApplication(data: ApplicationData) {
    try {
      const response = await apiClient.post('/applications', data);
      return {
        success: true,
        data: response.data,
        error: null
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || 'Erreur inconnue'
      };
    }
  },

  async getApplications() {
    const response = await apiClient.get('/applications');
    return response.data;
  }
};