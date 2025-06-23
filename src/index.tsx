import { AppProvider } from './context/AppContext';
import { AuthService } from './auth/AuthService';

// Vérification de l'authentification au chargement
AuthService.getCurrentUser().then(user => {
  if (user) {
    // Initialiser le contexte utilisateur
  }
});

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);