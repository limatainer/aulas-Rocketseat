import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: `REACT_APP_APOLLO_URI`,
  cache: new InMemoryCache()

})