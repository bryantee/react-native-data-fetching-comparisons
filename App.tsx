import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import {ApolloClient, ApolloProvider, gql, InMemoryCache} from "@apollo/client";
import {QueryClient, QueryClientProvider} from 'react-query';

/**
 * universal graphql endpoint for all implementations
 */
export const GRAPHQL_ENDPOINT = "https://rickandmortyapi.com/graphql";

/**
 * Universal query to get list of characters for all implementations
 */
export const CHARACTERS_QUERY = gql`
    query Query {
        characters(page: 1) {
            results {
                name
                id
                gender
                image
                species
                __typename
            }
        }
    }
`

const apolloClient = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  cache: new InMemoryCache()
});

const reactQueryClient = new QueryClient({})

/**
 * We normally would wrap any providers around the base of the app here,
 * but since we're using two seperate redux stores, we opt to wrap them
 * around just components that need them. See navigation/index.ts.
 *
 * React-Query and Apollo Client are wrapped here since there is no conflict.
 */
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <QueryClientProvider client={reactQueryClient}>
        <ApolloProvider client={apolloClient}>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme}/>
            <StatusBar/>
          </SafeAreaProvider>
        </ApolloProvider>
      </QueryClientProvider>
    );
  }
}
