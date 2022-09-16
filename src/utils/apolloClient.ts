import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { Constants } from 'react-native-unimodules';
import { setContext } from '@apollo/client/link/context';
import AuthStorage from './authStorage';

const { apolloUri } = Constants.manifest.extra.env;

console.log('ap', apolloUri)

const httpLink = createHttpLink({
  // Replace the IP address part with your own IP address!
  uri: apolloUri
});

const createApolloClient = (authStorage: AuthStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    } catch (e) {
      console.log(e);
      return {
        headers,
      };
    }
  });
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;