import React from 'react';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';
import AuthStorageContext from './src/contexts/AuthStorageContext';

import Main from './src/components/Main';
import AuthStorage from './src/utils/authStorage';
import createApolloClient from './src/utils/apolloClient';

const authStorage = new AuthStorage();

const apolloClient = createApolloClient(authStorage);

const App = () => {
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={authStorage}>
          <Main />
        </AuthStorageContext.Provider>
      </ApolloProvider>
    </NativeRouter>
  )
};

export default App;