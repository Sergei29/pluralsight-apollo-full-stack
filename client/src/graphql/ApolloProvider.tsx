import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as ApolloProviderHOC,
  HttpLink,
  InMemoryCacheConfig,
} from "@apollo/client";

const getClient = (objCacheCongig: InMemoryCacheConfig = {}) =>
  new ApolloClient({
    link: new HttpLink({
      uri:
        process.env.NODE_ENV === "development"
          ? "http://localhost:4000/graphql"
          : "/graphql",
    }),
    cache: new InMemoryCache(objCacheCongig),
    connectToDevTools: process.env.NODE_ENV === "development",
    credentials: "same-origin",
  });

type Props = {
  children: React.ReactNode;
};

/**
 * @description Apollo instance provider for the application
 * @param {Node} {children nested children components}
 * @returns {JSX} application components with provided client instance
 */
const ApolloProvider: React.FC<Props> = ({ children }) => {
  const client = getClient();
  return <ApolloProviderHOC client={client}>{children}</ApolloProviderHOC>;
};

export default ApolloProvider;
