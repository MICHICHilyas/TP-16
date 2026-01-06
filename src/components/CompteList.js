/**
 * Composant d'affichage de la liste des comptes bancaires.
 * Utilise Apollo Client pour les requêtes GraphQL.
 * 
 * @author Ilyas MICHICH
 * @version 1.0
 * @since 2024
 */

import React from "react";
import { useQuery } from "@apollo/client/react";
import { REQUETE_TOUS_COMPTES } from "../graphql/queries";

/**
 * Composant affichant tous les comptes bancaires.
 * Récupère les données via une requête GraphQL.
 * 
 * @author Ilyas MICHICH
 * @returns {JSX.Element} Liste des comptes ou messages d'état
 */
const AffichageComptes = () => {
  const { loading: chargementEnCours, error: erreurRequete, data: donneesComptes } = useQuery(REQUETE_TOUS_COMPTES);
  
  if (chargementEnCours) {
    return <p className="text-center text-gray-500">[Ilyas MICHICH] Chargement des comptes bancaires en cours...</p>;
  }
  
  if (erreurRequete) {
    return <p className="text-center text-red-500">[Ilyas MICHICH] Erreur de chargement : {erreurRequete.message}</p>;
  }
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Liste des Comptes Bancaires</h2>
      <p className="text-sm text-gray-500 mb-4">Développé par Ilyas MICHICH</p>
      <div className="grid gap-4">
        {donneesComptes.allComptes.map((compteBancaire) => (
          <div key={compteBancaire.id} className="border-b pb-4 last:border-0">
            <p className="font-semibold">Identifiant: <span className="font-normal">{compteBancaire.id}</span></p>
            <p className="font-semibold">Solde: <span className="font-normal text-green-600">{compteBancaire.solde} DH</span></p>
            <p className="font-semibold">Catégorie: <span className="badge bg-gray-200 px-2 py-1 rounded text-sm">{compteBancaire.type}</span></p>
            <p className="text-sm text-gray-500">Date d'ouverture : {compteBancaire.dateCreation ? new Date(compteBancaire.dateCreation).toLocaleDateString('fr-FR') : 'Non définie'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AffichageComptes;
