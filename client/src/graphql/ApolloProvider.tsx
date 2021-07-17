import React, { useContext } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as ApolloProviderHOC,
  HttpLink,
  InMemoryCacheConfig,
} from "@apollo/client";
import { AuthContext } from "./AuthProvider";

const objCacheConfig: InMemoryCacheConfig = {};

/**
 * @description Apollo instance provider for the application
 * @param {Node} {children nested app components}
 * @returns {JSX} application components with provided client instance
 */
const ApolloProvider: React.FC = ({ children }) => {
  const { authInfo } = useContext(AuthContext);
  const { token } = authInfo;

  const client = new ApolloClient({
    link: new HttpLink({
      uri:
        process.env.NODE_ENV === "development"
          ? "http://localhost:4000/graphql"
          : "/graphql",
      headers: token ? { authorization: token } : undefined,
    }),
    cache: new InMemoryCache(objCacheConfig),
    connectToDevTools: process.env.NODE_ENV === "development",
    credentials: "same-origin",
  });

  return <ApolloProviderHOC client={client}>{children}</ApolloProviderHOC>;
};

export default ApolloProvider;
