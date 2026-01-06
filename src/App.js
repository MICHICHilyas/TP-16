/**
 * Application principale React avec Apollo Client GraphQL.
 * Interface utilisateur pour la gestion des comptes bancaires.
 * 
 * @author Ilyas MICHICH
 * @version 1.0
 * @since 2024
 */

import React from 'react';
import { ApolloProvider } from "@apollo/client/react";
import { clientApollo } from "./apollo/client";
import AffichageComptes from "./components/CompteList";
import FormulaireCreationCompte from "./components/CreateCompte";
import FormulaireOperation from "./components/TransactionForm";
import HistoriqueOperations from "./components/TransactionList";
import "./App.css";

/**
 * Composant principal de l'application bancaire React.
 * Fournit le contexte Apollo et structure l'interface utilisateur.
 * 
 * @author Ilyas MICHICH
 * @returns {JSX.Element} L'application complète
 */
function App() {
  return (
    <ApolloProvider client={clientApollo}>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
            Système de Gestion Bancaire - Ilyas MICHICH
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Application React avec Apollo Client GraphQL
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Section Gauche : Gestion des Comptes */}
            <div className="space-y-6">
              <FormulaireCreationCompte />
              <AffichageComptes />
            </div>
            {/* Section Droite : Opérations Bancaires */}
            <div className="space-y-6">
              <FormulaireOperation />
              <HistoriqueOperations />
            </div>
          </div>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
