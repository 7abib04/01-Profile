import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Define the GraphQL API URI
const httpLink = new HttpLink({
  uri: 'https://learn.reboot01.com/api/graphql-engine/v1/graphql', // Replace with your GraphQL API endpoint
});

// Dynamically set the Authorization header
const authLink = setContext(() => {
  // Get the token from localStorage
  const token = typeof window !== 'undefined' ? localStorage.getItem('jwt') : null;

  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '', // Add token if available
    },
  };
});

// Create the Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Combine authLink and httpLink
  cache: new InMemoryCache(),
});

export default client;
