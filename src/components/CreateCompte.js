/**
 * Formulaire de création de compte bancaire.
 * Utilise une mutation GraphQL pour l'enregistrement.
 * 
 * @author Ilyas MICHICH
 * @version 1.0
 * @since 2024
 */

import React, { useState } from 'react';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { MUTATION_CREER_COMPTE } from '../graphql/mutations';
import { REQUETE_TOUS_COMPTES } from '../graphql/queries';

/**
 * Composant de formulaire pour créer un nouveau compte.
 * 
 * @author Ilyas MICHICH
 * @returns {JSX.Element} Formulaire de création
 */
const FormulaireCreationCompte = () => {
  const [montantInitial, setMontantInitial] = useState('');
  const [categorieCompte, setCategorieCompte] = useState('COURANT');
  
  const [executerCreation] = useMutation(MUTATION_CREER_COMPTE, {
    refetchQueries: [{ query: REQUETE_TOUS_COMPTES }]
  });
  
  /**
   * Gère la soumission du formulaire.
   * @param {Event} evenement Événement de soumission
   */
  const gererSoumission = async (evenement) => {
    evenement.preventDefault();
    try {
      await executerCreation({
        variables: {
          compte: {
            solde: parseFloat(montantInitial),
            type: categorieCompte,
          },
        },
      });
      setMontantInitial('');
      setCategorieCompte('COURANT');
      alert('[Ilyas MICHICH] Compte bancaire créé avec succès !');
    } catch (erreur) {
      console.error('[Ilyas MICHICH] Erreur lors de la création du compte :', erreur);
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Créer un Compte Bancaire</h3>
      <p className="text-sm text-gray-500 mb-4">Par Ilyas MICHICH</p>
      <form onSubmit={gererSoumission} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Montant initial (DH)</label>
          <input
            type="number"
            value={montantInitial}
            onChange={(e) => setMontantInitial(e.target.value)}
            required
            placeholder="Ex: 5000"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Catégorie de compte</label>
          <select
            value={categorieCompte}
            onChange={(e) => setCategorieCompte(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border p-2"
          >
            <option value="COURANT">Compte Courant</option>
            <option value="EPARGNE">Compte Épargne</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
          Ouvrir le compte
        </button>
      </form>
    </div>
  );
};

export default FormulaireCreationCompte;
