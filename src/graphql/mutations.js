/**
 * Mutations GraphQL pour les opérations d'écriture.
 * Définit les mutations pour créer comptes et transactions.
 * 
 * @author Ilyas MICHICH
 * @version 1.0
 * @since 2024
 */

import { gql } from '@apollo/client';

/**
 * Mutation pour ajouter une nouvelle opération bancaire.
 * @author Ilyas MICHICH
 */
export const MUTATION_AJOUTER_OPERATION = gql`
  mutation AjouterOperationBancaire($transaction: TransactionRequest!) {
    saveTransaction(transaction: $transaction) {
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
export const ADD_TRANSACTION = MUTATION_AJOUTER_OPERATION;
export const SAVE_TRANSACTION = MUTATION_AJOUTER_OPERATION;

/**
 * Mutation pour créer un nouveau compte bancaire.
 * @author Ilyas MICHICH
 */
export const MUTATION_CREER_COMPTE = gql`
  mutation CreerCompteBancaire($compte: CompteRequest!) {
    saveCompte(compte: $compte) {
      id
      solde
      type
      dateCreation
    }
  }
`;

// Alias pour compatibilité - Ilyas MICHICH
export const SAVE_COMPTE = MUTATION_CREER_COMPTE;
