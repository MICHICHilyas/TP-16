/**
 * Types et constantes pour l'application bancaire GraphQL.
 * Définit les énumérations utilisées côté client.
 * 
 * @author Ilyas MICHICH
 * @version 1.0
 * @since 2024
 */

/**
 * Types de comptes bancaires disponibles.
 * @author Ilyas MICHICH
 */
export const CategorieCompte = {
  COURANT: 'COURANT',
  EPARGNE: 'EPARGNE',
};

// Alias pour compatibilité
export const TypeCompte = CategorieCompte;

/**
 * Types d'opérations bancaires possibles.
 * @author Ilyas MICHICH
 */
export const CategorieOperation = {
  VERSEMENT: 'DEPOT',
  RETRAIT: 'RETRAIT',
};

// Alias pour compatibilité
export const TypeTransaction = CategorieOperation;
