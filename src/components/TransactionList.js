/**
 * Composant d'affichage de l'historique des opérations.
 * Présente les transactions sous forme de tableau.
 * 
 * @author Ilyas MICHICH
 * @version 1.0
 * @since 2024
 */

import React from "react";
import { useQuery } from "@apollo/client/react";
import { REQUETE_TOUTES_OPERATIONS } from "../graphql/queries";

/**
 * Composant affichant l'historique des transactions bancaires.
 * 
 * @author Ilyas MICHICH
 * @returns {JSX.Element} Tableau des transactions
 */
const HistoriqueOperations = () => {
  const { loading: chargementEnCours, error: erreurRequete, data: donneesOperations } = useQuery(REQUETE_TOUTES_OPERATIONS);

  if (chargementEnCours) {
    return <p>[Ilyas MICHICH] Chargement de l'historique des opérations...</p>;
  }
  
  if (erreurRequete) {
    return <p>[Ilyas MICHICH] Erreur de chargement : {erreurRequete.message}</p>;
  }
  
  if (!donneesOperations || !donneesOperations.allTransactions || donneesOperations.allTransactions.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-bold mb-4">Historique des Opérations</h2>
        <p className="text-sm text-gray-500">Par Ilyas MICHICH</p>
        <p className="mt-4">Aucune opération enregistrée pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Historique des Opérations</h2>
      <p className="text-sm text-gray-500 mb-4">Développé par Ilyas MICHICH</p>
      <div className="overflow-auto max-h-96">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" className="px-6 py-4">Type</th>
              <th scope="col" className="px-6 py-4">Montant (DH)</th>
              <th scope="col" className="px-6 py-4">N° Compte</th>
              <th scope="col" className="px-6 py-4">Date</th>
              <th scope="col" className="px-6 py-4">Libellé</th>
            </tr>
          </thead>
          <tbody>
            {donneesOperations.allTransactions.map((operation) => (
              <tr key={operation.id} className="border-b dark:border-neutral-500">
                <td className={`whitespace-nowrap px-6 py-4 font-bold ${operation.type === 'CREDIT' ? 'text-green-600' : 'text-red-600'}`}>
                  {operation.type === 'CREDIT' ? 'VERSEMENT' : 'RETRAIT'}
                </td>
                <td className="whitespace-nowrap px-6 py-4">{operation.montant} DH</td>
                <td className="whitespace-nowrap px-6 py-4">{operation.compteId ?? 'N/A'}</td>
                <td className="whitespace-nowrap px-6 py-4">{operation.date ? new Date(operation.date).toLocaleString('fr-FR') : 'N/A'}</td>
                <td className="whitespace-nowrap px-6 py-4">{operation.description ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoriqueOperations;
