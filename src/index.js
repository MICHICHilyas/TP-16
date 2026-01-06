/**
 * Point d'entrée de l'application React.
 * Configure le rendu racine et les modes de développement.
 * 
 * @author Ilyas MICHICH
 * @version 1.0
 * @since 2024
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/* 
 * Création du noeud racine React
 * @author Ilyas MICHICH
 */
const racineApplication = ReactDOM.createRoot(document.getElementById('root'));

racineApplication.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Mesure de performance - Ilyas MICHICH
reportWebVitals();
