import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as ApolloProviderHOC,
  HttpLink,
  InMemoryCacheConfig,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const objCacheConfig: InMemoryCacheConfig = {};

const wsLink = new WebSocketLink({
  uri:
    process.env.NODE_ENV === "development"
      ? "ws://localhost:4000/graphql"
      : "/graphql",
});

const httpLink = new HttpLink({
  uri:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000/graphql"
      : "/graphql",
  credentials: "include",
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

/**
 * @description Apollo instance provider for the application
 * @param {Node} {children nested app components}
 * @returns {JSX} application components with provided client instance
 */
const ApolloProvider: React.FC = ({ children }) => {
  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(objCacheConfig),
    connectToDevTools: process.env.NODE_ENV === "development",
  });

  return <ApolloProviderHOC client={client}>{children}</ApolloProviderHOC>;
};

export default ApolloProvider;
