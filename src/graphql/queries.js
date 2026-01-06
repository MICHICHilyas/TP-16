/**
 * Requêtes GraphQL pour les opérations de lecture.
 * Définit les queries pour récupérer comptes et transactions.
 * 
 * @author Ilyas MICHICH
 * @version 1.0
 * @since 2024
 */

import { gql } from '@apollo/client';

/**
 * Requête pour récupérer tous les comptes bancaires.
 * @author Ilyas MICHICH
 */
export const REQUETE_TOUS_COMPTES = gql`
query RecupererTousLesComptes {
  allComptes {
    id
    solde
    type
    dateCreation
  }
}
`;

// Alias pour compatibilité - Ilyas MICHICH
export const GET_ALL_COMPTES = REQUETE_TOUS_COMPTES;

/**
 * Requête pour récupérer un compte par son identifiant.
 * @author Ilyas MICHICH
 */
export const REQUETE_COMPTE_PAR_ID = gql`
query RecupererCompteParId($id: ID!) {
  compteById(id: $id) {
    id
    solde
    dateCreation
    type
  }
}
`;

// Alias pour compatibilité - Ilyas MICHICH
export const GET_COMPTE_BY_ID = REQUETE_COMPTE_PAR_ID;

/**
 * Requête pour récupérer toutes les opérations bancaires.
 * @author Ilyas MICHICH
 */
export const REQUETE_TOUTES_OPERATIONS = gql`
query RecupererToutesLesOperations {
  allTransactions {
    id
    montant
    date
    type
    compteId
    description
  }
}
`;

// Alias pour compatibilité - Ilyas MICHICH
export const GET_ALL_TRANSACTIONS = REQUETE_TOUTES_OPERATIONS;

/**
 * Requête pour récupérer les opérations d'un compte spécifique.
 * @author Ilyas MICHICH
 */
export const REQUETE_OPERATIONS_PAR_COMPTE = gql`
query RecupererOperationsParCompte($compteId: ID!) {
  transactionsByCompte(compteId: $compteId) {
    id
    montant
    date
    type
    compteId
    description
  }
}
`;

// Alias pour compatibilité - Ilyas MICHICH
export const GET_TRANSACTIONS_BY_COMPTE = REQUETE_OPERATIONS_PAR_COMPTE;
