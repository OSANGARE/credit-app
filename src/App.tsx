// Ajouter en haut du fichier
import React from 'react';
import axios from 'axios';
// Corriger l'interpolation de chaîne
config.headers.Authorization = `Bearer ${token}`;  // Utiliser backticks (`) au lieu de quotes (')
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Apply from './pages/Apply';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apply" element={<Apply />} />
        </Routes>
      </Layout>
    </Router>
  );
}
