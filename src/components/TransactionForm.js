/**
 * Formulaire pour effectuer des opérations bancaires.
 * Gère les dépôts et retraits sur les comptes.
 * 
 * @author Ilyas MICHICH
 * @version 1.0
 * @since 2024
 */

import React, { useState } from 'react';
import { useQuery, useMutation } from "@apollo/client/react";
import { REQUETE_TOUS_COMPTES, REQUETE_TOUTES_OPERATIONS } from '../graphql/queries';
import { MUTATION_AJOUTER_OPERATION } from '../graphql/mutations';

/**
 * Composant de formulaire pour les transactions bancaires.
 * 
 * @author Ilyas MICHICH
 * @returns {JSX.Element} Formulaire de transaction
 */
const FormulaireOperation = () => {
  const [idCompteCible, setIdCompteCible] = useState('');
  const [montantOperation, setMontantOperation] = useState('');
  const [typeOperation, setTypeOperation] = useState('CREDIT');
  const [libelleOperation, setLibelleOperation] = useState('');

  // Récupération des comptes pour la sélection
  const { data: donneesComptes } = useQuery(REQUETE_TOUS_COMPTES);

  const [executerOperation, { loading: enregistrementEnCours }] = useMutation(MUTATION_AJOUTER_OPERATION, {
    refetchQueries: [{ query: REQUETE_TOUTES_OPERATIONS }, { query: REQUETE_TOUS_COMPTES }],
  });

  /**
   * Gère la soumission du formulaire d'opération.
   * @param {Event} evenement Événement de soumission
   */
  const gererSoumission = async (evenement) => {
    evenement.preventDefault();
    if (!idCompteCible) {
      alert("[Ilyas MICHICH] Veuillez sélectionner un compte cible");
      return;
    }
    try {
      await executerOperation({
        variables: {
          transaction: {
            compteId: idCompteCible,
            montant: parseFloat(montantOperation),
            date: new Date().toISOString(),
            type: typeOperation,
            description: libelleOperation,
          },
        },
      });
      setMontantOperation('');
      setIdCompteCible('');
      setTypeOperation('CREDIT');
      setLibelleOperation('');
      alert('[Ilyas MICHICH] Opération bancaire enregistrée !');
    } catch (erreur) {
      console.error('[Ilyas MICHICH] Erreur opération:', erreur);
      alert("[Ilyas MICHICH] Erreur lors de l'enregistrement de l'opération.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Effectuer une Opération</h3>
      <p className="text-sm text-gray-500 mb-4">Par Ilyas MICHICH</p>
      <form onSubmit={gererSoumission} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Compte Cible</label>
          <select
            className="mt-1 block w-full border p-2 rounded"
            value={idCompteCible}
            onChange={(e) => setIdCompteCible(e.target.value)}
            required
          >
            <option value="">Sélectionner un compte...</option>
            {donneesComptes && donneesComptes.allComptes.map(compte => (
              <option key={compte.id} value={compte.id}>N°{compte.id} - Solde: {compte.solde} DH</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Montant (DH)</label>
          <input
            type="number"
            value={montantOperation}
            onChange={(e) => setMontantOperation(e.target.value)}
            required
            className="mt-1 block w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Type d'Opération</label>
          <select
            value={typeOperation}
            onChange={(e) => setTypeOperation(e.target.value)}
            className="mt-1 block w-full border p-2 rounded"
          >
            <option value="CREDIT">Versement (CREDIT)</option>
            <option value="DEBIT">Retrait (DEBIT)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Libellé (optionnel)</label>
          <input
            type="text"
            value={libelleOperation}
            onChange={(e) => setLibelleOperation(e.target.value)}
            className="mt-1 block w-full border p-2 rounded"
            placeholder="Description de l'opération"
          />
        </div>
        <button
          type="submit"
          disabled={enregistrementEnCours}
          className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          {enregistrementEnCours ? 'Traitement en cours...' : 'Valider l\'opération'}
        </button>
      </form>
    </div>
  );
};

export default FormulaireOperation;
