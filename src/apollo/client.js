/**
 * Configuration du client Apollo pour GraphQL.
 * Établit la connexion avec le serveur GraphQL backend.
 * 
 * @author Ilyas MICHICH
 * @version 1.0
 * @since 2024
 */

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

/**
 * Lien HTTP vers l'API GraphQL backend.
 * @author Ilyas MICHICH
 */
const lienHttpGraphQL = createHttpLink({
  uri: 'http://localhost:8082/graphql',
  credentials: 'include',
});

/**
 * Instance du client Apollo configurée.
 * Utilise une politique de récupération réseau uniquement.
 * 
 * @author Ilyas MICHICH
 */
export const clientApollo = new ApolloClient({
  link: lienHttpGraphQL,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
    },
    query: {
      fetchPolicy: 'network-only',
    },
  },
});

// Alias pour compatibilité - Ilyas MICHICH
export const client = clientApollo;
