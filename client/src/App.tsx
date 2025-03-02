import './App.css';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { RetryLink } from '@apollo/client/link/retry';


const httpLink = createHttpLink({
  uri: '/graphql'
});

const retryLink = new RetryLink({
  delay: {
      initial: 300,
      max: 3000,
      jitter: true
  },
  attempts: {
      max: 5,
      retryIf: (error, _operation) => {
          return !!error;
      }
  }
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
      headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : ''
      }
  };
});

const client = new ApolloClient({
  link: retryLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache(),
  defaultOptions: {
      watchQuery: {
          fetchPolicy: 'network-only',
          errorPolicy: 'all',
      },
      query: {
          fetchPolicy: 'network-only',
          errorPolicy: 'all',
      },
  },
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
