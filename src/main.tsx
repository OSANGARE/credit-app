import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProvider } from './context/AppContext';
import { AuthService } from './auth/AuthService';
import App from './App';
import './styles/global.less';

// Initialisation des services avant le rendu
async function initializeApp() {
  // Vérification de l'authentification existante
  const currentUser = await AuthService.getCurrentUser();
  
  // Initialisation d'autres services (analytics, i18n, etc.)
  if (process.env.NODE_ENV === 'production') {
    import('./utils/analytics').then(({ initAnalytics }) => initAnalytics());
  }
  
  return { currentUser };
}

// Fonction principale asynchrone
async function main() {
  try {
    const { currentUser } = await initializeApp();
    
    const root = ReactDOM.createRoot(
      document.getElementById('root') as HTMLElement
    );

    root.render(
      <React.StrictMode>
        <AppProvider initialUser={currentUser}>
          <App />
        </AppProvider>
      </React.StrictMode>
    );

  } catch (error) {
    // Gestion des erreurs critiques d'initialisation
    console.error('Application initialization failed:', error);
    
    // Fallback UI
    const fallbackRoot = document.getElementById('root');
    if (fallbackRoot) {
      fallbackRoot.innerHTML = `
        <div style="padding: 2rem; text-align: center;">
          <h1>Une erreur est survenue</h1>
          <p>Nous rencontrons des difficultés techniques. Veuillez rafraîchir la page.</p>
          <button onclick="window.location.reload()">Recharger</button>
        </div>
      `;
    }
  }
}

// Lancement de l'application
main();