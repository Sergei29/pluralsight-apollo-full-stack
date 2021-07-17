import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as ApolloProviderHOC,
  HttpLink,
  InMemoryCacheConfig,
} from "@apollo/client";

const objCacheConfig: InMemoryCacheConfig = {};

/**
 * @description Apollo instance provider for the application
 * @param {Node} {children nested app components}
 * @returns {JSX} application components with provided client instance
 */
const ApolloProvider: React.FC = ({ children }) => {
  const client = new ApolloClient({
    link: new HttpLink({
      uri:
        process.env.NODE_ENV === "development"
          ? "http://localhost:4000/graphql"
          : "/graphql",
      credentials: "include",
    }),
    cache: new InMemoryCache(objCacheConfig),
    connectToDevTools: process.env.NODE_ENV === "development",
  });

  return <ApolloProviderHOC client={client}>{children}</ApolloProviderHOC>;
};

export default ApolloProvider;
